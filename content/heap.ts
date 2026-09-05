import type { Problem } from "../frontend/src/types/problem";

export const heapProblems: Problem[] = [
  {
    id: "hp-001",
    slug: "kth-smallest-element-heap",
    title: "Kth Smallest Element using a Heap",
    topic: "Heap",
    difficulty: "Easy",
    tags: ["heap", "priority-queue"],
    statement: "Given an array and integer k, find the k-th smallest element using a heap-based approach.",
    inputFormat: "First line: n and k.\nSecond line: n space-separated integers.",
    outputFormat: "A single integer: the k-th smallest element.",
    constraints: ["1 <= k <= n <= 10^5"],
    examples: [{ input: "6 3\n7 10 4 3 20 15", output: "7" }],
    hiddenTests: [
      { input: "1 1\n9", output: "9" },
      { input: "5 5\n5 4 3 2 1", output: "5" },
      { input: "5 1\n5 4 3 2 1", output: "1" },
      { input: "4 2\n1 1 2 2", output: "1" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, k;\n    cin >> n >> k;\n    vector<long long> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n\n    // TODO: use a max-heap of size k (keep the k smallest seen so far) to find the k-th smallest\n\n    return 0;\n}\n",
    hints: [
      "Maintain a max-heap containing at most k elements — the k smallest seen so far.",
      "For each new element, push it, and if the heap size exceeds k, pop the max.",
      "After processing all elements, the top of the heap is the k-th smallest.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "hp-002",
    slug: "merge-k-sorted-arrays",
    title: "Merge K Sorted Arrays",
    topic: "Heap",
    difficulty: "Hard",
    tags: ["heap", "priority-queue", "merge"],
    statement: "Given k sorted arrays, merge them into a single sorted array using a min-heap.",
    inputFormat:
      "First line: k.\nEach of the next k lines starts with the array's size followed by that many sorted integers.",
    outputFormat: "The fully merged, sorted array, space separated.",
    constraints: ["1 <= k <= 100", "0 <= size of each array <= 1000"],
    examples: [
      {
        input: "3\n3 1 4 5\n3 1 3 4\n3 2 6 8",
        output: "1 1 2 3 4 4 5 6 8",
      },
    ],
    hiddenTests: [
      { input: "1\n3 5 6 7", output: "5 6 7" },
      { input: "2\n0\n2 1 2", output: "1 2" },
      { input: "2\n2 -3 -1\n2 -2 0", output: "-3 -2 -1 0" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int k;\n    cin >> k;\n    vector<vector<long long>> arrs(k);\n    for (int i = 0; i < k; i++) {\n        int sz; cin >> sz;\n        arrs[i].resize(sz);\n        for (int j = 0; j < sz; j++) cin >> arrs[i][j];\n    }\n\n    // TODO: use a min-heap of (value, arrayIndex, elementIndex) to merge all arrays\n\n    return 0;\n}\n",
    hints: [
      "Push the first element of each non-empty array into a min-heap, tagged with its array and index.",
      "Pop the minimum, add it to the result, then push the next element from the same array (if any).",
      "This runs in O(N log k) where N is the total number of elements.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "hp-003",
    slug: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    topic: "Heap",
    difficulty: "Medium",
    tags: ["heap", "hash-map", "priority-queue"],
    statement:
      "Given an integer array and an integer k, return the k most frequent elements. If there is a tie in frequency, prefer the smaller value. Print them from most to least frequent.",
    inputFormat: "First line: n and k.\nSecond line: n space-separated integers.",
    outputFormat: "k space-separated integers: the top k frequent elements, most frequent first.",
    constraints: ["1 <= k <= n <= 10^5"],
    examples: [{ input: "6 2\n1 1 1 2 2 3", output: "1 2" }],
    hiddenTests: [
      { input: "1 1\n5", output: "5" },
      { input: "5 1\n4 4 4 4 4", output: "4" },
      { input: "6 3\n1 2 3 1 2 1", output: "1 2 3" },
      { input: "7 2\n5 5 6 6 7 7 7", output: "7 5" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, k;\n    cin >> n >> k;\n    vector<long long> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n\n    // TODO: count frequencies with a hash map, then use a heap to extract the k most frequent\n    // (break ties by preferring the smaller value)\n\n    return 0;\n}\n",
    hints: [
      "First build a frequency map with an unordered_map.",
      "Push (frequency, value) pairs into a max-heap, ordered by frequency desc then value asc.",
      "Pop k elements from the heap to get the answer in the right order.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "hp-004",
    slug: "median-in-a-stream",
    title: "Median in a Stream",
    topic: "Heap",
    difficulty: "Hard",
    tags: ["heap", "two-heaps", "design"],
    statement:
      "Process a stream of integers one at a time. After each insertion, output the median of all numbers seen so far, using two heaps for O(log n) insertion.",
    inputFormat: "First line: n.\nSecond line: n space-separated integers, the stream in order.",
    outputFormat:
      "n lines: the median after each insertion. If the count is even, print the average of the two middle values (with 1 decimal place); if odd, print the middle value (also with 1 decimal place).",
    constraints: ["1 <= n <= 10^5"],
    examples: [
      { input: "4\n5 15 1 3", output: "5.0\n10.0\n5.0\n4.0" },
    ],
    hiddenTests: [
      { input: "1\n7", output: "7.0" },
      { input: "2\n1 2", output: "1.0\n1.5" },
      { input: "3\n1 2 3", output: "1.0\n1.5\n2.0" },
      { input: "5\n1 1 1 1 1", output: "1.0\n1.0\n1.0\n1.0\n1.0" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n\n    // TODO: maintain a max-heap for the lower half and a min-heap for the upper half,\n    // keeping their sizes balanced (differ by at most 1); print the median after each insert\n\n    for (int i = 0; i < n; i++) {\n        long long x; cin >> x;\n        // insert x, rebalance, then printf(\"%.1f\\n\", median);\n    }\n    return 0;\n}\n",
    hints: [
      "Use a max-heap for the smaller half of numbers, and a min-heap for the larger half.",
      "After every insertion, rebalance so the heap sizes differ by at most 1.",
      "If sizes are equal, median = average of both tops; otherwise median = top of the larger heap.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "hp-005",
    slug: "connect-ropes-minimum-cost",
    title: "Connect Ropes with Minimum Cost",
    topic: "Heap",
    difficulty: "Medium",
    tags: ["heap", "greedy"],
    statement:
      "You have `n` ropes of given lengths. Connecting two ropes costs the sum of their lengths. Find the minimum total cost to connect all ropes into one.",
    inputFormat: "First line: n.\nSecond line: n space-separated positive integers, the rope lengths.",
    outputFormat: "A single integer: the minimum total cost.",
    constraints: ["1 <= n <= 10^5", "1 <= length <= 10^4"],
    examples: [
      { input: "4\n4 3 2 6", output: "29" },
      { input: "1\n5", output: "0" },
    ],
    hiddenTests: [
      { input: "2\n1 2", output: "3" },
      { input: "3\n1 2 3", output: "9" },
      { input: "5\n1 2 3 4 5", output: "33" },
      { input: "4\n1 1 1 1", output: "8" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<long long> ropes(n);\n    for (int i = 0; i < n; i++) cin >> ropes[i];\n\n    // TODO: use a min-heap; repeatedly combine the two smallest ropes, accumulating cost\n\n    return 0;\n}\n",
    hints: [
      "This is a classic greedy problem: always merge the two currently-smallest pieces.",
      "Use a min-heap to always have quick access to the two smallest ropes.",
      "Each merge cost adds to the total; push the merged length back into the heap.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
];
