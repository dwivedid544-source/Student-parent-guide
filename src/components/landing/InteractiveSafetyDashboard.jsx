import React, { useState } from 'react';
import { 
  Heart, 
  Smile, 
  CheckCircle2, 
  Play, 
  Pause, 
  Sparkles, 
  ShieldCheck, 
  Target, 
  Clock, 
  Award, 
  Lock,
  ChevronRight,
  Sun,
  Flame,
  Volume2
} from 'lucide-react';

export const InteractiveSafetyDashboard = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeMood, setActiveMood] = useState('calm');

  const moods = [
    { id: 'happy', emoji: '😊', label: 'Joyful', color: 'bg-[#FFF3D6] text-[#D98A2B]' },
    { id: 'calm', emoji: '😌', label: 'Calm', color: 'bg-[#EFEAFC] text-[#6C5CE7]' },
    { id: 'focused', emoji: '🎯', label: 'Focused', color: 'bg-[#E1F2FB] text-[#2980B9]' },
    { id: 'tired', emoji: '😴', label: 'Unwinding', color: 'bg-[#FCE8E4] text-[#E56B6F]' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      
      {/* Outer Browser/App Frame */}
      <div className="bg-white/90 backdrop-blur-2xl rounded-[32px] p-5 sm:p-8 shadow-[0_25px_60px_rgba(108,92,231,0.1)] border border-[#EFEAFC]">
        
        {/* Frame Top App Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-[#F0EBFA]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6C5CE7] to-[#8E7EF7] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              HO
            </div>
            <div>
              <span className="font-bold text-sm text-[#1E1B39] block">Student Sanctuary Portal</span>
              <span className="text-[11px] text-[#8C84A6]">Encrypted Workspace • Ages 15–25</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8FE] border border-[#EFEAFC] text-xs font-semibold text-[#6C5CE7]">
              <Flame className="w-3.5 h-3.5 text-[#E56B6F] fill-current" />
              <span>5-Day Streak</span>
            </div>
            <div className="flex items-center gap-2 pl-2 border-l border-[#F0EBFA]">
              <div className="w-8 h-8 rounded-full bg-[#EFEAFC] text-[#6C5CE7] flex items-center justify-center font-bold text-xs">
                A
              </div>
              <span className="text-xs font-bold text-[#1E1B39] hidden sm:inline">Aria Chen</span>
            </div>
          </div>
        </div>

        {/* 3 Columns Dashboard Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          
          {/* Column 1: Guided Audio Session (4 cols) */}
          <div className="md:col-span-4 bg-gradient-to-br from-[#FAF7FF] via-[#F5EFFF] to-[#FAF8FE] rounded-2xl p-5 border border-[#EFEAFC] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6C5CE7] bg-white px-2.5 py-1 rounded-full shadow-2xs">
                  Daily Mindful Reset
                </span>
                <Volume2 className="w-4 h-4 text-[#8C84A6]" />
              </div>

              <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-tr from-[#EFEAFC] to-[#FFF0EB] flex flex-col items-center justify-center p-4 mb-4 relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-[#6C5CE7] mb-2 cursor-pointer hover:scale-105 transition-transform"
                     onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                </div>
                <span className="text-xs font-bold text-[#1E1B39]">Calm Breathing &amp; Grounding</span>
                <span className="text-[10px] text-[#5E5873]">10 min • Guided by Dr. Sarah Lin</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#1E1B39] block">Today's Reflection Quests</span>
              <div className="flex items-center gap-2.5 text-xs text-[#5E5873] bg-white p-2.5 rounded-xl border border-[#EFEAFC]">
                <CheckCircle2 className="w-4 h-4 text-[#27AE60] shrink-0" />
                <span className="truncate">Morning gratitude journal entry</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#5E5873] bg-white p-2.5 rounded-xl border border-[#EFEAFC]">
                <Clock className="w-4 h-4 text-[#6C5CE7] shrink-0" />
                <span className="truncate">25-minute Pomodoro focus block</span>
              </div>
            </div>
          </div>

          {/* Column 2: Emotional Weather & Mood Distribution (4 cols) */}
          <div className="md:col-span-4 bg-white rounded-2xl p-5 border border-[#EFEAFC] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E56B6F]">
                  Emotional Weather
                </span>
                <span className="text-[11px] text-[#8C84A6]">Check In Daily</span>
              </div>

              {/* Mood Selectors */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                {moods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveMood(m.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      activeMood === m.id
                        ? `${m.color} border-current shadow-xs font-bold`
                        : 'bg-[#FAF8FE] border-[#EFEAFC] text-[#5E5873] hover:bg-[#F5EFFF]'
                    }`}
                  >
                    <span className="text-base block mb-0.5">{m.emoji}</span>
                    <span className="text-[11px]">{m.label}</span>
                  </button>
                ))}
              </div>

              {/* Weekly Mood Rhythm Chart */}
              <div className="bg-[#FAF8FE] rounded-xl p-3 border border-[#EFEAFC]">
                <span className="text-[10px] font-bold text-[#8C84A6] uppercase tracking-wider block mb-2">
                  7-Day Mood Consistency
                </span>
                <div className="flex items-end justify-between h-20 pt-2 px-1">
                  {[65, 80, 50, 90, 85, 70, 95].map((val, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                      <div 
                        className="w-4 rounded-t-md bg-gradient-to-t from-[#6C5CE7] to-[#B8A9FF] transition-all"
                        style={{ height: `${val * 0.7}px` }}
                      />
                      <span className="text-[9px] text-[#8C84A6]">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F0EBFA] flex items-center justify-between text-xs">
              <span className="text-[#5E5873]">Weekly Well-Being Score</span>
              <span className="font-bold text-[#6C5CE7]">88% Stable</span>
            </div>
          </div>

          {/* Column 3: Strengths Radar & Privacy Shield (4 cols) */}
          <div className="md:col-span-4 bg-gradient-to-br from-[#FFF9F7] via-white to-[#F5EFFF] rounded-2xl p-5 border border-[#FCE8E4] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D98A2B]">
                  Core Archetype
                </span>
                <Sparkles className="w-4 h-4 text-[#D98A2B]" />
              </div>

              <div className="text-center py-2">
                <div className="w-14 h-14 rounded-full bg-[#FEF3D6] text-[#D98A2B] mx-auto flex items-center justify-center text-2xl mb-2 shadow-xs">
                  🧭
                </div>
                <h4 className="font-bold text-sm text-[#1E1B39]">Creative Explorer</h4>
                <p className="text-[11px] text-[#5E5873] mt-0.5">High intrinsic motivation • Empathetic thinker</p>
              </div>

              <div className="space-y-2.5 mt-4">
                {[
                  { name: 'Self-Reflection', val: '92%', color: 'bg-[#6C5CE7]' },
                  { name: 'Stress Regulation', val: '78%', color: 'bg-[#E56B6F]' },
                  { name: 'Goal Discipline', val: '84%', color: 'bg-[#2980B9]' }
                ].map((s, i) => (
                  <div key={i} className="text-[11px]">
                    <div className="flex justify-between font-semibold text-[#1E1B39] mb-1">
                      <span>{s.name}</span>
                      <span className="text-[#6C5CE7]">{s.val}</span>
                    </div>
                    <div className="w-full bg-[#EFEAFC] rounded-full h-1.5 overflow-hidden">
                      <div className={`${s.color} h-full rounded-full`} style={{ width: s.val }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-2.5 rounded-xl bg-white border border-[#FCE8E4] flex items-center gap-2 text-[10px] text-[#5E5873]">
              <Lock className="w-3.5 h-3.5 text-[#27AE60] shrink-0" />
              <span>Only shared if consented by student.</span>
            </div>
          </div>

        </div>

      </div>

      {/* 4 Trust Badges Below Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { icon: <Lock className="w-4 h-4 text-[#6C5CE7]" />, label: '100% Encrypted & Private' },
          { icon: <Target className="w-4 h-4 text-[#E56B6F]" />, label: 'Age-Appropriate (15–25)' },
          { icon: <Sparkles className="w-4 h-4 text-[#D98A2B]" />, label: 'Actionable Positive Guidance' },
          { icon: <ShieldCheck className="w-4 h-4 text-[#2980B9]" />, label: 'Psychology-Backed Frameworks' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-4 border border-[#EFEAFC] flex items-center gap-3 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-[#FAF8FE] flex items-center justify-center shrink-0">
              {item.icon}
            </div>
            <span className="text-xs font-bold text-[#1E1B39] leading-tight">{item.label}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default InteractiveSafetyDashboard;

