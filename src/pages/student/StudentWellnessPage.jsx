import React, { useState, useEffect, useRef } from 'react';
import {
  HeartPulse,
  Play,
  Pause,
  RotateCcw,
  Wind,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  X,
  Volume2,
  VolumeX,
  ShieldCheck,
  AlertCircle,
  Calendar,
  History,
  Trash2,
  BookOpen,
  Sliders,
  ChevronRight,
  Flame,
  Check,
  Info
} from 'lucide-react';
import {
  getWellnessActivities,
  getWellnessActivityById,
  getWellnessSessionHistory,
  recordWellnessSession,
  deleteWellnessSession,
  getWellnessWeeklySummary
} from '../../server/wellnessBackend';

export const StudentWellnessPage = () => {
  // Navigation / Tabs
  // 'all' | 'focus' | 'breathing' | 'relaxation' | 'reflection' | 'sessions'
  const [activeTab, setActiveTab] = useState('all');

  // Backend Data State
  const [activities, setActivities] = useState([]);
  const [recentSessions, setRecentSessions] = useState([]);
  const [weeklySummary, setWeeklySummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Accessibility & Preferences
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('highorbit_wellness_reduced_motion');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Active Runner State
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [runnerState, setRunnerState] = useState('idle'); // 'idle' | 'running' | 'paused' | 'completed'
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Breathing Specific State
  const [breathPhase, setBreathPhase] = useState('Inhale'); // 'Inhale' | 'Hold' | 'Exhale' | 'Rest'
  const [breathCount, setBreathCount] = useState(4);
  const [breathCyclesCompleted, setBreathCyclesCompleted] = useState(0);

  // Completion & Reflection
  const [reflectionInput, setReflectionInput] = useState('');
  const [selectedMood, setSelectedMood] = useState('Calm & Centered');
  const [completedSummary, setCompletedSummary] = useState(null);

  // Sound effects toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Load backend activities and history
  const loadData = () => {
    try {
      setLoading(true);
      setError(null);
      const allActs = getWellnessActivities('all');
      const sessions = getWellnessSessionHistory('student_1');
      const summary = getWellnessWeeklySummary('student_1');

      setActivities(allActs);
      setRecentSessions(sessions);
      setWeeklySummary(summary);
    } catch (err) {
      console.error('Error loading wellness activities:', err);
      setError('Unable to load wellness activities from the backend. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleReducedMotion = () => {
    setReducedMotion((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('highorbit_wellness_reduced_motion', String(next));
      }
      return next;
    });
  };

  // Open an activity runner
  const handleOpenActivity = (activity) => {
    setSelectedActivity(activity);
    setRunnerState('idle');
    setElapsedSeconds(0);
    setRemainingSeconds(activity.durationSeconds || 300);
    setActiveStepIndex(0);
    setShowExitConfirm(false);
    setReflectionInput('');
    setSelectedMood('Calm & Centered');
    setCompletedSummary(null);
    setBreathPhase('Inhale');
    setBreathCount(activity.breathingCycle?.inhale || 4);
    setBreathCyclesCompleted(0);
  };

  // Safe Exit Handler
  const handleRequestExit = () => {
    if (runnerState === 'running') {
      setShowExitConfirm(true);
    } else {
      handleCloseRunner();
    }
  };

  const handleConfirmExit = () => {
    setShowExitConfirm(false);
    handleCloseRunner();
  };

  const handleCloseRunner = () => {
    setSelectedActivity(null);
    setRunnerState('idle');
    setElapsedSeconds(0);
    setCompletedSummary(null);
  };

  // Start / Pause / Resume
  const handleStartActivity = () => {
    setRunnerState('running');
  };

  const handlePauseActivity = () => {
    setRunnerState('paused');
  };

  const handleResumeActivity = () => {
    setRunnerState('running');
  };

  const handleResetActivity = () => {
    setRunnerState('idle');
    setElapsedSeconds(0);
    if (selectedActivity) {
      setRemainingSeconds(selectedActivity.durationSeconds || 300);
      setBreathCount(selectedActivity.breathingCycle?.inhale || 4);
      setBreathPhase('Inhale');
    }
  };

  // Complete session rule: record to backend and show summary
  const handleCompleteSession = () => {
    if (!selectedActivity) return;
    setRunnerState('completed');

    const finalDuration = elapsedSeconds > 0 ? elapsedSeconds : selectedActivity.durationSeconds;
    const summaryData = {
      title: selectedActivity.title,
      category: selectedActivity.category,
      durationSeconds: finalDuration,
      completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      cycles: breathCyclesCompleted
    };
    setCompletedSummary(summaryData);
  };

  // Final Save to Backend
  const handleSaveReflectionAndClose = () => {
    if (!selectedActivity || !completedSummary) return;

    recordWellnessSession({
      studentId: 'student_1',
      activityId: selectedActivity.id,
      activityTitle: selectedActivity.title,
      category: selectedActivity.category,
      durationSeconds: completedSummary.durationSeconds,
      completed: true,
      reflectionNote: reflectionInput,
      moodAfter: selectedMood,
      reducedMotionUsed: reducedMotion
    });

    // Refresh history
    loadData();
    handleCloseRunner();
  };

  // Delete a session from history
  const handleDeleteSession = (sessionId) => {
    deleteWellnessSession(sessionId, 'student_1');
    loadData();
  };

  // Main Timer Interval
  useEffect(() => {
    let timer = null;
    if (runnerState === 'running' && remainingSeconds > 0) {
      timer = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleCompleteSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [runnerState, remainingSeconds]);

  // Breathing Engine Interval
  useEffect(() => {
    let breathTimer = null;
    if (runnerState === 'running' && selectedActivity?.category === 'breathing') {
      const cycle = selectedActivity.breathingCycle || {
        inhale: 4,
        hold1: 4,
        exhale: 4,
        hold2: 4
      };

      breathTimer = setInterval(() => {
        setBreathCount((prev) => {
          if (prev <= 1) {
            // Transition phase
            setBreathPhase((current) => {
              if (current === 'Inhale') {
                if (cycle.hold1 > 0) {
                  return 'Hold';
                }
                return 'Exhale';
              } else if (current === 'Hold') {
                return 'Exhale';
              } else if (current === 'Exhale') {
                if (cycle.hold2 > 0) {
                  return 'Rest';
                }
                setBreathCyclesCompleted((c) => c + 1);
                return 'Inhale';
              } else {
                setBreathCyclesCompleted((c) => c + 1);
                return 'Inhale';
              }
            });

            // Set duration for next phase
            if (breathPhase === 'Inhale') {
              return cycle.hold1 > 0 ? cycle.hold1 : cycle.exhale;
            } else if (breathPhase === 'Hold') {
              return cycle.exhale;
            } else if (breathPhase === 'Exhale') {
              return cycle.hold2 > 0 ? cycle.hold2 : cycle.inhale;
            } else {
              return cycle.inhale;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(breathTimer);
  }, [runnerState, breathPhase, selectedActivity]);

  // Helper formatting
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Filter activities based on tab
  const filteredActivities = activities.filter((act) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'sessions') return false;
    return act.category === activeTab;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E6DEFF]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#EBE5FF] text-primary border border-[#E6DEFF]">
              Student Wellness
            </span>
            <span className="text-xs text-[#6A6678] font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Self-Regulation Studio
            </span>
          </div>
          <h2 className=" text-2xl sm:text-3xl font-bold text-[#1b1831] tracking-tight mt-1">
            Focus & Wellness Studio
          </h2>
          <p className="text-xs sm:text-sm text-[#6A6678] mt-1 max-w-2xl">
            Sustained cognitive focus, guided pacing, nervous system relaxation, and reflective clarity for balanced academic performance.
          </p>
        </div>

        {/* Accessibility & Stats Toolbar */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleReducedMotion}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              reducedMotion
                ? 'bg-primary text-white border-[#E6DEFF] shadow-xs'
                : 'bg-white text-[#1b1831] border-[#E6DEFF] hover:bg-[#FCF8FF]'
            }`}
            title="Toggle reduced motion animations for comfortable viewing"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Reduced Motion: {reducedMotion ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* 2. Weekly Health / Habit Snapshot */}
      {weeklySummary && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-white border border-[#E6DEFF] shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6A6678]">
              Sessions This Week
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-bold text-primary">
                {weeklySummary.completedThisWeek}
              </span>
              <span className="text-xs text-[#4B735F] font-semibold">completed</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E6DEFF] shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6A6678]">
              Mindful Study Time
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-bold text-primary">
                {weeklySummary.totalMinutesThisWeek}
              </span>
              <span className="text-xs text-[#4B735F] font-semibold">mins logged</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E6DEFF] shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6A6678]">
              Breathing & Focus
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-bold text-primary">
                {weeklySummary.byCategory.breathing + weeklySummary.byCategory.focus}
              </span>
              <span className="text-xs text-[#6A6678] font-semibold">practices</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E6DEFF] shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6A6678]">
              Relax & Reflection
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-bold text-primary">
                {weeklySummary.byCategory.relaxation + weeklySummary.byCategory.reflection}
              </span>
              <span className="text-xs text-[#6A6678] font-semibold">insights</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Section Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#F3EFFF] border border-[#E6DEFF] overflow-x-auto scrollbar-none">
        {[
          { id: 'all', label: 'All Activities', count: activities.length },
          { id: 'focus', label: 'Focus Exercises', count: activities.filter((a) => a.category === 'focus').length },
          { id: 'breathing', label: 'Guided Breathing', count: activities.filter((a) => a.category === 'breathing').length },
          { id: 'relaxation', label: 'Relaxation Activities', count: activities.filter((a) => a.category === 'relaxation').length },
          { id: 'reflection', label: 'Reflection Activities', count: activities.filter((a) => a.category === 'reflection').length },
          { id: 'sessions', label: `Recent Sessions (${recentSessions.length})`, count: recentSessions.length }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-primary text-white border border-[#E6DEFF] shadow-xs'
                : 'text-[#1b1831] hover:text-black hover:bg-black/5'
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 4. Loading & Error States */}
      {loading && (
        <div className="p-12 text-center rounded-3xl bg-white border border-[#E6DEFF]">
          <div className="w-8 h-8 mx-auto border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="mt-3 text-xs font-semibold text-[#6A6678]">
            Loading configured wellness activities from server...
          </p>
        </div>
      )}

      {error && (
        <div className="p-6 rounded-2xl bg-[#FFF5F5] border border-red-300 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-red-800">Connection Notice</h4>
            <p className="text-xs text-red-700 mt-0.5">{error}</p>
            <button
              type="button"
              onClick={loadData}
              className="mt-2 text-xs font-bold text-red-800 underline cursor-pointer"
            >
              Retry Loading
            </button>
          </div>
        </div>
      )}

      {/* 5. Activities Grid View (When not in Recent Sessions tab) */}
      {!loading && !error && activeTab !== 'sessions' && (
        <>
          {filteredActivities.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-[#E6DEFF]">
              <Sparkles className="w-8 h-8 mx-auto text-[#6A6678] mb-2" />
              <p className="text-sm font-bold text-[#1b1831]">No activities found in this section</p>
              <p className="text-xs text-[#6A6678] mt-1">Switch to All Activities to explore available sessions.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-6 rounded-3xl bg-white border border-[#E6DEFF] hover:border-black/60 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          act.category === 'focus'
                            ? 'bg-[#EBF3EF] text-primary border-[#E6DEFF]'
                            : act.category === 'breathing'
                            ? 'bg-[#E8F4F8] text-[#1D5C75] border-[#E6DEFF]'
                            : act.category === 'relaxation'
                            ? 'bg-[#F4EFEA] text-[#7A4B29] border-[#E6DEFF]'
                            : 'bg-[#F2EDF8] text-[#5A3882] border-[#E6DEFF]'
                        }`}
                      >
                        {act.category === 'focus'
                          ? 'Focus Exercise'
                          : act.category === 'breathing'
                          ? 'Guided Breathing'
                          : act.category === 'relaxation'
                          ? 'Relaxation'
                          : 'Reflection'}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-[#6A6678]">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span>{act.durationMinutes} min</span>
                      </div>
                    </div>

                    <div>
                      <h3 className=" text-lg font-bold text-[#1b1831] group-hover:text-primary transition-colors">
                        {act.title}
                      </h3>
                      <p className="text-xs text-[#6A6678] mt-1 line-clamp-2 leading-relaxed">
                        {act.subtitle || act.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {act.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium text-[#4B735F] bg-[#FCF8FF] border border-[#E6DEFF] px-2 py-0.5 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-[#E6DEFF] flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#6A6678]">
                      {act.instructions?.length || 4} guided steps
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenActivity(act)}
                      className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl bg-primary text-white hover:bg-[#123024] text-xs font-bold border border-[#E6DEFF] shadow-2xs transition-all cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Start Activity</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* 6. Recent Sessions Section */}
      {!loading && !error && activeTab === 'sessions' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DEFF] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6DEFF]">
            <div>
              <h3 className=" text-lg font-bold text-[#1b1831] flex items-center gap-2">
                <History className="w-5 h-5 text-primary" />
                <span>Recent Wellness Sessions</span>
              </h3>
              <p className="text-xs text-[#6A6678] mt-0.5">
                Session history tracked for this student account.
              </p>
            </div>
            <span className="text-xs font-bold text-primary bg-[#EBE5FF] px-3 py-1 rounded-full border border-[#E6DEFF]">
              {recentSessions.length} Recorded
            </span>
          </div>

          {recentSessions.length === 0 ? (
            <div className="p-10 text-center rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF]">
              <History className="w-8 h-8 mx-auto text-[#6A6678] mb-2" />
              <p className="text-sm font-bold text-[#1b1831]">No session records yet</p>
              <p className="text-xs text-[#6A6678] mt-1">
                Complete any focus sprint or breathing exercise to begin logging your consistency.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-black/15">
              {recentSessions.map((ses) => (
                <div key={ses.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className=" text-sm font-bold text-[#1b1831]">
                        {ses.activityTitle}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-[#EBE5FF] px-2 py-0.5 rounded-full border border-[#E6DEFF]">
                        {ses.category}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#6A6678]">
                      <span>{ses.completedAt || ses.startedAt}</span>
                      <span>•</span>
                      <span>Duration: {Math.round((ses.durationSeconds || 0) / 60)} mins</span>
                      {ses.moodAfter && (
                        <>
                          <span>•</span>
                          <span className="text-primary font-semibold">Mood: {ses.moodAfter}</span>
                        </>
                      )}
                    </div>
                    {ses.reflectionNote && (
                      <p className="text-xs text-[#444] bg-[#FCF8FF] p-2.5 rounded-xl border border-[#E6DEFF] mt-2 italic">
                        "{ses.reflectionNote}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary bg-[#EBE5FF] px-2.5 py-1 rounded-lg border border-[#E6DEFF]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteSession(ses.id)}
                      className="p-1.5 rounded-lg text-[#6A6678] hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-[#E6DEFF] transition-all cursor-pointer"
                      title="Delete record from your history"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 7. Non-Medical Disclaimer Footer */}
      <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E6DEFF] flex items-start gap-3">
        <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p className="text-[11px] sm:text-xs text-[#555] leading-relaxed">
          <strong className="text-[#1b1831]">Educational Self-Care Notice:</strong> HighOrbit Focus & Wellness exercises are self-guided educational techniques engineered to assist everyday concentration, study time management, and routine relaxation. They do not constitute medical treatment, therapy, clinical mental health diagnosis, or healthcare advice.
        </p>
      </div>

      {/* =========================================================================
          ACTIVITY RUNNER MODAL / EXPERIENCE
          ========================================================================= */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#FCF8FF] rounded-3xl border border-[#E6DEFF] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-white border-b border-[#E6DEFF] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-[#EBE5FF] px-2 py-0.5 rounded-full border border-[#E6DEFF]">
                  {selectedActivity.category.toUpperCase()} • {selectedActivity.durationMinutes} MIN
                </span>
                <h3 className=" text-lg sm:text-xl font-bold text-[#1b1831] mt-1">
                  {selectedActivity.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={handleRequestExit}
                className="p-2 rounded-xl text-[#6A6678] hover:text-black hover:bg-[#F3EFFF] border border-[#E6DEFF] transition-all cursor-pointer"
                title="Exit Activity"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Runner Area */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1">
              
              {/* EXIT CONFIRMATION OVERLAY */}
              {showExitConfirm && (
                <div className="p-5 rounded-2xl bg-[#FFF9F0] border border-amber-300 space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    <span>Exit in-progress session?</span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    You have an active session running ({formatTime(remainingSeconds)} remaining). If you exit now, this session will not be saved as completed.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowExitConfirm(false)}
                      className="px-3.5 py-1.5 rounded-xl bg-white text-[#1b1831] text-xs font-bold border border-[#E6DEFF] hover:bg-[#F3EFFF] cursor-pointer"
                    >
                      Resume Session
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmExit}
                      className="px-3.5 py-1.5 rounded-xl bg-red-700 text-white text-xs font-bold border border-[#E6DEFF] hover:bg-red-800 cursor-pointer"
                    >
                      Exit Without Saving
                    </button>
                  </div>
                </div>
              )}

              {/* IDLE OR RUNNING OR PAUSED STATE */}
              {runnerState !== 'completed' && (
                <>
                  {/* Visualizer Area */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DEFF] shadow-xs flex flex-col items-center justify-center text-center relative min-h-[220px]">
                    
                    {/* Breathing Visualizer */}
                    {selectedActivity.category === 'breathing' ? (
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div
                          className={`relative flex items-center justify-center rounded-full transition-all duration-1000 ${
                            reducedMotion ? '' : 'transition-transform'
                          }`}
                          style={{
                            width: reducedMotion ? '140px' : breathPhase === 'Inhale' ? '180px' : breathPhase === 'Exhale' ? '110px' : '150px',
                            height: reducedMotion ? '140px' : breathPhase === 'Inhale' ? '180px' : breathPhase === 'Exhale' ? '110px' : '150px',
                            backgroundColor: breathPhase === 'Inhale' ? '#EDF2EC' : breathPhase === 'Hold' ? '#E8F4F8' : '#F1EDE2',
                            border: '3px solid #193F30'
                          }}
                        >
                          <div className="text-center">
                            <span className=" text-2xl sm:text-3xl font-bold text-primary block">
                              {runnerState === 'idle' ? 'Ready' : breathCount}
                            </span>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B735F]">
                              {runnerState === 'idle' ? 'Press Start' : breathPhase}
                            </span>
                          </div>
                        </div>

                        {reducedMotion && (
                          <div className="text-xs font-semibold text-[#6A6678]">
                            Reduced motion mode active: pace indicated by counts & text phase.
                          </div>
                        )}

                        <div className="text-xs text-[#6A6678] font-medium">
                          Cycles Completed: <strong className="text-primary">{breathCyclesCompleted}</strong>
                        </div>
                      </div>
                    ) : (
                      /* Focus / Relaxation / Reflection Timer Visualizer */
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="w-36 h-36 rounded-full border-4 border-primary bg-[#EBE5FF] flex flex-col items-center justify-center shadow-xs">
                          <span className=" text-3xl font-bold text-primary tracking-tight">
                            {formatTime(remainingSeconds)}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B735F] mt-0.5">
                            {runnerState === 'running'
                              ? 'In Progress'
                              : runnerState === 'paused'
                              ? 'Paused'
                              : 'Ready'}
                          </span>
                        </div>
                        <p className="text-xs text-[#6A6678]">
                          Technique: <strong className="text-[#1b1831]">{selectedActivity.technique || 'Guided Practice'}</strong>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Instructions Checklist */}
                  <div className="space-y-3 bg-white p-5 rounded-2xl border border-[#E6DEFF]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#6A6678] flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-primary" />
                      <span>Step-by-Step Instructions</span>
                    </h4>
                    <ol className="space-y-2 text-xs text-[#333]">
                      {selectedActivity.instructions?.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="w-4 h-4 rounded-full bg-[#EBE5FF] text-primary border border-[#E6DEFF] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Tips Note */}
                  {selectedActivity.tips?.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E6DEFF] text-xs text-[#555] italic">
                      💡 <strong>Focus Tip:</strong> {selectedActivity.tips[0]}
                    </div>
                  )}
                </>
              )}

              {/* COMPLETED STATE & REFLECTION CONFIRMATION */}
              {runnerState === 'completed' && completedSummary && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="p-6 rounded-3xl bg-[#EBE5FF] border border-[#E6DEFF] text-center space-y-2">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-primary text-white flex items-center justify-center shadow-xs">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className=" text-xl font-bold text-primary">
                      Session Completed!
                    </h3>
                    <p className="text-xs text-[#4B735F] max-w-md mx-auto">
                      Great effort taking care of your cognitive balance. Here is your session summary:
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="p-4 rounded-2xl bg-white border border-[#E6DEFF] grid grid-cols-3 gap-3 text-center">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A6678] block">
                        Activity
                      </span>
                      <span className=" text-sm font-bold text-[#1b1831]">
                        {completedSummary.title}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A6678] block">
                        Time Logged
                      </span>
                      <span className=" text-sm font-bold text-primary">
                        {formatTime(completedSummary.durationSeconds)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A6678] block">
                        Completed At
                      </span>
                      <span className=" text-sm font-bold text-[#1b1831]">
                        {completedSummary.completedAt}
                      </span>
                    </div>
                  </div>

                  {/* Optional Reflection */}
                  <div className="space-y-3 bg-white p-5 rounded-2xl border border-[#E6DEFF]">
                    <label className="text-xs font-bold text-[#1b1831] block">
                      Optional Reflection: How do you feel after this session?
                    </label>
                    <textarea
                      value={reflectionInput}
                      onChange={(e) => setReflectionInput(e.target.value)}
                      rows={3}
                      placeholder="e.g., Felt my shoulders drop, clearer mind, ready to tackle math questions..."
                      className="w-full text-xs p-3 rounded-xl bg-[#FCF8FF] border border-[#E6DEFF] focus:outline-hidden focus:border-primary"
                    />

                    <div>
                      <span className="text-[11px] font-semibold text-[#6A6678] block mb-1.5">
                        Select your current state:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {['Calm & Centered', 'Focused & Energized', 'Relieved', 'Grateful & Ready'].map((mood) => (
                          <button
                            key={mood}
                            type="button"
                            onClick={() => setSelectedMood(mood)}
                            className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                              selectedMood === mood
                                ? 'bg-primary text-white border-[#E6DEFF] shadow-2xs'
                                : 'bg-[#FCF8FF] text-[#1b1831] border-[#E6DEFF] hover:border-[#E6DEFF]'
                            }`}
                          >
                            {mood}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Controls Footer */}
            <div className="p-4 sm:p-5 bg-white border-t border-[#E6DEFF] flex items-center justify-between gap-3">
              {runnerState !== 'completed' ? (
                <>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleResetActivity}
                      className="p-2.5 rounded-xl border border-[#E6DEFF] text-[#6A6678] hover:text-[#1b1831] hover:bg-[#FCF8FF] transition-all cursor-pointer"
                      title="Reset timer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    {runnerState === 'running' && (
                      <button
                        type="button"
                        onClick={handleCompleteSession}
                        className="px-3 py-2 rounded-xl text-xs font-bold text-primary hover:bg-[#EBE5FF] border border-[#E6DEFF] transition-all cursor-pointer"
                      >
                        Finish & Save Early
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {runnerState === 'idle' && (
                      <button
                        type="button"
                        onClick={handleStartActivity}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-[#123024] text-white text-xs font-bold border border-[#E6DEFF] shadow-xs transition-all cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Start Practice</span>
                      </button>
                    )}

                    {runnerState === 'running' && (
                      <button
                        type="button"
                        onClick={handlePauseActivity}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold border border-[#E6DEFF] shadow-xs transition-all cursor-pointer"
                      >
                        <Pause className="w-4 h-4 fill-current" />
                        <span>Pause</span>
                      </button>
                    )}

                    {runnerState === 'paused' && (
                      <button
                        type="button"
                        onClick={handleResumeActivity}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-[#123024] text-white text-xs font-bold border border-[#E6DEFF] shadow-xs transition-all cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Resume</span>
                      </button>
                    )}
                  </div>
                </>
              ) : (
                /* Completed State Buttons */
                <div className="w-full flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseRunner}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#6A6678] hover:text-black border border-[#E6DEFF] cursor-pointer"
                  >
                    Close Without Saving
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveReflectionAndClose}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-[#123024] text-white text-xs font-bold border border-[#E6DEFF] shadow-xs cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save to My History</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default StudentWellnessPage;
