import React, { useState } from 'react';
import { Copy, Check, Code, ExternalLink, Download, Image as ImageIcon, HelpCircle, Brain, ChevronDown, Sparkles } from 'lucide-react';

const InteractiveQuizCard = ({ quiz, isDarkMode }) => {
  const [selected, setSelected] = useState(null);

  if (!quiz || !Array.isArray(quiz.options)) return null;

  const isAnswered = selected !== null;
  const isCorrect = selected === quiz.correctIndex;

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelected(idx);
  };

  return (
    <div 
      className="my-4 p-5 rounded-3xl border shadow-lg space-y-4 select-none"
      style={{
        backgroundColor: isDarkMode ? '#131316' : '#ffffff',
        borderColor: isDarkMode ? '#27272a' : '#e2e8f0'
      }}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3" style={{ borderColor: isDarkMode ? '#27272a' : '#e2e8f0' }}>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
            {quiz.domain || 'Technical Flash Quiz'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded-md border text-neutral-400" style={{ borderColor: isDarkMode ? '#27272a' : '#e2e8f0' }}>
            {quiz.topic}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
            {quiz.level}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="text-sm sm:text-base font-extrabold leading-relaxed" style={{ color: 'var(--doap-text-prim)' }}>
        {quiz.question}
      </div>

      {/* Clickable Options */}
      <div className="grid grid-cols-1 gap-2.5 pt-1">
        {quiz.options.map((opt, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const isSelected = selected === idx;
          const isTargetCorrect = idx === quiz.correctIndex;

          let btnBg = isDarkMode ? '#1c1c20' : '#f8fafc';
          let btnBorder = isDarkMode ? '#2b2b30' : '#e2e8f0';
          let textColor = 'var(--doap-text-prim)';

          if (isAnswered) {
            if (isTargetCorrect) {
              btnBg = 'rgba(16, 185, 129, 0.15)';
              btnBorder = '#10b981';
              textColor = '#10b981';
            } else if (isSelected && !isTargetCorrect) {
              btnBg = 'rgba(239, 68, 68, 0.15)';
              btnBorder = '#ef4444';
              textColor = '#ef4444';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
              className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 ${
                !isAnswered ? 'cursor-pointer hover:border-amber-400 hover:scale-[1.008]' : 'cursor-default'
              }`}
              style={{
                backgroundColor: btnBg,
                borderColor: btnBorder,
                color: textColor
              }}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-xl text-xs font-mono font-bold flex items-center justify-center shrink-0 border ${
                  isAnswered && isTargetCorrect 
                    ? 'bg-emerald-500 text-black border-emerald-400 font-extrabold' 
                    : isAnswered && isSelected 
                    ? 'bg-rose-500 text-white border-rose-400' 
                    : 'bg-black/20 text-neutral-400 border-white/10'
                }`}>
                  {letter}
                </span>
                <span>{opt}</span>
              </div>

              {isAnswered && isTargetCorrect && (
                <span className="text-emerald-400 text-xs font-bold font-mono shrink-0">✓ Correct</span>
              )}
              {isAnswered && isSelected && !isTargetCorrect && (
                <span className="text-rose-400 text-xs font-bold font-mono shrink-0">✗ Your Pick</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Answer & Explanation Box (HIDDEN until an option is clicked!) */}
      {isAnswered ? (
        <div 
          className="p-4 rounded-2xl border text-xs sm:text-sm space-y-2 animate-fade-in"
          style={{
            backgroundColor: isCorrect ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)',
            borderColor: isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'
          }}
        >
          <div className="flex items-center gap-2 font-bold font-mono">
            {isCorrect ? (
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span>🎉</span>
                <span>Excellent! Correct Answer: ({String.fromCharCode(65 + quiz.correctIndex)})</span>
              </span>
            ) : (
              <span className="text-amber-400 flex items-center gap-1.5">
                <span>💡</span>
                <span>Correct Answer: ({String.fromCharCode(65 + quiz.correctIndex)})</span>
              </span>
            )}
          </div>
          <p className="leading-relaxed" style={{ color: 'var(--doap-text-sec)' }}>
            {quiz.explanation}
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-neutral-500">
          <span>👆 Tap an option to test your answer</span>
          <button
            type="button"
            onClick={() => setSelected(-1)}
            className="text-neutral-400 hover:text-amber-400 underline cursor-pointer"
          >
            Reveal Answer
          </button>
        </div>
      )}
    </div>
  );
};

const CognitiveThinkingBlock = ({ content, isDarkMode, isStreaming = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const formattedContent = content
    .replace(/^#+\s+/gm, '• ')
    .trim();

  return (
    <div 
      className="my-3 rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm"
      style={{
        backgroundColor: isDarkMode ? '#0d1117' : '#f8fafc',
        borderColor: isDarkMode ? (isStreaming ? '#6366f1' : '#30363d') : (isStreaming ? '#6366f1' : '#e2e8f0')
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 flex items-center justify-between text-left text-xs sm:text-sm font-semibold cursor-pointer hover:opacity-95 transition-all select-none group"
        style={{
          color: isDarkMode ? '#e2e8f0' : '#1e293b',
          backgroundColor: isDarkMode ? 'rgba(99, 102, 241, 0.08)' : 'rgba(99, 102, 241, 0.05)'
        }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30">
            <Brain size={14} className={isStreaming ? 'animate-pulse text-indigo-300' : ''} />
          </div>
          <span className="font-mono text-xs sm:text-sm tracking-wide font-bold truncate">
            DOAP Deep Cognitive Thinking & Self-Reflection
          </span>
          {isStreaming ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 animate-pulse shrink-0">
              Thinking in progress...
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold shrink-0">
              Verified
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-neutral-400 group-hover:text-indigo-400 transition-colors shrink-0 ml-2">
          <span className="text-[11px] font-mono hidden sm:inline">{isOpen ? 'Hide reasoning' : 'View reasoning'}</span>
          <ChevronDown size={14} className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div 
          className="p-4 border-t text-xs sm:text-[13px] font-mono leading-relaxed space-y-2 whitespace-pre-wrap select-text max-h-96 overflow-y-auto scrollbar-thin animate-fade-in"
          style={{
            borderColor: isDarkMode ? '#21262d' : '#e2e8f0',
            color: isDarkMode ? '#94a3b8' : '#475569',
            backgroundColor: isDarkMode ? '#070a0e' : '#ffffff'
          }}
        >
          {formattedContent}
        </div>
      )}
    </div>
  );
};

export const MarkdownRenderer = ({ content, isDarkMode }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (codeText, index) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!content) return null;

  // Split by code blocks ```lang ... ``` or HTML <details> ... </details> or <think> ... </think> or active <think> ...
  const parts = content.split(/(```[\s\S]*?```|<details[\s\S]*?<\/details>|<think>[\s\S]*?<\/think>|<think>[\s\S]*$)/gi);

  return (
    <div 
      className="space-y-3 leading-relaxed text-sm sm:text-[15px]"
      style={{ color: 'var(--doap-text-prim, inherit)' }}
    >
      {parts.map((part, pIdx) => {
        if (!part) return null;

        // Metacognitive Deep Thinking Block: <think> ... </think> or active stream <think> ...
        if (/^<think>/i.test(part.trim())) {
          const isUnclosed = !/<\/think>$/i.test(part.trim());
          const thinkingText = part.trim().replace(/^<think>/i, '').replace(/<\/think>$/i, '').trim();
          if (thinkingText) {
            return (
              <CognitiveThinkingBlock 
                key={pIdx} 
                content={thinkingText} 
                isDarkMode={isDarkMode} 
                isStreaming={isUnclosed} 
              />
            );
          }
          return null;
        }

        // Fenced Code Block or Quiz Block
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.slice(3, -3).trim().split('\n');
          const firstLine = lines[0].trim();
          const hasLang = /^[a-zA-Z0-9_-]+$/.test(firstLine);
          const lang = hasLang ? firstLine : 'code';
          const codeBody = hasLang ? lines.slice(1).join('\n') : lines.join('\n');

          // Render interactive quiz widget if lang is quiz
          if (lang.toLowerCase() === 'quiz') {
            try {
              const quizData = JSON.parse(codeBody);
              return <InteractiveQuizCard key={pIdx} quiz={quizData} isDarkMode={isDarkMode} />;
            } catch (e) {
              console.warn('Could not parse quiz JSON:', e);
            }
          }

          return (
            <div 
              key={pIdx} 
              className="my-3.5 rounded-2xl overflow-hidden border font-mono text-xs sm:text-[13px] shadow-lg"
              style={{ 
                backgroundColor: isDarkMode ? '#09090b' : '#18181b', 
                borderColor: isDarkMode ? '#27272a' : '#3f3f46' 
              }}
            >
              <div className="px-4 py-2 bg-black/40 border-b border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1.5 uppercase font-bold text-neutral-200">
                  <Code size={13} />
                  <span>{lang}</span>
                </span>
                <button
                  onClick={() => handleCopy(codeBody, pIdx)}
                  className="flex items-center gap-1.5 hover:text-white px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 transition-colors cursor-pointer text-xs font-semibold"
                >
                  {copiedIndex === pIdx ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 sm:p-5 overflow-x-auto text-neutral-100 leading-relaxed scrollbar-thin text-xs sm:text-[13px] max-w-full whitespace-pre-wrap sm:whitespace-pre break-words">
                <code>{codeBody}</code>
              </pre>
            </div>
          );
        }

        // Collapsible <details>...</details>
        if (/^<details[\s\S]*?<\/details>$/i.test(part.trim())) {
          const raw = part.trim();
          const summaryMatch = raw.match(/<summary[\s\S]*?>([\s\S]*?)<\/summary>/i);
          const summaryText = summaryMatch ? summaryMatch[1].replace(/<[^>]+>/g, '').trim() : 'Click to View Answer & Explanation';
          const innerBody = raw
            .replace(/^<details[\s\S]*?>/i, '')
            .replace(/<summary[\s\S]*?<\/summary>/i, '')
            .replace(/<\/details>$/i, '')
            .trim();

          return (
            <details
              key={pIdx}
              className="my-3 rounded-2xl border transition-all overflow-hidden group select-none"
              style={{
                backgroundColor: isDarkMode ? '#131316' : '#f8fafc',
                borderColor: isDarkMode ? '#27272a' : '#e2e8f0'
              }}
            >
              <summary
                className="px-4 py-3 font-bold text-xs sm:text-sm cursor-pointer flex items-center justify-between gap-2 hover:opacity-90 transition-opacity list-none"
                style={{ color: 'var(--doap-text-prim)' }}
              >
                <div className="flex items-center gap-2">
                  <span>💡</span>
                  <span>{summaryText}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md border text-neutral-400 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div
                className="px-4 pb-4 pt-2 text-xs sm:text-sm leading-relaxed border-t"
                style={{
                  borderColor: isDarkMode ? '#27272a' : '#e2e8f0',
                  color: 'var(--doap-text-sec)'
                }}
              >
                <MarkdownRenderer content={innerBody} isDarkMode={isDarkMode} />
              </div>
            </details>
          );
        }

        // Regular Markdown Text
        const paragraphs = part.split('\n');

        return (
          <div key={pIdx} className="space-y-2">
            {paragraphs.map((line, lIdx) => {
              const trimmed = line.trim();
              if (!trimmed) return null;

              // Image format: ![alt](url) anywhere in line
              const imgRegex = /!\[(.*?)\]\((https?:\/\/[^\s)]+)\)/;
              const imgMatch = trimmed.match(imgRegex);
              if (imgMatch) {
                const alt = imgMatch[1] || 'Generated Art';
                const src = imgMatch[2];
                return (
                  <div key={lIdx} className="my-3.5 rounded-2xl overflow-hidden border border-neutral-700/60 shadow-2xl max-w-2xl bg-black/40 group relative">
                    <img 
                      src={src} 
                      alt={alt} 
                      className="w-full h-auto object-cover max-h-[500px] transition-transform duration-300 group-hover:scale-[1.01]" 
                      loading="lazy" 
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs text-white/90 font-medium truncate max-w-[70%]">
                        {alt}
                      </span>
                      <a
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        download="ai-generated-artwork.png"
                        className="px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-white/30 transition-colors"
                      >
                        <Download size={12} />
                        <span>Download</span>
                      </a>
                    </div>
                  </div>
                );
              }

              // Header 1/2: # Title or ## Title
              if (trimmed.startsWith('# ') || trimmed.startsWith('## ')) {
                const titleText = trimmed.replace(/^#+\s*/, '');
                return (
                  <h2 
                    key={lIdx} 
                    className="text-lg sm:text-xl font-black pt-3 pb-1 border-b"
                    style={{ 
                      color: 'var(--doap-text-prim, inherit)',
                      borderColor: 'var(--doap-border, #333)'
                    }}
                  >
                    {formatInline(titleText, isDarkMode)}
                  </h2>
                );
              }

              // Header 3: ### Title
              if (trimmed.startsWith('### ')) {
                return (
                  <h3 
                    key={lIdx} 
                    className="text-base sm:text-lg font-extrabold pt-2.5 pb-1 border-b"
                    style={{ 
                      color: 'var(--doap-text-prim, inherit)',
                      borderColor: 'var(--doap-border, #333)'
                    }}
                  >
                    {formatInline(trimmed.slice(4), isDarkMode)}
                  </h3>
                );
              }

              // Header 4: #### Title
              if (trimmed.startsWith('#### ')) {
                return (
                  <h4 
                    key={lIdx} 
                    className="text-sm sm:text-base font-bold pt-2"
                    style={{ color: 'var(--doap-text-prim, inherit)' }}
                  >
                    {formatInline(trimmed.slice(5), isDarkMode)}
                  </h4>
                );
              }

              // Bullet points: - or *
              if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                return (
                  <div key={lIdx} className="flex items-start gap-2.5 pl-2">
                    <span 
                      className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" 
                      style={{ backgroundColor: 'var(--doap-text-sec, #888)' }}
                    />
                    <span className="flex-1" style={{ color: 'var(--doap-text-prim, inherit)' }}>
                      {formatInline(trimmed.slice(2), isDarkMode)}
                    </span>
                  </div>
                );
              }

              // Numbered list: 1. 2. 3.
              const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
              if (numMatch) {
                return (
                  <div key={lIdx} className="flex items-start gap-2.5 pl-2">
                    <span 
                      className="font-mono font-bold text-xs shrink-0 mt-0.5"
                      style={{ color: 'var(--doap-text-sec, #888)' }}
                    >
                      {numMatch[1]}.
                    </span>
                    <span className="flex-1" style={{ color: 'var(--doap-text-prim, inherit)' }}>
                      {formatInline(numMatch[2], isDarkMode)}
                    </span>
                  </div>
                );
              }

              // Table row format: | col1 | col2 |
              if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
                if (trimmed.includes('---')) return null; // Separator row
                const cells = trimmed.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
                const colCount = Math.max(1, cells.length);
                return (
                  <div 
                    key={lIdx} 
                    className="gap-2.5 p-2.5 rounded-xl border text-xs font-mono my-1 items-center" 
                    style={{ 
                      display: 'grid',
                      gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
                      borderColor: 'var(--doap-border)', 
                      backgroundColor: 'var(--doap-surface-sec, #161616)' 
                    }}
                  >
                    {cells.map((cell, cIdx) => (
                      <div key={cIdx} className="break-words font-medium" style={{ color: 'var(--doap-text-prim)' }}>
                        {formatInline(cell.trim(), isDarkMode)}
                      </div>
                    ))}
                  </div>
                );
              }

              // Horizontal Rule: ---
              if (trimmed === '---') {
                return (
                  <hr 
                    key={lIdx} 
                    className="my-3" 
                    style={{ borderColor: 'var(--doap-border, #333)' }} 
                  />
                );
              }

              // Normal Paragraph
              return (
                <p 
                  key={lIdx} 
                  className="leading-relaxed"
                  style={{ color: 'var(--doap-text-prim, inherit)' }}
                >
                  {formatInline(line, isDarkMode)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

// Formats **bold**, `inline code`, [links](url)
function formatInline(str, isDarkMode) {
  if (!str) return '';

  // 1. Process Links [label](url)
  const linkParts = str.split(/(\[[^\]]+\]\([^)]+\))/g);
  return linkParts.map((lPart, lIdx) => {
    const linkMatch = lPart.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a
          key={lIdx}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-emerald-500 underline hover:text-emerald-400 transition-colors"
        >
          <span>{linkMatch[1]}</span>
          <ExternalLink size={12} />
        </a>
      );
    }

    // 2. Process inline code `...`
    const codeParts = lPart.split(/(`[^`]+`)/g);
    return codeParts.map((cPart, cIdx) => {
      if (cPart.startsWith('`') && cPart.endsWith('`')) {
        return (
          <code 
            key={`${lIdx}-${cIdx}`} 
            className="px-1.5 py-0.5 mx-0.5 rounded-md font-mono text-xs border"
            style={{
              backgroundColor: isDarkMode ? '#27272a' : '#f4f4f5',
              borderColor: isDarkMode ? '#3f3f46' : '#e4e4e7',
              color: isDarkMode ? '#fde047' : '#b45309'
            }}
          >
            {cPart.slice(1, -1)}
          </code>
        );
      }

      // 3. Process **bold**
      const boldParts = cPart.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((bPart, bIdx) => {
        if (bPart.startsWith('**') && bPart.endsWith('**')) {
          return (
            <strong 
              key={`${lIdx}-${cIdx}-${bIdx}`} 
              className="font-bold"
              style={{ color: 'var(--doap-text-prim, inherit)' }}
            >
              {bPart.slice(2, -2)}
            </strong>
          );
        }
        return bPart;
      });
    });
  });
}
