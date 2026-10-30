import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Users, Compass, ShieldCheck, ArrowRight, Star, Heart } from 'lucide-react';
import { OnboardingLayout } from '../../components/common/OnboardingLayout';
import { useOnboarding } from '../../context/OnboardingContext';
import kidsHeroImg from '../../assets/kids_hero.png';

export const WelcomePage = () => {
  const navigate = useNavigate();
  const { parentAccount } = useOnboarding();

  const handleStart = () => {
    navigate('/onboarding/family');
  };

  const stepsPreview = [
    {
      num: '01',
      title: 'Family Profile',
      desc: 'Set up your household and guardian preferences.',
      icon: Users,
      color: '#65BDEB',
    },
    {
      num: '02',
      title: 'Child Explorers',
      desc: 'Add one or more children with individual ages & grades.',
      icon: Heart,
      color: '#F45124',
    },
    {
      num: '03',
      title: 'Curiosity & Goals',
      desc: 'Personalize adaptive passions, skills, and buddy avatars.',
      icon: Compass,
      color: '#FFD66B',
    },
    {
      num: '04',
      title: 'Safe Family Linking',
      desc: 'Connect profiles under one secure parent-managed account.',
      icon: ShieldCheck,
      color: '#9375E8',
    },
  ];

  return (
    <OnboardingLayout
      currentStep={1}
      title={`Welcome to LifeVerse AI${parentAccount?.name ? `, ${parentAccount.name.split(' ')[0]}` : ''}!`}
      subtitle="Let's create your family learning universe. It only takes a few minutes to unlock personalized, AI-guided educational quests for every child in your home."
      onContinue={handleStart}
      continueText="Get Started with Family Setup"
      showBack={false}
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        
        {/* Hero Card with Kids Illustration */}
        <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#65BDEB]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-[#F45124]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Left: Illustration */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 shrink-0 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl bg-[#0c1b2d]/70 flex items-center justify-center p-2">
            <img
              src={kidsHeroImg}
              alt="Happy children exploring"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#F45124] text-[10px] font-black uppercase tracking-wider text-white shadow-md">
              Safe & Ad-Free
            </div>
          </div>

          {/* Right: Pitch & Value Prop */}
          <div className="flex flex-col text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD66B]/20 border border-[#FFD66B]/30 text-[#FFD66B] text-xs font-bold w-fit mx-auto sm:mx-0 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Parent-Guided Experience</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white font-poppins">
              Tailored for Growing Minds, Managed by Parents
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed">
              Every child learns at their own rhythm. LifeVerse AI allows parents to configure individual learning paths, track real-time curiosity, and establish healthy digital boundaries.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-white/70">
              <span className="flex items-center gap-1 text-emerald-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Parent-Controlled Access
              </span>
              <span className="flex items-center gap-1 text-[#65BDEB] font-semibold">
                <Star className="w-4 h-4 text-[#65BDEB]" />
                Adaptive AI Curriculum
              </span>
            </div>
          </div>

        </div>

        {/* 4-Step Process Overview */}
        <div className="flex flex-col gap-3">
          <div className="text-center sm:text-left text-xs font-bold uppercase tracking-wider text-white/60 pl-1">
            Setup Roadmap
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {stepsPreview.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.num}
                  className="p-4 rounded-2xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/15 backdrop-blur-md transition-all flex items-start gap-3.5"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md text-white font-bold"
                    style={{ backgroundColor: `${item.color}33`, borderColor: item.color, borderWidth: 1 }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold text-white/50 tracking-wider">
                        STEP {item.num}
                      </span>
                      <h3 className="text-sm font-bold text-white font-poppins">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-0.5 text-xs text-white/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </OnboardingLayout>
  );
};

export default WelcomePage;

