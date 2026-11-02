import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Filter,
  Sparkles,
  ArrowRight,
  Search,
  Calendar,
  X,
  Play,
  Eye,
  MessageSquare,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Send,
  HelpCircle,
  Check,
  LayoutGrid,
  List,
  AlertTriangle,
  BadgeAlert,
  Loader2
} from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import { useStudent } from '../../context/StudentContext';

export const StudentAssignmentsPage = () => {
  const { activeChild, isAuthenticated } = useOnboarding();
  const { assignments, updateAssignmentStatus, submitAssignment } = useStudent();

  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Pending' | 'In Progress' | 'Submitted' | 'Completed' | 'Needs Revision'
  const [overdueOnly, setOverdueOnly] = useState(false);
  const [sortBy, setSortBy] = useState('dueAsc'); // 'dueAsc' | 'dueDesc' | 'priority' | 'assignedDesc'
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Modals state
  const [activeModal, setActiveModal] = useState(null); // 'work' | 'submission' | 'feedback' | null
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionDraft, setSubmissionDraft] = useState('');
  const [feedbackToast, setFeedbackToast] = useState(null);

  // Authorize assignments for the authenticated student
  const authorizedAssignments = useMemo(() => {
    if (!activeChild) return [];
    return assignments.filter(
      (a) => !a.studentId || a.studentId === activeChild.id
    );
  }, [assignments, activeChild]);

  // Current date for overdue checking (Simulated HighOrbit timeline: Oct 31, 2026)
  const currentDate = new Date();

  // Helper: check if assignment is overdue
  const isOverdue = (asg) => {
    if (asg.status === 'Completed' || asg.status === 'Submitted') return false;
    if (!asg.dueDateIso) return false;
    const dueTime = new Date(asg.dueDateIso).getTime();
    return dueTime < currentDate.getTime();
  };

  // Summary Counters Calculation
  const counters = useMemo(() => {
    const total = authorizedAssignments.length;
    const pending = authorizedAssignments.filter((a) => a.status === 'Pending').length;
    const inProgress = authorizedAssignments.filter((a) => a.status === 'In Progress').length;
    const submitted = authorizedAssignments.filter((a) => a.status === 'Submitted').length;
    const completed = authorizedAssignments.filter((a) => a.status === 'Completed').length;
    const needsRevision = authorizedAssignments.filter((a) => a.status === 'Needs Revision').length;
    const overdue = authorizedAssignments.filter(isOverdue).length;

    return { total, pending, inProgress, submitted, completed, needsRevision, overdue };
  }, [authorizedAssignments]);

  // Filtering & Searching Logic
  const filteredAssignments = useMemo(() => {
    return authorizedAssignments.filter((asg) => {
      // 1. Status Filter
      if (statusFilter !== 'All' && asg.status !== statusFilter) {
        return false;
      }

      // 2. Overdue Toggle
      if (overdueOnly && !isOverdue(asg)) {
        return false;
      }

      // 3. Search Query
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = asg.title?.toLowerCase().includes(query);
        const matchesDesc = asg.description?.toLowerCase().includes(query);
        const matchesSubject = asg.subject?.toLowerCase().includes(query);
        const matchesType = asg.activityType?.toLowerCase().includes(query);
        return matchesTitle || matchesDesc || matchesSubject || matchesType;
      }

      return true;
    });
  }, [authorizedAssignments, statusFilter, overdueOnly, searchTerm]);

  // Sorting Logic
  const sortedAssignments = useMemo(() => {
    return [...filteredAssignments].sort((a, b) => {
      if (sortBy === 'priority') {
        const weight = { High: 3, Medium: 2, Low: 1 };
        return (weight[b.priority] || 0) - (weight[a.priority] || 0);
      }
      if (sortBy === 'assignedDesc') {
        return (b.id > a.id ? 1 : -1);
      }
      if (sortBy === 'dueDesc') {
        if (!a.dueDateIso) return 1;
        if (!b.dueDateIso) return -1;
        return new Date(b.dueDateIso).getTime() - new Date(a.dueDateIso).getTime();
      }
      // Default: dueAsc
      if (!a.dueDateIso) return 1;
      if (!b.dueDateIso) return -1;
      return new Date(a.dueDateIso).getTime() - new Date(b.dueDateIso).getTime();
    });
  }, [filteredAssignments, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(sortedAssignments.length / pageSize) || 1;
  const paginatedAssignments = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedAssignments.slice(start, start + pageSize);
  }, [sortedAssignments, currentPage, pageSize]);

  // Reset pagination when filter/search changes
  const handleFilterChange = (tab) => {
    setStatusFilter(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const navigate = useNavigate();

  // Actions - Navigate directly to Student Assignment Details page
  const handleStartAssignment = (asg) => {
    navigate(`/child/assignments/${asg.id}`);
  };

  const handleContinueAssignment = (asg) => {
    navigate(`/child/assignments/${asg.id}`);
  };

  const handleViewSubmission = (asg) => {
    navigate(`/child/assignments/${asg.id}/status`);
  };

  const handleViewFeedback = (asg) => {
    navigate(`/child/assignments/${asg.id}/feedback`);
  };

  const handleSubmitModal = () => {
    if (!submissionDraft.trim()) {
      alert('Please enter your assignment response before submitting.');
      return;
    }
    submitAssignment(selectedAssignment.id, submissionDraft);
    setActiveModal(null);
    setFeedbackToast(`Assignment "${selectedAssignment.title}" submitted successfully for mentor review.`);
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  // Status Pill Styling Helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-[#F3EFFF] text-[#1b1831] border border-[#E6DEFF]';
      case 'In Progress':
        return 'bg-amber-100 text-amber-900 border border-amber-200';
      case 'Submitted':
        return 'bg-blue-100 text-blue-900 border border-blue-200';
      case 'Completed':
        return 'bg-[#8bcefe] text-primary border border-[#78b390]';
      case 'Needs Revision':
        return 'bg-rose-100 text-rose-900 border border-rose-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center space-y-4 text-center animate-fadeIn">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <h3 className=" text-lg font-bold text-[#1b1831]">Loading Assignments...</h3>
        <p className="text-xs text-[#6A6678]">Fetching your personalized tasks and mentor feedback records.</p>
      </div>
    );
  }

  // Error State: If unauthorized or student not logged in
  if (!activeChild && !isAuthenticated) {
    return (
      <div className="max-w-xl mx-auto py-16 px-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-[#F3EFFF] text-primary flex items-center justify-center mx-auto border border-[#E6DEFF]">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className=" text-2xl font-bold text-[#1b1831]">Access Restricted</h2>
        <p className="text-sm text-[#6A6678]">
          Please log in with your authenticated student profile to access your assignments.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn w-full max-w-[1600px] mx-auto">

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
            My Assignments
          </h1>
          <p className="text-xs sm:text-sm text-[#6A6678] mt-1 max-w-2xl leading-relaxed">
            Manage your personalized growth challenges, values reflections, and developmental assignments. Track deadlines, review mentor feedback, and submit your work.
          </p>
        </div>

        {/* View Switcher (Cards vs Table) */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center p-1 bg-[#F3EFFF] border border-[#E6DEFF] rounded-xl">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white text-primary border border-[#E6DEFF] shadow-2xs font-bold'
                  : 'text-[#6A6678] hover:text-[#1b1831]'
              }`}
              title="Cards View"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Cards</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-primary border border-[#E6DEFF] shadow-2xs font-bold'
                  : 'text-[#6A6678] hover:text-[#1b1831]'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Success Notification Toast */}
      {feedbackToast && (
        <div className="p-4 rounded-2xl bg-[#8bcefe]/20 border border-[#E6DEFF] text-primary text-xs sm:text-sm flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
            <span className="font-semibold">{feedbackToast}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedbackToast(null)}
            className="text-primary hover:text-black p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. ASSIGNMENT SUMMARY COUNTERS
          ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-2.5">
        {/* Total */}
        <button
          type="button"
          onClick={() => handleFilterChange('All')}
          className={`py-2.5 px-3 rounded-xl border text-left transition-all cursor-pointer shadow-2xs ${
            statusFilter === 'All' && !overdueOnly
              ? 'bg-primary text-white border-black'
              : 'bg-white text-[#1b1831] border-[#E6DEFF] hover:border-black/60'
          }`}
        >
          <span className={`text-[9.5px] font-bold uppercase tracking-wider block ${statusFilter === 'All' && !overdueOnly ? 'text-white/80' : 'text-[#6A6678]'}`}>
            Total Tasks
          </span>
          <span className=" text-lg sm:text-xl font-bold mt-0.5 block leading-tight">
            {counters.total}
          </span>
          <span className={`text-[10px] mt-0.5 block ${statusFilter === 'All' && !overdueOnly ? 'text-white/80' : 'text-[#6A6678]'}`}>
            All records
          </span>
        </button>

        {/* In Progress */}
        <button
          type="button"
          onClick={() => handleFilterChange('In Progress')}
          className={`py-2.5 px-3 rounded-xl border text-left transition-all cursor-pointer shadow-2xs ${
            statusFilter === 'In Progress'
              ? 'bg-primary text-white border-black'
              : 'bg-white text-[#1b1831] border-[#E6DEFF] hover:border-black/60'
          }`}
        >
          <span className={`text-[9.5px] font-bold uppercase tracking-wider block ${statusFilter === 'In Progress' ? 'text-white/80' : 'text-[#6A6678]'}`}>
            In Progress
          </span>
          <span className={` text-lg sm:text-xl font-bold mt-0.5 block leading-tight ${statusFilter === 'In Progress' ? 'text-white' : 'text-amber-800'}`}>
            {counters.inProgress}
          </span>
          <span className={`text-[10px] mt-0.5 block ${statusFilter === 'In Progress' ? 'text-white/80' : 'text-[#6A6678]'}`}>
            Active draft
          </span>
        </button>

        {/* Pending */}
        <button
          type="button"
          onClick={() => handleFilterChange('Pending')}
          className={`py-2.5 px-3 rounded-xl border text-left transition-all cursor-pointer shadow-2xs ${
            statusFilter === 'Pending'
              ? 'bg-primary text-white border-black'
              : 'bg-white text-[#1b1831] border-[#E6DEFF] hover:border-black/60'
          }`}
        >
          <span className={`text-[9.5px] font-bold uppercase tracking-wider block ${statusFilter === 'Pending' ? 'text-white/80' : 'text-[#6A6678]'}`}>
            Pending
          </span>
          <span className=" text-lg sm:text-xl font-bold mt-0.5 block leading-tight">
            {counters.pending}
          </span>
          <span className={`text-[10px] mt-0.5 block ${statusFilter === 'Pending' ? 'text-white/80' : 'text-[#6A6678]'}`}>
            To start
          </span>
        </button>

        {/* Submitted */}
        <button
          type="button"
          onClick={() => handleFilterChange('Submitted')}
          className={`py-2.5 px-3 rounded-xl border text-left transition-all cursor-pointer shadow-2xs ${
            statusFilter === 'Submitted'
              ? 'bg-primary text-white border-black'
              : 'bg-white text-[#1b1831] border-[#E6DEFF] hover:border-black/60'
          }`}
        >
          <span className={`text-[9.5px] font-bold uppercase tracking-wider block ${statusFilter === 'Submitted' ? 'text-white/80' : 'text-[#6A6678]'}`}>
            Submitted
          </span>
          <span className={` text-lg sm:text-xl font-bold mt-0.5 block leading-tight ${statusFilter === 'Submitted' ? 'text-white' : 'text-blue-800'}`}>
            {counters.submitted}
          </span>
          <span className={`text-[10px] mt-0.5 block ${statusFilter === 'Submitted' ? 'text-white/80' : 'text-[#6A6678]'}`}>
            In review
          </span>
        </button>

        {/* Completed */}
        <button
          type="button"
          onClick={() => handleFilterChange('Completed')}
          className={`py-2.5 px-3 rounded-xl border text-left transition-all cursor-pointer shadow-2xs ${
            statusFilter === 'Completed'
              ? 'bg-primary text-white border-black'
              : 'bg-white text-[#1b1831] border-[#E6DEFF] hover:border-black/60'
          }`}
        >
          <span className={`text-[9.5px] font-bold uppercase tracking-wider block ${statusFilter === 'Completed' ? 'text-white/80' : 'text-[#6A6678]'}`}>
            Completed
          </span>
          <span className={` text-lg sm:text-xl font-bold mt-0.5 block leading-tight ${statusFilter === 'Completed' ? 'text-white' : 'text-emerald-800'}`}>
            {counters.completed}
          </span>
          <span className={`text-[10px] mt-0.5 block ${statusFilter === 'Completed' ? 'text-white/80' : 'text-[#6A6678]'}`}>
            Finished
          </span>
        </button>

        {/* Needs Revision */}
        <button
          type="button"
          onClick={() => handleFilterChange('Needs Revision')}
          className={`py-2.5 px-3 rounded-xl border text-left transition-all cursor-pointer shadow-2xs ${
            statusFilter === 'Needs Revision'
              ? 'bg-primary text-white border-black'
              : 'bg-white text-[#1b1831] border-[#E6DEFF] hover:border-black/60'
          }`}
        >
          <span className={`text-[9.5px] font-bold uppercase tracking-wider block ${statusFilter === 'Needs Revision' ? 'text-white/80' : 'text-[#6A6678]'}`}>
            Needs Revision
          </span>
          <span className={` text-lg sm:text-xl font-bold mt-0.5 block leading-tight ${statusFilter === 'Needs Revision' ? 'text-white' : 'text-rose-800'}`}>
            {counters.needsRevision}
          </span>
          <span className={`text-[10px] mt-0.5 block ${statusFilter === 'Needs Revision' ? 'text-white/80' : 'text-[#6A6678]'}`}>
            Revisions
          </span>
        </button>

        {/* Overdue Alert Count */}
        <button
          type="button"
          onClick={() => {
            setOverdueOnly(!overdueOnly);
            setCurrentPage(1);
          }}
          className={`py-2.5 px-3 rounded-xl border text-left transition-all cursor-pointer shadow-2xs ${
            overdueOnly
              ? 'bg-rose-900 text-white border-black'
              : 'bg-white text-[#1b1831] border-[#E6DEFF] hover:border-rose-400'
          }`}
        >
          <span className={`text-[9.5px] font-bold uppercase tracking-wider block ${overdueOnly ? 'text-white/80' : 'text-rose-700'}`}>
            Overdue
          </span>
          <span className={` text-lg sm:text-xl font-bold mt-0.5 block leading-tight ${overdueOnly ? 'text-white' : 'text-rose-700'}`}>
            {counters.overdue}
          </span>
          <span className={`text-[10px] mt-0.5 block ${overdueOnly ? 'text-white/80' : 'text-[#6A6678]'}`}>
            Past due
          </span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. SEARCH, STATUS FILTERS & SORT BAR
          ───────────────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E6DEFF] shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search Field */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#6A6678] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by assignment title, description, or activity type..."
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] text-xs sm:text-sm text-[#1b1831] placeholder-[#737A73] focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6A6678] hover:text-[#1b1831]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-[#6A6678] font-medium hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2.5 px-3 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] text-xs font-semibold text-[#1b1831] focus:outline-hidden focus:border-primary cursor-pointer"
            >
              <option value="dueAsc">Due Date (Earliest First)</option>
              <option value="dueDesc">Due Date (Latest First)</option>
              <option value="priority">Priority (High to Low)</option>
              <option value="assignedDesc">Assigned Date (Recent First)</option>
            </select>
          </div>
        </div>

        {/* Status Filters Pill Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E6DEFF]">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-[#6A6678] mr-1 hidden sm:inline">Status:</span>
            {['All', 'Pending', 'In Progress', 'Submitted', 'Completed', 'Needs Revision'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => handleFilterChange(tab)}
                className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                  statusFilter === tab
                    ? 'bg-primary text-white border-[#E6DEFF] shadow-xs'
                    : 'bg-[#FCF8FF] text-[#1b1831] hover:bg-[#EBE5FF] hover:text-primary border-[#E6DEFF] hover:border-primary/40'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Overdue filter indicator badge */}
          {overdueOnly && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-[#E6DEFF] text-rose-800 text-xs">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Filtering Overdue Only</span>
              <button
                type="button"
                onClick={() => setOverdueOnly(false)}
                className="hover:text-rose-950 font-bold ml-1"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. ASSIGNMENT LIST / CARDS / TABLE
          ───────────────────────────────────────────────────────────── */}
      {paginatedAssignments.length === 0 ? (
        /* Empty State */
        <div className="p-12 sm:p-16 text-center rounded-3xl bg-white border border-[#E6DEFF] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#EBE5FF] text-primary flex items-center justify-center mx-auto border border-[#E6DEFF]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className=" text-lg sm:text-xl font-bold text-[#1b1831]">
            No assignments found
          </h3>
          <p className="text-xs sm:text-sm text-[#6A6678] max-w-md mx-auto">
            {searchTerm || statusFilter !== 'All' || overdueOnly
              ? 'No tasks matched your active filter or search terms. Try resetting your filters to see all assignments.'
              : 'You do not have any assignments scheduled at this moment. You are caught up with all tasks!'}
          </p>
          {(searchTerm || statusFilter !== 'All' || overdueOnly) && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('All');
                  setOverdueOnly(false);
                  setCurrentPage(1);
                }}
                className="py-2 px-5 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] hover:border-primary/40 transition-colors cursor-pointer shadow-xs"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      ) : viewMode === 'cards' ? (
        /* Card View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedAssignments.map((asg) => {
            const hasOverdue = isOverdue(asg);

            return (
              <div
                key={asg.id}
                className="p-6 rounded-3xl bg-white border border-[#E6DEFF] shadow-xs flex flex-col justify-between gap-5 hover:border-primary/40 transition-all group"
              >
                <div className="space-y-3">
                  {/* Top Badges Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {/* Subject */}
                      <span className="text-xs font-bold text-primary bg-[#EBE5FF] px-3 py-0.5 rounded-full border border-[#E6DEFF]">
                        {asg.subject}
                      </span>

                      {/* Activity Type */}
                      {asg.activityType && (
                        <span className="text-[11px] font-medium text-[#6A6678] bg-[#F3EFFF] px-2.5 py-0.5 rounded-full border border-[#E6DEFF]">
                          {asg.activityType}
                        </span>
                      )}

                      {/* Overdue Badge (Displayed clearly without changing status) */}
                      {hasOverdue && (
                        <span className="text-[10px] font-bold text-rose-800 bg-rose-100 border border-[#E6DEFF] px-2 py-0.5 rounded-full flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-rose-700" />
                          <span>Overdue</span>
                        </span>
                      )}
                    </div>

                    {/* Status Pill */}
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#E6DEFF] ${getStatusBadge(asg.status)}`}>
                      {asg.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className=" text-lg sm:text-xl font-bold text-[#1b1831] group-hover:text-primary transition-colors">
                    <Link to={`/child/assignments/${asg.id}`} className="hover:underline">
                      {asg.title}
                    </Link>
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#6A6678] leading-relaxed line-clamp-3">
                    {asg.description}
                  </p>

                  {/* Metadata Row: Assigned Date, Due Date, Duration */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-xs text-[#6A6678] border-t border-[#E6DEFF]">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6A6678]/80 block">Assigned</span>
                      <span className="font-medium text-[#1b1831]">{asg.assignedDate || 'Oct 25, 2026'}</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6A6678]/80 block">Due Date</span>
                      <span className={`font-medium ${hasOverdue ? 'text-rose-700 font-bold' : 'text-[#1b1831]'}`}>
                        {asg.dueDate || 'Flexible'}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6A6678]/80 block">Est. Duration</span>
                      <span className="font-medium text-[#1b1831] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-primary" />
                        <span>{asg.duration || '30 mins'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Mentor Guidance Note preview if present */}
                  {asg.mentorNote && (
                    <div className="p-3 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] shadow-2xs text-xs text-[#1b1831] flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <div className="leading-snug">
                        <strong className="text-primary">Mentor Note:</strong> {asg.mentorNote}
                      </div>
                    </div>
                  )}
                </div>

                {/* Appropriate Action Buttons */}
                <div className="mt-auto pt-4 border-t border-[#E6DEFF] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {/* View Feedback action (when feedback exists) */}
                    {asg.feedback && (
                      <button
                        type="button"
                        onClick={() => handleViewFeedback(asg)}
                        className="py-1.5 px-3 rounded-full text-xs font-semibold text-primary bg-[#EBE5FF] hover:bg-[#E6DEFF] border border-[#E6DEFF] hover:border-primary/40 transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                        title="View Mentor Feedback"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Feedback</span>
                      </button>
                    )}

                    {/* View Submission action (when submitted, completed, or needs revision) */}
                    {asg.submission && (
                      <button
                        type="button"
                        onClick={() => handleViewSubmission(asg)}
                        className="py-1.5 px-3 rounded-full text-xs font-semibold text-[#1b1831] bg-white border border-[#E6DEFF] hover:border-primary/40 hover:bg-[#FCF8FF] transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                        title="View Submission"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#6A6678]" />
                        <span>Submission</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-end shrink-0">
                    {/* Pending Action: Start Assignment */}
                    {asg.status === 'Pending' && (
                      <button
                        type="button"
                        onClick={() => handleStartAssignment(asg)}
                        className="w-full sm:w-auto py-2 px-4 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] hover:border-primary/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>Start Assignment</span>
                      </button>
                    )}

                    {/* In Progress Action: Continue Assignment */}
                    {asg.status === 'In Progress' && (
                      <button
                        type="button"
                        onClick={() => handleContinueAssignment(asg)}
                        className="w-full sm:w-auto py-2 px-4 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] hover:border-primary/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>Continue Assignment</span>
                      </button>
                    )}

                    {/* Needs Revision Action: Revise & Resubmit */}
                    {asg.status === 'Needs Revision' && (
                      <button
                        type="button"
                        onClick={() => handleContinueAssignment(asg)}
                        className="w-full sm:w-auto py-2 px-4 rounded-full text-xs font-semibold text-white bg-rose-800 hover:bg-rose-900 border border-[#E6DEFF] hover:border-primary/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Revise & Submit</span>
                      </button>
                    )}

                    {/* Completed */}
                    {asg.status === 'Completed' && (
                      <span className="py-1.5 px-3 rounded-full text-xs font-semibold text-primary bg-[#EBE5FF] border border-[#E6DEFF] flex items-center gap-1 shadow-2xs">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Completed</span>
                      </span>
                    )}

                    {/* Submitted: Awaiting feedback */}
                    {asg.status === 'Submitted' && (
                      <span className="py-1.5 px-3 rounded-full text-xs font-semibold text-blue-900 bg-blue-50 border border-[#E6DEFF] flex items-center gap-1 shadow-2xs">
                        <Clock className="w-3.5 h-3.5 text-blue-700" />
                        <span>Under Review</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="rounded-3xl bg-white border border-[#E6DEFF] shadow-xs overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FCF8FF] border-b border-[#E6DEFF] text-[#6A6678] uppercase tracking-wider font-bold">
                  <th className="py-3.5 px-4">Assignment</th>
                  <th className="py-3.5 px-3">Subject / Type</th>
                  <th className="py-3.5 px-3">Assigned</th>
                  <th className="py-3.5 px-3">Due Date</th>
                  <th className="py-3.5 px-3">Duration</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/20">
                {paginatedAssignments.map((asg) => {
                  const hasOverdue = isOverdue(asg);

                  return (
                    <tr key={asg.id} className="hover:bg-[#FCF8FF]/60 transition-colors">
                      <td className="py-4 px-4 font-semibold text-[#1b1831] max-w-xs">
                        <Link to={`/child/assignments/${asg.id}`} className=" text-sm font-bold hover:text-primary hover:underline block">
                          {asg.title}
                        </Link>
                        <div className="text-[11px] text-[#6A6678] line-clamp-1 mt-0.5">{asg.description}</div>
                      </td>
                      <td className="py-4 px-3">
                        <div className="font-bold text-primary">{asg.subject}</div>
                        <div className="text-[10px] text-[#6A6678]">{asg.activityType}</div>
                      </td>
                      <td className="py-4 px-3 text-[#6A6678] whitespace-nowrap">
                        {asg.assignedDate || 'Oct 25, 2026'}
                      </td>
                      <td className="py-4 px-3 whitespace-nowrap">
                        <div className={`font-medium ${hasOverdue ? 'text-rose-700 font-bold' : 'text-[#1b1831]'}`}>
                          {asg.dueDate}
                        </div>
                        {hasOverdue && (
                          <span className="text-[10px] font-bold text-rose-700 uppercase">Overdue</span>
                        )}
                      </td>
                      <td className="py-4 px-3 text-[#6A6678] whitespace-nowrap">
                        {asg.duration || '30 mins'}
                      </td>
                      <td className="py-4 px-3 whitespace-nowrap">
                        <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-[#E6DEFF] ${getStatusBadge(asg.status)}`}>
                          {asg.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex flex-wrap items-center gap-1.5 justify-end">
                          {asg.status === 'Pending' && (
                            <button
                              type="button"
                              onClick={() => handleStartAssignment(asg)}
                              className="py-1.5 px-3 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] hover:border-primary/40 transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                            >
                              <Play className="w-3 h-3 fill-white" />
                              <span>Start Assignment</span>
                            </button>
                          )}

                          {asg.status === 'In Progress' && (
                            <button
                              type="button"
                              onClick={() => handleContinueAssignment(asg)}
                              className="py-1.5 px-3 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] hover:border-primary/40 transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                            >
                              <Play className="w-3 h-3 fill-white" />
                              <span>Continue Assignment</span>
                            </button>
                          )}

                          {asg.status === 'Needs Revision' && (
                            <button
                              type="button"
                              onClick={() => handleContinueAssignment(asg)}
                              className="py-1.5 px-3 rounded-full text-xs font-semibold text-white bg-rose-800 hover:bg-rose-900 border border-[#E6DEFF] hover:border-primary/40 transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Continue Assignment</span>
                            </button>
                          )}

                          {asg.submission && (
                            <button
                              type="button"
                              onClick={() => handleViewSubmission(asg)}
                              className="py-1.5 px-2.5 rounded-xl text-xs font-semibold text-[#1b1831] bg-white border border-[#E6DEFF] hover:border-primary/40 hover:bg-[#FCF8FF] transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                              title="View Submission"
                            >
                              <Eye className="w-3.5 h-3.5 text-[#6A6678]" />
                              <span className="hidden sm:inline">View Submission</span>
                            </button>
                          )}

                          {asg.feedback && (
                            <button
                              type="button"
                              onClick={() => handleViewFeedback(asg)}
                              className="py-1.5 px-2.5 rounded-xl text-xs font-semibold text-primary bg-[#EBE5FF] hover:bg-[#E6DEFF] border border-[#E6DEFF] hover:border-primary/40 transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                              title="View Mentor Feedback"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">View Feedback</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. PAGINATION CONTROLS
          ───────────────────────────────────────────────────────────── */}
      {sortedAssignments.length > pageSize && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-[#E6DEFF] shadow-xs text-xs text-[#6A6678]">
          <div>
            Showing <strong className="text-[#1b1831]">{(currentPage - 1) * pageSize + 1}</strong> to{' '}
            <strong className="text-[#1b1831]">{Math.min(currentPage * pageSize, sortedAssignments.length)}</strong> of{' '}
            <strong className="text-[#1b1831]">{sortedAssignments.length}</strong> assignments
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-2 rounded-xl border border-[#E6DEFF] hover:border-primary/40 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FCF8FF] text-[#1b1831] transition-colors cursor-pointer"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setCurrentPage(num)}
                className={`w-8 h-8 rounded-xl font-semibold transition-all cursor-pointer ${
                  currentPage === num
                    ? 'bg-primary text-white shadow-2xs font-bold border border-[#E6DEFF]'
                    : 'text-[#1b1831] hover:bg-[#EBE5FF] border border-transparent'
                }`}
              >
                {num}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-2 rounded-xl border border-[#E6DEFF] hover:border-primary/40 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FCF8FF] text-[#1b1831] transition-colors cursor-pointer"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          6. WORK & SUBMIT MODAL (Continue Assignment / Start)
          ───────────────────────────────────────────────────────────── */}
      {activeModal === 'work' && selectedAssignment && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="w-full max-w-2xl bg-white rounded-3xl border border-[#E6DEFF] shadow-2xl p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E6DEFF]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-[#EBE5FF] px-2.5 py-0.5 rounded-full border border-[#E6DEFF]">
                  {selectedAssignment.subject} • {selectedAssignment.activityType}
                </span>
                <h2 className=" text-xl sm:text-2xl font-bold text-[#1b1831] mt-1.5">
                  {selectedAssignment.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-full text-[#6A6678] hover:text-[#1b1831] hover:bg-[#F3EFFF] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Assignment Prompt / Guidelines */}
            <div className="p-4 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] shadow-2xs text-xs sm:text-sm text-[#1b1831] space-y-2">
              <strong className="block text-primary">Assignment Prompt:</strong>
              <p className="leading-relaxed text-[#6A6678]">{selectedAssignment.description}</p>
              {selectedAssignment.mentorNote && (
                <div className="pt-2 border-t border-[#E6DEFF] flex items-center gap-1.5 text-xs text-primary">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span><strong>Mentor Note:</strong> {selectedAssignment.mentorNote}</span>
                </div>
              )}
            </div>

            {/* Submission Input Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-[#1b1831]">Your Submission Response</label>
                <span className="text-[#6A6678]">{submissionDraft.length} characters</span>
              </div>
              <textarea
                rows={6}
                value={submissionDraft}
                onChange={(e) => setSubmissionDraft(e.target.value)}
                placeholder="Write your analysis, reflection, or findings here. Be thorough and thoughtful..."
                className="w-full p-4 rounded-2xl bg-white border border-[#E6DEFF] hover:border-primary/40 text-xs sm:text-sm text-[#1b1831] placeholder-[#737A73] focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black transition-all leading-relaxed shadow-2xs"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E6DEFF]">
              <button
                type="button"
                onClick={() => {
                  updateAssignmentStatus(selectedAssignment.id, 'In Progress');
                  setActiveModal(null);
                }}
                className="w-full sm:w-auto py-2.5 px-5 rounded-full text-xs font-semibold text-[#6A6678] hover:text-[#1b1831] bg-[#FCF8FF] border border-[#E6DEFF] hover:border-primary/40 transition-colors cursor-pointer shadow-xs"
              >
                Save as Draft
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full sm:w-auto py-2.5 px-4 rounded-full text-xs font-semibold text-[#1b1831] hover:bg-[#F3EFFF] border border-transparent transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitModal}
                  className="w-full sm:w-auto py-2.5 px-6 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] hover:border-primary/40 transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Assignment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          7. VIEW SUBMISSION MODAL
          ───────────────────────────────────────────────────────────── */}
      {activeModal === 'submission' && selectedAssignment && selectedAssignment.submission && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="w-full max-w-xl bg-white rounded-3xl border border-[#E6DEFF] shadow-2xl p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E6DEFF]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full border border-[#E6DEFF]">
                  Recorded Submission
                </span>
                <h2 className=" text-xl sm:text-2xl font-bold text-[#1b1831] mt-1.5">
                  {selectedAssignment.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-full text-[#6A6678] hover:text-[#1b1831] hover:bg-[#F3EFFF] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#6A6678]">
                <span>Status: <strong className="text-primary">{selectedAssignment.status}</strong></span>
                <span>Submitted: {selectedAssignment.submission.submittedAt}</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] text-xs sm:text-sm text-[#1b1831] whitespace-pre-wrap leading-relaxed shadow-2xs">
                {selectedAssignment.submission.content}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#E6DEFF]">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="py-2.5 px-6 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] hover:border-primary/40 transition-colors cursor-pointer shadow-xs"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          8. VIEW FEEDBACK MODAL
          ───────────────────────────────────────────────────────────── */}
      {activeModal === 'feedback' && selectedAssignment && selectedAssignment.feedback && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="w-full max-w-xl bg-white rounded-3xl border border-[#E6DEFF] shadow-2xl p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E6DEFF]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-[#E6DEFF]">
                  Mentor & Advisory Feedback
                </span>
                <h2 className=" text-xl sm:text-2xl font-bold text-[#1b1831] mt-1.5">
                  {selectedAssignment.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-full text-[#6A6678] hover:text-[#1b1831] hover:bg-[#F3EFFF] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-[#F3EFFF]/60 border border-[#E6DEFF] shadow-2xs space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-primary">{selectedAssignment.feedback.author}</span>
                <span className="text-[#6A6678]">{selectedAssignment.feedback.date}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#1b1831] leading-relaxed italic">
                "{selectedAssignment.feedback.comment}"
              </p>
            </div>

            {selectedAssignment.status === 'Needs Revision' && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-[#E6DEFF] text-xs text-rose-900 flex items-center justify-between shadow-2xs">
                <span>This assignment requires revisions before final completion.</span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal('work');
                    setSubmissionDraft(selectedAssignment.submission?.content || '');
                  }}
                  className="font-bold text-rose-950 underline ml-2 cursor-pointer"
                >
                  Open Editor →
                </button>
              </div>
            )}

            <div className="flex justify-end pt-4 border-t border-[#E6DEFF]">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="py-2.5 px-6 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] hover:border-primary/40 transition-colors cursor-pointer shadow-xs"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default StudentAssignmentsPage;
