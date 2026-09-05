import type { Problem } from "../frontend/src/types/problem";

export const treeProblems: Problem[] = [
  {
    id: "tr-001",
    slug: "inorder-traversal",
    title: "Binary Tree Inorder Traversal",
    topic: "Trees",
    difficulty: "Easy",
    tags: ["trees", "traversal", "recursion"],
    statement:
      "Given a binary tree described in level-order (with -1 marking a null child), print its inorder traversal (left, root, right).",
    inputFormat:
      "First line: n (number of values in the level-order description).\nSecond line: n space-separated integers, level-order, using -1 for null. The first value is always the root and is never -1.",
    outputFormat: "The inorder traversal, space separated. Print nothing (empty line) if the tree is empty.",
    constraints: ["1 <= n <= 2*10^4"],
    examples: [
      { input: "7\n1 2 3 -1 -1 4 5", output: "2 1 4 3 5", explanation: "Root 1, left child 2 (leaf), right child 3 with children 4,5." },
    ],
    hiddenTests: [
      { input: "1\n1", output: "1" },
      { input: "3\n1 2 -1", output: "2 1" },
      { input: "3\n1 -1 2", output: "1 2" },
      { input: "5\n5 3 8 -1 -1", output: "3 5 8" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct Node {\n    long long val;\n    Node* left = nullptr;\n    Node* right = nullptr;\n    Node(long long v) : val(v) {}\n};\n\n// Builds a tree from a level-order array where -1 marks a null child.\nNode* buildTree(vector<long long>& vals) {\n    if (vals.empty() || vals[0] == -1) return nullptr;\n    Node* root = new Node(vals[0]);\n    queue<Node*> q;\n    q.push(root);\n    size_t i = 1;\n    while (!q.empty() && i < vals.size()) {\n        Node* cur = q.front(); q.pop();\n        if (i < vals.size()) {\n            long long lv = vals[i++];\n            if (lv != -1) { cur->left = new Node(lv); q.push(cur->left); }\n        }\n        if (i < vals.size()) {\n            long long rv = vals[i++];\n            if (rv != -1) { cur->right = new Node(rv); q.push(cur->right); }\n        }\n    }\n    return root;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<long long> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n\n    Node* root = buildTree(vals);\n    vector<long long> result;\n\n    // TODO: fill `result` with the inorder traversal of the tree rooted at `root`\n\n    for (size_t i = 0; i < result.size(); i++) cout << result[i] << (i + 1 < result.size() ? ' ' : '\\n');\n    return 0;\n}\n",
    hints: [
      "Inorder means: recurse left, visit the node, recurse right.",
      "A recursive helper function is the simplest approach.",
      "You can also do it iteratively with an explicit stack if you want to avoid recursion.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "tr-002",
    slug: "height-of-binary-tree",
    title: "Height of Binary Tree",
    topic: "Trees",
    difficulty: "Easy",
    tags: ["trees", "recursion"],
    statement:
      "Given a binary tree in level-order (-1 for null), find its height (number of edges on the longest root-to-leaf path). A single node has height 0.",
    inputFormat: "First line: n.\nSecond line: n space-separated integers, level-order, -1 for null.",
    outputFormat: "A single integer: the height of the tree.",
    constraints: ["1 <= n <= 2*10^4"],
    examples: [{ input: "7\n1 2 3 4 -1 -1 5", output: "2" }],
    hiddenTests: [
      { input: "1\n1", output: "0" },
      { input: "3\n1 2 -1", output: "1" },
      { input: "5\n1 2 -1 3 -1", output: "2" },
      { input: "3\n1 -1 -1", output: "0" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct Node {\n    long long val;\n    Node* left = nullptr;\n    Node* right = nullptr;\n    Node(long long v) : val(v) {}\n};\n\nNode* buildTree(vector<long long>& vals) {\n    if (vals.empty() || vals[0] == -1) return nullptr;\n    Node* root = new Node(vals[0]);\n    queue<Node*> q; q.push(root);\n    size_t i = 1;\n    while (!q.empty() && i < vals.size()) {\n        Node* cur = q.front(); q.pop();\n        if (i < vals.size()) { long long lv = vals[i++]; if (lv != -1) { cur->left = new Node(lv); q.push(cur->left); } }\n        if (i < vals.size()) { long long rv = vals[i++]; if (rv != -1) { cur->right = new Node(rv); q.push(cur->right); } }\n    }\n    return root;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<long long> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n    Node* root = buildTree(vals);\n\n    // TODO: compute and print the height of the tree rooted at `root`\n\n    return 0;\n}\n",
    hints: [
      "height(node) = 1 + max(height(left), height(right)), with height(null) = -1.",
      "A single-node tree should give height 0 by this formula.",
      "This is a straightforward post-order recursion.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "tr-003",
    slug: "level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    topic: "Trees",
    difficulty: "Medium",
    tags: ["trees", "bfs"],
    statement:
      "Given a binary tree in level-order (-1 for null), print its level-order traversal, with each level on its own line.",
    inputFormat: "First line: n.\nSecond line: n space-separated integers, level-order, -1 for null.",
    outputFormat: "One line per level, containing that level's values space separated, top to bottom.",
    constraints: ["1 <= n <= 2*10^4"],
    examples: [{ input: "7\n3 9 20 -1 -1 15 7", output: "3\n9 20\n15 7" }],
    hiddenTests: [
      { input: "1\n1", output: "1" },
      { input: "3\n1 2 3", output: "1\n2 3" },
      { input: "5\n1 2 -1 3 -1", output: "1\n2\n3" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct Node {\n    long long val;\n    Node* left = nullptr;\n    Node* right = nullptr;\n    Node(long long v) : val(v) {}\n};\n\nNode* buildTree(vector<long long>& vals) {\n    if (vals.empty() || vals[0] == -1) return nullptr;\n    Node* root = new Node(vals[0]);\n    queue<Node*> q; q.push(root);\n    size_t i = 1;\n    while (!q.empty() && i < vals.size()) {\n        Node* cur = q.front(); q.pop();\n        if (i < vals.size()) { long long lv = vals[i++]; if (lv != -1) { cur->left = new Node(lv); q.push(cur->left); } }\n        if (i < vals.size()) { long long rv = vals[i++]; if (rv != -1) { cur->right = new Node(rv); q.push(cur->right); } }\n    }\n    return root;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<long long> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n    Node* root = buildTree(vals);\n\n    // TODO: BFS level by level, printing each level's values on its own line\n\n    return 0;\n}\n",
    hints: [
      "Use a queue for BFS. Process the queue one full level at a time.",
      "Before processing a level, record its current size (queue.size()) so you know how many nodes belong to it.",
      "Push children as you pop each node in the current level.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "tr-004",
    slug: "lca-in-bst",
    title: "Lowest Common Ancestor in a BST",
    topic: "Trees",
    difficulty: "Medium",
    tags: ["trees", "bst"],
    statement:
      "Given a binary search tree in level-order (-1 for null) and two values p and q known to exist in the tree, find the value of their lowest common ancestor.",
    inputFormat:
      "First line: n.\nSecond line: n space-separated integers, level-order, -1 for null (a valid BST).\nThird line: p and q.",
    outputFormat: "A single integer: the value of the LCA.",
    constraints: ["2 <= n <= 2*10^4", "p and q both exist in the tree and are distinct."],
    examples: [
      { input: "7\n6 2 8 0 4 7 9\n2 8", output: "6" },
      { input: "7\n6 2 8 0 4 7 9\n2 4", output: "2" },
    ],
    hiddenTests: [
      { input: "3\n2 1 3\n1 3", output: "2" },
      { input: "5\n5 3 8 1 4\n1 4", output: "3" },
      { input: "5\n5 3 8 1 4\n1 8", output: "5" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct Node {\n    long long val;\n    Node* left = nullptr;\n    Node* right = nullptr;\n    Node(long long v) : val(v) {}\n};\n\nNode* buildTree(vector<long long>& vals) {\n    if (vals.empty() || vals[0] == -1) return nullptr;\n    Node* root = new Node(vals[0]);\n    queue<Node*> q; q.push(root);\n    size_t i = 1;\n    while (!q.empty() && i < vals.size()) {\n        Node* cur = q.front(); q.pop();\n        if (i < vals.size()) { long long lv = vals[i++]; if (lv != -1) { cur->left = new Node(lv); q.push(cur->left); } }\n        if (i < vals.size()) { long long rv = vals[i++]; if (rv != -1) { cur->right = new Node(rv); q.push(cur->right); } }\n    }\n    return root;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<long long> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n    Node* root = buildTree(vals);\n    long long p, q;\n    cin >> p >> q;\n\n    // TODO: use BST ordering to walk down from root to the LCA of p and q\n\n    return 0;\n}\n",
    hints: [
      "In a BST, if both p and q are smaller than the current node, the LCA is in the left subtree.",
      "If both are larger, the LCA is in the right subtree.",
      "The first node where they diverge (or equal the node) is the LCA — you don't need recursion, a simple loop works.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "tr-005",
    slug: "diameter-of-binary-tree",
    title: "Diameter of Binary Tree",
    topic: "Trees",
    difficulty: "Medium",
    tags: ["trees", "recursion"],
    statement:
      "Given a binary tree in level-order (-1 for null), find its diameter: the length (in edges) of the longest path between any two nodes, which may or may not pass through the root.",
    inputFormat: "First line: n.\nSecond line: n space-separated integers, level-order, -1 for null.",
    outputFormat: "A single integer: the diameter.",
    constraints: ["1 <= n <= 2*10^4"],
    examples: [{ input: "7\n1 2 3 4 5 -1 -1", output: "3" }],
    hiddenTests: [
      { input: "1\n1", output: "0" },
      { input: "3\n1 2 3", output: "2" },
      { input: "5\n1 2 -1 3 -1", output: "2" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct Node {\n    long long val;\n    Node* left = nullptr;\n    Node* right = nullptr;\n    Node(long long v) : val(v) {}\n};\n\nNode* buildTree(vector<long long>& vals) {\n    if (vals.empty() || vals[0] == -1) return nullptr;\n    Node* root = new Node(vals[0]);\n    queue<Node*> q; q.push(root);\n    size_t i = 1;\n    while (!q.empty() && i < vals.size()) {\n        Node* cur = q.front(); q.pop();\n        if (i < vals.size()) { long long lv = vals[i++]; if (lv != -1) { cur->left = new Node(lv); q.push(cur->left); } }\n        if (i < vals.size()) { long long rv = vals[i++]; if (rv != -1) { cur->right = new Node(rv); q.push(cur->right); } }\n    }\n    return root;\n}\n\nint best = 0;\n\nint depth(Node* node) {\n    if (!node) return -1;\n    // TODO: compute depth of left and right, update `best` diameter, return this node's depth\n    return 0;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<long long> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n    Node* root = buildTree(vals);\n\n    depth(root);\n    cout << best << \"\\n\";\n    return 0;\n}\n",
    hints: [
      "For each node, the longest path through it is leftDepth + rightDepth + 2 (in edges).",
      "Compute depth recursively (post-order) and update a global 'best' diameter as you go.",
      "The final answer is the max diameter found across all nodes, not just the root.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
];
