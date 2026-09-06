/**
 * IP Army Autonomous Agents Engine (Inspired by IP-Verse-Mafia)
 * Houses:
 * 1. IP LinkedIn Agent (Autonomous Outreach, Connection Notes & Post Generator)
 * 2. IP Rez-AI (Deep Resume ATS Auditor & Impact Enhancer)
 * 3. DOAP Code Checker AI (Autonomous In-Editor Co-Pilot & Complexity Optimizer)
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
// 3. DOAP Code Checker AI (Autonomous In-Editor Co-Pilot & Test Engine)
// ============================================================================
export async function runCodemakerAgent({ code, language = 'python', problemTitle = '', mode = 'optimize' }, userName = 'Engineer') {
  let prompt = '';

  if (mode === 'optimize') {
    prompt = `Act as DOAP Code Checker AI, an enterprise-grade automated code quality and performance auditor.
Analyze this ${language} solution for "${problemTitle}":

\`\`\`${language}
${code}
\`\`\`

LANGUAGE & TONE REQUIREMENT:
- You must respond strictly and 100% in formal, professional, engineering-grade English.
- Under NO circumstance should you use Hindi, Hinglish, slang, or casual greetings.
- Keep the response authoritative, structured, and polished.

1. **Complexity Analysis:** Evaluate current Time Complexity $O(...)$ and Space Complexity $O(...)$.
2. **Optimization Potential:** Identify bottlenecks or suboptimal operations.
3. **Refactored Code:** Provide the production-grade, asymptotically optimal code.
4. **Algorithmic Insight:** Explain the key technical insight that makes it faster.`;
  } else if (mode === 'find_bugs') {
    prompt = `Act as DOAP Code Checker AI, an enterprise-grade automated code quality and vulnerability auditor.
Thoroughly stress-test and audit this ${language} code for "${problemTitle}":

\`\`\`${language}
${code}
\`\`\`

LANGUAGE & TONE REQUIREMENT:
- You must respond strictly and 100% in formal, professional, engineering-grade English.
- Under NO circumstance should you use Hindi, Hinglish, slang, or casual greetings.
- Keep the response authoritative, structured, and polished.

Identify:
1. **Edge-Case Vulnerabilities:** Scenarios where it fails (e.g. empty/null inputs, boundary conditions, recursion limits).
2. **Logical & Memory Bugs:** Off-by-one errors or unhandled cases.
3. **Recommended Fix:** Minimal patch to make it 100% test-case proof.`;
  } else {
    prompt = `Act as DOAP Code Checker AI, an enterprise-grade automated test synthesis and verification engine.
Generate a comprehensive suite of 5 rigorous unit test cases for this ${language} code for "${problemTitle}":

\`\`\`${language}
${code}
\`\`\`

LANGUAGE & TONE REQUIREMENT:
- You must respond strictly and 100% in formal, professional, engineering-grade English.
- Under NO circumstance should you use Hindi, Hinglish, slang, or casual greetings.
- Keep the response authoritative, structured, and polished.

Provide:
1. **Implementation Status:** Brief overview of whether the function is fully implemented or empty/stub.
2. **5 Rigorous Test Cases:** Include normal cases, boundary conditions, and extreme edge cases with inputs and expected outputs.
3. **Verification Analysis:** Explain what each test case verifies to guarantee algorithmic correctness.`;
  }

  const rawRes = await generateSmartTutorResponse(prompt, userName, [], { forceEnglish: true, stripThink: true });
  let clean = (rawRes || '')
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/^<think>[\s\S]*$/gi, '')
    .trim();
  return clean || rawRes;
}
