import type { Problem } from "../frontend/src/types/problem";

export const graphProblems: Problem[] = [
  {
    id: "gr-001",
    slug: "bfs-traversal",
    title: "BFS Traversal of a Graph",
    topic: "Graphs",
    difficulty: "Easy",
    tags: ["graphs", "bfs"],
    statement:
      "Given an undirected graph with `n` nodes (0-indexed) and a list of edges, print the BFS traversal starting from node 0. When multiple neighbors are available, visit them in increasing order.",
    inputFormat:
      "First line: n and m (nodes, edges).\nEach of the next m lines: u v, an edge between u and v.",
    outputFormat: "The BFS order, space separated.",
    constraints: ["1 <= n <= 10^4", "0 <= m <= 2*10^4"],
    examples: [{ input: "5 4\n0 1\n0 2\n1 3\n2 4", output: "0 1 2 3 4" }],
    hiddenTests: [
      { input: "1 0\n", output: "0" },
      { input: "3 2\n0 1\n1 2", output: "0 1 2" },
      { input: "4 2\n0 1\n2 3", output: "0 1 2 3" },
      { input: "6 5\n0 1\n0 2\n1 3\n1 4\n2 5", output: "0 1 2 3 4 5" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<vector<int>> adj(n);\n    for (int i = 0; i < m; i++) {\n        int u, v; cin >> u >> v;\n        adj[u].push_back(v);\n        adj[v].push_back(u);\n    }\n    for (int i = 0; i < n; i++) sort(adj[i].begin(), adj[i].end());\n\n    // TODO: BFS starting at node 0; note the graph may be disconnected (visit remaining nodes in order)\n\n    return 0;\n}\n",
    hints: [
      "Use a queue and a visited array, standard BFS from node 0.",
      "Sort each node's adjacency list so neighbors are visited in increasing order.",
      "If the graph is disconnected, after finishing BFS from 0, continue BFS from any unvisited node in increasing order.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "gr-002",
    slug: "dfs-traversal",
    title: "DFS Traversal of a Graph",
    topic: "Graphs",
    difficulty: "Easy",
    tags: ["graphs", "dfs"],
    statement:
      "Given an undirected graph with `n` nodes and a list of edges, print the DFS traversal starting from node 0, visiting neighbors in increasing order.",
    inputFormat: "First line: n and m.\nEach of the next m lines: u v.",
    outputFormat: "The DFS order, space separated.",
    constraints: ["1 <= n <= 10^4", "0 <= m <= 2*10^4"],
    examples: [{ input: "5 4\n0 1\n0 2\n1 3\n2 4", output: "0 1 3 2 4" }],
    hiddenTests: [
      { input: "1 0\n", output: "0" },
      { input: "3 2\n0 1\n1 2", output: "0 1 2" },
      { input: "4 3\n0 1\n1 2\n1 3", output: "0 1 2 3" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<vector<int>> adj;\nvector<bool> visited;\nvector<int> order;\n\nvoid dfs(int node) {\n    // TODO: mark visited, append to order, recurse into unvisited neighbors (increasing order)\n}\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    adj.assign(n, {});\n    visited.assign(n, false);\n    for (int i = 0; i < m; i++) {\n        int u, v; cin >> u >> v;\n        adj[u].push_back(v);\n        adj[v].push_back(u);\n    }\n    for (int i = 0; i < n; i++) sort(adj[i].begin(), adj[i].end());\n\n    dfs(0);\n    for (int u = 0; u < n; u++) if (!visited[u]) dfs(u);\n\n    for (size_t i = 0; i < order.size(); i++) cout << order[i] << (i + 1 < order.size() ? ' ' : '\\n');\n    return 0;\n}\n",
    hints: [
      "Standard recursive DFS: mark the node visited, record it, then recurse into each unvisited neighbor.",
      "Sort adjacency lists first so neighbors are explored in increasing numeric order.",
      "Handle disconnected graphs by starting a new DFS from any unvisited node after the first one finishes.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "gr-003",
    slug: "number-of-islands",
    title: "Number of Islands",
    topic: "Graphs",
    difficulty: "Medium",
    tags: ["graphs", "bfs", "dfs", "grid"],
    statement:
      "Given a grid of `1`s (land) and `0`s (water), count the number of islands. An island is formed by connecting adjacent lands horizontally or vertically.",
    inputFormat: "First line: rows and cols.\nNext `rows` lines: a string of `0`s and `1`s of length `cols`.",
    outputFormat: "A single integer: the number of islands.",
    constraints: ["1 <= rows, cols <= 300"],
    examples: [
      {
        input: "4 5\n11110\n11010\n11000\n00000",
        output: "1",
      },
      {
        input: "4 5\n11000\n11000\n00100\n00011",
        output: "3",
      },
    ],
    hiddenTests: [
      { input: "1 1\n0", output: "0" },
      { input: "1 1\n1", output: "1" },
      { input: "3 3\n101\n000\n101", output: "4" },
      { input: "2 2\n11\n11", output: "1" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    cin >> rows >> cols;\n    vector<string> grid(rows);\n    for (int i = 0; i < rows; i++) cin >> grid[i];\n\n    // TODO: flood-fill (BFS or DFS) from each unvisited '1' cell, counting islands\n\n    return 0;\n}\n",
    hints: [
      "Scan every cell; when you find an unvisited '1', that's a new island — increment the count.",
      "From that cell, flood-fill (BFS or DFS) marking all connected '1' cells as visited.",
      "Only 4-directional adjacency (up/down/left/right) counts as connected.",
    ],
    timeLimitMs: 2000,
    memoryLimitMb: 256,
  },
  {
    id: "gr-004",
    slug: "detect-cycle-undirected-graph",
    title: "Detect Cycle in an Undirected Graph",
    topic: "Graphs",
    difficulty: "Medium",
    tags: ["graphs", "dfs", "union-find"],
    statement: "Given an undirected graph, determine whether it contains a cycle.",
    inputFormat: "First line: n and m.\nEach of the next m lines: u v.",
    outputFormat: "Print \"true\" if a cycle exists, otherwise \"false\".",
    constraints: ["1 <= n <= 10^4", "0 <= m <= 2*10^4"],
    examples: [
      { input: "5 5\n0 1\n1 2\n2 3\n3 4\n4 0", output: "true" },
      { input: "5 4\n0 1\n1 2\n2 3\n3 4", output: "false" },
    ],
    hiddenTests: [
      { input: "1 0\n", output: "false" },
      { input: "3 3\n0 1\n1 2\n2 0", output: "true" },
      { input: "4 2\n0 1\n2 3", output: "false" },
      { input: "6 6\n0 1\n1 2\n2 0\n3 4\n4 5\n5 3", output: "true" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<vector<int>> adj(n);\n    vector<pair<int,int>> edges(m);\n    for (int i = 0; i < m; i++) {\n        int u, v; cin >> u >> v;\n        adj[u].push_back(v);\n        adj[v].push_back(u);\n        edges[i] = {u, v};\n    }\n\n    // TODO: detect a cycle using DFS (track parent) or union-find across all components\n\n    return 0;\n}\n",
    hints: [
      "DFS approach: for each unvisited node, DFS while tracking the parent that led to the current node.",
      "If you reach a visited neighbor that is NOT the parent, a cycle exists.",
      "Alternatively, use union-find: if an edge connects two nodes already in the same set, that's a cycle.",
    ],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: "gr-005",
    slug: "dijkstra-shortest-path",
    title: "Dijkstra's Shortest Path",
    topic: "Graphs",
    difficulty: "Hard",
    tags: ["graphs", "dijkstra", "shortest-path", "heap"],
    statement:
      "Given a weighted, undirected graph with `n` nodes and non-negative edge weights, find the shortest distance from node 0 to every other node. If a node is unreachable, its distance is -1.",
    inputFormat:
      "First line: n and m.\nEach of the next m lines: u v w (an edge between u and v with weight w).",
    outputFormat: "n space-separated integers: shortest distance from node 0 to node i, for i = 0..n-1.",
    constraints: ["1 <= n <= 10^4", "0 <= m <= 2*10^4", "0 <= w <= 1000"],
    examples: [
      {
        input: "5 6\n0 1 4\n0 2 1\n2 1 2\n1 3 1\n2 3 5\n3 4 3",
        output: "0 3 1 4 7",
      },
    ],
    hiddenTests: [
      { input: "1 0\n", output: "0" },
      { input: "3 1\n0 1 5\n", output: "0 5 -1" },
      { input: "4 3\n0 1 1\n1 2 1\n2 3 1", output: "0 1 2 3" },
      { input: "3 3\n0 1 10\n0 2 3\n2 1 2", output: "0 5 3" },
    ],
    starterCode:
      "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<vector<pair<int,long long>>> adj(n); // neighbor, weight\n    for (int i = 0; i < m; i++) {\n        int u, v; long long w;\n        cin >> u >> v >> w;\n        adj[u].push_back({v, w});\n        adj[v].push_back({u, w});\n    }\n\n    // TODO: run Dijkstra's algorithm from node 0 using a min-heap; print -1 for unreachable nodes\n\n    return 0;\n}\n",
    hints: [
      "Use a min-heap (priority_queue) of (distance, node), always expanding the closest unvisited node.",
      "Initialize all distances to infinity except node 0, which is 0.",
      "When popping a node, if its recorded distance in the heap is stale (worse than the current best), skip it.",
    ],
    timeLimitMs: 2000,
    memoryLimitMb: 256,
  },
];
