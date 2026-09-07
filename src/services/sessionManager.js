/**
 * DOAP Session Manager — Feature 7
 * Persistent conversation sessions inspired by Claw Code's session persistence.
 * Sessions auto-save every message and can be resumed by the user.
 */

const SESSIONS_KEY = 'doap_sessions_v2';
const MAX_SESSIONS = 15;
const MAX_MESSAGES_PER_SESSION = 80;

/**
 * Creates a new session object.
 * @param {string} firstMessage - First user message (used to auto-generate title)
 * @returns {object}
 */
function createSession(firstMessage = '') {
  const id = `session_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const title = generateSessionTitle(firstMessage);

  return {
    id,
    title,
    startedAt: Date.now(),
    lastActiveAt: Date.now(),
    topic: detectTopic(firstMessage),
    messages: [],
    messageCount: 0,
    agentUsed: null,
    skillsActive: [],
  };
}

/**
 * Auto-generates a readable session title from the first message.
 */
function generateSessionTitle(message) {
  if (!message) return 'New Session';

  const clean = message.replace(/[^\w\s]/g, '').trim();
  const words = clean.split(/\s+/).slice(0, 5).join(' ');
  return words.length > 2 ? words : 'Chat Session';
}

/**
 * Detects the primary topic from a message (for session metadata).
 */
function detectTopic(message) {
  const lower = (message || '').toLowerCase();

  if (/\b(dynamic programming|dp|knapsack|memoization)\b/.test(lower)) return 'Dynamic Programming';
  if (/\b(graph|bfs|dfs|dijkstra|topological)\b/.test(lower)) return 'Graphs';
  if (/\b(tree|binary tree|bst|traversal|trie)\b/.test(lower)) return 'Trees';
  if (/\b(array|sliding window|two pointer|binary search)\b/.test(lower)) return 'Arrays';
  if (/\b(system design|load balancer|cache|microservice)\b/.test(lower)) return 'System Design';
  if (/\b(amazon|google|microsoft|faang|interview)\b/.test(lower)) return 'Company Prep';
  if (/\b(machine learning|neural network|llm|transformer)\b/.test(lower)) return 'AI/ML';
  if (/\b(react|javascript|typescript|css|html|frontend)\b/.test(lower)) return 'Web Dev';

  return 'General';
}

// ==================== SESSION MANAGER CLASS ====================

class SessionManager {
  constructor() {
    this._currentSessionId = null;
    this._sessions = this._load();
  }

  _load() {
    try {
      if (typeof localStorage === 'undefined') return [];
      const raw = localStorage.getItem(SESSIONS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  _save() {
    try {
      if (typeof localStorage === 'undefined') return;
      // Keep only last MAX_SESSIONS
      const trimmed = this._sessions.slice(0, MAX_SESSIONS);
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(trimmed));
    } catch {
      // silent
    }
  }

  /**
   * Start a new session (call when user sends first message in a new chat).
   * @param {string} firstMessage
   * @returns {string} session ID
   */
  startSession(firstMessage = '') {
    const session = createSession(firstMessage);
    this._currentSessionId = session.id;
    this._sessions = [session, ...this._sessions].slice(0, MAX_SESSIONS);
    this._save();
    return session.id;
  }

  /**
   * Get the current session object.
   */
  getCurrentSession() {
    if (!this._currentSessionId) return null;
    return this._sessions.find((s) => s.id === this._currentSessionId) || null;
  }

  /**
   * Append a message to the current session.
   * Auto-creates a session if none is active.
   * @param {{ sender: 'user'|'ai', text: string, timestamp?: number }} message
   */
  appendMessage(message) {
    if (!this._currentSessionId) {
      this.startSession(message.sender === 'user' ? message.text : '');
    }

    const idx = this._sessions.findIndex((s) => s.id === this._currentSessionId);
    if (idx === -1) return;

    const session = this._sessions[idx];
    const msg = {
      sender: message.sender,
      text: message.text,
      timestamp: message.timestamp || Date.now(),
    };

    // Keep messages bounded
    session.messages = [
      ...session.messages.slice(-(MAX_MESSAGES_PER_SESSION - 1)),
      msg,
    ];
    session.messageCount += 1;
    session.lastActiveAt = Date.now();

    // Update topic from first user message if not set
    if (session.topic === 'General' && message.sender === 'user') {
      session.topic = detectTopic(message.text);
    }

    this._sessions[idx] = session;
    this._save();
  }

  /**
   * Tag the current session with which agent and skills were active.
   * @param {string} agentName
   * @param {string[]} skillNames
   */
  tagSession(agentName, skillNames = []) {
    const idx = this._sessions.findIndex((s) => s.id === this._currentSessionId);
    if (idx === -1) return;

    if (agentName) this._sessions[idx].agentUsed = agentName;
    if (skillNames.length > 0) {
      this._sessions[idx].skillsActive = [
        ...new Set([...this._sessions[idx].skillsActive, ...skillNames]),
      ];
    }
    this._save();
  }

  /**
   * Resume a previous session by ID.
   * Returns the session's messages for injection back into the chat.
   * @param {string} sessionId
   * @returns {{ session: object, messages: object[] } | null}
   */
  resumeSession(sessionId) {
    const session = this._sessions.find((s) => s.id === sessionId);
    if (!session) return null;

    this._currentSessionId = sessionId;

    // Bring session to top
    this._sessions = [
      session,
      ...this._sessions.filter((s) => s.id !== sessionId),
    ];
    this._save();

    return {
      session,
      messages: session.messages.slice(-20), // Last 20 messages for context
    };
  }

  /**
   * Get a list of all sessions for the resume UI.
   * @returns {object[]}
   */
  listSessions() {
    return this._sessions.map((s) => ({
      id: s.id,
      title: s.title,
      topic: s.topic,
      messageCount: s.messageCount,
      lastActiveAt: s.lastActiveAt,
      startedAt: s.startedAt,
      agentUsed: s.agentUsed,
      skillsActive: s.skillsActive,
      preview: s.messages.slice(-1)[0]?.text?.slice(0, 80) || '',
    }));
  }

  /**
   * Generates a /resume summary string for the AI to display.
   * @returns {string}
   */
  generateResumeSummary() {
    const sessions = this.listSessions().slice(0, 5);
    if (sessions.length === 0) {
      return '📂 **No previous sessions found.** Start a new chat!';
    }

    const lines = sessions.map((s, i) => {
      const date = new Date(s.lastActiveAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
      return `**${i + 1}. ${s.title}** \`${s.topic}\`\n   📅 ${date} · ${s.messageCount} messages${s.agentUsed ? ` · 🤖 ${s.agentUsed}` : ''}\n   _"${s.preview || 'No preview'}_"`;
    });

    return `### 📂 Recent Sessions\n\n${lines.join('\n\n')}\n\n*Type \`/resume [number]\` to continue a session, or just keep chatting to start a new one!*`;
  }

  /**
   * Clears all sessions.
   */
  clearAll() {
    this._sessions = [];
    this._currentSessionId = null;
    this._save();
  }

  /**
   * Gets the current session's recent messages as Groq-compatible history.
   * @param {number} limit
   * @returns {{ role: string, content: string }[]}
   */
  getSessionHistory(limit = 10) {
    const session = this.getCurrentSession();
    if (!session) return [];

    return session.messages
      .slice(-limit)
      .map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text || '',
      }))
      .filter((m) => m.content);
  }
}

export const sessionManager = new SessionManager();
