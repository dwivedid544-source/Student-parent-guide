import React from 'react';
import { Check } from 'lucide-react';

export const SelectionCard = ({
  title,
  subtitle,
  icon: Icon,
  emoji,
  selected = false,
  onClick,
  badge,
  className = '',
  multi = false,
}) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick();
        }
      }}
      className={`relative group p-5 rounded-3xl border-2 transition-all duration-200 cursor-pointer select-none text-left flex flex-col justify-between overflow-hidden
        ${
          selected
            ? 'bg-gradient-to-br from-[#F45124]/25 via-white/15 to-[#65BDEB]/20 border-[#F45124] shadow-[0_0_20px_rgba(244,81,36,0.35)] scale-[1.02]'
            : 'bg-white/10 hover:bg-white/15 border-white/20 hover:border-white/40 shadow-md hover:scale-[1.01]'
        }
        backdrop-blur-md ${className}
      `}
    >
      {/* Top row: Icon/Emoji & Selected Checkmark Badge */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {emoji && (
            <span className="text-3xl sm:text-4xl filter drop-shadow-sm transition-transform group-hover:scale-110">
              {emoji}
            </span>
          )}
          {Icon && (
            <div
              className={`p-2.5 rounded-2xl transition-colors ${
                selected ? 'bg-[#F45124] text-white' : 'bg-white/15 text-white/90'
              }`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          )}
        </div>

        {/* Selected Checkmark Indicator */}
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-200 shrink-0 ${
            selected
              ? 'bg-[#F45124] border-[#F45124] text-white scale-110'
              : 'border-white/30 bg-white/5 text-transparent'
          }`}
        >
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </div>
      </div>

      {/* Content */}
      <div>
        {badge && (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#FFD66B]/25 text-[#FFD66B] border border-[#FFD66B]/40 mb-1.5">
            {badge}
          </span>
        )}
        <h3
          className={`text-base sm:text-lg font-bold tracking-tight font-poppins transition-colors ${
            selected ? 'text-white' : 'text-white/95'
          }`}
        >
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 text-xs sm:text-sm text-white/70 leading-snug">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom accent glow bar when selected */}
      {selected && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F45124] via-[#FFD66B] to-[#65BDEB]" />
      )}
    </div>
  );
};

