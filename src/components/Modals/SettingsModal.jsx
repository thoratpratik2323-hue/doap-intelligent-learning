import React from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { AppearancePage } from '../Shell/AppearancePage';

export const SettingsModal = () => {
  const { isSettingsOpen, setIsSettingsOpen } = useTheme();

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xl animate-fade-in select-none">
      <div
        className="rounded-3xl max-w-6xl w-full shadow-2xl border flex flex-col"
        style={{
          backgroundColor: 'var(--doap-bg)',
          borderColor: 'var(--doap-border)',
          color: 'var(--doap-text-prim)',
          maxHeight: '92vh',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 pt-5 pb-4 border-b shrink-0"
          style={{ borderColor: 'var(--doap-border)' }}
        >
          <div className="flex items-center gap-3">
            <span className="font-black text-base tracking-tight">DOAP</span>
            <span className="text-xs font-mono" style={{ color: 'var(--doap-text-sec)' }}>
              Personalization System
            </span>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-2 rounded-xl transition-colors cursor-pointer hover:opacity-80"
            style={{ color: 'var(--doap-text-sec)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body — reuse the same AppearancePage component */}
        <div className="flex-1 overflow-y-auto px-6 py-5 scrollbar-none">
          <AppearancePage />
        </div>
      </div>
    </div>
  );
};
