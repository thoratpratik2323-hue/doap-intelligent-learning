/**
 * DOAP Skills Registry — Feature 3
 * Detects which skill to load based on the user's message,
 * and injects the matching skill's system prompt addition.
 * Inspired by Claw Code's SKILL.md discovery system.
 */

import { DSA_ARRAYS_SKILL } from '../skills/dsa-arrays.js';
import { DSA_GRAPHS_SKILL } from '../skills/dsa-graphs.js';
import { DSA_DP_SKILL } from '../skills/dsa-dp.js';
import { SYSTEM_DESIGN_SKILL } from '../skills/system-design.js';
import { COMPANY_AMAZON_SKILL } from '../skills/company-amazon.js';
import { COMPANY_GOOGLE_SKILL } from '../skills/company-google.js';
import { COMPANY_MICROSOFT_SKILL } from '../skills/company-microsoft.js';
import { AI_ML_SKILL } from '../skills/ai-ml.js';

const ALL_SKILLS = [
  DSA_ARRAYS_SKILL,
  DSA_GRAPHS_SKILL,
  DSA_DP_SKILL,
  SYSTEM_DESIGN_SKILL,
  COMPANY_AMAZON_SKILL,
  COMPANY_GOOGLE_SKILL,
  COMPANY_MICROSOFT_SKILL,
  AI_ML_SKILL,
];

/**
 * Detects the best matching skill for a given user message.
 * Returns an array of matching skills (can be multiple).
 * @param {string} message - The raw user message
 * @returns {{ skill: object, score: number }[]}
 */
export function detectSkills(message) {
  if (!message || typeof message !== 'string') return [];

  const lower = message.toLowerCase();
  const matches = [];

  for (const skill of ALL_SKILLS) {
    let score = 0;
    for (const keyword of skill.keywords) {
      if (lower.includes(keyword.toLowerCase())) {
        // Longer / more specific keywords get higher weight
        score += keyword.split(' ').length;
      }
    }
    if (score > 0) {
      matches.push({ skill, score });
    }
  }

  // Sort by score descending, return top 2
  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);
}

/**
 * Returns the combined systemPromptAddition for all matched skills.
 * Inject this into the AI system prompt before the main call.
 * @param {string} message
 * @returns {string}
 */
export function getSkillPromptInjection(message) {
  const matched = detectSkills(message);
  if (matched.length === 0) return '';

  const additions = matched
    .map(({ skill }) => skill.systemPromptAddition.trim())
    .join('\n\n');

  const skillNames = matched.map(({ skill }) => skill.name).join(' + ');

  return `\n\n${additions}\n[Active Teaching Skills: ${skillNames}]\n`;
}

/**
 * Returns which skill names are active for a message (for UI display).
 * @param {string} message
 * @returns {string[]}
 */
export function getActiveSkillNames(message) {
  return detectSkills(message).map(({ skill }) => skill.name);
}

/**
 * Returns the common mistake warnings for active skills.
 * Used by hooksEngine to add post-response warnings.
 * @param {string} message
 * @returns {string[]}
 */
export function getCommonMistakes(message) {
  const matched = detectSkills(message);
  return matched.flatMap(({ skill }) => skill.commonMistakes || []);
}
