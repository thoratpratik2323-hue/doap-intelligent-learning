/**
 * DOAP Hooks Engine — Feature 6
 * Educational guardrails inspired by Claw Code's PreToolUse / PostToolUse hooks.
 *
 * PreQuery Hooks: run BEFORE the AI responds — can modify or gate the query
 * PostResponse Hooks: run AFTER the AI responds — can enrich or log the response
 */

import { memoryBrain } from './memoryBrain.js';
import { getCommonMistakes } from './skillsRegistry.js';

// ==================== PRE-QUERY HOOKS ====================

/**
 * Hook: Attempt Check
 * If user is asking for a direct solution to a DSA problem without having
 * tried anything first, nudge them to attempt before revealing the solution.
 */
function attemptCheckHook(message, memory) {
  const lowerMsg = message.toLowerCase();

  const isAskingForSolution = (
    /\b(give me (the |a |full )?solution|write (the |a |full )?code|solve (this|it)|just (give|show) (me )?the code|bata de solution|code de do|answer (do|dedo|bata))\b/i.test(message) &&
    /\b(array|graph|tree|dp|dynamic programming|linked list|stack|queue|binary search|string|recursion|backtrack)\b/i.test(lowerMsg)
  );

  const hasAttempted = /\b(i tried|maine try kiya|mera approach|my approach|my solution|i thought|maine socha|here is my code|mera code)\b/i.test(lowerMsg);

  if (isAskingForSolution && !hasAttempted) {
    const weakness = memory?.weaknesses?.reviewTopics?.[0];
    const hint = weakness ? ` (especially since you're reviewing ${weakness})` : '';

    return {
      gate: true,
      response: `🧠 **Attempt First, Then I'll Guide You!**

Before I show the solution, try writing an approach — even just pseudocode or 2 lines. This is how real FAANG interviews work${hint}.

Tell me:
1. What's your initial idea? (brute force is fine!)
2. What's blocking you?

I'm here to guide, not just give answers. Ek try karo — phir hum milke optimize karte hain! 💪`,
    };
  }

  return { gate: false };
}

/**
 * Hook: Language Detection
 * Ensures the AI preference is correctly set in options.
 */
function languageDetectionHook(message) {
  const isHindi = /[\u0900-\u097F]|(\b(bhai|yaar|kaise|kya|karo|batao|karna|mujhe|aap|chal|bol|de do|bata|daldo)\b)/i.test(message);
  return { hindiDetected: isHindi };
}

/**
 * Hook: Difficulty Calibration
 * Detects if user is asking about something too easy or too advanced
 * and adjusts the tone accordingly.
 */
function difficultyCalibrationHook(message, memory) {
  const mastered = memory?.semantic?.mastered || [];
  const lowerMsg = message.toLowerCase();

  // Check if asking about something already mastered
  const askingAboutMastered = mastered.some(
    (topic) => lowerMsg.includes(topic.toLowerCase())
  );

  if (askingAboutMastered) {
    return {
      note: 'User has mastered this topic. Push to harder variant or application.',
      advancedMode: true,
    };
  }

  return { advancedMode: false };
}

// ==================== POST-RESPONSE HOOKS ====================

/**
 * Hook: Complexity Auto-Check
 * If the response contains code but no complexity analysis, append a reminder.
 */
function complexityAutoCheckHook(response) {
  const hasCode = /```(python|cpp|java|javascript|c\+\+|js)/i.test(response);
  const hasComplexity = /\b(O\(|time complexity|space complexity|big.?o)\b/i.test(response);

  if (hasCode && !hasComplexity) {
    return {
      append: '\n\n> 💡 **Quick Note:** Always state the Time & Space Complexity in interviews! What do you think the complexity is for this solution?',
    };
  }
  return { append: null };
}

/**
 * Hook: Weakness Detection
 * If user expressed struggle, update memoryBrain weaknesses automatically.
 */
function weaknessDetectionHook(userMessage) {
  const isStruggling = /\b(stuck|confused|error|bug|nahi samajh|fas gaya|kaam nahi|doubt|dikkat|failing|exception)\b/i.test(userMessage);

  if (isStruggling) {
    // Try to detect topic from message
    const topics = [
      ['Dynamic Programming', ['dp', 'dynamic programming', 'memoization']],
      ['Graphs', ['graph', 'bfs', 'dfs', 'dijkstra']],
      ['Trees', ['tree', 'bst', 'binary tree', 'traversal']],
      ['Arrays', ['array', 'sliding window', 'two pointer']],
      ['System Design', ['system design', 'scalable', 'load balancer']],
    ];

    const lower = userMessage.toLowerCase();
    for (const [topicName, keywords] of topics) {
      if (keywords.some((kw) => lower.includes(kw))) {
        try {
          memoryBrain.recordWeakness(topicName);
        } catch (e) {
          // silent
        }
        return { weaknessDetected: topicName };
      }
    }
  }
  return { weaknessDetected: null };
}

/**
 * Hook: Progress Tracking
 * If user confirmed mastery or solved something, boost readiness score.
 */
function progressTrackingHook(userMessage) {
  const hasMastered = /\b(solved|got it|makes sense|understood|samajh gaya|chal gaya|passed|it works)\b/i.test(userMessage);

  if (hasMastered) {
    try {
      const mem = memoryBrain.getMemory();
      const newScore = Math.min(99, (mem.milestones?.readinessScore || 85) + 1);
      memoryBrain.memory.milestones.readinessScore = newScore;
      memoryBrain.memory.milestones.solvedProblemCount =
        (mem.milestones?.solvedProblemCount || 0) + 1;
      memoryBrain.saveMemory();
    } catch (e) {
      // silent
    }
    return { progressIncremented: true };
  }
  return { progressIncremented: false };
}

/**
 * Hook: Common Mistakes Reminder
 * After a code explanation, add topic-specific common mistakes.
 */
function commonMistakesHook(message, response) {
  const mistakes = getCommonMistakes(message);
  if (mistakes.length === 0) return { append: null };

  const hasCode = /```/i.test(response);
  if (!hasCode) return { append: null };

  const mistakeList = mistakes
    .slice(0, 2)
    .map((m) => `- ⚠️ ${m}`)
    .join('\n');

  return {
    append: `\n\n**Common Mistakes to Avoid:**\n${mistakeList}`,
  };
}

// ==================== MAIN HOOK RUNNERS ====================

/**
 * Run all pre-query hooks.
 * @param {string} message - User's raw message
 * @param {object} memory - Current memoryBrain memory
 * @returns {{ gate: boolean, response?: string, metadata: object }}
 */
export function runPreHooks(message, memory = {}) {
  const metadata = {};

  // 1. Language detection
  const { hindiDetected } = languageDetectionHook(message);
  metadata.hindiDetected = hindiDetected;

  // 2. Difficulty calibration
  const { advancedMode, note } = difficultyCalibrationHook(message, memory);
  metadata.advancedMode = advancedMode;
  if (note) metadata.difficultyNote = note;

  // 3. Attempt check (can gate)
  const attemptResult = attemptCheckHook(message, memory);
  if (attemptResult.gate) {
    return { gate: true, response: attemptResult.response, metadata };
  }

  return { gate: false, metadata };
}

/**
 * Run all post-response hooks.
 * @param {string} originalMessage - User's original message
 * @param {string} aiResponse - The AI's response
 * @returns {{ finalResponse: string, metadata: object }}
 */
export function runPostHooks(originalMessage, aiResponse) {
  let response = aiResponse;
  const metadata = {};

  // 1. Complexity check — append reminder if code has no complexity
  const { append: complexityAppend } = complexityAutoCheckHook(response);
  if (complexityAppend) {
    response += complexityAppend;
    metadata.complexityReminderAdded = true;
  }

  // 2. Common mistakes reminder
  const { append: mistakesAppend } = commonMistakesHook(originalMessage, response);
  if (mistakesAppend) {
    response += mistakesAppend;
    metadata.commonMistakesAdded = true;
  }

  // 3. Weakness detection — side effect (updates memoryBrain)
  const { weaknessDetected } = weaknessDetectionHook(originalMessage);
  if (weaknessDetected) metadata.weaknessDetected = weaknessDetected;

  // 4. Progress tracking — side effect (updates readiness score)
  const { progressIncremented } = progressTrackingHook(originalMessage);
  if (progressIncremented) metadata.progressIncremented = true;

  return { finalResponse: response, metadata };
}
