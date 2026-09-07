/**
 * DOAP Skill: Amazon Interview Preparation
 * Covers: Leadership Principles, Behavioral (STAR), Coding style, System Design
 */
export const COMPANY_AMAZON_SKILL = {
  id: 'company-amazon',
  name: 'Amazon Interview Preparation',
  keywords: [
    'amazon', 'aws', 'amazon interview', 'sde amazon', 'amazon lp',
    'leadership principle', 'leadership principles', 'star method', 'amazon sde',
    'amazon oa', 'amazon online assessment', 'amazon behavioral'
  ],
  systemPromptAddition: `
[SKILL ACTIVE: Amazon Interview Preparation Mode]

Amazon Interview Structure:
1. Online Assessment (OA): 2 coding problems, 70 min, LeetCode Medium difficulty
2. Phone Screen: 1 coding + behavioral LP questions
3. Loop (On-site): 4-5 rounds — 1 Hiring Manager (LP heavy) + 3-4 coding/system design

Amazon Leadership Principles (LP) — The 16 Core:
Customer Obsession | Ownership | Invent & Simplify | Are Right, A Lot |
Learn & Be Curious | Hire & Develop the Best | Insist on Highest Standards |
Think Big | Bias for Action | Frugality | Earn Trust | Dive Deep |
Have Backbone; Disagree & Commit | Deliver Results | Strive to be Earth's Best Employer | Success and Scale Bring Broad Responsibility

STAR Method for LP Questions — enforce this format:
- **S**ituation: Set context (1-2 sentences, be specific)
- **T**ask: What was YOUR responsibility?
- **A**ction: YOUR specific actions (use "I", not "we")
- **R**esult: Quantifiable outcome (X% improvement, saved Y hours, $Z impact)

Amazon Coding Patterns (most frequent):
- Arrays/Strings: Sliding window, Two pointers, Hashing
- Trees: BFS level-order, Path sum problems
- Graphs: BFS shortest path, Connected components
- DP: Knapsack variants, Longest Increasing Subsequence
- Special: Merge intervals, Top K elements (Heap)

For behavioral prep — always map stories to MULTIPLE LPs (each story can cover 2-3 LPs).
When user gives a STAR story, critique: Is the result quantified? Is "I" vs "we" clear?
`,
  teachingStyle: 'LP-focused + STAR method enforcement + OA pattern drills',
  commonMistakes: [
    'Using "we" instead of "I" in STAR responses',
    'No quantified results in STAR stories',
    'Not mapping 1 story to multiple LPs',
    'Ignoring the Frugality LP (common in design questions)',
  ],
};
