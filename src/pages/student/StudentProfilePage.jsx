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
        <h2 className=" text-2xl sm:text-3xl font-bold text-[#1b1831] tracking-tight">
          My Student Profile
        </h2>
        <p className="text-xs sm:text-sm text-[#6A6678] mt-1">
          Review your personal learning preferences, grade level, and core developmental goals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Avatar & Overview */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DEFF] hover:border-primary/40 shadow-xs flex flex-col items-center text-center space-y-4 transition-all">
          <div className="w-24 h-24 rounded-full bg-primary text-[#EDF2EC] flex items-center justify-center  text-3xl font-bold border-4 border-[#EDF2EC] ring-1 ring-black/20 shadow-sm">
            {activeChild?.nickname?.charAt(0) || activeChild?.name?.charAt(0) || 'S'}
          </div>

          <div>
            <h3 className=" text-xl font-bold text-[#1b1831]">
              {activeChild?.nickname || activeChild?.name}
            </h3>
            <span className="text-xs text-primary font-semibold bg-[#EBE5FF] border border-[#E6DEFF] px-3 py-1 rounded-full inline-block mt-1">
              {activeChild?.grade || 'Grade 11'} • Age 17
            </span>
          </div>

          <p className="text-xs text-[#6A6678] leading-relaxed">
            Connected to family account. Student private notes remain encrypted and strictly student-owned.
          </p>
        </div>

        {/* Right Column: Edit Details & Goals */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DEFF] hover:border-primary/40 shadow-xs space-y-6 transition-all">
          <form onSubmit={handleSave} className="space-y-4">
            <h3 className=" text-lg font-bold text-[#1b1831] border-b border-[#E6DEFF] pb-2">
              Profile Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#1b1831] block mb-1">
                  Preferred Nickname
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full py-2.5 px-4 text-xs sm:text-sm rounded-full bg-[#FCF8FF] border border-[#E6DEFF] hover:border-primary/40 text-[#1b1831] focus:outline-none focus:border-black shadow-2xs transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1b1831] block mb-1">
                  Academic Level / Grade
                </label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full py-2.5 px-4 text-xs sm:text-sm rounded-full bg-[#FCF8FF] border border-[#E6DEFF] hover:border-primary/40 text-[#1b1831] focus:outline-none focus:border-black shadow-2xs transition-all"
                />
              </div>
            </div>

            {/* Passions & Interests */}
            <div className="pt-3">
              <label className="text-xs font-semibold text-[#1b1831] block mb-2">
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
                          ? 'bg-primary text-white border-[#E6DEFF] shadow-xs'
                          : 'bg-[#FCF8FF] text-[#1b1831] border-[#E6DEFF] hover:border-primary/40'
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
              <label className="text-xs font-semibold text-[#1b1831] block mb-2">
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
                          ? 'bg-primary text-white border-[#E6DEFF] shadow-xs'
                          : 'bg-[#FCF8FF] text-[#1b1831] border-[#E6DEFF] hover:border-primary/40'
                      }`}
                    >
                      {goal}
                    </button>
                  );
                })}
              </div>
            </div>

            {savedSuccess && (
              <div className="p-3 rounded-2xl bg-[#EBE5FF] border border-[#E6DEFF] text-primary text-xs font-semibold flex items-center gap-2 animate-fadeIn shadow-2xs">
                <Check className="w-4 h-4" />
                <span>Profile preferences updated successfully!</span>
              </div>
            )}

            <div className="pt-4 border-t border-[#E6DEFF] flex justify-end">
              <button
                type="submit"
                className="py-2.5 px-6 rounded-full text-xs sm:text-sm font-semibold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] hover:border-primary/40 transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
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
