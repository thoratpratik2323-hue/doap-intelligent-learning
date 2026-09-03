/**
 * IP Army Autonomous Agents Engine (Inspired by IP-Verse-Mafia)
 * Houses:
 * 1. IP LinkedIn Agent (Autonomous Outreach, Connection Notes & Post Generator)
 * 2. IP Rez-AI (Deep Resume ATS Auditor & Impact Enhancer)
 * 3. IP Codemaker Agent (Autonomous In-Editor Co-Pilot & Complexity Optimizer)
 */

import { generateSmartTutorResponse } from './aiTutorEngine';

// ============================================================================
// 1. IP LinkedIn Autonomous Agent
// ============================================================================
export async function runLinkedInAgent({ action = 'cold_outreach', role = 'Software Engineer', company = 'Google', topic = '', recipient = 'Hiring Manager' }, userName = 'Pratik') {
  let prompt = '';

  if (action === 'connection_note') {
    prompt = `Act as IP LinkedIn Agent. Generate 3 punchy, high-converting LinkedIn Connection Request Notes (maximum 280 characters each) for ${userName} reaching out to a ${role} at ${company}. Keep it natural, curious, non-needy, and high value. Format as markdown.`;
  } else if (action === 'cold_outreach') {
    prompt = `Act as IP LinkedIn Agent. Write a world-class, personalized Cold Outreach Direct Message from ${userName} to ${recipient} (${role} at ${company}). 
Requirements:
1. Irresistible Hook (1 sentence).
2. Proof of Competence (Highlighting full-stack & AI systems building experience like DOAP and IP Prime OS).
3. Clear, low-friction Call to Action (15-min coffee chat / quick technical advice).
4. Zero buzzword fluff. Format with Subject line and Body.`;
  } else if (action === 'viral_post') {
    prompt = `Act as IP LinkedIn Agent. Write an engaging, highly insightful LinkedIn technical post about "${topic || 'Building Autonomous AI Agents and Real-Time Systems'}".
Format:
- Strong controversial or curious opening hook.
- 3 key lessons learned with engineering bullet points.
- Question to spark comments in the dev community.
- 4 relevant hashtags. Author: ${userName}.`;
  } else {
    prompt = `Act as IP LinkedIn Agent. Write a polite, high-retention follow-up message for ${userName} sent 4 days after reaching out to ${company} for ${role}.`;
  }

  return await generateSmartTutorResponse(prompt, userName, [], { forceEnglish: true });
}

// ============================================================================
// 2. IP Rez-AI (Resume ATS Auditor)
// ============================================================================
export async function runRezAI({ resumeText = '', targetRole = 'AI Systems Engineer', jobDescription = '' }, userName = 'Pratik') {
  const prompt = `Act as IP Rez-AI, an elite Silicon Valley Technical Recruiter and ATS Auditor.
Analyze the following resume details for ${userName} applying for the role of "${targetRole}":

${jobDescription ? `Target Job Description / Requirements:\n${jobDescription}\n\n` : ''}
Candidate Resume Snippet:
${resumeText || `Pratik Thorat — AI Systems & Full-Stack Architect. Built DOAP (interactive learning platform with Voice AI and 120B models) and IP Prime OS (desktop shell with 12 autonomous agents). Core skills: Python, React, JavaScript, Groq LPU, WebSockets, PyTorch, C++.`}

Provide a structured, ruthless, and actionable audit:
### 📊 1. ATS Scorecard
- **Estimated ATS Score:** [e.g. 88/100]
- **Keyword Match Rate:** [e.g. 91%]
- **Hard Skills Detected:** [List 5-8 top technologies]
- **Missing High-Value Keywords:** [List 3-5 critical missing terms for ${targetRole}]

### ⚡ 2. Bullet Point Upgrades (The Google X-Y-Z Formula)
Pick 2 key achievements and transform them from passive to high-impact:
- **Before:** [Passive sentence]
- **After:** [Accomplished X, measured by Y, by doing Z]

### 🎯 3. Top 3 Action Items to Guarantee Interview Call
Give 3 sharp, immediate improvements.`;

  return await generateSmartTutorResponse(prompt, userName, [], { forceEnglish: true });
}

// ============================================================================
// 3. IP Codemaker Agent (ip_agent_001 Co-Pilot)
// ============================================================================
export async function runCodemakerAgent({ code, language = 'python', problemTitle = '', mode = 'optimize' }, userName = 'Pratik') {
  let prompt = '';

  if (mode === 'optimize') {
    prompt = `Act as IP Codemaker Agent (ip_agent_001 from IP-Verse-Mafia).
Analyze this ${language} solution for "${problemTitle}":

\`\`\`${language}
${code}
\`\`\`

1. What is the current Time and Space Complexity ($O(...)$)?
2. Can this be optimized to an asymptotically optimal complexity?
3. Provide the fully refactored, production-grade optimized code.
4. Explain the key algorithmic insight that makes it faster.`;
  } else if (mode === 'find_bugs') {
    prompt = `Act as IP Codemaker Agent. Ruthlessly stress-test this ${language} code for "${problemTitle}":

\`\`\`${language}
${code}
\`\`\`

Identify:
1. Edge cases where it fails (e.g. empty inputs, negative numbers, large constraints, recursion limits).
2. Any memory or off-by-one errors.
3. Minimal patch to make it 100% test-case proof.`;
  } else {
    prompt = `Act as IP Codemaker Agent. Generate a comprehensive suite of 5 rigorous unit test cases for this ${language} code:

\`\`\`${language}
${code}
\`\`\`

Include normal, boundary, and extreme edge test cases with expected outputs.`;
  }

  return await generateSmartTutorResponse(prompt, userName, [], { forceEnglish: true });
}
