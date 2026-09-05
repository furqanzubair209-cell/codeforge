import type { SubmissionResult } from "../types/problem";

const NS = "codeforge";

function key(name: string) {
  return `${NS}:${name}`;
}

function safeGet<T>(name: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key(name));
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeSet<T>(name: string, value: T): void {
  try {
    localStorage.setItem(key(name), JSON.stringify(value));
  } catch {
    // localStorage unavailable or quota exceeded, fail silently and keep working in-memory
  }
}

export interface StreakData {
  current: number;
  longest: number;
  lastSolvedDate: string | null; // ISO date (yyyy-mm-dd)
  solvedDates: string[];
}

export interface Preferences {
  theme: "dark" | "light";
  fontSize: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: number;
}

const DEFAULT_STREAK: StreakData = { current: 0, longest: 0, lastSolvedDate: null, solvedDates: [] };
const DEFAULT_PREFS: Preferences = { theme: "dark", fontSize: 14 };

export const storage = {
  getSolved(): Record<string, number> {
    return safeGet("solved", {} as Record<string, number>);
  },
  setSolved(v: Record<string, number>) {
    safeSet("solved", v);
  },

  getBookmarks(): string[] {
    return safeGet("bookmarks", [] as string[]);
  },
  setBookmarks(v: string[]) {
    safeSet("bookmarks", v);
  },

  getStreak(): StreakData {
    return safeGet("streak", DEFAULT_STREAK);
  },
  setStreak(v: StreakData) {
    safeSet("streak", v);
  },

  getSubmissions(): SubmissionResult[] {
    return safeGet("submissions", [] as SubmissionResult[]);
  },
  setSubmissions(v: SubmissionResult[]) {
    safeSet("submissions", v);
  },

  getAchievements(): Achievement[] {
    return safeGet("achievements", [] as Achievement[]);
  },
  setAchievements(v: Achievement[]) {
    safeSet("achievements", v);
  },

  getCode(problemId: string, fallback: string): string {
    return safeGet(`code:${problemId}`, fallback);
  },
  setCode(problemId: string, code: string) {
    safeSet(`code:${problemId}`, code);
  },

  getPreferences(): Preferences {
    return safeGet("preferences", DEFAULT_PREFS);
  },
  setPreferences(v: Preferences) {
    safeSet("preferences", v);
  },
};

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}
