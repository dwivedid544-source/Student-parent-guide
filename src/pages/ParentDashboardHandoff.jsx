import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  ShieldCheck,
  Sparkles,
  Rocket,
  Clock,
  BookOpen,
  Settings,
  LogOut,
  ChevronRight,
  Plus,
  Play,
  CheckCircle2,
  Lock,
  FileText,
  Check,
  RotateCcw,
  MessageSquare,
  AlertTriangle,
  ExternalLink,
  Eye,
  Send,
  Loader2,
  X
} from 'lucide-react';
import { LifeVerseLogo } from '../components/common/LifeVerseLogo';
import { useOnboarding } from '../context/OnboardingContext';
import { fetchAssignmentsApi, submitReviewFeedbackApi } from '../services/assignmentApi';
import avatarSparkyImg from '../assets/avatar_sparky.png';

export const ParentDashboardHandoff = () => {
  const navigate = useNavigate();
  const {
    parentAccount,
    childrenList,
    switchRole,
    logout,
  } = useOnboarding();

  const [activeChildTab, setActiveChildTab] = useState(childrenList[0]?.id || 'child_1');

  const selectedChild =
    childrenList.find((c) => c.id === activeChildTab) || childrenList[0];

  // Review Workflow state for Parent Review Process
  const [childAssignments, setChildAssignments] = useState([]);
  const [isLoadingAssignments, setIsLoadingAssignments] = useState(false);
  const [reviewModalAsg, setReviewModalAsg] = useState(null);
  const [reviewStatusInput, setReviewStatusInput] = useState('Completed');
  const [reviewCommentInput, setReviewCommentInput] = useState('');
  const [revisionInstructionsInput, setRevisionInstructionsInput] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewToast, setReviewToast] = useState(null);

  // Load assignments for selected child to support review process
  const loadChildAssignments = async () => {
    setIsLoadingAssignments(true);
    const res = await fetchAssignmentsApi('student_1');
    setIsLoadingAssignments(false);
    if (res.success) {
      setChildAssignments(res.assignments || []);
    }
  };

  useEffect(() => {
    loadChildAssignments();
  }, [selectedChild]);

  const handleOpenReviewModal = (asg) => {
    setReviewModalAsg(asg);
    setReviewStatusInput(asg.status === 'Needs Revision' ? 'Needs Revision' : 'Completed');
    setReviewCommentInput(asg.feedback?.comment || 'Excellent reflection demonstrating authentic growth and empathy.');
    setRevisionInstructionsInput(asg.feedback?.revisionInstructions || 'Please expand on Question 2 with an example.');
  };

  const handleSaveParentReview = async () => {
    if (!reviewModalAsg) return;
    setIsSubmittingReview(true);

    const reviewerPayload = {
      status: reviewStatusInput,
      reviewer: parentAccount?.name ? `${parentAccount.name} (Parent Reviewer)` : 'Sarah Jenkins (Mentor)',
      feedback: reviewStatusInput === 'Submitted' || reviewStatusInput === 'Under Review' ? null : {
        author: parentAccount?.name ? `${parentAccount.name} (Parent Reviewer)` : 'Sarah Jenkins (Mentor)',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        role: 'Parent Reviewer & Mentor',
        comment: reviewCommentInput.trim() || 'Reviewed and evaluated.',
        revisionInstructions: reviewStatusInput === 'Needs Revision' ? revisionInstructionsInput.trim() : null
      }
    };

    const res = await submitReviewFeedbackApi(reviewModalAsg.id, reviewerPayload, 'student_1');
    setIsSubmittingReview(false);

    if (res.success) {
      setReviewToast(`Review recorded: Assignment "${reviewModalAsg.title}" updated to status "${reviewStatusInput}".`);
      setReviewModalAsg(null);
      await loadChildAssignments();
      setTimeout(() => setReviewToast(null), 5000);
    } else {
      alert(`Error updating review: ${res.error || 'Server error'}`);
    }
  };

  const handleLaunchChildFeedback = (childId, assignmentId) => {
    switchRole('CHILD', childId);
    navigate(`/child/assignments/${assignmentId}/feedback`);
  };

  const handleLaunchChildMode = (childId) => {
    switchRole('CHILD', childId);
    navigate('/child/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#081325] text-white font-nunito selection:bg-[#F45124] selection:text-white">
      
      {/* Top Parent Dashboard Header */}
      <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 border-b border-white/10 bg-[#0c1b2d]/90 backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <LifeVerseLogo />
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#65BDEB]/15 border border-[#65BDEB]/30 text-xs font-bold text-[#65BDEB]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Parent Control Hub</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-xs font-bold text-white">
              {parentAccount?.name || 'Alex McWonder'}
            </span>
            <span className="text-[11px] text-white/60">
              {parentAccount?.email}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
            title="Sign out of Parent Account"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        
        {/* Handoff Notice Banner */}
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#65BDEB]/20 via-[#9375E8]/15 to-[#F45124]/20 border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#65BDEB]/30 border border-[#65BDEB] flex items-center justify-center text-xl shrink-0">
              🚀
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h2 className="text-sm sm:text-base font-extrabold text-white font-poppins">
                  Project 02 Destination Handoff: Parent Dashboard
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#FFD66B] text-[#081325] text-[10px] font-black uppercase">
                  Frontend Ready
                </span>
              </div>
              <p className="text-xs text-white/80 mt-0.5">
                Authentication & Family Onboarding is fully connected. Below is the family management state ready for Project 03 integration.
              </p>
            </div>
          </div>

          <Link
            to="/onboarding/child"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add / Edit Children</span>
          </Link>
        </div>

        {/* Children Explorer Switcher Tabs */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/60">
              Family Explorers ({childrenList.length})
            </span>
            <span className="text-xs text-[#65BDEB]">
              Click a child to review learning analytics or launch Child Universe
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {childrenList.map((child) => {
              const isSelected = child.id === activeChildTab;
              return (
                <div
                  key={child.id}
                  onClick={() => setActiveChildTab(child.id)}
                  className={`p-4 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                    isSelected
                      ? 'border-[#F45124] bg-white/15 shadow-xl shadow-orange-500/20 ring-2 ring-[#F45124]/50'
                      : 'border-white/15 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/30 bg-[#0c1b2d] shrink-0">
                        <img
                          src={child.avatar?.avatarImg || avatarSparkyImg}
                          alt={child.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white font-poppins">
                          {child.name}
                        </h3>
                        <span className="text-xs text-[#65BDEB] font-semibold">
                          {child.ageGroup} • {child.grade || 'Grade 1'}
                        </span>
                      </div>
                    </div>
                    
                    <span className="text-[11px] font-bold text-white/60 bg-white/10 px-2.5 py-1 rounded-full">
                      PIN: {child.pin || '1234'}
                    </span>
                  </div>

                  {/* Actions for this child */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-white/70">
                      Profile: <strong className="text-white">HighOrbit Student</strong>
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLaunchChildMode(child.id);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[#193F30] hover:bg-[#204936] shadow-md transition-all cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>Enter Student Sanctuary</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Child Detailed Overview */}
        {selectedChild && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold text-[#FFD66B] uppercase tracking-wider">
                  Active Student Focus
                </span>
                <h2 className="text-2xl font-bold text-white font-poppins mt-0.5">
                  {selectedChild.name} ({selectedChild.nickname})
                </h2>
              </div>

              <button
                type="button"
                onClick={() => handleLaunchChildMode(selectedChild.id)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-extrabold text-white bg-[#193F30] hover:bg-[#204936] hover:scale-[1.02] transition-all shadow-lg cursor-pointer"
              >
                <Rocket className="w-4 h-4" />
                <span>Switch to {selectedChild.nickname}'s Sanctuary</span>
              </button>
            </div>

            {/* Quick Metrics Demo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <Clock className="w-8 h-8 text-[#65BDEB] shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-white/60 uppercase">Weekly Screen Time</span>
                  <div className="text-lg font-black text-white">45 min / day</div>
                  <span className="text-[11px] text-emerald-400">Within healthy limit</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-[#FFD66B] shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-white/60 uppercase">Quests Completed</span>
                  <div className="text-lg font-black text-white">12 Quests</div>
                  <span className="text-[11px] text-[#65BDEB]">+3 this week</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-[#F45124] shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-white/60 uppercase">AI Curiosity Level</span>
                  <div className="text-lg font-black text-white">Level 4 Explorer</div>
                  <span className="text-[11px] text-purple-300">Space & Logic focus</span>
                </div>
              </div>
            </div>

            {/* Profile Configuration Pills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-white/70 block mb-2">
                  Active Passions & Interests
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedChild.interests || ['Space & Science']).map((int) => (
                    <span
                      key={int}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FFD66B]/20 text-[#FFD66B] border border-[#FFD66B]/30"
                    >
                      {int}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-white/70 block mb-2">
                  Target Developmental Goals
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedChild.learningGoals || ['Improve Problem Solving']).map((goal) => (
                    <span
                      key={goal}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-[#65BDEB]/20 text-[#65BDEB] border border-[#65BDEB]/30"
                    >
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            Parent & Mentor Assignment Review Hub
            Maintains compatibility with existing review workflow
            ───────────────────────────────────────────────────────────── */}
        {selectedChild && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold text-[#65BDEB] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#65BDEB]" />
                  <span>Parent & Mentor Review Hub</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-poppins mt-0.5">
                  Review & Feedback Management
                </h3>
                <p className="text-xs text-white/70 mt-1">
                  Evaluate {selectedChild.name}'s submissions, issue developmental feedback, or request revisions.
                </p>
              </div>

              <button
                type="button"
                onClick={loadChildAssignments}
                disabled={isLoadingAssignments}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isLoadingAssignments ? 'animate-spin' : ''}`} />
                <span>Refresh Queue</span>
              </button>
            </div>

            {/* Review Toast Notice */}
            {reviewToast && (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-200 text-xs sm:text-sm flex items-center justify-between animate-fadeIn">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                  <span className="font-semibold">{reviewToast}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setReviewToast(null)}
                  className="p-1 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Review Status Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-blue-500/15 border border-blue-400/30 text-xs">
                <span className="text-blue-300 block font-bold uppercase text-[10px]">Submitted</span>
                <div className="text-xl font-black text-white mt-1">
                  {childAssignments.filter((a) => a.status === 'Submitted').length}
                </div>
                <span className="text-[10px] text-white/60">Awaiting initial check</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-xs">
                <span className="text-amber-300 block font-bold uppercase text-[10px]">Under Review</span>
                <div className="text-xl font-black text-white mt-1">
                  {childAssignments.filter((a) => a.status === 'Under Review').length}
                </div>
                <span className="text-[10px] text-white/60">Currently evaluating</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-400/30 text-xs">
                <span className="text-rose-300 block font-bold uppercase text-[10px]">Needs Revision</span>
                <div className="text-xl font-black text-white mt-1">
                  {childAssignments.filter((a) => a.status === 'Needs Revision').length}
                </div>
                <span className="text-[10px] text-white/60">Revision requested</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 text-xs">
                <span className="text-emerald-300 block font-bold uppercase text-[10px]">Completed</span>
                <div className="text-xl font-black text-white mt-1">
                  {childAssignments.filter((a) => a.status === 'Completed').length}
                </div>
                <span className="text-[10px] text-white/60">Approved & mastered</span>
              </div>
            </div>

            {/* Submissions Review Table / Cards */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-white/70 block">
                Active Submissions Queue
              </span>

              {childAssignments
                .filter((a) => a.status === 'Submitted' || a.status === 'Under Review' || a.status === 'Needs Revision' || a.status === 'Completed')
                .map((asg) => (
                  <div
                    key={asg.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 max-w-xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full">
                          {asg.subject}
                        </span>

                        <span
                          className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            asg.status === 'Completed'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                              : asg.status === 'Needs Revision'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
                              : asg.status === 'Under Review'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                              : 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                          }`}
                        >
                          {asg.status}
                        </span>

                        {asg.submission?.submittedAt && (
                          <span className="text-[11px] text-white/60 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#65BDEB]" />
                            <span>Submitted: {asg.submission.submittedAt}</span>
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-white font-poppins">
                        {asg.title}
                      </h4>

                      {/* Feedback snippet or pending notice */}
                      {asg.feedback ? (
                        <div className="text-xs text-white/80 bg-black/20 p-2.5 rounded-xl border border-white/10">
                          <strong className="text-[#65BDEB] font-semibold">{asg.feedback.author}: </strong>
                          <span className="italic">"{asg.feedback.comment}"</span>
                          {asg.feedback.revisionInstructions && (
                            <div className="text-rose-300 mt-1 text-[11px]">
                              <strong>Revision Note:</strong> {asg.feedback.revisionInstructions}
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-white/50 italic">
                          No feedback recorded yet. Reviewer has not issued remarks.
                        </p>
                      )}
                    </div>

                    {/* Review Actions */}
                    <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
                      <button
                        type="button"
                        onClick={() => handleOpenReviewModal(asg)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-[#193F30] hover:bg-[#204936] transition-all cursor-pointer shadow-md"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Update Review</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLaunchChildFeedback(selectedChild.id, asg.id)}
                        className="inline-flex items-center justify-center p-2 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
                        title="View Student's Feedback Page"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        )}

      </main>

      {/* ─────────────────────────────────────────────────────────────
          Modal: Parent / Mentor Review & Feedback Editor
          ───────────────────────────────────────────────────────────── */}
      {reviewModalAsg && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-lg bg-[#0e1e33] border border-white/20 rounded-3xl p-6 sm:p-7 space-y-5 text-white shadow-2xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#65BDEB] bg-[#65BDEB]/15 px-2.5 py-0.5 rounded-full border border-[#65BDEB]/30">
                  Review Workflow
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-1">
                  Evaluate: {reviewModalAsg.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setReviewModalAsg(null)}
                className="p-1 rounded-full text-white/60 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target Status Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-white/80 block">
                Assign Review Status:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Submitted', 'Under Review', 'Completed', 'Needs Revision'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setReviewStatusInput(st)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                      reviewStatusInput === st
                        ? 'bg-[#193F30] text-white ring-2 ring-[#65BDEB]'
                        : 'bg-white/10 text-white/70 hover:bg-white/15'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Mentor Comments Input */}
            {(reviewStatusInput === 'Completed' || reviewStatusInput === 'Needs Revision') && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/80 block">
                  Reviewer Notes & Constructive Feedback:
                </label>
                <textarea
                  rows={3}
                  value={reviewCommentInput}
                  onChange={(e) => setReviewCommentInput(e.target.value)}
                  placeholder="Share praise, observations, and encouragement..."
                  className="w-full p-3 rounded-2xl bg-black/40 border border-white/20 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-hidden focus:border-[#65BDEB]"
                />
              </div>
            )}

            {/* Revision Instructions Input (Only when Needs Revision) */}
            {reviewStatusInput === 'Needs Revision' && (
              <div className="space-y-1.5 p-3 rounded-2xl bg-rose-500/15 border border-rose-400/30">
                <label className="text-xs font-bold text-rose-300 block flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Revision Instructions for Student:</span>
                </label>
                <textarea
                  rows={3}
                  value={revisionInstructionsInput}
                  onChange={(e) => setRevisionInstructionsInput(e.target.value)}
                  placeholder="Specify exact modifications or question expansions required..."
                  className="w-full p-3 rounded-xl bg-black/50 border border-rose-300/40 text-xs text-white placeholder-white/40 focus:outline-hidden focus:border-rose-400"
                />
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setReviewModalAsg(null)}
                disabled={isSubmittingReview}
                className="py-2.5 px-4 rounded-full text-xs font-semibold text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveParentReview}
                disabled={isSubmittingReview}
                className="py-2.5 px-6 rounded-full text-xs font-bold text-white bg-[#193F30] hover:bg-[#204936] transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                {isSubmittingReview ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving Review...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Confirm & Update Status</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-white/50 border-t border-white/10">
        <p>© 2026 LifeVerse AI Parent Portal. Safe family learning environment.</p>
      </footer>

    </div>
  );
};

export default ParentDashboardHandoff;

