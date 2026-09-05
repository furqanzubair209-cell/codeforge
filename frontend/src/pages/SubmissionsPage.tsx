import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { History, PlayCircle, UploadCloud } from "lucide-react";
import { allProblems } from "@/data/problems";
import { useCodeforgeStore } from "@/store/useCodeforgeStore";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/input";
import type { SubmissionResult } from "@/types/problem";

type VerdictFilter = "all" | SubmissionResult["verdict"];

const VERDICT_BADGE: Record<SubmissionResult["verdict"], "success" | "danger" | "warning" | "default"> = {
  Accepted: "success",
  "Wrong Answer": "danger",
  "Compilation Error": "danger",
  "Runtime Error": "warning",
  "Time Limit Exceeded": "warning",
  Pending: "default",
};

function formatTimestamp(ts: number): string {
  const date = new Date(ts);
  const now = new Date();
  const sameDay = date.toDateString() === now.toDateString();
  const time = date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  if (sameDay) return `Today · ${time}`;
  return `${date.toLocaleDateString(undefined, { month: "short", day: "numeric" })} · ${time}`;
}

export default function SubmissionsPage() {
  const submissions = useCodeforgeStore((s) => s.submissions);
  const [verdictFilter, setVerdictFilter] = useState<VerdictFilter>("all");

  const problemById = useMemo(() => new Map(allProblems.map((p) => [p.id, p])), []);

  const filtered = useMemo(
    () => (verdictFilter === "all" ? submissions : submissions.filter((s) => s.verdict === verdictFilter)),
    [submissions, verdictFilter]
  );

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12 w-full">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-forge-text">Submissions</h1>
          <p className="mt-1 text-forge-text-dim text-sm sm:text-base">
            {submissions.length === 0
              ? "Your run and submit history will appear here."
              : `${submissions.length} total ${submissions.length === 1 ? "attempt" : "attempts"}.`}
          </p>
        </div>

        {submissions.length > 0 && (
          <Select
            value={verdictFilter}
            onChange={(e) => setVerdictFilter(e.target.value as VerdictFilter)}
            aria-label="Filter by verdict"
            className="w-full sm:w-auto"
          >
            <option value="all">All verdicts</option>
            <option value="Accepted">Accepted</option>
            <option value="Wrong Answer">Wrong Answer</option>
            <option value="Compilation Error">Compilation Error</option>
            <option value="Runtime Error">Runtime Error</option>
            <option value="Time Limit Exceeded">Time Limit Exceeded</option>
          </Select>
        )}
      </div>

      {submissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-forge-border py-16 px-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-forge-border bg-forge-surface">
            <History className="h-5 w-5 text-forge-text-faint" />
          </div>
          <p className="text-sm text-forge-text-dim max-w-xs">
            Run or submit code against any problem and it'll show up here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((s) => {
            const problem = problemById.get(s.problemId);
            return (
              <Link
                key={s.id}
                to={problem ? `/problems/${problem.slug}` : "/problems"}
                className="flex items-center gap-3 rounded-lg border border-forge-border bg-forge-surface px-3 sm:px-4 py-3 hover:border-forge-border-hover hover:bg-forge-surface-hover transition-colors"
              >
                <div className="shrink-0 text-forge-text-faint">
                  {s.mode === "submit" ? (
                    <UploadCloud className="h-4 w-4" />
                  ) : (
                    <PlayCircle className="h-4 w-4" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-sm text-forge-text">
                    {problem?.title ?? "Unknown problem"}
                  </p>
                  <p className="mt-0.5 text-xs text-forge-text-faint">
                    {s.mode === "submit" ? "Submit" : "Run"} · {formatTimestamp(s.timestamp)}
                    {typeof s.runtimeMs === "number" && ` · ${s.runtimeMs}ms`}
                  </p>
                </div>

                <span className="hidden sm:block shrink-0 text-xs text-forge-text-faint tabular-nums">
                  {s.passedTests}/{s.totalTests}
                </span>

                <Badge variant={VERDICT_BADGE[s.verdict]} className="shrink-0">
                  {s.verdict}
                </Badge>
              </Link>
            );
          })}
          {filtered.length === 0 && (
            <p className="text-center text-sm text-forge-text-faint py-12">No submissions match this filter.</p>
          )}
        </div>
      )}
    </div>
  );
}
