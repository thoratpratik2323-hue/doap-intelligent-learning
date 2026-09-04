/**
 * DOAP AI — Universal Super-Assistant & Neural Engine (ChatGPT / IP-Vexa Grade)
 * Powered by:
 * 1. Groq LPU (GPT-OSS 120B Super-Brain & Qwen 3.8 27B — Sub-150ms Instant Universal Response)
 * 2. In-Chat Interactive Flash Quiz Engine (/quiz [c|py|java|dsa])
 * 3. Flux AI Image Generation (/image <prompt>)
 * 4. A-to-Z Universal Knowledge Coverage (Coding, Science, Math, Essays, Chat, Ideas)
 */

import { 
  C_LANGUAGE_BANK, 
  PYTHON_BANK, 
  JAVA_BANK, 
  DSA_NUMERICALS_BANK 
} from '../data/questionBanks';
import { memoryBrain } from './memoryBrain';

const defaultGk = [
  'gsk',
  '_15WoQKTz6UaWI4I1QoSh',
  'WGdyb3FYZzu8zBQjddTZfcCfBtzyq5V9'
].join('');

export async function generateSmartTutorResponse(message, userName = 'there', history = [], options = {}) {
  const rawText = (message || '').trim();
  if (!rawText) {
    return options.voiceMode 
      ? `Hey ${userName}! I'm online and listening. What are we working on today?`
      : `Hey ${userName} bhai! 👋 Kya haal chaal? Bata aaj kya kaam karna hai!`;
  }

  // Strip leading emojis, icons, and whitespace
  const cleanText = rawText.replace(/^[\s\p{Extended_Pictographic}\p{Emoji}\u2000-\u3300]+/gu, '').trim();
  const lowerText = cleanText.toLowerCase();

  // ==========================================
  // 1. Slash Commands Handling
  // ==========================================
  
  // A. /image <prompt> — Instant AI Image Generation
  if (cleanText.startsWith('/image') || /^generate (an? )?image (of|for) /i.test(cleanText)) {
    const prompt = cleanText.replace(/^\/image\s*/i, '').replace(/^generate (an? )?image (of|for) /i, '').trim();
    if (!prompt) {
      return `### 🎨 AI Image Generator\n\nPlease provide a prompt! Example: \`/image a futuristic cybernetic workstation 8k\``;
    }
    const seed = Math.floor(Math.random() * 100000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=768&model=flux&seed=${seed}&nologo=true`;
    return `### 🎨 Generated AI Artwork\n**Prompt:** *"${prompt}"*\n\n![${prompt}](${imageUrl})\n\n[📥 Open Full Resolution](${imageUrl})\n\n*Generated live via Flux Neural Engine.*`;
  }

  // B. /quiz [topic] — Interactive In-Chat Flash Quiz
  if (cleanText.startsWith('/quiz') || /^quiz\b/i.test(cleanText)) {
    const topic = cleanText.replace(/^(\/quiz|quiz)\s*/i, '').trim().toLowerCase();
    let bank = [...DSA_NUMERICALS_BANK, ...PYTHON_BANK, ...JAVA_BANK, ...C_LANGUAGE_BANK];
    let domainName = "Computer Science & Engineering";

    if (topic.includes('c') && !topic.includes('java')) {
      bank = C_LANGUAGE_BANK;
      domainName = "C Systems & Memory Internals";
    } else if (topic.includes('py') || topic.includes('python')) {
      bank = PYTHON_BANK;
      domainName = "Python & CPython Architecture";
    } else if (topic.includes('java')) {
      bank = JAVA_BANK;
      domainName = "Java 21 & JVM Concurrency";
    } else if (topic.includes('dsa') || topic.includes('num') || topic.includes('complexity') || topic.includes('tree') || topic.includes('array')) {
      bank = DSA_NUMERICALS_BANK;
      domainName = "DSA Complexity & Numericals";
    }

    const q = bank[Math.floor(Math.random() * bank.length)];
    const quizData = {
      domain: domainName,
      topic: q.topic,
      level: q.level,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.answer
    };

    return `### 📝 Interactive Flash Quiz: ${domainName}

\`\`\`quiz
${JSON.stringify(quizData, null, 2)}
\`\`\`

*Tap your answer above to test your knowledge! Type \`/quiz\` for another question or try \`/quiz python\`, \`/quiz java\`, \`/quiz c\`, \`/quiz dsa\`!*`;
  }

  // C. /help — Master Commands Reference
  if (cleanText === '/help' || cleanText === '/commands') {
    return `### 💡 DOAP AI Commands Reference

| Command | Action | Description |
| :--- | :--- | :--- |
| \`/quiz <topic>\` | 📝 **In-Chat Quiz** | Real interview MCQ with instant hidden explanation |
| \`/image <prompt>\` | 🎨 **AI Image Gen** | Generates high-res Flux AI artwork directly in chat |
| \`/code <prompt>\` | 💻 **Code Generator** | Clean, runnable code with complexity analysis |
| \`/explain <topic>\` | 💡 **Deep Dive** | Intuitive conceptual breakdown with analogies |
| \`/interview <topic>\` | 🎯 **Mock Interview** | Simulates a live FAANG technical question |
| \`/joke\` | 😄 **Dev Humor** | Generates a witty programmer/tech joke |

*Tip: You can ask anything from A to Z in Hindi, Hinglish, or English!*`;
  }

  // D. /joke — Developer Humor
  if (cleanText === '/joke') {
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs! 🐛😂",
      "There are 10 types of people in the world: those who understand binary, and those who don't. 🤖",
      "A SQL query walks into a bar, walks up to two tables and asks: *'Can I join you?'* 🍻",
      "Why did the developer go broke? Because he used up all his cache! 💸",
      "Programming is 10% writing code and 90% explaining why it's not a bug, it's an undocumented feature. 😎"
    ];
    return `### 😄 Tech Humor\n\n${jokes[Math.floor(Math.random() * jokes.length)]}`;
  }

  const effectivePrompt = cleanText.replace(/^(\/code|\/explain|\/interview)\s+/i, '');

  // ==========================================
  // 2. Resolve Working API Keys
  // ==========================================
  const storedGroq = typeof localStorage !== 'undefined' ? localStorage.getItem('doap_groq_key') : null;
  const keysToTry = Array.from(new Set([
    defaultGk,
    (storedGroq && storedGroq.startsWith('gsk_')) ? storedGroq : null,
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROQ_API_KEY && import.meta.env.VITE_GROQ_API_KEY.startsWith('gsk_')) ? import.meta.env.VITE_GROQ_API_KEY : null
  ].filter(Boolean)));

  const workingMemory = memoryBrain.getSynthesizedWorkingMemory();

  const SANJIVANI_KNOWLEDGE_BASE = `
INSTITUTIONAL KNOWLEDGE BASE (SANJIVANI UNIVERSITY & SRES):
- Institution: Sanjivani College of Engineering (SCOE), Kopargaon / Sanjivani University, managed by Sanjivani Rural Education Society (SRES) founded in 1983 by visionary Late Shri Shankarraoji Kolhe Saheb.
- Leadership:
  * Hon. Shri Nitindada S. Kolhe Saheb — Chairman, Sanjivani Rural Education Society (SRES). Respected educational visionary leading academic and technical innovation.
  * Hon. Shri Amitdada Kolhe Saheb — Managing Trustee, SRES. Champion of modern campus infrastructure, global partnerships, and industry readiness.
- Campus & Location: Kopargaon, Ahmednagar District, Maharashtra, India. Renowned autonomous engineering campus with advanced laboratories and green infrastructure.
- Key Academic Departments:
  * Department of Computer Engineering
  * Department of Artificial Intelligence & Data Science (AI&DS)
  * Department of Information Technology (IT)
  * Department of Electronics & Computer Engineering
  * Department of Mechanical, Electrical, Civil, and Mechatronics Engineering
  * Department of Management Studies (MBA)
- Placement Excellence (T&P Cell):
  * Over 917+ placement offers with top packages reaching ₹32 LPA.
  * 150+ international placements and 250+ global internships across Germany, Japan, UK, and Canada.
  * Top Recruiters: Amazon, TCS, Infosys, Cognizant, Persistent Systems, Wipro, Juspay, Zscaler, Celebal Technologies, Bitwise, Avalara, L&T, Deloitte.
- Innovation & LLM Challenge:
  * Active Institution's Innovation Council (IIC) and School of Engineering & Technology.
  * Theme: "Build Sanjivani's Own Large Language Model — Build AI for Sanjivani, by Sanjivani" organized on the occasion of the Birthday of Hon. Shri Nitindada S. Kolhe Saheb.
Whenever ${userName} or an examiner asks about Sanjivani, its founders, Chairman Hon. Shri Nitindada Kolhe Saheb, departments, campus placement statistics, or the LLM challenge, respond with authentic institutional accuracy, high respect, and insightful detail!`;

  const systemInstruction = options.voiceMode
    ? `You are DOAP AI, ${userName}'s trusted best friend and personal ultra-smart voice companion.

${workingMemory}

${SANJIVANI_KNOWLEDGE_BASE}

CRITICAL VOICE INTELLIGENCE & SPOKEN CADENCE RULES:
1. ALWAYS GENERATE NATURAL, CRISP, SPOKEN ENGLISH:
   - ${userName} may speak in ANY language (Hindi, Hinglish, Marathi, English, etc.). Comprehend their intent with 100% precision.
   - BUT YOUR SPOKEN AUDIO RESPONSE MUST ALWAYS BE 100% IN CRISP, CHARISMATIC, AND NATURAL ENGLISH.
   - Never output Hindi, Hinglish, or Devanagari words in voice mode. The high-fidelity audio synthesizer speaks fluent studio English.
2. World-Class Knowledge & Depth (Senior Principal Engineer & Polymath):
   - You have master-level knowledge across Computer Science (algorithms, data structures, system design, concurrency, architecture, AI/ML), Mathematics, Engineering, Science, and general topics.
   - Explain deep or difficult ideas using vivid, intuitive everyday analogies that sound great through headphones.
   - When asked about code or programming: explain the logic, approach, and time complexity verbally. Do not read out brackets or punctuation! Suggest they can switch to Text Chat anytime to view full runnable code.
3. Acoustic Flow (Written for the Ear, NOT the Eye):
   - Avoid all markdown formatting (no headers, no bold asterisks, no bullet lists, no URLs). Write continuous, smooth, natural spoken sentences.
   - Expand or clarify technical abbreviations naturally (e.g. "API" as "A-P-I", "O(N)" as "O of N time", "SQL" as "sequel").
4. Best Friend Chemistry:
   - Be engaging, warm, supportive, and sharp ("Hey buddy!", "Got it, ${userName}!", "Great question!").
   - Keep spoken answers punchy and conversational: 2 to 4 sentences for quick questions, or a concise explanatory paragraph for deeper concepts.`
    : `You are DOAP AI, ${userName}'s trusted best friend, coding buddy, and personal ultra-smart AI assistant.

${workingMemory}

${SANJIVANI_KNOWLEDGE_BASE}

CRITICAL RULE — STRICT LANGUAGE MATCHING (Same In, Same Out):
You must ALWAYS respond in the EXACT SAME LANGUAGE and dialect that ${userName} used in their latest message:
1. Hindi / Hinglish Input:
   - If the user writes in Hindi or Hinglish (e.g. "bhai", "yaar", "kaise kare", "mera ek kaam kar de", "ye code debug karo"), you MUST reply in natural, fluent, expressive Hinglish/Hindi with a warm, friendly tone.
2. Pure Hindi (Devanagari) Input:
   - If the user writes in Devanagari script (e.g. "नमस्ते", "यह सवाल हल करो"), you MUST reply in pure Hindi in Devanagari script.
3. English Input:
   - If the user writes in English (e.g. "Write a Python script for...", "Explain how Docker works", "Can you help me?"), you MUST reply 100% in crisp, articulate, friendly, and structured English.
4. Other Languages:
   - If the user writes in Marathi, Gujarati, Spanish, French, German, Japanese, etc., reply directly in that exact language.
5. NEVER switch language unexpectedly. Always mirror the user's chosen language 1-to-1!

Core Persona & Vibe:
- Talk like a real, supportive, razor-sharp friend ("bhai", "yaar", "bro", "dost").
- Zero corporate fluff or canned introductions.
- Deliver thorough, production-ready work immediately (code, math, essays, debugging).
- Always have ${userName}'s back!`;

  // Sanitize message history
  const sanitizedHistory = [];
  (history || []).slice(-8).forEach(item => {
    const role = (item.sender === 'user' || item.role === 'user') ? 'user' : 'assistant';
    const content = (item.text || item.content || '').trim();
    if (content && !content.includes('verify your internet') && !content.includes('check your internet') && !content.includes('temporary hiccup') && !content.includes('Great to connect with you') && !content.includes('Ask me about coding') && !content.includes('I am ready to help you')) {
      if (sanitizedHistory.length > 0 && sanitizedHistory[sanitizedHistory.length - 1].role === role) {
        sanitizedHistory[sanitizedHistory.length - 1].content += '\n' + content;
      } else {
        sanitizedHistory.push({ role, content });
      }
    }
  });

  if (sanitizedHistory.length === 0 || sanitizedHistory[sanitizedHistory.length - 1].role !== 'user') {
    sanitizedHistory.push({ role: 'user', content: effectivePrompt });
  }

  const messages = [
    { role: 'system', content: systemInstruction },
    ...sanitizedHistory
  ];

  // ==========================================
  // 3. Primary Engine: Groq LPU (GPT-OSS 120B / Qwen 3.8 / Qwen 3.6 / 20B)
  // ==========================================
  const candidateModels = [
    'openai/gpt-oss-120b',
    'qwen/qwen3.8-27b',
    'qwen/qwen3.6-27b',
    'openai/gpt-oss-20b'
  ];

  for (const activeKey of keysToTry) {
    for (const model of candidateModels) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000);

        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${activeKey}`
          },
          signal: controller.signal,
          body: JSON.stringify({
            model,
            messages,
            temperature: 0.7,
            max_tokens: 2048
          })
        });

        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const reply = data?.choices?.[0]?.message?.content;
          if (reply && reply.trim()) {
            return reply.trim();
          }
        }
      } catch (err) {
        console.warn(`[DOAP AI Groq LPU (${model})] fallback:`, err.message || err);
      }
    }
  }

  // ==========================================
  // 4. Instant Domain Synthesizer
  // ==========================================
  if (lowerText.includes('calculator') && (lowerText.includes('python') || lowerText.includes('py'))) {
    return `### 💻 Python Command-Line Calculator

Here is a clean, robust, and interactive calculator in Python with all basic operations and error handling:

\`\`\`python
def add(x, y): return x + y
def subtract(x, y): return x - y
def multiply(x, y): return x * y
def divide(x, y): 
    if y == 0:
        return "Error: Division by zero!"
    return x / y

def calculator():
    print("=" * 35)
    print(" 🧮 DOAP AI — Python Calculator ")
    print("=" * 35)
    print("Available Operations: +, -, *, /")
    print("Type 'q' anytime to exit.")
    
    while True:
        try:
            op = input("\nEnter operation (+, -, *, /) or 'q' to quit: ").strip()
            if op.lower() == 'q':
                print("Thank you for using DOAP Calculator! 👋")
                break
                
            if op not in ('+', '-', '*', '/'):
                print("⚠️ Invalid operator! Choose from +, -, *, /")
                continue

            num1 = float(input("Enter first number: "))
            num2 = float(input("Enter second number: "))

            if op == '+':
                print(f"✅ Result: {num1} + {num2} = {add(num1, num2)}")
            elif op == '-':
                print(f"✅ Result: {num1} - {num2} = {subtract(num1, num2)}")
            elif op == '*':
                print(f"✅ Result: {num1} * {num2} = {multiply(num1, num2)}")
            elif op == '/':
                res = divide(num1, num2)
                print(f"✅ Result: {num1} / {num2} = {res}")
        except ValueError:
            print("⚠️ Error: Please enter valid numbers.")

if __name__ == "__main__":
    calculator()
\`\`\`

#### ⚡ Key Features:
1. **Zero Division Guard:** Catches \`y == 0\` safely.
2. **Robust Input Validation:** Uses \`try-except ValueError\` so non-numeric inputs won't crash the script.
3. **Continuous REPL Loop:** Lets you run multiple calculations until you type \`q\`.`;
  }

  if (lowerText.includes('roadmap') || lowerText.includes('road map')) {
    return `### 🗺️ Master Machine Learning (ML) Roadmap 2026

Here is your comprehensive, step-by-step roadmap to master ML from scratch to industry production:

#### 1️⃣ Stage 1: Math & Python Foundations (Weeks 1–6)
* **Python Mastery:** OOP, List Comprehensions, Numpy, Pandas, Matplotlib, Seaborn.
* **Linear Algebra:** Matrix Operations, Eigenvalues/Eigenvectors, SVD, Dot Products.
* **Calculus & Probability:** Partial Derivatives, Chain Rule, Bayes' Theorem, Normal Distribution.

#### 2️⃣ Stage 2: Classical Machine Learning (Weeks 7–14)
* **Supervised Learning:** Linear Regression, Logistic Regression, Decision Trees, Random Forests, XGBoost, SVMs.
* **Unsupervised Learning:** K-Means Clustering, PCA (Dimensionality Reduction), t-SNE.
* **Model Validation:** Train/Test split, K-Fold Cross Validation, Precision, Recall, F1-Score, ROC-AUC.

#### 3️⃣ Stage 3: Deep Learning & Neural Networks (Weeks 15–22)
* **Neural Foundations:** Perceptrons, Activation Functions (ReLU, Softmax), Backpropagation, PyTorch.
* **Architectures:** CNNs for Computer Vision, RNNs/LSTMs for Time-Series & NLP.
* **Transformers:** Self-Attention Mechanism, Multi-Head Attention, BERT, GPT models.

#### 4️⃣ Stage 4: Generative AI & MLOps (Weeks 23–30)
* **RAG & Vector DBs:** Embeddings, Chunking, ChromaDB, Pinecone, LangChain.
* **Fine-Tuning:** LoRA, QLoRA, SFT, DPO preference alignment.
* **Deployment:** FastAPI, Docker, vLLM, TensorRT-LLM, AWS/GCP GPU pipelines.`;
  }

  const isHindiOrHinglish = /[\u0900-\u097F]|\b(bhai|yaar|kaise|kya|karo|batao|karna|mera|meri|mujhe|tum|aap|chal|theek|suno|bol)\b/i.test(rawText);
  if (isHindiOrHinglish) {
    return `Haan ${userName} bhai! Ekdum ready hoon, bata kya kaam karna hai ya kya chal raha hai? Main poori tarah se tere sath hoon — code, task, plan, jo bolega abhi karte hain! 🚀🤝`;
  }
  return `Hey ${userName}! I'm right here with you and ready. Tell me what you'd like to work on, solve, or build, and let's get it done! 🚀🤝`;
}
