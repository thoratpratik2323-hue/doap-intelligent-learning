import React, { useState } from "react";
import { Settings, X, Mic, Volume2, Sparkles, Sliders, Shield, Key } from "lucide-react";
import { THEME_COLOR_MAP } from "../../lib/myraaTypes";

export function SettingsPanel({
  isOpen,
  onClose,
  settings,
  onChange,
  onOpenApiKeyGate
}) {
  const [activeTab, setActiveTab] = useState("general");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-scale-in"
        style={{
          backgroundColor: '#090D16',
          color: '#F8FAFC'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-violet-500/15 border border-violet-500/30 text-violet-400">
              <Settings size={20} />
            </div>
            <div>
              <h2 className="font-bold text-base text-white">MYRAA Core Configuration</h2>
              <p className="text-xs text-slate-400 font-medium">Cockpit voice, sensitivity, and visualizer settings</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/5 px-6 pt-2 bg-slate-950/20">
          {[
            { id: "general", label: "General & Voice", icon: Mic },
            { id: "visual", label: "Core Visualizer", icon: Sparkles },
            { id: "api", label: "API Key", icon: Key }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "border-violet-500 text-white"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto scrollbar-none">
          {activeTab === "general" && (
            <div className="space-y-4">
              {/* Wake Word Setting */}
              <div className="p-4 rounded-2xl border border-white/5 bg-slate-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white font-mono">Always-Listening Wake Word</span>
                    <p className="text-[11px] text-slate-400">Trigger Myraa instantly by voice ("Hey Myraa" / "Hey Ziv")</p>
                  </div>
                  <button
                    onClick={() => onChange({ wakeWordEnabled: !settings.wakeWordEnabled })}
                    className={`w-11 h-6 rounded-full transition-colors p-1 cursor-pointer ${
                      settings.wakeWordEnabled ? "bg-violet-600" : "bg-slate-800"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      settings.wakeWordEnabled ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </button>
                </div>

                {settings.wakeWordEnabled && (
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                      Wake Phrase
                    </label>
                    <input
                      type="text"
                      value={settings.wakePhrase || "hey myraa"}
                      onChange={e => onChange({ wakePhrase: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-violet-500"
                    />
                  </div>
                )}
              </div>

              {/* Voice Engine Setting */}
              <div className="p-4 rounded-2xl border border-white/5 bg-slate-900/40 space-y-3">
                <span className="text-xs font-bold text-white font-mono block">Voice Synthesis Engine</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "elevenlabs", label: "ElevenLabs Studio", desc: "Hyper-realistic voice streaming" },
                    { id: "browser", label: "Browser Native", desc: "Zero-latency offline TTS" }
                  ].map(eng => (
                    <button
                      key={eng.id}
                      onClick={() => onChange({ voiceEngine: eng.id })}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        (settings.voiceEngine || "elevenlabs") === eng.id
                          ? "border-violet-500 bg-violet-500/15 text-white"
                          : "border-white/5 bg-slate-900/60 text-slate-400 hover:text-white"
                      }`}
                    >
                      <div className="text-xs font-bold font-mono">{eng.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{eng.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "visual" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl border border-white/5 bg-slate-900/40 space-y-3">
                <span className="text-xs font-bold text-white font-mono block">Visualizer Core Theme</span>
                <div className="grid grid-cols-3 gap-2.5">
                  {Object.entries(THEME_COLOR_MAP).map(([key, theme]) => (
                    <button
                      key={key}
                      onClick={() => onChange({ themeColor: key })}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        (settings.themeColor || "violet") === key
                          ? "border-white/40 bg-white/10"
                          : "border-white/5 bg-slate-900 hover:bg-slate-800"
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full shadow-lg"
                        style={{ backgroundColor: theme.hex }}
                      />
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-300">
                        {key}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl border border-white/5 bg-slate-900/40 space-y-3">
                <div className="flex items-center gap-2.5">
                  <Key size={16} className="text-violet-400" />
                  <span className="text-xs font-bold text-white font-mono">Google Gemini API Key</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Provide your personal Google Gemini API key to enable direct WebSocket streaming, audio generation, and multimodal visual analysis without server rate limits.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenApiKeyGate) onOpenApiKeyGate();
                  }}
                  className="w-full py-2 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
                >
                  Manage Gemini API Key
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/5 bg-slate-950/40 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-mono font-bold cursor-pointer transition-colors shadow-lg shadow-violet-600/30"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
}
