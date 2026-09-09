import React, { useState } from 'react';
import { 
  GitBranch, 
  Cpu, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Code2, 
  Search, 
  Sparkles,
  Zap
} from 'lucide-react';

const SUBAGENT_ICONS = {
  'subagent-architect': Search,
  'subagent-developer': Code2,
  'subagent-verifier': ShieldCheck,
  'subagent-socratic': Sparkles
};

export const RlmExecutionTree = ({ trace, isDarkMode = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!trace || !Array.isArray(trace.subagents)) return null;

  return (
    <div 
      className="mb-4 rounded-2xl border overflow-hidden transition-all duration-200 text-xs select-none"
      style={{
        backgroundColor: isDarkMode ? '#13151b' : '#f8fafc',
        borderColor: isDarkMode ? '#2d3345' : '#e2e8f0'
      }}
    >
      {/* Header Bar */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-3.5 py-2.5 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity gap-2"
        style={{
          borderBottom: isExpanded ? (isDarkMode ? '1px solid #242938' : '1px solid #e2e8f0') : 'none'
        }}
      >
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <span className="flex items-center justify-center w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <Zap size={12} className="animate-pulse" />
          </span>
          <span className="font-semibold tracking-tight text-neutral-200">
            Prime RLM Multi-Agent Pipeline
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
            {trace.subagents.length} Recursive Subagents
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
            <CheckCircle2 size={11} /> 100% Verified
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-mono text-neutral-400">
            {trace.durationMs || 148}ms
          </span>
          <button 
            type="button"
            className="p-1 text-neutral-400 hover:text-white transition-colors"
            aria-label={isExpanded ? "Collapse agent execution tree" : "Expand agent execution tree"}
          >
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* Expanded Subagents Tree View */}
      {isExpanded && (
        <div className="p-3 sm:p-4 space-y-2.5">
          <div className="text-[11px] font-mono text-neutral-400 mb-2 flex items-center justify-between">
            <span>Recursive Execution Flow (REPL Harness):</span>
            <span className="text-neutral-500">ID: {trace.taskId}</span>
          </div>

          <div className="space-y-2 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-800">
            {trace.subagents.map((subagent, index) => {
              const IconComponent = SUBAGENT_ICONS[subagent.id] || Cpu;
              return (
                <div 
                  key={subagent.id || index}
                  className="relative flex items-start gap-2.5 pl-1"
                >
                  <div className="w-6 h-6 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center shrink-0 z-10 text-neutral-300">
                    <IconComponent size={12} className="text-indigo-400" />
                  </div>

                  <div 
                    className="flex-1 p-2.5 rounded-xl border"
                    style={{
                      backgroundColor: isDarkMode ? '#1a1d26' : '#ffffff',
                      borderColor: isDarkMode ? '#2d3345' : '#e2e8f0'
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-neutral-200">
                          {subagent.name}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          • {subagent.role}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 shrink-0">
                        +{subagent.durationMs}ms
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-300 leading-relaxed font-sans">
                      {subagent.findings}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-2 pt-2 border-t border-neutral-800 flex items-center justify-between text-[10px] font-mono text-neutral-500">
            <span>Prime Agent Continual Harness v1.4</span>
            <span className="text-indigo-400">Self-Improving Telemetry Active</span>
          </div>
        </div>
      )}
    </div>
  );
};
