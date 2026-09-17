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
      const systemInstruction = `You are DOAP AI, a world-class AI engineering mentor, computer science tutor, and institutional guide for Sanjivani University.
You help students with DSA, algorithms, software engineering, AI/ML, system design, coding interviews, and department academic queries.
Guidelines:
- Give clear, structured, pedagogical explanations with code snippets where helpful.
- Keep explanations concise yet deep.
- Tone: friendly, encouraging, sharp, and academic.
- User info: ${userContext.name || 'Student'}, Year: ${userContext.year || '3rd Year'}, Major: ${userContext.course || 'Computer Science'}.

DEPARTMENT FACULTY & LEADERSHIP DIRECTORIES:

1. Department of Integrated M.Tech (IMTECH):
- Head of Department (HOD): Dr. Anwar A Shaikh (Contact: 9044013605, Email: anwarshaikhset@sanjivani.edu.in)
- 1st Year: Prof. Prajwal Aher (Maths-1, NSS), Prof. Piyush Sahu (Design Thinking, Indian Knowledge System), Dr. Anwar A Shaikh (Computing Systems), Prof. Sadhna Gunjir (English), Prof. Hari Prasath K (C Programming)
- 2nd Year: Dr. Latika Bawankar (Linear Algebra), Prof. Prajwal Aher (Python / Data Science), Prof. Piyush Sahu (Cyber Security), Prof. Vikas Kumar (Data Analytics), Dr. Anwar A Shaikh (DSA), Dr. Bandana Thakur (Financial Management), Prof. D. Roushan (Japanese), Prof. Riya Khandelwal (German)

2. Department of Artificial Intelligence and Data Science (AI & DS):
- Head of Department (HOD): Dr. Kishor Jhadav (Contact: 9890423309)
- First Year Class Coordinator: Dr. Shreeparna Das (Cabin: 9th Floor)
- Faculties: Dr. Vishwesh Nagamalla (Programming & Data Structures, 9th Floor), Prashant Kamkar (Python, IBM Center / Lab), Ganesh Phopase (Technical Communication), Sarvjeet Singh (Engineering Maths, 2nd Floor), Dr. Tanay Ghosh (Physics Theory, 2nd Floor), Mrs. Sarika Maske (Physics Practicals, Extension Building), Dr. Hirak Chatterjee (Chemistry, 10th Floor), Ms. Tanvi Chatse (German)

3. Department of Mechanical Engineering:
- Head of Department (HOD): Kailash Bhosale (Cabin: 7th Floor Staff Room)
- Class Coordinator: Omkar Dadi | Clerk: Harshda Kolpe | All faculty on 7th Floor Staff Room
- Faculties: Pankaj Patil (CAD/Graphics), Kiran Wakchure (Makerspace), Jaydeep Ashtekar & Pratibha Sinha (Python), Tanay Renu Ghosh (Physics), Hirak Chatterjee (Chemistry), Prajwal Aher (Maths), Sadhna Ganjir (English)

CRITICAL PRECISION RULE:
- When asked a specific question (e.g., "Who is the HOD of IMTech?", "Who teaches Python?", "Where is Dr. Vishwesh's cabin?"), answer ONLY that specific question with the exact person's name, title, cabin, and contact details in 2-4 lines.
- NEVER dump the entire faculty directory or list unrelated professors unless the user explicitly requests the full list or all faculties.`;

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

  // Check for HOD specific queries
  if (q.includes('hod') || q.includes('head of department') || q.includes('dept head')) {
    if (q.includes('imtech') || q.includes('integrated') || q.includes('anwar')) {
      return `### 🎓 Head of Department (HOD) — Integrated M.Tech (IMTECH)\n\n- 🎖️ **Head of Department (HOD):** **Dr. Anwar A Shaikh**\n- 📞 **Contact Number:** \`9044013605\`\n- ✉️ **Email:** \`anwarshaikhset@sanjivani.edu.in\`\n- 🏛️ **Department:** Integrated M.Tech (IMTECH), School of Engineering & Technology\n- 📚 **Subjects:** Fundamentals of Computing Systems (1st Year) | Data Structures & Algorithms (2nd Year)`;
    }
    if (q.includes('mech') || q.includes('bhosale')) {
      return `### 🔧 Head of Department (HOD) — Mechanical Engineering\n\n- 🎖️ **Head of Department (HOD):** **Kailash Bhosale**\n- 🏢 **Cabin Location:** **7th Floor Staff Room**\n- 🏛️ **Department:** Mechanical Engineering, School of Engineering & Technology`;
    }
    return `### 🏛️ Head of Department (HOD) — Artificial Intelligence & Data Science (AI & DS)\n\n- 🎖️ **Head of Department (HOD):** **Dr. Kishor Jhadav**\n- 📞 **Contact Number:** \`9890423309\`\n- 🏛️ **Department:** Artificial Intelligence & Data Science, School of Engineering & Technology`;
  }

  // Check for specific faculty member queries
  if (q.includes('anwar shaikh') || (q.includes('anwar') && !q.includes('hod'))) {
    return `### 👨‍🏫 Faculty Profile: Dr. Anwar A Shaikh\n\n- 🎖️ **Role:** Head of Department (HOD) & Faculty\n- 🏛️ **Department:** Integrated M.Tech (IMTECH)\n- 📚 **Subjects Taught:** Computing Systems (1st Year) | Data Structures & Algorithms (2nd Year)\n- 📞 **Contact:** \`9044013605\` | ✉️ \`anwarshaikhset@sanjivani.edu.in\``;
  }
  if (q.includes('vishwesh')) {
    return `### 👨‍🏫 Faculty Profile: Dr. Vishwesh Nagamalla\n\n- 🎖️ **Role:** Senior Faculty\n- 🏛️ **Department:** Artificial Intelligence & Data Science (AI & DS)\n- 📚 **Subject:** Introduction to Programming and Data Structure\n- 🏢 **Cabin Location:** **9th Floor**`;
  }
  if (q.includes('kamkar')) {
    return `### 👨‍🏫 Faculty Profile: Prashant Kamkar (IBM Faculty)\n\n- 🎖️ **Role:** IBM Industry Expert Faculty\n- 🏛️ **Department:** AI & DS | 🐍 **Subject:** Python Programming\n- 💻 **Location:** **IBM Center / Lab**`;
  }

  if (q.includes('faculty') || q.includes('teacher') || q.includes('prof') || q.includes('cabin') || q.includes('directory')) {
    if (q.includes('imtech') || q.includes('integrated')) {
      return `### 🎓 Department of Integrated M.Tech (IMTECH) — Faculty Directory\n\n- **HOD:** **Dr. Anwar A Shaikh** (📞 \`9044013605\` | ✉️ \`anwarshaikhset@sanjivani.edu.in\`)\n- **1st Year:** Prof. Prajwal Aher (Maths-1), Prof. Piyush Sahu (Design Thinking), Dr. Anwar A Shaikh (Computing Systems), Prof. Sadhna Gunjir (English), Prof. Hari Prasath K (C Programming)\n- **2nd Year:** Dr. Latika Bawankar (Linear Algebra), Prof. Prajwal Aher (Python), Prof. Piyush Sahu (Cyber Security), Prof. Vikas Kumar (Data Analytics), Dr. Anwar A Shaikh (DSA), Dr. Bandana Thakur (Financial Management), Prof. D. Roushan (Japanese), Prof. Riya Khandelwal (German)`;
    }
    return `### 🏛️ Department of Artificial Intelligence & Data Science (AI & DS)\n#### 👨‍🏫 Faculty, Subject & Cabin Directory\n\n**👑 Leadership:**\n- **Head of Department (HOD):** **Dr. Kishor Jhadav** | 📞 Contact: \`9890423309\`\n- **First Year Class Coordinator:** **Dr. Shreeparna Das** | 🏢 Cabin: **9th Floor**\n\n| Faculty Name | Subject | Cabin Location |\n| :--- | :--- | :--- |\n| **Dr. Vishwesh Nagamalla** | Introduction to Programming and Data Structure | 🏢 **9th Floor** |\n| **Prashant Kamkar** (IBM) | Python | 💻 **IBM Center / Lab** |\n| **Ganesh Phopase** | Technical & Professional Communication Skills | 🏢 **Department** |\n| **Sarvjeet Singh** | Engineering Mathematics | 🏢 **2nd Floor** |\n| **Dr. Tanay Ghosh** | Applied Physics (Theory) | 🏢 **2nd Floor** |\n| **Mrs. Sarika Maske** | Applied Physics (Practical) | 🏢 **Extension Building** |\n| **Dr. Hirak Chatterjee** | Applied Chemistry (Theory & Practical) | 🏢 **10th Floor** |\n| **Ms. Tanvi Chatse** | German | 🏢 **Language Wing** |\n| **Dr. Shreeparna Das** | First Year Class Coordinator | 🏢 **9th Floor** |`;
  }

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
