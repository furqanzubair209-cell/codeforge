import type { Problem } from "../frontend/src/types/problem";

export const linkedListProblems: Problem[] = [
  {
    id: "ll-001",
    slug: "reverse-linked-list",
    title: "Reverse a Linked List",
    topic: "Linked List",
    difficulty: "Easy",
    tags: ["linked-list", "pointers"],
    statement:
      "Given the values of a singly linked list, build the list and reverse it. Print the reversed list's values in order.",
    inputFormat: "First line: n (number of nodes).\nSecond line: n space-separated integers, the list values in order.",
    outputFormat: "n space-separated integers: the reversed list.",
    constraints: ["0 <= n <= 5000", "-10^5 <= value <= 10^5"],
    examples: [
      { input: "5\n1 2 3 4 5", output: "5 4 3 2 1" },
      { input: "2\n1 2", output: "2 1" },
    ],
    hiddenTests: [
      { input: "0\n", output: "" },
      { input: "1\n7", output: "7" },
      { input: "3\n-1 0 1", output: "1 0 -1" },
      { input: "6\n10 20 30 40 50 60", output: "60 50 40 30 20 10" },
      { input: "4\n5 5 5 5", output: "5 5 5 5" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct Node {\n    int val;\n    Node* next;\n    Node(int v) : val(v), next(nullptr) {}\n};\n\nint main() {\n    int n;\n    cin >> n;\n    Node* head = nullptr;\n    Node* tail = nullptr;\n    for (int i = 0; i < n; i++) {\n        int v; cin >> v;\n        Node* node = new Node(v);\n        if (!head) head = tail = node;\n        else { tail->next = node; tail = node; }\n    }\n\n    // TODO: reverse the linked list starting at head\n\n    vector<int> out;\n    for (Node* cur = head; cur; cur = cur->next) out.push_back(cur->val);\n    for (size_t i = 0; i < out.size(); i++) cout << out[i] << (i + 1 < out.size() ? ' ' : '\\n');\n    return 0;\n}\n",
    hints: [
      "Track three pointers: prev, current, and next, iterating through the list.",
      "At each node, save next, point current->next to prev, then advance prev and current.",
      "After the loop, prev is the new head.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "ll-002",
    slug: "detect-cycle-linked-list",
    title: "Detect Cycle in a Linked List",
    topic: "Linked List",
    difficulty: "Medium",
    tags: ["linked-list", "two-pointers", "floyd-cycle"],
    statement:
      "Given a linked list built from `n` values, and an integer `pos` indicating the index (0-indexed) that the tail connects back to (or -1 for no cycle), determine whether the list has a cycle.",
    inputFormat:
      "First line: n and pos, space separated.\nSecond line: n space-separated integers, the list values.",
    outputFormat: "Print \"true\" if a cycle exists, otherwise \"false\".",
    constraints: ["1 <= n <= 10^4", "-1 <= pos < n"],
    examples: [
      { input: "3 1\n3 2 0", output: "true", explanation: "The tail connects back to index 1, forming a cycle." },
      { input: "1 -1\n1", output: "false" },
    ],
    hiddenTests: [
      { input: "2 0\n1 2", output: "true" },
      { input: "4 -1\n1 2 3 4", output: "false" },
      { input: "5 4\n1 2 3 4 5", output: "true" },
      { input: "2 -1\n1 2", output: "false" },
      { input: "6 2\n5 4 3 2 1 0", output: "true" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct Node {\n    int val;\n    Node* next;\n    Node(int v) : val(v), next(nullptr) {}\n};\n\nint main() {\n    int n, pos;\n    cin >> n >> pos;\n    vector<Node*> nodes(n);\n    for (int i = 0; i < n; i++) {\n        int v; cin >> v;\n        nodes[i] = new Node(v);\n    }\n    for (int i = 0; i + 1 < n; i++) nodes[i]->next = nodes[i + 1];\n    if (pos >= 0) nodes[n - 1]->next = nodes[pos];\n\n    Node* head = nodes[0];\n    // TODO: use Floyd's cycle detection (slow/fast pointers) to determine if a cycle exists\n    // print \"true\" or \"false\"\n\n    return 0;\n}\n",
    hints: [
      "Floyd's algorithm: a slow pointer moves 1 step, a fast pointer moves 2 steps.",
      "If there's a cycle, the fast pointer will eventually catch up to the slow pointer.",
      "If the fast pointer reaches nullptr, there is no cycle.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "ll-003",
    slug: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    topic: "Linked List",
    difficulty: "Easy",
    tags: ["linked-list", "merge"],
    statement:
      "You are given two linked lists, each sorted in non-decreasing order. Merge them into one sorted list and print its values.",
    inputFormat:
      "First line: n1 and n2, the sizes of the two lists.\nSecond line: n1 integers (list 1, sorted).\nThird line: n2 integers (list 2, sorted).",
    outputFormat: "The merged, sorted list values, space separated.",
    constraints: ["0 <= n1, n2 <= 5000", "-10^5 <= value <= 10^5"],
    examples: [
      { input: "3 3\n1 2 4\n1 3 4", output: "1 1 2 3 4 4" },
      { input: "0 1\n\n0", output: "0" },
    ],
    hiddenTests: [
      { input: "0 0\n\n", output: "" },
      { input: "2 0\n5 7\n", output: "5 7" },
      { input: "1 1\n-3\n-3", output: "-3 -3" },
      { input: "4 2\n1 3 5 7\n2 4", output: "1 2 3 4 5 7" },
      { input: "3 3\n-5 0 5\n-10 0 10", output: "-10 -5 0 0 5 10" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n1, n2;\n    cin >> n1 >> n2;\n    vector<long long> a(n1), b(n2);\n    for (int i = 0; i < n1; i++) cin >> a[i];\n    for (int i = 0; i < n2; i++) cin >> b[i];\n\n    vector<long long> merged;\n    // TODO: merge a and b (both already sorted) into `merged`\n\n    for (size_t i = 0; i < merged.size(); i++) cout << merged[i] << (i + 1 < merged.size() ? ' ' : '\\n');\n    return 0;\n}\n",
    hints: [
      "Use two pointers, one for each list, and always take the smaller of the two current elements.",
      "When one list is exhausted, append the rest of the other list directly.",
      "This models the merge step of merge sort applied to linked lists.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "ll-004",
    slug: "remove-nth-node-from-end",
    title: "Remove Nth Node From End of List",
    topic: "Linked List",
    difficulty: "Medium",
    tags: ["linked-list", "two-pointers"],
    statement:
      "Given a linked list, remove the `n`-th node from the end of the list (1-indexed from the end) and print the resulting list.",
    inputFormat: "First line: m (list size) and n.\nSecond line: m space-separated integers.",
    outputFormat: "The resulting list's values, space separated (empty line if the list becomes empty).",
    constraints: ["1 <= m <= 5000", "1 <= n <= m"],
    examples: [
      { input: "5 2\n1 2 3 4 5", output: "1 2 3 5" },
      { input: "1 1\n1", output: "" },
    ],
    hiddenTests: [
      { input: "2 1\n1 2", output: "1" },
      { input: "2 2\n1 2", output: "2" },
      { input: "6 6\n1 2 3 4 5 6", output: "2 3 4 5 6" },
      { input: "4 3\n10 20 30 40", output: "10 30 40" },
      { input: "3 1\n7 8 9", output: "7 8" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct Node {\n    int val;\n    Node* next;\n    Node(int v) : val(v), next(nullptr) {}\n};\n\nint main() {\n    int m, n;\n    cin >> m >> n;\n    Node* head = nullptr; Node* tail = nullptr;\n    for (int i = 0; i < m; i++) {\n        int v; cin >> v;\n        Node* node = new Node(v);\n        if (!head) head = tail = node; else { tail->next = node; tail = node; }\n    }\n\n    // TODO: remove the n-th node from the end using a two-pointer gap technique\n    // hint: use a dummy head to simplify removing the actual head node\n\n    vector<int> out;\n    for (Node* cur = head; cur; cur = cur->next) out.push_back(cur->val);\n    for (size_t i = 0; i < out.size(); i++) cout << out[i] << (i + 1 < out.size() ? ' ' : \"\");\n    cout << \"\\n\";\n    return 0;\n}\n",
    hints: [
      "Use a dummy node pointing to head so removing the actual head is not a special case.",
      "Advance a 'fast' pointer n steps ahead of a 'slow' pointer, then move both until fast reaches the end.",
      "Slow will now be right before the node to remove.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "ll-005",
    slug: "palindrome-linked-list",
    title: "Palindrome Linked List",
    topic: "Linked List",
    difficulty: "Medium",
    tags: ["linked-list", "two-pointers", "reversal"],
    statement:
      "Given a singly linked list, determine whether it is a palindrome (reads the same forward and backward).",
    inputFormat: "First line: n.\nSecond line: n space-separated integers.",
    outputFormat: "Print \"true\" or \"false\".",
    constraints: ["1 <= n <= 5*10^4", "0 <= value <= 9"],
    examples: [
      { input: "4\n1 2 2 1", output: "true" },
      { input: "3\n1 2 3", output: "false" },
    ],
    hiddenTests: [
      { input: "1\n5", output: "true" },
      { input: "2\n1 1", output: "true" },
      { input: "2\n1 2", output: "false" },
      { input: "5\n1 2 3 2 1", output: "true" },
      { input: "6\n1 2 3 3 2 0", output: "false" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n\n    // TODO: determine if vals reads the same forwards and backwards\n    // (in a real linked-list solution you'd find the middle, reverse the second half, and compare)\n\n    return 0;\n}\n",
    hints: [
      "Find the middle of the list using slow/fast pointers.",
      "Reverse the second half of the list in place.",
      "Compare the first half and reversed second half node by node.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
];
