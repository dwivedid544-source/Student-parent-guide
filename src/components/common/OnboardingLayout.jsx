import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  User,
  Users,
  Link2,
  Calendar,
  Compass,
  Target,
  Smile,
  HeartHandshake
} from 'lucide-react';
import { LifeVerseLogo } from './LifeVerseLogo';
import { useOnboarding } from '../../context/OnboardingContext';

export const onboardingSteps = [
  { step: 1, path: '/onboarding/welcome', title: 'Welcome', icon: Sparkles },
  { step: 2, path: '/onboarding/family', title: 'Family Setup', icon: Users },
  { step: 3, path: '/onboarding/child', title: 'Child Profile', icon: User },
  { step: 4, path: '/onboarding/age', title: 'Age Group', icon: Calendar },
  { step: 5, path: '/onboarding/interests', title: 'Interests', icon: Compass },
  { step: 6, path: '/onboarding/goals', title: 'Learning Goals', icon: Target },
  { step: 7, path: '/onboarding/avatar', title: 'Buddy Avatar', icon: Smile },
  { step: 8, path: '/onboarding/link', title: 'Family Linking', icon: HeartHandshake },
];

export const OnboardingLayout = ({
  currentStep = 1,
  title,
  subtitle,
  children,
  onContinue,
  continueText = 'Continue',
  continueDisabled = false,
  showBack = true,
  onBack,
  customFooter,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, activeChild } = useOnboarding();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    if (currentStep > 1) {
      navigate(onboardingSteps[currentStep - 2].path);
    } else {
      navigate('/register');
    }
  };

  const currentStepObj = onboardingSteps.find((s) => s.step === currentStep) || onboardingSteps[0];
  const progressPercent = Math.round((currentStep / onboardingSteps.length) * 100);

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-gradient-to-br from-[#0c1b2d] via-[#12253d] to-[#0a1829] text-white overflow-x-hidden font-nunito">
      
      {/* Playful Ambient Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#65BDEB]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#F45124]/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-[#9375E8]/10 rounded-full blur-3xl" />
      </div>

      {/* Top Header / Navigation Bar */}
      <header className="relative z-20 w-full px-4 sm:px-8 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <LifeVerseLogo />

          {/* Child badge if active */}
          <div className="flex items-center gap-3">
            {activeChild?.name && (
              <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white/90">
                <span className="w-2 h-2 rounded-full bg-[#FFD66B] animate-pulse" />
                <span>Active Explorer: <strong className="text-[#65BDEB]">{activeChild.nickname || activeChild.name}</strong></span>
              </div>
            )}
            <Link
              to="/"
              className="text-xs sm:text-sm font-semibold text-white/70 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              Exit Setup
            </Link>
          </div>
        </div>
      </header>

      {/* 8-Step Progress Indicator */}
      <div className="relative z-10 w-full px-4 sm:px-8 pt-6 pb-2">
        <div className="max-w-4xl mx-auto">
          
          {/* Progress Header Info */}
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-3 text-white/80">
            <span className="flex items-center gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#F45124] text-white text-xs font-bold">
                Step {currentStep} of {onboardingSteps.length}
              </span>
              <span className="text-white/60">•</span>
              <span className="text-white font-medium hidden sm:inline">
                {currentStepObj?.title}
              </span>
            </span>
            <span className="text-[#65BDEB] font-semibold">{progressPercent}% Completed</span>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-[#65BDEB] via-[#9375E8] to-[#F45124] rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Step Bubbles / Pills (Visible on lg and up) */}
          <div className="hidden lg:grid grid-cols-8 gap-1.5 mt-4">
            {onboardingSteps.map((s) => {
              const Icon = s.icon;
              const isPast = s.step < currentStep;
              const isCurrent = s.step === currentStep;

              return (
                <div
                  key={s.step}
                  onClick={() => {
                    if (isPast) navigate(s.path);
                  }}
                  className={`flex items-center gap-1.5 p-1.5 rounded-xl border text-[11px] font-semibold transition-all duration-200 ${
                    isPast
                      ? 'border-[#65BDEB]/40 bg-[#65BDEB]/15 text-[#65BDEB] cursor-pointer hover:bg-[#65BDEB]/25'
                      : isCurrent
                      ? 'border-[#F45124] bg-[#F45124]/20 text-white shadow-md shadow-orange-500/20 ring-1 ring-[#F45124]/50'
                      : 'border-white/10 bg-white/5 text-white/40 cursor-not-allowed'
                  }`}
                  title={s.title}
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] ${
                      isPast
                        ? 'bg-[#65BDEB] text-[#0c1b2d]'
                        : isCurrent
                        ? 'bg-[#F45124] text-white'
                        : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-3 h-3" /> : s.step}
                  </div>
                  <span className="truncate">{s.title}</span>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col justify-between">
        
        {/* Step Headings */}
        {(title || subtitle) && (
          <div className="text-center mb-6 sm:mb-8 max-w-2xl mx-auto">
            {title && (
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-poppins drop-shadow-md">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-2 text-xs sm:text-sm md:text-base text-white/75 leading-relaxed font-normal">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Injected Step Component Children */}
        <div className="flex-1 w-full">
          {children}
        </div>

        {/* Default Step Bottom Controls (Back / Continue Buttons) */}
        {!customFooter && (
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
            {showBack ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {onContinue && (
              <button
                type="button"
                onClick={onContinue}
                disabled={continueDisabled}
                className={`inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm sm:text-base font-bold text-white transition-all shadow-lg cursor-pointer ${
                  continueDisabled
                    ? 'bg-white/20 text-white/40 cursor-not-allowed border border-white/10'
                    : 'bg-gradient-to-r from-[#F45124] to-[#FF6B4A] hover:from-[#e04216] hover:to-[#f05a39] shadow-orange-600/30 hover:shadow-orange-600/50 hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                <span>{continueText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

      </main>

      {/* Step Footer */}
      <footer className="relative z-10 w-full px-4 py-3 text-center text-xs text-white/50 border-t border-white/10 bg-[#081325]/50 backdrop-blur-sm">
        <p>© 2026 LifeVerse AI Family Onboarding. Safe, inspiring learning journeys.</p>
      </footer>

    </div>
  );
};

export default OnboardingLayout;
