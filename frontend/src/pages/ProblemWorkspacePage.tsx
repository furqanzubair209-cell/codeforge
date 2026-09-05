import { useEffect, useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  ChevronLeft,
  Play,
  UploadCloud,
  RotateCcw,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  TerminalSquare,
} from "lucide-react";
import { allProblems, getProblemBySlug } from "@/data/problems";
import type { PublicProblem } from "@/types/problem";
import { executeCode, isExecutionServiceConfigured, type ExecutionResponse } from "@/lib/executionClient";
import { storage } from "@/lib/storage";
import { useCodeforgeStore } from "@/store/useCodeforgeStore";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/toast";
import { ProblemStatement } from "@/components/problem/ProblemStatement";
import { HintsPanel } from "@/components/problem/HintsPanel";
import { CppEditor } from "@/components/problem/CppEditor";
import { ResultPanel } from "@/components/problem/ResultPanel";

export default function ProblemWorkspacePage() {
  const { slug } = useParams<{ slug: string }>();
  const problem = slug ? getProblemBySlug(slug) : undefined;

  if (!problem) return <Navigate to="/problems" replace />;

  // remounts everything (state, editor, tabs) when jumping straight to the next problem
  return <ProblemWorkspace key={problem.id} problem={problem} />;
}

function ProblemWorkspace({ problem }: { problem: PublicProblem }) {
  const [code, setCode] = useState(() => storage.getCode(problem.id, problem.starterCode));
  const [result, setResult] = useState<ExecutionResponse | null>(null);
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mobileTab, setMobileTab] = useState<"problem" | "code">("problem");
  const [leftTab, setLeftTab] = useState<"statement" | "hints">("statement");

  const solved = useCodeforgeStore((s) => s.isSolved(problem.id));
  const bookmarked = useCodeforgeStore((s) => s.isBookmarked(problem.id));
  const toggleBookmark = useCodeforgeStore((s) => s.toggleBookmark);
  const recordSubmission = useCodeforgeStore((s) => s.recordSubmission);
  const newlyUnlocked = useCodeforgeStore((s) => s.newlyUnlocked);
  const clearNewlyUnlocked = useCodeforgeStore((s) => s.clearNewlyUnlocked);

  useEffect(() => {
    if (newlyUnlocked.length === 0) return;
    newlyUnlocked.forEach((a) => toast.success(`Achievement unlocked: ${a.title}`));
    clearNewlyUnlocked();
  }, [newlyUnlocked, clearNewlyUnlocked]);

  const nextProblem = useMemo(() => {
    const idx = allProblems.findIndex((p) => p.id === problem.id);
    if (idx === -1 || idx === allProblems.length - 1) return null;
    return allProblems[idx + 1];
  }, [problem.id]);

  const busy = running || submitting;

  function handleCodeChange(value: string) {
    setCode(value);
    storage.setCode(problem.id, value);
  }

  function handleReset() {
    setCode(problem.starterCode);
    storage.setCode(problem.id, problem.starterCode);
    toast.info("Editor reset to starter code.");
  }

  async function runAttempt(mode: "run" | "submit") {
    const setBusy = mode === "run" ? setRunning : setSubmitting;
    setBusy(true);
    setResult(null);
    setMobileTab("code");
    try {
      const res = await executeCode(code, problem, mode);
      setResult(res);
      recordSubmission({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        problemId: problem.id,
        code,
        verdict: res.verdict,
        passedTests: res.passedTests,
        totalTests: res.totalTests,
        runtimeMs: res.runtimeMs,
        errorMessage: res.compileError || res.runtimeError,
        timestamp: Date.now(),
        mode,
      });

      if (res.verdict === "Accepted") {
        toast.success(mode === "submit" ? "Accepted — problem solved!" : "All sample tests passed.");
      } else {
        toast.error(res.verdict);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong while executing your code.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col h-[calc(100dvh-56px)] min-h-0">
      {/* Top action bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 border-b border-forge-border px-2 sm:px-4 py-2 shrink-0 overflow-x-auto">
        <Link
          to="/problems"
          className="shrink-0 rounded-md p-1.5 text-forge-text-dim hover:text-forge-text hover:bg-forge-surface-hover transition-colors"
          aria-label="Back to problems"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>

        <Badge variant={difficultyVariant(problem.difficulty)} className="shrink-0 hidden sm:inline-flex">
          {problem.difficulty}
        </Badge>

        <h1 className="min-w-0 flex-1 truncate font-display font-semibold text-sm sm:text-base text-forge-text">
          {problem.title}
        </h1>

        {solved && <CheckCircle2 className="h-4 w-4 text-signal-success shrink-0" aria-label="Solved" />}

        <button
          type="button"
          onClick={() => toggleBookmark(problem.id)}
          className="shrink-0 rounded-md p-1.5 text-forge-text-faint hover:text-ember hover:bg-forge-surface-hover transition-colors"
          aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <Bookmark className={cn("h-4 w-4", bookmarked && "fill-ember text-ember")} />
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2 ml-auto shrink-0">
          <Button variant="ghost" size="sm" onClick={handleReset} disabled={busy}>
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
          <Button variant="secondary" size="sm" onClick={() => runAttempt("run")} loading={running} disabled={submitting}>
            <Play className="h-3.5 w-3.5" />
            Run
          </Button>
          <Button variant="primary" size="sm" onClick={() => runAttempt("submit")} loading={submitting} disabled={running}>
            <UploadCloud className="h-3.5 w-3.5" />
            Submit
          </Button>
        </div>
      </div>

      {/* Mobile tab switcher */}
      <div className="lg:hidden border-b border-forge-border px-3 sm:px-4 py-2 shrink-0">
        <Tabs value={mobileTab} onValueChange={(v) => setMobileTab(v as "problem" | "code")}>
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="problem" className="w-full">
              Problem
            </TabsTrigger>
            <TabsTrigger value="code" className="w-full">
              Code{result && !result.compileError ? (result.verdict === "Accepted" ? " ✓" : " •") : ""}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 min-h-0 lg:grid lg:grid-cols-2">
        {/* Left: statement / hints */}
        <div
          className={cn(
            "min-h-0 flex-col lg:flex lg:border-r lg:border-forge-border",
            mobileTab === "problem" ? "flex" : "hidden lg:flex"
          )}
        >
          <div className="border-b border-forge-border px-3 sm:px-4 pt-2.5 pb-2 shrink-0">
            <Tabs value={leftTab} onValueChange={(v) => setLeftTab(v as "statement" | "hints")}>
              <TabsList>
                <TabsTrigger value="statement">Statement</TabsTrigger>
                <TabsTrigger value="hints">Hints</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-4 py-4 sm:py-5">
            {leftTab === "statement" ? (
              <ProblemStatement problem={problem} />
            ) : (
              <HintsPanel hints={problem.hints} />
            )}
          </div>
        </div>

        {/* Right: editor + console */}
        <div className={cn("min-h-0 flex-col", mobileTab === "code" ? "flex" : "hidden lg:flex")}>
          <div className="flex-[3] min-h-[220px] border-b border-forge-border">
            <CppEditor value={code} onChange={handleCodeChange} />
          </div>

          <div className="flex-[2] min-h-[160px] overflow-y-auto p-3 sm:p-4 bg-forge-bg-soft">
            {!isExecutionServiceConfigured() && !result ? (
              <div className="rounded-lg border border-signal-warning/25 bg-signal-warning/8 px-3.5 py-3 text-xs text-forge-text-dim leading-relaxed">
                The execution service isn't configured yet, so Run and Submit won't work in this environment. Set{" "}
                <code className="font-mono text-ember">VITE_EXECUTION_API_URL</code> to your deployed
                execution-service URL — see the README for deployment instructions.
              </div>
            ) : busy ? (
              <div className="flex flex-col items-center justify-center gap-2 py-8 text-forge-text-faint">
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <p className="text-xs">{running ? "Compiling and running…" : "Submitting…"}</p>
              </div>
            ) : result ? (
              <div className="flex flex-col gap-3">
                <ResultPanel result={result} />
                {result.verdict === "Accepted" && nextProblem && (
                  <Link to={`/problems/${nextProblem.slug}`}>
                    <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                      Next problem: {nextProblem.title}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 py-8 text-forge-text-faint text-center">
                <TerminalSquare className="h-5 w-5" />
                <p className="text-xs max-w-[220px]">
                  Run against the sample tests, or submit against the full hidden test suite.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
