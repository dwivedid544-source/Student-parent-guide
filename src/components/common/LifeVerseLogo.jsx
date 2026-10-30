import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const LifeVerseLogo = ({ size = 'md', className = '', href = '/' }) => {
  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  return (
    <Link
      to={href}
      className={`inline-flex items-center gap-2.5 sm:gap-3 group select-none transition-transform duration-200 hover:scale-[1.02] ${className}`}
      aria-label="LifeVerse AI - Home"
    >
      {/* Visual Emblem */}
      <div
        className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-tr from-[#F45124] via-[#FF8A65] to-[#65BDEB] p-[1.5px] shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-all duration-300 ${
          isSmall ? 'w-8 h-8 rounded-xl' : isLarge ? 'w-11 h-11 rounded-2xl' : 'w-9 h-9 sm:w-10 sm:h-10'
        }`}
      >
        <div className="w-full h-full rounded-[14px] bg-[#0c1b2d] flex items-center justify-center relative overflow-hidden">
          {/* Subtle internal cosmic gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#F45124]/30 via-transparent to-[#65BDEB]/35" />
          
          {/* Monogram / Icon mark */}
          <div className="relative flex items-center justify-center font-poppins font-black text-white tracking-tighter text-xs sm:text-sm">
            <span className="text-[#FF8A65]">L</span>
            <span className="text-[#65BDEB] -ml-0.5">V</span>
          </div>

          {/* Glowing pulse spark in corner */}
          <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#FFD66B] shadow-[0_0_8px_#FFD66B] animate-pulse" />
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5 font-poppins">
          <span
            className={`font-extrabold tracking-tight text-white drop-shadow-sm ${
              isSmall ? 'text-lg' : isLarge ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
            }`}
          >
            Life<span className="text-[#65BDEB]">Verse</span>
          </span>
          <span
            className={`font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-gradient-to-r from-[#F45124] to-[#FF8A65] text-white shadow-sm shadow-orange-500/30 ${
              isSmall ? 'text-[9px]' : 'text-[10px] sm:text-[11px]'
            }`}
          >
            AI
          </span>
        </div>
      </div>
    </Link>
  );
};

export default LifeVerseLogo;
