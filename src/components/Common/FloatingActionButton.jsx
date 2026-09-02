import React from 'react';
import { Pencil } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const FloatingActionButton = () => {
  const { setIsEditProfileOpen, currentPath } = useTheme();

  // Only show on /profile page, never obstruct AI Tutor, Code Sandbox, or Interviews
  if (currentPath !== '/profile') return null;

  return (
    <button
      onClick={() => setIsEditProfileOpen(true)}
      className="fixed bottom-6 right-6 z-30 bg-[#1a1a1a] hover:bg-black text-white px-5 py-3 rounded-full font-medium text-sm shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center gap-2.5 group hover:scale-105 active:scale-95 cursor-pointer border border-neutral-700"
      title="Edit Profile"
    >
      <Pencil size={16} className="text-slate-300 group-hover:text-white transition-colors" />
      <span>Edit Profile</span>
    </button>
  );
};
