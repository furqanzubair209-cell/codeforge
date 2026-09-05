import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { getProblemsByTopic, topicDescriptions } from "@/data/problems";
import type { Topic } from "@/types/problem";
import { SLUG_TO_TOPIC, TOPIC_ICONS } from "@/lib/topicMeta";
import { ProblemRow } from "@/components/problem/ProblemRow";
import { FilterBar, type ProblemFilters } from "@/components/problem/FilterBar";
import { useFilteredProblems } from "@/hooks/useFilteredProblems";
import { useCodeforgeStore } from "@/store/useCodeforgeStore";
import { Progress } from "@/components/ui/progress";

export default function TopicDetailPage() {
  const { topic: topicSlug } = useParams<{ topic: string }>();
  const topic = topicSlug ? SLUG_TO_TOPIC[topicSlug] : undefined;

  if (!topic) return <Navigate to="/topics" replace />;

  return <TopicDetail key={topic} topic={topic} />;
}

function TopicDetail({ topic }: { topic: Topic }) {
  const [filters, setFilters] = useState<ProblemFilters>({
    search: "",
    topic: "all",
    difficulty: "all",
    status: "all",
  });

  const solved = useCodeforgeStore((s) => s.solved);

  const problems = getProblemsByTopic(topic);
  const filtered = useFilteredProblems(problems, filters);
  const Icon = TOPIC_ICONS[topic];
  const solvedCount = problems.filter((p) => solved[p.id]).length;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12 w-full">
      <Link
        to="/topics"
        className="inline-flex items-center gap-1 text-sm text-forge-text-dim hover:text-forge-text mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        All topics
      </Link>

      <div className="flex items-start gap-4 mb-6">
        <div className="rounded-xl border border-forge-border bg-forge-surface p-3 shrink-0">
          <Icon className="h-7 w-7 text-ember" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-forge-text">{topic}</h1>
          <p className="mt-1 text-forge-text-dim text-sm sm:text-base">{topicDescriptions[topic]}</p>
          <div className="mt-3 flex items-center gap-3">
            <Progress value={solvedCount} max={problems.length} className="max-w-xs" />
            <span className="text-xs font-medium text-forge-text-faint whitespace-nowrap">
              {solvedCount}/{problems.length} solved
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <FilterBar filters={filters} onChange={setFilters} hideTopic />
      </div>

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
