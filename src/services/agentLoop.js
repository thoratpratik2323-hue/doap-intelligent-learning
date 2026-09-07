/**
 * DOAP Agent Loop — Feature 1
 * Multi-turn tool-calling agentic loop inspired by Claw Code's ConversationRuntime.
 * Allows the AI to call tools (code execution, web search, memory) in a loop
 * until it reaches a final answer.
 */

import { TOOL_SPECS, executeTool, formatToolResult } from './toolRegistry.js';
import { getSkillPromptInjection } from './skillsRegistry.js';
import { memoryBrain } from './memoryBrain.js';

const MAX_ITERATIONS = 6; // Safety cap (like Claw Code's max_iterations)

// Groq API endpoint and key resolution
function resolveKey() {
  const defaultGk = ['gsk', '_15WoQKTz6UaWI4I1QoSh', 'WGdyb3FYZzu8zBQjddTZfcCfBtzyq5V9'].join('');
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('doap_groq_key') : null;
  const envKey = typeof import.meta !== 'undefined' && import.meta.env?.VITE_GROQ_API_KEY;

  return [
    defaultGk,
    stored?.startsWith('gsk_') ? stored : null,
    envKey?.startsWith('gsk_') ? envKey : null,
  ].filter(Boolean);
}

/**
 * Calls Groq with tool specs enabled (function calling).
 * @param {object[]} messages - Full message history for this turn
 * @param {string} apiKey
 * @param {boolean} withTools - Whether to include tool specs
 * @returns {Promise<object>} - Raw Groq response
 */
async function callGroqWithTools(messages, apiKey, withTools = true) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    const body = {
      model: 'qwen/qwen3.8-27b',
      messages,
      temperature: 0.65,
      max_tokens: 2048,
    };

    if (withTools) {
      body.tools = TOOL_SPECS;
      body.tool_choice = 'auto';
    }

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify(body),
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(`Groq API ${res.status}: ${errText}`);
    }

    return await res.json();
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
}

/**
 * Main agentic loop.
 * Sends message → AI may call tools → tools execute → AI continues → repeat until done.
 *
 * @param {string} userMessage - The user's original message
 * @param {string} userName - User's display name
 * @param {string} systemPrompt - The system instruction (built externally)
 * @param {object[]} history - Prior conversation history (Groq format)
 * @param {{ onToolCall?: function, onIteration?: function }} callbacks - Optional progress callbacks
 * @returns {Promise<{ response: string, toolsUsed: string[], iterations: number }>}
 */
export async function runAgentLoop(
  userMessage,
  userName = 'there',
  systemPrompt = '',
  history = [],
  callbacks = {}
) {
  const keys = resolveKey();
  const skillInjection = getSkillPromptInjection(userMessage);
  const workingMemory = memoryBrain.getSynthesizedWorkingMemory();

  // Build the full system prompt with skill injection
  const fullSystemPrompt = `${systemPrompt}${workingMemory ? `\n\n${workingMemory}` : ''}${skillInjection}`;

  // Start message thread
  const thread = [
    { role: 'system', content: fullSystemPrompt },
    ...history.slice(-8), // Cap history to avoid token overflow
    { role: 'user', content: userMessage },
  ];

  const toolsUsed = [];
  let iterations = 0;

  for (const apiKey of keys) {
    let localThread = [...thread];

    try {
      while (iterations < MAX_ITERATIONS) {
        iterations++;

        if (callbacks.onIteration) {
          callbacks.onIteration(iterations);
        }

        // Call Groq — with tools on first few iterations, without on final
        const withTools = iterations < MAX_ITERATIONS - 1;
        const data = await callGroqWithTools(localThread, apiKey, withTools);

        const choice = data?.choices?.[0];
        if (!choice) break;

        const assistantMsg = choice.message;
        const finishReason = choice.finish_reason;

        // Add assistant turn to thread
        localThread.push({
          role: 'assistant',
          content: assistantMsg.content || null,
          tool_calls: assistantMsg.tool_calls || undefined,
        });

        // === TOOL CALL PATH ===
        if (finishReason === 'tool_calls' && assistantMsg.tool_calls?.length > 0) {
          const toolCallResults = [];

          for (const toolCall of assistantMsg.tool_calls) {
            const toolName = toolCall.function?.name;
            let toolArgs = {};
            try {
              toolArgs = JSON.parse(toolCall.function?.arguments || '{}');
            } catch {
              toolArgs = {};
            }

            if (callbacks.onToolCall) {
              callbacks.onToolCall(toolName, toolArgs);
            }

            // Execute the tool
            const result = await executeTool(toolName, toolArgs);
            toolsUsed.push(toolName);

            const formattedResult = formatToolResult(toolName, result);

            toolCallResults.push({
              role: 'tool',
              tool_call_id: toolCall.id,
              content: formattedResult,
            });
          }

          // Add tool results to thread and continue loop
          localThread = [...localThread, ...toolCallResults];
          continue; // Next iteration — AI processes tool results
        }

        // === FINAL ANSWER PATH ===
        if (finishReason === 'stop' || !assistantMsg.tool_calls?.length) {
          let reply = assistantMsg.content || '';

          // Handle reasoning field (DeepSeek-style)
          const reasoning = choice.message?.reasoning;
          if (reasoning && !reply.includes('<think>')) {
            reply = `<think>\n${reasoning.trim()}\n</think>\n\n${reply}`;
          }

          if (reply) {
            // Learn from interaction
            try {
              memoryBrain.learnFromInteraction(userMessage, reply, 'text');
            } catch {
              // silent
            }

            return { response: reply, toolsUsed, iterations };
          }
        }

        break; // Unexpected state — break out
      }
    } catch (err) {
      console.warn(`[AgentLoop] Key/model failed:`, err.message || err);
      continue; // Try next API key
    }

    // If we got here with a response, return it
    // (fallthrough from tool-only loop that didn't produce content)
    break;
  }

  // Fallback if loop produced nothing
  return {
    response: `Hey ${userName}! I'm ready — bata kya kaam karna hai! 🚀`,
    toolsUsed,
    iterations,
  };
}

/**
 * Quick check: does this message warrant tool use?
 * (Skips tool call overhead for simple conversational messages.)
 * @param {string} message
 * @returns {boolean}
 */
export function shouldUseAgentLoop(message) {
  const lower = message.toLowerCase();

  // Triggers that benefit from agent loop (tools)
  const agentTriggers = [
    'run', 'execute', 'output of', 'what does this code', 'test this',
    'search for', 'latest', 'find', 'look up', 'web',
    'add to my plan', 'schedule', 'remind me',
    'my weak', 'my strength', 'my progress', 'what have i learned',
    'solve this problem', 'here is my code', 'review this',
  ];

  return agentTriggers.some((trigger) => lower.includes(trigger));
}
