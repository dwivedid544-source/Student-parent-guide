import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Trophy, Award, Heart, CheckCircle2, Plus } from 'lucide-react';
import { OnboardingLayout } from '../../components/common/OnboardingLayout';
import { AvatarCard } from '../../components/common/AvatarCard';
import { useOnboarding } from '../../context/OnboardingContext';

import avatarSparkyImg from '../../assets/avatar_sparky.png';
import avatarLunaImg from '../../assets/avatar_luna.png';
import avatarLeoImg from '../../assets/avatar_leo.png';
import avatarOliverImg from '../../assets/avatar_oliver.png';
import avatarMiloImg from '../../assets/avatar_milo.png';

export const avatarsList = [
  {
    id: 'sparky',
    name: 'Sparky McWonder',
    title: 'The Inquisitive Adventurer',
    avatarImg: avatarSparkyImg,
    badge: '🚀 Cosmic Explorer',
    quote: '"Every question is the start of a brand new adventure!"',
    color: '#F45124',
    specialty: 'Space & Puzzles',
  },
  {
    id: 'luna',
    name: 'Luna Starweaver',
    title: 'The Dreamer & Storyteller',
    avatarImg: avatarLunaImg,
    badge: '✨ Star Weaver',
    quote: '"Imagination lets you fly higher than any rocket!"',
    color: '#9375E8',
    specialty: 'Creativity & Arts',
  },
  {
    id: 'oliver',
    name: 'Oliver Quickmind',
    title: 'The Keen Scientist',
    avatarImg: avatarOliverImg,
    badge: '🔬 Science Scholar',
    quote: '"Let\'s examine the clues and solve the mystery!"',
    color: '#65BDEB',
    specialty: 'Logic & Science',
  },
  {
    id: 'leo',
    name: 'Leo Trailblazer',
    title: 'The Brave Explorer',
    avatarImg: avatarLeoImg,
    badge: '🦁 Courageous Scout',
    quote: '"Together, no challenge is too big for us!"',
    color: '#FFD66B',
    specialty: 'Math & Coding',
  },
  {
    id: 'milo',
    name: 'Milo Wonderkin',
    title: 'The Cheerful Discoverer',
    avatarImg: avatarMiloImg,
    badge: '💡 Spark of Wonder',
    quote: '"Whoa, look at that! How does that work?!"',
    color: '#F45124',
    specialty: 'General Knowledge',
  },
  {
    id: 'pip',
    name: 'Pip the Cosmic Fox',
    title: 'Playful Nature Sprite',
    emoji: '🦊',
    badge: '🐾 Animal Whisperer',
    quote: '"Curious ears hear the best secrets of nature!"',
    color: '#F45124',
    specialty: 'Nature & Wildlife',
  },
  {
    id: 'barnaby',
    name: 'Barnaby Wisdom Owl',
    title: 'Patient Master Reader',
    emoji: '🦉',
    badge: '📖 Story Guardian',
    quote: '"Between the pages of a book lies every secret of the world."',
    color: '#9375E8',
    specialty: 'Reading & Language',
  },
  {
    id: 'nova',
    name: 'Nova Cyber Pup',
    title: 'High-Tech Logic Buddy',
    emoji: '🐶',
    badge: '💻 Robot Master',
    quote: '"Beep boop! Ready to code your imagination into reality!"',
    color: '#65BDEB',
    specialty: 'Technology & Games',
  },
];

export const AvatarSelectionPage = () => {
  const navigate = useNavigate();
  const { activeChild, selectAvatar, addChild, childrenList } = useOnboarding();

  const selectedAvatar = activeChild?.avatar || avatarsList[0];

  const handleContinue = () => {
    if (!activeChild?.avatar) {
      selectAvatar(avatarsList[0]);
    }
    navigate('/onboarding/link');
  };

  const handleAddAnother = () => {
    if (!activeChild?.avatar) {
      selectAvatar(avatarsList[0]);
    }
    const newId = addChild({
      name: `Explorer ${childrenList.length + 1}`,
      nickname: `Explorer ${childrenList.length + 1}`,
      ageGroup: '6–9 years',
      grade: 'Grade 1',
    });
    navigate('/onboarding/child');
  };

  return (
    <OnboardingLayout
      currentStep={7}
      title={`Choose ${activeChild?.nickname || activeChild?.name || "Your Child"}'s Learning Buddy!`}
      subtitle="Pick a friendly AI companion who will cheer achievements, guide through quizzes, and adapt daily lessons."
      onContinue={handleContinue}
      continueText="Continue to Family Linking"
    >
      <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto items-start">
        
        {/* Left: Avatar Grid */}
        <div className="flex-1 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
            {avatarsList.map((buddy) => {
              const isSelected = selectedAvatar.id === buddy.id;
              return (
                <AvatarCard
                  key={buddy.id}
                  avatar={buddy}
                  selected={isSelected}
                  onSelect={() => selectAvatar(buddy)}
                />
              );
            })}
          </div>

          {/* Optional Action to Add Another Child */}
          <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-white/70 text-center sm:text-left">
              Have another child in your family? You can set up their profile now or later in Parent Settings.
            </span>
            <button
              type="button"
              onClick={handleAddAnother}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#65BDEB]" />
              <span>Add Another Child</span>
            </button>
          </div>
        </div>

        {/* Right: Selected Buddy Spotlight Preview */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="sticky top-28 p-6 rounded-3xl bg-white/10 backdrop-blur-xl border-2 border-white/30 shadow-2xl flex flex-col items-center text-center">
            
            <div className="text-[11px] font-extrabold tracking-wider text-[#FFD66B] uppercase mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-[#FFD66B]" />
              <span>Selected Companion</span>
            </div>

            {/* Avatar Frame with Glow */}
            <div className="relative my-2">
              <div
                className="absolute -inset-2 rounded-full blur-md opacity-70"
                style={{ backgroundColor: selectedAvatar.color || '#F45124' }}
              />

              <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-2 border-white shadow-xl bg-[#0c1b2d] flex items-center justify-center">
                {selectedAvatar.avatarImg ? (
                  <img
                    src={selectedAvatar.avatarImg}
                    alt={selectedAvatar.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-5xl">{selectedAvatar.emoji}</span>
                )}
              </div>
            </div>

            {/* Buddy Name & Title */}
            <h3 className="mt-3 text-lg font-black text-white font-poppins">
              {selectedAvatar.name}
            </h3>
            <span className="text-xs font-semibold text-[#65BDEB]">
              {selectedAvatar.title}
            </span>

            {/* Badge */}
            <div className="mt-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white/90">
              {selectedAvatar.badge}
            </div>

            {/* Quote Bubble */}
            <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/80 italic leading-relaxed">
              {selectedAvatar.quote}
            </div>

            {/* Child Association Tag */}
            <div className="mt-4 pt-3 border-t border-white/10 w-full flex items-center justify-center gap-2 text-xs font-semibold text-white/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Assigned to: <strong className="text-white">{activeChild?.nickname || activeChild?.name || 'Explorer'}</strong></span>
            </div>

          </div>
        </div>

      </div>
    </OnboardingLayout>
  );
};

export default AvatarSelectionPage;
