import type { Problem } from "../frontend/src/types/problem";

export const arrayProblems: Problem[] = [
  {
    id: "arr-001",
    slug: "two-sum",
    title: "Two Sum",
    topic: "Arrays",
    difficulty: "Easy",
    tags: ["array", "hash-map"],
    statement:
      "You are given an array of integers `nums` and an integer `target`. Return the indices of the two numbers such that they add up to `target`.\n\nAssume exactly one valid answer exists, and you may not use the same element twice. Return the indices in increasing order.",
    inputFormat:
      "First line: n (size of array) and target, space separated.\nSecond line: n space-separated integers.",
    outputFormat: "Two space-separated indices (0-indexed), smaller index first.",
    constraints: ["2 <= n <= 10^4", "-10^9 <= nums[i] <= 10^9", "Exactly one valid answer exists."],
    examples: [
      { input: "4 9\n2 7 11 15", output: "0 1", explanation: "nums[0] + nums[1] = 2 + 7 = 9" },
      { input: "3 6\n3 2 4", output: "1 2", explanation: "nums[1] + nums[2] = 2 + 4 = 6" },
    ],
    hiddenTests: [
      { input: "2 6\n3 3", output: "0 1" },
      { input: "5 -2\n-3 4 3 90 -1", output: "0 2" },
      { input: "6 0\n0 4 3 0 -1 1", output: "0 3" },
      { input: "5 100\n10 20 30 40 60", output: "1 4" },
      { input: "4 -4\n-1 -2 -3 -1", output: "1 2" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n; long long target;\n    cin >> n >> target;\n    vector<long long> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    // TODO: find two indices whose values sum to target\n    // print the two indices separated by a space\n\n    return 0;\n}\n",
    hints: [
      "A brute force checking every pair works but is O(n^2). Can you do better?",
      "A hash map from value -> index lets you check 'have I seen target - nums[i] before?' in O(1).",
      "Iterate once, and for each element check the complement before inserting the current element into the map.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "arr-002",
    slug: "maximum-subarray",
    title: "Maximum Subarray",
    topic: "Arrays",
    difficulty: "Medium",
    tags: ["array", "dynamic-programming", "kadane"],
    statement:
      "Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum, and return that sum.",
    inputFormat: "First line: n.\nSecond line: n space-separated integers (may be negative).",
    outputFormat: "A single integer: the maximum subarray sum.",
    constraints: ["1 <= n <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    examples: [
      { input: "9\n-2 1 -3 4 -1 2 1 -5 4", output: "6", explanation: "[4,-1,2,1] has the largest sum = 6." },
      { input: "1\n1", output: "1" },
    ],
    hiddenTests: [
      { input: "5\n5 4 -1 7 8", output: "23" },
      { input: "3\n-1 -2 -3", output: "-1" },
      { input: "6\n-2 -1 -3 -4 -1 -2", output: "-1" },
      { input: "4\n0 0 0 0", output: "0" },
      { input: "7\n1 2 3 -2 5 -10 6", output: "9" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<long long> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    // TODO: implement Kadane's algorithm\n\n    return 0;\n}\n",
    hints: [
      "Think about extending a running subarray sum vs starting fresh at the current element.",
      "Kadane's algorithm: maintain `currentSum = max(nums[i], currentSum + nums[i])`.",
      "Track a separate `best` variable updated every step, since the optimal subarray might end anywhere.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "arr-003",
    slug: "move-zeroes",
    title: "Move Zeroes",
    topic: "Arrays",
    difficulty: "Easy",
    tags: ["array", "two-pointers", "in-place"],
    statement:
      "Given an integer array `nums`, move all zeroes to the end of it while maintaining the relative order of the non-zero elements. Print the resulting array.",
    inputFormat: "First line: n.\nSecond line: n space-separated integers.",
    outputFormat: "n space-separated integers: the array after moving zeroes to the end.",
    constraints: ["1 <= n <= 10^4", "-2^31 <= nums[i] <= 2^31 - 1"],
    examples: [
      { input: "5\n0 1 0 3 12", output: "1 3 12 0 0" },
      { input: "1\n0", output: "0" },
    ],
    hiddenTests: [
      { input: "6\n1 2 3 4 5 6", output: "1 2 3 4 5 6" },
      { input: "4\n0 0 0 1", output: "1 0 0 0" },
      { input: "5\n-1 0 -2 0 5", output: "-1 -2 5 0 0" },
      { input: "3\n0 0 0", output: "0 0 0" },
      { input: "7\n4 0 5 0 0 9 2", output: "4 5 9 2 0 0 0" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<long long> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    // TODO: move all zeroes to the end, keep relative order of non-zeros\n\n    for (int i = 0; i < n; i++) cout << nums[i] << (i + 1 < n ? ' ' : '\\n');\n    return 0;\n}\n",
    hints: [
      "Use a 'write pointer' that tracks where the next non-zero element should go.",
      "Do a single pass copying non-zero elements forward, then fill the rest with zeroes.",
      "This can be done in-place in O(n) time and O(1) extra space.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "arr-004",
    slug: "product-of-array-except-self",
    title: "Product of Array Except Self",
    topic: "Arrays",
    difficulty: "Medium",
    tags: ["array", "prefix-sum"],
    statement:
      "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. Do this without using division.",
    inputFormat: "First line: n.\nSecond line: n space-separated integers.",
    outputFormat: "n space-separated integers: the answer array.",
    constraints: ["2 <= n <= 10^5", "-30 <= nums[i] <= 30", "The product of any prefix or suffix fits in a 64-bit integer."],
    examples: [
      { input: "4\n1 2 3 4", output: "24 12 8 6" },
      { input: "5\n-1 1 0 -3 3", output: "0 0 9 0 0" },
    ],
    hiddenTests: [
      { input: "2\n3 5", output: "5 3" },
      { input: "3\n0 0 5", output: "0 0 0" },
      { input: "4\n-1 -2 -3 -4", output: "-24 -12 -8 -6" },
      { input: "5\n1 1 1 1 1", output: "1 1 1 1 1" },
      { input: "3\n2 3 4", output: "12 8 6" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<long long> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    vector<long long> answer(n, 1);\n    // TODO: fill answer[i] with product of all elements except nums[i], no division\n\n    for (int i = 0; i < n; i++) cout << answer[i] << (i + 1 < n ? ' ' : '\\n');\n    return 0;\n}\n",
    hints: [
      "Compute prefix products (product of everything to the left) in one pass.",
      "Compute suffix products (product of everything to the right) in a second pass.",
      "answer[i] = prefix[i] * suffix[i]. You can do this with O(1) extra space beyond the output array.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "arr-005",
    slug: "trapping-rain-water",
    title: "Trapping Rain Water",
    topic: "Arrays",
    difficulty: "Hard",
    tags: ["array", "two-pointers", "stack"],
    statement:
      "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    inputFormat: "First line: n.\nSecond line: n space-separated non-negative integers (bar heights).",
    outputFormat: "A single integer: total units of trapped water.",
    constraints: ["1 <= n <= 2*10^4", "0 <= height[i] <= 10^5"],
    examples: [
      { input: "12\n0 1 0 2 1 0 1 3 2 1 2 1", output: "6" },
      { input: "6\n4 2 0 3 2 5", output: "9" },
    ],
    hiddenTests: [
      { input: "1\n5", output: "0" },
      { input: "3\n3 3 3", output: "0" },
      { input: "5\n5 4 3 2 1", output: "0" },
      { input: "5\n1 2 3 4 5", output: "0" },
      { input: "7\n0 0 0 5 0 0 0", output: "0" },
      { input: "8\n4 2 3 1 5 0 2 3", output: "12" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<long long> h(n);\n    for (int i = 0; i < n; i++) cin >> h[i];\n\n    // TODO: compute total trapped water using two pointers or prefix max/suffix max\n\n    return 0;\n}\n",
    hints: [
      "Water trapped above index i is min(maxLeft[i], maxRight[i]) - height[i], if positive.",
      "Precompute maxLeft and maxRight arrays in O(n), or use a two-pointer approach for O(1) extra space.",
      "With two pointers, move the side with the smaller current max inward, since that side's bound is already known.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
];
