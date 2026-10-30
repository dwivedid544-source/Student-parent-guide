import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, User, Bell, Mail, Shield, Check } from 'lucide-react';
import { OnboardingLayout } from '../../components/common/OnboardingLayout';
import { FormInput } from '../../components/common/FormInput';
import { useOnboarding } from '../../context/OnboardingContext';

const communicationOptions = [
  {
    id: 'weekly_email',
    title: 'Weekly Progress Digest',
    desc: 'Weekly summary of learning minutes, quests completed & mastery milestones.',
    badge: 'Recommended',
  },
  {
    id: 'daily_summary',
    title: 'Daily Activity Highlights',
    desc: 'Brief daily evening recap of topics explored and screen time.',
    badge: 'Detailed',
  },
  {
    id: 'milestone_only',
    title: 'Major Milestones Only',
    desc: 'Alerts only when your child earns a major rank, badge, or completes a world.',
    badge: 'Minimal',
  },
];

export const FamilyProfilePage = () => {
  const navigate = useNavigate();
  const { parentAccount, updateFamilyProfile } = useOnboarding();

  const [parentName, setParentName] = useState(parentAccount?.name || 'Alex McWonder');
  const [familyName, setFamilyName] = useState(
    parentAccount?.familyProfile?.familyName || 'The McWonder Family'
  );
  const [numChildren, setNumChildren] = useState(
    parentAccount?.familyProfile?.numChildren || 1
  );
  const [communication, setCommunication] = useState(
    parentAccount?.familyProfile?.communicationPreference || 'weekly_email'
  );
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!parentName.trim()) {
      setError('Please provide your name');
      return;
    }

    updateFamilyProfile({
      familyName: familyName.trim() || `${parentName.split(' ')[0]}'s Family`,
      numChildren,
      communicationPreference: communication,
    });

    navigate('/onboarding/child');
  };

  return (
    <OnboardingLayout
      currentStep={2}
      title="Set Up Your Family Profile"
      subtitle="Tell us a little about your household so LifeVerse AI can customize progress reporting and multi-profile controls."
      onContinue={handleContinue}
      continueText="Continue to Child Profiles"
    >
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        
        {/* Main Form Container */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl flex flex-col gap-5">
          
          <div className="flex items-center gap-2 text-sm font-bold text-[#FFD66B] uppercase tracking-wider">
            <Users className="w-4 h-4 text-[#FFD66B]" />
            <span>Guardian & Family Details</span>
          </div>

          {/* Parent Full Name */}
          <FormInput
            label="Parent / Guardian Full Name"
            placeholder="e.g. Alex McWonder"
            value={parentName}
            onChange={(e) => {
              setParentName(e.target.value);
              if (error) setError('');
            }}
            error={error}
            required
            icon={User}
          />

          {/* Family Display Name */}
          <FormInput
            label="Family or Household Name (Optional)"
            placeholder="e.g. The McWonder Family, Cosmos Crew"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            icon={Users}
          />

          {/* Number of Children in Household */}
          <div>
            <label className="text-white text-xs md:text-sm font-semibold tracking-wide pl-1 mb-2 block">
              How many children will be learning on LifeVerse AI?
            </label>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {[1, 2, 3, '4+'].map((num) => {
                const isSelected = numChildren === num || (num === '4+' && numChildren >= 4);
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setNumChildren(num === '4+' ? 4 : num)}
                    className={`py-3 px-2 rounded-2xl border text-center transition-all cursor-pointer font-bold text-sm sm:text-base ${
                      isSelected
                        ? 'border-[#F45124] bg-[#F45124]/20 text-white shadow-md shadow-orange-500/20 ring-2 ring-[#F45124]/40'
                        : 'border-white/20 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{num} {typeof num === 'number' && num === 1 ? 'Child' : 'Children'}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-[11px] text-white/60 pl-1">
              You can configure each child profile individually in the next steps.
            </p>
          </div>

          {/* Communication / Report Preference */}
          <div className="pt-2 border-t border-white/10">
            <label className="text-white text-xs md:text-sm font-semibold tracking-wide pl-1 mb-2 block flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#65BDEB]" />
              <span>Parent Reporting & Insights Frequency (Demo Only)</span>
            </label>

            <div className="grid grid-cols-1 gap-2.5">
              {communicationOptions.map((opt) => {
                const isSelected = communication === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setCommunication(opt.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-[#65BDEB] bg-[#65BDEB]/20 text-white shadow-md shadow-sky-500/20'
                        : 'border-white/15 bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{opt.title}</span>
                        {opt.badge && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/15 text-[#FFD66B] border border-white/20">
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white/70 mt-0.5">{opt.desc}</p>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-[#65BDEB] bg-[#65BDEB] text-[#0c1b2d]'
                          : 'border-white/30 bg-transparent'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </OnboardingLayout>
  );
};

export default FamilyProfilePage;

