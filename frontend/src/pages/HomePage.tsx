import { Link } from "react-router-dom";
import { ArrowRight, Terminal, Gauge, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { allProblems, topics, topicDescriptions } from "@/data/problems";
import { TOPIC_ICONS, TOPIC_SLUGS } from "@/lib/topicMeta";
import { useCodeforgeStore } from "@/store/useCodeforgeStore";

export default function HomePage() {
  const statsFn = useCodeforgeStore((s) => s.stats);
  const stats = statsFn();

  return (
    <div className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden bg-forge-grid-fade border-b border-forge-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-forge-border bg-forge-surface/80 px-3 py-1 text-xs font-medium text-forge-text-dim">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-success animate-ember" />
              Real g++ compilation, sandboxed
            </div>

            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-forge-text">
              Sharpen your C++
              <br />
              on the <span className="text-ember">anvil</span>.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-forge-text-dim leading-relaxed">
              {allProblems.length} hand-forged data structures &amp; algorithms problems. Write real C++,
              compile it for real, and watch your streak grow — no account, no server-side tracking, just
              your browser and the grind.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/problems">
                <Button size="lg" className="w-full sm:w-auto">
                  Start solving
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/topics">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Browse by topic
                </Button>
              </Link>
            </div>

            {stats.solvedCount > 0 && (
              <p className="mt-6 text-sm text-forge-text-faint">
                You've solved{" "}
                <span className="text-ember font-semibold">
                  {stats.solvedCount}/{stats.totalCount}
                </span>{" "}
                problems so far.{" "}
                <Link to="/dashboard" className="underline hover:text-forge-text">
                  View dashboard
                </Link>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FeatureCard
            icon={Terminal}
            title="Real compilation"
            description="Your code compiles and runs against real g++ in an isolated sandbox — no fake judging."
          />
          <FeatureCard
            icon={Gauge}
            title="Instant verdicts"
            description="Accepted, Wrong Answer, Compilation Error, Runtime Error, or TLE — with per-test detail."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Private by default"
            description="Progress, streaks, and submissions live only in your browser's local storage."
          />
        </div>
      </section>

      {/* Topics grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="flex items-end justify-between mb-5">
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-forge-text">Practice by topic</h2>
          <Link to="/topics" className="text-sm text-ember hover:underline hidden sm:block">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {topics.map((topic) => {
            const Icon = TOPIC_ICONS[topic];
            const count = allProblems.filter((p) => p.topic === topic).length;
            const solvedCount = stats.topicProgress.find((t) => t.topic === topic)?.solved ?? 0;
            return (
              <Link key={topic} to={`/topics/${TOPIC_SLUGS[topic]}`}>
                <Card className="h-full p-4 sm:p-5 hover:border-ember/50 hover:bg-forge-surface-hover transition-colors group">
                  <Icon className="h-6 w-6 text-ember mb-3" />
                  <p className="font-display font-semibold text-forge-text text-sm sm:text-base">{topic}</p>
                  <p className="mt-1 text-xs text-forge-text-faint line-clamp-2">{topicDescriptions[topic]}</p>
                  <p className="mt-3 text-xs font-medium text-forge-text-dim">
                    {solvedCount > 0 ? (
                      <span className="text-signal-success">{solvedCount}</span>
                    ) : (
                      count
                    )}
                    {solvedCount > 0 ? `/${count} solved` : ` problems`}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Terminal;
  title: string;
  description: string;
}) {
  return (
    <Card className="p-5">
      <Icon className="h-5 w-5 text-ember mb-3" />
      <h3 className="font-display font-semibold text-forge-text text-sm">{title}</h3>
      <p className="mt-1.5 text-sm text-forge-text-dim leading-relaxed">{description}</p>
    </Card>
  );
}
