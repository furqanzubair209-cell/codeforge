import { create } from "zustand";
import { storage, todayIso, type StreakData, type Preferences, type Achievement } from "../lib/storage";
import type { SubmissionResult, PublicProblem } from "../types/problem";
import { allProblems } from "../data/problems";
import { ACHIEVEMENT_DEFS } from "../lib/achievements";

interface CodeforgeState {
  solved: Record<string, number>; // problemId -> timestamp
  bookmarks: string[];
  streak: StreakData;
  submissions: SubmissionResult[];
  achievements: Achievement[];
  preferences: Preferences;

  toggleBookmark: (problemId: string) => void;
  isBookmarked: (problemId: string) => boolean;

  recordSubmission: (result: SubmissionResult) => void;
  markSolved: (problemId: string) => void;
  isSolved: (problemId: string) => boolean;

  setTheme: (theme: "dark" | "light") => void;
  setFontSize: (size: number) => void;

  newlyUnlocked: Achievement[];
  clearNewlyUnlocked: () => void;

  stats: () => {
    solvedCount: number;
    totalCount: number;
    acceptanceRate: number;
    topicProgress: { topic: string; solved: number; total: number }[];
  };
}

function computeTopicCounts(solved: Record<string, number>): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const p of allProblems) {
    if (solved[p.id]) counts[p.topic] = (counts[p.topic] ?? 0) + 1;
  }
  return counts;
}

export const useCodeforgeStore = create<CodeforgeState>((set, get) => ({
  solved: storage.getSolved(),
  bookmarks: storage.getBookmarks(),
  streak: storage.getStreak(),
  submissions: storage.getSubmissions(),
  achievements: storage.getAchievements(),
  preferences: storage.getPreferences(),
  newlyUnlocked: [],

  toggleBookmark: (problemId) => {
    const current = get().bookmarks;
    const next = current.includes(problemId)
      ? current.filter((id) => id !== problemId)
      : [...current, problemId];
    storage.setBookmarks(next);
    set({ bookmarks: next });
  },

  isBookmarked: (problemId) => get().bookmarks.includes(problemId),

  recordSubmission: (result) => {
    const next = [result, ...get().submissions].slice(0, 500);
    storage.setSubmissions(next);
    set({ submissions: next });

    if (result.mode === "submit" && result.verdict === "Accepted") {
      get().markSolved(result.problemId);
    }
  },

  markSolved: (problemId) => {
    const solved = { ...get().solved };
    const alreadySolved = !!solved[problemId];
    if (!alreadySolved) {
      solved[problemId] = Date.now();
      storage.setSolved(solved);
      set({ solved });
    }

    // Update streak
    const today = todayIso();
    const streak = { ...get().streak };
    if (streak.lastSolvedDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      if (streak.lastSolvedDate === yesterday) {
        streak.current += 1;
      } else {
        streak.current = 1;
      }
      streak.longest = Math.max(streak.longest, streak.current);
      streak.lastSolvedDate = today;
      streak.solvedDates = [...new Set([...streak.solvedDates, today])];
      storage.setStreak(streak);
      set({ streak });
    }

    // Check achievements
    const topicCounts = computeTopicCounts(get().solved);
    const solvedCount = Object.keys(get().solved).length;
    const existingIds = new Set(get().achievements.map((a) => a.id));
    const unlockedNow: Achievement[] = [];

    for (const def of ACHIEVEMENT_DEFS) {
      if (!existingIds.has(def.id) && def.check({ solvedCount, streak: get().streak.current, topicCounts })) {
        unlockedNow.push({ id: def.id, title: def.title, description: def.description, unlockedAt: Date.now() });
      }
    }

    if (unlockedNow.length > 0) {
      const next = [...get().achievements, ...unlockedNow];
      storage.setAchievements(next);
      set({ achievements: next, newlyUnlocked: [...get().newlyUnlocked, ...unlockedNow] });
    }
  },

  isSolved: (problemId) => !!get().solved[problemId],

  setTheme: (theme) => {
    const prefs = { ...get().preferences, theme };
    storage.setPreferences(prefs);
    set({ preferences: prefs });
  },

  setFontSize: (fontSize) => {
    const prefs = { ...get().preferences, fontSize };
    storage.setPreferences(prefs);
    set({ preferences: prefs });
  },

  clearNewlyUnlocked: () => set({ newlyUnlocked: [] }),

  stats: () => {
    const solved = get().solved;
    const solvedCount = Object.keys(solved).length;
    const totalCount = allProblems.length;
    const submissions = get().submissions;
    const submitAttempts = submissions.filter((s) => s.mode === "submit");
    const accepted = submitAttempts.filter((s) => s.verdict === "Accepted").length;
    const acceptanceRate = submitAttempts.length > 0 ? Math.round((accepted / submitAttempts.length) * 100) : 0;

    const topicMap: Record<string, { solved: number; total: number }> = {};
    for (const p of allProblems) {
      if (!topicMap[p.topic]) topicMap[p.topic] = { solved: 0, total: 0 };
      topicMap[p.topic].total += 1;
      if (solved[p.id]) topicMap[p.topic].solved += 1;
    }

    return {
      solvedCount,
      totalCount,
      acceptanceRate,
      topicProgress: Object.entries(topicMap).map(([topic, v]) => ({ topic, ...v })),
    };
  },
}));

export function getProblemDifficultyLabel(p: PublicProblem) {
  return p.difficulty;
}
