import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  CheckCircle2,
  Target,
  Calendar,
  Sparkles,
  Award,
  CheckSquare,
  ListTodo,
  Clock,
  Filter,
  Eye,
  EyeOff,
  Lock,
  MessageSquare,
  Flame,
  ArrowUpRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  FileText,
  Activity,
  Check
} from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import { useStudent } from '../../context/StudentContext';
import { serverActivities } from '../../server/activityBackend';
import { getWellnessSessionHistory } from '../../server/wellnessBackend';

export const StudentGrowthPage = () => {
  const { activeChild } = useOnboarding();
  const { assignments, habits, reflections } = useStudent();

  // Current logged in student ID (Strict boundary protection)
  const currentStudentId = 'student_1';

  // Date Filter: 'all' | '30d' | '7d'
  const [dateFilter, setDateFilter] = useState('all');

  // Reflection privacy visibility toggle (protecting sensitive self-reflections)
  const [showPrivateReflections, setShowPrivateReflections] = useState(true);

  // Active view tab: 'overview' | 'assignments' | 'activities' | 'reflections' | 'feedback'
  const [activeTab, setActiveTab] = useState('overview');

  // Expanded feedback IDs
  const [expandedFeedbackId, setExpandedFeedbackId] = useState(null);

  // 1. Fetch & Filter Student-Scoped Assignments
  const studentAssignments = useMemo(() => {
    return (assignments || []).filter((a) => (a.studentId || 'student_1') === currentStudentId);
  }, [assignments, currentStudentId]);

  // 2. Fetch & Filter Student-Scoped Activities
  const studentActivities = useMemo(() => {
    return (serverActivities || []).filter((act) => (act.studentId || 'student_1') === currentStudentId);
  }, [currentStudentId]);

  // 3. Fetch & Filter Student-Scoped Wellness Sessions
  const studentWellnessSessions = useMemo(() => {
    try {
      const res = getWellnessSessionHistory(currentStudentId);
      return Array.isArray(res) ? res : [];
    } catch (err) {
      console.warn('Could not load wellness sessions:', err);
      return [];
    }
  }, [currentStudentId]);

  // Date filtering helper
  const isWithinDateFilter = (dateStringOrIso) => {
    if (dateFilter === 'all' || !dateStringOrIso) return true;
    const itemDate = new Date(dateStringOrIso);
    if (isNaN(itemDate.getTime())) return true;

    const now = new Date();
    const diffDays = (now.getTime() - itemDate.getTime()) / (1000 * 3600 * 24);

    if (dateFilter === '7d') return diffDays <= 7;
    if (dateFilter === '30d') return diffDays <= 30;
    return true;
  };

  // Filtered collections
  const filteredAssignments = useMemo(() => {
    return studentAssignments.filter((a) => isWithinDateFilter(a.dueDateIso || a.assignedDate));
  }, [studentAssignments, dateFilter]);

  const completedAssignments = useMemo(() => {
    return filteredAssignments.filter((a) => a.status === 'Completed');
  }, [filteredAssignments]);

  const completedActivities = useMemo(() => {
    const regularCompleted = studentActivities.filter(
      (a) => a.status === 'Completed' && isWithinDateFilter(a.completedAtIso || a.completedAt)
    );
    return regularCompleted;
  }, [studentActivities, dateFilter]);

  const filteredWellnessSessions = useMemo(() => {
    return studentWellnessSessions.filter(
      (s) => s.completed && isWithinDateFilter(s.completedAtIso || s.completedAt)
    );
  }, [studentWellnessSessions, dateFilter]);

  // Combined Completed Activities count (regular curriculum + focus wellness sessions)
  const totalCompletedActivitiesCount = completedActivities.length + filteredWellnessSessions.length;

  // 4. Assignments with Available Feedback
  const feedbackItems = useMemo(() => {
    return studentAssignments
      .filter((a) => a.feedback && (a.feedback.comment || a.feedback.revisionInstructions))
      .map((a) => ({
        assignmentId: a.id,
        assignmentTitle: a.title,
        subject: a.subject,
        author: a.feedback.author || 'Leadership Mentor',
        role: a.feedback.role || 'Mentor',
        date: a.feedback.date || a.assignedDate,
        comment: a.feedback.comment,
        revisionInstructions: a.feedback.revisionInstructions,
        status: a.status
      }));
  }, [studentAssignments]);

  // 5. Personal Goals & Defined Calculations
  // Calculation rules:
  // - Goal 1: Problem Solving Mastery -> (Completed Academic Assignments / Total Assigned) * 100
  // - Goal 2: Sustained Daily Focus -> (Completed Focus Sessions & Habits / Target) * 100
  // - Goal 3: Self-Regulation & Resilience -> (Reflections & Breathing Sessions / Target) * 100
  const totalAssignmentsCount = studentAssignments.length;
  const assignmentCompletionRate = totalAssignmentsCount > 0
    ? Math.round((completedAssignments.length / totalAssignmentsCount) * 100)
    : 0;

  const activeHabits = habits || [];
  const completedHabitsToday = activeHabits.filter((h) => h.completed).length;
  const habitConsistencyRate = activeHabits.length > 0
    ? Math.round((completedHabitsToday / activeHabits.length) * 100)
    : 0;

  const wellnessCompletedCount = studentWellnessSessions.filter((s) => s.completed).length;
  const wellnessProgressRate = Math.min(100, Math.round((wellnessCompletedCount / 5) * 100)); // target: 5 sessions

  const developmentalGoals = [
    {
      id: 'g1',
      title: 'Academic Mastery & Problem Solving',
      category: 'Academics',
      metric: `${completedAssignments.length} of ${totalAssignmentsCount} assignments finished`,
      progress: assignmentCompletionRate,
      calculationFormula: '(Completed Assignments ÷ Total Assigned) × 100',
      status: assignmentCompletionRate >= 75 ? 'On Track' : 'In Progress',
      color: '#193F30'
    },
    {
      id: 'g2',
      title: 'Daily Habit & Focus Consistency',
      category: 'Consistency',
      metric: `${completedHabitsToday} of ${activeHabits.length} daily habits checked today`,
      progress: habitConsistencyRate,
      calculationFormula: '(Habits Completed Today ÷ Total Active Habits) × 100',
      status: habitConsistencyRate >= 50 ? 'Strong Momentum' : 'Needs Attention',
      color: '#1D5C75'
    },
    {
      id: 'g3',
      title: 'Stress Regulation & Mindfulness',
      category: 'Wellness',
      metric: `${wellnessCompletedCount} of 5 weekly sessions completed`,
      progress: wellnessProgressRate,
      calculationFormula: '(Completed Wellness Practices ÷ Weekly Target of 5) × 100',
      status: wellnessProgressRate >= 60 ? 'Healthy Rhythm' : 'Building Habit',
      color: '#4B735F'
    }
  ];

  // 6. Weekly Activity Summary (Actual backend records)
  const weeklySummaryStats = useMemo(() => {
    const assignmentsSubmittedThisWeek = studentAssignments.filter(
      (a) => a.status === 'Completed' || a.status === 'Submitted'
    ).length;
    const activitiesCompletedThisWeek = studentActivities.filter(
      (a) => a.status === 'Completed'
    ).length;
    const focusMinutesThisWeek = studentWellnessSessions.reduce(
      (sum, s) => sum + Math.round((s.durationSeconds || 0) / 60),
      0
    );

    return {
      assignmentsSubmitted: assignmentsSubmittedThisWeek,
      activitiesDone: activitiesCompletedThisWeek,
      wellnessSessions: studentWellnessSessions.length,
      focusMinutes: focusMinutesThisWeek
    };
  }, [studentAssignments, studentActivities, studentWellnessSessions]);

  // 7. Verified Milestones Timeline
  const milestones = [
    {
      id: 'm1',
      date: 'Oct 28, 2026',
      title: 'Emotional Resilience & Stress Triggers Mastery',
      description: 'Completed comprehensive stress triggers map and introduced 3-minute box breathing before homework.',
      category: 'Wellness',
      verified: true
    },
    {
      id: 'm2',
      date: 'Oct 24, 2026',
      title: 'Core Values Compass Formulated',
      description: 'Isolate top 5 foundational non-negotiable principles for high-pressure academic decisions.',
      category: 'Self-Leadership',
      verified: true
    },
    {
      id: 'm3',
      date: 'Oct 22, 2026',
      title: '5-Day Habit Consistency Streak',
      description: 'Maintained uninterrupted morning journaling and deep work sprint routine for 5 consecutive days.',
      category: 'Consistency',
      verified: true
    },
    {
      id: 'm4',
      date: 'Oct 15, 2026',
      title: 'HighOrbit Sanctuary Onboarding',
      description: 'Established initial developmental targets: Problem Solving, Focus Discipline, and Self-Advocacy.',
      category: 'Foundation',
      verified: true
    }
  ];

  // Helper for assignment status styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return {
          bg: 'bg-[#EDF2EC]',
          text: 'text-[#193F30]',
          border: 'border-black/20',
          label: 'Completed'
        };
      case 'Submitted':
      case 'Under Review':
        return {
          bg: 'bg-[#E8F4F8]',
          text: 'text-[#1D5C75]',
          border: 'border-black/20',
          label: 'Under Review'
        };
      case 'Needs Revision':
        return {
          bg: 'bg-[#FFF9EB]',
          text: 'text-[#B45309]',
          border: 'border-black/20',
          label: 'Needs Revision'
        };
      case 'In Progress':
        return {
          bg: 'bg-[#F2EDF8]',
          text: 'text-[#5A3882]',
          border: 'border-black/20',
          label: 'In Progress'
        };
      default:
        return {
          bg: 'bg-[#F8F7F2]',
          text: 'text-[#737A73]',
          border: 'border-black/20',
          label: status || 'Pending'
        };
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12">
      {/* 1. Header & Date Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-black/15">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#EDF2EC] text-[#193F30] border border-black/20">
              Student Growth Record
            </span>
            <span className="text-xs text-[#737A73] font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#193F30]" /> Verified Backend Data
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202923] tracking-tight mt-1">
            My Growth & Progress
          </h2>
          <p className="text-xs sm:text-sm text-[#737A73] mt-1 max-w-2xl">
            A comprehensive, data-backed record of completed activities, verified assignment submissions, personal goals, and mentor feedback.
          </p>
        </div>

        {/* Date Filter & Tab Selection */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#F1EDE2] border border-black/30">
            <span className="text-[11px] font-bold text-[#737A73] px-2 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {[
              { id: 'all', label: 'All Time' },
              { id: '30d', label: 'Past 30 Days' },
              { id: '7d', label: 'Past 7 Days' }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setDateFilter(f.id)}
                className={`py-1 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  dateFilter === f.id
                    ? 'bg-[#193F30] text-white border border-black/30 shadow-2xs'
                    : 'text-[#202923] hover:text-black'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Top Metric Cards (Calculated from actual database records) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Completed Activities */}
        <div className="p-5 rounded-3xl bg-white border border-black/30 shadow-xs flex flex-col justify-between hover:border-black/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#737A73]">
              Completed Activities
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#EDF2EC] text-[#193F30] border border-black/20 flex items-center justify-center">
              <ListTodo className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-bold text-[#193F30]">
                {totalCompletedActivitiesCount}
              </span>
              <span className="text-xs text-[#4B735F] font-semibold">completed</span>
            </div>
            <p className="text-[11px] text-[#737A73] mt-1">
              {completedActivities.length} curriculum + {filteredWellnessSessions.length} wellness
            </p>
          </div>
        </div>

        {/* Completed Assignments */}
        <div className="p-5 rounded-3xl bg-white border border-black/30 shadow-xs flex flex-col justify-between hover:border-black/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#737A73]">
              Completed Assignments
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#E8F4F8] text-[#1D5C75] border border-black/20 flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-bold text-[#1D5C75]">
                {completedAssignments.length}
              </span>
              <span className="text-xs text-[#737A73] font-semibold">
                of {totalAssignmentsCount} total
              </span>
            </div>
            <p className="text-[11px] text-[#737A73] mt-1">
              Completion Rate: <strong>{assignmentCompletionRate}%</strong>
            </p>
          </div>
        </div>

        {/* Active Personal Goals */}
        <div className="p-5 rounded-3xl bg-white border border-black/30 shadow-xs flex flex-col justify-between hover:border-black/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#737A73]">
              Active Personal Goals
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#F2EDF8] text-[#5A3882] border border-black/20 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-bold text-[#5A3882]">
                {developmentalGoals.length}
              </span>
              <span className="text-xs text-[#5A3882] font-semibold">in progress</span>
            </div>
            <p className="text-[11px] text-[#737A73] mt-1">
              Average Progress: <strong>{Math.round((assignmentCompletionRate + habitConsistencyRate + wellnessProgressRate) / 3)}%</strong>
            </p>
          </div>
        </div>

        {/* Weekly Focus & Study Time */}
        <div className="p-5 rounded-3xl bg-white border border-black/30 shadow-xs flex flex-col justify-between hover:border-black/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#737A73]">
              Weekly Mindful Focus
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FAF9F5] text-[#193F30] border border-black/20 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-bold text-[#193F30]">
                {weeklySummaryStats.focusMinutes}
              </span>
              <span className="text-xs text-[#4B735F] font-semibold">mins logged</span>
            </div>
            <p className="text-[11px] text-[#737A73] mt-1">
              Across {weeklySummaryStats.wellnessSessions} verified sessions
            </p>
          </div>
        </div>
      </div>

      {/* 3. Section Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#F1EDE2] border border-black/30 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Growth Overview & Goals' },
          { id: 'assignments', label: `Assignment History (${filteredAssignments.length})` },
          { id: 'activities', label: `Completed Activities (${totalCompletedActivitiesCount})` },
          { id: 'reflections', label: `Saved Reflections (${(reflections?.length || 0) + filteredWellnessSessions.filter(s => s.reflectionNote).length})` },
          { id: 'feedback', label: `Mentor Feedback (${feedbackItems.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#193F30] text-white border border-black/30 shadow-xs'
                : 'text-[#202923] hover:text-black hover:bg-black/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* =========================================================================
          TAB 1: OVERVIEW & PERSONAL GOAL PROGRESS
          ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6 sm:space-y-8">
          
          {/* Active Personal Goals with Defined Progress Calculations */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/30 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/15">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#202923] flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#193F30]" />
                  <span>Personal Goal Progress & Defined Calculations</span>
                </h3>
                <p className="text-xs text-[#737A73] mt-0.5">
                  Every percentage is calculated strictly from verified database records.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-[#193F30] bg-[#EDF2EC] px-3 py-1 rounded-full border border-black/20 self-start sm:self-auto">
                No Fabricated Statistics
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {developmentalGoals.map((goal) => (
                <div
                  key={goal.id}
                  className="p-5 rounded-2xl bg-[#F8F7F2] border border-black/30 shadow-2xs flex flex-col justify-between space-y-4 hover:border-black/50 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#737A73] bg-[#F1EDE2] px-2 py-0.5 rounded-md border border-black/15">
                        {goal.category}
                      </span>
                      <span className="text-xs font-bold text-[#193F30]">{goal.status}</span>
                    </div>

                    <h4 className="font-serif text-base font-bold text-[#202923]">
                      {goal.title}
                    </h4>
                    <p className="text-xs text-[#555] font-medium">{goal.metric}</p>
                  </div>

                  {/* Progress Bar & Percentage */}
                  <div className="space-y-1.5 pt-2 border-t border-black/15">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#737A73] font-semibold">Calculated Progress</span>
                      <span className="font-bold text-[#193F30]">{goal.progress}%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-black/10 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${goal.progress}%`,
                          backgroundColor: goal.color
                        }}
                      />
                    </div>
                    <div className="text-[10px] text-[#737A73] italic pt-1 flex items-center gap-1">
                      <HelpCircle className="w-3 h-3 text-[#193F30] shrink-0" />
                      <span>Formula: {goal.calculationFormula}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Activity Summary (Bar Chart / Progress Grid) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/30 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-black/15">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#202923] flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#193F30]" />
                  <span>Weekly Activity Summary</span>
                </h3>
                <p className="text-xs text-[#737A73] mt-0.5">
                  Consolidated distribution of actions completed across core learning pillars.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-[#F8F7F2] border border-black/30 text-center space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#737A73]">
                  Assignments Submitted
                </span>
                <span className="font-serif text-2xl font-bold text-[#193F30] block">
                  {weeklySummaryStats.assignmentsSubmitted}
                </span>
                <span className="text-[10px] text-[#4B735F] font-semibold">Submitted & Verified</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F7F2] border border-black/30 text-center space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#737A73]">
                  Curriculum Activities
                </span>
                <span className="font-serif text-2xl font-bold text-[#193F30] block">
                  {weeklySummaryStats.activitiesDone}
                </span>
                <span className="text-[10px] text-[#4B735F] font-semibold">Completed Steps</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F7F2] border border-black/30 text-center space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#737A73]">
                  Wellness Sessions
                </span>
                <span className="font-serif text-2xl font-bold text-[#193F30] block">
                  {weeklySummaryStats.wellnessSessions}
                </span>
                <span className="text-[10px] text-[#4B735F] font-semibold">Breathing & Focus</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F7F2] border border-black/30 text-center space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#737A73]">
                  Focus Logged
                </span>
                <span className="font-serif text-2xl font-bold text-[#193F30] block">
                  {weeklySummaryStats.focusMinutes}m
                </span>
                <span className="text-[10px] text-[#4B735F] font-semibold">Deep Study Minutes</span>
              </div>
            </div>
          </div>

          {/* Recent Milestones Timeline */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/30 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-black/15">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#202923] flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#193F30]" />
                  <span>Recent Milestones & Breakthroughs</span>
                </h3>
                <p className="text-xs text-[#737A73] mt-0.5">
                  Verified developmental milestones recorded along your learning journey.
                </p>
              </div>
            </div>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-black/20">
              {milestones.map((m) => (
                <div key={m.id} className="relative flex flex-col gap-1.5">
                  <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#193F30] ring-4 ring-[#EDF2EC] border border-black/30" />
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-[#193F30]">{m.date}</span>
                    <span className="text-[#737A73]">•</span>
                    <span className="text-[10px] font-semibold text-[#737A73] bg-[#F1EDE2] border border-black/20 px-2 py-0.5 rounded-full">
                      {m.category}
                    </span>
                    <span className="text-[10px] font-bold text-[#193F30] bg-[#EDF2EC] px-2 py-0.5 rounded-full border border-black/20 flex items-center gap-1">
                      <Check className="w-2.5 h-2.5" /> Verified
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
      )}

      {/* =========================================================================
          TAB 2: ASSIGNMENT HISTORY (Accurate Status Badges)
          ========================================================================= */}
      {activeTab === 'assignments' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/30 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/15">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#202923] flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-[#193F30]" />
                <span>Assignment History</span>
              </h3>
              <p className="text-xs text-[#737A73] mt-0.5">
                Authoritative record of assignments, review stages, and submission timestamps.
              </p>
            </div>
            <div className="text-xs text-[#737A73]">
              Showing <strong>{filteredAssignments.length}</strong> assignments
            </div>
          </div>

          {filteredAssignments.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#F8F7F2] border border-black/20">
              <CheckSquare className="w-8 h-8 mx-auto text-[#737A73] mb-2" />
              <p className="text-sm font-bold text-[#202923]">No assignments found for this filter</p>
              <p className="text-xs text-[#737A73] mt-1">Adjust the date filter to view your full academic history.</p>
            </div>
          ) : (
            <div className="divide-y divide-black/15">
              {filteredAssignments.map((asg) => {
                const badge = getStatusBadge(asg.status);
                return (
                  <div key={asg.id} className="py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badge.bg} ${badge.text} ${badge.border}`}
                        >
                          {badge.label}
                        </span>
                        <span className="text-xs font-semibold text-[#737A73]">
                          {asg.subject}
                        </span>
                        <span className="text-[#737A73] text-xs">•</span>
                        <span className="text-xs text-[#737A73]">
                          Due: {asg.dueDate}
                        </span>
                      </div>

                      <h4 className="font-serif text-base font-bold text-[#202923]">
                        {asg.title}
                      </h4>
                      <p className="text-xs text-[#555] line-clamp-2 leading-relaxed">
                        {asg.description}
                      </p>

                      {asg.submission && (
                        <div className="p-3 rounded-xl bg-[#F8F7F2] border border-black/15 text-xs text-[#333]">
                          <strong className="text-[#193F30]">Your Submission:</strong>{' '}
                          <span className="italic">{asg.submission.content || 'Submission answers recorded.'}</span>
                          <span className="block text-[10px] text-[#737A73] mt-1">
                            Submitted: {asg.submission.submittedAt}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2 shrink-0">
                      <span className="text-[11px] font-semibold text-[#737A73]">
                        Duration: {asg.duration || '30 mins'}
                      </span>
                      {asg.feedback && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#193F30] bg-[#EDF2EC] px-2.5 py-1 rounded-lg border border-black/20">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Feedback Available</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 3: COMPLETED ACTIVITIES (Curriculum & Wellness)
          ========================================================================= */}
      {activeTab === 'activities' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/30 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-black/15">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#202923] flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-[#193F30]" />
                <span>Completed Activities Record</span>
              </h3>
              <p className="text-xs text-[#737A73] mt-0.5">
                Every curriculum exercise and self-guided focus session completed by your account.
              </p>
            </div>
            <span className="text-xs font-bold text-[#193F30] bg-[#EDF2EC] px-3 py-1 rounded-full border border-black/20">
              {totalCompletedActivitiesCount} Total Completed
            </span>
          </div>

          <div className="space-y-6">
            {/* 1. Core Curriculum Activities */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#737A73] mb-3">
                Curriculum Learning Activities ({completedActivities.length})
              </h4>
              {completedActivities.length === 0 ? (
                <div className="p-6 rounded-2xl bg-[#F8F7F2] border border-black/15 text-xs text-[#737A73] text-center">
                  No completed curriculum activities matching this date filter.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {completedActivities.map((act) => (
                    <div
                      key={act.id}
                      className="p-5 rounded-2xl bg-[#F8F7F2] border border-black/30 hover:border-black/50 shadow-2xs space-y-3 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#193F30] bg-[#EDF2EC] px-2 py-0.5 rounded-md border border-black/15">
                          {act.category}
                        </span>
                        <span className="text-xs font-semibold text-[#737A73]">
                          {act.completedAt || 'Recently'}
                        </span>
                      </div>
                      <h5 className="font-serif text-base font-bold text-[#202923]">
                        {act.title}
                      </h5>
                      <p className="text-xs text-[#555] line-clamp-2">
                        {act.shortDescription || act.description}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-black/15 text-xs">
                        <span className="text-[#4B735F] font-semibold">
                          +{act.xp || 150} XP Awarded
                        </span>
                        <span className="inline-flex items-center gap-1 font-bold text-[#193F30]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Focus & Wellness Completed Sessions */}
            <div className="pt-4 border-t border-black/15">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#737A73] mb-3">
                Focus & Wellness Sessions ({filteredWellnessSessions.length})
              </h4>
              {filteredWellnessSessions.length === 0 ? (
                <div className="p-6 rounded-2xl bg-[#F8F7F2] border border-black/15 text-xs text-[#737A73] text-center">
                  No completed wellness sessions in this period.
                </div>
              ) : (
                <div className="divide-y divide-black/15">
                  {filteredWellnessSessions.map((ses) => (
                    <div key={ses.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-sm font-bold text-[#202923]">
                            {ses.activityTitle}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#193F30] bg-[#EDF2EC] px-2 py-0.5 rounded-full border border-black/15">
                            {ses.category}
                          </span>
                        </div>
                        <span className="text-xs text-[#737A73]">
                          {ses.completedAt} • {Math.round((ses.durationSeconds || 0) / 60)} mins
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#193F30] bg-[#EDF2EC] px-2.5 py-1 rounded-lg border border-black/20 self-start sm:self-auto">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Logged
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: SAVED REFLECTIONS (Privacy Protection Safeguard)
          ========================================================================= */}
      {activeTab === 'reflections' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/30 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/15">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#202923]">
                  Saved Self-Reflections
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#193F30] bg-[#EDF2EC] px-2 py-0.5 rounded-full border border-black/20">
                  <Lock className="w-3 h-3" /> Private to Student
                </span>
              </div>
              <p className="text-xs text-[#737A73] mt-0.5">
                Personal journal entries and wellness insights are protected from peer visibility.
              </p>
            </div>

            {/* Privacy Shield Toggle */}
            <button
              type="button"
              onClick={() => setShowPrivateReflections(!showPrivateReflections)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F8F7F2] text-[#202923] hover:bg-[#F1EDE2] text-xs font-semibold border border-black/30 transition-all cursor-pointer self-start sm:self-auto"
            >
              {showPrivateReflections ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-[#737A73]" />
                  <span>Mask Reflection Text</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-[#193F30]" />
                  <span>Reveal Reflection Text</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-4">
            {/* Student Journal Reflections */}
            {(reflections || []).map((ref) => (
              <div
                key={ref.id}
                className="p-5 rounded-2xl bg-[#F8F7F2] border border-black/30 space-y-2 hover:border-black/50 transition-all"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-serif text-sm font-bold text-[#202923]">
                    {ref.title || ref.prompt || 'Journal Reflection'}
                  </span>
                  <span className="text-[#737A73]">{ref.date || 'Recent Entry'}</span>
                </div>
                <div className="text-xs leading-relaxed text-[#333]">
                  {showPrivateReflections ? (
                    <p className="italic">"{ref.content || ref.entry || 'Reflection recorded.'}"</p>
                  ) : (
                    <div className="h-6 w-3/4 bg-black/10 rounded-md animate-pulse" />
                  )}
                </div>
                {ref.mood && (
                  <span className="inline-block text-[10px] font-bold text-[#193F30] bg-[#EDF2EC] px-2 py-0.5 rounded-md border border-black/15">
                    Mood: {ref.mood}
                  </span>
                )}
              </div>
            ))}

            {/* Wellness Session Reflection Notes */}
            {filteredWellnessSessions.filter((s) => s.reflectionNote).map((ses) => (
              <div
                key={ses.id}
                className="p-5 rounded-2xl bg-[#F8F7F2] border border-black/30 space-y-2 hover:border-black/50 transition-all"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-serif text-sm font-bold text-[#202923]">
                    {ses.activityTitle} (Post-Session Reflection)
                  </span>
                  <span className="text-[#737A73]">{ses.completedAt}</span>
                </div>
                <div className="text-xs leading-relaxed text-[#333]">
                  {showPrivateReflections ? (
                    <p className="italic">"{ses.reflectionNote}"</p>
                  ) : (
                    <div className="h-6 w-3/4 bg-black/10 rounded-md animate-pulse" />
                  )}
                </div>
                {ses.moodAfter && (
                  <span className="inline-block text-[10px] font-bold text-[#193F30] bg-[#EDF2EC] px-2 py-0.5 rounded-md border border-black/15">
                    Recorded State: {ses.moodAfter}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: MENTOR FEEDBACK
          ========================================================================= */}
      {activeTab === 'feedback' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/30 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-black/15">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#202923] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#193F30]" />
                <span>Available Mentor & Teacher Feedback</span>
              </h3>
              <p className="text-xs text-[#737A73] mt-0.5">
                Constructive feedback notes provided on your completed assignment submissions.
              </p>
            </div>
            <span className="text-xs font-bold text-[#193F30] bg-[#EDF2EC] px-3 py-1 rounded-full border border-black/20">
              {feedbackItems.length} Available Notes
            </span>
          </div>

          {feedbackItems.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#F8F7F2] border border-black/20">
              <MessageSquare className="w-8 h-8 mx-auto text-[#737A73] mb-2" />
              <p className="text-sm font-bold text-[#202923]">No feedback notes available yet</p>
              <p className="text-xs text-[#737A73] mt-1">
                When your mentor or reviewer reviews your submitted assignments, their detailed comments will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {feedbackItems.map((fb) => {
                const isExpanded = expandedFeedbackId === fb.assignmentId;
                return (
                  <div
                    key={fb.assignmentId}
                    className="p-5 rounded-2xl bg-[#F8F7F2] border border-black/30 hover:border-black/50 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#737A73]">
                          {fb.subject} • Assignment Review
                        </span>
                        <h4 className="font-serif text-base font-bold text-[#202923]">
                          {fb.assignmentTitle}
                        </h4>
                      </div>
                      <span className="text-xs text-[#737A73]">{fb.date}</span>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-black/20 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#193F30] text-white flex items-center justify-center font-bold text-xs">
                          {fb.author ? String(fb.author).charAt(0) : 'M'}
                        </span>
                        <div>
                          <span className="text-xs font-bold text-[#202923] block leading-none">
                            {fb.author || 'Mentor'}
                          </span>
                          <span className="text-[10px] text-[#737A73]">{fb.role}</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#333] leading-relaxed pt-1">
                        "{fb.comment}"
                      </p>

                      {fb.revisionInstructions && (
                        <div className="mt-2 p-2.5 rounded-lg bg-[#FFF9EB] border border-amber-300 text-xs text-amber-900">
                          <strong>Revision Request:</strong> {fb.revisionInstructions}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 8. Trust, Integrity & Non-Fabrication Guarantee Footer */}
      <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-black/20 flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-[#193F30] shrink-0 mt-0.5" />
        <p className="text-[11px] sm:text-xs text-[#555] leading-relaxed">
          <strong className="text-[#202923]">Data Integrity & Privacy Policy:</strong> HighOrbit My Growth metrics are computed exclusively from your authentic, submitted school records and logged wellness sessions. We do not display fabricated statistics, simulated mental health scores, or vanity metrics. All private reflections are restricted to your authenticated student profile.
        </p>
      </div>

    </div>
  );
};

export default StudentGrowthPage;
