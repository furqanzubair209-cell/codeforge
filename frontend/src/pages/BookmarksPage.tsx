import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { allProblems } from "@/data/problems";
import { ProblemRow } from "@/components/problem/ProblemRow";
import { FilterBar, type ProblemFilters } from "@/components/problem/FilterBar";
import { useFilteredProblems } from "@/hooks/useFilteredProblems";
import { useCodeforgeStore } from "@/store/useCodeforgeStore";
import { Button } from "@/components/ui/button";

export default function BookmarksPage() {
  const bookmarks = useCodeforgeStore((s) => s.bookmarks);

  const [filters, setFilters] = useState<ProblemFilters>({
    search: "",
    topic: "all",
    difficulty: "all",
    status: "all",
  });

  const bookmarkedProblems = useMemo(
    () => allProblems.filter((p) => bookmarks.includes(p.id)),
    [bookmarks]
  );
  const filtered = useFilteredProblems(bookmarkedProblems, filters);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12 w-full">
      <div className="mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-forge-text">Bookmarks</h1>
        <p className="mt-1 text-forge-text-dim text-sm sm:text-base">
          {bookmarkedProblems.length === 0
            ? "Problems you've bookmarked will show up here."
            : `${bookmarkedProblems.length} bookmarked ${bookmarkedProblems.length === 1 ? "problem" : "problems"}.`}
        </p>
      </div>

      {bookmarkedProblems.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-forge-border py-16 px-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-forge-border bg-forge-surface">
            <Bookmark className="h-5 w-5 text-forge-text-faint" />
          </div>
          <p className="text-sm text-forge-text-dim max-w-xs">
            Tap the bookmark icon on any problem to save it here for later.
          </p>
          <Link to="/problems">
            <Button variant="secondary" size="sm" className="mt-1">
              Browse problems
            </Button>
          </Link>
        </div>
      ) : (
        <>
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
              <p className="text-center text-sm text-forge-text-faint py-12">No bookmarks match your filters.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
