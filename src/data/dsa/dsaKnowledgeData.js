// DOAP DSA LLM Knowledge Base Complete v2.0
// Sourced from authoritative DSA LLM Knowledge Base:
// 105 Knowledge Base Records | 137 Curated Problems | 315 Concept Quizzes

export const DSA_METADATA = {
  "name": "DSA LLM Knowledge Base Complete",
  "version": "2.0",
  "source_foundation": "DSA_LLM_Knowledge_Base_v1.md/jsonl",
  "records": 105,
  "new_semantic_records": 88,
  "problems": 137,
  "quizzes": 315,
  "categories": {
    "General": 17,
    "Data Structures": 3,
    "Algorithms": 5,
    "Arrays": 8,
    "Linked Lists": 4,
    "Stacks": 3,
    "Queues": 2,
    "Hashing": 1,
    "Heaps": 2,
    "Trees": 4,
    "Graphs": 19,
    "Searching": 3,
    "Sorting": 7,
    "Greedy": 3,
    "Dynamic Programming": 9,
    "Strings": 5,
    "Bit Manipulation": 1,
    "Range Queries": 3,
    "Selection": 1,
    "Advanced Patterns": 3,
    "Tries": 1,
    "Randomized Algorithms": 1
  },
  "files": [
    "DSA_LLM_Knowledge_Base_COMPLETE.md",
    "DSA_LLM_Knowledge_Base_COMPLETE.jsonl",
    "DSA_LLM_Problem_Bank.jsonl",
    "DSA_LLM_Quiz_Bank.jsonl"
  ],
  "coverage": [
    "foundations",
    "arrays",
    "strings",
    "linked lists",
    "stacks",
    "queues",
    "hashing",
    "recursion",
    "backtracking",
    "sorting",
    "searching",
    "trees",
    "BST",
    "AVL",
    "heaps",
    "graphs",
    "BFS",
    "DFS",
    "topological sort",
    "shortest paths",
    "MST",
    "DSU",
    "greedy",
    "dynamic programming",
    "tries",
    "Fenwick trees",
    "segment trees",
    "bit manipulation",
    "sliding window",
    "two pointers",
    "prefix sums",
    "difference arrays",
    "monotonic stacks",
    "advanced graph connectivity",
    "advanced string matching",
    "advanced tree queries",
    "randomized algorithms"
  ],
  "qa": [
    "preserved v1 JSONL records",
    "semantic IDs unique",
    "structured JSONL output",
    "original problem and quiz banks",
    "complexity fields attached to algorithm records"
  ]
};

export const DSA_PROBLEMS = [
  {
    "id": 101,
    "originalId": "p-array-01",
    "title": "Stable Zero Compaction",
    "difficulty": "Easy",
    "category": "Arrays",
    "topic": "Arrays",
    "pattern": "two pointers",
    "description": "Given an integer array, move every zero to the end while preserving the relative order of all non-zero elements. Modify the array in place.",
    "statement": "Given an integer array, move every zero to the end while preserving the relative order of all non-zero elements. Modify the array in place.",
    "constraints": [
      "1 <= n <= 2*10^5; values fit 64-bit signed integers"
    ],
    "examples": [
      {
        "input": "[0,1,0,3,12]",
        "output": "[1,3,12,0,0]",
        "explanation": "Example 1"
      }
    ],
    "hints": [
      "Can you maintain a write position for the next non-zero?",
      "What happens when the current index is already the write index?"
    ],
    "hint": "Can you maintain a write position for the next non-zero?",
    "expected_approach": "Use a read pointer and a write pointer; copy non-zero values forward and fill the suffix with zeros.",
    "target_complexity": "O(n) time, O(1) auxiliary space",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Stable Zero Compaction\n * Topic: Arrays | Pattern: two pointers\n * Target Complexity: O(n) time, O(1) auxiliary space\n */\nfunction stableZeroCompaction(input) {\n  // TODO: Implement Use a read pointer and a write pointer; copy non-zero values forward and fill the suffix with zeros.\n  \n}\n",
      "python": "# Stable Zero Compaction\n# Topic: Arrays | Pattern: two pointers\n# Target Complexity: O(n) time, O(1) auxiliary space\n\ndef stableZeroCompaction(input):\n    # TODO: Implement Use a read pointer and a write pointer; copy non-zero values forward and fill the suffix with zeros.\n    pass\n",
      "java": "// Stable Zero Compaction\n// Topic: Arrays | Pattern: two pointers\n// Target Complexity: O(n) time, O(1) auxiliary space\n\nclass Solution {\n    public static Object stableZeroCompaction(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Stable Zero Compaction\n// Topic: Arrays | Pattern: two pointers\n// Target Complexity: O(n) time, O(1) auxiliary space\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid stableZeroCompaction() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Stable Zero Compaction\n * Topic: Arrays | Pattern: two pointers\n * Target Complexity: O(n) time, O(1) auxiliary space\n */\nfunction stableZeroCompaction(input) {\n  // TODO: Implement Use a read pointer and a write pointer; copy non-zero values forward and fill the suffix with zeros.\n  \n}\n",
    "functionName": "stableZeroCompaction",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 102,
    "originalId": "p-array-02",
    "title": "Range Add Ledger",
    "difficulty": "Medium",
    "category": "Arrays",
    "topic": "Arrays",
    "pattern": "difference array",
    "description": "You receive n initially-zero accounts and q offline operations. Each operation adds x to every account in [l,r]. Output all final balances.",
    "statement": "You receive n initially-zero accounts and q offline operations. Each operation adds x to every account in [l,r]. Output all final balances.",
    "constraints": [
      "1 <= n,q <= 2*10^5; -10^9 <= x <= 10^9"
    ],
    "examples": [
      {
        "input": "n=5; updates [1,3,+4],[2,5,+2]",
        "output": "[4,6,6,2,2]",
        "explanation": "Example 1"
      }
    ],
    "hints": [
      "A direct update costs O(n) per query.",
      "Represent only where an interval starts and stops."
    ],
    "hint": "A direct update costs O(n) per query.",
    "expected_approach": "Use a difference array with a sentinel at r+1, then prefix-accumulate once.",
    "target_complexity": "O(n+q) time, O(n) space",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Range Add Ledger\n * Topic: Arrays | Pattern: difference array\n * Target Complexity: O(n+q) time, O(n) space\n */\nfunction rangeAddLedger(input) {\n  // TODO: Implement Use a difference array with a sentinel at r+1, then prefix-accumulate once.\n  \n}\n",
      "python": "# Range Add Ledger\n# Topic: Arrays | Pattern: difference array\n# Target Complexity: O(n+q) time, O(n) space\n\ndef rangeAddLedger(input):\n    # TODO: Implement Use a difference array with a sentinel at r+1, then prefix-accumulate once.\n    pass\n",
      "java": "// Range Add Ledger\n// Topic: Arrays | Pattern: difference array\n// Target Complexity: O(n+q) time, O(n) space\n\nclass Solution {\n    public static Object rangeAddLedger(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Range Add Ledger\n// Topic: Arrays | Pattern: difference array\n// Target Complexity: O(n+q) time, O(n) space\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid rangeAddLedger() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Range Add Ledger\n * Topic: Arrays | Pattern: difference array\n * Target Complexity: O(n+q) time, O(n) space\n */\nfunction rangeAddLedger(input) {\n  // TODO: Implement Use a difference array with a sentinel at r+1, then prefix-accumulate once.\n  \n}\n",
    "functionName": "rangeAddLedger",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 103,
    "originalId": "p-string-01",
    "title": "First Unique Character",
    "difficulty": "Easy",
    "category": "Strings",
    "topic": "Strings",
    "pattern": "frequency map",
    "description": "Return the index of the first character that occurs exactly once in a string, or -1 if none exists.",
    "statement": "Return the index of the first character that occurs exactly once in a string, or -1 if none exists.",
    "constraints": [
      "1 <= n <= 2*10^5; input is lowercase English letters"
    ],
    "examples": [
      {
        "input": "\"swiss\"",
        "output": "1",
        "explanation": "Example 1"
      }
    ],
    "hints": [
      "Count first, scan second.",
      "Do not return the first character that is merely different from its neighbors."
    ],
    "hint": "Count first, scan second.",
    "expected_approach": "Frequency count followed by a left-to-right scan.",
    "target_complexity": "O(n) time, O(1) alphabet space",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * First Unique Character\n * Topic: Strings | Pattern: frequency map\n * Target Complexity: O(n) time, O(1) alphabet space\n */\nfunction firstUniqueCharacter(input) {\n  // TODO: Implement Frequency count followed by a left-to-right scan.\n  \n}\n",
      "python": "# First Unique Character\n# Topic: Strings | Pattern: frequency map\n# Target Complexity: O(n) time, O(1) alphabet space\n\ndef firstUniqueCharacter(input):\n    # TODO: Implement Frequency count followed by a left-to-right scan.\n    pass\n",
      "java": "// First Unique Character\n// Topic: Strings | Pattern: frequency map\n// Target Complexity: O(n) time, O(1) alphabet space\n\nclass Solution {\n    public static Object firstUniqueCharacter(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// First Unique Character\n// Topic: Strings | Pattern: frequency map\n// Target Complexity: O(n) time, O(1) alphabet space\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid firstUniqueCharacter() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * First Unique Character\n * Topic: Strings | Pattern: frequency map\n * Target Complexity: O(n) time, O(1) alphabet space\n */\nfunction firstUniqueCharacter(input) {\n  // TODO: Implement Frequency count followed by a left-to-right scan.\n  \n}\n",
    "functionName": "firstUniqueCharacter",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 104,
    "originalId": "p-string-02",
    "title": "Pattern Prefix Detector",
    "difficulty": "Medium",
    "category": "Strings",
    "topic": "Strings",
    "pattern": "KMP prefix function",
    "description": "Given a string, find the longest proper prefix that is also a suffix.",
    "statement": "Given a string, find the longest proper prefix that is also a suffix.",
    "constraints": [
      "1 <= n <= 10^6; lowercase letters"
    ],
    "examples": [
      {
        "input": "\"ababa\"",
        "output": "\"aba\"",
        "explanation": "Example 1"
      }
    ],
    "hints": [
      "Compute the prefix function rather than comparing every prefix and suffix.",
      "On mismatch, jump using the previous prefix length."
    ],
    "hint": "Compute the prefix function rather than comparing every prefix and suffix.",
    "expected_approach": "Build KMP prefix-function values and return the final value length.",
    "target_complexity": "O(n) time, O(n) space",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Pattern Prefix Detector\n * Topic: Strings | Pattern: KMP prefix function\n * Target Complexity: O(n) time, O(n) space\n */\nfunction patternPrefixDetector(input) {\n  // TODO: Implement Build KMP prefix-function values and return the final value length.\n  \n}\n",
      "python": "# Pattern Prefix Detector\n# Topic: Strings | Pattern: KMP prefix function\n# Target Complexity: O(n) time, O(n) space\n\ndef patternPrefixDetector(input):\n    # TODO: Implement Build KMP prefix-function values and return the final value length.\n    pass\n",
      "java": "// Pattern Prefix Detector\n// Topic: Strings | Pattern: KMP prefix function\n// Target Complexity: O(n) time, O(n) space\n\nclass Solution {\n    public static Object patternPrefixDetector(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Pattern Prefix Detector\n// Topic: Strings | Pattern: KMP prefix function\n// Target Complexity: O(n) time, O(n) space\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid patternPrefixDetector() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Pattern Prefix Detector\n * Topic: Strings | Pattern: KMP prefix function\n * Target Complexity: O(n) time, O(n) space\n */\nfunction patternPrefixDetector(input) {\n  // TODO: Implement Build KMP prefix-function values and return the final value length.\n  \n}\n",
    "functionName": "patternPrefixDetector",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 105,
    "originalId": "p-list-01",
    "title": "Remove Middle Node",
    "difficulty": "Medium",
    "category": "Linked Lists",
    "topic": "Linked Lists",
    "pattern": "slow-fast pointers",
    "description": "Given the head of a singly linked list, remove its middle node. For even length, remove the second of the two middle nodes.",
    "statement": "Given the head of a singly linked list, remove its middle node. For even length, remove the second of the two middle nodes.",
    "constraints": [
      "0 <= n <= 2*10^5"
    ],
    "examples": [
      {
        "input": "1",
        "output": "2",
        "explanation": "Example 1"
      }
    ],
    "hints": [
      "Use slow and fast pointers.",
      "Track the predecessor of slow so you can unlink it."
    ],
    "hint": "Use slow and fast pointers.",
    "expected_approach": "Move fast two steps and slow one step; maintain prevSlow.",
    "target_complexity": "O(n) time, O(1) auxiliary space",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Remove Middle Node\n * Topic: Linked Lists | Pattern: slow-fast pointers\n * Target Complexity: O(n) time, O(1) auxiliary space\n */\nfunction removeMiddleNode(input) {\n  // TODO: Implement Move fast two steps and slow one step; maintain prevSlow.\n  \n}\n",
      "python": "# Remove Middle Node\n# Topic: Linked Lists | Pattern: slow-fast pointers\n# Target Complexity: O(n) time, O(1) auxiliary space\n\ndef removeMiddleNode(input):\n    # TODO: Implement Move fast two steps and slow one step; maintain prevSlow.\n    pass\n",
      "java": "// Remove Middle Node\n// Topic: Linked Lists | Pattern: slow-fast pointers\n// Target Complexity: O(n) time, O(1) auxiliary space\n\nclass Solution {\n    public static Object removeMiddleNode(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Remove Middle Node\n// Topic: Linked Lists | Pattern: slow-fast pointers\n// Target Complexity: O(n) time, O(1) auxiliary space\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid removeMiddleNode() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Remove Middle Node\n * Topic: Linked Lists | Pattern: slow-fast pointers\n * Target Complexity: O(n) time, O(1) auxiliary space\n */\nfunction removeMiddleNode(input) {\n  // TODO: Implement Move fast two steps and slow one step; maintain prevSlow.\n  \n}\n",
    "functionName": "removeMiddleNode",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 106,
    "originalId": "p-stack-01",
    "title": "Next Warmer Reading",
    "difficulty": "Medium",
    "category": "Stacks",
    "topic": "Stacks",
    "pattern": "monotonic stack",
    "description": "Given daily temperatures, return for each day how many days one must wait to see a strictly warmer temperature; return 0 when none exists.",
    "statement": "Given daily temperatures, return for each day how many days one must wait to see a strictly warmer temperature; return 0 when none exists.",
    "constraints": [
      "1 <= n <= 2*10^5"
    ],
    "examples": [
      {
        "input": "[73,74,72,76]",
        "output": "[1,2,1,0]",
        "explanation": "Example 1"
      }
    ],
    "hints": [
      "Keep indices whose answer is not known.",
      "When the current value is greater than the stack top value, the current day resolves that earlier day."
    ],
    "hint": "Keep indices whose answer is not known.",
    "expected_approach": "Use a decreasing stack of indices.",
    "target_complexity": "O(n) time, O(n) space",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Next Warmer Reading\n * Topic: Stacks | Pattern: monotonic stack\n * Target Complexity: O(n) time, O(n) space\n */\nfunction nextWarmerReading(input) {\n  // TODO: Implement Use a decreasing stack of indices.\n  \n}\n",
      "python": "# Next Warmer Reading\n# Topic: Stacks | Pattern: monotonic stack\n# Target Complexity: O(n) time, O(n) space\n\ndef nextWarmerReading(input):\n    # TODO: Implement Use a decreasing stack of indices.\n    pass\n",
      "java": "// Next Warmer Reading\n// Topic: Stacks | Pattern: monotonic stack\n// Target Complexity: O(n) time, O(n) space\n\nclass Solution {\n    public static Object nextWarmerReading(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Next Warmer Reading\n// Topic: Stacks | Pattern: monotonic stack\n// Target Complexity: O(n) time, O(n) space\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid nextWarmerReading() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Next Warmer Reading\n * Topic: Stacks | Pattern: monotonic stack\n * Target Complexity: O(n) time, O(n) space\n */\nfunction nextWarmerReading(input) {\n  // TODO: Implement Use a decreasing stack of indices.\n  \n}\n",
    "functionName": "nextWarmerReading",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 107,
    "originalId": "p-tree-01",
    "title": "Diameter of a Binary Tree",
    "difficulty": "Medium",
    "category": "Trees",
    "topic": "Trees",
    "pattern": "tree DP",
    "description": "Return the number of edges on the longest path between any two nodes in a binary tree.",
    "statement": "Return the number of edges on the longest path between any two nodes in a binary tree.",
    "constraints": [
      "0 <= n <= 2*10^5; tree may be skewed"
    ],
    "examples": [
      {
        "input": "1 with children 2 and 3",
        "output": "2",
        "explanation": "Example 1"
      }
    ],
    "hints": [
      "At each node, the best path through that node uses the deepest left and right downward paths.",
      "Return height upward while updating a global diameter."
    ],
    "hint": "At each node, the best path through that node uses the deepest left and right downward paths.",
    "expected_approach": "Postorder DFS computing height and updating max(leftHeight+rightHeight).",
    "target_complexity": "O(n) time, O(h) auxiliary space",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Diameter of a Binary Tree\n * Topic: Trees | Pattern: tree DP\n * Target Complexity: O(n) time, O(h) auxiliary space\n */\nfunction diameterOfABinaryTree(input) {\n  // TODO: Implement Postorder DFS computing height and updating max(leftHeight+rightHeight).\n  \n}\n",
      "python": "# Diameter of a Binary Tree\n# Topic: Trees | Pattern: tree DP\n# Target Complexity: O(n) time, O(h) auxiliary space\n\ndef diameterOfABinaryTree(input):\n    # TODO: Implement Postorder DFS computing height and updating max(leftHeight+rightHeight).\n    pass\n",
      "java": "// Diameter of a Binary Tree\n// Topic: Trees | Pattern: tree DP\n// Target Complexity: O(n) time, O(h) auxiliary space\n\nclass Solution {\n    public static Object diameterOfABinaryTree(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Diameter of a Binary Tree\n// Topic: Trees | Pattern: tree DP\n// Target Complexity: O(n) time, O(h) auxiliary space\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid diameterOfABinaryTree() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Diameter of a Binary Tree\n * Topic: Trees | Pattern: tree DP\n * Target Complexity: O(n) time, O(h) auxiliary space\n */\nfunction diameterOfABinaryTree(input) {\n  // TODO: Implement Postorder DFS computing height and updating max(leftHeight+rightHeight).\n  \n}\n",
    "functionName": "diameterOfABinaryTree",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 108,
    "originalId": "p-tree-02",
    "title": "Validate Ordered Tree",
    "difficulty": "Medium",
    "category": "Trees",
    "topic": "Trees",
    "pattern": "invariant/range",
    "description": "Determine whether a binary tree satisfies a strict BST ordering policy: every left descendant is smaller and every right descendant is larger.",
    "statement": "Determine whether a binary tree satisfies a strict BST ordering policy: every left descendant is smaller and every right descendant is larger.",
    "constraints": [
      "node keys fit 64-bit signed integers"
    ],
    "examples": [
      {
        "input": "2/1/3",
        "output": "true; 5/1/4 with 3 under 4",
        "explanation": "Example 1"
      }
    ],
    "hints": [
      "Checking only immediate children is insufficient.",
      "Carry valid lower and upper bounds down the tree."
    ],
    "hint": "Checking only immediate children is insufficient.",
    "expected_approach": "Recursive bounds or iterative stack of (node,low,high).",
    "target_complexity": "O(n) time, O(h) space",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Validate Ordered Tree\n * Topic: BST | Pattern: invariant/range\n * Target Complexity: O(n) time, O(h) space\n */\nfunction validateOrderedTree(input) {\n  // TODO: Implement Recursive bounds or iterative stack of (node,low,high).\n  \n}\n",
      "python": "# Validate Ordered Tree\n# Topic: BST | Pattern: invariant/range\n# Target Complexity: O(n) time, O(h) space\n\ndef validateOrderedTree(input):\n    # TODO: Implement Recursive bounds or iterative stack of (node,low,high).\n    pass\n",
      "java": "// Validate Ordered Tree\n// Topic: BST | Pattern: invariant/range\n// Target Complexity: O(n) time, O(h) space\n\nclass Solution {\n    public static Object validateOrderedTree(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Validate Ordered Tree\n// Topic: BST | Pattern: invariant/range\n// Target Complexity: O(n) time, O(h) space\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid validateOrderedTree() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Validate Ordered Tree\n * Topic: BST | Pattern: invariant/range\n * Target Complexity: O(n) time, O(h) space\n */\nfunction validateOrderedTree(input) {\n  // TODO: Implement Recursive bounds or iterative stack of (node,low,high).\n  \n}\n",
    "functionName": "validateOrderedTree",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 109,
    "originalId": "p-graph-01",
    "title": "Fewest Transfers",
    "difficulty": "Medium",
    "category": "Graphs",
    "topic": "Graphs",
    "pattern": "BFS",
    "description": "Given an unweighted graph of stations, return the minimum number of edges from source to destination, or -1 if unreachable.",
    "statement": "Given an unweighted graph of stations, return the minimum number of edges from source to destination, or -1 if unreachable.",
    "constraints": [
      "1 <= V,E <= 2*10^5"
    ],
    "examples": [
      {
        "input": "edges 0-1,1-3,0-2,2-3; 0",
        "output": "3 = 2",
        "explanation": "Example 1"
      }
    ],
    "hints": [
      "Shortest path in an unweighted graph suggests a specific traversal.",
      "Store distance when a node is first discovered."
    ],
    "hint": "Shortest path in an unweighted graph suggests a specific traversal.",
    "expected_approach": "BFS from the source.",
    "target_complexity": "O(V+E) time, O(V) space",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Fewest Transfers\n * Topic: Graphs | Pattern: BFS\n * Target Complexity: O(V+E) time, O(V) space\n */\nfunction fewestTransfers(input) {\n  // TODO: Implement BFS from the source.\n  \n}\n",
      "python": "# Fewest Transfers\n# Topic: Graphs | Pattern: BFS\n# Target Complexity: O(V+E) time, O(V) space\n\ndef fewestTransfers(input):\n    # TODO: Implement BFS from the source.\n    pass\n",
      "java": "// Fewest Transfers\n// Topic: Graphs | Pattern: BFS\n// Target Complexity: O(V+E) time, O(V) space\n\nclass Solution {\n    public static Object fewestTransfers(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Fewest Transfers\n// Topic: Graphs | Pattern: BFS\n// Target Complexity: O(V+E) time, O(V) space\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid fewestTransfers() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Fewest Transfers\n * Topic: Graphs | Pattern: BFS\n * Target Complexity: O(V+E) time, O(V) space\n */\nfunction fewestTransfers(input) {\n  // TODO: Implement BFS from the source.\n  \n}\n",
    "functionName": "fewestTransfers",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 110,
    "originalId": "p-graph-02",
    "title": "Dependency Feasibility",
    "difficulty": "Medium",
    "category": "Graphs",
    "topic": "Graphs",
    "pattern": "topological sort",
    "description": "Given tasks and prerequisite edges u->v, determine whether all tasks can be completed.",
    "statement": "Given tasks and prerequisite edges u->v, determine whether all tasks can be completed.",
    "constraints": [
      "1 <= V,E <= 2*10^5"
    ],
    "examples": [
      {
        "input": "3; 0",
        "output": "1,1",
        "explanation": "Example 1"
      }
    ],
    "hints": [
      "A cycle prevents a valid dependency order.",
      "Try indegrees and repeatedly remove zero-indegree tasks."
    ],
    "hint": "A cycle prevents a valid dependency order.",
    "expected_approach": "Kahn’s algorithm; successful processing of all V vertices means feasible.",
    "target_complexity": "O(V+E) time, O(V) space",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Dependency Feasibility\n * Topic: Graphs | Pattern: topological sort\n * Target Complexity: O(V+E) time, O(V) space\n */\nfunction dependencyFeasibility(input) {\n  // TODO: Implement Kahn’s algorithm; successful processing of all V vertices means feasible.\n  \n}\n",
      "python": "# Dependency Feasibility\n# Topic: Graphs | Pattern: topological sort\n# Target Complexity: O(V+E) time, O(V) space\n\ndef dependencyFeasibility(input):\n    # TODO: Implement Kahn’s algorithm; successful processing of all V vertices means feasible.\n    pass\n",
      "java": "// Dependency Feasibility\n// Topic: Graphs | Pattern: topological sort\n// Target Complexity: O(V+E) time, O(V) space\n\nclass Solution {\n    public static Object dependencyFeasibility(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Dependency Feasibility\n// Topic: Graphs | Pattern: topological sort\n// Target Complexity: O(V+E) time, O(V) space\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid dependencyFeasibility() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Dependency Feasibility\n * Topic: Graphs | Pattern: topological sort\n * Target Complexity: O(V+E) time, O(V) space\n */\nfunction dependencyFeasibility(input) {\n  // TODO: Implement Kahn’s algorithm; successful processing of all V vertices means feasible.\n  \n}\n",
    "functionName": "dependencyFeasibility",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 111,
    "originalId": "p-graph-03",
    "title": "Safe Weighted Routes",
    "difficulty": "Medium",
    "category": "Graphs",
    "topic": "Graphs",
    "pattern": "Dijkstra",
    "description": "Given a directed graph with non-negative edge weights, return shortest distances from source to every vertex.",
    "statement": "Given a directed graph with non-negative edge weights, return shortest distances from source to every vertex.",
    "constraints": [
      "1 <= V,E <= 2*10^5; weights 0..10^9"
    ],
    "examples": [
      {
        "input": "0",
        "output": "1=4,0",
        "explanation": "Example 1"
      }
    ],
    "hints": [
      "Negative weights are not present.",
      "Use a min-priority queue and skip stale entries."
    ],
    "hint": "Negative weights are not present.",
    "expected_approach": "Dijkstra with adjacency list and binary heap.",
    "target_complexity": "O((V+E)log V) time",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Safe Weighted Routes\n * Topic: Graphs | Pattern: Dijkstra\n * Target Complexity: O((V+E)log V) time\n */\nfunction safeWeightedRoutes(input) {\n  // TODO: Implement Dijkstra with adjacency list and binary heap.\n  \n}\n",
      "python": "# Safe Weighted Routes\n# Topic: Graphs | Pattern: Dijkstra\n# Target Complexity: O((V+E)log V) time\n\ndef safeWeightedRoutes(input):\n    # TODO: Implement Dijkstra with adjacency list and binary heap.\n    pass\n",
      "java": "// Safe Weighted Routes\n// Topic: Graphs | Pattern: Dijkstra\n// Target Complexity: O((V+E)log V) time\n\nclass Solution {\n    public static Object safeWeightedRoutes(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Safe Weighted Routes\n// Topic: Graphs | Pattern: Dijkstra\n// Target Complexity: O((V+E)log V) time\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid safeWeightedRoutes() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Safe Weighted Routes\n * Topic: Graphs | Pattern: Dijkstra\n * Target Complexity: O((V+E)log V) time\n */\nfunction safeWeightedRoutes(input) {\n  // TODO: Implement Dijkstra with adjacency list and binary heap.\n  \n}\n",
    "functionName": "safeWeightedRoutes",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 112,
    "originalId": "p-dp-01",
    "title": "Exact Sum Ways",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "1D DP",
    "description": "Given coin denominations and a target amount, count the number of combinations that reach the target when each denomination may be used unlimited times and order does not matter.",
    "statement": "Given coin denominations and a target amount, count the number of combinations that reach the target when each denomination may be used unlimited times and order does not matter.",
    "constraints": [
      "1 <= target <= 5000; 1 <= number of coins <= 50"
    ],
    "examples": [
      {
        "input": "coins [1,2,5], target 5",
        "output": "4",
        "explanation": "Example 1"
      }
    ],
    "hints": [
      "Decide whether order matters.",
      "Loop over coins outside the amount loop to count combinations rather than permutations."
    ],
    "hint": "Decide whether order matters.",
    "expected_approach": "Unbounded knapsack counting DP.",
    "target_complexity": "O(target * number_of_coins) time, O(target) space",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Exact Sum Ways\n * Topic: DP | Pattern: 1D DP\n * Target Complexity: O(target * number_of_coins) time, O(target) space\n */\nfunction exactSumWays(input) {\n  // TODO: Implement Unbounded knapsack counting DP.\n  \n}\n",
      "python": "# Exact Sum Ways\n# Topic: DP | Pattern: 1D DP\n# Target Complexity: O(target * number_of_coins) time, O(target) space\n\ndef exactSumWays(input):\n    # TODO: Implement Unbounded knapsack counting DP.\n    pass\n",
      "java": "// Exact Sum Ways\n// Topic: DP | Pattern: 1D DP\n// Target Complexity: O(target * number_of_coins) time, O(target) space\n\nclass Solution {\n    public static Object exactSumWays(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Exact Sum Ways\n// Topic: DP | Pattern: 1D DP\n// Target Complexity: O(target * number_of_coins) time, O(target) space\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid exactSumWays() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Exact Sum Ways\n * Topic: DP | Pattern: 1D DP\n * Target Complexity: O(target * number_of_coins) time, O(target) space\n */\nfunction exactSumWays(input) {\n  // TODO: Implement Unbounded knapsack counting DP.\n  \n}\n",
    "functionName": "exactSumWays",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 113,
    "originalId": "p-dp-02",
    "title": "Two-Row Edit Cost",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "edit distance",
    "description": "Given two strings and costs for insertion, deletion and substitution, find the minimum transformation cost.",
    "statement": "Given two strings and costs for insertion, deletion and substitution, find the minimum transformation cost.",
    "constraints": [
      "1 <= n,m <= 3000; costs are non-negative"
    ],
    "examples": [
      {
        "input": "a",
        "output": "b with substitution cost 2",
        "explanation": "Example 1"
      }
    ],
    "hints": [
      "The state needs both prefix lengths.",
      "A row-by-row implementation can reduce memory if only the cost is required."
    ],
    "hint": "The state needs both prefix lengths.",
    "expected_approach": "Edit-distance DP with custom operation costs.",
    "target_complexity": "O(nm) time, O(min(n,m)) space optimized",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Two-Row Edit Cost\n * Topic: DP | Pattern: edit distance\n * Target Complexity: O(nm) time, O(min(n,m)) space optimized\n */\nfunction tworowEditCost(input) {\n  // TODO: Implement Edit-distance DP with custom operation costs.\n  \n}\n",
      "python": "# Two-Row Edit Cost\n# Topic: DP | Pattern: edit distance\n# Target Complexity: O(nm) time, O(min(n,m)) space optimized\n\ndef tworowEditCost(input):\n    # TODO: Implement Edit-distance DP with custom operation costs.\n    pass\n",
      "java": "// Two-Row Edit Cost\n// Topic: DP | Pattern: edit distance\n// Target Complexity: O(nm) time, O(min(n,m)) space optimized\n\nclass Solution {\n    public static Object tworowEditCost(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Two-Row Edit Cost\n// Topic: DP | Pattern: edit distance\n// Target Complexity: O(nm) time, O(min(n,m)) space optimized\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid tworowEditCost() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Two-Row Edit Cost\n * Topic: DP | Pattern: edit distance\n * Target Complexity: O(nm) time, O(min(n,m)) space optimized\n */\nfunction tworowEditCost(input) {\n  // TODO: Implement Edit-distance DP with custom operation costs.\n  \n}\n",
    "functionName": "tworowEditCost",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 114,
    "originalId": "p-range-01",
    "title": "Dynamic Range Sum",
    "difficulty": "Medium",
    "category": "Range Queries",
    "topic": "Range Queries",
    "pattern": "Fenwick tree",
    "description": "Maintain an integer array under point additions and answer range-sum queries online.",
    "statement": "Maintain an integer array under point additions and answer range-sum queries online.",
    "constraints": [
      "1 <= n,q <= 2*10^5"
    ],
    "examples": [
      {
        "input": "add(3,+5), sum(2,4)",
        "output": "5",
        "explanation": "Example 1"
      }
    ],
    "hints": [
      "Range sum can be written as two prefix sums.",
      "Fenwick formulas are easiest with 1-based indexing."
    ],
    "hint": "Range sum can be written as two prefix sums.",
    "expected_approach": "Fenwick tree supporting point update and prefix sum.",
    "target_complexity": "O(log n) per operation, O(n) space",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Dynamic Range Sum\n * Topic: Fenwick Tree | Pattern: Fenwick tree\n * Target Complexity: O(log n) per operation, O(n) space\n */\nfunction dynamicRangeSum(input) {\n  // TODO: Implement Fenwick tree supporting point update and prefix sum.\n  \n}\n",
      "python": "# Dynamic Range Sum\n# Topic: Fenwick Tree | Pattern: Fenwick tree\n# Target Complexity: O(log n) per operation, O(n) space\n\ndef dynamicRangeSum(input):\n    # TODO: Implement Fenwick tree supporting point update and prefix sum.\n    pass\n",
      "java": "// Dynamic Range Sum\n// Topic: Fenwick Tree | Pattern: Fenwick tree\n// Target Complexity: O(log n) per operation, O(n) space\n\nclass Solution {\n    public static Object dynamicRangeSum(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Dynamic Range Sum\n// Topic: Fenwick Tree | Pattern: Fenwick tree\n// Target Complexity: O(log n) per operation, O(n) space\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid dynamicRangeSum() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Dynamic Range Sum\n * Topic: Fenwick Tree | Pattern: Fenwick tree\n * Target Complexity: O(log n) per operation, O(n) space\n */\nfunction dynamicRangeSum(input) {\n  // TODO: Implement Fenwick tree supporting point update and prefix sum.\n  \n}\n",
    "functionName": "dynamicRangeSum",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 115,
    "originalId": "p-bit-01",
    "title": "Single Odd Identifier",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "topic": "Bit Manipulation",
    "pattern": "XOR",
    "description": "Every integer in an array occurs exactly twice except one integer that occurs once. Return the unique integer.",
    "statement": "Every integer in an array occurs exactly twice except one integer that occurs once. Return the unique integer.",
    "constraints": [
      "1 <= n <= 2*10^5; n is odd"
    ],
    "examples": [
      {
        "input": "[4,1,4,7,1]",
        "output": "7",
        "explanation": "Example 1"
      }
    ],
    "hints": [
      "XOR cancels equal pairs.",
      "Use x^x=0 and x^0=x."
    ],
    "hint": "XOR cancels equal pairs.",
    "expected_approach": "XOR all values.",
    "target_complexity": "O(n) time, O(1) space",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Single Odd Identifier\n * Topic: Bit Manipulation | Pattern: XOR\n * Target Complexity: O(n) time, O(1) space\n */\nfunction singleOddIdentifier(input) {\n  // TODO: Implement XOR all values.\n  \n}\n",
      "python": "# Single Odd Identifier\n# Topic: Bit Manipulation | Pattern: XOR\n# Target Complexity: O(n) time, O(1) space\n\ndef singleOddIdentifier(input):\n    # TODO: Implement XOR all values.\n    pass\n",
      "java": "// Single Odd Identifier\n// Topic: Bit Manipulation | Pattern: XOR\n// Target Complexity: O(n) time, O(1) space\n\nclass Solution {\n    public static Object singleOddIdentifier(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Single Odd Identifier\n// Topic: Bit Manipulation | Pattern: XOR\n// Target Complexity: O(n) time, O(1) space\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid singleOddIdentifier() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Single Odd Identifier\n * Topic: Bit Manipulation | Pattern: XOR\n * Target Complexity: O(n) time, O(1) space\n */\nfunction singleOddIdentifier(input) {\n  // TODO: Implement XOR all values.\n  \n}\n",
    "functionName": "singleOddIdentifier",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 116,
    "originalId": "p-advanced-01",
    "title": "Maximum Pair XOR",
    "difficulty": "Hard",
    "category": "Tries",
    "topic": "Tries",
    "pattern": "binary trie",
    "description": "Given non-negative integers, find the maximum value of a[i] XOR a[j] for distinct indices.",
    "statement": "Given non-negative integers, find the maximum value of a[i] XOR a[j] for distinct indices.",
    "constraints": [
      "1 <= n <= 2*10^5; 0 <= a[i] < 2^31"
    ],
    "examples": [
      {
        "input": "[3,10,5,25,2,8]",
        "output": "28",
        "explanation": "Example 1"
      }
    ],
    "hints": [
      "To maximize XOR, prefer the opposite bit at the highest position.",
      "Insert numbers into a binary trie and query greedily."
    ],
    "hint": "To maximize XOR, prefer the opposite bit at the highest position.",
    "expected_approach": "Binary trie over 31 bits.",
    "target_complexity": "O(n*31) time, O(n*31) space",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Maximum Pair XOR\n * Topic: Tries | Pattern: binary trie\n * Target Complexity: O(n*31) time, O(n*31) space\n */\nfunction maximumPairXor(input) {\n  // TODO: Implement Binary trie over 31 bits.\n  \n}\n",
      "python": "# Maximum Pair XOR\n# Topic: Tries | Pattern: binary trie\n# Target Complexity: O(n*31) time, O(n*31) space\n\ndef maximumPairXor(input):\n    # TODO: Implement Binary trie over 31 bits.\n    pass\n",
      "java": "// Maximum Pair XOR\n// Topic: Tries | Pattern: binary trie\n// Target Complexity: O(n*31) time, O(n*31) space\n\nclass Solution {\n    public static Object maximumPairXor(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Maximum Pair XOR\n// Topic: Tries | Pattern: binary trie\n// Target Complexity: O(n*31) time, O(n*31) space\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid maximumPairXor() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Maximum Pair XOR\n * Topic: Tries | Pattern: binary trie\n * Target Complexity: O(n*31) time, O(n*31) space\n */\nfunction maximumPairXor(input) {\n  // TODO: Implement Binary trie over 31 bits.\n  \n}\n",
    "functionName": "maximumPairXor",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 117,
    "originalId": "p-advanced-02",
    "title": "Subtree Value Updates",
    "difficulty": "Hard",
    "category": "Trees",
    "topic": "Trees",
    "pattern": "Euler tour + Fenwick",
    "description": "A rooted tree has a value at every node. Support adding x to every node in a subtree and querying a node’s current value.",
    "statement": "A rooted tree has a value at every node. Support adding x to every node in a subtree and querying a node’s current value.",
    "constraints": [
      "1 <= n,q <= 2*10^5"
    ],
    "examples": [
      {
        "input": "rooted tree plus updates",
        "output": "point queries",
        "explanation": "Example 1"
      }
    ],
    "hints": [
      "Flatten the tree so each subtree becomes an interval.",
      "A range update + point query Fenwick structure is sufficient."
    ],
    "hint": "Flatten the tree so each subtree becomes an interval.",
    "expected_approach": "Euler tour plus difference-style Fenwick updates over [tin,tout].",
    "target_complexity": "O((n+q)log n) time",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Subtree Value Updates\n * Topic: Trees | Pattern: Euler tour + Fenwick\n * Target Complexity: O((n+q)log n) time\n */\nfunction subtreeValueUpdates(input) {\n  // TODO: Implement Euler tour plus difference-style Fenwick updates over [tin,tout].\n  \n}\n",
      "python": "# Subtree Value Updates\n# Topic: Trees | Pattern: Euler tour + Fenwick\n# Target Complexity: O((n+q)log n) time\n\ndef subtreeValueUpdates(input):\n    # TODO: Implement Euler tour plus difference-style Fenwick updates over [tin,tout].\n    pass\n",
      "java": "// Subtree Value Updates\n// Topic: Trees | Pattern: Euler tour + Fenwick\n// Target Complexity: O((n+q)log n) time\n\nclass Solution {\n    public static Object subtreeValueUpdates(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Subtree Value Updates\n// Topic: Trees | Pattern: Euler tour + Fenwick\n// Target Complexity: O((n+q)log n) time\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid subtreeValueUpdates() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Subtree Value Updates\n * Topic: Trees | Pattern: Euler tour + Fenwick\n * Target Complexity: O((n+q)log n) time\n */\nfunction subtreeValueUpdates(input) {\n  // TODO: Implement Euler tour plus difference-style Fenwick updates over [tin,tout].\n  \n}\n",
    "functionName": "subtreeValueUpdates",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 118,
    "originalId": "gen-001",
    "title": "Array Prefix Balance Drill 1",
    "difficulty": "Medium",
    "category": "Arrays",
    "topic": "Arrays",
    "pattern": "prefix sum",
    "description": "Find the first index where the sum of elements on the left equals the sum on the right. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the first index where the sum of elements on the left equals the sum on the right. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Array Prefix Balance Drill 1\n * Topic: array | Pattern: prefix sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction arrayPrefixBalanceDrill1(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Array Prefix Balance Drill 1\n# Topic: array | Pattern: prefix sum\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef arrayPrefixBalanceDrill1(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Array Prefix Balance Drill 1\n// Topic: array | Pattern: prefix sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object arrayPrefixBalanceDrill1(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Array Prefix Balance Drill 1\n// Topic: array | Pattern: prefix sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid arrayPrefixBalanceDrill1() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Array Prefix Balance Drill 1\n * Topic: array | Pattern: prefix sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction arrayPrefixBalanceDrill1(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "arrayPrefixBalanceDrill1",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 119,
    "originalId": "gen-002",
    "title": "Sorted Pair Distance Drill 2",
    "difficulty": "Medium",
    "category": "Arrays",
    "topic": "Arrays",
    "pattern": "two pointers",
    "description": "Given a sorted array and target D, find whether two distinct values differ by exactly D. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Given a sorted array and target D, find whether two distinct values differ by exactly D. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Sorted Pair Distance Drill 2\n * Topic: array | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedPairDistanceDrill2(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Sorted Pair Distance Drill 2\n# Topic: array | Pattern: two pointers\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef sortedPairDistanceDrill2(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Sorted Pair Distance Drill 2\n// Topic: array | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object sortedPairDistanceDrill2(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Sorted Pair Distance Drill 2\n// Topic: array | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid sortedPairDistanceDrill2() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Sorted Pair Distance Drill 2\n * Topic: array | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedPairDistanceDrill2(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "sortedPairDistanceDrill2",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 120,
    "originalId": "gen-003",
    "title": "Longest Positive Window Drill 3",
    "difficulty": "Medium",
    "category": "Arrays",
    "topic": "Arrays",
    "pattern": "sliding window",
    "description": "For a positive-integer array and K, find the longest contiguous subarray whose sum is at most K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "For a positive-integer array and K, find the longest contiguous subarray whose sum is at most K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Longest Positive Window Drill 3\n * Topic: array | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction longestPositiveWindowDrill3(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Longest Positive Window Drill 3\n# Topic: array | Pattern: sliding window\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef longestPositiveWindowDrill3(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Longest Positive Window Drill 3\n// Topic: array | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object longestPositiveWindowDrill3(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Longest Positive Window Drill 3\n// Topic: array | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid longestPositiveWindowDrill3() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Longest Positive Window Drill 3\n * Topic: array | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction longestPositiveWindowDrill3(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "longestPositiveWindowDrill3",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 121,
    "originalId": "gen-004",
    "title": "Anagram Window Drill 4",
    "difficulty": "Medium",
    "category": "Strings",
    "topic": "Strings",
    "pattern": "sliding window",
    "description": "Find whether a permutation of pattern occurs as a contiguous substring of text. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find whether a permutation of pattern occurs as a contiguous substring of text. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Anagram Window Drill 4\n * Topic: string | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction anagramWindowDrill4(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Anagram Window Drill 4\n# Topic: string | Pattern: sliding window\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef anagramWindowDrill4(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Anagram Window Drill 4\n// Topic: string | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object anagramWindowDrill4(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Anagram Window Drill 4\n// Topic: string | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid anagramWindowDrill4() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Anagram Window Drill 4\n * Topic: string | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction anagramWindowDrill4(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "anagramWindowDrill4",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 122,
    "originalId": "gen-005",
    "title": "Palindrome Radius Drill 5",
    "difficulty": "Easy",
    "category": "Strings",
    "topic": "Strings",
    "pattern": "two pointers",
    "description": "Check whether a string is a palindrome after ignoring non-alphanumeric characters and case. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Check whether a string is a palindrome after ignoring non-alphanumeric characters and case. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Palindrome Radius Drill 5\n * Topic: string | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction palindromeRadiusDrill5(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Palindrome Radius Drill 5\n# Topic: string | Pattern: two pointers\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef palindromeRadiusDrill5(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Palindrome Radius Drill 5\n// Topic: string | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object palindromeRadiusDrill5(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Palindrome Radius Drill 5\n// Topic: string | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid palindromeRadiusDrill5() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Palindrome Radius Drill 5\n * Topic: string | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction palindromeRadiusDrill5(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "palindromeRadiusDrill5",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 123,
    "originalId": "gen-006",
    "title": "Sorted Merge Drill 6",
    "difficulty": "Easy",
    "category": "Linked Lists",
    "topic": "Linked Lists",
    "pattern": "linked-list merge",
    "description": "Merge two sorted singly linked lists into one sorted list without allocating a node per input element. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Merge two sorted singly linked lists into one sorted list without allocating a node per input element. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Sorted Merge Drill 6\n * Topic: linked list | Pattern: linked-list merge\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedMergeDrill6(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Sorted Merge Drill 6\n# Topic: linked list | Pattern: linked-list merge\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef sortedMergeDrill6(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Sorted Merge Drill 6\n// Topic: linked list | Pattern: linked-list merge\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object sortedMergeDrill6(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Sorted Merge Drill 6\n// Topic: linked list | Pattern: linked-list merge\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid sortedMergeDrill6() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Sorted Merge Drill 6\n * Topic: linked list | Pattern: linked-list merge\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedMergeDrill6(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "sortedMergeDrill6",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 124,
    "originalId": "gen-007",
    "title": "Histogram Area Drill 7",
    "difficulty": "Hard",
    "category": "Stacks",
    "topic": "Stacks",
    "pattern": "monotonic stack",
    "description": "Find the largest rectangle area in a histogram. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the largest rectangle area in a histogram. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Histogram Area Drill 7\n * Topic: stack | Pattern: monotonic stack\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction histogramAreaDrill7(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Histogram Area Drill 7\n# Topic: stack | Pattern: monotonic stack\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef histogramAreaDrill7(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Histogram Area Drill 7\n// Topic: stack | Pattern: monotonic stack\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object histogramAreaDrill7(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Histogram Area Drill 7\n// Topic: stack | Pattern: monotonic stack\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid histogramAreaDrill7() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Histogram Area Drill 7\n * Topic: stack | Pattern: monotonic stack\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction histogramAreaDrill7(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "histogramAreaDrill7",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 125,
    "originalId": "gen-008",
    "title": "Window Maximum Drill 8",
    "difficulty": "Hard",
    "category": "Queues",
    "topic": "Queues",
    "pattern": "monotonic deque",
    "description": "Return the maximum of every contiguous window of size K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the maximum of every contiguous window of size K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Window Maximum Drill 8\n * Topic: queue | Pattern: monotonic deque\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction windowMaximumDrill8(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Window Maximum Drill 8\n# Topic: queue | Pattern: monotonic deque\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef windowMaximumDrill8(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Window Maximum Drill 8\n// Topic: queue | Pattern: monotonic deque\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object windowMaximumDrill8(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Window Maximum Drill 8\n// Topic: queue | Pattern: monotonic deque\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid windowMaximumDrill8() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Window Maximum Drill 8\n * Topic: queue | Pattern: monotonic deque\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction windowMaximumDrill8(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "windowMaximumDrill8",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 126,
    "originalId": "gen-009",
    "title": "Level Width Drill 9",
    "difficulty": "Medium",
    "category": "Trees",
    "topic": "Trees",
    "pattern": "BFS",
    "description": "Return the maximum number of nodes appearing at any depth. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the maximum number of nodes appearing at any depth. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Level Width Drill 9\n * Topic: tree | Pattern: BFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction levelWidthDrill9(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Level Width Drill 9\n# Topic: tree | Pattern: BFS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef levelWidthDrill9(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Level Width Drill 9\n// Topic: tree | Pattern: BFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object levelWidthDrill9(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Level Width Drill 9\n// Topic: tree | Pattern: BFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid levelWidthDrill9() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Level Width Drill 9\n * Topic: tree | Pattern: BFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction levelWidthDrill9(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "levelWidthDrill9",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 127,
    "originalId": "gen-010",
    "title": "Path Sum Count Drill 10",
    "difficulty": "Medium",
    "category": "Trees",
    "topic": "Trees",
    "pattern": "tree DFS",
    "description": "Count downward paths whose values sum to a target; a path may start at any node. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Count downward paths whose values sum to a target; a path may start at any node. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Path Sum Count Drill 10\n * Topic: tree | Pattern: tree DFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction pathSumCountDrill10(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Path Sum Count Drill 10\n# Topic: tree | Pattern: tree DFS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef pathSumCountDrill10(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Path Sum Count Drill 10\n// Topic: tree | Pattern: tree DFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object pathSumCountDrill10(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Path Sum Count Drill 10\n// Topic: tree | Pattern: tree DFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid pathSumCountDrill10() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Path Sum Count Drill 10\n * Topic: tree | Pattern: tree DFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction pathSumCountDrill10(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "pathSumCountDrill10",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 128,
    "originalId": "gen-011",
    "title": "Bipartite Check Drill 11",
    "difficulty": "Medium",
    "category": "Graphs",
    "topic": "Graphs",
    "pattern": "BFS coloring",
    "description": "Determine whether an undirected graph can be colored with two colors so every edge crosses colors. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether an undirected graph can be colored with two colors so every edge crosses colors. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Bipartite Check Drill 11\n * Topic: graph | Pattern: BFS coloring\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction bipartiteCheckDrill11(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Bipartite Check Drill 11\n# Topic: graph | Pattern: BFS coloring\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef bipartiteCheckDrill11(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Bipartite Check Drill 11\n// Topic: graph | Pattern: BFS coloring\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object bipartiteCheckDrill11(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Bipartite Check Drill 11\n// Topic: graph | Pattern: BFS coloring\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid bipartiteCheckDrill11() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Bipartite Check Drill 11\n * Topic: graph | Pattern: BFS coloring\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction bipartiteCheckDrill11(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "bipartiteCheckDrill11",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 129,
    "originalId": "gen-012",
    "title": "Minimum Spanning Cost Drill 12",
    "difficulty": "Medium",
    "category": "Graphs",
    "topic": "Graphs",
    "pattern": "Kruskal",
    "description": "Find the minimum cost needed to connect all vertices, or report impossible. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the minimum cost needed to connect all vertices, or report impossible. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Minimum Spanning Cost Drill 12\n * Topic: graph | Pattern: Kruskal\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction minimumSpanningCostDrill12(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Minimum Spanning Cost Drill 12\n# Topic: graph | Pattern: Kruskal\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef minimumSpanningCostDrill12(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Minimum Spanning Cost Drill 12\n// Topic: graph | Pattern: Kruskal\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object minimumSpanningCostDrill12(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Minimum Spanning Cost Drill 12\n// Topic: graph | Pattern: Kruskal\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid minimumSpanningCostDrill12() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Minimum Spanning Cost Drill 12\n * Topic: graph | Pattern: Kruskal\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction minimumSpanningCostDrill12(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "minimumSpanningCostDrill12",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 130,
    "originalId": "gen-013",
    "title": "Negative Route Detection Drill 13",
    "difficulty": "Hard",
    "category": "Graphs",
    "topic": "Graphs",
    "pattern": "Bellman-Ford",
    "description": "Determine whether a negative cycle is reachable from a given source. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether a negative cycle is reachable from a given source. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Negative Route Detection Drill 13\n * Topic: graph | Pattern: Bellman-Ford\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction negativeRouteDetectionDrill13(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Negative Route Detection Drill 13\n# Topic: graph | Pattern: Bellman-Ford\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef negativeRouteDetectionDrill13(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Negative Route Detection Drill 13\n// Topic: graph | Pattern: Bellman-Ford\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object negativeRouteDetectionDrill13(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Negative Route Detection Drill 13\n// Topic: graph | Pattern: Bellman-Ford\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid negativeRouteDetectionDrill13() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Negative Route Detection Drill 13\n * Topic: graph | Pattern: Bellman-Ford\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction negativeRouteDetectionDrill13(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "negativeRouteDetectionDrill13",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 131,
    "originalId": "gen-014",
    "title": "Increasing Sequence Drill 14",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "LIS",
    "description": "Return the length of the longest strictly increasing subsequence. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the length of the longest strictly increasing subsequence. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Increasing Sequence Drill 14\n * Topic: DP | Pattern: LIS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction increasingSequenceDrill14(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Increasing Sequence Drill 14\n# Topic: DP | Pattern: LIS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef increasingSequenceDrill14(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Increasing Sequence Drill 14\n// Topic: DP | Pattern: LIS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object increasingSequenceDrill14(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Increasing Sequence Drill 14\n// Topic: DP | Pattern: LIS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid increasingSequenceDrill14() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Increasing Sequence Drill 14\n * Topic: DP | Pattern: LIS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction increasingSequenceDrill14(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "increasingSequenceDrill14",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 132,
    "originalId": "gen-015",
    "title": "Common Sequence Drill 15",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "LCS",
    "description": "Return the length of the longest common subsequence of two strings. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the length of the longest common subsequence of two strings. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Common Sequence Drill 15\n * Topic: DP | Pattern: LCS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction commonSequenceDrill15(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Common Sequence Drill 15\n# Topic: DP | Pattern: LCS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef commonSequenceDrill15(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Common Sequence Drill 15\n// Topic: DP | Pattern: LCS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object commonSequenceDrill15(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Common Sequence Drill 15\n// Topic: DP | Pattern: LCS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid commonSequenceDrill15() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Common Sequence Drill 15\n * Topic: DP | Pattern: LCS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction commonSequenceDrill15(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "commonSequenceDrill15",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 133,
    "originalId": "gen-016",
    "title": "Grid Paths Drill 16",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "2D DP",
    "description": "Count paths from top-left to bottom-right moving only right and down around blocked cells. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Count paths from top-left to bottom-right moving only right and down around blocked cells. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Grid Paths Drill 16\n * Topic: DP | Pattern: 2D DP\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction gridPathsDrill16(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Grid Paths Drill 16\n# Topic: DP | Pattern: 2D DP\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef gridPathsDrill16(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Grid Paths Drill 16\n// Topic: DP | Pattern: 2D DP\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object gridPathsDrill16(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Grid Paths Drill 16\n// Topic: DP | Pattern: 2D DP\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid gridPathsDrill16() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Grid Paths Drill 16\n * Topic: DP | Pattern: 2D DP\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction gridPathsDrill16(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "gridPathsDrill16",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 134,
    "originalId": "gen-017",
    "title": "Partition Feasibility Drill 17",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "subset-sum",
    "description": "Determine whether an array can be partitioned into two subsets with equal sum. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether an array can be partitioned into two subsets with equal sum. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Partition Feasibility Drill 17\n * Topic: DP | Pattern: subset-sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction partitionFeasibilityDrill17(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Partition Feasibility Drill 17\n# Topic: DP | Pattern: subset-sum\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef partitionFeasibilityDrill17(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Partition Feasibility Drill 17\n// Topic: DP | Pattern: subset-sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object partitionFeasibilityDrill17(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Partition Feasibility Drill 17\n// Topic: DP | Pattern: subset-sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid partitionFeasibilityDrill17() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Partition Feasibility Drill 17\n * Topic: DP | Pattern: subset-sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction partitionFeasibilityDrill17(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "partitionFeasibilityDrill17",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 135,
    "originalId": "gen-018",
    "title": "Power Check Drill 18",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "topic": "Bit Manipulation",
    "pattern": "bit trick",
    "description": "Determine whether a positive integer is a power of two. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether a positive integer is a power of two. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Power Check Drill 18\n * Topic: bits | Pattern: bit trick\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction powerCheckDrill18(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Power Check Drill 18\n# Topic: bits | Pattern: bit trick\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef powerCheckDrill18(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Power Check Drill 18\n// Topic: bits | Pattern: bit trick\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object powerCheckDrill18(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Power Check Drill 18\n// Topic: bits | Pattern: bit trick\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid powerCheckDrill18() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Power Check Drill 18\n * Topic: bits | Pattern: bit trick\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction powerCheckDrill18(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "powerCheckDrill18",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 136,
    "originalId": "gen-019",
    "title": "Range Minimum Drill 19",
    "difficulty": "Hard",
    "category": "Range Queries",
    "topic": "Range Queries",
    "pattern": "segment tree",
    "description": "Support point updates and range minimum queries. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Support point updates and range minimum queries. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Range Minimum Drill 19\n * Topic: range | Pattern: segment tree\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction rangeMinimumDrill19(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Range Minimum Drill 19\n# Topic: range | Pattern: segment tree\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef rangeMinimumDrill19(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Range Minimum Drill 19\n// Topic: range | Pattern: segment tree\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object rangeMinimumDrill19(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Range Minimum Drill 19\n// Topic: range | Pattern: segment tree\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid rangeMinimumDrill19() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Range Minimum Drill 19\n * Topic: range | Pattern: segment tree\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction rangeMinimumDrill19(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "rangeMinimumDrill19",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 137,
    "originalId": "gen-020",
    "title": "Kth Selection Drill 20",
    "difficulty": "Hard",
    "category": "Advanced Patterns",
    "topic": "Advanced Patterns",
    "pattern": "quickselect",
    "description": "Find the kth smallest element without fully sorting the array. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the kth smallest element without fully sorting the array. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Kth Selection Drill 20\n * Topic: advanced | Pattern: quickselect\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction kthSelectionDrill20(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Kth Selection Drill 20\n# Topic: advanced | Pattern: quickselect\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef kthSelectionDrill20(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Kth Selection Drill 20\n// Topic: advanced | Pattern: quickselect\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object kthSelectionDrill20(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Kth Selection Drill 20\n// Topic: advanced | Pattern: quickselect\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid kthSelectionDrill20() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Kth Selection Drill 20\n * Topic: advanced | Pattern: quickselect\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction kthSelectionDrill20(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "kthSelectionDrill20",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 138,
    "originalId": "gen-021",
    "title": "Array Prefix Balance Drill 21",
    "difficulty": "Medium",
    "category": "Arrays",
    "topic": "Arrays",
    "pattern": "prefix sum",
    "description": "Find the first index where the sum of elements on the left equals the sum on the right. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the first index where the sum of elements on the left equals the sum on the right. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Array Prefix Balance Drill 21\n * Topic: array | Pattern: prefix sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction arrayPrefixBalanceDrill21(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Array Prefix Balance Drill 21\n# Topic: array | Pattern: prefix sum\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef arrayPrefixBalanceDrill21(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Array Prefix Balance Drill 21\n// Topic: array | Pattern: prefix sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object arrayPrefixBalanceDrill21(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Array Prefix Balance Drill 21\n// Topic: array | Pattern: prefix sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid arrayPrefixBalanceDrill21() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Array Prefix Balance Drill 21\n * Topic: array | Pattern: prefix sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction arrayPrefixBalanceDrill21(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "arrayPrefixBalanceDrill21",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 139,
    "originalId": "gen-022",
    "title": "Sorted Pair Distance Drill 22",
    "difficulty": "Medium",
    "category": "Arrays",
    "topic": "Arrays",
    "pattern": "two pointers",
    "description": "Given a sorted array and target D, find whether two distinct values differ by exactly D. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Given a sorted array and target D, find whether two distinct values differ by exactly D. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Sorted Pair Distance Drill 22\n * Topic: array | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedPairDistanceDrill22(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Sorted Pair Distance Drill 22\n# Topic: array | Pattern: two pointers\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef sortedPairDistanceDrill22(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Sorted Pair Distance Drill 22\n// Topic: array | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object sortedPairDistanceDrill22(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Sorted Pair Distance Drill 22\n// Topic: array | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid sortedPairDistanceDrill22() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Sorted Pair Distance Drill 22\n * Topic: array | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedPairDistanceDrill22(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "sortedPairDistanceDrill22",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 140,
    "originalId": "gen-023",
    "title": "Longest Positive Window Drill 23",
    "difficulty": "Medium",
    "category": "Arrays",
    "topic": "Arrays",
    "pattern": "sliding window",
    "description": "For a positive-integer array and K, find the longest contiguous subarray whose sum is at most K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "For a positive-integer array and K, find the longest contiguous subarray whose sum is at most K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Longest Positive Window Drill 23\n * Topic: array | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction longestPositiveWindowDrill23(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Longest Positive Window Drill 23\n# Topic: array | Pattern: sliding window\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef longestPositiveWindowDrill23(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Longest Positive Window Drill 23\n// Topic: array | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object longestPositiveWindowDrill23(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Longest Positive Window Drill 23\n// Topic: array | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid longestPositiveWindowDrill23() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Longest Positive Window Drill 23\n * Topic: array | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction longestPositiveWindowDrill23(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "longestPositiveWindowDrill23",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 141,
    "originalId": "gen-024",
    "title": "Anagram Window Drill 24",
    "difficulty": "Medium",
    "category": "Strings",
    "topic": "Strings",
    "pattern": "sliding window",
    "description": "Find whether a permutation of pattern occurs as a contiguous substring of text. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find whether a permutation of pattern occurs as a contiguous substring of text. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Anagram Window Drill 24\n * Topic: string | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction anagramWindowDrill24(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Anagram Window Drill 24\n# Topic: string | Pattern: sliding window\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef anagramWindowDrill24(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Anagram Window Drill 24\n// Topic: string | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object anagramWindowDrill24(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Anagram Window Drill 24\n// Topic: string | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid anagramWindowDrill24() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Anagram Window Drill 24\n * Topic: string | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction anagramWindowDrill24(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "anagramWindowDrill24",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 142,
    "originalId": "gen-025",
    "title": "Palindrome Radius Drill 25",
    "difficulty": "Easy",
    "category": "Strings",
    "topic": "Strings",
    "pattern": "two pointers",
    "description": "Check whether a string is a palindrome after ignoring non-alphanumeric characters and case. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Check whether a string is a palindrome after ignoring non-alphanumeric characters and case. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Palindrome Radius Drill 25\n * Topic: string | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction palindromeRadiusDrill25(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Palindrome Radius Drill 25\n# Topic: string | Pattern: two pointers\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef palindromeRadiusDrill25(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Palindrome Radius Drill 25\n// Topic: string | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object palindromeRadiusDrill25(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Palindrome Radius Drill 25\n// Topic: string | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid palindromeRadiusDrill25() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Palindrome Radius Drill 25\n * Topic: string | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction palindromeRadiusDrill25(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "palindromeRadiusDrill25",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 143,
    "originalId": "gen-026",
    "title": "Sorted Merge Drill 26",
    "difficulty": "Easy",
    "category": "Linked Lists",
    "topic": "Linked Lists",
    "pattern": "linked-list merge",
    "description": "Merge two sorted singly linked lists into one sorted list without allocating a node per input element. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Merge two sorted singly linked lists into one sorted list without allocating a node per input element. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Sorted Merge Drill 26\n * Topic: linked list | Pattern: linked-list merge\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedMergeDrill26(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Sorted Merge Drill 26\n# Topic: linked list | Pattern: linked-list merge\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef sortedMergeDrill26(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Sorted Merge Drill 26\n// Topic: linked list | Pattern: linked-list merge\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object sortedMergeDrill26(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Sorted Merge Drill 26\n// Topic: linked list | Pattern: linked-list merge\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid sortedMergeDrill26() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Sorted Merge Drill 26\n * Topic: linked list | Pattern: linked-list merge\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedMergeDrill26(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "sortedMergeDrill26",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 144,
    "originalId": "gen-027",
    "title": "Histogram Area Drill 27",
    "difficulty": "Hard",
    "category": "Stacks",
    "topic": "Stacks",
    "pattern": "monotonic stack",
    "description": "Find the largest rectangle area in a histogram. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the largest rectangle area in a histogram. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Histogram Area Drill 27\n * Topic: stack | Pattern: monotonic stack\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction histogramAreaDrill27(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Histogram Area Drill 27\n# Topic: stack | Pattern: monotonic stack\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef histogramAreaDrill27(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Histogram Area Drill 27\n// Topic: stack | Pattern: monotonic stack\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object histogramAreaDrill27(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Histogram Area Drill 27\n// Topic: stack | Pattern: monotonic stack\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid histogramAreaDrill27() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Histogram Area Drill 27\n * Topic: stack | Pattern: monotonic stack\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction histogramAreaDrill27(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "histogramAreaDrill27",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 145,
    "originalId": "gen-028",
    "title": "Window Maximum Drill 28",
    "difficulty": "Hard",
    "category": "Queues",
    "topic": "Queues",
    "pattern": "monotonic deque",
    "description": "Return the maximum of every contiguous window of size K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the maximum of every contiguous window of size K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Window Maximum Drill 28\n * Topic: queue | Pattern: monotonic deque\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction windowMaximumDrill28(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Window Maximum Drill 28\n# Topic: queue | Pattern: monotonic deque\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef windowMaximumDrill28(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Window Maximum Drill 28\n// Topic: queue | Pattern: monotonic deque\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object windowMaximumDrill28(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Window Maximum Drill 28\n// Topic: queue | Pattern: monotonic deque\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid windowMaximumDrill28() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Window Maximum Drill 28\n * Topic: queue | Pattern: monotonic deque\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction windowMaximumDrill28(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "windowMaximumDrill28",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 146,
    "originalId": "gen-029",
    "title": "Level Width Drill 29",
    "difficulty": "Medium",
    "category": "Trees",
    "topic": "Trees",
    "pattern": "BFS",
    "description": "Return the maximum number of nodes appearing at any depth. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the maximum number of nodes appearing at any depth. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Level Width Drill 29\n * Topic: tree | Pattern: BFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction levelWidthDrill29(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Level Width Drill 29\n# Topic: tree | Pattern: BFS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef levelWidthDrill29(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Level Width Drill 29\n// Topic: tree | Pattern: BFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object levelWidthDrill29(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Level Width Drill 29\n// Topic: tree | Pattern: BFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid levelWidthDrill29() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Level Width Drill 29\n * Topic: tree | Pattern: BFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction levelWidthDrill29(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "levelWidthDrill29",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 147,
    "originalId": "gen-030",
    "title": "Path Sum Count Drill 30",
    "difficulty": "Medium",
    "category": "Trees",
    "topic": "Trees",
    "pattern": "tree DFS",
    "description": "Count downward paths whose values sum to a target; a path may start at any node. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Count downward paths whose values sum to a target; a path may start at any node. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Path Sum Count Drill 30\n * Topic: tree | Pattern: tree DFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction pathSumCountDrill30(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Path Sum Count Drill 30\n# Topic: tree | Pattern: tree DFS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef pathSumCountDrill30(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Path Sum Count Drill 30\n// Topic: tree | Pattern: tree DFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object pathSumCountDrill30(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Path Sum Count Drill 30\n// Topic: tree | Pattern: tree DFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid pathSumCountDrill30() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Path Sum Count Drill 30\n * Topic: tree | Pattern: tree DFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction pathSumCountDrill30(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "pathSumCountDrill30",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 148,
    "originalId": "gen-031",
    "title": "Bipartite Check Drill 31",
    "difficulty": "Medium",
    "category": "Graphs",
    "topic": "Graphs",
    "pattern": "BFS coloring",
    "description": "Determine whether an undirected graph can be colored with two colors so every edge crosses colors. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether an undirected graph can be colored with two colors so every edge crosses colors. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Bipartite Check Drill 31\n * Topic: graph | Pattern: BFS coloring\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction bipartiteCheckDrill31(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Bipartite Check Drill 31\n# Topic: graph | Pattern: BFS coloring\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef bipartiteCheckDrill31(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Bipartite Check Drill 31\n// Topic: graph | Pattern: BFS coloring\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object bipartiteCheckDrill31(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Bipartite Check Drill 31\n// Topic: graph | Pattern: BFS coloring\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid bipartiteCheckDrill31() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Bipartite Check Drill 31\n * Topic: graph | Pattern: BFS coloring\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction bipartiteCheckDrill31(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "bipartiteCheckDrill31",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 149,
    "originalId": "gen-032",
    "title": "Minimum Spanning Cost Drill 32",
    "difficulty": "Medium",
    "category": "Graphs",
    "topic": "Graphs",
    "pattern": "Kruskal",
    "description": "Find the minimum cost needed to connect all vertices, or report impossible. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the minimum cost needed to connect all vertices, or report impossible. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Minimum Spanning Cost Drill 32\n * Topic: graph | Pattern: Kruskal\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction minimumSpanningCostDrill32(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Minimum Spanning Cost Drill 32\n# Topic: graph | Pattern: Kruskal\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef minimumSpanningCostDrill32(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Minimum Spanning Cost Drill 32\n// Topic: graph | Pattern: Kruskal\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object minimumSpanningCostDrill32(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Minimum Spanning Cost Drill 32\n// Topic: graph | Pattern: Kruskal\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid minimumSpanningCostDrill32() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Minimum Spanning Cost Drill 32\n * Topic: graph | Pattern: Kruskal\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction minimumSpanningCostDrill32(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "minimumSpanningCostDrill32",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 150,
    "originalId": "gen-033",
    "title": "Negative Route Detection Drill 33",
    "difficulty": "Hard",
    "category": "Graphs",
    "topic": "Graphs",
    "pattern": "Bellman-Ford",
    "description": "Determine whether a negative cycle is reachable from a given source. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether a negative cycle is reachable from a given source. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Negative Route Detection Drill 33\n * Topic: graph | Pattern: Bellman-Ford\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction negativeRouteDetectionDrill33(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Negative Route Detection Drill 33\n# Topic: graph | Pattern: Bellman-Ford\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef negativeRouteDetectionDrill33(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Negative Route Detection Drill 33\n// Topic: graph | Pattern: Bellman-Ford\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object negativeRouteDetectionDrill33(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Negative Route Detection Drill 33\n// Topic: graph | Pattern: Bellman-Ford\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid negativeRouteDetectionDrill33() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Negative Route Detection Drill 33\n * Topic: graph | Pattern: Bellman-Ford\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction negativeRouteDetectionDrill33(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "negativeRouteDetectionDrill33",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 151,
    "originalId": "gen-034",
    "title": "Increasing Sequence Drill 34",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "LIS",
    "description": "Return the length of the longest strictly increasing subsequence. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the length of the longest strictly increasing subsequence. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Increasing Sequence Drill 34\n * Topic: DP | Pattern: LIS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction increasingSequenceDrill34(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Increasing Sequence Drill 34\n# Topic: DP | Pattern: LIS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef increasingSequenceDrill34(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Increasing Sequence Drill 34\n// Topic: DP | Pattern: LIS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object increasingSequenceDrill34(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Increasing Sequence Drill 34\n// Topic: DP | Pattern: LIS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid increasingSequenceDrill34() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Increasing Sequence Drill 34\n * Topic: DP | Pattern: LIS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction increasingSequenceDrill34(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "increasingSequenceDrill34",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 152,
    "originalId": "gen-035",
    "title": "Common Sequence Drill 35",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "LCS",
    "description": "Return the length of the longest common subsequence of two strings. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the length of the longest common subsequence of two strings. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Common Sequence Drill 35\n * Topic: DP | Pattern: LCS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction commonSequenceDrill35(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Common Sequence Drill 35\n# Topic: DP | Pattern: LCS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef commonSequenceDrill35(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Common Sequence Drill 35\n// Topic: DP | Pattern: LCS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object commonSequenceDrill35(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Common Sequence Drill 35\n// Topic: DP | Pattern: LCS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid commonSequenceDrill35() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Common Sequence Drill 35\n * Topic: DP | Pattern: LCS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction commonSequenceDrill35(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "commonSequenceDrill35",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 153,
    "originalId": "gen-036",
    "title": "Grid Paths Drill 36",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "2D DP",
    "description": "Count paths from top-left to bottom-right moving only right and down around blocked cells. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Count paths from top-left to bottom-right moving only right and down around blocked cells. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Grid Paths Drill 36\n * Topic: DP | Pattern: 2D DP\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction gridPathsDrill36(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Grid Paths Drill 36\n# Topic: DP | Pattern: 2D DP\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef gridPathsDrill36(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Grid Paths Drill 36\n// Topic: DP | Pattern: 2D DP\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object gridPathsDrill36(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Grid Paths Drill 36\n// Topic: DP | Pattern: 2D DP\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid gridPathsDrill36() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Grid Paths Drill 36\n * Topic: DP | Pattern: 2D DP\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction gridPathsDrill36(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "gridPathsDrill36",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 154,
    "originalId": "gen-037",
    "title": "Partition Feasibility Drill 37",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "subset-sum",
    "description": "Determine whether an array can be partitioned into two subsets with equal sum. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether an array can be partitioned into two subsets with equal sum. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Partition Feasibility Drill 37\n * Topic: DP | Pattern: subset-sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction partitionFeasibilityDrill37(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Partition Feasibility Drill 37\n# Topic: DP | Pattern: subset-sum\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef partitionFeasibilityDrill37(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Partition Feasibility Drill 37\n// Topic: DP | Pattern: subset-sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object partitionFeasibilityDrill37(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Partition Feasibility Drill 37\n// Topic: DP | Pattern: subset-sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid partitionFeasibilityDrill37() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Partition Feasibility Drill 37\n * Topic: DP | Pattern: subset-sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction partitionFeasibilityDrill37(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "partitionFeasibilityDrill37",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 155,
    "originalId": "gen-038",
    "title": "Power Check Drill 38",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "topic": "Bit Manipulation",
    "pattern": "bit trick",
    "description": "Determine whether a positive integer is a power of two. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether a positive integer is a power of two. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Power Check Drill 38\n * Topic: bits | Pattern: bit trick\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction powerCheckDrill38(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Power Check Drill 38\n# Topic: bits | Pattern: bit trick\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef powerCheckDrill38(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Power Check Drill 38\n// Topic: bits | Pattern: bit trick\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object powerCheckDrill38(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Power Check Drill 38\n// Topic: bits | Pattern: bit trick\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid powerCheckDrill38() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Power Check Drill 38\n * Topic: bits | Pattern: bit trick\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction powerCheckDrill38(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "powerCheckDrill38",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 156,
    "originalId": "gen-039",
    "title": "Range Minimum Drill 39",
    "difficulty": "Hard",
    "category": "Range Queries",
    "topic": "Range Queries",
    "pattern": "segment tree",
    "description": "Support point updates and range minimum queries. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Support point updates and range minimum queries. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Range Minimum Drill 39\n * Topic: range | Pattern: segment tree\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction rangeMinimumDrill39(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Range Minimum Drill 39\n# Topic: range | Pattern: segment tree\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef rangeMinimumDrill39(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Range Minimum Drill 39\n// Topic: range | Pattern: segment tree\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object rangeMinimumDrill39(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Range Minimum Drill 39\n// Topic: range | Pattern: segment tree\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid rangeMinimumDrill39() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Range Minimum Drill 39\n * Topic: range | Pattern: segment tree\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction rangeMinimumDrill39(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "rangeMinimumDrill39",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 157,
    "originalId": "gen-040",
    "title": "Kth Selection Drill 40",
    "difficulty": "Hard",
    "category": "Advanced Patterns",
    "topic": "Advanced Patterns",
    "pattern": "quickselect",
    "description": "Find the kth smallest element without fully sorting the array. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the kth smallest element without fully sorting the array. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Kth Selection Drill 40\n * Topic: advanced | Pattern: quickselect\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction kthSelectionDrill40(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Kth Selection Drill 40\n# Topic: advanced | Pattern: quickselect\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef kthSelectionDrill40(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Kth Selection Drill 40\n// Topic: advanced | Pattern: quickselect\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object kthSelectionDrill40(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Kth Selection Drill 40\n// Topic: advanced | Pattern: quickselect\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid kthSelectionDrill40() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Kth Selection Drill 40\n * Topic: advanced | Pattern: quickselect\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction kthSelectionDrill40(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "kthSelectionDrill40",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 158,
    "originalId": "gen-041",
    "title": "Array Prefix Balance Drill 41",
    "difficulty": "Medium",
    "category": "Arrays",
    "topic": "Arrays",
    "pattern": "prefix sum",
    "description": "Find the first index where the sum of elements on the left equals the sum on the right. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the first index where the sum of elements on the left equals the sum on the right. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Array Prefix Balance Drill 41\n * Topic: array | Pattern: prefix sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction arrayPrefixBalanceDrill41(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Array Prefix Balance Drill 41\n# Topic: array | Pattern: prefix sum\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef arrayPrefixBalanceDrill41(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Array Prefix Balance Drill 41\n// Topic: array | Pattern: prefix sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object arrayPrefixBalanceDrill41(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Array Prefix Balance Drill 41\n// Topic: array | Pattern: prefix sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid arrayPrefixBalanceDrill41() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Array Prefix Balance Drill 41\n * Topic: array | Pattern: prefix sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction arrayPrefixBalanceDrill41(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "arrayPrefixBalanceDrill41",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 159,
    "originalId": "gen-042",
    "title": "Sorted Pair Distance Drill 42",
    "difficulty": "Medium",
    "category": "Arrays",
    "topic": "Arrays",
    "pattern": "two pointers",
    "description": "Given a sorted array and target D, find whether two distinct values differ by exactly D. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Given a sorted array and target D, find whether two distinct values differ by exactly D. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Sorted Pair Distance Drill 42\n * Topic: array | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedPairDistanceDrill42(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Sorted Pair Distance Drill 42\n# Topic: array | Pattern: two pointers\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef sortedPairDistanceDrill42(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Sorted Pair Distance Drill 42\n// Topic: array | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object sortedPairDistanceDrill42(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Sorted Pair Distance Drill 42\n// Topic: array | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid sortedPairDistanceDrill42() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Sorted Pair Distance Drill 42\n * Topic: array | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedPairDistanceDrill42(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "sortedPairDistanceDrill42",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 160,
    "originalId": "gen-043",
    "title": "Longest Positive Window Drill 43",
    "difficulty": "Medium",
    "category": "Arrays",
    "topic": "Arrays",
    "pattern": "sliding window",
    "description": "For a positive-integer array and K, find the longest contiguous subarray whose sum is at most K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "For a positive-integer array and K, find the longest contiguous subarray whose sum is at most K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Longest Positive Window Drill 43\n * Topic: array | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction longestPositiveWindowDrill43(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Longest Positive Window Drill 43\n# Topic: array | Pattern: sliding window\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef longestPositiveWindowDrill43(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Longest Positive Window Drill 43\n// Topic: array | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object longestPositiveWindowDrill43(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Longest Positive Window Drill 43\n// Topic: array | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid longestPositiveWindowDrill43() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Longest Positive Window Drill 43\n * Topic: array | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction longestPositiveWindowDrill43(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "longestPositiveWindowDrill43",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 161,
    "originalId": "gen-044",
    "title": "Anagram Window Drill 44",
    "difficulty": "Medium",
    "category": "Strings",
    "topic": "Strings",
    "pattern": "sliding window",
    "description": "Find whether a permutation of pattern occurs as a contiguous substring of text. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find whether a permutation of pattern occurs as a contiguous substring of text. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Anagram Window Drill 44\n * Topic: string | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction anagramWindowDrill44(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Anagram Window Drill 44\n# Topic: string | Pattern: sliding window\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef anagramWindowDrill44(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Anagram Window Drill 44\n// Topic: string | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object anagramWindowDrill44(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Anagram Window Drill 44\n// Topic: string | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid anagramWindowDrill44() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Anagram Window Drill 44\n * Topic: string | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction anagramWindowDrill44(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "anagramWindowDrill44",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 162,
    "originalId": "gen-045",
    "title": "Palindrome Radius Drill 45",
    "difficulty": "Easy",
    "category": "Strings",
    "topic": "Strings",
    "pattern": "two pointers",
    "description": "Check whether a string is a palindrome after ignoring non-alphanumeric characters and case. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Check whether a string is a palindrome after ignoring non-alphanumeric characters and case. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Palindrome Radius Drill 45\n * Topic: string | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction palindromeRadiusDrill45(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Palindrome Radius Drill 45\n# Topic: string | Pattern: two pointers\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef palindromeRadiusDrill45(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Palindrome Radius Drill 45\n// Topic: string | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object palindromeRadiusDrill45(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Palindrome Radius Drill 45\n// Topic: string | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid palindromeRadiusDrill45() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Palindrome Radius Drill 45\n * Topic: string | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction palindromeRadiusDrill45(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "palindromeRadiusDrill45",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 163,
    "originalId": "gen-046",
    "title": "Sorted Merge Drill 46",
    "difficulty": "Easy",
    "category": "Linked Lists",
    "topic": "Linked Lists",
    "pattern": "linked-list merge",
    "description": "Merge two sorted singly linked lists into one sorted list without allocating a node per input element. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Merge two sorted singly linked lists into one sorted list without allocating a node per input element. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Sorted Merge Drill 46\n * Topic: linked list | Pattern: linked-list merge\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedMergeDrill46(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Sorted Merge Drill 46\n# Topic: linked list | Pattern: linked-list merge\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef sortedMergeDrill46(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Sorted Merge Drill 46\n// Topic: linked list | Pattern: linked-list merge\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object sortedMergeDrill46(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Sorted Merge Drill 46\n// Topic: linked list | Pattern: linked-list merge\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid sortedMergeDrill46() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Sorted Merge Drill 46\n * Topic: linked list | Pattern: linked-list merge\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedMergeDrill46(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "sortedMergeDrill46",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 164,
    "originalId": "gen-047",
    "title": "Histogram Area Drill 47",
    "difficulty": "Hard",
    "category": "Stacks",
    "topic": "Stacks",
    "pattern": "monotonic stack",
    "description": "Find the largest rectangle area in a histogram. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the largest rectangle area in a histogram. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Histogram Area Drill 47\n * Topic: stack | Pattern: monotonic stack\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction histogramAreaDrill47(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Histogram Area Drill 47\n# Topic: stack | Pattern: monotonic stack\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef histogramAreaDrill47(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Histogram Area Drill 47\n// Topic: stack | Pattern: monotonic stack\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object histogramAreaDrill47(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Histogram Area Drill 47\n// Topic: stack | Pattern: monotonic stack\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid histogramAreaDrill47() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Histogram Area Drill 47\n * Topic: stack | Pattern: monotonic stack\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction histogramAreaDrill47(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "histogramAreaDrill47",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 165,
    "originalId": "gen-048",
    "title": "Window Maximum Drill 48",
    "difficulty": "Hard",
    "category": "Queues",
    "topic": "Queues",
    "pattern": "monotonic deque",
    "description": "Return the maximum of every contiguous window of size K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the maximum of every contiguous window of size K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Window Maximum Drill 48\n * Topic: queue | Pattern: monotonic deque\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction windowMaximumDrill48(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Window Maximum Drill 48\n# Topic: queue | Pattern: monotonic deque\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef windowMaximumDrill48(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Window Maximum Drill 48\n// Topic: queue | Pattern: monotonic deque\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object windowMaximumDrill48(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Window Maximum Drill 48\n// Topic: queue | Pattern: monotonic deque\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid windowMaximumDrill48() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Window Maximum Drill 48\n * Topic: queue | Pattern: monotonic deque\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction windowMaximumDrill48(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "windowMaximumDrill48",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 166,
    "originalId": "gen-049",
    "title": "Level Width Drill 49",
    "difficulty": "Medium",
    "category": "Trees",
    "topic": "Trees",
    "pattern": "BFS",
    "description": "Return the maximum number of nodes appearing at any depth. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the maximum number of nodes appearing at any depth. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Level Width Drill 49\n * Topic: tree | Pattern: BFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction levelWidthDrill49(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Level Width Drill 49\n# Topic: tree | Pattern: BFS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef levelWidthDrill49(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Level Width Drill 49\n// Topic: tree | Pattern: BFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object levelWidthDrill49(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Level Width Drill 49\n// Topic: tree | Pattern: BFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid levelWidthDrill49() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Level Width Drill 49\n * Topic: tree | Pattern: BFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction levelWidthDrill49(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "levelWidthDrill49",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 167,
    "originalId": "gen-050",
    "title": "Path Sum Count Drill 50",
    "difficulty": "Medium",
    "category": "Trees",
    "topic": "Trees",
    "pattern": "tree DFS",
    "description": "Count downward paths whose values sum to a target; a path may start at any node. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Count downward paths whose values sum to a target; a path may start at any node. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Path Sum Count Drill 50\n * Topic: tree | Pattern: tree DFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction pathSumCountDrill50(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Path Sum Count Drill 50\n# Topic: tree | Pattern: tree DFS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef pathSumCountDrill50(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Path Sum Count Drill 50\n// Topic: tree | Pattern: tree DFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object pathSumCountDrill50(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Path Sum Count Drill 50\n// Topic: tree | Pattern: tree DFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid pathSumCountDrill50() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Path Sum Count Drill 50\n * Topic: tree | Pattern: tree DFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction pathSumCountDrill50(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "pathSumCountDrill50",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 168,
    "originalId": "gen-051",
    "title": "Bipartite Check Drill 51",
    "difficulty": "Medium",
    "category": "Graphs",
    "topic": "Graphs",
    "pattern": "BFS coloring",
    "description": "Determine whether an undirected graph can be colored with two colors so every edge crosses colors. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether an undirected graph can be colored with two colors so every edge crosses colors. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Bipartite Check Drill 51\n * Topic: graph | Pattern: BFS coloring\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction bipartiteCheckDrill51(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Bipartite Check Drill 51\n# Topic: graph | Pattern: BFS coloring\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef bipartiteCheckDrill51(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Bipartite Check Drill 51\n// Topic: graph | Pattern: BFS coloring\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object bipartiteCheckDrill51(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Bipartite Check Drill 51\n// Topic: graph | Pattern: BFS coloring\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid bipartiteCheckDrill51() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Bipartite Check Drill 51\n * Topic: graph | Pattern: BFS coloring\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction bipartiteCheckDrill51(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "bipartiteCheckDrill51",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 169,
    "originalId": "gen-052",
    "title": "Minimum Spanning Cost Drill 52",
    "difficulty": "Medium",
    "category": "Graphs",
    "topic": "Graphs",
    "pattern": "Kruskal",
    "description": "Find the minimum cost needed to connect all vertices, or report impossible. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the minimum cost needed to connect all vertices, or report impossible. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Minimum Spanning Cost Drill 52\n * Topic: graph | Pattern: Kruskal\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction minimumSpanningCostDrill52(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Minimum Spanning Cost Drill 52\n# Topic: graph | Pattern: Kruskal\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef minimumSpanningCostDrill52(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Minimum Spanning Cost Drill 52\n// Topic: graph | Pattern: Kruskal\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object minimumSpanningCostDrill52(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Minimum Spanning Cost Drill 52\n// Topic: graph | Pattern: Kruskal\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid minimumSpanningCostDrill52() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Minimum Spanning Cost Drill 52\n * Topic: graph | Pattern: Kruskal\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction minimumSpanningCostDrill52(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "minimumSpanningCostDrill52",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 170,
    "originalId": "gen-053",
    "title": "Negative Route Detection Drill 53",
    "difficulty": "Hard",
    "category": "Graphs",
    "topic": "Graphs",
    "pattern": "Bellman-Ford",
    "description": "Determine whether a negative cycle is reachable from a given source. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether a negative cycle is reachable from a given source. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Negative Route Detection Drill 53\n * Topic: graph | Pattern: Bellman-Ford\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction negativeRouteDetectionDrill53(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Negative Route Detection Drill 53\n# Topic: graph | Pattern: Bellman-Ford\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef negativeRouteDetectionDrill53(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Negative Route Detection Drill 53\n// Topic: graph | Pattern: Bellman-Ford\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object negativeRouteDetectionDrill53(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Negative Route Detection Drill 53\n// Topic: graph | Pattern: Bellman-Ford\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid negativeRouteDetectionDrill53() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Negative Route Detection Drill 53\n * Topic: graph | Pattern: Bellman-Ford\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction negativeRouteDetectionDrill53(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "negativeRouteDetectionDrill53",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 171,
    "originalId": "gen-054",
    "title": "Increasing Sequence Drill 54",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "LIS",
    "description": "Return the length of the longest strictly increasing subsequence. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the length of the longest strictly increasing subsequence. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Increasing Sequence Drill 54\n * Topic: DP | Pattern: LIS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction increasingSequenceDrill54(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Increasing Sequence Drill 54\n# Topic: DP | Pattern: LIS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef increasingSequenceDrill54(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Increasing Sequence Drill 54\n// Topic: DP | Pattern: LIS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object increasingSequenceDrill54(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Increasing Sequence Drill 54\n// Topic: DP | Pattern: LIS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid increasingSequenceDrill54() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Increasing Sequence Drill 54\n * Topic: DP | Pattern: LIS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction increasingSequenceDrill54(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "increasingSequenceDrill54",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 172,
    "originalId": "gen-055",
    "title": "Common Sequence Drill 55",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "LCS",
    "description": "Return the length of the longest common subsequence of two strings. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the length of the longest common subsequence of two strings. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Common Sequence Drill 55\n * Topic: DP | Pattern: LCS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction commonSequenceDrill55(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Common Sequence Drill 55\n# Topic: DP | Pattern: LCS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef commonSequenceDrill55(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Common Sequence Drill 55\n// Topic: DP | Pattern: LCS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object commonSequenceDrill55(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Common Sequence Drill 55\n// Topic: DP | Pattern: LCS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid commonSequenceDrill55() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Common Sequence Drill 55\n * Topic: DP | Pattern: LCS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction commonSequenceDrill55(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "commonSequenceDrill55",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 173,
    "originalId": "gen-056",
    "title": "Grid Paths Drill 56",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "2D DP",
    "description": "Count paths from top-left to bottom-right moving only right and down around blocked cells. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Count paths from top-left to bottom-right moving only right and down around blocked cells. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Grid Paths Drill 56\n * Topic: DP | Pattern: 2D DP\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction gridPathsDrill56(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Grid Paths Drill 56\n# Topic: DP | Pattern: 2D DP\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef gridPathsDrill56(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Grid Paths Drill 56\n// Topic: DP | Pattern: 2D DP\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object gridPathsDrill56(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Grid Paths Drill 56\n// Topic: DP | Pattern: 2D DP\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid gridPathsDrill56() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Grid Paths Drill 56\n * Topic: DP | Pattern: 2D DP\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction gridPathsDrill56(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "gridPathsDrill56",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 174,
    "originalId": "gen-057",
    "title": "Partition Feasibility Drill 57",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "subset-sum",
    "description": "Determine whether an array can be partitioned into two subsets with equal sum. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether an array can be partitioned into two subsets with equal sum. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Partition Feasibility Drill 57\n * Topic: DP | Pattern: subset-sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction partitionFeasibilityDrill57(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Partition Feasibility Drill 57\n# Topic: DP | Pattern: subset-sum\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef partitionFeasibilityDrill57(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Partition Feasibility Drill 57\n// Topic: DP | Pattern: subset-sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object partitionFeasibilityDrill57(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Partition Feasibility Drill 57\n// Topic: DP | Pattern: subset-sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid partitionFeasibilityDrill57() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Partition Feasibility Drill 57\n * Topic: DP | Pattern: subset-sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction partitionFeasibilityDrill57(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "partitionFeasibilityDrill57",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 175,
    "originalId": "gen-058",
    "title": "Power Check Drill 58",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "topic": "Bit Manipulation",
    "pattern": "bit trick",
    "description": "Determine whether a positive integer is a power of two. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether a positive integer is a power of two. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Power Check Drill 58\n * Topic: bits | Pattern: bit trick\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction powerCheckDrill58(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Power Check Drill 58\n# Topic: bits | Pattern: bit trick\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef powerCheckDrill58(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Power Check Drill 58\n// Topic: bits | Pattern: bit trick\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object powerCheckDrill58(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Power Check Drill 58\n// Topic: bits | Pattern: bit trick\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid powerCheckDrill58() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Power Check Drill 58\n * Topic: bits | Pattern: bit trick\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction powerCheckDrill58(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "powerCheckDrill58",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 176,
    "originalId": "gen-059",
    "title": "Range Minimum Drill 59",
    "difficulty": "Hard",
    "category": "Range Queries",
    "topic": "Range Queries",
    "pattern": "segment tree",
    "description": "Support point updates and range minimum queries. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Support point updates and range minimum queries. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Range Minimum Drill 59\n * Topic: range | Pattern: segment tree\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction rangeMinimumDrill59(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Range Minimum Drill 59\n# Topic: range | Pattern: segment tree\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef rangeMinimumDrill59(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Range Minimum Drill 59\n// Topic: range | Pattern: segment tree\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object rangeMinimumDrill59(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Range Minimum Drill 59\n// Topic: range | Pattern: segment tree\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid rangeMinimumDrill59() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Range Minimum Drill 59\n * Topic: range | Pattern: segment tree\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction rangeMinimumDrill59(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "rangeMinimumDrill59",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 177,
    "originalId": "gen-060",
    "title": "Kth Selection Drill 60",
    "difficulty": "Hard",
    "category": "Advanced Patterns",
    "topic": "Advanced Patterns",
    "pattern": "quickselect",
    "description": "Find the kth smallest element without fully sorting the array. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the kth smallest element without fully sorting the array. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Kth Selection Drill 60\n * Topic: advanced | Pattern: quickselect\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction kthSelectionDrill60(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Kth Selection Drill 60\n# Topic: advanced | Pattern: quickselect\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef kthSelectionDrill60(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Kth Selection Drill 60\n// Topic: advanced | Pattern: quickselect\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object kthSelectionDrill60(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Kth Selection Drill 60\n// Topic: advanced | Pattern: quickselect\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid kthSelectionDrill60() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Kth Selection Drill 60\n * Topic: advanced | Pattern: quickselect\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction kthSelectionDrill60(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "kthSelectionDrill60",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 178,
    "originalId": "gen-061",
    "title": "Array Prefix Balance Drill 61",
    "difficulty": "Medium",
    "category": "Arrays",
    "topic": "Arrays",
    "pattern": "prefix sum",
    "description": "Find the first index where the sum of elements on the left equals the sum on the right. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the first index where the sum of elements on the left equals the sum on the right. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Array Prefix Balance Drill 61\n * Topic: array | Pattern: prefix sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction arrayPrefixBalanceDrill61(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Array Prefix Balance Drill 61\n# Topic: array | Pattern: prefix sum\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef arrayPrefixBalanceDrill61(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Array Prefix Balance Drill 61\n// Topic: array | Pattern: prefix sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object arrayPrefixBalanceDrill61(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Array Prefix Balance Drill 61\n// Topic: array | Pattern: prefix sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid arrayPrefixBalanceDrill61() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Array Prefix Balance Drill 61\n * Topic: array | Pattern: prefix sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction arrayPrefixBalanceDrill61(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "arrayPrefixBalanceDrill61",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 179,
    "originalId": "gen-062",
    "title": "Sorted Pair Distance Drill 62",
    "difficulty": "Medium",
    "category": "Arrays",
    "topic": "Arrays",
    "pattern": "two pointers",
    "description": "Given a sorted array and target D, find whether two distinct values differ by exactly D. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Given a sorted array and target D, find whether two distinct values differ by exactly D. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Sorted Pair Distance Drill 62\n * Topic: array | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedPairDistanceDrill62(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Sorted Pair Distance Drill 62\n# Topic: array | Pattern: two pointers\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef sortedPairDistanceDrill62(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Sorted Pair Distance Drill 62\n// Topic: array | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object sortedPairDistanceDrill62(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Sorted Pair Distance Drill 62\n// Topic: array | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid sortedPairDistanceDrill62() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Sorted Pair Distance Drill 62\n * Topic: array | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedPairDistanceDrill62(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "sortedPairDistanceDrill62",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 180,
    "originalId": "gen-063",
    "title": "Longest Positive Window Drill 63",
    "difficulty": "Medium",
    "category": "Arrays",
    "topic": "Arrays",
    "pattern": "sliding window",
    "description": "For a positive-integer array and K, find the longest contiguous subarray whose sum is at most K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "For a positive-integer array and K, find the longest contiguous subarray whose sum is at most K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Longest Positive Window Drill 63\n * Topic: array | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction longestPositiveWindowDrill63(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Longest Positive Window Drill 63\n# Topic: array | Pattern: sliding window\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef longestPositiveWindowDrill63(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Longest Positive Window Drill 63\n// Topic: array | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object longestPositiveWindowDrill63(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Longest Positive Window Drill 63\n// Topic: array | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid longestPositiveWindowDrill63() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Longest Positive Window Drill 63\n * Topic: array | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction longestPositiveWindowDrill63(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "longestPositiveWindowDrill63",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 181,
    "originalId": "gen-064",
    "title": "Anagram Window Drill 64",
    "difficulty": "Medium",
    "category": "Strings",
    "topic": "Strings",
    "pattern": "sliding window",
    "description": "Find whether a permutation of pattern occurs as a contiguous substring of text. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find whether a permutation of pattern occurs as a contiguous substring of text. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Anagram Window Drill 64\n * Topic: string | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction anagramWindowDrill64(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Anagram Window Drill 64\n# Topic: string | Pattern: sliding window\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef anagramWindowDrill64(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Anagram Window Drill 64\n// Topic: string | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object anagramWindowDrill64(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Anagram Window Drill 64\n// Topic: string | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid anagramWindowDrill64() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Anagram Window Drill 64\n * Topic: string | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction anagramWindowDrill64(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "anagramWindowDrill64",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 182,
    "originalId": "gen-065",
    "title": "Palindrome Radius Drill 65",
    "difficulty": "Easy",
    "category": "Strings",
    "topic": "Strings",
    "pattern": "two pointers",
    "description": "Check whether a string is a palindrome after ignoring non-alphanumeric characters and case. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Check whether a string is a palindrome after ignoring non-alphanumeric characters and case. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Palindrome Radius Drill 65\n * Topic: string | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction palindromeRadiusDrill65(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Palindrome Radius Drill 65\n# Topic: string | Pattern: two pointers\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef palindromeRadiusDrill65(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Palindrome Radius Drill 65\n// Topic: string | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object palindromeRadiusDrill65(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Palindrome Radius Drill 65\n// Topic: string | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid palindromeRadiusDrill65() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Palindrome Radius Drill 65\n * Topic: string | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction palindromeRadiusDrill65(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "palindromeRadiusDrill65",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 183,
    "originalId": "gen-066",
    "title": "Sorted Merge Drill 66",
    "difficulty": "Easy",
    "category": "Linked Lists",
    "topic": "Linked Lists",
    "pattern": "linked-list merge",
    "description": "Merge two sorted singly linked lists into one sorted list without allocating a node per input element. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Merge two sorted singly linked lists into one sorted list without allocating a node per input element. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Sorted Merge Drill 66\n * Topic: linked list | Pattern: linked-list merge\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedMergeDrill66(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Sorted Merge Drill 66\n# Topic: linked list | Pattern: linked-list merge\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef sortedMergeDrill66(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Sorted Merge Drill 66\n// Topic: linked list | Pattern: linked-list merge\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object sortedMergeDrill66(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Sorted Merge Drill 66\n// Topic: linked list | Pattern: linked-list merge\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid sortedMergeDrill66() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Sorted Merge Drill 66\n * Topic: linked list | Pattern: linked-list merge\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedMergeDrill66(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "sortedMergeDrill66",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 184,
    "originalId": "gen-067",
    "title": "Histogram Area Drill 67",
    "difficulty": "Hard",
    "category": "Stacks",
    "topic": "Stacks",
    "pattern": "monotonic stack",
    "description": "Find the largest rectangle area in a histogram. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the largest rectangle area in a histogram. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Histogram Area Drill 67\n * Topic: stack | Pattern: monotonic stack\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction histogramAreaDrill67(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Histogram Area Drill 67\n# Topic: stack | Pattern: monotonic stack\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef histogramAreaDrill67(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Histogram Area Drill 67\n// Topic: stack | Pattern: monotonic stack\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object histogramAreaDrill67(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Histogram Area Drill 67\n// Topic: stack | Pattern: monotonic stack\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid histogramAreaDrill67() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Histogram Area Drill 67\n * Topic: stack | Pattern: monotonic stack\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction histogramAreaDrill67(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "histogramAreaDrill67",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 185,
    "originalId": "gen-068",
    "title": "Window Maximum Drill 68",
    "difficulty": "Hard",
    "category": "Queues",
    "topic": "Queues",
    "pattern": "monotonic deque",
    "description": "Return the maximum of every contiguous window of size K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the maximum of every contiguous window of size K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Window Maximum Drill 68\n * Topic: queue | Pattern: monotonic deque\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction windowMaximumDrill68(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Window Maximum Drill 68\n# Topic: queue | Pattern: monotonic deque\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef windowMaximumDrill68(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Window Maximum Drill 68\n// Topic: queue | Pattern: monotonic deque\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object windowMaximumDrill68(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Window Maximum Drill 68\n// Topic: queue | Pattern: monotonic deque\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid windowMaximumDrill68() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Window Maximum Drill 68\n * Topic: queue | Pattern: monotonic deque\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction windowMaximumDrill68(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "windowMaximumDrill68",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 186,
    "originalId": "gen-069",
    "title": "Level Width Drill 69",
    "difficulty": "Medium",
    "category": "Trees",
    "topic": "Trees",
    "pattern": "BFS",
    "description": "Return the maximum number of nodes appearing at any depth. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the maximum number of nodes appearing at any depth. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Level Width Drill 69\n * Topic: tree | Pattern: BFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction levelWidthDrill69(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Level Width Drill 69\n# Topic: tree | Pattern: BFS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef levelWidthDrill69(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Level Width Drill 69\n// Topic: tree | Pattern: BFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object levelWidthDrill69(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Level Width Drill 69\n// Topic: tree | Pattern: BFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid levelWidthDrill69() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Level Width Drill 69\n * Topic: tree | Pattern: BFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction levelWidthDrill69(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "levelWidthDrill69",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 187,
    "originalId": "gen-070",
    "title": "Path Sum Count Drill 70",
    "difficulty": "Medium",
    "category": "Trees",
    "topic": "Trees",
    "pattern": "tree DFS",
    "description": "Count downward paths whose values sum to a target; a path may start at any node. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Count downward paths whose values sum to a target; a path may start at any node. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Path Sum Count Drill 70\n * Topic: tree | Pattern: tree DFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction pathSumCountDrill70(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Path Sum Count Drill 70\n# Topic: tree | Pattern: tree DFS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef pathSumCountDrill70(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Path Sum Count Drill 70\n// Topic: tree | Pattern: tree DFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object pathSumCountDrill70(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Path Sum Count Drill 70\n// Topic: tree | Pattern: tree DFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid pathSumCountDrill70() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Path Sum Count Drill 70\n * Topic: tree | Pattern: tree DFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction pathSumCountDrill70(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "pathSumCountDrill70",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 188,
    "originalId": "gen-071",
    "title": "Bipartite Check Drill 71",
    "difficulty": "Medium",
    "category": "Graphs",
    "topic": "Graphs",
    "pattern": "BFS coloring",
    "description": "Determine whether an undirected graph can be colored with two colors so every edge crosses colors. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether an undirected graph can be colored with two colors so every edge crosses colors. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Bipartite Check Drill 71\n * Topic: graph | Pattern: BFS coloring\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction bipartiteCheckDrill71(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Bipartite Check Drill 71\n# Topic: graph | Pattern: BFS coloring\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef bipartiteCheckDrill71(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Bipartite Check Drill 71\n// Topic: graph | Pattern: BFS coloring\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object bipartiteCheckDrill71(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Bipartite Check Drill 71\n// Topic: graph | Pattern: BFS coloring\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid bipartiteCheckDrill71() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Bipartite Check Drill 71\n * Topic: graph | Pattern: BFS coloring\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction bipartiteCheckDrill71(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "bipartiteCheckDrill71",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 189,
    "originalId": "gen-072",
    "title": "Minimum Spanning Cost Drill 72",
    "difficulty": "Medium",
    "category": "Graphs",
    "topic": "Graphs",
    "pattern": "Kruskal",
    "description": "Find the minimum cost needed to connect all vertices, or report impossible. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the minimum cost needed to connect all vertices, or report impossible. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Minimum Spanning Cost Drill 72\n * Topic: graph | Pattern: Kruskal\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction minimumSpanningCostDrill72(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Minimum Spanning Cost Drill 72\n# Topic: graph | Pattern: Kruskal\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef minimumSpanningCostDrill72(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Minimum Spanning Cost Drill 72\n// Topic: graph | Pattern: Kruskal\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object minimumSpanningCostDrill72(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Minimum Spanning Cost Drill 72\n// Topic: graph | Pattern: Kruskal\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid minimumSpanningCostDrill72() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Minimum Spanning Cost Drill 72\n * Topic: graph | Pattern: Kruskal\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction minimumSpanningCostDrill72(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "minimumSpanningCostDrill72",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 190,
    "originalId": "gen-073",
    "title": "Negative Route Detection Drill 73",
    "difficulty": "Hard",
    "category": "Graphs",
    "topic": "Graphs",
    "pattern": "Bellman-Ford",
    "description": "Determine whether a negative cycle is reachable from a given source. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether a negative cycle is reachable from a given source. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Negative Route Detection Drill 73\n * Topic: graph | Pattern: Bellman-Ford\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction negativeRouteDetectionDrill73(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Negative Route Detection Drill 73\n# Topic: graph | Pattern: Bellman-Ford\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef negativeRouteDetectionDrill73(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Negative Route Detection Drill 73\n// Topic: graph | Pattern: Bellman-Ford\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object negativeRouteDetectionDrill73(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Negative Route Detection Drill 73\n// Topic: graph | Pattern: Bellman-Ford\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid negativeRouteDetectionDrill73() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Negative Route Detection Drill 73\n * Topic: graph | Pattern: Bellman-Ford\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction negativeRouteDetectionDrill73(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "negativeRouteDetectionDrill73",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 191,
    "originalId": "gen-074",
    "title": "Increasing Sequence Drill 74",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "LIS",
    "description": "Return the length of the longest strictly increasing subsequence. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the length of the longest strictly increasing subsequence. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Increasing Sequence Drill 74\n * Topic: DP | Pattern: LIS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction increasingSequenceDrill74(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Increasing Sequence Drill 74\n# Topic: DP | Pattern: LIS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef increasingSequenceDrill74(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Increasing Sequence Drill 74\n// Topic: DP | Pattern: LIS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object increasingSequenceDrill74(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Increasing Sequence Drill 74\n// Topic: DP | Pattern: LIS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid increasingSequenceDrill74() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Increasing Sequence Drill 74\n * Topic: DP | Pattern: LIS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction increasingSequenceDrill74(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "increasingSequenceDrill74",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 192,
    "originalId": "gen-075",
    "title": "Common Sequence Drill 75",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "LCS",
    "description": "Return the length of the longest common subsequence of two strings. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the length of the longest common subsequence of two strings. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Common Sequence Drill 75\n * Topic: DP | Pattern: LCS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction commonSequenceDrill75(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Common Sequence Drill 75\n# Topic: DP | Pattern: LCS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef commonSequenceDrill75(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Common Sequence Drill 75\n// Topic: DP | Pattern: LCS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object commonSequenceDrill75(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Common Sequence Drill 75\n// Topic: DP | Pattern: LCS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid commonSequenceDrill75() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Common Sequence Drill 75\n * Topic: DP | Pattern: LCS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction commonSequenceDrill75(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "commonSequenceDrill75",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 193,
    "originalId": "gen-076",
    "title": "Grid Paths Drill 76",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "2D DP",
    "description": "Count paths from top-left to bottom-right moving only right and down around blocked cells. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Count paths from top-left to bottom-right moving only right and down around blocked cells. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Grid Paths Drill 76\n * Topic: DP | Pattern: 2D DP\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction gridPathsDrill76(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Grid Paths Drill 76\n# Topic: DP | Pattern: 2D DP\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef gridPathsDrill76(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Grid Paths Drill 76\n// Topic: DP | Pattern: 2D DP\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object gridPathsDrill76(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Grid Paths Drill 76\n// Topic: DP | Pattern: 2D DP\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid gridPathsDrill76() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Grid Paths Drill 76\n * Topic: DP | Pattern: 2D DP\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction gridPathsDrill76(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "gridPathsDrill76",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 194,
    "originalId": "gen-077",
    "title": "Partition Feasibility Drill 77",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "subset-sum",
    "description": "Determine whether an array can be partitioned into two subsets with equal sum. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether an array can be partitioned into two subsets with equal sum. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Partition Feasibility Drill 77\n * Topic: DP | Pattern: subset-sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction partitionFeasibilityDrill77(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Partition Feasibility Drill 77\n# Topic: DP | Pattern: subset-sum\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef partitionFeasibilityDrill77(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Partition Feasibility Drill 77\n// Topic: DP | Pattern: subset-sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object partitionFeasibilityDrill77(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Partition Feasibility Drill 77\n// Topic: DP | Pattern: subset-sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid partitionFeasibilityDrill77() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Partition Feasibility Drill 77\n * Topic: DP | Pattern: subset-sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction partitionFeasibilityDrill77(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "partitionFeasibilityDrill77",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 195,
    "originalId": "gen-078",
    "title": "Power Check Drill 78",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "topic": "Bit Manipulation",
    "pattern": "bit trick",
    "description": "Determine whether a positive integer is a power of two. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether a positive integer is a power of two. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Power Check Drill 78\n * Topic: bits | Pattern: bit trick\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction powerCheckDrill78(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Power Check Drill 78\n# Topic: bits | Pattern: bit trick\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef powerCheckDrill78(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Power Check Drill 78\n// Topic: bits | Pattern: bit trick\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object powerCheckDrill78(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Power Check Drill 78\n// Topic: bits | Pattern: bit trick\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid powerCheckDrill78() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Power Check Drill 78\n * Topic: bits | Pattern: bit trick\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction powerCheckDrill78(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "powerCheckDrill78",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 196,
    "originalId": "gen-079",
    "title": "Range Minimum Drill 79",
    "difficulty": "Hard",
    "category": "Range Queries",
    "topic": "Range Queries",
    "pattern": "segment tree",
    "description": "Support point updates and range minimum queries. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Support point updates and range minimum queries. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Range Minimum Drill 79\n * Topic: range | Pattern: segment tree\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction rangeMinimumDrill79(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Range Minimum Drill 79\n# Topic: range | Pattern: segment tree\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef rangeMinimumDrill79(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Range Minimum Drill 79\n// Topic: range | Pattern: segment tree\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object rangeMinimumDrill79(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Range Minimum Drill 79\n// Topic: range | Pattern: segment tree\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid rangeMinimumDrill79() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Range Minimum Drill 79\n * Topic: range | Pattern: segment tree\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction rangeMinimumDrill79(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "rangeMinimumDrill79",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 197,
    "originalId": "gen-080",
    "title": "Kth Selection Drill 80",
    "difficulty": "Hard",
    "category": "Advanced Patterns",
    "topic": "Advanced Patterns",
    "pattern": "quickselect",
    "description": "Find the kth smallest element without fully sorting the array. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the kth smallest element without fully sorting the array. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Kth Selection Drill 80\n * Topic: advanced | Pattern: quickselect\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction kthSelectionDrill80(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Kth Selection Drill 80\n# Topic: advanced | Pattern: quickselect\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef kthSelectionDrill80(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Kth Selection Drill 80\n// Topic: advanced | Pattern: quickselect\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object kthSelectionDrill80(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Kth Selection Drill 80\n// Topic: advanced | Pattern: quickselect\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid kthSelectionDrill80() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Kth Selection Drill 80\n * Topic: advanced | Pattern: quickselect\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction kthSelectionDrill80(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "kthSelectionDrill80",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 198,
    "originalId": "gen-081",
    "title": "Array Prefix Balance Drill 81",
    "difficulty": "Medium",
    "category": "Arrays",
    "topic": "Arrays",
    "pattern": "prefix sum",
    "description": "Find the first index where the sum of elements on the left equals the sum on the right. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the first index where the sum of elements on the left equals the sum on the right. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Array Prefix Balance Drill 81\n * Topic: array | Pattern: prefix sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction arrayPrefixBalanceDrill81(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Array Prefix Balance Drill 81\n# Topic: array | Pattern: prefix sum\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef arrayPrefixBalanceDrill81(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Array Prefix Balance Drill 81\n// Topic: array | Pattern: prefix sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object arrayPrefixBalanceDrill81(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Array Prefix Balance Drill 81\n// Topic: array | Pattern: prefix sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid arrayPrefixBalanceDrill81() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Array Prefix Balance Drill 81\n * Topic: array | Pattern: prefix sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction arrayPrefixBalanceDrill81(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "arrayPrefixBalanceDrill81",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 199,
    "originalId": "gen-082",
    "title": "Sorted Pair Distance Drill 82",
    "difficulty": "Medium",
    "category": "Arrays",
    "topic": "Arrays",
    "pattern": "two pointers",
    "description": "Given a sorted array and target D, find whether two distinct values differ by exactly D. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Given a sorted array and target D, find whether two distinct values differ by exactly D. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Sorted Pair Distance Drill 82\n * Topic: array | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedPairDistanceDrill82(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Sorted Pair Distance Drill 82\n# Topic: array | Pattern: two pointers\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef sortedPairDistanceDrill82(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Sorted Pair Distance Drill 82\n// Topic: array | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object sortedPairDistanceDrill82(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Sorted Pair Distance Drill 82\n// Topic: array | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid sortedPairDistanceDrill82() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Sorted Pair Distance Drill 82\n * Topic: array | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedPairDistanceDrill82(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "sortedPairDistanceDrill82",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 200,
    "originalId": "gen-083",
    "title": "Longest Positive Window Drill 83",
    "difficulty": "Medium",
    "category": "Arrays",
    "topic": "Arrays",
    "pattern": "sliding window",
    "description": "For a positive-integer array and K, find the longest contiguous subarray whose sum is at most K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "For a positive-integer array and K, find the longest contiguous subarray whose sum is at most K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Longest Positive Window Drill 83\n * Topic: array | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction longestPositiveWindowDrill83(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Longest Positive Window Drill 83\n# Topic: array | Pattern: sliding window\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef longestPositiveWindowDrill83(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Longest Positive Window Drill 83\n// Topic: array | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object longestPositiveWindowDrill83(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Longest Positive Window Drill 83\n// Topic: array | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid longestPositiveWindowDrill83() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Longest Positive Window Drill 83\n * Topic: array | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction longestPositiveWindowDrill83(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "longestPositiveWindowDrill83",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 201,
    "originalId": "gen-084",
    "title": "Anagram Window Drill 84",
    "difficulty": "Medium",
    "category": "Strings",
    "topic": "Strings",
    "pattern": "sliding window",
    "description": "Find whether a permutation of pattern occurs as a contiguous substring of text. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find whether a permutation of pattern occurs as a contiguous substring of text. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Anagram Window Drill 84\n * Topic: string | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction anagramWindowDrill84(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Anagram Window Drill 84\n# Topic: string | Pattern: sliding window\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef anagramWindowDrill84(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Anagram Window Drill 84\n// Topic: string | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object anagramWindowDrill84(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Anagram Window Drill 84\n// Topic: string | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid anagramWindowDrill84() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Anagram Window Drill 84\n * Topic: string | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction anagramWindowDrill84(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "anagramWindowDrill84",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 202,
    "originalId": "gen-085",
    "title": "Palindrome Radius Drill 85",
    "difficulty": "Easy",
    "category": "Strings",
    "topic": "Strings",
    "pattern": "two pointers",
    "description": "Check whether a string is a palindrome after ignoring non-alphanumeric characters and case. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Check whether a string is a palindrome after ignoring non-alphanumeric characters and case. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Palindrome Radius Drill 85\n * Topic: string | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction palindromeRadiusDrill85(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Palindrome Radius Drill 85\n# Topic: string | Pattern: two pointers\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef palindromeRadiusDrill85(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Palindrome Radius Drill 85\n// Topic: string | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object palindromeRadiusDrill85(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Palindrome Radius Drill 85\n// Topic: string | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid palindromeRadiusDrill85() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Palindrome Radius Drill 85\n * Topic: string | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction palindromeRadiusDrill85(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "palindromeRadiusDrill85",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 203,
    "originalId": "gen-086",
    "title": "Sorted Merge Drill 86",
    "difficulty": "Easy",
    "category": "Linked Lists",
    "topic": "Linked Lists",
    "pattern": "linked-list merge",
    "description": "Merge two sorted singly linked lists into one sorted list without allocating a node per input element. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Merge two sorted singly linked lists into one sorted list without allocating a node per input element. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Sorted Merge Drill 86\n * Topic: linked list | Pattern: linked-list merge\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedMergeDrill86(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Sorted Merge Drill 86\n# Topic: linked list | Pattern: linked-list merge\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef sortedMergeDrill86(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Sorted Merge Drill 86\n// Topic: linked list | Pattern: linked-list merge\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object sortedMergeDrill86(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Sorted Merge Drill 86\n// Topic: linked list | Pattern: linked-list merge\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid sortedMergeDrill86() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Sorted Merge Drill 86\n * Topic: linked list | Pattern: linked-list merge\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedMergeDrill86(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "sortedMergeDrill86",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 204,
    "originalId": "gen-087",
    "title": "Histogram Area Drill 87",
    "difficulty": "Hard",
    "category": "Stacks",
    "topic": "Stacks",
    "pattern": "monotonic stack",
    "description": "Find the largest rectangle area in a histogram. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the largest rectangle area in a histogram. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Histogram Area Drill 87\n * Topic: stack | Pattern: monotonic stack\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction histogramAreaDrill87(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Histogram Area Drill 87\n# Topic: stack | Pattern: monotonic stack\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef histogramAreaDrill87(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Histogram Area Drill 87\n// Topic: stack | Pattern: monotonic stack\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object histogramAreaDrill87(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Histogram Area Drill 87\n// Topic: stack | Pattern: monotonic stack\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid histogramAreaDrill87() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Histogram Area Drill 87\n * Topic: stack | Pattern: monotonic stack\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction histogramAreaDrill87(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "histogramAreaDrill87",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 205,
    "originalId": "gen-088",
    "title": "Window Maximum Drill 88",
    "difficulty": "Hard",
    "category": "Queues",
    "topic": "Queues",
    "pattern": "monotonic deque",
    "description": "Return the maximum of every contiguous window of size K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the maximum of every contiguous window of size K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Window Maximum Drill 88\n * Topic: queue | Pattern: monotonic deque\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction windowMaximumDrill88(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Window Maximum Drill 88\n# Topic: queue | Pattern: monotonic deque\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef windowMaximumDrill88(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Window Maximum Drill 88\n// Topic: queue | Pattern: monotonic deque\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object windowMaximumDrill88(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Window Maximum Drill 88\n// Topic: queue | Pattern: monotonic deque\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid windowMaximumDrill88() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Window Maximum Drill 88\n * Topic: queue | Pattern: monotonic deque\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction windowMaximumDrill88(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "windowMaximumDrill88",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 206,
    "originalId": "gen-089",
    "title": "Level Width Drill 89",
    "difficulty": "Medium",
    "category": "Trees",
    "topic": "Trees",
    "pattern": "BFS",
    "description": "Return the maximum number of nodes appearing at any depth. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the maximum number of nodes appearing at any depth. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Level Width Drill 89\n * Topic: tree | Pattern: BFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction levelWidthDrill89(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Level Width Drill 89\n# Topic: tree | Pattern: BFS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef levelWidthDrill89(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Level Width Drill 89\n// Topic: tree | Pattern: BFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object levelWidthDrill89(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Level Width Drill 89\n// Topic: tree | Pattern: BFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid levelWidthDrill89() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Level Width Drill 89\n * Topic: tree | Pattern: BFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction levelWidthDrill89(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "levelWidthDrill89",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 207,
    "originalId": "gen-090",
    "title": "Path Sum Count Drill 90",
    "difficulty": "Medium",
    "category": "Trees",
    "topic": "Trees",
    "pattern": "tree DFS",
    "description": "Count downward paths whose values sum to a target; a path may start at any node. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Count downward paths whose values sum to a target; a path may start at any node. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Path Sum Count Drill 90\n * Topic: tree | Pattern: tree DFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction pathSumCountDrill90(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Path Sum Count Drill 90\n# Topic: tree | Pattern: tree DFS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef pathSumCountDrill90(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Path Sum Count Drill 90\n// Topic: tree | Pattern: tree DFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object pathSumCountDrill90(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Path Sum Count Drill 90\n// Topic: tree | Pattern: tree DFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid pathSumCountDrill90() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Path Sum Count Drill 90\n * Topic: tree | Pattern: tree DFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction pathSumCountDrill90(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "pathSumCountDrill90",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 208,
    "originalId": "gen-091",
    "title": "Bipartite Check Drill 91",
    "difficulty": "Medium",
    "category": "Graphs",
    "topic": "Graphs",
    "pattern": "BFS coloring",
    "description": "Determine whether an undirected graph can be colored with two colors so every edge crosses colors. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether an undirected graph can be colored with two colors so every edge crosses colors. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Bipartite Check Drill 91\n * Topic: graph | Pattern: BFS coloring\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction bipartiteCheckDrill91(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Bipartite Check Drill 91\n# Topic: graph | Pattern: BFS coloring\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef bipartiteCheckDrill91(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Bipartite Check Drill 91\n// Topic: graph | Pattern: BFS coloring\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object bipartiteCheckDrill91(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Bipartite Check Drill 91\n// Topic: graph | Pattern: BFS coloring\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid bipartiteCheckDrill91() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Bipartite Check Drill 91\n * Topic: graph | Pattern: BFS coloring\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction bipartiteCheckDrill91(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "bipartiteCheckDrill91",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 209,
    "originalId": "gen-092",
    "title": "Minimum Spanning Cost Drill 92",
    "difficulty": "Medium",
    "category": "Graphs",
    "topic": "Graphs",
    "pattern": "Kruskal",
    "description": "Find the minimum cost needed to connect all vertices, or report impossible. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the minimum cost needed to connect all vertices, or report impossible. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Minimum Spanning Cost Drill 92\n * Topic: graph | Pattern: Kruskal\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction minimumSpanningCostDrill92(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Minimum Spanning Cost Drill 92\n# Topic: graph | Pattern: Kruskal\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef minimumSpanningCostDrill92(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Minimum Spanning Cost Drill 92\n// Topic: graph | Pattern: Kruskal\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object minimumSpanningCostDrill92(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Minimum Spanning Cost Drill 92\n// Topic: graph | Pattern: Kruskal\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid minimumSpanningCostDrill92() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Minimum Spanning Cost Drill 92\n * Topic: graph | Pattern: Kruskal\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction minimumSpanningCostDrill92(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "minimumSpanningCostDrill92",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 210,
    "originalId": "gen-093",
    "title": "Negative Route Detection Drill 93",
    "difficulty": "Hard",
    "category": "Graphs",
    "topic": "Graphs",
    "pattern": "Bellman-Ford",
    "description": "Determine whether a negative cycle is reachable from a given source. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether a negative cycle is reachable from a given source. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Negative Route Detection Drill 93\n * Topic: graph | Pattern: Bellman-Ford\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction negativeRouteDetectionDrill93(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Negative Route Detection Drill 93\n# Topic: graph | Pattern: Bellman-Ford\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef negativeRouteDetectionDrill93(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Negative Route Detection Drill 93\n// Topic: graph | Pattern: Bellman-Ford\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object negativeRouteDetectionDrill93(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Negative Route Detection Drill 93\n// Topic: graph | Pattern: Bellman-Ford\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid negativeRouteDetectionDrill93() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Negative Route Detection Drill 93\n * Topic: graph | Pattern: Bellman-Ford\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction negativeRouteDetectionDrill93(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "negativeRouteDetectionDrill93",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 211,
    "originalId": "gen-094",
    "title": "Increasing Sequence Drill 94",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "LIS",
    "description": "Return the length of the longest strictly increasing subsequence. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the length of the longest strictly increasing subsequence. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Increasing Sequence Drill 94\n * Topic: DP | Pattern: LIS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction increasingSequenceDrill94(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Increasing Sequence Drill 94\n# Topic: DP | Pattern: LIS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef increasingSequenceDrill94(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Increasing Sequence Drill 94\n// Topic: DP | Pattern: LIS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object increasingSequenceDrill94(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Increasing Sequence Drill 94\n// Topic: DP | Pattern: LIS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid increasingSequenceDrill94() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Increasing Sequence Drill 94\n * Topic: DP | Pattern: LIS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction increasingSequenceDrill94(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "increasingSequenceDrill94",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 212,
    "originalId": "gen-095",
    "title": "Common Sequence Drill 95",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "LCS",
    "description": "Return the length of the longest common subsequence of two strings. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the length of the longest common subsequence of two strings. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Common Sequence Drill 95\n * Topic: DP | Pattern: LCS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction commonSequenceDrill95(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Common Sequence Drill 95\n# Topic: DP | Pattern: LCS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef commonSequenceDrill95(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Common Sequence Drill 95\n// Topic: DP | Pattern: LCS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object commonSequenceDrill95(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Common Sequence Drill 95\n// Topic: DP | Pattern: LCS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid commonSequenceDrill95() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Common Sequence Drill 95\n * Topic: DP | Pattern: LCS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction commonSequenceDrill95(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "commonSequenceDrill95",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 213,
    "originalId": "gen-096",
    "title": "Grid Paths Drill 96",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "2D DP",
    "description": "Count paths from top-left to bottom-right moving only right and down around blocked cells. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Count paths from top-left to bottom-right moving only right and down around blocked cells. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Grid Paths Drill 96\n * Topic: DP | Pattern: 2D DP\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction gridPathsDrill96(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Grid Paths Drill 96\n# Topic: DP | Pattern: 2D DP\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef gridPathsDrill96(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Grid Paths Drill 96\n// Topic: DP | Pattern: 2D DP\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object gridPathsDrill96(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Grid Paths Drill 96\n// Topic: DP | Pattern: 2D DP\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid gridPathsDrill96() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Grid Paths Drill 96\n * Topic: DP | Pattern: 2D DP\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction gridPathsDrill96(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "gridPathsDrill96",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 214,
    "originalId": "gen-097",
    "title": "Partition Feasibility Drill 97",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "subset-sum",
    "description": "Determine whether an array can be partitioned into two subsets with equal sum. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether an array can be partitioned into two subsets with equal sum. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Partition Feasibility Drill 97\n * Topic: DP | Pattern: subset-sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction partitionFeasibilityDrill97(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Partition Feasibility Drill 97\n# Topic: DP | Pattern: subset-sum\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef partitionFeasibilityDrill97(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Partition Feasibility Drill 97\n// Topic: DP | Pattern: subset-sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object partitionFeasibilityDrill97(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Partition Feasibility Drill 97\n// Topic: DP | Pattern: subset-sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid partitionFeasibilityDrill97() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Partition Feasibility Drill 97\n * Topic: DP | Pattern: subset-sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction partitionFeasibilityDrill97(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "partitionFeasibilityDrill97",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 215,
    "originalId": "gen-098",
    "title": "Power Check Drill 98",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "topic": "Bit Manipulation",
    "pattern": "bit trick",
    "description": "Determine whether a positive integer is a power of two. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether a positive integer is a power of two. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Power Check Drill 98\n * Topic: bits | Pattern: bit trick\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction powerCheckDrill98(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Power Check Drill 98\n# Topic: bits | Pattern: bit trick\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef powerCheckDrill98(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Power Check Drill 98\n// Topic: bits | Pattern: bit trick\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object powerCheckDrill98(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Power Check Drill 98\n// Topic: bits | Pattern: bit trick\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid powerCheckDrill98() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Power Check Drill 98\n * Topic: bits | Pattern: bit trick\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction powerCheckDrill98(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "powerCheckDrill98",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 216,
    "originalId": "gen-099",
    "title": "Range Minimum Drill 99",
    "difficulty": "Hard",
    "category": "Range Queries",
    "topic": "Range Queries",
    "pattern": "segment tree",
    "description": "Support point updates and range minimum queries. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Support point updates and range minimum queries. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Range Minimum Drill 99\n * Topic: range | Pattern: segment tree\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction rangeMinimumDrill99(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Range Minimum Drill 99\n# Topic: range | Pattern: segment tree\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef rangeMinimumDrill99(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Range Minimum Drill 99\n// Topic: range | Pattern: segment tree\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object rangeMinimumDrill99(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Range Minimum Drill 99\n// Topic: range | Pattern: segment tree\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid rangeMinimumDrill99() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Range Minimum Drill 99\n * Topic: range | Pattern: segment tree\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction rangeMinimumDrill99(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "rangeMinimumDrill99",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 217,
    "originalId": "gen-100",
    "title": "Kth Selection Drill 100",
    "difficulty": "Hard",
    "category": "Advanced Patterns",
    "topic": "Advanced Patterns",
    "pattern": "quickselect",
    "description": "Find the kth smallest element without fully sorting the array. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the kth smallest element without fully sorting the array. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Kth Selection Drill 100\n * Topic: advanced | Pattern: quickselect\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction kthSelectionDrill100(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Kth Selection Drill 100\n# Topic: advanced | Pattern: quickselect\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef kthSelectionDrill100(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Kth Selection Drill 100\n// Topic: advanced | Pattern: quickselect\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object kthSelectionDrill100(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Kth Selection Drill 100\n// Topic: advanced | Pattern: quickselect\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid kthSelectionDrill100() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Kth Selection Drill 100\n * Topic: advanced | Pattern: quickselect\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction kthSelectionDrill100(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "kthSelectionDrill100",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 218,
    "originalId": "gen-101",
    "title": "Array Prefix Balance Drill 101",
    "difficulty": "Medium",
    "category": "Arrays",
    "topic": "Arrays",
    "pattern": "prefix sum",
    "description": "Find the first index where the sum of elements on the left equals the sum on the right. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the first index where the sum of elements on the left equals the sum on the right. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Array Prefix Balance Drill 101\n * Topic: array | Pattern: prefix sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction arrayPrefixBalanceDrill101(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Array Prefix Balance Drill 101\n# Topic: array | Pattern: prefix sum\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef arrayPrefixBalanceDrill101(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Array Prefix Balance Drill 101\n// Topic: array | Pattern: prefix sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object arrayPrefixBalanceDrill101(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Array Prefix Balance Drill 101\n// Topic: array | Pattern: prefix sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid arrayPrefixBalanceDrill101() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Array Prefix Balance Drill 101\n * Topic: array | Pattern: prefix sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction arrayPrefixBalanceDrill101(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "arrayPrefixBalanceDrill101",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 219,
    "originalId": "gen-102",
    "title": "Sorted Pair Distance Drill 102",
    "difficulty": "Medium",
    "category": "Arrays",
    "topic": "Arrays",
    "pattern": "two pointers",
    "description": "Given a sorted array and target D, find whether two distinct values differ by exactly D. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Given a sorted array and target D, find whether two distinct values differ by exactly D. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Sorted Pair Distance Drill 102\n * Topic: array | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedPairDistanceDrill102(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Sorted Pair Distance Drill 102\n# Topic: array | Pattern: two pointers\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef sortedPairDistanceDrill102(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Sorted Pair Distance Drill 102\n// Topic: array | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object sortedPairDistanceDrill102(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Sorted Pair Distance Drill 102\n// Topic: array | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid sortedPairDistanceDrill102() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Sorted Pair Distance Drill 102\n * Topic: array | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedPairDistanceDrill102(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "sortedPairDistanceDrill102",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 220,
    "originalId": "gen-103",
    "title": "Longest Positive Window Drill 103",
    "difficulty": "Medium",
    "category": "Arrays",
    "topic": "Arrays",
    "pattern": "sliding window",
    "description": "For a positive-integer array and K, find the longest contiguous subarray whose sum is at most K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "For a positive-integer array and K, find the longest contiguous subarray whose sum is at most K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Longest Positive Window Drill 103\n * Topic: array | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction longestPositiveWindowDrill103(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Longest Positive Window Drill 103\n# Topic: array | Pattern: sliding window\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef longestPositiveWindowDrill103(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Longest Positive Window Drill 103\n// Topic: array | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object longestPositiveWindowDrill103(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Longest Positive Window Drill 103\n// Topic: array | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid longestPositiveWindowDrill103() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Longest Positive Window Drill 103\n * Topic: array | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction longestPositiveWindowDrill103(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "longestPositiveWindowDrill103",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 221,
    "originalId": "gen-104",
    "title": "Anagram Window Drill 104",
    "difficulty": "Medium",
    "category": "Strings",
    "topic": "Strings",
    "pattern": "sliding window",
    "description": "Find whether a permutation of pattern occurs as a contiguous substring of text. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find whether a permutation of pattern occurs as a contiguous substring of text. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Anagram Window Drill 104\n * Topic: string | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction anagramWindowDrill104(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Anagram Window Drill 104\n# Topic: string | Pattern: sliding window\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef anagramWindowDrill104(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Anagram Window Drill 104\n// Topic: string | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object anagramWindowDrill104(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Anagram Window Drill 104\n// Topic: string | Pattern: sliding window\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid anagramWindowDrill104() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Anagram Window Drill 104\n * Topic: string | Pattern: sliding window\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction anagramWindowDrill104(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "anagramWindowDrill104",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 222,
    "originalId": "gen-105",
    "title": "Palindrome Radius Drill 105",
    "difficulty": "Easy",
    "category": "Strings",
    "topic": "Strings",
    "pattern": "two pointers",
    "description": "Check whether a string is a palindrome after ignoring non-alphanumeric characters and case. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Check whether a string is a palindrome after ignoring non-alphanumeric characters and case. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Palindrome Radius Drill 105\n * Topic: string | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction palindromeRadiusDrill105(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Palindrome Radius Drill 105\n# Topic: string | Pattern: two pointers\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef palindromeRadiusDrill105(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Palindrome Radius Drill 105\n// Topic: string | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object palindromeRadiusDrill105(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Palindrome Radius Drill 105\n// Topic: string | Pattern: two pointers\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid palindromeRadiusDrill105() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Palindrome Radius Drill 105\n * Topic: string | Pattern: two pointers\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction palindromeRadiusDrill105(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "palindromeRadiusDrill105",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 223,
    "originalId": "gen-106",
    "title": "Sorted Merge Drill 106",
    "difficulty": "Easy",
    "category": "Linked Lists",
    "topic": "Linked Lists",
    "pattern": "linked-list merge",
    "description": "Merge two sorted singly linked lists into one sorted list without allocating a node per input element. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Merge two sorted singly linked lists into one sorted list without allocating a node per input element. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Sorted Merge Drill 106\n * Topic: linked list | Pattern: linked-list merge\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedMergeDrill106(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Sorted Merge Drill 106\n# Topic: linked list | Pattern: linked-list merge\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef sortedMergeDrill106(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Sorted Merge Drill 106\n// Topic: linked list | Pattern: linked-list merge\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object sortedMergeDrill106(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Sorted Merge Drill 106\n// Topic: linked list | Pattern: linked-list merge\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid sortedMergeDrill106() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Sorted Merge Drill 106\n * Topic: linked list | Pattern: linked-list merge\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction sortedMergeDrill106(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "sortedMergeDrill106",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 224,
    "originalId": "gen-107",
    "title": "Histogram Area Drill 107",
    "difficulty": "Hard",
    "category": "Stacks",
    "topic": "Stacks",
    "pattern": "monotonic stack",
    "description": "Find the largest rectangle area in a histogram. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the largest rectangle area in a histogram. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Histogram Area Drill 107\n * Topic: stack | Pattern: monotonic stack\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction histogramAreaDrill107(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Histogram Area Drill 107\n# Topic: stack | Pattern: monotonic stack\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef histogramAreaDrill107(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Histogram Area Drill 107\n// Topic: stack | Pattern: monotonic stack\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object histogramAreaDrill107(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Histogram Area Drill 107\n// Topic: stack | Pattern: monotonic stack\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid histogramAreaDrill107() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Histogram Area Drill 107\n * Topic: stack | Pattern: monotonic stack\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction histogramAreaDrill107(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "histogramAreaDrill107",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 225,
    "originalId": "gen-108",
    "title": "Window Maximum Drill 108",
    "difficulty": "Hard",
    "category": "Queues",
    "topic": "Queues",
    "pattern": "monotonic deque",
    "description": "Return the maximum of every contiguous window of size K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the maximum of every contiguous window of size K. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Window Maximum Drill 108\n * Topic: queue | Pattern: monotonic deque\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction windowMaximumDrill108(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Window Maximum Drill 108\n# Topic: queue | Pattern: monotonic deque\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef windowMaximumDrill108(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Window Maximum Drill 108\n// Topic: queue | Pattern: monotonic deque\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object windowMaximumDrill108(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Window Maximum Drill 108\n// Topic: queue | Pattern: monotonic deque\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid windowMaximumDrill108() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Window Maximum Drill 108\n * Topic: queue | Pattern: monotonic deque\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction windowMaximumDrill108(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "windowMaximumDrill108",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 226,
    "originalId": "gen-109",
    "title": "Level Width Drill 109",
    "difficulty": "Medium",
    "category": "Trees",
    "topic": "Trees",
    "pattern": "BFS",
    "description": "Return the maximum number of nodes appearing at any depth. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the maximum number of nodes appearing at any depth. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Level Width Drill 109\n * Topic: tree | Pattern: BFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction levelWidthDrill109(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Level Width Drill 109\n# Topic: tree | Pattern: BFS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef levelWidthDrill109(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Level Width Drill 109\n// Topic: tree | Pattern: BFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object levelWidthDrill109(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Level Width Drill 109\n// Topic: tree | Pattern: BFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid levelWidthDrill109() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Level Width Drill 109\n * Topic: tree | Pattern: BFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction levelWidthDrill109(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "levelWidthDrill109",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 227,
    "originalId": "gen-110",
    "title": "Path Sum Count Drill 110",
    "difficulty": "Medium",
    "category": "Trees",
    "topic": "Trees",
    "pattern": "tree DFS",
    "description": "Count downward paths whose values sum to a target; a path may start at any node. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Count downward paths whose values sum to a target; a path may start at any node. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Path Sum Count Drill 110\n * Topic: tree | Pattern: tree DFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction pathSumCountDrill110(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Path Sum Count Drill 110\n# Topic: tree | Pattern: tree DFS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef pathSumCountDrill110(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Path Sum Count Drill 110\n// Topic: tree | Pattern: tree DFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object pathSumCountDrill110(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Path Sum Count Drill 110\n// Topic: tree | Pattern: tree DFS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid pathSumCountDrill110() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Path Sum Count Drill 110\n * Topic: tree | Pattern: tree DFS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction pathSumCountDrill110(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "pathSumCountDrill110",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 228,
    "originalId": "gen-111",
    "title": "Bipartite Check Drill 111",
    "difficulty": "Medium",
    "category": "Graphs",
    "topic": "Graphs",
    "pattern": "BFS coloring",
    "description": "Determine whether an undirected graph can be colored with two colors so every edge crosses colors. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether an undirected graph can be colored with two colors so every edge crosses colors. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Bipartite Check Drill 111\n * Topic: graph | Pattern: BFS coloring\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction bipartiteCheckDrill111(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Bipartite Check Drill 111\n# Topic: graph | Pattern: BFS coloring\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef bipartiteCheckDrill111(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Bipartite Check Drill 111\n// Topic: graph | Pattern: BFS coloring\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object bipartiteCheckDrill111(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Bipartite Check Drill 111\n// Topic: graph | Pattern: BFS coloring\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid bipartiteCheckDrill111() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Bipartite Check Drill 111\n * Topic: graph | Pattern: BFS coloring\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction bipartiteCheckDrill111(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "bipartiteCheckDrill111",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 229,
    "originalId": "gen-112",
    "title": "Minimum Spanning Cost Drill 112",
    "difficulty": "Medium",
    "category": "Graphs",
    "topic": "Graphs",
    "pattern": "Kruskal",
    "description": "Find the minimum cost needed to connect all vertices, or report impossible. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the minimum cost needed to connect all vertices, or report impossible. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Minimum Spanning Cost Drill 112\n * Topic: graph | Pattern: Kruskal\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction minimumSpanningCostDrill112(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Minimum Spanning Cost Drill 112\n# Topic: graph | Pattern: Kruskal\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef minimumSpanningCostDrill112(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Minimum Spanning Cost Drill 112\n// Topic: graph | Pattern: Kruskal\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object minimumSpanningCostDrill112(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Minimum Spanning Cost Drill 112\n// Topic: graph | Pattern: Kruskal\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid minimumSpanningCostDrill112() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Minimum Spanning Cost Drill 112\n * Topic: graph | Pattern: Kruskal\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction minimumSpanningCostDrill112(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "minimumSpanningCostDrill112",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 230,
    "originalId": "gen-113",
    "title": "Negative Route Detection Drill 113",
    "difficulty": "Hard",
    "category": "Graphs",
    "topic": "Graphs",
    "pattern": "Bellman-Ford",
    "description": "Determine whether a negative cycle is reachable from a given source. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether a negative cycle is reachable from a given source. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Negative Route Detection Drill 113\n * Topic: graph | Pattern: Bellman-Ford\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction negativeRouteDetectionDrill113(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Negative Route Detection Drill 113\n# Topic: graph | Pattern: Bellman-Ford\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef negativeRouteDetectionDrill113(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Negative Route Detection Drill 113\n// Topic: graph | Pattern: Bellman-Ford\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object negativeRouteDetectionDrill113(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Negative Route Detection Drill 113\n// Topic: graph | Pattern: Bellman-Ford\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid negativeRouteDetectionDrill113() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Negative Route Detection Drill 113\n * Topic: graph | Pattern: Bellman-Ford\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction negativeRouteDetectionDrill113(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "negativeRouteDetectionDrill113",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 231,
    "originalId": "gen-114",
    "title": "Increasing Sequence Drill 114",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "LIS",
    "description": "Return the length of the longest strictly increasing subsequence. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the length of the longest strictly increasing subsequence. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Increasing Sequence Drill 114\n * Topic: DP | Pattern: LIS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction increasingSequenceDrill114(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Increasing Sequence Drill 114\n# Topic: DP | Pattern: LIS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef increasingSequenceDrill114(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Increasing Sequence Drill 114\n// Topic: DP | Pattern: LIS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object increasingSequenceDrill114(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Increasing Sequence Drill 114\n// Topic: DP | Pattern: LIS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid increasingSequenceDrill114() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Increasing Sequence Drill 114\n * Topic: DP | Pattern: LIS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction increasingSequenceDrill114(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "increasingSequenceDrill114",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 232,
    "originalId": "gen-115",
    "title": "Common Sequence Drill 115",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "LCS",
    "description": "Return the length of the longest common subsequence of two strings. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Return the length of the longest common subsequence of two strings. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Common Sequence Drill 115\n * Topic: DP | Pattern: LCS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction commonSequenceDrill115(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Common Sequence Drill 115\n# Topic: DP | Pattern: LCS\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef commonSequenceDrill115(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Common Sequence Drill 115\n// Topic: DP | Pattern: LCS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object commonSequenceDrill115(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Common Sequence Drill 115\n// Topic: DP | Pattern: LCS\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid commonSequenceDrill115() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Common Sequence Drill 115\n * Topic: DP | Pattern: LCS\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction commonSequenceDrill115(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "commonSequenceDrill115",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 233,
    "originalId": "gen-116",
    "title": "Grid Paths Drill 116",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "2D DP",
    "description": "Count paths from top-left to bottom-right moving only right and down around blocked cells. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Count paths from top-left to bottom-right moving only right and down around blocked cells. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Grid Paths Drill 116\n * Topic: DP | Pattern: 2D DP\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction gridPathsDrill116(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Grid Paths Drill 116\n# Topic: DP | Pattern: 2D DP\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef gridPathsDrill116(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Grid Paths Drill 116\n// Topic: DP | Pattern: 2D DP\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object gridPathsDrill116(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Grid Paths Drill 116\n// Topic: DP | Pattern: 2D DP\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid gridPathsDrill116() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Grid Paths Drill 116\n * Topic: DP | Pattern: 2D DP\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction gridPathsDrill116(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "gridPathsDrill116",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 234,
    "originalId": "gen-117",
    "title": "Partition Feasibility Drill 117",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topic": "Dynamic Programming",
    "pattern": "subset-sum",
    "description": "Determine whether an array can be partitioned into two subsets with equal sum. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether an array can be partitioned into two subsets with equal sum. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Partition Feasibility Drill 117\n * Topic: DP | Pattern: subset-sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction partitionFeasibilityDrill117(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Partition Feasibility Drill 117\n# Topic: DP | Pattern: subset-sum\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef partitionFeasibilityDrill117(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Partition Feasibility Drill 117\n// Topic: DP | Pattern: subset-sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object partitionFeasibilityDrill117(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Partition Feasibility Drill 117\n// Topic: DP | Pattern: subset-sum\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid partitionFeasibilityDrill117() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Partition Feasibility Drill 117\n * Topic: DP | Pattern: subset-sum\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction partitionFeasibilityDrill117(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "partitionFeasibilityDrill117",
    "benchmarkMins": 25,
    "isDsaProblem": true
  },
  {
    "id": 235,
    "originalId": "gen-118",
    "title": "Power Check Drill 118",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "topic": "Bit Manipulation",
    "pattern": "bit trick",
    "description": "Determine whether a positive integer is a power of two. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Determine whether a positive integer is a power of two. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Power Check Drill 118\n * Topic: bits | Pattern: bit trick\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction powerCheckDrill118(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Power Check Drill 118\n# Topic: bits | Pattern: bit trick\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef powerCheckDrill118(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Power Check Drill 118\n// Topic: bits | Pattern: bit trick\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object powerCheckDrill118(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Power Check Drill 118\n// Topic: bits | Pattern: bit trick\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid powerCheckDrill118() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Power Check Drill 118\n * Topic: bits | Pattern: bit trick\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction powerCheckDrill118(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "powerCheckDrill118",
    "benchmarkMins": 15,
    "isDsaProblem": true
  },
  {
    "id": 236,
    "originalId": "gen-119",
    "title": "Range Minimum Drill 119",
    "difficulty": "Hard",
    "category": "Range Queries",
    "topic": "Range Queries",
    "pattern": "segment tree",
    "description": "Support point updates and range minimum queries. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Support point updates and range minimum queries. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Range Minimum Drill 119\n * Topic: range | Pattern: segment tree\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction rangeMinimumDrill119(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Range Minimum Drill 119\n# Topic: range | Pattern: segment tree\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef rangeMinimumDrill119(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Range Minimum Drill 119\n// Topic: range | Pattern: segment tree\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object rangeMinimumDrill119(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Range Minimum Drill 119\n// Topic: range | Pattern: segment tree\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid rangeMinimumDrill119() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Range Minimum Drill 119\n * Topic: range | Pattern: segment tree\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction rangeMinimumDrill119(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "rangeMinimumDrill119",
    "benchmarkMins": 45,
    "isDsaProblem": true
  },
  {
    "id": 237,
    "originalId": "gen-120",
    "title": "Kth Selection Drill 120",
    "difficulty": "Hard",
    "category": "Advanced Patterns",
    "topic": "Advanced Patterns",
    "pattern": "quickselect",
    "description": "Find the kth smallest element without fully sorting the array. Create a solution that is correct for boundary cases and explain the invariant used.",
    "statement": "Find the kth smallest element without fully sorting the array. Create a solution that is correct for boundary cases and explain the invariant used.",
    "constraints": [
      "Use realistic competitive-programming constraints; choose 64-bit arithmetic when sums can overflow."
    ],
    "examples": [],
    "hints": [
      "Start with the brute-force interpretation.",
      "Identify the invariant or pattern that removes repeated work.",
      "Check the edge cases before coding."
    ],
    "hint": "Start with the brute-force interpretation.",
    "expected_approach": "Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.",
    "target_complexity": "Prefer the optimal standard complexity for the pattern.",
    "edge_cases": [
      "empty input where permitted",
      "single element",
      "duplicate values",
      "minimum and maximum constraints"
    ],
    "starterCodes": {
      "javascript": "/**\n * Kth Selection Drill 120\n * Topic: advanced | Pattern: quickselect\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction kthSelectionDrill120(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
      "python": "# Kth Selection Drill 120\n# Topic: advanced | Pattern: quickselect\n# Target Complexity: Prefer the optimal standard complexity for the pattern.\n\ndef kthSelectionDrill120(input):\n    # TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n    pass\n",
      "java": "// Kth Selection Drill 120\n// Topic: advanced | Pattern: quickselect\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\nclass Solution {\n    public static Object kthSelectionDrill120(Object input) {\n        // TODO: Implement solution\n        return null;\n    }\n}\n",
      "cpp": "// Kth Selection Drill 120\n// Topic: advanced | Pattern: quickselect\n// Target Complexity: Prefer the optimal standard complexity for the pattern.\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid kthSelectionDrill120() {\n    // TODO: Implement solution\n}\n"
    },
    "starterCode": "/**\n * Kth Selection Drill 120\n * Topic: advanced | Pattern: quickselect\n * Target Complexity: Prefer the optimal standard complexity for the pattern.\n */\nfunction kthSelectionDrill120(input) {\n  // TODO: Implement Derive the solution from the named pattern, but justify why the pattern’s assumptions hold.\n  \n}\n",
    "functionName": "kthSelectionDrill120",
    "benchmarkMins": 45,
    "isDsaProblem": true
  }
];

export const DSA_QUIZZES = [
  {
    "id": "q-001",
    "topic": "Complexity",
    "difficulty": "Easy",
    "question": "Which bound describes an algorithm whose work doubles when n doubles only up to a constant factor?",
    "options": [
      "A) O(1)",
      "B) O(log n)",
      "C) O(n)",
      "D) O(n^2)"
    ],
    "correct_answer": "C",
    "correctIndex": 2,
    "explanation": "If work grows proportionally with input size, the asymptotic bound is linear.",
    "skill": "conceptual",
    "source": "original_quiz"
  },
  {
    "id": "q-002",
    "topic": "Arrays",
    "difficulty": "Easy",
    "question": "Why is random access A[i] typically O(1) in a contiguous array?",
    "options": [
      "A) Values are sorted",
      "B) Address is computed from base + offset",
      "C) A hash table is used",
      "D) Binary search is performed"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "The address can be computed directly from the base address, index and element size.",
    "skill": "conceptual",
    "source": "original_quiz"
  },
  {
    "id": "q-003",
    "topic": "Hashing",
    "difficulty": "Medium",
    "question": "Which statement is safest about hash-table lookup?",
    "options": [
      "A) Always O(1)",
      "B) Worst-case O(1)",
      "C) Expected O(1) under suitable assumptions, worst-case can be O(n)",
      "D) Always O(log n)"
    ],
    "correct_answer": "C",
    "correctIndex": 2,
    "explanation": "Collisions and adversarial inputs can cause linear worst-case behavior.",
    "skill": "conceptual",
    "source": "original_quiz"
  },
  {
    "id": "q-004",
    "topic": "Binary Search",
    "difficulty": "Easy",
    "question": "What is the key property required by ordinary binary search?",
    "options": [
      "A) Values are distinct",
      "B) Search space is ordered/monotonic",
      "C) Values are positive",
      "D) Array length is a power of two"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Binary search relies on eliminating a half of the search space based on an ordering or monotonic predicate.",
    "skill": "conceptual",
    "source": "original_quiz"
  },
  {
    "id": "q-005",
    "topic": "Stacks",
    "difficulty": "Easy",
    "question": "Which structure naturally models nested parentheses?",
    "options": [
      "A) Queue",
      "B) Stack",
      "C) Heap",
      "D) DSU"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "The most recently opened delimiter must be matched first, which is LIFO behavior.",
    "skill": "conceptual",
    "source": "original_quiz"
  },
  {
    "id": "q-006",
    "topic": "BFS",
    "difficulty": "Medium",
    "question": "Why does BFS find minimum edge-count paths in an unweighted graph?",
    "options": [
      "A) It sorts edges",
      "B) It explores vertices by nondecreasing distance from the source",
      "C) It uses a heap",
      "D) It checks every possible path"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Queue order causes all vertices at distance d to be processed before vertices at distance d+1.",
    "skill": "conceptual",
    "source": "original_quiz"
  },
  {
    "id": "q-007",
    "topic": "Dijkstra",
    "difficulty": "Medium",
    "question": "Which edge-weight condition is required for standard Dijkstra correctness?",
    "options": [
      "A) All weights are negative",
      "B) All weights are non-negative",
      "C) Graph must be acyclic",
      "D) All weights must be equal"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "A negative edge can improve a vertex after it has been finalized, breaking the greedy proof.",
    "skill": "conceptual",
    "source": "original_quiz"
  },
  {
    "id": "q-008",
    "topic": "DP",
    "difficulty": "Medium",
    "question": "What makes a DP state useful?",
    "options": [
      "A) It stores every input detail",
      "B) It contains enough information to determine future decisions and transitions",
      "C) It is always one-dimensional",
      "D) It avoids all recursion"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "A sufficient state summarizes exactly the information needed to solve remaining subproblems.",
    "skill": "conceptual",
    "source": "original_quiz"
  },
  {
    "id": "q-009",
    "topic": "MST",
    "difficulty": "Medium",
    "question": "Kruskal adds an edge when...",
    "options": [
      "A) it has the largest weight",
      "B) it connects two different DSU components",
      "C) it forms a cycle",
      "D) it is incident to the root"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Adding an edge between distinct components preserves acyclicity and grows the forest.",
    "skill": "conceptual",
    "source": "original_quiz"
  },
  {
    "id": "q-010",
    "topic": "Fenwick Tree",
    "difficulty": "Medium",
    "question": "What is the standard time for a Fenwick point update?",
    "options": [
      "A) O(1)",
      "B) O(log n)",
      "C) O(n)",
      "D) O(n log n)"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Each update jumps through O(log n) binary-indexed ancestors.",
    "skill": "conceptual",
    "source": "original_quiz"
  },
  {
    "id": "q-011",
    "topic": "Segment Tree",
    "difficulty": "Advanced",
    "question": "Why does a standard segment-tree query visit only O(log n) nodes in many range-query settings?",
    "options": [
      "A) It sorts the array",
      "B) The query interval decomposes into a logarithmic number of canonical segments at each boundary",
      "C) It stores all answers",
      "D) It uses hashing"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "The recursive interval decomposition follows only boundary paths plus fully covered segments.",
    "skill": "conceptual",
    "source": "original_quiz"
  },
  {
    "id": "q-012",
    "topic": "Bit Manipulation",
    "difficulty": "Easy",
    "question": "What does x & (x-1) do for a positive integer?",
    "options": [
      "A) Sets every bit",
      "B) Clears the lowest set bit",
      "C) Doubles x",
      "D) Divides x by 2"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Subtracting one flips the lowest set bit and lower zeros; AND removes that lowest set bit.",
    "skill": "conceptual",
    "source": "original_quiz"
  },
  {
    "id": "q-013",
    "topic": "Sorting",
    "difficulty": "Easy",
    "question": "Which listed sort is stable in its standard implementation?",
    "options": [
      "A) Selection sort",
      "B) Insertion sort",
      "C) Heapsort",
      "D) Typical in-place quicksort"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Insertion sort preserves the relative order of equal keys when implemented with strict greater-than shifts.",
    "skill": "conceptual",
    "source": "original_quiz"
  },
  {
    "id": "q-014",
    "topic": "Trees",
    "difficulty": "Easy",
    "question": "What does inorder traversal of a valid BST produce under a strict ordering policy?",
    "options": [
      "A) Heap order",
      "B) Sorted order",
      "C) Reverse level order",
      "D) Random order"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Inorder visits left subtree, node, then right subtree, which follows BST ordering.",
    "skill": "conceptual",
    "source": "original_quiz"
  },
  {
    "id": "q-015",
    "topic": "Trie",
    "difficulty": "Medium",
    "question": "What is the typical time to search a word of length L in a trie?",
    "options": [
      "A) O(1) regardless of L",
      "B) O(log L)",
      "C) O(L) assuming constant-time child access",
      "D) O(nL)"
    ],
    "correct_answer": "C",
    "correctIndex": 2,
    "explanation": "One trie edge is followed per character.",
    "skill": "conceptual",
    "source": "original_quiz"
  },
  {
    "id": "q-016",
    "topic": "Tries",
    "difficulty": "Medium",
    "question": "Concept check 16: In Tries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-017",
    "topic": "Range Queries",
    "difficulty": "Hard",
    "question": "Concept check 17: In Range Queries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-018",
    "topic": "Bit Manipulation",
    "difficulty": "Easy",
    "question": "Concept check 18: In Bit Manipulation, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-019",
    "topic": "Advanced Patterns",
    "difficulty": "Medium",
    "question": "Concept check 19: In Advanced Patterns, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-020",
    "topic": "Arrays",
    "difficulty": "Hard",
    "question": "Concept check 20: In Arrays, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-021",
    "topic": "Strings",
    "difficulty": "Easy",
    "question": "Concept check 21: In Strings, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-022",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "question": "Concept check 22: In Linked Lists, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-023",
    "topic": "Stacks",
    "difficulty": "Hard",
    "question": "Concept check 23: In Stacks, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-024",
    "topic": "Queues",
    "difficulty": "Easy",
    "question": "Concept check 24: In Queues, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-025",
    "topic": "Hashing",
    "difficulty": "Medium",
    "question": "Concept check 25: In Hashing, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-026",
    "topic": "Sorting",
    "difficulty": "Hard",
    "question": "Concept check 26: In Sorting, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-027",
    "topic": "Searching",
    "difficulty": "Easy",
    "question": "Concept check 27: In Searching, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-028",
    "topic": "Trees",
    "difficulty": "Medium",
    "question": "Concept check 28: In Trees, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-029",
    "topic": "BST",
    "difficulty": "Hard",
    "question": "Concept check 29: In BST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-030",
    "topic": "Heaps",
    "difficulty": "Easy",
    "question": "Concept check 30: In Heaps, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-031",
    "topic": "Graphs",
    "difficulty": "Medium",
    "question": "Concept check 31: In Graphs, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-032",
    "topic": "Shortest Paths",
    "difficulty": "Hard",
    "question": "Concept check 32: In Shortest Paths, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-033",
    "topic": "MST",
    "difficulty": "Easy",
    "question": "Concept check 33: In MST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-034",
    "topic": "Greedy",
    "difficulty": "Medium",
    "question": "Concept check 34: In Greedy, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-035",
    "topic": "DP",
    "difficulty": "Hard",
    "question": "Concept check 35: In DP, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-036",
    "topic": "Tries",
    "difficulty": "Easy",
    "question": "Concept check 36: In Tries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-037",
    "topic": "Range Queries",
    "difficulty": "Medium",
    "question": "Concept check 37: In Range Queries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-038",
    "topic": "Bit Manipulation",
    "difficulty": "Hard",
    "question": "Concept check 38: In Bit Manipulation, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-039",
    "topic": "Advanced Patterns",
    "difficulty": "Easy",
    "question": "Concept check 39: In Advanced Patterns, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-040",
    "topic": "Arrays",
    "difficulty": "Medium",
    "question": "Concept check 40: In Arrays, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-041",
    "topic": "Strings",
    "difficulty": "Hard",
    "question": "Concept check 41: In Strings, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-042",
    "topic": "Linked Lists",
    "difficulty": "Easy",
    "question": "Concept check 42: In Linked Lists, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-043",
    "topic": "Stacks",
    "difficulty": "Medium",
    "question": "Concept check 43: In Stacks, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-044",
    "topic": "Queues",
    "difficulty": "Hard",
    "question": "Concept check 44: In Queues, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-045",
    "topic": "Hashing",
    "difficulty": "Easy",
    "question": "Concept check 45: In Hashing, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-046",
    "topic": "Sorting",
    "difficulty": "Medium",
    "question": "Concept check 46: In Sorting, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-047",
    "topic": "Searching",
    "difficulty": "Hard",
    "question": "Concept check 47: In Searching, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-048",
    "topic": "Trees",
    "difficulty": "Easy",
    "question": "Concept check 48: In Trees, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-049",
    "topic": "BST",
    "difficulty": "Medium",
    "question": "Concept check 49: In BST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-050",
    "topic": "Heaps",
    "difficulty": "Hard",
    "question": "Concept check 50: In Heaps, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-051",
    "topic": "Graphs",
    "difficulty": "Easy",
    "question": "Concept check 51: In Graphs, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-052",
    "topic": "Shortest Paths",
    "difficulty": "Medium",
    "question": "Concept check 52: In Shortest Paths, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-053",
    "topic": "MST",
    "difficulty": "Hard",
    "question": "Concept check 53: In MST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-054",
    "topic": "Greedy",
    "difficulty": "Easy",
    "question": "Concept check 54: In Greedy, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-055",
    "topic": "DP",
    "difficulty": "Medium",
    "question": "Concept check 55: In DP, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-056",
    "topic": "Tries",
    "difficulty": "Hard",
    "question": "Concept check 56: In Tries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-057",
    "topic": "Range Queries",
    "difficulty": "Easy",
    "question": "Concept check 57: In Range Queries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-058",
    "topic": "Bit Manipulation",
    "difficulty": "Medium",
    "question": "Concept check 58: In Bit Manipulation, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-059",
    "topic": "Advanced Patterns",
    "difficulty": "Hard",
    "question": "Concept check 59: In Advanced Patterns, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-060",
    "topic": "Arrays",
    "difficulty": "Easy",
    "question": "Concept check 60: In Arrays, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-061",
    "topic": "Strings",
    "difficulty": "Medium",
    "question": "Concept check 61: In Strings, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-062",
    "topic": "Linked Lists",
    "difficulty": "Hard",
    "question": "Concept check 62: In Linked Lists, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-063",
    "topic": "Stacks",
    "difficulty": "Easy",
    "question": "Concept check 63: In Stacks, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-064",
    "topic": "Queues",
    "difficulty": "Medium",
    "question": "Concept check 64: In Queues, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-065",
    "topic": "Hashing",
    "difficulty": "Hard",
    "question": "Concept check 65: In Hashing, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-066",
    "topic": "Sorting",
    "difficulty": "Easy",
    "question": "Concept check 66: In Sorting, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-067",
    "topic": "Searching",
    "difficulty": "Medium",
    "question": "Concept check 67: In Searching, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-068",
    "topic": "Trees",
    "difficulty": "Hard",
    "question": "Concept check 68: In Trees, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-069",
    "topic": "BST",
    "difficulty": "Easy",
    "question": "Concept check 69: In BST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-070",
    "topic": "Heaps",
    "difficulty": "Medium",
    "question": "Concept check 70: In Heaps, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-071",
    "topic": "Graphs",
    "difficulty": "Hard",
    "question": "Concept check 71: In Graphs, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-072",
    "topic": "Shortest Paths",
    "difficulty": "Easy",
    "question": "Concept check 72: In Shortest Paths, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-073",
    "topic": "MST",
    "difficulty": "Medium",
    "question": "Concept check 73: In MST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-074",
    "topic": "Greedy",
    "difficulty": "Hard",
    "question": "Concept check 74: In Greedy, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-075",
    "topic": "DP",
    "difficulty": "Easy",
    "question": "Concept check 75: In DP, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-076",
    "topic": "Tries",
    "difficulty": "Medium",
    "question": "Concept check 76: In Tries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-077",
    "topic": "Range Queries",
    "difficulty": "Hard",
    "question": "Concept check 77: In Range Queries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-078",
    "topic": "Bit Manipulation",
    "difficulty": "Easy",
    "question": "Concept check 78: In Bit Manipulation, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-079",
    "topic": "Advanced Patterns",
    "difficulty": "Medium",
    "question": "Concept check 79: In Advanced Patterns, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-080",
    "topic": "Arrays",
    "difficulty": "Hard",
    "question": "Concept check 80: In Arrays, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-081",
    "topic": "Strings",
    "difficulty": "Easy",
    "question": "Concept check 81: In Strings, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-082",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "question": "Concept check 82: In Linked Lists, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-083",
    "topic": "Stacks",
    "difficulty": "Hard",
    "question": "Concept check 83: In Stacks, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-084",
    "topic": "Queues",
    "difficulty": "Easy",
    "question": "Concept check 84: In Queues, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-085",
    "topic": "Hashing",
    "difficulty": "Medium",
    "question": "Concept check 85: In Hashing, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-086",
    "topic": "Sorting",
    "difficulty": "Hard",
    "question": "Concept check 86: In Sorting, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-087",
    "topic": "Searching",
    "difficulty": "Easy",
    "question": "Concept check 87: In Searching, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-088",
    "topic": "Trees",
    "difficulty": "Medium",
    "question": "Concept check 88: In Trees, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-089",
    "topic": "BST",
    "difficulty": "Hard",
    "question": "Concept check 89: In BST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-090",
    "topic": "Heaps",
    "difficulty": "Easy",
    "question": "Concept check 90: In Heaps, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-091",
    "topic": "Graphs",
    "difficulty": "Medium",
    "question": "Concept check 91: In Graphs, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-092",
    "topic": "Shortest Paths",
    "difficulty": "Hard",
    "question": "Concept check 92: In Shortest Paths, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-093",
    "topic": "MST",
    "difficulty": "Easy",
    "question": "Concept check 93: In MST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-094",
    "topic": "Greedy",
    "difficulty": "Medium",
    "question": "Concept check 94: In Greedy, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-095",
    "topic": "DP",
    "difficulty": "Hard",
    "question": "Concept check 95: In DP, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-096",
    "topic": "Tries",
    "difficulty": "Easy",
    "question": "Concept check 96: In Tries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-097",
    "topic": "Range Queries",
    "difficulty": "Medium",
    "question": "Concept check 97: In Range Queries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-098",
    "topic": "Bit Manipulation",
    "difficulty": "Hard",
    "question": "Concept check 98: In Bit Manipulation, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-099",
    "topic": "Advanced Patterns",
    "difficulty": "Easy",
    "question": "Concept check 99: In Advanced Patterns, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-100",
    "topic": "Arrays",
    "difficulty": "Medium",
    "question": "Concept check 100: In Arrays, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-101",
    "topic": "Strings",
    "difficulty": "Hard",
    "question": "Concept check 101: In Strings, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-102",
    "topic": "Linked Lists",
    "difficulty": "Easy",
    "question": "Concept check 102: In Linked Lists, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-103",
    "topic": "Stacks",
    "difficulty": "Medium",
    "question": "Concept check 103: In Stacks, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-104",
    "topic": "Queues",
    "difficulty": "Hard",
    "question": "Concept check 104: In Queues, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-105",
    "topic": "Hashing",
    "difficulty": "Easy",
    "question": "Concept check 105: In Hashing, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-106",
    "topic": "Sorting",
    "difficulty": "Medium",
    "question": "Concept check 106: In Sorting, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-107",
    "topic": "Searching",
    "difficulty": "Hard",
    "question": "Concept check 107: In Searching, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-108",
    "topic": "Trees",
    "difficulty": "Easy",
    "question": "Concept check 108: In Trees, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-109",
    "topic": "BST",
    "difficulty": "Medium",
    "question": "Concept check 109: In BST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-110",
    "topic": "Heaps",
    "difficulty": "Hard",
    "question": "Concept check 110: In Heaps, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-111",
    "topic": "Graphs",
    "difficulty": "Easy",
    "question": "Concept check 111: In Graphs, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-112",
    "topic": "Shortest Paths",
    "difficulty": "Medium",
    "question": "Concept check 112: In Shortest Paths, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-113",
    "topic": "MST",
    "difficulty": "Hard",
    "question": "Concept check 113: In MST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-114",
    "topic": "Greedy",
    "difficulty": "Easy",
    "question": "Concept check 114: In Greedy, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-115",
    "topic": "DP",
    "difficulty": "Medium",
    "question": "Concept check 115: In DP, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-116",
    "topic": "Tries",
    "difficulty": "Hard",
    "question": "Concept check 116: In Tries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-117",
    "topic": "Range Queries",
    "difficulty": "Easy",
    "question": "Concept check 117: In Range Queries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-118",
    "topic": "Bit Manipulation",
    "difficulty": "Medium",
    "question": "Concept check 118: In Bit Manipulation, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-119",
    "topic": "Advanced Patterns",
    "difficulty": "Hard",
    "question": "Concept check 119: In Advanced Patterns, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-120",
    "topic": "Arrays",
    "difficulty": "Easy",
    "question": "Concept check 120: In Arrays, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-121",
    "topic": "Strings",
    "difficulty": "Medium",
    "question": "Concept check 121: In Strings, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-122",
    "topic": "Linked Lists",
    "difficulty": "Hard",
    "question": "Concept check 122: In Linked Lists, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-123",
    "topic": "Stacks",
    "difficulty": "Easy",
    "question": "Concept check 123: In Stacks, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-124",
    "topic": "Queues",
    "difficulty": "Medium",
    "question": "Concept check 124: In Queues, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-125",
    "topic": "Hashing",
    "difficulty": "Hard",
    "question": "Concept check 125: In Hashing, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-126",
    "topic": "Sorting",
    "difficulty": "Easy",
    "question": "Concept check 126: In Sorting, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-127",
    "topic": "Searching",
    "difficulty": "Medium",
    "question": "Concept check 127: In Searching, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-128",
    "topic": "Trees",
    "difficulty": "Hard",
    "question": "Concept check 128: In Trees, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-129",
    "topic": "BST",
    "difficulty": "Easy",
    "question": "Concept check 129: In BST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-130",
    "topic": "Heaps",
    "difficulty": "Medium",
    "question": "Concept check 130: In Heaps, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-131",
    "topic": "Graphs",
    "difficulty": "Hard",
    "question": "Concept check 131: In Graphs, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-132",
    "topic": "Shortest Paths",
    "difficulty": "Easy",
    "question": "Concept check 132: In Shortest Paths, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-133",
    "topic": "MST",
    "difficulty": "Medium",
    "question": "Concept check 133: In MST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-134",
    "topic": "Greedy",
    "difficulty": "Hard",
    "question": "Concept check 134: In Greedy, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-135",
    "topic": "DP",
    "difficulty": "Easy",
    "question": "Concept check 135: In DP, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-136",
    "topic": "Tries",
    "difficulty": "Medium",
    "question": "Concept check 136: In Tries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-137",
    "topic": "Range Queries",
    "difficulty": "Hard",
    "question": "Concept check 137: In Range Queries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-138",
    "topic": "Bit Manipulation",
    "difficulty": "Easy",
    "question": "Concept check 138: In Bit Manipulation, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-139",
    "topic": "Advanced Patterns",
    "difficulty": "Medium",
    "question": "Concept check 139: In Advanced Patterns, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-140",
    "topic": "Arrays",
    "difficulty": "Hard",
    "question": "Concept check 140: In Arrays, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-141",
    "topic": "Strings",
    "difficulty": "Easy",
    "question": "Concept check 141: In Strings, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-142",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "question": "Concept check 142: In Linked Lists, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-143",
    "topic": "Stacks",
    "difficulty": "Hard",
    "question": "Concept check 143: In Stacks, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-144",
    "topic": "Queues",
    "difficulty": "Easy",
    "question": "Concept check 144: In Queues, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-145",
    "topic": "Hashing",
    "difficulty": "Medium",
    "question": "Concept check 145: In Hashing, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-146",
    "topic": "Sorting",
    "difficulty": "Hard",
    "question": "Concept check 146: In Sorting, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-147",
    "topic": "Searching",
    "difficulty": "Easy",
    "question": "Concept check 147: In Searching, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-148",
    "topic": "Trees",
    "difficulty": "Medium",
    "question": "Concept check 148: In Trees, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-149",
    "topic": "BST",
    "difficulty": "Hard",
    "question": "Concept check 149: In BST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-150",
    "topic": "Heaps",
    "difficulty": "Easy",
    "question": "Concept check 150: In Heaps, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-151",
    "topic": "Graphs",
    "difficulty": "Medium",
    "question": "Concept check 151: In Graphs, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-152",
    "topic": "Shortest Paths",
    "difficulty": "Hard",
    "question": "Concept check 152: In Shortest Paths, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-153",
    "topic": "MST",
    "difficulty": "Easy",
    "question": "Concept check 153: In MST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-154",
    "topic": "Greedy",
    "difficulty": "Medium",
    "question": "Concept check 154: In Greedy, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-155",
    "topic": "DP",
    "difficulty": "Hard",
    "question": "Concept check 155: In DP, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-156",
    "topic": "Tries",
    "difficulty": "Easy",
    "question": "Concept check 156: In Tries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-157",
    "topic": "Range Queries",
    "difficulty": "Medium",
    "question": "Concept check 157: In Range Queries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-158",
    "topic": "Bit Manipulation",
    "difficulty": "Hard",
    "question": "Concept check 158: In Bit Manipulation, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-159",
    "topic": "Advanced Patterns",
    "difficulty": "Easy",
    "question": "Concept check 159: In Advanced Patterns, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-160",
    "topic": "Arrays",
    "difficulty": "Medium",
    "question": "Concept check 160: In Arrays, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-161",
    "topic": "Strings",
    "difficulty": "Hard",
    "question": "Concept check 161: In Strings, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-162",
    "topic": "Linked Lists",
    "difficulty": "Easy",
    "question": "Concept check 162: In Linked Lists, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-163",
    "topic": "Stacks",
    "difficulty": "Medium",
    "question": "Concept check 163: In Stacks, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-164",
    "topic": "Queues",
    "difficulty": "Hard",
    "question": "Concept check 164: In Queues, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-165",
    "topic": "Hashing",
    "difficulty": "Easy",
    "question": "Concept check 165: In Hashing, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-166",
    "topic": "Sorting",
    "difficulty": "Medium",
    "question": "Concept check 166: In Sorting, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-167",
    "topic": "Searching",
    "difficulty": "Hard",
    "question": "Concept check 167: In Searching, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-168",
    "topic": "Trees",
    "difficulty": "Easy",
    "question": "Concept check 168: In Trees, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-169",
    "topic": "BST",
    "difficulty": "Medium",
    "question": "Concept check 169: In BST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-170",
    "topic": "Heaps",
    "difficulty": "Hard",
    "question": "Concept check 170: In Heaps, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-171",
    "topic": "Graphs",
    "difficulty": "Easy",
    "question": "Concept check 171: In Graphs, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-172",
    "topic": "Shortest Paths",
    "difficulty": "Medium",
    "question": "Concept check 172: In Shortest Paths, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-173",
    "topic": "MST",
    "difficulty": "Hard",
    "question": "Concept check 173: In MST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-174",
    "topic": "Greedy",
    "difficulty": "Easy",
    "question": "Concept check 174: In Greedy, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-175",
    "topic": "DP",
    "difficulty": "Medium",
    "question": "Concept check 175: In DP, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-176",
    "topic": "Tries",
    "difficulty": "Hard",
    "question": "Concept check 176: In Tries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-177",
    "topic": "Range Queries",
    "difficulty": "Easy",
    "question": "Concept check 177: In Range Queries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-178",
    "topic": "Bit Manipulation",
    "difficulty": "Medium",
    "question": "Concept check 178: In Bit Manipulation, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-179",
    "topic": "Advanced Patterns",
    "difficulty": "Hard",
    "question": "Concept check 179: In Advanced Patterns, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-180",
    "topic": "Arrays",
    "difficulty": "Easy",
    "question": "Concept check 180: In Arrays, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-181",
    "topic": "Strings",
    "difficulty": "Medium",
    "question": "Concept check 181: In Strings, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-182",
    "topic": "Linked Lists",
    "difficulty": "Hard",
    "question": "Concept check 182: In Linked Lists, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-183",
    "topic": "Stacks",
    "difficulty": "Easy",
    "question": "Concept check 183: In Stacks, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-184",
    "topic": "Queues",
    "difficulty": "Medium",
    "question": "Concept check 184: In Queues, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-185",
    "topic": "Hashing",
    "difficulty": "Hard",
    "question": "Concept check 185: In Hashing, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-186",
    "topic": "Sorting",
    "difficulty": "Easy",
    "question": "Concept check 186: In Sorting, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-187",
    "topic": "Searching",
    "difficulty": "Medium",
    "question": "Concept check 187: In Searching, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-188",
    "topic": "Trees",
    "difficulty": "Hard",
    "question": "Concept check 188: In Trees, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-189",
    "topic": "BST",
    "difficulty": "Easy",
    "question": "Concept check 189: In BST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-190",
    "topic": "Heaps",
    "difficulty": "Medium",
    "question": "Concept check 190: In Heaps, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-191",
    "topic": "Graphs",
    "difficulty": "Hard",
    "question": "Concept check 191: In Graphs, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-192",
    "topic": "Shortest Paths",
    "difficulty": "Easy",
    "question": "Concept check 192: In Shortest Paths, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-193",
    "topic": "MST",
    "difficulty": "Medium",
    "question": "Concept check 193: In MST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-194",
    "topic": "Greedy",
    "difficulty": "Hard",
    "question": "Concept check 194: In Greedy, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-195",
    "topic": "DP",
    "difficulty": "Easy",
    "question": "Concept check 195: In DP, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-196",
    "topic": "Tries",
    "difficulty": "Medium",
    "question": "Concept check 196: In Tries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-197",
    "topic": "Range Queries",
    "difficulty": "Hard",
    "question": "Concept check 197: In Range Queries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-198",
    "topic": "Bit Manipulation",
    "difficulty": "Easy",
    "question": "Concept check 198: In Bit Manipulation, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-199",
    "topic": "Advanced Patterns",
    "difficulty": "Medium",
    "question": "Concept check 199: In Advanced Patterns, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-200",
    "topic": "Arrays",
    "difficulty": "Hard",
    "question": "Concept check 200: In Arrays, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-201",
    "topic": "Strings",
    "difficulty": "Easy",
    "question": "Concept check 201: In Strings, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-202",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "question": "Concept check 202: In Linked Lists, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-203",
    "topic": "Stacks",
    "difficulty": "Hard",
    "question": "Concept check 203: In Stacks, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-204",
    "topic": "Queues",
    "difficulty": "Easy",
    "question": "Concept check 204: In Queues, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-205",
    "topic": "Hashing",
    "difficulty": "Medium",
    "question": "Concept check 205: In Hashing, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-206",
    "topic": "Sorting",
    "difficulty": "Hard",
    "question": "Concept check 206: In Sorting, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-207",
    "topic": "Searching",
    "difficulty": "Easy",
    "question": "Concept check 207: In Searching, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-208",
    "topic": "Trees",
    "difficulty": "Medium",
    "question": "Concept check 208: In Trees, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-209",
    "topic": "BST",
    "difficulty": "Hard",
    "question": "Concept check 209: In BST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-210",
    "topic": "Heaps",
    "difficulty": "Easy",
    "question": "Concept check 210: In Heaps, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-211",
    "topic": "Graphs",
    "difficulty": "Medium",
    "question": "Concept check 211: In Graphs, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-212",
    "topic": "Shortest Paths",
    "difficulty": "Hard",
    "question": "Concept check 212: In Shortest Paths, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-213",
    "topic": "MST",
    "difficulty": "Easy",
    "question": "Concept check 213: In MST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-214",
    "topic": "Greedy",
    "difficulty": "Medium",
    "question": "Concept check 214: In Greedy, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-215",
    "topic": "DP",
    "difficulty": "Hard",
    "question": "Concept check 215: In DP, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-216",
    "topic": "Tries",
    "difficulty": "Easy",
    "question": "Concept check 216: In Tries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-217",
    "topic": "Range Queries",
    "difficulty": "Medium",
    "question": "Concept check 217: In Range Queries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-218",
    "topic": "Bit Manipulation",
    "difficulty": "Hard",
    "question": "Concept check 218: In Bit Manipulation, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-219",
    "topic": "Advanced Patterns",
    "difficulty": "Easy",
    "question": "Concept check 219: In Advanced Patterns, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-220",
    "topic": "Arrays",
    "difficulty": "Medium",
    "question": "Concept check 220: In Arrays, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-221",
    "topic": "Strings",
    "difficulty": "Hard",
    "question": "Concept check 221: In Strings, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-222",
    "topic": "Linked Lists",
    "difficulty": "Easy",
    "question": "Concept check 222: In Linked Lists, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-223",
    "topic": "Stacks",
    "difficulty": "Medium",
    "question": "Concept check 223: In Stacks, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-224",
    "topic": "Queues",
    "difficulty": "Hard",
    "question": "Concept check 224: In Queues, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-225",
    "topic": "Hashing",
    "difficulty": "Easy",
    "question": "Concept check 225: In Hashing, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-226",
    "topic": "Sorting",
    "difficulty": "Medium",
    "question": "Concept check 226: In Sorting, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-227",
    "topic": "Searching",
    "difficulty": "Hard",
    "question": "Concept check 227: In Searching, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-228",
    "topic": "Trees",
    "difficulty": "Easy",
    "question": "Concept check 228: In Trees, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-229",
    "topic": "BST",
    "difficulty": "Medium",
    "question": "Concept check 229: In BST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-230",
    "topic": "Heaps",
    "difficulty": "Hard",
    "question": "Concept check 230: In Heaps, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-231",
    "topic": "Graphs",
    "difficulty": "Easy",
    "question": "Concept check 231: In Graphs, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-232",
    "topic": "Shortest Paths",
    "difficulty": "Medium",
    "question": "Concept check 232: In Shortest Paths, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-233",
    "topic": "MST",
    "difficulty": "Hard",
    "question": "Concept check 233: In MST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-234",
    "topic": "Greedy",
    "difficulty": "Easy",
    "question": "Concept check 234: In Greedy, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-235",
    "topic": "DP",
    "difficulty": "Medium",
    "question": "Concept check 235: In DP, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-236",
    "topic": "Tries",
    "difficulty": "Hard",
    "question": "Concept check 236: In Tries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-237",
    "topic": "Range Queries",
    "difficulty": "Easy",
    "question": "Concept check 237: In Range Queries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-238",
    "topic": "Bit Manipulation",
    "difficulty": "Medium",
    "question": "Concept check 238: In Bit Manipulation, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-239",
    "topic": "Advanced Patterns",
    "difficulty": "Hard",
    "question": "Concept check 239: In Advanced Patterns, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-240",
    "topic": "Arrays",
    "difficulty": "Easy",
    "question": "Concept check 240: In Arrays, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-241",
    "topic": "Strings",
    "difficulty": "Medium",
    "question": "Concept check 241: In Strings, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-242",
    "topic": "Linked Lists",
    "difficulty": "Hard",
    "question": "Concept check 242: In Linked Lists, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-243",
    "topic": "Stacks",
    "difficulty": "Easy",
    "question": "Concept check 243: In Stacks, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-244",
    "topic": "Queues",
    "difficulty": "Medium",
    "question": "Concept check 244: In Queues, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-245",
    "topic": "Hashing",
    "difficulty": "Hard",
    "question": "Concept check 245: In Hashing, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-246",
    "topic": "Sorting",
    "difficulty": "Easy",
    "question": "Concept check 246: In Sorting, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-247",
    "topic": "Searching",
    "difficulty": "Medium",
    "question": "Concept check 247: In Searching, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-248",
    "topic": "Trees",
    "difficulty": "Hard",
    "question": "Concept check 248: In Trees, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-249",
    "topic": "BST",
    "difficulty": "Easy",
    "question": "Concept check 249: In BST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-250",
    "topic": "Heaps",
    "difficulty": "Medium",
    "question": "Concept check 250: In Heaps, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-251",
    "topic": "Graphs",
    "difficulty": "Hard",
    "question": "Concept check 251: In Graphs, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-252",
    "topic": "Shortest Paths",
    "difficulty": "Easy",
    "question": "Concept check 252: In Shortest Paths, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-253",
    "topic": "MST",
    "difficulty": "Medium",
    "question": "Concept check 253: In MST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-254",
    "topic": "Greedy",
    "difficulty": "Hard",
    "question": "Concept check 254: In Greedy, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-255",
    "topic": "DP",
    "difficulty": "Easy",
    "question": "Concept check 255: In DP, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-256",
    "topic": "Tries",
    "difficulty": "Medium",
    "question": "Concept check 256: In Tries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-257",
    "topic": "Range Queries",
    "difficulty": "Hard",
    "question": "Concept check 257: In Range Queries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-258",
    "topic": "Bit Manipulation",
    "difficulty": "Easy",
    "question": "Concept check 258: In Bit Manipulation, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-259",
    "topic": "Advanced Patterns",
    "difficulty": "Medium",
    "question": "Concept check 259: In Advanced Patterns, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-260",
    "topic": "Arrays",
    "difficulty": "Hard",
    "question": "Concept check 260: In Arrays, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-261",
    "topic": "Strings",
    "difficulty": "Easy",
    "question": "Concept check 261: In Strings, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-262",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "question": "Concept check 262: In Linked Lists, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-263",
    "topic": "Stacks",
    "difficulty": "Hard",
    "question": "Concept check 263: In Stacks, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-264",
    "topic": "Queues",
    "difficulty": "Easy",
    "question": "Concept check 264: In Queues, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-265",
    "topic": "Hashing",
    "difficulty": "Medium",
    "question": "Concept check 265: In Hashing, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-266",
    "topic": "Sorting",
    "difficulty": "Hard",
    "question": "Concept check 266: In Sorting, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-267",
    "topic": "Searching",
    "difficulty": "Easy",
    "question": "Concept check 267: In Searching, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-268",
    "topic": "Trees",
    "difficulty": "Medium",
    "question": "Concept check 268: In Trees, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-269",
    "topic": "BST",
    "difficulty": "Hard",
    "question": "Concept check 269: In BST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-270",
    "topic": "Heaps",
    "difficulty": "Easy",
    "question": "Concept check 270: In Heaps, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-271",
    "topic": "Graphs",
    "difficulty": "Medium",
    "question": "Concept check 271: In Graphs, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-272",
    "topic": "Shortest Paths",
    "difficulty": "Hard",
    "question": "Concept check 272: In Shortest Paths, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-273",
    "topic": "MST",
    "difficulty": "Easy",
    "question": "Concept check 273: In MST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-274",
    "topic": "Greedy",
    "difficulty": "Medium",
    "question": "Concept check 274: In Greedy, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-275",
    "topic": "DP",
    "difficulty": "Hard",
    "question": "Concept check 275: In DP, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-276",
    "topic": "Tries",
    "difficulty": "Easy",
    "question": "Concept check 276: In Tries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-277",
    "topic": "Range Queries",
    "difficulty": "Medium",
    "question": "Concept check 277: In Range Queries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-278",
    "topic": "Bit Manipulation",
    "difficulty": "Hard",
    "question": "Concept check 278: In Bit Manipulation, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-279",
    "topic": "Advanced Patterns",
    "difficulty": "Easy",
    "question": "Concept check 279: In Advanced Patterns, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-280",
    "topic": "Arrays",
    "difficulty": "Medium",
    "question": "Concept check 280: In Arrays, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-281",
    "topic": "Strings",
    "difficulty": "Hard",
    "question": "Concept check 281: In Strings, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-282",
    "topic": "Linked Lists",
    "difficulty": "Easy",
    "question": "Concept check 282: In Linked Lists, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-283",
    "topic": "Stacks",
    "difficulty": "Medium",
    "question": "Concept check 283: In Stacks, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-284",
    "topic": "Queues",
    "difficulty": "Hard",
    "question": "Concept check 284: In Queues, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-285",
    "topic": "Hashing",
    "difficulty": "Easy",
    "question": "Concept check 285: In Hashing, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-286",
    "topic": "Sorting",
    "difficulty": "Medium",
    "question": "Concept check 286: In Sorting, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-287",
    "topic": "Searching",
    "difficulty": "Hard",
    "question": "Concept check 287: In Searching, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-288",
    "topic": "Trees",
    "difficulty": "Easy",
    "question": "Concept check 288: In Trees, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-289",
    "topic": "BST",
    "difficulty": "Medium",
    "question": "Concept check 289: In BST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-290",
    "topic": "Heaps",
    "difficulty": "Hard",
    "question": "Concept check 290: In Heaps, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-291",
    "topic": "Graphs",
    "difficulty": "Easy",
    "question": "Concept check 291: In Graphs, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-292",
    "topic": "Shortest Paths",
    "difficulty": "Medium",
    "question": "Concept check 292: In Shortest Paths, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-293",
    "topic": "MST",
    "difficulty": "Hard",
    "question": "Concept check 293: In MST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-294",
    "topic": "Greedy",
    "difficulty": "Easy",
    "question": "Concept check 294: In Greedy, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-295",
    "topic": "DP",
    "difficulty": "Medium",
    "question": "Concept check 295: In DP, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-296",
    "topic": "Tries",
    "difficulty": "Hard",
    "question": "Concept check 296: In Tries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-297",
    "topic": "Range Queries",
    "difficulty": "Easy",
    "question": "Concept check 297: In Range Queries, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-298",
    "topic": "Bit Manipulation",
    "difficulty": "Medium",
    "question": "Concept check 298: In Bit Manipulation, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-299",
    "topic": "Advanced Patterns",
    "difficulty": "Hard",
    "question": "Concept check 299: In Advanced Patterns, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-300",
    "topic": "Arrays",
    "difficulty": "Easy",
    "question": "Concept check 300: In Arrays, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-301",
    "topic": "Strings",
    "difficulty": "Medium",
    "question": "Concept check 301: In Strings, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-302",
    "topic": "Linked Lists",
    "difficulty": "Hard",
    "question": "Concept check 302: In Linked Lists, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-303",
    "topic": "Stacks",
    "difficulty": "Easy",
    "question": "Concept check 303: In Stacks, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-304",
    "topic": "Queues",
    "difficulty": "Medium",
    "question": "Concept check 304: In Queues, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-305",
    "topic": "Hashing",
    "difficulty": "Hard",
    "question": "Concept check 305: In Hashing, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-306",
    "topic": "Sorting",
    "difficulty": "Easy",
    "question": "Concept check 306: In Sorting, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-307",
    "topic": "Searching",
    "difficulty": "Medium",
    "question": "Concept check 307: In Searching, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-308",
    "topic": "Trees",
    "difficulty": "Hard",
    "question": "Concept check 308: In Trees, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-309",
    "topic": "BST",
    "difficulty": "Easy",
    "question": "Concept check 309: In BST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-310",
    "topic": "Heaps",
    "difficulty": "Medium",
    "question": "Concept check 310: In Heaps, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-311",
    "topic": "Graphs",
    "difficulty": "Hard",
    "question": "Concept check 311: In Graphs, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-312",
    "topic": "Shortest Paths",
    "difficulty": "Easy",
    "question": "Concept check 312: In Shortest Paths, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-313",
    "topic": "MST",
    "difficulty": "Medium",
    "question": "Concept check 313: In MST, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-314",
    "topic": "Greedy",
    "difficulty": "Hard",
    "question": "Concept check 314: In Greedy, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  },
  {
    "id": "q-315",
    "topic": "DP",
    "difficulty": "Easy",
    "question": "Concept check 315: In DP, which principle is most important when selecting an algorithm?",
    "options": [
      "A) Ignore constraints",
      "B) Match the method to its assumptions and required operations",
      "C) Always choose the newest algorithm",
      "D) Always minimize code length"
    ],
    "correct_answer": "B",
    "correctIndex": 1,
    "explanation": "Algorithm choice should follow the input constraints, required operations, correctness assumptions, and complexity target.",
    "skill": "reasoning",
    "source": "original_quiz"
  }
];

export const DSA_KNOWLEDGE_BASE = [
  {
    "id": "how_this_knowledge_base_should_be_used",
    "title": "How this knowledge base should be used",
    "content": "This material is written as source knowledge for an educational LLM. The model should:\n- explain concepts from first principles before using jargon;\n- show a small example or dry run whenever an algorithm is procedural;\n- state time and space complexity separately;\n- distinguish average/worst/best-case complexity when relevant;\n- never claim an algorithm works on inputs that violate its assumptions;\n- give hints before complete solutions when a student asks for help;\n- connect prerequisites and related topics;\n- use the included practice questions for assessment generation.",
    "domain": "Data Structures and Algorithms",
    "source": "DSA LLM Knowledge Base v1",
    "type": "instructional_knowledge",
    "category": "General",
    "subcategory": "General"
  },
  {
    "id": "complexity_notation",
    "title": "Complexity notation",
    "content": "- **O(f(n))**: asymptotic upper bound used to describe growth.\n- **Ω(f(n))**: asymptotic lower bound.\n- **Θ(f(n))**: asymptotically tight bound.\n- Common growth order from smaller to larger: O(1), O(log n), O(n), O(n log n), O(n²), O(n³), O(2ⁿ), O(n!).\n- In practical algorithm analysis, constants and lower-order terms are ignored for asymptotic growth.",
    "domain": "Data Structures and Algorithms",
    "source": "DSA LLM Knowledge Base v1",
    "type": "instructional_knowledge",
    "category": "General",
    "subcategory": "General"
  },
  {
    "id": "core_problem_solving_workflow",
    "title": "Core problem-solving workflow",
    "content": "1. Clarify the input, output, constraints, and edge cases.\n2. Identify the data representation.\n3. Ask whether a known pattern applies: two pointers, sliding window, prefix sum, hashing, binary search, recursion/backtracking, greedy, graph traversal, or dynamic programming.\n4. Build a simple correct solution first.\n5. Analyze time and space complexity.\n6. Optimize only when constraints require it.\n7. Test empty, singleton, duplicate, sorted, reverse-sorted, maximum/minimum, and boundary cases.\n\n**Topic:** Arrays  \n**Prerequisites:** Basic programming and loops\n\n### Concept\nAn array stores elements in contiguous indexed positions in the usual random-access model. Indexing an element by position is constant time because the address can be calculated from the base address and element size. Arrays are excellent when frequent indexed access is required, but inserting or deleting in the middle normally requires shifting elements.\n\n### Core operations / ideas\n- Access `A[i]`\n- Update `A[i]`\n- Traverse all elements\n- Search\n- Insert/delete by shifting\n- Prefix/suffix preprocessing\n\n### Complexity\nAccess: O(1).  \nSearch: O(n) without ordering.  \nInsert/delete at the end: O(1) in a dynamic array when capacity permits; resizing can make an individual append O(n), but amortized append is O(1).  \nInsert/delete at the beginning or middle: O(n).  \nTraversal: O(n).  \nSpace: O(n).\n\n### Worked example\nFor `[10, 20, 30, 40]`, accessing index 2 returns `30`. Inserting `25` at index 2 requires shifting `30` and `40` one position right, producing `[10,20,25,30,40]`.\n\n### Common mistakes\nConfusing array indexing with value lookup; forgetting zero-based indexing; claiming middle insertion is O(1); ignoring dynamic-array resizing.\n\n### Practice prompts\n1. Find the maximum element.  \n2. Reverse an array in-place.  \n3. Move all zeroes to the end while preserving the order of non-zero values.\n\n**Topic:** Strings  \n**Prerequisites:** Arrays and character operations\n\n### Concept\nA string is a sequence of characters. Many string problems reduce to array techniques: frequency counting, two pointers, sliding windows, prefix information, and hashing. Whether a string is mutable depends on the programming language.\n\n### Core operations / ideas\n- Character indexing\n- Concatenation\n- Substring extraction\n- Frequency counting\n- Palindrome checking\n- Anagram detection\n- Pattern matching\n\n### Complexity\nIndexing is typically O(1). Full traversal is O(n). Creating a substring or concatenating strings can cost O(n) depending on the language and implementation.\n\n### Worked example\nFor `\"level\"`, compare the first and last characters, then move inward: `l==l`, `e==e`, so the string is a palindrome.\n\n### Common mistakes\nAssuming every language has mutable strings; repeatedly concatenating in a loop without considering the language's string implementation; forgetting Unicode/character-encoding issues in production systems.\n\n### Practice prompts\n1. Check whether two strings are anagrams.  \n2. Find the first non-repeating character.  \n3. Find the longest substring without repeating characters.\n\n**Topic:** Linked List  \n**Prerequisites:** Pointers/references and structures\n\n### Concept\nA linked list stores nodes connected by references. A singly linked-list node usually contains data and a `next` reference. Unlike arrays, nodes need not be contiguous in memory. Random access is slow because the list must be traversed from a known node.\n\n### Core operations / ideas\nSingly node:\n`Node { data, next }`\n\nTraverse:\n`cur = head`\n`while cur != null: process(cur); cur = cur.next`\n\nInsert after a known node:\n`new.next = cur.next`\n`cur.next = new`\n\n### Complexity\nAccess by position: O(n).  \nSearch: O(n).  \nInsert/delete after a known node: O(1).  \nInsert at head: O(1).  \nSpace: O(n).\n\n### Worked example\nList `10 → 20 → 30`. To insert `25` after `20`, set `new.next = 20.next` and then `20.next = new`, giving `10 → 20 → 25 → 30`.\n\n### Common mistakes\nLosing the remainder of the list by overwriting `next` too early; dereferencing null; forgetting to update `head`; mishandling deletion of the first node.\n\n### Practice prompts\n1. Reverse a singly linked list.  \n2. Detect a cycle.  \n3. Find the middle node using slow/fast pointers.\n\n**Topic:** Stack  \n**Prerequisites:** Arrays or linked lists\n\n### Concept\nA stack follows LIFO: last in, first out. The primary operations are push, pop, and peek/top. Stacks naturally model nested operations, undo histories, expression parsing, and depth-first traversal.\n\n### Core operations / ideas\n`push(x)`: place x on top.  \n`pop()`: remove and return top.  \n`peek()`: inspect top without removing.  \n`isEmpty()`: test whether no elements remain.\n\n### Complexity\nWith an array/vector implementation, push/pop at the end are O(1) amortized; peek is O(1). Space is O(n).\n\n### Worked example\nPush 10, 20, 30. The stack top is 30. Pop returns 30, leaving 10,20 with 20 on top.\n\n### Common mistakes\nCalling pop on an empty stack; mixing up LIFO with FIFO; implementing a stack by repeatedly inserting/removing from the front of an array and accidentally making operations O(n).\n\n### Practice prompts\n1. Check balanced parentheses.  \n2. Evaluate a postfix expression.  \n3. Design a min-stack with O(1) minimum lookup.\n\n**Topic:** Queue  \n**Prerequisites:** Arrays or linked lists\n\n### Concept\nA queue follows FIFO: first in, first out. Enqueue adds at the rear; dequeue removes from the front. Circular buffers and linked lists can provide efficient queue operations.\n\n### Core operations / ideas\nEnqueue: add to rear.  \nDequeue: remove from front.  \nFront/peek: inspect oldest element.  \nCircular queue: wrap indices using modulo capacity.\n\n### Complexity\nA properly implemented queue supports enqueue/dequeue in O(1). Space is O(n).\n\n### Worked example\nEnqueue A, B, C. Dequeue returns A first, then B, then C.\n\n### Common mistakes\nUsing a plain array and shifting every remaining element after dequeue, causing O(n) dequeue; confusing front and rear indices; forgetting empty/full conditions in a fixed-size circular queue.\n\n### Practice prompts\n1. Implement a queue with two stacks.  \n2. Generate binary numbers from 1 to n using a queue.  \n3. Use BFS on a graph.\n\n**Topic:** Hash Table  \n**Prerequisites:** Arrays and functions\n\n### Concept\nA hash table maps keys to positions using a hash function. Collisions occur when different keys map to the same position. Common collision strategies are separate chaining and open addressing. Good hashing aims for an even distribution.\n\n### Core operations / ideas\nInsert, search, delete.  \nSeparate chaining: each bucket stores a collection of entries.  \nOpen addressing: probe alternative positions, such as linear probing, when a collision occurs.  \nLoad factor = number of stored entries / number of buckets.\n\n### Complexity\nAverage expected insert/search/delete: O(1) with a suitable hash function and controlled load factor. Worst case: O(n). Space: O(n).\n\n### Worked example\nKeys `\"cat\"` and `\"act\"` can be stored as separate entries even if their hashes collide. Collision handling ensures both remain retrievable.\n\n### Common mistakes\nTreating average O(1) as a mathematical guarantee; ignoring collisions; using mutable objects as keys when their hash/equality contract can change; forgetting load factor and resizing.\n\n### Practice prompts\n1. Two Sum using hashing.  \n2. Frequency map of an array.  \n3. Longest consecutive sequence.\n\n**Topic:** Recursion  \n**Prerequisites:** Functions and call stack\n\n### Concept\nRecursion solves a problem by calling the same function on a smaller instance until a base case is reached. A correct recursive solution needs a base case and progress toward that base case.\n\n### Core operations / ideas\nTypical structure:\n`solve(problem):`\n`    if base_case: return answer`\n`    smaller = reduce(problem)`\n`    return combine(solve(smaller))`\n\nThe call stack stores unfinished recursive calls.\n\n### Complexity\nDepends on the recurrence. Factorial uses O(n) time and O(n) call-stack space. Binary search uses O(log n) calls. A naive Fibonacci recurrence has exponential time.\n\n### Worked example\n`factorial(4)` computes `4 * factorial(3)`, then `3 * factorial(2)`, then `2 * factorial(1)`, and returns 24 while the calls unwind.\n\n### Common mistakes\nNo base case; base case that is unreachable; recursive calls that do not reduce the problem; stack overflow for very deep recursion; forgetting that repeated subproblems can make recursion exponential.\n\n### Practice prompts\n1. Compute factorial.  \n2. Sum an array recursively.  \n3. Generate all subsets.\n\n**Topic:** Backtracking  \n**Prerequisites:** Recursion and state management\n\n### Concept\nBacktracking explores a search space by making a choice, recursively exploring consequences, and undoing the choice before trying another. It is useful when constructing combinations, permutations, placements, or assignments under constraints.\n\n### Core operations / ideas\nPattern:\n1. Choose an option.\n2. Apply the choice.\n3. Recurse.\n4. Undo the choice.\n5. Try the next option.\n\nPruning rejects branches that cannot lead to a valid solution.\n\n### Complexity\nComplexity depends on the search tree. Permutations of n distinct elements have n! leaves. N-Queens has exponential worst-case search, though pruning makes practical performance much better.\n\n### Worked example\nFor subsets of `[1,2]`, choose 1/not-1 and then choose 2/not-2, producing `[], [1], [2], [1,2]`.\n\n### Common mistakes\nForgetting to undo state; sharing mutable state between branches incorrectly; pruning with an invalid condition; generating duplicate solutions when duplicates are not handled.\n\n### Practice prompts\n1. Generate permutations.  \n2. Generate subsets.  \n3. Solve N-Queens.  \n4. Sudoku solver.\n\n**Topic:** Binary Search  \n**Prerequisites:** Sorted arrays and comparison\n\n### Concept\nBinary search repeatedly halves a sorted search interval. It compares the target with the middle element and discards the half that cannot contain the target. The crucial precondition is that the search space has a monotonic/order property.\n\n### Core operations / ideas\nFor an ascending array:\n`lo=0, hi=n-1`\nwhile `lo <= hi`:\n`mid = lo + (hi-lo)//2`\nif `A[mid] == target`: return mid\nif `A[mid] < target`: lo = mid+1\nelse: hi = mid-1\n\n### Complexity\nTime: O(log n).  \nIterative auxiliary space: O(1).  \nRecursive auxiliary space: O(log n) call stack.\n\n### Worked example\nSearch `[2,4,7,10,13,18]` for 13. Middle is 7 → search right half. Middle of `[10,13,18]` is 13 → found.\n\n### Common mistakes\nUsing binary search on unsorted data without another monotonic property; off-by-one errors; infinite loops; overflow-prone midpoint formula in languages with fixed-width integers.\n\n### Practice prompts\n1. Find first occurrence of a target.  \n2. Find insertion position.  \n3. Find minimum in a rotated sorted array.  \n4. Binary search on answer for a monotonic feasibility condition.\n\n**Topic:** Sorting Overview  \n**Prerequisites:** Arrays and comparisons\n\n### Concept\nSorting arranges elements according to an ordering. Comparison sorts derive ordering from comparisons and include insertion sort, merge sort, quicksort, heap sort, and selection sort. Non-comparison methods such as counting and radix sort exploit properties of the keys.\n\n### Core operations / ideas\nImportant properties:\n- Stable: equal keys preserve relative order.\n- In-place: uses O(1) or small auxiliary memory under the implementation's model.\n- Adaptive: benefits from existing order.\n- Comparison-based vs non-comparison-based.\n\n### Complexity\nTypical complexities:\nBubble: O(n²) average/worst.\nSelection: O(n²).\nInsertion: O(n²) average/worst, O(n) best on already sorted input.\nMerge: O(n log n), O(n) auxiliary array space in common implementations.\nQuick: O(n log n) average, O(n²) worst.\nHeap: O(n log n) worst and O(1) auxiliary array space for standard in-place heapsort.\n\n### Worked example\nFor `[5,2,4]`, insertion sort starts with `[5]`, inserts 2 before 5 → `[2,5]`, then inserts 4 between them → `[2,4,5]`.\n\n### Common mistakes\nAssuming every O(n log n) sort is stable; ignoring pivot choice in quicksort; confusing in-place with low memory in every language implementation.\n\n### Practice prompts\n1. Sort an array using merge sort.  \n2. Explain why quicksort can degrade to O(n²).  \n3. Choose a sorting algorithm for nearly sorted data.\n\n**Topic:** Merge Sort  \n**Prerequisites:** Recursion and arrays\n\n### Concept\nMerge sort divides an array into two halves, recursively sorts each half, and merges the sorted halves. The merge operation is linear because each element is examined a constant number of times.\n\n### Core operations / ideas\nDivide at midpoint. Recursively sort left/right. Merge by maintaining pointers to the smallest unmerged elements of each half.\n\n### Complexity\nTime: O(n log n) in best/average/worst cases.  \nAuxiliary space: O(n) for a typical array implementation.  \nStable: yes, when equal elements from the left half are chosen first.\n\n### Worked example\n`[8,3,5,1]` → sort `[8,3]` to `[3,8]`, sort `[5,1]` to `[1,5]`, merge to `[1,3,5,8]`.\n\n### Common mistakes\nCopying elements incorrectly during merge; forgetting remaining elements after one half is exhausted; assuming O(1) extra space for the common array implementation.\n\n### Practice prompts\n1. Implement merge sort.  \n2. Count inversions using merge sort.\n\n**Topic:** Quick Sort  \n**Prerequisites:** Partitioning and recursion\n\n### Concept\nQuicksort chooses a pivot and partitions elements into regions relative to that pivot, then recursively sorts the regions. Its average performance is O(n log n), but poor pivot choices can produce O(n²) worst-case behavior.\n\n### Core operations / ideas\nPartition around a pivot. Recursively sort left and right partitions. Pivot strategies include first/last element, random pivot, and median-of-three heuristics.\n\n### Complexity\nAverage: O(n log n).  \nWorst: O(n²).  \nExpected recursion/stack space depends on partition balance; randomized or carefully implemented versions have expected O(log n) stack depth, while worst-case recursion can reach O(n).\n\n### Worked example\nFor `[4,2,7,1,3]`, choose 4 as pivot. Values smaller than 4 go left and larger go right; recursively sort each side.\n\n### Common mistakes\nPoor pivot choice on already ordered data; incorrect partition boundaries; forgetting recursion termination when a partition has size 0 or 1.\n\n### Practice prompts\n1. Implement Lomuto partition.  \n2. Compare Lomuto and Hoare partitioning.  \n3. Explain randomized quicksort.\n\n**Topic:** Heap and Priority Queue  \n**Prerequisites:** Arrays and tree terminology\n\n### Concept\nA binary heap is a complete binary tree satisfying a heap-order property. In a min-heap, every parent is less than or equal to its children. In an array representation, for zero-based indexing, children of index i are `2i+1` and `2i+2`; parent is `(i-1)//2` for i>0.\n\n### Core operations / ideas\nInsert: append then sift up.  \nExtract-min/max: move root to the end, reduce heap size, sift down.  \nPeek: inspect root.  \nBuild heap: bottom-up heapify.\n\n### Complexity\nPeek: O(1).  \nInsert: O(log n).  \nExtract: O(log n).  \nBuild heap: O(n).  \nSpace: O(n).\n\n### Worked example\nInsert 3, 1, 5 into a min-heap. After inserting 1, it moves above 3; inserting 5 leaves the root 1. Extract-min returns 1 and restores heap order.\n\n### Common mistakes\nConfusing a heap with a fully sorted array; assuming left child is always smaller than right child; claiming build-heap is O(n log n) when using bottom-up heapify (it is O(n)).\n\n### Practice prompts\n1. Implement a min-heap.  \n2. Find k largest elements using a heap.  \n3. Merge k sorted lists.\n\n**Topic:** Binary Tree  \n**Prerequisites:** Recursion\n\n### Concept\nA binary tree is a tree where each node has at most two children, usually called left and right. Tree traversals are systematic ways to visit nodes.\n\n### Core operations / ideas\nPreorder: root, left, right.  \nInorder: left, root, right.  \nPostorder: left, right, root.  \nLevel order: breadth-first by depth.\n\n### Complexity\nTraversing n nodes takes O(n) time. Recursive DFS uses O(h) call-stack space where h is tree height; in the worst case h=n.\n\n### Worked example\nFor tree `1` with left child 2 and right child 3: preorder = `1,2,3`; inorder = `2,1,3`; postorder = `2,3,1`; level order = `1,2,3`.\n\n### Common mistakes\nMixing traversal orders; assuming a binary tree is automatically balanced; confusing height and number of nodes.\n\n### Practice prompts\n1. Find tree height.  \n2. Count leaf nodes.  \n3. Check whether two trees are identical.  \n4. Produce inorder traversal iteratively.\n\n**Topic:** Binary Search Tree  \n**Prerequisites:** Binary trees and ordering\n\n### Concept\nA binary search tree (BST) maintains an ordering: keys in the left subtree are less than the node's key under the chosen ordering rule, while keys in the right subtree are greater (or duplicates follow a defined policy). Inorder traversal of a valid BST produces sorted keys.\n\n### Core operations / ideas\nSearch, insert, and delete follow comparisons from root downward. Deleting a node with two children can replace it with its inorder successor or predecessor and then remove that replacement node.\n\n### Complexity\nAverage/expected search, insertion, deletion: O(log n) for a balanced-ish tree. Worst case: O(n) when the tree degenerates into a chain. Space: O(n).\n\n### Worked example\nInsert 8, 3, 10, 1, 6. Inorder traversal gives `1,3,6,8,10`, demonstrating the sorted-order property.\n\n### Common mistakes\nAssuming every BST operation is O(log n); mishandling deletion of the root; failing to define duplicate-key behavior.\n\n### Practice prompts\n1. Validate a BST.  \n2. Find kth smallest element.  \n3. Find lowest common ancestor in a BST.\n\n**Topic:** AVL Tree  \n**Prerequisites:** BST and rotations\n\n### Concept\nAn AVL tree is a self-balancing BST. For every node, the height difference between left and right subtrees is at most 1. Rotations restore balance after insertion or deletion.\n\n### Core operations / ideas\nBalance factor = height(left) - height(right). Allowed values are -1, 0, +1. Imbalances are corrected with LL, RR, LR, or RL rotations.\n\n### Complexity\nSearch, insertion, deletion: O(log n). Space: O(n).\n\n### Worked example\nIf a node becomes left-heavy because a key was inserted into its left child's left subtree, a right rotation fixes the LL case.\n\n### Common mistakes\nUsing the wrong rotation for LR/RL cases; incorrect height updates after rotation; confusing AVL balancing with arbitrary tree rearrangement.\n\n### Practice prompts\n1. Perform LL, RR, LR, and RL rotations.  \n2. Explain why AVL height is O(log n).\n\n**Topic:** Graph Representation  \n**Prerequisites:** Arrays, lists, queues, stacks\n\n### Concept\nA graph consists of vertices and edges. It may be directed or undirected, weighted or unweighted. Common representations are an adjacency matrix and adjacency list.\n\n### Core operations / ideas\nAdjacency matrix: `matrix[u][v]` records whether/what weight exists.  \nAdjacency list: each vertex stores its neighbors.  \nFor sparse graphs, adjacency lists usually use much less memory.\n\n### Complexity\nMatrix space: O(V²).  \nAdjacency-list space: O(V+E).  \nChecking whether a specific edge exists is O(1) in a matrix and typically O(degree(u)) in an unsorted adjacency list.\n\n### Worked example\nFor edges `(A,B)` and `(A,C)`, A's adjacency list contains B and C. In an undirected graph, B and C also list A.\n\n### Common mistakes\nForgetting to add both directions in an undirected graph; confusing vertices V with edges E; using an O(V²) matrix when V is huge and the graph is sparse.\n\n### Practice prompts\n1. Build adjacency list from an edge list.  \n2. Compare matrix and list for sparse/dense graphs.\n\n**Topic:** BFS  \n**Prerequisites:** Queues and graphs\n\n### Concept\nBreadth-first search explores a graph layer by layer. Starting from a source, it visits all vertices at distance 1 before distance 2, then distance 3, and so on. In an unweighted graph, BFS gives shortest path distances measured in number of edges.\n\n### Core operations / ideas\nUse a queue. Mark a vertex visited when it is enqueued to prevent duplicate work. Store parent pointers when reconstructing paths.\n\n### Complexity\nAdjacency-list graph: O(V+E) time and O(V) auxiliary space.\n\n### Worked example\nStarting at A with edges A-B, A-C, B-D: queue A → discover B,C → process B and discover D → process C → process D. Distances are A=0, B=C=1, D=2.\n\n### Common mistakes\nMarking visited only when dequeued can enqueue duplicates; using BFS on weighted graphs and claiming it always finds minimum weighted distance; forgetting disconnected components when a full-graph traversal is required.\n\n### Practice prompts\n1. Shortest path in an unweighted graph.  \n2. Number of connected components.  \n3. Level-order traversal of a tree.\n\n**Topic:** DFS  \n**Prerequisites:** Stacks/recursion and graphs\n\n### Concept\nDepth-first search follows a path as deeply as possible before backtracking. It can be implemented recursively or with an explicit stack. DFS is fundamental to connected components, cycle detection, topological sorting, and many graph decomposition techniques.\n\n### Core operations / ideas\nRecursive form:\n`dfs(u):`\n`    mark u`\n`    for v in neighbors(u):`\n`        if v unvisited: dfs(v)`\n\nFor an undirected graph, cycle detection must account for the parent edge.\n\n### Complexity\nAdjacency-list graph: O(V+E) time and O(V) auxiliary space for visited/stack/recursion.\n\n### Worked example\nFrom A with edges A-B, A-C and B-D, DFS might visit A → B → D, backtrack to A, then C. The exact order depends on neighbor ordering.\n\n### Common mistakes\nStack overflow for very deep recursive graphs; confusing directed and undirected cycle rules; forgetting visited state.\n\n### Practice prompts\n1. Connected components.  \n2. Detect a cycle in an undirected graph.  \n3. Detect a cycle in a directed graph using recursion-state tracking.\n\n**Topic:** Topological Sort  \n**Prerequisites:** Directed graphs, DFS or queues\n\n### Concept\nA topological ordering is a linear ordering of vertices in a directed acyclic graph (DAG) such that for every directed edge u→v, u appears before v. A topological order exists if and only if the directed graph has no cycle.\n\n### Core operations / ideas\nKahn's algorithm: compute indegrees, enqueue all zero-indegree vertices, repeatedly remove one and decrement neighbors. If fewer than V vertices are processed, a cycle exists.\n\nDFS method: push a vertex after processing descendants; reverse finishing order.\n\n### Complexity\nO(V+E) time and O(V) auxiliary space.\n\n### Worked example\nCourse prerequisites: if `Math → Algorithms`, Math must appear before Algorithms. If prerequisites form a cycle, no valid course order exists.\n\n### Common mistakes\nTrying to topologically sort an undirected graph; forgetting that multiple valid orders can exist; failing to detect a directed cycle.\n\n### Practice prompts\n1. Course Schedule.  \n2. Build an order from dependency edges.  \n3. Detect whether a dependency graph is cyclic.\n\n**Topic:** Dijkstra's Algorithm  \n**Prerequisites:** Graphs, priority queues\n\n### Concept\nDijkstra computes shortest distances from a source when all edge weights are non-negative. It repeatedly selects the unsettled vertex with smallest tentative distance and relaxes outgoing edges.\n\n### Core operations / ideas\nInitialization: `dist[source]=0`, others infinity.  \nRelax edge u→v with weight w if `dist[u]+w < dist[v]`.  \nA min-priority queue efficiently selects the next smallest tentative distance.\n\n### Complexity\nWith a binary heap and adjacency lists: O((V+E) log V), commonly simplified to O(E log V) for connected graphs. Space O(V+E) including the graph.\n\n### Worked example\nEdges A→B=4, A→C=1, C→B=2. Initial B=4,C=1. Processing C relaxes B to 3, so shortest A→B is 3 via C.\n\n### Common mistakes\nUsing Dijkstra with negative edge weights; confusing tentative distance with finalized distance; forgetting stale priority-queue entries in implementations that allow duplicate pushes.\n\n### Practice prompts\n1. Implement Dijkstra with a min-heap.  \n2. Reconstruct the shortest path using parent pointers.  \n3. Explain why negative edges break Dijkstra's greedy assumption.\n\n**Topic:** Bellman-Ford  \n**Prerequisites:** Graphs and relaxation\n\n### Concept\nBellman-Ford computes single-source shortest paths and can handle negative edge weights. It can also detect a reachable negative-weight cycle by checking whether any edge can still be relaxed after V-1 full relaxation passes.\n\n### Core operations / ideas\nRelax every edge repeatedly for V-1 iterations. Optionally stop early if no distance changes in an iteration. Then perform one more pass to detect a reachable negative cycle.\n\n### Complexity\nTime: O(VE). Space: O(V) beyond the edge list representation.\n\n### Worked example\nIf A→B has weight 4 and A→C=5, C→B=-3, repeated relaxation eventually finds B=2 through C.\n\n### Common mistakes\nClaiming it finds useful finite shortest paths inside a reachable negative cycle; forgetting that unreachable negative cycles do not affect distances from the source; using only V-1 passes without cycle detection when detection is required.\n\n### Practice prompts\n1. Detect a negative cycle reachable from a source.  \n2. Compare Bellman-Ford and Dijkstra.\n\n**Topic:** Floyd-Warshall  \n**Prerequisites:** Dynamic programming and matrices\n\n### Concept\nFloyd-Warshall solves all-pairs shortest paths using dynamic programming. It considers whether allowing each vertex k as an intermediate can improve the path from i to j.\n\n### Core operations / ideas\nRecurrence:\n`dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`\nfor each k, then i, then j.\n\n### Complexity\nTime: O(V³).  \nSpace: O(V²) in the standard in-place matrix version.\n\n### Worked example\nFor each possible intermediate vertex k, update every pair (i,j). If going i→k→j is shorter than the current i→j distance, replace it.\n\n### Common mistakes\nUsing it on huge sparse graphs without considering alternatives; incorrect loop ordering; forgetting to initialize diagonal entries to 0 and absent edges to infinity.\n\n### Practice prompts\n1. Compute all-pairs shortest paths for a small weighted graph.  \n2. Detect negative cycles by checking whether `dist[i][i] < 0` after processing.\n\n**Topic:** Minimum Spanning Tree  \n**Prerequisites:** Weighted undirected graphs\n\n### Concept\nA minimum spanning tree (MST) of a connected weighted undirected graph is a set of V-1 edges that connects every vertex with minimum total weight and contains no cycle. Two classic algorithms are Kruskal and Prim.\n\n### Core operations / ideas\nKruskal: sort edges by weight, add an edge if it connects two different components.  \nPrim: grow one tree by repeatedly adding the cheapest edge from the current tree to an unvisited vertex.\n\n### Complexity\nKruskal: O(E log E) dominated by sorting, with near-constant amortized DSU operations.  \nPrim with binary heap and adjacency list: O(E log V).\n\n### Worked example\nEdges AB=1, AC=4, BC=2. Kruskal chooses AB=1 and BC=2, producing an MST of weight 3.\n\n### Common mistakes\nApplying MST to directed graphs; allowing cycles; assuming the MST is unique when equal weights exist; forgetting that disconnected graphs yield a minimum spanning forest instead.\n\n### Practice prompts\n1. Implement Kruskal.  \n2. Implement Prim.  \n3. Explain when Kruskal is convenient for edge lists.\n\n**Topic:** Disjoint Set Union (Union-Find)  \n**Prerequisites:** Arrays and trees\n\n### Concept\nDSU maintains a partition of elements into disjoint sets. `find(x)` returns the representative of x's set; `union(a,b)` merges two sets. Path compression and union by size/rank make operations extremely fast in practice and have inverse-Ackermann amortized complexity.\n\n### Core operations / ideas\nInitialize each item as its own parent.  \n`find(x)` follows parent links and compresses the path.  \n`union(a,b)` finds representatives and attaches the smaller tree under the larger (or by rank).\n\n### Complexity\nAmortized time per operation: O(α(n)), where α is the inverse Ackermann function and grows extraordinarily slowly. Space: O(n).\n\n### Worked example\nInitially `{1},{2},{3}`. `union(1,2)` gives `{1,2}`; `union(2,3)` merges 3 into that set. `find(3)` returns the same representative as `find(1)`. \n\n### Common mistakes\nCalling union on raw nodes without finding representatives; forgetting path compression or union-by-size when performance matters; treating DSU as a structure for ordered traversal.\n\n### Practice prompts\n1. Implement DSU.  \n2. Use DSU in Kruskal.  \n3. Detect whether adding an edge creates a cycle.\n\n**Topic:** Greedy Algorithms  \n**Prerequisites:** Complexity and proof ideas\n\n### Concept\nA greedy algorithm makes the best-looking local choice at each step. Greedy strategies are correct only when the problem has the required structural properties, commonly described using a greedy-choice property and optimal substructure. A locally optimal choice is not automatically globally optimal.\n\n### Core operations / ideas\nTypical process:\n1. Define candidate choices.\n2. Establish a safe local choice.\n3. Make it.\n4. Reduce the remaining problem.\n5. Prove correctness, often with an exchange argument or cut property.\n\n### Complexity\nComplexity depends on the problem. Activity selection after sorting by finish time is O(n log n) for sorting and O(n) for the scan.\n\n### Worked example\nFor activity selection, repeatedly choose the compatible activity with the earliest finish time. This leaves the largest possible remaining time for later activities.\n\n### Common mistakes\nUsing greedy without a correctness argument; confusing greedy with dynamic programming; applying greedy to 0/1 knapsack, where the common ratio heuristic is not generally optimal.\n\n### Practice prompts\n1. Activity selection.  \n2. Fractional knapsack.  \n3. Huffman coding.  \n4. Explain why greedy works for each case.\n\n**Topic:** Dynamic Programming  \n**Prerequisites:** Recursion and complexity\n\n### Concept\nDynamic programming (DP) solves problems with overlapping subproblems and optimal substructure by storing results so the same subproblem is not recomputed. Two common styles are top-down memoization and bottom-up tabulation.\n\n### Core operations / ideas\nDP design steps:\n1. Define the state.\n2. Define the transition/recurrence.\n3. Define base cases.\n4. Decide computation order.\n5. Determine answer location.\n6. Analyze state count × transition cost.\n\n### Complexity\nExample Fibonacci: naive recursion is exponential because subproblems repeat; memoized/tabulated Fibonacci is O(n) time and O(n) space, reducible to O(1) space when only the last two values are needed.\n\n### Worked example\nFibonacci recurrence `F(n)=F(n-1)+F(n-2)`, with F(0)=0 and F(1)=1. Tabulation computes 0,1,1,2,3,5,... once each.\n\n### Common mistakes\nDefining a state that omits information needed for future decisions; wrong base cases; using DP when a simpler greedy or direct solution exists; storing an unnecessarily huge table.\n\n### Practice prompts\n1. Climbing stairs.  \n2. House robber.  \n3. Coin change.  \n4. Longest increasing subsequence.\n\n**Topic:** 0/1 Knapsack  \n**Prerequisites:** DP and arrays\n\n### Concept\nIn 0/1 knapsack, each item can be selected at most once. Given weights, values, and capacity W, maximize total value without exceeding W.\n\n### Core operations / ideas\nState `dp[i][w]` = maximum value using the first i items with capacity w.\nTransition:\n`dp[i][w] = dp[i-1][w]` if item i is skipped;\nif weight_i <= w:\n`dp[i][w] = max(dp[i][w], value_i + dp[i-1][w-weight_i])`.\n\nA one-dimensional optimization iterates capacity downward so an item is not reused.\n\n### Complexity\nTime: O(nW).  \nSpace: O(nW), or O(W) with 1D optimization.\n\n### Worked example\nItems `(weight,value)=(2,3),(3,4),(4,5)`, capacity 5. Taking weights 2 and 3 gives value 7, which beats either single item.\n\n### Common mistakes\nIterating a 1D DP array upward accidentally allows the same item multiple times; confusing 0/1 knapsack with unbounded knapsack.\n\n### Practice prompts\n1. Implement 2D DP.  \n2. Optimize to 1D.  \n3. Reconstruct the selected item set.\n\n**Topic:** Longest Common Subsequence  \n**Prerequisites:** Strings and DP\n\n### Concept\nThe LCS of two sequences is the longest sequence appearing in both in the same relative order, not necessarily contiguously.\n\n### Core operations / ideas\nFor strings A and B:\nif `A[i-1] == B[j-1]`, `dp[i][j]=dp[i-1][j-1]+1`.\nOtherwise `dp[i][j]=max(dp[i-1][j], dp[i][j-1])`.\n\n### Complexity\nTime: O(nm).  \nSpace: O(nm), reducible to O(min(n,m)) if only the length is needed.\n\n### Worked example\nA=`ABCBDAB`, B=`BDCAB`. One LCS is `BCAB` with length 4.\n\n### Common mistakes\nConfusing subsequence with substring; using the diagonal transition when characters differ; failing to account for empty-prefix base cases.\n\n### Practice prompts\n1. Find LCS length.  \n2. Reconstruct one LCS.  \n3. Compare LCS and longest common substring.\n\n**Topic:** Trie  \n**Prerequisites:** Trees and strings\n\n### Concept\nA trie is a prefix tree used for strings. Each path from the root represents a prefix, and a terminal marker identifies complete stored words. Tries are useful for prefix queries, dictionaries, autocomplete, and word search.\n\n### Core operations / ideas\nInsert/search a word by following one edge per character. Prefix query traverses the prefix and then explores its descendants.\n\n### Complexity\nFor word length L, insert/search is O(L) assuming constant-time child access. Space depends on total characters and representation.\n\n### Worked example\nInsert `cat`, `car`, `dog`. Searching prefix `ca` reaches a node shared by `cat` and `car`, so both words can be discovered below it.\n\n### Common mistakes\nForgetting terminal markers; using an inefficient child representation without considering alphabet size; assuming trie memory is always smaller than hashing.\n\n### Practice prompts\n1. Implement insert/search.  \n2. Implement autocomplete.  \n3. Find maximum XOR using a binary trie.\n\n**Topic:** Segment Tree  \n**Prerequisites:** Trees and range queries\n\n### Concept\nA segment tree stores information about intervals of an array so range queries and point updates can be performed efficiently. The stored operation must generally be associative, such as sum, minimum, or maximum.\n\n### Core operations / ideas\nBuild recursively over intervals. Query decomposes the requested range into O(log n) relevant segments in the common point-update/range-query setting. Point update follows one root-to-leaf path.\n\n### Complexity\nBuild: O(n).  \nPoint update: O(log n).  \nRange query: O(log n) for standard segment-tree queries.  \nSpace: O(n).\n\n### Worked example\nFor array `[2,1,5,3]`, a sum segment tree can answer sum of indices 1..3 as 1+5+3=9 without scanning every element.\n\n### Common mistakes\nUsing a non-associative operation without adapting the structure; incorrect interval boundaries; confusing segment trees with Fenwick trees.\n\n### Practice prompts\n1. Range sum with point updates.  \n2. Range minimum query.  \n3. Explain lazy propagation for range updates.\n\n**Topic:** Fenwick Tree  \n**Prerequisites:** Arrays and prefix sums\n\n### Concept\nA Fenwick tree (Binary Indexed Tree) supports prefix aggregation and point updates efficiently. For sums, it is simpler and often more memory-efficient than a segment tree.\n\n### Core operations / ideas\n`add(i, delta)` updates index i and related Fenwick nodes.  \n`prefixSum(i)` accumulates partial ranges while repeatedly clearing the lowest set bit: `i -= i & -i`.\n\n### Complexity\nPoint update: O(log n).  \nPrefix sum: O(log n).  \nRange sum can be obtained as `prefix(r)-prefix(l-1)`.  \nSpace: O(n).\n\n### Worked example\nAfter adding 5 at position 3 and 2 at position 5, a prefix query through 5 returns 7 plus whatever earlier values existed.\n\n### Common mistakes\nMixing one-based and zero-based indexing; forgetting that standard Fenwick formulas are usually written with 1-based indices.\n\n### Practice prompts\n1. Implement prefix sum and point update.  \n2. Count inversions with coordinate compression + Fenwick tree.\n\n**Topic:** Bit Manipulation  \n**Prerequisites:** Binary numbers and operators\n\n### Concept\nBit manipulation works directly with binary representations. Common operators are AND `&`, OR `|`, XOR `^`, NOT `~`, left shift `<<`, and right shift `>>` (exact signed behavior is language-dependent).\n\n### Core operations / ideas\nUseful identities:\n- `x & 1` tests the least significant bit.\n- `x ^ x = 0`.\n- `x ^ 0 = x`.\n- `x & (x-1)` clears the lowest set bit.\n- `x & -x` isolates the lowest set bit in two's-complement systems.\n\n### Complexity\nMost individual bit operations are O(1) for fixed-width machine integers.\n\n### Worked example\nFor `x=12` (`1100`), `x & (x-1)` gives `1000`, clearing the lowest set bit. Repeating this counts the number of set bits in O(number of set bits).\n\n### Common mistakes\nIgnoring integer width/signedness; assuming right shift of negative integers behaves identically in every language; operator-precedence mistakes.\n\n### Practice prompts\n1. Check if a number is a power of two.  \n2. Count set bits.  \n3. Find the unique element when every other element appears twice using XOR.\n\n**Topic:** Sliding Window  \n**Prerequisites:** Arrays/strings and two pointers\n\n### Concept\nSliding window maintains a contiguous range and updates it incrementally as the left and right boundaries move. It is especially useful for substring/subarray problems where the window can be adjusted based on a condition.\n\n### Core operations / ideas\nTypical variable window:\nexpand right;\nwhile the window violates the condition, move left;\nupdate the answer.\n\nFixed-size window:\ninitialize first k elements, then remove the outgoing element and add the incoming element.\n\n### Complexity\nWhen each pointer moves only forward, the total pointer movement is O(n), even though there is a nested while loop.\n\n### Worked example\nFor longest substring with at most 2 distinct characters, expand right while tracking frequencies; if there are more than 2 distinct characters, move left until valid again.\n\n### Common mistakes\nUsing sliding window for a condition that is not monotonic under expansion/shrinking; forgetting to remove zero-frequency keys; confusing contiguous subarrays with subsequences.\n\n### Practice prompts\n1. Maximum sum subarray of size k.  \n2. Longest substring without repeating characters.  \n3. Minimum window substring.\n\n**Topic:** Two Pointers  \n**Prerequisites:** Arrays/strings\n\n### Concept\nTwo pointers use two indices that move through a sequence according to the problem's structure. They can move toward each other in sorted arrays or move at different speeds in linked lists.\n\n### Core operations / ideas\nCommon forms:\n- left/right converging\n- slow/fast\n- read/write pointers\n- two sequences with independent indices\n\n### Complexity\nOften O(n) when each pointer moves monotonically and each element is processed a bounded number of times.\n\n### Worked example\nIn sorted `[1,2,4,7,11]`, to find whether two numbers sum to 9, start at 1 and 11. Since 12 is too large, move right leftward; continue until a pair is found or pointers cross.\n\n### Common mistakes\nUsing two pointers on unsorted data when the algorithm depends on sorted order; moving the wrong pointer after a comparison; confusing two pointers with a sliding window.\n\n### Practice prompts\n1. Two Sum in sorted array.  \n2. Remove duplicates in-place.  \n3. Container With Most Water.\n\n**Topic:** Prefix Sum  \n**Prerequisites:** Arrays\n\n### Concept\nA prefix sum array stores cumulative totals so a range sum can be answered using subtraction. Define `P[0]=0` and `P[i+1]=P[i]+A[i]`. Then sum of A[l..r] is `P[r+1]-P[l]`.\n\n### Core operations / ideas\nBuild prefix sums in O(n). Answer each range sum in O(1). For 2D grids, use a 2D prefix-sum formula to answer rectangle sums in O(1) after O(rows*cols) preprocessing.\n\n### Complexity\nBuild: O(n).  \nRange query: O(1).  \nSpace: O(n), unless computed in-place where appropriate.\n\n### Worked example\nA=`[2,5,1,4]`; P=`[0,2,7,8,12]`. Sum indices 1..3 = P[4]-P[1] = 12-2 = 10.\n\n### Common mistakes\nOff-by-one errors; using prefix sums when frequent updates make them expensive; forgetting to use a wider numeric type if cumulative sums can overflow.\n\n### Practice prompts\n1. Range sum queries.  \n2. Subarray sum equals k using prefix sum + hashmap.  \n3. 2D matrix region sum.\n\n**Topic:** Union of Core Patterns  \n**Prerequisites:** Previous pattern knowledge\n\n### Concept\nMany interview problems can be recognized by their constraints and structure rather than by their surface story. A useful first classification is:\n- contiguous range → sliding window/prefix sum;\n- sorted data + monotonic predicate → binary search;\n- pair/triple relationships → hashing or two pointers;\n- hierarchical structure → tree recursion/DFS;\n- shortest unweighted path → BFS;\n- shortest weighted path with non-negative weights → Dijkstra;\n- dependency ordering → topological sort;\n- repeated subproblems → DP;\n- exhaustive constrained construction → backtracking;\n- dynamic connectivity → DSU.\n\n### Core operations / ideas\nRecognition is a skill, not a guarantee. The LLM should ask about constraints and assumptions before prescribing a pattern.\n\n### Complexity\nNo single complexity applies; choose based on the selected technique and implementation.\n\n### Worked example\nProblem: \"Find the longest substring with no repeated characters.\" The key clue is a contiguous substring plus a changing validity condition, suggesting a sliding window with a frequency map.\n\n### Common mistakes\nPattern matching by keyword alone; ignoring constraints; forcing a favorite technique even when assumptions do not hold.\n\n### Practice prompts\nFor each of 10 unseen problems, identify the likely pattern and explain the clue that led to the choice.\n\n\n# Complexity Reference\n\n| Structure / Algorithm | Typical Time | Extra Space | Key Assumption |\n|---|---:|---:|---|\n| Array access | O(1) | O(1) | indexed array |\n| Array search | O(n) | O(1) | unsorted |\n| Hash table search | O(1) average, O(n) worst | O(n) | good hashing |\n| Linked-list access | O(n) | O(1) | sequential traversal |\n| Stack push/pop | O(1) | O(n) total | end/top operations |\n| Queue enqueue/dequeue | O(1) | O(n) total | proper implementation |\n| Binary search | O(log n) | O(1) iterative | sorted/monotonic search space |\n| Merge sort | O(n log n) | O(n) common | comparison sort |\n| Quicksort | O(n log n) average, O(n²) worst | implementation-dependent | partitioning |\n| Heap insert/extract | O(log n) | O(n) total | heap property |\n| Heap build | O(n) | O(n) | bottom-up heapify |\n| Tree traversal | O(n) | O(h) DFS | visit each node |\n| BST search | O(log n) average, O(n) worst | O(h) | balanced-ish tree for logarithmic behavior |\n| BFS/DFS | O(V+E) | O(V) | adjacency list |\n| Dijkstra + binary heap | O((V+E)log V) | O(V+E) | non-negative weights |\n| Bellman-Ford | O(VE) | O(V) | can handle negative edges |\n| Floyd-Warshall | O(V³) | O(V²) | all-pairs |\n| Kruskal | O(E log E) | O(V) auxiliary | weighted undirected graph |\n| DSU operation | O(α(n)) amortized | O(n) | path compression + union heuristic |\n| Trie operation | O(L) | depends on stored chars | alphabet/child representation |\n| Segment tree query/update | O(log n) | O(n) | suitable associative operation |\n| Fenwick update/query | O(log n) | O(n) | prefix-aggregate structure |\n\n\n# Core Algorithm Templates",
    "domain": "Data Structures and Algorithms",
    "source": "DSA LLM Knowledge Base v1",
    "type": "instructional_knowledge",
    "category": "General",
    "subcategory": "General"
  },
  {
    "id": "binary_search_template",
    "title": "Binary Search Template",
    "content": "```text\nlo = 0\nhi = n - 1\nwhile lo <= hi:\n    mid = lo + (hi - lo) // 2\n    if A[mid] == target:\n        return mid\n    elif A[mid] < target:\n        lo = mid + 1\n    else:\n        hi = mid - 1\nreturn -1\n```",
    "domain": "Data Structures and Algorithms",
    "source": "DSA LLM Knowledge Base v1",
    "type": "instructional_knowledge",
    "category": "General",
    "subcategory": "General"
  },
  {
    "id": "bfs_template",
    "title": "BFS Template",
    "content": "```text\nqueue = [source]\nvisited[source] = true\nwhile queue not empty:\n    u = pop_front(queue)\n    for v in neighbors(u):\n        if not visited[v]:\n            visited[v] = true\n            parent[v] = u\n            push_back(queue, v)\n```",
    "domain": "Data Structures and Algorithms",
    "source": "DSA LLM Knowledge Base v1",
    "type": "instructional_knowledge",
    "category": "General",
    "subcategory": "General"
  },
  {
    "id": "dfs_template",
    "title": "DFS Template",
    "content": "```text\ndfs(u):\n    visited[u] = true\n    for v in neighbors(u):\n        if not visited[v]:\n            dfs(v)\n```",
    "domain": "Data Structures and Algorithms",
    "source": "DSA LLM Knowledge Base v1",
    "type": "instructional_knowledge",
    "category": "General",
    "subcategory": "General"
  },
  {
    "id": "dijkstra_template",
    "title": "Dijkstra Template",
    "content": "```text\ndist[source] = 0\npriority_queue.push((0, source))\nwhile priority_queue not empty:\n    (du, u) = pop_min()\n    if du != dist[u]:\n        continue\n    for (v, w) in neighbors(u):\n        if du + w < dist[v]:\n            dist[v] = du + w\n            parent[v] = u\n            push((dist[v], v))\n```",
    "domain": "Data Structures and Algorithms",
    "source": "DSA LLM Knowledge Base v1",
    "type": "instructional_knowledge",
    "category": "General",
    "subcategory": "General"
  },
  {
    "id": "sliding_window_template",
    "title": "Sliding Window Template",
    "content": "```text\nleft = 0\nfor right in range(n):\n    add A[right] to window\n    while window is invalid:\n        remove A[left]\n        left += 1\n    update answer\n```",
    "domain": "Data Structures and Algorithms",
    "source": "DSA LLM Knowledge Base v1",
    "type": "instructional_knowledge",
    "category": "General",
    "subcategory": "General"
  },
  {
    "id": "backtracking_template",
    "title": "Backtracking Template",
    "content": "```text\nbacktrack(state):\n    if complete(state):\n        record solution\n        return\n    for choice in choices(state):\n        if valid(choice):\n            apply(choice)\n            backtrack(state)\n            undo(choice)\n```",
    "domain": "Data Structures and Algorithms",
    "source": "DSA LLM Knowledge Base v1",
    "type": "instructional_knowledge",
    "category": "General",
    "subcategory": "General"
  },
  {
    "id": "0_1_knapsack_1d_template",
    "title": "0/1 Knapsack 1D Template",
    "content": "```text\ndp[0..W] = 0\nfor each item (weight, value):\n    for capacity from W down to weight:\n        dp[capacity] = max(dp[capacity],\n                           value + dp[capacity-weight])\n```\n\n\n# Assessment Bank",
    "domain": "Data Structures and Algorithms",
    "source": "DSA LLM Knowledge Base v1",
    "type": "instructional_knowledge",
    "category": "General",
    "subcategory": "General"
  },
  {
    "id": "fundamentals",
    "title": "Fundamentals",
    "content": "1. What does O(n log n) mean asymptotically?\n2. Why is array indexing O(1)?\n3. Give an example where an O(n²) algorithm is preferable to a more complicated algorithm because n is very small.\n4. Explain the difference between time complexity and auxiliary space complexity.\n5. What is the difference between worst-case and amortized analysis?",
    "domain": "Data Structures and Algorithms",
    "source": "DSA LLM Knowledge Base v1",
    "type": "instructional_knowledge",
    "category": "General",
    "subcategory": "General"
  },
  {
    "id": "arrays_strings",
    "title": "Arrays / Strings",
    "content": "6. Reverse an array in-place.\n7. Find the second-largest distinct element.\n8. Move zeroes to the end while preserving relative order.\n9. Find the longest subarray with sum at most K when all numbers are non-negative.\n10. Determine whether two strings are anagrams.",
    "domain": "Data Structures and Algorithms",
    "source": "DSA LLM Knowledge Base v1",
    "type": "instructional_knowledge",
    "category": "General",
    "subcategory": "General"
  },
  {
    "id": "linked_lists",
    "title": "Linked Lists",
    "content": "11. Reverse a singly linked list.\n12. Detect whether a linked list contains a cycle.\n13. Find the node at the middle of a linked list.\n14. Merge two sorted linked lists.\n15. Remove the nth node from the end.",
    "domain": "Data Structures and Algorithms",
    "source": "DSA LLM Knowledge Base v1",
    "type": "instructional_knowledge",
    "category": "General",
    "subcategory": "General"
  },
  {
    "id": "stack_queue",
    "title": "Stack / Queue",
    "content": "16. Validate parentheses such as `([]{})`.\n17. Evaluate postfix notation.\n18. Implement a queue using two stacks.\n19. Design a stack supporting O(1) minimum retrieval.\n20. Explain why BFS uses a queue.",
    "domain": "Data Structures and Algorithms",
    "source": "DSA LLM Knowledge Base v1",
    "type": "instructional_knowledge",
    "category": "General",
    "subcategory": "General"
  },
  {
    "id": "trees",
    "title": "Trees",
    "content": "21. Give preorder, inorder, and postorder traversals for a given tree.\n22. Find the height of a binary tree.\n23. Validate whether a tree is a BST.\n24. Find the lowest common ancestor.\n25. Explain why inorder traversal of a BST is sorted.",
    "domain": "Data Structures and Algorithms",
    "source": "DSA LLM Knowledge Base v1",
    "type": "instructional_knowledge",
    "category": "General",
    "subcategory": "General"
  },
  {
    "id": "graphs",
    "title": "Graphs",
    "content": "26. Find connected components using DFS.\n27. Find shortest path in an unweighted graph.\n28. Determine whether a directed graph contains a cycle.\n29. Produce a topological ordering.\n30. Explain when Dijkstra is valid.\n31. Detect a negative cycle reachable from a source using Bellman-Ford.\n32. Find an MST using Kruskal.",
    "domain": "Data Structures and Algorithms",
    "source": "DSA LLM Knowledge Base v1",
    "type": "instructional_knowledge",
    "category": "General",
    "subcategory": "General"
  },
  {
    "id": "dp_advanced",
    "title": "DP / Advanced",
    "content": "33. Solve climbing stairs with DP.\n34. Solve 0/1 knapsack.\n35. Find LCS length.\n36. Find LIS length.\n37. Explain memoization vs tabulation.\n38. Implement a trie.\n39. Answer range sums with a Fenwick tree.\n40. Explain when a segment tree is preferable to a Fenwick tree.\n\n# Interview-style conceptual questions\n- Why can a hash table be O(n) in the worst case?\n- Why does BFS find shortest paths in unweighted graphs?\n- Why does Dijkstra fail with negative edge weights?\n- Why is bottom-up heap construction O(n)?\n- Why does a balanced BST give logarithmic operations?\n- What makes a DP state sufficient?\n- When does a greedy algorithm require a proof?\n- What is the difference between a substring and a subsequence?\n- What is the difference between a tree and a general graph?\n- Why does path compression make DSU extremely efficient?\n\n# Difficulty labels\n**Easy:** direct implementation or one known concept.  \n**Medium:** requires combining one or two patterns or handling edge cases.  \n**Hard:** requires non-obvious state design, advanced data structures, proof, or multiple techniques.\n\n\n# LLM Answering Rules for DSA\n\nWhen a student asks a DSA question:\n1. Identify the exact topic.\n2. State prerequisites if the student appears unfamiliar with them.\n3. Give an intuitive explanation.\n4. Give the formal definition.\n5. Walk through a small example.\n6. Give pseudocode before full code unless code is explicitly requested.\n7. State time and auxiliary-space complexity.\n8. Mention assumptions and edge cases.\n9. Offer one easier and one harder follow-up problem.\n\nWhen a student submits code:\n- first identify whether the code is syntactically valid in the stated language;\n- then explain the logic;\n- identify the first correctness issue rather than rewriting everything immediately;\n- provide a minimal fix;\n- analyze complexity;\n- test against a counterexample if possible.\n\nWhen generating MCQs:\n- exactly one answer should be unambiguously best unless the question explicitly allows multiple answers;\n- distractors should represent plausible misconceptions;\n- include an explanation for the correct answer;\n- do not rely on trivia unrelated to learning objectives.\n\nWhen generating coding problems:\n- provide constraints;\n- define input/output clearly;\n- include examples;\n- include edge cases;\n- specify expected complexity only when the exercise is intended to teach optimization;\n- never leak the full solution in the problem statement.\n\nWhen unsure:\n- say what assumption is being made;\n- do not invent a complexity guarantee;\n- distinguish a general rule from a language-specific implementation detail.",
    "domain": "Data Structures and Algorithms",
    "source": "DSA LLM Knowledge Base v1",
    "type": "instructional_knowledge",
    "category": "General",
    "subcategory": "General"
  },
  {
    "id": "data-01",
    "title": "Data vs Information",
    "category": "Data Structures",
    "subcategory": "Foundations",
    "difficulty": "beginner",
    "content_type": "concept",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "data",
      "information",
      "representation"
    ],
    "learning_objectives": [
      "Distinguish raw data from a data representation and explain why representation affects algorithmic cost."
    ],
    "content": "Data is a representation of facts or values that a program can store and process. Information is data interpreted in a useful context. In DSA, the important question is how data is represented because representation determines the operations that are cheap or expensive. For example, a set of student IDs can be represented as an unsorted array, a sorted array, a hash set, or a balanced search tree; all represent the same logical collection but support different operations with different guarantees.",
    "examples": [],
    "complexity": {},
    "related_topics": [
      "data-02",
      "ds-adt"
    ],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "data-02",
    "title": "Data Structure vs Abstract Data Type",
    "category": "Data Structures",
    "subcategory": "Foundations",
    "difficulty": "beginner",
    "content_type": "concept",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "ADT",
      "interface",
      "implementation",
      "stack"
    ],
    "learning_objectives": [
      "Explain ADT vs implementation and give multiple implementations of one ADT."
    ],
    "content": "An abstract data type (ADT) specifies behavior and supported operations without committing to a representation. A stack ADT promises operations such as push, pop and top with LIFO semantics. It can be implemented using an array, linked list, or dynamic buffer. A data structure is the concrete organization used to implement an ADT. Keeping the interface separate from representation helps reason about correctness and lets implementations change without changing client code.",
    "examples": [],
    "complexity": {},
    "related_topics": [
      "stack",
      "queue"
    ],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "data-03",
    "title": "Linear vs Nonlinear Structures",
    "category": "Data Structures",
    "subcategory": "Foundations",
    "difficulty": "beginner",
    "content_type": "concept",
    "prerequisites": [
      "data-01"
    ],
    "keywords": [
      "linear",
      "nonlinear",
      "array",
      "tree",
      "graph"
    ],
    "learning_objectives": [
      "Classify common structures and explain the logical basis of the classification."
    ],
    "content": "Linear structures arrange elements along a sequential relationship, such as arrays, linked lists, stacks and queues. Nonlinear structures represent branching or network relationships, such as trees and graphs. The classification is about logical organization, not necessarily physical memory. A heap is nonlinear logically even though it is commonly stored in a linear array.",
    "examples": [],
    "complexity": {},
    "related_topics": [
      "arrays",
      "linked-lists",
      "trees",
      "graphs"
    ],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "complexity-01",
    "title": "Amortized Analysis",
    "category": "Algorithms",
    "subcategory": "Complexity",
    "difficulty": "advanced",
    "content_type": "concept",
    "prerequisites": [
      "Big-O",
      "dynamic arrays"
    ],
    "keywords": [
      "amortized",
      "dynamic array",
      "aggregate method",
      "potential method"
    ],
    "learning_objectives": [
      "Distinguish amortized from average-case analysis and explain dynamic-array append."
    ],
    "content": "Amortized analysis bounds the average cost per operation over a sequence of operations without relying on a probability distribution. A dynamic array append is normally O(1), but when capacity is exhausted a resize copies O(n) elements. With geometric growth, the expensive resizes occur infrequently enough that the total cost of m appends is O(m), giving O(1) amortized append. This is different from average-case analysis, which usually assumes a distribution over inputs.",
    "examples": [],
    "complexity": {
      "amortized_append": "O(1)",
      "single_resize": "O(n)"
    },
    "related_topics": [
      "arrays",
      "dynamic-arrays"
    ],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "complexity-02",
    "title": "Recurrence Relations",
    "category": "Algorithms",
    "subcategory": "Complexity",
    "difficulty": "intermediate",
    "content_type": "concept",
    "prerequisites": [
      "recursion",
      "Big-O"
    ],
    "keywords": [
      "recurrence",
      "T(n)",
      "master theorem",
      "recursion tree"
    ],
    "learning_objectives": [
      "Translate recursive code into a recurrence and solve common recurrence forms."
    ],
    "content": "A recurrence expresses the cost of a recursive algorithm in terms of smaller input sizes. Merge sort satisfies T(n)=2T(n/2)+Theta(n): two recursive halves plus linear merging. Solving recurrences lets you derive complexity instead of guessing it. Common techniques include substitution, recursion trees, the Master Theorem, and recursion-tree level summation.",
    "examples": [],
    "complexity": {},
    "related_topics": [
      "merge-sort",
      "quick-sort",
      "divide-and-conquer"
    ],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "complexity-03",
    "title": "Master Theorem",
    "category": "Algorithms",
    "subcategory": "Complexity",
    "difficulty": "advanced",
    "content_type": "concept",
    "prerequisites": [
      "recurrence relations"
    ],
    "keywords": [
      "master theorem",
      "divide conquer",
      "recurrence"
    ],
    "learning_objectives": [
      "Apply the standard Master Theorem cases and recognize when its form does not apply."
    ],
    "content": "For recurrences of the form T(n)=aT(n/b)+f(n), compare f(n) with n^{log_b a}. In the common polynomially separated cases: if f(n)=O(n^{log_b a-epsilon}), T(n)=Theta(n^{log_b a}); if f(n)=Theta(n^{log_b a} log^k n), T(n)=Theta(n^{log_b a} log^{k+1} n); if f(n)=Omega(n^{log_b a+epsilon}) and a regularity condition holds, T(n)=Theta(f(n)). It is a tool with assumptions, not a universal shortcut for every recurrence.",
    "examples": [],
    "complexity": {},
    "related_topics": [
      "merge-sort",
      "binary-search",
      "divide-and-conquer"
    ],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "complexity-04",
    "title": "Loop Complexity Patterns",
    "category": "Algorithms",
    "subcategory": "Complexity",
    "difficulty": "beginner",
    "content_type": "concept",
    "prerequisites": [
      "Big-O",
      "loops"
    ],
    "keywords": [
      "nested loops",
      "logarithmic loop",
      "triangular loop"
    ],
    "learning_objectives": [
      "Analyze common loop structures by counting executions rather than pattern-matching syntax."
    ],
    "content": "Nested loops do not automatically mean O(n^2), and sequential loops do not automatically combine multiplicatively. Two independent loops of lengths n and m cost O(n+m). A loop whose index doubles each iteration is O(log n). A triangular loop such as for i=1..n and j=1..i performs n(n+1)/2 iterations, hence O(n^2). The right method is to count total executions, including how loop bounds depend on one another.",
    "examples": [],
    "complexity": {},
    "related_topics": [
      "complexity-05"
    ],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "complexity-05",
    "title": "Space Complexity and Auxiliary Space",
    "category": "Algorithms",
    "subcategory": "Complexity",
    "difficulty": "intermediate",
    "content_type": "concept",
    "prerequisites": [
      "Big-O"
    ],
    "keywords": [
      "space complexity",
      "auxiliary space",
      "call stack"
    ],
    "learning_objectives": [
      "Report input, auxiliary and total space precisely and account for recursion stacks."
    ],
    "content": "Space complexity measures memory used as input size grows. Auxiliary space focuses on extra memory beyond the input representation, while some conventions count the input storage too. A recursive DFS on a tree can use O(h) call-stack space, where h is height. A merge sort implementation usually needs O(n) auxiliary array storage. When reporting space, state the convention and distinguish the data structure itself from temporary working memory.",
    "examples": [],
    "complexity": {},
    "related_topics": [
      "recursion",
      "merge-sort",
      "trees",
      "graphs"
    ],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "array-dynamic",
    "title": "Dynamic Arrays",
    "category": "Arrays",
    "subcategory": "Representation",
    "difficulty": "intermediate",
    "content_type": "concept",
    "prerequisites": [
      "arrays"
    ],
    "keywords": [
      "dynamic array",
      "capacity",
      "size",
      "resize"
    ],
    "learning_objectives": [
      "Explain size vs capacity, resizing, and amortized append."
    ],
    "content": "A dynamic array maintains a contiguous logical sequence while reserving capacity larger than its current size. When full, it allocates a larger block, commonly by geometric growth, copies elements, and replaces the old storage. The important invariant is size <= capacity. Random access remains O(1); append is O(1) amortized, while an individual resize is O(n).",
    "examples": [],
    "complexity": {
      "access": "O(1)",
      "append_amortized": "O(1)",
      "resize": "O(n)"
    },
    "related_topics": [
      "arrays"
    ],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "array-2d",
    "title": "Two-Dimensional Arrays and Memory Layout",
    "category": "Arrays",
    "subcategory": "Representation",
    "difficulty": "intermediate",
    "content_type": "concept",
    "prerequisites": [
      "arrays"
    ],
    "keywords": [
      "2D array",
      "matrix",
      "row-major",
      "column-major"
    ],
    "learning_objectives": [
      "Reason about matrix indexing, dimensions and traversal order."
    ],
    "content": "A 2D array can be modeled as rows and columns. In row-major storage, consecutive elements of a row are adjacent; in column-major storage, consecutive elements of a column are adjacent. Traversal order affects cache locality. A matrix rotation or transpose must respect dimensions and whether the operation is in-place.",
    "examples": [],
    "complexity": {
      "access": "O(1)",
      "full_traversal": "O(rows*cols)"
    },
    "related_topics": [
      "matrix-transpose",
      "matrix-rotation"
    ],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "linked-doubly",
    "title": "Doubly Linked Lists",
    "category": "Linked Lists",
    "subcategory": "Variants",
    "difficulty": "intermediate",
    "content_type": "concept",
    "prerequisites": [
      "linked lists"
    ],
    "keywords": [
      "doubly linked list",
      "prev",
      "next"
    ],
    "learning_objectives": [
      "Implement safe insertion and deletion while maintaining both directions."
    ],
    "content": "Each node stores data plus next and previous references. The previous link allows constant-time deletion of a known node and bidirectional traversal, provided the surrounding links are updated correctly. Insertion before a known node can also be O(1). The cost is extra memory and more pointer updates, which create more opportunities for bugs.",
    "examples": [],
    "complexity": {
      "known_node_insert": "O(1)",
      "known_node_delete": "O(1)",
      "search": "O(n)"
    },
    "related_topics": [
      "linked-lists"
    ],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "linked-circular",
    "title": "Circular Linked Lists",
    "category": "Linked Lists",
    "subcategory": "Variants",
    "difficulty": "intermediate",
    "content_type": "concept",
    "prerequisites": [
      "linked lists"
    ],
    "keywords": [
      "circular list",
      "tail pointer",
      "round robin"
    ],
    "learning_objectives": [
      "Traverse and update circular lists without infinite loops."
    ],
    "content": "A circular linked list has no null terminator at the end; the final node points back to the first. It is useful for round-robin scheduling and cyclic iteration. A tail pointer can make insertion at the front or after the tail efficient. Traversal must use a stopping condition based on returning to the starting node rather than checking for null.",
    "examples": [],
    "complexity": {
      "search": "O(n)",
      "insert_after_known": "O(1)"
    },
    "related_topics": [
      "linked-lists",
      "queues"
    ],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "stack-array",
    "title": "Array-Based Stack",
    "category": "Stacks",
    "subcategory": "Implementation",
    "difficulty": "beginner",
    "content_type": "implementation",
    "prerequisites": [
      "stack",
      "arrays"
    ],
    "keywords": [
      "stack implementation",
      "top index",
      "overflow"
    ],
    "learning_objectives": [
      "Implement a stack with safe empty and capacity handling."
    ],
    "content": "A stack can use a dynamic array with the top at the last occupied index. Push appends; pop removes the last element; top reads the last element. This avoids shifting and gives O(1) amortized push and O(1) pop. An explicit fixed-capacity stack instead needs overflow checks.",
    "examples": [],
    "complexity": {
      "push": "O(1) amortized",
      "pop": "O(1)",
      "peek": "O(1)"
    },
    "related_topics": [
      "stack"
    ],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "queue-circular",
    "title": "Circular Queue",
    "category": "Queues",
    "subcategory": "Implementation",
    "difficulty": "intermediate",
    "content_type": "concept",
    "prerequisites": [
      "queue",
      "arrays"
    ],
    "keywords": [
      "circular queue",
      "ring buffer",
      "modulo"
    ],
    "learning_objectives": [
      "Explain and implement enqueue/dequeue without shifting elements."
    ],
    "content": "A fixed-size circular queue treats the underlying array as a ring. Front points to the next item to remove and rear points to the next free position, with indices wrapped using modulo capacity. Full and empty states need an unambiguous convention, such as storing size or reserving one slot.",
    "examples": [],
    "complexity": {
      "enqueue": "O(1)",
      "dequeue": "O(1)"
    },
    "related_topics": [
      "queue"
    ],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "hash-load",
    "title": "Hash Table Load Factor and Resizing",
    "category": "Hashing",
    "subcategory": "Implementation",
    "difficulty": "intermediate",
    "content_type": "concept",
    "prerequisites": [
      "hash tables"
    ],
    "keywords": [
      "load factor",
      "resize",
      "rehash",
      "collision"
    ],
    "learning_objectives": [
      "Explain why resizing is necessary and why it does not destroy amortized insertion performance."
    ],
    "content": "Load factor alpha = entries/buckets. As alpha grows, collisions generally become more frequent. Implementations therefore resize when a threshold is reached, reallocate buckets, and rehash existing keys because bucket positions depend on table capacity. The resize itself costs O(n), but with geometric growth the resizing cost can be amortized over insertions.",
    "examples": [],
    "complexity": {
      "lookup_average": "O(1) expected",
      "resize": "O(n)",
      "insert_amortized": "O(1) expected"
    },
    "related_topics": [
      "hashing"
    ],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "heap-max",
    "title": "Max Heap",
    "category": "Heaps",
    "subcategory": "Variants",
    "difficulty": "beginner",
    "content_type": "concept",
    "prerequisites": [
      "heaps",
      "arrays"
    ],
    "keywords": [
      "max heap",
      "heap order",
      "complete tree"
    ],
    "learning_objectives": [
      "Use a max heap for repeated maximum extraction and priority queues."
    ],
    "content": "A max heap is a complete binary tree in which every parent is at least as large as its children. The root therefore contains the maximum element, but the remaining elements are not globally sorted. In a zero-based array, children of i are 2i+1 and 2i+2. Sift-up restores the heap after insertion; sift-down restores it after extraction.",
    "examples": [],
    "complexity": {
      "peek": "O(1)",
      "insert": "O(log n)",
      "extract_max": "O(log n)",
      "build": "O(n)"
    },
    "related_topics": [
      "heaps",
      "priority-queue"
    ],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "bst-invariants",
    "title": "BST Invariants and Validation",
    "category": "Trees",
    "subcategory": "BST",
    "difficulty": "intermediate",
    "content_type": "concept",
    "prerequisites": [
      "binary trees",
      "BST"
    ],
    "keywords": [
      "BST invariant",
      "validation",
      "duplicates",
      "range"
    ],
    "learning_objectives": [
      "Validate BSTs correctly and explain why local child comparisons are insufficient."
    ],
    "content": "A BST invariant must hold for every node, not merely between a node and its immediate children. A robust validation method carries an allowed value range down the recursion or checks whether inorder traversal is strictly/non-strictly ordered according to the duplicate policy. The duplicate policy must be explicit because different BST implementations place equal keys differently.",
    "examples": [],
    "complexity": {
      "validation": "O(n)",
      "auxiliary": "O(h)"
    },
    "related_topics": [
      "bst"
    ],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "tree-height",
    "title": "Tree Height vs Depth",
    "category": "Trees",
    "subcategory": "Terminology",
    "difficulty": "beginner",
    "content_type": "concept",
    "prerequisites": [
      "binary trees"
    ],
    "keywords": [
      "depth",
      "height",
      "level"
    ],
    "learning_objectives": [
      "Distinguish depth, height and level and avoid off-by-one convention errors."
    ],
    "content": "Depth of a node is its distance from the root; the root has depth zero under the common convention. Height of a node is the number of edges on the longest downward path to a leaf; the height of a tree is the root height. Some texts define height in nodes instead, so a solution should state its convention. Many tree algorithms are expressed in terms of height h.",
    "examples": [],
    "complexity": {},
    "related_topics": [
      "trees"
    ],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "graph-degree",
    "title": "Graph Degree and Handshaking",
    "category": "Graphs",
    "subcategory": "Foundations",
    "difficulty": "intermediate",
    "content_type": "concept",
    "prerequisites": [
      "graphs"
    ],
    "keywords": [
      "degree",
      "indegree",
      "outdegree",
      "handshaking lemma"
    ],
    "learning_objectives": [
      "Compute degree counts and use edge-degree identities to validate input."
    ],
    "content": "In an undirected graph, the degree of a vertex is the number of incident edges. The sum of all vertex degrees equals 2E because every edge contributes two endpoints. In a directed graph, indegree counts incoming edges and outdegree counts outgoing edges; the sum of indegrees and the sum of outdegrees each equal E. These identities are useful for sanity-checking graph representations and algorithms.",
    "examples": [],
    "complexity": {},
    "related_topics": [
      "graphs"
    ],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "graph-connectivity",
    "title": "Connected Components",
    "category": "Graphs",
    "subcategory": "Connectivity",
    "difficulty": "beginner",
    "content_type": "concept",
    "prerequisites": [
      "graphs",
      "BFS",
      "DFS"
    ],
    "keywords": [
      "connected component",
      "reachability"
    ],
    "learning_objectives": [
      "Count and construct components using repeated traversal."
    ],
    "content": "A connected component of an undirected graph is a maximal set of vertices mutually reachable by paths. Run DFS or BFS from every unvisited vertex; each new traversal identifies one component. For directed graphs, ordinary connectivity and strong connectivity are different concepts. A full traversal must not assume the graph is connected.",
    "examples": [],
    "complexity": {
      "time": "O(V+E)",
      "space": "O(V)"
    },
    "related_topics": [
      "bfs",
      "dfs",
      "scc"
    ],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "graph-bipartite",
    "title": "Bipartite Graphs",
    "category": "Graphs",
    "subcategory": "Properties",
    "difficulty": "intermediate",
    "content_type": "concept",
    "prerequisites": [
      "graphs",
      "BFS",
      "DFS"
    ],
    "keywords": [
      "bipartite",
      "two-coloring",
      "odd cycle"
    ],
    "learning_objectives": [
      "Test bipartiteness and explain the odd-cycle characterization."
    ],
    "content": "A graph is bipartite if its vertices can be split into two sets such that every edge crosses between the sets. Equivalently, an undirected graph is bipartite exactly when it contains no odd cycle. BFS or DFS can color vertices with two colors; an edge joining equal colors proves the graph is not bipartite. Disconnected graphs require starting a traversal from every uncolored vertex.",
    "examples": [],
    "complexity": {
      "time": "O(V+E)",
      "space": "O(V)"
    },
    "related_topics": [
      "bfs",
      "dfs"
    ],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-linear-search",
    "title": "Linear Search",
    "category": "Searching",
    "subcategory": "Basic",
    "difficulty": "beginner",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "linear search",
      "searching",
      "basic"
    ],
    "learning_objectives": [
      "Understand and implement Linear Search.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "linear search scans elements from left to right until a matching element is found or the sequence ends. It requires no ordering assumption and is the baseline against which faster specialized searches are compared.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\ni=0; while i<n and A[i] != target: i+=1; return i if i<n else -1\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "best": "O(1)",
      "average": "O(n)",
      "worst": "O(n)",
      "space": "O(1)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-binary-search",
    "title": "Binary Search",
    "category": "Searching",
    "subcategory": "Basic",
    "difficulty": "beginner",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "binary search",
      "searching",
      "basic"
    ],
    "learning_objectives": [
      "Understand and implement Binary Search.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "binary search maintains a sorted/monotonic search interval and discards half of it after each comparison. The loop invariant is that if the target exists, it remains inside the current interval.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nlo=0; hi=n-1; while lo<=hi: mid=lo+(hi-lo)//2; if A[mid]==x return mid; if A[mid]<x lo=mid+1; else hi=mid-1; return -1\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "best": "O(1)",
      "average": "O(log n)",
      "worst": "O(log n)",
      "space": "O(1) iterative"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-lower-bound",
    "title": "Lower Bound",
    "category": "Searching",
    "subcategory": "Binary Search Variants",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "lower bound",
      "searching",
      "binary search variants"
    ],
    "learning_objectives": [
      "Understand and implement Lower Bound.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "lower_bound returns the first index i for which A[i] >= target in a sorted ascending array. Unlike ordinary binary search, it continues after finding an equal value because an earlier occurrence may exist. The same pattern generalizes to finding insertion positions and the first true value of a monotonic predicate.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nlo=0; hi=n; while lo<hi: mid=lo+(hi-lo)//2; if A[mid]<x: lo=mid+1; else: hi=mid; return lo\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "worst": "O(log n)",
      "space": "O(1)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-bubble",
    "title": "Bubble Sort",
    "category": "Sorting",
    "subcategory": "Comparison Sorts",
    "difficulty": "beginner",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "bubble sort",
      "sorting",
      "comparison sorts"
    ],
    "learning_objectives": [
      "Understand and implement Bubble Sort.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "bubble sort repeatedly compares adjacent elements and swaps inverted pairs. After one full pass, the largest remaining element reaches the end. With an early-exit flag, already sorted input takes O(n); without that optimization the standard nested-loop version remains O(n^2) even on sorted input.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nfor end=n-1 downto 1: swapped=false; for i=0..end-1: if A[i]>A[i+1] swap; swapped=true; if not swapped break\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "best": "O(n) optimized",
      "average": "O(n^2)",
      "worst": "O(n^2)",
      "space": "O(1)",
      "stable": "yes"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-selection",
    "title": "Selection Sort",
    "category": "Sorting",
    "subcategory": "Comparison Sorts",
    "difficulty": "beginner",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "selection sort",
      "sorting",
      "comparison sorts"
    ],
    "learning_objectives": [
      "Understand and implement Selection Sort.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "selection sort divides the array into a sorted prefix and unsorted suffix. At each position it selects the smallest remaining element and swaps it into place. It performs O(n^2) comparisons regardless of initial order, but uses O(1) auxiliary space and can minimize the number of writes.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nfor i=0..n-2: m=i; for j=i+1..n-1: if A[j]<A[m]: m=j; swap(A[i],A[m])\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "best": "O(n^2)",
      "average": "O(n^2)",
      "worst": "O(n^2)",
      "space": "O(1)",
      "stable": "usually no"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-insertion",
    "title": "Insertion Sort",
    "category": "Sorting",
    "subcategory": "Comparison Sorts",
    "difficulty": "beginner",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "insertion sort",
      "sorting",
      "comparison sorts"
    ],
    "learning_objectives": [
      "Understand and implement Insertion Sort.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "insertion sort grows a sorted prefix by taking the next element and shifting larger prefix elements right until the correct location is found. It is adaptive and excellent for small or nearly sorted inputs.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nfor i=1..n-1: key=A[i]; j=i-1; while j>=0 and A[j]>key: A[j+1]=A[j]; j-=1; A[j+1]=key\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "best": "O(n)",
      "average": "O(n^2)",
      "worst": "O(n^2)",
      "space": "O(1)",
      "stable": "yes"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-merge",
    "title": "Merge Sort",
    "category": "Sorting",
    "subcategory": "Divide and Conquer",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "merge sort",
      "sorting",
      "divide and conquer"
    ],
    "learning_objectives": [
      "Understand and implement Merge Sort.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "merge sort recursively sorts halves then merges two sorted lists. During merging, choose the smaller front element; if equal and stability is desired, choose from the left half first. The recurrence is 2T(n/2)+Theta(n), giving Theta(n log n).\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nsplit array; recursively sort left and right; merge with two pointers\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "best": "O(n log n)",
      "average": "O(n log n)",
      "worst": "O(n log n)",
      "space": "O(n) typical",
      "stable": "yes"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-quick",
    "title": "Quick Sort",
    "category": "Sorting",
    "subcategory": "Divide and Conquer",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "quick sort",
      "sorting",
      "divide and conquer"
    ],
    "learning_objectives": [
      "Understand and implement Quick Sort.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "quicksort partitions around a pivot and recursively sorts the resulting regions. Balanced partitions produce logarithmic recursion depth and n log n work; repeatedly choosing a poor pivot can create a chain and n^2 work. Randomization reduces the chance of consistently poor pivots under common input models.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nchoose pivot; partition elements around pivot; recursively sort left/right\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "average": "O(n log n)",
      "worst": "O(n^2)",
      "expected": "O(n log n) randomized",
      "space": "O(log n) expected stack; O(n) worst stack"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-counting",
    "title": "Counting Sort",
    "category": "Sorting",
    "subcategory": "Non-Comparison Sorts",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "counting sort",
      "sorting",
      "non-comparison sorts"
    ],
    "learning_objectives": [
      "Understand and implement Counting Sort.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "counting sort counts occurrences of integer keys in a known bounded range, then converts counts into positions or cumulative counts. It can beat comparison sorting when the key range k is not much larger than n. Negative keys can be handled by offsetting the range.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\ncount frequencies; prefix cumulative counts if stable placement is needed; place elements using counts; restore\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(n+k)",
      "space": "O(n+k) stable version"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-radix",
    "title": "Radix Sort",
    "category": "Sorting",
    "subcategory": "Non-Comparison Sorts",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "radix sort",
      "sorting",
      "non-comparison sorts"
    ],
    "learning_objectives": [
      "Understand and implement Radix Sort.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "radix sort processes keys digit by digit using a stable inner sort such as counting sort. LSD radix sort processes least-significant digits first and requires each pass to be stable. Complexity is O(d(n+k)) for d digits and base/range k under the standard model.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nfor each digit from least significant to most: stable-sort by current digit\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(d(n+k))",
      "space": "O(n+k)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-kadane",
    "title": "Kadane’s Algorithm",
    "category": "Arrays",
    "subcategory": "Subarray Patterns",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "kadane’s algorithm",
      "arrays",
      "subarray patterns"
    ],
    "learning_objectives": [
      "Understand and implement Kadane’s Algorithm.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "Kadane maintains the best subarray sum ending at the current position. At each value x, either extend the previous subarray or start a new one at x. The global maximum is the largest ending-state encountered. For all-negative input, initialize from the first element rather than zero if the problem requires a non-empty subarray.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nbestEnd=A[0]; best=A[0]; for x in A[1:]: bestEnd=max(x,bestEnd+x); best=max(best,bestEnd)\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(n)",
      "space": "O(1)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-prefix",
    "title": "Prefix Sum",
    "category": "Arrays",
    "subcategory": "Preprocessing",
    "difficulty": "beginner",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "prefix sum",
      "arrays",
      "preprocessing"
    ],
    "learning_objectives": [
      "Understand and implement Prefix Sum.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "prefix sums precompute cumulative totals. With P[0]=0 and P[i+1]=P[i]+A[i], sum(l..r)=P[r+1]-P[l]. This converts repeated static range-sum queries from O(length) to O(1) after O(n) preprocessing.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nP[0]=0; for i in 0..n-1: P[i+1]=P[i]+A[i]; query(l,r)=P[r+1]-P[l]\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "build": "O(n)",
      "query": "O(1)",
      "space": "O(n)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-diff",
    "title": "Difference Array",
    "category": "Arrays",
    "subcategory": "Range Updates",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "difference array",
      "arrays",
      "range updates"
    ],
    "learning_objectives": [
      "Understand and implement Difference Array.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "difference arrays represent range additions compactly. For adding x to [l,r], do diff[l]+=x and diff[r+1]-=x when r+1 is inside the allocated sentinel range. A prefix accumulation reconstructs the final array. This is ideal for many offline range updates followed by a final materialization.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\ndiff[l]+=x; diff[r+1]-=x; after all updates: running += diff[i]; A[i]=running\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "updates": "O(1) each",
      "reconstruct": "O(n)",
      "space": "O(n)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-two-pointer",
    "title": "Two-Pointer Pair Sum",
    "category": "Arrays",
    "subcategory": "Two Pointers",
    "difficulty": "beginner",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "two-pointer pair sum",
      "arrays",
      "two pointers"
    ],
    "learning_objectives": [
      "Understand and implement Two-Pointer Pair Sum.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "on a sorted array, place one pointer at each end. If the sum is too small, move the left pointer right; if too large, move the right pointer left. This is correct because sorted order tells us which side can change the sum in the needed direction.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nl=0; r=n-1; while l<r: s=A[l]+A[r]; if s==target return; if s<target l+=1; else r-=1\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(n)",
      "space": "O(1)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-sliding-fixed",
    "title": "Fixed-Size Sliding Window",
    "category": "Arrays",
    "subcategory": "Sliding Window",
    "difficulty": "beginner",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "fixed-size sliding window",
      "arrays",
      "sliding window"
    ],
    "learning_objectives": [
      "Understand and implement Fixed-Size Sliding Window.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "maintain the sum or aggregate for exactly k consecutive elements. Build the first window, then for each new right endpoint remove the outgoing element and add the incoming one. Each element enters and leaves at most once.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nwindow=sum(A[0:k]); ans=window; for r=k..n-1: window += A[r]-A[r-k]; ans=update(ans,window)\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(n)",
      "space": "O(1)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-floyd-cycle",
    "title": "Floyd Cycle Detection",
    "category": "Linked Lists",
    "subcategory": "Pointers",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "floyd cycle detection",
      "linked lists",
      "pointers"
    ],
    "learning_objectives": [
      "Understand and implement Floyd Cycle Detection.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "Floyd’s tortoise-and-hare algorithm uses a slow pointer moving one step and a fast pointer moving two steps. If a cycle exists, the pointers eventually meet inside the cycle. To find the cycle entry, reset one pointer to the head and move both one step at a time until they meet.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nslow=head; fast=head; while fast and fast.next: slow=slow.next; fast=fast.next.next; if slow==fast: break; reset slow=head; move both one step to entry\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(n)",
      "space": "O(1)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-reverse-list",
    "title": "Reverse Singly Linked List",
    "category": "Linked Lists",
    "subcategory": "Core Algorithms",
    "difficulty": "beginner",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "reverse singly linked list",
      "linked lists",
      "core algorithms"
    ],
    "learning_objectives": [
      "Understand and implement Reverse Singly Linked List.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "iteratively reverse links using prev, cur, and next. Save cur.next before overwriting it, point cur.next to prev, then advance both pointers. The invariant is that prev is the head of the already reversed prefix and cur is the first node not yet reversed.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nprev=null; cur=head; while cur: nxt=cur.next; cur.next=prev; prev=cur; cur=nxt; return prev\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(n)",
      "space": "O(1)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-balance",
    "title": "Balanced Parentheses",
    "category": "Stacks",
    "subcategory": "Parsing",
    "difficulty": "beginner",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "balanced parentheses",
      "stacks",
      "parsing"
    ],
    "learning_objectives": [
      "Understand and implement Balanced Parentheses.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "push opening delimiters onto a stack. For a closing delimiter, the stack must be nonempty and its top must be the matching opener. At the end the stack must be empty. This handles arbitrary nesting depth and multiple delimiter types.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nfor c in s: if opener push; else if stack empty or mismatch return false; pop; return stack empty\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(n)",
      "space": "O(n)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-monotonic-stack",
    "title": "Monotonic Stack / Next Greater Element",
    "category": "Stacks",
    "subcategory": "Advanced Patterns",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "monotonic stack / next greater element",
      "stacks",
      "advanced patterns"
    ],
    "learning_objectives": [
      "Understand and implement Monotonic Stack / Next Greater Element.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "maintain a stack of indices whose values are monotonic. For next-greater-element, while the current value exceeds the value at the top index, the current value is the answer for that popped index. Each index is pushed and popped at most once, producing linear total work.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nfor i=0..n-1: while stack and A[stack.top]<A[i]: ans[stack.pop]=A[i]; stack.push(i)\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(n)",
      "space": "O(n)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-queue-two-stacks",
    "title": "Queue Using Two Stacks",
    "category": "Queues",
    "subcategory": "Design",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "queue using two stacks",
      "queues",
      "design"
    ],
    "learning_objectives": [
      "Understand and implement Queue Using Two Stacks.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "use an input stack for enqueues and an output stack for dequeues. When output is empty, move all elements from input to output; this reverses order and exposes the oldest item. Each element crosses stacks at most once per transfer cycle, giving O(1) amortized dequeue.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nenqueue: in.push(x); dequeue: if out empty move all in to out; pop out\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "enqueue": "O(1)",
      "dequeue": "O(1) amortized",
      "worst_single_dequeue": "O(n)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-bfs",
    "title": "Breadth-First Search",
    "category": "Graphs",
    "subcategory": "Traversal",
    "difficulty": "beginner",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "breadth-first search",
      "graphs",
      "traversal"
    ],
    "learning_objectives": [
      "Understand and implement Breadth-First Search.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "BFS explores vertices by distance layers using a queue. Mark vertices visited when enqueuing them, not later, to prevent duplicate enqueues. With an adjacency list, every vertex and edge is processed a constant number of times.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nqueue=[s]; visited[s]=true; while queue: u=pop_front; for v in adj[u]: if not visited[v]: visited[v]=true; parent[v]=u; push(v)\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(V+E)",
      "space": "O(V)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-dfs",
    "title": "Depth-First Search",
    "category": "Graphs",
    "subcategory": "Traversal",
    "difficulty": "beginner",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "depth-first search",
      "graphs",
      "traversal"
    ],
    "learning_objectives": [
      "Understand and implement Depth-First Search.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "DFS explores as deeply as possible before backtracking. Recursive DFS uses the call stack; iterative DFS uses an explicit stack. The neighbor ordering determines traversal order but not reachability.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\ndfs(u): visited[u]=true; for v in adj[u]: if not visited[v]: dfs(v)\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(V+E)",
      "space": "O(V)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-cycle-undirected",
    "title": "Cycle Detection in Undirected Graph",
    "category": "Graphs",
    "subcategory": "Cycle Detection",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "cycle detection in undirected graph",
      "graphs",
      "cycle detection"
    ],
    "learning_objectives": [
      "Understand and implement Cycle Detection in Undirected Graph.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "during DFS, an edge from u to an already visited vertex is a cycle only when that vertex is not u’s parent in a simple undirected graph. Alternatively, DSU can detect a cycle while processing an edge list: if its endpoints already have the same representative, the edge closes a cycle.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nDFS(u,parent): mark; for v: if unvisited DFS(v,u); else if v!=parent return cycle\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(V+E)",
      "space": "O(V)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-cycle-directed",
    "title": "Cycle Detection in Directed Graph",
    "category": "Graphs",
    "subcategory": "Cycle Detection",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "cycle detection in directed graph",
      "graphs",
      "cycle detection"
    ],
    "learning_objectives": [
      "Understand and implement Cycle Detection in Directed Graph.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "use three-state DFS: 0=unvisited, 1=currently active, 2=finished. An edge to a state-1 vertex is a back edge and proves a directed cycle. Kahn’s algorithm provides an alternative: if fewer than V vertices can be removed by zero-indegree processing, a cycle exists.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\ndfs(u): state[u]=1; for v: if state[v]==1 cycle; if state[v]==0 and dfs(v) cycle; state[u]=2\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(V+E)",
      "space": "O(V)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-topo-kahn",
    "title": "Kahn Topological Sort",
    "category": "Graphs",
    "subcategory": "Topological Sort",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "kahn topological sort",
      "graphs",
      "topological sort"
    ],
    "learning_objectives": [
      "Understand and implement Kahn Topological Sort.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "compute indegrees, enqueue all zero-indegree vertices, repeatedly remove one and decrease neighbors’ indegrees. If exactly V vertices are emitted, the graph is a DAG and the sequence is a valid topological order. Otherwise a directed cycle exists.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nindeg=compute; q=all zero indegree; while q: u=pop; order.append(u); for v: indeg[v]-=1; if zero push; valid=len(order)==V\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(V+E)",
      "space": "O(V)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-dijkstra",
    "title": "Dijkstra Shortest Path",
    "category": "Graphs",
    "subcategory": "Shortest Paths",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "dijkstra shortest path",
      "graphs",
      "shortest paths"
    ],
    "learning_objectives": [
      "Understand and implement Dijkstra Shortest Path.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "initialize dist[source]=0 and use a min-priority queue. Repeatedly take the smallest tentative distance; with non-negative weights it is safe to finalize that vertex. Relax outgoing edges and push improved distances. A common implementation permits duplicate queue entries and skips stale pairs whose distance no longer equals dist[u].\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\ndist[s]=0; pq={(0,s)}; while pq: du,u=popmin; if du!=dist[u] continue; for v,w: if du+w<dist[v]: dist[v]=du+w; parent[v]=u; push(dist[v],v)\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O((V+E)log V)",
      "space": "O(V+E)",
      "assumption": "all edge weights non-negative"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-bellman",
    "title": "Bellman-Ford Shortest Path",
    "category": "Graphs",
    "subcategory": "Shortest Paths",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "bellman-ford shortest path",
      "graphs",
      "shortest paths"
    ],
    "learning_objectives": [
      "Understand and implement Bellman-Ford Shortest Path.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "relax every edge V-1 times. Any simple shortest path has at most V-1 edges, so after V-1 complete passes all reachable shortest distances are established if no reachable negative cycle exists. A further successful relaxation indicates a reachable negative cycle.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\ndist[s]=0; repeat V-1 times: for (u,v,w): if dist[u]!=INF and dist[u]+w<dist[v]: relax; extra pass detects reachable negative cycle\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(VE)",
      "space": "O(V)",
      "assumption": "works with negative edges; detects reachable negative cycles"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-floyd",
    "title": "Floyd-Warshall All-Pairs Shortest Paths",
    "category": "Graphs",
    "subcategory": "Shortest Paths",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "floyd-warshall all-pairs shortest paths",
      "graphs",
      "shortest paths"
    ],
    "learning_objectives": [
      "Understand and implement Floyd-Warshall All-Pairs Shortest Paths.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "start with direct-edge distances and zero diagonals. For each intermediate k, update every ordered pair i,j with min(dist[i][j], dist[i][k]+dist[k][j]). The loop invariant is that after processing k, shortest paths whose internal vertices are drawn from the first k intermediates are represented.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nfor k: for i: for j: dist[i][j]=min(dist[i][j],dist[i][k]+dist[k][j])\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(V^3)",
      "space": "O(V^2)",
      "negative_cycle": "dist[v][v]<0 after completion"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-kruskal",
    "title": "Kruskal Minimum Spanning Tree",
    "category": "Graphs",
    "subcategory": "MST",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "kruskal minimum spanning tree",
      "graphs",
      "mst"
    ],
    "learning_objectives": [
      "Understand and implement Kruskal Minimum Spanning Tree.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "sort edges by weight and add an edge exactly when it joins two different components. DSU maintains component membership. The cut property justifies taking a light edge that safely connects distinct components. For a disconnected graph, the result is a minimum spanning forest.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nsort edges by weight; for e=(u,v): if find(u)!=find(v): union; add e\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(E log E)",
      "space": "O(V) auxiliary"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-prim",
    "title": "Prim Minimum Spanning Tree",
    "category": "Graphs",
    "subcategory": "MST",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "prim minimum spanning tree",
      "graphs",
      "mst"
    ],
    "learning_objectives": [
      "Understand and implement Prim Minimum Spanning Tree.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "grow one component from a chosen start vertex by repeatedly taking the cheapest edge crossing from the current tree to an unvisited vertex. A min-heap stores candidate edges. For disconnected graphs, restart from another unvisited vertex to build a forest.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nchoose s; push incident edges; while heap: w,u,v=popmin; if visited[v] continue; add; visit v; push outgoing edges\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(E log V)",
      "space": "O(V+E)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-dsu",
    "title": "Disjoint Set Union",
    "category": "Graphs",
    "subcategory": "Connectivity",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "disjoint set union",
      "graphs",
      "connectivity"
    ],
    "learning_objectives": [
      "Understand and implement Disjoint Set Union.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "DSU represents each set as a rooted forest. find follows parent links and compresses paths; union attaches one root below another using size or rank. Together these yield inverse-Ackermann amortized time per operation, effectively constant for practical input sizes.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nfind(x): if parent[x]!=x: parent[x]=find(parent[x]); return parent[x]; union(a,b): ra=find(a); rb=find(b); attach smaller rank/size root\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(alpha(n)) amortized",
      "space": "O(n)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-activity",
    "title": "Activity Selection",
    "category": "Greedy",
    "subcategory": "Scheduling",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "activity selection",
      "greedy",
      "scheduling"
    ],
    "learning_objectives": [
      "Understand and implement Activity Selection.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "sort intervals by increasing finish time and repeatedly select the next interval whose start is at least the finish of the last selected interval. The earliest finishing compatible activity leaves the largest remaining suffix of time. The exchange argument proves an optimal solution can begin with that greedy choice.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nsort by finish; last=-inf; for activity in order: if start>=last: select; last=finish\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(n log n)",
      "space": "O(n) or sort-dependent"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-fractional",
    "title": "Fractional Knapsack",
    "category": "Greedy",
    "subcategory": "Knapsack",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "fractional knapsack",
      "greedy",
      "knapsack"
    ],
    "learning_objectives": [
      "Understand and implement Fractional Knapsack.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "sort items by value/weight ratio descending. Take whole items while possible, then take the required fraction of the next item. The ability to split items is essential; the same ratio heuristic is not generally correct for 0/1 knapsack.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nsort by value/weight descending; take min(weight,remaining) from each\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(n log n)",
      "space": "O(n) or sort-dependent"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-huffman",
    "title": "Huffman Coding",
    "category": "Greedy",
    "subcategory": "Compression",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "huffman coding",
      "greedy",
      "compression"
    ],
    "learning_objectives": [
      "Understand and implement Huffman Coding.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "repeatedly combine the two least-frequent symbols/subtrees using a min-heap. The combined node has frequency equal to the sum. Assigning 0/1 on branches yields a prefix-free code. The greedy combination rule minimizes the weighted external path length.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\npush all frequencies; while heap size>1: a=pop; b=pop; parent=freq(a)+freq(b); push(parent)\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(n log n)",
      "space": "O(n)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-fib-dp",
    "title": "Fibonacci Dynamic Programming",
    "category": "Dynamic Programming",
    "subcategory": "1D DP",
    "difficulty": "beginner",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "fibonacci dynamic programming",
      "dynamic programming",
      "1d dp"
    ],
    "learning_objectives": [
      "Understand and implement Fibonacci Dynamic Programming.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "store each Fibonacci value once. Top-down memoization follows the recursive definition but caches results; bottom-up tabulation computes from small indices upward. If only the previous two values are required, memory can be reduced to O(1).\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\ndp[0]=0; dp[1]=1; for i=2..n: dp[i]=dp[i-1]+dp[i-2]\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(n)",
      "space": "O(n) or O(1) optimized"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-climb",
    "title": "Climbing Stairs DP",
    "category": "Dynamic Programming",
    "subcategory": "1D DP",
    "difficulty": "beginner",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "climbing stairs dp",
      "dynamic programming",
      "1d dp"
    ],
    "learning_objectives": [
      "Understand and implement Climbing Stairs DP.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "if one can climb 1 or 2 steps, the number of ways to reach step i is ways[i-1]+ways[i-2]. The state is sufficient because the future only depends on the current position, not the complete path history.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nways[0]=1; ways[1]=1; for i=2..n: ways[i]=ways[i-1]+ways[i-2]\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(n)",
      "space": "O(1) optimized"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-house-robber",
    "title": "House Robber DP",
    "category": "Dynamic Programming",
    "subcategory": "1D DP",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "house robber dp",
      "dynamic programming",
      "1d dp"
    ],
    "learning_objectives": [
      "Understand and implement House Robber DP.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "at each house, either skip it and keep the best from the previous house, or rob it and add its value to the best up to two houses back. The recurrence is dp[i]=max(dp[i-1],dp[i-2]+value[i]).\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nprev2=0; prev1=0; for x in nums: cur=max(prev1,prev2+x); prev2=prev1; prev1=cur\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(n)",
      "space": "O(1)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-coin-change",
    "title": "Coin Change DP",
    "category": "Dynamic Programming",
    "subcategory": "Unbounded Knapsack",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "coin change dp",
      "dynamic programming",
      "unbounded knapsack"
    ],
    "learning_objectives": [
      "Understand and implement Coin Change DP.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "for minimum coins, dp[a] is the fewest coins needed to form amount a. Initialize dp[0]=0 and other states to infinity. For each amount, try each coin and transition from amount-coin. The recurrence permits repeated use of coins because the same denomination can contribute multiple times.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\ndp[0]=0; for a=1..A: for c in coins: if c<=a: dp[a]=min(dp[a],1+dp[a-c])\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(A*C)",
      "space": "O(A)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-knapsack01",
    "title": "0/1 Knapsack",
    "category": "Dynamic Programming",
    "subcategory": "Knapsack",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "0/1 knapsack",
      "dynamic programming",
      "knapsack"
    ],
    "learning_objectives": [
      "Understand and implement 0/1 Knapsack.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "each item can be used at most once. In 1D capacity DP, iterate capacities downward so dp[w-weight] still represents the previous item layer rather than a state updated by the current item. Upward iteration instead models unbounded reuse.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\ndp[0..W]=0; for each (wt,val): for w=W down to wt: dp[w]=max(dp[w],dp[w-wt]+val)\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(nW)",
      "space": "O(W)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-unbounded-knapsack",
    "title": "Unbounded Knapsack",
    "category": "Dynamic Programming",
    "subcategory": "Knapsack",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "unbounded knapsack",
      "dynamic programming",
      "knapsack"
    ],
    "learning_objectives": [
      "Understand and implement Unbounded Knapsack.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "items may be selected repeatedly. A 1D capacity loop can iterate upward so an item updated at a smaller capacity may be reused at a larger capacity in the same iteration. The ordering is therefore a modeling decision, not a cosmetic loop choice.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\ndp[0..W]=0; for item: for w=wt..W: dp[w]=max(dp[w],dp[w-wt]+val)\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(nW)",
      "space": "O(W)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-lcs",
    "title": "Longest Common Subsequence",
    "category": "Dynamic Programming",
    "subcategory": "String DP",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "longest common subsequence",
      "dynamic programming",
      "string dp"
    ],
    "learning_objectives": [
      "Understand and implement Longest Common Subsequence.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "dp[i][j] is the LCS length of the first i characters of A and first j characters of B. If the last characters match, use the diagonal plus one; otherwise discard one side and take the better of dp[i-1][j] and dp[i][j-1].\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nif A[i-1]==B[j-1]: dp[i][j]=dp[i-1][j-1]+1 else dp[i][j]=max(dp[i-1][j],dp[i][j-1])\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(nm)",
      "space": "O(nm), O(min(n,m)) length-only"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-edit-distance",
    "title": "Edit Distance",
    "category": "Dynamic Programming",
    "subcategory": "String DP",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "edit distance",
      "dynamic programming",
      "string dp"
    ],
    "learning_objectives": [
      "Understand and implement Edit Distance.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "dp[i][j] is the minimum edits to transform the first i characters of A into the first j of B using insert, delete and substitute. Matching final characters costs no new edit; otherwise take one plus the minimum of the three predecessor states.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nif equal: dp[i][j]=dp[i-1][j-1] else 1+min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(nm)",
      "space": "O(nm)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-lis",
    "title": "Longest Increasing Subsequence",
    "category": "Dynamic Programming",
    "subcategory": "Subsequence DP",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "longest increasing subsequence",
      "dynamic programming",
      "subsequence dp"
    ],
    "learning_objectives": [
      "Understand and implement Longest Increasing Subsequence.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "the O(n^2) DP sets dp[i] to the longest increasing subsequence ending at i, considering every earlier j with A[j]<A[i]. An O(n log n) method maintains tails where tails[k] is the smallest possible ending value of an increasing subsequence of length k+1; tails is not itself the subsequence.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nfor i: dp[i]=1+max(dp[j] for j<i if A[j]<A[i]); answer=max(dp)\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "dp_time": "O(n^2)",
      "dp_space": "O(n)",
      "optimized_time": "O(n log n)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-trie",
    "title": "Trie Insert/Search",
    "category": "Strings",
    "subcategory": "Trie",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "trie insert/search",
      "strings",
      "trie"
    ],
    "learning_objectives": [
      "Understand and implement Trie Insert/Search.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "a trie stores characters along root-to-node paths. Insert follows or creates a child per character and marks the final node as terminal. Search follows the path and requires the terminal marker. Prefix search only requires reaching the prefix node.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nfor c in word: node=node.child[c] creating if absent; node.terminal=true\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(L) per insert/search",
      "space": "O(total characters * child representation)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-bit-count",
    "title": "Brian Kernighan Set-Bit Count",
    "category": "Bit Manipulation",
    "subcategory": "Bit Tricks",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "brian kernighan set-bit count",
      "bit manipulation",
      "bit tricks"
    ],
    "learning_objectives": [
      "Understand and implement Brian Kernighan Set-Bit Count.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "the identity x & (x-1) clears the lowest set bit. Therefore the loop count equals the number of one bits rather than the fixed machine word width. For zero the loop executes zero times.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\ncount=0; while x!=0: x=x&(x-1); count+=1\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "time": "O(number of set bits)",
      "space": "O(1)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-segment",
    "title": "Segment Tree Range Query",
    "category": "Range Queries",
    "subcategory": "Segment Tree",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "segment tree range query",
      "range queries",
      "segment tree"
    ],
    "learning_objectives": [
      "Understand and implement Segment Tree Range Query.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "build a binary tree over intervals. Each node stores an associative aggregate for its segment. A query either fully uses a node, ignores a disjoint node, or splits into children. Point updates follow a single root-to-leaf path and recompute ancestors.\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nbuild(node,l,r); query(node,l,r,ql,qr): if disjoint return identity; if contained return tree[node]; else combine children\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "build": "O(n)",
      "query": "O(log n) typical",
      "point_update": "O(log n)",
      "space": "O(n)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "algo-fenwick",
    "title": "Fenwick Tree Prefix Sum",
    "category": "Range Queries",
    "subcategory": "Fenwick Tree",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "basic programming"
    ],
    "keywords": [
      "fenwick tree prefix sum",
      "range queries",
      "fenwick tree"
    ],
    "learning_objectives": [
      "Understand and implement Fenwick Tree Prefix Sum.",
      "Explain why its complexity follows from its operations."
    ],
    "content": "a Fenwick tree stores partial sums associated with binary-indexed intervals. In 1-based indexing, add(i,delta) repeatedly sets i += i&-i; prefixSum(i) repeatedly sets i -= i&-i. A range sum is prefixSum(r)-prefixSum(l-1).\n\n### Invariant / correctness idea\nThe algorithm is correct because each update preserves the information needed for the remaining search or optimization. A production implementation should state its input assumptions explicitly and handle empty or boundary cases.\n\n### Pseudocode\n```text\nadd(i,d): while i<=n: bit[i]+=d; i+=i&-i; sum(i): s=0; while i>0: s+=bit[i]; i-=i&-i\n```\n\n### Worked example\nUse a small input, trace the state after each meaningful iteration, and verify the final result against the definition. For implementation questions, test empty input, one element, duplicates, already-ordered input, and the largest values allowed by the constraints.\n\n### Common failure modes\nOff-by-one boundaries, incorrect initialization, violating the algorithm's precondition, and reporting a complexity that ignores sorting, preprocessing, recursion, or auxiliary storage.",
    "examples": [
      "small worked example"
    ],
    "complexity": {
      "update": "O(log n)",
      "prefix_query": "O(log n)",
      "range_sum": "O(log n)",
      "space": "O(n)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "advanced-01",
    "title": "Quickselect",
    "category": "Selection",
    "subcategory": "Order Statistics",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "arrays",
      "quicksort"
    ],
    "keywords": [
      "quickselect",
      "kth smallest",
      "selection"
    ],
    "learning_objectives": [
      "Find order statistics without fully sorting."
    ],
    "content": "Quickselect partitions around a pivot and recursively continues only in the partition containing the desired kth element. Average time is O(n) with randomized pivots; worst case is O(n^2). It is related to quicksort but does not recursively sort both sides.\n\n### Design notes\nState the invariant and the exact input assumptions before coding. For advanced algorithms, distinguish preprocessing cost from per-query cost and distinguish worst-case from expected or amortized bounds where relevant.\n\n### Validation checklist\nTest empty and singleton cases, repeated values, degenerate structures, disconnected graph components, negative weights where permitted, and maximum legal numeric values.",
    "examples": [],
    "complexity": {
      "average": "O(n)",
      "worst": "O(n^2)",
      "space": "O(log n) expected recursion"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "advanced-02",
    "title": "Meet-in-the-Middle",
    "category": "Advanced Patterns",
    "subcategory": "Search Optimization",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "recursion",
      "subsets"
    ],
    "keywords": [
      "meet in the middle",
      "subset sum"
    ],
    "learning_objectives": [
      "Recognize exponential problems where halving the search dimension is useful."
    ],
    "content": "Meet-in-the-middle splits a problem of size n into two halves, enumerates states for each half, and combines them. For subset-sum-like problems this can reduce 2^n enumeration to roughly 2^(n/2) states per side, followed by sorting or hashing. It is useful when n is too large for full subset enumeration but small enough for half enumeration.\n\n### Design notes\nState the invariant and the exact input assumptions before coding. For advanced algorithms, distinguish preprocessing cost from per-query cost and distinguish worst-case from expected or amortized bounds where relevant.\n\n### Validation checklist\nTest empty and singleton cases, repeated values, degenerate structures, disconnected graph components, negative weights where permitted, and maximum legal numeric values.",
    "examples": [],
    "complexity": {
      "typical": "O(2^(n/2) poly(n))"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "advanced-03",
    "title": "Coordinate Compression",
    "category": "Advanced Patterns",
    "subcategory": "Preprocessing",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "sorting",
      "Fenwick tree"
    ],
    "keywords": [
      "coordinate compression",
      "ranking",
      "offline"
    ],
    "learning_objectives": [
      "Compress sparse coordinates while preserving ordering."
    ],
    "content": "Coordinate compression replaces large sparse numeric coordinates with their rank among sorted unique values. Relative order is preserved, while the numeric magnitude is discarded. It is commonly paired with Fenwick trees or segment trees when values can be as large as 10^9 or beyond but only n distinct coordinates appear.\n\n### Design notes\nState the invariant and the exact input assumptions before coding. For advanced algorithms, distinguish preprocessing cost from per-query cost and distinguish worst-case from expected or amortized bounds where relevant.\n\n### Validation checklist\nTest empty and singleton cases, repeated values, degenerate structures, disconnected graph components, negative weights where permitted, and maximum legal numeric values.",
    "examples": [],
    "complexity": {
      "sort": "O(n log n)",
      "mapping": "O(n) expected with hash map"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "advanced-04",
    "title": "Sweep Line",
    "category": "Advanced Patterns",
    "subcategory": "Geometry / Intervals",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "sorting",
      "intervals"
    ],
    "keywords": [
      "sweep line",
      "events",
      "active set"
    ],
    "learning_objectives": [
      "Model interval and geometric events as ordered state changes."
    ],
    "content": "A sweep-line algorithm processes events in sorted coordinate order while maintaining the active set of objects crossing the sweep position. Interval overlap, meeting-room counts, rectangle events and computational geometry problems often use this model. Correct event ordering at equal coordinates is critical: starts may need to be processed before ends or vice versa depending on whether touching intervals overlap.\n\n### Design notes\nState the invariant and the exact input assumptions before coding. For advanced algorithms, distinguish preprocessing cost from per-query cost and distinguish worst-case from expected or amortized bounds where relevant.\n\n### Validation checklist\nTest empty and singleton cases, repeated values, degenerate structures, disconnected graph components, negative weights where permitted, and maximum legal numeric values.",
    "examples": [],
    "complexity": {
      "typical": "O(n log n)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "advanced-05",
    "title": "Top K with Heap",
    "category": "Heaps",
    "subcategory": "Selection Patterns",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "heaps",
      "sorting"
    ],
    "keywords": [
      "top k",
      "k largest",
      "bounded heap"
    ],
    "learning_objectives": [
      "Use a bounded heap when k is much smaller than n."
    ],
    "content": "For the k largest values, maintain a min-heap of size k. Push each candidate and remove the smallest when the heap exceeds k. The heap contains the best k seen so far; the smallest of those is the current cutoff. This uses O(n log k) time and O(k) auxiliary space.\n\n### Design notes\nState the invariant and the exact input assumptions before coding. For advanced algorithms, distinguish preprocessing cost from per-query cost and distinguish worst-case from expected or amortized bounds where relevant.\n\n### Validation checklist\nTest empty and singleton cases, repeated values, degenerate structures, disconnected graph components, negative weights where permitted, and maximum legal numeric values.",
    "examples": [],
    "complexity": {
      "time": "O(n log k)",
      "space": "O(k)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "advanced-06",
    "title": "Interval Merge",
    "category": "Arrays",
    "subcategory": "Intervals",
    "difficulty": "intermediate",
    "content_type": "algorithm",
    "prerequisites": [
      "sorting",
      "arrays"
    ],
    "keywords": [
      "interval merge",
      "overlap"
    ],
    "learning_objectives": [
      "Merge overlapping intervals and state the touching-endpoint convention."
    ],
    "content": "Sort intervals by start time. Scan from left to right while maintaining the current merged interval. If the next interval starts no later than the current end, extend the end; otherwise emit the current interval and start a new one. Whether touching endpoints merge depends on the problem definition.\n\n### Design notes\nState the invariant and the exact input assumptions before coding. For advanced algorithms, distinguish preprocessing cost from per-query cost and distinguish worst-case from expected or amortized bounds where relevant.\n\n### Validation checklist\nTest empty and singleton cases, repeated values, degenerate structures, disconnected graph components, negative weights where permitted, and maximum legal numeric values.",
    "examples": [],
    "complexity": {
      "time": "O(n log n)",
      "space": "O(n) output"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "advanced-07",
    "title": "Minimum Window Substring Pattern",
    "category": "Strings",
    "subcategory": "Sliding Window",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "strings",
      "sliding window",
      "hashing"
    ],
    "keywords": [
      "minimum window",
      "frequency map",
      "deficit"
    ],
    "learning_objectives": [
      "Design a variable window for character-count constraints."
    ],
    "content": "Maintain a window and a frequency deficit for required characters. Expand the right boundary until all requirements are satisfied, then shrink from the left while validity remains. Record the shortest valid window. The crucial invariant is that the current window satisfies the requirement exactly when the tracked deficit reaches the valid threshold.\n\n### Design notes\nState the invariant and the exact input assumptions before coding. For advanced algorithms, distinguish preprocessing cost from per-query cost and distinguish worst-case from expected or amortized bounds where relevant.\n\n### Validation checklist\nTest empty and singleton cases, repeated values, degenerate structures, disconnected graph components, negative weights where permitted, and maximum legal numeric values.",
    "examples": [],
    "complexity": {
      "time": "O(n)",
      "space": "O(alphabet or distinct chars)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "advanced-08",
    "title": "KMP Prefix Function",
    "category": "Strings",
    "subcategory": "Pattern Matching",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "strings",
      "prefix function"
    ],
    "keywords": [
      "KMP",
      "prefix function",
      "failure function"
    ],
    "learning_objectives": [
      "Build and use the prefix function to search in linear time."
    ],
    "content": "KMP avoids restarting pattern matching from scratch after a mismatch. The prefix function pi[i] stores the length of the longest proper prefix of the pattern that is also a suffix ending at i. On mismatch, jump to pi[j-1] rather than moving the text pointer backward.\n\n### Design notes\nState the invariant and the exact input assumptions before coding. For advanced algorithms, distinguish preprocessing cost from per-query cost and distinguish worst-case from expected or amortized bounds where relevant.\n\n### Validation checklist\nTest empty and singleton cases, repeated values, degenerate structures, disconnected graph components, negative weights where permitted, and maximum legal numeric values.",
    "examples": [],
    "complexity": {
      "preprocess": "O(m)",
      "search": "O(n+m)",
      "space": "O(m)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "advanced-09",
    "title": "Z Algorithm",
    "category": "Strings",
    "subcategory": "Pattern Matching",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "strings"
    ],
    "keywords": [
      "Z algorithm",
      "Z array",
      "pattern matching"
    ],
    "learning_objectives": [
      "Compute Z values and use them for linear-time pattern matching."
    ],
    "content": "The Z array stores for each position i the length of the longest substring starting at i that matches the prefix of the string. Maintain a [l,r] window known to match the prefix; positions inside it can reuse previous Z values and only extend when needed. Pattern matching can be done on pattern + separator + text.\n\n### Design notes\nState the invariant and the exact input assumptions before coding. For advanced algorithms, distinguish preprocessing cost from per-query cost and distinguish worst-case from expected or amortized bounds where relevant.\n\n### Validation checklist\nTest empty and singleton cases, repeated values, degenerate structures, disconnected graph components, negative weights where permitted, and maximum legal numeric values.",
    "examples": [],
    "complexity": {
      "time": "O(n)",
      "space": "O(n)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "advanced-10",
    "title": "Rabin-Karp Rolling Hash",
    "category": "Strings",
    "subcategory": "Pattern Matching",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "strings",
      "hashing"
    ],
    "keywords": [
      "Rabin Karp",
      "rolling hash",
      "collision"
    ],
    "learning_objectives": [
      "Explain rolling hash and why hash equality is not automatically string equality."
    ],
    "content": "Rabin-Karp compares rolling hash values of a pattern and each text window. A matching hash is only a candidate match because collisions are possible, so exact verification may be required unless a probabilistic collision model is accepted. Rolling hashes update a window in O(1) arithmetic after preprocessing.\n\n### Design notes\nState the invariant and the exact input assumptions before coding. For advanced algorithms, distinguish preprocessing cost from per-query cost and distinguish worst-case from expected or amortized bounds where relevant.\n\n### Validation checklist\nTest empty and singleton cases, repeated values, degenerate structures, disconnected graph components, negative weights where permitted, and maximum legal numeric values.",
    "examples": [],
    "complexity": {
      "expected": "O(n+m)",
      "worst": "O(nm) with many collisions",
      "space": "O(1) or O(m)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "advanced-11",
    "title": "Strongly Connected Components",
    "category": "Graphs",
    "subcategory": "Connectivity",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "DFS",
      "directed graphs"
    ],
    "keywords": [
      "SCC",
      "Kosaraju",
      "Tarjan",
      "low-link"
    ],
    "learning_objectives": [
      "Distinguish SCCs from ordinary connected components and describe two linear-time algorithms."
    ],
    "content": "In a directed graph, a strongly connected component is a maximal set of vertices where every vertex can reach every other. Kosaraju’s algorithm performs DFS finishing-order computation, reverses all edges, then DFSs in decreasing finish time. Tarjan’s algorithm finds SCCs in one DFS using discovery indices and low-link values.\n\n### Design notes\nState the invariant and the exact input assumptions before coding. For advanced algorithms, distinguish preprocessing cost from per-query cost and distinguish worst-case from expected or amortized bounds where relevant.\n\n### Validation checklist\nTest empty and singleton cases, repeated values, degenerate structures, disconnected graph components, negative weights where permitted, and maximum legal numeric values.",
    "examples": [],
    "complexity": {
      "time": "O(V+E)",
      "space": "O(V+E)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "advanced-12",
    "title": "Articulation Points",
    "category": "Graphs",
    "subcategory": "Connectivity",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "DFS",
      "low-link"
    ],
    "keywords": [
      "articulation point",
      "cut vertex",
      "low-link"
    ],
    "learning_objectives": [
      "Use DFS low-link reasoning to identify cut vertices."
    ],
    "content": "An articulation point is a vertex whose removal increases the number of connected components. DFS computes discovery times and low-link values. For a non-root vertex u, a child v with low[v] >= tin[u] indicates that v’s subtree cannot reach an ancestor of u without u. The root is an articulation point when it has more than one DFS child.\n\n### Design notes\nState the invariant and the exact input assumptions before coding. For advanced algorithms, distinguish preprocessing cost from per-query cost and distinguish worst-case from expected or amortized bounds where relevant.\n\n### Validation checklist\nTest empty and singleton cases, repeated values, degenerate structures, disconnected graph components, negative weights where permitted, and maximum legal numeric values.",
    "examples": [],
    "complexity": {
      "time": "O(V+E)",
      "space": "O(V)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "advanced-13",
    "title": "Bridges in Graphs",
    "category": "Graphs",
    "subcategory": "Connectivity",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "DFS",
      "low-link"
    ],
    "keywords": [
      "bridge",
      "cut edge",
      "low-link"
    ],
    "learning_objectives": [
      "Identify bridges and explain the low-link inequality."
    ],
    "content": "An edge is a bridge if removing it disconnects its component. In DFS, tree edge u-v is a bridge when low[v] > tin[u], meaning the subtree rooted at v has no back edge to u or any ancestor of u. The strict inequality distinguishes bridges from articulation conditions.\n\n### Design notes\nState the invariant and the exact input assumptions before coding. For advanced algorithms, distinguish preprocessing cost from per-query cost and distinguish worst-case from expected or amortized bounds where relevant.\n\n### Validation checklist\nTest empty and singleton cases, repeated values, degenerate structures, disconnected graph components, negative weights where permitted, and maximum legal numeric values.",
    "examples": [],
    "complexity": {
      "time": "O(V+E)",
      "space": "O(V)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "advanced-14",
    "title": "DAG Shortest Paths",
    "category": "Graphs",
    "subcategory": "Shortest Paths",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "topological sort",
      "relaxation"
    ],
    "keywords": [
      "DAG shortest path",
      "topological order"
    ],
    "learning_objectives": [
      "Use topological order to solve shortest paths in a DAG, including negative edges."
    ],
    "content": "For a DAG, shortest paths can be computed in O(V+E) by processing vertices in topological order and relaxing outgoing edges. Negative weights are allowed because there are no directed cycles, so negative cycles cannot exist. This can be faster than Dijkstra when the graph is acyclic.\n\n### Design notes\nState the invariant and the exact input assumptions before coding. For advanced algorithms, distinguish preprocessing cost from per-query cost and distinguish worst-case from expected or amortized bounds where relevant.\n\n### Validation checklist\nTest empty and singleton cases, repeated values, degenerate structures, disconnected graph components, negative weights where permitted, and maximum legal numeric values.",
    "examples": [],
    "complexity": {
      "time": "O(V+E)",
      "space": "O(V)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "advanced-15",
    "title": "Transitive Closure",
    "category": "Graphs",
    "subcategory": "Reachability",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "graphs",
      "Floyd-Warshall"
    ],
    "keywords": [
      "transitive closure",
      "reachability"
    ],
    "learning_objectives": [
      "Distinguish shortest paths from reachability and compute closure."
    ],
    "content": "Transitive closure records whether every ordered pair of vertices is mutually reachable in the directed sense. Floyd-Warshall can compute it by replacing numeric min-plus updates with Boolean reachability updates: reach[i][j] |= reach[i][k] && reach[k][j]. Bitset acceleration can improve practical performance for dense graphs.\n\n### Design notes\nState the invariant and the exact input assumptions before coding. For advanced algorithms, distinguish preprocessing cost from per-query cost and distinguish worst-case from expected or amortized bounds where relevant.\n\n### Validation checklist\nTest empty and singleton cases, repeated values, degenerate structures, disconnected graph components, negative weights where permitted, and maximum legal numeric values.",
    "examples": [],
    "complexity": {
      "time": "O(V^3)",
      "space": "O(V^2)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "advanced-16",
    "title": "Lazy Propagation Segment Tree",
    "category": "Range Queries",
    "subcategory": "Segment Tree",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "segment tree",
      "range queries"
    ],
    "keywords": [
      "lazy propagation",
      "range update",
      "range query"
    ],
    "learning_objectives": [
      "Explain why deferred updates preserve correctness and logarithmic query/update cost."
    ],
    "content": "Lazy propagation postpones applying a range update to descendants until they are needed. Each node stores the aggregate for its interval plus a pending update tag. A query or deeper update first pushes the pending tag to children. This supports many range-update/range-query combinations in O(log n) per operation for suitable operations.\n\n### Design notes\nState the invariant and the exact input assumptions before coding. For advanced algorithms, distinguish preprocessing cost from per-query cost and distinguish worst-case from expected or amortized bounds where relevant.\n\n### Validation checklist\nTest empty and singleton cases, repeated values, degenerate structures, disconnected graph components, negative weights where permitted, and maximum legal numeric values.",
    "examples": [],
    "complexity": {
      "build": "O(n)",
      "range_update": "O(log n)",
      "range_query": "O(log n)",
      "space": "O(n)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "advanced-17",
    "title": "Binary Lifting for LCA",
    "category": "Trees",
    "subcategory": "Lowest Common Ancestor",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "trees",
      "LCA"
    ],
    "keywords": [
      "binary lifting",
      "LCA",
      "ancestor"
    ],
    "learning_objectives": [
      "Answer many LCA queries efficiently after preprocessing."
    ],
    "content": "Binary lifting stores up[v][j], the 2^j-th ancestor of v. Depth differences are first equalized by jumping upward through powers of two, then both nodes are lifted from the largest jump downward while their ancestors differ. The final parent is the LCA. Preprocessing is O(n log n) and each query is O(log n).\n\n### Design notes\nState the invariant and the exact input assumptions before coding. For advanced algorithms, distinguish preprocessing cost from per-query cost and distinguish worst-case from expected or amortized bounds where relevant.\n\n### Validation checklist\nTest empty and singleton cases, repeated values, degenerate structures, disconnected graph components, negative weights where permitted, and maximum legal numeric values.",
    "examples": [],
    "complexity": {
      "preprocess": "O(n log n)",
      "query": "O(log n)",
      "space": "O(n log n)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "advanced-18",
    "title": "Euler Tour Technique",
    "category": "Trees",
    "subcategory": "Tree Flattening",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "DFS",
      "Fenwick tree",
      "segment tree"
    ],
    "keywords": [
      "Euler tour",
      "tin",
      "tout",
      "subtree interval"
    ],
    "learning_objectives": [
      "Convert subtree queries into array range queries."
    ],
    "content": "An Euler tour assigns entry and exit times during DFS. For subtree queries, a subtree becomes a contiguous interval in the DFS order: [tin[u], tout[u]]. This allows Fenwick or segment tree techniques to answer subtree sums and support updates after flattening a rooted tree.\n\n### Design notes\nState the invariant and the exact input assumptions before coding. For advanced algorithms, distinguish preprocessing cost from per-query cost and distinguish worst-case from expected or amortized bounds where relevant.\n\n### Validation checklist\nTest empty and singleton cases, repeated values, degenerate structures, disconnected graph components, negative weights where permitted, and maximum legal numeric values.",
    "examples": [],
    "complexity": {
      "time": "O(n) flattening",
      "query": "depends on range structure"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "advanced-19",
    "title": "Binary Trie for Maximum XOR",
    "category": "Tries",
    "subcategory": "Bitwise Trie",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "tries",
      "bit manipulation"
    ],
    "keywords": [
      "binary trie",
      "maximum XOR"
    ],
    "learning_objectives": [
      "Use a binary trie to maximize XOR queries."
    ],
    "content": "Insert integer bits from most significant to least significant into a binary trie. To maximize x XOR y, at each bit prefer the child opposite x’s bit if it exists, because that sets the current XOR bit to 1. Greedy choice works from the highest bit downward because higher bits dominate lower bits numerically.\n\n### Design notes\nState the invariant and the exact input assumptions before coding. For advanced algorithms, distinguish preprocessing cost from per-query cost and distinguish worst-case from expected or amortized bounds where relevant.\n\n### Validation checklist\nTest empty and singleton cases, repeated values, degenerate structures, disconnected graph components, negative weights where permitted, and maximum legal numeric values.",
    "examples": [],
    "complexity": {
      "insert": "O(B)",
      "query": "O(B)",
      "space": "O(nB)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  },
  {
    "id": "advanced-20",
    "title": "Reservoir Sampling",
    "category": "Randomized Algorithms",
    "subcategory": "Sampling",
    "difficulty": "advanced",
    "content_type": "algorithm",
    "prerequisites": [
      "arrays",
      "probability basics"
    ],
    "keywords": [
      "reservoir sampling",
      "streaming",
      "uniform sample"
    ],
    "learning_objectives": [
      "Explain the replacement probability and why every item has equal final probability."
    ],
    "content": "Reservoir sampling selects a uniform random sample of k items from a stream of unknown length. For k=1, when the ith item arrives, replace the current sample with probability 1/i. The algorithm uses O(k) memory and one pass. It relies on randomness and is useful when the stream cannot be stored.\n\n### Design notes\nState the invariant and the exact input assumptions before coding. For advanced algorithms, distinguish preprocessing cost from per-query cost and distinguish worst-case from expected or amortized bounds where relevant.\n\n### Validation checklist\nTest empty and singleton cases, repeated values, degenerate structures, disconnected graph components, negative weights where permitted, and maximum legal numeric values.",
    "examples": [],
    "complexity": {
      "time": "O(n)",
      "space": "O(k)"
    },
    "related_topics": [],
    "tags": [],
    "source": "expanded_model_knowledge"
  }
];
