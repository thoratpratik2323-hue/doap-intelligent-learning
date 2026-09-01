import React, { useState } from 'react';
import { Play, Sparkles, FileText, ChevronRight, Check, ArrowRight } from 'lucide-react';
import { POSITIONS_LIST } from '../../data/positionsData';
import { useTheme } from '../../context/ThemeContext';

export const SetupStep = ({ onNext }) => {
  const { activeAccent, activeAccentHex } = useTheme();
  const accentHex = activeAccentHex || activeAccent?.hex || 'var(--doap-accent, #ffffff)';

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
      jobDescription: jobDescription
    });
  };

  return (
    <div className="space-y-8 animate-fade-in select-none">
      {/* Quick Action Top Bar */}
      <div 
        className="p-4 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md"
        style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm"
            style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000)' }}
          >
            ✓
          </div>
          <div>
            <h3 className="text-sm font-bold" style={{ color: 'var(--doap-text-prim)' }}>
              Selected: {selectedPosition.title}
            </h3>
            <p className="text-xs font-mono text-neutral-400">
              {selectedType} Interview • {selectedDifficulty} • {selectedDuration}
            </p>
          </div>
        </div>

        <button
          onClick={handleProceed}
          className="px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer hover-glide self-stretch sm:self-auto"
          style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
        >
          <span>Continue ➔ Next Step</span>
        </button>
      </div>

      {/* Position Selection */}
      <div className="space-y-3">
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest block" style={{ color: 'var(--doap-text-sec)' }}>
          1. TARGET POSITION / JOB ROLE
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {POSITIONS_LIST.map((pos) => {
            const isSelected = selectedPositionId === pos.id;
            return (
              <button
                key={pos.id}
                onClick={() => setSelectedPositionId(pos.id)}
                className={`
                  p-4 rounded-2xl text-left transition-all cursor-pointer border flex flex-col justify-between space-y-2 hover-glide doap-card
                `}
                style={{
                  backgroundColor: isSelected ? 'var(--doap-surface-sec)' : 'var(--doap-surface)',
                  borderColor: isSelected ? 'var(--doap-accent)' : 'var(--doap-border)',
                  color: 'var(--doap-text-prim)'
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm" style={{ color: 'var(--doap-text-prim)' }}>{pos.title}</span>
                  {isSelected && (
                    <div 
                      className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-extrabold"
                      style={{ backgroundColor: accentHex }}
                    >
                      ✓
                    </div>
                  )}
                </div>
                <p className="text-xs font-mono line-clamp-2" style={{ color: 'var(--doap-text-sec)' }}>{pos.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Optional Job Description Paste */}
      <div className="p-5 rounded-3xl space-y-3 border doap-card" style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText size={18} style={{ color: accentHex }} />
            <span className="text-sm font-bold" style={{ color: 'var(--doap-text-prim)' }}>Custom Job Description (Optional)</span>
          </div>
          <button
            onClick={() => setShowJdInput(!showJdInput)}
            className="text-xs font-bold hover:underline cursor-pointer"
            style={{ color: accentHex }}
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
              className="w-full p-3.5 rounded-2xl border text-xs focus:outline-none resize-none"
              style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)', color: 'var(--doap-text-prim)' }}
            />
            <p className="text-[11px] font-mono" style={{ color: 'var(--doap-text-muted)' }}>
              💡 Questions will automatically adapt to match the exact requirements of your target position.
            </p>
          </div>
        )}
      </div>

      {/* Type, Difficulty & Duration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Type */}
        <div className="space-y-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest block" style={{ color: 'var(--doap-text-sec)' }}>
            2. INTERVIEW TYPE
          </span>
          <div className="space-y-2">
            {interviewTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`
                  w-full p-3 rounded-2xl font-semibold text-xs text-left transition-all cursor-pointer border doap-card
                `}
                style={{
                  backgroundColor: selectedType === type ? 'var(--doap-surface-sec)' : 'var(--doap-surface)',
                  borderColor: selectedType === type ? 'var(--doap-accent)' : 'var(--doap-border)',
                  color: 'var(--doap-text-prim)'
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="space-y-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest block" style={{ color: 'var(--doap-text-sec)' }}>
            3. DIFFICULTY LEVEL
          </span>
          <div className="space-y-2">
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`
                  w-full p-3 rounded-2xl font-semibold text-xs text-left transition-all cursor-pointer border doap-card
                `}
                style={{
                  backgroundColor: selectedDifficulty === diff ? 'var(--doap-surface-sec)' : 'var(--doap-surface)',
                  borderColor: selectedDifficulty === diff ? 'var(--doap-accent)' : 'var(--doap-border)',
                  color: 'var(--doap-text-prim)'
                }}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest block" style={{ color: 'var(--doap-text-sec)' }}>
            4. DURATION
          </span>
          <div className="space-y-2">
            {durations.map((dur) => (
              <button
                key={dur}
                onClick={() => setSelectedDuration(dur)}
                className={`
                  w-full p-3 rounded-2xl font-semibold text-xs text-left transition-all cursor-pointer border doap-card
                `}
                style={{
                  backgroundColor: selectedDuration === dur ? 'var(--doap-surface-sec)' : 'var(--doap-surface)',
                  borderColor: selectedDuration === dur ? 'var(--doap-accent)' : 'var(--doap-border)',
                  color: 'var(--doap-text-prim)'
                }}
              >
                {dur}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Continue Button */}
      <button
        onClick={handleProceed}
        className="w-full py-4 font-bold text-base rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover-glide"
        style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
      >
        <span>Proceed to Interview Rules & System Check</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );
};
