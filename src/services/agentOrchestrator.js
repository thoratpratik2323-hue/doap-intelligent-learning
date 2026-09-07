/**
 * DOAP Agent Orchestrator — Feature 4
 * Coordinates specialized sub-agents inspired by Claw Code's AgentTool.
 * Routes queries to the best specialized agent or handles directly.
 */

import { generateSmartTutorResponse } from './aiTutorEngine.js';
import { memoryBrain } from './memoryBrain.js';
import { sessionManager } from './sessionManager.js';

// ==================== AGENT DEFINITIONS ====================

const AGENTS = {
  DSA_AGENT: {
    name: 'DOAP DSA Agent',
    description: 'Expert in Data Structures & Algorithms — problems, patterns, complexity',
    triggers: [
      'array', 'linked list', 'tree', 'graph', 'dynamic programming', 'dp',
      'binary search', 'recursion', 'backtracking', 'sorting', 'heap',
      'stack', 'queue', 'trie', 'hash', 'sliding window', 'two pointer',
      'leetcode', 'dsa', 'algorithm', 'complexity', 'big o',
    ],
    buildPrompt: (message, mem) => {
      const difficulty = getDifficultyFromMemory(mem);
      return `You are the DOAP DSA Expert Agent. The user's current level: ${difficulty}.
Weak areas: ${mem?.weaknesses?.reviewTopics?.join(', ') || 'None identified yet'}.
Solved ${mem?.milestones?.solvedProblemCount || 0} problems so far.

Task: ${message}

Teaching protocol:
1. Identify the DSA pattern first (Two Pointer / Sliding Window / BFS / DP / etc.)
2. Build intuition before code
3. Show a concrete example with small input
4. Provide complete, runnable code
5. Always state Time O(...) and Space O(...) complexity`;
    },
  },

  COMPANY_PREP_AGENT: {
    name: 'DOAP Company Prep Agent',
    description: 'Expert in company-specific interview preparation — Amazon LP, Google, Microsoft',
    triggers: [
      'amazon', 'google', 'microsoft', 'faang', 'interview prep',
      'company interview', 'leadership principle', 'behavioral', 'star method',
      'oa', 'online assessment', 'hiring loop', 'system design interview',
      'mock interview', 'prepare for', 'prep for',
    ],
    buildPrompt: (message, mem) => {
      const targets = mem?.identity?.targetCompanies?.join(', ') || 'FAANG companies';
      return `You are the DOAP Company Interview Preparation Agent.
User's target companies: ${targets}
User's target role: ${mem?.identity?.targetRole || 'Software Engineer'}
Readiness score: ${mem?.milestones?.readinessScore || 85}/100

Task: ${message}

Provide:
1. Company-specific interview structure (number of rounds, format)
2. Most frequently asked topics for this company
3. A specific practice problem or behavioral question
4. Pro tip for this specific company's culture`;
    },
  },

  CODE_REVIEW_AGENT: {
    name: 'DOAP Code Review Agent',
    description: 'Reviews code for bugs, complexity, optimization, and best practices',
    triggers: [
      'review my code', 'check my code', 'mera code dekho', 'code review',
      'optimize this', 'is this correct', 'find bugs', 'refactor',
      'time limit exceeded', 'tle', 'wrong answer', 'wa', 'runtime error',
      'my solution is', 'here is my code',
    ],
    buildPrompt: (message, mem) => {
      const lang = mem?.procedural?.preferredCodingLanguage || 'python';
      return `You are the DOAP Code Review Agent — an expert code auditor and optimizer.
User's preferred language: ${lang}

Analyze the following code submission:
${message}

Provide structured review:
### 1. ✅ Correctness
- Does it handle all edge cases? (empty, single element, negatives, overflow)

### 2. ⏱️ Complexity Analysis  
- Current Time: O(?)
- Current Space: O(?)

### 3. 🐛 Bugs & Issues
- List any bugs, off-by-one errors, unhandled cases

### 4. ⚡ Optimized Solution
- Provide the optimal approach with explanation
- State improved complexity

### 5. 💡 Key Insight
- The one algorithmic insight that makes it faster`;
    },
  },

  STUDY_PLAN_AGENT: {
    name: 'DOAP Study Plan Agent',
    description: 'Creates personalized study plans and learning roadmaps',
    triggers: [
      'study plan', 'roadmap', 'plan banao', 'plan for', 'how to prepare',
      '30 day', '60 day', '90 day', 'week plan', 'schedule',
      'kaise prepare karu', 'where to start', 'beginner', 'learning path',
    ],
    buildPrompt: (message, mem) => {
      const targets = mem?.identity?.targetCompanies?.join(', ') || 'top tech companies';
      const weaknesses = mem?.weaknesses?.reviewTopics?.join(', ') || 'to be identified';
      const mastered = (mem?.semantic?.mastered || []).slice(-5).join(', ') || 'beginner topics';

      return `You are the DOAP Study Plan Agent — a personalized learning curriculum designer.
User profile:
- Target: ${targets}
- Target Role: ${mem?.identity?.targetRole || 'Software Engineer'}
- Already mastered: ${mastered}
- Needs work on: ${weaknesses}
- Readiness: ${mem?.milestones?.readinessScore || 85}/100

Task: ${message}

Create a structured plan with:
1. Weekly breakdown with specific topics
2. Daily time allocation (e.g., "45 min DSA + 30 min reading")
3. Specific LeetCode problem recommendations (easy → medium → hard progression)
4. Milestone checkpoints to measure progress
5. Resources (courses, books, YouTube channels)`;
    },
  },
};

// ==================== HELPERS ====================

function getDifficultyFromMemory(mem) {
  const score = mem?.milestones?.readinessScore || 70;
  const solved = mem?.milestones?.solvedProblemCount || 0;

  if (score >= 90 && solved >= 100) return 'Advanced (ready for senior roles)';
  if (score >= 75 && solved >= 40) return 'Intermediate (medium LeetCode comfortable)';
  return 'Beginner-to-Intermediate (building foundations)';
}

/**
 * Detects which agent is best suited for the message.
 * @param {string} message
 * @returns {{ agentKey: string, agent: object, score: number } | null}
 */
function detectAgent(message) {
  const lower = message.toLowerCase();
  let best = null;
  let bestScore = 0;

  for (const [key, agent] of Object.entries(AGENTS)) {
    let score = 0;
    for (const trigger of agent.triggers) {
      if (lower.includes(trigger.toLowerCase())) {
        score += trigger.split(' ').length; // Multi-word triggers score higher
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = { agentKey: key, agent, score };
    }
  }

  return bestScore >= 2 ? best : null; // Require minimum confidence
}

// ==================== ORCHESTRATOR ====================

/**
 * Routes a message to the best agent or falls back to direct call.
 * @param {string} message
 * @param {string} userName
 * @param {object[]} history
 * @param {object} options
 * @returns {Promise<{ response: string, agentUsed: string | null }>}
 */
export async function orchestrate(message, userName = 'there', history = [], options = {}) {
  const mem = memoryBrain.getMemory();
  const detected = detectAgent(message);

  if (detected) {
    const { agentKey, agent } = detected;
    const agentPrompt = agent.buildPrompt(message, mem);

    // Tag the session with the agent being used
    try {
      sessionManager.tagSession(agent.name, []);
    } catch (e) { /* silent */ }

    // Run the specialized agent prompt through the AI engine
    const response = await generateSmartTutorResponse(
      agentPrompt,
      userName,
      history,
      { ...options, agentMode: true, agentName: agent.name }
    );

    return { response, agentUsed: agent.name };
  }

  // No specific agent matched — use direct AI response
  return { response: null, agentUsed: null };
}

/**
 * Checks if a message should be handled by an agent.
 * Returns the agent name if yes, null if no.
 * @param {string} message
 * @returns {string | null}
 */
export function getMatchingAgentName(message) {
  const detected = detectAgent(message);
  return detected ? detected.agent.name : null;
}

/**
 * Returns all available agents with their descriptions (for /agents command).
 * @returns {object[]}
 */
export function listAgents() {
  return Object.values(AGENTS).map((a) => ({
    name: a.name,
    description: a.description,
  }));
}
