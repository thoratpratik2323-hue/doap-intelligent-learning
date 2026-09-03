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
