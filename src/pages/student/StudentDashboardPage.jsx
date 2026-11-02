import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Target,
  Brain,
  ListTodo,
  TrendingUp,
  Award,
  BookOpen,
  Bell,
  Play,
  RotateCcw,
  Flame,
  Calendar,
  Check,
  ChevronRight,
  Activity,
  HeartPulse,
  MessageSquare,
  AlertCircle,
  Loader2,
  UserCheck
} from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import { useStudent } from '../../context/StudentContext';

export const StudentDashboardPage = () => {
  const { activeChild, isAuthenticated } = useOnboarding();
  const {
    habits,
    toggleHabit,
    assignments,
    updateAssignmentStatus,
    events,
    unreadCount
  } = useStudent();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Validate student context authentication
  useEffect(() => {
    if (!activeChild && !isAuthenticated) {
      setErrorMessage('Student session could not be verified. Please log in with your student PIN.');
    } else {
      setErrorMessage(null);
    }
  }, [activeChild, isAuthenticated]);

  // Dynamic Current Date
  const todayDateFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  // Real Calculated Metrics
  const completedHabitsCount = habits.filter((h) => h.completed).length;
  const pendingAssignments = assignments.filter((a) => a.status !== 'Completed');
  const completedAssignmentsCount = assignments.filter((a) => a.status === 'Completed').length;

  // Weekly Activity Progress calculation based on habits completion & streaks
  const habitCompletionRate = habits.length ? Math.round((completedHabitsCount / habits.length) * 100) : 0;
  const totalStreaks = habits.reduce((acc, h) => acc + (h.streak || 0), 0);
  const averageStreak = habits.length ? Math.round(totalStreaks / habits.length) : 0;
  const weeklyProgressPercent = Math.min(100, Math.round((habitCompletionRate * 0.6) + (averageStreak * 6)));

  const activeGoals = activeChild?.learningGoals || [
    'Improve Problem Solving',
    'Develop Sustained Focus',
    'Build Confidence'
  ];

  // Group habits by category for Section 4
  const categories = ['Mindset', 'Academics', 'Wellness', 'Knowledge', 'Reflection'];
  const categoryStats = categories.map((cat) => {
    const catHabits = habits.filter((h) => h.category === cat);
    const catCompleted = catHabits.filter((h) => h.completed).length;
    const catRate = catHabits.length ? Math.round((catCompleted / catHabits.length) * 100) : 0;
    return {
      category: cat,
      total: catHabits.length,
      completed: catCompleted,
      rate: catRate,
    };
  }).filter((stat) => stat.total > 0);

  // ─────────────────────────────────────────────────────────────
  // LOADING STATE
  // ─────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center space-y-4 text-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <h3 className=" text-lg font-bold text-[#1b1831]">Loading Student Sanctuary...</h3>
        <p className="text-xs text-[#6A6678]">Fetching your personalized tasks and daily growth records.</p>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // ERROR STATE
  // ─────────────────────────────────────────────────────────────
  if (errorMessage || !activeChild) {
    return (
      <div className="max-w-xl mx-auto py-16 px-6 text-center space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-[#F3EFFF] text-primary flex items-center justify-center mx-auto border border-[#E6DEFF]">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className=" text-2xl font-bold text-[#1b1831]">Student Profile Unavailable</h2>
        <p className="text-sm text-[#6A6678] leading-relaxed">
          {errorMessage || 'Unable to access your authorized student profile records. Please verify your student credentials.'}
        </p>
        <div className="pt-2">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-container transition-all shadow-sm"
          >
            <span>Return to Login</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn w-full max-w-[1600px] mx-auto">

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: WELCOME
          - Personalized greeting using authenticated student's display name
          - Current date
          - Short encouraging message
          - Student avatar
          - Notification shortcut
          ───────────────────────────────────────────────────────────── */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-primary via-primary-container to-[#624bbc] text-white shadow-xl shadow-primary/25 border border-white/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Decorative background glow orb */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-secondary-container/25 blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -top-20 w-60 h-60 rounded-full bg-[#FFE28A]/20 blur-2xl pointer-events-none" />

        <div className="flex items-start sm:items-center gap-4 sm:gap-5 relative z-10">
          {/* Student Avatar */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-primary flex items-center justify-center text-2xl sm:text-3xl font-extrabold border-4 border-white/40 shadow-lg">
              {activeChild?.nickname?.charAt(0) || activeChild?.name?.charAt(0) || 'A'}
            </div>
            <span
              className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#FFE28A] border-2 border-white flex items-center justify-center text-[10px] text-primary font-bold shadow-xs"
              title="Active in Student Sanctuary"
            >
              ✓
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#FFE28A] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#FFE28A]" />
                <span>{todayDateFormatted}</span>
              </span>
              <span className="text-[10px] font-bold text-white bg-white/20 px-2.5 py-0.5 rounded-full border border-white/30 backdrop-blur-md">
                {activeChild?.grade || 'Grade 11'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, {activeChild?.nickname || activeChild?.name || 'Alex'}.
            </h1>

            <p className="text-xs sm:text-sm text-white/85 max-w-xl leading-relaxed">
              "Every disciplined choice compounds over time. Focus on one intentional step today."
            </p>
          </div>
        </div>

        {/* Notification Shortcut & Action */}
        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-between sm:justify-end relative z-10">
          <Link
            to="/child/notifications"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md transition-all shadow-xs relative"
            title="Open Notifications"
          >
            <Bell className="w-4 h-4 text-[#FFE28A]" />
            <span>Alerts</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-secondary-container text-white text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
          </Link>

          <Link
            to="/child/assignments"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-primary bg-white hover:bg-white/95 transition-all shadow-md hover:shadow-lg hover:scale-[1.02]"
          >
            <span>Review Tasks</span>
            <ArrowRight className="w-3.5 h-3.5 text-primary" />
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: SUMMARY CARDS (4 Real Calculated Records)
          1. Pending Assignments
          2. Completed Activities
          3. Weekly Activity Progress
          4. Active Personal Goals
          ───────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Pending Assignments */}
        <div className="p-5 rounded-2xl bg-white border border-[#E6DEFF] shadow-xs flex flex-col justify-between gap-3 hover:border-primary/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6A6678]">
              Pending Assignments
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#EBE5FF] text-primary flex items-center justify-center">
              <CheckSquareIcon className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl  font-bold text-[#1b1831]">
              {pendingAssignments.length}
            </div>
            <p className="text-xs text-[#6A6678] mt-0.5">
              {pendingAssignments.length === 0 ? 'All assignments completed!' : `${pendingAssignments.length} tasks requiring attention`}
            </p>
          </div>
          <Link
            to="/child/assignments"
            className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1 pt-1 border-t border-[#E6DEFF]"
          >
            <span>View assignments</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Card 2: Completed Activities */}
        <div className="p-5 rounded-2xl bg-white border border-[#E6DEFF] shadow-xs flex flex-col justify-between gap-3 hover:border-primary/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6A6678]">
              Completed Activities
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#F3EFFF] text-primary flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl  font-bold text-[#1b1831]">
              {completedHabitsCount} / {habits.length}
            </div>
            <p className="text-xs text-[#6A6678] mt-0.5">
              {Math.round((completedHabitsCount / (habits.length || 1)) * 100)}% of daily habits finished
            </p>
          </div>
          <div className="w-full h-1.5 bg-[#EBE5FF] rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${(completedHabitsCount / (habits.length || 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Card 3: Weekly Activity Progress */}
        <div className="p-5 rounded-2xl bg-white border border-[#E6DEFF] shadow-xs flex flex-col justify-between gap-3 hover:border-primary/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6A6678]">
              Weekly Progress
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#EBE5FF] text-primary flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl  font-bold text-[#1b1831]">
              {weeklyProgressPercent}%
            </div>
            <p className="text-xs text-[#6A6678] mt-0.5">
              Avg. habit streak: {averageStreak} days active
            </p>
          </div>
          <span className="text-[11px] font-semibold text-primary bg-[#EBE5FF] px-2.5 py-0.5 rounded-full w-fit">
            Consistent Momentum
          </span>
        </div>

        {/* Card 4: Active Personal Goals */}
        <div className="p-5 rounded-2xl bg-white border border-[#E6DEFF] shadow-xs flex flex-col justify-between gap-3 hover:border-primary/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6A6678]">
              Active Personal Goals
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#F3EFFF] text-primary flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl  font-bold text-[#1b1831]">
              {activeGoals.length}
            </div>
            <p className="text-xs text-[#6A6678] mt-0.5">
              Personal developmental objectives
            </p>
          </div>
          <Link
            to="/child/growth"
            className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1 pt-1 border-t border-[#E6DEFF]"
          >
            <span>View growth milestones</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: TODAY'S TASKS
          - Task title
          - Short description
          - Due date, if available
          - Estimated duration, if available
          - Current status
          - Start or Continue button
          ───────────────────────────────────────────────────────────── */}
      <section className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E6DEFF] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E6DEFF]">
          <div>
            <h2 className=" text-xl sm:text-2xl font-bold text-[#1b1831]">
              Today's Tasks & Growth Challenges
            </h2>
            <p className="text-xs text-[#6A6678]">
              Curated assignments and milestones tailored for your personal leadership development.
            </p>
          </div>
          <Link
            to="/child/assignments"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>All Assignments ({assignments.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Task Cards List / Empty State */}
        <div className="space-y-3.5">
          {assignments.length === 0 ? (
            <div className="py-12 text-center rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#8bcefe] mx-auto" />
              <h3 className=" text-base font-bold text-[#1b1831]">All Caught Up!</h3>
              <p className="text-xs text-[#6A6678] max-w-sm mx-auto">
                You have completed all pending tasks for today. Continue building positive habits or explore self-assessment.
              </p>
              <div className="pt-2">
                <Link
                  to="/child/activities"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  <span>Go to My Activities</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ) : (
            assignments.map((task) => (
              <div
                key={task.id}
                className="p-5 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] hover:border-primary/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs"
              >
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-primary bg-[#EBE5FF] px-3 py-0.5 rounded-full">
                      {task.subject}
                    </span>

                    {task.duration && (
                      <span className="text-[11px] font-medium text-[#6A6678] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-primary" />
                        <span>Est: {task.duration}</span>
                      </span>
                    )}

                    {task.dueDate && (
                      <span className="text-[11px] font-medium text-[#6A6678]">
                        • Due: {task.dueDate}
                      </span>
                    )}

                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        task.status === 'Completed'
                          ? 'bg-[#8bcefe] text-primary'
                          : task.status === 'In Progress'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-white text-[#6A6678] border border-[#E6DEFF]'
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>

                  <h3 className=" text-base sm:text-lg font-bold text-[#1b1831]">
                    <Link to={`/child/assignments/${task.id}`} className="hover:text-primary hover:underline">
                      {task.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-[#6A6678] leading-relaxed line-clamp-2">
                    {task.description}
                  </p>
                </div>

                {/* Working Start / Continue Buttons */}
                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#E6DEFF]">
                  {task.status === 'Pending' && (
                    <Link
                      to={`/child/assignments/${task.id}`}
                      className="py-2 px-4 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-container transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>Start Task</span>
                    </Link>
                  )}

                  {task.status === 'In Progress' && (
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/child/assignments/${task.id}`}
                        className="py-2 px-4 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-container transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>Continue</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => updateAssignmentStatus(task.id, 'Completed')}
                        className="py-2 px-3 rounded-full text-xs font-semibold text-primary bg-[#EBE5FF] hover:bg-[#E6DEFF] transition-colors flex items-center gap-1 cursor-pointer"
                        title="Mark Task Complete"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span className="hidden sm:inline">Complete</span>
                      </button>
                    </div>
                  )}

                  {task.status === 'Completed' && (
                    <button
                      type="button"
                      onClick={() => updateAssignmentStatus(task.id, 'In Progress')}
                      className="py-2 px-4 rounded-full text-xs font-semibold text-[#6A6678] hover:text-[#1b1831] bg-white border border-[#E6DEFF] hover:border-primary/40 transition-colors cursor-pointer"
                    >
                      Reopen
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: MY GROWTH OVERVIEW
          - Actual activity completion
          - Personal goal progress
          ───────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left (7 cols): Actual Activity Completion by Category */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-white border border-[#E6DEFF] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6DEFF]">
            <div>
              <h2 className=" text-xl font-bold text-[#1b1831]">
                Activity Completion by Domain
              </h2>
              <p className="text-xs text-[#6A6678]">
                Calculated directly from today's active habit check-ins.
              </p>
            </div>
            <Link
              to="/child/activities"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Habit Tracker →
            </Link>
          </div>

          {categoryStats.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#6A6678]">
              No active habits tracked yet. Visit My Activities to create your daily routine!
            </div>
          ) : (
            <div className="space-y-4">
              {categoryStats.map((cat) => (
                <div key={cat.category} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1b1831]">{cat.category}</span>
                    <span className="font-medium text-[#6A6678]">
                      {cat.completed} of {cat.total} completed ({cat.rate}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#FCF8FF] border border-[#E6DEFF] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${cat.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right (5 cols): Active Personal Goals Progress */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-white border border-[#E6DEFF] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6DEFF]">
            <div>
              <h2 className=" text-xl font-bold text-[#1b1831]">
                Personal Goals Roadmap
              </h2>
              <p className="text-xs text-[#6A6678]">
                Active developmental priorities from your profile.
              </p>
            </div>
            <Link
              to="/child/growth"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Milestones →
            </Link>
          </div>

          {activeGoals.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#6A6678]">
              No personal goals selected. Visit My Growth to set your leadership goals!
            </div>
          ) : (
            <div className="space-y-2.5">
              {activeGoals.map((goal, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] hover:border-primary/40 transition-all flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#EBE5FF] text-primary flex items-center justify-center font-bold text-xs shrink-0">
                      0{idx + 1}
                    </div>
                    <span className="text-xs font-bold text-[#1b1831]">{goal}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-primary bg-white px-2.5 py-0.5 rounded-full border border-[#E6DEFF] shrink-0">
                    In Focus
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: RECENT ACTIVITY
          - Real recent events: assignment updates, submissions, feedback
          ───────────────────────────────────────────────────────────── */}
      <section className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E6DEFF] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E6DEFF]">
          <div>
            <h2 className=" text-xl sm:text-2xl font-bold text-[#1b1831]">
              Recent Activity & Updates
            </h2>
            <p className="text-xs text-[#6A6678]">
              Chronological log of assignment updates, reflection recordings, and mentor feedback.
            </p>
          </div>
          <span className="text-xs font-medium text-[#6A6678]">
            Showing latest {events?.length || 0} events
          </span>
        </div>

        {(!events || events.length === 0) ? (
          <div className="py-8 text-center text-xs text-[#6A6678]">
            No recent activity recorded yet. Start an assignment or complete a habit to see live progress here.
          </div>
        ) : (
          <div className="divide-y divide-black/15">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#FCF8FF]/60 px-2 rounded-xl transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <span
                    className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shrink-0 ${
                      evt.category === 'Assignment'
                        ? 'bg-[#EBE5FF] text-primary'
                        : evt.category === 'Feedback'
                        ? 'bg-amber-100 text-amber-800'
                        : evt.category === 'Reflection'
                        ? 'bg-[#F3EFFF] text-[#1b1831]'
                        : evt.category === 'Submission'
                        ? 'bg-[#8bcefe] text-primary'
                        : 'bg-white text-[#6A6678] border border-[#E6DEFF]'
                    }`}
                  >
                    {evt.category}
                  </span>

                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-bold text-[#1b1831]">
                      {evt.title}
                    </span>
                    <span className="text-xs text-[#6A6678]">
                      {evt.detail}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto text-xs text-[#6A6678]">
                  <span>{evt.timestamp}</span>
                  {evt.link && (
                    <Link
                      to={evt.link}
                      className="font-semibold text-primary hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>Open</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: QUICK ACTIONS (5 Functional Shortcuts)
          - My Assignments
          - My Activities
          - Self-Assessment
          - Focus & Wellness
          - My Growth
          ───────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className=" text-xl sm:text-2xl font-bold text-[#1b1831]">
            Quick Actions
          </h2>
          <p className="text-xs text-[#6A6678]">
            Direct pathways to your core personal leadership and self-discovery tools.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Action 1: My Assignments */}
          <Link
            to="/child/assignments"
            className="p-5 rounded-2xl bg-white border border-[#E6DEFF] hover:border-primary/40 hover:shadow-xs transition-all flex flex-col justify-between gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EBE5FF] text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <CheckSquareIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1b1831] group-hover:text-primary transition-colors">
                My Assignments
              </h4>
              <p className="text-[11px] text-[#6A6678] mt-0.5">
                Tasks & growth challenges
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-primary gap-1">
              <span>Access</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Action 2: My Activities */}
          <Link
            to="/child/activities"
            className="p-5 rounded-2xl bg-white border border-[#E6DEFF] hover:border-primary/40 hover:shadow-xs transition-all flex flex-col justify-between gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F3EFFF] text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <ListTodo className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1b1831] group-hover:text-primary transition-colors">
                My Activities
              </h4>
              <p className="text-[11px] text-[#6A6678] mt-0.5">
                Daily habits & routines
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-primary gap-1">
              <span>Access</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Action 3: Self-Assessment */}
          <Link
            to="/child/self-assessment"
            className="p-5 rounded-2xl bg-white border border-[#E6DEFF] hover:border-primary/40 hover:shadow-xs transition-all flex flex-col justify-between gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EBE5FF] text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1b1831] group-hover:text-primary transition-colors">
                Self-Assessment
              </h4>
              <p className="text-[11px] text-[#6A6678] mt-0.5">
                Mindset & strengths test
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-primary gap-1">
              <span>Access</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Action 4: Focus & Wellness */}
          <Link
            to="/child/wellness"
            className="p-5 rounded-2xl bg-white border border-[#E6DEFF] hover:border-primary/40 hover:shadow-xs transition-all flex flex-col justify-between gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F3EFFF] text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1b1831] group-hover:text-primary transition-colors">
                Focus & Wellness
              </h4>
              <p className="text-[11px] text-[#6A6678] mt-0.5">
                Timer & breathing guide
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-primary gap-1">
              <span>Access</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Action 5: My Growth */}
          <Link
            to="/child/growth"
            className="p-5 rounded-2xl bg-white border border-[#E6DEFF] hover:border-primary/40 hover:shadow-xs transition-all flex flex-col justify-between gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EBE5FF] text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1b1831] group-hover:text-primary transition-colors">
                My Growth
              </h4>
              <p className="text-[11px] text-[#6A6678] mt-0.5">
                Milestones & timeline
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-primary gap-1">
              <span>Access</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
};

// Internal icon helper to prevent import clashes
function CheckSquareIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

export default StudentDashboardPage;
