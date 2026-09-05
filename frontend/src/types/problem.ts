export type Difficulty = "Easy" | "Medium" | "Hard";

export type Topic =
  | "Arrays"
  | "Linked List"
  | "Stack"
  | "Queue"
  | "Searching"
  | "Sorting"
  | "Trees"
  | "Heap"
  | "Graphs";

export interface TestCase {
  input: string;
  output: string;
  explanation?: string;
}

/** Full problem record including hidden tests. Content source and execution-service only, never bundled into the frontend. */
export interface Problem {
  id: string;
  slug: string;
  title: string;
  topic: Topic;
  difficulty: Difficulty;
  tags: string[];
  statement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  examples: TestCase[];
  hiddenTests: TestCase[];
  starterCode: string;
  hints: string[];
  timeLimitMs: number;
  memoryLimitMb: number;
}

/** What actually ships to the browser: everything except hiddenTests. */
export type PublicProblem = Omit<Problem, "hiddenTests">;

export interface SubmissionResult {
  id: string;
  problemId: string;
  code: string;
  verdict:
    | "Accepted"
    | "Wrong Answer"
    | "Compilation Error"
    | "Runtime Error"
    | "Time Limit Exceeded"
    | "Pending";
  passedTests: number;
  totalTests: number;
  runtimeMs?: number;
  errorMessage?: string;
  timestamp: number;
  mode: "run" | "submit";
}
