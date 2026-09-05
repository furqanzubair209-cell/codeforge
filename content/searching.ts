import type { Problem } from "../frontend/src/types/problem";

export const searchingProblems: Problem[] = [
  {
    id: "sr-001",
    slug: "binary-search",
    title: "Binary Search",
    topic: "Searching",
    difficulty: "Easy",
    tags: ["searching", "binary-search"],
    statement:
      "Given a sorted array of distinct integers and a target value, return the index of the target, or -1 if it is not present.",
    inputFormat: "First line: n and target.\nSecond line: n space-separated sorted integers.",
    outputFormat: "A single integer: the index of target, or -1.",
    constraints: ["1 <= n <= 10^5", "Array is sorted in strictly increasing order."],
    examples: [
      { input: "6 9\n-1 0 3 5 9 12", output: "4" },
      { input: "6 2\n-1 0 3 5 9 12", output: "-1" },
    ],
    hiddenTests: [
      { input: "1 5\n5", output: "0" },
      { input: "1 3\n5", output: "-1" },
      { input: "5 1\n1 2 3 4 5", output: "0" },
      { input: "5 5\n1 2 3 4 5", output: "4" },
      { input: "7 50\n10 20 30 40 50 60 70", output: "4" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; long long target;\n    cin >> n >> target;\n    vector<long long> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n\n    // TODO: implement iterative binary search, print the index or -1\n\n    return 0;\n}\n",
    hints: [
      "Maintain lo = 0 and hi = n - 1, compute mid = lo + (hi - lo) / 2.",
      "If a[mid] == target, return mid. If a[mid] < target, search the right half, else the left half.",
      "Stop when lo > hi and return -1.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "sr-002",
    slug: "search-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    topic: "Searching",
    difficulty: "Medium",
    tags: ["searching", "binary-search"],
    statement:
      "An array sorted in ascending order was rotated at an unknown pivot. Given the rotated array and a target, return its index, or -1 if absent. Must run in O(log n).",
    inputFormat: "First line: n and target.\nSecond line: n space-separated integers (distinct values).",
    outputFormat: "A single integer: the index of target, or -1.",
    constraints: ["1 <= n <= 5*10^4", "All values are distinct."],
    examples: [
      { input: "7 0\n4 5 6 7 0 1 2", output: "4" },
      { input: "7 3\n4 5 6 7 0 1 2", output: "-1" },
    ],
    hiddenTests: [
      { input: "1 5\n5", output: "0" },
      { input: "5 4\n4 5 6 7 8", output: "0" },
      { input: "5 8\n4 5 6 7 8", output: "4" },
      { input: "6 1\n6 7 1 2 3 4", output: "2" },
      { input: "4 2\n3 1 2 2", output: "-1" },
      { input: "6 9\n11 13 15 17 2 5", output: "-1" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; long long target;\n    cin >> n >> target;\n    vector<long long> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n\n    // TODO: modified binary search: at each step, determine which half is sorted\n    // and check whether target lies in that half's range\n\n    return 0;\n}\n",
    hints: [
      "At each step, one half of [lo, mid] or [mid, hi] is guaranteed to be normally sorted.",
      "Check which half is sorted by comparing a[lo] and a[mid].",
      "If the target lies within the sorted half's range, recurse there; otherwise recurse the other half.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "sr-003",
    slug: "first-last-position",
    title: "Find First and Last Position of Element in Sorted Array",
    topic: "Searching",
    difficulty: "Medium",
    tags: ["searching", "binary-search"],
    statement:
      "Given a sorted array and a target value, find the first and last index at which target appears. If it does not appear, return -1 -1.",
    inputFormat: "First line: n and target.\nSecond line: n space-separated sorted integers.",
    outputFormat: "Two space-separated integers: first index, last index (or -1 -1).",
    constraints: ["0 <= n <= 10^5"],
    examples: [
      { input: "6 8\n5 7 7 8 8 10", output: "3 4" },
      { input: "6 6\n5 7 7 8 8 10", output: "-1 -1" },
    ],
    hiddenTests: [
      { input: "0 5\n", output: "-1 -1" },
      { input: "1 5\n5", output: "0 0" },
      { input: "5 2\n2 2 2 2 2", output: "0 4" },
      { input: "6 1\n1 2 3 4 5 6", output: "0 0" },
      { input: "6 6\n1 2 3 4 5 6", output: "5 5" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; long long target;\n    cin >> n >> target;\n    vector<long long> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n\n    // TODO: binary search for the leftmost occurrence, then binary search for the rightmost\n\n    return 0;\n}\n",
    hints: [
      "Write a helper binary search that finds the leftmost index where a[i] >= target.",
      "A similar search variant (leftmost index where a[i] > target, minus 1) gives the rightmost occurrence.",
      "If the leftmost index found doesn't actually equal target, the answer is -1 -1.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "sr-004",
    slug: "find-peak-element",
    title: "Find Peak Element",
    topic: "Searching",
    difficulty: "Medium",
    tags: ["searching", "binary-search"],
    statement:
      "A peak element is one strictly greater than its neighbors (treat out-of-bounds neighbors as negative infinity). Given an array, find the index of any one peak. Must run in O(log n).",
    inputFormat: "First line: n.\nSecond line: n space-separated integers (adjacent elements are never equal).",
    outputFormat: "A single integer: the index of a valid peak.",
    constraints: ["1 <= n <= 10^5"],
    examples: [
      { input: "4\n1 2 3 1", output: "2" },
    ],
    hiddenTests: [
      { input: "1\n1", output: "0" },
      { input: "2\n1 2", output: "1" },
      { input: "2\n2 1", output: "0" },
      { input: "5\n1 2 1 3 5", output: "1 3", explanation: "multiple valid answers; grader accepts index 1 or 3" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<long long> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n\n    // TODO: binary search: move toward the side with the larger neighbor\n\n    return 0;\n}\n",
    hints: [
      "Compare a[mid] with a[mid + 1]. If a[mid] < a[mid+1], a peak exists to the right.",
      "Otherwise, a peak exists at mid or to its left.",
      "This converges in O(log n) because you always move toward increasing values.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "sr-005",
    slug: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    topic: "Searching",
    difficulty: "Hard",
    tags: ["searching", "binary-search", "divide-and-conquer"],
    statement:
      "Given two sorted arrays, find the median of the combined array. Must run in O(log(min(n, m))) time. Print the median with exactly 1 decimal place.",
    inputFormat:
      "First line: n and m.\nSecond line: n space-separated integers.\nThird line: m space-separated integers.",
    outputFormat: "The median as a decimal number with exactly 1 decimal place.",
    constraints: ["0 <= n, m <= 10^5", "1 <= n + m"],
    examples: [
      { input: "2 1\n1 3\n2", output: "2.0" },
      { input: "2 2\n1 2\n3 4", output: "2.5" },
    ],
    hiddenTests: [
      { input: "0 1\n\n5", output: "5.0" },
      { input: "1 0\n7\n", output: "7.0" },
      { input: "3 0\n1 2 3\n", output: "2.0" },
      { input: "4 0\n1 2 3 4\n", output: "2.5" },
      { input: "3 3\n1 3 5\n2 4 6", output: "3.5" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<long long> a(n), b(m);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    for (int i = 0; i < m; i++) cin >> b[i];\n\n    // TODO: partition-based binary search on the smaller array to find the median\n    // print with exactly 1 decimal place, e.g. printf(\"%.1f\\n\", median);\n\n    return 0;\n}\n",
    hints: [
      "Binary search a partition point on the smaller array; the partition on the larger array is determined by it.",
      "You want maxLeft <= minRight across both partitions combined.",
      "If total length is even, median = (maxLeft + minRight) / 2.0; if odd, median = maxLeft of the larger partition side.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
];
