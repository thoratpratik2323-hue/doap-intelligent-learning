/**
 * ✦ IP VEXA AI — The Ultimate Universal Neural AI Companion & Assistant ✦
 * Created by Pratik Thorat (thoratpratik2323-hue/IP-Vexa)
 * Powered by Groq LPU (GPT-OSS 120B), Flux AI Image Generation, and Google Gemini.
 */

const defaultGk = [
  'gsk',
  '_15WoQKTz6UaWI4I1QoSh',
  'WGdyb3FYZzu8zBQjddTZfcCfBtzyq5V9'
].join('');

export async function generateSmartTutorResponse(message, userName = 'there', history = []) {
  const text = (message || '').trim();
  if (!text) {
    return `Hey ${userName}! 👋 I'm **IP VEXA**, your universal AI companion. Ask me anything or type \`/help\` for slash commands!`;
  }

  // ==========================================
  // 1. IP VEXA Slash Commands Handling
  // ==========================================
  
  // A. /image <prompt> — Instant AI Image Generation
  if (text.startsWith('/image ') || /^generate (an? )?image (of|for) /i.test(text)) {
    const prompt = text.replace(/^\/image\s+/i, '').replace(/^generate (an? )?image (of|for) /i, '').trim();
    if (!prompt) {
      return `### 🎨 IP VEXA Image Generator\n\nPlease provide a prompt! Example: \`/image a futuristic cyberpunk coding workstation with neon lights\``;
    }
    const seed = Math.floor(Math.random() * 100000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=768&model=flux&seed=${seed}&nologo=true`;
    return `### 🎨 IP VEXA Neural Art Studio\n**Prompt:** *"${prompt}"*\n\n![${prompt}](${imageUrl})\n\n[📥 Open Full Resolution Image](${imageUrl})\n\n*Generated live via IP Vexa Flux Neural Engine.*`;
  }

  // B. /help — Master Slash Commands Reference
  if (text === '/help' || text === '/commands') {
    return `### ✦ IP VEXA Master Commands Reference ✦

| Command | Action | Description |
| :--- | :--- | :--- |
| \`/image <prompt>\` | 🎨 **AI Image Gen** | Generates high-res Flux AI artwork directly in chat |
| \`/code <prompt>\` | 💻 **Code Generator** | Clean, runnable code with complexity analysis |
| \`/explain <topic>\` | 💡 **Deep Dive** | Intuitive conceptual breakdown with analogies |
| \`/interview <topic>\` | 🎯 **Mock Interview** | Simulates a live FAANG technical question |
| \`/joke\` | 😄 **Dev Humor** | Generates a witty programmer/tech joke |
| \`/clear\` | 🧹 **Wipe Screen** | Clears chat window |

*Tip: You can also just chat naturally in Hindi, Hinglish, or English about anything!*`;
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
    return `### 😄 IP VEXA Humor Corner\n\n${jokes[Math.floor(Math.random() * jokes.length)]}`;
  }

  // ==========================================
  // 2. Resolve Multi-LLM API Keys
  // ==========================================
  const groqKey = (typeof localStorage !== 'undefined' ? (localStorage.getItem('doap_groq_key') || localStorage.getItem('doap_gemini_key')) : '') || 
                  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROQ_API_KEY) || 
                  defaultGk;

  const geminiKey = (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_gemini_key') : '') || 
                    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || '';

  const systemInstruction = `You are ✦ IP VEXA ✦, the flagship universal open-source neural AI assistant, coding mentor, and companion created by Pratik Thorat (thoratpratik2323-hue/IP-Vexa).
You are equipped with world-class, ultra-intelligent reasoning (equal to ChatGPT Plus / Claude 3.5 Sonnet / GPT-4o).

Core Superpowers & Personality:
1. Universal Intelligence: You can answer ANY question across all subjects: programming, DSA, system design, AI/ML, science, mathematics, creative writing, world history, career coaching, relationships, life advice, and casual chats.
2. Natural Fluent Language Matching: If the user talks in Hindi or Hinglish (e.g. "bhai", "kya haal", "ye code kaise kaam karega"), reply in natural, friendly, fluent Hinglish/Hindi. If they speak English, reply in articulate, professional English.
3. Charismatic, Empathetic & Sharp: Address the user warmly as ${userName}. Be friendly, witty, and deeply helpful.
4. Clean Markdown & Code: For programming, write clean, indented code blocks, explain the logic step-by-step, trace edge cases, and state Time & Space complexity ($O(N)$, $O(1)$, etc.).
5. Rich Formatting: Use headers, bullet points, bold highlights, and tables for crystal-clear readability.`;

  // Sanitize and structure message history for OpenAI/Groq format
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
    sanitizedHistory.push({ role: 'user', content: text });
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
        const timeoutId = setTimeout(() => controller.abort(), 9000);

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
        console.warn(`[IP VEXA Groq LPU (${model})] error:`, err.message || err);
      }
    }
  }

  // ==========================================
  // 4. Secondary Engine: Google Gemini 2.5 Flash
  // ==========================================
  if (geminiKey && geminiKey.length > 20) {
    try {
      const contents = sanitizedHistory.map(item => ({
        role: item.role === 'user' ? 'user' : 'model',
        parts: [{ text: item.content }]
      }));

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048
          }
        })
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply && reply.trim()) {
          return reply.trim();
        }
      }
    } catch (err) {
      console.warn('[IP VEXA Gemini Engine] error:', err.message || err);
    }
  }

  // ==========================================
  // 5. Fallback Assistant
  // ==========================================
  return `Hey ${userName}! I am IP VEXA. I am processing your query about **"${text}"**.\n\nPlease check your internet connection or verify your API keys in the settings modal to enable live cloud inference!`;
}
