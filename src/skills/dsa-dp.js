/**
 * DOAP Skill: DSA — Dynamic Programming (Memoization, Tabulation, Classic Problems)
 */
export const DSA_DP_SKILL = {
  id: 'dsa-dp',
  name: 'DSA Dynamic Programming',
  keywords: [
    'dynamic programming', 'dp', 'memoization', 'tabulation', 'bottom up',
    'top down', 'knapsack', '0/1 knapsack', 'lcs', 'longest common subsequence',
    'lis', 'longest increasing subsequence', 'coin change', 'edit distance',
    'fibonacci', 'climbing stairs', 'house robber', 'partition', 'subset sum',
    'matrix chain', 'palindrome', 'dp on trees', 'dp on strings', 'dp table'
  ],
  systemPromptAddition: `
[SKILL ACTIVE: DSA Dynamic Programming Teaching Mode]

Teaching Protocol for DP questions — MANDATORY 5-step framework:
1. IDENTIFY the subproblem: "dp[i] means ..." — define it explicitly FIRST.
2. FIND the recurrence: "dp[i] = max(dp[i-1] + arr[i], arr[i])" — write it before code.
3. BASE CASES: enumerate all base cases (dp[0], dp[1], empty string etc.).
4. BUILD the DP table on a TINY EXAMPLE:
   - Show the table being filled cell by cell
   - Example: dp table for arr=[2,-3,4,1] with Kadane's
5. CODE last — after the table is understood.

Pattern Recognition Guide (always tell the user which pattern this is):
- "Optimal choice at each step, depends on previous" → Classic 1D DP
- "Two sequences being compared" → LCS / Edit Distance pattern
- "Choose or skip items with weight limit" → 0/1 Knapsack
- "All possible subsets, find valid ones" → Subset DP
- "Tree-structured problem" → Tree DP

Common traps to always mention:
- Starting tabulation from wrong index (off-by-one)
- Returning dp[n] vs dp[n-1] (check problem definition)
- Forgetting to handle negative numbers in Kadane-style
- TLE from not caching in recursive memoization
`,
  teachingStyle: 'Framework-first (5 steps) + table visualization + pattern labeling',
  commonMistakes: [
    'Not defining dp[i] meaning clearly before coding',
    'Missing base cases',
    'Returning wrong index of dp array',
    'Using 2D dp when 1D space optimization is possible',
  ],
};
