import React from 'react';
import { Check, Sparkles } from 'lucide-react';

export const AvatarCard = ({
  avatar,
  selected = false,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect && onSelect();
        }
      }}
      className={`group relative p-3 sm:p-4 rounded-3xl border-2 transition-all duration-300 cursor-pointer select-none flex flex-col items-center text-center
        ${
          selected
            ? 'bg-gradient-to-b from-[#F45124]/30 via-white/15 to-[#65BDEB]/25 border-[#F45124] shadow-[0_0_25px_rgba(244,81,36,0.4)] scale-105'
            : 'bg-white/10 hover:bg-white/15 border-white/20 hover:border-white/40 hover:scale-102'
        }
        backdrop-blur-md
      `}
    >
      {/* Selected Indicator Pill */}
      {selected && (
        <div className="absolute -top-2.5 bg-[#F45124] text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md shadow-orange-600/40">
          <Sparkles className="w-2.5 h-2.5" />
          <span>Active Buddy</span>
        </div>
      )}

      {/* Avatar Image Container */}
      <div className="relative my-2 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-white/40 p-1 bg-white/10 group-hover:scale-105 transition-transform duration-300">
        <div className="w-full h-full rounded-full overflow-hidden bg-[#19324D] flex items-center justify-center">
          {avatar.avatarImg ? (
            <img
              src={avatar.avatarImg}
              alt={avatar.name}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          ) : (
            <span className="text-4xl">{avatar.emoji || '🚀'}</span>
          )}
        </div>

        {/* Small check circle */}
        {selected && (
          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#F45124] text-white flex items-center justify-center border-2 border-white shadow-sm">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        )}
      </div>

      {/* Name and Title */}
      <h4 className="mt-1 text-sm sm:text-base font-bold text-white tracking-tight font-poppins">
        {avatar.name}
      </h4>
      <p className="text-[11px] sm:text-xs text-white/70 line-clamp-1 mt-0.5">
        {avatar.title}
      </p>

      {/* Badge tag */}
      {avatar.badge && (
        <span className="mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/80">
          {avatar.badge}
        </span>
      )}
    </div>
  );
};

