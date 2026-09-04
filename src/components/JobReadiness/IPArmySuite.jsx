import React, { useState } from 'react';
import { Sparkles, Send, FileText, Linkedin, Copy, Check, Bot, Zap, ArrowUpRight, Download, Search } from 'lucide-react';
import { runLinkedInAgent, runRezAI } from '../../services/ipArmyAgents';
import { ATSResumePreview } from './ATSResumePreview';

export const IPArmySuite = ({ userName = 'Pratik', isDarkMode, accentHex }) => {
  const [activeTab, setActiveTab] = useState('rezai'); // default to Resume Builder
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
    </div>
  );
};
