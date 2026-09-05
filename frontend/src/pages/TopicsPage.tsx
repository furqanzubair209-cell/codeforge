import { Link } from "react-router-dom";
import { topics, topicDescriptions, allProblems } from "@/data/problems";
import { TOPIC_ICONS, TOPIC_SLUGS } from "@/lib/topicMeta";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCodeforgeStore } from "@/store/useCodeforgeStore";

export default function TopicsPage() {
  const statsFn = useCodeforgeStore((s) => s.stats);
  const stats = statsFn();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14 w-full">
      <div className="max-w-2xl mb-8 sm:mb-10">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-forge-text">Topics</h1>
        <p className="mt-2 text-forge-text-dim">
          Nine core DSA topics, {allProblems.length} problems total. Work through one at a time or jump around.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => {
          const Icon = TOPIC_ICONS[topic];
          const total = allProblems.filter((p) => p.topic === topic).length;
          const solved = stats.topicProgress.find((t) => t.topic === topic)?.solved ?? 0;
          return (
            <Link key={topic} to={`/topics/${TOPIC_SLUGS[topic]}`}>
              <Card className="h-full p-5 hover:border-ember/50 hover:bg-forge-surface-hover transition-colors">
                <div className="flex items-start justify-between">
                  <Icon className="h-7 w-7 text-ember" />
                  <span className="text-xs font-semibold text-forge-text-faint tabular-nums">
                    {solved}/{total}
                  </span>
                </div>
                <h2 className="mt-4 font-display font-semibold text-lg text-forge-text">{topic}</h2>
                <p className="mt-1.5 text-sm text-forge-text-dim leading-relaxed">{topicDescriptions[topic]}</p>
                <Progress value={solved} max={total} className="mt-4" />
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
