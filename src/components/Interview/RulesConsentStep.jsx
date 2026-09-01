import React, { useState } from 'react';
import { ShieldCheck, Camera, Mic, Eye, Maximize, AlertCircle, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const RulesConsentStep = ({ setupData, onNext, onBack }) => {
  const { activeAccent, activeAccentHex } = useTheme();
  const accentHex = activeAccentHex || activeAccent?.hex || 'var(--doap-accent, #ffffff)';

  const [acknowledged, setAcknowledged] = useState(false);

  const rules = [
    { icon: Camera, text: "Camera must remain enabled throughout the interview." },
    { icon: Mic, text: "Microphone must remain enabled and active while recording answers." },
    { icon: Eye, text: "Candidate must remain visible in frame and maintain screen attention." },
    { icon: Maximize, text: "Fullscreen mode is required during the live interview session." },
    { icon: ShieldCheck, text: "Do not switch tabs, exit fullscreen, or open external applications." },
    { icon: AlertCircle, text: "Three serious proctoring violations will terminate the interview session." }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in select-none">
      <div className="p-6 md:p-8 rounded-3xl space-y-6 border doap-card" style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}>
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto border" style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)', color: accentHex }}>
            <ShieldCheck size={24} />
          </div>
          <h2 className="text-2xl font-extrabold" style={{ color: 'var(--doap-text-prim)' }}>
            Interview Rules & Privacy Consent
          </h2>
          <p className="text-xs font-mono" style={{ color: 'var(--doap-text-sec)' }}>
            Target Role: <strong style={{ color: 'var(--doap-text-prim)' }}>{setupData.positionTitle}</strong> • {setupData.type} ({setupData.difficulty})
          </p>
        </div>

        {/* Rules Checklist */}
        <div className="space-y-3 pt-2">
          {rules.map((rule, idx) => {
            const IconComponent = rule.icon;
            return (
              <div key={idx} className="p-3.5 rounded-2xl border flex items-center gap-3" style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)' }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border" style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)', color: 'var(--doap-text-prim)' }}>
                  <IconComponent size={16} />
                </div>
                <span className="text-xs font-semibold leading-snug" style={{ color: 'var(--doap-text-prim)' }}>{rule.text}</span>
              </div>
            );
          })}
        </div>

        {/* Privacy Notice */}
        <div className="p-4 rounded-2xl text-xs space-y-1 border" style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)', color: 'var(--doap-text-sec)' }}>
          <p className="font-bold" style={{ color: 'var(--doap-text-prim)' }}>🔐 Privacy & Consent Declaration</p>
          <p>
            By proceeding, you consent to live camera & microphone processing for automated AI response evaluation and browser-side proctoring verification.
          </p>
        </div>

        {/* Consent Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer pt-2">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(e) => setAcknowledged(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded focus:ring-1"
          />
          <span className="text-xs font-semibold leading-normal" style={{ color: 'var(--doap-text-prim)' }}>
            I have read, understood, and agree to follow all interview rules and privacy guidelines.
          </span>
        </label>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onBack}
            className="w-1/3 py-3 rounded-2xl text-xs font-bold border transition-colors cursor-pointer"
            style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)', color: 'var(--doap-text-prim)' }}
          >
            Back
          </button>
          <button
            disabled={!acknowledged}
            onClick={onNext}
            className="w-2/3 py-3 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: acknowledged ? accentHex : 'var(--doap-surface-sec)', color: acknowledged ? 'var(--doap-bg, #000000)' : 'var(--doap-text-sec)' }}
          >
            <span>Proceed to System Diagnostics</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
