import type { PublicProblem } from "@/types/problem";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/** Renders inline `code` spans in otherwise plain problem text without pulling in a markdown lib. */
function InlineText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code key={i} className="rounded bg-forge-surface-hover px-1.5 py-0.5 text-[0.85em] font-mono text-ember">
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function ProblemStatement({ problem }: { problem: PublicProblem }) {
  const paragraphs = problem.statement.split("\n\n");

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h1 className="font-display text-xl sm:text-2xl font-bold text-forge-text">{problem.title}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={difficultyVariant(problem.difficulty)}>{problem.difficulty}</Badge>
          <Badge variant="outline">{problem.topic}</Badge>
          {problem.tags.map((tag) => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 text-sm text-forge-text-dim leading-relaxed">
        {paragraphs.map((p, i) => (
          <p key={i}>
            <InlineText text={p} />
          </p>
        ))}
      </div>

      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-forge-text-faint mb-1.5">
            Input format
          </h3>
          <p className="text-sm text-forge-text-dim whitespace-pre-line">{problem.inputFormat}</p>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-forge-text-faint mb-1.5">
            Output format
          </h3>
          <p className="text-sm text-forge-text-dim whitespace-pre-line">{problem.outputFormat}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-forge-text-faint mb-1.5">Constraints</h3>
        <ul className="list-disc list-inside text-sm text-forge-text-dim space-y-0.5">
          {problem.constraints.map((c, i) => (
            <li key={i} className="font-mono text-xs">
              {c}
            </li>
          ))}
        </ul>
      </div>

      <Separator />

      <div className="flex flex-col gap-4">
        {problem.examples.map((ex, i) => (
          <div key={i}>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-forge-text-faint mb-1.5">
              Example {i + 1}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-forge-text-faint mb-1">Input</p>
                <pre className="rounded-md bg-forge-bg-soft border border-forge-border px-2.5 py-2 text-xs font-mono text-forge-text-dim overflow-x-auto whitespace-pre-wrap">
                  {ex.input}
                </pre>
              </div>
              <div>
                <p className="text-xs text-forge-text-faint mb-1">Output</p>
                <pre className="rounded-md bg-forge-bg-soft border border-forge-border px-2.5 py-2 text-xs font-mono text-forge-text-dim overflow-x-auto whitespace-pre-wrap">
                  {ex.output}
                </pre>
              </div>
            </div>
            {ex.explanation && (
              <p className="mt-1.5 text-xs text-forge-text-faint italic">{ex.explanation}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-forge-text-faint">
        <span>Time limit: {problem.timeLimitMs}ms</span>
        <span>·</span>
        <span>Memory limit: {problem.memoryLimitMb}MB</span>
      </div>
    </div>
  );
}
