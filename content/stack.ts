import type { Problem } from "../frontend/src/types/problem";

export const stackProblems: Problem[] = [
  {
    id: "stk-001",
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    topic: "Stack",
    difficulty: "Easy",
    tags: ["stack", "string"],
    statement:
      "Given a string containing just the characters `(`, `)`, `{`, `}`, `[`, `]`, determine if the input string is valid. Brackets must close in the correct order.",
    inputFormat: "A single line containing the string.",
    outputFormat: "Print \"true\" or \"false\".",
    constraints: ["1 <= length <= 10^4"],
    examples: [
      { input: "()[]{}", output: "true" },
      { input: "(]", output: "false" },
    ],
    hiddenTests: [
      { input: "([{}])", output: "true" },
      { input: "(", output: "false" },
      { input: "]", output: "false" },
      { input: "{[()]}", output: "true" },
      { input: "([)]", output: "false" },
      { input: "((((", output: "false" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n\n    // TODO: use a stack to check if brackets are balanced and correctly nested\n\n    return 0;\n}\n",
    hints: [
      "Push opening brackets onto a stack.",
      "On a closing bracket, check the top of the stack matches the corresponding opener, then pop.",
      "The string is valid only if the stack is empty at the end.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "stk-002",
    slug: "min-stack",
    title: "Min Stack",
    topic: "Stack",
    difficulty: "Medium",
    tags: ["stack", "design"],
    statement:
      "Design a stack that supports push, pop, top, and retrieving the minimum element, all in O(1) time. You'll process a sequence of operations from stdin.",
    inputFormat:
      "First line: q (number of operations).\nEach of the next q lines is one of:\n`PUSH x`, `POP`, `TOP`, `GETMIN`.",
    outputFormat: "For each TOP or GETMIN operation, print the result on its own line.",
    constraints: ["1 <= q <= 10^4", "Operations are always valid (no POP/TOP/GETMIN on an empty stack)."],
    examples: [
      {
        input: "6\nPUSH -2\nPUSH 0\nPUSH -3\nGETMIN\nPOP\nGETMIN",
        output: "-3\n-2",
      },
    ],
    hiddenTests: [
      { input: "4\nPUSH 5\nTOP\nGETMIN\nPOP", output: "5\n5" },
      { input: "5\nPUSH 3\nPUSH 1\nPUSH 2\nGETMIN\nTOP", output: "1\n2" },
      { input: "7\nPUSH 10\nPUSH 5\nPUSH 20\nGETMIN\nPOP\nPOP\nGETMIN", output: "5\n10" },
      { input: "3\nPUSH -1\nGETMIN\nTOP", output: "-1\n-1" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int q;\n    cin >> q;\n    // TODO: maintain a main stack plus an auxiliary structure to track the minimum in O(1)\n    for (int i = 0; i < q; i++) {\n        string op;\n        cin >> op;\n        if (op == \"PUSH\") {\n            long long x; cin >> x;\n            // handle push\n        } else if (op == \"POP\") {\n            // handle pop\n        } else if (op == \"TOP\") {\n            // print top\n        } else if (op == \"GETMIN\") {\n            // print current minimum\n        }\n    }\n    return 0;\n}\n",
    hints: [
      "Keep a second stack that tracks the minimum value at each point in time.",
      "When pushing x, also push min(x, currentMin) onto the min-stack.",
      "When popping, pop from both stacks together so they stay in sync.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "stk-003",
    slug: "next-greater-element",
    title: "Next Greater Element",
    topic: "Stack",
    difficulty: "Medium",
    tags: ["stack", "monotonic-stack"],
    statement:
      "Given an array `nums`, for each element find the next element to its right that is strictly greater. If none exists, use -1.",
    inputFormat: "First line: n.\nSecond line: n space-separated integers.",
    outputFormat: "n space-separated integers: the next greater element for each position.",
    constraints: ["1 <= n <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    examples: [
      { input: "4\n2 1 2 4", output: "4 2 4 -1" },
      { input: "3\n1 2 3", output: "2 3 -1" },
    ],
    hiddenTests: [
      { input: "1\n5", output: "-1" },
      { input: "4\n4 3 2 1", output: "-1 -1 -1 -1" },
      { input: "5\n1 3 2 4 1", output: "3 4 4 -1 -1" },
      { input: "6\n5 4 3 2 1 6", output: "6 6 6 6 6 -1" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<long long> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    vector<long long> result(n, -1);\n    // TODO: use a monotonic decreasing stack of indices to find next greater elements\n\n    for (int i = 0; i < n; i++) cout << result[i] << (i + 1 < n ? ' ' : '\\n');\n    return 0;\n}\n",
    hints: [
      "Traverse from right to left (or left to right with a stack of pending indices).",
      "Maintain a stack of indices whose next-greater element hasn't been found yet.",
      "Pop from the stack while its top value is <= the current element, since the current element is their answer.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "stk-004",
    slug: "evaluate-postfix-expression",
    title: "Evaluate Postfix Expression",
    topic: "Stack",
    difficulty: "Medium",
    tags: ["stack", "expression-evaluation"],
    statement:
      "Evaluate an arithmetic expression given in postfix (Reverse Polish) notation. Tokens are space separated: integers and the operators `+ - * /`. Division truncates toward zero.",
    inputFormat: "A single line: the space-separated postfix expression.",
    outputFormat: "A single integer: the evaluated result.",
    constraints: ["The expression is always valid.", "1 <= number of tokens <= 10^4"],
    examples: [
      { input: "2 1 + 3 *", output: "9" },
      { input: "4 13 5 / +", output: "6" },
    ],
    hiddenTests: [
      { input: "5 1 2 + 4 * + 3 -", output: "14" },
      { input: "10 2 /", output: "5" },
      { input: "3 4 +", output: "7" },
      { input: "6 2 -", output: "4" },
      { input: "7 2 *", output: "14" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    string line;\n    getline(cin, line);\n    istringstream iss(line);\n    string tok;\n\n    // TODO: use a stack; push numbers, and on an operator pop two operands, apply it, push result\n\n    return 0;\n}\n",
    hints: [
      "Split the line by spaces into tokens.",
      "If a token is a number, push it. If it's an operator, pop two values (b then a), compute a OP b, and push the result.",
      "The final answer is the single value left on the stack.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "stk-005",
    slug: "largest-rectangle-in-histogram",
    title: "Largest Rectangle in Histogram",
    topic: "Stack",
    difficulty: "Hard",
    tags: ["stack", "monotonic-stack"],
    statement:
      "Given an array of bar heights of a histogram (each bar has width 1), find the area of the largest rectangle that can be formed within the histogram.",
    inputFormat: "First line: n.\nSecond line: n space-separated non-negative integers.",
    outputFormat: "A single integer: the maximum rectangular area.",
    constraints: ["1 <= n <= 10^5", "0 <= height[i] <= 10^4"],
    examples: [
      { input: "6\n2 1 5 6 2 3", output: "10" },
      { input: "2\n2 4", output: "4" },
    ],
    hiddenTests: [
      { input: "1\n5", output: "5" },
      { input: "3\n2 2 2", output: "6" },
      { input: "5\n1 1 1 1 1", output: "5" },
      { input: "4\n4 2 0 3", output: "4" },
      { input: "7\n6 2 5 4 5 1 6", output: "12" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<long long> h(n);\n    for (int i = 0; i < n; i++) cin >> h[i];\n\n    // TODO: use a monotonic increasing stack of indices to find the largest rectangle\n\n    return 0;\n}\n",
    hints: [
      "For each bar, find how far it can extend left and right while remaining the shortest bar in that span.",
      "A monotonic increasing stack of indices lets you compute this in a single pass.",
      "When you pop an index because the current bar is shorter, the popped bar's rectangle width is (currentIndex - stack.top() - 1).",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
];
