import React, { useState } from 'react';
import { Sun, Moon, Monitor, RotateCcw, ChevronDown, MoveUpRight, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { GRADIENT_THEMES, IPHONE_THEMES, ACCENT_COLORS } from '../../data/gradientThemes';
import { GradientPreview } from '../Common/GradientPreview';

// ─────────────────────────────────────────────────────────────
// Gradient Direction icons (SVG arrows)
// ─────────────────────────────────────────────────────────────
const DIR_OPTIONS = [
  { id: 'diagonal', label: '↗', title: 'Diagonal (135°)' },
  { id: 'vertical',  label: '↑', title: 'Vertical (top→bottom)' },
  { id: 'horizontal', label: '→', title: 'Horizontal (left→right)' },
  { id: 'radial',   label: '◎', title: 'Radial (center out)' },
  { id: 'conic',    label: '⟳', title: 'Conic sweep' },
];

// ─────────────────────────────────────────────────────────────
// Segmented control helper
// ─────────────────────────────────────────────────────────────
const Segment = ({ options, value, onChange }) => (
  <div
    className="inline-flex items-center gap-1 p-1 rounded-xl border"
    style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)' }}
  >
    {options.map(opt => {
      const active = opt.id === value;
      return (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          title={opt.title || opt.label}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer"
          style={{
            backgroundColor: active ? 'rgba(255,255,255,0.12)' : 'transparent',
            color: active ? 'var(--doap-text-prim)' : 'var(--doap-text-sec)',
            boxShadow: active ? '0 1px 4px rgba(0,0,0,0.35)' : 'none',
          }}
        >
          {opt.label}
        </button>
      );
    })}
  </div>
);

// ─────────────────────────────────────────────────────────────
// Section container
// ─────────────────────────────────────────────────────────────
const Section = ({ title, subtitle, children, className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    {(title || subtitle) && (
      <div>
        {title && <p className="text-xs font-semibold" style={{ color: 'var(--doap-text-prim)' }}>{title}</p>}
        {subtitle && <p className="text-[11px] mt-0.5" style={{ color: 'var(--doap-text-sec)' }}>{subtitle}</p>}
      </div>
    )}
    {children}
  </div>
);

// ─────────────────────────────────────────────────────────────
// Main Appearance Page
// ─────────────────────────────────────────────────────────────
export const AppearancePage = () => {
  const { settings, updatePersonalization, resetPersonalization, isDarkMode } = useTheme();
  const s = settings || {};

  const [activeTab, setActiveTab] = useState('theme');

  // Open-Source Engine States
  const [ttsProvider, setTtsProvider] = useState(() => (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_tts_provider') || 'neural' : 'neural'));
  const [voicePersona, setVoicePersona] = useState(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('doap_voice_persona') : null;
    if (saved === 'neerja' || saved === 'jenny' || saved === 'aria') return 'charon';
    return saved || 'charon';
  });
  const [elevenKey, setElevenKey] = useState(() => (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_elevenlabs_key') || '' : ''));
  const [kokoroUrl, setKokoroUrl] = useState(() => (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_kokoro_url') || 'http://localhost:8880/v1/audio/speech' : 'http://localhost:8880/v1/audio/speech'));
  const [pistonUrl, setPistonUrl] = useState(() => (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_piston_url') || 'http://localhost:2000' : 'http://localhost:2000'));
  const [campusLlmUrl, setCampusLlmUrl] = useState(() => (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_campus_llm_url') || 'http://localhost:8000/v1' : 'http://localhost:8000/v1'));
  const [openRouterKey, setOpenRouterKey] = useState(() => (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_openrouter_key') || '' : ''));
  const [customLlmUrl, setCustomLlmUrl] = useState(() => (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_custom_llm_url') || '' : ''));
  const [customLlmKey, setCustomLlmKey] = useState(() => (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_custom_llm_key') || '' : ''));
  const [customLlmModel, setCustomLlmModel] = useState(() => (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_custom_llm_model') || 'deepseek/deepseek-chat:free' : 'deepseek/deepseek-chat:free'));
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [harnessState, setHarnessState] = useState(() => getHarnessState());
  const [isRefining, setIsRefining] = useState(false);
  const [harnessNotice, setHarnessNotice] = useState('');

  const handleToggleRlm = () => {
    const newEnabled = toggleRlmMode();
    setHarnessState(getHarnessState());
    setHarnessNotice(newEnabled ? 'RLM Multi-Agent mode enabled!' : 'RLM Multi-Agent mode disabled.');
    setTimeout(() => setHarnessNotice(''), 3000);
  };

  const handleTriggerRefine = async () => {
    setIsRefining(true);
    try {
      const res = await refineHarness('Triggered via Prime Agent Settings');
      setHarnessState(getHarnessState());
      setHarnessNotice(`Harness refined to v${res.version}! ${res.newSkillAdded ? `Added: ${res.newSkillAdded}` : 'Reinforced adaptive reasoning.'}`);
    } catch (e) {
      setHarnessNotice('Error refining harness.');
    } finally {
      setIsRefining(false);
      setTimeout(() => setHarnessNotice(''), 4000);
    }
  };

  const handleRollbackSnapshot = () => {
    const res = rollbackHarness();
    setHarnessState(getHarnessState());
    setHarnessNotice(res.message);
    setTimeout(() => setHarnessNotice(''), 3500);
  };


  const handleSaveEngines = () => {
    try {
      localStorage.setItem('doap_tts_provider', ttsProvider);
      localStorage.setItem('doap_voice_persona', voicePersona);
      if (elevenKey) localStorage.setItem('doap_elevenlabs_key', elevenKey);
      else localStorage.removeItem('doap_elevenlabs_key');
      localStorage.setItem('doap_kokoro_url', kokoroUrl);
      localStorage.setItem('doap_piston_url', pistonUrl);
      localStorage.setItem('doap_campus_llm_url', campusLlmUrl);
      if (openRouterKey) localStorage.setItem('doap_openrouter_key', openRouterKey);
      else localStorage.removeItem('doap_openrouter_key');
      if (customLlmUrl) localStorage.setItem('doap_custom_llm_url', customLlmUrl);
      else localStorage.removeItem('doap_custom_llm_url');
      if (customLlmKey) localStorage.setItem('doap_custom_llm_key', customLlmKey);
      else localStorage.removeItem('doap_custom_llm_key');
      if (customLlmModel) localStorage.setItem('doap_custom_llm_model', customLlmModel);
      else localStorage.removeItem('doap_custom_llm_model');
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (e) {}
  };

  const handlePreviewVoice = async () => {
    if (isPreviewPlaying) return;
    setIsPreviewPlaying(true);
    try {
      const { speakDOAPVoice } = await import('../../services/elevenLabsService');
      const samplePhrases = {
        charon: "Hello! I am Andrew, your DOAP AI technical mentor. My voice is powered by high-definition neural speech synthesis. How are your data structures studies going?",
        prabhat: "Namaste! Main Prabhat hoon, aapka DOAP AI mentor. Sanjeevani learning studio me milkar algorithmic problems aur placements crack karenge.",
        guy: "Hey there! I am Guy, your conversational tech lead. Whenever you hit a bug or want to brainstorm system design, let's solve it together.",
        brian: "Greetings. I am Brian, your academic research tutor. We will analyze time complexity, amortized bounds, and optimal memory layouts."
      };
      const text = samplePhrases[voicePersona] || samplePhrases.charon;
      await speakDOAPVoice(text, () => setIsPreviewPlaying(false), () => setIsPreviewPlaying(false), voicePersona);
    } catch (e) {
      setIsPreviewPlaying(false);
    }
  };

  const TABS = [
    { id: 'theme', label: 'Theme' },
    { id: 'gradients', label: 'Gradients' },
    { id: 'depth', label: 'Depth & Glass' },
    { id: 'animation', label: 'Animation' },
    { id: 'advanced', label: 'Advanced' },
    { id: 'engines', label: '⚡ Open-Source AI & Runtimes' },
  ];

  // ── Showcase cards (bottom row) ─────────────────────────────
  const glassShowcase = GRADIENT_THEMES[s.theme || 'monochrome'];
  const glassColors = isDarkMode ? glassShowcase.dark : glassShowcase.light;

  return (
    <div className="space-y-0 select-none animate-page-transition">
      {/* ── Page header ──────────────────────────────────────── */}
      <div className="pb-5">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--doap-text-prim)' }}>
          Appearance
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--doap-text-sec)' }}>
          Personalize your DOAP experience.
        </p>
      </div>

      {/* ── Tab navigation ───────────────────────────────────── */}
      <div
        className="flex items-center gap-1 p-1 rounded-2xl mb-6 w-fit border"
        style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}
      >
        {TABS.map(tab => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: active ? 'var(--doap-text-prim)' : 'var(--doap-text-sec)',
                boxShadow: active ? '0 1px 4px rgba(0,0,0,0.4)' : 'none',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Main 2-column layout ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* LEFT PANEL (7 cols) — controls */}
        <div className="lg:col-span-7 space-y-5">
          <div
            className="p-5 rounded-2xl border space-y-6 doap-glass"
            style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}
          >
            {activeTab === 'engines' ? (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-sm font-bold text-cyan-400 font-mono flex items-center gap-2">
                    <span>⚡ OPEN-SOURCE AI & RUNTIME CONTROLLER</span>
                  </h3>
                  <p className="text-[11px] mt-1" style={{ color: 'var(--doap-text-sec)' }}>
                    Switch seamlessly between cloud APIs and 100% self-hosted local engines (Kokoro TTS, Pyodide Wasm, Piston sandbox & vLLM/Ollama).
                  </p>
                </div>

                {/* 1. Voice Synthesis Engine */}
                <Section title="Voice Synthesis Engine (TTS)" subtitle="Select ultra-realistic neural human voices, cloud API, or self-hosted open-weights.">
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setTtsProvider('neural')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        ttsProvider === 'neural' ? 'border-cyan-400 bg-cyan-500/10' : 'border-neutral-800 bg-neutral-900/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-white">🌟 DOAP Neural Studio</p>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">FREE</span>
                      </div>
                      <p className="text-[10px] text-neutral-400 mt-1">100% human-grade, zero API keys, unlimited usage</p>
                    </button>
                    <button
                      onClick={() => setTtsProvider('elevenlabs')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        ttsProvider === 'elevenlabs' ? 'border-purple-400 bg-purple-500/10' : 'border-neutral-800 bg-neutral-900/40'
                      }`}
                    >
                      <p className="text-xs font-bold text-white">🎙️ ElevenLabs Cloud</p>
                      <p className="text-[10px] text-neutral-400 mt-1">Personal API key required for Charon voice</p>
                    </button>
                    <button
                      onClick={() => setTtsProvider('kokoro')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        ttsProvider === 'kokoro' ? 'border-emerald-400 bg-emerald-500/10' : 'border-neutral-800 bg-neutral-900/40'
                      }`}
                    >
                      <p className="text-xs font-bold text-white">⚡ Kokoro TTS (Local)</p>
                      <p className="text-[10px] text-neutral-400 mt-1">82M lightweight open-weights Docker container</p>
                    </button>
                  </div>

                  {/* Voice Persona Selector & Preview */}
                  <div className="p-3 rounded-xl border border-neutral-800 bg-black/30 space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-neutral-300">Voice Persona & Accent:</label>
                      <button
                        type="button"
                        onClick={handlePreviewVoice}
                        disabled={isPreviewPlaying}
                        className="px-3 py-1 rounded-lg text-xs font-bold bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/30 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        {isPreviewPlaying ? (
                          <>
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                            Speaking...
                          </>
                        ) : (
                          <>🎧 Preview Human Voice</>
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
                      {[
                        { id: 'charon', label: 'Andrew / Charon', desc: 'Resonant Studio Voice (Male)' },
                        { id: 'prabhat', label: 'Prabhat Neural', desc: 'Articulate Indian Mentor (Male)' },
                        { id: 'guy', label: 'Guy Neural', desc: 'Conversational Tech Lead (Male)' },
                        { id: 'brian', label: 'Brian Academic', desc: 'Deep Technical Mentor (Male)' }
                      ].map(v => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setVoicePersona(v.id)}
                          className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                            voicePersona === v.id
                              ? 'border-cyan-400 bg-cyan-500/15 text-white'
                              : 'border-neutral-800 bg-neutral-900/30 text-neutral-400 hover:border-neutral-700'
                          }`}
                        >
                          <p className="text-xs font-bold">{v.label}</p>
                          <p className="text-[10px] text-neutral-400 mt-0.5">{v.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {ttsProvider === 'elevenlabs' && (
                    <div className="pt-2">
                      <label className="text-[11px] text-neutral-400 block mb-1">Your Personal ElevenLabs API Key:</label>
                      <input
                        type="password"
                        value={elevenKey}
                        onChange={(e) => setElevenKey(e.target.value)}
                        placeholder="sk_..."
                        className="w-full px-3 py-2 rounded-xl text-xs bg-black/40 border border-neutral-800 text-white font-mono focus:border-purple-500 focus:outline-none"
                      />
                      <p className="text-[10px] text-neutral-500 mt-1">Leave blank to use DOAP Neural Studio Voice for free.</p>
                    </div>
                  )}

                  {ttsProvider === 'kokoro' && (
                    <div className="pt-2">
                      <label className="text-[11px] text-neutral-400 block mb-1">Kokoro OpenAI-Compatible Endpoint:</label>
                      <input
                        type="text"
                        value={kokoroUrl}
                        onChange={(e) => setKokoroUrl(e.target.value)}
                        placeholder="http://localhost:8880/v1/audio/speech"
                        className="w-full px-3 py-2 rounded-xl text-xs bg-black/40 border border-neutral-800 text-white font-mono focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  )}
                </Section>

                {/* 2. Code Execution Sandboxing */}
                <Section title="Code Execution Engine" subtitle="In-browser Wasm or self-hosted Dockerized Piston.">
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl border border-neutral-800 bg-black/30 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">🐍 Pyodide Python 3 Wasm</p>
                        <p className="text-[10px] text-neutral-400">Executes directly inside the browser with 0ms server latency</p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-emerald-500/40 text-emerald-400 bg-emerald-950/40">
                        ACTIVE
                      </span>
                    </div>

                    <div className="space-y-1 pt-1">
                      <label className="text-[11px] text-neutral-400 block">Self-Hosted Piston API Engine (Optional):</label>
                      <input
                        type="text"
                        value={pistonUrl}
                        onChange={(e) => setPistonUrl(e.target.value)}
                        placeholder="http://localhost:2000"
                        className="w-full px-3 py-2 rounded-xl text-xs bg-black/40 border border-neutral-800 text-white font-mono focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </Section>

                {/* 3. Sanjivani LLM Local Endpoint */}
                <Section title="Sanjivani LLM Inference Endpoint" subtitle="vLLM or Ollama local campus server.">
                  <input
                    type="text"
                    value={campusLlmUrl}
                    onChange={(e) => setCampusLlmUrl(e.target.value)}
                    placeholder="http://localhost:8000/v1"
                    className="w-full px-3 py-2 rounded-xl text-xs bg-black/40 border border-neutral-800 text-white font-mono focus:border-cyan-500 focus:outline-none"
                  />
                  <p className="text-[10px] text-neutral-500 mt-1 font-mono">Run `serve_vllm.sh` to launch Sanjivani-Coder-7B locally.</p>
                </Section>

                {/* 4. Multi-Provider Free LLM Fallback (Awesome FreeLLM Integration) */}
                <Section 
                  title="Multi-Provider Free LLM Fallback (Awesome FreeLLM Integration)" 
                  subtitle="Cascades automatically across Groq, OpenRouter, and zero-key endpoints so DOAP never fails."
                >
                  <div className="space-y-3">
                    {/* Active status cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="p-2.5 rounded-xl border border-cyan-500/30 bg-cyan-950/20 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-cyan-300 font-mono">⚡ TIER 1: GROQ LPU</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">PRIMARY</span>
                        </div>
                        <p className="text-[11px] font-semibold text-white">Qwen 27B / GPT-OSS 120B</p>
                        <p className="text-[9px] text-neutral-400">Sub-150ms instant response</p>
                      </div>

                      <div className="p-2.5 rounded-xl border border-purple-500/30 bg-purple-950/20 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-purple-300 font-mono">🟢 TIER 2: OPENROUTER</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-mono">FREE MODELS</span>
                        </div>
                        <p className="text-[11px] font-semibold text-white">DeepSeek & Llama Free</p>
                        <p className="text-[9px] text-neutral-400">Zero card, 40+ free models</p>
                      </div>

                      <div className="p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-emerald-300 font-mono">🛡️ TIER 3: ZERO-KEY</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">ALWAYS ON</span>
                        </div>
                        <p className="text-[11px] font-semibold text-white">Universal Neural Mesh</p>
                        <p className="text-[9px] text-neutral-400">100% uptime fallback</p>
                      </div>
                    </div>

                    {/* Quick Links to Free API Keys (Zero Card) */}
                    <div className="p-3 rounded-xl border border-neutral-800 bg-black/40 space-y-1.5">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                        🔑 Get Free API Keys (Zero Credit Card Required):
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        <a 
                          href="https://console.groq.com/keys" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] font-mono px-2 py-1 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          Groq LPU (30 RPM) ↗
                        </a>
                        <a 
                          href="https://openrouter.ai/keys" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] font-mono px-2 py-1 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          OpenRouter Free Keys ↗
                        </a>
                        <a 
                          href="https://build.nvidia.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] font-mono px-2 py-1 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                          NVIDIA NIM (128 Models) ↗
                        </a>
                        <a 
                          href="https://dash.cloudflare.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] font-mono px-2 py-1 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          Cloudflare Workers AI (40 Models) ↗
                        </a>
                      </div>
                    </div>

                    {/* Custom Provider Configuration Form */}
                    <div className="space-y-2 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] text-neutral-400 block mb-1">OpenRouter Free API Key (Optional):</label>
                          <input
                            type="password"
                            value={openRouterKey}
                            onChange={(e) => setOpenRouterKey(e.target.value)}
                            placeholder="sk-or-v1-..."
                            className="w-full px-3 py-2 rounded-xl text-xs bg-black/40 border border-neutral-800 text-white font-mono focus:border-purple-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-neutral-400 block mb-1">Custom Fallback Model ID:</label>
                          <input
                            type="text"
                            value={customLlmModel}
                            onChange={(e) => setCustomLlmModel(e.target.value)}
                            placeholder="deepseek/deepseek-chat:free"
                            className="w-full px-3 py-2 rounded-xl text-xs bg-black/40 border border-neutral-800 text-white font-mono focus:border-cyan-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-neutral-400 block mb-1">Custom OpenAI-Compatible Base URL (Optional):</label>
                        <input
                          type="text"
                          value={customLlmUrl}
                          onChange={(e) => setCustomLlmUrl(e.target.value)}
                          placeholder="https://integrate.api.nvidia.com/v1 or https://openrouter.ai/api/v1"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-black/40 border border-neutral-800 text-white font-mono focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </Section>

                {/* ── Section 5: Prime Agent Harness & Continual Memory ── */}
                <Section 
                  title="🧬 Prime Agent Harness & Continual Memory (Self-Improving RLM)" 
                  subtitle="Inspired by PrimeIntellect-ai/prime-agent. Treats context as variables, subagents as recursive functions (rlm(...)), and refines student memory via /refine."
                >
                  <div className="space-y-4">
                    {/* Notice bar if any */}
                    {harnessNotice && (
                      <div className="p-2.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-xs font-mono text-indigo-300 flex items-center justify-between animate-fade-in">
                        <span>{harnessNotice}</span>
                      </div>
                    )}

                    {/* RLM Toggle & Harness Version */}
                    <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/40 flex items-center justify-between flex-wrap gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-white">⚡ Recursive Multi-Agent Execution (RLM)</p>
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                            harnessState.enabled 
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                              : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                          }`}>
                            {harnessState.enabled ? 'ACTIVE' : 'DISABLED'}
                          </span>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                            Harness v{harnessState.version}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400">
                          Decomposes complex problems into Architect, Developer, Verifier, and Socratic subagents in parallel.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleToggleRlm}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          harnessState.enabled
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30'
                            : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {harnessState.enabled ? 'Turn OFF' : 'Turn ON'}
                      </button>
                    </div>

                    {/* Active Learned Skills Matrix */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                          🛠️ Active Reusable Learned Skills ({harnessState.learnedSkills?.length || 0}):
                        </span>
                        <span className="text-[10px] font-mono text-neutral-500">
                          Target Lang: {harnessState.studentProfile?.primaryLanguage || 'Python'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(harnessState.learnedSkills || []).map((skill, idx) => (
                          <div 
                            key={skill.id || idx}
                            className="p-2.5 rounded-xl border border-neutral-800 bg-black/40 space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-xs text-neutral-200">{skill.name}</span>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                                {skill.level}
                              </span>
                            </div>
                            <p className="text-[10px] text-neutral-400 leading-snug">
                              {skill.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Supplemental Persona Prompt Preview */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] text-neutral-400">Adaptive Supplemental System Prompt (Harness Overlay):</label>
                        <span className="text-[10px] font-mono text-cyan-400">Immutable Base Protected</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/60 border border-neutral-800 text-[11px] font-mono text-neutral-300 leading-relaxed max-h-24 overflow-y-auto">
                        {harnessState.supplementalPrompt}
                      </div>
                    </div>

                    {/* Harness Action Toolbar */}
                    <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleTriggerRefine}
                          disabled={isRefining}
                          className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          {isRefining ? (
                            <>
                              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                              Refining...
                            </>
                          ) : (
                            <>🧬 Run /refine Now</>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={handleRollbackSnapshot}
                          disabled={!harnessState.snapshots || harnessState.snapshots.length === 0}
                          className="px-3 py-1.5 rounded-xl border border-neutral-700 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-300 font-medium text-xs transition-all cursor-pointer disabled:opacity-40"
                          title="Rollback to previous snapshot"
                        >
                          ⏪ Rollback Snapshot ({harnessState.snapshots?.length || 0})
                        </button>
                      </div>

                      <span className="text-[10px] font-mono text-neutral-500">
                        Zero user friction • Trajectory driven
                      </span>
                    </div>
                  </div>
                </Section>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-400">
                    {savedSuccess ? '✓ Engine settings saved successfully!' : ''}
                  </span>
                  <button
                    type="button"
                    onClick={handleSaveEngines}
                    className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Save Engine Settings
                  </button>
                </div>
              </div>
            ) : (
              <>
            {/* ── Theme Mode ────── */}
            <Section title="Theme Mode" subtitle="Choose your preferred theme mode.">
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'light', label: 'Light', Icon: Sun },
                  { id: 'dark',  label: 'Dark',  Icon: Moon },
                  { id: 'system',label: 'System', Icon: Monitor },
                ].map(({ id, label, Icon }) => {
                  const active = s.themeMode === id;
                  return (
                    <button
                      key={id}
                      onClick={() => updatePersonalization({ themeMode: id })}
                      className="flex flex-col items-center gap-2 py-4 rounded-2xl border transition-all duration-200 cursor-pointer hover-glide"
                      style={{
                        backgroundColor: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                        borderColor: active ? 'var(--doap-border-active)' : 'var(--doap-border)',
                        color: active ? 'var(--doap-text-prim)' : 'var(--doap-text-sec)',
                        boxShadow: active ? '0 0 0 1px rgba(255,255,255,0.1) inset' : 'none',
                      }}
                    >
                      <Icon size={18} />
                      <span className="text-xs font-semibold">{label}</span>
                    </button>
                  );
                })}
              </div>
            </Section>

            {/* ── Divider ── */}
            <div className="h-px" style={{ backgroundColor: 'var(--doap-border)' }} />

            {/* ── Accent & Gradient ────── */}
            <div className="space-y-5">
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--doap-text-prim)' }}>Accent & Gradient</p>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--doap-text-sec)' }}>
                  Customize your experience with beautiful gradients and accent colors.
                </p>
              </div>

              {/* Accent Color swatches */}
              <Section title="Accent Color" subtitle="Applied to buttons, highlights and interactive elements.">
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  {ACCENT_COLORS.map(acc => {
                    const active = s.accent === acc.id;
                    return (
                      <button
                        key={acc.id}
                        title={acc.name}
                        onClick={() => updatePersonalization({ accent: acc.id })}
                        className="w-8 h-8 rounded-full border-2 transition-all duration-200 cursor-pointer flex items-center justify-center"
                        style={{
                          backgroundColor: acc.hex || 'transparent',
                          borderColor: active
                            ? 'rgba(255,255,255,0.7)'
                            : acc.hex ? 'transparent' : 'var(--doap-border)',
                          boxShadow: active ? '0 0 0 2px rgba(255,255,255,0.15)' : 'none',
                          transform: active ? 'scale(1.18)' : 'scale(1)',
                        }}
                      >
                        {/* Neutral = circle with X */}
                        {acc.id === 'neutral' && (
                          <svg width="12" height="12" viewBox="0 0 12 12">
                            <circle cx="6" cy="6" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none"/>
                            <line x1="2" y1="10" x2="10" y2="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round"/>
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </Section>

              {/* Gradient Style dropdown */}
              <Section title="Gradient Style" subtitle="Add life to your background with stunning gradients.">
                <div
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border cursor-pointer"
                  style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)', color: 'var(--doap-text-prim)' }}
                >
                  <span className="text-xs font-medium capitalize">{s.gradientStyle || 'Subtle'}</span>
                  <div className="flex items-center gap-2">
                    {['subtle','balanced','dynamic'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => updatePersonalization({ gradientStyle: opt })}
                        className="text-[10px] px-2 py-0.5 rounded-md transition-all cursor-pointer capitalize font-mono"
                        style={{
                          backgroundColor: s.gradientStyle === opt ? 'rgba(255,255,255,0.12)' : 'transparent',
                          color: s.gradientStyle === opt ? 'var(--doap-text-prim)' : 'var(--doap-text-muted)',
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                    <ChevronDown size={14} style={{ color: 'var(--doap-text-muted)' }} />
                  </div>
                </div>
              </Section>

              {/* Background Style */}
              <Section title="Background Style" subtitle="Choose how your background looks.">
                <Segment
                  options={[
                    { id: 'default', label: 'Solid' },
                    { id: 'gradient', label: 'Gradient' },
                    { id: 'animated', label: 'Animated' },
                  ]}
                  value={s.background || 'default'}
                  onChange={v => updatePersonalization({ background: v })}
                />
              </Section>

              {/* Background Intensity slider */}
              <Section title="Background Intensity">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px]" style={{ color: 'var(--doap-text-muted)' }}>Intensity</span>
                    <span className="text-[11px] font-mono" style={{ color: 'var(--doap-text-sec)' }}>
                      {s.backgroundIntensity ?? 40}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={s.backgroundIntensity ?? 40}
                    onChange={e => updatePersonalization({ backgroundIntensity: Number(e.target.value) })}
                    className="w-full h-1 rounded-full cursor-pointer appearance-none"
                    style={{ accentColor: 'var(--doap-accent)' }}
                  />
                </div>
              </Section>

              {/* Gradient Direction */}
              <Section title="Gradient Direction">
                <div className="flex items-center gap-2">
                  {DIR_OPTIONS.map(opt => {
                    const active = s.gradientDirection === opt.id;
                    return (
                      <button
                        key={opt.id}
                        title={opt.title}
                        onClick={() => updatePersonalization({ gradientDirection: opt.id })}
                        className="w-8 h-8 rounded-lg border flex items-center justify-center text-sm transition-all duration-150 cursor-pointer"
                        style={{
                          backgroundColor: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                          borderColor: 'var(--doap-border)',
                          color: active ? 'var(--doap-text-prim)' : 'var(--doap-text-muted)',
                        }}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </Section>
            </div>

            {/* Reset */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={resetPersonalization}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer hover:opacity-80"
                style={{ borderColor: 'var(--doap-border)', color: 'var(--doap-text-sec)' }}
              >
                <RotateCcw size={12} />
                <span>Reset to defaults</span>
              </button>
            </div>
            </>
            )}
          </div>
        </div>

        {/* RIGHT PANEL (5 cols) — gradient theme cards + iPhone collection */}
        <div className="lg:col-span-5 space-y-5">
          {/* ── Gradient Themes ── */}
          <div
            className="p-5 rounded-2xl border space-y-4 doap-glass"
            style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}
          >
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--doap-text-prim)' }}>Gradient Themes</p>
              <p className="text-[11px] mt-0.5" style={{ color: 'var(--doap-text-sec)' }}>
                Choose from premium depth & gradient themes.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {Object.values(GRADIENT_THEMES).map(theme => (
                <GradientPreview
                  key={theme.id}
                  layers={theme.gradient}
                  name={theme.name}
                  subtitle={theme.subtitle}
                  selected={s.theme === theme.id}
                  animated={s.background === 'animated' && s.theme === theme.id}
                  onClick={() => updatePersonalization({ theme: theme.id })}
                  className="h-32"
                />
              ))}
            </div>
          </div>

          {/* ── iPhone 17 Collection ── */}
          <div
            className="p-5 rounded-2xl border space-y-4 doap-glass"
            style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}
          >
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--doap-text-prim)' }}>iPhone 17 Collection</p>
              <p className="text-[11px] mt-0.5" style={{ color: 'var(--doap-text-sec)' }}>
                Inspired by iPhone 17 & 17 Pro color story.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {Object.values(IPHONE_THEMES).map(theme => (
                <GradientPreview
                  key={theme.id}
                  layers={theme.gradient}
                  name={theme.name}
                  selected={s.theme === theme.themeRef && s.profileBackground === theme.id}
                  animated={false}
                  onClick={() => updatePersonalization({ theme: theme.themeRef, profileBackground: theme.id })}
                  compact
                  className="h-20"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom 3-column showcase row ─────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

        {/* Glassmorphism showcase */}
        <div
          className="p-5 rounded-2xl border space-y-4 doap-glass"
          style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--doap-text-prim)' }}>Glassmorphism</p>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--doap-text-sec)' }}>
              Subtle translucent layers with depth.
            </p>
          </div>

          {/* Mock glass card preview */}
          <div
            className="p-4 rounded-xl border space-y-2 doap-glass"
            style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)' }}
          >
            <p className="text-[10px] font-mono" style={{ color: 'var(--doap-text-muted)' }}>Learning Progress</p>
            <p className="text-2xl font-black" style={{ color: 'var(--doap-text-prim)' }}>68%</p>
            <p className="text-[10px]" style={{ color: '#10b981' }}>+12% this week</p>
          </div>

          {/* Fake sidebar menu preview */}
          <div className="space-y-1.5">
            {['Profile','Settings','Billing','Sign Out'].map(item => (
              <div
                key={item}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border"
                style={{ borderColor: 'var(--doap-border)', color: 'var(--doap-text-sec)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--doap-text-muted)' }} />
                <span className="text-xs">{item}</span>
              </div>
            ))}
          </div>

          {/* Search bar mock */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl border doap-glass"
            style={{ borderColor: 'var(--doap-border)', color: 'var(--doap-text-muted)' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" opacity="0.5">
              <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <line x1="8.5" y1="8.5" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-[11px]">Search...</span>
          </div>

          {/* AI assistant mock */}
          <div
            className="flex items-center justify-between px-3 py-2.5 rounded-xl border doap-glass"
            style={{ borderColor: 'var(--doap-border)' }}
          >
            <div>
              <p className="text-xs font-semibold" style={{ color: 'var(--doap-text-prim)' }}>AI Assistant</p>
              <p className="text-[10px]" style={{ color: 'var(--doap-text-muted)' }}>How can I help you today?</p>
            </div>
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center border text-[10px]"
              style={{ borderColor: 'var(--doap-border)', color: 'var(--doap-text-muted)' }}
            >+</div>
          </div>
        </div>

        {/* Advanced Animations showcase */}
        <div
          className="p-5 rounded-2xl border space-y-4 doap-glass"
          style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--doap-text-prim)' }}>Advanced Animations</p>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--doap-text-sec)' }}>
              Smooth. Natural. Purposeful.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Hover Glide', desc: 'Elements glide with friction.', key: 'hoverGlide' },
              { label: 'Depth Shift', desc: 'Layered depth on interaction.', key: 'depthShift' },
              { label: 'Parallax Layers', desc: 'Background moves at different speeds.', key: 'parallax' },
              { label: 'Smooth Transitions', desc: 'Page transitions feel like butter.', key: 'smoothTransitions' },
            ].map(({ label, desc, key }) => {
              const enabled = s[key] !== false;
              return (
                <div
                  key={key}
                  className="flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer hover-glide"
                  style={{ borderColor: 'var(--doap-border)', backgroundColor: 'var(--doap-surface-sec)' }}
                  onClick={() => updatePersonalization({ [key]: !enabled })}
                >
                  <div
                    className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      borderColor: 'var(--doap-border)',
                      backgroundColor: enabled ? 'var(--doap-accent-soft)' : 'transparent',
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-sm"
                      style={{ backgroundColor: enabled ? 'var(--doap-accent)' : 'var(--doap-text-muted)' }}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: 'var(--doap-text-prim)' }}>{label}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: 'var(--doap-text-muted)' }}>{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hover & Depth Effects showcase */}
        <div
          className="p-5 rounded-2xl border space-y-4 doap-glass"
          style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--doap-text-prim)' }}>Hover & Depth Effects</p>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--doap-text-sec)' }}>
              Everything responds. Beautifully.
            </p>
          </div>

          {/* Demo hover card */}
          <div
            className="p-4 rounded-xl border hover-glide transition-all cursor-pointer"
            style={{ borderColor: 'var(--doap-border)', backgroundColor: 'var(--doap-surface-sec)' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold" style={{ color: 'var(--doap-text-prim)' }}>Project Phoenix</p>
                <p className="text-[10px] mt-0.5" style={{ color: 'var(--doap-text-muted)' }}>AI-powered career platform</p>
              </div>
              <MoveUpRight size={14} style={{ color: 'var(--doap-text-muted)' }} />
            </div>
            <div className="flex gap-1 mt-3">
              {[0,1,2].map(i => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: i === 0 ? 'var(--doap-accent)' : 'var(--doap-border)' }}
                />
              ))}
            </div>
          </div>

          <p className="text-[10px] font-semibold" style={{ color: 'var(--doap-text-sec)' }}>Depth on Hover</p>
          <p className="text-[10px]" style={{ color: 'var(--doap-text-muted)' }}>Cards lift and reveal depth.</p>

          <div className="flex gap-1.5 flex-wrap">
            {['⟲','⚡','☆','⊞','⬡'].map((icon, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-lg border flex items-center justify-center text-sm transition-all cursor-pointer hover-glide"
                style={{ borderColor: 'var(--doap-border)', color: 'var(--doap-text-sec)' }}
              >
                {icon}
              </div>
            ))}
          </div>

          <p className="text-[10px] font-semibold" style={{ color: 'var(--doap-text-sec)' }}>Button Hover</p>
          <p className="text-[10px]" style={{ color: 'var(--doap-text-muted)' }}>Glide. Glow. Elevate.</p>

          <div className="flex gap-2">
            <button
              className="flex-1 py-2 px-3 rounded-xl border text-[11px] font-semibold flex items-center justify-center gap-1 hover-glide transition-all"
              style={{ borderColor: 'var(--doap-border)', color: 'var(--doap-text-prim)' }}
            >
              Get Started <ArrowRight size={11} />
            </button>
            <button
              className="flex-1 py-2 px-3 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 hover-glide transition-all"
              style={{ backgroundColor: 'var(--doap-accent)', color: '#000' }}
            >
              Get Started <ArrowRight size={11} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Profile Background Personalization ───────────────── */}
      <div
        className="mt-5 p-5 rounded-2xl border space-y-4 doap-glass"
        style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}
      >
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--doap-text-prim)' }}>Profile Background Personalization</p>
          <p className="text-[11px] mt-0.5" style={{ color: 'var(--doap-text-sec)' }}>Make your profile truly yours.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            ...Object.values(GRADIENT_THEMES).slice(0, 3),
            ...Object.values(IPHONE_THEMES).slice(0, 3),
          ].map((theme, idx) => {
            const layers = theme.gradient;
            const isSelected = s.profileBackground === theme.id;
            return (
              <GradientPreview
                key={theme.id}
                layers={layers}
                selected={isSelected}
                name=""
                onClick={() => updatePersonalization({ profileBackground: theme.id })}
                compact
                className="h-16 rounded-xl"
              />
            );
          })}
        </div>
      </div>

      {/* ── Footer tagline ────────────────────────────────────── */}
      <div className="pt-8 pb-2 text-center">
        <p className="text-[11px] font-mono" style={{ color: 'var(--doap-text-muted)' }}>
          DOAP — Designed for the future. Built for you.
        </p>
      </div>
    </div>
  );
};
