import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Compass,
  Clock,
  CheckCircle2,
  Lock,
  Search,
  Filter,
  ArrowRight,
  RotateCcw,
  Play,
  Check,
  AlertCircle,
  X,
  Loader2,
  FileText,
  AlertTriangle,
  Award,
  ShieldAlert,
  Brain,
  Save,
  CheckSquare,
  Square,
  Info
} from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import {
  fetchActivitiesApi,
  fetchActivityByIdApi,
  saveActivityProgressApi,
  completeActivityApi
} from '../../services/activityApi';

export const StudentActivitiesPage = () => {
  const { activeChild, isAuthenticated } = useOnboarding();

  // Activities list state loaded from backend
  const [activities, setActivities] = useState([]);
  const [backendCategories, setBackendCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL'); // 'ALL' | 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'

  // Activity Details Modal State
  const [activeModalActivity, setActiveModalActivity] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [modalAnswers, setModalAnswers] = useState({});
  const [modalSteps, setModalSteps] = useState(new Set());
  const [isSavingProgress, setIsSavingProgress] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const [modalError, setModalError] = useState(null);

  // Permission Restriction Warning Modal
  const [restrictedNotice, setRestrictedNotice] = useState(null);

  // Load activities from backend
  const loadActivities = async () => {
    setIsLoading(true);
    setLoadError(null);
    const res = await fetchActivitiesApi(activeChild?.id || 'student_1');
    setIsLoading(false);

    if (res.success) {
      setActivities(res.activities || []);
      setBackendCategories(res.activeCategories || []);
    } else {
      setLoadError(res.error || 'Failed to load personal growth activities from server.');
    }
  };

  useEffect(() => {
    loadActivities();
  }, [activeChild]);

  // Derive categories that ONLY have real configured activities
  const availableCategories = useMemo(() => {
    const validConfigured = ['Self-Discovery', 'Personal Growth', 'Reflection', 'Focus', 'Wellness', 'Learning'];
    // Filter to only those categories that exist in our loaded activities
    const presentInActivities = new Set(activities.map((a) => a.category));
    return validConfigured.filter((cat) => presentInActivities.has(cat));
  }, [activities]);

  // Filtered Activities
  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      // Category Filter
      if (selectedCategory !== 'ALL' && act.category !== selectedCategory) {
        return false;
      }

      // Status Filter
      if (selectedStatus === 'NOT_STARTED' && act.status !== 'Not Started') return false;
      if (selectedStatus === 'IN_PROGRESS' && act.status !== 'In Progress') return false;
      if (selectedStatus === 'COMPLETED' && act.status !== 'Completed') return false;

      // Keyword Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = act.title.toLowerCase().includes(q);
        const matchesDesc = act.shortDescription.toLowerCase().includes(q);
        const matchesCat = act.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesCat) return false;
      }

      return true;
    });
  }, [activities, selectedCategory, selectedStatus, searchQuery]);

  // Summary Metrics
  const completedCount = activities.filter((a) => a.status === 'Completed').length;
  const inProgressCount = activities.filter((a) => a.status === 'In Progress').length;
  const availableCount = activities.filter((a) => a.status === 'Not Started').length;

  // Open Activity Details Modal
  const handleOpenActivity = async (activityId) => {
    setModalMessage(null);
    setModalError(null);
    setIsLoadingDetails(true);

    const res = await fetchActivityByIdApi(activityId, activeChild?.id || 'student_1');
    setIsLoadingDetails(false);

    if (!res.success) {
      if (res.restricted) {
        setRestrictedNotice(res.error || 'This activity is restricted. Please complete foundational prerequisites.');
      } else {
        alert(res.error || 'Unable to open activity details.');
      }
      return;
    }

    const act = res.activity;
    setActiveModalActivity(act);
    setModalAnswers(act.answers || {});
    setModalSteps(new Set(act.completedSteps || []));
  };

  // Toggle Step Checklist
  const handleToggleStep = (idx) => {
    if (activeModalActivity?.status === 'Completed') return;
    setModalSteps((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  // Handle Answer Input
  const handleAnswerChange = (questionId, value) => {
    if (activeModalActivity?.status === 'Completed') return;
    setModalAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Save Progress
  const handleSaveProgress = async () => {
    if (!activeModalActivity) return;
    setIsSavingProgress(true);
    setModalError(null);

    const payload = {
      answers: modalAnswers,
      completedSteps: Array.from(modalSteps)
    };

    const res = await saveActivityProgressApi(activeModalActivity.id, payload, activeChild?.id || 'student_1');
    setIsSavingProgress(false);

    if (res.success) {
      setModalMessage(res.message || 'Progress saved successfully on server.');
      // Update local activities list
      setActivities((prev) =>
        prev.map((a) => (a.id === activeModalActivity.id ? res.activity : a))
      );
      setActiveModalActivity(res.activity);
      setTimeout(() => setModalMessage(null), 4000);
    } else {
      setModalError(res.error || 'Failed to sync progress with server.');
    }
  };

  // Complete Activity
  const handleCompleteActivity = async () => {
    if (!activeModalActivity) return;
    setIsCompleting(true);
    setModalError(null);

    const payload = {
      answers: modalAnswers,
      completedSteps: Array.from(modalSteps)
    };

    const res = await completeActivityApi(activeModalActivity.id, payload, activeChild?.id || 'student_1');
    setIsCompleting(false);

    if (res.success) {
      setModalMessage(res.message || 'Activity completed successfully!');
      // Update local activities list
      setActivities((prev) =>
        prev.map((a) => (a.id === activeModalActivity.id ? res.activity : a))
      );
      setActiveModalActivity(res.activity);
      setTimeout(() => {
        setModalMessage(null);
      }, 5000);
    } else {
      setModalError(res.error || 'Validation error: Complete all required prompts.');
    }
  };

  // Status Badge Helper
  const getStatusBadge = (status, restricted) => {
    if (restricted) {
      return {
        pill: 'bg-gray-100 text-gray-800 border border-[#E6DEFF]',
        text: 'Restricted'
      };
    }
    switch (status) {
      case 'Completed':
        return {
          pill: 'bg-[#8bcefe] text-primary border border-[#78b390]',
          text: 'Completed'
        };
      case 'In Progress':
        return {
          pill: 'bg-amber-100 text-amber-900 border border-amber-300',
          text: 'In Progress'
        };
      case 'Not Started':
      default:
        return {
          pill: 'bg-[#EBE5FF] text-primary border border-[#E6DEFF]',
          text: 'Available'
        };
    }
  };

  // Difficulty Badge Helper
  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case 'Beginner':
        return 'text-emerald-800 bg-emerald-50 border border-emerald-200';
      case 'Intermediate':
        return 'text-amber-800 bg-amber-50 border border-amber-200';
      case 'Advanced':
        return 'text-purple-800 bg-purple-50 border border-purple-200';
      default:
        return 'text-gray-800 bg-gray-50 border border-gray-200';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn w-full max-w-[1600px] mx-auto pb-16">

      {/* ─────────────────────────────────────────────────────────────
          1. PAGE HEADER
          ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E6DEFF]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-[#EBE5FF] px-2.5 py-0.5 rounded-full border border-[#E6DEFF]">
              Student Sanctuary
            </span>
            <span className="text-xs text-[#6A6678]">
              • {activeChild?.name || 'Alex Parker'}
            </span>
          </div>
          <h1 className=" text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1b1831] tracking-tight mt-1">
            My Activities & Growth Quests
          </h1>
          <p className="text-xs sm:text-sm text-[#6A6678] mt-1 max-w-2xl leading-relaxed">
            Explore self-paced personal development activities, mindfulness exercises, and focus challenges separately from your assignments. Learn, reflect, and build character at your own pace.
          </p>
        </div>

        {/* Global Action: Refresh Activities */}
        <button
          type="button"
          onClick={loadActivities}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-[#1b1831] bg-white hover:bg-[#EBE5FF] border border-[#E6DEFF] hover:border-primary/40 transition-all shadow-xs cursor-pointer self-start md:self-auto"
        >
          <RotateCcw className={`w-3.5 h-3.5 text-primary ${isLoading ? 'animate-spin' : ''}`} />
          <span>Sync Activities</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. SUMMARY STAT CARDS (All with medium-dark black border)
          ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Activities */}
        <div className="p-5 rounded-2xl bg-white border border-[#E6DEFF] shadow-xs hover:border-primary/40 transition-all flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6A6678]">
              Curated Quests
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#EBE5FF] text-primary flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl  font-bold text-[#1b1831]">
              {activities.length}
            </div>
            <p className="text-xs text-[#6A6678] mt-0.5">
              Across {availableCategories.length} configured domains
            </p>
          </div>
          <span className="text-[11px] font-semibold text-primary bg-[#EBE5FF] px-2.5 py-0.5 rounded-full w-fit border border-[#E6DEFF]">
            Self-Paced Exploration
          </span>
        </div>

        {/* Card 2: In Progress */}
        <div className="p-5 rounded-2xl bg-white border border-[#E6DEFF] shadow-xs hover:border-primary/40 transition-all flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6A6678]">
              In Progress
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl  font-bold text-[#1b1831]">
              {inProgressCount}
            </div>
            <p className="text-xs text-[#6A6678] mt-0.5">
              Saved drafts ready to resume
            </p>
          </div>
          <span className="text-[11px] font-semibold text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full w-fit">
            Resume Active Work
          </span>
        </div>

        {/* Card 3: Completed */}
        <div className="p-5 rounded-2xl bg-white border border-[#E6DEFF] shadow-xs hover:border-primary/40 transition-all flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6A6678]">
              Completed
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#8bcefe] text-primary flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl  font-bold text-[#1b1831]">
              {completedCount}
            </div>
            <p className="text-xs text-[#6A6678] mt-0.5">
              {activities.length ? Math.round((completedCount / activities.length) * 100) : 0}% completion mastery
            </p>
          </div>
          <span className="text-[11px] font-semibold text-primary bg-[#EBE5FF] px-2.5 py-0.5 rounded-full w-fit border border-[#E6DEFF]">
            Verified Reflections
          </span>
        </div>

        {/* Card 4: Available to Start */}
        <div className="p-5 rounded-2xl bg-white border border-[#E6DEFF] shadow-xs hover:border-primary/40 transition-all flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6A6678]">
              Available Quests
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#F3EFFF] text-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div>
            <div className="text-3xl  font-bold text-[#1b1831]">
              {availableCount}
            </div>
            <p className="text-xs text-[#6A6678] mt-0.5">
              Fresh opportunities to explore
            </p>
          </div>
          <span className="text-[11px] font-semibold text-primary bg-[#EBE5FF] px-2.5 py-0.5 rounded-full w-fit border border-[#E6DEFF]">
            Start Anytime
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. INTERACTIVE CONTROLS: SEARCH, STATUS TABS, DYNAMIC CATEGORIES
          ───────────────────────────────────────────────────────────── */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E6DEFF] shadow-xs space-y-4">
        
        {/* Search & Status Tabs Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Keyword Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6A6678]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search activities by title, practice, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] text-xs sm:text-sm text-[#1b1831] placeholder-[#737A73] focus:outline-hidden focus:border-primary transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6A6678] hover:text-black p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] shrink-0 self-start md:self-auto overflow-x-auto max-w-full">
            <button
              type="button"
              onClick={() => setSelectedStatus('ALL')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedStatus === 'ALL'
                  ? 'bg-primary text-white shadow-2xs'
                  : 'text-[#6A6678] hover:text-[#1b1831]'
              }`}
            >
              All ({activities.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatus('IN_PROGRESS')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedStatus === 'IN_PROGRESS'
                  ? 'bg-primary text-white shadow-2xs'
                  : 'text-[#6A6678] hover:text-[#1b1831]'
              }`}
            >
              In Progress ({inProgressCount})
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatus('COMPLETED')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedStatus === 'COMPLETED'
                  ? 'bg-primary text-white shadow-2xs'
                  : 'text-[#6A6678] hover:text-[#1b1831]'
              }`}
            >
              Completed ({completedCount})
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatus('NOT_STARTED')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedStatus === 'NOT_STARTED'
                  ? 'bg-primary text-white shadow-2xs'
                  : 'text-[#6A6678] hover:text-[#1b1831]'
              }`}
            >
              Available ({availableCount})
            </button>
          </div>

        </div>

        {/* Dynamic Category Filter Pills Row (Displays ONLY configured categories) */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#E6DEFF]">
          <span className="text-xs font-bold text-[#6A6678] flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-primary" />
            <span>Category:</span>
          </span>

          <button
            type="button"
            onClick={() => setSelectedCategory('ALL')}
            className={`py-1 px-3.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'ALL'
                ? 'bg-primary text-white shadow-2xs'
                : 'bg-[#FCF8FF] text-[#1b1831] hover:bg-[#EBE5FF] border border-[#E6DEFF]'
            }`}
          >
            All Categories ({activities.length})
          </button>

          {availableCategories.map((cat) => {
            const countForCat = activities.filter((a) => a.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`py-1 px-3 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-white shadow-2xs'
                    : 'bg-[#FCF8FF] text-[#1b1831] hover:bg-[#EBE5FF] border border-[#E6DEFF]'
                }`}
              >
                {cat} ({countForCat})
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
          4. LOADING / ERROR / EMPTY STATES & ACTIVITY CARDS GRID
          ───────────────────────────────────────────────────────────── */}
      
      {/* Loading State */}
      {isLoading && (
        <div className="py-20 flex flex-col items-center justify-center space-y-3 text-center">
          <Loader2 className="w-9 h-9 text-primary animate-spin" />
          <h3 className=" text-lg font-bold text-[#1b1831]">Loading Activities Catalog...</h3>
          <p className="text-xs text-[#6A6678]">Fetching self-discovery exercises and reflection quests from server.</p>
        </div>
      )}

      {/* Network Error State */}
      {!isLoading && loadError && (
        <div className="p-8 rounded-3xl bg-rose-50 border-2 border-rose-300 text-rose-950 text-center space-y-3 max-w-lg mx-auto">
          <AlertCircle className="w-10 h-10 text-rose-700 mx-auto" />
          <h3 className=" text-lg font-bold text-rose-900">Communication Error</h3>
          <p className="text-xs sm:text-sm text-rose-800 leading-relaxed">{loadError}</p>
          <button
            type="button"
            onClick={loadActivities}
            className="py-2.5 px-6 rounded-full text-xs font-bold text-white bg-rose-800 hover:bg-rose-900 transition-colors shadow-sm cursor-pointer"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !loadError && filteredActivities.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-white border border-[#E6DEFF] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#F3EFFF] text-primary flex items-center justify-center mx-auto border border-[#E6DEFF]">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className=" text-lg font-bold text-[#1b1831]">No Activities Found</h3>
          <p className="text-xs sm:text-sm text-[#6A6678] max-w-md mx-auto">
            No personal growth activities match your selected category or search filter. Try clearing filters to see all available quests.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('ALL');
              setSelectedStatus('ALL');
              setSearchQuery('');
            }}
            className="py-2 px-5 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-container transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Activities Grid */}
      {!isLoading && !loadError && filteredActivities.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredActivities.map((act) => {
            const statusConfig = getStatusBadge(act.status, act.restricted);
            return (
              <div
                key={act.id}
                className={`p-6 rounded-3xl border border-[#E6DEFF] hover:border-primary/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-5 min-h-[310px] ${
                  act.status === 'Completed'
                    ? 'bg-white'
                    : act.restricted
                    ? 'bg-[#F9F8F6] opacity-80'
                    : 'bg-white'
                }`}
              >
                {/* Top Details */}
                <div className="space-y-3.5">
                  
                  {/* Badges Row: Category, Duration, Difficulty, Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary bg-[#EBE5FF] px-3 py-1 rounded-full border border-[#E6DEFF]">
                      {act.category}
                    </span>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${statusConfig.pill}`}
                    >
                      {statusConfig.text}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <div>
                    <h3 className=" text-lg sm:text-xl font-bold text-[#1b1831] tracking-tight leading-snug">
                      {act.title}
                    </h3>
                    <p className="text-xs text-[#6A6678] mt-1.5 leading-relaxed">
                      {act.shortDescription}
                    </p>
                  </div>

                  {/* Metadata Chips: Duration & Difficulty */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    {act.duration && (
                      <span className="text-[11px] font-semibold text-[#6A6678] bg-[#FCF8FF] border border-[#E6DEFF] px-2.5 py-0.5 rounded-md flex items-center gap-1">
                        <Clock className="w-3 h-3 text-primary" />
                        <span>Est: {act.duration}</span>
                      </span>
                    )}

                    {act.difficulty && (
                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md ${getDifficultyBadge(act.difficulty)}`}>
                        {act.difficulty}
                      </span>
                    )}

                    {act.xp && (
                      <span className="text-[11px] font-semibold text-primary bg-[#EBE5FF] border border-[#E6DEFF] px-2 py-0.5 rounded-md">
                        +{act.xp} XP
                      </span>
                    )}
                  </div>

                  {/* Progress Indicator for In-Progress Activities */}
                  {act.status === 'In Progress' && (
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[11px] font-semibold text-[#1b1831]">
                        <span>Exercise Progress</span>
                        <span>{(act.completedSteps || []).length} of {(act.steps || []).length} steps done</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#F3EFFF] border border-[#E6DEFF] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.round(
                              (((act.completedSteps || []).length) / ((act.steps || []).length || 1)) * 100
                            )}%`
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Completed Stamp */}
                  {act.status === 'Completed' && act.completedAt && (
                    <div className="text-[11px] text-primary font-semibold flex items-center gap-1 pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                      <span>Completed on {act.completedAt}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Action Button */}
                <div className="pt-4 border-t border-[#E6DEFF]">
                  {act.restricted ? (
                    <button
                      type="button"
                      onClick={() => handleOpenActivity(act.id)}
                      className="w-full py-2.5 px-4 rounded-full text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-[#E6DEFF] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5 text-gray-600" />
                      <span>Prerequisite Required</span>
                    </button>
                  ) : act.status === 'Completed' ? (
                    <button
                      type="button"
                      onClick={() => handleOpenActivity(act.id)}
                      className="w-full py-2.5 px-4 rounded-full text-xs font-bold text-primary bg-[#EBE5FF] hover:bg-[#E6DEFF] border border-[#E6DEFF] hover:border-primary/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                      <span>Review Completed Reflection</span>
                    </button>
                  ) : act.status === 'In Progress' ? (
                    <button
                      type="button"
                      onClick={() => handleOpenActivity(act.id)}
                      className="w-full py-2.5 px-4 rounded-full text-xs font-bold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] hover:border-primary/40 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:scale-[1.01]"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Continue Activity</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleOpenActivity(act.id)}
                      className="w-full py-2.5 px-4 rounded-full text-xs font-bold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] hover:border-primary/40 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:scale-[1.01]"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Start Activity</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. MODAL: ACTIVITY DETAILS, STEP CHECKLIST, & RESPONSE FORM
          ───────────────────────────────────────────────────────────── */}
      {activeModalActivity && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-3xl bg-white rounded-3xl border border-[#E6DEFF] shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto no-scrollbar text-[#1b1831]">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E6DEFF]">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-primary bg-[#EBE5FF] px-3 py-0.5 rounded-full border border-[#E6DEFF]">
                    {activeModalActivity.category}
                  </span>
                  {activeModalActivity.duration && (
                    <span className="text-[11px] font-semibold text-[#6A6678] bg-[#FCF8FF] border border-[#E6DEFF] px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3 text-primary" />
                      <span>{activeModalActivity.duration}</span>
                    </span>
                  )}
                  {activeModalActivity.difficulty && (
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md ${getDifficultyBadge(activeModalActivity.difficulty)}`}>
                      {activeModalActivity.difficulty}
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      activeModalActivity.status === 'Completed'
                        ? 'bg-[#8bcefe] text-primary border border-[#78b390]'
                        : activeModalActivity.status === 'In Progress'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-[#EBE5FF] text-primary border border-[#E6DEFF]'
                    }`}
                  >
                    {activeModalActivity.status}
                  </span>
                </div>

                <h2 className=" text-xl sm:text-2xl font-bold text-[#1b1831] tracking-tight">
                  {activeModalActivity.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalActivity(null)}
                className="p-1 rounded-full text-[#6A6678] hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success / Error Banners */}
            {modalMessage && (
              <div className="p-4 rounded-2xl bg-[#8bcefe]/25 border border-primary text-primary text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{modalMessage}</span>
              </div>
            )}

            {modalError && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            {/* Description Card */}
            <div className="p-4 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] shadow-2xs text-xs sm:text-sm text-[#1b1831] leading-relaxed">
              <strong className="block font-bold text-primary mb-1">Activity Objective & Context:</strong>
              {activeModalActivity.description}
            </div>

            {/* Step-by-Step Exercise Checklist */}
            {activeModalActivity.steps && activeModalActivity.steps.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1b1831]">
                    Step-by-Step Guided Exercise:
                  </span>
                  <span className="text-[11px] text-[#6A6678]">
                    {modalSteps.size} of {activeModalActivity.steps.length} completed
                  </span>
                </div>

                <div className="space-y-2">
                  {activeModalActivity.steps.map((step, idx) => {
                    const isChecked = modalSteps.has(idx);
                    return (
                      <div
                        key={idx}
                        onClick={() => handleToggleStep(idx)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 text-xs leading-relaxed shadow-2xs ${
                          isChecked
                            ? 'bg-[#EBE5FF] border-primary text-primary font-medium'
                            : 'bg-white border-[#E6DEFF] text-[#1b1831] hover:border-primary/40'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-primary" />
                          ) : (
                            <Square className="w-4 h-4 text-[#6A6678]" />
                          )}
                        </div>
                        <div className="flex-1">
                          <span className="font-bold mr-1.5">Step {idx + 1}:</span>
                          <span>{step}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Reflection Questions / Input Prompts */}
            {activeModalActivity.questions && activeModalActivity.questions.length > 0 && (
              <div className="space-y-4 pt-2 border-t border-[#E6DEFF]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1b1831] block">
                  Reflection Answers & Written Prompts:
                </span>

                <div className="space-y-4">
                  {activeModalActivity.questions.map((q) => (
                    <div key={q.id} className="p-4 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] shadow-2xs space-y-2 text-xs">
                      <label className="font-bold text-[#1b1831] block">
                        {q.title} {q.required && <span className="text-rose-600">*</span>}
                      </label>

                      {q.type === 'single_choice' && q.options ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {q.options.map((opt) => (
                            <label
                              key={opt}
                              className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center gap-2 transition-all shadow-2xs ${
                                modalAnswers[q.id] === opt
                                  ? 'bg-primary text-white border-[#E6DEFF] font-bold'
                                  : 'bg-white text-[#1b1831] border-[#E6DEFF] hover:border-primary/40'
                              }`}
                            >
                              <input
                                type="radio"
                                name={q.id}
                                value={opt}
                                checked={modalAnswers[q.id] === opt}
                                onChange={() => handleAnswerChange(q.id, opt)}
                                disabled={activeModalActivity.status === 'Completed'}
                                className="hidden"
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      ) : q.type === 'short_text' ? (
                        <input
                          type="text"
                          value={modalAnswers[q.id] || ''}
                          onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                          disabled={activeModalActivity.status === 'Completed'}
                          placeholder={q.placeholder || 'Enter your response...'}
                          className="w-full p-2.5 rounded-xl bg-white border border-[#E6DEFF] hover:border-primary/40 text-xs text-[#1b1831] placeholder-[#737A73] focus:outline-hidden focus:border-black shadow-2xs"
                        />
                      ) : (
                        <textarea
                          rows={3}
                          value={modalAnswers[q.id] || ''}
                          onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                          disabled={activeModalActivity.status === 'Completed'}
                          placeholder={q.placeholder || 'Reflect and write your thoughts...'}
                          className="w-full p-3 rounded-xl bg-white border border-[#E6DEFF] hover:border-primary/40 text-xs text-[#1b1831] placeholder-[#737A73] focus:outline-hidden focus:border-black shadow-2xs"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E6DEFF]">
              <button
                type="button"
                onClick={() => setActiveModalActivity(null)}
                className="w-full sm:w-auto py-2.5 px-5 rounded-full text-xs font-semibold text-[#6A6678] hover:text-[#1b1831] bg-white border border-[#E6DEFF] hover:border-primary/40 transition-colors cursor-pointer shadow-xs"
              >
                Close View
              </button>

              {activeModalActivity.status !== 'Completed' ? (
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleSaveProgress}
                    disabled={isSavingProgress || isCompleting}
                    className="flex-1 sm:flex-none py-2.5 px-5 rounded-full text-xs font-semibold text-primary bg-[#EBE5FF] hover:bg-[#E6DEFF] border border-[#E6DEFF] hover:border-primary/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-xs"
                  >
                    {isSavingProgress ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5 text-primary" />
                        <span>Save Progress</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleCompleteActivity}
                    disabled={isSavingProgress || isCompleting}
                    className="flex-1 sm:flex-none py-2.5 px-6 rounded-full text-xs font-bold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] hover:border-primary/40 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    {isCompleting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Recording...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark Completed</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Activity Completed & Credited (+{activeModalActivity.xp} XP)</span>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          6. MODAL: RESTRICTED ACTIVITY ACCESS WARNING
          ───────────────────────────────────────────────────────────── */}
      {restrictedNotice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl border-2 border-amber-300 shadow-2xl p-6 sm:p-7 space-y-4 text-[#1b1831]">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mx-auto border border-amber-200">
              <Lock className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className=" text-lg font-bold text-[#1b1831]">
                Activity Prerequisite Required
              </h3>
              <p className="text-xs text-[#6A6678] leading-relaxed">
                {restrictedNotice}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-[#6A6678]">Requirement:</span>
                <span className="font-bold text-[#1b1831]">Grade 12 Senior Fellow</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6A6678]">Current Profile:</span>
                <span className="font-semibold">{activeChild?.grade || 'Grade 11'}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={() => setRestrictedNotice(null)}
                className="py-2.5 px-6 rounded-full text-xs font-bold text-white bg-primary hover:bg-primary-container transition-colors cursor-pointer"
              >
                Return to Activities
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default StudentActivitiesPage;
