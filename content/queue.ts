import type { Problem } from "../frontend/src/types/problem";

export const queueProblems: Problem[] = [
  {
    id: "q-001",
    slug: "implement-queue-using-stacks",
    title: "Implement Queue using Stacks",
    topic: "Queue",
    difficulty: "Easy",
    tags: ["queue", "stack", "design"],
    statement:
      "Implement a FIFO queue using only stack operations, processing a stream of operations from stdin.",
    inputFormat:
      "First line: q.\nEach next line is `PUSH x` or `POP`.",
    outputFormat: "For each POP, print the removed value on its own line.",
    constraints: ["1 <= q <= 10^4", "POP is never called on an empty queue."],
    examples: [
      { input: "5\nPUSH 1\nPUSH 2\nPOP\nPUSH 3\nPOP", output: "1\n2" },
    ],
    hiddenTests: [
      { input: "3\nPUSH 5\nPUSH 6\nPOP", output: "5" },
      { input: "6\nPUSH 1\nPUSH 2\nPUSH 3\nPOP\nPOP\nPOP", output: "1\n2\n3" },
      { input: "4\nPUSH 9\nPOP\nPUSH 8\nPOP", output: "9\n8" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int q;\n    cin >> q;\n    // TODO: use two stacks (an 'in' stack and an 'out' stack) to simulate FIFO order\n    for (int i = 0; i < q; i++) {\n        string op; cin >> op;\n        if (op == \"PUSH\") {\n            long long x; cin >> x;\n            // push x\n        } else {\n            // pop and print the front of the queue\n        }\n    }\n    return 0;\n}\n",
    hints: [
      "Keep two stacks: one for incoming pushes, one for outgoing pops.",
      "On POP, if the 'out' stack is empty, dump everything from 'in' into 'out' (this reverses the order).",
      "Then pop from 'out'. This gives amortized O(1) per operation.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "q-002",
    slug: "circular-queue",
    title: "Design Circular Queue",
    topic: "Queue",
    difficulty: "Medium",
    tags: ["queue", "design", "array"],
    statement:
      "Implement a fixed-capacity circular queue supporting enqueue, dequeue, and front, processing operations from stdin.",
    inputFormat:
      "First line: capacity k and q (number of operations).\nEach next line is `ENQUEUE x`, `DEQUEUE`, or `FRONT`.",
    outputFormat:
      "For ENQUEUE and DEQUEUE, print \"true\" if it succeeded or \"false\" if the queue was full/empty. For FRONT, print the front value or -1 if empty.",
    constraints: ["1 <= k <= 1000", "1 <= q <= 10^4"],
    examples: [
      {
        input: "3 5\nENQUEUE 1\nENQUEUE 2\nENQUEUE 3\nENQUEUE 4\nFRONT",
        output: "true\ntrue\ntrue\nfalse\n1",
      },
    ],
    hiddenTests: [
      { input: "2 4\nENQUEUE 5\nDEQUEUE\nDEQUEUE\nFRONT", output: "true\ntrue\nfalse\n-1" },
      { input: "1 3\nENQUEUE 9\nENQUEUE 8\nFRONT", output: "true\nfalse\n9" },
      { input: "3 6\nENQUEUE 1\nENQUEUE 2\nDEQUEUE\nENQUEUE 3\nENQUEUE 4\nFRONT", output: "true\ntrue\ntrue\ntrue\ntrue\n2" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int k, q;\n    cin >> k >> q;\n    vector<long long> buf(k);\n    int head = 0, count = 0;\n    // TODO: implement ENQUEUE, DEQUEUE, FRONT using head/count and modular arithmetic\n    for (int i = 0; i < q; i++) {\n        string op; cin >> op;\n        if (op == \"ENQUEUE\") {\n            long long x; cin >> x;\n        } else if (op == \"DEQUEUE\") {\n        } else if (op == \"FRONT\") {\n        }\n    }\n    return 0;\n}\n",
    hints: [
      "Track `head` index and current `count` of elements; capacity is fixed at k.",
      "Enqueue writes to index (head + count) % k, if count < k.",
      "Dequeue advances head by 1 (mod k) and decrements count, if count > 0.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "q-003",
    slug: "first-negative-in-window",
    title: "First Negative Number in Every Window of Size K",
    topic: "Queue",
    difficulty: "Medium",
    tags: ["queue", "sliding-window", "deque"],
    statement:
      "Given an array and a window size `k`, find the first negative number in every contiguous window of size `k`. If a window has no negative number, print 0 for that window.",
    inputFormat: "First line: n and k.\nSecond line: n space-separated integers.",
    outputFormat: "(n - k + 1) space-separated integers, one per window.",
    constraints: ["1 <= k <= n <= 10^5"],
    examples: [
      { input: "8 3\n12 -1 -7 8 -15 30 16 28", output: "-1 -1 -7 -15 -15 0" },
      { input: "5 2\n-8 2 3 -6 10", output: "-8 0 -6 -6" },
    ],
    hiddenTests: [
      { input: "4 4\n1 2 3 4", output: "0" },
      { input: "3 1\n-1 -2 -3", output: "-1 -2 -3" },
      { input: "6 2\n1 2 3 4 5 6", output: "0 0 0 0 0" },
      { input: "5 3\n-1 -1 -1 -1 -1", output: "-1 -1 -1" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, k;\n    cin >> n >> k;\n    vector<long long> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n\n    // TODO: use a deque storing indices of negative numbers to answer each window in O(1) amortized\n\n    return 0;\n}\n",
    hints: [
      "Maintain a deque of indices of negative numbers seen so far, in order.",
      "Before reading each window's answer, pop indices from the front that have fallen out of the window.",
      "The front of the deque (if any) is the first negative number in the current window.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "q-004",
    slug: "sliding-window-maximum",
    title: "Sliding Window Maximum",
    topic: "Queue",
    difficulty: "Hard",
    tags: ["queue", "deque", "sliding-window"],
    statement:
      "Given an array `nums` and window size `k`, return the maximum value in every contiguous window of size `k`.",
    inputFormat: "First line: n and k.\nSecond line: n space-separated integers.",
    outputFormat: "(n - k + 1) space-separated integers: the max of each window.",
    constraints: ["1 <= k <= n <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    examples: [
      { input: "8 3\n1 3 -1 -3 5 3 6 7", output: "3 3 5 5 6 7" },
      { input: "1 1\n1", output: "1" },
    ],
    hiddenTests: [
      { input: "4 2\n9 11 8 5", output: "11 11 8" },
      { input: "5 5\n1 2 3 4 5", output: "5" },
      { input: "6 1\n4 3 2 1 5 6", output: "4 3 2 1 5 6" },
      { input: "6 3\n-1 -2 -3 -4 -5 -6", output: "-1 -2 -3 -4" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, k;\n    cin >> n >> k;\n    vector<long long> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    // TODO: use a monotonic decreasing deque of indices to get each window's max in O(n) total\n\n    return 0;\n}\n",
    hints: [
      "Maintain a deque of indices whose corresponding values are in decreasing order.",
      "Before adding a new index, pop from the back while its value is <= the new value.",
      "Pop from the front if it has fallen outside the current window; the front is always the current max.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "q-005",
    slug: "generate-binary-numbers",
    title: "Generate Binary Numbers from 1 to N",
    topic: "Queue",
    difficulty: "Easy",
    tags: ["queue", "bfs-style-generation"],
    statement:
      "Using a queue, generate the binary representations of all integers from 1 to `n`, in order.",
    inputFormat: "A single integer n.",
    outputFormat: "n lines, each the binary representation of 1, 2, ..., n in order.",
    constraints: ["1 <= n <= 1000"],
    examples: [{ input: "5", output: "1\n10\n11\n100\n101" }],
    hiddenTests: [
      { input: "1", output: "1" },
      { input: "3", output: "1\n10\n11" },
      { input: "8", output: "1\n10\n11\n100\n101\n110\n111\n1000" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n\n    // TODO: use a queue of strings, starting with \"1\", generating each next number\n    // by appending \"0\" and \"1\" to the front of the queue\n\n    return 0;\n}\n",
    hints: [
      "Start a queue with the string \"1\".",
      "To get the next number, dequeue the front, print it, then enqueue front+\"0\" and front+\"1\".",
      "Repeat this n times.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
];
