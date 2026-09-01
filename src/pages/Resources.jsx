import React, { useState } from 'react';
import { Search, FileText, Video, BookOpen, ChevronRight } from 'lucide-react';
import { RESOURCES_DATA } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export const Resources = () => {
  const { isDarkMode } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedSemester, setSelectedSemester] = useState('All Semesters');
  const [selectedType, setSelectedType] = useState('All Types');

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
            className={`p-4 rounded-2xl flex items-center justify-between transition-all border ${
              isDarkMode 
                ? 'bg-[#111111] border-neutral-800 text-white hover:border-neutral-700' 
                : 'bg-white border-neutral-200 text-black hover:border-neutral-300'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-100 border-neutral-200 text-black'
              }`}>
                {getIconForType(res.type)}
              </div>

              <div className="space-y-0.5">
                <h4 className="text-sm font-bold">{res.title}</h4>
                <p className={`text-xs font-mono ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  {res.subject} • {res.semester} • {res.size} • {res.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-[11px] font-mono border ${
                isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
              }`}>
                {res.type}
              </span>
              <ChevronRight size={16} className={isDarkMode ? "text-neutral-600" : "text-neutral-400"} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
