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
  Save,
  Send,
  Play,
  Eye,
  MessageSquare,
  RotateCcw,
  AlertTriangle,
  FileCheck,
  Check,
  HelpCircle,
  ShieldAlert,
  Loader2,
  X,
  UploadCloud,
  Trash2,
  Paperclip,
  CheckSquare,
  Square,
  ShieldCheck,
  AlertOctagon
} from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import { useStudent } from '../../context/StudentContext';
import {
  saveAssignmentDraftApi,
  submitAssignmentApi,
  validateAttachmentFile
} from '../../services/assignmentApi';

export const StudentAssignmentDetailsPage = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { activeChild, isAuthenticated } = useOnboarding();
  const {
    assignments,
    updateAssignmentStatus,
    saveAssignmentDraft,
    submitAssignment
  } = useStudent();

  // Load target assignment
  const assignment = useMemo(() => {
    return assignments.find((a) => a.id === assignmentId);
  }, [assignments, assignmentId]);

  // Authorization check (Client + verified with server x-student-id)
  const isAuthorized = useMemo(() => {
    if (!assignment || !activeChild) return false;
    return !assignment.studentId || assignment.studentId === activeChild.id;
  }, [assignment, activeChild]);

  // Form answers state
  const [answers, setAnswers] = useState({});
  const [activityConfirmed, setActivityConfirmed] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [attachedFile, setAttachedFile] = useState(null);
  const [fileError, setFileError] = useState(null);

  // Status & Validation states
  const [isDirty, setIsDirty] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveStatusMessage, setSaveStatusMessage] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [serverValidationErrors, setServerValidationErrors] = useState(null);
  const [networkError, setNetworkError] = useState(null);
  const [submissionSuccessNotice, setSubmissionSuccessNotice] = useState(null);

  // Modals
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [pendingNavigationPath, setPendingNavigationPath] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [activeTab, setActiveTab] = useState('assignment'); // 'assignment' | 'submission' | 'feedback'

  // Initialize draft answers and attachment
  useEffect(() => {
    if (assignment) {
      const initial = assignment.draftAnswers || assignment.submission?.answers || {};
      setAnswers(initial);
      setActivityConfirmed(assignment.activityConfirmed || assignment.submission?.activityConfirmed || false);
      setAttachedFile(assignment.attachedFile || assignment.submission?.attachedFile || null);
      setIsDirty(false);

      // Check query parameter to switch tabs
      const params = new URLSearchParams(location.search);
      if (params.get('tab') === 'feedback' && assignment.feedback) {
        setActiveTab('feedback');
      } else if (params.get('tab') === 'submission' && assignment.submission) {
        setActiveTab('submission');
      }
    }
  }, [assignment, location.search]);

  // Check if overdue
  const currentDate = new Date();
  const isOverdue = useMemo(() => {
    if (!assignment) return false;
    if (assignment.status === 'Completed' || assignment.status === 'Submitted') return false;
    if (!assignment.dueDateIso) return false;
    return new Date(assignment.dueDateIso).getTime() < currentDate.getTime();
  }, [assignment, currentDate]);

  // Warn before discarding unsaved changes on browser reload / tab close
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // Handle field change
  const handleAnswerChange = (questionId, value) => {
    if (assignment.status === 'Submitted' || assignment.status === 'Completed') return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    setIsDirty(true);
    setValidationError(null);
    setServerValidationErrors(null);
    setNetworkError(null);
  };

  // Toggle step checklist
  const toggleStep = (stepIndex) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepIndex)) {
        next.delete(stepIndex);
      } else {
        next.add(stepIndex);
      }
      return next;
    });
  };

  // File Upload Handler
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateAttachmentFile(file);
    if (!validation.valid) {
      setFileError(validation.error);
      return;
    }

    setFileError(null);
    const fileInfo = {
      name: file.name,
      size: file.size,
      type: file.type,
      formattedSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`
    };
    setAttachedFile(fileInfo);
    setIsDirty(true);
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
    setFileError(null);
    setIsDirty(true);
  };

  // Safe navigation with unsaved changes prompt
  const handleBackNavigation = () => {
    if (isDirty) {
      setShowUnsavedModal(true);
      setPendingNavigationPath('/child/assignments');
    } else {
      navigate('/child/assignments');
    }
  };

  const confirmDiscardChanges = () => {
    setIsDirty(false);
    setShowUnsavedModal(false);
    if (pendingNavigationPath) {
      navigate(pendingNavigationPath);
    }
  };

  // Action 1: Start Assignment
  const handleStartAssignment = () => {
    updateAssignmentStatus(assignment.id, 'In Progress');
    setSaveStatusMessage('Assignment started. You can now complete the activity steps and record your responses.');
    setTimeout(() => setSaveStatusMessage(null), 4000);
  };

  // Action 2: Save Progress (Server-side draft saving with local fallback)
  const handleSaveProgress = async () => {
    setIsSavingDraft(true);
    setNetworkError(null);

    const draftPayload = {
      answers,
      activityConfirmed,
      attachedFile
    };

    // Coordinate with backend server API
    const res = await saveAssignmentDraftApi(assignment.id, draftPayload, activeChild?.id);
    setIsSavingDraft(false);

    if (res.networkError) {
      // Preserve progress locally despite network failure
      saveAssignmentDraft(assignment.id, draftPayload);
      setIsDirty(false);
      setNetworkError('Network warning: Draft saved locally, but could not sync with server.');
      setTimeout(() => setNetworkError(null), 5000);
      return;
    }

    if (!res.success) {
      setValidationError(res.error || 'Failed to save draft progress.');
      return;
    }

    // Server confirmed draft save
    saveAssignmentDraft(assignment.id, draftPayload);
    setIsDirty(false);
    setSaveStatusMessage(res.message || 'Your draft progress has been safely saved on the server.');
    setTimeout(() => setSaveStatusMessage(null), 4000);
  };

  // Action 3: Review Answers Step (Validation before opening review modal)
  const handleOpenReviewModal = () => {
    setValidationError(null);
    setServerValidationErrors(null);
    setNetworkError(null);

    // Validate Activity Completion
    if (!activityConfirmed) {
      setValidationError('Activity Confirmation Required: Please review the guidelines and confirm that you have completed the required activity steps.');
      return;
    }

    // Validate Required Questions
    if (assignment.requiredQuestions && assignment.requiredQuestions.length > 0) {
      for (const q of assignment.requiredQuestions) {
        const val = answers[q.id];
        if (q.required && (!val || !val.toString().trim())) {
          setValidationError(`Please complete required question: "${q.title}"`);
          return;
        }

        // Validate minimum word count for reflections
        if ((q.type === 'long_text' || q.type === 'reflection') && q.minWords) {
          const words = (val || '').trim().split(/\s+/).filter(Boolean).length;
          if (words < q.minWords) {
            setValidationError(`Question "${q.title}" requires at least ${q.minWords} words (current: ${words} words).`);
            return;
          }
        }
      }
    }

    setShowReviewModal(true);
  };

  // Action 4: Confirm Final Submission (Server-authoritative submission)
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setNetworkError(null);
    setServerValidationErrors(null);

    const submissionPayload = {
      answers,
      activityConfirmed: true,
      attachedFile
    };

    // Server-side validation and ownership verification
    const res = await submitAssignmentApi(assignment.id, submissionPayload, activeChild?.id);
    setIsSubmitting(false);

    if (res.networkError) {
      setShowReviewModal(false);
      setShowConfirmModal(false);
      setNetworkError('Network Connection Error: The server could not be reached. Your draft answers have been safely preserved. Please check your connection and retry.');
      return;
    }

    if (!res.success) {
      setShowReviewModal(false);
      setShowConfirmModal(false);
      if (res.validationErrors && res.validationErrors.length > 0) {
        setServerValidationErrors(res.validationErrors);
      } else {
        setValidationError(res.error || 'Submission was rejected by the server.');
      }
      return;
    }

    // Success: Server verified and saved submission
    submitAssignment(assignment.id, res.submission);
    setIsDirty(false);
    setShowReviewModal(false);
    setShowConfirmModal(false);
    setSubmissionSuccessNotice({
      message: res.message,
      submittedAt: res.submission.submittedAt,
      version: res.submission.version,
      isResubmission: res.submission.isResubmission
    });
    setActiveTab('submission');
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

  // ─────────────────────────────────────────────────────────────
  // 1. ERROR & AUTHORIZATION STATES
  // ─────────────────────────────────────────────────────────────

  // Unauthorized access state
  if (!isAuthenticated || (assignment && !isAuthorized)) {
    return (
      <div className="max-w-xl mx-auto py-16 px-6 text-center space-y-4 animate-fadeIn">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-800 flex items-center justify-center mx-auto border border-rose-200">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className=" text-2xl font-bold text-[#1b1831]">Authorization Denied</h2>
        <p className="text-sm text-[#6A6678] leading-relaxed">
          You are not authorized to view or submit this assignment. Server access verification failed for this student sanctuary profile.
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

  // Not found state (invalid ID or deleted assignment)
  if (!assignment) {
    return (
      <div className="max-w-xl mx-auto py-16 px-6 text-center space-y-4 animate-fadeIn">
        <div className="w-16 h-16 rounded-3xl bg-[#F3EFFF] text-primary flex items-center justify-center mx-auto border border-[#E6DEFF]">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className=" text-2xl font-bold text-[#1b1831]">Assignment Unavailable</h2>
        <p className="text-sm text-[#6A6678] leading-relaxed">
          The requested assignment <span className="font-mono text-xs font-bold text-[#1b1831] bg-[#F3EFFF] px-2 py-0.5 rounded-md">ID: {assignmentId}</span> was not found in your curriculum catalog.
        </p>
        <div className="pt-2">
          <Link
            to="/child/assignments"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-container transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Assignments Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  const isLocked = assignment.status === 'Submitted' || assignment.status === 'Completed';

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn w-full max-w-[1600px] mx-auto pb-16">

      {/* ─────────────────────────────────────────────────────────────
          2. NAVIGATION BREADCRUMBS & TOP STATUS BAR
          ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E6DEFF]">
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={handleBackNavigation}
            className="p-1.5 rounded-xl text-[#6A6678] hover:text-primary hover:bg-[#EBE5FF] transition-colors flex items-center gap-1 font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Assignments</span>
          </button>
          <span className="text-[#E5E0D5]">/</span>
          <span className="text-[#6A6678] truncate max-w-xs">{assignment.title}</span>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-2">
          {isDirty && !isLocked && (
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full animate-pulse self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span>Unsaved Changes in Draft</span>
            </div>
          )}

          {isLocked && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Locked for Mentor Review</span>
            </div>
          )}
        </div>
      </div>

      {/* Submission Success Toast Banner */}
      {submissionSuccessNotice && (
        <div className="p-4 sm:p-5 rounded-3xl bg-[#8bcefe]/25 border-2 border-primary text-primary flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm animate-fadeIn">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <div>
              <h4 className=" text-base font-bold text-primary">
                {submissionSuccessNotice.isResubmission ? 'Revision Resubmitted Successfully!' : 'Assignment Submitted Successfully!'}
              </h4>
              <p className="text-xs text-[#1b1831] mt-0.5">
                Timestamp: <strong>{submissionSuccessNotice.submittedAt}</strong> • Version: <strong>{submissionSuccessNotice.version}</strong>. Locked for mentor review.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSubmissionSuccessNotice(null)}
            className="p-1 rounded-lg text-primary hover:bg-primary/10 self-start sm:self-auto cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Save Draft Feedback Alert */}
      {saveStatusMessage && (
        <div className="p-4 rounded-2xl bg-[#8bcefe]/20 border border-[#9CCDB0] text-primary text-xs sm:text-sm flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
            <span className="font-semibold">{saveStatusMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setSaveStatusMessage(null)}
            className="text-primary hover:text-black p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Network Failure Alert */}
      {networkError && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs sm:text-sm flex items-start sm:items-center justify-between gap-3 shadow-xs animate-fadeIn">
          <div className="flex items-start sm:items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <strong className="block font-bold">Network Communication Issue</strong>
              <span className="text-xs text-amber-800">{networkError}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setNetworkError(null)}
            className="text-amber-900 hover:text-black p-1 shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Validation Error Toast */}
      {validationError && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs sm:text-sm flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-700 shrink-0" />
            <span className="font-semibold">{validationError}</span>
          </div>
          <button
            type="button"
            onClick={() => setValidationError(null)}
            className="text-rose-900 hover:text-black p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Server-Side Validation Errors List */}
      {serverValidationErrors && serverValidationErrors.length > 0 && (
        <div className="p-5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs space-y-2 shadow-xs animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm">
              <AlertOctagon className="w-5 h-5 text-rose-700 shrink-0" />
              <span>Server Submission Validation Required:</span>
            </div>
            <button
              type="button"
              onClick={() => setServerValidationErrors(null)}
              className="text-rose-900 hover:text-black p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-rose-800 font-medium">
            {serverValidationErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Revision Notice Banner */}
      {assignment.status === 'Needs Revision' && (
        <div className="p-5 rounded-3xl bg-amber-50 border border-amber-300 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-3">
            <RotateCcw className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm font-bold text-amber-900">
                Mentor Revision Requested
              </strong>
              <p className="text-xs text-amber-800 mt-0.5">
                Sarah Jenkins requested updates on your reflection. You are authorized to revise your answers and resubmit.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('feedback')}
            className="py-1.5 px-4 rounded-full bg-amber-800 text-white text-xs font-semibold hover:bg-amber-900 transition-colors shrink-0 self-start sm:self-auto cursor-pointer"
          >
            Read Mentor Notes
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. HEADER HERO CARD
          ───────────────────────────────────────────────────────────── */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DEFF] hover:border-primary/40 transition-all shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-primary bg-[#EBE5FF] px-3 py-1 rounded-full border border-[#E6DEFF]">
                {assignment.subject}
              </span>

              {assignment.activityType && (
                <span className="text-xs font-medium text-[#6A6678] bg-[#F3EFFF] px-3 py-1 rounded-full border border-[#E6DEFF]">
                  {assignment.activityType}
                </span>
              )}

              {isOverdue && (
                <span className="text-[11px] font-bold text-rose-800 bg-rose-100 border border-rose-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
                  <span>Overdue</span>
                </span>
              )}

              <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${getStatusBadge(assignment.status)}`}>
                {assignment.status}
              </span>

              {/* Status-Permitted Direct Action Shortcut in Header */}
              {assignment.status === 'Pending' && (
                <button
                  type="button"
                  onClick={handleStartAssignment}
                  className="py-1 px-3.5 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] hover:border-primary/40 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Start Assignment</span>
                </button>
              )}

              {(assignment.status === 'In Progress' || assignment.status === 'Needs Revision') && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('assignment');
                    document.getElementById('questions-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-1 px-3.5 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] hover:border-primary/40 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Continue Assignment</span>
                </button>
              )}
            </div>

            {/* Title */}
            <h1 className=" text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1b1831] tracking-tight">
              {assignment.title}
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-base text-[#6A6678] leading-relaxed">
              {assignment.description}
            </p>
          </div>

          {/* Quick Info Sidebar Block */}
          <div className="p-5 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] shadow-2xs space-y-3 min-w-[240px] shrink-0 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#6A6678] tracking-wider block">Assigned Date</span>
              <div className="font-semibold text-[#1b1831] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>{assignment.assignedDate || 'Oct 26, 2026'}</span>
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-[#E6DEFF]">
              <span className="text-[10px] uppercase font-bold text-[#6A6678] tracking-wider block">Due Date</span>
              <div className={`font-semibold flex items-center gap-1.5 ${isOverdue ? 'text-rose-700 font-bold' : 'text-[#1b1831]'}`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{assignment.dueDate || 'Flexible Deadline'}</span>
              </div>
            </div>

            {assignment.duration && (
              <div className="space-y-1 pt-2 border-t border-[#E6DEFF]">
                <span className="text-[10px] uppercase font-bold text-[#6A6678] tracking-wider block">Estimated Duration</span>
                <div className="font-semibold text-[#1b1831] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>{assignment.duration}</span>
                </div>
              </div>
            )}

            {assignment.expectedSubmissionFormat && (
              <div className="space-y-1 pt-2 border-t border-[#E6DEFF]">
                <span className="text-[10px] uppercase font-bold text-[#6A6678] tracking-wider block">Expected Format</span>
                <div className="font-semibold text-[#1b1831] leading-snug">
                  {assignment.expectedSubmissionFormat}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mentor Note Banner if configured */}
        {assignment.mentorNote && (
          <div className="p-4 rounded-2xl bg-[#F3EFFF]/60 border border-[#E6DEFF] shadow-2xs text-xs sm:text-sm text-[#1b1831] flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="text-primary block font-bold">Advisory & Mentor Guidance:</strong>
              <p className="text-[#6A6678] italic">"{assignment.mentorNote}"</p>
            </div>
          </div>
        )}

        {/* Navigation Tabs for Views */}
        <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-[#E6DEFF]">
          <button
            type="button"
            onClick={() => setActiveTab('assignment')}
            className={`py-2 px-4 rounded-xl text-xs transition-all cursor-pointer ${
              activeTab === 'assignment'
                ? 'bg-primary text-white border border-primary shadow-xs font-bold'
                : 'bg-white text-[#1b1831] border border-[#E6DEFF] hover:border-primary/40 hover:bg-[#FCF8FF] shadow-2xs font-semibold'
            }`}
          >
            Assignment Tasks & Questions
          </button>

          {assignment.submission && (
            <button
              type="button"
              onClick={() => setActiveTab('submission')}
              className={`py-2 px-4 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'submission'
                  ? 'bg-primary text-white border border-primary shadow-xs font-bold'
                  : 'bg-white text-[#1b1831] border border-[#E6DEFF] hover:border-primary/40 hover:bg-[#FCF8FF] shadow-2xs font-semibold'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Previous Submission</span>
            </button>
          )}

          {assignment.feedback && (
            <button
              type="button"
              onClick={() => setActiveTab('feedback')}
              className={`py-2 px-4 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'feedback'
                  ? 'bg-primary text-white border border-primary shadow-xs font-bold'
                  : 'bg-white text-[#1b1831] border border-[#E6DEFF] hover:border-primary/40 hover:bg-[#FCF8FF] shadow-2xs font-semibold'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>View Mentor Feedback</span>
            </button>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. TAB 1: WORKFLOW STEPS & QUESTION FORM
          ───────────────────────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (5 cols): Instructions, Steps, & Supporting Documents */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Instructions & Interactive Activity Steps */}
            <div className="p-6 rounded-3xl bg-white border border-[#E6DEFF] hover:border-primary/40 transition-all shadow-xs space-y-4">
              <div className="pb-3 border-b border-[#E6DEFF]">
                <h3 className=" text-lg font-bold text-[#1b1831]">
                  Instructions & Guidelines
                </h3>
                <p className="text-xs text-[#6A6678]">
                  Follow these steps carefully and check them off as you progress.
                </p>
              </div>

              {assignment.instructions && (
                <div className="p-3.5 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] shadow-2xs text-xs text-[#1b1831] leading-relaxed">
                  {assignment.instructions}
                </div>
              )}

              {/* Activity Steps Checklist */}
              {assignment.activitySteps && assignment.activitySteps.length > 0 && (
                <div className="space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6A6678] block">
                    Step-by-Step Activity Path
                  </span>
                  <div className="space-y-2">
                    {assignment.activitySteps.map((step, idx) => {
                      const isDone = completedSteps.has(idx);
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleStep(idx)}
                          className={`p-3 rounded-2xl border flex items-start gap-3 text-xs cursor-pointer transition-all shadow-2xs ${
                            isDone
                              ? 'bg-[#EBE5FF] border-[#E6DEFF] text-primary font-semibold'
                              : 'bg-[#FCF8FF] border-[#E6DEFF] hover:border-primary/40 text-[#1b1831]'
                          }`}
                        >
                          <div className="pt-0.5 shrink-0">
                            {isDone ? (
                              <CheckSquare className="w-4 h-4 text-primary" />
                            ) : (
                              <Square className="w-4 h-4 text-[#6A6678]" />
                            )}
                          </div>
                          <div className="flex-1">
                            <span className="font-bold mr-1.5">Step {idx + 1}:</span>
                            <span className={`leading-relaxed ${isDone ? 'line-through text-[#6A6678]' : ''}`}>
                              {step}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Activity Completion Confirmation Checkbox */}
              <div className="p-4 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] shadow-2xs space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activityConfirmed}
                    disabled={isLocked}
                    onChange={(e) => {
                      setActivityConfirmed(e.target.checked);
                      setIsDirty(true);
                      setValidationError(null);
                    }}
                    className="mt-0.5 w-4 h-4 rounded text-primary border-[#E6DEFF] focus:ring-primary cursor-pointer disabled:cursor-not-allowed"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[#1b1831] block">
                      Activity Completion Confirmation <span className="text-rose-600 font-bold">*</span>
                    </span>
                    <span className="text-[#6A6678] leading-snug block mt-0.5">
                      I confirm that I have reviewed the instructions and completed the required offline/online activity steps.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Supporting Documents (if available) */}
            {assignment.supportingDocuments && assignment.supportingDocuments.length > 0 && (
              <div className="p-6 rounded-3xl bg-white border border-[#E6DEFF] hover:border-primary/40 transition-all shadow-xs space-y-3">
                <div className="pb-2 border-b border-[#E6DEFF] flex items-center justify-between">
                  <h3 className=" text-base font-bold text-[#1b1831]">
                    Supporting Documents
                  </h3>
                  <span className="text-xs text-[#6A6678] font-medium">
                    {assignment.supportingDocuments.length} files
                  </span>
                </div>

                <div className="space-y-2">
                  {assignment.supportingDocuments.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] hover:border-primary/40 flex items-center justify-between gap-3 shadow-2xs transition-all"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-xl bg-[#EBE5FF] text-primary border border-[#E6DEFF] flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <span className="text-xs font-bold text-[#1b1831] block truncate">
                            {doc.name}
                          </span>
                          <span className="text-[10px] text-[#6A6678]">
                            {doc.size} • {doc.type}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => alert(`Simulating download for: ${doc.name}`)}
                        className="p-2 rounded-xl text-primary hover:bg-[#EBE5FF] border border-[#E6DEFF] transition-colors cursor-pointer shrink-0"
                        title="Download Document"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (7 cols): Questions & Submission Response Form */}
          <div className="lg:col-span-7 space-y-6" id="questions-section">
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E6DEFF] hover:border-primary/40 transition-all shadow-xs space-y-6">
              
              <div className="pb-3 border-b border-[#E6DEFF] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className=" text-xl font-bold text-[#1b1831]">
                    Required Questions & Tasks
                  </h3>
                  <p className="text-xs text-[#6A6678]">
                    Enter your responses below. Progress is preserved securely on the server.
                  </p>
                </div>

                {assignment.status === 'Pending' && (
                  <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-[#E6DEFF]">
                    Not Started
                  </span>
                )}
                {assignment.status === 'In Progress' && (
                  <span className="text-xs font-semibold text-primary bg-[#EBE5FF] px-3 py-1 rounded-full border border-[#E6DEFF] shadow-2xs">
                    Drafting in Progress
                  </span>
                )}
                {assignment.status === 'Submitted' && (
                  <span className="text-xs font-semibold text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-[#E6DEFF]">
                    Locked / Submitted
                  </span>
                )}
                {assignment.status === 'Needs Revision' && (
                  <span className="text-xs font-semibold text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-[#E6DEFF]">
                    Revision Authorized
                  </span>
                )}
              </div>

              {/* Status Warning if Pending */}
              {assignment.status === 'Pending' && (
                <div className="p-4 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <strong className="text-[#1b1831] block">Assignment has not been started yet.</strong>
                    <p className="text-[#6A6678]">Click "Start Assignment" to begin recording your answers.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleStartAssignment}
                    className="py-2 px-5 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] hover:border-primary/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs shrink-0"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Start Assignment</span>
                  </button>
                </div>
              )}

              {/* Locked Warning if Submitted or Completed */}
              {isLocked && (
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-300 text-xs text-blue-900 flex items-center gap-3 shadow-2xs">
                  <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0" />
                  <div>
                    <strong className="block font-bold">Assignment Locked for Mentor Review</strong>
                    <span>Editing is disabled. Your submitted answers are safely preserved in the "Recorded Submission" tab.</span>
                  </div>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-5">
                {(assignment.requiredQuestions || []).map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] shadow-2xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <label className="text-xs sm:text-sm font-bold text-[#1b1831] flex items-center gap-1.5">
                        <span className="text-primary">Q{idx + 1}.</span>
                        <span>{q.title}</span>
                        {q.required && <span className="text-rose-600 font-bold">*</span>}
                      </label>
                      <span className="text-[10px] uppercase font-bold text-[#6A6678] bg-white px-2 py-0.5 rounded-md border border-[#E6DEFF]">
                        {q.type.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Question Type 1: Single Choice (Radio Option Cards) */}
                    {q.type === 'single_choice' && (
                      <div className="space-y-2 pt-1">
                        {q.options?.map((opt, oIdx) => (
                          <label
                            key={oIdx}
                            className={`p-3 rounded-xl border flex items-center gap-3 text-xs transition-all shadow-2xs ${
                              answers[q.id] === opt
                                ? 'bg-primary text-white border-primary font-semibold'
                                : 'bg-white text-[#1b1831] border-[#E6DEFF] hover:border-primary/40'
                            } ${isLocked ? 'pointer-events-none opacity-80 cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              value={opt}
                              checked={answers[q.id] === opt}
                              disabled={isLocked}
                              onChange={() => handleAnswerChange(q.id, opt)}
                              className="hidden"
                            />
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${answers[q.id] === opt ? 'border-white bg-white text-primary' : 'border-[#737A73]'}`}>
                              {answers[q.id] === opt && <div className="w-2 h-2 rounded-full bg-primary" />}
                            </div>
                            <span className="leading-snug">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {/* Question Type 2: Short Text Input */}
                    {q.type === 'short_text' && (
                      <input
                        type="text"
                        value={answers[q.id] || ''}
                        disabled={isLocked}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        placeholder={q.placeholder || 'Enter your concise response...'}
                        className="w-full p-3 rounded-xl bg-white border border-[#E6DEFF] focus:border-black/60 shadow-2xs text-xs sm:text-sm text-[#1b1831] placeholder-[#737A73] focus:outline-hidden transition-all disabled:opacity-75 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    )}

                    {/* Question Type 3: Long Text / Personal Reflection (with Word Counter) */}
                    {(q.type === 'long_text' || q.type === 'reflection') && (
                      <div className="space-y-1.5">
                        <textarea
                          rows={5}
                          value={answers[q.id] || ''}
                          disabled={isLocked}
                          onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                          placeholder={q.placeholder || 'Write your thoughtful personal reflection here...'}
                          className="w-full p-4 rounded-xl bg-white border border-[#E6DEFF] focus:border-black/60 shadow-2xs text-xs sm:text-sm text-[#1b1831] placeholder-[#737A73] focus:outline-hidden transition-all leading-relaxed disabled:opacity-75 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                        <div className="flex justify-between text-[11px] text-[#6A6678]">
                          <span>{q.minWords ? `Minimum required: ${q.minWords} words` : 'Reflection depth encouraged'}</span>
                          <span>
                            {(answers[q.id] || '').length} characters • {((answers[q.id] || '').trim().split(/\s+/).filter(Boolean)).length} words
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* File Upload Section (If configured for this assignment) */}
                {assignment.supportsFileUpload && (
                  <div className="p-5 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] shadow-2xs space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <label className="text-xs sm:text-sm font-bold text-[#1b1831] flex items-center gap-1.5">
                        <Paperclip className="w-4 h-4 text-primary" />
                        <span>Supporting Document Attachment (Optional)</span>
                      </label>
                      <span className="text-[10px] uppercase font-bold text-[#6A6678] bg-white px-2 py-0.5 rounded-md border border-[#E6DEFF]">
                        Max 5MB
                      </span>
                    </div>

                    <p className="text-xs text-[#6A6678]">
                      Upload your supplementary worksheet, mind map, or written reflection (PDF, DOCX, PNG, JPG).
                    </p>

                    {attachedFile ? (
                      <div className="p-3.5 rounded-xl bg-white border border-[#E6DEFF] flex items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <div className="w-8 h-8 rounded-lg bg-[#EBE5FF] text-primary border border-[#E6DEFF] flex items-center justify-center shrink-0">
                            <FileCheck className="w-4 h-4" />
                          </div>
                          <div className="overflow-hidden">
                            <span className="text-xs font-bold text-[#1b1831] block truncate">
                              {attachedFile.name}
                            </span>
                            <span className="text-[10px] text-[#6A6678]">
                              {attachedFile.formattedSize || `${Math.round(attachedFile.size / 1024)} KB`}
                            </span>
                          </div>
                        </div>

                        {!isLocked && (
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Remove attached file"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ) : (
                      !isLocked && (
                        <div>
                          <label className="p-6 rounded-2xl border-2 border-dashed border-[#E6DEFF] hover:border-primary/40 bg-white transition-all flex flex-col items-center justify-center gap-2 cursor-pointer text-center shadow-2xs">
                            <UploadCloud className="w-7 h-7 text-primary" />
                            <span className="text-xs font-bold text-[#1b1831]">Click to select a file or drag & drop</span>
                            <span className="text-[10px] text-[#6A6678]">PDF, DOCX, PNG, JPG up to 5 MB</span>
                            <input
                              type="file"
                              accept=".pdf,.docx,.doc,.png,.jpg,.jpeg"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                        </div>
                      )
                    )}

                    {fileError && (
                      <div className="text-xs font-semibold text-rose-700 flex items-center gap-1.5 pt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{fileError}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ─────────────────────────────────────────────────────────────
                  ACTIONS TOOLBAR (Permitted by Current Status)
                  ───────────────────────────────────────────────────────────── */}
              <div className="pt-4 border-t border-[#E6DEFF] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleBackNavigation}
                    className="py-2 px-3.5 rounded-full text-xs font-semibold text-[#1b1831] hover:text-black bg-white border border-[#E6DEFF] hover:border-primary/40 hover:bg-[#FCF8FF] transition-all cursor-pointer shadow-xs whitespace-nowrap inline-flex items-center gap-1.5"
                  >
                    <span>Cancel / Back</span>
                  </button>

                  {/* Save Progress (Available in In Progress & Needs Revision) */}
                  {(assignment.status === 'In Progress' || assignment.status === 'Needs Revision') && (
                    <button
                      type="button"
                      onClick={handleSaveProgress}
                      disabled={isSavingDraft}
                      className="py-2 px-3.5 rounded-full text-xs font-semibold text-[#1b1831] bg-[#F3EFFF] hover:bg-[#E6DEFF] border border-[#E6DEFF] hover:border-primary/40 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap disabled:opacity-50"
                      title="Save your work on the server without submitting"
                    >
                      {isSavingDraft ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                      ) : (
                        <Save className="w-3.5 h-3.5 text-primary" />
                      )}
                      <span>{isSavingDraft ? 'Saving Draft...' : 'Save Progress'}</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Action: Start Assignment */}
                  {assignment.status === 'Pending' && (
                    <button
                      type="button"
                      onClick={handleStartAssignment}
                      className="py-2 px-5 rounded-full text-xs font-bold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] hover:border-primary/40 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Start Assignment</span>
                    </button>
                  )}

                  {/* Action: Review & Submit (In Progress or Needs Revision) */}
                  {(assignment.status === 'In Progress' || assignment.status === 'Needs Revision') && (
                    <button
                      type="button"
                      onClick={handleOpenReviewModal}
                      className="py-2 px-5 rounded-full text-xs font-bold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] hover:border-primary/40 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{assignment.status === 'Needs Revision' ? 'Review & Resubmit' : 'Review & Submit'}</span>
                    </button>
                  )}

                  {/* View Previous Submission button */}
                  {assignment.submission && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('submission')}
                      className="py-2 px-3.5 rounded-full text-xs font-semibold text-[#1b1831] bg-white border border-[#E6DEFF] hover:border-primary/40 hover:bg-[#FCF8FF] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
                    >
                      <Eye className="w-3.5 h-3.5 text-primary" />
                      <span>View Submission</span>
                    </button>
                  )}

                  {/* View Feedback button */}
                  {assignment.feedback && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('feedback')}
                      className="py-2 px-3.5 rounded-full text-xs font-semibold text-primary bg-[#EBE5FF] hover:bg-[#E6DEFF] border border-[#E6DEFF] hover:border-primary/40 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-primary" />
                      <span>View Feedback</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. TAB 2: VIEW PREVIOUS SUBMISSION
          ───────────────────────────────────────────────────────────── */}
      {activeTab === 'submission' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DEFF] hover:border-primary/40 transition-all shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E6DEFF]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full border border-[#E6DEFF]">
                Recorded Submission
              </span>
              <h2 className=" text-xl sm:text-2xl font-bold text-[#1b1831] mt-1">
                Student Submission Record
              </h2>
              <p className="text-xs text-[#6A6678]">
                Timestamped answers submitted to mentor Sarah Jenkins.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              {(assignment.status === 'In Progress' || assignment.status === 'Needs Revision') && (
                <button
                  type="button"
                  onClick={() => setActiveTab('assignment')}
                  className="py-2 px-4 rounded-full text-xs font-semibold text-primary bg-[#EBE5FF] hover:bg-[#E6DEFF] border border-[#E6DEFF] hover:border-primary/40 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Continue Assignment</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] shadow-2xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#6A6678] pb-3 border-b border-[#E6DEFF]">
              <div>
                <span className="block text-[10px] uppercase font-bold text-[#6A6678]">Status</span>
                <strong className="text-primary font-bold text-sm">{assignment.status}</strong>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-[#6A6678]">Submitted Date & Time</span>
                <strong className="text-[#1b1831] font-semibold">{assignment.submission?.submittedAt || 'Recorded'}</strong>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-[#6A6678]">Submission Version</span>
                <strong className="text-[#1b1831] font-semibold">Version {assignment.submission?.version || 1}</strong>
              </div>
            </div>

            {/* Activity Confirmation Status */}
            <div className="p-3.5 rounded-xl bg-white border border-[#E6DEFF] flex items-center gap-2.5 text-xs text-primary font-semibold shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <span>Activity Steps Confirmed Completed</span>
            </div>

            {/* Attached File if present */}
            {assignment.submission?.attachedFile && (
              <div className="p-3.5 rounded-xl bg-white border border-[#E6DEFF] flex items-center justify-between gap-3 text-xs shadow-2xs">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <FileCheck className="w-4 h-4 text-primary shrink-0" />
                  <div className="overflow-hidden">
                    <span className="font-bold text-[#1b1831] block truncate">{assignment.submission.attachedFile.name}</span>
                    <span className="text-[10px] text-[#6A6678]">{assignment.submission.attachedFile.formattedSize || 'Attached Document'}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  Verified Upload
                </span>
              </div>
            )}

            {/* Submitted Answers Display */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-[#1b1831] block">Submitted Answers:</span>
              <div className="p-4 rounded-xl bg-white border border-[#E6DEFF] text-xs sm:text-sm text-[#1b1831] whitespace-pre-wrap leading-relaxed shadow-2xs">
                {assignment.submission?.content || 'No text content submitted.'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          6. TAB 3: VIEW MENTOR FEEDBACK
          ───────────────────────────────────────────────────────────── */}
      {activeTab === 'feedback' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DEFF] hover:border-primary/40 transition-all shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E6DEFF]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-[#E6DEFF]">
                Advisory Feedback
              </span>
              <h2 className=" text-xl sm:text-2xl font-bold text-[#1b1831] mt-1">
                Mentor Guidance & Review Notes
              </h2>
              <p className="text-xs text-[#6A6678]">
                Constructive feedback to guide your personal mastery.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Link
                to={`/child/assignments/${assignment.id}/feedback`}
                className="py-2 px-4 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] hover:border-primary/40 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>Full Status & Feedback Page</span>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </Link>
              <button
                type="button"
                onClick={() => setActiveTab('assignment')}
                className="py-2 px-4 rounded-full text-xs font-semibold text-primary bg-[#EBE5FF] hover:bg-[#E6DEFF] border border-[#E6DEFF] hover:border-primary/40 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Back to Editor</span>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </button>
            </div>
          </div>

          {assignment.feedback ? (
            <div className="p-6 rounded-2xl bg-[#F3EFFF]/60 border border-[#E6DEFF] shadow-2xs space-y-4">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                    SJ
                  </div>
                  <div>
                    <strong className="text-[#1b1831] block">{assignment.feedback.author}</strong>
                    <span className="text-[10px] text-[#6A6678]">Verified Family & Leadership Mentor</span>
                  </div>
                </div>
                <span className="text-xs text-[#6A6678]">{assignment.feedback.date}</span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E6DEFF] text-xs sm:text-sm text-[#1b1831] leading-relaxed italic shadow-2xs">
                "{assignment.feedback.comment}"
              </div>

              {assignment.status === 'Needs Revision' && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-xs text-rose-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                  <span>Please review Sarah's guidance above, update your answers in the editor, and click <strong>"Review & Resubmit"</strong>.</span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('assignment')}
                    className="py-2 px-4 rounded-full bg-rose-800 text-white font-bold hover:bg-rose-900 border border-[#E6DEFF] transition-colors shrink-0 cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Continue Assignment</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-[#6A6678] rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] shadow-2xs">
              No feedback recorded yet. Your mentor will provide guidance after reviewing your submission.
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          7. MODAL: REVIEW ANSWERS BEFORE SUBMISSION
          ───────────────────────────────────────────────────────────── */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-2xl bg-white rounded-3xl border border-[#E6DEFF] shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto no-scrollbar">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E6DEFF]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-[#EBE5FF] px-2.5 py-0.5 rounded-full border border-[#E6DEFF]">
                  Step 6 of 8: Review Responses
                </span>
                <h3 className=" text-xl sm:text-2xl font-bold text-[#1b1831] mt-1">
                  Review Your Submission
                </h3>
                <p className="text-xs text-[#6A6678]">
                  Verify your answers before final submission to mentor Sarah Jenkins.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="p-1 rounded-full text-[#6A6678] hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Activity Confirmation Status */}
            <div className="p-3.5 rounded-2xl bg-[#EBE5FF] border border-[#E6DEFF] flex items-center gap-2.5 text-xs text-primary font-semibold shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <span>Activity Steps Completed & Confirmed</span>
            </div>

            {/* Questions Review */}
            <div className="space-y-4">
              {(assignment.requiredQuestions || []).map((q, idx) => (
                <div key={q.id} className="p-4 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] shadow-2xs space-y-1.5 text-xs">
                  <div className="font-bold text-[#1b1831] flex items-center justify-between">
                    <span>Q{idx + 1}. {q.title}</span>
                    <span className="text-[10px] text-[#6A6678] uppercase">{q.type.replace('_', ' ')}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E6DEFF] text-[#1b1831] whitespace-pre-wrap leading-relaxed shadow-2xs">
                    {answers[q.id] || <span className="text-rose-600 italic">No answer provided</span>}
                  </div>
                </div>
              ))}

              {/* Attached file review if present */}
              {attachedFile && (
                <div className="p-4 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] shadow-2xs space-y-1.5 text-xs">
                  <span className="font-bold text-[#1b1831] block">Attached Supporting Document</span>
                  <div className="p-3 rounded-xl bg-white border border-[#E6DEFF] flex items-center gap-2.5 text-[#1b1831] shadow-2xs">
                    <FileCheck className="w-4 h-4 text-primary" />
                    <span className="font-medium truncate">{attachedFile.name}</span>
                    <span className="text-[10px] text-[#6A6678]">({attachedFile.formattedSize})</span>
                  </div>
                </div>
              )}
            </div>

            {/* Review Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E6DEFF]">
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="w-full sm:w-auto py-2.5 px-5 rounded-full text-xs font-semibold text-[#1b1831] hover:text-black bg-white border border-[#E6DEFF] hover:border-primary/40 hover:bg-[#FCF8FF] transition-colors cursor-pointer shadow-xs"
              >
                Back to Editing
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowReviewModal(false);
                  setShowConfirmModal(true);
                }}
                className="w-full sm:w-auto py-2.5 px-6 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] hover:border-primary/40 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Proceed to Confirmation</span>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          8. MODAL: FINAL SUBMISSION CONFIRMATION
          ───────────────────────────────────────────────────────────── */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl border border-[#E6DEFF] shadow-2xl p-6 sm:p-7 space-y-5">
            <div className="w-12 h-12 rounded-full bg-[#EBE5FF] text-primary flex items-center justify-center mx-auto border border-[#E6DEFF] shadow-2xs">
              <Send className="w-6 h-6 ml-0.5 text-primary" />
            </div>

            <div className="text-center space-y-2">
              <h3 className=" text-xl font-bold text-[#1b1831]">
                {assignment.status === 'Needs Revision' ? 'Confirm Revision Resubmission' : 'Confirm Assignment Submission'}
              </h3>
              <p className="text-xs text-[#6A6678] leading-relaxed">
                Once submitted, your answers will be securely transmitted to the server and locked for mentor review.
                Resubmission will only be permitted if your mentor requests revisions.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] shadow-2xs text-xs space-y-1 text-[#1b1831]">
              <div className="flex justify-between">
                <span className="text-[#6A6678]">Student:</span>
                <span className="font-bold">{activeChild?.name || 'Alex Parker'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6A6678]">Submission Target:</span>
                <span className="font-semibold">Mentor Sarah Jenkins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6A6678]">Security:</span>
                <span className="font-semibold text-emerald-800">Server Authorized</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2 border-t border-[#E6DEFF]">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                disabled={isSubmitting}
                className="py-2.5 px-4 rounded-full text-xs font-semibold text-[#1b1831] hover:text-black bg-white border border-[#E6DEFF] hover:border-primary/40 hover:bg-[#F3EFFF] transition-colors cursor-pointer shadow-xs disabled:opacity-50"
              >
                Back to Review
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="py-2.5 px-6 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] hover:border-primary/40 transition-colors flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Submitting to Server...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{assignment.status === 'Needs Revision' ? 'Confirm Resubmission' : 'Confirm & Submit'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          9. MODAL: UNSAVED CHANGES WARNING
          ───────────────────────────────────────────────────────────── */}
      {showUnsavedModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl border border-[#E6DEFF] shadow-2xl p-6 sm:p-7 space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto border border-amber-300 shadow-2xs">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className=" text-lg font-bold text-[#1b1831]">Discard Unsaved Changes?</h3>
              <p className="text-xs text-[#6A6678] leading-relaxed">
                You have unsaved changes in your assignment draft. If you leave now without saving, your modifications will be lost.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2 border-t border-[#E6DEFF]">
              <button
                type="button"
                onClick={() => setShowUnsavedModal(false)}
                className="py-2.5 px-4 rounded-full text-xs font-semibold text-[#1b1831] hover:text-black bg-white border border-[#E6DEFF] hover:border-primary/40 hover:bg-[#F3EFFF] transition-colors cursor-pointer shadow-xs"
              >
                Keep Editing
              </button>
              <button
                type="button"
                onClick={confirmDiscardChanges}
                className="py-2.5 px-5 rounded-full text-xs font-semibold text-white bg-rose-700 hover:bg-rose-800 border border-[#E6DEFF] hover:border-primary/40 transition-colors cursor-pointer shadow-xs"
              >
                Discard & Leave
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default StudentAssignmentDetailsPage;
