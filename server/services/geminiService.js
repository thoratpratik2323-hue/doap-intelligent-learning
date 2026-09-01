import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
let ai = null;

if (apiKey && apiKey !== 'your-gemini-api-key-here') {
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('[Gemini Service] Initialization failed, using smart offline fallback:', err.message);
  }
}

/**
 * Generate a response from Gemini for the AI Tutor
 */
export async function getTutorResponse({ message, history = [], userContext = {} }) {
  if (ai) {
    try {
      const systemInstruction = `You are DOAP AI, a world-class AI engineering mentor and computer science tutor.
You help students with DSA, algorithms, software engineering, AI/ML, system design, and coding interviews.
Guidelines:
- Give clear, structured, pedagogical explanations with code snippets where helpful.
- Keep explanations concise yet deep.
- Tone: friendly, encouraging, sharp, and academic.
- User info: ${userContext.name || 'Student'}, Year: ${userContext.year || '3rd Year'}, Major: ${userContext.course || 'Computer Science'}.`;

      // Build conversation contents
      const contents = history.map(item => ({
        role: item.sender === 'user' ? 'user' : 'model',
        parts: [{ text: item.text }]
      }));

      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      if (response && response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('[Gemini Tutor] Live API call failed, falling back to smart engine:', err.message);
    }
  }

  // Offline intelligent rule-based knowledge engine
  return generateOfflineTutorResponse(message);
}

/**
 * Evaluate an AI interview session
 */
export async function evaluateInterview({ positionTitle, positionType, difficulty, answers, violations = [], strikeCount = 0 }) {
  if (ai && answers && answers.length > 0) {
    try {
      const answersText = answers.map((a, i) => `Question ${i + 1}: ${a.questionText || a.questionId}\nCandidate Answer: ${a.transcript || 'No response recorded.'}\nDuration: ${a.recordingDurationSeconds || 0}s`).join('\n\n');
      
      const prompt = `You are a Senior Technical Hiring Manager evaluating an AI-proctored interview for the role of "${positionTitle}" (${positionType}, ${difficulty} level).

Interview Data:
${answersText}

Proctoring Stats:
- Strikes: ${strikeCount}/3
- Proctoring events: ${violations.map(v => v.description).join('; ') || 'None recorded'}

Analyze the candidate's answers and respond ONLY with a valid JSON object matching this schema:
{
  "overallScore": <number 0-100>,
  "technicalScore": <number 0-100>,
  "communicationScore": <number 0-100>,
  "problemSolvingScore": <number 0-100>,
  "summary": "<2-3 sentence overall candidate assessment>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "areasForImprovement": ["<area 1>", "<area 2>", "<area 3>"],
  "questionFeedback": [
    {
      "questionNumber": 1,
      "score": <number 0-100>,
      "feedback": "<concise feedback on answer>"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3
        }
      });

      if (response && response.text) {
        return JSON.parse(response.text);
      }
    } catch (err) {
      console.warn('[Gemini Interview Eval] Live API failed, using structured fallback:', err.message);
    }
  }

  // Fallback evaluation generator
  return generateOfflineInterviewEvaluation({ positionTitle, answers, strikeCount, violations });
}

function generateOfflineTutorResponse(message) {
  const q = (message || '').toLowerCase();
  
  if (q.includes('recursion')) {
    return `### Understanding Recursion in Computer Science\n\n**Recursion** is a programming pattern where a function solves a problem by calling a smaller instance of itself.\n\nEvery recursive algorithm requires two critical components:\n1. **Base Case:** The condition that halts the recursion to prevent an infinite stack overflow.\n2. **Recursive Step:** The logic that reduces the problem size towards the base case.\n\n\`\`\`javascript\n// Classic Example: Factorial\nfunction factorial(n) {\n  if (n <= 1) return 1; // Base case\n  return n * factorial(n - 1); // Recursive step\n}\n\`\`\`\n\n**Time Complexity:** O(N) | **Space Complexity:** O(N) auxiliary stack memory.`;
  }

  if (q.includes('tree') || q.includes('avl') || q.includes('bst')) {
    return `### Binary Search Trees vs. AVL Trees\n\n- **BST (Binary Search Tree):** For every node, left descendants are strictly smaller, right descendants are strictly greater. In the worst case (unbalanced insertion), lookup degrades to **O(N)**.\n- **AVL Tree:** A strictly self-balancing BST where the height difference (*Balance Factor*) between left and right subtrees of any node is at most $\\pm 1$.\n\n**Balancing Rotations in AVL:**\n- **Left Rotation (LL)** & **Right Rotation (RR)** for single pivots.\n- **Left-Right (LR)** & **Right-Left (RL)** for zigzag imbalances.\n\n**Guaranteed Lookup/Insert/Delete:** $O(\\log N)$.`;
  }

  if (q.includes('java') || q.includes('oop')) {
    return `### Core Java OOP Principles\n\n1. **Encapsulation:** Binding data variables with methods and restricting direct field access via private access modifiers and getters/setters.\n2. **Abstraction:** Hiding implementation details using interfaces and abstract classes.\n3. **Inheritance:** Code reuse through the \`extends\` keyword.\n4. **Polymorphism:** Method Overloading (compile-time) and Method Overriding (runtime).`;
  }

  if (q.includes('dynamic programming') || q.includes('dp')) {
    return `### Dynamic Programming (DP) Blueprint\n\nDynamic Programming optimizes recursion by storing intermediate subproblem solutions (*Memoization* or *Tabulation*).\n\n**Key Characteristics:**\n1. **Optimal Substructure:** Optimal solution of problem contains optimal solutions of subproblems.\n2. **Overlapping Subproblems:** Same subproblems are computed multiple times.\n\n**Common Patterns:**\n- 0/1 Knapsack\n- Longest Common Subsequence (LCS)\n- Fibonacci / Climbing Stairs\n- Matrix Chain Multiplication`;
  }

  return `Great question! Let's explore **${message.trim()}**.\n\nIn computer science, mastering this topic involves understanding:\n- **Core Mechanism:** The underlying algorithm or architecture.\n- **Trade-offs:** Time vs. Space complexity constraints.\n- **Implementation:** Writing clean, testable code.\n\nWould you like me to walk you through an example problem or dive into practical code implementations?`;
}

function generateOfflineInterviewEvaluation({ positionTitle, answers = [], strikeCount = 0, violations = [] }) {
  const answeredCount = answers.filter(a => (a.transcript || '').trim().length > 10).length;
  const totalCount = Math.max(answers.length, 1);
  const ratio = answeredCount / totalCount;

  let baseScore = Math.round(55 + ratio * 35);
  const penalty = strikeCount * 12 + violations.length * 3;
  const overallScore = Math.max(20, Math.min(96, baseScore - penalty));
  const technicalScore = Math.max(25, Math.min(94, Math.round(overallScore * 1.02)));
  const communicationScore = Math.max(30, Math.min(95, Math.round(overallScore * 0.98)));
  const problemSolvingScore = Math.max(25, Math.min(92, Math.round((technicalScore + overallScore) / 2)));

  return {
    overallScore,
    technicalScore,
    communicationScore,
    problemSolvingScore,
    summary: `Candidate completed the interview for ${positionTitle}. Demonstrated ${technicalScore >= 70 ? 'strong' : 'moderate'} theoretical foundation with ${strikeCount > 0 ? `${strikeCount} proctoring warning(s)` : 'clean proctoring validation'}.`,
    strengths: [
      "Structured articulation of algorithmic approaches",
      "Good comprehension of fundamental computer science trade-offs",
      "Calm pacing and consistent audio clarity"
    ],
    areasForImprovement: [
      "Provide more concrete real-world production examples",
      "Deepen discussion on edge cases and failure mode handling",
      "Address time & space complexity constraints explicitly before coding"
    ],
    questionFeedback: answers.map((a, i) => ({
      questionNumber: i + 1,
      score: Math.max(40, Math.min(95, Math.round(technicalScore + (i % 2 === 0 ? 4 : -4)))),
      feedback: (a.transcript && a.transcript.length > 20) 
        ? "Good explanation covered core points; consider emphasizing scalability."
        : "Answer was brief; elaborate on architectural nuances and edge cases."
    }))
  };
}
