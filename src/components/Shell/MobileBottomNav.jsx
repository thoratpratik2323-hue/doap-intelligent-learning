import React from 'react';
import { Home, MessageSquare, Mic, Code2, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const MobileBottomNav = () => {
  const { currentPath, navigateTo } = useTheme();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'AI Tutor', path: '/ai-tutor', icon: MessageSquare },
    { label: 'Voice', path: '/voice-tutor', icon: Mic, isVoice: true },
    { label: 'Practice', path: '/coding', icon: Code2 },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-rose-100 shadow-2xl shadow-rose-950/10 px-3 py-1.5 select-none transition-all">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path || 
            (item.path === '/coding' && (currentPath === '/coding-practice' || currentPath === '/company-prep'));

          return (
            <button
              key={item.path}
              onClick={() => navigateTo(item.path)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer relative ${
                isActive
                  ? 'text-rose-600 font-bold bg-rose-50/80 scale-105 shadow-sm'
                  : 'text-neutral-500 hover:text-rose-600'
              }`}
            >
              <div className="relative">
                <Icon size={20} className={isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
                {item.isVoice && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                )}
              </div>
              <span className="text-[10px] font-mono tracking-tight mt-0.5">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
