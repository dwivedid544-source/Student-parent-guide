import React, { useState } from 'react';

const PILLARS = [
  {
    id: 1,
    title: 'Express Your Feelings',
    desc: 'Low-pressure mood drops, curated emoji reflections, and 15-second audio micro-capsules without scheduling intimidating video calls.',
    icon: 'edit_note',
    gradient: 'from-[#8B75E8] to-[#B9A5FF]',
    accentColor: '#7768D8',
    type: 'audio',
    visualTag: '15s Voice Micro-Capsule',
    subTag: 'Low-Pressure Reflection'
  },
  {
    id: 2,
    title: 'Talk to Your Parents',
    desc: 'Gentle conversation kickstarters, mutual curiosity cards, and guided prompts that dismantle generational awkwardness.',
    icon: 'forum',
    gradient: 'from-[#FF9EAD] to-[#FFBD8A]',
    accentColor: '#E87A90',
    type: 'cards',
    visualTag: 'Curiosity Cards',
    subTag: 'Icebreaker Prompts'
  },
  {
    id: 3,
    title: 'Share Your Experiences',
    desc: 'Selective daily campus highlights: canteen snapshots, sunset study views, and milestone moments shared strictly within your family bubble.',
    icon: 'photo_library',
    gradient: 'from-[#8CCFFF] to-[#327ba7]',
    accentColor: '#06628c',
    type: 'snapshots',
    visualTag: 'Campus Micro-Moments',
    subTag: 'Private Family Stream'
  },
  {
    id: 4,
    title: 'Build Emotional Understanding',
    desc: 'Micro-guides for parents on active, non-judgmental listening, decoding student burnout signals before crises escalate.',
    icon: 'hearing',
    gradient: 'from-[#FFE28A] to-[#FFBD8A]',
    accentColor: '#B38100',
    type: 'guide',
    visualTag: 'Active Listening Guide',
    subTag: 'Crisis Prevention'
  },
  {
    id: 5,
    title: 'Feel Connected',
    desc: 'One-tap gentle "Thinking of You" nudges, virtual morning teas, and shared reminders that physical distance doesn\'t mean forgotten love.',
    icon: 'favorite',
    gradient: 'from-[#8B75E8] to-[#FF9EAD]',
    accentColor: '#934654',
    type: 'nudge',
    visualTag: 'Virtual Warmth Nudge',
    subTag: 'No-Pressure Ping'
  },
  {
    id: 6,
    title: 'Receive Support',
    desc: 'Unconditional encouragement without unsolicited advice or lectures. A platform designed to nurture self-reliance with a safety net.',
    icon: 'volunteer_activism',
    gradient: 'from-[#06628c] to-[#8CCFFF]',
    accentColor: '#06628c',
    type: 'support',
    visualTag: 'Unconditional Encouragement',
    subTag: 'Zero-Lecture Guarantee'
  }
];

export const PillarsVisualGrid = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {PILLARS.map((pillar) => {
        const isHovered = hoveredCard === pillar.id;

        return (
          <div
            key={pillar.id}
            onMouseEnter={() => setHoveredCard(pillar.id)}
            onMouseLeave={() => setHoveredCard(null)}
            className="glass-card p-6 rounded-3xl soft-hover flex flex-col justify-between group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/40"
          >
            {/* Ambient Background Gradient Glow on hover */}
            <div
              className={`absolute -right-12 -top-12 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
                isHovered ? 'opacity-30' : 'opacity-0'
              } bg-gradient-to-br ${pillar.gradient}`}
            />

            <div>
              {/* Header Icon & Tag */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pillar.gradient} text-on-primary flex items-center justify-center shadow-md transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <span className="material-symbols-outlined text-2xl">{pillar.icon}</span>
                </div>

                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-surface-container-high/60 text-on-surface-variant border border-surface-container">
                  {pillar.subTag}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2 tracking-tight group-hover:text-primary transition-colors">
                {pillar.title}
              </h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                {pillar.desc}
              </p>
            </div>

            {/* Bespoke Interactive & Animated Visual Area for each tile */}
            <div className="mt-5 pt-4 border-t border-surface-container/60">
              
              {/* TYPE 1: Express Your Feelings (Audio Capsule & Mood Drops) */}
              {pillar.type === 'audio' && (
                <div className="p-3.5 rounded-2xl bg-[#FAF8FF] border border-[#B9A5FF]/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                      <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
                      <span>{pillar.visualTag}</span>
                    </div>
                    <span className="text-[10px] text-on-surface-variant font-mono">0:15 Max</span>
                  </div>

                  <div className="flex items-center gap-1.5 h-6 px-2 py-1 bg-white rounded-xl shadow-xs border border-primary-fixed/40">
                    <span className="material-symbols-outlined text-primary text-sm">graphic_eq</span>
                    <div className="flex-1 flex items-center gap-1 h-3">
                      {[30, 80, 50, 100, 65, 40, 90, 70, 45, 85, 60, 35, 75].map((h, i) => (
                        <span
                          key={i}
                          className="flex-1 bg-gradient-to-t from-primary to-secondary-container rounded-full"
                          style={{
                            height: isHovered ? `${h}%` : `${Math.max(20, h * 0.5)}%`,
                            transition: 'height 0.3s ease-in-out'
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-primary">15s</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-on-surface-variant">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-primary-fixed/40 text-primary">
                      😌 Relieved
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-primary-fixed/40 text-secondary">
                      📚 Exam Mode
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-primary-fixed/40 text-tertiary">
                      🌱 Hopeful
                    </span>
                  </div>
                </div>
              )}

              {/* TYPE 2: Talk to Your Parents (Curiosity Card Mockup) */}
              {pillar.type === 'cards' && (
                <div className="p-3.5 rounded-2xl bg-[#FFF8FA] border border-[#FF9EAD]/30 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-secondary">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">style</span>
                      <span>{pillar.visualTag}</span>
                    </span>
                    <span className="text-[10px] bg-secondary-fixed px-2 py-0.5 rounded-full font-bold">New Prompt</span>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl shadow-xs border border-[#FF9EAD]/40 text-xs text-on-surface font-medium leading-snug">
                    "Mom, what was the hardest part about moving away when you were young?"
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-on-surface-variant font-medium pt-1">
                    <span>✨ Generational icebreaker</span>
                    <span className="text-secondary font-semibold">1-tap share</span>
                  </div>
                </div>
              )}

              {/* TYPE 3: Share Your Experiences (Campus Snapshot Preview) */}
              {pillar.type === 'snapshots' && (
                <div className="p-3.5 rounded-2xl bg-[#F6FBFF] border border-[#8CCFFF]/40 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-tertiary">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">filter_frames</span>
                      <span>{pillar.visualTag}</span>
                    </span>
                    <span className="material-symbols-outlined text-xs text-tertiary">lock</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white p-1.5 rounded-xl border border-[#8CCFFF]/30 shadow-xs flex flex-col items-center">
                      <div className="w-full h-12 rounded-lg bg-gradient-to-tr from-[#8CCFFF]/50 to-[#c9e6ff] flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined text-lg">wb_twilight</span>
                      </div>
                      <span className="text-[10px] text-on-surface-variant mt-1 font-medium">Balcony Sunset</span>
                    </div>

                    <div className="bg-white p-1.5 rounded-xl border border-[#8CCFFF]/30 shadow-xs flex flex-col items-center">
                      <div className="w-full h-12 rounded-lg bg-gradient-to-tr from-[#FFBD8A]/50 to-[#FFE5D4] flex items-center justify-center text-[#944D12]">
                        <span className="material-symbols-outlined text-lg">coffee</span>
                      </div>
                      <span className="text-[10px] text-on-surface-variant mt-1 font-medium">Canteen Chai</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-center text-on-surface-variant font-medium">
                    Strictly Family Only • 0% Social Feed
                  </div>
                </div>
              )}

              {/* TYPE 4: Build Emotional Understanding (Active Listening Guide) */}
              {pillar.type === 'guide' && (
                <div className="p-3.5 rounded-2xl bg-[#FFFDF5] border border-[#FFE28A]/50 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#7A6000]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">psychology</span>
                      <span>{pillar.visualTag}</span>
                    </span>
                    <span className="text-[10px] bg-[#FFF5D1] px-2 py-0.5 rounded-full font-bold">Parent Coaching</span>
                  </div>

                  <div className="space-y-1.5 text-[11px] text-on-surface">
                    <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white border border-[#FFE28A]/30">
                      <span className="material-symbols-outlined text-xs text-emerald-500">check_circle</span>
                      <span className="font-medium">Listen before offering academic advice</span>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white border border-[#FFE28A]/30">
                      <span className="material-symbols-outlined text-xs text-emerald-500">check_circle</span>
                      <span className="font-medium">Notice fatigue cues during exam weeks</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TYPE 5: Feel Connected (Warmth Nudge) */}
              {pillar.type === 'nudge' && (
                <div className="p-3.5 rounded-2xl bg-[#FAF8FF] border border-[#B9A5FF]/30 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-primary">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">favorite</span>
                      <span>{pillar.visualTag}</span>
                    </span>
                    <span className="text-[10px] bg-primary-fixed px-2 py-0.5 rounded-full font-bold">1-Tap Pulse</span>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl shadow-xs border border-primary-fixed/40 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#FFD9DD] text-secondary flex items-center justify-center flex-shrink-0 animate-pulse">
                      ☕
                    </div>
                    <div className="text-xs">
                      <span className="font-bold block text-on-surface">"Thinking of you today, beta!"</span>
                      <span className="text-[10px] text-on-surface-variant">Sent with zero callback obligation</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-primary font-semibold">
                    <span>Warmth received 9:30 AM</span>
                    <span className="flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-xs text-secondary-container">favorite</span>
                      <span>Gentle heartbeat</span>
                    </span>
                  </div>
                </div>
              )}

              {/* TYPE 6: Receive Support (Unconditional Guarantee) */}
              {pillar.type === 'support' && (
                <div className="p-3.5 rounded-2xl bg-[#F0F8FF] border border-[#8CCFFF]/40 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-tertiary">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">verified_user</span>
                      <span>{pillar.visualTag}</span>
                    </span>
                    <span className="text-[10px] bg-tertiary-fixed px-2 py-0.5 rounded-full font-bold">Safe Space</span>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl shadow-xs border border-[#8CCFFF]/30 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#06628c] to-[#8CCFFF] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-sm">spa</span>
                    </div>
                    <div className="text-xs">
                      <span className="font-bold block text-on-surface">Zero Surveillance Guarantee</span>
                      <span className="text-[10px] text-on-surface-variant">No location tracking • No private chat snooping</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-center text-tertiary font-semibold">
                    Trust thrives where young adult dignity is protected
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PillarsVisualGrid;

