export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  check: (ctx: { solvedCount: number; streak: number; topicCounts: Record<string, number> }) => boolean;
}

export const ACHIEVEMENT_DEFS: AchievementDef[] = [
  {
    id: "first-blood",
    title: "First Blood",
    description: "Solve your first problem.",
    check: ({ solvedCount }) => solvedCount >= 1,
  },
  {
    id: "getting-warm",
    title: "Getting Warm",
    description: "Solve 5 problems.",
    check: ({ solvedCount }) => solvedCount >= 5,
  },
  {
    id: "in-the-forge",
    title: "In the Forge",
    description: "Solve 15 problems.",
    check: ({ solvedCount }) => solvedCount >= 15,
  },
  {
    id: "tempered-steel",
    title: "Tempered Steel",
    description: "Solve 30 problems.",
    check: ({ solvedCount }) => solvedCount >= 30,
  },
  {
    id: "master-smith",
    title: "Master Smith",
    description: "Solve all 45 problems.",
    check: ({ solvedCount }) => solvedCount >= 45,
  },
  {
    id: "three-day-streak",
    title: "Stoking the Fire",
    description: "Reach a 3-day solving streak.",
    check: ({ streak }) => streak >= 3,
  },
  {
    id: "seven-day-streak",
    title: "Unquenchable",
    description: "Reach a 7-day solving streak.",
    check: ({ streak }) => streak >= 7,
  },
  {
    id: "array-adept",
    title: "Array Adept",
    description: "Solve every Arrays problem.",
    check: ({ topicCounts }) => (topicCounts["Arrays"] ?? 0) >= 5,
  },
  {
    id: "graph-theorist",
    title: "Graph Theorist",
    description: "Solve every Graphs problem.",
    check: ({ topicCounts }) => (topicCounts["Graphs"] ?? 0) >= 5,
  },
  {
    id: "heap-handler",
    title: "Heap Handler",
    description: "Solve every Heap problem.",
    check: ({ topicCounts }) => (topicCounts["Heap"] ?? 0) >= 5,
  },
];
