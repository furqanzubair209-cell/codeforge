import { Link } from "react-router-dom";
import { CheckCircle2, Bookmark, Circle } from "lucide-react";
import type { PublicProblem } from "@/types/problem";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { useCodeforgeStore } from "@/store/useCodeforgeStore";
import { cn } from "@/lib/utils";

export function ProblemRow({ problem, index }: { problem: PublicProblem; index?: number }) {
  const solved = useCodeforgeStore((s) => s.isSolved(problem.id));
  const bookmarked = useCodeforgeStore((s) => s.isBookmarked(problem.id));
  const toggleBookmark = useCodeforgeStore((s) => s.toggleBookmark);

  return (
    <Link
      to={`/problems/${problem.slug}`}
      className={cn(
        "group flex items-center gap-3 rounded-lg border border-forge-border bg-forge-surface px-3 sm:px-4 py-3",
        "hover:border-forge-border-hover hover:bg-forge-surface-hover transition-colors"
      )}
    >
      <div className="shrink-0 text-forge-text-faint">
        {solved ? (
          <CheckCircle2 className="h-5 w-5 text-signal-success" />
        ) : (
          <Circle className="h-5 w-5" />
        )}
      </div>

      {typeof index === "number" && (
        <span className="hidden sm:block w-6 shrink-0 text-right text-xs text-forge-text-faint tabular-nums">
          {index + 1}
        </span>
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-sm text-forge-text group-hover:text-ember transition-colors">
          {problem.title}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <Badge variant="outline" className="hidden sm:inline-flex">
            {problem.topic}
          </Badge>
          {problem.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="hidden md:inline text-xs text-forge-text-faint">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <Badge variant={difficultyVariant(problem.difficulty)} className="shrink-0">
        {problem.difficulty}
      </Badge>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggleBookmark(problem.id);
        }}
        className="shrink-0 rounded-md p-1.5 text-forge-text-faint hover:text-ember hover:bg-forge-surface-hover transition-colors"
        aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
      >
        <Bookmark className={cn("h-4 w-4", bookmarked && "fill-ember text-ember")} />
      </button>
    </Link>
  );
}
