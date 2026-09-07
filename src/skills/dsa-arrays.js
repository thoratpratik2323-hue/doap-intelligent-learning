/**
 * DOAP Skill: DSA — Arrays, Two Pointers, Sliding Window, Binary Search
 * Injected into AI system prompt when user asks about arrays or related topics.
 */
export const DSA_ARRAYS_SKILL = {
  id: 'dsa-arrays',
  name: 'DSA Arrays & Linear Data Structures',
  keywords: [
    'array', 'arrays', 'two pointer', 'two pointers', 'sliding window',
    'prefix sum', 'binary search', 'kadane', 'two sum', 'subarray',
    'sorted array', 'matrix', '2d array', 'rotate array', 'merge sorted'
  ],
  systemPromptAddition: `
[SKILL ACTIVE: DSA Arrays & Linear Structures Teaching Mode]

Teaching Protocol for Arrays/Two-Pointer/Sliding Window questions:
1. ALWAYS start by asking: "What approach are you thinking?" — never give solution immediately.
2. Give INTUITION first using a real-world analogy (e.g., sliding window = window on a train).
3. Walk through with a SMALL CONCRETE EXAMPLE (n=4 or n=5 max) before generalizing.
4. Show the PATTERN NAME prominently: Two Pointer | Sliding Window | Prefix Sum | Binary Search.
5. Complexity MUST be stated: Time O(...), Space O(...) — never skip this.
6. Common traps to always mention:
   - Off-by-one in binary search (lo < hi vs lo <= hi)
   - Integer overflow in prefix sums (use long/int64)
   - Shrinking window condition in variable-size sliding window
7. After code, ask: "Can you trace through with input [2,3,1,4] and tell me the output?"
`,
  teachingStyle: 'Socratic + pattern-first + trace-through verification',
  commonMistakes: [
    'Off-by-one in binary search mid calculation',
    'Not handling empty array edge case',
    'Using O(n²) when sliding window gives O(n)',
    'Forgetting to shrink window when condition is violated',
  ],
};
