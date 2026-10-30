import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Rocket,
  CheckCircle2,
  Calendar,
  Compass,
  Target,
  ShieldCheck,
  Edit3,
  Award,
  Star,
  Users,
  ChevronRight
} from 'lucide-react';
import { LifeVerseLogo } from '../../components/common/LifeVerseLogo';
import { useOnboarding } from '../../context/OnboardingContext';
import avatarSparkyImg from '../../assets/avatar_sparky.png';

export const SuccessPage = () => {
  const navigate = useNavigate();
  const { parentAccount, childrenList, switchRole } = useOnboarding();

  const handleEnterDashboard = () => {
    switchRole('PARENT');
    navigate('/parent/dashboard');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-gradient-to-br from-[#0c1b2d] via-[#12253d] to-[#081325] text-white overflow-x-hidden font-nunito">
      
      {/* Confetti & Cosmic Starfield Ambient Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#F45124]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-[36rem] h-[36rem] bg-[#65BDEB]/25 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-[32rem] h-[32rem] bg-[#9375E8]/20 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-20 w-full px-4 sm:px-8 py-5 border-b border-white/10 bg-white/5 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <LifeVerseLogo />
          <Link
            to="/"
            className="text-xs sm:text-sm font-semibold text-white/80 hover:text-white px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 transition-all"
          >
            Home Page
          </Link>
        </div>
      </header>

      {/* Main Celebratory Container */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center">
        
        {/* Celebration Trophy & Sparkle Pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#F45124]/30 via-[#FFD66B]/20 to-[#65BDEB]/30 border border-[#FFD66B]/40 text-[#FFD66B] text-xs sm:text-sm font-extrabold shadow-lg mb-6 animate-pulse-subtle">
          <Sparkles className="w-4 h-4 text-[#FFD66B]" />
          <span>Family Onboarding Complete!</span>
          <Sparkles className="w-4 h-4 text-[#FFD66B]" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white text-center tracking-tight font-poppins">
          Your Family Universe Is Ready!
        </h1>
        
        <p className="mt-3 text-sm sm:text-base md:text-lg text-white/80 text-center max-w-2xl leading-relaxed">
          Welcome to LifeVerse AI! All <strong className="text-[#65BDEB]">{childrenList.length} child profiles</strong> have been linked to parent account <strong className="text-white underline decoration-[#F45124] underline-offset-4">{parentAccount?.email}</strong>.
        </p>

        {/* Multi-Child Explorer Passports Grid */}
        <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {childrenList.map((child) => (
            <div
              key={child.id}
              className="rounded-3xl bg-white/10 backdrop-blur-xl border-2 border-white/25 shadow-2xl overflow-hidden flex flex-col justify-between"
            >
              {/* Card Header */}
              <div className="px-5 py-3.5 bg-gradient-to-r from-[#F45124] via-[#9375E8] to-[#65BDEB] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#FFD66B]" />
                  <span className="text-xs font-black uppercase tracking-wider text-white">
                    Official Explorer Passport
                  </span>
                </div>
                <span className="text-[10px] font-bold bg-white/20 px-2.5 py-0.5 rounded-full text-white">
                  PIN: {child.pin || '1234'}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-lg bg-[#0c1b2d] shrink-0">
                    <img
                      src={child.avatar?.avatarImg || avatarSparkyImg}
                      alt={child.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-white font-poppins">
                      {child.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#65BDEB] font-semibold mt-0.5">
                      <span>{child.ageGroup}</span>
                      <span>•</span>
                      <span>{child.grade || 'Grade 1'}</span>
                    </div>
                    <span className="text-[11px] text-white/70 italic mt-0.5">
                      Companion: {child.avatar?.name || 'Sparky McWonder'}
                    </span>
                  </div>
                </div>

                {/* Interests Pills */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                    Selected Passions:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {(child.interests || ['Space & Science']).map((int) => (
                      <span
                        key={int}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFD66B]/15 text-[#FFD66B] border border-[#FFD66B]/25"
                      >
                        {int}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Goals Pills */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                    Growth Goals:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {(child.learningGoals || ['Improve Problem Solving']).map((goal) => (
                      <span
                        key={goal}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#65BDEB]/15 text-[#65BDEB] border border-[#65BDEB]/25"
                      >
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer status */}
              <div className="px-5 py-3 bg-white/5 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ready for Quests</span>
                </span>
                <span className="text-white/50">ID: {child.id}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Global Action Banner */}
        <div className="w-full mt-8 p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <strong className="text-sm sm:text-base font-bold text-white block">
                Parent Control Center Ready
              </strong>
              <p className="text-xs text-white/70">
                Manage screen time, assign quest packs, or switch to Child Mode anytime.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              to="/onboarding/child"
              className="px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-center flex-1 sm:flex-none"
            >
              <Edit3 className="w-3.5 h-3.5 inline mr-1" />
              <span>Edit Profiles</span>
            </Link>

            <button
              type="button"
              onClick={handleEnterDashboard}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm sm:text-base font-extrabold text-white bg-gradient-to-r from-[#F45124] to-[#FF6B4A] hover:from-[#e04216] hover:to-[#f05a39] shadow-xl shadow-orange-600/40 hover:scale-[1.02] transition-all cursor-pointer flex-1 sm:flex-none"
            >
              <Rocket className="w-4 h-4" />
              <span>Enter Parent Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </main>

      {/* Subtle Footer Note */}
      <footer className="relative z-10 w-full px-4 py-4 text-center text-xs text-white/50 border-t border-white/10">
        <p>© 2026 LifeVerse AI Family Onboarding. Adventure unlocked!</p>
      </footer>
    </div>
  );
};

export default SuccessPage;
