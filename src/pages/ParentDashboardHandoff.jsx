import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  ShieldCheck,
  Sparkles,
  Rocket,
  Clock,
  BookOpen,
  Settings,
  LogOut,
  ChevronRight,
  Plus,
  Play,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { LifeVerseLogo } from '../components/common/LifeVerseLogo';
import { useOnboarding } from '../context/OnboardingContext';
import avatarSparkyImg from '../assets/avatar_sparky.png';

export const ParentDashboardHandoff = () => {
  const navigate = useNavigate();
  const {
    parentAccount,
    childrenList,
    switchRole,
    logout,
  } = useOnboarding();

  const [activeChildTab, setActiveChildTab] = useState(childrenList[0]?.id || 'child_1');

  const selectedChild =
    childrenList.find((c) => c.id === activeChildTab) || childrenList[0];

  const handleLaunchChildMode = (childId) => {
    switchRole('CHILD', childId);
    navigate('/child/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#081325] text-white font-nunito selection:bg-[#F45124] selection:text-white">
      
      {/* Top Parent Dashboard Header */}
      <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 border-b border-white/10 bg-[#0c1b2d]/90 backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <LifeVerseLogo />
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#65BDEB]/15 border border-[#65BDEB]/30 text-xs font-bold text-[#65BDEB]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Parent Control Hub</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-xs font-bold text-white">
              {parentAccount?.name || 'Alex McWonder'}
            </span>
            <span className="text-[11px] text-white/60">
              {parentAccount?.email}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
            title="Sign out of Parent Account"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        
        {/* Handoff Notice Banner */}
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#65BDEB]/20 via-[#9375E8]/15 to-[#F45124]/20 border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#65BDEB]/30 border border-[#65BDEB] flex items-center justify-center text-xl shrink-0">
              🚀
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h2 className="text-sm sm:text-base font-extrabold text-white font-poppins">
                  Project 02 Destination Handoff: Parent Dashboard
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#FFD66B] text-[#081325] text-[10px] font-black uppercase">
                  Frontend Ready
                </span>
              </div>
              <p className="text-xs text-white/80 mt-0.5">
                Authentication & Family Onboarding is fully connected. Below is the family management state ready for Project 03 integration.
              </p>
            </div>
          </div>

          <Link
            to="/onboarding/child"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add / Edit Children</span>
          </Link>
        </div>

        {/* Children Explorer Switcher Tabs */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/60">
              Family Explorers ({childrenList.length})
            </span>
            <span className="text-xs text-[#65BDEB]">
              Click a child to review learning analytics or launch Child Universe
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {childrenList.map((child) => {
              const isSelected = child.id === activeChildTab;
              return (
                <div
                  key={child.id}
                  onClick={() => setActiveChildTab(child.id)}
                  className={`p-4 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                    isSelected
                      ? 'border-[#F45124] bg-white/15 shadow-xl shadow-orange-500/20 ring-2 ring-[#F45124]/50'
                      : 'border-white/15 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/30 bg-[#0c1b2d] shrink-0">
                        <img
                          src={child.avatar?.avatarImg || avatarSparkyImg}
                          alt={child.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white font-poppins">
                          {child.name}
                        </h3>
                        <span className="text-xs text-[#65BDEB] font-semibold">
                          {child.ageGroup} • {child.grade || 'Grade 1'}
                        </span>
                      </div>
                    </div>
                    
                    <span className="text-[11px] font-bold text-white/60 bg-white/10 px-2.5 py-1 rounded-full">
                      PIN: {child.pin || '1234'}
                    </span>
                  </div>

                  {/* Actions for this child */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-white/70">
                      Companion: <strong className="text-white">{child.avatar?.name?.split(' ')[0] || 'Sparky'}</strong>
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLaunchChildMode(child.id);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#F45124] to-[#FF6B4A] hover:from-[#e04216] hover:to-[#f05a39] shadow-md shadow-orange-600/30 transition-all cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>Launch Kid Mode</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Child Detailed Overview */}
        {selectedChild && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold text-[#FFD66B] uppercase tracking-wider">
                  Active Profile Focus
                </span>
                <h2 className="text-2xl font-bold text-white font-poppins mt-0.5">
                  {selectedChild.name} ({selectedChild.nickname})
                </h2>
              </div>

              <button
                type="button"
                onClick={() => handleLaunchChildMode(selectedChild.id)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-extrabold text-white bg-gradient-to-r from-[#65BDEB] to-[#9375E8] hover:scale-[1.02] transition-all shadow-lg shadow-sky-600/30 cursor-pointer"
              >
                <Rocket className="w-4 h-4" />
                <span>Switch to {selectedChild.nickname}'s Universe</span>
              </button>
            </div>

            {/* Quick Metrics Demo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <Clock className="w-8 h-8 text-[#65BDEB] shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-white/60 uppercase">Weekly Screen Time</span>
                  <div className="text-lg font-black text-white">45 min / day</div>
                  <span className="text-[11px] text-emerald-400">Within healthy limit</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-[#FFD66B] shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-white/60 uppercase">Quests Completed</span>
                  <div className="text-lg font-black text-white">12 Quests</div>
                  <span className="text-[11px] text-[#65BDEB]">+3 this week</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-[#F45124] shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-white/60 uppercase">AI Curiosity Level</span>
                  <div className="text-lg font-black text-white">Level 4 Explorer</div>
                  <span className="text-[11px] text-purple-300">Space & Logic focus</span>
                </div>
              </div>
            </div>

            {/* Profile Configuration Pills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-white/70 block mb-2">
                  Active Passions & Interests
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedChild.interests || ['Space & Science']).map((int) => (
                    <span
                      key={int}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FFD66B]/20 text-[#FFD66B] border border-[#FFD66B]/30"
                    >
                      {int}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-white/70 block mb-2">
                  Target Developmental Goals
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedChild.learningGoals || ['Improve Problem Solving']).map((goal) => (
                    <span
                      key={goal}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-[#65BDEB]/20 text-[#65BDEB] border border-[#65BDEB]/30"
                    >
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-white/50 border-t border-white/10">
        <p>© 2026 LifeVerse AI Parent Portal. Safe family learning environment.</p>
      </footer>

    </div>
  );
};

export default ParentDashboardHandoff;

