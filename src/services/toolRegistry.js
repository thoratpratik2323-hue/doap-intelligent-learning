/**
 * DOAP Tool Registry — Feature 2
 * Implements Claw Code's tool system for DOAP:
 * execute_code | web_search | web_fetch | memory_read | todo_write | sub_agent
 *
 * Uses:
 * - Piston API (https://emkc.org/api/v2/piston) — free, no key, Python/JS/C++/Java
 * - DuckDuckGo Instant Answer API — free, no key
 */

// ==================== TOOL DEFINITIONS (for Groq function calling) ====================

export const TOOL_SPECS = [
  {
    type: 'function',
    function: {
      name: 'execute_code',
      description: 'Execute code in Python, JavaScript, C++, Java, or Rust and return the actual output. Use this when you need to verify code correctness, demonstrate output, or run an algorithm on a specific input.',
      parameters: {
        type: 'object',
        properties: {
          language: {
            type: 'string',
            enum: ['python', 'javascript', 'cpp', 'java', 'rust'],
            description: 'The programming language of the code',
          },
          code: {
            type: 'string',
            description: 'The complete, runnable code to execute',
          },
          explanation: {
            type: 'string',
            description: 'Brief explanation of what this code demonstrates',
          },
        },
        required: ['language', 'code'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'web_search',
      description: 'Search the web for current information like company interview questions, latest salary data, recent tech news, or any topic requiring up-to-date information.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The search query',
          },
          reason: {
            type: 'string',
            description: 'Why this search is needed for the user',
          },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'memory_read',
      description: "Read the user's learning profile, strengths, weaknesses, mastered topics, and target companies from memory. Use before giving personalized advice.",
      parameters: {
        type: 'object',
        properties: {
          focus: {
            type: 'string',
            enum: ['all', 'weaknesses', 'mastered', 'targets', 'recent'],
            description: 'Which part of memory to focus on',
          },
        },
        required: ['focus'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'todo_write',
      description: "Add a study task or practice item to the user's study plan. Use when user needs follow-up practice or when you identify gaps.",
      parameters: {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'Task title' },
          description: { type: 'string', description: 'What to practice' },
          topic: { type: 'string', description: 'Topic category (DSA, System Design, etc.)' },
          difficulty: {
            type: 'string',
            enum: ['Easy', 'Medium', 'Hard'],
            description: 'Difficulty level',
          },
          daysFromNow: {
            type: 'number',
            description: 'When to schedule this (0 = today, 1 = tomorrow)',
          },
        },
        required: ['title', 'description'],
      },
    },
  },
];

// ==================== TOOL EXECUTORS ====================

/**
 * Execute code via Piston API (free, no key, supports 12+ languages)
 */
async function executeCode({ language, code, explanation }) {
  const langMap = {
    python: { language: 'python', version: '3.10.0' },
    javascript: { language: 'javascript', version: '18.15.0' },
    cpp: { language: 'c++', version: '10.2.0' },
    java: { language: 'java', version: '15.0.2' },
    rust: { language: 'rust', version: '1.50.0' },
  };

  const langConfig = langMap[language] || langMap.python;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const res = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        language: langConfig.language,
        version: langConfig.version,
        files: [{ content: code }],
        stdin: '',
        args: [],
        run_timeout: 10000,
        compile_timeout: 10000,
      }),
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return { success: false, output: `Code execution failed: HTTP ${res.status}` };
    }

    const data = await res.json();
    const stdout = data?.run?.stdout || '';
    const stderr = data?.run?.stderr || '';
    const exitCode = data?.run?.code ?? 0;

    if (exitCode !== 0 && stderr) {
      return {
        success: false,
        output: `Runtime Error:\n${stderr}`,
        stdout,
      };
    }

    return {
      success: true,
      output: stdout || '(no output)',
      stderr: stderr || null,
      language,
      explanation: explanation || '',
    };
  } catch (err) {
    return {
      success: false,
      output: `Code execution unavailable: ${err.message || err}`,
    };
  }
}

/**
 * Web search via DuckDuckGo Instant Answer API
 */
async function webSearch({ query, reason }) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) return { success: false, result: 'Search unavailable' };

    const data = await res.json();

    const abstract = data?.AbstractText || '';
    const relatedTopics = (data?.RelatedTopics || [])
      .slice(0, 4)
      .map((t) => t?.Text || '')
      .filter(Boolean);

    if (!abstract && relatedTopics.length === 0) {
      return {
        success: true,
        result: `No instant answer found for "${query}". Proceeding with training knowledge.`,
        query,
      };
    }

    return {
      success: true,
      query,
      abstract,
      relatedTopics,
      reason: reason || '',
    };
  } catch (err) {
    return { success: false, result: `Search failed: ${err.message || err}` };
  }
}

/**
 * Read from memoryBrain (imported lazily to avoid circular deps)
 */
async function memoryRead({ focus }) {
  try {
    const { memoryBrain } = await import('./memoryBrain.js');
    const mem = memoryBrain.getMemory();

    switch (focus) {
      case 'weaknesses':
        return {
          success: true,
          data: {
            reviewTopics: mem.weaknesses?.reviewTopics || [],
            lastStumbledOn: mem.weaknesses?.lastStumbledOn || 'None',
          },
        };
      case 'mastered':
        return {
          success: true,
          data: { mastered: mem.semantic?.mastered || [] },
        };
      case 'targets':
        return {
          success: true,
          data: {
            targetRole: mem.identity?.targetRole || 'Software Engineer',
            targetCompanies: mem.identity?.targetCompanies || [],
          },
        };
      case 'recent':
        return {
          success: true,
          data: { recentEpisodes: (mem.episodic || []).slice(0, 5) },
        };
      default:
        return {
          success: true,
          data: {
            userName: mem.identity?.userName,
            targetRole: mem.identity?.targetRole,
            targetCompanies: mem.identity?.targetCompanies,
            mastered: (mem.semantic?.mastered || []).slice(-6),
            inProgress: (mem.semantic?.inProgress || []).slice(-4),
            weaknesses: mem.weaknesses?.reviewTopics || [],
            readinessScore: mem.milestones?.readinessScore,
          },
        };
    }
  } catch (err) {
    return { success: false, data: {}, error: err.message };
  }
}

/**
 * Write a task to the study plan (localStorage)
 */
async function todoWrite({ title, description, topic, difficulty, daysFromNow }) {
  try {
    const date = new Date();
    date.setDate(date.getDate() + (daysFromNow || 0));

    const task = {
      id: `agent_task_${Date.now()}`,
      title,
      description,
      category: topic || 'General',
      difficulty: difficulty || 'Medium',
      date: date.toISOString().split('T')[0],
      time: '10:00',
      duration: '45m',
      completed: false,
      createdBy: 'DOAP AI Agent',
    };

    if (typeof localStorage !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('doap_study_plan_tasks') || '[]');
      localStorage.setItem('doap_study_plan_tasks', JSON.stringify([task, ...existing]));
    }

    return { success: true, task, message: `Added "${title}" to your study plan!` };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

// ==================== MAIN DISPATCHER ====================

/**
 * Executes a tool call based on its name and arguments.
 * @param {string} toolName
 * @param {object} toolArgs
 * @returns {Promise<object>}
 */
export async function executeTool(toolName, toolArgs) {
  switch (toolName) {
    case 'execute_code':
      return executeCode(toolArgs);
    case 'web_search':
      return webSearch(toolArgs);
    case 'memory_read':
      return memoryRead(toolArgs);
    case 'todo_write':
      return todoWrite(toolArgs);
    default:
      return { success: false, output: `Unknown tool: ${toolName}` };
  }
}

/**
 * Formats a tool result into a readable string for the AI's next turn.
 * @param {string} toolName
 * @param {object} result
 * @returns {string}
 */
export function formatToolResult(toolName, result) {
  if (toolName === 'execute_code') {
    if (result.success) {
      return `Code executed successfully:\n\`\`\`\n${result.output}\n\`\`\`${result.stderr ? `\nStderr: ${result.stderr}` : ''}`;
    }
    return `Code execution failed:\n${result.output}`;
  }

  if (toolName === 'web_search') {
    if (result.success) {
      let text = `Search results for "${result.query}":\n`;
      if (result.abstract) text += `Summary: ${result.abstract}\n`;
      if (result.relatedTopics?.length) {
        text += `Related: ${result.relatedTopics.join(' | ')}`;
      }
      return text;
    }
    return result.result || 'Search failed';
  }

  if (toolName === 'memory_read') {
    return `User memory: ${JSON.stringify(result.data, null, 2)}`;
  }

  if (toolName === 'todo_write') {
    return result.message || 'Task added to study plan.';
  }

  return JSON.stringify(result, null, 2);
}
