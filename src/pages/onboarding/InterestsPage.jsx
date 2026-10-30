import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Check, Heart, Star } from 'lucide-react';
import { OnboardingLayout } from '../../components/common/OnboardingLayout';
import { SelectionCard } from '../../components/common/SelectionCard';
import { useOnboarding } from '../../context/OnboardingContext';

const interestList = [
  {
    id: 'Space & Science',
    title: 'Space & Science',
    emoji: '🚀',
    subtitle: 'Planets, cosmic galaxies, chemical wonders & how machines work',
    recommendedFor: ['6–9 years', '10–14 years'],
  },
  {
    id: 'Mathematics',
    title: 'Mathematics',
    emoji: '🔢',
    subtitle: 'Mental arithmetic, geometric puzzles, fractions & logic patterns',
    recommendedFor: ['6–9 years', '10–14 years'],
  },
  {
    id: 'Creative Art',
    title: 'Creative Art',
    emoji: '🎨',
    subtitle: 'Color harmony, doodle quests, cartoon design & digital crafts',
    recommendedFor: ['3–5 years', '6–9 years'],
  },
  {
    id: 'Nature & Discovery',
    title: 'Nature & Discovery',
    emoji: '🌿',
    subtitle: 'Ecosystems, animal kingdom, ocean biology & plant life',
    recommendedFor: ['3–5 years', '6–9 years'],
  },
  {
    id: 'Coding & Technology',
    title: 'Coding & Technology',
    emoji: '💻',
    subtitle: 'Algorithmic thinking, block coding, AI concepts & robotics',
    recommendedFor: ['10–14 years'],
  },
  {
    id: 'Language & Stories',
    title: 'Language & Stories',
    emoji: '📚',
    subtitle: 'Creative story writing, phonics, world fairytales & vocabulary',
    recommendedFor: ['3–5 years', '6–9 years'],
  },
  {
    id: 'Music',
    title: 'Music',
    emoji: '🎵',
    subtitle: 'Rhythm, beats, musical melodies & instruments of the world',
    recommendedFor: ['3–5 years'],
  },
  {
    id: 'Puzzles & Logic',
    title: 'Puzzles & Logic',
    emoji: '🧩',
    subtitle: 'Brain teasers, pattern recognition, spatial mazes & mysteries',
    recommendedFor: ['6–9 years', '10–14 years'],
  },
];

export const InterestsPage = () => {
  const navigate = useNavigate();
  const { activeChild, toggleInterest } = useOnboarding();

  const selectedInterests = activeChild?.interests || [];
  const selectedCount = selectedInterests.length;
  const childAgeGroup = activeChild?.ageGroup || '6–9 years';

  const handleContinue = () => {
    if (selectedCount === 0) {
      toggleInterest('Space & Science');
      toggleInterest('Mathematics');
    }
    navigate('/onboarding/goals');
  };

  return (
    <OnboardingLayout
      currentStep={5}
      title={`What Inspires ${activeChild?.nickname || activeChild?.name || 'Your Child'}?`}
      subtitle="Select one or more passions. LifeVerse AI weaves these topics into adaptive missions and custom storytelling."
      onContinue={handleContinue}
      continueText={`Continue with ${selectedCount} ${selectedCount === 1 ? 'Passion' : 'Passions'}`}
      continueDisabled={selectedCount === 0}
    >
      {/* Selection Counter Bar & Age Recommendation Notice */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-4xl mx-auto mb-6 px-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white">Selected Topics:</span>
          <span className="px-3 py-0.5 rounded-full bg-[#F45124] text-white text-xs font-black shadow-md shadow-orange-500/30">
            {selectedCount} selected
          </span>
        </div>

        <div className="text-xs text-[#FFD66B] flex items-center gap-1.5 bg-[#FFD66B]/15 px-3 py-1 rounded-full border border-[#FFD66B]/30">
          <Star className="w-3.5 h-3.5 fill-[#FFD66B]" />
          <span>Showing suggestions tailored for <strong>{childAgeGroup}</strong></span>
        </div>
      </div>

      {/* Grid of 8 Required Interest Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {interestList.map((item) => {
          const isSelected = selectedInterests.includes(item.id);
          const isAgeRecommended = item.recommendedFor.includes(childAgeGroup);

          return (
            <div key={item.id} className="relative">
              <SelectionCard
                title={item.title}
                subtitle={item.subtitle}
                emoji={item.emoji}
                badge={isAgeRecommended ? '⭐ Age Recommended' : undefined}
                selected={isSelected}
                onClick={() => toggleInterest(item.id)}
                multi
              />
            </div>
          );
        })}
      </div>
    </OnboardingLayout>
  );
};

export default InterestsPage;
