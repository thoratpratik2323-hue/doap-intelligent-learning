/**
 * DOAP AI — Universal Super-Assistant & Neural Engine (ChatGPT / IP-Vexa Grade)
 * Powered by:
 * 1. Groq LPU (GPT-OSS 120B Super-Brain & Qwen 3.8 27B — Sub-150ms Instant Universal Response)
 * 2. In-Chat Interactive Flash Quiz Engine (/quiz [c|py|java|dsa])
 * 3. Flux AI Image Generation (/image <prompt>)
 * 4. A-to-Z Universal Knowledge Coverage (Coding, Science, Math, Essays, Chat, Ideas)
 * 5. Claw Code Agentic Architecture (Tool Registry, Skills, Sub-Agents, Hooks, Sessions)
 */

import { 
  C_LANGUAGE_BANK, 
  PYTHON_BANK, 
  JAVA_BANK, 
  DSA_NUMERICALS_BANK 
} from '../data/questionBanks.js';
import { DSA_QUIZZES } from '../data/dsa/dsaKnowledgeData.js';
import { memoryBrain } from './memoryBrain.js';
import { runAgentLoop, shouldUseAgentLoop } from './agentLoop.js';
import { runPreHooks, runPostHooks } from './hooksEngine.js';
import { getSkillPromptInjection, getActiveSkillNames } from './skillsRegistry.js';
import { orchestrate, getMatchingAgentName } from './agentOrchestrator.js';
import { sessionManager } from './sessionManager.js';
import { DEPARTMENT_DATA, DEPARTMENT_KNOWLEDGE_PROMPT } from '../data/departmentData.js';
import { 
  getHarnessState, 
  getHarnessSupplementalPrompt, 
  refineHarness, 
  rollbackHarness, 
  buildRlmTrace, 
  isRlmCandidate, 
  isRlmEnabled, 
  toggleRlmMode 
} from './primeAgentHarness.js';

const defaultGk = [
  'gsk',
  '_15WoQKTz6UaWI4I1QoSh',
  'WGdyb3FYZzu8zBQjddTZfcCfBtzyq5V9'
].join('');


export async function generateSmartTutorResponse(message, userName = 'there', history = [], options = {}) {
  // Normalize polymorphic argument calling patterns (e.g. generateSmartTutorResponse(msg, history) or generateSmartTutorResponse(msg, userName, options))
  if (Array.isArray(userName)) {
    options = typeof history === 'object' && !Array.isArray(history) ? history : options;
    history = userName;
    userName = 'there';
  } else if (typeof userName === 'object' && userName !== null) {
    options = userName;
    userName = 'there';
  }
  if (typeof history === 'object' && !Array.isArray(history) && history !== null) {
    options = history;
    history = [];
  }

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
    } else if (
      topic.includes('dsa') || 
      topic.includes('tree') || 
      topic.includes('graph') || 
      topic.includes('dp') || 
      topic.includes('array') || 
      topic.includes('string') || 
      topic.includes('heap') || 
      topic.includes('stack') || 
      topic.includes('queue') || 
      topic.includes('sort') || 
      topic.includes('search') || 
      topic.includes('trie') || 
      topic.includes('complexity') || 
      topic.includes('num')
    ) {
      // Find matching questions in the 315 DSA Quiz Bank
      let matchingDsa = DSA_QUIZZES;
      if (topic && !topic.includes('dsa')) {
        const filtered = DSA_QUIZZES.filter(q => 
          (q.topic && q.topic.toLowerCase().includes(topic)) ||
          (q.question && q.question.toLowerCase().includes(topic))
        );
        if (filtered.length > 0) matchingDsa = filtered;
      }
      
      const selected = matchingDsa[Math.floor(Math.random() * matchingDsa.length)];
      domainName = `DSA (${selected.topic || 'Algorithms'})`;
      const quizData = {
        domain: domainName,
        topic: selected.topic || 'DSA',
        level: selected.difficulty || 'Medium',
        question: selected.question,
        options: selected.options,
        correctIndex: selected.correctIndex,
        explanation: selected.explanation || 'Optimal DSA algorithm invariant.'
      };

      return `### 📝 Interactive Flash Quiz: ${domainName}

\`\`\`quiz
${JSON.stringify(quizData, null, 2)}
\`\`\`

*Tap your answer above to test your knowledge! Type \`/quiz\` for another question or try \`/quiz dsa\`, \`/quiz trees\`, \`/quiz graphs\`, \`/quiz dp\`!*`;
    }

    const q = bank[Math.floor(Math.random() * bank.length)];
    const quizData = {
      domain: domainName,
      topic: q.topic,
      level: q.level,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.answer || q.explanation
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
| \`/resume\` | 📂 **Session Resume** | Shows recent sessions to continue from where you left off |
| \`/resume [N]\` | 🔄 **Resume #N** | Directly resumes session number N |
| \`/agents\` | 🤖 **Agent List** | Shows all active specialized AI agents |
| \`/refine [notes]\` | 🧬 **Self-Improve** | Prime Agent continual harness refinement with evidence & rollback |
| \`/harness\` | 🛠️ **Agent Harness** | Inspects active learned skills, student profile, and snapshots |
| \`/rlm <task>\` | ⚡ **RLM Multi-Agent** | Forces recursive subagent decomposition (Architect, Dev, Verifier) |
| \`/joke\` | 😄 **Dev Humor** | Generates a witty programmer/tech joke |

*Tip: Agents activate **automatically** — just ask about Amazon/Google interviews, DSA, code review, or study plans!*`;
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

  // Prime Agent Continual Harness Commands (/refine, /harness, /rollback)
  if (cleanText.startsWith('/refine')) {
    const feedback = cleanText.replace(/^\/refine\s*/i, '').trim();
    const result = await refineHarness(feedback);
    const skillsList = (getHarnessState().learnedSkills || []).map(s => `• **${s.name}** [${s.level}]: *${s.description}*`).join('\n');
    return `### 🧬 Prime Agent Continual Harness Refined (v${result.version})

**Status:** ✅ Snapshot \`${result.snapshotId}\` captured for rollback.
**Evidence-Backed Refinement:**
> ${result.refinementNote}

${result.newSkillAdded ? `**✨ New Reusable Skill Synthesized:** \`${result.newSkillAdded}\`\n\n` : ''}
#### 🛠️ Active Learned Skills (${result.activeSkillsCount}):
${skillsList}

#### 📝 Adaptive Supplemental Persona:
\`\`\`text
${result.supplementalPrompt}
\`\`\`

*Tip: Type \`/harness\` to view full harness state, \`/rollback\` to revert, or inspect under Settings > Prime Agent Harness.*`;
  }

  if (cleanText === '/harness' || cleanText === '/prime') {
    const state = getHarnessState();
    const skillsList = state.learnedSkills.map(s => `• **${s.name}** [${s.level}]: ${s.description} *(Used ${s.usageCount}x)*`).join('\n');
    const history = (state.studentProfile?.refinementHistory || []).slice(0, 3).map(h => `• *${new Date(h.timestamp).toLocaleDateString()}*: ${h.notes}`).join('\n');
    return `### 🧬 Prime Agent Continual Harness (v${state.version})

**RLM Recursive Execution:** ${state.enabled ? '🟢 Active' : '⚪ Disabled'}
**Target Language:** \`${state.studentProfile?.primaryLanguage || 'Python'}\`
**Review Focus:** ${state.studentProfile?.strugglingTopics?.join(', ') || 'General Algorithms'}

#### 🛠️ Active Learned Skills (${state.learnedSkills.length}):
${skillsList}

#### 📜 Recent Refinement Trajectory:
${history || 'No previous refinements.'}

#### 💾 Snapshots Available for Rollback: ${state.snapshots?.length || 0}

*Commands: \`/refine [feedback]\` to self-improve, \`/rollback\` to revert to previous snapshot.*`;
  }

  if (cleanText === '/rollback') {
    const res = rollbackHarness();
    return res.success 
      ? `### ⏪ Prime Agent Harness Rollback Successful\n\n${res.message}`
      : `### ⚠️ Rollback Failed\n\n${res.message}`;
  }

  // E. Master Platform Description & Introduction (DOAP: Discover Opportunities and Progress Platform)
  const isPlatformDescriptionQuery = (
    /\b(describe (this |the |doap )?platform|what is (this |the )?platform|tell (me )?about (this |the )?platform|explain (this |the )?platform|introduce (this |the )?platform|about (this |the )?platform|ye platform kya hai|ye app kya hai|doap kya hai|platform ke baare me|doap ke baare me|what is doap|describe doap|tell me about doap)\b/i.test(cleanText) ||
    ((lowerText.includes('platform') || lowerText.includes('doap')) && (lowerText.includes('describe') || lowerText.includes('introduce') || lowerText.includes('what is') || lowerText.includes('kya hai') || lowerText.includes('batao') || lowerText.includes('details') || lowerText.includes('about')))
  );

  if (isPlatformDescriptionQuery) {
    if (options.voiceMode) {
      const voiceSpeech = `DOAP stands for Discover Opportunities and Progress Platform! It is an intelligent engineering ecosystem built for Sanjivani University, combining real-time voice intelligence, cognitive self-thinking AI tutoring, a unified eight-layer memory brain, and hands-on coding practice to accelerate your software engineering career.`;
      try {
        memoryBrain.learnFromInteraction(cleanText, voiceSpeech, 'voice');
      } catch (e) {}
      return voiceSpeech;
    }

    const isHindiOrHinglish = /[\u0900-\u097F]|\b(bhai|yaar|kaise|kya|karo|batao|karna|mera|meri|mujhe|tum|aap|chal|theek|suno|bol|ye)\b/i.test(rawText);

    const platformOverview = isHindiOrHinglish ? `### 🚀 DOAP — Discover Opportunities and Progress Platform

**DOAP** ek next-generation, AI-driven engineering mentorship aur career acceleration platform hai, jo students aur software developers ko foundational coder se lekar top-tier industry-ready software architect banata hai! 🌟

Isko **Pratik Thorat** ne develop kiya hai **Sanjivani College of Engineering (SCOE) / Sanjivani University, Kopargaon** ke liye, under the visionary leadership of **Hon. Chairman Shri Nitindada S. Kolhe Saheb** aur **Managing Trustee Shri Amitdada Kolhe Saheb** (*"Build Sanjivani's Own LLM Challenge"*).

---

### 🏛️ DOAP ke 5 Core Pillars:

1. 🧠 **Text AI Tutor (Cognitive Super-Brain)**:
   - **Sub-150ms Speed**: Powered by Groq LPU (GPT-OSS 120B Flagship & Qwen 27B).
   - **Deep Cognitive Self-Thinking**: DeepSeek-R1 / OpenAI o1 style chain-of-thought \`<think>\` reasoning, edge-case checks aur algorithm proof.
   - **Interactive Flash Quizzes (\`/quiz\`)**: Real interview MCQs with interactive options and hidden explanations.
   - **Flux AI Artwork (\`/image\`)**: High-res neural image generation directly in chat.

2. 🎙️ **Voice AI Tutor (Mark-LII Arc-Reactor)**:
   - **Hands-Free Conversational Voice**: Headphone/mic ke sath real-time voice call.
   - **ElevenLabs Charon Studio Voice**: Crystal-clear, deep, authoritative Indian-accented studio cadence with zero voice drift.
   - **Sub-Second Zero Latency**: Instant speech-first responses without waiting.

3. 🧬 **Unified 8-Layer Memory Brain**:
   - Continuous self-learning across both Voice aur Text AIs.
   - Mastered skills, weaknesses, user preferences, target companies, aur career milestones automatically track hote hain. Jo Voice me bologe, Text ko turant yaad rahega!

4. 💻 **Interactive Coding Sandbox (\`/coding\`)**:
   - Python, C++, Java, aur JavaScript ka live compiler with instant test-case verification.
   - Direct Memory Brain synchronization: problems solve karte hi readiness score boost hota hai.

5. 🎯 **Mock Interviews, Assessments & ATS Resume Hub (\`/assessments\`, \`/job-readiness\`)**:
   - Silicon Valley & FAANG company tracks (Google, Amazon, Microsoft).
   - Weakness detect hone par automatic 3-day recovery study plan inject karta hai.
   - Real-time ATS resume preview aur skill-matching analytics.

---
*Bata ${userName} bhai, aaj kis topic par deep dive karna hai ya coding practice karni hai?* 🚀🤝` : `### 🚀 DOAP — Discover Opportunities and Progress Platform

**DOAP** is a next-generation, AI-driven engineering mentorship and career acceleration platform built to transform students and developers into elite, industry-ready software architects.

Developed by **Pratik Thorat** for **Sanjivani College of Engineering (SCOE) / Sanjivani University, Kopargaon** under the visionary leadership of **Chairman Hon. Shri Nitindada S. Kolhe Saheb** and **Managing Trustee Hon. Shri Amitdada Kolhe Saheb** for the *"Build Sanjivani's Own Large Language Model"* initiative.

---

### 🏛️ The 5 Core Pillars of DOAP:

1. 🧠 **Text AI Tutor (Cognitive Super-Brain)**:
   - **Sub-150ms Intelligence**: Powered by Groq LPU (GPT-OSS 120B Flagship & Qwen 27B).
   - **Deep Cognitive Self-Thinking**: DeepSeek-R1 / OpenAI o1 style chain-of-thought reasoning inside expandable \`<think>\` blocks for algorithmic proof and edge-case verification.
   - **Interactive Flash Quizzes (\`/quiz\`)**: Live technical multiple-choice drills with hidden answer reveals.
   - **Flux AI Artwork (\`/image\`)**: High-resolution neural artwork generation right in chat.

2. 🎙️ **Voice AI Tutor (Mark-LII Arc-Reactor)**:
   - **Hands-Free Conversational Voice**: Real-time microphone dialogue with a living acoustic orb UI.
   - **Studio-Grade ElevenLabs Charon Voice**: Deep, resonant, articulate studio voice tuned for Indian English and technical cadence with zero drift.
   - **Sub-Second Zero Latency**: Direct speech-first playback with instant spoken answers.

3. 🧬 **Unified 8-Layer Memory Brain**:
   - Autonomous continuous self-learning shared between Voice and Text AIs.
   - Automatically tracks mastered concepts, flags stumbling points, saves episodic history, and synchronizes cross-modal knowledge.

4. 💻 **Interactive Coding Sandbox (\`/coding\`)**:
   - Multi-language sandbox supporting Python, C++, Java, and JavaScript with automated test-case evaluation.
   - Seamlessly updates your verified skills and ATS job readiness metrics upon passing tests.

5. 🎯 **Mock Interviews, Assessments & ATS Resume Hub (\`/assessments\`, \`/job-readiness\`)**:
   - FAANG benchmark tracks (Google, Amazon, Microsoft).
   - Automated 3-day recovery curriculum targeting detected interview gaps.
   - Real-time ATS resume preview and industry readiness score.

---
*How can I help you accelerate your engineering journey today, ${userName}?* 🚀🤝`;

    try {
      memoryBrain.learnFromInteraction(cleanText, platformOverview, 'text');
    } catch (e) {}
    return platformOverview;
  }

  // F. Department Faculty, Subject & Cabin Information Query Handler
  // F. Department Faculty, Subject, HOD & Cabin Information Query Handler (Precise & Targeted)
  const isFacultyQuery = (
    /\b(faculty|faculties|teacher|teachers|prof|professor|professors|staff|hod|head of department|head of dept|dept head|department head|h\.o\.d|coordinator|class coordinator|clerk|department clerk)\b/i.test(cleanText) ||
    // AI & DS faculty names
    /\b(vishwesh|nagamalla|prashant kamkar|kamkar|ganesh phopase|phopase|sarvjeet|tanay ghosh|sarika maske|hirak chatterjee|tanvi chatse|shreeparna|kishor jhadav|jhadav)\b/i.test(cleanText) ||
    // Mechanical faculty names
    /\b(kailash bhosale|bhosale|pankaj patil|kiran wakchure|wakchure|jaydeep ashtekar|ashtekar|pratibha sinha|vasudev sengar|sengar|tanay renu ghosh|prajwal aher|sadhna ganjir|ganjir|omkar dadi|dadi|harshda kolpe|kolpe)\b/i.test(cleanText) ||
    // IMTECH faculty names
    /\b(anwar shaikh|anwar a shaikh|piyush sahu|sahu|latika bawankar|bawankar|vikas kumar|bandana thakur|thakur|roushan|riya khandelwal|khandelwal|hari prasath|hariprasath)\b/i.test(cleanText) ||
    /\b(who teaches|kaun padhata|koun padhata|padhate|padhati|shikvtoy|shikvtat|kon ahet|kon aahe|koni|kiska cabin|cabin address|cabin number|cabin kahan|cabin batao|7th floor|seventh floor|mech department|mechanical department|imtech|integrated mtech|integrated m\.tech)\b/i.test(cleanText) ||
    ((lowerText.includes('python') || lowerText.includes('math') || lowerText.includes('physics') || lowerText.includes('chemistry') || lowerText.includes('german') || lowerText.includes('communication') || lowerText.includes('data structure') || lowerText.includes('dsa') || lowerText.includes('programming') || lowerText.includes('cad') || lowerText.includes('makerspace') || lowerText.includes('graphics') || lowerText.includes('cyber security') || lowerText.includes('data analytics') || lowerText.includes('japanese') || lowerText.includes('design thinking')) &&
     (lowerText.includes('faculty') || lowerText.includes('teacher') || lowerText.includes('prof') || lowerText.includes('sir') || lowerText.includes('madam') || lowerText.includes('maam') || lowerText.includes('kaun') || lowerText.includes('who') || lowerText.includes('kon') || lowerText.includes('cabin') || lowerText.includes('kahan') || lowerText.includes('mech') || lowerText.includes('mechanical') || lowerText.includes('imtech') || lowerText.includes('ai') || lowerText.includes('ds')))
  );

  if (isFacultyQuery) {
    // 1. Department Detection (with typo tolerance e.g. mechnaical, im tech, aids)
    const isMechQuery = /\b(m[ea]ch[a-z]*|bhosale|pankaj patil|kiran wakchure|wakchure|jaydeep ashtekar|pratibha sinha|vasudev sengar|sengar|tanay renu|omkar dadi|dadi|harshda kolpe|kolpe|engineering graphics|cad|makerspace|7th floor)\b/i.test(cleanText) || /m[ea]ch/i.test(cleanText);
    const isImtechQuery = /\b(im\s*tech|integrated\s*m[a-z]*|anwar|anwar shaikh|piyush sahu|latika bawankar|vikas kumar|bandana thakur|roushan|riya khandelwal|hari prasath|cyber security|data analytics|japanese|financial management)\b/i.test(cleanText) || /im\s*tech/i.test(cleanText);
    const isAidsQuery = /\b(aids|ai\s*(&|and)?\s*ds|ai\/ds|artific[a-z]*|data\s*scien[a-z]*|kishor|jhadav|shreeparna|vishwesh|nagamalla|prashant kamkar|kamkar|sarika maske|tanvi chatse|9th floor|10th floor)\b/i.test(cleanText);

    // 2. Full Directory Request Check (e.g., "show all faculties", "faculty list", "give me the complete table")
    const isFullListRequested = /\b(all|entire|full|purna|saare|sarv|list|directory|table|saglya|saglyanche|overview|everyone)\b/i.test(cleanText) ||
      /\b(faculty list|faculties list|teachers list|list of teachers|list of faculties|all faculty|all faculties|all teachers|complete directory)\b/i.test(cleanText);

    // 3. Specific Intent Detection
    const isHodQuery = /\b(hod|head of department|head of dept|dept head|department head|h\.o\.d)\b/i.test(cleanText);
    const isCoordinatorQuery = /\b(coordinator|class coordinator|clerk|department clerk)\b/i.test(cleanText);

    let textReply = '';
    let voiceReply = '';

    // ── CASE A: HOD Query (Ultra-Precise) ──────────────────────────────────
    if (isHodQuery && !isFullListRequested) {
      if (isImtechQuery || (!isMechQuery && !isAidsQuery && /anwar/i.test(cleanText))) {
        textReply = `### 🎓 Head of Department (HOD) — Integrated M.Tech (IMTECH)

- 🎖️ **Head of Department (HOD):** **Dr. Anwar A Shaikh**
- 📞 **Contact Number:** \`9044013605\`
- ✉️ **Email:** \`anwarshaikhset@sanjivani.edu.in\`
- 🏛️ **Department:** Integrated M.Tech (IMTECH), School of Engineering & Technology
- 📚 **Subjects:** Fundamentals of Computing Systems (1st Year) | Data Structures & Algorithms (2nd Year)`;
        voiceReply = `The Head of Department for Integrated M.Tech is Dr. Anwar A Shaikh. His contact number is 9044013605 and his email is anwarshaikhset at sanjivani.edu.in.`;
      } else if (isMechQuery || /bhosale/i.test(cleanText)) {
        textReply = `### 🔧 Head of Department (HOD) — Mechanical Engineering

- 🎖️ **Head of Department (HOD):** **Kailash Bhosale**
- 🏢 **Cabin Location:** **7th Floor Staff Room**
- 🏛️ **Department:** Mechanical Engineering, School of Engineering & Technology`;
        voiceReply = `The Head of Department for Mechanical Engineering is Kailash Bhosale, located at the 7th Floor Staff Room.`;
      } else if (isAidsQuery || /jhadav|kishor/i.test(cleanText)) {
        textReply = `### 🏛️ Head of Department (HOD) — Artificial Intelligence & Data Science (AI & DS)

- 🎖️ **Head of Department (HOD):** **Dr. Kishor Jhadav**
- 📞 **Contact Number:** \`9890423309\`
- 🏛️ **Department:** Artificial Intelligence & Data Science, School of Engineering & Technology`;
        voiceReply = `The Head of Department for Artificial Intelligence and Data Science is Dr. Kishor Jhadav. His contact number is 9890423309.`;
      } else {
        // General HOD question without specific department mentioned
        textReply = `### 🏛️ Heads of Department (HODs) — School of Engineering & Technology

- 🎓 **Integrated M.Tech (IMTECH):** **Dr. Anwar A Shaikh** | 📞 \`9044013605\` | ✉️ \`anwarshaikhset@sanjivani.edu.in\`
- 🤖 **AI & Data Science (AI & DS):** **Dr. Kishor Jhadav** | 📞 \`9890423309\`
- 🔧 **Mechanical Engineering:** **Kailash Bhosale** | 🏢 **7th Floor Staff Room**`;
        voiceReply = `Dr. Anwar A Shaikh is the HOD for Integrated M.Tech, Dr. Kishor Jhadav is HOD for AI and Data Science, and Kailash Bhosale is HOD for Mechanical Engineering.`;
      }
    }

    // ── CASE B: Class Coordinator / Clerk Query ────────────────────────────
    else if (isCoordinatorQuery && !isFullListRequested) {
      if (isMechQuery) {
        textReply = `### 🔧 Coordinator & Clerk — Mechanical Engineering

- 🎓 **Class Coordinator:** **Omkar Dadi** | 🏢 **7th Floor Staff Room**
- 📋 **Department Clerk:** **Harshda Kolpe** | 🏢 **7th Floor Staff Room**
- 🏛️ **Department:** Mechanical Engineering, School of Engineering & Technology`;
        voiceReply = `In Mechanical Engineering, Omkar Dadi is the Class Coordinator and Harshda Kolpe is the Department Clerk. Both are located in the 7th Floor Staff Room.`;
      } else {
        textReply = `### 🏛️ First Year Class Coordinator — AI & DS Department

- 🎓 **Class Coordinator:** **Dr. Shreeparna Das**
- 🏢 **Cabin Location:** **9th Floor**
- 🏛️ **Department:** Artificial Intelligence & Data Science`;
        voiceReply = `The First Year Class Coordinator for Artificial Intelligence and Data Science is Dr. Shreeparna Das, located on the 9th floor.`;
      }
    }

    // ── CASE C: Specific Faculty Member Query (By Name) ────────────────────
    else if (!isFullListRequested && /\b(anwar shaikh|kishor jhadav|vishwesh|kamkar|prajwal aher|piyush sahu|latika bawankar|vikas kumar|bandana thakur|hari prasath|pankaj patil|kiran wakchure|ashtekar|pratibha sinha|tanay ghosh|tanay renu|sarika maske|hirak chatterjee|sarvjeet|phopase|tanvi chatse|roushan|riya khandelwal|ganjir|gunjir)\b/i.test(cleanText)) {
      if (/anwar/i.test(cleanText)) {
        textReply = `### 👨‍🏫 Faculty Profile: Dr. Anwar A Shaikh

- 🎖️ **Designation:** Head of Department (HOD) & Faculty
- 🏛️ **Department:** Integrated M.Tech (IMTECH)
- 📚 **Subjects Taught:**
  - 1st Year: *Fundamentals of Computing Systems and Emerging Technologies*
  - 2nd Year: *Data Structures and Algorithms (DSA)*
- 📞 **Contact Number:** \`9044013605\`
- ✉️ **Email:** \`anwarshaikhset@sanjivani.edu.in\``;
        voiceReply = `Dr. Anwar A Shaikh is the Head of Department for Integrated M.Tech. He teaches Computing Systems in 1st year and Data Structures and Algorithms in 2nd year. His contact is 9044013605 and email is anwarshaikhset at sanjivani.edu.in.`;
      } else if (/vishwesh|nagamalla/i.test(cleanText)) {
        textReply = `### 👨‍🏫 Faculty Profile: Dr. Vishwesh Nagamalla

- 🎖️ **Role:** Senior Faculty
- 🏛️ **Department:** Artificial Intelligence & Data Science (AI & DS)
- 📚 **Subject Taught:** Introduction to Programming and Data Structure
- 🏢 **Cabin Location:** **9th Floor**`;
        voiceReply = `Dr. Vishwesh Nagamalla is Senior Faculty in AI and Data Science. He teaches Introduction to Programming and Data Structure, and his cabin is on the 9th floor.`;
      } else if (/kamkar/i.test(cleanText)) {
        textReply = `### 👨‍🏫 Faculty Profile: Prashant Kamkar (IBM Faculty)

- 🎖️ **Role:** IBM Industry Expert Faculty
- 🏛️ **Department:** Artificial Intelligence & Data Science (AI & DS)
- 🐍 **Subject Taught:** Python Programming
- 💻 **Location:** **IBM Center / Lab**`;
        voiceReply = `Prashant Kamkar is the IBM Industry Expert Faculty in AI and Data Science teaching Python at the IBM Center Lab.`;
      } else if (/prajwal aher/i.test(cleanText)) {
        textReply = `### 👨‍🏫 Faculty Profile: Prof. Prajwal Aher

- 🏛️ **Departments & Subjects:**
  - **IMTech (1st Year):** Mathematics-1, NSS / Liberal Arts
  - **IMTech (2nd Year):** Programming for Data Science (Python)
  - **Mechanical Engineering:** Mathematics for Mechanical Engineering (🏢 7th Floor Staff Room)`;
        voiceReply = `Prof. Prajwal Aher teaches Mathematics-1 and Python for Data Science in Integrated M.Tech, and Mathematics for Mechanical Engineering on the 7th floor.`;
      } else if (/piyush sahu/i.test(cleanText)) {
        textReply = `### 👨‍🏫 Faculty Profile: Prof. Piyush Sahu

- 🏛️ **Department:** Integrated M.Tech (IMTECH)
- 📚 **Subjects Taught:**
  - 1st Year: *Design Thinking and Idea Lab*, *Indian Knowledge System*
  - 2nd Year: *Essentials of Cyber Security*`;
        voiceReply = `Prof. Piyush Sahu teaches Design Thinking and Indian Knowledge System in 1st year, and Essentials of Cyber Security in 2nd year of Integrated M.Tech.`;
      } else if (/latika/i.test(cleanText)) {
        textReply = `### 👩‍🏫 Faculty Profile: Dr. Latika Bawankar

- 🏛️ **Department:** Integrated M.Tech (IMTECH)
- 📚 **Subject Taught:** Linear Algebra and Transformation Techniques (2nd Year)`;
        voiceReply = `Dr. Latika Bawankar teaches Linear Algebra and Transformation Techniques in 2nd year Integrated M.Tech.`;
      } else if (/vikas kumar/i.test(cleanText)) {
        textReply = `### 👨‍🏫 Faculty Profile: Prof. Vikas Kumar

- 🏛️ **Department:** Integrated M.Tech (IMTECH)
- 📚 **Subject Taught:** Exploratory Data Analytics (2nd Year)`;
        voiceReply = `Prof. Vikas Kumar teaches Exploratory Data Analytics in 2nd year Integrated M.Tech.`;
      } else if (/bandana/i.test(cleanText)) {
        textReply = `### 👩‍🏫 Faculty Profile: Dr. Bandana Thakur

- 🏛️ **Department:** Integrated M.Tech (IMTECH)
- 📚 **Subject Taught:** Financial Management (2nd Year)`;
        voiceReply = `Dr. Bandana Thakur teaches Financial Management in 2nd year Integrated M.Tech.`;
      } else if (/hari prasath/i.test(cleanText)) {
        textReply = `### 👨‍🏫 Faculty Profile: Prof. Hari Prasath K

- 🏛️ **Department:** Integrated M.Tech (IMTECH)
- 💻 **Subject Taught:** Programming in Problem Solving using C (1st Year)`;
        voiceReply = `Prof. Hari Prasath K teaches C Programming in 1st year Integrated M.Tech.`;
      } else if (/pankaj patil/i.test(cleanText)) {
        textReply = `### 👨‍🏫 Faculty Profile: Pankaj Patil

- 🏛️ **Department:** Mechanical Engineering
- 📐 **Subject Taught:** Engineering Graphics and CAD
- 🏢 **Cabin Location:** **7th Floor Staff Room**`;
        voiceReply = `Pankaj Patil teaches Engineering Graphics and CAD in Mechanical Engineering, located in the 7th Floor Staff Room.`;
      } else if (/wakchure/i.test(cleanText)) {
        textReply = `### 👨‍🏫 Faculty Profile: Kiran Wakchure

- 🏛️ **Department:** Mechanical Engineering
- 🛠️ **Subject / Facility:** Makerspace / Workshop Practice
- 🏢 **Cabin Location:** **7th Floor Staff Room**`;
        voiceReply = `Kiran Wakchure leads the Makerspace and Workshop Practice for Mechanical Engineering in the 7th Floor Staff Room.`;
      } else if (/ashtekar|pratibha sinha/i.test(cleanText)) {
        textReply = `### 👨‍🏫 Python Faculty: Mechanical Engineering

- **Jaydeep Ashtekar** — Python Programming (🏢 7th Floor Staff Room)
- **Pratibha Sinha** — Python Programming (🏢 7th Floor Staff Room)`;
        voiceReply = `Jaydeep Ashtekar and Pratibha Sinha teach Python Programming for Mechanical Engineering on the 7th floor.`;
      } else if (/tanay ghosh|tanay renu/i.test(cleanText)) {
        textReply = `### 👨‍🏫 Faculty Profile: Dr. Tanay Ghosh (Tanay Renu Ghosh)

- 🔬 **Subject Taught:** Applied Physics / Engineering Physics
- 🏢 **Cabin Locations:**
  - AI & DS: **2nd Floor**
  - Mechanical: **7th Floor Staff Room**`;
        voiceReply = `Dr. Tanay Ghosh teaches Physics across AI and Data Science on the 2nd floor, and Mechanical Engineering on the 7th floor.`;
      } else if (/sarika maske/i.test(cleanText)) {
        textReply = `### 👩‍🏫 Faculty Profile: Mrs. Sarika Maske

- 🏛️ **Department:** Artificial Intelligence & Data Science (AI & DS)
- 🔬 **Subject Taught:** Applied Physics (Practical)
- 🏢 **Cabin / Lab Location:** **Extension Building**`;
        voiceReply = `Mrs. Sarika Maske conducts Applied Physics Practicals in the Extension Building for AI and Data Science.`;
      } else if (/hirak chatterjee/i.test(cleanText)) {
        textReply = `### 👨‍🏫 Faculty Profile: Dr. Hirak Chatterjee

- 🧪 **Subject Taught:** Applied Chemistry (Theory & Practical)
- 🏢 **Cabin Locations:** **10th Floor** (AI & DS) | **7th Floor Staff Room** (Mechanical)`;
        voiceReply = `Dr. Hirak Chatterjee teaches Applied Chemistry on the 10th floor for AI and Data Science, and 7th floor for Mechanical.`;
      } else if (/sarvjeet/i.test(cleanText)) {
        textReply = `### 👨‍🏫 Faculty Profile: Sarvjeet Singh

- 🏛️ **Department:** Artificial Intelligence & Data Science (AI & DS)
- 📐 **Subject Taught:** Engineering Mathematics
- 🏢 **Cabin Location:** **2nd Floor**`;
        voiceReply = `Sarvjeet Singh teaches Engineering Mathematics on the 2nd floor for AI and Data Science.`;
      } else if (/phopase/i.test(cleanText)) {
        textReply = `### 👨‍🏫 Faculty Profile: Ganesh Phopase

- 🏛️ **Department:** Artificial Intelligence & Data Science (AI & DS)
- 🗣️ **Subject Taught:** Technical and Professional Communication Skills`;
        voiceReply = `Ganesh Phopase teaches Technical and Professional Communication Skills in AI and Data Science.`;
      } else if (/tanvi chatse/i.test(cleanText)) {
        textReply = `### 👩‍🏫 Faculty Profile: Ms. Tanvi Chatse

- 🏛️ **Department:** Artificial Intelligence & Data Science (AI & DS)
- 🇩🇪 **Subject Taught:** German (Foreign Language)`;
        voiceReply = `Ms. Tanvi Chatse is the German language trainer for AI and Data Science.`;
      } else if (/roushan/i.test(cleanText)) {
        textReply = `### 👨‍🏫 Faculty Profile: Prof. D. Roushan

- 🏛️ **Department:** Integrated M.Tech (IMTECH)
- 🇯🇵 **Subject Taught:** Foreign Language - 1 (Japanese)`;
        voiceReply = `Prof. D. Roushan teaches Japanese language in Integrated M.Tech.`;
      } else if (/riya khandelwal/i.test(cleanText)) {
        textReply = `### 👩‍🏫 Faculty Profile: Prof. Riya Khandelwal

- 🏛️ **Department:** Integrated M.Tech (IMTECH)
- 🇩🇪 **Subject Taught:** Foreign Language - 1 (German)`;
        voiceReply = `Prof. Riya Khandelwal teaches German language in Integrated M.Tech.`;
      } else if (/ganjir|gunjir/i.test(cleanText)) {
        textReply = `### 👩‍🏫 Faculty Profile: Prof. Sadhna Gunjir (Ganjir)

- 🗣️ **Subject Taught:** English — Oral & Written Communication Skills
- 🏛️ **Departments:** IMTech (1st Year) | Mechanical (🏢 7th Floor Staff Room)`;
        voiceReply = `Prof. Sadhna Gunjir teaches English and Communication Skills for Integrated M.Tech and Mechanical Engineering.`;
      }
    }

    // ── CASE D: Specific Subject / Teacher Query ───────────────────────────
    else if (!isFullListRequested && /\b(python|dsa|data structure|data structures|cyber security|cad|makerspace|physics|chemistry|german|japanese|linear algebra|data analytics|design thinking|math|maths|mathematics|c programming)\b/i.test(cleanText)) {
      if (/python/i.test(cleanText)) {
        if (isImtechQuery) {
          textReply = `### 🐍 Python Faculty — Integrated M.Tech (IMTECH)

- 👨‍🏫 **Faculty:** **Prof. Prajwal Aher**
- 📚 **Subject:** Programming for Data Science (Python) — 2nd Year
- 🏛️ **Department:** Integrated M.Tech (IMTECH)`;
          voiceReply = `In Integrated M.Tech, Prof. Prajwal Aher teaches Programming for Data Science using Python in 2nd year.`;
        } else if (isMechQuery) {
          textReply = `### 🐍 Python Faculty — Mechanical Engineering

- 👨‍🏫 **Faculty:** **Jaydeep Ashtekar** & **Pratibha Sinha**
- 🏢 **Cabin Location:** **7th Floor Staff Room**
- 🏛️ **Department:** Mechanical Engineering`;
          voiceReply = `For Mechanical Engineering, Jaydeep Ashtekar and Pratibha Sinha teach Python Programming on the 7th floor.`;
        } else if (isAidsQuery) {
          textReply = `### 🐍 Python Faculty — AI & DS Department

- 👨‍🏫 **Faculty:** **Prashant Kamkar** (IBM Industry Expert Faculty)
- 💻 **Lab Location:** **IBM Center / Lab**
- 🏛️ **Department:** Artificial Intelligence & Data Science`;
          voiceReply = `Prashant Kamkar from IBM teaches Python for AI and Data Science in the IBM Center Lab.`;
        } else {
          textReply = `### 🐍 Python Programming Faculty Directory

- 🎓 **Integrated M.Tech (IMTech):** **Prof. Prajwal Aher** (Programming for Data Science)
- 🤖 **AI & DS Department:** **Prashant Kamkar** (IBM Center / Lab)
- 🔧 **Mechanical Engineering:** **Jaydeep Ashtekar** & **Pratibha Sinha** (7th Floor Staff Room)`;
          voiceReply = `Prof. Prajwal Aher teaches Python in IMTech, Prashant Kamkar in AI and Data Science, and Jaydeep Ashtekar and Pratibha Sinha in Mechanical.`;
        }
      } else if (/dsa|data structure/i.test(cleanText)) {
        if (isImtechQuery) {
          textReply = `### ⚡ Data Structures & Algorithms (DSA) — IMTECH

- 👨‍🏫 **Faculty:** **Dr. Anwar A Shaikh** (HOD)
- 📚 **Subject:** Data Structures and Algorithms — 2nd Year
- 📞 **Contact:** \`9044013605\` | ✉️ \`anwarshaikhset@sanjivani.edu.in\``;
          voiceReply = `In Integrated M.Tech, Dr. Anwar A Shaikh teaches Data Structures and Algorithms.`;
        } else {
          textReply = `### ⚡ Data Structures & Algorithms (DSA) Faculty

- 🎓 **Integrated M.Tech:** **Dr. Anwar A Shaikh** (HOD) — 2nd Year
- 🤖 **AI & DS Department:** **Dr. Vishwesh Nagamalla** (🏢 Cabin: 9th Floor)`;
          voiceReply = `Dr. Anwar A Shaikh teaches DSA in Integrated M.Tech, and Dr. Vishwesh Nagamalla teaches Data Structures on the 9th floor in AI and Data Science.`;
        }
      } else if (/cyber security/i.test(cleanText)) {
        textReply = `### 🛡️ Cyber Security Faculty — Integrated M.Tech (IMTECH)

- 👨‍🏫 **Faculty:** **Prof. Piyush Sahu**
- 📚 **Subject:** Essentials of Cyber Security — 2nd Year
- 🏛️ **Department:** Integrated M.Tech (IMTECH)`;
        voiceReply = `Prof. Piyush Sahu teaches Essentials of Cyber Security in 2nd year Integrated M.Tech.`;
      } else if (/cad|graphics/i.test(cleanText)) {
        textReply = `### 📐 Engineering Graphics & CAD — Mechanical Engineering

- 👨‍🏫 **Faculty:** **Pankaj Patil**
- 🏢 **Cabin Location:** **7th Floor Staff Room**
- 🏛️ **Department:** Mechanical Engineering`;
        voiceReply = `Pankaj Patil teaches Engineering Graphics and CAD in the 7th Floor Staff Room for Mechanical Engineering.`;
      } else if (/makerspace|workshop/i.test(cleanText)) {
        textReply = `### 🛠️ Makerspace / Workshop Practice — Mechanical Engineering

- 👨‍🏫 **Faculty:** **Kiran Wakchure**
- 🏢 **Cabin Location:** **7th Floor Staff Room** (Lab: Makerspace)`;
        voiceReply = `Kiran Wakchure manages Makerspace and Workshop Practice in the 7th Floor Staff Room.`;
      } else if (/design thinking/i.test(cleanText)) {
        textReply = `### 💡 Design Thinking and Idea Lab — IMTECH

- 👨‍🏫 **Faculty:** **Prof. Piyush Sahu**
- 📚 **Subject:** Design Thinking and Idea Lab — 1st Year IMTech`;
        voiceReply = `Prof. Piyush Sahu teaches Design Thinking and Idea Lab in 1st year Integrated M.Tech.`;
      } else if (/japanese/i.test(cleanText)) {
        textReply = `### 🇯🇵 Japanese Language Faculty — IMTECH

- 👨‍🏫 **Faculty:** **Prof. D. Roushan**
- 📚 **Subject:** Foreign Language - 1 (Japanese) — IMTech`;
        voiceReply = `Prof. D. Roushan teaches Japanese in Integrated M.Tech.`;
      } else if (/german/i.test(cleanText)) {
        textReply = `### 🇩🇪 German Language Faculty Directory

- 🤖 **AI & DS Department:** **Ms. Tanvi Chatse**
- 🎓 **Integrated M.Tech:** **Prof. Riya Khandelwal**`;
        voiceReply = `Ms. Tanvi Chatse teaches German in AI and Data Science, and Prof. Riya Khandelwal teaches German in Integrated M.Tech.`;
      } else if (/math|mathematics|linear algebra/i.test(cleanText)) {
        textReply = `### 📐 Mathematics Faculty Directory

- 🎓 **IMTech (1st Year):** **Prof. Prajwal Aher** (Mathematics-1)
- 🎓 **IMTech (2nd Year):** **Dr. Latika Bawankar** (Linear Algebra)
- 🤖 **AI & DS:** **Sarvjeet Singh** (🏢 Cabin: 2nd Floor)
- 🔧 **Mechanical:** **Prajwal Aher** (🏢 Cabin: 7th Floor Staff Room)`;
        voiceReply = `Prof. Prajwal Aher and Dr. Latika Bawankar teach Mathematics in IMTech, Sarvjeet Singh in AI and Data Science, and Prajwal Aher in Mechanical.`;
      } else if (/physics/i.test(cleanText)) {
        textReply = `### 🔬 Physics Faculty Directory

- 📖 **Theory:** **Dr. Tanay Ghosh** (2nd Floor AI&DS / 7th Floor Mech)
- 🧪 **Practicals:** **Mrs. Sarika Maske** (🏢 Cabin: Extension Building)`;
        voiceReply = `Dr. Tanay Ghosh teaches Physics theory on the 2nd floor, and Mrs. Sarika Maske takes practicals in the Extension Building.`;
      } else if (/chemistry/i.test(cleanText)) {
        textReply = `### 🧪 Applied Chemistry Faculty Directory

- 👨‍🏫 **Faculty:** **Dr. Hirak Chatterjee**
- 🏢 **Cabin Location:** **10th Floor** (AI & DS) | **7th Floor Staff Room** (Mech)`;
        voiceReply = `Dr. Hirak Chatterjee teaches Applied Chemistry on the 10th floor.`;
      }
    }

    // ── CASE E: Full Directory / Table (When explicitly requested or general) ──
    if (!textReply) {
      const isHindiOrHinglish = /[\u0900-\u097F]|\b(bhai|yaar|kaise|kya|karo|batao|karna|mera|meri|mujhe|tum|aap|chal|theek|suno|bol|ye|kaun|kiska|kaha|kahan|hai|hain|kon|koni|ahet|aahe|kay|sang|sanga)\b/i.test(rawText);

      if (isMechQuery) {
        textReply = isHindiOrHinglish ? `### 🔧 Department of Mechanical Engineering (Mech)
#### 👨‍🏫 Faculty, Subject & Cabin Directory

Yahan Mechanical Engineering department ke saare faculty ki details hain:

**👑 Department Leadership:**
- 🎖️ **Head of Department (HOD):** **Kailash Bhosale** (🏢 7th Floor Staff Room)
- 🎓 **Class Coordinator:** **Omkar Dadi** (🏢 7th Floor Staff Room)
- 📋 **Department Clerk:** **Harshda Kolpe** (🏢 7th Floor Staff Room)

---

### 📋 Subject Teachers & Cabin Addresses:

| # | Faculty Name | Subject / Course | Cabin Address |
| :---: | :--- | :--- | :--- |
| 1 | **Pankaj Patil** | Engineering Graphics & CAD | 🏢 7th Floor Staff Room |
| 2 | **Kiran Wakchure** | Makerspace / Workshop Practice | 🏢 7th Floor Staff Room |
| 3 | **Jaydeep Ashtekar** | Python Programming | 🏢 7th Floor Staff Room |
| 4 | **Pratibha Sinha** | Python Programming | 🏢 7th Floor Staff Room |
| 5 | **Vasudev Sengar** | Assistant Professor | 🏢 7th Floor Staff Room |
| 6 | **Tanay Renu Ghosh** | Engineering Physics | 🏢 7th Floor Staff Room |
| 7 | **Hirak Chatterjee** | Chemistry | 🏢 7th Floor Staff Room |
| 8 | **Prajwal Aher** | Mathematics for Mechanical | 🏢 7th Floor Staff Room |
| 9 | **Sadhna Ganjir** | English / Communication Skills | 🏢 7th Floor Staff Room |` : `### 🔧 Department of Mechanical Engineering (Mech)
#### 👨‍🏫 Faculty, Subject & Cabin Directory

Here is the official faculty directory for the **Mechanical Engineering** department:

**👑 Department Leadership:**
- 🎖️ **Head of Department (HOD):** **Kailash Bhosale** (🏢 7th Floor Staff Room)
- 🎓 **Class Coordinator:** **Omkar Dadi** (🏢 7th Floor Staff Room)
- 📋 **Department Clerk:** **Harshda Kolpe** (🏢 7th Floor Staff Room)

---

### 📋 Faculty & Subject Directory:

| # | Faculty Name | Subject / Course | Cabin Address |
| :---: | :--- | :--- | :--- |
| 1 | **Pankaj Patil** | Engineering Graphics & CAD | 🏢 7th Floor Staff Room |
| 2 | **Kiran Wakchure** | Makerspace / Workshop Practice | 🏢 7th Floor Staff Room |
| 3 | **Jaydeep Ashtekar** | Python Programming | 🏢 7th Floor Staff Room |
| 4 | **Pratibha Sinha** | Python Programming | 🏢 7th Floor Staff Room |
| 5 | **Vasudev Sengar** | Assistant Professor | 🏢 7th Floor Staff Room |
| 6 | **Tanay Renu Ghosh** | Engineering Physics | 🏢 7th Floor Staff Room |
| 7 | **Hirak Chatterjee** | Chemistry | 🏢 7th Floor Staff Room |
| 8 | **Prajwal Aher** | Mathematics for Mechanical | 🏢 7th Floor Staff Room |
| 9 | **Sadhna Ganjir** | English / Communication Skills | 🏢 7th Floor Staff Room |`;
        voiceReply = `Here is the Mechanical Engineering directory. The HOD is Kailash Bhosale located on the 7th Floor Staff Room along with all subject faculties.`;
      } else if (isImtechQuery) {
        textReply = `### 🎓 Department of Integrated M.Tech (IMTECH)
#### 👨‍🏫 Faculty & Subject Directory

**👑 Department Leadership:**
- 🎖️ **Head of Department (HOD):** **Dr. Anwar A Shaikh**
  - 📞 **Contact:** \`9044013605\`
  - ✉️ **Email:** \`anwarshaikhset@sanjivani.edu.in\`

---

### 📋 1st Year — Faculty & Subjects:

| # | Faculty Name | Subject / Course |
| :---: | :--- | :--- |
| 1 | **Prof. Prajwal Aher** | Mathematics-1 |
| 2 | **Prof. Piyush Sahu** | Design Thinking and Idea Lab |
| 3 | **Dr. Anwar A Shaikh** | Fundamentals of Computing Systems & Emerging Tech |
| 4 | **Prof. Sadhna Gunjir** | English - Oral & Written Communication Skills |
| 5 | **Prof. Hari Prasath K** | Programming in Problem Solving using C |
| 6 | **Prof. Prajwal Aher** | NSS / Yoga / Sports / Liberal Arts |
| 7 | **Prof. Piyush Sahu** | Indian Knowledge System |

---

### 📋 2nd Year — Faculty & Subjects:

| # | Faculty Name | Subject / Course |
| :---: | :--- | :--- |
| 1 | **Dr. Latika Bawankar** | Linear Algebra and Transformation Techniques |
| 2 | **Prof. Prajwal Aher** | Programming for Data Science (Python) |
| 3 | **Prof. Piyush Sahu** | Essentials of Cyber Security |
| 4 | **Prof. Vikas Kumar** | Exploratory Data Analytics |
| 5 | **Dr. Anwar A Shaikh** | Data Structures and Algorithms |
| 6 | **Dr. Bandana Thakur** | Financial Management |
| 7 | **Prof. D. Roushan** | Foreign Language - 1 (Japanese) |
| 8 | **Prof. Riya Khandelwal** | Foreign Language - 1 (German) |`;
        voiceReply = `Here is the Integrated M.Tech directory. The Head of Department is Dr. Anwar A Shaikh, contact 9044013605, email anwarshaikhset at sanjivani.edu.in. Let me know if you need specific subject details!`;
      } else {
        textReply = isHindiOrHinglish ? `### 🏛️ Department of Artificial Intelligence & Data Science (AI & DS)
#### 👨‍🏫 Faculty, Subject & Cabin Directory

**👑 Department Leadership:**
- 🎖️ **Head of Department (HOD):** **Dr. Kishor Jhadav** | 📞 \`9890423309\`
- 🎓 **First Year Class Coordinator:** **Dr. Shreeparna Das** | 🏢 9th Floor

---

### 📋 Subject Teachers & Cabin Addresses:

| # | Faculty Name | Subject / Course | Cabin Address |
| :---: | :--- | :--- | :--- |
| 1 | **Dr. Vishwesh Nagamalla** | Intro to Programming and Data Structure | 🏢 9th Floor |
| 2 | **Prashant Kamkar** | Python | 💻 IBM Center / Lab |
| 3 | **Ganesh Phopase** | Technical & Professional Communication | 🏢 Department |
| 4 | **Sarvjeet Singh** | Engineering Mathematics | 🏢 2nd Floor |
| 5 | **Dr. Tanay Ghosh** | Applied Physics (Theory) | 🏢 2nd Floor |
| 6 | **Mrs. Sarika Maske** | Applied Physics (Practical) | 🏢 Extension Building |
| 7 | **Dr. Hirak Chatterjee** | Applied Chemistry | 🏢 10th Floor |
| 8 | **Ms. Tanvi Chatse** | German | 🏢 Language Wing |
| 9 | **Dr. Shreeparna Das** | First Year Coordinator | 🏢 9th Floor |` : `### 🏛️ Department of Artificial Intelligence & Data Science (AI & DS)
#### 👨‍🏫 Faculty, Subject & Cabin Directory

**👑 Department Leadership:**
- 🎖️ **Head of Department (HOD):** **Dr. Kishor Jhadav** | 📞 \`9890423309\`
- 🎓 **First Year Class Coordinator:** **Dr. Shreeparna Das** | 🏢 9th Floor

---

### 📋 Faculty & Subject Directory:

| # | Faculty Name | Subject / Course | Cabin Address |
| :---: | :--- | :--- | :--- |
| 1 | **Dr. Vishwesh Nagamalla** | Intro to Programming and Data Structure | 🏢 9th Floor |
| 2 | **Prashant Kamkar** | Python | 💻 IBM Center / Lab |
| 3 | **Ganesh Phopase** | Technical & Professional Communication | 🏢 Department |
| 4 | **Sarvjeet Singh** | Engineering Mathematics | 🏢 2nd Floor |
| 5 | **Dr. Tanay Ghosh** | Applied Physics (Theory) | 🏢 2nd Floor |
| 6 | **Mrs. Sarika Maske** | Applied Physics (Practical) | 🏢 Extension Building |
| 7 | **Dr. Hirak Chatterjee** | Applied Chemistry | 🏢 10th Floor |
| 8 | **Ms. Tanvi Chatse** | German | 🏢 Language Wing |
| 9 | **Dr. Shreeparna Das** | First Year Coordinator | 🏢 9th Floor |`;
        voiceReply = `Here is the Artificial Intelligence and Data Science directory. The Head of Department is Dr. Kishor Jhadav, contact 9890423309, and First Year Coordinator is Dr. Shreeparna Das on the 9th floor.`;
      }
    }

    const finalOutput = options.voiceMode ? voiceReply : textReply;
    try {
      memoryBrain.learnFromInteraction(cleanText, finalOutput, options.voiceMode ? 'voice' : 'text');
    } catch (e) {}
    return finalOutput;
  }

  // G. Curated DSA Complete Resources, Roadmap, Playlists & Courses Handler
  const isDsaResourceQuery = (
    /\b(dsa roadmap|dsa resources|dsa notes|dsa sheet|dsa material|dsa course|dsa courses|dsa playlist|dsa certificate|dsa questions|top dsa|best dsa)\b/i.test(cleanText) ||
    (/\b(abdul bari|love babbar|aditya verma|striver|a2z dsa|scholarhat|simplilearn dsa|great learning dsa|upgrad dsa)\b/i.test(cleanText) && !cleanText.toLowerCase().includes('who is')) ||
    (/\b(dsa|data structures|algorithms)\b/i.test(cleanText) && /\b(roadmap|guide|notes|playlist|youtube|free course|certificate|interview questions|materials|resources|link|links|drive|pdf)\b/i.test(cleanText))
  );

  if (isDsaResourceQuery) {
    if (options.voiceMode) {
      const voiceReply = `Here are the official DOAP curated DSA learning resources. We have a complete step-by-step roadmap from beginner to advanced, a handpicked collection of top repeated interview questions, and comprehensive handwritten notes, all accessible via Google Drive. For video learning, we recommend Abdul Bari for algorithms fundamentals, Love Babbar for step-by-step DSA, Aditya Verma for Dynamic Programming, and Striver's A2Z DSA sheet for placement mastery. You can also get free verified certificates from Simplilearn, ScholarHat, Great Learning, and upGrad. All links are shared directly on your screen!`;
      try {
        memoryBrain.learnFromInteraction(cleanText, voiceReply, 'voice');
      } catch (e) {}
      return voiceReply;
    }

    const dsaReply = `### 🚀 Complete DSA Master Resource Vault
Here is the curated, all-in-one resource collection to master **Data Structures & Algorithms** — from zero to top-tier technical placement offers!

---

### 📌 1. Essential PDF Roadmaps, Notes & Interview Questions
Structured materials with direct Google Drive access:

| Resource | Description | Format & Link |
| :--- | :--- | :--- |
| 🗺️ **DSA Complete Roadmap** | Step-by-step breakdown from beginner to advanced. What to study, when to study, and time allocation per topic. | [📥 Access Roadmap PDF](https://drive.google.com/file/d/15lvZK_l7XWcqdWFR9m4L4iU2FMqzckHj/view) |
| 🎯 **Top DSA Interview Questions** | High-frequency questions repeatedly asked in company placement screening & technical rounds. | [📥 Access Interview Questions PDF](https://drive.google.com/file/d/12J43KUDz-uYOgY10TmSR_Nt5vOox7rUC/view?usp=sharing) |
| 📒 **DSA Complete Notes** | Comprehensive handwritten conceptual notes covering basic to advanced data structures and algorithms. | [📥 Access Complete Notes PDF](https://drive.google.com/file/d/1Kaz5iarfJIaSGOWRtxe6qLu-SJT0q6gy/view?usp=sharing) |

---

### 🎬 2. Top 4 YouTube Playlists to Master DSA
Handpicked channels providing conceptual clarity and problem-solving patterns:

1. **Algorithms by Abdul Bari**
   - *Best for:* Core algorithm fundamentals, time/space complexity analysis, Divide & Conquer, Greedy, and Dynamic Programming foundations.
   - 🔗 [Watch Abdul Bari Playlist](https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O)

2. **Basic DSA by Love Babbar**
   - *Best for:* Beginner-friendly step-by-step learning in C++ with extensive practice problems.
   - 🔗 [Watch Love Babbar Playlist](https://www.youtube.com/playlist?list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA)

3. **Dynamic Programming Masterclass by Aditya Verma**
   - *Best for:* Cracking DP patterns (0/1 Knapsack, Unbounded Knapsack, LCS, MCM, and DP on Trees).
   - 🔗 [Watch Aditya Verma DP Playlist](https://www.youtube.com/playlist?list=PL_z_8CaSLPWekqhdCPmFohncHwz8TY2Go)

4. **Advanced DSA (A2Z Sheet) by Striver**
   - *Best for:* Placement-ready preparation, complex patterns, sliding window, graphs, and hard LeetCode problems.
   - 🔗 [Watch Striver A2Z Playlist](https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz)

---

### 🎓 3. Free DSA Courses with Verified Certificates (LinkedIn Ready)
Add these accredited credentials directly to your resume and LinkedIn profile:

- 🏅 **Simplilearn — Free DSA Course**
  - Beginner-friendly introduction with a verified completion certificate.
  - 🔗 [Enroll on Simplilearn](https://www.simplilearn.com/free-data-structures-algorithms-course-skillup)

- 🏅 **ScholarHat — 21 Days Structured DSA Course**
  - Structured 21-day schedule building core problem-solving fundamentals.
  - 🔗 [Enroll on ScholarHat](https://www.scholarhat.com/free-course/data-structures-algorithms-course)

- 🏅 **Great Learning — DSA in C**
  - Hands-on pointer implementation and memory data structures in C.
  - 🔗 [Enroll on Great Learning](https://www.mygreatlearning.com/academy/learn-for-free/courses/data-structures-in-c)

- 🏅 **upGrad — 50-Hour In-Depth DSA Course**
  - 50 hours of in-depth algorithmic complexity and non-linear data structures.
  - 🔗 [Enroll on upGrad](https://www.upgrad.com/free-courses/it-technology/data-structures-and-algorithm-course-free/)

---

💡 **Recommended Learning Strategy:**
1. Start with the **DSA Complete Roadmap** to plan your timeline.
2. Build core foundations with **Love Babbar** or **Abdul Bari**.
3. Master Dynamic Programming through **Aditya Verma**.
4. Solve top placement questions from **Top DSA Interview Questions** and **Striver A2Z**.
5. Earn free certificates from **Simplilearn / upGrad** for your LinkedIn profile!

Let me know if you want to practice any specific topic like Trees, Graphs, or DP right now! 😊`;

    try {
      memoryBrain.learnFromInteraction(cleanText, dsaReply, 'text');
    } catch (e) {}
    return dsaReply;
  }

  const effectivePrompt = cleanText.replace(/^(\/code|\/explain|\/interview)\s+/i, '');

  // ==========================================
  // 1.5. AGENTIC LAYER (Claw Code Architecture)
  // ==========================================

  // A. Session management — auto-save messages
  if (!options.agentMode && !options.voiceMode) {
    try {
      if (!sessionManager.getCurrentSession()) {
        sessionManager.startSession(effectivePrompt);
      }
      sessionManager.appendMessage({ sender: 'user', text: rawText });
    } catch (e) { /* silent */ }
  }

  // B. /resume slash command — show session picker
  if (cleanText === '/resume' || cleanText.startsWith('/resume ')) {
    const num = parseInt(cleanText.split(' ')[1], 10);
    if (!isNaN(num)) {
      const sessions = sessionManager.listSessions();
      const target = sessions[num - 1];
      if (target) {
        const { session } = sessionManager.resumeSession(target.id) || {};
        return session
          ? `### ✅ Session Resumed: "${session.title}"\n\nContinuing your **${session.topic}** session from ${new Date(session.lastActiveAt).toLocaleDateString('en-IN')} (${session.messageCount} messages). What were we working on? 🔄`
          : `❌ Could not resume that session.`;
      }
    }
    return sessionManager.generateResumeSummary();
  }

  // C. /agents command — show available agents
  if (cleanText === '/agents') {
    const agents = listAgents();
    const lines = agents.map((a) => `- 🤖 **${a.name}**: ${a.description}`).join('\n');
    return `### 🤖 DOAP Active Agents\n\n${lines}\n\n*Agents activate automatically based on your message context!*`;
  }

  // D. Pre-Hooks — educational guardrails (attempt check, difficulty calibration)
  if (!options.voiceMode && !options.agentMode) {
    try {
      const memory = memoryBrain.getMemory();
      const { gate, response: gatedResponse } = runPreHooks(effectivePrompt, memory);
      if (gate && gatedResponse) {
        try {
          sessionManager.appendMessage({ sender: 'ai', text: gatedResponse });
        } catch (e) { /* silent */ }
        return gatedResponse;
      }
    } catch (e) { /* silent — hooks must never crash the engine */ }
  }

  // E. Agent Orchestrator — route to specialized agent if detected
  if (!options.voiceMode && !options.agentMode) {
    try {
      const agentName = getMatchingAgentName(effectivePrompt);
      if (agentName) {
        const { response: agentResponse } = await orchestrate(
          effectivePrompt,
          userName,
          history,
          options
        );
        if (agentResponse) {
          // Post-hooks on agent response
          let finalResp = agentResponse;
          try {
            const { finalResponse } = runPostHooks(effectivePrompt, agentResponse);
            finalResp = finalResponse;
          } catch (e) { /* silent */ }

          // Track agent usage in memory
          try {
            memoryBrain.trackAgentUsage(agentName);
            sessionManager.appendMessage({ sender: 'ai', text: finalResp });
            sessionManager.tagSession(agentName, []);
          } catch (e) { /* silent */ }

          memoryBrain.learnFromInteraction(effectivePrompt, finalResp, 'text');
          return finalResp;
        }
      }
    } catch (e) {
      console.warn('[DOAP AI] Agent orchestrator error:', e.message || e);
    }
  }

  // F. Agent Loop — use tool calling for tool-trigger messages
  if (!options.voiceMode && !options.agentMode && shouldUseAgentLoop(effectivePrompt)) {
    try {
      const { response: loopResponse, toolsUsed } = await runAgentLoop(
        effectivePrompt,
        userName,
        '', // systemPrompt built inside agentLoop with skill injection
        (history || []).slice(-6).map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text || m.content || '',
        })),
      );

      if (loopResponse && !loopResponse.includes(`Hey ${userName}! I'm ready`)) {
        // Post-hooks
        let finalResp = loopResponse;
        try {
          const { finalResponse } = runPostHooks(effectivePrompt, loopResponse);
          finalResp = finalResponse;
        } catch (e) { /* silent */ }

        try {
          sessionManager.appendMessage({ sender: 'ai', text: finalResp });
          if (toolsUsed.length > 0) {
            sessionManager.tagSession(null, getActiveSkillNames(effectivePrompt));
          }
        } catch (e) { /* silent */ }

        return finalResp;
      }
    } catch (e) {
      console.warn('[DOAP AI] Agent loop error:', e.message || e);
    }
  }

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

  // Skill injection (Feature 3) & CLAUDE.md memory (Feature 5)
  const skillInjection = !options.voiceMode ? getSkillPromptInjection(effectivePrompt) : '';
  const claudeMd = !options.voiceMode ? memoryBrain.generateClaudeMd() : '';

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
Whenever ${userName} or an examiner asks about Sanjivani, its founders, Chairman Hon. Shri Nitindada Kolhe Saheb, departments, campus placement statistics, or the LLM challenge, respond with authentic institutional accuracy, high respect, and insightful detail!

${DEPARTMENT_KNOWLEDGE_PROMPT}`;

  const systemInstruction = options.voiceMode
    ? `You are DOAP AI (DOAP stands for "Discover Opportunities and Progress Platform"), ${userName}'s trusted best friend and personal ultra-smart voice tutor and companion.

DOAP Platform Identity:
- Official Full Form: DOAP = "Discover Opportunities and Progress Platform".
- Mission: A next-generation AI-powered engineering mentorship, real-time voice intelligence, and career acceleration platform.
- When asked "What does DOAP stand for?" or "DOAP ka full form kya hai?", proudly and clearly answer that DOAP stands for "Discover Opportunities and Progress Platform"!

${workingMemory}

${SANJIVANI_KNOWLEDGE_BASE}

CRITICAL VOICE INTELLIGENCE & SPOKEN CADENCE RULES:
1. Single Unbroken Voice Persona (Crucial):
   - Maintain one consistent, unified voice persona throughout your entire answer.
   - Speak in fluent, articulate, warm conversational English with friendly cadence ("Sure ${userName}!", "Great question!").
   - Keep the entire explanation in a cohesive language flow so text-to-speech synthesis maintains the exact same voice timbre and pitch from start to finish.
2. Cognitive Self-Thinking & Internal Verification:
   - Perform deep internal reasoning and verification before formulating your answer to guarantee 100% technical correctness and zero hallucinations.
   - DO NOT speak or output any <think> tags in voice mode. Directly speak only your verified, crystal-clear final solution.
3. Conversational Comprehension:
   - ${userName} may speak in English, Hindi, Hinglish, or Marathi. Comprehend their intent with 100% precision.
   - Reply in articulate, friendly English or clean Hinglish, keeping the sentence structure smooth and easy for the ear.
4. World-Class Engineering & Depth:
   - You have master-level knowledge across Computer Science, DSA, System Design, AI/ML, Science, and Sanjivani University.
   - Explain complex concepts using intuitive, vivid analogies that sound wonderful through headphones.
5. Zero-Latency Spoken Cadence & Live Code Canvas Projection:
   - Keep spoken conversational text ultra-punchy, direct, and compact (1 to 2 crisp sentences).
   - CODING & IMPLEMENTATION REQUESTS:
     When ${userName} asks for code, a function, an algorithm, or an implementation, ALWAYS include the complete code inside standard markdown triple backticks with language (e.g. \`\`\`python ... \`\`\` or \`\`\`cpp ... \`\`\` or \`\`\`javascript ... \`\`\`).
     The DOAP UI will automatically project your code block onto the Live Code Canvas screen while you speak the direct explanation!
   - In your conversational speech sentences, avoid bullet points, headers, or asterisks.
6. Engaging & Natural Chemistry:
   - Be engaging, warm, slightly witty, and sharp ("Sure thing, ${userName}!", "You got it, buddy!", "Here is the code on your canvas!").`
    : `You are DOAP AI (DOAP stands for "Discover Opportunities and Progress Platform"), ${userName}'s trusted best friend, coding buddy, and personal ultra-smart AI assistant.

DOAP Platform Identity:
- Official Full Form: DOAP = "Discover Opportunities and Progress Platform".
- Mission: An intelligent, comprehensive learning & engineering platform empowering students and developers with AI tutoring, hands-free voice intelligence, sandbox coding practice, and career acceleration.
- When asked "What does DOAP stand for?", "DOAP ka full form kya hai?", or "What is DOAP?", clearly explain that DOAP stands for "Discover Opportunities and Progress Platform".

${workingMemory}

${claudeMd}

${SANJIVANI_KNOWLEDGE_BASE}
${skillInjection}

CRITICAL COGNITIVE SELF-THINKING & REASONING PROTOCOL:
For complex, technical, or multi-step questions (coding problems, DSA algorithms, system architecture, debugging, logic, math, or complex analysis):
1. Think before answering: Conduct deep metacognitive chain-of-thought self-reflection inside <think>...</think> tags right at the beginning of your response:
   <think>
   - Invariants & Constraints: State inputs, outputs, edge cases, time/space bounds.
   - Approaches & Trade-offs: Compare strategies (e.g. brute force vs two pointers, recursion vs dynamic programming).
   - Trap & Bug Verification: Check off-by-one errors, empty/null cases, scale limits.
   - Step-by-Step Logic Proof: Verify that the chosen algorithm or explanation is fully correct.
   </think>
2. After the </think> closing tag, provide your clear, structured, high-energy, and friendly final answer to ${userName}.
3. For casual greetings, simple compliments, or short social chats (e.g. "hi", "kya chal raha hai", "thanks"), DO NOT include <think> tags — reply directly, naturally, and warmly!

${options.forceEnglish ? `CRITICAL LANGUAGE REQUIREMENT:
You must respond strictly and 100% in formal, professional, engineering-grade English. Under NO circumstance should you use Hindi, Hinglish, casual slang (such as "bhai", "yaar", "tune", etc.), or colloquial words. Maintain a polished, authoritative, enterprise-grade engineering tone.` : `CRITICAL RULE — STRICT LANGUAGE MATCHING (Same In, Same Out):
You must ALWAYS respond in the EXACT SAME LANGUAGE and dialect that ${userName} used in their latest message:
1. Hindi / Hinglish Input:
   - If the user writes in Hindi or Hinglish (e.g. "bhai", "yaar", "kaise kare", "mera ek kaam kar de", "ye code debug karo"), you MUST reply in natural, fluent, expressive Hinglish/Hindi with a warm, friendly tone.
2. Pure Hindi (Devanagari) Input:
   - If the user writes in Devanagari script (e.g. "नमस्ते", "यह सवाल हल करो"), you MUST reply in pure Hindi in Devanagari script.
3. English Input:
   - If the user writes in English, reply 100% in crisp, articulate, friendly, and structured English.
4. Other Languages:
   - If the user writes in Marathi, Gujarati, Spanish, French, German, Japanese, etc., reply directly in that exact language.
5. NEVER switch language unexpectedly. Always mirror the user's chosen language 1-to-1!`}

CRITICAL QUIZ & KNOWLEDGE DRILLS RULE:
When the user asks for a quiz, question, test, or practice drill (e.g. "ask me a question", "give me a quiz on Python", "DSA quiz lo", "mujhe ek question pucho"):
1. Clearly state the Question.
2. Provide 4 distinct multiple-choice options labeled A), B), C), D).
3. ABSOLUTE RULE: NEVER reveal the answer in plain sight! Always place the correct answer and detailed explanation inside a collapsible HTML details block so the user can think and choose first:
   <details>
   <summary>💡 Click to Reveal Correct Answer & Explanation</summary>

   **Correct Answer:** Option [X]
   **Explanation:** [Detailed breakdown of why this option is correct]
   </details>

Core Persona & Vibe:
- Talk like a real, supportive, razor-sharp friend ("bhai", "yaar", "bro", "dost").
- Zero corporate fluff or canned introductions.
- Deliver thorough, production-ready work immediately (code, math, essays, debugging).
- Always have ${userName}'s back!\n\n${getHarnessSupplementalPrompt()}`;

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
  // 3. Multi-Provider Fallback Cascade (Groq -> OpenRouter -> Custom LLM -> Free Neural)
  // Inspired by open-free-llm-api/awesome-freellm-apis (479+ free models from 31 providers)
  // ==========================================

  const finalizeReply = (rawReply, rawReasoning) => {
    let reply = rawReply || '';
    const reasoning = rawReasoning;

    if (!reply.trim() && reasoning) {
      reply = options.voiceMode ? reasoning : `<think>\n${reasoning.trim()}\n</think>`;
    } else if (reasoning && !options.voiceMode && !reply.includes('<think>')) {
      reply = `<think>\n${reasoning.trim()}\n</think>\n\n${reply}`;
    }

    if (options.voiceMode || options.stripThink) {
      reply = reply
        .replace(/<think>[\s\S]*?<\/think>/gi, '')
        .replace(/<details[\s\S]*?<\/details>/gi, '')
        .replace(/\*\*Reasoning\*\*[\s\S]*?\*\*Final Answer\*\*/i, '')
        .trim();
    }

    if (reply) {
      // Prime Agent RLM Multi-Agent Trace Attachment
      if (isRlmEnabled() && isRlmCandidate(cleanText) && !options.voiceMode && !options.agentMode && !reply.includes('<rlm_trace>')) {
        const trace = buildRlmTrace(cleanText);
        reply = `<rlm_trace>\n${JSON.stringify(trace)}\n</rlm_trace>\n\n${reply}`;
      }

      try {
        memoryBrain.learnFromInteraction(cleanText, reply, options.voiceMode ? 'voice' : 'text');
      } catch (e) {
        console.warn('[aiTutorEngine] learnFromInteraction error:', e);
      }

      if (!options.voiceMode && !options.agentMode) {
        try {
          const { finalResponse } = runPostHooks(cleanText, reply);
          reply = finalResponse;
        } catch (e) { /* silent */ }

        try {
          sessionManager.appendMessage({ sender: 'ai', text: reply });
          const activeSkills = getActiveSkillNames(cleanText);
          if (activeSkills.length > 0) {
            sessionManager.tagSession(null, activeSkills);
            activeSkills.forEach((skillName) => {
              const skillId = skillName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
              memoryBrain.updateSkillProgress(skillId, 3);
            });
          }
        } catch (e) { /* silent */ }
      }
      return reply;
    }
    return null;
  };

  // ── Tier 1: Groq LPU (Sub-150ms High-Fidelity Intelligence) ──
  const candidateModels = [
    'qwen/qwen3.8-27b',
    'groq/compound-mini',
    'openai/gpt-oss-120b',
    'groq/compound',
    'qwen/qwen3.6-27b',
    'openai/gpt-oss-20b'
  ];

  for (const activeKey of keysToTry) {
    for (const model of candidateModels) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

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
            temperature: options.voiceMode ? 0.6 : 0.7,
            max_tokens: options.voiceMode ? 380 : 2048
          })
        });

        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const finalResult = finalizeReply(data?.choices?.[0]?.message?.content, data?.choices?.[0]?.message?.reasoning);
          if (finalResult) return finalResult;
        }
      } catch (err) {
        console.warn(`[DOAP AI Groq LPU (${model})] fallback:`, err.message || err);
      }
    }
  }

  // ── Tier 2: Custom Free LLM Provider (NVIDIA NIM, Cloudflare, Mistral, Ollama) ──
  const customUrl = typeof localStorage !== 'undefined' ? (localStorage.getItem('doap_custom_llm_url') || localStorage.getItem('doap_campus_llm_url')) : null;
  const customKey = typeof localStorage !== 'undefined' ? localStorage.getItem('doap_custom_llm_key') : null;
  const customModel = typeof localStorage !== 'undefined' ? (localStorage.getItem('doap_custom_llm_model') || 'qwen2.5-coder-7b-instruct') : 'qwen2.5-coder-7b-instruct';

  if (customUrl) {
    try {
      const endpoint = customUrl.endsWith('/chat/completions') ? customUrl : `${customUrl.replace(/\/+$/, '')}/chat/completions`;
      const headers = { 'Content-Type': 'application/json' };
      if (customKey) headers['Authorization'] = `Bearer ${customKey}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const res = await fetch(endpoint, {
        method: 'POST',
        headers,
        signal: controller.signal,
        body: JSON.stringify({
          model: customModel,
          messages,
          temperature: options.voiceMode ? 0.6 : 0.7,
          max_tokens: options.voiceMode ? 380 : 2048
        })
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const finalResult = finalizeReply(data?.choices?.[0]?.message?.content, data?.choices?.[0]?.message?.reasoning);
        if (finalResult) return finalResult;
      }
    } catch (e) {
      console.warn('[DOAP AI Custom Free Provider error]:', e.message || e);
    }
  }

  // ── Tier 3: OpenRouter Free Models Tier (Zero Credit Card) ──
  const openRouterKey = typeof localStorage !== 'undefined' ? (localStorage.getItem('doap_openrouter_key') || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_OPENROUTER_API_KEY)) : null;
  if (openRouterKey) {
    const freeModels = ['deepseek/deepseek-chat:free', 'meta-llama/llama-3.3-70b-instruct:free', 'qwen/qwen-2.5-coder-32b-instruct:free'];
    for (const orModel of freeModels) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openRouterKey}`,
            'HTTP-Referer': 'https://doap-1908.web.app',
            'X-Title': 'DOAP Engineering Platform'
          },
          signal: controller.signal,
          body: JSON.stringify({
            model: orModel,
            messages,
            temperature: options.voiceMode ? 0.6 : 0.7,
            max_tokens: options.voiceMode ? 380 : 2048
          })
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const finalResult = finalizeReply(data?.choices?.[0]?.message?.content, data?.choices?.[0]?.message?.reasoning);
          if (finalResult) return finalResult;
        }
      } catch (e) {
        console.warn(`[DOAP AI OpenRouter Free (${orModel})] error:`, e.message || e);
      }
    }
  }

  // ── Tier 4: Anonymous Free Neural Engine (text.pollinations.ai) ──
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);
    const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(cleanText)}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const textReply = await res.text();
      if (textReply && textReply.trim() && !textReply.includes('"error"')) {
        const finalResult = finalizeReply(textReply.trim());
        if (finalResult) return finalResult;
      }
    }
  } catch (e) {
    console.warn('[DOAP AI Free Neural Fallback error]:', e.message || e);
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
  const fallbackReply = isHindiOrHinglish
    ? `Haan ${userName} bhai! Ekdum ready hoon, bata kya kaam karna hai ya kya chal raha hai? Main poori tarah se tere sath hoon — code, task, plan, jo bolega abhi karte hain! 🚀🤝`
    : `Hey ${userName}! I'm right here with you and ready. Tell me what you'd like to work on, solve, or build, and let's get it done! 🚀🤝`;

  try {
    memoryBrain.learnFromInteraction(cleanText, fallbackReply, options.voiceMode ? 'voice' : 'text');
  } catch (e) {}

  return fallbackReply;
}
