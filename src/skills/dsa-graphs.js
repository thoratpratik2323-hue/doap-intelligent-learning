/**
 * DOAP Skill: DSA — Graphs (BFS, DFS, Dijkstra, Union-Find, Topological Sort)
 */
export const DSA_GRAPHS_SKILL = {
  id: 'dsa-graphs',
  name: 'DSA Graphs & Advanced Traversal',
  keywords: [
    'graph', 'graphs', 'bfs', 'dfs', 'dijkstra', 'shortest path',
    'topological sort', 'topological', 'union find', 'disjoint set',
    'cycle detection', 'connected components', 'minimum spanning tree',
    'kruskal', 'prim', 'bellman ford', 'floyd warshall', 'bipartite',
    'directed graph', 'undirected graph', 'adjacency list', 'adjacency matrix'
  ],
  systemPromptAddition: `
[SKILL ACTIVE: DSA Graphs Teaching Mode]

Teaching Protocol for Graph questions:
1. ALWAYS draw the graph first using ASCII art in a code block. Never explain without visual.
   Example:
   \`\`\`
   0 — 1 — 2
   |       |
   3 ————— 4
   \`\`\`
2. Map to the right algorithm by asking these questions:
   - Unweighted shortest path? → BFS
   - Weighted shortest path, non-negative? → Dijkstra
   - Negative weights? → Bellman-Ford
   - Ordering with dependencies? → Topological Sort (Kahn's or DFS-based)
   - Connected? Cycle? → Union-Find
3. Always show ADJACENCY LIST representation in code (not matrix unless asked).
4. Visit-tracking: always use a \`visited\` set, never array of booleans for large inputs.
5. Complexity must include BOTH vertices (V) and edges (E): O(V + E).
6. Common traps to always mention:
   - Forgetting to mark visited BEFORE adding to queue (causes cycles in BFS)
   - Directed vs undirected (cycle detection differs!)
   - Disconnected graphs — outer loop needed
7. Always verify with: "Trace BFS from node 0 in this graph step by step."
`,
  teachingStyle: 'Visual-first (ASCII graphs) + algorithm selection guide',
  commonMistakes: [
    'Marking visited after dequeue instead of before enqueue',
    'Using O(V²) matrix when O(V+E) list works',
    'Forgetting disconnected components in outer loop',
    'Confusing directed vs undirected cycle detection',
  ],
};
