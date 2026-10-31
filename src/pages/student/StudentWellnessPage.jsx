import React, { useState, useEffect } from 'react';
import { HeartPulse, Play, Pause, RotateCcw, Wind, Sparkles, CheckCircle2 } from 'lucide-react';

export const StudentWellnessPage = () => {
  // Focus Timer State
  const [timerMode, setTimerMode] = useState('focus'); // 'focus' (25m) | 'break' (5m)
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  // Box Breathing State
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Inhale'); // Inhale, Hold, Exhale, Hold
  const [breathCount, setBreathCount] = useState(4);

  // Focus Timer interval
  useEffect(() => {
    let interval = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  // Box Breathing interval
  useEffect(() => {
    let breathInterval = null;
    if (breathingActive) {
      breathInterval = setInterval(() => {
        setBreathCount((prev) => {
          if (prev <= 1) {
            setBreathPhase((current) => {
              switch (current) {
                case 'Inhale': return 'Hold';
                case 'Hold': return 'Exhale';
                case 'Exhale': return 'Rest & Hold';
                case 'Rest & Hold': return 'Inhale';
                default: return 'Inhale';
              }
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(breathInterval);
  }, [breathingActive]);

  const toggleTimer = () => setTimerRunning(!timerRunning);

  const resetTimer = (mode = timerMode) => {
    setTimerRunning(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const handleModeChange = (mode) => {
    setTimerMode(mode);
    resetTimer(mode);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202923] tracking-tight">
          Focus & Wellness Studio
        </h2>
        <p className="text-xs sm:text-sm text-[#737A73] mt-1">
          Calm your nervous system, regulate exam stress, and maintain sustained concentration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* 1. Deep Work Pomodoro Timer */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/30 hover:border-black/50 shadow-xs transition-all flex flex-col items-center text-center justify-between gap-6">
          <div className="w-full flex items-center justify-between pb-3 border-b border-black/20">
            <span className="text-xs font-bold uppercase tracking-wider text-[#737A73]">
              Deep Work Timer
            </span>
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#F1EDE2] border border-black/30">
              <button
                type="button"
                onClick={() => handleModeChange('focus')}
                className={`py-1 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  timerMode === 'focus' ? 'bg-[#193F30] text-white border border-black/30 shadow-xs' : 'text-[#202923] hover:text-black'
                }`}
              >
                25m Focus
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('break')}
                className={`py-1 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  timerMode === 'break' ? 'bg-[#193F30] text-white border border-black/30 shadow-xs' : 'text-[#202923] hover:text-black'
                }`}
              >
                5m Reset
              </button>
            </div>
          </div>

          <div className="my-4">
            <div className="font-serif text-6xl sm:text-7xl font-bold text-[#202923] tracking-tighter">
              {formatTime(timeLeft)}
            </div>
            <p className="text-xs text-[#737A73] mt-2">
              {timerRunning ? 'Sprint in progress. Silence notifications.' : 'Ready when you are.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTimer}
              className="py-3 px-8 rounded-full text-sm font-semibold text-white bg-[#193F30] hover:bg-[#204936] transition-colors flex items-center gap-2 border border-black/30 shadow-xs cursor-pointer"
            >
              {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{timerRunning ? 'Pause Sprint' : 'Start Focus Sprint'}</span>
            </button>

            <button
              type="button"
              onClick={() => resetTimer()}
              className="p-3 rounded-full bg-[#F1EDE2] text-[#202923] hover:bg-[#E5E0D5] border border-black/30 shadow-xs transition-colors cursor-pointer"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Box Breathing Exercise (4-4-4-4) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/30 hover:border-black/50 shadow-xs transition-all flex flex-col items-center text-center justify-between gap-6">
          <div className="w-full flex items-center justify-between pb-3 border-b border-black/20">
            <span className="text-xs font-bold uppercase tracking-wider text-[#737A73]">
              Nervous System Reset
            </span>
            <span className="text-xs font-semibold text-[#193F30] bg-[#EDF2EC] px-2.5 py-0.5 rounded-full border border-black/20">
              Box Breathing 4-4-4-4
            </span>
          </div>

          <div className="my-2 flex flex-col items-center">
            {/* Pulsing breathing visual */}
            <div
              className={`w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-1000 ${
                breathingActive
                  ? breathPhase === 'Inhale'
                    ? 'scale-110 border-[#193F30] bg-[#EDF2EC] shadow-sm'
                    : breathPhase === 'Exhale'
                    ? 'scale-90 border-[#9CCDB0] bg-[#F1EDE2] shadow-sm'
                    : 'scale-100 border-[#204936] bg-[#F8F7F2] shadow-sm'
                  : 'border-black/30 bg-[#F8F7F2]'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-[#193F30]">
                {breathingActive ? breathPhase : 'Ready'}
              </span>
              <span className="font-serif text-3xl font-bold text-[#202923] mt-1">
                {breathingActive ? breathCount : '4s'}
              </span>
            </div>
            <p className="text-xs text-[#737A73] mt-4 max-w-xs leading-relaxed">
              Inhale 4s • Hold 4s • Exhale 4s • Rest 4s. Used by athletes to instantly lower cortisol.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setBreathingActive(!breathingActive);
              setBreathPhase('Inhale');
              setBreathCount(4);
            }}
            className="py-3 px-8 rounded-full text-sm font-semibold text-[#193F30] bg-[#EDF2EC] hover:bg-[#E5E0D5] border border-black/30 shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Wind className="w-4 h-4 text-[#193F30]" />
            <span>{breathingActive ? 'Stop Exercise' : 'Start 4-Minute Breathing'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentWellnessPage;
