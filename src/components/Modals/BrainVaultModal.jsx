import React, { useState, useEffect } from 'react';
import { 
  X, 
  Brain, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Sparkles, 
  Compass, 
  Code2, 
  Trash2, 
  Plus, 
  Download, 
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Flame,
  Target
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { memoryBrain } from '../../services/memoryBrain';

export const BrainVaultModal = () => {
  const { isBrainVaultOpen, setIsBrainVaultOpen, navigateTo } = useTheme();
  const [memory, setMemory] = useState(() => memoryBrain.getMemory());
  const [activeTab, setActiveTab] = useState('knowledge'); // 'knowledge' | 'episodic' | 'identity' | 'llm_context'
  const [newSkillInput, setNewSkillInput] = useState('');
  const [newSkillType, setNewSkillType] = useState('inProgress'); // 'mastered' | 'inProgress' | 'weakness'
  const [copiedContext, setCopiedContext] = useState(false);

  // Sync with real-time memory brain updates
  useEffect(() => {
    const handleUpdate = () => {
      setMemory({ ...memoryBrain.getMemory() });
    };

    window.addEventListener('doap:memory-updated', handleUpdate);
    return () => window.removeEventListener('doap:memory-updated', handleUpdate);
  }, []);

  if (!isBrainVaultOpen) return null;

  const handlePracticeTopic = (topic) => {
    setIsBrainVaultOpen(false);
    // Pre-seed an episodic intent and navigate to AI Tutor
    memoryBrain.recordEpisodic(
      `Focused Practice Drill: ${topic}`,
      `User initiated targeted 1-on-1 tutoring drill for ${topic} from Brain Vault.`
    );
    navigateTo('/ai-tutor');
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    const topic = newSkillInput.trim();
    if (newSkillType === 'mastered') {
      memoryBrain.updateKnowledge(topic, 'mastered');
    } else if (newSkillType === 'inProgress') {
      memoryBrain.updateKnowledge(topic, 'inProgress');
    } else {
      memoryBrain.recordWeakness(topic);
    }
    setNewSkillInput('');
    setMemory({ ...memoryBrain.getMemory() });
  };

  const handleRemoveWeakness = (topic) => {
    memoryBrain.removeWeakness(topic);
    setMemory({ ...memoryBrain.getMemory() });
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(memory, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `doap_brain_vault_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetBrain = () => {
    if (window.confirm("Are you sure you want to reset the Brain Vault to factory defaults? All autonomous learning logs will be reset.")) {
      memoryBrain.resetBrain();
      setMemory({ ...memoryBrain.getMemory() });
    }
  };

  const handleCopyContext = () => {
    const text = memoryBrain.getSynthesizedWorkingMemory();
    navigator.clipboard?.writeText(text);
    setCopiedContext(true);
    setTimeout(() => setCopiedContext(false), 2000);
  };

  const formatTimestamp = (ts) => {
    if (!ts) return 'Just now';
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-xl animate-fade-in select-none">
      <div
        className="rounded-3xl max-w-5xl w-full shadow-2xl border flex flex-col overflow-hidden"
        style={{
          backgroundColor: 'var(--doap-bg, #0a0a0c)',
          borderColor: 'var(--doap-border, #262626)',
          color: 'var(--doap-text-prim, #f4f4f5)',
          maxHeight: '92vh',
        }}
      >
        {/* Header Bar */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b shrink-0 bg-neutral-900/40"
          style={{ borderColor: 'var(--doap-border)' }}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Brain size={22} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base tracking-tight text-white flex items-center gap-2">
                  DOAP Brain Vault
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    8-Layer Neural Active
                  </span>
                </h3>
              </div>
              <p className="text-xs font-mono" style={{ color: 'var(--doap-text-sec, #a1a1aa)' }}>
                Persistent Cognitive Knowledge Graph & Autonomous Memory
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsBrainVaultOpen(false)}
            className="p-2 rounded-xl transition-colors cursor-pointer hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Top Quick Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 border-b bg-neutral-950/40 text-xs font-mono" style={{ borderColor: 'var(--doap-border)' }}>
          <div className="p-3 rounded-2xl border bg-neutral-900/30" style={{ borderColor: 'var(--doap-border)' }}>
            <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 mb-1">
              <Target size={13} className="text-cyan-400" /> Career Readiness
            </div>
            <div className="text-lg font-bold text-cyan-400">{memory.milestones?.readinessScore || 85}%</div>
            <div className="text-[10px] text-neutral-500 truncate">{memory.identity?.targetRole}</div>
          </div>

          <div className="p-3 rounded-2xl border bg-neutral-900/30" style={{ borderColor: 'var(--doap-border)' }}>
            <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 mb-1">
              <CheckCircle2 size={13} className="text-emerald-400" /> Mastered Skills
            </div>
            <div className="text-lg font-bold text-emerald-400">{memory.semantic?.mastered?.length || 0}</div>
            <div className="text-[10px] text-neutral-500">Autonomous verified</div>
          </div>

          <div className="p-3 rounded-2xl border bg-neutral-900/30" style={{ borderColor: 'var(--doap-border)' }}>
            <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 mb-1">
              <AlertCircle size={13} className="text-rose-400" /> Review Friction
            </div>
            <div className="text-lg font-bold text-rose-400">{memory.weaknesses?.reviewTopics?.length || 0}</div>
            <div className="text-[10px] text-neutral-500">Targeted drills queued</div>
          </div>

          <div className="p-3 rounded-2xl border bg-neutral-900/30" style={{ borderColor: 'var(--doap-border)' }}>
            <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 mb-1">
              <Flame size={13} className="text-amber-400" /> Problems Solved
            </div>
            <div className="text-lg font-bold text-amber-400">{memory.milestones?.solvedProblemCount || 12}</div>
            <div className="text-[10px] text-neutral-500">Across sessions</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b text-xs font-semibold overflow-x-auto" style={{ borderColor: 'var(--doap-border)' }}>
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`pb-2.5 px-2 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'knowledge'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Brain size={15} /> Knowledge Graph (L3 & L4)
          </button>
          <button
            onClick={() => setActiveTab('episodic')}
            className={`pb-2.5 px-2 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'episodic'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Clock size={15} /> Episodic Logs (L2)
          </button>
          <button
            onClick={() => setActiveTab('identity')}
            className={`pb-2.5 px-2 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'identity'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Cpu size={15} /> Identity & Projects (L1, L5, L6)
          </button>
          <button
            onClick={() => setActiveTab('llm_context')}
            className={`pb-2.5 px-2 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'llm_context'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Code2 size={15} /> LLM Context Engine (L8)
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-none">
          {activeTab === 'knowledge' && (
            <div className="space-y-6">
              {/* Friction & Weaknesses Card */}
              <div className="rounded-2xl border p-5 bg-rose-950/10 border-rose-500/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                    <AlertCircle size={16} />
                    <span>Active Friction Areas & Weaknesses (Layer 4)</span>
                  </div>
                  <span className="text-[11px] font-mono text-rose-400/80">
                    Self-detected from failed runs / interview doubts
                  </span>
                </div>

                {(!memory.weaknesses?.reviewTopics || memory.weaknesses.reviewTopics.length === 0) ? (
                  <div className="text-xs text-neutral-400 italic py-2">
                    No active weaknesses recorded. Great job! Keep solving complex problems to challenge the brain.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {memory.weaknesses.reviewTopics.map((topic) => (
                      <div
                        key={topic}
                        className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/60 border border-rose-500/30 text-xs"
                      >
                        <span className="font-semibold text-rose-200">{topic}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handlePracticeTopic(topic)}
                            className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-medium text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                            title="Launch immediate Socratic AI session for this topic"
                          >
                            <Sparkles size={12} /> Practice with AI
                          </button>
                          <button
                            onClick={() => handleRemoveWeakness(topic)}
                            className="p-1 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                            title="Mark as resolved"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mastered Skills Card */}
              <div className="rounded-2xl border p-5 bg-emerald-950/10 border-emerald-500/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                    <CheckCircle2 size={16} />
                    <span>Mastered Technical Capabilities (Layer 3)</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400/80">
                    Auto-promoted upon verified comprehension
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {memory.semantic?.mastered?.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium text-xs flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                    >
                      <CheckCircle2 size={12} className="text-emerald-400" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* In Progress Skills Card */}
              <div className="rounded-2xl border p-5 bg-cyan-950/10 border-cyan-500/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                    <Compass size={16} />
                    <span>In-Progress & Current Focus (Layer 3)</span>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400/80">
                    Active learning curriculum
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {memory.semantic?.inProgress?.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-medium text-xs flex items-center gap-1.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping mr-0.5" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Add Custom Node / Skill to Brain */}
              <form onSubmit={handleAddSkill} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  placeholder="Inject new topic (e.g. Red-Black Trees, Kubernetes, WebSockets)..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs focus:outline-none focus:border-cyan-500 text-white"
                />
                <div className="flex items-center gap-2">
                  <select
                    value={newSkillType}
                    onChange={(e) => setNewSkillType(e.target.value)}
                    className="px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs focus:outline-none text-neutral-200"
                  >
                    <option value="inProgress">In Progress</option>
                    <option value="mastered">Mastered</option>
                    <option value="weakness">Review Weakness</option>
                  </select>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
                  >
                    <Plus size={14} /> Inject Node
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'episodic' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800 font-mono">
                <span>Timeline of Cognitive Events & AI Interactions</span>
                <span>Last {memory.episodic?.length || 0} episodes</span>
              </div>

              {(!memory.episodic || memory.episodic.length === 0) ? (
                <div className="text-xs text-neutral-400 italic py-4">No episodic memories recorded yet.</div>
              ) : (
                <div className="space-y-3">
                  {memory.episodic.map((ep, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="font-semibold text-neutral-200 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          {ep.topic}
                        </div>
                        <p className="text-neutral-400 leading-relaxed text-[11px]">{ep.notes}</p>
                      </div>
                      <div className="font-mono text-[10px] text-neutral-500 shrink-0 flex items-center gap-1">
                        <Clock size={11} />
                        {formatTimestamp(ep.timestamp)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'identity' && (
            <div className="space-y-6">
              {/* Persona & Target */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-2 text-xs">
                  <div className="text-[11px] font-mono text-cyan-400 uppercase font-bold">Layer 1: Identity & Target</div>
                  <div><span className="text-neutral-400">Name:</span> <strong className="text-white">{memory.identity?.userName}</strong></div>
                  <div><span className="text-neutral-400">Target Role:</span> <strong className="text-white">{memory.identity?.targetRole}</strong></div>
                  <div>
                    <span className="text-neutral-400">Target Companies:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {memory.identity?.targetCompanies?.map((c) => (
                        <span key={c} className="px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-300 text-[10px] font-mono">{c}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-2 text-xs">
                  <div className="text-[11px] font-mono text-cyan-400 uppercase font-bold">Layer 5: Procedural Style</div>
                  <div><span className="text-neutral-400">Preferred Coding Language:</span> <strong className="text-white uppercase font-mono">{memory.procedural?.preferredCodingLanguage || 'Python'}</strong></div>
                  <div><span className="text-neutral-400">Speech Language:</span> <span className="text-white font-mono">{memory.procedural?.speechLanguage || 'en-IN'}</span></div>
                  <div><span className="text-neutral-400">Tone:</span> <span className="text-white">{memory.procedural?.communicationStyle}</span></div>
                </div>
              </div>

              {/* Registered Projects */}
              <div className="space-y-3">
                <div className="text-[11px] font-mono text-cyan-400 uppercase font-bold">Layer 6: Registered Ecosystem Projects</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {memory.projects?.map((proj) => (
                    <div key={proj.name} className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-1.5 text-xs">
                      <div className="font-bold text-white flex items-center justify-between">
                        {proj.name}
                      </div>
                      <p className="text-[11px] text-neutral-400 line-clamp-2">{proj.description}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {proj.stack?.map((s) => (
                          <span key={s} className="px-1.5 py-0.5 rounded bg-neutral-800 text-[9px] font-mono text-neutral-400">{s}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'llm_context' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-400 pb-1">
                <span>Active LLM Prompt Injection Payload (Layer 8)</span>
                <button
                  onClick={handleCopyContext}
                  className="px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-mono text-[11px] cursor-pointer transition-colors"
                >
                  {copiedContext ? 'Copied!' : 'Copy Context'}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-black border border-neutral-800 font-mono text-[11px] text-cyan-300 leading-relaxed overflow-x-auto whitespace-pre-wrap select-text">
                {memoryBrain.getSynthesizedWorkingMemory()}
              </div>

              <p className="text-[11px] text-neutral-500 italic">
                This exact prompt payload is autonomously synthesized and injected into every Gemini 2.5 Flash, Groq Kimi K2, and Voice AI call to ensure 100% personalized mentorship without amnesia.
              </p>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div
          className="flex items-center justify-between px-6 py-4 border-t shrink-0 bg-neutral-900/40 text-xs"
          style={{ borderColor: 'var(--doap-border)' }}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              className="px-3 py-2 rounded-xl border border-neutral-800 hover:bg-neutral-800 text-neutral-300 font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download size={13} /> Export JSON
            </button>
            <button
              onClick={handleResetBrain}
              className="px-3 py-2 rounded-xl border border-neutral-800 hover:bg-rose-950/30 text-rose-400 font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Reset all learned data to initial baseline"
            >
              <RotateCcw size={13} /> Reset Memory
            </button>
          </div>

          <div className="flex items-center gap-2">
            {memory.weaknesses?.reviewTopics?.[0] && (
              <button
                onClick={() => handlePracticeTopic(memory.weaknesses.reviewTopics[0])}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                <Sparkles size={14} /> Practice: {memory.weaknesses.reviewTopics[0]}
              </button>
            )}
            <button
              onClick={() => setIsBrainVaultOpen(false)}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium cursor-pointer transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
