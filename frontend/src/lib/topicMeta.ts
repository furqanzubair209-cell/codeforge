import {
  Rows3,
  Link2,
  Layers,
  ListOrdered,
  Search,
  ArrowDownWideNarrow,
  GitBranch,
  Triangle,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import type { Topic } from "@/types/problem";

export const TOPIC_ICONS: Record<Topic, LucideIcon> = {
  Arrays: Rows3,
  "Linked List": Link2,
  Stack: Layers,
  Queue: ListOrdered,
  Searching: Search,
  Sorting: ArrowDownWideNarrow,
  Trees: GitBranch,
  Heap: Triangle,
  Graphs: Waypoints,
};

export const TOPIC_SLUGS: Record<Topic, string> = {
  Arrays: "arrays",
  "Linked List": "linked-list",
  Stack: "stack",
  Queue: "queue",
  Searching: "searching",
  Sorting: "sorting",
  Trees: "trees",
  Heap: "heap",
  Graphs: "graphs",
};

export const SLUG_TO_TOPIC: Record<string, Topic> = Object.fromEntries(
  Object.entries(TOPIC_SLUGS).map(([topic, slug]) => [slug, topic as Topic])
) as Record<string, Topic>;
