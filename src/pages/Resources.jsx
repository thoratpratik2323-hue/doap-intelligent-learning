import React, { useState } from 'react';
import { Search, FileText, Video, BookOpen, ChevronRight, Download, Copy, Check, X, Clock, Sparkles } from 'lucide-react';
import { RESOURCES_DATA } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export const Resources = () => {
  const { isDarkMode, activeAccentHex } = useTheme();
  const accentHex = activeAccentHex || 'var(--doap-accent, #ffffff)';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedSemester, setSelectedSemester] = useState('All Semesters');
  const [selectedType, setSelectedType] = useState('All Types');
  const [activeResourceModal, setActiveResourceModal] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const subjects = ["All Subjects", "Computer Science", "AI", "Mathematics", "Communication", "Career"];
  const semesters = ["All Semesters", "Semester 1", "Semester 2", "Semester 3", "Semester 4"];
  const types = ["All Types", "Lecture Notes", "PDF", "Video", "Book", "Question Paper", "Assignment"];

  const filteredResources = RESOURCES_DATA.filter(r => {
    const matchQuery = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSubject = selectedSubject === 'All Subjects' || r.subject === selectedSubject;
    const matchSemester = selectedSemester === 'All Semesters' || r.semester === selectedSemester;
    const matchType = selectedType === 'All Types' || r.type === selectedType;
    return matchQuery && matchSubject && matchSemester && matchType;
  });

  const getIconForType = (type) => {
    switch (type) {
      case 'Video': return <Video size={18} />;
      case 'Book': return <BookOpen size={18} />;
      default: return <FileText size={18} />;
    }
  };

  const handleDownload = (res) => {
    if (!res) return;
    const content = `# ${res.title}\nSubject: ${res.subject} | Semester: ${res.semester}\nEstimated Reading Time: ${res.readingTime || '30 min'}\nType: ${res.type}\n\n## Summary\n${res.summary || ''}\n\n## Key Concepts Covered\n${(res.keyTopics || []).map(t => `- ${t}`).join('\n')}\n\nDownloaded from DOAP — Discover Opportunities and Progress Platform.`;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${res.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2500);
  };

  const handleCopySummary = (res) => {
    if (!res) return;
    const text = `${res.title} (${res.subject})\n${res.summary}\nKey Topics: ${(res.keyTopics || []).join(', ')}`;
    navigator.clipboard?.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8 space-y-8 animate-fade-in select-none">
      {/* Header */}
      <div className="space-y-1">
        <h1 className={`text-3xl font-bold tracking-tight ${
          isDarkMode ? 'text-white' : 'text-[#0a0a0a]'
        }`}>Resources</h1>
        <p className={`text-xs font-mono uppercase tracking-wider ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>Curated technical learning materials, lecture notes & guides</p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-full">
        <Search size={18} className={`absolute left-4 top-3.5 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
        <input 
          type="text" 
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-sm focus:outline-none transition-all ${
            isDarkMode 
              ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-white' 
              : 'bg-white border-neutral-200 text-black placeholder-neutral-400 focus:border-black'
          }`}
        />
      </div>

      {/* Filter Rows */}
      <div className="space-y-3">
        {/* Subject Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`
                px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border
                ${selectedSubject === sub 
                  ? (isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black') 
                  : (isDarkMode ? 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white' : 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:text-black')
                }
              `}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Semester & Type Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {semesters.map((sem) => (
            <button
              key={sem}
              onClick={() => setSelectedSemester(sem)}
              className={`
                px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer border
                ${selectedSemester === sem 
                  ? (isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black') 
                  : (isDarkMode ? 'bg-neutral-900 text-neutral-400 border-neutral-800' : 'bg-neutral-100 text-neutral-600 border-neutral-200')
                }
              `}
            >
              {sem}
            </button>
          ))}

          <span className="text-neutral-500">|</span>

          {types.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`
                px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer border
                ${selectedType === t 
                  ? (isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black') 
                  : (isDarkMode ? 'bg-neutral-900 text-neutral-400 border-neutral-800' : 'bg-neutral-100 text-neutral-600 border-neutral-200')
                }
              `}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Count Indicator */}
      <div className={`text-xs font-mono ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
        {filteredResources.length} RESOURCES FOUND
      </div>

      {/* Resource List Items */}
      <div className="space-y-3">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            onClick={() => setActiveResourceModal(res)}
            className={`p-4 rounded-2xl flex items-center justify-between transition-all border cursor-pointer group ${
              isDarkMode 
                ? 'bg-[#111111] border-neutral-800 text-white hover:border-cyan-500/50 hover:bg-neutral-900/60' 
                : 'bg-white border-neutral-200 text-black hover:border-cyan-500/50 hover:bg-neutral-50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 ${
                isDarkMode ? 'bg-neutral-900 border-neutral-800 text-cyan-400' : 'bg-cyan-50 border-cyan-200 text-cyan-700'
              }`}>
                {getIconForType(res.type)}
              </div>

              <div className="space-y-0.5">
                <h4 className="text-sm font-bold group-hover:text-cyan-400 transition-colors">{res.title}</h4>
                <p className={`text-xs font-mono ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  {res.subject} • {res.semester} • {res.readingTime ? `⏱ ${res.readingTime} • ` : ''}{res.size} • {res.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-[11px] font-mono border ${
                isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
              }`}>
                {res.type}
              </span>
              <ChevronRight size={16} className={`transition-transform group-hover:translate-x-1 ${isDarkMode ? "text-neutral-600 group-hover:text-cyan-400" : "text-neutral-400 group-hover:text-cyan-600"}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Resource Inspection & Download Modal */}
      {activeResourceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
          <div 
            className={`w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
              isDarkMode 
                ? 'bg-[#0c0f17] border-neutral-800 text-white shadow-black/90' 
                : 'bg-white border-neutral-200 text-neutral-900 shadow-2xl'
            }`}
          >
            {/* Modal Header */}
            <div className={`px-6 py-4 border-b flex items-center justify-between ${
              isDarkMode ? 'bg-[#121622] border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl border ${
                  isDarkMode ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                }`}>
                  {getIconForType(activeResourceModal.type)}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                    {activeResourceModal.subject} • {activeResourceModal.semester}
                  </span>
                  <h3 className="text-base font-bold truncate max-w-sm sm:max-w-md">{activeResourceModal.title}</h3>
                </div>
              </div>

              <button 
                onClick={() => setActiveResourceModal(null)}
                className={`p-2 rounded-full border transition-colors cursor-pointer ${
                  isDarkMode 
                    ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800' 
                    : 'bg-neutral-100 border-neutral-300 text-neutral-600 hover:text-black hover:bg-neutral-200'
                }`}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-4 scrollbar-thin text-xs sm:text-sm">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className={`px-2.5 py-1 rounded-lg border ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                }`}>
                  📁 {activeResourceModal.type}
                </span>
                <span className={`px-2.5 py-1 rounded-lg border ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                }`}>
                  💾 {activeResourceModal.size}
                </span>
                {activeResourceModal.readingTime && (
                  <span className={`px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
                    isDarkMode ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300' : 'bg-cyan-50 border-cyan-200 text-cyan-700'
                  }`}>
                    <Clock size={12} />
                    <span>Est. {activeResourceModal.readingTime}</span>
                  </span>
                )}
              </div>

              {/* Summary Description */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  Document Overview
                </h4>
                <p className={`text-xs sm:text-[13px] leading-relaxed p-3.5 rounded-2xl border ${
                  isDarkMode ? 'bg-black/40 border-neutral-800 text-neutral-200' : 'bg-neutral-50 border-neutral-200 text-neutral-800'
                }`}>
                  {activeResourceModal.summary || "Comprehensive official engineering notes curated for Sanjivani students."}
                </p>
              </div>

              {/* Key Topics List */}
              {activeResourceModal.keyTopics && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    Core Engineering Topics Covered
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeResourceModal.keyTopics.map((topic, idx) => (
                      <div 
                        key={idx} 
                        className={`p-2.5 rounded-xl border text-xs font-mono flex items-center gap-2 ${
                          isDarkMode ? 'bg-neutral-900/60 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-800'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className={`p-4 border-t flex flex-wrap items-center justify-between gap-3 ${
              isDarkMode ? 'bg-[#0e121d] border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <button
                type="button"
                onClick={() => handleCopySummary(activeResourceModal)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 cursor-pointer transition-colors ${
                  isDarkMode 
                    ? 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700 text-neutral-200' 
                    : 'bg-white hover:bg-neutral-100 border-neutral-300 text-neutral-800'
                }`}
              >
                {isCopied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{isCopied ? 'Copied Summary!' : 'Copy Summary'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownload(activeResourceModal)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
              >
                {isDownloaded ? <Check size={14} /> : <Download size={14} />}
                <span>{isDownloaded ? 'Downloaded Document!' : 'Download Resource (.md)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
