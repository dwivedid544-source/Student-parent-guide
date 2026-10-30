import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, Palette, MessageSquare, Star, Brain, Target, Shield, Rocket } from 'lucide-react';
import { OnboardingLayout } from '../../components/common/OnboardingLayout';
import { SelectionCard } from '../../components/common/SelectionCard';
import { useOnboarding } from '../../context/OnboardingContext';

const learningGoalsList = [
  {
    id: 'Improve Problem Solving',
    title: 'Improve Problem Solving',
    icon: Lightbulb,
    emoji: '💡',
    badge: 'Cognitive Core',
    subtitle: 'Hypothesis testing, logical puzzles, critical reasoning & everyday deduction.',
  },
  {
    id: 'Develop Creativity',
    title: 'Develop Creativity',
    icon: Palette,
    emoji: '🎨',
    badge: 'Imagination',
    subtitle: 'Inventive design, out-of-the-box thinking, expressive arts & unique story paths.',
  },
  {
    id: 'Improve Communication',
    title: 'Improve Communication',
    icon: MessageSquare,
    emoji: '🗣️',
    badge: 'Expression',
    subtitle: 'Articulating ideas clearly, empathetic active listening & rich vocabulary.',
  },
  {
    id: 'Build Confidence',
    title: 'Build Confidence',
    icon: Star,
    emoji: '🌟',
    badge: 'Self-Efficacy',
    subtitle: 'Tackling unfamiliar challenges, growth mindset & positive celebration of effort.',
  },
  {
    id: 'Strengthen Memory',
    title: 'Strengthen Memory',
    icon: Brain,
    emoji: '🧠',
    badge: 'Recall',
    subtitle: 'Working memory exercises, pattern retention & sequential reasoning games.',
  },
  {
    id: 'Develop Focus',
    title: 'Develop Focus',
    icon: Target,
    emoji: '🎯',
    badge: 'Attention',
    subtitle: 'Deep concentration habits, sustained task completion & mindful distraction reduction.',
  },
  {
    id: 'Learn Responsibility',
    title: 'Learn Responsibility',
    icon: Shield,
    emoji: '🛡️',
    badge: 'Habits',
    subtitle: 'Setting daily learning targets, honoring commitments & self-directed motivation.',
  },
  {
    id: 'Explore New Skills',
    title: 'Explore New Skills',
    icon: Rocket,
    emoji: '🚀',
    badge: 'Discovery',
    subtitle: 'Braving new subject territories, cross-disciplinary curiosity & future skills.',
  },
];

export const GoalsPage = () => {
  const navigate = useNavigate();
  const { activeChild, toggleGoal } = useOnboarding();

  const selectedGoals = activeChild?.learningGoals || [];
  const selectedCount = selectedGoals.length;

  const handleContinue = () => {
    if (selectedCount === 0) {
      toggleGoal('Improve Problem Solving');
      toggleGoal('Develop Focus');
    }
    navigate('/onboarding/avatar');
  };

  return (
    <OnboardingLayout
      currentStep={6}
      title="What Growth Superpowers Shall We Build?"
      subtitle="Select the developmental skills and core habits you want LifeVerse AI to emphasize during daily quests."
      onContinue={handleContinue}
      continueText={`Continue to Buddy Avatar (${selectedCount} selected)`}
      continueDisabled={selectedCount === 0}
    >
      {/* Top Counter Bar */}
      <div className="flex items-center justify-between max-w-4xl mx-auto mb-6 px-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white">Target Superpowers:</span>
          <span className="px-3 py-0.5 rounded-full bg-[#65BDEB] text-[#0c1b2d] text-xs font-black shadow-md">
            {selectedCount} selected
          </span>
        </div>

        <span className="text-xs text-white/70">
          Saved independently for {activeChild?.nickname || activeChild?.name || 'this child'}
        </span>
      </div>

      {/* Grid of 8 Required Goals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {learningGoalsList.map((goal) => {
          const isSelected = selectedGoals.includes(goal.id);
          return (
            <SelectionCard
              key={goal.id}
              title={goal.title}
              subtitle={goal.subtitle}
              emoji={goal.emoji}
              badge={goal.badge}
              selected={isSelected}
              onClick={() => toggleGoal(goal.id)}
              multi
            />
          );
        })}
      </div>
    </OnboardingLayout>
  );
};

export default GoalsPage;
