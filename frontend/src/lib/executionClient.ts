import type { PublicProblem } from "../types/problem";

export interface TestOutcome {
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  hidden: boolean;
  stderr?: string;
}

export interface ExecutionResponse {
  verdict:
    | "Accepted"
    | "Wrong Answer"
    | "Compilation Error"
    | "Runtime Error"
    | "Time Limit Exceeded";
  passedTests: number;
  totalTests: number;
  runtimeMs?: number;
  compileError?: string;
  runtimeError?: string;
  tests: TestOutcome[];
}

const API_BASE = import.meta.env.VITE_EXECUTION_API_URL as string | undefined;

export function isExecutionServiceConfigured(): boolean {
  return !!API_BASE;
}

// posts code to the sandbox and runs it against either the sample tests (run)
// or the full hidden suite (submit), never runs anything locally in the browser
export async function executeCode(
  code: string,
  problem: PublicProblem,
  mode: "run" | "submit"
): Promise<ExecutionResponse> {
  if (!API_BASE) {
    throw new Error(
      "The C++ execution service isn't configured yet. Set VITE_EXECUTION_API_URL to your deployed execution-service URL (see the README) to enable Run and Submit."
    );
  }

  const endpoint = mode === "run" ? "/run" : "/submit";

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code,
      problemId: problem.id,
      timeLimitMs: problem.timeLimitMs,
      memoryLimitMb: problem.memoryLimitMb,
      // server re-validates against its own copy regardless, this is just for convenience
      tests: mode === "run" ? problem.examples : undefined,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Execution service returned ${res.status}: ${text || res.statusText}`);
  }

  return (await res.json()) as ExecutionResponse;
}
