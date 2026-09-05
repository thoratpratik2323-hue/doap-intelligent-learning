/**
 * DOAP Unified 8-Layer Memory Brain (Inspired by IP-Verse-Mafia & Project-Brain)
 * Persistent, self-updating cognitive memory that ensures DOAP never forgets.
 */

const STORAGE_KEY = 'doap_unified_memory_brain_v1';

const DEFAULT_MEMORY = {
  // Layer 1: Identity & Persona
  identity: {
    userName: 'Pratik Thorat',
    preferredName: 'Pratik',
    title: 'Full-Stack & AI Systems Architect',
    targetRole: 'Senior AI Engineer / Systems Software Engineer',
    targetCompanies: ['Google', 'OpenAI', 'Microsoft', 'NVIDIA', 'Top AI Startups'],
    primaryLanguages: ['Python', 'JavaScript/TypeScript', 'C++', 'Java']
  },

  // Layer 2: Episodic Memory (Key interactions & recent topics)
  episodic: [
    {
      timestamp: Date.now(),
      topic: 'Voice AI & Real-Time Audio Engine',
      notes: 'Configured Mark-LII Arc-Reactor HUD, Groq Whisper STT, ElevenLabs studio voices, and 120B reasoning engine.'
    },
    {
      timestamp: Date.now() - 3600000,
      topic: 'IP-Verse-Mafia Ecosystem Integration',
      notes: 'Connecting desktop IP Prime OS shell, IP Army autonomous agents, and 8-layer memory brain.'
    }
  ],

  // Layer 3: Semantic Knowledge Graph
  semantic: {
    mastered: ['React', 'JavaScript', 'REST APIs', 'Voice AI Integration', 'Web Audio API', 'Prompt Engineering'],
    inProgress: ['Advanced DSA (Graphs & Trees)', 'System Design', 'ML Pipelines', 'Compiler Internals'],
    focusThisWeek: ['DSA Complexity & Numericals', 'Fast API / WebSocket Bridges']
  },

  // Layer 4: Weakness & Growth Tracker
  weaknesses: {
    reviewTopics: ['Dynamic Programming Memoization', 'Graph Cycles (Union-Find)'],
    lastStumbledOn: 'Edge cases in recursive tree traversals'
  },

  // Layer 5: Procedural Preferences
  procedural: {
    preferredCodingLanguage: 'python',
    speechLanguage: 'en-IN',
    themePreference: 'dark',
    communicationStyle: 'Best friend, razor-sharp, direct action, zero corporate fluff'
  },

  // Layer 6: Project & Repository Registry
  projects: [
    {
      name: 'IP-Verse-Mafia (IP Prime OS)',
      description: 'AI-Powered Desktop OS Shell with 12 autonomous agents, glassmorphic UI, and system autopilot.',
      stack: ['Python', 'Gemini AI', 'Groq', 'pywinauto', 'pycaw']
    },
    {
      name: 'DOAP — Intelligent Learning Platform',
      description: 'Cloud interactive learning platform with AI Tutor, Coding Practice, Voice Tutor, and Assessments.',
      stack: ['React', 'Vite', 'Tailwind', 'Groq 120B', 'ElevenLabs', 'Firebase']
    },
    {
      name: 'IP-Codemaker-Agent',
      description: 'Autonomous programming and code refactoring agent.',
      stack: ['Python', 'NVIDIA NIM', 'AST Parsing']
    }
  ],

  // Layer 7: Career & Roadmap State
  milestones: {
    currentPhase: 'Stage 3: Advanced Engineering & Autonomous Systems',
    readinessScore: 88,
    solvedProblemCount: 12
  }
};

class MemoryBrain {
  constructor() {
    this.memory = this.loadMemory();
  }

  loadMemory() {
    if (typeof localStorage === 'undefined') return DEFAULT_MEMORY;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_MEMORY, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('[Memory Brain] Error reading storage:', e);
    }
    return DEFAULT_MEMORY;
  }

  saveMemory() {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.memory));
    } catch (e) {
      console.warn('[Memory Brain] Error persisting storage:', e);
    }
  }

  // Layer 2: Record an episodic memory
  recordEpisodic(topic, notes) {
    if (!topic) return;
    this.memory.episodic = [
      { timestamp: Date.now(), topic, notes },
      ...this.memory.episodic.slice(0, 19) // Keep last 20 episodes
    ];
    this.saveMemory();
  }

  // Layer 3: Mark topic as mastered or in progress
  updateKnowledge(topic, status = 'mastered') {
    if (!topic) return;
    if (status === 'mastered') {
      if (!this.memory.semantic.mastered.includes(topic)) {
        this.memory.semantic.mastered.push(topic);
      }
      this.memory.semantic.inProgress = this.memory.semantic.inProgress.filter(t => t !== topic);
    } else {
      if (!this.memory.semantic.inProgress.includes(topic)) {
        this.memory.semantic.inProgress.push(topic);
      }
    }
    this.saveMemory();
  }

  // Layer 4: Record a weak spot for proactive guidance
  recordWeakness(topic) {
    if (!topic) return;
    if (!this.memory.weaknesses.reviewTopics.includes(topic)) {
      this.memory.weaknesses.reviewTopics.push(topic);
    }
    this.memory.weaknesses.lastStumbledOn = topic;
    this.saveMemory();
  }

  // Layer 6: Add or update project
  registerProject(name, description, stack = []) {
    const existing = this.memory.projects.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (existing) {
      existing.description = description;
      existing.stack = stack;
    } else {
      this.memory.projects.push({ name, description, stack });
    }
    this.saveMemory();
  }

  // Layer 3 & 4: Autonomous Continuous Self-Learning Engine
  learnFromInteraction(userPrompt = '', aiResponse = '', mode = 'text') {
    if (!userPrompt || typeof userPrompt !== 'string') return;

    const rawPrompt = userPrompt.trim();
    const lowerPrompt = rawPrompt.toLowerCase();
    const lowerResponse = (aiResponse || '').toLowerCase();

    // 1. Technical Topics & Concepts Catalog
    const TOPIC_CATALOG = [
      // Languages
      { label: 'Python', keywords: ['python', 'py', 'numpy', 'pandas', 'cpython'] },
      { label: 'JavaScript / TypeScript', keywords: ['javascript', 'typescript', 'js', 'ts', 'node', 'nodejs'] },
      { label: 'C / C++', keywords: ['c++', 'cpp', 'pointers', 'memory management', 'malloc'] },
      { label: 'Java', keywords: ['java', 'jvm', 'spring boot', 'concurrency', 'multithreading'] },
      { label: 'Rust', keywords: ['rust', 'cargo', 'borrow checker', 'ownership'] },
      { label: 'Go (Golang)', keywords: ['golang', 'goroutines', 'go channels'] },
      { label: 'SQL / Databases', keywords: ['sql', 'mysql', 'postgresql', 'mongodb', 'indexing', 'acid', 'joins'] },

      // DSA & Algorithms
      { label: 'Dynamic Programming', keywords: ['dynamic programming', 'dp', 'memoization', 'tabulation', 'knapsack', 'longest common subsequence'] },
      { label: 'Graph Algorithms', keywords: ['graph', 'graphs', 'dijkstra', 'bfs', 'dfs', 'topological sort', 'union-find', 'kruskal', 'prim'] },
      { label: 'Trees & BST', keywords: ['tree', 'trees', 'binary tree', 'bst', 'avl', 'trie', 'tree traversal', 'inorder', 'preorder'] },
      { label: 'Linked Lists', keywords: ['linked list', 'singly linked', 'doubly linked', 'reverse linked list', 'slow fast pointer'] },
      { label: 'Arrays & Two Pointers', keywords: ['two pointers', 'sliding window', 'prefix sum', 'two sum', 'kadane', 'binary search'] },
      { label: 'Stack & Queue', keywords: ['stack', 'queue', 'monotonic stack', 'priority queue', 'heap', 'min heap', 'max heap'] },
      { label: 'Recursion & Backtracking', keywords: ['recursion', 'backtracking', 'n-queens', 'permutations', 'subsets'] },
      { label: 'Time & Space Complexity', keywords: ['time complexity', 'space complexity', 'big o', 'asymptotic', 'complexity analysis'] },

      // Engineering & Architecture
      { label: 'System Design', keywords: ['system design', 'load balancer', 'caching', 'redis', 'microservices', 'sharding', 'horizontal scaling'] },
      { label: 'Operating Systems', keywords: ['operating system', 'deadlock', 'paging', 'virtual memory', 'threads', 'processes', 'semaphores'] },
      { label: 'Computer Networks', keywords: ['tcp', 'udp', 'dns', 'http', 'https', 'websocket', 'osi model'] },
      { label: 'AI / Machine Learning', keywords: ['machine learning', 'deep learning', 'neural networks', 'transformers', 'llm', 'rag', 'embeddings'] },
      { label: 'Frontend Architecture', keywords: ['react', 'vue', 'nextjs', 'tailwind', 'state management', 'redux', 'rendering'] },
      { label: 'Sanjivani University & Leadership', keywords: ['sanjivani', 'scoe', 'sres', 'nitindada', 'amitdada', 'shankarraoji kolhe'] }
    ];

    // Detect matched topics
    const detectedTopics = [];
    for (const entry of TOPIC_CATALOG) {
      if (entry.keywords.some(kw => lowerPrompt.includes(kw) || lowerResponse.includes(kw))) {
        detectedTopics.push(entry.label);
      }
    }

    // 2. Cognitive State & Sentiment Detection
    const isMastery = /\b(solved|understood|got it|makes sense|it works|passed|samajh gaya|samajh aa gaya|ab clear hai|chal gaya|code run ho gaya|ban gaya|ho gaya solve|solved it|i get it now)\b/i.test(lowerPrompt);
    const isStruggling = /\b(stuck|confused|error|bug|failing|exception|nahi samajh raha|fas gaya|kaam nahi kar raha|doubt|dikkat|run nahi ho raha|failing test|time limit|tle|segmentation fault|segfault)\b/i.test(lowerPrompt);

    let changed = false;

    // A. User Demonstrated Mastery
    if (isMastery && detectedTopics.length > 0) {
      detectedTopics.forEach(topic => {
        if (!this.memory.semantic.mastered.includes(topic)) {
          this.memory.semantic.mastered.push(topic);
          changed = true;
        }
        // Remove from weaknesses & inProgress
        this.memory.semantic.inProgress = this.memory.semantic.inProgress.filter(t => t !== topic);
        this.memory.weaknesses.reviewTopics = this.memory.weaknesses.reviewTopics.filter(t => t !== topic);
      });

      this.memory.milestones.solvedProblemCount = (this.memory.milestones.solvedProblemCount || 0) + 1;
      this.memory.milestones.readinessScore = Math.min(99, (this.memory.milestones.readinessScore || 85) + 1);

      this.recordEpisodic(
        `Concept Mastered: ${detectedTopics.join(', ')}`,
        `User confirmed full comprehension & execution in ${mode.toUpperCase()} AI session.`
      );
      changed = true;
    } 
    // B. User Stumbled / Needs Review
    else if (isStruggling && detectedTopics.length > 0) {
      detectedTopics.forEach(topic => {
        if (!this.memory.weaknesses.reviewTopics.includes(topic)) {
          this.memory.weaknesses.reviewTopics.push(topic);
          changed = true;
        }
        if (!this.memory.semantic.inProgress.includes(topic) && !this.memory.semantic.mastered.includes(topic)) {
          this.memory.semantic.inProgress.push(topic);
          changed = true;
        }
      });
      this.memory.weaknesses.lastStumbledOn = detectedTopics[0];

      this.recordEpisodic(
        `Target Focus Area: ${detectedTopics[0]}`,
        `Identified learning friction in ${mode.toUpperCase()} AI. Queued for proactive coaching.`
      );
      changed = true;
    }
    // C. General Technical Discussion
    else if (detectedTopics.length > 0) {
      detectedTopics.forEach(topic => {
        if (!this.memory.semantic.mastered.includes(topic) && !this.memory.semantic.inProgress.includes(topic)) {
          this.memory.semantic.inProgress.push(topic);
          changed = true;
        }
      });

      // Keep episodic memory fresh if it's a new or substantive topic
      const recentEp = this.memory.episodic[0];
      const primaryTopic = detectedTopics[0];
      if (!recentEp || recentEp.topic !== `Explored: ${primaryTopic}`) {
        this.recordEpisodic(
          `Explored: ${primaryTopic}`,
          `Deep dive session conducted via ${mode.toUpperCase()} AI.`
        );
        changed = true;
      }
    }

    // 3. User Coding Preferences
    if (lowerPrompt.includes('prefer python') || lowerPrompt.includes('in python') || lowerPrompt.includes('python mai')) {
      this.memory.procedural.preferredCodingLanguage = 'python';
      changed = true;
    } else if (lowerPrompt.includes('prefer c++') || lowerPrompt.includes('in cpp') || lowerPrompt.includes('in c++')) {
      this.memory.procedural.preferredCodingLanguage = 'cpp';
      changed = true;
    } else if (lowerPrompt.includes('prefer java') || lowerPrompt.includes('in java')) {
      this.memory.procedural.preferredCodingLanguage = 'java';
      changed = true;
    } else if (lowerPrompt.includes('prefer javascript') || lowerPrompt.includes('in js')) {
      this.memory.procedural.preferredCodingLanguage = 'javascript';
      changed = true;
    }

    if (changed) {
      this.saveMemory();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('doap:memory-updated', { detail: this.memory }));
      }
    }

    return {
      mastered: this.memory.semantic.mastered,
      inProgress: this.memory.semantic.inProgress,
      weaknesses: this.memory.weaknesses.reviewTopics
    };
  }

  // Layer 4 & 7: Transform post-interview weaknesses into auto-generated 3-day recovery curriculum
  injectInterviewWeaknessMilestones(areas = [], companyTrack = '') {
    if (!Array.isArray(areas) || areas.length === 0) return [];

    areas.forEach(topic => {
      this.recordWeakness(topic);
    });

    const trackLabel = companyTrack ? `${companyTrack.toUpperCase()} Track` : 'Silicon Valley Mock';

    const times = ["09:00", "11:30", "15:00"];
    const generatedTasks = areas.slice(0, 3).map((area, idx) => ({
      id: `task_recovery_${Date.now()}_${idx}`,
      title: `Day ${idx + 1}: Deep Drill on ${area}`,
      description: `Targeted practice to eliminate gaps identified during your ${trackLabel} interview. Focus on edge cases and complexity.`,
      time: times[idx] || "10:00",
      duration: "45m",
      category: 'Interview Recovery',
      difficulty: 'Intermediate',
      completed: false,
      date: new Date(Date.now() + idx * 86400000).toISOString().split('T')[0]
    }));

    try {
      if (typeof window !== 'undefined') {
        const storedPlan = localStorage.getItem('doap_study_plan_tasks') || '[]';
        const parsed = JSON.parse(storedPlan);
        const merged = [...generatedTasks, ...parsed];
        localStorage.setItem('doap_study_plan_tasks', JSON.stringify(merged));
      }
    } catch(e){}

    this.recordEpisodic(
      `Mock Interview Recovery (${trackLabel})`,
      `Auto-generated 3-day study plan curriculum targeting: ${areas.join(', ')}.`
    );

    return generatedTasks;
  }

  // Layer 8: Generate Synthesized Context for LLM Prompts
  getSynthesizedWorkingMemory() {
    const mem = this.memory;
    const projectList = mem.projects.map(p => `- ${p.name}: ${p.description}`).join('\n');
    const recentEp = mem.episodic.slice(0, 3).map(e => `- ${e.topic} (${e.notes})`).join('\n');
    const mastered = mem.semantic.mastered.slice(-6).join(', ');
    const inProgress = mem.semantic.inProgress.slice(-4).join(', ');

    return `
[DOAP 8-LAYER UNIFIED MEMORY BRAIN — PRATIK'S KNOWLEDGE GRAPH]
- User: ${mem.identity.userName} (${mem.identity.title})
- Target Goals: ${mem.identity.targetRole} at ${mem.identity.targetCompanies.join(', ')}
- Known Key Projects:
${projectList}
- Active Skills Mastered: ${mastered}
- Current Focus & In-Progress: ${inProgress}
- Need Practice On: ${mem.weaknesses.reviewTopics.join(', ') || 'None'}
- Recent Context / Episodic Memory:
${recentEp}
[END UNIFIED MEMORY BRAIN CONTEXT]
`.trim();
  }

  getMemory() {
    return this.memory;
  }
}

export const memoryBrain = new MemoryBrain();
