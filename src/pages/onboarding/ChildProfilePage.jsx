import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Sparkles, Smile, Heart, Star, Plus, Trash2, Edit3, Calendar, GraduationCap, AlertCircle, Check } from 'lucide-react';
import { OnboardingLayout } from '../../components/common/OnboardingLayout';
import { FormInput } from '../../components/common/FormInput';
import { useOnboarding } from '../../context/OnboardingContext';
import avatarSparkyImg from '../../assets/avatar_sparky.png';

export const ChildProfilePage = () => {
  const navigate = useNavigate();
  const {
    childrenList,
    activeChild,
    activeChildId,
    setActiveChild,
    addChild,
    updateChild,
    removeChild,
  } = useOnboarding();

  // Local state for active child being edited
  const [childName, setChildName] = useState(activeChild?.name || 'Sparky McWonder');
  const [childNickname, setChildNickname] = useState(activeChild?.nickname || 'Sparky');
  const [dateOfBirth, setDateOfBirth] = useState(activeChild?.dateOfBirth || '');
  const [grade, setGrade] = useState(activeChild?.grade || 'Grade 2');
  const [error, setError] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Sync local fields when active child changes
  useEffect(() => {
    if (activeChild) {
      setChildName(activeChild.name || '');
      setChildNickname(activeChild.nickname || '');
      setDateOfBirth(activeChild.dateOfBirth || '');
      setGrade(activeChild.grade || 'Grade 2');
      setError('');
    }
  }, [activeChildId]);

  const handleSaveActive = () => {
    if (!childName.trim()) {
      setError("Please enter your little explorer's name");
      return false;
    }

    if (activeChildId) {
      updateChild(activeChildId, {
        name: childName.trim(),
        nickname: childNickname.trim() || childName.trim().split(' ')[0],
        dateOfBirth,
        grade,
      });
    }
    return true;
  };

  const handleAddNewChild = () => {
    if (handleSaveActive()) {
      const newId = addChild({
        name: `Explorer ${childrenList.length + 1}`,
        nickname: `Explorer ${childrenList.length + 1}`,
        ageGroup: '6–9 years',
        grade: 'Grade 1',
      });
      setActiveChild(newId);
    }
  };

  const handleSelectChild = (id) => {
    if (handleSaveActive()) {
      setActiveChild(id);
    }
  };

  const handleConfirmDelete = (id) => {
    removeChild(id);
    setDeleteConfirmId(null);
  };

  const handleContinue = () => {
    if (!handleSaveActive()) return;
    navigate('/onboarding/age');
  };

  const currentAvatarImg = activeChild?.avatar?.avatarImg || avatarSparkyImg;

  return (
    <OnboardingLayout
      currentStep={3}
      title="Create Child Profiles"
      subtitle="LifeVerse AI allows you to manage multiple children under one parent account with personalized learning journeys for each."
      onContinue={handleContinue}
      continueText="Continue to Age Selection"
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Top Multi-Child Selector Bar */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFD66B]">
                Family Explorers ({childrenList.length})
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                Multi-Child Active
              </span>
            </div>
            <p className="text-xs text-white/70 mt-0.5">
              Select a child to edit their profile or add another child to your family.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddNewChild}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#65BDEB] to-[#9375E8] hover:from-[#54a9d4] hover:to-[#8264d6] shadow-md shadow-sky-500/30 hover:scale-[1.02] transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Child</span>
          </button>
        </div>

        {/* Children Profile Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {childrenList.map((child, idx) => {
            const isActive = child.id === activeChildId;
            return (
              <div
                key={child.id}
                onClick={() => handleSelectChild(child.id)}
                className={`relative p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                  isActive
                    ? 'border-[#F45124] bg-[#F45124]/20 shadow-lg shadow-orange-500/25 ring-2 ring-[#F45124]/50'
                    : 'border-white/15 bg-white/5 hover:bg-white/10 text-white/80'
                }`}
              >
                {/* Mini Avatar */}
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/30 bg-[#0c1b2d] shrink-0">
                  <img
                    src={child.avatar?.avatarImg || avatarSparkyImg}
                    alt={child.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white truncate">
                      {child.nickname || child.name || `Child ${idx + 1}`}
                    </span>
                    {isActive && (
                      <span className="px-1.5 py-0.2 rounded-full bg-[#F45124] text-[9px] font-black text-white uppercase">
                        Editing
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-white/60 truncate mt-0.5">
                    {child.ageGroup || 'Age not set'} • {child.grade || 'Grade 1'}
                  </div>
                </div>

                {/* Delete Button (Only if more than 1 child) */}
                {childrenList.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirmId(child.id);
                    }}
                    className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Remove profile"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="p-4 rounded-2xl bg-red-950/80 border border-red-500/40 text-white flex items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <span className="text-xs sm:text-sm">
                Are you sure you want to remove this child profile? Their personalized quests will be deleted.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleConfirmDelete(deleteConfirmId)}
                className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 hover:bg-red-700 text-white"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        )}

        {/* Main Edit Layout: Avatar Preview (Left) + Form Details (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left: Avatar / Character Preview Card */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative group">
              {/* Glowing ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#F45124] via-[#FFD66B] to-[#65BDEB] opacity-70 blur-md group-hover:opacity-100 transition-opacity" />

              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-white/40 bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-md shadow-2xl p-2 flex flex-col items-center justify-center">
                <img
                  src={currentAvatarImg}
                  alt="Child Avatar Preview"
                  className="w-full h-full object-cover rounded-2xl"
                />
                
                {/* Floating Name Badge */}
                <div className="absolute -bottom-3 px-4 py-1.5 rounded-full bg-[#19324D] border-2 border-[#65BDEB] text-xs sm:text-sm font-extrabold text-white shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFD66B]" />
                  <span>{childNickname || childName || 'Little Explorer'}</span>
                </div>
              </div>
            </div>

            <p className="mt-5 text-xs text-white/70 text-center max-w-xs font-medium">
              You can customize their learning buddy avatar in Step 7!
            </p>
          </div>

          {/* Right: Input Form Fields */}
          <div className="md:col-span-7 flex flex-col gap-4 p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/25 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-[#FFD66B] uppercase tracking-wider">
                <Star className="w-4 h-4 fill-[#FFD66B]" />
                <span>Editing Explorer Profile</span>
              </div>
              <span className="text-xs text-white/60">ID: {activeChildId}</span>
            </div>

            {/* Child Full Name */}
            <FormInput
              label="Child's Full Name"
              placeholder="e.g. Sparky McWonder"
              value={childName}
              onChange={(e) => {
                setChildName(e.target.value);
                if (error) setError('');
              }}
              error={error}
              required
              icon={User}
            />

            {/* Child Nickname */}
            <FormInput
              label="Nickname or Preferred Display Name (Optional)"
              placeholder="e.g. Sparky, Leo, Ari"
              value={childNickname}
              onChange={(e) => setChildNickname(e.target.value)}
              icon={Smile}
            />

            {/* Grid for Grade/Class & Date of Birth */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Grade / Class */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-white text-xs md:text-sm font-semibold tracking-wide pl-1 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-[#65BDEB]" />
                  <span>Grade / School Class</span>
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full py-3 px-4 text-sm font-medium rounded-full text-white bg-[#65BDEB]/30 border border-white/40 focus:outline-none focus:ring-2 focus:ring-[#65BDEB]/60 backdrop-blur-md cursor-pointer"
                >
                  <option value="Preschool" className="bg-[#0c1b2d] text-white">Preschool (Age 3-4)</option>
                  <option value="Kindergarten" className="bg-[#0c1b2d] text-white">Kindergarten (Age 5)</option>
                  <option value="Grade 1" className="bg-[#0c1b2d] text-white">Grade 1 (Age 6)</option>
                  <option value="Grade 2" className="bg-[#0c1b2d] text-white">Grade 2 (Age 7)</option>
                  <option value="Grade 3" className="bg-[#0c1b2d] text-white">Grade 3 (Age 8)</option>
                  <option value="Grade 4" className="bg-[#0c1b2d] text-white">Grade 4 (Age 9)</option>
                  <option value="Grade 5" className="bg-[#0c1b2d] text-white">Grade 5 (Age 10)</option>
                  <option value="Grade 6" className="bg-[#0c1b2d] text-white">Grade 6 (Age 11)</option>
                  <option value="Grade 7-8" className="bg-[#0c1b2d] text-white">Grade 7–8 (Age 12-14)</option>
                </select>
              </div>

              {/* Date of Birth or Approximate Age */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-white text-xs md:text-sm font-semibold tracking-wide pl-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#FFD66B]" />
                  <span>Date of Birth (Optional)</span>
                </label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full py-2.5 px-4 text-sm font-medium rounded-full text-white bg-[#65BDEB]/30 border border-white/40 focus:outline-none focus:ring-2 focus:ring-[#65BDEB]/60 backdrop-blur-md"
                />
              </div>

            </div>

            {/* Friendly Note */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs text-white/75 mt-1">
              <Heart className="w-4 h-4 text-[#F45124] shrink-0 mt-0.5" />
              <span>
                We'll use this profile information to calibrate age-appropriate storytelling, AI tutor voice guidance, and quiz difficulty.
              </span>
            </div>
          </div>

        </div>

      </div>
    </OnboardingLayout>
  );
};

export default ChildProfilePage;
