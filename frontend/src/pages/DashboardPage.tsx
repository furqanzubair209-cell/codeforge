import { useMemo } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Flame, Percent, Bookmark, Trophy, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip } from "@/components/ui/tooltip";
import { useCodeforgeStore } from "@/store/useCodeforgeStore";
import { ACHIEVEMENT_DEFS } from "@/lib/achievements";
import { TOPIC_ICONS, TOPIC_SLUGS } from "@/lib/topicMeta";
import type { Topic } from "@/types/problem";
import { cn } from "@/lib/utils";

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof CheckCircle2;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <Card className="p-4 sm:p-5">
      <div className="flex items-center gap-2 text-forge-text-faint">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-2 font-display text-2xl sm:text-3xl font-bold text-forge-text tabular-nums">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-forge-text-faint">{sub}</p>}
    </Card>
  );
}

function WeekStrip({ solvedDates }: { solvedDates: string[] }) {
  const days = useMemo(() => {
    const set = new Set(solvedDates);
    const now = Date.now();
    const result: { label: string; solved: boolean; isToday: boolean }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now - i * 86400000);
      const iso = d.toISOString().slice(0, 10);
      result.push({
        label: d.toLocaleDateString(undefined, { weekday: "narrow" }),
        solved: set.has(iso),
        isToday: i === 0,
      });
    }
    return result;
  }, [solvedDates]);

  return (
    <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
      {days.map((day, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5">
          <span className="text-[10px] font-medium text-forge-text-faint">{day.label}</span>
          <div
            className={cn(
              "h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 rounded-md border flex items-center justify-center",
              day.solved
                ? "bg-ember border-ember/50"
                : "border-forge-border bg-forge-surface-hover",
              day.isToday && !day.solved && "border-ember/40"
            )}
          >
            {day.solved && <Flame className="h-3.5 w-3.5 text-[#1B1305]" />}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const statsFn = useCodeforgeStore((s) => s.stats);
  const stats = statsFn();
  const streak = useCodeforgeStore((s) => s.streak);
  const bookmarks = useCodeforgeStore((s) => s.bookmarks);
  const achievements = useCodeforgeStore((s) => s.achievements);

  const unlockedIds = useMemo(() => new Set(achievements.map((a) => a.id)), [achievements]);
  const unlockedById = useMemo(() => new Map(achievements.map((a) => [a.id, a])), [achievements]);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12 w-full">
      <div className="mb-6 sm:mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-forge-text">Dashboard</h1>
        <p className="mt-1 text-forge-text-dim text-sm sm:text-base">
          Your progress, streaks, and achievements — all stored locally in this browser.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <StatCard
          icon={CheckCircle2}
          label="Solved"
          value={`${stats.solvedCount}/${stats.totalCount}`}
          sub={`${Math.round((stats.solvedCount / Math.max(stats.totalCount, 1)) * 100)}% complete`}
        />
        <StatCard
          icon={Flame}
          label="Streak"
          value={`${streak.current}`}
          sub={`Best: ${streak.longest} ${streak.longest === 1 ? "day" : "days"}`}
        />
        <StatCard icon={Percent} label="Acceptance" value={`${stats.acceptanceRate}%`} sub="of submit attempts" />
        <Link to="/bookmarks">
          <StatCard icon={Bookmark} label="Bookmarks" value={`${bookmarks.length}`} sub="saved problems" />
        </Link>
      </div>

      {/* Week strip */}
      <Card className="p-4 sm:p-5 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-display font-semibold text-sm sm:text-base text-forge-text">This week</h2>
            <p className="mt-0.5 text-xs text-forge-text-faint">Days you solved at least one problem.</p>
          </div>
          <WeekStrip solvedDates={streak.solvedDates} />
        </div>
      </Card>

      {/* Topic progress */}
      <div className="mb-6 sm:mb-8">
        <h2 className="font-display text-lg sm:text-xl font-semibold text-forge-text mb-4">Topic progress</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {stats.topicProgress.map((t) => {
            const Icon = TOPIC_ICONS[t.topic as Topic];
            return (
              <Link key={t.topic} to={`/topics/${TOPIC_SLUGS[t.topic as Topic]}`}>
                <Card className="p-4 hover:border-ember/50 hover:bg-forge-surface-hover transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {Icon && <Icon className="h-4 w-4 text-ember shrink-0" />}
                      <span className="text-sm font-medium text-forge-text truncate">{t.topic}</span>
                    </div>
                    <span className="text-xs font-medium text-forge-text-faint tabular-nums shrink-0">
                      {t.solved}/{t.total}
                    </span>
                  </div>
                  <Progress value={t.solved} max={t.total} />
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg sm:text-xl font-semibold text-forge-text">Achievements</h2>
          <span className="text-xs font-medium text-forge-text-faint tabular-nums">
            {achievements.length}/{ACHIEVEMENT_DEFS.length}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {ACHIEVEMENT_DEFS.map((def) => {
            const unlocked = unlockedIds.has(def.id);
            const record = unlockedById.get(def.id);
            return (
              <Tooltip
                key={def.id}
                content={
                  unlocked && record
                    ? `Unlocked ${new Date(record.unlockedAt).toLocaleDateString()}`
                    : "Not unlocked yet"
                }
              >
                <Card
                  className={cn(
                    "p-4 flex flex-col items-center text-center gap-2 w-full",
                    !unlocked && "opacity-50"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border",
                      unlocked ? "border-ember/40 bg-ember/10" : "border-forge-border bg-forge-surface-hover"
                    )}
                  >
                    {unlocked ? (
                      <Trophy className="h-5 w-5 text-ember" />
                    ) : (
                      <Lock className="h-4 w-4 text-forge-text-faint" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-forge-text leading-snug">{def.title}</p>
                    <p className="mt-0.5 text-[11px] text-forge-text-faint leading-snug">{def.description}</p>
                  </div>
                </Card>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </div>
  );
}
