import React, { useState, useEffect } from "react";
import { KeyRound, X, ExternalLink, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";

export function ApiKeyGate({ isOpen, onClose, onKeySaved }) {
  const [key, setKey] = useState("");
  const [savedKey, setSavedKey] = useState("");
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const existing = localStorage.getItem("gemini_api_key") || "";
      setSavedKey(existing);
      if (existing) {
        setKey(existing);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    const clean = key.trim();
    if (!clean) {
      localStorage.removeItem("gemini_api_key");
      setSavedKey("");
      setStatus("success");
      if (onKeySaved) onKeySaved("");
      setTimeout(() => onClose(), 800);
      return;
    }

    if (!clean.startsWith("AIza")) {
      setStatus("error");
      setErrorMsg("Google Gemini API keys usually begin with 'AIza...'. Please verify your key.");
      return;
    }

    try {
      localStorage.setItem("gemini_api_key", clean);
      setSavedKey(clean);
      setStatus("success");
      if (onKeySaved) onKeySaved(clean);
      setTimeout(() => onClose(), 800);
    } catch (e) {
      setStatus("error");
      setErrorMsg("Failed saving key to browser storage.");
    }
  };

  const handleClear = () => {
    localStorage.removeItem("gemini_api_key");
    setKey("");
    setSavedKey("");
    setStatus("success");
    if (onKeySaved) onKeySaved("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-md rounded-3xl border border-white/10 p-6 sm:p-7 shadow-2xl overflow-hidden animate-scale-in space-y-5"
        style={{
          backgroundColor: '#090D16',
          color: '#F8FAFC'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-violet-500/15 border border-violet-500/30 text-violet-400">
            <KeyRound size={20} />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">Google Gemini API Key</h3>
            <p className="text-xs text-slate-400 font-medium">Powering live voice, vision & memory</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          MYRAA can run using your personal Google Gemini API Key for direct low-latency WebSocket vision and voice streaming.
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
              Gemini API Key
            </label>
            <input
              type="password"
              value={key}
              onChange={e => {
                setKey(e.target.value);
                setStatus(null);
              }}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-violet-500"
            />
          </div>

          {status === "error" && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle size={14} className="shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {status === "success" && (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle2 size={14} className="shrink-0 text-emerald-400" />
              <span>API Key saved securely in your browser!</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            {savedKey ? (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-rose-400 hover:underline font-mono cursor-pointer"
              >
                Remove Saved Key
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-mono font-bold text-xs transition-colors shadow-lg shadow-violet-600/30 cursor-pointer"
              >
                Save Key
              </button>
            </div>
          </div>
        </form>

        <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-emerald-400" />
            <span>Stored locally in your browser</span>
          </div>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-violet-400 hover:underline font-mono"
          >
            Get Free Key <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}
