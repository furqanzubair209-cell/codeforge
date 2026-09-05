import { useMemo } from "react";
import type { PublicProblem } from "@/types/problem";
import type { ProblemFilters } from "@/components/problem/FilterBar";
import { useCodeforgeStore } from "@/store/useCodeforgeStore";

export function useFilteredProblems(problems: PublicProblem[], filters: ProblemFilters) {
  const solved = useCodeforgeStore((s) => s.solved);
  const bookmarks = useCodeforgeStore((s) => s.bookmarks);

  return useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return problems.filter((p) => {
      if (filters.topic !== "all" && p.topic !== filters.topic) return false;
      if (filters.difficulty !== "all" && p.difficulty !== filters.difficulty) return false;
      if (filters.status === "solved" && !solved[p.id]) return false;
      if (filters.status === "unsolved" && solved[p.id]) return false;
      if (filters.status === "bookmarked" && !bookmarks.includes(p.id)) return false;
      if (q) {
        const haystack = `${p.title} ${p.tags.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [problems, filters, solved, bookmarks]);
}
