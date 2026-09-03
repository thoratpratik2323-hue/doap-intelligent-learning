import React, { useState } from 'react';
import { Copy, Check, Code, ExternalLink, Download, Image as ImageIcon } from 'lucide-react';

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
    <div 
      className="space-y-3 leading-relaxed text-sm sm:text-[15px]"
      style={{ color: 'var(--doap-text-prim, inherit)' }}
    >
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
                return (
                  <div key={lIdx} className="grid grid-cols-3 gap-2 p-2 rounded-xl border text-xs font-mono my-1" style={{ borderColor: 'var(--doap-border)', backgroundColor: 'var(--doap-surface-sec, #161616)' }}>
                    {cells.map((cell, cIdx) => (
                      <div key={cIdx} className="truncate" style={{ color: 'var(--doap-text-prim)' }}>
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
