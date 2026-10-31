import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Users,
  User,
  ShieldCheck,
  Sparkles,
  Target,
  Clock,
  BookOpen,
  Settings,
  LogOut,
  ChevronRight,
  Plus,
  Play,
  CheckCircle2,
  Lock,
  Heart,
  MessageCircle,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  FileText,
  Calendar,
  Send,
  Check,
  Award,
  BarChart3,
  Search,
  Eye,
  Sliders,
  Bell,
  Smile,
  ShieldAlert,
  Zap,
  Filter
} from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import { parentingGuideSituations, sampleActivitiesCatalog } from './parentGuideData';

export const ParentDashboardPage = () => {
  const navigate = useNavigate();
  const { parentAccount, logout } = useOnboarding();

  // Active navigation tab
  // 'overview' | 'my_child' | 'insights' | 'guide' | 'assignments' | 'reports' | 'self_growth' | 'settings'
  const [activeTab, setActiveTab] = useState('overview');

  // Linked Students state
  const [students, setStudents] = useState([
    {
      id: 'student_1',
      name: 'Leo Jenkins',
      initials: 'LJ',
      age: 17,
      stage: 'High School Senior · College Prep',
      archetype: 'Strategic Thinker & Deep Researcher',
      strengths: [
        { name: 'Analytical Reasoning', score: 92, status: 'Strength' },
        { name: 'Focus & Deep Work', score: 88, status: 'Strength' },
        { name: 'Self-Discipline', score: 85, status: 'High' },
        { name: 'Empathy & Listening', score: 82, status: 'High' },
        { name: 'Public Speaking & Self-Advocacy', score: 64, status: 'Growth Focus' }
      ],
      interests: ['Environmental Policy', 'Debate & Logic', 'Classical Guitar', 'Chess & Puzzles'],
      privacyMode: 'Age 17: Collaborative Parental Oversight with Encrypted Student Diary',
      growthIndex: 88,
      questsCompleted: 14,
      totalQuests: 18,
      streakDays: 7
    },
    {
      id: 'student_2',
      name: 'Maya Jenkins',
      initials: 'MJ',
      age: 19,
      stage: 'University Sophomore · Liberal Arts',
      archetype: 'Creative Synthesizer & Empathetic Leader',
      strengths: [
        { name: 'Creative Expression', score: 94, status: 'Strength' },
        { name: 'Interpersonal Empathy', score: 90, status: 'Strength' },
        { name: 'Written Communication', score: 88, status: 'High' },
        { name: 'Time Prioritization', score: 68, status: 'Growth Focus' },
        { name: 'Stress Grounding', score: 65, status: 'Growth Focus' }
      ],
      interests: ['Journalism & Media', 'Human Rights', 'Ceramics', 'Trail Running'],
      privacyMode: 'Age 19: Adult Student Explicit-Consent Protocol Active',
      growthIndex: 84,
      questsCompleted: 11,
      totalQuests: 16,
      streakDays: 5
    }
  ]);

  const [selectedStudentId, setSelectedStudentId] = useState('student_1');
  const activeStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  // Active situation in Parenting Guide
  const [selectedSituationId, setSelectedSituationId] = useState('confidence');
  const [guideCategoryFilter, setGuideCategoryFilter] = useState('All');
  const [guideSearchTerm, setGuideSearchTerm] = useState('');

  // Assignments & Activities State
  const [assignments, setAssignments] = useState([
    {
      id: 'asg_1',
      studentId: 'student_1',
      studentName: 'Leo Jenkins',
      title: 'The 3-Minute Voice Sprint',
      track: 'Communication & Self-Advocacy',
      status: 'Needs Review',
      dueDate: 'Tomorrow',
      assignedDate: 'Oct 28',
      parentNote: 'Proud of you for working on this! Let’s do a quick coffee chat once you finish.',
      studentSubmission: 'I spoke up in AP Gov today and shared my perspective on the Clean Air amendment. My heart raced at first, but the teacher actually built on my point! Felt good afterward.',
      parentFeedback: ''
    },
    {
      id: 'asg_2',
      studentId: 'student_1',
      studentName: 'Leo Jenkins',
      title: 'Digital Sunset Wind-Down Routine',
      track: 'Focus & Deep Work',
      status: 'In Progress',
      dueDate: 'Nov 3',
      assignedDate: 'Oct 29',
      parentNote: 'To help with chemistry exam prep energy.',
      studentSubmission: null,
      parentFeedback: ''
    },
    {
      id: 'asg_3',
      studentId: 'student_1',
      studentName: 'Leo Jenkins',
      title: 'Circle of Control Reflection',
      track: 'Emotional Resilience',
      status: 'Completed',
      dueDate: 'Oct 25',
      assignedDate: 'Oct 21',
      parentNote: 'Take your time with this one.',
      studentSubmission: 'Realized 80% of my anxiety was about how the test curve is calculated, which I have zero control over. Focusing on my study notes instead.',
      parentFeedback: 'Incredible clarity, Leo. Really admire your ability to separate what you can control from noise.'
    },
    {
      id: 'asg_4',
      studentId: 'student_2',
      studentName: 'Maya Jenkins',
      title: 'The Weighted Decision Matrix',
      track: 'Independent Life Skills',
      status: 'In Progress',
      dueDate: 'Nov 5',
      assignedDate: 'Oct 30',
      parentNote: 'For sorting through your summer internship options.',
      studentSubmission: null,
      parentFeedback: ''
    }
  ]);

  const [assignmentFilter, setAssignmentFilter] = useState('All');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [newAssignmentData, setNewAssignmentData] = useState({
    activityId: sampleActivitiesCatalog[0].id,
    studentId: 'student_1',
    dueDate: '2026-11-08',
    parentNote: 'Thought of you for this one. Take your time and let me know if you want to talk it through!'
  });

  const [reviewModalData, setReviewModalData] = useState(null);
  const [feedbackInput, setFeedbackInput] = useState('');
  const [feedbackSentSuccess, setFeedbackSentSuccess] = useState(false);

  // Observations State (Module 3)
  const [parentObservations, setParentObservations] = useState([
    {
      id: 'obs_1',
      studentId: 'student_1',
      date: 'Yesterday at 7:30 PM',
      category: 'Emotional Awareness',
      note: 'Noticed Leo took a calm 10-minute walk when frustrated with calculus instead of slamming books or shutting down.',
      tag: 'Parent-Recorded'
    },
    {
      id: 'obs_2',
      studentId: 'student_1',
      date: 'Oct 26 at 6:15 PM',
      category: 'Communication',
      note: 'Leo initiated a conversation about his college application concerns without defensiveness.',
      tag: 'Parent-Recorded'
    }
  ]);
  const [newObservationText, setNewObservationText] = useState('');
  const [newObservationCategory, setNewObservationCategory] = useState('Emotional Awareness');

  // Parent Self-Growth State (Module 7)
  const [parentGoals, setParentGoals] = useState([
    { id: 'pg_1', text: 'Listen for 3 uninterrupted minutes before offering any advice or solutions', completed: 4, target: 5 },
    { id: 'pg_2', text: 'Celebrate effort, study consistency, and resilience over grades', completed: true },
    { id: 'pg_3', text: 'Weekly distraction-free 20-minute walk or tea with Leo', completed: true },
    { id: 'pg_4', text: 'Refrain from asking about test scores as the first question after school', completed: false }
  ]);
  const [parentReflectionText, setParentReflectionText] = useState(
    'This week I noticed how much more Leo opened up when I just said "That sounds exhausting" instead of immediately jumping into problem-solving mode.'
  );
  const [parentReflectionSaved, setParentReflectionSaved] = useState(false);

  // Handle Logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Handle Assign Activity
  const handleCreateAssignment = (e) => {
    e.preventDefault();
    const act = sampleActivitiesCatalog.find((a) => a.id === newAssignmentData.activityId) || sampleActivitiesCatalog[0];
    const std = students.find((s) => s.id === newAssignmentData.studentId) || students[0];

    const newAsg = {
      id: `asg_${Date.now()}`,
      studentId: std.id,
      studentName: std.name,
      title: act.title,
      track: act.category,
      status: 'Assigned',
      dueDate: newAssignmentData.dueDate,
      assignedDate: 'Just now',
      parentNote: newAssignmentData.parentNote,
      studentSubmission: null,
      parentFeedback: ''
    };

    setAssignments([newAsg, ...assignments]);
    setIsAssignModalOpen(false);
  };

  // Handle Send Feedback
  const handleSendFeedback = () => {
    if (!reviewModalData || !feedbackInput.trim()) return;

    setAssignments((prev) =>
      prev.map((a) =>
        a.id === reviewModalData.id
          ? { ...a, status: 'Completed', parentFeedback: feedbackInput }
          : a
      )
    );
    setFeedbackSentSuccess(true);
    setTimeout(() => {
      setFeedbackSentSuccess(false);
      setReviewModalData(null);
      setFeedbackInput('');
    }, 1200);
  };

  // Filtered situations for Parenting Guide
  const filteredSituations = parentingGuideSituations.filter((sit) => {
    const matchesCategory = guideCategoryFilter === 'All' || sit.category.toLowerCase().includes(guideCategoryFilter.toLowerCase());
    const matchesSearch = sit.title.toLowerCase().includes(guideSearchTerm.toLowerCase()) || sit.summary.toLowerCase().includes(guideSearchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedSituation =
    parentingGuideSituations.find((s) => s.id === selectedSituationId) || parentingGuideSituations[0];

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#18221D] font-sans selection:bg-[#183B2B] selection:text-white flex flex-col">
      
      {/* ────────────────── 1. PORTAL HEADER ────────────────── */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E8E4DA] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-full bg-[#183B2B] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 text-[#DCE8DE]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#18221D]">
                HighOrbit
              </span>
            </Link>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2EBE5] border border-[#183B2B]/20 text-[11px] font-bold text-[#183B2B]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>PARENT PORTAL</span>
            </div>
          </div>

          {/* Student Quick Switcher + Parent Profile Actions */}
          <div className="flex items-center gap-3">
            
            {/* Linked Student Switcher */}
            <div className="flex items-center bg-[#F0ECE1] border border-[#E0DACE] rounded-full p-1 text-xs font-semibold">
              <span className="hidden md:inline px-2.5 text-[#5C665F]">Student:</span>
              {students.map((std) => (
                <button
                  key={std.id}
                  onClick={() => setSelectedStudentId(std.id)}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    selectedStudentId === std.id
                      ? 'bg-[#183B2B] text-white shadow-2xs font-bold'
                      : 'text-[#4B554E] hover:text-[#18221D]'
                  }`}
                >
                  {std.name.split(' ')[0]} ({std.age})
                </button>
              ))}
            </div>

            {/* Parent Account Menu */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#E8E4DA]">
              <div className="w-8 h-8 rounded-full bg-[#183B2B] text-white flex items-center justify-center font-serif font-bold text-xs">
                SJ
              </div>
              <span className="hidden lg:inline text-xs font-semibold text-[#18221D]">
                {parentAccount?.name || 'Sarah Jenkins'}
              </span>

              <button
                onClick={handleLogout}
                className="p-2 text-[#5C665F] hover:text-red-700 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* ────────────────── PORTAL NAVIGATION TABS ────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#E8E4DA]/60 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-1 sm:gap-2 py-2">
            {[
              { id: 'overview', label: 'Overview', icon: Compass },
              { id: 'my_child', label: 'My Child', icon: User },
              { id: 'insights', label: 'Behaviour Insights', icon: TrendingUp },
              { id: 'guide', label: 'Parenting Guide', icon: BookOpen },
              { id: 'assignments', label: 'Assignments', icon: Target },
              { id: 'reports', label: 'Growth Reports', icon: BarChart3 },
              { id: 'self_growth', label: 'Parent Self-Growth', icon: Heart },
              { id: 'settings', label: 'Privacy & Settings', icon: Sliders }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#183B2B] text-white shadow-2xs font-bold'
                      : 'text-[#4B554E] hover:text-[#18221D] hover:bg-[#F0ECE1]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#DCE8DE]' : 'text-[#4B735F]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ────────────────── MAIN CONTENT AREA ────────────────── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* ══════════════════════════════════════════════════════════
            MODULE 1: PARENT OVERVIEW
            ══════════════════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Top Welcome Header */}
            <div className="rounded-[32px] bg-gradient-to-br from-[#183B2B] to-[#122D21] text-white p-7 sm:p-9 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold uppercase tracking-wider mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-[#A7D4B5]" />
                    <span>Weekly Parent Pulse</span>
                  </div>
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-normal leading-tight">
                    Welcome back, <span className="italic text-[#DCE8DE]">{parentAccount?.name?.split(' ')[0] || 'Sarah'}.</span>
                  </h1>
                  <p className="mt-2 text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
                    Active student: <strong>{activeStudent.name}</strong> ({activeStudent.age} yrs, {activeStudent.stage}).
                    All shared insights reflect student-consented tracking and educational self-discovery.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="px-4 py-2 rounded-2xl bg-white/10 border border-white/15 text-xs text-[#DCE8DE]">
                    <span>Sample Data Mode</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('guide')}
                    className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#183B2B] bg-white hover:bg-[#FBF9F5] shadow-xs transition-all cursor-pointer"
                  >
                    Explore Parenting Guide →
                  </button>
                </div>
              </div>

              {/* Quick Metrics Bar */}
              <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
                <div>
                  <div className="text-xs text-[#A7D4B5] font-semibold">Focus Consistency</div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold mt-0.5">{activeStudent.growthIndex}%</div>
                  <div className="text-[11px] text-white/70 mt-0.5">+6% from last month</div>
                </div>
                <div>
                  <div className="text-xs text-[#A7D4B5] font-semibold">Quests Completed</div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold mt-0.5">{activeStudent.questsCompleted} / {activeStudent.totalQuests}</div>
                  <div className="text-[11px] text-white/70 mt-0.5">4 active growth tracks</div>
                </div>
                <div>
                  <div className="text-xs text-[#A7D4B5] font-semibold">Habit Reflection Streak</div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold mt-0.5">{activeStudent.streakDays} Days</div>
                  <div className="text-[11px] text-white/70 mt-0.5">Continuous journaling</div>
                </div>
                <div>
                  <div className="text-xs text-[#A7D4B5] font-semibold">Parent-Student Trust</div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold mt-0.5 text-[#DCE8DE]">Steady</div>
                  <div className="text-[11px] text-white/70 mt-0.5">High consent compliance</div>
                </div>
              </div>
            </div>

            {/* Two-Column Grid: Timeline & Assignments VS Support & Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column (7 cols): Timeline & Assignments */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Pending & Completed Assignments Card */}
                <div className="rounded-[32px] bg-white border border-[#E8E4DA] p-6 sm:p-7 shadow-xs">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#E2EBE5] text-[#183B2B] flex items-center justify-center">
                        <Target className="w-4 h-4" />
                      </div>
                      <h2 className="font-serif text-xl font-bold text-[#18221D]">
                        Assignments & Activities Pulse
                      </h2>
                    </div>
                    <button
                      onClick={() => setActiveTab('assignments')}
                      className="text-xs font-bold text-[#183B2B] hover:underline"
                    >
                      View All ({assignments.length}) →
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    {assignments.slice(0, 3).map((asg) => (
                      <div
                        key={asg.id}
                        className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#183B2B]/40 transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B735F] bg-[#E2EBE5] px-2 py-0.5 rounded-md">
                              {asg.track}
                            </span>
                            <span className="text-xs text-[#5C665F]">Due {asg.dueDate}</span>
                          </div>
                          <h3 className="text-sm font-bold text-[#18221D]">{asg.title}</h3>
                          <p className="text-xs text-[#5C665F] mt-0.5 italic">Note: "{asg.parentNote}"</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {asg.status === 'Needs Review' ? (
                            <button
                              onClick={() => {
                                setReviewModalData(asg);
                                setFeedbackInput('');
                              }}
                              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[#183B2B] hover:bg-[#112D20] shadow-2xs transition-all cursor-pointer"
                            >
                              Review Submission
                            </button>
                          ) : (
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              asg.status === 'Completed' ? 'bg-[#E2EBE5] text-[#183B2B]' : 'bg-[#F0ECE1] text-[#4B554E]'
                            }`}>
                              {asg.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Student Activity Stream */}
                <div className="rounded-[32px] bg-white border border-[#E8E4DA] p-6 sm:p-7 shadow-xs">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-8 h-8 rounded-xl bg-[#E2EBE5] text-[#183B2B] flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                    <h2 className="font-serif text-xl font-bold text-[#18221D]">
                      Student-Shared Activity Log
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        action: 'Completed 25-min Pomodoro Deep Work sprint',
                        category: 'Focus Track',
                        time: 'Yesterday at 4:30 PM',
                        badge: 'Student-Reported'
                      },
                      {
                        action: 'Submitted Reflection: "The 3-Minute Voice Sprint in AP Gov"',
                        category: 'Communication',
                        time: 'Oct 29 at 6:15 PM',
                        badge: 'Activity Submission'
                      },
                      {
                        action: 'Updated personal growth goal: "Focusing on calm breathing before Chemistry"',
                        category: 'Emotional Wellness',
                        time: 'Oct 28 at 8:00 PM',
                        badge: 'Goal Update'
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 pb-3 border-b border-[#F0ECE1] last:border-b-0 last:pb-0">
                        <div className="w-2 h-2 rounded-full bg-[#183B2B] mt-2 shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-[#18221D]">{item.action}</span>
                            <span className="text-[10px] text-[#5C665F]">{item.time}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-semibold text-[#4B735F] bg-[#E2EBE5] px-2 py-0.5 rounded">
                              {item.category}
                            </span>
                            <span className="text-[10px] text-[#5C665F]">
                              Tag: {item.badge}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column (5 cols): Areas for Support & Recommended Actions */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Areas Where Student May Need Support */}
                <div className="rounded-[32px] bg-white border border-[#E8E4DA] p-6 shadow-xs">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-amber-700" />
                    </div>
                    <h2 className="font-serif text-lg font-bold text-[#18221D]">
                      Areas Where Support May Be Needed
                    </h2>
                  </div>

                  <p className="text-xs text-[#5C665F] mb-4">
                    Generated from student-shared reflection patterns and habit check-ins.
                  </p>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA]">
                      <div className="text-xs font-bold text-[#18221D]">Late-Night Screen Boundaries</div>
                      <p className="text-xs text-[#4B554E] mt-1 leading-relaxed">
                        Leo reported difficulty winding down after 11:30 PM on study nights. Consider establishing a non-punitive household "digital sunset".
                      </p>
                      <button
                        onClick={() => {
                          setActiveTab('guide');
                          setSelectedSituationId('stress');
                        }}
                        className="text-[11px] font-bold text-[#183B2B] hover:underline mt-2 inline-flex items-center gap-1"
                      >
                        Read Stress & Sleep Guide →
                      </button>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA]">
                      <div className="text-xs font-bold text-[#18221D]">Pre-Exam Self-Doubt in Chemistry</div>
                      <p className="text-xs text-[#4B554E] mt-1 leading-relaxed">
                        Self-reflection notes show nervousness about the upcoming midterm. Affirm effort over perfection.
                      </p>
                      <button
                        onClick={() => {
                          setActiveTab('guide');
                          setSelectedSituationId('confidence');
                        }}
                        className="text-[11px] font-bold text-[#183B2B] hover:underline mt-2 inline-flex items-center gap-1"
                      >
                        Read Confidence Guide →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recommended Parent Actions */}
                <div className="rounded-[32px] bg-[#E2EBE5] border border-[#183B2B]/20 p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-[#183B2B]" />
                    <h2 className="font-serif text-base font-bold text-[#18221D]">
                      Recommended Action for Today
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-[#18221D] leading-relaxed font-medium">
                    "When Leo gets home, ask: <em>'What was the most interesting thought you had today?'</em> instead of asking about assignments."
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#183B2B]/15 flex items-center justify-between text-xs text-[#4B735F] font-semibold">
                    <span>Positive Reinforcement Focus</span>
                    <button
                      onClick={() => setActiveTab('self_growth')}
                      className="text-[#183B2B] hover:underline"
                    >
                      My Goals →
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            MODULE 2: MY CHILD / LINKED STUDENTS
            ══════════════════════════════════════════════════════════ */}
        {activeTab === 'my_child' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#183B2B]">
                  Linked Student Profile
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#18221D]">
                  {activeStudent.name}'s <span className="italic text-[#234A36]">Development Overview</span>
                </h1>
              </div>

              {/* Toggle Sibling */}
              <div className="flex items-center gap-2 bg-[#F0ECE1] p-1 rounded-full border border-[#E0DACE]">
                {students.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStudentId(s.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedStudentId === s.id
                        ? 'bg-[#183B2B] text-white shadow-xs'
                        : 'text-[#4B554E] hover:text-[#18221D]'
                    }`}
                  >
                    {s.name} ({s.age})
                  </button>
                ))}
              </div>
            </div>

            {/* Student Snapshot Card */}
            <div className="rounded-[32px] bg-white border border-[#E8E4DA] p-7 sm:p-9 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#F0ECE1]">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#183B2B] text-white font-serif font-bold text-xl flex items-center justify-center shadow-sm">
                    {activeStudent.initials}
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[#18221D]">{activeStudent.name}</h2>
                    <p className="text-xs sm:text-sm text-[#4B554E]">{activeStudent.stage}</p>
                    <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E2EBE5] text-[#183B2B] text-xs font-semibold">
                      <span>Archetype: <strong>{activeStudent.archetype}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setIsAssignModalOpen(true)}
                    className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#183B2B] hover:bg-[#112D20] shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Assign Growth Activity</span>
                  </button>
                </div>
              </div>

              {/* Strengths & Developmental Pillars */}
              <div className="mt-8">
                <h3 className="font-serif text-xl font-bold text-[#18221D] mb-4">
                  Core Strengths & Development Pillars
                </h3>
                <div className="space-y-4">
                  {activeStudent.strengths.map((st, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA]">
                      <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2">
                        <span className="text-[#18221D]">{st.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            st.status === 'Strength' ? 'bg-[#E2EBE5] text-[#183B2B]' :
                            st.status === 'Growth Focus' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {st.status}
                          </span>
                          <span className="text-[#183B2B] font-bold">{st.score}%</span>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-[#E8E4DA] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#4B735F] to-[#183B2B] rounded-full transition-all duration-500"
                          style={{ width: `${st.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Declared Personal Interests */}
              <div className="mt-8 pt-6 border-t border-[#F0ECE1]">
                <h3 className="font-serif text-lg font-bold text-[#18221D] mb-3">
                  Declared Interests & Passion Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeStudent.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full bg-[#F0ECE1] text-[#18221D] text-xs font-semibold border border-[#D5CFBF]"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Privacy Governance Banner */}
              <div className="mt-8 p-4 rounded-2xl bg-[#E2EBE5]/70 border border-[#183B2B]/15 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#183B2B] shrink-0" />
                <p className="text-xs text-[#183B2B] font-medium leading-relaxed">
                  <strong>Privacy Rule:</strong> {activeStudent.privacyMode}. HighOrbit never surveils or shares private student journal entries without consent.
                </p>
              </div>

            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            MODULE 3: BEHAVIOUR & DEVELOPMENT INSIGHTS
            ══════════════════════════════════════════════════════════ */}
        {activeTab === 'insights' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#183B2B]">
                Transparent Developmental Metrics
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#18221D]">
                Behaviour & <span className="italic text-[#234A36]">Development Insights</span>
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-[#4B554E] max-w-2xl leading-relaxed">
                Clear distinction between student-reported data, parent observations, and completed activities.
                No clinical diagnosis or surveillance.
              </p>
            </div>

            {/* Source Tagging Legend */}
            <div className="p-4 rounded-2xl bg-white border border-[#E8E4DA] flex flex-wrap items-center gap-4 text-xs font-semibold">
              <span className="text-[#18221D]">Source Badges:</span>
              <span className="px-2.5 py-1 rounded-full bg-[#E2EBE5] text-[#183B2B]">● Student-Reported</span>
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-800">● Parent Observation</span>
              <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-800">● Activity Data</span>
              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800">● System Suggestion</span>
            </div>

            {/* 9 Core Developmental Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: '1. Confidence', score: 76, badge: 'Student-Reported', desc: 'Self-belief in academic voice and social environments.', status: 'Moderate-High' },
                { title: '2. Communication', score: 70, badge: 'Activity Data', desc: 'Active listening, asking for help, and expressing needs.', status: 'Improving' },
                { title: '3. Emotional Awareness', score: 84, badge: 'Student-Reported', desc: 'Identifying emotions, journaling, and staying grounded.', status: 'High' },
                { title: '4. Focus & Attention', score: 88, badge: 'Activity Data', desc: 'Deep work habit consistency and screen boundary tracking.', status: 'High' },
                { title: '5. Time Management', score: 82, badge: 'Parent Observation', desc: 'Scheduling assignments and preparing ahead of deadlines.', status: 'High' },
                { title: '6. Decision-Making', score: 74, badge: 'System Suggestion', desc: 'Evaluating trade-offs and handling university choices.', status: 'Moderate' },
                { title: '7. Motivation & Drive', score: 80, badge: 'Student-Reported', desc: 'Intrinsic curiosity and commitment to personal projects.', status: 'High' },
                { title: '8. Personal Responsibility', score: 86, badge: 'Parent Observation', desc: 'Owning mistakes, following through on household agreements.', status: 'High' },
                { title: '9. Strengths & Interests', score: 90, badge: 'Activity Data', desc: 'Clarity on passions in policy, debate, and music.', status: 'Very High' }
              ].map((p, i) => (
                <div key={i} className="rounded-3xl bg-white border border-[#E8E4DA] p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B735F] bg-[#E2EBE5] px-2 py-0.5 rounded">
                        {p.badge}
                      </span>
                      <span className="font-bold text-[#183B2B]">{p.score}%</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#18221D] mb-1">{p.title}</h3>
                    <p className="text-xs text-[#5C665F] leading-relaxed mb-4">{p.desc}</p>
                  </div>
                  <div className="h-1.5 w-full bg-[#E8E4DA] rounded-full overflow-hidden">
                    <div className="h-full bg-[#183B2B] rounded-full" style={{ width: `${p.score}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Parent Observation Logger */}
            <div className="rounded-[32px] bg-white border border-[#E8E4DA] p-7 shadow-xs">
              <h2 className="font-serif text-xl font-bold text-[#18221D] mb-2">
                Record a Positive Parent Observation
              </h2>
              <p className="text-xs text-[#5C665F] mb-4">
                Record moments of growth you observed. HighOrbit uses positive reinforcement principles.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <select
                  value={newObservationCategory}
                  onChange={(e) => setNewObservationCategory(e.target.value)}
                  className="px-4 py-2.5 rounded-full text-xs font-semibold bg-[#FBF9F5] border border-[#DCD6C8] text-[#18221D] focus:outline-none focus:border-[#183B2B]"
                >
                  <option value="Emotional Awareness">Emotional Awareness</option>
                  <option value="Communication">Communication</option>
                  <option value="Focus & Time">Focus & Time</option>
                  <option value="Personal Responsibility">Personal Responsibility</option>
                </select>

                <input
                  type="text"
                  placeholder="e.g. Noticed Leo handled exam schedule change calmly today..."
                  value={newObservationText}
                  onChange={(e) => setNewObservationText(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-full text-xs font-medium bg-[#FBF9F5] border border-[#DCD6C8] text-[#18221D] focus:outline-none focus:border-[#183B2B]"
                />

                <button
                  type="button"
                  onClick={() => {
                    if (!newObservationText.trim()) return;
                    const newObs = {
                      id: `obs_${Date.now()}`,
                      studentId: activeStudent.id,
                      date: 'Just now',
                      category: newObservationCategory,
                      note: newObservationText,
                      tag: 'Parent-Recorded'
                    };
                    setParentObservations([newObs, ...parentObservations]);
                    setNewObservationText('');
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#183B2B] hover:bg-[#112D20] transition-all cursor-pointer shrink-0"
                >
                  Save Observation
                </button>
              </div>

              {/* Observation Timeline */}
              <div className="space-y-3 mt-6 pt-5 border-t border-[#F0ECE1]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#5C665F]">
                  Recent Parent-Recorded Observations ({parentObservations.length})
                </h3>
                {parentObservations.map((obs) => (
                  <div key={obs.id} className="p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA] text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#183B2B] bg-[#E2EBE5] px-2 py-0.5 rounded text-[10px]">
                        {obs.category}
                      </span>
                      <span className="text-[#5C665F] text-[10px]">{obs.date}</span>
                    </div>
                    <p className="text-[#18221D] leading-relaxed">{obs.note}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            MODULE 4: PARENTING GUIDE (ALL 10 SITUATIONS + 8 DIMENSIONS)
            ══════════════════════════════════════════════════════════ */}
        {activeTab === 'guide' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#183B2B]">
                Practical Psychology & Positive Guidance
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#18221D]">
                The HighOrbit <span className="italic text-[#234A36]">Parenting Guide</span>
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-[#4B554E] max-w-2xl leading-relaxed">
                Evidence-based, respectful strategies for navigating common challenges with 15–25 year olds without lectures, friction, or guilt.
              </p>
            </div>

            {/* Search & Category Pills */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
                {['All', 'Confidence', 'Communication', 'Focus', 'Emotional Wellness', 'Discipline'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setGuideCategoryFilter(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      guideCategoryFilter === cat
                        ? 'bg-[#183B2B] text-white shadow-xs'
                        : 'bg-[#F0ECE1] text-[#4B554E] hover:bg-[#E5E0D5]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#5C665F]" />
                <input
                  type="text"
                  placeholder="Search situations..."
                  value={guideSearchTerm}
                  onChange={(e) => setGuideSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-white border border-[#DCD6C8] text-[#18221D] focus:outline-none focus:border-[#183B2B]"
                />
              </div>
            </div>

            {/* Situations Layout: Left list + Right deep detail view */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Situation List (4 cols) */}
              <div className="lg:col-span-4 space-y-2.5">
                {filteredSituations.map((sit) => {
                  const isSelected = selectedSituationId === sit.id;
                  return (
                    <div
                      key={sit.id}
                      onClick={() => setSelectedSituationId(sit.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#183B2B] text-white border-[#183B2B] shadow-md'
                          : 'bg-white border-[#E8E4DA] text-[#18221D] hover:border-[#183B2B]/40'
                      }`}
                    >
                      <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${
                        isSelected ? 'text-[#A7D4B5]' : 'text-[#4B735F]'
                      }`}>
                        {sit.category}
                      </div>
                      <h3 className="font-serif text-base font-bold leading-snug">{sit.title}</h3>
                      <p className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-white/80' : 'text-[#5C665F]'}`}>
                        {sit.summary}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Situation Deep Detail (8 cols) */}
              <div className="lg:col-span-8 rounded-[32px] bg-white border border-[#E8E4DA] p-6 sm:p-9 shadow-xs space-y-8">
                
                {/* Title & Tag */}
                <div className="border-b border-[#F0ECE1] pb-6">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#4B735F] mb-1">
                    {selectedSituation.category}
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#18221D]">
                    {selectedSituation.title}
                  </h2>
                  <p className="mt-2 text-sm text-[#4B554E] leading-relaxed">
                    {selectedSituation.summary}
                  </p>
                </div>

                {/* 1. What You May Be Noticing */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#18221D] mb-3 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[#183B2B]" />
                    <span>1. What You May Be Noticing</span>
                  </h3>
                  <ul className="space-y-2">
                    {selectedSituation.noticing.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#4B554E]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#183B2B] mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Possible Reasons (Without Assumptions) */}
                <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA]">
                  <h3 className="font-serif text-base font-bold text-[#18221D] mb-2">
                    2. Possible Reasons (Presented without judgment)
                  </h3>
                  <ul className="space-y-1.5">
                    {selectedSituation.reasons.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#5C665F]">
                        <span className="text-[#4B735F] font-bold">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Questions You Can Ask */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#18221D] mb-3 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-[#183B2B]" />
                    <span>3. Questions You Can Ask (Warm Conversation Openers)</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedSituation.questions.map((q, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-[#E2EBE5]/60 border border-[#183B2B]/15 text-xs text-[#18221D] font-medium leading-relaxed italic">
                        {q}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. What to Do & 5. What to Avoid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Dos */}
                  <div className="p-5 rounded-2xl bg-[#E2EBE5]/50 border border-[#183B2B]/20">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#183B2B] mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#183B2B]" />
                      <span>4. What to Do</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-[#18221D]">
                      {selectedSituation.dos.map((d, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#183B2B] font-bold">✓</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Don'ts */}
                  <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-3 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-800" />
                      <span>5. What to Avoid</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-amber-900">
                      {selectedSituation.donts.map((d, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-700 font-bold">✕</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 6. Example Supportive Conversation */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#18221D] mb-3">
                    6. Example Supportive Conversation
                  </h3>
                  <div className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA] space-y-3">
                    {selectedSituation.conversation.map((line, idx) => (
                      <div key={idx} className="text-xs sm:text-sm">
                        <strong className={line.speaker === 'Parent' ? 'text-[#183B2B]' : 'text-[#4B554E]'}>
                          {line.speaker}:
                        </strong>{' '}
                        <span className="text-[#18221D] leading-relaxed">{line.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7. Suggested Follow-Up Activity */}
                <div className="p-5 rounded-2xl bg-[#183B2B] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#A7D4B5] mb-1">
                      7. Suggested Growth Challenge
                    </div>
                    <h4 className="font-serif text-lg font-bold">{selectedSituation.activity.title}</h4>
                    <p className="text-xs text-white/80 mt-1 max-w-md">{selectedSituation.activity.description}</p>
                  </div>

                  <button
                    onClick={() => {
                      setIsAssignModalOpen(true);
                      setNewAssignmentData((prev) => ({
                        ...prev,
                        parentNote: `Suggested from ${selectedSituation.title} guide.`
                      }));
                    }}
                    className="px-5 py-2.5 rounded-full text-xs font-bold text-[#183B2B] bg-white hover:bg-[#FBF9F5] shadow-xs transition-all cursor-pointer shrink-0"
                  >
                    Assign to {activeStudent.name.split(' ')[0]} →
                  </button>
                </div>

                {/* 8. When Professional Help May Be Appropriate */}
                <div className="p-4 rounded-2xl bg-[#F0ECE1] border border-[#E0DACE] text-xs text-[#4B554E] flex items-start gap-3">
                  <HelpCircle className="w-4 h-4 text-[#183B2B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#18221D]">8. When Professional Support is Appropriate:</strong>{' '}
                    <span>{selectedSituation.professionalHelp}</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            MODULE 5: ACTIVITIES & ASSIGNMENTS
            ══════════════════════════════════════════════════════════ */}
        {activeTab === 'assignments' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#183B2B]">
                  Actionable Personal Development
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#18221D]">
                  Assignments & <span className="italic text-[#234A36]">Growth Activities</span>
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-[#4B554E] max-w-2xl leading-relaxed">
                  Browse evidence-based growth activities, assign them with supportive notes, and review student reflections.
                </p>
              </div>

              <button
                onClick={() => setIsAssignModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#183B2B] hover:bg-[#112D20] shadow-xs transition-all cursor-pointer w-fit"
              >
                <Plus className="w-4 h-4" />
                <span>Assign New Activity</span>
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {['All', 'Assigned', 'In Progress', 'Needs Review', 'Completed'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setAssignmentFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    assignmentFilter === filter
                      ? 'bg-[#183B2B] text-white shadow-xs'
                      : 'bg-[#F0ECE1] text-[#4B554E] hover:bg-[#E5E0D5]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Active Assignments List */}
            <div className="space-y-4">
              {assignments
                .filter((a) => assignmentFilter === 'All' || a.status === assignmentFilter)
                .map((asg) => (
                  <div
                    key={asg.id}
                    className="rounded-[28px] bg-white border border-[#E8E4DA] p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B735F] bg-[#E2EBE5] px-2.5 py-0.5 rounded-md">
                          {asg.track}
                        </span>
                        <span className="text-xs font-semibold text-[#18221D]">
                          Student: {asg.studentName}
                        </span>
                        <span className="text-xs text-[#5C665F]">
                          · Due: {asg.dueDate}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-[#18221D]">
                        {asg.title}
                      </h3>

                      <p className="text-xs text-[#5C665F] italic">
                        Parent Note: "{asg.parentNote}"
                      </p>

                      {asg.studentSubmission && (
                        <div className="mt-2 p-3 rounded-xl bg-[#FBF9F5] border border-[#E8E4DA] text-xs text-[#18221D]">
                          <strong className="text-[#183B2B]">Student Reflection:</strong> "{asg.studentSubmission}"
                        </div>
                      )}

                      {asg.parentFeedback && (
                        <div className="mt-1 p-2.5 rounded-xl bg-[#E2EBE5] border border-[#183B2B]/20 text-xs text-[#183B2B]">
                          <strong>Your Feedback:</strong> "{asg.parentFeedback}"
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {asg.status === 'Needs Review' ? (
                        <button
                          onClick={() => {
                            setReviewModalData(asg);
                            setFeedbackInput('');
                          }}
                          className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#183B2B] hover:bg-[#112D20] shadow-xs transition-all cursor-pointer"
                        >
                          Review & Send Praise →
                        </button>
                      ) : (
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                          asg.status === 'Completed' ? 'bg-[#E2EBE5] text-[#183B2B]' : 'bg-[#F0ECE1] text-[#4B554E]'
                        }`}>
                          {asg.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            {/* Recommended Activity Catalog */}
            <div className="mt-12 pt-8 border-t border-[#E8E4DA]">
              <h2 className="font-serif text-2xl font-bold text-[#18221D] mb-4">
                Recommended Activities Library
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {sampleActivitiesCatalog.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-3xl bg-white border border-[#E8E4DA] p-6 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-2 text-[#5C665F]">
                        <span className="font-bold text-[#4B735F]">{item.category}</span>
                        <span>{item.estTime}</span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#18221D] mb-2">{item.title}</h3>
                      <p className="text-xs text-[#4B554E] leading-relaxed mb-4">{item.description}</p>
                    </div>

                    <button
                      onClick={() => {
                        setIsAssignModalOpen(true);
                        setNewAssignmentData((prev) => ({
                          ...prev,
                          activityId: item.id
                        }));
                      }}
                      className="w-full py-2 px-4 rounded-full text-xs font-bold text-[#183B2B] bg-[#E2EBE5] hover:bg-[#D4E4D8] transition-colors cursor-pointer text-center"
                    >
                      Assign This Activity →
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            MODULE 6: GROWTH REPORTS
            ══════════════════════════════════════════════════════════ */}
        {activeTab === 'reports' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#183B2B]">
                Quarterly & Monthly Progression
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#18221D]">
                Holistic <span className="italic text-[#234A36]">Growth Reports</span>
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-[#4B554E] max-w-2xl leading-relaxed">
                Objective trends tracking Leo’s development over 30, 60, and 90 days across core life skills.
              </p>
            </div>

            {/* Timeframe selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#18221D]">Report Window:</span>
              {['Last 30 Days', 'Last 60 Days', 'Last 90 Days'].map((t, i) => (
                <button
                  key={t}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    i === 0 ? 'bg-[#183B2B] text-white' : 'bg-[#F0ECE1] text-[#4B554E]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Report Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="rounded-3xl bg-white border border-[#E8E4DA] p-6 shadow-xs">
                <div className="text-xs font-bold text-[#4B735F] uppercase tracking-wider mb-1">
                  Consistency Metric
                </div>
                <div className="font-serif text-3xl font-bold text-[#18221D]">88%</div>
                <p className="text-xs text-[#5C665F] mt-1">
                  18 out of 21 targeted deep work sessions completed on schedule.
                </p>
                <div className="mt-4 pt-3 border-t border-[#F0ECE1] text-[11px] font-semibold text-[#183B2B]">
                  +8% improvement over previous month
                </div>
              </div>

              <div className="rounded-3xl bg-white border border-[#E8E4DA] p-6 shadow-xs">
                <div className="text-xs font-bold text-[#4B735F] uppercase tracking-wider mb-1">
                  Self-Reflection Entries
                </div>
                <div className="font-serif text-3xl font-bold text-[#18221D]">24 Entries</div>
                <p className="text-xs text-[#5C665F] mt-1">
                  Regular emotional awareness logs and stress grounding check-ins.
                </p>
                <div className="mt-4 pt-3 border-t border-[#F0ECE1] text-[11px] font-semibold text-[#183B2B]">
                  Encrypted & private to student
                </div>
              </div>

              <div className="rounded-3xl bg-white border border-[#E8E4DA] p-6 shadow-xs">
                <div className="text-xs font-bold text-[#4B735F] uppercase tracking-wider mb-1">
                  Family Shared Milestone
                </div>
                <div className="font-serif text-3xl font-bold text-[#18221D]">3 Quests</div>
                <p className="text-xs text-[#5C665F] mt-1">
                  Parent-assigned challenges completed with permitted reflection review.
                </p>
                <div className="mt-4 pt-3 border-t border-[#F0ECE1] text-[11px] font-semibold text-[#183B2B]">
                  High mutual satisfaction
                </div>
              </div>

            </div>

            {/* Milestone Badges Achieved */}
            <div className="rounded-[32px] bg-white border border-[#E8E4DA] p-7 shadow-xs">
              <h2 className="font-serif text-xl font-bold text-[#18221D] mb-4">
                Milestones & Badges Achieved
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { title: 'Consistency Champion', desc: 'Maintained 7 consecutive days of self-reflection.', icon: Award },
                  { title: 'Deep Work Pioneer', desc: 'Completed 10 Pomodoro sprints with zero digital interruption.', icon: Target },
                  { title: 'Self-Advocate Voice', desc: 'Successfully engaged in group debate and asked clarifying questions.', icon: MessageCircle }
                ].map((b, i) => {
                  const BIcon = b.icon;
                  return (
                    <div key={i} className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA] flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#E2EBE5] text-[#183B2B] flex items-center justify-center shrink-0">
                        <BIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#18221D]">{b.title}</h3>
                        <p className="text-xs text-[#5C665F] mt-0.5 leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            MODULE 7: PARENT SELF-GROWTH
            ══════════════════════════════════════════════════════════ */}
        {activeTab === 'self_growth' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#183B2B]">
                Parenting As An Evolving Practice
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#18221D]">
                My Parenting <span className="italic text-[#234A36]">Growth & Reflections</span>
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-[#4B554E] max-w-2xl leading-relaxed">
                As young adults transition into independence, parenting shifts from supervision to mentorship.
                Reflect on your communication habits and personal goals.
              </p>
            </div>

            {/* Weekly Reflection Prompt */}
            <div className="rounded-[32px] bg-white border border-[#E8E4DA] p-7 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-[#183B2B]" />
                <h2 className="font-serif text-xl font-bold text-[#18221D]">
                  Weekly Parent Self-Reflection Prompt
                </h2>
              </div>
              <p className="text-xs text-[#5C665F] mb-4">
                "Think of a conversation this week where you felt an urge to give advice. Did you listen first, or did you immediately solve?"
              </p>

              <textarea
                rows={3}
                value={parentReflectionText}
                onChange={(e) => {
                  setParentReflectionText(e.target.value);
                  setParentReflectionSaved(false);
                }}
                className="w-full p-4 rounded-2xl bg-[#FBF9F5] border border-[#DCD6C8] text-xs sm:text-sm text-[#18221D] focus:outline-none focus:border-[#183B2B]"
              />

              <div className="mt-3 flex items-center justify-between">
                <span className="text-[11px] text-[#5C665F]">Private to your personal parent profile.</span>
                <button
                  type="button"
                  onClick={() => setParentReflectionSaved(true)}
                  className="px-5 py-2 rounded-full text-xs font-bold text-white bg-[#183B2B] hover:bg-[#112D20] transition-colors cursor-pointer"
                >
                  {parentReflectionSaved ? 'Saved ✓' : 'Save Reflection'}
                </button>
              </div>
            </div>

            {/* Parenting Goals Tracker */}
            <div className="rounded-[32px] bg-white border border-[#E8E4DA] p-7 shadow-xs">
              <h2 className="font-serif text-xl font-bold text-[#18221D] mb-4">
                Personal Parenting Goals
              </h2>
              <div className="space-y-3">
                {parentGoals.map((g) => (
                  <div
                    key={g.id}
                    className="p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA] flex items-center justify-between gap-3 text-xs sm:text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center ${
                        g.completed ? 'bg-[#183B2B] text-white' : 'border border-[#DCD6C8]'
                      }`}>
                        {g.completed && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className={g.completed ? 'text-[#18221D] font-medium' : 'text-[#4B554E]'}>
                        {g.text}
                      </span>
                    </div>

                    {typeof g.completed === 'number' && (
                      <span className="text-[11px] font-bold text-[#183B2B] bg-[#E2EBE5] px-2.5 py-0.5 rounded-full">
                        {g.completed}/{g.target} conversations
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Positive Parenting Micro-Modules */}
            <div className="rounded-[32px] bg-[#E2EBE5]/60 border border-[#183B2B]/15 p-7">
              <h2 className="font-serif text-xl font-bold text-[#18221D] mb-2">
                Positive Parenting Micro-Guides (3–5 Min Reads)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {[
                  { title: 'Manager to Consultant', desc: 'How to gracefully step back from managing daily homework to serving as a trusted advisor for young adults.' },
                  { title: 'De-escalating Academic Anxiety', desc: 'Words that actually calm a panicked teenager vs. phrases that accidentally fuel perfectionist terror.' },
                  { title: 'Healthy Separation', desc: 'Supporting university readiness while maintaining strong, warm attachment.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-[#E8E4DA] text-xs">
                    <h3 className="font-serif text-base font-bold text-[#18221D] mb-1">{item.title}</h3>
                    <p className="text-[#5C665F] leading-relaxed mb-3">{item.desc}</p>
                    <span className="text-[#183B2B] font-bold hover:underline cursor-pointer">
                      Read Guide →
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            MODULE 8: PRIVACY & SETTINGS
            ══════════════════════════════════════════════════════════ */}
        {activeTab === 'settings' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#183B2B]">
                Safeguards & Consent Architecture
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#18221D]">
                Privacy & <span className="italic text-[#234A36]">Family Settings</span>
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-[#4B554E] max-w-2xl leading-relaxed">
                HighOrbit enforces strict age-appropriate boundaries between parental support and student personal autonomy.
              </p>
            </div>

            {/* Strict Media Restrictions Declaration */}
            <div className="rounded-[32px] bg-white border border-[#E8E4DA] p-7 shadow-xs">
              <div className="flex items-center gap-2.5 text-[#183B2B] mb-2">
                <ShieldAlert className="w-5 h-5 text-[#183B2B]" />
                <h2 className="font-serif text-xl font-bold text-[#18221D]">
                  Zero Camera & Image-Upload Guarantee
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#4B554E] leading-relaxed">
                As per HighOrbit's strict privacy standard, our platform forbids camera access, photo uploads, or facial scans anywhere across student or parent portals. All profiles are represented purely through typography, initials, and safe SVG indicators.
              </p>
            </div>

            {/* Age-Specific Governance Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="rounded-[32px] bg-white border border-[#E8E4DA] p-6 shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#183B2B] bg-[#E2EBE5] px-2.5 py-0.5 rounded-full">
                  Ages 15–17 (Leo, 17)
                </span>
                <h3 className="font-serif text-lg font-bold text-[#18221D] mt-2 mb-2">
                  Collaborative Minor Protocol
                </h3>
                <ul className="space-y-2 text-xs text-[#5C665F]">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#183B2B] shrink-0 mt-0.5" />
                    <span>Parent views habit consistency scores, quest completion, and assigned activity reviews.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#183B2B] shrink-0 mt-0.5" />
                    <span>Student maintains a private, encrypted reflection journal hidden from parents.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-[32px] bg-white border border-[#E8E4DA] p-6 shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full">
                  Ages 18–25 (Maya, 19)
                </span>
                <h3 className="font-serif text-lg font-bold text-[#18221D] mt-2 mb-2">
                  Adult Explicit Consent Protocol
                </h3>
                <ul className="space-y-2 text-xs text-[#5C665F]">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5" />
                    <span>Parent can only view updates explicitly marked "Share with Parent" by the student.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5" />
                    <span>Full adult confidentiality enforced under international data protection laws.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Notification Preferences */}
            <div className="rounded-[32px] bg-white border border-[#E8E4DA] p-7 shadow-xs">
              <h2 className="font-serif text-xl font-bold text-[#18221D] mb-4">
                Parent Notification Preferences
              </h2>
              <div className="space-y-3 text-xs sm:text-sm">
                {[
                  { label: 'Weekly Growth Summary Email', desc: 'Sent every Sunday with positive milestones and habit consistency.' },
                  { label: 'Activity Submission Alerts', desc: 'Notify immediately when Leo or Maya submits an assigned activity.' },
                  { label: 'Parenting Guide Recommendation Alerts', desc: 'Subtle tips when student check-in suggests pre-exam stress.' }
                ].map((item, idx) => (
                  <label key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA] cursor-pointer">
                    <div>
                      <div className="font-semibold text-[#18221D]">{item.label}</div>
                      <div className="text-[11px] text-[#5C665F]">{item.desc}</div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#183B2B] accent-[#183B2B] cursor-pointer" />
                  </label>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ────────────────── MODAL: ASSIGN ACTIVITY ────────────────── */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18221D]/50 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg rounded-[32px] bg-white border border-[#E8E4DA] p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-4">
              <h3 className="font-serif text-2xl font-bold text-[#18221D]">
                Assign Growth Activity
              </h3>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="p-1 rounded-full text-[#5C665F] hover:bg-[#F0ECE1] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-[#18221D] mb-1">Select Activity</label>
                <select
                  value={newAssignmentData.activityId}
                  onChange={(e) => setNewAssignmentData({ ...newAssignmentData, activityId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#DCD6C8] text-[#18221D] focus:outline-none focus:border-[#183B2B]"
                >
                  {sampleActivitiesCatalog.map((act) => (
                    <option key={act.id} value={act.id}>
                      {act.title} ({act.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#18221D] mb-1">Assign To</label>
                <select
                  value={newAssignmentData.studentId}
                  onChange={(e) => setNewAssignmentData({ ...newAssignmentData, studentId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#DCD6C8] text-[#18221D] focus:outline-none focus:border-[#183B2B]"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.age} yrs)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#18221D] mb-1">Target Due Date</label>
                <input
                  type="date"
                  value={newAssignmentData.dueDate}
                  onChange={(e) => setNewAssignmentData({ ...newAssignmentData, dueDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#DCD6C8] text-[#18221D] focus:outline-none focus:border-[#183B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#18221D] mb-1">Supportive Parent Note</label>
                <textarea
                  rows={2}
                  value={newAssignmentData.parentNote}
                  onChange={(e) => setNewAssignmentData({ ...newAssignmentData, parentNote: e.target.value })}
                  placeholder="e.g. Proud of you for tackling this! Let's chat afterward."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#DCD6C8] text-[#18221D] focus:outline-none focus:border-[#183B2B]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#4B554E] bg-[#F0ECE1] hover:bg-[#E5E0D5] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#183B2B] hover:bg-[#112D20] transition-colors cursor-pointer shadow-xs"
                >
                  Confirm & Assign Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ────────────────── MODAL: REVIEW STUDENT SUBMISSION ────────────────── */}
      {reviewModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18221D]/50 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg rounded-[32px] bg-white border border-[#E8E4DA] p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B735F]">
                  Permitted Student Submission
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#18221D]">
                  {reviewModalData.title}
                </h3>
              </div>
              <button
                onClick={() => setReviewModalData(null)}
                className="p-1 rounded-full text-[#5C665F] hover:bg-[#F0ECE1] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA]">
                <div className="text-[11px] font-bold text-[#183B2B] mb-1">
                  Student's Shared Reflection ({reviewModalData.studentName}):
                </div>
                <p className="text-[#18221D] leading-relaxed italic">
                  "{reviewModalData.studentSubmission || 'Student marked this task complete and shared reflection notes.'}"
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#18221D] mb-1.5">
                  Send Encouraging Feedback:
                </label>
                <textarea
                  rows={3}
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  placeholder="e.g. That takes real courage, Leo! Proud of how you handled that."
                  className="w-full p-3.5 rounded-xl bg-[#FBF9F5] border border-[#DCD6C8] text-[#18221D] focus:outline-none focus:border-[#183B2B]"
                />
              </div>

              {/* Praise Reactions */}
              <div>
                <span className="text-xs text-[#5C665F] block mb-2 font-medium">Add a Quick Praise Sticker:</span>
                <div className="flex gap-2">
                  {['🌟 Proud of your courage!', '💪 Strong focus!', '💡 Thoughtful reflection!', '❤️ Loved reading this!'].map((sticker, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFeedbackInput((prev) => prev ? `${prev} ${sticker}` : sticker)}
                      className="px-2.5 py-1 rounded-full bg-[#E2EBE5] text-[#183B2B] text-[11px] font-bold hover:bg-[#D4E4D8] transition-colors cursor-pointer"
                    >
                      {sticker}
                    </button>
                  ))}
                </div>
              </div>

              {feedbackSentSuccess && (
                <div className="p-3 rounded-xl bg-[#E2EBE5] text-[#183B2B] font-bold text-xs flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4 text-[#183B2B]" />
                  <span>Feedback dispatched to {reviewModalData.studentName}!</span>
                </div>
              )}

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#F0ECE1]">
                <button
                  type="button"
                  onClick={() => setReviewModalData(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#4B554E] bg-[#F0ECE1] hover:bg-[#E5E0D5] transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSendFeedback}
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#183B2B] hover:bg-[#112D20] transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Praise & Complete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────── FOOTER ────────────────── */}
      <footer className="py-6 bg-[#F0ECE1] border-t border-[#E8E4DA] text-center text-xs text-[#5C665F]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© 2026 HighOrbit. Complete Parent & Student Growth Architecture.</span>
          <div className="flex gap-4">
            <span className="font-semibold text-[#183B2B]">Zero Camera Access Enforced</span>
            <span>·</span>
            <span>100% Student Privacy Protocol</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default ParentDashboardPage;
