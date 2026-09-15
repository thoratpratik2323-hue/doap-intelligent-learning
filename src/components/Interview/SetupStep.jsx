import React, { useState } from 'react';
import { Play, Sparkles, FileText, ChevronRight, Check, ArrowRight, Building2 } from 'lucide-react';
import { POSITIONS_LIST, COMPANY_TRACKS } from '../../data/positionsData';
import { useTheme } from '../../context/ThemeContext';

export const SetupStep = ({ onNext }) => {
  const { isDarkMode, activeAccentHex } = useTheme();
  const accentHex = activeAccentHex || '#9333EA';

  const [selectedCompanyTrack, setSelectedCompanyTrack] = useState('google');
  const [selectedPositionId, setSelectedPositionId] = useState('software-engineer');
  const [selectedType, setSelectedType] = useState('Technical');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Intermediate');
  const [selectedDuration, setSelectedDuration] = useState('30 min');
  const [jobDescription, setJobDescription] = useState('');
  const [showJdInput, setShowJdInput] = useState(false);

  const interviewTypes = ["Technical", "HR", "Behavioral", "System Design", "Mock"];
  const difficulties = ["Beginner", "Intermediate", "Senior", "Lead"];
  const durations = ["15 min", "30 min", "45 min", "60 min"];

  const selectedPosition = POSITIONS_LIST.find(p => p.id === selectedPositionId) || POSITIONS_LIST[0];

  const handleProceed = () => {
    onNext({
      positionId: selectedPosition.id,
      positionTitle: selectedPosition.title,
      type: selectedType,
      difficulty: selectedDifficulty,
      duration: selectedDuration,
      jobDescription: jobDescription,
      companyTrackId: selectedCompanyTrack
    });
  };

  return (
    <div className="space-y-8 animate-fade-in select-none">
      {/* Quick Action Top Bar */}
      <div 
        className="p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm transition-colors"
        style={{
          backgroundColor: isDarkMode ? 'rgba(15, 20, 35, 0.95)' : '#FFFFFF',
          borderColor: isDarkMode ? 'rgba(147, 51, 234, 0.20)' : '#E2E8F0',
        }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white shrink-0 bg-[#9333EA] shadow-md shadow-[#9333EA]/20"
          >
            ✓
          </div>
          <div>
            <h3 className="text-sm font-bold" style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}>
              {selectedCompanyTrack 
                ? `${COMPANY_TRACKS.find(t => t.id === selectedCompanyTrack)?.name} • ${selectedPosition.title}`
                : `Selected: ${selectedPosition.title}`}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}>
              {selectedType} Interview • {selectedDifficulty} • {selectedDuration}
            </p>
          </div>
        </div>

        <button
          onClick={handleProceed}
          className="px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#7e22ce] text-white bg-[#9333EA] self-stretch sm:self-auto active:scale-[0.99]"
        >
          <span>Continue ➔ Next Step</span>
        </button>
      </div>

      {/* Target Company Track Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider block" style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}>
            1. Target Company Track (Recruiter Mode)
          </span>
          {selectedCompanyTrack && (
            <button
              onClick={() => setSelectedCompanyTrack(null)}
              className="text-xs font-medium hover:underline cursor-pointer"
              style={{ color: '#9333EA' }}
            >
              Reset to General Role
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {COMPANY_TRACKS.map((track) => {
            const isSelected = selectedCompanyTrack === track.id;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setSelectedCompanyTrack(track.id)}
                className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? isDarkMode
                      ? 'border-[#9333EA] bg-[#9333EA]/15 shadow-md shadow-[#9333EA]/20'
                      : 'border-[#9333EA] bg-[#FAF5FF] shadow-sm shadow-[#9333EA]/10'
                    : isDarkMode
                    ? 'border-[#9333EA]/15 bg-[#0F1424] hover:border-[#9333EA]/40'
                    : 'border-[#E2E8F0] bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs" style={{ color: isSelected ? '#9333EA' : (isDarkMode ? '#F8FAFC' : '#0F172A') }}>
                    {track.name}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#9333EA]" />
                  )}
                </div>
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded truncate block ${
                  isDarkMode
                    ? 'bg-black/30 text-neutral-300 border border-white/5'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}>
                  {track.badge}
                </span>
              </button>
            );
          })}
        </div>

        {selectedCompanyTrack && (
          <div className={`p-3.5 rounded-xl border text-xs font-medium flex items-center gap-2 animate-fade-in ${
            isDarkMode
              ? 'bg-purple-950/30 border-purple-800 text-purple-200'
              : 'bg-purple-50 border-purple-200 text-purple-900'
          }`}>
            <Sparkles size={14} className="text-[#9333EA] shrink-0" />
            <span>
              <strong className="font-semibold">{COMPANY_TRACKS.find(t => t.id === selectedCompanyTrack)?.name} Active:</strong>{' '}
              {COMPANY_TRACKS.find(t => t.id === selectedCompanyTrack)?.rubric}
            </span>
          </div>
        )}
      </div>

      {/* Position Selection */}
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider block" style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}>
          2. Target Position / Job Role
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {POSITIONS_LIST.map((pos) => {
            const isSelected = selectedPositionId === pos.id;
            return (
              <button
                key={pos.id}
                onClick={() => setSelectedPositionId(pos.id)}
                className={`p-4 rounded-xl text-left transition-all cursor-pointer border flex flex-col justify-between space-y-2 hover-glide ${
                  isSelected
                    ? isDarkMode
                      ? 'border-[#9333EA] bg-[#9333EA]/15 shadow-md shadow-[#9333EA]/20'
                      : 'border-[#9333EA] bg-[#FAF5FF] shadow-sm'
                    : isDarkMode
                    ? 'border-[#9333EA]/15 bg-[#0F1424] hover:border-[#9333EA]/40'
                    : 'border-[#E2E8F0] bg-white hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm" style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}>
                    {pos.title}
                  </span>
                  {isSelected && (
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[11px] font-bold bg-[#9333EA]"
                    >
                      ✓
                    </div>
                  )}
                </div>
                <p className="text-xs font-normal leading-relaxed line-clamp-2" style={{ color: isDarkMode ? '#94A3B8' : '#475569' }}>
                  {pos.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Optional Job Description Paste */}
      <div 
        className="p-5 rounded-2xl space-y-3 border shadow-sm transition-colors"
        style={{
          backgroundColor: isDarkMode ? 'rgba(15, 20, 35, 0.95)' : '#FFFFFF',
          borderColor: isDarkMode ? 'rgba(147, 51, 234, 0.20)' : '#E2E8F0',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-[#9333EA]" />
            <span className="text-sm font-bold" style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}>
              Custom Job Description (Optional)
            </span>
          </div>
          <button
            onClick={() => setShowJdInput(!showJdInput)}
            className="text-xs font-bold hover:underline cursor-pointer"
            style={{ color: '#9333EA' }}
          >
            {showJdInput ? "Hide Field" : "+ Paste Job Posting"}
          </button>
        </div>

        {showJdInput && (
          <div className="space-y-2 pt-2">
            <textarea
              rows={4}
              placeholder="Paste the job description here (e.g. required skills, technologies, responsibilities)..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className={`w-full p-3.5 rounded-xl border text-xs focus:outline-none resize-none transition-colors ${
                isDarkMode
                  ? 'bg-[#0F1424] border-[#9333EA]/25 text-[#F8FAFC] placeholder-[#64748B]'
                  : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] placeholder-[#94A3B8]'
              }`}
            />
            <p className="text-xs" style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}>
              💡 Questions will automatically adapt to match the exact requirements of your target position.
            </p>
          </div>
        )}
      </div>

      {/* Type, Difficulty & Duration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Type */}
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider block" style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}>
            3. Interview Type
          </span>
          <div className="space-y-2">
            {interviewTypes.map((type) => {
              const isSelected = selectedType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={(e) => { e.preventDefault(); setSelectedType(type); }}
                  className={`w-full p-3 rounded-xl font-semibold text-xs transition-all cursor-pointer border flex items-center justify-between active:scale-[0.98] ${
                    isSelected
                      ? 'bg-[#9333EA] text-white border-[#9333EA] shadow-md shadow-[#9333EA]/30'
                      : isDarkMode
                      ? 'border-[#9333EA]/20 bg-[#0F1424] text-[#94A3B8] hover:border-[#9333EA]/50 hover:text-white'
                      : 'border-[#E2E8F0] bg-white text-[#334155] hover:border-[#9333EA]/50 hover:bg-[#FAF5FF]'
                  }`}
                >
                  <span>{type}</span>
                  {isSelected ? (
                    <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                      <Check size={11} className="text-white font-bold" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty */}
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider block" style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}>
            4. Seniority / Difficulty Level
          </span>
          <div className="space-y-2">
            {difficulties.map((diff) => {
              const isSelected = selectedDifficulty === diff;
              return (
                <button
                  key={diff}
                  type="button"
                  onClick={(e) => { e.preventDefault(); setSelectedDifficulty(diff); }}
                  className={`w-full p-3 rounded-xl font-semibold text-xs transition-all cursor-pointer border flex items-center justify-between active:scale-[0.98] ${
                    isSelected
                      ? 'bg-[#9333EA] text-white border-[#9333EA] shadow-md shadow-[#9333EA]/30'
                      : isDarkMode
                      ? 'border-[#9333EA]/20 bg-[#0F1424] text-[#94A3B8] hover:border-[#9333EA]/50 hover:text-white'
                      : 'border-[#E2E8F0] bg-white text-[#334155] hover:border-[#9333EA]/50 hover:bg-[#FAF5FF]'
                  }`}
                >
                  <span>{diff}</span>
                  {isSelected ? (
                    <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                      <Check size={11} className="text-white font-bold" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider block" style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}>
            5. Session Duration
          </span>
          <div className="space-y-2">
            {durations.map((dur) => {
              const isSelected = selectedDuration === dur;
              return (
                <button
                  key={dur}
                  type="button"
                  onClick={(e) => { e.preventDefault(); setSelectedDuration(dur); }}
                  className={`w-full p-3 rounded-xl font-semibold text-xs transition-all cursor-pointer border flex items-center justify-between active:scale-[0.98] ${
                    isSelected
                      ? 'bg-[#9333EA] text-white border-[#9333EA] shadow-md shadow-[#9333EA]/30'
                      : isDarkMode
                      ? 'border-[#9333EA]/20 bg-[#0F1424] text-[#94A3B8] hover:border-[#9333EA]/50 hover:text-white'
                      : 'border-[#E2E8F0] bg-white text-[#334155] hover:border-[#9333EA]/50 hover:bg-[#FAF5FF]'
                  }`}
                >
                  <span>{dur}</span>
                  {isSelected ? (
                    <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                      <Check size={11} className="text-white font-bold" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Continue Button */}
      <button
        onClick={handleProceed}
        className="w-full py-3.5 font-bold text-sm rounded-xl shadow-lg shadow-[#9333EA]/20 transition-all flex items-center justify-center gap-2 cursor-pointer text-white bg-[#9333EA] hover:bg-[#7e22ce] active:scale-[0.99]"
      >
        <span>Proceed to Interview Rules & System Check</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );
};
