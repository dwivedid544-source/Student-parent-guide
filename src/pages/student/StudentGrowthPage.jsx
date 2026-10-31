import React from 'react';
import { TrendingUp, CheckCircle2, Target, Calendar, Sparkles } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import { useStudent } from '../../context/StudentContext';

export const StudentGrowthPage = () => {
  const { activeChild } = useOnboarding();
  const { reflections, habits } = useStudent();

  const milestones = [
    {
      date: 'Oct 28, 2026',
      title: 'Emotional Resilience Breakthrough',
      description: 'Completed stress triggers mapping and introduced 3-minute box breathing before homework.',
      category: 'Wellness',
    },
    {
      date: 'Oct 22, 2026',
      title: '5-Day Habit Streak Achieved',
      description: 'Maintained uninterrupted morning journaling and deep work sprint routine for 5 consecutive days.',
      category: 'Consistency',
    },
    {
      date: 'Oct 15, 2026',
      title: 'HighOrbit Sanctuary Onboarding',
      description: 'Set initial developmental goals: Improve Problem Solving, Develop Focus, and Build Confidence.',
      category: 'Foundation',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202923] tracking-tight">
          My Growth & Milestones
        </h2>
        <p className="text-xs sm:text-sm text-[#737A73] mt-1">
          A personal timeline of breakthroughs, habit consistency, and self-leadership achievements.
        </p>
      </div>

      {/* Target Goals Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/30 hover:border-black/50 shadow-xs transition-all space-y-4">
        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#202923] flex items-center gap-2">
          <Target className="w-5 h-5 text-[#193F30]" />
          <span>Active Developmental Goals</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(activeChild?.learningGoals || ['Improve Problem Solving', 'Develop Focus', 'Build Confidence']).map((goal, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#F8F7F2] border border-black/30 hover:border-black/50 shadow-2xs flex items-center gap-3 transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-[#EDF2EC] text-[#193F30] border border-black/20 flex items-center justify-center font-bold text-xs shrink-0">
                0{idx + 1}
              </div>
              <div>
                <span className="text-xs font-bold text-[#202923] block">{goal}</span>
                <span className="text-[10px] text-[#4B735F] font-semibold">Active Focus</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestone Timeline */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/30 hover:border-black/50 shadow-xs transition-all space-y-6">
        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#202923]">
          Milestone Timeline
        </h3>

        <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-black/20">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative flex flex-col gap-1.5">
              <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#193F30] ring-4 ring-[#EDF2EC] border border-black/30" />
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-[#193F30]">{m.date}</span>
                <span className="text-[#737A73]">•</span>
                <span className="text-[11px] font-semibold text-[#737A73] bg-[#F1EDE2] border border-black/20 px-2 py-0.5 rounded-full">
                  {m.category}
                </span>
              </div>
              <h4 className="font-serif text-base font-bold text-[#202923]">
                {m.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#737A73] leading-relaxed">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentGrowthPage;
