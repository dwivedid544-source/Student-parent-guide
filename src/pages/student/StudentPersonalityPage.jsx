import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Brain,
  Compass,
  ShieldCheck,
  Heart,
  Zap,
  BookOpen,
  Target,
  Clock,
  CheckCircle2,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  ExternalLink,
  Loader2,
  Calendar,
  Lock,
  ChevronRight,
  User,
  Activity,
  Smile,
  ListTodo
} from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import {
  fetchPersonalityProfileApi,
  updatePersonalityProfileApi
} from '../../services/personalityApi';

export const StudentPersonalityPage = () => {
  const { activeChild } = useOnboarding();
  const studentId = activeChild?.id || 'student_1';

  // Profile data from backend
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // Edit States for permitted fields
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [interestsDraft, setInterestsDraft] = useState([]);
  const [newInterestInput, setNewInterestInput] = useState('');

  const [isEditingEnjoy, setIsEditingEnjoy] = useState(false);
  const [enjoyDraft, setEnjoyDraft] = useState([]);
  const [newEnjoyInput, setNewEnjoyInput] = useState('');

  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [preferencesDraft, setPreferencesDraft] = useState({});

  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState('Focus & Habits');
  const [newGoalTarget, setNewGoalTarget] = useState('Dec 2026');

  const [isAddingReflection, setIsAddingReflection] = useState(false);
  const [newReflectionPrompt, setNewReflectionPrompt] = useState('What core strength helped you navigate a challenge this week?');
  const [newReflectionText, setNewReflectionText] = useState('');

  // Saving / Feedback State
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(null);
  const [saveErrorMsg, setSaveErrorMsg] = useState(null);

  // Preset pools for quick additions
  const standardInterestsPool = [
    'Leadership & Growth',
    'Mathematics & Logic',
    'Creative Writing',
    'Philosophy & Ethics',
    'Coding & Technology',
    'Space & Science',
    'Music & Creative Arts',
    'Physical Fitness & Athletics',
    'Psychology & Human Behavior',
    'Environmental Stewardship'
  ];

  // Load personality profile from backend
  const loadProfile = async () => {
    setIsLoading(true);
    setLoadError(null);
    const res = await fetchPersonalityProfileApi(studentId);
    setIsLoading(false);

    if (res.success && res.profile) {
      setProfile(res.profile);
      setInterestsDraft(res.profile.selfReported?.interests || []);
      setEnjoyDraft(res.profile.selfReported?.thingsIEnjoy || []);
      setPreferencesDraft(res.profile.selfReported?.learningPreferences || {});
    } else {
      setLoadError(res.error || 'Failed to load student personality profile.');
    }
  };

  useEffect(() => {
    loadProfile();
  }, [studentId]);

  // Generic Save Handler for permitted fields
  const handleSavePermittedUpdates = async (updates, successText) => {
    setIsSaving(true);
    setSaveErrorMsg(null);
    setSaveSuccessMsg(null);

    const res = await updatePersonalityProfileApi(studentId, updates);
    setIsSaving(false);

    if (res.success && res.profile) {
      setProfile(res.profile);
      setSaveSuccessMsg(successText || 'Changes saved successfully.');
      setTimeout(() => setSaveSuccessMsg(null), 3500);
      return true;
    } else {
      setSaveErrorMsg(res.error || 'Failed to save changes.');
      return false;
    }
  };

  // Interests Handlers
  const handleToggleInterest = (interest) => {
    if (interestsDraft.includes(interest)) {
      setInterestsDraft(interestsDraft.filter((i) => i !== interest));
    } else {
      setInterestsDraft([...interestsDraft, interest]);
    }
  };

  const handleAddCustomInterest = (e) => {
    e.preventDefault();
    if (newInterestInput.trim() && !interestsDraft.includes(newInterestInput.trim())) {
      setInterestsDraft([...interestsDraft, newInterestInput.trim()]);
      setNewInterestInput('');
    }
  };

  const handleSaveInterests = async () => {
    const ok = await handleSavePermittedUpdates({ interests: interestsDraft }, 'Interests updated successfully.');
    if (ok) setIsEditingInterests(false);
  };

  // Things I Enjoy Handlers
  const handleAddEnjoyItem = (e) => {
    e.preventDefault();
    if (newEnjoyInput.trim()) {
      setEnjoyDraft([...enjoyDraft, newEnjoyInput.trim()]);
      setNewEnjoyInput('');
    }
  };

  const handleRemoveEnjoyItem = (index) => {
    setEnjoyDraft(enjoyDraft.filter((_, idx) => idx !== index));
  };

  const handleSaveEnjoy = async () => {
    const ok = await handleSavePermittedUpdates({ thingsIEnjoy: enjoyDraft }, 'Things I Enjoy updated successfully.');
    if (ok) setIsEditingEnjoy(false);
  };

  // Learning Preferences Handlers
  const handleSavePreferences = async () => {
    const ok = await handleSavePermittedUpdates(
      { learningPreferences: preferencesDraft },
      'Learning preferences updated successfully.'
    );
    if (ok) setIsEditingPreferences(false);
  };

  // Personal Goals Handlers
  const handleToggleGoalCompleted = async (goalId) => {
    if (!profile?.selfReported?.personalGoals) return;
    const updatedGoals = profile.selfReported.personalGoals.map((g) =>
      g.id === goalId ? { ...g, completed: !g.completed } : g
    );
    await handleSavePermittedUpdates({ personalGoals: updatedGoals }, 'Goal status updated.');
  };

  const handleDeleteGoal = async (goalId) => {
    if (!profile?.selfReported?.personalGoals) return;
    const updatedGoals = profile.selfReported.personalGoals.filter((g) => g.id !== goalId);
    await handleSavePermittedUpdates({ personalGoals: updatedGoals }, 'Goal removed.');
  };

  const handleAddNewGoal = async (e) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    const newGoal = {
      id: `goal_${Date.now()}`,
      title: newGoalTitle.trim(),
      category: newGoalCategory,
      targetDate: newGoalTarget,
      completed: false
    };

    const currentGoals = profile?.selfReported?.personalGoals || [];
    const ok = await handleSavePermittedUpdates(
      { personalGoals: [...currentGoals, newGoal] },
      'New personal goal added.'
    );

    if (ok) {
      setNewGoalTitle('');
      setIsAddingGoal(false);
    }
  };

  // Reflections Handlers
  const handleAddNewReflection = async (e) => {
    e.preventDefault();
    if (!newReflectionText.trim()) return;

    const newEntry = {
      id: `pref_${Date.now()}`,
      date: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date()),
      topic: 'Personal Mindset Growth',
      prompt: newReflectionPrompt,
      text: newReflectionText.trim(),
      source: 'Self-Reflection'
    };

    const currentReflections = profile?.selfReported?.reflections || [];
    const ok = await handleSavePermittedUpdates(
      { reflections: [newEntry, ...currentReflections] },
      'Reflection added to personal record.'
    );

    if (ok) {
      setNewReflectionText('');
      setIsAddingReflection(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-16 text-center rounded-3xl bg-white border border-black/30 shadow-xs space-y-3">
        <Loader2 className="w-8 h-8 text-[#193F30] animate-spin mx-auto" />
        <p className="text-xs sm:text-sm font-medium text-[#737A73]">
          Loading authorized student personality profile...
        </p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="p-8 text-center rounded-3xl bg-[#FDF2F2] border border-black/30 shadow-xs space-y-4 max-w-lg mx-auto">
        <AlertCircle className="w-8 h-8 text-[#B42318] mx-auto" />
        <h3 className="font-serif text-lg font-bold text-[#B42318]">Unable to Load Personality Profile</h3>
        <p className="text-xs text-[#737A73]">{loadError}</p>
        <button
          type="button"
          onClick={loadProfile}
          className="py-2 px-5 rounded-xl text-xs font-semibold text-white bg-[#193F30] hover:bg-[#204936] border border-black/30 cursor-pointer shadow-xs"
        >
          Retry
        </button>
      </div>
    );
  }

  const { selfReported, assessmentDerived, suggestedActivities } = profile || {};

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-16 max-w-5xl mx-auto">
      {/* ============================================================== */}
      {/* HEADER SECTION */}
      {/* ============================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF2EC] text-[#193F30] text-xs font-bold uppercase tracking-wider mb-2 border border-black/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Student Identity & Developmental Blueprint</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202923] tracking-tight">
            My Personality & Character Blueprint
          </h2>
          <p className="text-xs sm:text-sm text-[#737A73] mt-1">
            An integrated view of your validated strengths, self-reported interests, learning flow, and developmental goals.
          </p>
        </div>

        {/* Self-reported vs Assessment Badge Legend */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#F1EDE2] border border-black/30 w-fit text-[11px]">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#EDF2EC] text-[#193F30] font-bold border border-black/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Assessment-Validated</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white text-[#8C5E14] font-bold border border-black/20">
            <Edit3 className="w-3.5 h-3.5" />
            <span>Self-Reported (Editable)</span>
          </span>
        </div>
      </div>

      {/* Save Success / Error Toasts */}
      {saveSuccessMsg && (
        <div className="p-4 rounded-2xl bg-[#EDF2EC] border border-black/30 text-xs text-[#193F30] font-semibold flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#193F30] shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
          <button type="button" onClick={() => setSaveSuccessMsg(null)} className="text-[#193F30] hover:text-black">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {saveErrorMsg && (
        <div className="p-4 rounded-2xl bg-[#FDF2F2] border border-black/30 text-xs text-[#B42318] font-semibold flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#B42318] shrink-0" />
            <span>{saveErrorMsg}</span>
          </div>
          <button type="button" onClick={() => setSaveErrorMsg(null)} className="text-[#B42318] hover:text-black">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ============================================================== */}
      {/* 1. MY STRENGTHS (ASSESSMENT-GENERATED SUMMARY OR CLEAN EMPTY STATE) */}
      {/* ============================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-[#193F30]" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#202923]">
              My Strengths & Core Archetype
            </h3>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#193F30] bg-[#EDF2EC] px-3 py-1 rounded-full border border-black/20 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Assessment-Validated</span>
          </span>
        </div>

        {assessmentDerived?.hasAssessmentResults ? (
          <div className="space-y-4">
            {/* Archetype Hero Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#F1EDE2] via-[#EDF2EC] to-[#F1EDE2] border border-black/30 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white text-[#193F30] text-[11px] font-bold uppercase tracking-wider border border-black/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Verified Growth Archetype</span>
                </div>
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#202923]">
                  {assessmentDerived.archetype}
                </h4>
                <p className="text-xs sm:text-sm text-[#737A73] leading-relaxed">
                  {assessmentDerived.summary}
                </p>
                <div className="pt-2 text-[11px] text-[#4B735F] font-medium flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>
                    Verified via {assessmentDerived.assessmentTitle || 'Self-Assessment'} v{assessmentDerived.assessmentVersion} • Completed {assessmentDerived.assessmentCompletedAt}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-black/30 text-center min-w-[160px] shadow-xs">
                <span className="text-[11px] font-bold text-[#737A73] uppercase block">Growth Index</span>
                <div className="font-serif text-3xl font-bold text-[#193F30] mt-1">
                  {assessmentDerived.overallIndex}%
                </div>
                <span className="text-[11px] text-[#4B735F] font-semibold">Validated Profile</span>
              </div>
            </div>

            {/* Validated Strengths Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assessmentDerived.validatedStrengths?.map((str, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-white border border-black/30 hover:border-black/50 shadow-xs transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-bold text-[#202923]">
                        {str.name}
                      </span>
                      {str.score && (
                        <span className="font-serif font-bold text-[#193F30] text-sm">
                          {str.score}%
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#193F30] bg-[#EDF2EC] px-2 py-0.5 rounded-md border border-black/20">
                        {str.category}
                      </span>
                      <span className="text-[10px] text-[#737A73] font-mono">
                        {str.verifiedSource}
                      </span>
                    </div>
                    <p className="text-xs text-[#737A73] leading-relaxed pt-1">
                      {str.description}
                    </p>
                  </div>

                  {str.score && (
                    <div className="w-full h-1.5 bg-[#EDF2EC] rounded-full overflow-hidden border border-black/20">
                      <div
                        className="h-full bg-[#193F30] rounded-full"
                        style={{ width: `${str.score}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Clean Empty State when assessment results are unavailable */
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-black/30 shadow-xs text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F8F7F2] text-[#737A73] flex items-center justify-center border border-black/20 mx-auto">
              <Brain className="w-6 h-6 opacity-60" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h4 className="font-serif text-lg font-bold text-[#202923]">
                Assessment Results Unavailable
              </h4>
              <p className="text-xs text-[#737A73] leading-relaxed">
                You have not completed the Growth Mindset & Cognitive Strengths assessment yet. Complete your self-assessment to generate verified cognitive strengths and archetype insights.
              </p>
            </div>
            <Link
              to="/child/self-assessment"
              className="inline-flex items-center gap-2 py-2.5 px-6 rounded-xl text-xs font-semibold text-white bg-[#193F30] hover:bg-[#204936] transition-colors border border-black/30 shadow-xs cursor-pointer"
            >
              <span>Take Self-Assessment</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* 2. MY INTERESTS (SELF-REPORTED & PERMITTED EDITABLE) */}
      {/* ============================================================== */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-black/30 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/20">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#8C5E14]" />
              <h3 className="font-serif text-xl font-bold text-[#202923]">
                My Interests & Inquiries
              </h3>
            </div>
            <p className="text-xs text-[#737A73] mt-0.5">
              Subject areas, curiosities, and intellectual passions that spark your engagement.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C5E14] bg-[#FBF5E6] px-2.5 py-1 rounded-full border border-black/20">
              Self-Reported
            </span>
            {!isEditingInterests ? (
              <button
                type="button"
                onClick={() => {
                  setInterestsDraft(selfReported?.interests || []);
                  setIsEditingInterests(true);
                }}
                className="py-1.5 px-3 rounded-xl text-xs font-semibold text-[#193F30] bg-[#EDF2EC] hover:bg-[#E5E0D5] border border-black/30 cursor-pointer flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Interests</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingInterests(false)}
                  className="py-1.5 px-3 rounded-xl text-xs font-semibold text-[#202923] bg-[#F8F7F2] hover:bg-[#E5E0D5] border border-black/30 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleSaveInterests}
                  className="py-1.5 px-3.5 rounded-xl text-xs font-semibold text-white bg-[#193F30] hover:bg-[#204936] border border-black/30 cursor-pointer flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {!isEditingInterests ? (
          /* View Mode */
          <div className="flex flex-wrap gap-2.5">
            {selfReported?.interests?.length > 0 ? (
              selfReported.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-2 rounded-2xl bg-[#F8F7F2] text-[#202923] text-xs font-semibold border border-black/30 hover:border-black/50 transition-all flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#193F30]" />
                  <span>{interest}</span>
                </span>
              ))
            ) : (
              <p className="text-xs text-[#737A73] italic">No interests recorded yet. Click Edit to add some.</p>
            )}
          </div>
        ) : (
          /* Edit Mode */
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="text-xs font-bold text-[#202923] block mb-2">
                Select from standard topics or click to toggle:
              </label>
              <div className="flex flex-wrap gap-2">
                {standardInterestsPool.map((interest) => {
                  const isSelected = interestsDraft.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleToggleInterest(interest)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#193F30] text-white border-black/40 ring-1 ring-[#193F30]'
                          : 'bg-[#F8F7F2] text-[#202923] border-black/20 hover:border-black/40'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Interest Input */}
            <form onSubmit={handleAddCustomInterest} className="flex gap-2 max-w-md pt-2">
              <input
                type="text"
                value={newInterestInput}
                onChange={(e) => setNewInterestInput(e.target.value)}
                placeholder="Add custom interest (e.g. Astrobiology)..."
                className="flex-1 px-3.5 py-2 rounded-xl text-xs bg-[#F8F7F2] border border-black/30 focus:outline-none focus:ring-1 focus:ring-[#193F30]"
              />
              <button
                type="submit"
                className="py-2 px-3.5 rounded-xl text-xs font-semibold text-[#193F30] bg-[#EDF2EC] hover:bg-[#E5E0D5] border border-black/30 cursor-pointer"
              >
                Add Tag
              </button>
            </form>
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* 3. THINGS I ENJOY (SELF-REPORTED & PERMITTED EDITABLE) */}
      {/* ============================================================== */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-black/30 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/20">
          <div>
            <div className="flex items-center gap-2">
              <Smile className="w-5 h-5 text-[#8C5E14]" />
              <h3 className="font-serif text-xl font-bold text-[#202923]">
                Things I Enjoy
              </h3>
            </div>
            <p className="text-xs text-[#737A73] mt-0.5">
              Hobbies, flow states, and everyday activities that bring you genuine joy and refreshment.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C5E14] bg-[#FBF5E6] px-2.5 py-1 rounded-full border border-black/20">
              Self-Reported
            </span>
            {!isEditingEnjoy ? (
              <button
                type="button"
                onClick={() => {
                  setEnjoyDraft(selfReported?.thingsIEnjoy || []);
                  setIsEditingEnjoy(true);
                }}
                className="py-1.5 px-3 rounded-xl text-xs font-semibold text-[#193F30] bg-[#EDF2EC] hover:bg-[#E5E0D5] border border-black/30 cursor-pointer flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Pursuits</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingEnjoy(false)}
                  className="py-1.5 px-3 rounded-xl text-xs font-semibold text-[#202923] bg-[#F8F7F2] hover:bg-[#E5E0D5] border border-black/30 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleSaveEnjoy}
                  className="py-1.5 px-3.5 rounded-xl text-xs font-semibold text-white bg-[#193F30] hover:bg-[#204936] border border-black/30 cursor-pointer flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {!isEditingEnjoy ? (
          /* View Mode */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selfReported?.thingsIEnjoy?.length > 0 ? (
              selfReported.thingsIEnjoy.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#F8F7F2] border border-black/30 hover:border-black/50 transition-all flex items-center gap-3"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#193F30] shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-[#202923] leading-relaxed">
                    {item}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#737A73] italic">No favorite pursuits listed yet.</p>
            )}
          </div>
        ) : (
          /* Edit Mode */
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-2">
              {enjoyDraft.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#F8F7F2] border border-black/30 flex items-center justify-between gap-3"
                >
                  <span className="text-xs font-medium text-[#202923]">{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveEnjoyItem(idx)}
                    className="text-[#B42318] hover:text-black p-1 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddEnjoyItem} className="flex gap-2 max-w-lg pt-2">
              <input
                type="text"
                value={newEnjoyInput}
                onChange={(e) => setNewEnjoyInput(e.target.value)}
                placeholder="Add something you enjoy (e.g. Playing acoustic guitar)..."
                className="flex-1 px-3.5 py-2 rounded-xl text-xs bg-[#F8F7F2] border border-black/30 focus:outline-none focus:ring-1 focus:ring-[#193F30]"
              />
              <button
                type="submit"
                className="py-2 px-3.5 rounded-xl text-xs font-semibold text-[#193F30] bg-[#EDF2EC] hover:bg-[#E5E0D5] border border-black/30 cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* 4. MY LEARNING PREFERENCES (HYBRID ASSESSMENT & SELF-REPORTED) */}
      {/* ============================================================== */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-black/30 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/20">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#193F30]" />
              <h3 className="font-serif text-xl font-bold text-[#202923]">
                My Learning Preferences & Flow Conditions
              </h3>
            </div>
            <p className="text-xs text-[#737A73] mt-0.5">
              Optimal physical, auditory, and cognitive conditions that maximize your learning retention.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!isEditingPreferences ? (
              <button
                type="button"
                onClick={() => {
                  setPreferencesDraft(selfReported?.learningPreferences || {});
                  setIsEditingPreferences(true);
                }}
                className="py-1.5 px-3 rounded-xl text-xs font-semibold text-[#193F30] bg-[#EDF2EC] hover:bg-[#E5E0D5] border border-black/30 cursor-pointer flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Habits</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingPreferences(false)}
                  className="py-1.5 px-3 rounded-xl text-xs font-semibold text-[#202923] bg-[#F8F7F2] hover:bg-[#E5E0D5] border border-black/30 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleSavePreferences}
                  className="py-1.5 px-3.5 rounded-xl text-xs font-semibold text-white bg-[#193F30] hover:bg-[#204936] border border-black/30 cursor-pointer flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Assessment-Derived Flow Orientation (Read-Only) */}
        {assessmentDerived?.hasAssessmentResults && (
          <div className="p-4 rounded-2xl bg-[#EDF2EC] border border-black/30 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#193F30] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Assessment-Identified Flow State: Deep Focus Soloist</span>
              </span>
              <span className="text-[10px] text-[#4B735F] font-mono">Curriculum Metric</span>
            </div>
            <p className="text-xs text-[#202923] leading-relaxed">
              Your assessment confirms highest productivity in solitary, distraction-free study blocks where goals are pre-defined and interruptions are eliminated.
            </p>
          </div>
        )}

        {/* Self-Reported Study Habits (Editable) */}
        {!isEditingPreferences ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#F8F7F2] border border-black/30 space-y-1">
              <span className="text-[10px] font-bold text-[#737A73] uppercase tracking-wider block">
                Study Environment
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#202923]">
                {selfReported?.learningPreferences?.studyEnvironment || 'Not specified'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F7F2] border border-black/30 space-y-1">
              <span className="text-[10px] font-bold text-[#737A73] uppercase tracking-wider block">
                Peak Cognitive Window
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#202923]">
                {selfReported?.learningPreferences?.peakFocusWindow || 'Not specified'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F7F2] border border-black/30 space-y-1">
              <span className="text-[10px] font-bold text-[#737A73] uppercase tracking-wider block">
                Primary Retention Strategy
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#202923]">
                {selfReported?.learningPreferences?.retentionMethod || 'Not specified'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F7F2] border border-black/30 space-y-1">
              <span className="text-[10px] font-bold text-[#737A73] uppercase tracking-wider block">
                Sound & Ambient Preference
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#202923]">
                {selfReported?.learningPreferences?.soundPreference || 'Not specified'}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#202923]">Study Environment</label>
                <input
                  type="text"
                  value={preferencesDraft.studyEnvironment || ''}
                  onChange={(e) =>
                    setPreferencesDraft({ ...preferencesDraft, studyEnvironment: e.target.value })
                  }
                  placeholder="e.g. Quiet solitary desk with natural light"
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#F8F7F2] border border-black/30 focus:outline-none focus:ring-1 focus:ring-[#193F30]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#202923]">Peak Cognitive Window</label>
                <select
                  value={preferencesDraft.peakFocusWindow || ''}
                  onChange={(e) =>
                    setPreferencesDraft({ ...preferencesDraft, peakFocusWindow: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#F8F7F2] border border-black/30 focus:outline-none focus:ring-1 focus:ring-[#193F30]"
                >
                  <option value="Early Morning (6:00 AM - 10:00 AM)">Early Morning (6:00 AM - 10:00 AM)</option>
                  <option value="Midday & Afternoon (11:00 AM - 3:00 PM)">Midday & Afternoon (11:00 AM - 3:00 PM)</option>
                  <option value="Late Afternoon & Evening (4:00 PM - 8:00 PM)">Late Afternoon & Evening (4:00 PM - 8:00 PM)</option>
                  <option value="Late Night (9:00 PM - 12:00 AM)">Late Night (9:00 PM - 12:00 AM)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#202923]">Retention Strategy</label>
                <input
                  type="text"
                  value={preferencesDraft.retentionMethod || ''}
                  onChange={(e) =>
                    setPreferencesDraft({ ...preferencesDraft, retentionMethod: e.target.value })
                  }
                  placeholder="e.g. First-principles synthesis notes"
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#F8F7F2] border border-black/30 focus:outline-none focus:ring-1 focus:ring-[#193F30]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#202923]">Sound & Ambient Preference</label>
                <input
                  type="text"
                  value={preferencesDraft.soundPreference || ''}
                  onChange={(e) =>
                    setPreferencesDraft({ ...preferencesDraft, soundPreference: e.target.value })
                  }
                  placeholder="e.g. Ambient binaural beats"
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#F8F7F2] border border-black/30 focus:outline-none focus:ring-1 focus:ring-[#193F30]"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* 5. MY PERSONAL GOALS (SELF-REPORTED & PERMITTED EDITABLE) */}
      {/* ============================================================== */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-black/30 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/20">
          <div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-[#8C5E14]" />
              <h3 className="font-serif text-xl font-bold text-[#202923]">
                My Personal Growth Goals
              </h3>
            </div>
            <p className="text-xs text-[#737A73] mt-0.5">
              Specific developmental commitments you are currently cultivating.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C5E14] bg-[#FBF5E6] px-2.5 py-1 rounded-full border border-black/20">
              Self-Reported
            </span>
            <button
              type="button"
              onClick={() => setIsAddingGoal(!isAddingGoal)}
              className="py-1.5 px-3 rounded-xl text-xs font-semibold text-[#193F30] bg-[#EDF2EC] hover:bg-[#E5E0D5] border border-black/30 cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isAddingGoal ? 'Close Form' : 'Add Goal'}</span>
            </button>
          </div>
        </div>

        {/* Add Goal Form */}
        {isAddingGoal && (
          <form onSubmit={handleAddNewGoal} className="p-4 rounded-2xl bg-[#F8F7F2] border border-black/30 space-y-3 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-[#202923]">Goal Title</label>
                <input
                  type="text"
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  placeholder="e.g. Master Stoic resilience under academic stress"
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-white border border-black/30 focus:outline-none focus:ring-1 focus:ring-[#193F30]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#202923]">Category</label>
                <select
                  value={newGoalCategory}
                  onChange={(e) => setNewGoalCategory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-white border border-black/30 focus:outline-none focus:ring-1 focus:ring-[#193F30]"
                >
                  <option value="Focus & Habits">Focus & Habits</option>
                  <option value="Academic Mastery">Academic Mastery</option>
                  <option value="Emotional Resilience">Emotional Resilience</option>
                  <option value="Communication">Communication</option>
                  <option value="Leadership">Leadership</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-[#737A73]">Target: {newGoalTarget}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingGoal(false)}
                  className="py-1.5 px-3 rounded-xl text-xs font-semibold text-[#202923] bg-white border border-black/30 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newGoalTitle.trim()}
                  className="py-1.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#193F30] hover:bg-[#204936] border border-black/30 cursor-pointer disabled:opacity-50"
                >
                  Save Goal
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Goals List */}
        <div className="space-y-3">
          {selfReported?.personalGoals?.length > 0 ? (
            selfReported.personalGoals.map((g) => (
              <div
                key={g.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  g.completed
                    ? 'bg-[#EDF2EC]/60 border-black/20 opacity-80'
                    : 'bg-[#F8F7F2] border-black/30 hover:border-black/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggleGoalCompleted(g.id)}
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center cursor-pointer transition-colors ${
                      g.completed ? 'bg-[#193F30] border-[#193F30] text-white' : 'bg-white border-black/30 hover:border-black/50'
                    }`}
                    title={g.completed ? 'Mark pending' : 'Mark completed'}
                  >
                    {g.completed && <Check className="w-3.5 h-3.5" />}
                  </button>

                  <div>
                    <h5 className={`text-xs sm:text-sm font-bold ${g.completed ? 'line-through text-[#737A73]' : 'text-[#202923]'}`}>
                      {g.title}
                    </h5>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#737A73]">
                      <span className="font-semibold text-[#193F30]">{g.category}</span>
                      <span>•</span>
                      <span>Target: {g.targetDate}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteGoal(g.id)}
                  className="text-[#737A73] hover:text-[#B42318] p-1.5 rounded-lg cursor-pointer transition-colors"
                  title="Remove goal"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-xs text-[#737A73] italic">No personal goals recorded yet.</p>
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. MY REFLECTIONS (SELF-REPORTED & LOGGED ENTRIES) */}
      {/* ============================================================== */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-black/30 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/20">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#8C5E14]" />
              <h3 className="font-serif text-xl font-bold text-[#202923]">
                My Reflections & Mindset Log
              </h3>
            </div>
            <p className="text-xs text-[#737A73] mt-0.5">
              Personal breakthroughs, reframing moments, and self-observation notes.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddingReflection(!isAddingReflection)}
            className="py-1.5 px-3 rounded-xl text-xs font-semibold text-[#193F30] bg-[#EDF2EC] hover:bg-[#E5E0D5] border border-black/30 cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isAddingReflection ? 'Close' : 'Add Reflection'}</span>
          </button>
        </div>

        {/* Add Reflection Form */}
        {isAddingReflection && (
          <form onSubmit={handleAddNewReflection} className="p-4 rounded-2xl bg-[#F8F7F2] border border-black/30 space-y-3 animate-fadeIn">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#202923]">Reflection Prompt</label>
              <select
                value={newReflectionPrompt}
                onChange={(e) => setNewReflectionPrompt(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-white border border-black/30 focus:outline-none focus:ring-1 focus:ring-[#193F30]"
              >
                <option value="What core strength helped you navigate a challenge this week?">
                  What core strength helped you navigate a challenge this week?
                </option>
                <option value="Describe a recent moment where you reframed a mistake into learning data.">
                  Describe a recent moment where you reframed a mistake into learning data.
                </option>
                <option value="What boundary or daily anchor will you maintain to protect your focus?">
                  What boundary or daily anchor will you maintain to protect your focus?
                </option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#202923]">Your Reflection</label>
              <textarea
                rows={3}
                value={newReflectionText}
                onChange={(e) => setNewReflectionText(e.target.value)}
                placeholder="Write your honest reflection..."
                className="w-full p-3.5 rounded-xl text-xs bg-white border border-black/30 focus:outline-none focus:ring-1 focus:ring-[#193F30] resize-y"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddingReflection(false)}
                className="py-1.5 px-3 rounded-xl text-xs font-semibold text-[#202923] bg-white border border-black/30 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newReflectionText.trim()}
                className="py-1.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#193F30] hover:bg-[#204936] border border-black/30 cursor-pointer disabled:opacity-50"
              >
                Archive Reflection
              </button>
            </div>
          </form>
        )}

        {/* Reflections List */}
        <div className="space-y-3">
          {selfReported?.reflections?.length > 0 ? (
            selfReported.reflections.map((ref) => (
              <div
                key={ref.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#F8F7F2] border border-black/30 hover:border-black/50 transition-all space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#193F30] bg-[#EDF2EC] px-2.5 py-0.5 rounded-md border border-black/20">
                      {ref.topic || 'Reflection'}
                    </span>
                    <span className="text-[10px] text-[#737A73]">{ref.source}</span>
                  </div>
                  <span className="text-[11px] text-[#737A73]">{ref.date}</span>
                </div>

                <p className="text-xs font-semibold text-[#202923] italic">
                  "{ref.prompt}"
                </p>
                <p className="text-xs sm:text-sm text-[#737A73] leading-relaxed pt-1 border-t border-black/20">
                  {ref.text}
                </p>
              </div>
            ))
          ) : (
            <p className="text-xs text-[#737A73] italic">No reflections recorded yet.</p>
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. SUGGESTED ACTIVITIES (CONNECTED TO ACTIVITY BACKEND) */}
      {/* ============================================================== */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-black/30 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/20">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#193F30]" />
              <h3 className="font-serif text-xl font-bold text-[#202923]">
                Suggested Growth Activities
              </h3>
            </div>
            <p className="text-xs text-[#737A73] mt-0.5">
              Curated from your active curriculum catalog to reinforce your validated strengths and declared goals.
            </p>
          </div>

          <Link
            to="/child/activities"
            className="text-xs font-bold text-[#193F30] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Explore All Activities</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {suggestedActivities?.map((act) => (
            <div
              key={act.id}
              className="p-5 rounded-2xl bg-[#F8F7F2] border border-black/30 hover:border-black/50 transition-all flex flex-col justify-between gap-3 shadow-2xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="text-[#193F30] bg-[#EDF2EC] px-2 py-0.5 rounded-md border border-black/20">
                    {act.category}
                  </span>
                  <span className="text-[#737A73] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{act.duration}</span>
                  </span>
                </div>

                <h5 className="font-serif text-sm font-bold text-[#202923] leading-snug">
                  {act.title}
                </h5>

                <p className="text-[11px] text-[#737A73] leading-relaxed">
                  {act.reason}
                </p>
              </div>

              <Link
                to="/child/activities"
                className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-white bg-[#193F30] hover:bg-[#204936] border border-black/30 shadow-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Start Activity</span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentPersonalityPage;
