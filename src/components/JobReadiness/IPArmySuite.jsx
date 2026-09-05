import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  FileText, 
  Linkedin, 
  Copy, 
  Check, 
  Bot, 
  Zap, 
  ArrowUpRight, 
  Download, 
  Search,
  Target,
  CheckCircle2,
  AlertCircle,
  Plus,
  Wand2
} from 'lucide-react';
import { runLinkedInAgent, runRezAI } from '../../services/ipArmyAgents';
import { memoryBrain } from '../../services/memoryBrain';
import { generateSmartTutorResponse } from '../../services/aiTutorEngine';
import { ATSResumePreview } from './ATSResumePreview';

const PRESET_JDS = [
  {
    id: 'google_swe',
    company: 'Google',
    role: 'Software Engineer III (Cloud & Distributed Systems)',
    keywords: ['Python', 'C++', 'Distributed Systems', 'gRPC', 'Concurrency', 'System Design', 'Linux', 'Kubernetes', 'CI/CD'],
    description: "Design, build, and deploy high-throughput microservices handling millions of queries per second. Deep focus on distributed state, sub-millisecond RPC pipelines, and fault-tolerant architecture."
  },
  {
    id: 'amazon_sde',
    company: 'Amazon',
    role: 'SDE II (Full-Stack & AWS Services)',
    keywords: ['Java', 'TypeScript', 'React', 'AWS Lambda', 'DynamoDB', 'Microservices', 'REST APIs', 'System Design', 'CI/CD Pipelines'],
    description: "Lead customer-facing cloud architectures across AWS serverless stacks. Design scalable React frontends and high-availability Java/TypeScript event-driven backends."
  },
  {
    id: 'tcs_digital',
    company: 'TCS',
    role: 'Digital / Prime Cadre (Full-Stack Engineer)',
    keywords: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'Agile', 'DSA', 'REST APIs', 'Docker'],
    description: "Develop enterprise-grade cloud native web apps, integrate microservices, write clean unit tests, and maintain CI/CD pipelines across cross-functional engineering pods."
  },
  {
    id: 'ai_systems',
    company: 'Silicon Valley AI Labs',
    role: 'Generative AI & Autonomous Agent Engineer',
    keywords: ['Python', 'LLMs', 'RAG', 'Prompt Engineering', 'WebSockets', 'Vector DBs', 'Groq / NVIDIA', 'FastAPI', 'Agentic Workflows'],
    description: "Architect cutting-edge real-time agentic systems, sub-second multimodal voice engines, context window retrieval pipelines, and autonomous multi-agent orchestration."
  }
];

export const IPArmySuite = ({ userName = 'Pratik', isDarkMode, accentHex }) => {
  const [activeTab, setActiveTab] = useState('rezai'); // 'rezai' | 'linkedin' | 'jd_matcher'
  const [resumeSubTab, setResumeSubTab] = useState('pdf'); // 'pdf' | 'audit'

  // LinkedIn Agent State
  const [liRole, setLiRole] = useState('Senior Software Engineer');
  const [liCompany, setLiCompany] = useState('Google');
  const [liAction, setLiAction] = useState('cold_outreach');
  const [liTopic, setLiTopic] = useState('Building Real-Time AI Systems with WebSockets & Groq');
  const [liResult, setLiResult] = useState('');
  const [isLiLoading, setIsLiLoading] = useState(false);
  const [liCopied, setLiCopied] = useState(false);

  // Rez-AI State
  const [resumeSnippet, setResumeSnippet] = useState(
    "Built DOAP (Interactive AI learning platform with real-time Voice AI and 120B models) and IP Prime OS (desktop OS shell with 12 autonomous agents). Created full-stack web architectures with React, Node.js, Python, and Groq LPU."
  );
  const [targetJobRole, setTargetJobRole] = useState('AI Systems Engineer');
  const [rezResult, setRezResult] = useState('');
  const [isRezLoading, setIsRezLoading] = useState(false);
  const [rezCopied, setRezCopied] = useState(false);

  // JD Matcher State
  const [selectedJdId, setSelectedJdId] = useState('google_swe');
  const [customJdText, setCustomJdText] = useState('');
  const [tailoredBullets, setTailoredBullets] = useState('');
  const [isTailoring, setIsTailoring] = useState(false);
  const [tailoredCopied, setTailoredCopied] = useState(false);

  const selectedJd = PRESET_JDS.find(j => j.id === selectedJdId) || {
    id: 'custom',
    company: 'Target Company',
    role: 'Target Engineering Role',
    keywords: ['React', 'Python', 'System Design', 'Algorithms', 'APIs', 'Git', 'SQL', 'Docker', 'Testing'],
    description: customJdText || "Custom target job description."
  };

  // Extract candidate profile knowledge for matching
  const candidateKnowledge = [
    resumeSnippet.toLowerCase(),
    ...(memoryBrain.getMemory().semantic?.mastered || []).map(s => s.toLowerCase()),
    ...(memoryBrain.getMemory().semantic?.inProgress || []).map(s => s.toLowerCase()),
  ].join(' ');

  const matchedKeywords = selectedJd.keywords.filter(kw => 
    candidateKnowledge.includes(kw.toLowerCase())
  );
  const missingKeywords = selectedJd.keywords.filter(kw => 
    !candidateKnowledge.includes(kw.toLowerCase())
  );
  const matchScore = Math.max(30, Math.round((matchedKeywords.length / (selectedJd.keywords.length || 1)) * 100));

  const handleTailorResume = async () => {
    setIsTailoring(true);
    setTailoredBullets('');
    try {
      const prompt = `I am targeting the role "${selectedJd.role}" at ${selectedJd.company}.
The required job description keywords are: ${selectedJd.keywords.join(', ')}.
My candidate profile is currently missing or weak on these keywords: ${missingKeywords.join(', ')}.

Here is my current project/experience summary:
"${resumeSnippet}"

Generate 3 Google XYZ-style resume bullet points ("Accomplished [X] as measured by [Y], by doing [Z]") that seamlessly weave in the missing keywords (${missingKeywords.slice(0, 4).join(', ')}) with high technical rigor. Keep them impactful, professional, and ready to paste into my resume.`;

      const response = await generateSmartTutorResponse(prompt, userName, [], { voiceMode: false });
      setTailoredBullets(response);
      memoryBrain.recordEpisodic(
        `Resume Tailored for ${selectedJd.company}`,
        `Optimized ATS match score (${matchScore}%) for ${selectedJd.role}. Added coverage for ${missingKeywords.slice(0, 3).join(', ')}.`
      );
    } catch(e) {
      setTailoredBullets("Error generating tailored bullet points. Please check your network connection.");
    } finally {
      setIsTailoring(false);
    }
  };

  const handleAddKeywordToBrain = (kw) => {
    memoryBrain.updateKnowledge(kw, 'inProgress');
  };

  const handleRunLinkedIn = async () => {
    setIsLiLoading(true);
    setLiResult('');
    try {
      const res = await runLinkedInAgent({
        action: liAction,
        role: liRole,
        company: liCompany,
        topic: liTopic
      }, userName);
      setLiResult(res);
    } catch (e) {
      setLiResult('Error running IP LinkedIn Agent. Please try again.');
    } finally {
      setIsLiLoading(false);
    }
  };

  const handleRunRezAI = async () => {
    setIsRezLoading(true);
    setRezResult('');
    try {
      const res = await runRezAI({
        resumeText: resumeSnippet,
        targetRole: targetJobRole
      }, userName);
      setRezResult(res);
    } catch (e) {
      setRezResult('Error running IP Rez-AI. Please try again.');
    } finally {
      setIsRezLoading(false);
    }
  };

  const copyToClipboard = (text, setCopied) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`p-6 rounded-3xl border space-y-6 transition-all shadow-xl ${
      isDarkMode ? 'bg-[#0f1117] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
    }`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              IP ARMY NETWORK
            </span>
            <span className="text-[11px] font-mono text-neutral-400">Connected to IP-Verse-Mafia</span>
          </div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Bot size={22} className="text-cyan-400" />
            <span>Autonomous Career Agents</span>
          </h3>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 border border-neutral-800">
          <button
            onClick={() => setActiveTab('linkedin')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'linkedin' 
                ? 'bg-cyan-500 text-black shadow-md' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Linkedin size={14} />
            <span>LinkedIn Agent</span>
          </button>
          <button
            onClick={() => setActiveTab('rezai')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'rezai' 
                ? 'bg-cyan-500 text-black shadow-md' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <FileText size={14} />
            <span>Resume Builder</span>
          </button>
          <button
            onClick={() => setActiveTab('jd_matcher')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'jd_matcher' 
                ? 'bg-cyan-500 text-black shadow-md' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Target size={14} />
            <span>JD ATS Matcher</span>
          </button>
        </div>
      </div>

      {/* Tab 1: IP LinkedIn Agent */}
      {activeTab === 'linkedin' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-mono text-neutral-400 block mb-1">Target Company</label>
              <input
                type="text"
                value={liCompany}
                onChange={(e) => setLiCompany(e.target.value)}
                placeholder="Google, Microsoft, OpenAI"
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-black/40 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-neutral-400 block mb-1">Target Role</label>
              <input
                type="text"
                value={liRole}
                onChange={(e) => setLiRole(e.target.value)}
                placeholder="Senior AI Engineer"
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-black/40 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-neutral-400 block mb-1">Agent Action</label>
              <select
                value={liAction}
                onChange={(e) => setLiAction(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-black/40 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="cold_outreach">Cold Outreach Direct Message</option>
                <option value="connection_note">280-char Connection Note</option>
                <option value="viral_post">High-Impact Technical Post</option>
                <option value="follow_up">Tactful Follow-Up Message</option>
              </select>
            </div>
          </div>

          {liAction === 'viral_post' && (
            <div>
              <label className="text-[11px] font-mono text-neutral-400 block mb-1">Post Topic / Engineering Insight</label>
              <input
                type="text"
                value={liTopic}
                onChange={(e) => setLiTopic(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-black/40 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          )}

          <button
            onClick={handleRunLinkedIn}
            disabled={isLiLoading}
            className="w-full py-3 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-black flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
          >
            <Sparkles size={14} className={isLiLoading ? "animate-spin" : ""} />
            <span>{isLiLoading ? "LinkedIn Agent is Drafting..." : "Generate Outreach with LinkedIn Agent"}</span>
          </button>

          {liResult && (
            <div className="p-4 rounded-2xl bg-black/60 border border-neutral-800 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 font-bold">LinkedIn Agent Outreach Copy:</span>
                <button
                  onClick={() => copyToClipboard(liResult, setLiCopied)}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 cursor-pointer"
                >
                  {liCopied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{liCopied ? "Copied!" : "Copy Text"}</span>
                </button>
              </div>
              <div className="text-xs leading-relaxed text-neutral-200 whitespace-pre-wrap font-sans">
                {liResult}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Resume Builder */}
      {activeTab === 'rezai' && (
        <div className="space-y-4 animate-fade-in">
          {/* Sub-mode Switcher */}
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setResumeSubTab('pdf')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                  resumeSubTab === 'pdf'
                    ? 'bg-emerald-500 text-black border-emerald-400 font-bold shadow-md'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <Download size={13} />
                <span>1-Click ATS PDF Generator</span>
              </button>
              <button
                type="button"
                onClick={() => setResumeSubTab('audit')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                  resumeSubTab === 'audit'
                    ? 'bg-cyan-500 text-black border-cyan-400 font-bold shadow-md'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <Search size={13} />
                <span>AI Score & Bullet Audit</span>
              </button>
            </div>
          </div>

          {resumeSubTab === 'pdf' ? (
            <ATSResumePreview userName={userName} isDarkMode={isDarkMode} accentHex={accentHex} />
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="text-[11px] font-mono text-neutral-400 block mb-1">Target Engineering Role</label>
                <input
                  type="text"
                  value={targetJobRole}
                  onChange={(e) => setTargetJobRole(e.target.value)}
                  placeholder="e.g. Senior Full-Stack & AI Systems Architect"
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-black/40 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 block mb-1">Resume Highlights / Experience Snippet</label>
                <textarea
                  rows={4}
                  value={resumeSnippet}
                  onChange={(e) => setResumeSnippet(e.target.value)}
                  className="w-full p-3.5 rounded-xl text-xs bg-black/40 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400 font-mono leading-relaxed"
                />
              </div>

              <button
                onClick={handleRunRezAI}
                disabled={isRezLoading}
                className="w-full py-3 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-black flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
              >
                <Sparkles size={14} className={isRezLoading ? "animate-spin" : ""} />
                <span>{isRezLoading ? "Resume Builder is Analyzing..." : "Build & Optimize Resume with AI"}</span>
              </button>

              {rezResult && (
                <div className="p-4 rounded-2xl bg-black/60 border border-neutral-800 space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400 font-bold">Resume Builder Audit & Upgrades:</span>
                    <button
                      onClick={() => copyToClipboard(rezResult, setRezCopied)}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 cursor-pointer"
                    >
                      {rezCopied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{rezCopied ? "Copied!" : "Copy Report"}</span>
                    </button>
                  </div>
                  <div className="text-xs leading-relaxed text-neutral-200 whitespace-pre-wrap font-sans">
                    {rezResult}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: JD ATS Matcher & Tailor */}
      {activeTab === 'jd_matcher' && (
        <div className="space-y-6 animate-fade-in">
          {/* Preset JD Chips */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono text-neutral-400 block">
              Select Target Company & Job Profile (or enter custom JD)
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_JDS.map((jd) => (
                <button
                  key={jd.id}
                  onClick={() => setSelectedJdId(jd.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border flex items-center gap-2 ${
                    selectedJdId === jd.id
                      ? 'bg-cyan-500 text-black border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-black/40 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <span className="font-bold">{jd.company}</span>
                  <span className="opacity-80 truncate max-w-[180px]">({jd.role.split('(')[0]})</span>
                </button>
              ))}
              <button
                onClick={() => setSelectedJdId('custom')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border flex items-center gap-2 ${
                  selectedJdId === 'custom'
                    ? 'bg-cyan-500 text-black border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-black/40 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <span>+ Custom JD</span>
              </button>
            </div>
          </div>

          {selectedJdId === 'custom' && (
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-neutral-400 block">Paste Job Description Text</label>
              <textarea
                rows={4}
                value={customJdText}
                onChange={(e) => setCustomJdText(e.target.value)}
                placeholder="Paste requirements, responsibilities, and qualifications from the target job posting..."
                className="w-full p-3.5 rounded-xl text-xs bg-black/40 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400 font-mono leading-relaxed"
              />
            </div>
          )}

          {/* JD Match Overview Score Card */}
          <div className="p-5 rounded-2xl bg-black/60 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-left w-full md:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{selectedJd.company}</span>
                <span className="text-neutral-500">•</span>
                <span className="text-xs font-mono text-cyan-400 font-semibold">{selectedJd.role}</span>
              </div>
              <p className="text-xs text-neutral-400 max-w-xl leading-relaxed">
                {selectedJd.description}
              </p>
            </div>

            {/* Score Ring / Badge */}
            <div className="flex items-center gap-4 shrink-0 bg-neutral-900/80 p-3.5 rounded-2xl border border-neutral-800">
              <div className="text-center">
                <div className={`text-3xl font-black font-mono ${
                  matchScore >= 80 ? 'text-emerald-400' : matchScore >= 60 ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  {matchScore}%
                </div>
                <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wide">
                  ATS Match Score
                </div>
              </div>

              <div className="h-10 w-[1px] bg-neutral-800" />

              <div className="space-y-1 text-xs">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5 text-[11px]">
                  <CheckCircle2 size={13} /> {matchedKeywords.length} Keywords Met
                </div>
                <div className="text-rose-400 font-bold flex items-center gap-1.5 text-[11px]">
                  <AlertCircle size={13} /> {missingKeywords.length} Gaps to Address
                </div>
              </div>
            </div>
          </div>

          {/* Keywords Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Matched Keywords */}
            <div className="p-4 rounded-2xl bg-emerald-950/10 border border-emerald-500/20 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} /> Matched In Your Profile ({matchedKeywords.length})
                </span>
                <span className="text-[10px] font-mono opacity-80">Present in Resume/Brain</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {matchedKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-1"
                  >
                    <Check size={11} /> {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Critical Keywords */}
            <div className="p-4 rounded-2xl bg-rose-950/10 border border-rose-500/20 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-rose-400">
                <span className="flex items-center gap-1.5">
                  <AlertCircle size={15} /> Missing ATS Keywords ({missingKeywords.length})
                </span>
                <span className="text-[10px] font-mono opacity-80">Click + to track in Brain</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {missingKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-2.5 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-1.5 group"
                  >
                    <span>{kw}</span>
                    <button
                      type="button"
                      onClick={() => handleAddKeywordToBrain(kw)}
                      className="text-rose-400 hover:text-white cursor-pointer"
                      title="Add to In-Progress Learning in Brain Vault"
                    >
                      <Plus size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 1-Click Resume Tailoring Action */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleTailorResume}
              disabled={isTailoring}
              className="w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 hover:opacity-95 text-black flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
            >
              <Wand2 size={15} className={isTailoring ? "animate-spin" : ""} />
              <span>
                {isTailoring
                  ? "DOAP AI is Crafting Google XYZ Bullets..."
                  : `1-Click Tailor Resume for ${selectedJd.company} (+${missingKeywords.length} Keywords)`}
              </span>
            </button>

            {tailoredBullets && (
              <div className="p-4 rounded-2xl bg-black/60 border border-cyan-500/30 space-y-3 animate-fade-in shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                    <Sparkles size={13} /> Tailored Google XYZ Bullets for {selectedJd.company}:
                  </span>
                  <button
                    onClick={() => copyToClipboard(tailoredBullets, setTailoredCopied)}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    {tailoredCopied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{tailoredCopied ? "Copied!" : "Copy Bullets"}</span>
                  </button>
                </div>
                <div className="text-xs leading-relaxed text-neutral-200 whitespace-pre-wrap font-sans bg-neutral-950/60 p-3 rounded-xl border border-neutral-800">
                  {tailoredBullets}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
