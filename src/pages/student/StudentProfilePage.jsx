import React, { useState } from 'react';
import { User, Sparkles, Target, BookOpen, Check, Save } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';

export const StudentProfilePage = () => {
  const { activeChild, updateChildProfile, toggleInterest, toggleGoal } = useOnboarding();

  const [nickname, setNickname] = useState(activeChild?.nickname || activeChild?.name || 'Explorer');
  const [grade, setGrade] = useState(activeChild?.grade || 'Grade 11');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const availableInterests = [
    'Space & Science',
    'Mathematics',
    'Coding & Technology',
    'Creative Writing',
    'Philosophy & Ethics',
    'Physical Fitness',
    'Leadership',
    'Music & Art',
  ];

  const availableGoals = [
    'Improve Problem Solving',
    'Develop Sustained Focus',
    'Build Public Speaking Confidence',
    'Master Exam Stress Resilience',
    'Consistent Morning Routine',
  ];

  const handleSave = (e) => {
    e.preventDefault();
    updateChildProfile({
      childName: activeChild?.name,
      childNickname: nickname,
      grade,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-4xl mx-auto">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202923] tracking-tight">
          My Student Profile
        </h2>
        <p className="text-xs sm:text-sm text-[#737A73] mt-1">
          Review your personal learning preferences, grade level, and core developmental goals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Avatar & Overview */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-white border border-black/30 hover:border-black/50 shadow-xs flex flex-col items-center text-center space-y-4 transition-all">
          <div className="w-24 h-24 rounded-full bg-[#193F30] text-[#EDF2EC] flex items-center justify-center font-serif text-3xl font-bold border-4 border-[#EDF2EC] ring-1 ring-black/20 shadow-sm">
            {activeChild?.nickname?.charAt(0) || activeChild?.name?.charAt(0) || 'S'}
          </div>

          <div>
            <h3 className="font-serif text-xl font-bold text-[#202923]">
              {activeChild?.nickname || activeChild?.name}
            </h3>
            <span className="text-xs text-[#193F30] font-semibold bg-[#EDF2EC] border border-black/20 px-3 py-1 rounded-full inline-block mt-1">
              {activeChild?.grade || 'Grade 11'} • Age 17
            </span>
          </div>

          <p className="text-xs text-[#737A73] leading-relaxed">
            Connected to family account. Student private notes remain encrypted and strictly student-owned.
          </p>
        </div>

        {/* Right Column: Edit Details & Goals */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white border border-black/30 hover:border-black/50 shadow-xs space-y-6 transition-all">
          <form onSubmit={handleSave} className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#202923] border-b border-black/20 pb-2">
              Profile Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#202923] block mb-1">
                  Preferred Nickname
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full py-2.5 px-4 text-xs sm:text-sm rounded-full bg-[#F8F7F2] border border-black/30 hover:border-black/50 text-[#202923] focus:outline-none focus:border-black shadow-2xs transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#202923] block mb-1">
                  Academic Level / Grade
                </label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full py-2.5 px-4 text-xs sm:text-sm rounded-full bg-[#F8F7F2] border border-black/30 hover:border-black/50 text-[#202923] focus:outline-none focus:border-black shadow-2xs transition-all"
                />
              </div>
            </div>

            {/* Passions & Interests */}
            <div className="pt-3">
              <label className="text-xs font-semibold text-[#202923] block mb-2">
                Active Interests (tap to toggle)
              </label>
              <div className="flex flex-wrap gap-2">
                {availableInterests.map((interest) => {
                  const isSelected = (activeChild?.interests || []).includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer shadow-2xs ${
                        isSelected
                          ? 'bg-[#193F30] text-white border-black/40 shadow-xs'
                          : 'bg-[#F8F7F2] text-[#202923] border-black/30 hover:border-black/50'
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target Goals */}
            <div className="pt-3">
              <label className="text-xs font-semibold text-[#202923] block mb-2">
                Target Developmental Goals (tap to toggle)
              </label>
              <div className="flex flex-wrap gap-2">
                {availableGoals.map((goal) => {
                  const isSelected = (activeChild?.learningGoals || []).includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer shadow-2xs ${
                        isSelected
                          ? 'bg-[#193F30] text-white border-black/40 shadow-xs'
                          : 'bg-[#F8F7F2] text-[#202923] border-black/30 hover:border-black/50'
                      }`}
                    >
                      {goal}
                    </button>
                  );
                })}
              </div>
            </div>

            {savedSuccess && (
              <div className="p-3 rounded-2xl bg-[#EDF2EC] border border-black/30 text-[#193F30] text-xs font-semibold flex items-center gap-2 animate-fadeIn shadow-2xs">
                <Check className="w-4 h-4" />
                <span>Profile preferences updated successfully!</span>
              </div>
            )}

            <div className="pt-4 border-t border-black/20 flex justify-end">
              <button
                type="submit"
                className="py-2.5 px-6 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#193F30] hover:bg-[#204936] border border-black/30 hover:border-black/50 transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
