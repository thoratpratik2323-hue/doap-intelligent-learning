import React, { useState } from 'react';
import { Copy, Check, Terminal, Code } from 'lucide-react';

export const MarkdownRenderer = ({ content, isDarkMode }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (codeText, index) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!content) return null;

  // Split by code blocks ```lang ... ```
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-4 leading-relaxed text-sm sm:text-[15px]">
      {parts.map((part, pIdx) => {
        // Fenced Code Block
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.slice(3, -3).trim().split('\n');
          const firstLine = lines[0].trim();
          const hasLang = /^[a-zA-Z0-9_-]+$/.test(firstLine);
          const lang = hasLang ? firstLine : 'code';
          const codeBody = hasLang ? lines.slice(1).join('\n') : lines.join('\n');

          return (
            <div 
              key={pIdx} 
              className="my-4 rounded-2xl overflow-hidden border font-mono text-xs sm:text-[13px] shadow-lg"
              style={{ backgroundColor: '#09090b', borderColor: '#27272a' }}
            >
              <div className="px-4 py-2.5 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1.5 uppercase font-bold text-neutral-200">
                  <Code size={14} />
                  <span>{lang}</span>
                </span>
                <button
                  onClick={() => handleCopy(codeBody, pIdx)}
                  className="flex items-center gap-1.5 hover:text-white px-2.5 py-1 rounded-lg border border-neutral-700/50 bg-neutral-800/60 transition-colors cursor-pointer text-xs font-semibold"
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

              <pre className="p-4 sm:p-5 overflow-x-auto text-neutral-200 leading-relaxed scrollbar-thin text-xs sm:text-[13px] max-w-full whitespace-pre-wrap sm:whitespace-pre break-words">
                <code>{codeBody}</code>
              </pre>
            </div>
          );
        }

        // Regular Markdown Text
        const paragraphs = part.split('\n');

        return (
          <div key={pIdx} className="space-y-2.5">
            {paragraphs.map((line, lIdx) => {
              const trimmed = line.trim();
              if (!trimmed) return null;

              // Header 3: ### Title
              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={lIdx} className="text-lg sm:text-xl font-extrabold pt-3 pb-1 text-white border-b border-neutral-800/80">
                    {formatInline(trimmed.slice(4))}
                  </h3>
                );
              }

              // Header 4: #### Title
              if (trimmed.startsWith('#### ')) {
                return (
                  <h4 key={lIdx} className="text-base sm:text-lg font-bold pt-2 text-neutral-100">
                    {formatInline(trimmed.slice(5))}
                  </h4>
                );
              }

              // Bullet points: - or *
              if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                return (
                  <div key={lIdx} className="flex items-start gap-3 pl-2 text-neutral-200">
                    <span className="w-2 h-2 rounded-full bg-neutral-400 mt-2 shrink-0" />
                    <span className="flex-1">{formatInline(trimmed.slice(2))}</span>
                  </div>
                );
              }

              // Numbered list: 1. 2. 3.
              const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
              if (numMatch) {
                return (
                  <div key={lIdx} className="flex items-start gap-3 pl-2 text-neutral-200">
                    <span className="font-mono font-bold text-neutral-400 text-sm shrink-0 mt-0.5">{numMatch[1]}.</span>
                    <span className="flex-1">{formatInline(numMatch[2])}</span>
                  </div>
                );
              }

              // Horizontal Rule: ---
              if (trimmed === '---') {
                return <hr key={lIdx} className="my-4 border-neutral-800" />;
              }

              return (
                <p key={lIdx} className="leading-relaxed text-neutral-200">
                  {formatInline(line)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

// Formats **bold**, `inline code`, and math symbols
function formatInline(str) {
  if (!str) return '';

  // Split by inline code `...`
  const codeParts = str.split(/(`[^`]+`)/g);

  return codeParts.map((cPart, cIdx) => {
    if (cPart.startsWith('`') && cPart.endsWith('`')) {
      return (
        <code 
          key={cIdx} 
          className="px-1.5 py-0.5 mx-0.5 rounded-md font-mono text-[11px] bg-neutral-800 text-amber-300 border border-neutral-700"
        >
          {cPart.slice(1, -1)}
        </code>
      );
    }

    // Split by **bold**
    const boldParts = cPart.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((bPart, bIdx) => {
      if (bPart.startsWith('**') && bPart.endsWith('**')) {
        return (
          <strong key={bIdx} className="font-bold text-white">
            {bPart.slice(2, -2)}
          </strong>
        );
      }
      return bPart;
    });
  });
}
