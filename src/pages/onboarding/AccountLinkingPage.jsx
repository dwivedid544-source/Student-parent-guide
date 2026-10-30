import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link2, ShieldCheck, HeartHandshake, User, Check, Sparkles, Users, Lock, Info } from 'lucide-react';
import { OnboardingLayout } from '../../components/common/OnboardingLayout';
import { useOnboarding } from '../../context/OnboardingContext';
import avatarSparkyImg from '../../assets/avatar_sparky.png';

const relationshipOptions = [
  { id: 'Parent', label: 'Parent / Guardian', icon: '👨‍👧‍👦', desc: 'Primary family guardian' },
  { id: 'Mother', label: 'Mother', icon: '👩‍👧', desc: 'Mom explorer' },
  { id: 'Father', label: 'Father', icon: '👨‍👦', desc: 'Dad explorer' },
  { id: 'Guardian', label: 'Legal Guardian', icon: '🛡️', desc: 'Authorized caregiver' },
];

export const AccountLinkingPage = () => {
  const navigate = useNavigate();
  const {
    parentAccount,
    childrenList,
    activeChildId,
    setActiveChild,
    updateLinking,
    completeOnboarding,
  } = useOnboarding();

  const [parentEmail, setParentEmail] = useState(
    parentAccount?.email || 'sparkymcwonder@gmail.com'
  );
  const [relationship, setRelationship] = useState(
    parentAccount?.relationship || 'Parent'
  );

  const handleContinue = () => {
    updateLinking({ parentEmail, relationship });
    completeOnboarding();
    navigate('/onboarding/success');
  };

  return (
    <OnboardingLayout
      currentStep={8}
      title="Confirm Parent–Child Linking"
      subtitle="Each child profile is securely linked under your master Parent account. Review your family structure before unlocking the universe."
      onContinue={handleContinue}
      continueText="Confirm Family Linking & Launch 🚀"
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        
        {/* Main Linking Showcase Card */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/25 shadow-2xl overflow-hidden">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Left: Parent Master Account Card */}
            <div className="w-full lg:w-72 p-5 rounded-2xl bg-gradient-to-b from-white/15 to-white/5 border border-white/20 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#65BDEB]/25 border-2 border-[#65BDEB] flex items-center justify-center text-3xl shadow-lg mb-2">
                👨‍👩‍👧
              </div>

              <span className="text-[11px] font-black uppercase tracking-wider text-[#65BDEB]">
                Master Family Account
              </span>
              <strong className="text-base font-bold text-white mt-1">
                {parentAccount?.name || 'Alex McWonder'}
              </strong>
              <span className="text-xs text-white/70 truncate max-w-full">
                {parentAccount?.email || parentEmail}
              </span>

              <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Parent Admin Authorized</span>
              </div>
            </div>

            {/* Center: Glowing Link Badge */}
            <div className="flex flex-col items-center justify-center shrink-0">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#F45124] to-[#FF8A65] text-white flex items-center justify-center shadow-xl shadow-orange-500/40 ring-4 ring-orange-500/20 animate-pulse">
                <Link2 className="w-7 h-7" />
              </div>
              <span className="mt-2 text-xs font-black text-[#FFD66B] uppercase tracking-wider">
                {childrenList.length} {childrenList.length === 1 ? 'Profile Linked' : 'Profiles Linked'}
              </span>
            </div>

            {/* Right: Linked Children Profiles Grid */}
            <div className="w-full lg:flex-1 flex flex-col gap-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-white/60 mb-1">
                Linked Child Explorers ({childrenList.length})
              </span>

              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
                {childrenList.map((child) => (
                  <div
                    key={child.id}
                    className="p-3 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/30 bg-[#0c1b2d] shrink-0">
                        <img
                          src={child.avatar?.avatarImg || avatarSparkyImg}
                          alt={child.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col text-left">
                        <strong className="text-sm font-bold text-white">
                          {child.nickname || child.name}
                        </strong>
                        <span className="text-xs text-white/60">
                          {child.ageGroup} • {child.grade || 'Grade 1'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#65BDEB] bg-[#65BDEB]/20 px-2.5 py-1 rounded-full border border-[#65BDEB]/30">
                      <Check className="w-3 h-3" />
                      <span>PIN: {child.pin || '1234'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Parent-Child Architecture Principle Callout */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/15 flex items-start gap-3.5 text-xs text-white/80 leading-relaxed">
          <Info className="w-5 h-5 text-[#65BDEB] shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block mb-0.5">Parent Ownership & Child Access Architecture</strong>
            A parent owns and manages family profiles. Children access their individual universe using their friendly 4-digit PIN rather than independent email/password accounts. Sensitive settings and billing remain strictly parent-controlled.
          </div>
        </div>

        {/* Relationship Selector */}
        <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20">
          <label className="block text-xs sm:text-sm font-bold text-white mb-3">
            Your Relationship to the Family Explorers
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {relationshipOptions.map((opt) => {
              const isSelected = relationship === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setRelationship(opt.id)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center ${
                    isSelected
                      ? 'border-[#F45124] bg-[#F45124]/20 text-white shadow-md shadow-orange-500/20 ring-2 ring-[#F45124]/40 font-bold'
                      : 'border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-2xl mb-1">{opt.icon}</span>
                  <span className="text-xs font-bold">{opt.label}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </OnboardingLayout>
  );
};

export default AccountLinkingPage;
