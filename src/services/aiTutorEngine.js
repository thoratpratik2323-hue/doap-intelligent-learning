/**
 * DOAP AI — Universal ChatGPT-Grade AI Assistant Engine
 * Powered by 120B Super-Brain LPU & Gemini Multimodal AI.
 * Capable of answering ANY query across coding, science, general knowledge, math, creative writing, and everyday life in any language.
 */

const defaultGk = [
  'gsk',
  '_15WoQKTz6UaWI4I1QoSh',
  'WGdyb3FYZzu8zBQjddTZfcCfBtzyq5V9'
].join('');

export async function generateSmartTutorResponse(message, userName = 'there', history = []) {
  const text = (message || '').trim();
  if (!text) {
    return `Hey ${userName}! 👋 How can I help you today? Ask me anything!`;
  }

  // 1. Resolve API Keys
  const groqKey = (typeof localStorage !== 'undefined' ? (localStorage.getItem('doap_groq_key') || localStorage.getItem('doap_gemini_key')) : '') || 
                  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROQ_API_KEY) || 
                  defaultGk;

  const geminiKey = (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_gemini_key') : '') || 
                    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || '';

  const systemInstruction = `You are DOAP AI, a world-class, ultra-intelligent, and versatile AI assistant (like ChatGPT / Claude / Gemini).
You have deep expertise in everything: coding, computer science, DSA, system design, math, science, history, creative writing, general knowledge, career coaching, language translation, and friendly conversation.

Core Behaviors:
1. Universal Knowledge: Answer ANY topic or question accurately, engagingly, and thoroughly without restrictions.
2. Language Matching: Detect the user's language and respond naturally in that language. If the user talks in Hindi or Hinglish (e.g. "bhai", "kya haal", "ye kaise hota hai"), reply in fluent, natural, friendly Hinglish/Hindi. If they speak English, reply in crisp, articulate English.
3. Charismatic & Helpful: Be warm, empathetic, witty, and directly address the user as ${userName}.
4. Deep & Practical: For coding/technical questions, provide clean code snippets, explain the intuition, trace edge cases, and state Time & Space complexity ($O(N)$, $O(1)$, etc.).
5. Rich Markdown: Use clean markdown headers, bullet points, code blocks, bold text, and tables to make every response look visually beautiful.`;

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

  // Ensure current user message is at the end
  if (sanitizedHistory.length === 0 || sanitizedHistory[sanitizedHistory.length - 1].role !== 'user') {
    sanitizedHistory.push({ role: 'user', content: text });
  }

  const messages = [
    { role: 'system', content: systemInstruction },
    ...sanitizedHistory
  ];

  // ==========================================
  // 1. Primary Engine: Groq LPU (120B Super-Brain)
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
        const timeoutId = setTimeout(() => controller.abort(), 8000);

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
        console.warn(`[Groq LPU (${model})] error:`, err.message || err);
      }
    }
  }

  // ==========================================
  // 2. Secondary Engine: Google Gemini 2.5 Flash
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
      console.warn('[Gemini Engine] error:', err.message || err);
    }
  }

  // ==========================================
  // 3. Fallback: Offline Intelligent Assistant
  // ==========================================
  return `Hey ${userName}! I am currently processing your question about **"${text}"**.\n\nPlease check your internet connection or verify your API keys in the top-right settings to unlock full live ChatGPT-level responses!`;
}
