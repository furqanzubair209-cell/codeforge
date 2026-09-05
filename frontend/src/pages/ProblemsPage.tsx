import { useState } from "react";
import { allProblems } from "@/data/problems";
import { ProblemRow } from "@/components/problem/ProblemRow";
import { FilterBar, type ProblemFilters } from "@/components/problem/FilterBar";
import { useFilteredProblems } from "@/hooks/useFilteredProblems";
import { useCodeforgeStore } from "@/store/useCodeforgeStore";
import { Progress } from "@/components/ui/progress";

export default function ProblemsPage() {
  const [filters, setFilters] = useState<ProblemFilters>({
    search: "",
    topic: "all",
    difficulty: "all",
    status: "all",
  });

  const statsFn = useCodeforgeStore((s) => s.stats);
  const stats = statsFn();
  const filtered = useFilteredProblems(allProblems, filters);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12 w-full">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-forge-text">All problems</h1>
          <p className="mt-1 text-forge-text-dim text-sm sm:text-base">
            {allProblems.length} problems across 9 topics.
          </p>
        </div>
        <div className="flex items-center gap-3 sm:min-w-[180px]">
          <Progress value={stats.solvedCount} max={stats.totalCount} className="flex-1" />
          <span className="text-xs font-medium text-forge-text-faint whitespace-nowrap tabular-nums">
            {stats.solvedCount}/{stats.totalCount}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <FilterBar filters={filters} onChange={setFilters} />
      </div>

      <p className="mb-3 text-xs text-forge-text-faint">
        {filtered.length} {filtered.length === 1 ? "problem" : "problems"}
      </p>

      <div className="flex flex-col gap-2">
        {filtered.map((p, i) => (
          <ProblemRow key={p.id} problem={p} index={i} />
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-forge-text-faint py-12">No problems match your filters.</p>
        )}
      </div>
    </div>
  );
}
