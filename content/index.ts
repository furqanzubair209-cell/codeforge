import type { Problem, Topic } from "../frontend/src/types/problem";
import { arrayProblems } from "./arrays";
import { linkedListProblems } from "./linkedList";
import { stackProblems } from "./stack";
import { queueProblems } from "./queue";
import { searchingProblems } from "./searching";
import { sortingProblems } from "./sorting";
import { treeProblems } from "./trees";
import { heapProblems } from "./heap";
import { graphProblems } from "./graphs";

export const allProblems: Problem[] = [
  ...arrayProblems,
  ...linkedListProblems,
  ...stackProblems,
  ...queueProblems,
  ...searchingProblems,
  ...sortingProblems,
  ...treeProblems,
  ...heapProblems,
  ...graphProblems,
];

export const topics: Topic[] = [
  "Arrays",
  "Linked List",
  "Stack",
  "Queue",
  "Searching",
  "Sorting",
  "Trees",
  "Heap",
  "Graphs",
];

export const topicDescriptions: Record<Topic, string> = {
  Arrays: "Contiguous memory, prefix sums, two pointers, and the sliding window patterns that show up everywhere.",
  "Linked List": "Pointer manipulation, cycle detection, and in-place reversal without extra memory.",
  Stack: "LIFO structures for parsing, monotonic sequences, and expression evaluation.",
  Queue: "FIFO structures, circular buffers, and deque-based sliding window tricks.",
  Searching: "Binary search and its many disguises, from rotated arrays to partition search.",
  Sorting: "Classic sorting algorithms and the selection problems built on top of them.",
  Trees: "Traversals, recursion, and structural properties of binary trees and BSTs.",
  Heap: "Priority queues for top-k, streaming medians, and greedy merging problems.",
  Graphs: "BFS, DFS, connectivity, and shortest paths on weighted and unweighted graphs.",
};

export function getProblemBySlug(slug: string): Problem | undefined {
  return allProblems.find((p) => p.slug === slug);
}

export function getProblemsByTopic(topic: Topic): Problem[] {
  return allProblems.filter((p) => p.topic === topic);
}
