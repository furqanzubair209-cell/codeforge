import { CheckCircle2, XCircle, AlertTriangle, Clock, Ban } from "lucide-react";
import type { ExecutionResponse } from "@/lib/executionClient";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const VERDICT_META: Record<
  ExecutionResponse["verdict"],
  { icon: typeof CheckCircle2; className: string; label: string }
> = {
  Accepted: { icon: CheckCircle2, className: "text-signal-success", label: "Accepted" },
  "Wrong Answer": { icon: XCircle, className: "text-signal-danger", label: "Wrong Answer" },
  "Compilation Error": { icon: Ban, className: "text-signal-danger", label: "Compilation Error" },
  "Runtime Error": { icon: AlertTriangle, className: "text-signal-warning", label: "Runtime Error" },
  "Time Limit Exceeded": { icon: Clock, className: "text-signal-warning", label: "Time Limit Exceeded" },
};

export function VerdictBanner({ result }: { result: ExecutionResponse }) {
  const meta = VERDICT_META[result.verdict];
  const Icon = meta.icon;

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border px-4 py-3",
        result.verdict === "Accepted"
          ? "border-signal-success/30 bg-signal-success/10"
          : "border-signal-danger/25 bg-signal-danger/8"
      )}
    >
      <Icon className={cn("h-5 w-5 shrink-0", meta.className)} />
      <div className="min-w-0 flex-1">
        <p className={cn("font-display font-semibold text-sm", meta.className)}>{meta.label}</p>
        <p className="text-xs text-forge-text-faint mt-0.5">
          {result.passedTests}/{result.totalTests} tests passed
          {typeof result.runtimeMs === "number" && ` · ${result.runtimeMs}ms`}
        </p>
      </div>
    </div>
  );
}

export function ResultPanel({ result }: { result: ExecutionResponse }) {
  return (
    <div className="flex flex-col gap-3">
      <VerdictBanner result={result} />

      {result.compileError && (
        <pre className="rounded-lg border border-signal-danger/25 bg-forge-bg-soft p-3 text-xs text-signal-danger overflow-x-auto whitespace-pre-wrap font-mono">
          {result.compileError}
        </pre>
      )}

      {result.runtimeError && !result.compileError && (
        <pre className="rounded-lg border border-signal-warning/25 bg-forge-bg-soft p-3 text-xs text-signal-warning overflow-x-auto whitespace-pre-wrap font-mono">
          {result.runtimeError}
        </pre>
      )}

      {result.tests.length > 0 && (
        <div className="flex flex-col gap-2">
          {result.tests.map((t, i) => (
            <div
              key={i}
              className={cn(
                "rounded-lg border px-3 py-2.5",
                t.passed ? "border-forge-border bg-forge-surface" : "border-signal-danger/25 bg-signal-danger/8"
              )}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-forge-text-dim">
                  {t.hidden ? `Hidden test ${i + 1}` : `Test case ${i + 1}`}
                </span>
                <Badge variant={t.passed ? "success" : "danger"}>{t.passed ? "Passed" : "Failed"}</Badge>
              </div>
              {!t.hidden && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                  <TestField label="Input" value={t.input} />
                  <TestField label="Expected" value={t.expected} />
                  <TestField label="Your output" value={t.actual} error={!t.passed} />
                  {!t.passed && t.stderr && (
                    <TestField label="Stderr" value={t.stderr} error className="sm:col-span-3" />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TestField({
  label,
  value,
  error,
  className,
}: {
  label: string;
  value: string;
  error?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <p className="text-forge-text-faint mb-0.5">{label}</p>
      <pre
        className={cn(
          "rounded-md bg-forge-bg-soft border border-forge-border px-2 py-1.5 overflow-x-auto whitespace-pre-wrap break-words",
          error ? "text-signal-danger" : "text-forge-text-dim"
        )}
      >
        {value || "—"}
      </pre>
    </div>
  );
}
