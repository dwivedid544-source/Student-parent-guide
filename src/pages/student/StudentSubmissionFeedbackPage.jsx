import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sparkles,
  Download,
  RotateCcw,
  AlertTriangle,
  FileCheck,
  Check,
  ShieldAlert,
  Loader2,
  X,
  MessageSquare,
  Eye,
  Send,
  HelpCircle,
  ShieldCheck,
  UserCheck,
  History,
  Lock,
  ChevronRight,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import { useStudent } from '../../context/StudentContext';
import { fetchAssignmentByIdApi, submitAssignmentApi } from '../../services/assignmentApi';

export const StudentSubmissionFeedbackPage = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { activeChild, isAuthenticated } = useOnboarding();
  const { assignments, submitAssignment } = useStudent();

  // Filter student's authorized assignments that have been submitted, reviewed, or are under review
  const authorizedSubmissions = useMemo(() => {
    if (!activeChild) return [];
    return assignments.filter(
      (a) =>
        (!a.studentId || a.studentId === activeChild.id) &&
        (a.status === 'Submitted' ||
          a.status === 'Under Review' ||
          a.status === 'Completed' ||
          a.status === 'Needs Revision' ||
          a.submission)
    );
  }, [assignments, activeChild]);

  // Target assignment: match assignmentId or default to the first submitted assignment
  const targetId = assignmentId || authorizedSubmissions[0]?.id;
  const assignment = useMemo(() => {
    return assignments.find((a) => a.id === targetId);
  }, [assignments, targetId]);

  // Authorization check (Enforces ownership: student cannot access another student's submission)
  const isAuthorized = useMemo(() => {
    if (!assignment || !activeChild) return false;
    return !assignment.studentId || assignment.studentId === activeChild.id;
  }, [assignment, activeChild]);

  // UI state for revision modal / resubmission
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [revisionAnswers, setRevisionAnswers] = useState({});
  const [isSubmittingRevision, setIsSubmittingRevision] = useState(false);
  const [revisionSuccessNotice, setRevisionSuccessNotice] = useState(null);
  const [revisionError, setRevisionError] = useState(null);
  const [selectedHistoryVersion, setSelectedHistoryVersion] = useState(null);

  // Initialize revision answers if authorized
  useEffect(() => {
    if (assignment) {
      setRevisionAnswers(assignment.submission?.answers || assignment.draftAnswers || {});
    }
  }, [assignment]);

  // Status Styling Helper
  const getStatusConfig = (status) => {
    switch (status) {
      case 'Submitted':
        return {
          badge: 'bg-blue-100 text-blue-900 border border-blue-200',
          dot: 'bg-blue-600',
          title: 'Submitted & Queued for Review',
          description: 'Your assignment reflection has been securely submitted and is awaiting mentor assignment.'
        };
      case 'Under Review':
        return {
          badge: 'bg-amber-100 text-amber-900 border border-amber-300',
          dot: 'bg-amber-600',
          title: 'Under Active Mentor Evaluation',
          description: 'A mentor or reviewer is currently evaluating your reflection and preparing guidance.'
        };
      case 'Needs Revision':
        return {
          badge: 'bg-rose-100 text-rose-900 border border-rose-300',
          dot: 'bg-rose-600',
          title: 'Revision Requested by Mentor',
          description: 'Review the mentor feedback below, update your answers, and resubmit your reflection.'
        };
      case 'Completed':
        return {
          badge: 'bg-[#8bcefe] text-primary border border-[#78b390]',
          dot: 'bg-primary',
          title: 'Approved & Completed',
          description: 'Your assignment has been fully reviewed, approved, and marked complete.'
        };
      default:
        return {
          badge: 'bg-gray-100 text-gray-800 border border-gray-200',
          dot: 'bg-gray-600',
          title: status,
          description: 'Assignment review in progress.'
        };
    }
  };

  // Resubmission handler (Only allowed when status is 'Needs Revision')
  const handleResubmit = async () => {
    if (assignment.status !== 'Needs Revision') return;

    setIsSubmittingRevision(true);
    setRevisionError(null);

    const payload = {
      answers: revisionAnswers,
      activityConfirmed: true,
      attachedFile: assignment.submission?.attachedFile || assignment.attachedFile || null
    };

    const res = await submitAssignmentApi(assignment.id, payload, activeChild?.id);
    setIsSubmittingRevision(false);

    if (!res.success) {
      setRevisionError(res.error || 'Failed to submit revision. Please check your answers.');
      return;
    }

    // Success: Update context and local state
    submitAssignment(assignment.id, res.submission);
    setShowRevisionModal(false);
    setRevisionSuccessNotice(
      `Revision resubmitted successfully! Submission timestamp recorded: ${res.submission.submittedAt}. Status updated to Submitted.`
    );
    setTimeout(() => setRevisionSuccessNotice(null), 6000);
  };

  // ─────────────────────────────────────────────────────────────
  // 1. ERROR & AUTHORIZATION GUARDS
  // ─────────────────────────────────────────────────────────────

  // Unauthorized access state (Attempting to access another student's submission)
  if (!isAuthenticated || (assignment && !isAuthorized)) {
    return (
      <div className="max-w-xl mx-auto py-16 px-6 text-center space-y-4 animate-fadeIn">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-800 flex items-center justify-center mx-auto border border-rose-200">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className=" text-2xl font-bold text-[#1b1831]">Access Denied</h2>
        <p className="text-sm text-[#6A6678] leading-relaxed">
          You are not authorized to access this submission. Records in HighOrbit are confidential and strictly restricted to the authenticated student owner.
        </p>
        <div className="pt-2">
          <Link
            to="/child/assignments"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-container transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to My Assignments</span>
          </Link>
        </div>
      </div>
    );
  }

  // Not found state (No submissions found or invalid ID)
  if (!assignment) {
    return (
      <div className="max-w-xl mx-auto py-16 px-6 text-center space-y-4 animate-fadeIn">
        <div className="w-16 h-16 rounded-3xl bg-[#F3EFFF] text-primary flex items-center justify-center mx-auto border border-[#E6DEFF] shadow-xs">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className=" text-2xl font-bold text-[#1b1831]">Submission Not Found</h2>
        <p className="text-sm text-[#6A6678] leading-relaxed">
          No submission or feedback record was found for assignment ID:{' '}
          <span className="font-mono text-xs font-bold text-[#1b1831] bg-[#F3EFFF] px-2 py-0.5 rounded-md border border-[#E6DEFF]">
            {targetId || 'None'}
          </span>
          .
        </p>
        <div className="pt-2">
          <Link
            to="/child/assignments"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] hover:border-primary/40 transition-all shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to My Assignments</span>
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(assignment.status);
  const isResubmissionPermitted = assignment.status === 'Needs Revision';

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn w-full max-w-[1600px] mx-auto pb-16">

      {/* ─────────────────────────────────────────────────────────────
          2. BREADCRUMBS & SUBMISSION SWITCHER
          ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E6DEFF]">
        <div className="flex items-center gap-2 text-xs">
          <Link
            to="/child/assignments"
            className="p-1.5 rounded-xl text-[#6A6678] hover:text-primary hover:bg-[#EBE5FF] transition-colors flex items-center gap-1 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>My Assignments</span>
          </Link>
          <span className="text-black/30">/</span>
          <Link
            to={`/child/assignments/${assignment.id}`}
            className="text-[#6A6678] hover:text-primary transition-colors font-medium truncate max-w-xs"
          >
            {assignment.title}
          </Link>
          <span className="text-black/30">/</span>
          <span className="text-primary font-bold">Status & Feedback</span>
        </div>

        {/* Multi-Submission Switcher Dropdown */}
        {authorizedSubmissions.length > 1 && (
          <div className="flex items-center gap-2 text-xs self-start sm:self-auto">
            <span className="text-[#6A6678] font-medium hidden md:inline">Other Submissions:</span>
            <select
              value={assignment.id}
              onChange={(e) => navigate(`/child/assignments/${e.target.value}/feedback`)}
              className="py-1.5 px-3 rounded-xl bg-white border border-[#E6DEFF] hover:border-primary/40 text-xs font-semibold text-[#1b1831] focus:outline-hidden focus:border-black cursor-pointer shadow-2xs"
            >
              {authorizedSubmissions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.status})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Resubmission Success Alert Toast */}
      {revisionSuccessNotice && (
        <div className="p-4 sm:p-5 rounded-3xl bg-[#8bcefe]/25 border-2 border-primary text-primary flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
            <div>
              <strong className="block text-sm font-bold text-primary">Revision Resubmitted!</strong>
              <p className="text-xs text-[#1b1831] mt-0.5">{revisionSuccessNotice}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setRevisionSuccessNotice(null)}
            className="p-1 rounded-lg text-primary hover:bg-primary/10 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. HERO CARD: ASSIGNMENT TITLE, STATUS, & PROGRESS STEPPER
          ───────────────────────────────────────────────────────────── */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DEFF] hover:border-primary/40 shadow-xs transition-all space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-primary bg-[#EBE5FF] border border-[#E6DEFF] px-3 py-1 rounded-full">
                {assignment.subject}
              </span>

              {assignment.activityType && (
                <span className="text-xs font-medium text-[#6A6678] bg-[#F3EFFF] border border-[#E6DEFF] px-3 py-1 rounded-full">
                  {assignment.activityType}
                </span>
              )}

              {/* Status Badge */}
              <span
                className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full flex items-center gap-1.5 border border-[#E6DEFF] ${statusConfig.badge}`}
              >
                <span className={`w-2 h-2 rounded-full ${statusConfig.dot}`} />
                <span>{assignment.status}</span>
              </span>
            </div>

            {/* Title */}
            <h1 className=" text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1b1831] tracking-tight">
              {assignment.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#6A6678] leading-relaxed">
              {statusConfig.description}
            </p>
          </div>

          {/* Quick Review Metadata Card */}
          <div className="p-5 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] shadow-2xs space-y-3 min-w-[260px] shrink-0 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#6A6678] tracking-wider block">
                Submission Date & Time
              </span>
              <div className="font-semibold text-[#1b1831] flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>{assignment.submission?.submittedAt || 'Recorded'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E6DEFF]">
              <span className="text-[10px] uppercase font-bold text-[#6A6678] tracking-wider block">
                Review Status
              </span>
              <div className="font-bold text-primary flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>{assignment.status}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E6DEFF]">
              <span className="text-[10px] uppercase font-bold text-[#6A6678] tracking-wider block">
                Assigned Mentor / Reviewer
              </span>
              <div className="font-semibold text-[#1b1831] flex items-center gap-1.5 mt-0.5">
                <UserCheck className="w-3.5 h-3.5 text-primary" />
                <span>{assignment.feedback?.author || assignment.reviewer || 'Sarah Jenkins (Mentor)'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E6DEFF]">
              <span className="text-[10px] uppercase font-bold text-[#6A6678] tracking-wider block">
                Submission Version
              </span>
              <div className="font-bold text-[#1b1831] flex items-center gap-1.5 mt-0.5">
                <History className="w-3.5 h-3.5 text-primary" />
                <span>Version {assignment.submission?.version || 1}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Stage Progressive Review Stepper */}
        <div className="pt-4 border-t border-[#E6DEFF]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6A6678] block mb-3">
            Review Progression Stage
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            
            {/* Step 1: Submitted */}
            <div
              className={`p-3.5 rounded-2xl border text-xs flex items-center gap-3 transition-all ${
                assignment.status === 'Submitted'
                  ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold ring-2 ring-blue-500/20'
                  : 'bg-[#EBE5FF] border-[#E6DEFF] text-primary'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-white border border-[#E6DEFF] flex items-center justify-center shrink-0 text-[11px] font-bold">
                ✓
              </div>
              <div>
                <span className="block font-bold">1. Submitted</span>
                <span className="text-[10px] opacity-80">Queued for review</span>
              </div>
            </div>

            {/* Step 2: Under Review */}
            <div
              className={`p-3.5 rounded-2xl border text-xs flex items-center gap-3 transition-all ${
                assignment.status === 'Under Review'
                  ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold ring-2 ring-amber-500/20'
                  : assignment.status === 'Completed' || assignment.status === 'Needs Revision'
                  ? 'bg-[#EBE5FF] border-[#E6DEFF] text-primary'
                  : 'bg-[#FCF8FF] border-[#E6DEFF] text-[#6A6678]'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-white border border-[#E6DEFF] flex items-center justify-center shrink-0 text-[11px] font-bold">
                {assignment.status === 'Completed' || assignment.status === 'Needs Revision' ? '✓' : '2'}
              </div>
              <div>
                <span className="block font-bold">2. Under Review</span>
                <span className="text-[10px] opacity-80">Reviewer evaluating</span>
              </div>
            </div>

            {/* Step 3: Mentor Evaluation */}
            <div
              className={`p-3.5 rounded-2xl border text-xs flex items-center gap-3 transition-all ${
                assignment.status === 'Completed'
                  ? 'bg-[#EBE5FF] border-[#E6DEFF] text-primary font-bold ring-2 ring-primary/20'
                  : assignment.status === 'Needs Revision'
                  ? 'bg-rose-50 border-rose-400 text-rose-950 font-bold ring-2 ring-rose-500/20'
                  : 'bg-[#FCF8FF] border-[#E6DEFF] text-[#6A6678]'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-white border border-[#E6DEFF] flex items-center justify-center shrink-0 text-[11px] font-bold">
                {assignment.status === 'Completed' ? '✓' : assignment.status === 'Needs Revision' ? '!' : '3'}
              </div>
              <div>
                <span className="block font-bold">
                  {assignment.status === 'Needs Revision' ? '3. Revision Needed' : '3. Evaluation'}
                </span>
                <span className="text-[10px] opacity-80">
                  {assignment.status === 'Needs Revision' ? 'Updates requested' : 'Feedback recorded'}
                </span>
              </div>
            </div>

            {/* Step 4: Final Mastery */}
            <div
              className={`p-3.5 rounded-2xl border text-xs flex items-center gap-3 transition-all ${
                assignment.status === 'Completed'
                  ? 'bg-[#8bcefe] border-[#E6DEFF] text-primary font-bold'
                  : 'bg-[#FCF8FF] border-[#E6DEFF] text-[#6A6678]'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-white border border-[#E6DEFF] flex items-center justify-center shrink-0 text-[11px] font-bold">
                {assignment.status === 'Completed' ? '★' : '4'}
              </div>
              <div>
                <span className="block font-bold">4. Mastery Complete</span>
                <span className="text-[10px] opacity-80">Approved and credited</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. REVIEWER FEEDBACK & REVISION INSTRUCTIONS SECTION
          ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 cols): Reviewer Feedback Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E6DEFF] hover:border-primary/40 transition-all shadow-xs space-y-5">
            
            <div className="pb-3 border-b border-[#E6DEFF] flex items-center justify-between">
              <div>
                <h2 className=" text-xl sm:text-2xl font-bold text-[#1b1831]">
                  Reviewer Feedback
                </h2>
                <p className="text-xs text-[#6A6678]">
                  Mentor evaluation and developmental guidance.
                </p>
              </div>

              {assignment.feedback && (
                <span className="text-xs font-semibold text-primary bg-[#EBE5FF] px-3 py-1 rounded-full border border-[#E6DEFF] shadow-2xs">
                  Official Review
                </span>
              )}
            </div>

            {/* Case A: Reviewer Feedback is Available */}
            {assignment.feedback ? (
              <div className="p-6 rounded-2xl bg-[#F3EFFF]/70 border border-[#E6DEFF] shadow-2xs space-y-4">
                
                {/* Reviewer Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E6DEFF]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-sm shadow-xs">
                      SJ
                    </div>
                    <div>
                      <strong className="text-sm font-bold text-[#1b1831] block">
                        {assignment.feedback.author || 'Sarah Jenkins'}
                      </strong>
                      <span className="text-xs text-[#6A6678]">
                        {assignment.feedback.role || 'Verified Leadership & Values Mentor'}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-[#6A6678] block">Review Date</span>
                    <span className="text-xs font-semibold text-[#1b1831] flex items-center gap-1 justify-end">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>{assignment.feedback.date}</span>
                    </span>
                  </div>
                </div>

                {/* Feedback Comment */}
                <div className="space-y-1.5">
                  <span className="text-[11px] uppercase font-bold text-[#6A6678] tracking-wider block">
                    Mentor Notes & Evaluation:
                  </span>
                  <div className="p-4 rounded-xl bg-white border border-[#E6DEFF] text-xs sm:text-sm text-[#1b1831] leading-relaxed italic shadow-2xs">
                    "{assignment.feedback.comment}"
                  </div>
                </div>

                {/* Case B: Revision Instructions when applicable */}
                {assignment.status === 'Needs Revision' && assignment.feedback.revisionInstructions && (
                  <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 space-y-3 animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0" />
                      <h4 className=" text-sm sm:text-base font-bold text-rose-900">
                        Required Revision Instructions:
                      </h4>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/80 border border-rose-200 text-xs sm:text-sm text-rose-950 whitespace-pre-wrap leading-relaxed font-medium">
                      {assignment.feedback.revisionInstructions}
                    </div>

                    <p className="text-[11px] text-rose-800 leading-snug">
                      Please address Sarah's requested updates above. Click <strong>"Revise & Resubmit Assignment"</strong> below to record your revised answers.
                    </p>
                  </div>
                )}

              </div>
            ) : (
              /* Case C: Feedback NOT Yet Available (Under Review or Submitted) */
              <div className="p-8 sm:p-10 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] shadow-2xs text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#EBE5FF] text-primary flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className=" text-lg font-bold text-[#1b1831]">
                  {assignment.status === 'Under Review' ? 'Review In Progress' : 'Feedback Not Yet Available'}
                </h3>
                <p className="text-xs sm:text-sm text-[#6A6678] max-w-md mx-auto leading-relaxed">
                  {assignment.status === 'Under Review'
                    ? 'Mentor Sarah Jenkins has opened your submission and is actively reviewing your reflection. Constructive guidance and rubric scores will appear here once finalized.'
                    : 'Your assignment reflection has been securely delivered to the review queue. A mentor will review your submission shortly. No reviewer feedback has been issued yet.'}
                </p>
                <div className="text-[11px] text-primary font-semibold pt-1">
                  • Server timestamp verified • Read-only review guarantee •
                </div>
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────────
                ACTIONS & RESUBMIT BUTTON (Permitted ONLY for Needs Revision)
                ───────────────────────────────────────────────────────────── */}
            <div className="pt-4 border-t border-[#E6DEFF] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <Link
                to={`/child/assignments/${assignment.id}`}
                className="py-2.5 px-5 rounded-full text-xs font-semibold text-[#1b1831] hover:text-black bg-white border border-[#E6DEFF] hover:border-primary/40 hover:bg-[#FCF8FF] transition-all inline-flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Full Assignment Details</span>
              </Link>

              {/* Resubmit Button - Rendered ONLY when status is Needs Revision */}
              {isResubmissionPermitted ? (
                <button
                  type="button"
                  onClick={() => setShowRevisionModal(true)}
                  className="py-2.5 px-6 rounded-full text-xs font-semibold text-white bg-rose-800 hover:bg-rose-900 border border-[#E6DEFF] hover:border-primary/40 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Revise & Resubmit Assignment</span>
                </button>
              ) : (
                <div className="text-[11px] text-[#6A6678] italic flex items-center gap-1.5 justify-center sm:justify-end">
                  <Lock className="w-3.5 h-3.5 text-[#6A6678]" />
                  <span>
                    {assignment.status === 'Completed'
                      ? 'Resubmission locked: Assignment is completed'
                      : 'Resubmission locked: Pending mentor review'}
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right Column (5 cols): Submitted Answers Record & History */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E6DEFF] hover:border-primary/40 transition-all shadow-xs space-y-5">
            
            <div className="pb-3 border-b border-[#E6DEFF] flex items-center justify-between">
              <div>
                <h3 className=" text-lg font-bold text-[#1b1831]">
                  Submitted Record
                </h3>
                <p className="text-xs text-[#6A6678]">
                  Authorized submission answers on file.
                </p>
              </div>

              <span className="text-xs font-bold text-[#1b1831] bg-[#FCF8FF] px-2.5 py-1 rounded-lg border border-[#E6DEFF]">
                Version {assignment.submission?.version || 1}
              </span>
            </div>

            {/* Activity Completed Indicator */}
            <div className="p-3 rounded-2xl bg-[#EBE5FF] border border-[#9CCDB0] flex items-center gap-2.5 text-xs text-primary font-semibold">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <span>Activity Steps Confirmed Completed</span>
            </div>

            {/* Submitted Answers List */}
            <div className="space-y-3.5 max-h-[380px] overflow-y-auto no-scrollbar">
              {(assignment.requiredQuestions || []).map((q, idx) => (
                <div key={q.id} className="p-3.5 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] space-y-1 text-xs">
                  <div className="font-bold text-[#1b1831] flex items-center justify-between">
                    <span>Q{idx + 1}. {q.title}</span>
                    <span className="text-[10px] text-[#6A6678] uppercase">{q.type.replace('_', ' ')}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-[#E6DEFF] text-[#1b1831] whitespace-pre-wrap leading-relaxed shadow-2xs">
                    {assignment.submission?.answers?.[q.id] ||
                      assignment.draftAnswers?.[q.id] ||
                      '(No response recorded)'}
                  </div>
                </div>
              ))}

              {/* Attached file summary if present */}
              {assignment.submission?.attachedFile && (
                <div className="p-3 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <FileCheck className="w-4 h-4 text-primary shrink-0" />
                    <div className="overflow-hidden">
                      <span className="font-bold text-[#1b1831] block truncate">
                        {assignment.submission.attachedFile.name}
                      </span>
                      <span className="text-[10px] text-[#6A6678]">Verified Attachment</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    On Record
                  </span>
                </div>
              )}
            </div>

            {/* Submission History Log where supported */}
            {assignment.submissionHistory && assignment.submissionHistory.length > 0 && (
              <div className="pt-3 border-t border-[#E6DEFF] space-y-2">
                <span className="text-[11px] uppercase font-bold text-[#6A6678] tracking-wider block">
                  Submission History Timeline ({assignment.submissionHistory.length + 1} iterations):
                </span>
                <div className="space-y-1.5">
                  {assignment.submissionHistory.map((h, hIdx) => (
                    <div
                      key={hIdx}
                      className="p-2.5 rounded-xl bg-[#FCF8FF] border border-[#E6DEFF] text-xs flex items-center justify-between text-[#6A6678]"
                    >
                      <div className="flex items-center gap-2">
                        <History className="w-3.5 h-3.5 text-primary" />
                        <span>Version {h.version || hIdx + 1}</span>
                      </div>
                      <span className="text-[10px]">{h.submittedAt}</span>
                    </div>
                  ))}
                  <div className="p-2.5 rounded-xl bg-[#EBE5FF] border border-[#E6DEFF] text-xs flex items-center justify-between text-primary font-bold">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Version {assignment.submission?.version || 2} (Current)</span>
                    </div>
                    <span className="text-[10px]">{assignment.submission?.submittedAt || 'Latest'}</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. MODAL: RESUBMISSION DRAWER (Authorized for Needs Revision)
          ───────────────────────────────────────────────────────────── */}
      {showRevisionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-2xl bg-white rounded-3xl border border-[#E6DEFF] shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto no-scrollbar">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E6DEFF]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full border border-[#E6DEFF]">
                  Authorized Resubmission
                </span>
                <h3 className=" text-xl sm:text-2xl font-bold text-[#1b1831] mt-1">
                  Revise & Resubmit Reflection
                </h3>
                <p className="text-xs text-[#6A6678]">
                  Update your responses addressing Sarah Jenkins's guidance notes.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowRevisionModal(false)}
                className="p-1 rounded-full text-[#6A6678] hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mentor Guidance Reminder */}
            {assignment.feedback?.revisionInstructions && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-1">
                <strong className="block font-bold text-amber-900">Mentor Instructions:</strong>
                <p className="italic whitespace-pre-wrap">{assignment.feedback.revisionInstructions}</p>
              </div>
            )}

            {revisionError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-xs font-semibold text-rose-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-700 shrink-0" />
                <span>{revisionError}</span>
              </div>
            )}

            {/* Questions Revision Form */}
            <div className="space-y-4">
              {(assignment.requiredQuestions || []).map((q, idx) => (
                <div key={q.id} className="p-4 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] space-y-2 text-xs">
                  <div className="font-bold text-[#1b1831] flex items-center justify-between">
                    <span>Q{idx + 1}. {q.title}</span>
                    {q.required && <span className="text-rose-600 font-bold">*</span>}
                  </div>

                  {q.type === 'single_choice' && (
                    <div className="space-y-1.5 pt-1">
                      {q.options?.map((opt, oIdx) => (
                        <label
                          key={oIdx}
                          className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                            revisionAnswers[q.id] === opt
                              ? 'bg-primary text-white border-primary font-semibold'
                              : 'bg-white text-[#1b1831] border-[#E6DEFF] hover:border-primary/40 shadow-2xs'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`rev_${q.id}`}
                            value={opt}
                            checked={revisionAnswers[q.id] === opt}
                            onChange={() => setRevisionAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                            className="hidden"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {q.type === 'short_text' && (
                    <input
                      type="text"
                      value={revisionAnswers[q.id] || ''}
                      onChange={(e) => setRevisionAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-white border border-[#E6DEFF] focus:border-black/60 text-xs text-[#1b1831] focus:outline-hidden shadow-2xs"
                    />
                  )}

                  {(q.type === 'long_text' || q.type === 'reflection') && (
                    <textarea
                      rows={4}
                      value={revisionAnswers[q.id] || ''}
                      onChange={(e) => setRevisionAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-white border border-[#E6DEFF] focus:border-black/60 text-xs text-[#1b1831] focus:outline-hidden leading-relaxed shadow-2xs"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E6DEFF]">
              <button
                type="button"
                onClick={() => setShowRevisionModal(false)}
                disabled={isSubmittingRevision}
                className="py-2.5 px-5 rounded-full text-xs font-semibold text-[#1b1831] hover:text-black bg-white border border-[#E6DEFF] hover:border-primary/40 hover:bg-[#FCF8FF] transition-all cursor-pointer shadow-xs"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleResubmit}
                disabled={isSubmittingRevision}
                className="py-2.5 px-6 rounded-full text-xs font-semibold text-white bg-rose-800 hover:bg-rose-900 border border-[#E6DEFF] hover:border-primary/40 transition-all flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isSubmittingRevision ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Transmitting Revision...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirm & Resubmit Revision</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default StudentSubmissionFeedbackPage;
