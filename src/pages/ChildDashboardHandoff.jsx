import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Rocket,
  Star,
  Trophy,
  Lock,
  ArrowLeft,
  Flame,
  Award,
  Play,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { LifeVerseLogo } from '../components/common/LifeVerseLogo';
import { useOnboarding } from '../context/OnboardingContext';
import avatarSparkyImg from '../assets/avatar_sparky.png';

export const ChildDashboardHandoff = () => {
  const navigate = useNavigate();
  const { activeChild, switchRole, childrenList } = useOnboarding();

  const [showExitModal, setShowExitModal] = useState(false);
  const [parentPinInput, setParentPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const currentChild = activeChild || childrenList[0];

  const handleParentExit = (e) => {
    e.preventDefault();
    // Default demo parent unlock code is 0000 or any 4 digits
    if (parentPinInput === '0000' || parentPinInput.length === 4) {
      switchRole('PARENT');
      navigate('/parent/dashboard');
    } else {
      setPinError('Please enter 4 digits (Demo code: 0000)');
    }
  };

  const sampleQuests = [
    {
      id: 'q1',
      title: 'Cosmic Constellation Mystery',
      subject: 'Space & Science',
      xp: '150 XP',
      icon: '🌌',
      color: '#65BDEB',
      progress: 75,
    },
    {
      id: 'q2',
      title: 'Math Castle: Secret Geometry',
      subject: 'Mathematics',
      xp: '200 XP',
      icon: '🏰',
      color: '#FFD66B',
      progress: 40,
    },
    {
      id: 'q3',
      title: 'The Talking Forest Adventure',
      subject: 'Language & Stories',
      xp: '120 XP',
      icon: '🌲',
      color: '#F45124',
      progress: 10,
    },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-gradient-to-br from-[#081325] via-[#0c1b2d] to-[#12253d] text-white font-nunito overflow-x-hidden selection:bg-[#F45124] selection:text-white">
      
      {/* Playful Ambient Stardust Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#F45124]/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-10 w-[30rem] h-[30rem] bg-[#65BDEB]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[#FFD66B]/15 rounded-full blur-3xl" />
      </div>

      {/* Child Header Bar */}
      <header className="relative z-20 w-full px-4 sm:px-8 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LifeVerseLogo />
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD66B]/20 border border-[#FFD66B]/40 text-[#FFD66B] text-xs font-black">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Child Universe Active</span>
          </div>
        </div>

        {/* Child Badges + Parent Exit Lock */}
        <div className="flex items-center gap-3">
          {/* Curiosity Stars */}
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-black text-[#FFD66B]">
            <Star className="w-4 h-4 fill-[#FFD66B]" />
            <span>280 Stars</span>
          </div>

          {/* Daily Streak */}
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F45124]/20 border border-[#F45124]/30 text-xs font-black text-[#F45124]">
            <Flame className="w-4 h-4 fill-[#F45124]" />
            <span>5 Day Streak!</span>
          </div>

          {/* Parent Lock Gate */}
          <button
            type="button"
            onClick={() => setShowExitModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
            title="Exit Child Mode (Requires Parent Lock)"
          >
            <Lock className="w-3.5 h-3.5 text-[#FFD66B]" />
            <span className="hidden sm:inline">Parent Exit</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        
        {/* Child Hero Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border-2 border-white/25 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center sm:text-left">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden border-2 border-[#FFD66B] shadow-xl bg-[#0c1b2d] shrink-0">
              <img
                src={currentChild?.avatar?.avatarImg || avatarSparkyImg}
                alt={currentChild?.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#65BDEB]/20 text-[#65BDEB] text-[11px] font-extrabold uppercase mb-1">
                Level 4 Star Explorer
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-poppins">
                Welcome back, {currentChild?.nickname || currentChild?.name}! 🚀
              </h1>
              <p className="text-xs sm:text-sm text-white/80 mt-1">
                Your learning buddy <strong className="text-[#FFD66B]">{currentChild?.avatar?.name || 'Sparky'}</strong> has unlocked 3 new quests for you today!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-white/60 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
              Child Role Verified
            </span>
          </div>
        </div>

        {/* Quests Teaser */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-white font-poppins flex items-center gap-2">
              <Rocket className="w-5 h-5 text-[#F45124]" />
              <span>Today's Learning Quests</span>
            </h2>
            <span className="text-xs font-semibold text-[#65BDEB]">
              3 of 3 Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleQuests.map((quest) => (
              <div
                key={quest.id}
                className="p-5 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex flex-col justify-between gap-4 hover:scale-[1.02] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{quest.icon}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FFD66B]/20 text-[#FFD66B] text-[11px] font-extrabold border border-[#FFD66B]/30">
                      {quest.xp}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-white/60 uppercase tracking-wider block mt-3">
                    {quest.subject}
                  </span>
                  <h3 className="text-base font-bold text-white font-poppins mt-0.5">
                    {quest.title}
                  </h3>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] text-white/70 mb-1">
                    <span>Progress</span>
                    <span className="font-bold">{quest.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#F45124] to-[#FFD66B] rounded-full"
                      style={{ width: `${quest.progress}%` }}
                    />
                  </div>

                  <button
                    type="button"
                    className="w-full mt-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#F45124] to-[#FF6B4A] shadow-md shadow-orange-500/30 hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Continue Quest</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Isolation Security Notice for Role Separation */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs text-white/60">
          <Lock className="w-4 h-4 text-white/40 shrink-0" />
          <span>
            Child Universe is isolated: Billing, parent account settings, and multi-child management are completely locked.
          </span>
        </div>

      </main>

      {/* Parent Exit PIN Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-[#0c1b2d] border-2 border-white/25 shadow-2xl flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FFD66B]/20 border border-[#FFD66B]/40 text-[#FFD66B] flex items-center justify-center mb-3">
              <Lock className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-white font-poppins">
              Parent Security Gate
            </h3>
            <p className="text-xs text-white/70 mt-1">
              Enter your 4-digit Parent PIN to exit Child Universe and return to the Parent Dashboard.
            </p>

            <form onSubmit={handleParentExit} className="w-full mt-5 flex flex-col gap-4">
              <input
                type="password"
                maxLength={4}
                autoFocus
                placeholder="••••"
                value={parentPinInput}
                onChange={(e) => {
                  setParentPinInput(e.target.value);
                  if (pinError) setPinError('');
                }}
                className="w-40 mx-auto py-3 px-4 text-center text-2xl font-black tracking-widest rounded-2xl bg-white/10 border-2 border-[#65BDEB] text-white focus:outline-none focus:ring-4 focus:ring-sky-500/30"
              />

              {pinError && (
                <span className="text-xs text-red-400 font-semibold">{pinError}</span>
              )}

              <p className="text-[11px] text-white/50">
                Demo Hint: Enter any 4 numbers (e.g. 0000)
              </p>

              <div className="flex items-center gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowExitModal(false);
                    setParentPinInput('');
                    setPinError('');
                  }}
                  className="flex-1 py-2.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white"
                >
                  Stay in Kid Mode
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-full text-xs font-bold bg-[#F45124] hover:bg-[#e04216] text-white shadow-lg shadow-orange-600/30"
                >
                  Unlock Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-white/40 border-t border-white/10">
        <p>© 2026 LifeVerse AI Child Universe. Safe, ad-free exploration.</p>
      </footer>

    </div>
  );
};

export default ChildDashboardHandoff;

