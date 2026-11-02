import React from 'react';
import { 
  Heart, 
  Sparkles, 
  Smile, 
  CheckCircle2, 
  Calendar, 
  Play, 
  Target, 
  ShieldCheck, 
  MessageCircle,
  Clock,
  Compass,
  ArrowRight
} from 'lucide-react';

/**
 * HeroDashboardPreview
 * Recreates the exact floating glassmorphic product UI shown in the reference hero:
 * - Floating top chat bubble ("Hi Mom, I completed my reflection...")
 * - Inner dashboard preview with pastel widgets (meditation audio, mood donut, habit streak, strengths wheel)
 * - Floating bottom insight bubble ("Parent Insight: Aria shared her weekly milestone...")
 */
export const HeroDashboardPreview = () => {
  return (
    <div className="relative w-full max-w-[540px] mx-auto select-none">
      
      {/* Ambient background pastel blur glow */}
      <div className="absolute -top-12 -right-12 w-80 h-80 bg-gradient-to-br from-[#EFEAFC] via-[#FCE8E4] to-[#FFF0EB] rounded-full blur-3xl opacity-75 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-gradient-to-tr from-[#E1F2FB] to-[#EFEAFC] rounded-full blur-2xl opacity-60 pointer-events-none" />

      {/* Floating Top Chat Bubble */}
      <div className="relative z-20 mb-3 ml-auto max-w-[320px] bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-[0_10px_25px_rgba(108,92,231,0.12)] border border-[#EFEAFC] flex items-start gap-3 animate-float">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6C5CE7] to-[#B8A9FF] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
          A
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[11px] font-bold text-[#1E1B39]">Aria • Student</span>
            <span className="text-[9px] text-[#8C84A6]">10:24 AM</span>
          </div>
          <p className="text-xs text-[#5E5873] leading-snug">
            “Hi Mom, I finished my weekly reflection and feel much more focused today.”
          </p>
        </div>
      </div>

      {/* Main Glassmorphic Dashboard Window */}
      <div className="relative z-10 bg-white/95 backdrop-blur-xl rounded-[28px] p-5 sm:p-6 shadow-[0_20px_50px_rgba(108,92,231,0.12)] border border-white">
        
        {/* Window Top Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F0EBFA]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#6C5CE7] text-white flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-[#1E1B39] tracking-tight">HighOrbit Sanctuary</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EFEAFC] text-[#6C5CE7] text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] animate-pulse" />
              Focus Mode
            </span>
            <div className="w-7 h-7 rounded-full bg-[#FCE8E4] text-[#E56B6F] flex items-center justify-center text-xs font-bold">
              AC
            </div>
          </div>
        </div>

        {/* Dashboard Grid Widgets */}
        <div className="grid grid-cols-12 gap-3.5">
          
          {/* Widget 1: Meditation Audio Player (Left, 5 cols) */}
          <div className="col-span-12 sm:col-span-5 bg-gradient-to-br from-[#F5EFFF] to-[#FAF7FF] rounded-2xl p-3.5 border border-[#EFEAFC] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C5CE7]">Daily Calm</span>
              <Heart className="w-3.5 h-3.5 text-[#E56B6F]" />
            </div>
            
            <div className="my-2 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#6C5CE7] mb-2 group cursor-pointer hover:scale-105 transition-transform">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
              <span className="text-xs font-bold text-[#1E1B39]">Unwind &amp; Recharge</span>
              <span className="text-[10px] text-[#8C84A6]">10 min mindful breathing</span>
            </div>

            <div className="w-full bg-white/80 rounded-full h-1.5 overflow-hidden mt-1">
              <div className="bg-[#6C5CE7] h-full w-2/3 rounded-full" />
            </div>
          </div>

          {/* Widget 2: Weekly Mood & Strengths (Right, 7 cols) */}
          <div className="col-span-12 sm:col-span-7 flex flex-col gap-3">
            
            {/* Mood Tracker Row */}
            <div className="bg-[#FFF8F6] rounded-2xl p-3 border border-[#FCE8E4]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E56B6F]">Mood Rhythm</span>
                <span className="text-[10px] font-semibold text-[#8C84A6]">Past 7 Days</span>
              </div>
              <div className="flex items-center justify-between">
                {[
                  { day: 'M', emoji: '😌', active: true },
                  { day: 'T', emoji: '🎯', active: true },
                  { day: 'W', emoji: '✨', active: true },
                  { day: 'T', emoji: '🌿', active: true },
                  { day: 'F', emoji: '⚡', active: true },
                  { day: 'S', emoji: '💛', active: false },
                  { day: 'S', emoji: '☀️', active: false }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="text-sm mb-0.5">{item.emoji}</span>
                    <span className={`text-[9px] font-bold ${item.active ? 'text-[#6C5CE7]' : 'text-[#B0A8C5]'}`}>
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Habit Streak & Progress */}
            <div className="bg-[#FAF8FE] rounded-2xl p-3 border border-[#EFEAFC] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#1E1B39] block">Consistency Streak</span>
                <span className="text-[10px] text-[#5E5873]">5 days unbroken</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#6C5CE7]">85%</span>
                <div className="w-16 bg-white rounded-full h-1.5 overflow-hidden border border-[#EFEAFC]">
                  <div className="bg-gradient-to-r from-[#6C5CE7] to-[#E56B6F] h-full w-[85%] rounded-full" />
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Floating Bottom Parent Insight Bubble */}
      <div 
        className="relative z-20 mt-3 mr-auto max-w-[340px] bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-[0_10px_25px_rgba(229,107,111,0.12)] border border-[#FCE8E4] flex items-start gap-3"
        style={{ animation: 'float-slow 5s ease-in-out infinite reverse' }}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#E56B6F] to-[#F0A18D] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
          🤝
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[11px] font-bold text-[#1E1B39]">Parent Guidance</span>
            <span className="text-[9px] text-[#E56B6F] font-bold">New Suggestion</span>
          </div>
          <p className="text-xs text-[#5E5873] leading-snug">
            “Aria shared her weekly study milestone. Consider asking about her favorite topics tonight.”
          </p>
        </div>
      </div>

    </div>
  );
};

export default HeroDashboardPreview;

