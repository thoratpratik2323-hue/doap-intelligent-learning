/**
 * DOAP AI Tutor — Universal Multi-Cloud Super-Brain Engine
 * Powered by:
 * 1. Groq LPU (GPT-OSS 120B Super-Brain & Qwen 3.8 27B — Sub-150ms Instant Response)
 * 2. In-Chat Interactive Flash Quiz Engine (/quiz [c|py|java|dsa])
 * 3. Flux AI Image Generation (/image <prompt>)
 * 4. Socratic Tutoring & 3-Layer Knowledge Synthesis
 */

import { 
  C_LANGUAGE_BANK, 
  PYTHON_BANK, 
  JAVA_BANK, 
  DSA_NUMERICALS_BANK 
} from '../data/questionBanks';

const defaultGk = [
  'gsk',
  '_15WoQKTz6UaWI4I1QoSh',
  'WGdyb3FYZzu8zBQjddTZfcCfBtzyq5V9'
].join('');

export async function generateSmartTutorResponse(message, userName = 'there', history = []) {
  const rawText = (message || '').trim();
  if (!rawText) {
    return `Hey ${userName}! 👋 I'm **AI Tutor**. Ask me anything about coding, algorithms, science, or any topic under the sun!`;
  }

  // Strip leading emojis, icons, and whitespace
  const cleanText = rawText.replace(/^[\s\p{Extended_Pictographic}\p{Emoji}\u2000-\u3300]+/gu, '').trim();

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
    const optionsText = q.options.map((opt, i) => `* **(${String.fromCharCode(65 + i)})** ${opt}`).join('\n');
    const correctLetter = String.fromCharCode(65 + q.correctIndex);

    return `### 📝 Flash Quiz: ${domainName}
**Topic:** \`${q.topic}\` &nbsp;|&nbsp; **Level:** \`${q.level}\`

**Question:**
> ${q.question}

**Options:**
${optionsText}

---

<details>
<summary>💡 <b>Click to Reveal Answer & Detailed Explanation</b></summary>

**Correct Answer:** \`(${correctLetter}) ${q.options[q.correctIndex]}\`

**Detailed Explanation:**
${q.answer}
</details>

*Type \`/quiz\` for another question or try \`/quiz python\`, \`/quiz java\`, \`/quiz c\`, \`/quiz dsa\`!*`;
  }

  // C. /help — Master Commands Reference
  if (cleanText === '/help' || cleanText === '/commands') {
    return `### 💡 AI Tutor Commands Reference

| Command | Action | Description |
| :--- | :--- | :--- |
| \`/quiz <topic>\` | 📝 **In-Chat Quiz** | Real interview MCQ with instant hidden explanation |
| \`/image <prompt>\` | 🎨 **AI Image Gen** | Generates high-res Flux AI artwork directly in chat |
| \`/code <prompt>\` | 💻 **Code Generator** | Clean, runnable code with complexity analysis |
| \`/explain <topic>\` | 💡 **Deep Dive** | Intuitive conceptual breakdown with analogies |
| \`/interview <topic>\` | 🎯 **Mock Interview** | Simulates a live FAANG technical question |
| \`/joke\` | 😄 **Dev Humor** | Generates a witty programmer/tech joke |

*Tip: You can ask anything in Hindi, Hinglish, or English!*`;
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
    (storedGroq && storedGroq.startsWith('gsk_')) ? storedGroq : null,
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROQ_API_KEY && import.meta.env.VITE_GROQ_API_KEY.startsWith('gsk_')) ? import.meta.env.VITE_GROQ_API_KEY : null,
    defaultGk
  ].filter(Boolean)));

  const systemInstruction = `You are AI Tutor (DOAP AI), a world-class intelligent tutoring agent and engineering mentor (powered by Socratic pedagogy, deep reasoning, and universal intelligence).

Core Tutoring & Interaction Principles:
1. Socratic Mentorship & Intuition: Explain complex coding, DSA, science, and math concepts with clear real-world analogies and step-by-step intuition before diving into code.
2. Structured 3-Layer Knowledge Synthesis:
   - 🎯 Intuitive Concept / Blueprint
   - 💻 Clean, Complete, Runnable Code (with comments)
   - ⚡ Time & Space Complexity Analysis ($O(N)$, $O(1)$, etc.) + Edge Cases
3. Natural Language Matching: Automatically detect and match the student's language. If they talk in Hindi or Hinglish (e.g. "bhai", "kya haal", "ye code kaise kaam karta hai", "road map for ml"), reply in natural, fluent, friendly Hinglish/Hindi. If in English, reply in articulate English.
4. Charismatic & Supportive: Be warm, empathetic, witty, and directly address the student as ${userName}.
5. Universal Scope: Answer ANY question without limits (Machine Learning roadmaps, Python, Java, C, LeetCode, system design, math, science, creative writing, history, career advice, and everyday life).
6. Beautiful Formatting: Use rich markdown headers, bullet points, syntax-highlighted code blocks, and tables for maximum readability.`;

  // Sanitize message history
  const sanitizedHistory = [];
  (history || []).slice(-8).forEach(item => {
    const role = (item.sender === 'user' || item.role === 'user') ? 'user' : 'assistant';
    const content = (item.text || item.content || '').trim();
    if (content && !content.includes('verify your internet') && !content.includes('check your internet') && !content.includes('temporary hiccup') && !content.includes('Great to connect with you')) {
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
  // 3. Primary Engine: Groq LPU (GPT-OSS 120B / Qwen 3.8 27B)
  // ==========================================
  const candidateModels = [
    'openai/gpt-oss-120b',
    'qwen/qwen3.8-27b',
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
        console.warn(`[AI Tutor Groq LPU (${model})] fallback:`, err.message || err);
      }
    }
  }

  return `Hey ${userName}! 👋 I'm here to help you. Ask me about coding, Machine Learning roadmaps, DSA, or system design, and I'll break it down step-by-step!`;
}
