import type { PublicProblem, Topic } from "../types/problem";
import generated from "./generated/problems-public.json";

export const allProblems = generated.problems as PublicProblem[];
export const topics = generated.topics as Topic[];
export const topicDescriptions = generated.topicDescriptions as Record<Topic, string>;

export function getProblemBySlug(slug: string): PublicProblem | undefined {
  return allProblems.find((p) => p.slug === slug);
}

export function getProblemsByTopic(topic: Topic): PublicProblem[] {
  return allProblems.filter((p) => p.topic === topic);
}
