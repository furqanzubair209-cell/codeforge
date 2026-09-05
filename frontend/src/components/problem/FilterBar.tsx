import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Topic, Difficulty } from "@/types/problem";
import { topics } from "@/data/problems";

export type StatusFilter = "all" | "solved" | "unsolved" | "bookmarked";

export interface ProblemFilters {
  search: string;
  topic: Topic | "all";
  difficulty: Difficulty | "all";
  status: StatusFilter;
}

export function FilterBar({
  filters,
  onChange,
  hideTopic = false,
}: {
  filters: ProblemFilters;
  onChange: (filters: ProblemFilters) => void;
  hideTopic?: boolean;
}) {
  const hasActiveFilters =
    filters.search !== "" || filters.topic !== "all" || filters.difficulty !== "all" || filters.status !== "all";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-forge-text-faint" />
        <Input
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search problems or tags..."
          className="pl-9"
          aria-label="Search problems"
        />
      </div>

      {!hideTopic && (
        <Select
          value={filters.topic}
          onChange={(e) => onChange({ ...filters, topic: e.target.value as Topic | "all" })}
          aria-label="Filter by topic"
          className="w-full sm:w-auto"
        >
          <option value="all">All topics</option>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      )}

      <Select
        value={filters.difficulty}
        onChange={(e) => onChange({ ...filters, difficulty: e.target.value as Difficulty | "all" })}
        aria-label="Filter by difficulty"
        className="w-full sm:w-auto"
      >
        <option value="all">All difficulties</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </Select>

      <Select
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value as StatusFilter })}
        aria-label="Filter by status"
        className="w-full sm:w-auto"
      >
        <option value="all">All status</option>
        <option value="solved">Solved</option>
        <option value="unsolved">Unsolved</option>
        <option value="bookmarked">Bookmarked</option>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange({ search: "", topic: "all", difficulty: "all", status: "all" })}
        >
          <X className="h-3.5 w-3.5" />
          Clear
        </Button>
      )}
    </div>
  );
}
