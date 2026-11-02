import React, { useState, useEffect } from 'react';

const ACTS = [
  {
    id: 1,
    title: 'Hostel Night Share',
    subtitle: 'Quiet room, unfiltered thoughts',
    badge: 'Step 1: Student Agency',
    icon: 'bedtime',
    color: 'from-[#8B75E8] to-[#B9A5FF]'
  },
  {
    id: 2,
    title: 'Private Encryption Bridge',
    subtitle: '100% Zero surveillance or tracking',
    badge: 'Step 2: Safe Transit',
    icon: 'lock',
    color: 'from-[#8CCFFF] to-[#327ba7]'
  },
  {
    id: 3,
    title: 'Empathetic Parent Response',
    subtitle: 'Active listening without pressure',
    badge: 'Step 3: Compassion First',
    icon: 'favorite',
    color: 'from-[#FF9EAD] to-[#FFBD8A]'
  },
  {
    id: 4,
    title: 'Reconnection & Calm Mind',
    subtitle: 'Emotional stress dissolves into trust',
    badge: 'Step 4: True Closeness',
    icon: 'spa',
    color: 'from-[#FFE28A] to-[#FFBD8A]'
  }
];

export const HeroVideoExperience = () => {
  const [currentAct, setCurrentAct] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // 16-second total video loop (4 seconds per act)
  useEffect(() => {
    if (!isPlaying) return;

    const actDuration = 4000;
    const interval = 50;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (interval / actDuration) * 25;
        if (next >= 100) {
          setCurrentAct(0);
          return 0;
        }
        const newAct = Math.min(3, Math.floor(next / 25));
        setCurrentAct(newAct);
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleJumpToAct = (actIdx) => {
    setCurrentAct(actIdx);
    setProgress(actIdx * 25);
  };

  return (
    <div className="w-full relative z-10 group">
      {/* Background Ambient Glow Mesh */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-[#8B75E8]/35 via-[#FF9EAD]/30 to-[#FFE28A]/35 rounded-[32px] blur-2xl opacity-80 group-hover:opacity-100 transition-all pointer-events-none" />

      {/* Main Glass Video Player Container */}
      <div className="relative bg-white/90 backdrop-blur-xl border-2 border-white shadow-2xl rounded-[28px] overflow-hidden">
        
        {/* Video Player Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-[#FAF8FF] via-white to-[#FAF8FF] border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF9EAD]" />
            </span>
            <span className="text-[11px] font-bold text-primary tracking-wide uppercase">
              HIGH ORBIT CINEMA • LIVE EXPERIENCE
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-highest/60 text-[10px] font-semibold text-on-surface-variant border border-primary-fixed/40">
            <span className="material-symbols-outlined text-xs text-primary">hd</span>
            <span>4K HDR • 60 FPS</span>
          </div>
        </div>

        {/* Video Screen Content Canvas */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/9.5] max-h-[460px] bg-gradient-to-br from-[#1E1938] via-[#2A234E] to-[#18132D] overflow-hidden select-none">
          
          {/* Animated Background Starfield & Atmosphere */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <div className="absolute top-10 left-12 w-48 h-48 bg-[#7768D8]/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-12 w-56 h-56 bg-[#FF9EAD]/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>

          {/* ACT 1: Late Night Hostel Room */}
          <div
            className={`absolute inset-0 p-5 sm:p-7 flex flex-col justify-between transition-all duration-700 ${
              currentAct === 0 ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                <span className="material-symbols-outlined text-sm text-[#FFE28A]">bedtime</span>
                <span>Hostel Room • 9:30 PM • Midterm Week</span>
              </div>
              <span className="text-white/60 text-xs">Emma's Private Space</span>
            </div>

            {/* Simulated Live Interaction Card */}
            <div className="max-w-md mx-auto w-full bg-white/10 backdrop-blur-2xl border border-white/25 rounded-2xl p-4 shadow-2xl text-white">
              <div className="flex items-center gap-2 mb-2 text-xs text-[#B8A9FF] font-semibold">
                <span className="material-symbols-outlined text-sm">edit_note</span>
                <span>Confidential Emotional Drop</span>
              </div>
              <p className="text-sm sm:text-base font-medium leading-relaxed italic text-white/95">
                "Hey Mom, feeling a bit overwhelmed before physics tomorrow. Missing the quiet at home..."
              </p>

              {/* Simulated 15-second Audio Voice Capsule Waveform */}
              <div className="mt-3 pt-3 border-t border-white/15 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7768D8] to-[#B8A9FF] flex items-center justify-center text-white shadow-md">
                  <span className="material-symbols-outlined text-sm">mic</span>
                </div>
                <div className="flex-1 flex items-center gap-1 h-5">
                  {[40, 75, 50, 90, 60, 30, 85, 45, 95, 70, 35, 80, 55, 65, 40].map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 bg-gradient-to-t from-[#B8A9FF] to-[#FF9EAD] rounded-full animate-pulse"
                      style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-[#FFE28A] font-semibold">0:12</span>
              </div>
            </div>

            <div className="text-center text-white/70 text-xs flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-xs text-[#8CCFFF]">lock</span>
              <span>Encrypted with 6-Digit Private Family Token</span>
            </div>
          </div>

          {/* ACT 2: Private Encryption Bridge */}
          <div
            className={`absolute inset-0 p-5 sm:p-7 flex flex-col justify-between items-center transition-all duration-700 ${
              currentAct === 1 ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
              <span className="material-symbols-outlined text-sm text-[#8CCFFF]">shield_lock</span>
              <span>Zero-Surveillance Transit Protocol</span>
            </div>

            {/* Glowing Encryption Orb & Constellation */}
            <div className="relative flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#7768D8] via-[#FF9EAD] to-[#8CCFFF] p-[2px] shadow-[0_0_50px_rgba(119,104,216,0.6)] animate-spin-slow">
                <div className="w-full h-full bg-[#18132D] rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-white">hub</span>
                </div>
              </div>
              <div className="mt-4 text-center text-white">
                <h4 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  State-to-State Private Line
                </h4>
                <p className="text-xs text-[#B8A9FF] mt-1">
                  Pune Campus ────── 850 km ────── Bengaluru Home
                </p>
                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1831]/80 text-[11px] text-white/90 border border-white/15">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>No GPS • No Spyware • Pure Family Dignity</span>
                </div>
              </div>
            </div>

            <div className="text-white/60 text-xs">Instant notification delivered to Mom's companion app</div>
          </div>

          {/* ACT 3: Guided Empathetic Parent Response */}
          <div
            className={`absolute inset-0 p-5 sm:p-7 flex flex-col justify-between transition-all duration-700 ${
              currentAct === 2 ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                <span className="material-symbols-outlined text-sm text-[#FF9EAD]">favorite</span>
                <span>Bengaluru Home • Mom's Companion Screen</span>
              </div>
              <span className="text-[#FFE28A] text-xs font-semibold">Active Listening Coach</span>
            </div>

            {/* Parent Prompt & Thoughtful Reply */}
            <div className="max-w-md mx-auto w-full bg-white/10 backdrop-blur-2xl border border-[#FF9EAD]/40 rounded-2xl p-4 shadow-2xl text-white">
              <div className="flex items-center gap-2 mb-2 text-xs text-[#FF9EAD] font-semibold">
                <span className="material-symbols-outlined text-sm">lightbulb</span>
                <span>Suggested: Acknowledge effort without giving lectures</span>
              </div>
              <p className="text-sm sm:text-base font-medium leading-relaxed text-white">
                "I believe in you beta. Take a deep breath. Call me whenever you want, or just rest tonight. Sending hot chai love."
              </p>
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/15 text-xs text-white/80">
                <span className="flex items-center gap-1 text-[#FF9EAD]">
                  <span className="material-symbols-outlined text-xs">verified</span>
                  <span>Zero-Pressure Delivered</span>
                </span>
                <span>Sent 9:32 PM</span>
              </div>
            </div>

            <div className="text-center text-white/70 text-xs">
              Student receives gentle affirmation instantly in hostel room
            </div>
          </div>

          {/* ACT 4: Emotional Relief & Calm Reconnection */}
          <div
            className={`absolute inset-0 p-5 sm:p-7 flex flex-col justify-between transition-all duration-700 ${
              currentAct === 3 ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                <span className="material-symbols-outlined text-sm text-emerald-300">spa</span>
                <span>Tension Released • Emotional Safety Complete</span>
              </div>
              <span className="text-white/70 text-xs">Mutual Trust Solidified</span>
            </div>

            {/* Calm Metric Visualization */}
            <div className="max-w-md mx-auto w-full text-center">
              <div className="inline-flex p-3 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 mb-2">
                <span className="material-symbols-outlined text-3xl">sentiment_satisfied</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                "Distance Should Never Mean Disconnection."
              </h3>
              <p className="text-xs sm:text-sm text-white/85 mt-1 max-w-sm mx-auto">
                No tension, no interrogation. Just the reassuring feeling that home is always behind you.
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-white/80">
              <span className="flex items-center gap-1 text-emerald-300">
                <span className="material-symbols-outlined text-xs">check_circle</span>
                <span>Mindset Restored</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#FFE28A]">
                <span className="material-symbols-outlined text-xs">favorite</span>
                <span>Family Bond Deepened</span>
              </span>
            </div>
          </div>

          {/* Floating Pill: Bottom Left Video Status */}
          <div className="absolute bottom-16 left-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs">
            <span className="w-2 h-2 rounded-full bg-[#FF9EAD] animate-pulse" />
            <span className="font-semibold text-white/90">{ACTS[currentAct].badge}</span>
          </div>
        </div>

        {/* Video Scrubber & Controls Bar */}
        <div className="p-3 sm:p-4 bg-[#FAF8FF] border-t border-surface-container flex flex-col gap-2.5">
          {/* Progress Scrubber */}
          <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-secondary-container to-tertiary transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Act Switcher Buttons & Controls */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform"
                title={isPlaying ? 'Pause Demo' : 'Play Demo'}
              >
                <span className="material-symbols-outlined text-sm">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
              
              <div className="hidden sm:flex items-center gap-1 text-xs text-on-surface-variant font-medium">
                <span>00:{String(Math.floor((progress / 100) * 16)).padStart(2, '0')}</span>
                <span>/</span>
                <span>00:16</span>
              </div>
            </div>

            {/* Act Chips */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {ACTS.map((act, idx) => (
                <button
                  key={act.id}
                  onClick={() => handleJumpToAct(idx)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all duration-200 flex items-center gap-1 ${
                    currentAct === idx
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white hover:bg-primary-fixed/40 text-on-surface-variant border border-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-xs">{act.icon}</span>
                  <span className="hidden md:inline">{act.title}</span>
                  <span className="md:hidden">0{act.id}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVideoExperience;

