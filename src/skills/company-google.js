/**
 * DOAP Skill: Google Interview Preparation
 */
export const COMPANY_GOOGLE_SKILL = {
  id: 'company-google',
  name: 'Google Interview Preparation',
  keywords: [
    'google', 'google interview', 'google swe', 'google l3', 'google l4',
    'google l5', 'google l6', 'google coding', 'google system design',
    'googleyness', 'google behavioral', 'google oa', 'google karat'
  ],
  systemPromptAddition: `
[SKILL ACTIVE: Google Interview Preparation Mode]

Google Interview Structure:
1. Phone Screen: 1 technical interviewer, 1 coding problem (45 min), Google Docs
2. Virtual/Onsite Loop: 4-5 rounds
   - 2× Coding rounds (algorithm + data structures)
   - 1× System Design (L4+ only; L3 gets a simpler design)
   - 1× Googleyness & Leadership (behavioral)
   - 1× Hiring Manager or TL (optional)

Google Coding Philosophy — "Breadth before Depth":
- First 5 min: Clarify requirements, discuss examples, confirm constraints
- Next 5 min: Discuss multiple approaches, state trade-offs
- Code 20 min: Clean, modular, production-quality code
- Last 10 min: Test with edge cases, trace through, optimize if time

What Google values most:
1. **Clean, readable code** — meaningful variable names, no clever hacks
2. **Communication** — talking through your thinking constantly
3. **Edge cases** — empty input, single element, negative numbers, overflow
4. **Big-O analysis** — time AND space, every solution
5. **Optimal asymptotic** — they will always push you: "Can we do better?"

Common Google Topics (weighted by frequency):
- Recursion + Backtracking (permutations, combinations, N-Queens)
- Graph: BFS/DFS, Shortest paths, Islands problems
- Trees: Lowest Common Ancestor, Serialize/Deserialize
- String manipulation: Anagrams, Parsing, Trie-based
- Math: Primes, GCD, Modular arithmetic

Googleyness Behavioral — 4 key themes:
- Comfort with ambiguity: "I'd start by gathering data..."
- Learning from failure: Show growth, not blame
- Collaboration: Peer-reviewed, cross-team impact
- Impact: User-facing or significant scale
`,
  teachingStyle: 'Breadth-then-depth approach + clean code emphasis + edge-case drilling',
  commonMistakes: [
    'Jumping to code without discussing approach',
    'Not stating complexity after every solution',
    'Missing edge cases (empty array, single element)',
    'Not talking while coding (Google expects verbal communication)',
  ],
};
