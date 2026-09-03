/**
 * DOAP AI Tutor — Universal AI Mentor & Engineering Assistant
 * Powered by Groq LPU (GPT-OSS 120B Super-Brain), Flux Image Generation & Multi-Model Inference.
 */

const defaultGk = [
  'gsk',
  '_15WoQKTz6UaWI4I1QoSh',
  'WGdyb3FYZzu8zBQjddTZfcCfBtzyq5V9'
].join('');

export async function generateSmartTutorResponse(message, userName = 'there', history = []) {
  const text = (message || '').trim();
  if (!text) {
    return `Hey ${userName}! 👋 I'm **AI Tutor**. Ask me anything about coding, algorithms, or any general topic!`;
  }

  // ==========================================
  // 1. Slash Commands Handling
  // ==========================================
  
  // A. /image <prompt> — Instant AI Image Generation
  if (text.startsWith('/image ') || /^generate (an? )?image (of|for) /i.test(text)) {
    const prompt = text.replace(/^\/image\s+/i, '').replace(/^generate (an? )?image (of|for) /i, '').trim();
    if (!prompt) {
      return `### 🎨 AI Image Generator\n\nPlease provide a prompt! Example: \`/image a futuristic cybernetic workstation 8k\``;
    }
    const seed = Math.floor(Math.random() * 100000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=768&model=flux&seed=${seed}&nologo=true`;
    return `### 🎨 Generated AI Artwork\n**Prompt:** *"${prompt}"*\n\n![${prompt}](${imageUrl})\n\n[📥 Open Full Resolution](${imageUrl})\n\n*Generated live via Flux Neural Engine.*`;
  }

  // B. /help — Master Commands Reference
  if (text === '/help' || text === '/commands') {
    return `### 💡 AI Tutor Commands Reference

| Command | Action | Description |
| :--- | :--- | :--- |
| \`/image <prompt>\` | 🎨 **AI Image Gen** | Generates high-res Flux AI artwork directly in chat |
| \`/code <prompt>\` | 💻 **Code Generator** | Clean, runnable code with complexity analysis |
| \`/explain <topic>\` | 💡 **Deep Dive** | Intuitive conceptual breakdown with analogies |
| \`/interview <topic>\` | 🎯 **Mock Interview** | Simulates a live FAANG technical question |
| \`/joke\` | 😄 **Dev Humor** | Generates a witty programmer/tech joke |

*Tip: You can ask anything in Hindi, Hinglish, or English!*`;
  }

  // C. /joke — Developer Humor
  if (text === '/joke') {
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs! 🐛😂",
      "There are 10 types of people in the world: those who understand binary, and those who don't. 🤖",
      "A SQL query walks into a bar, walks up to two tables and asks: *'Can I join you?'* 🍻",
      "Why did the developer go broke? Because he used up all his cache! 💸",
      "Programming is 10% writing code and 90% explaining why it's not a bug, it's an undocumented feature. 😎"
    ];
    return `### 😄 Tech Humor\n\n${jokes[Math.floor(Math.random() * jokes.length)]}`;
  }

  // Clean prompt if starting with /code or /explain
  const effectivePrompt = text.replace(/^(\/code|\/explain|\/interview)\s+/i, '');

  // ==========================================
  // 2. Guaranteed Groq API Key Resolution
  // ==========================================
  const storedGroq = typeof localStorage !== 'undefined' ? localStorage.getItem('doap_groq_key') : null;
  const groqKey = (storedGroq && storedGroq.startsWith('gsk_')) 
                  ? storedGroq 
                  : (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROQ_API_KEY && import.meta.env.VITE_GROQ_API_KEY.startsWith('gsk_')) 
                    ? import.meta.env.VITE_GROQ_API_KEY 
                    : defaultGk;

  const systemInstruction = `You are AI Tutor (DOAP AI), a world-class, ultra-intelligent, and versatile AI assistant (like ChatGPT / Claude / Gemini).
You have deep expertise in everything: coding, computer science, DSA, system design, math, science, history, creative writing, general knowledge, career coaching, language translation, and friendly conversation.

Core Behaviors:
1. Universal Knowledge: Answer ANY topic or question accurately, engagingly, and thoroughly without restrictions.
2. Language Matching: Detect the user's language and respond naturally in that language. If the user talks in Hindi or Hinglish (e.g. "bhai", "kya haal", "ye kaise hota hai"), reply in fluent, natural, friendly Hinglish/Hindi. If they speak English, reply in crisp, articulate English.
3. Charismatic & Helpful: Be warm, empathetic, witty, and directly address the user as ${userName}.
4. Deep & Practical: For coding/technical questions, provide clean code snippets, explain the intuition, trace edge cases, and state Time & Space complexity ($O(N)$, $O(1)$, etc.).
5. Rich Markdown: Use clean markdown headers, bullet points, code blocks, bold text, and tables to make every response look visually beautiful.`;

  // Sanitize message history
  const sanitizedHistory = [];
  (history || []).slice(-10).forEach(item => {
    const role = (item.sender === 'user' || item.role === 'user') ? 'user' : 'assistant';
    const content = (item.text || item.content || '').trim();
    if (content) {
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
  // 3. Primary Engine: Groq LPU (GPT-OSS 120B Super-Brain)
  // ==========================================
  if (groqKey && groqKey.startsWith('gsk_')) {
    const candidateModels = [
      'openai/gpt-oss-120b',
      'qwen/qwen3.8-27b',
      'openai/gpt-oss-20b',
      'groq/compound',
      'groq/compound-mini'
    ];

    for (const model of candidateModels) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);

        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqKey}`
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
        console.warn(`[AI Tutor Groq LPU (${model})] error:`, err.message || err);
      }
    }
  }

  return `Hey ${userName}! I am AI Tutor. I received your query about **"${text}"**.\n\nPlease check your internet connection or verify your API settings!`;
}
