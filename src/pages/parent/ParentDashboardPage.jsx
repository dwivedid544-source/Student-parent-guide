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
  ChevronLeft,
  ChevronDown,
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
  Filter,
  Menu,
  X,
  Phone,
  Mail,
  ExternalLink,
  PanelLeftClose,
  PanelLeftOpen,
  UserPlus,
  UserMinus,
  Trash2
} from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import { parentingGuideSituations, sampleActivitiesCatalog } from './parentGuideData';

export const ParentDashboardPage = () => {
  const navigate = useNavigate();
  const { parentAccount, logout } = useOnboarding();

  // Active navigation tab
  // 'overview' | 'my_child' | 'insights' | 'guide' | 'assignments' | 'reports' | 'self_growth' | 'settings'
  const [activeTab, setActiveTab] = useState('overview');

  // Sidebar Layout State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

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
  const activeStudent = students.find((s) => s.id === selectedStudentId) || students[0] || {
    id: 'student_1',
    name: 'Leo Jenkins',
    initials: 'LJ',
    age: 17,
    stage: 'High School Senior · College Prep',
    archetype: 'Strategic Thinker & Deep Researcher',
    strengths: [],
    interests: [],
    privacyMode: 'Age 17: Collaborative Parental Oversight',
    growthIndex: 88,
    questsCompleted: 14,
    totalQuests: 18,
    streakDays: 7
  };

  // Student Account Management State (Add & Unlink)
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [studentToUnlink, setStudentToUnlink] = useState(null);
  const [studentActionToast, setStudentActionToast] = useState(null);

  // New Student Form State
  const [newStudentForm, setNewStudentForm] = useState({
    name: '',
    age: '16',
    stage: 'High School Junior · 11th Grade',
    archetype: 'Curious Explorer & Creative Thinker',
    interests: 'Creative Writing, Digital Arts, Astronomy',
    pin: '1234'
  });

  // Handler: Add New Student
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudentForm.name.trim()) return;

    const initials = newStudentForm.name
      .trim()
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'ST';

    const newId = `student_${Date.now()}`;
    const interestsList = newStudentForm.interests
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const createdStudent = {
      id: newId,
      name: newStudentForm.name.trim(),
      initials,
      age: parseInt(newStudentForm.age, 10) || 16,
      stage: newStudentForm.stage.trim() || 'High School Junior',
      archetype: newStudentForm.archetype.trim() || 'Curious Explorer',
      strengths: [
        { name: 'Self-Reflection & Awareness', score: 88, status: 'Strength' },
        { name: 'Creative Expression', score: 86, status: 'Strength' },
        { name: 'Critical Reasoning', score: 82, status: 'High' },
        { name: 'Time Discipline', score: 72, status: 'Growth Focus' }
      ],
      interests: interestsList.length > 0 ? interestsList : ['Reading', 'Technology', 'Art'],
      privacyMode: parseInt(newStudentForm.age, 10) >= 18
        ? 'Age 18+: Adult Student Explicit-Consent Protocol Active'
        : 'Age 15–17: Collaborative Family Oversight with Encrypted Student Diary',
      growthIndex: 84,
      questsCompleted: 3,
      totalQuests: 14,
      streakDays: 2
    };

    setStudents((prev) => [...prev, createdStudent]);
    setSelectedStudentId(newId);
    setIsAddStudentModalOpen(false);
    setNewStudentForm({
      name: '',
      age: '16',
      stage: 'High School Junior · 11th Grade',
      archetype: 'Curious Explorer & Creative Thinker',
      interests: 'Creative Writing, Digital Arts, Astronomy',
      pin: '1234'
    });

    setStudentActionToast(`🎉 ${createdStudent.name} successfully linked to your Parent Portal!`);
    setTimeout(() => setStudentActionToast(null), 3500);
  };

  // Handler: Unlink Existing Student
  const handleConfirmUnlinkStudent = () => {
    if (!studentToUnlink) return;
    if (students.length <= 1) {
      alert('You must have at least one linked student in your Parent Portal.');
      setStudentToUnlink(null);
      return;
    }

    const unlinkedName = studentToUnlink.name;
    const remaining = students.filter((s) => s.id !== studentToUnlink.id);
    setStudents(remaining);

    // If active student was unlinked, fallback to first remaining student
    if (selectedStudentId === studentToUnlink.id) {
      setSelectedStudentId(remaining[0].id);
    }

    setStudentToUnlink(null);
    setStudentActionToast(`ℹ️ ${unlinkedName} has been unlinked from this portal.`);
    setTimeout(() => setStudentActionToast(null), 3500);
  };

  // Active situation in Parenting Guide
  const [selectedSituationId, setSelectedSituationId] = useState('confidence');
  const [guideCategoryFilter, setGuideCategoryFilter] = useState('All');
  const [guideSearchTerm, setGuideSearchTerm] = useState('');

  // Parent Observations Logger State
  const [parentObservations, setParentObservations] = useState([
    {
      id: 'obs_1',
      studentId: 'student_1',
      category: 'Focus & Time',
      observation: 'Leo completed his college essay outline on Sunday evening without needing any reminders.',
      date: 'Yesterday, 8:40 PM',
      source: 'Parent Observation'
    },
    {
      id: 'obs_2',
      studentId: 'student_1',
      category: 'Communication',
      observation: 'He openly expressed feeling overwhelmed about the debate finals and asked for a 20-min brainstorming walk.',
      date: 'Oct 28, 2026',
      source: 'Parent Observation'
    }
  ]);
  const [newObservationText, setNewObservationText] = useState('');
  const [observationCategory, setObservationCategory] = useState('Focus & Time');

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
      assignedDate: 'Oct 27, 2026',
      parentNote: 'Proud of you for working on this! Let’s do a quick coffee chat once you finish.',
      studentSubmission: 'I recorded a 3-minute voice reflection on why public speaking makes me freeze, and identified that practicing the opening sentence 3 times beforehand reduces my heart rate by half.',
      parentFeedback: ''
    },
    {
      id: 'asg_2',
      studentId: 'student_1',
      studentName: 'Leo Jenkins',
      title: 'Digital Sunset Challenge',
      track: 'Focus & Deep Work',
      status: 'In Progress',
      dueDate: 'Nov 3, 2026',
      assignedDate: 'Oct 29, 2026',
      parentNote: 'Let’s both park our phones by 10:30 PM this entire week.',
      studentSubmission: null,
      parentFeedback: ''
    },
    {
      id: 'asg_3',
      studentId: 'student_1',
      studentName: 'Leo Jenkins',
      title: 'Weekly Values Alignment Check',
      track: 'Personal Responsibility',
      status: 'Completed',
      dueDate: 'Completed Oct 25',
      assignedDate: 'Oct 21, 2026',
      parentNote: 'Great job staying grounded during midterms week.',
      studentSubmission: 'Selected Honesty and Curiosity as top priorities this week. Declined a Friday party to finish group biology project.',
      parentFeedback: 'Loved seeing your self-discipline here. You handled the team deadline like a true leader!'
    },
    {
      id: 'asg_4',
      studentId: 'student_2',
      studentName: 'Maya Jenkins',
      title: 'Independent Budget & Grocery Matrix',
      track: 'Life Skills & Independence',
      status: 'Needs Review',
      dueDate: 'Nov 1, 2026',
      assignedDate: 'Oct 28, 2026',
      parentNote: 'Here is the spreadsheet challenge we discussed for apartment planning.',
      studentSubmission: 'Built a 30-day budget allocating rent, groceries ($85/wk), and train transit pass. Found that cooking batch curries saves $45/week.',
      parentFeedback: ''
    }
  ]);

  // Modal States
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [newAssignmentData, setNewAssignmentData] = useState({
    activityId: sampleActivitiesCatalog[0]?.id || 'act_1',
    studentId: 'student_1',
    dueDate: '2026-11-08',
    parentNote: 'Take your time with this reflection. Looking forward to discussing it over dinner.'
  });

  const [reviewModalData, setReviewModalData] = useState(null);
  const [feedbackInput, setFeedbackInput] = useState('');
  const [feedbackSentSuccess, setFeedbackSentSuccess] = useState(false);

  // Growth Reports Timeframe
  const [growthTimeframe, setGrowthTimeframe] = useState('30d'); // '30d' | '60d' | '90d'

  // Parent Self-Growth Goals
  const [parentGoals, setParentGoals] = useState([
    { id: 'pg_1', text: 'Listen 2 minutes without offering unsolicited fixes or advice', completed: true },
    { id: 'pg_2', text: 'Acknowledge teen effort and emotional courage before discussing grades', completed: true },
    { id: 'pg_3', text: 'Maintain weekly Sunday calm check-in with zero device distractions', completed: true },
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

  // Navigation Items
  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Compass },
    { id: 'my_child', label: 'My Child', icon: User },
    { id: 'insights', label: 'Behaviour Insights', icon: TrendingUp },
    { id: 'guide', label: 'Parenting Guide', icon: BookOpen },
    { id: 'assignments', label: 'Assignments & Activities', icon: Target },
    { id: 'reports', label: 'Growth Reports', icon: BarChart3 },
    { id: 'self_growth', label: 'Parent Self-Growth', icon: Heart },
  ];

  const handleSelectNav = (tabId) => {
    setActiveTab(tabId);
    setIsMobileDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#18221D] font-sans selection:bg-[#194333] selection:text-white flex flex-col lg:flex-row relative">
      
      {/* ────────────────── AMBIENT GLASS GRADIENT ACCENTS ────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-[#DCE8DE]/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[36rem] h-[36rem] bg-[#EDEDE5]/60 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 w-[38rem] h-[38rem] bg-[#E2EBE5]/40 rounded-full blur-3xl" />
      </div>

      {/* ────────────────── MOBILE TOP BAR ────────────────── */}
      <header className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-[#E8E4DA]/80 px-4 py-3 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(true)}
            className="p-2 rounded-xl bg-white/80 border border-[#E8E4DA] text-[#18221D] hover:bg-white transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#183B2B] text-white flex items-center justify-center shadow-xs">
              <Compass className="w-4 h-4 text-[#DCE8DE]" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-[#18221D]">
              HighOrbit
            </span>
          </Link>
        </div>

        {/* Mobile Student Switcher Pill */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#F0ECE1] border border-[#E0DACE] rounded-full p-0.5 text-xs font-semibold">
            {students.map((std) => (
              <button
                key={std.id}
                onClick={() => setSelectedStudentId(std.id)}
                className={`px-2.5 py-1 rounded-full transition-all text-[11px] ${
                  selectedStudentId === std.id
                    ? 'bg-[#183B2B] text-white font-bold shadow-2xs'
                    : 'text-[#4B554E]'
                }`}
              >
                {std.initials}
              </button>
            ))}
          </div>

          <div className="w-8 h-8 rounded-full bg-[#183B2B] text-white flex items-center justify-center font-serif font-bold text-xs">
            SJ
          </div>
        </div>
      </header>

      {/* ────────────────── MOBILE SLIDE-OUT DRAWER ────────────────── */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileDrawerOpen(false)}
            className="fixed inset-0 bg-[#18221D]/30 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Content */}
          <aside className="fixed inset-y-0 left-0 w-72 bg-[#FBF9F5]/95 backdrop-blur-2xl border-r border-white/80 p-5 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DA]/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#183B2B] text-white flex items-center justify-center shadow-xs">
                    <Compass className="w-4 h-4 text-[#DCE8DE]" />
                  </div>
                  <div>
                    <span className="font-serif text-lg font-bold text-[#18221D] block leading-tight">
                      HighOrbit
                    </span>
                    <span className="text-[10px] font-bold text-[#183B2B] tracking-wider uppercase">
                      Parent Portal
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-1.5 rounded-full hover:bg-black/5 text-[#5C665F]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Student Context */}
              <div className="my-4 p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 shadow-2xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-[#53675D] uppercase tracking-wider">
                    Active Student ({students.length})
                  </span>
                  <button
                    onClick={() => {
                      setIsMobileDrawerOpen(false);
                      setIsAddStudentModalOpen(true);
                    }}
                    className="text-[10px] font-bold text-[#183B2B] bg-[#E2EBE5] px-2 py-0.5 rounded-full flex items-center gap-0.5 cursor-pointer"
                  >
                    <Plus className="w-2.5 h-2.5" />
                    <span>Add</span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#183B2B] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                      {activeStudent.initials}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#18221D] leading-tight">
                        {activeStudent.name}
                      </h4>
                      <span className="text-[11px] text-[#4B735F] font-medium">
                        {activeStudent.age} yrs · Senior
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sibling Quick Switcher in Mobile Drawer */}
                <div className="mt-2.5 pt-2 border-t border-[#E8E4DA]/80 flex items-center gap-1 flex-wrap">
                  {students.map((std) => (
                    <button
                      key={std.id}
                      onClick={() => setSelectedStudentId(std.id)}
                      className={`text-[11px] font-bold px-2 py-1 rounded-lg transition-all cursor-pointer ${
                        selectedStudentId === std.id
                          ? 'bg-[#183B2B] text-white'
                          : 'bg-white/80 text-[#4B554E]'
                      }`}
                    >
                      {std.name.split(' ')[0]} ({std.age})
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation List */}
              <nav className="space-y-1.5">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectNav(item.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-all text-left ${
                        isActive
                          ? 'bg-[#183B2B] text-white shadow-sm'
                          : 'text-[#4B554E] hover:text-[#18221D] hover:bg-white/60'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#DCE8DE]' : 'text-[#4B735F]'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Drawer Bottom */}
            <div className="pt-4 border-t border-[#E8E4DA]/80 space-y-1.5">
              <button
                onClick={() => handleSelectNav('settings')}
                className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold ${
                  activeTab === 'settings' ? 'bg-[#183B2B] text-white' : 'text-[#4B554E] hover:bg-white/60'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Privacy & Settings</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileDrawerOpen(false);
                  setIsHelpModalOpen(true);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#4B554E] hover:bg-white/60"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Help & Support</span>
              </button>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#183B2B] text-white flex items-center justify-center font-bold text-xs">
                    SJ
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#18221D]">Sarah Jenkins</div>
                    <div className="text-[10px] text-[#53675D]">Parent Account</div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* ────────────────── DESKTOP PERSISTENT VERTICAL SIDEBAR (FIXED) ────────────────── */}
      <aside
        className={`fixed top-0 left-0 bottom-0 h-screen z-30 hidden lg:flex flex-col justify-between bg-white/80 backdrop-blur-2xl border-r border-white/90 shadow-[4px_0_24px_rgba(25,67,51,0.03)] shrink-0 transition-all duration-300 ease-in-out select-none ${
          isSidebarCollapsed ? 'w-20 px-3 py-5' : 'w-72 p-5'
        }`}
      >
        {/* Top Segment: Brand, Student Context, Main Nav */}
        <div className="space-y-4 overflow-y-auto no-scrollbar flex-1 pr-0.5">
          
          {/* Brand Header */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-full bg-[#183B2B] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0">
                <Compass className="w-5 h-5 text-[#DCE8DE]" />
              </div>

              {!isSidebarCollapsed && (
                <div className="animate-fadeIn">
                  <span className="font-serif text-xl font-bold tracking-tight text-[#18221D] block leading-tight">
                    HighOrbit
                  </span>
                  <span className="text-[10px] font-bold text-[#183B2B] tracking-wider uppercase">
                    Parent Portal
                  </span>
                </div>
              )}
            </Link>

            {/* Sidebar Collapse Toggle */}
            <button
              type="button"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1.5 rounded-xl text-[#5C665F] hover:text-[#18221D] hover:bg-white/80 border border-transparent hover:border-[#E8E4DA] transition-all cursor-pointer"
              title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              aria-label={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isSidebarCollapsed ? (
                <PanelLeftOpen className="w-4 h-4 text-[#183B2B]" />
              ) : (
                <PanelLeftClose className="w-4 h-4 text-[#5C665F]" />
              )}
            </button>
          </div>

          {/* Student Context Card */}
          {!isSidebarCollapsed ? (
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-white/90 to-[#FAF8F4]/80 backdrop-blur-md border border-white/90 shadow-2xs animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-[#53675D] uppercase tracking-wider">
                  Active Student
                </span>
                <button
                  type="button"
                  onClick={() => setIsAddStudentModalOpen(true)}
                  className="text-[10px] font-bold text-[#183B2B] bg-[#E2EBE5] hover:bg-[#D4E2D8] px-2 py-0.5 rounded-full flex items-center gap-1 transition-colors cursor-pointer"
                  title="Link a new child / student"
                >
                  <Plus className="w-2.5 h-2.5" />
                  <span>Linked ({students.length})</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#183B2B] text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                  {activeStudent.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-[#18221D] truncate">
                    {activeStudent.name}
                  </h4>
                  <p className="text-xs text-[#4B735F] truncate">
                    {activeStudent.age} yrs · Senior
                  </p>
                </div>
              </div>

              {/* Sibling Quick Switcher Pills + Add button */}
              <div className="mt-3 pt-2.5 border-t border-[#E8E4DA]/80 flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] text-[#5C665F] font-medium mr-1">Switch:</span>
                {students.map((std) => (
                  <button
                    key={std.id}
                    onClick={() => setSelectedStudentId(std.id)}
                    className={`py-1 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedStudentId === std.id
                        ? 'bg-[#183B2B] text-white shadow-2xs font-bold'
                        : 'bg-white/60 hover:bg-white text-[#4B554E] border border-[#E8E4DA]'
                    }`}
                  >
                    {std.name.split(' ')[0]} ({std.age})
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setIsAddStudentModalOpen(true)}
                  className="py-1 px-2 rounded-lg text-xs font-bold text-[#183B2B] bg-[#E2EBE5] hover:bg-[#D4E2D8] border border-[#183B2B]/20 flex items-center gap-1 transition-all cursor-pointer"
                  title="Add another student"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          ) : (
            /* Collapsed Student Avatar */
            <div className="flex justify-center my-1 relative group">
              <button
                type="button"
                onClick={() => setSelectedStudentId(selectedStudentId === 'student_1' ? 'student_2' : 'student_1')}
                className="w-10 h-10 rounded-full bg-[#183B2B] text-white flex items-center justify-center font-bold text-xs shadow-2xs border-2 border-white cursor-pointer hover:scale-105 transition-transform"
                title={`Active: ${activeStudent.name}. Click to switch student.`}
              >
                {activeStudent.initials}
              </button>
            </div>
          )}

          {/* Main Navigation List */}
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isSidebarCollapsed ? 'justify-center px-2' : 'px-3.5'
                    } ${
                      isActive
                        ? 'bg-[#183B2B] text-white shadow-sm font-bold border border-white/20'
                        : 'text-[#4B554E] hover:text-[#18221D] hover:bg-white/70'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#DCE8DE]' : 'text-[#4B735F]'}`} />
                    {!isSidebarCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </button>

                  {/* Tooltip when collapsed */}
                  {isSidebarCollapsed && (
                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#18221D] text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg z-50">
                      {item.label}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

        </div>

        {/* Bottom Navigation Segment */}
        <div className="pt-4 border-t border-[#E8E4DA]/80 space-y-1.5">
          
          {/* Privacy & Settings */}
          <div className="relative group">
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isSidebarCollapsed ? 'justify-center px-2' : 'px-3.5'
              } ${
                activeTab === 'settings'
                  ? 'bg-[#183B2B] text-white shadow-sm font-bold'
                  : 'text-[#4B554E] hover:text-[#18221D] hover:bg-white/70'
              }`}
            >
              <Sliders className="w-4 h-4 shrink-0 text-[#4B735F]" />
              {!isSidebarCollapsed && <span>Privacy & Settings</span>}
            </button>
            {isSidebarCollapsed && (
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#18221D] text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg z-50">
                Privacy & Settings
              </div>
            )}
          </div>

          {/* Help & Support Button */}
          <div className="relative group">
            <button
              onClick={() => setIsHelpModalOpen(true)}
              className={`w-full flex items-center gap-3 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-[#4B554E] hover:text-[#18221D] hover:bg-white/70 transition-all cursor-pointer ${
                isSidebarCollapsed ? 'justify-center px-2' : 'px-3.5'
              }`}
            >
              <HelpCircle className="w-4 h-4 shrink-0 text-[#4B735F]" />
              {!isSidebarCollapsed && <span>Help & Support</span>}
            </button>
            {isSidebarCollapsed && (
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#18221D] text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg z-50">
                Help & Support
              </div>
            )}
          </div>

          {/* Parent Profile & Logout Tile */}
          {!isSidebarCollapsed ? (
            <div className="p-2.5 mt-2 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#183B2B] text-white flex items-center justify-center font-serif font-bold text-xs shrink-0">
                  SJ
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#18221D] truncate">
                    {parentAccount?.name || 'Sarah Jenkins'}
                  </div>
                  <div className="text-[10px] text-[#53675D] truncate">
                    Parent Account
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-1.5 text-[#5C665F] hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex justify-center pt-2">
              <button
                onClick={handleLogout}
                className="p-2.5 text-[#5C665F] hover:text-red-700 hover:bg-red-50 rounded-2xl transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </aside>

      {/* ────────────────── MAIN CONTENT AREA ────────────────── */}
      <div className={`flex-1 flex flex-col min-w-0 min-h-screen relative z-10 transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'
      }`}>
        
        {/* Main Viewport Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* ══════════════════════════════════════════════════════════
            MODULE 1: PARENT OVERVIEW
            ══════════════════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Top Welcome Header - Premium Forest Green Glass */}
            <div className="rounded-[32px] bg-gradient-to-br from-[#183B2B] to-[#122D21] text-white p-7 sm:p-9 shadow-lg relative overflow-hidden border border-white/10">
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold uppercase tracking-wider mb-3 backdrop-blur-md border border-white/10">
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
                  <div className="px-4 py-2 rounded-2xl bg-white/10 border border-white/15 text-xs text-[#DCE8DE] backdrop-blur-md">
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
                
                {/* Pending & Completed Assignments Card - Frosted Glass Card */}
                <div className="rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/90 p-6 sm:p-7 shadow-[0_10px_30px_rgba(25,67,51,0.05)]">
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
                      className="text-xs font-bold text-[#183B2B] hover:underline cursor-pointer"
                    >
                      View All ({assignments.length}) →
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    {assignments.slice(0, 3).map((asg) => (
                      <div
                        key={asg.id}
                        className="p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-[#E8E4DA]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#183B2B]/40 hover:bg-white/80 transition-all shadow-2xs"
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

                {/* Recent Student Activity Stream - Frosted Glass Card */}
                <div className="rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/90 p-6 sm:p-7 shadow-[0_10px_30px_rgba(25,67,51,0.05)]">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#E2EBE5] text-[#183B2B] flex items-center justify-center">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <h2 className="font-serif text-xl font-bold text-[#18221D]">
                        Student-Shared Activity Log
                      </h2>
                    </div>
                    <span className="text-xs text-[#5C665F]">Consented Real-time Sync</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/50 border border-[#E8E4DA]/70">
                      <div className="w-8 h-8 rounded-full bg-[#E2EBE5] text-[#183B2B] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-[#5C665F]">Today, 2:15 PM · Self-Discovery Track</div>
                        <h4 className="text-sm font-bold text-[#18221D] mt-0.5">Completed "Strengths & Flow State Inventory"</h4>
                        <p className="text-xs text-[#4B554E] mt-1 leading-relaxed">
                          Leo identified <strong>Deep Work in Solitude</strong> and <strong>Systems Thinking</strong> as primary peak-energy triggers.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/50 border border-[#E8E4DA]/70">
                      <div className="w-8 h-8 rounded-full bg-[#E2EBE5] text-[#183B2B] flex items-center justify-center shrink-0 mt-0.5">
                        <Heart className="w-4 h-4 text-[#183B2B]" />
                      </div>
                      <div>
                        <div className="text-xs text-[#5C665F]">Yesterday, 9:30 PM · Daily Evening Reflection</div>
                        <h4 className="text-sm font-bold text-[#18221D] mt-0.5">Logged Gratitude & Stress Check</h4>
                        <p className="text-xs text-[#4B554E] mt-1 leading-relaxed">
                          Shared Mood: <strong>Calm & Focused (4/5)</strong>. Logged 25 minutes of classical guitar practice as a decompression ritual.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column (5 cols): Areas for Support & Recommended Actions */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Areas Where Support May Be Needed - Frosted Glass Card */}
                <div className="rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/90 p-6 sm:p-7 shadow-[0_10px_30px_rgba(25,67,51,0.05)]">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <h2 className="font-serif text-xl font-bold text-[#18221D]">
                      Areas Where Support May Be Needed
                    </h2>
                  </div>
                  <p className="text-xs text-[#5C665F] leading-relaxed mb-4">
                    Generated from student-shared reflection patterns and habit check-ins.
                  </p>

                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-amber-900">Late-Night Screen Boundaries</span>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">Trend</span>
                      </div>
                      <p className="text-xs text-amber-950/80 leading-relaxed">
                        Leo reported difficulty winding down after 11:30 PM on study nights. Consider establishing a non-punitive household "digital sunset".
                      </p>
                      <button
                        onClick={() => {
                          setActiveTab('guide');
                          setSelectedSituationId('stress');
                        }}
                        className="mt-2 text-xs font-bold text-[#183B2B] hover:underline block cursor-pointer"
                      >
                        Read Stress & Sleep Guide →
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/50 border border-[#E8E4DA]/80">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#18221D]">Public Speaking Hesitation</span>
                        <span className="text-[10px] font-bold text-[#4B735F] bg-[#E2EBE5] px-2 py-0.5 rounded-full">Opportunity</span>
                      </div>
                      <p className="text-xs text-[#5C665F] leading-relaxed">
                        Expressed reluctance about leading the upcoming youth forum. Recommended conversational encouragement rather than unsolicited advice.
                      </p>
                      <button
                        onClick={() => {
                          setActiveTab('guide');
                          setSelectedSituationId('confidence');
                        }}
                        className="mt-2 text-xs font-bold text-[#183B2B] hover:underline block cursor-pointer"
                      >
                        Explore Confidence Guide →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recommended Parent Action for Today - Frosted Glass Card */}
                <div className="rounded-[32px] bg-gradient-to-br from-[#E2EBE5]/90 to-[#DCE8DE]/70 backdrop-blur-xl border border-white/90 p-6 sm:p-7 shadow-[0_10px_30px_rgba(25,67,51,0.05)]">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#183B2B] mb-2">
                    <Sparkles className="w-4 h-4 text-[#183B2B]" />
                    <span>Recommended Action for Today</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#18221D]">
                    Ask an Open-Ended Curiosity Question
                  </h3>
                  <p className="text-xs sm:text-sm text-[#365142] mt-1.5 leading-relaxed">
                    Instead of asking <em>"Did you finish your applications?"</em>, try:
                  </p>
                  <blockquote className="mt-3 p-3.5 rounded-2xl bg-white/80 border border-white/90 font-serif text-xs sm:text-sm italic text-[#18221D]">
                    "What part of your project felt most intellectually exciting to work through today?"
                  </blockquote>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-[#4B554E]">Fosters autonomous motivation</span>
                    <button
                      onClick={() => setActiveTab('self_growth')}
                      className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[#183B2B] hover:bg-[#112D20] shadow-2xs transition-all cursor-pointer"
                    >
                      Log Practice
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            MODULE 2: MY CHILD (DETAILED PROFILE & PRIVACY)
            ══════════════════════════════════════════════════════════ */}
        {activeTab === 'my_child' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header & Sibling Switcher Card */}
            <div className="rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/90 p-7 sm:p-8 shadow-[0_10px_30px_rgba(25,67,51,0.05)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E4DA]/80">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2EBE5] text-[#183B2B] text-xs font-semibold mb-2">
                    <User className="w-3.5 h-3.5" />
                    <span>Linked Student Profile</span>
                  </div>
                  <h1 className="font-serif text-3xl font-bold text-[#18221D]">
                    {activeStudent.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-[#5C665F] mt-1">
                    {activeStudent.age} Years Old · {activeStudent.stage}
                  </p>
                </div>

                {/* Sibling Toggle Pills + Add Student + Unlink Student Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-[#F0ECE1] border border-[#E0DACE] p-1.5 rounded-2xl">
                    {students.map((std) => (
                      <button
                        key={std.id}
                        onClick={() => setSelectedStudentId(std.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedStudentId === std.id
                            ? 'bg-[#183B2B] text-white shadow-2xs'
                            : 'text-[#4B554E] hover:text-[#18221D]'
                        }`}
                      >
                        {std.name} ({std.age} yrs)
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAddStudentModalOpen(true)}
                    className="px-3.5 py-2 rounded-2xl text-xs font-bold text-white bg-[#183B2B] hover:bg-[#112D20] shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Add Child</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStudentToUnlink(activeStudent)}
                    disabled={students.length <= 1}
                    className={`px-3 py-2 rounded-2xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                      students.length <= 1
                        ? 'opacity-40 cursor-not-allowed border-gray-200 text-gray-400'
                        : 'border-rose-200 text-rose-700 hover:bg-rose-50 cursor-pointer'
                    }`}
                    title={students.length <= 1 ? 'At least one student must remain linked' : 'Unlink active student'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Unlink Profile</span>
                  </button>
                </div>
              </div>

              {/* Archetype & Core Identity */}
              <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA]">
                  <span className="text-[11px] font-bold text-[#5C665F] uppercase tracking-wider block mb-1">
                    Observed Growth Archetype
                  </span>
                  <div className="font-serif text-lg font-bold text-[#18221D]">
                    {activeStudent.archetype}
                  </div>
                  <p className="text-xs text-[#5C665F] mt-1.5 leading-relaxed">
                    Derives intrinsic motivation from mastery, logic rigor, and quiet deep reflection.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA]">
                  <span className="text-[11px] font-bold text-[#5C665F] uppercase tracking-wider block mb-1">
                    Declared Interests & Passions
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {activeStudent.interests.map((int) => (
                      <span
                        key={int}
                        className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white border border-[#DCD6C8] text-[#18221D]"
                      >
                        {int}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA]">
                  <span className="text-[11px] font-bold text-[#5C665F] uppercase tracking-wider block mb-1">
                    Privacy & Transparency Protocol
                  </span>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#183B2B] mt-1">
                    <ShieldCheck className="w-4 h-4 text-[#183B2B]" />
                    <span>Explicit Consent Active</span>
                  </div>
                  <p className="text-xs text-[#5C665F] mt-1.5 leading-relaxed">
                    {activeStudent.privacyMode}
                  </p>
                </div>
              </div>
            </div>

            {/* Strengths & Growth Areas Matrix */}
            <div className="rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/90 p-7 sm:p-8 shadow-[0_10px_30px_rgba(25,67,51,0.05)]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#18221D]">
                    Strengths & Development Dimensions
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C665F] mt-0.5">
                    Synthesized from completed activities, self-assessments, and parent observations.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#5C665F]">Zero psychometric labeling</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeStudent.strengths.map((st) => (
                  <div
                    key={st.name}
                    className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA] flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          st.status === 'Strength'
                            ? 'bg-[#E2EBE5] text-[#183B2B]'
                            : st.status === 'High'
                            ? 'bg-[#F0ECE1] text-[#4B554E]'
                            : 'bg-amber-100 text-amber-900'
                        }`}>
                          {st.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#18221D]">{st.name}</h4>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-24 bg-[#E8E4DA] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#183B2B] h-full rounded-full transition-all duration-500"
                          style={{ width: `${st.score}%` }}
                        />
                      </div>
                      <span className="font-serif text-sm font-bold text-[#18221D] w-8 text-right">
                        {st.score}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Absolute Media Restrictions Guarantee Card */}
            <div className="rounded-[32px] bg-[#183B2B] text-white p-7 sm:p-8 shadow-md relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl shrink-0">
                  <ShieldAlert className="w-6 h-6 text-[#A7D4B5]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold">
                    Safe & Transparent Environment Guarantee
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 mt-1 leading-relaxed max-w-2xl">
                    HighOrbit strictly enforces zero photo/image uploads, zero camera access, zero microphone access, and zero surveillance trackers. All student reflections remain their sovereign property.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            MODULE 3: BEHAVIOUR & DEVELOPMENT INSIGHTS
            ══════════════════════════════════════════════════════════ */}
        {activeTab === 'insights' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2EBE5] text-[#183B2B] text-xs font-semibold mb-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Transparent Developmental Metrics</span>
              </div>
              <h1 className="font-serif text-3xl font-bold text-[#18221D]">
                Behaviour & Development Insights
              </h1>
              <p className="text-xs sm:text-sm text-[#5C665F] mt-1 max-w-2xl leading-relaxed">
                Clear distinction between student-reported data, parent observations, and completed activities. No clinical diagnosis or surveillance.
              </p>
            </div>

            {/* Source Distinctions Legend */}
            <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 flex flex-wrap items-center gap-4 text-xs shadow-2xs">
              <span className="font-bold text-[#18221D]">Source Badges:</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2EBE5] text-[#183B2B] font-semibold border border-[#183B2B]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#183B2B]" />
                Student-Reported
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 font-semibold border border-blue-200">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                Parent Observation
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-800 font-semibold border border-purple-200">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                Activity Data
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                System Suggestion
              </span>
            </div>

            {/* 9 Pillars of Development Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: '1. Confidence', desc: 'Self-belief in academic voice and social environments.', score: 76, badge: 'Student-Reported', color: 'bg-[#E2EBE5] text-[#183B2B]' },
                { title: '2. Communication', desc: 'Active listening, asking for help, and expressing needs.', score: 70, badge: 'Activity Data', color: 'bg-purple-50 text-purple-800' },
                { title: '3. Emotional Awareness', desc: 'Identifying emotions, journaling, and staying grounded.', score: 84, badge: 'Student-Reported', color: 'bg-[#E2EBE5] text-[#183B2B]' },
                { title: '4. Focus & Attention', desc: 'Deep work habit consistency and screen boundary tracking.', score: 88, badge: 'Activity Data', color: 'bg-purple-50 text-purple-800' },
                { title: '5. Time Management', desc: 'Scheduling assignments and preparing ahead of deadlines.', score: 82, badge: 'Parent Observation', color: 'bg-blue-50 text-blue-800' },
                { title: '6. Decision-Making', desc: 'Evaluating trade-offs and handling university choices.', score: 74, badge: 'System Suggestion', color: 'bg-amber-50 text-amber-800' },
                { title: '7. Motivation', desc: 'Intrinsic drive vs extrinsic performance pressure.', score: 80, badge: 'Student-Reported', color: 'bg-[#E2EBE5] text-[#183B2B]' },
                { title: '8. Personal Responsibility', desc: 'Owning mistakes, team accountability, and follow-through.', score: 86, badge: 'Parent Observation', color: 'bg-blue-50 text-blue-800' },
                { title: '9. Strengths & Passions', desc: 'Time spent in flow state on organic personal interests.', score: 90, badge: 'Activity Data', color: 'bg-purple-50 text-purple-800' }
              ].map((pil) => (
                <div
                  key={pil.title}
                  className="p-5 rounded-[28px] bg-white/80 backdrop-blur-xl border border-white/90 shadow-2xs flex flex-col justify-between gap-4 hover:shadow-xs transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${pil.color}`}>
                        {pil.badge}
                      </span>
                      <span className="font-serif text-sm font-bold text-[#18221D]">{pil.score}%</span>
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#18221D]">{pil.title}</h3>
                    <p className="text-xs text-[#5C665F] mt-1 leading-relaxed">{pil.desc}</p>
                  </div>

                  <div className="w-full bg-[#E8E4DA] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#183B2B] h-full rounded-full" style={{ width: `${pil.score}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Parent Observation Logger (Interactive) */}
            <div className="rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/90 p-7 sm:p-8 shadow-[0_10px_30px_rgba(25,67,51,0.05)]">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#18221D]">
                    Record a Positive Parent Observation
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C665F] mt-0.5">
                    Log moments where you noticed effort, self-discipline, or emotional maturity. Kept safe in your family records.
                  </p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-[#E2EBE5] text-[#183B2B] flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newObservationText.trim()) return;
                  const newObs = {
                    id: `obs_${Date.now()}`,
                    studentId: activeStudent.id,
                    category: observationCategory,
                    observation: newObservationText.trim(),
                    date: 'Just now',
                    source: 'Parent Observation'
                  };
                  setParentObservations([newObs, ...parentObservations]);
                  setNewObservationText('');
                }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="sm:w-64">
                    <label className="text-xs font-semibold text-[#18221D] block mb-1">
                      Category Tag
                    </label>
                    <select
                      value={observationCategory}
                      onChange={(e) => setObservationCategory(e.target.value)}
                      className="w-full py-2.5 px-3.5 rounded-2xl bg-white/70 border border-[#DCD6C8] text-xs font-semibold text-[#18221D] focus:outline-none focus:border-[#183B2B]"
                    >
                      <option value="Focus & Time">Focus & Time</option>
                      <option value="Communication">Communication</option>
                      <option value="Confidence & Voice">Confidence & Voice</option>
                      <option value="Emotional Resilience">Emotional Resilience</option>
                      <option value="Personal Responsibility">Personal Responsibility</option>
                    </select>
                  </div>

                  <div className="flex-1">
                    <label className="text-xs font-semibold text-[#18221D] block mb-1">
                      Observation Note (Non-judgmental & Specific)
                    </label>
                    <input
                      type="text"
                      value={newObservationText}
                      onChange={(e) => setNewObservationText(e.target.value)}
                      placeholder="e.g. Leo spent 30 mins planning his revision calendar without being prompted."
                      className="w-full py-2.5 px-4 rounded-2xl bg-white/70 border border-[#DCD6C8] text-xs sm:text-sm text-[#18221D] focus:outline-none focus:border-[#183B2B]"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!newObservationText.trim()}
                    className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#183B2B] hover:bg-[#112D20] disabled:opacity-50 transition-all cursor-pointer shadow-xs"
                  >
                    Save Parent Observation
                  </button>
                </div>
              </form>

              {/* History of Observations */}
              <div className="mt-8 pt-6 border-t border-[#E8E4DA]/80 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5C665F] block">
                  Recent Recorded Observations ({parentObservations.length})
                </span>
                {parentObservations.map((obs) => (
                  <div
                    key={obs.id}
                    className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                          {obs.source}
                        </span>
                        <span className="text-xs font-semibold text-[#183B2B]">{obs.category}</span>
                        <span className="text-xs text-[#5C665F]">· {obs.date}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#18221D] leading-relaxed">{obs.observation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            MODULE 4: PARENTING GUIDE (ALL 10 SITUATIONS, 8 DIMS)
            ══════════════════════════════════════════════════════════ */}
        {activeTab === 'guide' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Guide Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2EBE5] text-[#183B2B] text-xs font-semibold mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Practical Psychology & Positive Guidance</span>
              </div>
              <h1 className="font-serif text-3xl font-bold text-[#18221D]">
                The HighOrbit Parenting Guide
              </h1>
              <p className="text-xs sm:text-sm text-[#5C665F] mt-1 max-w-2xl leading-relaxed">
                Evidence-based, respectful strategies for navigating common challenges with 15–25 year olds without lectures, friction, or guilt.
              </p>
            </div>

            {/* Filter Pills & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {['All', 'Confidence', 'Communication', 'Focus', 'Emotional Wellness', 'Discipline'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setGuideCategoryFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      guideCategoryFilter === cat
                        ? 'bg-[#183B2B] text-white shadow-2xs'
                        : 'bg-white/80 hover:bg-white text-[#4B554E] border border-[#E8E4DA]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-[#5C665F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={guideSearchTerm}
                  onChange={(e) => setGuideSearchTerm(e.target.value)}
                  placeholder="Search situations..."
                  className="w-full pl-9 pr-4 py-2 rounded-full bg-white/80 border border-[#E8E4DA] text-xs text-[#18221D] focus:outline-none focus:border-[#183B2B]"
                />
              </div>
            </div>

            {/* Situations Explorer Grid (Left List + Right Detailed 8 Dimensions) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Situation Selector List (4 cols) */}
              <div className="lg:col-span-4 space-y-3">
                {filteredSituations.map((sit) => {
                  const isSelected = sit.id === selectedSituation.id;
                  return (
                    <button
                      key={sit.id}
                      onClick={() => setSelectedSituationId(sit.id)}
                      className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col gap-1.5 ${
                        isSelected
                          ? 'bg-[#183B2B] text-white shadow-md border-[#183B2B]'
                          : 'bg-white/80 hover:bg-white border-[#E8E4DA] text-[#18221D]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                          isSelected ? 'text-[#A7D4B5]' : 'text-[#4B735F]'
                        }`}>
                          {sit.category}
                        </span>
                        <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#5C665F]'}`} />
                      </div>
                      <h3 className="font-serif text-base font-bold leading-tight">{sit.title}</h3>
                      <p className={`text-xs line-clamp-2 mt-0.5 leading-relaxed ${
                        isSelected ? 'text-white/80' : 'text-[#5C665F]'
                      }`}>
                        {sit.summary}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Detailed 8 Dimensions View (8 cols) */}
              <div className="lg:col-span-8 rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/90 p-7 sm:p-9 shadow-[0_10px_30px_rgba(25,67,51,0.05)] space-y-7">
                
                {/* Title & Category Banner */}
                <div className="border-b border-[#E8E4DA]/80 pb-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4B735F]">
                    {selectedSituation.category}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#18221D] mt-1">
                    {selectedSituation.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C665F] mt-2 leading-relaxed">
                    {selectedSituation.summary}
                  </p>
                </div>

                {/* 1. What You May Be Noticing */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#18221D] flex items-center gap-2 mb-3">
                    <Eye className="w-4 h-4 text-[#183B2B]" />
                    <span>1. What You May Be Noticing</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#4B554E] pl-2">
                    {(selectedSituation.noticing || selectedSituation.whatYouNotice || []).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#183B2B] mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Possible Reasons (Without Assumption) */}
                <div className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA]">
                  <h3 className="font-serif text-lg font-bold text-[#18221D] mb-3">
                    2. Possible Reasons (Presented without judgment)
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#4B554E]">
                    {(selectedSituation.reasons || selectedSituation.possibleReasons || []).map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#183B2B] font-bold">·</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Supportive Questions You Can Ask */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#18221D] flex items-center gap-2 mb-3">
                    <MessageCircle className="w-4 h-4 text-[#183B2B]" />
                    <span>3. Questions You Can Ask</span>
                  </h3>
                  <div className="space-y-2.5">
                    {(selectedSituation.questions || selectedSituation.supportiveQuestions || []).map((q, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#E2EBE5]/60 border border-[#183B2B]/20 text-xs sm:text-sm text-[#183B2B] font-medium italic">
                        {q.startsWith('"') ? q : `"${q}"`}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. What You Can Do VS 5. What to Avoid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="p-5 rounded-2xl bg-[#E2EBE5]/40 border border-[#183B2B]/20">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#183B2B] mb-2 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#183B2B]" />
                      <span>4. What You Can Do</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-[#365142]">
                      {(selectedSituation.dos || selectedSituation.whatToDo || []).map((item, idx) => (
                        <li key={idx}>✓ {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-red-50/50 border border-red-200/60">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-red-800 mb-2 flex items-center gap-1.5">
                      <X className="w-4 h-4 text-red-600" />
                      <span>5. What to Avoid</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-red-900">
                      {(selectedSituation.donts || selectedSituation.whatToAvoid || []).map((item, idx) => (
                        <li key={idx}>✕ {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 6. Example Supportive Conversation Script */}
                <div className="p-5 rounded-2xl bg-[#F0ECE1] border border-[#E0DACE]">
                  <h4 className="font-serif text-base font-bold text-[#18221D] mb-3">
                    6. Example Supportive Dialogue Script
                  </h4>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    {Array.isArray(selectedSituation.conversation) ? (
                      selectedSituation.conversation.map((msg, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-white/80 border border-[#E8E4DA]">
                          <strong className={`block mb-1 ${msg.speaker === 'Parent' ? 'text-[#183B2B]' : 'text-[#5C665F]'}`}>
                            {msg.speaker}:
                          </strong>
                          <p className="italic text-[#18221D]">{msg.text}</p>
                        </div>
                      ))
                    ) : selectedSituation.exampleScript ? (
                      <>
                        <div className="p-3 rounded-xl bg-white/80 border border-[#E8E4DA]">
                          <strong className="text-[#183B2B] block mb-1">Parent:</strong>
                          <p className="italic text-[#18221D]">{selectedSituation.exampleScript.parent}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-white/80 border border-[#E8E4DA]">
                          <strong className="text-[#5C665F] block mb-1">Student:</strong>
                          <p className="italic text-[#18221D]">{selectedSituation.exampleScript.student}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-white/80 border border-[#E8E4DA]">
                          <strong className="text-[#183B2B] block mb-1">Parent Follow-up:</strong>
                          <p className="italic text-[#18221D]">{selectedSituation.exampleScript.followUp}</p>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>

                {/* 7. Suggested Follow-Up Activity */}
                <div className="p-5 rounded-2xl bg-[#183B2B] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A7D4B5]">
                      7. Suggested Follow-Up Activity
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white mt-0.5">
                      {selectedSituation.activity?.title || selectedSituation.suggestedActivity?.title || 'Personal Growth Challenge'}
                    </h4>
                    <p className="text-xs text-white/80 mt-1">
                      {selectedSituation.activity?.description || selectedSituation.suggestedActivity?.description || 'Take time to reflect and practice this positive habit.'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setNewAssignmentData({
                        activityId: 'act_1',
                        studentId: activeStudent.id,
                        dueDate: '2026-11-06',
                        parentNote: `Assigned after reviewing HighOrbit guidance on ${selectedSituation.title}.`
                      });
                      setIsAssignModalOpen(true);
                    }}
                    className="px-5 py-2.5 rounded-full text-xs font-bold text-[#183B2B] bg-white hover:bg-[#FBF9F5] shadow-xs shrink-0 transition-all cursor-pointer"
                  >
                    1-Click Assign Activity →
                  </button>
                </div>

                {/* 8. When Additional Support May Be Appropriate */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 leading-relaxed">
                  <strong className="font-bold block mb-1">
                    8. When Additional Professional Support May Be Appropriate:
                  </strong>
                  {selectedSituation.professionalHelp || selectedSituation.whenToSeekHelp}
                  <span className="block mt-1 text-[11px] text-amber-800">
                    HighOrbit is for parenting education and personal discovery; it is not a psychological or medical service.
                  </span>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            MODULE 5: ACTIVITIES & ASSIGNMENTS HUB
            ══════════════════════════════════════════════════════════ */}
        {activeTab === 'assignments' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header + Assign CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2EBE5] text-[#183B2B] text-xs font-semibold mb-2">
                  <Target className="w-3.5 h-3.5" />
                  <span>Personal Development Curriculum</span>
                </div>
                <h1 className="font-serif text-3xl font-bold text-[#18221D]">
                  Assignments & Activities Hub
                </h1>
                <p className="text-xs sm:text-sm text-[#5C665F] mt-1">
                  Assign constructive life-skills challenges and celebrate completed student reflections.
                </p>
              </div>

              <button
                onClick={() => setIsAssignModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#183B2B] hover:bg-[#112D20] shadow-sm transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Assign New Growth Challenge</span>
              </button>
            </div>

            {/* Current Active Family Assignments */}
            <div className="rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/90 p-7 sm:p-8 shadow-[0_10px_30px_rgba(25,67,51,0.05)]">
              <h2 className="font-serif text-xl font-bold text-[#18221D] mb-4">
                Active & Recent Assignments ({assignments.length})
              </h2>

              <div className="space-y-4">
                {assignments.map((asg) => (
                  <div
                    key={asg.id}
                    className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#183B2B]/40 transition-colors"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#183B2B] bg-[#E2EBE5] px-2.5 py-0.5 rounded-full">
                          {asg.track}
                        </span>
                        <span className="text-xs font-bold text-[#18221D]">Student: {asg.studentName}</span>
                        <span className="text-xs text-[#5C665F]">· Due {asg.dueDate}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#18221D]">{asg.title}</h3>
                      <p className="text-xs text-[#5C665F]">
                        Parent Note: <span className="italic">"{asg.parentNote}"</span>
                      </p>

                      {asg.studentSubmission && (
                        <div className="mt-2 p-3 rounded-xl bg-white border border-[#E8E4DA] text-xs text-[#18221D]">
                          <strong className="text-[#183B2B] block mb-0.5">Student Reflection Submitted:</strong>
                          <p className="leading-relaxed text-[#4B554E]">{asg.studentSubmission}</p>
                        </div>
                      )}

                      {asg.parentFeedback && (
                        <div className="mt-2 p-3 rounded-xl bg-[#E2EBE5]/60 border border-[#183B2B]/20 text-xs text-[#183B2B]">
                          <strong className="block mb-0.5">Parent Encouragement Given:</strong>
                          <p className="leading-relaxed">{asg.parentFeedback}</p>
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
                          className="px-4 py-2 rounded-full text-xs font-bold text-white bg-[#183B2B] hover:bg-[#112D20] shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>Review & Praise</span>
                        </button>
                      ) : (
                        <span className={`px-3.5 py-1.5 rounded-full text-xs font-semibold ${
                          asg.status === 'Completed'
                            ? 'bg-[#E2EBE5] text-[#183B2B]'
                            : 'bg-[#F0ECE1] text-[#4B554E]'
                        }`}>
                          {asg.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Catalog of Pre-Built Recommended Activities */}
            <div className="rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/90 p-7 sm:p-8 shadow-[0_10px_30px_rgba(25,67,51,0.05)]">
              <h2 className="font-serif text-xl font-bold text-[#18221D] mb-1">
                Curated Challenge Catalog
              </h2>
              <p className="text-xs text-[#5C665F] mb-6">
                Choose any challenge to assign directly with your personal encouraging note.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {sampleActivitiesCatalog.map((act) => (
                  <div
                    key={act.id}
                    className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA] flex flex-col justify-between gap-4 hover:border-[#183B2B]/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B735F] bg-[#E2EBE5] px-2 py-0.5 rounded-md">
                          {act.category}
                        </span>
                        <span className="text-xs text-[#5C665F]">{act.duration}</span>
                      </div>
                      <h3 className="font-serif text-base font-bold text-[#18221D]">{act.title}</h3>
                      <p className="text-xs text-[#5C665F] mt-1.5 leading-relaxed">{act.description}</p>
                    </div>

                    <button
                      onClick={() => {
                        setNewAssignmentData({
                          activityId: act.id,
                          studentId: activeStudent.id,
                          dueDate: '2026-11-07',
                          parentNote: `Excited for you to try the ${act.title}.`
                        });
                        setIsAssignModalOpen(true);
                      }}
                      className="w-full py-2 rounded-xl text-xs font-bold text-[#183B2B] bg-white hover:bg-[#E2EBE5] border border-[#DCD6C8] transition-colors cursor-pointer"
                    >
                      Select & Assign Challenge
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
            
            {/* Header + Timeframe Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2EBE5] text-[#183B2B] text-xs font-semibold mb-2">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Longitudinal Progress</span>
                </div>
                <h1 className="font-serif text-3xl font-bold text-[#18221D]">
                  HighOrbit Growth Reports
                </h1>
                <p className="text-xs sm:text-sm text-[#5C665F] mt-1">
                  Holistic reflection trends, habit milestones, and print-ready growth summaries.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-[#F0ECE1] border border-[#E0DACE] p-1.5 rounded-2xl">
                {['30d', '60d', '90d'].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setGrowthTimeframe(tf)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      growthTimeframe === tf
                        ? 'bg-[#183B2B] text-white shadow-2xs'
                        : 'text-[#4B554E] hover:text-[#18221D]'
                    }`}
                  >
                    Last {tf.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Comprehensive Report Card - Frosted Glass Card */}
            <div className="rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/90 p-7 sm:p-9 shadow-[0_10px_30px_rgba(25,67,51,0.05)] space-y-8">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E4DA]/80">
                <div>
                  <span className="text-[11px] font-bold text-[#5C665F] uppercase tracking-wider block">
                    Report Card for:
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#18221D]">
                    {activeStudent.name} ({activeStudent.stage})
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-full text-xs font-bold text-[#183B2B] bg-[#E2EBE5] hover:bg-[#D4E4D8] border border-[#183B2B]/20 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Export Printable Report</span>
                </button>
              </div>

              {/* High-Level Trajectory Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA]">
                  <span className="text-xs text-[#5C665F] font-semibold">Self-Discipline Consistency</span>
                  <div className="font-serif text-3xl font-bold text-[#18221D] mt-1">+14%</div>
                  <p className="text-xs text-[#4B554E] mt-1 leading-relaxed">
                    Consistent evening check-ins over the past 30 days without parental prompting.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA]">
                  <span className="text-xs text-[#5C665F] font-semibold">Emotional Grounding Velocity</span>
                  <div className="font-serif text-3xl font-bold text-[#18221D] mt-1">4.2 / 5.0</div>
                  <p className="text-xs text-[#4B554E] mt-1 leading-relaxed">
                    Student reports increased recovery speed from exam anxiety through deep-work habits.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA]">
                  <span className="text-xs text-[#5C665F] font-semibold">Self-Advocacy Readiness</span>
                  <div className="font-serif text-3xl font-bold text-[#183B2B] mt-1">Rising</div>
                  <p className="text-xs text-[#4B554E] mt-1 leading-relaxed">
                    Transitioned from internal avoidance to scheduling mentor consultations directly.
                  </p>
                </div>
              </div>

              {/* Milestone Badges Achieved */}
              <div>
                <h3 className="font-serif text-lg font-bold text-[#18221D] mb-4">
                  Developmental Milestone Badges
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-[#E2EBE5]/50 border border-[#183B2B]/20 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#183B2B] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      7D
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#18221D]">Weekly Journaling Streak</div>
                      <span className="text-[11px] text-[#4B735F]">Achieved Oct 28, 2026</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#E2EBE5]/50 border border-[#183B2B]/20 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#183B2B] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      10Q
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#18221D]">10 Quests Completed</div>
                      <span className="text-[11px] text-[#4B735F]">Achieved Oct 20, 2026</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#E2EBE5]/50 border border-[#183B2B]/20 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#183B2B] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      ★
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#18221D]">Autonomy Milestone</div>
                      <span className="text-[11px] text-[#4B735F]">Achieved Oct 15, 2026</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            MODULE 7: PARENT SELF-GROWTH
            ══════════════════════════════════════════════════════════ */}
        {activeTab === 'self_growth' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2EBE5] text-[#183B2B] text-xs font-semibold mb-2">
                <Heart className="w-3.5 h-3.5" />
                <span>Parental Mindset & Practice</span>
              </div>
              <h1 className="font-serif text-3xl font-bold text-[#18221D]">
                My Parenting Growth
              </h1>
              <p className="text-xs sm:text-sm text-[#5C665F] mt-1 max-w-2xl leading-relaxed">
                Reflect on your own communication habits, track personal parenting goals, and cultivate calm, supportive connection.
              </p>
            </div>

            {/* Reflection Journal Card - Frosted Glass Card */}
            <div className="rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/90 p-7 sm:p-9 shadow-[0_10px_30px_rgba(25,67,51,0.05)] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#18221D]">
                    Weekly Parenting Self-Reflection
                  </h2>
                  <p className="text-xs text-[#5C665F] mt-0.5">
                    Prompt: <em>"Where did I listen with empathy this week instead of trying to control or fix?"</em>
                  </p>
                </div>
                {parentReflectionSaved && (
                  <span className="text-xs text-[#183B2B] font-bold bg-[#E2EBE5] px-3 py-1 rounded-full animate-fadeIn">
                    ✓ Saved Privately
                  </span>
                )}
              </div>

              <textarea
                rows={4}
                value={parentReflectionText}
                onChange={(e) => {
                  setParentReflectionText(e.target.value);
                  if (parentReflectionSaved) setParentReflectionSaved(false);
                }}
                className="w-full p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA] text-xs sm:text-sm text-[#18221D] focus:outline-none focus:border-[#183B2B] leading-relaxed"
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setParentReflectionSaved(true);
                    setTimeout(() => setParentReflectionSaved(false), 2500);
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#183B2B] hover:bg-[#112D20] shadow-xs transition-all cursor-pointer"
                >
                  Save Reflection
                </button>
              </div>
            </div>

            {/* Personal Parenting Goals Checklist */}
            <div className="rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/90 p-7 sm:p-8 shadow-[0_10px_30px_rgba(25,67,51,0.05)]">
              <h2 className="font-serif text-xl font-bold text-[#18221D] mb-2">
                Personal Parenting Practice Targets
              </h2>
              <p className="text-xs text-[#5C665F] mb-5">
                Check off practices you consciously demonstrated with your teen or young adult this week.
              </p>

              <div className="space-y-3">
                {parentGoals.map((g) => (
                  <label
                    key={g.id}
                    className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA] flex items-center gap-3.5 cursor-pointer hover:border-[#183B2B]/40 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={g.completed}
                      onChange={() => {
                        setParentGoals((prev) =>
                          prev.map((item) =>
                            item.id === g.id ? { ...item, completed: !item.completed } : item
                          )
                        );
                      }}
                      className="w-4 h-4 rounded text-[#183B2B] border-[#DCD6C8] focus:ring-0 accent-[#183B2B] cursor-pointer shrink-0"
                    />
                    <span className={`text-xs sm:text-sm ${
                      g.completed ? 'line-through text-[#5C665F]' : 'text-[#18221D] font-medium'
                    }`}>
                      {g.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Micro-Guides for Empathetic Communication */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-[28px] bg-[#E2EBE5]/60 border border-[#183B2B]/20">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#183B2B]">Micro-Guide</span>
                <h3 className="font-serif text-lg font-bold text-[#18221D] mt-1">The 4-Second Pause Rule</h3>
                <p className="text-xs text-[#365142] mt-2 leading-relaxed">
                  When a teenager expresses a grievance, counting 4 seconds before answering decreases parental defensive tone by 70% and prevents verbal escalation.
                </p>
              </div>

              <div className="p-6 rounded-[28px] bg-[#F0ECE1] border border-[#E0DACE]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C665F]">Micro-Guide</span>
                <h3 className="font-serif text-lg font-bold text-[#18221D] mt-1">Separating Worth from Grades</h3>
                <p className="text-xs text-[#4B554E] mt-2 leading-relaxed">
                  Praise curiosity, resilience under confusion, and work ethic rather than raw test scores. This builds deep resilience against burnout.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            MODULE 8: PRIVACY & SETTINGS
            ══════════════════════════════════════════════════════════ */}
        {activeTab === 'settings' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2EBE5] text-[#183B2B] text-xs font-semibold mb-2">
                <Sliders className="w-3.5 h-3.5" />
                <span>Account, Consent & Safety Governance</span>
              </div>
              <h1 className="font-serif text-3xl font-bold text-[#18221D]">
                Privacy & Portal Settings
              </h1>
              <p className="text-xs sm:text-sm text-[#5C665F] mt-1">
                Manage transparent consent levels, notification alerts, and linked child profiles.
              </p>
            </div>

            {/* Linked Student Accounts Management Card */}
            <div className="rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/90 p-7 sm:p-8 shadow-[0_10px_30px_rgba(25,67,51,0.05)] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#18221D]">
                    Linked Student Accounts & Family Members
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C665F] mt-1">
                    Manage active child profiles, add new teenagers/young adults, or adjust portal access.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddStudentModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#183B2B] hover:bg-[#112D20] shadow-sm transition-all cursor-pointer shrink-0"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Link New Student</span>
                </button>
              </div>

              {/* Student Accounts List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {students.map((std) => {
                  const isCurrent = selectedStudentId === std.id;
                  return (
                    <div
                      key={std.id}
                      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-[#E2EBE5]/40 border-[#183B2B]/40 shadow-xs'
                          : 'bg-[#FBF9F5] border-[#E8E4DA]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full bg-[#183B2B] text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                            {std.initials}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-serif text-base font-bold text-[#18221D]">
                                {std.name}
                              </h3>
                              {isCurrent && (
                                <span className="text-[10px] font-bold text-[#183B2B] bg-white border border-[#183B2B]/30 px-2 py-0.5 rounded-full">
                                  Active View
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#5C665F]">
                              {std.age} Years Old · {std.stage}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setStudentToUnlink(std)}
                          disabled={students.length <= 1}
                          className={`p-2 rounded-xl transition-colors ${
                            students.length <= 1
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-[#8E9B93] hover:text-rose-600 hover:bg-rose-50 cursor-pointer'
                          }`}
                          title={students.length <= 1 ? 'Cannot unlink the only student' : `Unlink ${std.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#E8E4DA]/60 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-[#4B735F] font-medium">
                          {std.archetype}
                        </span>
                        {!isCurrent ? (
                          <button
                            type="button"
                            onClick={() => setSelectedStudentId(std.id)}
                            className="font-bold text-[#183B2B] hover:underline cursor-pointer"
                          >
                            Switch to this student →
                          </button>
                        ) : (
                          <span className="font-semibold text-[#183B2B]">
                            Currently Viewing ✓
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Age Governance Protocol Card - Frosted Glass Card */}
            <div className="rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/90 p-7 sm:p-8 shadow-[0_10px_30px_rgba(25,67,51,0.05)] space-y-6">
              <h2 className="font-serif text-xl font-bold text-[#18221D]">
                Age-Appropriate Data Governance Matrix
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA]">
                  <span className="text-xs font-bold text-[#183B2B] bg-[#E2EBE5] px-2.5 py-0.5 rounded-full">
                    Ages 15–17 (Leo Jenkins)
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#18221D] mt-2">
                    Collaborative Family Oversight
                  </h3>
                  <ul className="mt-2 space-y-1.5 text-xs text-[#5C665F]">
                    <li>✓ Parent views completed assignment summaries</li>
                    <li>✓ Parent views development dimensions & trends</li>
                    <li>✕ Private journal text remains strictly encrypted</li>
                    <li>✕ No camera or surveillance tracking permitted</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA]">
                  <span className="text-xs font-bold text-[#183B2B] bg-[#E2EBE5] px-2.5 py-0.5 rounded-full">
                    Ages 18–25 (Maya Jenkins)
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#18221D] mt-2">
                    Young Adult Explicit-Consent Protocol
                  </h3>
                  <ul className="mt-2 space-y-1.5 text-xs text-[#5C665F]">
                    <li>✓ Adult student selects exactly which items to share</li>
                    <li>✓ Joint assignments visible only when consented</li>
                    <li>✓ Student can revoke portal link at any time</li>
                    <li>✕ Zero third-party or advertising access</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Parent Notification Preferences */}
            <div className="rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/90 p-7 sm:p-8 shadow-[0_10px_30px_rgba(25,67,51,0.05)] space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#18221D]">
                Notification & Digest Preferences
              </h2>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA] cursor-pointer">
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#18221D]">Weekly Family Digest (Sunday 8:00 AM)</div>
                    <div className="text-xs text-[#5C665F]">Receive a calm email summary of habit streaks and completed challenges.</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#183B2B] accent-[#183B2B] cursor-pointer" />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA] cursor-pointer">
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#18221D]">Assignment Submission Alerts</div>
                    <div className="text-xs text-[#5C665F]">Immediate notification when a child marks an activity ready for parent review.</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#183B2B] accent-[#183B2B] cursor-pointer" />
                </label>
              </div>
            </div>

          </div>
        )}

        </main>

        {/* ────────────────── FOOTER ────────────────── */}
        <footer className="py-6 bg-white/40 backdrop-blur-md border-t border-[#E8E4DA]/60 text-center text-xs text-[#5C665F]">
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

      {/* ────────────────── MODAL: ASSIGN CHALLENGE ────────────────── */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg rounded-[32px] bg-white p-7 sm:p-8 shadow-2xl border border-[#E8E4DA] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE1]">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#183B2B]" />
                <h3 className="font-serif text-xl font-bold text-[#18221D]">
                  Assign Personal Growth Challenge
                </h3>
              </div>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="p-1 rounded-full text-[#5C665F] hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#18221D] block mb-1">
                  Select Target Child
                </label>
                <select
                  value={newAssignmentData.studentId}
                  onChange={(e) => setNewAssignmentData({ ...newAssignmentData, studentId: e.target.value })}
                  className="w-full py-2.5 px-3.5 rounded-2xl bg-[#FBF9F5] border border-[#DCD6C8] text-xs font-semibold text-[#18221D] focus:outline-none focus:border-[#183B2B]"
                >
                  {students.map((std) => (
                    <option key={std.id} value={std.id}>
                      {std.name} ({std.age} yrs · {std.stage})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#18221D] block mb-1">
                  Choose Growth Challenge
                </label>
                <select
                  value={newAssignmentData.activityId}
                  onChange={(e) => setNewAssignmentData({ ...newAssignmentData, activityId: e.target.value })}
                  className="w-full py-2.5 px-3.5 rounded-2xl bg-[#FBF9F5] border border-[#DCD6C8] text-xs font-semibold text-[#18221D] focus:outline-none focus:border-[#183B2B]"
                >
                  {sampleActivitiesCatalog.map((act) => (
                    <option key={act.id} value={act.id}>
                      [{act.category}] {act.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#18221D] block mb-1">
                  Target Due Date
                </label>
                <input
                  type="date"
                  value={newAssignmentData.dueDate}
                  onChange={(e) => setNewAssignmentData({ ...newAssignmentData, dueDate: e.target.value })}
                  className="w-full py-2.5 px-3.5 rounded-2xl bg-[#FBF9F5] border border-[#DCD6C8] text-xs font-semibold text-[#18221D] focus:outline-none focus:border-[#183B2B]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#18221D] block mb-1">
                  Personal Encouraging Note from Parent
                </label>
                <textarea
                  rows={3}
                  value={newAssignmentData.parentNote}
                  onChange={(e) => setNewAssignmentData({ ...newAssignmentData, parentNote: e.target.value })}
                  className="w-full p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#DCD6C8] text-xs text-[#18221D] focus:outline-none focus:border-[#183B2B]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#F0ECE1]">
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
                  Assign to Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ────────────────── MODAL: REVIEW SUBMISSION & PRAISE ────────────────── */}
      {reviewModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg rounded-[32px] bg-white p-7 sm:p-8 shadow-2xl border border-[#E8E4DA] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE1]">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#183B2B]" />
                <h3 className="font-serif text-xl font-bold text-[#18221D]">
                  Review Student Submission
                </h3>
              </div>
              <button
                onClick={() => setReviewModalData(null)}
                className="p-1 rounded-full text-[#5C665F] hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B735F]">
                  {reviewModalData.track}
                </span>
                <h4 className="text-base font-bold text-[#18221D] mt-0.5">
                  {reviewModalData.title}
                </h4>
                <p className="text-xs text-[#5C665F] mt-0.5">
                  Submitted by {reviewModalData.studentName}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA]">
                <strong className="text-xs font-bold text-[#183B2B] block mb-1">
                  Student Reflection Text:
                </strong>
                <p className="text-xs sm:text-sm text-[#18221D] leading-relaxed">
                  "{reviewModalData.studentSubmission}"
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#18221D] block mb-1">
                  Send Specific Praise or Validation (Non-Critical)
                </label>
                <textarea
                  rows={3}
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  placeholder="e.g. Loved your insight about slowing down. That self-awareness will serve you well!"
                  className="w-full p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#DCD6C8] text-xs text-[#18221D] focus:outline-none focus:border-[#183B2B]"
                />
              </div>

              {/* Quick Praise Badges */}
              <div className="flex flex-wrap gap-2">
                {['Deep Reflection! ★', 'Proud of your effort! ❤️', 'Remarkable Clarity! 🎯'].map((sticker) => (
                  <button
                    key={sticker}
                    type="button"
                    onClick={() => setFeedbackInput((prev) => (prev ? `${prev} ${sticker}` : sticker))}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E2EBE5] text-[#183B2B] hover:bg-[#D4E4D8] transition-colors cursor-pointer"
                  >
                    + {sticker}
                  </button>
                ))}
              </div>

              {feedbackSentSuccess && (
                <div className="p-3 rounded-2xl bg-[#E2EBE5] text-[#183B2B] text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Feedback dispatched and challenge marked as completed!</span>
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

      {/* ────────────────── MODAL: HELP & SUPPORT ────────────────── */}
      {isHelpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl rounded-[32px] bg-white/95 backdrop-blur-2xl p-7 sm:p-8 shadow-2xl border border-white/80 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE1]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#E2EBE5] text-[#183B2B] flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#18221D]">
                    HighOrbit Family Support Hub
                  </h3>
                  <span className="text-xs text-[#5C665F]">Dedicated parenting assistance and resources</span>
                </div>
              </div>
              <button
                onClick={() => setIsHelpModalOpen(false)}
                className="p-1.5 rounded-full text-[#5C665F] hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {/* Support Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#183B2B] mb-1">
                  <Mail className="w-4 h-4" />
                  <span>Product & Account Support</span>
                </div>
                <p className="text-xs text-[#5C665F] leading-relaxed">
                  Questions about linking children, PIN management, or privacy settings?
                </p>
                <a
                  href="mailto:support@highorbit.app"
                  className="mt-2 text-xs font-bold text-[#183B2B] hover:underline block"
                >
                  support@highorbit.app →
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-[#E2EBE5]/50 border border-[#183B2B]/20">
                <div className="flex items-center gap-2 text-xs font-bold text-[#183B2B] mb-1">
                  <BookOpen className="w-4 h-4" />
                  <span>The Parenting Guide</span>
                </div>
                <p className="text-xs text-[#365142] leading-relaxed">
                  Explore practical scripts and guidance for 10 common adolescent challenges.
                </p>
                <button
                  onClick={() => {
                    setIsHelpModalOpen(false);
                    setActiveTab('guide');
                  }}
                  className="mt-2 text-xs font-bold text-[#183B2B] hover:underline block cursor-pointer"
                >
                  Open Guide Situations →
                </button>
              </div>
            </div>

            {/* Professional Crisis Support Notice */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-2">
              <strong className="block font-bold">24/7 Professional Crisis Support Contacts</strong>
              <p className="text-[11px] leading-relaxed">
                HighOrbit provides personal development educational guidance and is not a crisis clinic. If your teen is experiencing severe mental distress, free confidential support is available 24/7:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-semibold text-[11px]">
                <div className="p-2 rounded-xl bg-white border border-amber-200">
                  <span>988 Suicide & Crisis Lifeline:</span>
                  <div className="text-amber-900 font-bold">Call or Text 988</div>
                </div>
                <div className="p-2 rounded-xl bg-white border border-amber-200">
                  <span>Crisis Text Line:</span>
                  <div className="text-amber-900 font-bold">Text HOME to 741741</div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsHelpModalOpen(false)}
                className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#183B2B] hover:bg-[#112D20] transition-colors cursor-pointer shadow-xs"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────── TOAST NOTIFICATION ────────────────── */}
      {studentActionToast && (
        <div className="fixed top-6 right-6 z-50 animate-fadeIn bg-[#183B2B] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/20 text-xs sm:text-sm font-medium">
          <span>{studentActionToast}</span>
          <button
            onClick={() => setStudentActionToast(null)}
            className="text-white/60 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* ────────────────── ADD NEW STUDENT MODAL ────────────────── */}
      {isAddStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg rounded-[32px] bg-white/95 backdrop-blur-2xl p-7 sm:p-8 shadow-2xl border border-white/80 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE1]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#E2EBE5] text-[#183B2B] flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#18221D]">
                    Link New Student Account
                  </h3>
                  <span className="text-xs text-[#5C665F]">Connect another young adult (ages 15–25)</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddStudentModalOpen(false)}
                className="p-1.5 rounded-full text-[#5C665F] hover:bg-gray-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#18221D] block mb-1">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newStudentForm.name}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                  placeholder="e.g. Aria Jenkins"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DCD6C8] bg-white text-xs sm:text-sm focus:outline-none focus:border-[#183B2B] focus:ring-2 focus:ring-[#183B2B]/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#18221D] block mb-1">
                    Age (15–25) *
                  </label>
                  <select
                    value={newStudentForm.age}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, age: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DCD6C8] bg-white text-xs sm:text-sm focus:outline-none focus:border-[#183B2B]"
                  >
                    {[15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map((a) => (
                      <option key={a} value={a}>
                        {a} Years Old
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#18221D] block mb-1">
                    Student 4-Digit PIN *
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    required
                    value={newStudentForm.pin}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, pin: e.target.value })}
                    placeholder="1234"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DCD6C8] bg-white text-xs sm:text-sm focus:outline-none focus:border-[#183B2B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#18221D] block mb-1">
                  Academic Stage / Grade
                </label>
                <input
                  type="text"
                  value={newStudentForm.stage}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, stage: e.target.value })}
                  placeholder="e.g. High School Junior · College Prep"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DCD6C8] bg-white text-xs sm:text-sm focus:outline-none focus:border-[#183B2B]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#18221D] block mb-1">
                  Growth Archetype
                </label>
                <input
                  type="text"
                  value={newStudentForm.archetype}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, archetype: e.target.value })}
                  placeholder="e.g. Creative Synthesizer & Empathetic Leader"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DCD6C8] bg-white text-xs sm:text-sm focus:outline-none focus:border-[#183B2B]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#18221D] block mb-1">
                  Interests & Passions (comma-separated)
                </label>
                <input
                  type="text"
                  value={newStudentForm.interests}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, interests: e.target.value })}
                  placeholder="e.g. Debate, Digital Art, Psychology"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DCD6C8] bg-white text-xs sm:text-sm focus:outline-none focus:border-[#183B2B]"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#E8E4DA] text-xs text-[#5C665F]">
                🔒 <strong>Privacy Assurance:</strong> Connecting a student links their habit consistency and milestones to your Parent Portal, while their personal journal remains 100% private and encrypted.
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddStudentModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#5C665F] hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#183B2B] hover:bg-[#112D20] shadow-sm transition-all cursor-pointer"
                >
                  Confirm & Link Student →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ────────────────── UNLINK STUDENT CONFIRMATION MODAL ────────────────── */}
      {studentToUnlink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-[32px] bg-white/95 backdrop-blur-2xl p-7 shadow-2xl border border-white/80 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#18221D]">
                  Unlink {studentToUnlink.name}?
                </h3>
                <span className="text-xs text-[#5C665F]">
                  Remove profile from Parent Portal
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#4B554E] leading-relaxed">
              Are you sure you want to remove <strong>{studentToUnlink.name}</strong> ({studentToUnlink.age} yrs) from your Parent Portal view?
            </p>

            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
              ⚠️ The student's private reflection log and completed challenges will not be deleted; only the parent-view link will be disconnected. You can re-link at any time.
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setStudentToUnlink(null)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#5C665F] hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmUnlinkStudent}
                className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition-all cursor-pointer"
              >
                Yes, Unlink Student
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ParentDashboardPage;
