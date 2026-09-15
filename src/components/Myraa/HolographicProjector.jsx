import React from "react";
import { ExternalLink, X, ShieldAlert, Monitor } from "lucide-react";

export function HolographicProjector({ url, onClose }) {
  if (!url) return null;

  const formattedUrl = url.startsWith("http://") || url.startsWith("https://") 
    ? url 
    : `https://${url}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-4xl h-[82vh] flex flex-col rounded-3xl border border-white/10 bg-slate-900/90 shadow-[0_0_80px_-20px_rgba(139,92,246,0.5)] backdrop-blur-2xl overflow-hidden animate-scale-in">
        
        {/* Radar grid backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_60%)] pointer-events-none" />

        {/* Header bar */}
        <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-violet-400 font-bold">
                MYRAA Holographic Projector Link
              </h3>
              <p className="text-sm font-semibold text-white truncate max-w-md">{formattedUrl}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={formattedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-violet-600 hover:border-violet-500 text-xs font-mono font-semibold text-white transition duration-200"
            >
              <ExternalLink size={14} />
              Open in New Tab
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-rose-500 hover:border-rose-400 text-slate-400 hover:text-white transition duration-200 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Embedded page display */}
        <div className="relative flex-1 w-full bg-slate-950/40 overflow-hidden">
          <iframe
            src={formattedUrl}
            title={`Holographic Projector: ${formattedUrl}`}
            className="w-full h-full border-none bg-slate-950"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            referrerPolicy="no-referrer"
          />

          {/* Sandbox disclaimer */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-start gap-3 p-3.5 rounded-2xl border border-amber-500/20 bg-amber-950/40 backdrop-blur-xl">
            <ShieldAlert className="text-amber-400 shrink-0 mt-0.5" size={16} />
            <div className="text-left text-xs">
              <span className="font-bold text-amber-200">Interactive Sandbox Notice: </span>
              <span className="text-amber-300">
                If the webpage restricts iframe embedding, click below to open in full tab.
              </span>
              <a
                href={formattedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 ml-2 font-bold text-violet-300 hover:underline"
              >
                Launch directly <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between px-6 py-3 border-t border-white/5 bg-slate-950/30 text-[10px] font-mono tracking-widest text-slate-500">
          <div className="flex items-center gap-2">
            <Monitor size={12} className="text-violet-400" />
            <span>EXTERNAL BROWSER INTEGRATION PROTOCOL - ACTIVE</span>
          </div>
          <span className="text-emerald-400 font-bold">READY</span>
        </div>
      </div>
    </div>
  );
}
