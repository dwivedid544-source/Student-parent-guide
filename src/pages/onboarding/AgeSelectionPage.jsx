import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Sprout, Star, Compass } from 'lucide-react';
import { OnboardingLayout } from '../../components/common/OnboardingLayout';
import { SelectionCard } from '../../components/common/SelectionCard';
import { useOnboarding } from '../../context/OnboardingContext';

const ageGroups = [
  {
    id: '3–5 years',
    title: '3–5 Years',
    subtitle: 'Curious Sprouts: Colors, shapes, friendly stories, numbers & creative play.',
    emoji: '🌱',
    badge: 'Preschool & Early Play',
    highlights: 'Visual Quests & Phonics',
  },
  {
    id: '6–9 years',
    title: '6–9 Years',
    subtitle: 'Bright Sparks: Mathematics, science, reading, art & nature exploration.',
    emoji: '⭐',
    badge: 'Elementary Explorers',
    highlights: 'Reading, Math & Nature',
  },
  {
    id: '10–14 years',
    title: '10–14 Years',
    subtitle: 'Junior Innovators: Coding, advanced mathematics, science, creative projects & problem solving.',
    emoji: '🚀',
    badge: 'Junior Trailblazers',
    highlights: 'Coding, Logic & Science',
  },
];

export const AgeSelectionPage = () => {
  const navigate = useNavigate();
  const { activeChild, updateAge } = useOnboarding();

  const currentAge = activeChild?.ageGroup || '6–9 years';

  const handleSelect = (id) => {
    updateAge(id);
  };

  const handleContinue = () => {
    if (!activeChild?.ageGroup) {
      updateAge('6–9 years');
    }
    navigate('/onboarding/interests');
  };

  return (
    <OnboardingLayout
      currentStep={4}
      title={`How Old Is ${activeChild?.nickname || activeChild?.name || 'Your Explorer'}?`}
      subtitle="LifeVerse AI dynamically tailors vocabulary, AI question prompts, and audio narration to match their developmental stage."
      onContinue={handleContinue}
      continueText="Continue to Interests"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {ageGroups.map((group) => {
          const isSelected = currentAge === group.id;
          return (
            <SelectionCard
              key={group.id}
              title={group.title}
              subtitle={group.subtitle}
              emoji={group.emoji}
              badge={group.badge}
              selected={isSelected}
              onClick={() => handleSelect(group.id)}
            />
          );
        })}
      </div>

      <div className="mt-6 text-center text-xs text-white/60">
        This adapts topic recommendations in the next step. You can modify this anytime.
      </div>
    </OnboardingLayout>
  );
};

export default AgeSelectionPage;
