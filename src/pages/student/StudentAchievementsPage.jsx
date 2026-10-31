import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  Star,
  Flame,
  Brain,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  Download,
  Share2,
  X,
  Check,
  TrendingUp,
  Target,
  Clock,
  Layers
} from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';

export const StudentAchievementsPage = () => {
  const navigate = useNavigate();
  const { activeChild } = useOnboarding();

  // Full Rich Catalog of Student Badges & Growth Milestones
  const initialBadges = [
    {
      id: 'b1',
      title: '5-Day Habit Momentum',
      category: 'Consistency',
      desc: 'Completed daily morning reflection and deep work sprint 5 days consecutively.',
      unlocked: true,
      icon: Flame,
      date: 'Earned Oct 22, 2026',
      xp: 150,
      level: 'Gold Milestone',
      criteria: 'Maintain a 5-day unbroken streak across morning habits.',
      actionRoute: '/child/activities'
    },
    {
      id: 'b2',
      title: 'Self-Discovery Pioneer',
      category: 'Mindset',
      desc: 'Finished initial personal leadership values questionnaire and strengths map.',
      unlocked: true,
      icon: Brain,
      date: 'Earned Oct 18, 2026',
      xp: 200,
      level: 'Platinum Insight',
      criteria: 'Complete the 3-phase self-discovery questionnaire and discover top 5 values.',
      actionRoute: '/child/personality'
    },
    {
      id: 'b3',
      title: 'Stress Resilience Master',
      category: 'Wellness',
      desc: 'Completed 10 box-breathing and focus grounding sessions.',
      unlocked: true,
      icon: ShieldCheck,
      date: 'Earned Oct 25, 2026',
      xp: 180,
      level: 'Silver Guardian',
      criteria: 'Complete 10 intentional 4-7-8 breathing sessions in Focus Studio.',
      actionRoute: '/child/wellness'
    },
    {
      id: 'b4',
      title: 'Deep Focus Architect',
      category: 'Academics',
      desc: 'Completed 15 distraction-free Pomodoro sprints with verified reflections.',
      unlocked: true,
      icon: Clock,
      date: 'Earned Oct 28, 2026',
      xp: 220,
      level: 'Gold Scholar',
      criteria: 'Log 15 deep focus sessions without tab switching.',
      actionRoute: '/child/wellness'
    },
    {
      id: 'b5',
      title: 'Values & Ethics Champion',
      category: 'Leadership',
      desc: 'Successfully analyzed peer pressure dilemmas and formulated principled action rules.',
      unlocked: true,
      icon: Award,
      date: 'Earned Oct 30, 2026',
      xp: 250,
      level: 'Diamond Leader',
      criteria: 'Submit Core Values reflection with mentor endorsement.',
      actionRoute: '/child/assignments'
    },
    {
      id: 'b6',
      title: '14-Day Consistency Master',
      category: 'Mastery',
      desc: 'Maintain daily growth habits for 14 uninterrupted days.',
      unlocked: false,
      icon: Star,
      date: 'In Progress (6/14 days)',
      progress: 6,
      target: 14,
      xp: 400,
      level: 'Mastery Tier',
      criteria: 'Achieve 14 consecutive days of daily habit completion.',
      actionText: 'Continue Habit Tracker',
      actionRoute: '/child/activities'
    },
    {
      id: 'b7',
      title: 'Parent Bridge Excellence',
      category: 'Communication',
      desc: 'Share 3 weekly reflection summaries with your parent or family mentor.',
      unlocked: false,
      icon: Layers,
      date: 'In Progress (1/3 shared)',
      progress: 1,
      target: 3,
      xp: 300,
      level: 'Harmony Award',
      criteria: 'Present 3 weekly reflection summaries to your family.',
      actionText: 'Submit Reflection',
      actionRoute: '/child/assignments'
    },
    {
      id: 'b8',
      title: 'Critical Media Analyst',
      category: 'Academics',
      desc: 'Contrast journalistic framing and distinguish empirical facts from sensationalist bias.',
      unlocked: false,
      icon: Target,
      date: 'In Progress (1/2 evaluated)',
      progress: 1,
      target: 2,
      xp: 250,
      level: 'Critical Thinker',
      criteria: 'Complete the CRAAP media literacy framework case study.',
      actionText: 'Start Case Study',
      actionRoute: '/child/assignments'
    },
    {
      id: 'b9',
      title: 'Quarterly Resilience Architect',
      category: 'Leadership',
      desc: 'Design semester SMART objectives with obstacle contingencies and weekly sprints.',
      unlocked: false,
      icon: TrendingUp,
      date: 'In Progress (Drafted)',
      progress: 2,
      target: 3,
      xp: 350,
      level: 'Strategist',
      criteria: 'Formulate 3 SMART milestone objectives and receive mentor signoff.',
      actionText: 'Review Milestones',
      actionRoute: '/child/growth'
    }
  ];

  // Interactive Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL'); // 'ALL' | 'UNLOCKED' | 'LOCKED'
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedBadgeModal, setSelectedBadgeModal] = useState(null);
  const [copiedNotice, setCopiedNotice] = useState(null);

  const categories = ['ALL', 'Consistency', 'Mindset', 'Wellness', 'Academics', 'Leadership', 'Mastery', 'Communication'];

  // Filtered Badges Calculation
  const filteredBadges = useMemo(() => {
    return initialBadges.filter((b) => {
      // Status filter
      if (selectedStatus === 'UNLOCKED' && !b.unlocked) return false;
      if (selectedStatus === 'LOCKED' && b.unlocked) return false;

      // Category filter
      if (selectedCategory !== 'ALL' && b.category !== selectedCategory) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = b.title.toLowerCase().includes(query);
        const matchesDesc = b.desc.toLowerCase().includes(query);
        const matchesCat = b.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCat) return false;
      }

      return true;
    });
  }, [selectedStatus, selectedCategory, searchQuery]);

  // Aggregate Stats
  const unlockedCount = initialBadges.filter((b) => b.unlocked).length;
  const lockedCount = initialBadges.filter((b) => !b.unlocked).length;
  const totalXp = initialBadges
    .filter((b) => b.unlocked)
    .reduce((sum, b) => sum + (b.xp || 0), 0);

  const handleDownloadCertificate = () => {
    setCopiedNotice('Certificate downloaded successfully as official recognition!');
    setTimeout(() => setCopiedNotice(null), 4000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn w-full max-w-[1600px] mx-auto pb-16">

      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & PAGE SUMMARY
          ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-black/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#193F30] bg-[#EDF2EC] px-2.5 py-0.5 rounded-full border border-black/20">
              Student Sanctuary
            </span>
            <span className="text-xs text-[#737A73]">
              • {activeChild?.name || 'Alex Parker'}
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#202923] tracking-tight mt-1">
            My Achievements & Verified Badges
          </h1>
          <p className="text-xs sm:text-sm text-[#737A73] mt-1 max-w-2xl leading-relaxed">
            Tangible recognition of your discipline, self-awareness, and personal growth milestones. Every verified badge marks genuine character development.
          </p>
        </div>

        {/* Global Progress Pill */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-black/30 shadow-xs self-start md:self-auto shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#EDF2EC] text-[#193F30] flex items-center justify-center font-bold text-sm">
            <Award className="w-5 h-5 text-[#193F30]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#737A73] block">
              Sanctuary Rank
            </span>
            <span className="text-sm font-bold text-[#202923] font-poppins">
              Level 4 Character Explorer
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. SUMMARY STAT CARDS (All with medium-dark black border)
          ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Badges Earned */}
        <div className="p-5 rounded-2xl bg-white border border-black/30 shadow-xs hover:border-black/50 transition-all flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#737A73]">
              Badges Earned
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#EDF2EC] text-[#193F30] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-[#202923]">
              {unlockedCount} / {initialBadges.length}
            </div>
            <p className="text-xs text-[#737A73] mt-0.5">
              {Math.round((unlockedCount / initialBadges.length) * 100)}% of curriculum badges unlocked
            </p>
          </div>
          <div className="w-full h-1.5 bg-[#F8F7F2] border border-black/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#193F30] rounded-full transition-all duration-300"
              style={{ width: `${(unlockedCount / initialBadges.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Card 2: In Progress */}
        <div className="p-5 rounded-2xl bg-white border border-black/30 shadow-xs hover:border-black/50 transition-all flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#737A73]">
              In Progress
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-[#202923]">
              {lockedCount}
            </div>
            <p className="text-xs text-[#737A73] mt-0.5">
              Actively tracked milestones
            </p>
          </div>
          <span className="text-[11px] font-semibold text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full w-fit">
            Ready to Unlock
          </span>
        </div>

        {/* Card 3: Total Mastery XP */}
        <div className="p-5 rounded-2xl bg-white border border-black/30 shadow-xs hover:border-black/50 transition-all flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#737A73]">
              Total Growth Points
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#F1EDE2] text-[#193F30] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#193F30]" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-[#202923]">
              {totalXp} XP
            </div>
            <p className="text-xs text-[#737A73] mt-0.5">
              Reflective & behavioral mastery
            </p>
          </div>
          <span className="text-[11px] font-semibold text-[#193F30] bg-[#EDF2EC] px-2.5 py-0.5 rounded-full w-fit">
            Consistent Progress
          </span>
        </div>

        {/* Card 4: Recent Badge */}
        <div className="p-5 rounded-2xl bg-white border border-black/30 shadow-xs hover:border-black/50 transition-all flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#737A73]">
              Latest Unlock
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#9CCDB0] text-[#193F30] flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-base font-serif font-bold text-[#202923] truncate">
              Values Champion
            </div>
            <p className="text-xs text-[#737A73] mt-0.5">
              Verified by mentor on Oct 30
            </p>
          </div>
          <span className="text-[11px] font-semibold text-[#193F30] bg-[#EDF2EC] px-2.5 py-0.5 rounded-full w-fit">
            Official Endorsement
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. INTERACTIVE CONTROLS: SEARCH, STATUS TABS, CATEGORY PILLS
          ───────────────────────────────────────────────────────────── */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-black/30 shadow-xs space-y-4">
        
        {/* Top Controls: Search Bar & Status Tabs */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737A73]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search achievements by title, skill, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#F8F7F2] border border-black/30 text-xs sm:text-sm text-[#202923] placeholder-[#737A73] focus:outline-hidden focus:border-[#193F30] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737A73] hover:text-black p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Tabs (All / Unlocked / Locked) */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#F8F7F2] border border-black/25 shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setSelectedStatus('ALL')}
              className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedStatus === 'ALL'
                  ? 'bg-[#193F30] text-white shadow-2xs'
                  : 'text-[#737A73] hover:text-[#202923]'
              }`}
            >
              All Badges ({initialBadges.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatus('UNLOCKED')}
              className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedStatus === 'UNLOCKED'
                  ? 'bg-[#193F30] text-white shadow-2xs'
                  : 'text-[#737A73] hover:text-[#202923]'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>Unlocked ({unlockedCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatus('LOCKED')}
              className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedStatus === 'LOCKED'
                  ? 'bg-[#193F30] text-white shadow-2xs'
                  : 'text-[#737A73] hover:text-[#202923]'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>In Progress ({lockedCount})</span>
            </button>
          </div>

        </div>

        {/* Category Pills Row */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-black/20">
          <span className="text-xs font-bold text-[#737A73] flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-[#193F30]" />
            <span>Category:</span>
          </span>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`py-1 px-3 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#193F30] text-white shadow-2xs'
                    : 'bg-[#F8F7F2] text-[#202923] hover:bg-[#EDF2EC] border border-black/20'
                }`}
              >
                {cat === 'ALL' ? 'All Categories' : cat}
              </button>
            );
          })}

          {(selectedCategory !== 'ALL' || selectedStatus !== 'ALL' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('ALL');
                setSelectedStatus('ALL');
                setSearchQuery('');
              }}
              className="py-1 px-3 rounded-full text-xs font-bold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors ml-auto cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. BADGE CARDS GRID (Proper Visibility, Dimensions & Working Buttons)
          ───────────────────────────────────────────────────────────── */}
      {filteredBadges.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-black/30 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#F1EDE2] text-[#193F30] flex items-center justify-center mx-auto border border-black/20">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#202923]">No Badges Found</h3>
          <p className="text-xs sm:text-sm text-[#737A73] max-w-md mx-auto">
            No achievement badges match your current search and filter settings. Try clearing the filter or searching for a different keyword.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('ALL');
              setSelectedStatus('ALL');
              setSearchQuery('');
            }}
            className="py-2 px-5 rounded-full text-xs font-semibold text-white bg-[#193F30] hover:bg-[#204936] transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredBadges.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.id}
                className={`p-6 rounded-3xl border border-black/30 hover:border-black/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-5 min-h-[300px] ${
                  b.unlocked
                    ? 'bg-white'
                    : 'bg-[#FDFCF9]'
                }`}
              >
                {/* Card Top: Icon, Level Pill, & Status Badge */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-black/20 shrink-0 ${
                        b.unlocked
                          ? 'bg-[#EDF2EC] text-[#193F30] shadow-xs ring-2 ring-[#9CCDB0]/50'
                          : 'bg-[#F1EDE2] text-[#737A73]'
                      }`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 border ${
                          b.unlocked
                            ? 'bg-[#9CCDB0] text-[#193F30] border-[#78b390]'
                            : 'bg-[#F1EDE2] text-[#737A73] border-black/20'
                        }`}
                      >
                        {b.unlocked ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#193F30]" />
                            <span>Unlocked</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3.5 h-3.5 text-[#737A73]" />
                            <span>In Progress</span>
                          </>
                        )}
                      </span>

                      <span className="text-[10px] font-semibold text-[#737A73] bg-[#F8F7F2] border border-black/20 px-2 py-0.5 rounded-md">
                        +{b.xp} XP
                      </span>
                    </div>
                  </div>

                  {/* Title & Category */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#193F30] bg-[#EDF2EC] px-2.5 py-0.5 rounded-full border border-black/20 inline-block mb-1.5">
                      {b.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#202923] tracking-tight">
                      {b.title}
                    </h3>
                    <p className="text-xs text-[#737A73] mt-1.5 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>

                  {/* Progress Indicator for Locked Badges */}
                  {!b.unlocked && b.target && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[11px] font-semibold text-[#202923]">
                        <span>Milestone Progress</span>
                        <span>{b.progress} of {b.target} completed</span>
                      </div>
                      <div className="w-full h-2 bg-[#F1EDE2] border border-black/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-600 rounded-full transition-all duration-300"
                          style={{ width: `${Math.round((b.progress / b.target) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Bottom: Date info & Working Action Buttons */}
                <div className="pt-4 border-t border-black/20 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#737A73] font-medium">
                      {b.unlocked ? 'Achievement Date:' : 'Status:'}
                    </span>
                    <span className={`font-semibold ${b.unlocked ? 'text-[#193F30]' : 'text-amber-800'}`}>
                      {b.date}
                    </span>
                  </div>

                  {/* Working Action Buttons */}
                  {b.unlocked ? (
                    <button
                      type="button"
                      onClick={() => setSelectedBadgeModal(b)}
                      className="w-full py-2.5 px-4 rounded-full text-xs font-bold text-white bg-[#193F30] hover:bg-[#204936] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.01]"
                    >
                      <Award className="w-4 h-4 text-[#9CCDB0]" />
                      <span>View Badge Certificate</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigate(b.actionRoute)}
                      className="w-full py-2.5 px-4 rounded-full text-xs font-bold text-[#202923] bg-[#F8F7F2] hover:bg-[#EDF2EC] border border-black/30 hover:border-black/50 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>{b.actionText || 'Continue Milestone'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#193F30]" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. MODAL: BADGE CERTIFICATE & CELEBRATION SHOWCASE
          ───────────────────────────────────────────────────────────── */}
      {selectedBadgeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-black/30 shadow-2xl p-6 sm:p-8 space-y-6 text-[#202923]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-black/20">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#193F30] bg-[#EDF2EC] px-2.5 py-0.5 rounded-full border border-black/20">
                  Verified Achievement
                </span>
                <span className="text-xs text-[#737A73]">HighOrbit Sanctuary</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBadgeModal(null)}
                className="p-1 rounded-full text-[#737A73] hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Presentation Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#F1EDE2] via-[#F8F7F2] to-[#EDF2EC] border-2 border-black/30 text-center space-y-4 shadow-inner relative overflow-hidden">
              <div className="w-20 h-20 rounded-3xl bg-[#193F30] text-white flex items-center justify-center mx-auto shadow-md border-4 border-white">
                {React.createElement(selectedBadgeModal.icon, { className: 'w-10 h-10' })}
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#193F30] block">
                  Certificate of Personal Mastery
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#202923] mt-1">
                  {selectedBadgeModal.title}
                </h3>
                <span className="text-xs font-semibold text-[#737A73] block mt-0.5">
                  Category: {selectedBadgeModal.category} • {selectedBadgeModal.level}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-black/20 text-xs text-[#202923] leading-relaxed">
                <p className="italic font-medium">"{selectedBadgeModal.desc}"</p>
                <div className="pt-2 mt-2 border-t border-black/10 text-[11px] text-[#737A73]">
                  <strong>Requirement Met:</strong> {selectedBadgeModal.criteria}
                </div>
              </div>

              <div className="flex justify-between items-center text-left text-xs pt-2 px-2 border-t border-black/20">
                <div>
                  <span className="text-[10px] text-[#737A73] block">Honoree:</span>
                  <span className="font-bold text-[#202923]">{activeChild?.name || 'Alex Parker'}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#737A73] block">Verification:</span>
                  <span className="font-semibold text-[#193F30] flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#193F30]" />
                    <span>Verified</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Notice Alert if download clicked */}
            {copiedNotice && (
              <div className="p-3 rounded-xl bg-[#EDF2EC] border border-[#9CCDB0] text-xs font-semibold text-[#193F30] text-center animate-fadeIn">
                {copiedNotice}
              </div>
            )}

            {/* Modal Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-black/20">
              <button
                type="button"
                onClick={() => setSelectedBadgeModal(null)}
                className="py-2.5 px-5 rounded-full text-xs font-semibold text-[#737A73] hover:text-[#202923] transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleDownloadCertificate}
                className="py-2.5 px-6 rounded-full text-xs font-bold text-white bg-[#193F30] hover:bg-[#204936] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Badge</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default StudentAchievementsPage;
