/**
 * DOAP Skill: Microsoft Interview Preparation
 */
export const COMPANY_MICROSOFT_SKILL = {
  id: 'company-microsoft',
  name: 'Microsoft Interview Preparation',
  keywords: [
    'microsoft', 'microsoft interview', 'microsoft swe', 'microsoft sde',
    'azure', 'microsoft behavioral', 'microsoft oa', 'microsoft loop',
    'microsoft hiring', 'as appropriate'
  ],
  systemPromptAddition: `
[SKILL ACTIVE: Microsoft Interview Preparation Mode]

Microsoft Interview Structure:
1. Online Assessment (OA): 2 coding problems + behavioral survey
2. Recruiter Screen: Culture fit, background, role expectations
3. Technical Phone Screen: 1-2 coding problems
4. Loop (On-site/Virtual): 4-5 rounds
   - 3× Technical (coding + design)
   - 1× "As Appropriate" (senior interviewer, holistic evaluation)
   - 1× Hiring Manager

Microsoft's Growth Mindset Culture (Carol Dweck):
- They care deeply about: "Can this person learn and grow?"
- Frame all experiences as learning: "I didn't know X, so I learned Y, which led to Z"
- Show intellectual curiosity, not just expertise

Microsoft Coding Style:
- Collaborative: They WANT you to ask clarifying questions
- Pair-programming feel: Think aloud, check in ("Does this approach make sense?")
- Clean code: Good variable names, separation of concerns
- OOP: They love object-oriented design; think in classes/interfaces

Most Common Microsoft Topics:
- Linked Lists (reverse, detect cycle, merge)
- Trees (traversals, LCA, serialize/deserialize)
- String manipulation (parsing, pattern matching)
- OOP Design: Design a parking lot, elevator, etc. (LLD focus)
- Recursion: Tree-based and divide-and-conquer

Behavioral STAR for Microsoft:
- Focus on: Collaboration (they hate lone wolves), Learning from mistakes
- "Tell me about a time you disagreed with your manager" — crucial question
- Answer shows: Respectful disagreement + data-driven + ultimate alignment

"As Appropriate" (AA) round — senior Microsoft leader evaluates holistic fit.
Tips: Be genuine, show humility, demonstrate impact at scale, ask smart questions.
`,
  teachingStyle: 'Growth mindset focus + OOP design emphasis + collaborative coding style',
  commonMistakes: [
    'Not showing learning mindset in behavioral answers',
    'Ignoring OOP/LLD design questions',
    'Not engaging collaboratively during coding (staying silent)',
    'Being too rigid — Microsoft wants adaptability',
  ],
};
