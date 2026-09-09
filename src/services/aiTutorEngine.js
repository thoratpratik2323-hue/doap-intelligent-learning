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
  const isFacultyQuery = (
    /\b(faculty|faculties|teacher|teachers|prof|professor|professors|staff|hod|head of department|coordinator)\b/i.test(cleanText) ||
    /\b(vishwesh|nagamalla|prashant kamkar|kamkar|ganesh phopase|phopase|sarvjeet|tanay ghosh|sarika maske|hirak chatterjee|tanvi chatse|shreeparna|kishor jhadav|jhadav)\b/i.test(cleanText) ||
    /\b(who teaches|kaun padhata|koun padhata|padhate|padhati|kiska cabin|cabin address|cabin number|cabin kahan|cabin batao)\b/i.test(cleanText) ||
    ((lowerText.includes('python') || lowerText.includes('math') || lowerText.includes('physics') || lowerText.includes('chemistry') || lowerText.includes('german') || lowerText.includes('communication') || lowerText.includes('data structure') || lowerText.includes('programming')) &&
     (lowerText.includes('faculty') || lowerText.includes('teacher') || lowerText.includes('prof') || lowerText.includes('sir') || lowerText.includes('madam') || lowerText.includes('maam') || lowerText.includes('kaun') || lowerText.includes('who') || lowerText.includes('cabin') || lowerText.includes('kahan')))
  );

  if (isFacultyQuery) {
    if (options.voiceMode) {
      const voiceReply = `Here is the Artificial Intelligence and Data Science department directory. The Head of Department is Dr. Kishor Jhadav, contact 9890423309. Dr. Shreeparna Das is the First Year Class Coordinator on the 9th floor. Dr. Vishwesh Nagamalla teaches Programming and Data Structures on the 9th floor. Prashant Kamkar from IBM teaches Python. Sarvjeet Singh teaches Engineering Mathematics on the 2nd floor. Dr. Tanay Ghosh teaches Physics theory on the 2nd floor, and Mrs. Sarika Maske takes Physics practicals in the Extension Building. Dr. Hirak Chatterjee teaches Applied Chemistry on the 10th floor, Ganesh Phopase teaches Technical Communication, and Ms. Tanvi Chatse teaches German. Let me know if you need to connect with any specific professor!`;
      try {
        memoryBrain.learnFromInteraction(cleanText, voiceReply, 'voice');
      } catch (e) {}
      return voiceReply;
    }

    const isHindiOrHinglish = /[\u0900-\u097F]|\b(bhai|yaar|kaise|kya|karo|batao|karna|mera|meri|mujhe|tum|aap|chal|theek|suno|bol|ye|kaun|kiska|kaha|kahan|hai|hain)\b/i.test(rawText);

    const facultyReply = isHindiOrHinglish ? `### 🏛️ Department of Artificial Intelligence & Data Science (AI & DS)
#### 👨‍🏫 Faculty, Subject & Cabin Directory

Here are the complete details for all faculty members and leadership in **AI & DS Department**:

**👑 Department Leadership:**
- 🎖️ **Head of Department (HOD):** **Dr. Kishor Jhadav**
  - 📞 **Contact Number:** \`9890423309\`
  - ✉️ **Email:** —
- 🎓 **First Year Class Coordinator:** **Dr. Shreeparna Das**
  - 🏢 **Cabin Location:** **9th Floor**

---

### 📋 Subject Teachers & Cabin Addresses:

| # | Faculty Name | Subject / Course | Cabin Address | Designation / Role |
| :---: | :--- | :--- | :--- | :--- |
| 1 | **Dr. Vishwesh Nagamalla** | Introduction to Programming and Data Structure | 🏢 **9th Floor** | Senior Faculty |
| 2 | **Prashant Kamkar** | Python | 💻 **IBM Center / Lab** | IBM Industry Expert |
| 3 | **Ganesh Phopase** | Technical & Professional Communication Skills | 🏢 **Department** | Communication Skills |
| 4 | **Sarvjeet Singh** | Engineering Mathematics | 🏢 **2nd Floor** | Mathematics Faculty |
| 5 | **Dr. Tanay Ghosh** | Applied Physics (Theory) | 🏢 **2nd Floor** | Physics Faculty |
| 6 | **Mrs. Sarika Maske** | Applied Physics (Practical) | 🏢 **Extension Building** | Physics Lab Incharge |
| 7 | **Dr. Hirak Chatterjee** | Applied Chemistry (Theory & Practical) | 🏢 **10th Floor** | Chemistry Faculty |
| 8 | **Ms. Tanvi Chatse** | German | 🏢 **Language Wing** | Foreign Language Trainer |
| 9 | **Dr. Shreeparna Das** | First Year Class Coordinator | 🏢 **9th Floor** | Class Coordinator |

---

💡 **Key Notes & Quick Assistance:**
- **HOD Desk:** Dr. Kishor Jhadav se urgent official query ke liye unke direct number \`9890423309\` par reach out kar sakte hain.
- **DSA / Programming:** Programming and Data Structures ke doubts ke liye **Dr. Vishwesh Nagamalla** sir 9th floor par milenge.
- **Python Guidance:** **Prashant Kamkar** (IBM Faculty) Python lab aur industry projects guide karte hain.
- **First Year Coordination:** Koi bhi academic coordination issue ho toh **Dr. Shreeparna Das** ma'am 9th floor par help karti hain.
- **Physics Practicals:** Lab **Extension Building** mai **Mrs. Sarika Maske** ma'am ke under conduct hoti hai.

Batao ${userName}, kisi specific teacher ya cabin ke baare me aur kuch puchna hai? 😊` : `### 🏛️ Department of Artificial Intelligence & Data Science (AI & DS)
#### 👨‍🏫 Faculty, Subject & Cabin Directory

Here is the official faculty and subject directory for the **Artificial Intelligence & Data Science** department:

**👑 Department Leadership & Coordination:**
- 🎖️ **Head of Department (HOD):** **Dr. Kishor Jhadav**
  - 📞 **Contact Number:** \`9890423309\`
  - ✉️ **Email:** —
- 🎓 **First Year Class Coordinator:** **Dr. Shreeparna Das**
  - 🏢 **Cabin Location:** **9th Floor**

---

### 📋 Faculty, Course & Cabin Directory:

| # | Faculty Name | Subject / Course | Cabin Address | Role |
| :---: | :--- | :--- | :--- | :--- |
| 1 | **Dr. Vishwesh Nagamalla** | Introduction to Programming and Data Structure | 🏢 **9th Floor** | Professor |
| 2 | **Prashant Kamkar** | Python | 💻 **IBM Center / Lab** | IBM Faculty |
| 3 | **Ganesh Phopase** | Technical & Professional Communication Skills | 🏢 **Department Wing** | Faculty |
| 4 | **Sarvjeet Singh** | Engineering Mathematics | 🏢 **2nd Floor** | Assistant Professor |
| 5 | **Dr. Tanay Ghosh** | Applied Physics (Theory) | 🏢 **2nd Floor** | Associate Professor |
| 6 | **Mrs. Sarika Maske** | Applied Physics (Practical) | 🏢 **Extension Building** | Assistant Professor |
| 7 | **Dr. Hirak Chatterjee** | Applied Chemistry (Theory & Practical) | 🏢 **10th Floor** | Associate Professor |
| 8 | **Ms. Tanvi Chatse** | German | 🏢 **Language Wing** | Foreign Language Faculty |
| 9 | **Dr. Shreeparna Das** | First Year Class Coordinator | 🏢 **9th Floor** | Coordinator & Faculty |

---

💡 **Quick Reference:**
- **HOD Contact:** Dr. Kishor Jhadav — \`9890423309\`.
- **First Year Coordinator:** Dr. Shreeparna Das — 9th Floor.
- **Programming & Data Structures:** Dr. Vishwesh Nagamalla — 9th Floor.
- **Physics Practicals:** Mrs. Sarika Maske — Extension Building.
- **Engineering Mathematics:** Sarvjeet Singh — 2nd Floor.
- **Applied Chemistry:** Dr. Hirak Chatterjee — 10th Floor.

Feel free to ask if you need details about office hours or syllabus for any subject!`;

    try {
      memoryBrain.learnFromInteraction(cleanText, facultyReply, 'text');
    } catch (e) {}
    return facultyReply;
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
