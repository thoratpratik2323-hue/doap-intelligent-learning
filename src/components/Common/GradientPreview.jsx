// GradientPreview — reusable component that renders an actual gradient wallpaper artwork
// Used for both the 6 main themes and the iPhone 17 collection cards

import React, { useRef, useEffect } from 'react';

/**
 * @param {string[]} layers  – array of CSS gradient strings (innermost first)
 * @param {boolean}  animated – whether to animate the layers
 * @param {boolean}  selected – show selection ring
 * @param {string}   name     – theme name displayed at bottom
 * @param {string}   subtitle – sub-label
 * @param {function} onClick  – click handler
 * @param {string}   className – extra classes
 * @param {boolean}  compact  – smaller card (iPhone collection)
 */
export const GradientPreview = ({
  layers = [],
  animated = false,
  selected = false,
  name = '',
  subtitle = '',
  onClick,
  className = '',
  compact = false,
}) => {
  const cardRef = useRef(null);

  // Subtle parallax on mousemove (only when animated or hovered)
  useEffect(() => {
    if (compact) return; // skip parallax on small cards
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;  // -4 to 4 deg
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
      card.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-2px) scale(1.015)`;
    };

    const handleLeave = () => {
      card.style.transform = '';
    };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
    return () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, [compact]);

  // Build the combined CSS background from layers (last = base, rest stack on top)
  const background = [...layers].reverse().join(', ');

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`relative overflow-hidden cursor-pointer select-none transition-all duration-300 ease-out ${
        compact
          ? 'rounded-2xl'
          : 'rounded-2xl hover:shadow-2xl'
      } ${selected ? 'ring-2 ring-white ring-offset-1 ring-offset-black' : ''} ${className}`}
      style={{
        background,
        transition: 'transform 300ms cubic-bezier(.25,.8,.25,1), box-shadow 300ms cubic-bezier(.25,.8,.25,1)',
      }}
    >
      {/* Animated shimmer layer */}
      {animated && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)',
            animation: 'gradientShimmer 8s ease-in-out infinite alternate',
          }}
        />
      )}

      {/* Glass overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%, rgba(0,0,0,0.3) 100%)',
        }}
      />

      {/* Inner noise texture for depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Selected checkmark */}
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-lg z-10">
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      {/* Name label at bottom */}
      {name && (
        <div
          className={`absolute bottom-0 left-0 right-0 p-2.5 z-10 ${compact ? 'p-2' : 'p-3'}`}
          style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.55) 0%, transparent 100%)' }}
        >
          <span className={`block text-white font-semibold leading-tight ${compact ? 'text-[10px]' : 'text-xs'}`}>
            {name}
          </span>
          {subtitle && !compact && (
            <span className="block text-white/50 text-[10px] font-mono mt-0.5">{subtitle}</span>
          )}
        </div>
      )}
    </div>
  );
};
