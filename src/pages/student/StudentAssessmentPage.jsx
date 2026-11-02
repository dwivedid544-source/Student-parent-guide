import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Target,
  Sparkles,
  CheckCircle2,
  Brain,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Clock,
  AlertCircle,
  RotateCcw,
  Play,
  Check,
  ChevronLeft,
  ChevronRight,
  Save,
  Award,
  Info,
  AlertTriangle,
  X,
  Compass,
  Heart,
  Zap,
  FileText,
  ExternalLink,
  HelpCircle,
  Lock,
  Loader2,
  CheckSquare,
  Search,
  Filter
} from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import {
  fetchAssessmentsApi,
  fetchAssessmentByIdApi,
  saveAssessmentProgressApi,
  submitAssessmentApi,
  fetchAssessmentResultsApi,
  retakeAssessmentApi
} from '../../services/assessmentApi';

export const StudentAssessmentPage = () => {
  const navigate = useNavigate();
  const { activeChild } = useOnboarding();
  const studentId = activeChild?.id || 'student_1';

  // Navigation / Views: 'catalog' | 'assessment' | 'review' | 'results' | 'history'
  const [currentView, setCurrentView] = useState('catalog');
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);

  // Catalog State
  const [assessments, setAssessments] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, inProgress: 0, notStarted: 0 });
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [catalogError, setCatalogError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'IN_PROGRESS' | 'COMPLETED' | 'NOT_STARTED'
  const [searchQuery, setSearchQuery] = useState('');

  // Assessment Experience State
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [initialAnswers, setInitialAnswers] = useState({});
  const [validationError, setValidationError] = useState(null);
  const [isSavingProgress, setIsSavingProgress] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [missingQuestionsList, setMissingQuestionsList] = useState([]);

  // Results State
  const [resultsData, setResultsData] = useState(null);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [resultsError, setResultsError] = useState(null);
  const [isRetaking, setIsRetaking] = useState(false);
  const [showRetakeModal, setShowRetakeModal] = useState(false);
  const [studentReflectionNote, setStudentReflectionNote] = useState('');
  const [noteSavedNotice, setNoteSavedNotice] = useState(false);

  // Missing Dependency Modal State
  const [dependencyModal, setDependencyModal] = useState(null);

  // Reflection Archive State (Preserving existing history logs)
  const [reflectionArchive, setReflectionArchive] = useState([
    {
      id: 'ref_1',
      mood: 'Focused',
      moodEmoji: '🎯',
      date: 'Oct 30, 2026',
      prompt: 'What learning environment allowed you to enter deep flow today?',
      entry: 'Studied in the library carrel with noise-canceling headphones for 90 minutes. Breaking down mechanics problems step-by-step prevented mental fatigue.'
    },
    {
      id: 'ref_2',
      mood: 'Resilient',
      moodEmoji: '🌱',
      date: 'Oct 26, 2026',
      prompt: 'Describe a moment you reframed an error into useful feedback.',
      entry: 'Missed two questions on the chemistry quiz regarding stoichiometry. Instead of getting upset, I re-did the molar conversion steps on paper and realized my unit cancellation mistake.'
    },
    {
      id: 'ref_3',
      mood: 'Curious',
      moodEmoji: '✨',
      date: 'Oct 22, 2026',
      prompt: 'What core strength helped you navigate group project conflict?',
      entry: 'Used empathetic communication to listen to both viewpoints on the biology presentation design before proposing a balanced timeline that accommodated both.'
    }
  ]);

  // Load Assessments Catalog
  const loadAssessments = async () => {
    setIsLoadingList(true);
    setCatalogError(null);
    const res = await fetchAssessmentsApi(studentId);
    setIsLoadingList(false);

    if (res.success) {
      setAssessments(res.assessments || []);
      if (res.stats) setStats(res.stats);
    } else {
      setCatalogError(res.error || 'Failed to load assessments from server.');
    }
  };

  useEffect(() => {
    loadAssessments();
  }, [studentId]);

  // Filtered Assessments
  const filteredAssessments = useMemo(() => {
    return assessments.filter((asmt) => {
      // Status filter
      if (statusFilter === 'IN_PROGRESS' && asmt.status !== 'In Progress') return false;
      if (statusFilter === 'COMPLETED' && asmt.status !== 'Completed') return false;
      if (statusFilter === 'NOT_STARTED' && asmt.status !== 'Not Started') return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = asmt.title?.toLowerCase().includes(query);
        const matchDesc = asmt.description?.toLowerCase().includes(query);
        const matchCat = asmt.category?.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchCat) return false;
      }

      return true;
    });
  }, [assessments, statusFilter, searchQuery]);

  // Open Assessment (Start / Continue)
  const handleStartOrContinue = async (assessmentId) => {
    setValidationError(null);
    setSaveSuccessNotice(null);
    setIsLoadingList(true);

    const res = await fetchAssessmentByIdApi(assessmentId, studentId);
    setIsLoadingList(false);

    if (res.missingDependency) {
      setDependencyModal({
        title: res.assessment?.title || 'Assessment Dependency Missing',
        message: res.error || 'Curriculum configuration pending: Assessment questions and scoring rubric dependency not yet provisioned.'
      });
      return;
    }

    if (!res.success) {
      alert(res.error || 'Unable to open assessment.');
      return;
    }

    const asmt = res.assessment;
    setSelectedAssessmentId(asmt.id);
    setActiveAssessment(asmt);
    setAnswers(asmt.savedAnswers || {});
    setInitialAnswers(asmt.savedAnswers || {});

    // Find first unanswered question or start at 0
    let firstUnanswered = 0;
    if (asmt.questions && asmt.questions.length > 0) {
      for (let i = 0; i < asmt.questions.length; i++) {
        const qId = asmt.questions[i].id;
        if (!asmt.savedAnswers || asmt.savedAnswers[qId] === undefined) {
          firstUnanswered = i;
          break;
        }
      }
    }
    setCurrentQuestionIndex(firstUnanswered);
    setCurrentView('assessment');
  };

  // View Results
  const handleViewResults = async (assessmentId) => {
    setSelectedAssessmentId(assessmentId);
    setIsLoadingResults(true);
    setResultsError(null);
    setCurrentView('results');

    const res = await fetchAssessmentResultsApi(assessmentId, studentId);
    setIsLoadingResults(false);

    if (res.success) {
      setResultsData(res);
    } else {
      setResultsError(res.error || 'Failed to load assessment results.');
    }
  };

  // Handle Question Answer Selection
  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
    if (validationError) setValidationError(null);
  };

  // Validate Current Question
  const validateQuestion = (qIndex) => {
    if (!activeAssessment || !activeAssessment.questions) return true;
    const q = activeAssessment.questions[qIndex];
    if (!q || !q.required) return true;

    const val = answers[q.id];
    if (val === undefined || val === null || String(val).trim() === '') {
      setValidationError(`Please answer this required question before continuing.`);
      return false;
    }

    if (q.minLength && String(val).trim().length < q.minLength) {
      setValidationError(`Your response must be at least ${q.minLength} characters (current: ${String(val).trim().length}).`);
      return false;
    }

    setValidationError(null);
    return true;
  };

  // Next Question Control
  const handleNextQuestion = () => {
    if (!validateQuestion(currentQuestionIndex)) return;

    if (currentQuestionIndex < activeAssessment.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Reached the end, go to Review Answers
      setCurrentView('review');
    }
  };

  // Previous Question Control
  const handlePrevQuestion = () => {
    setValidationError(null);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Save Progress Action
  const handleSaveProgress = async () => {
    if (!activeAssessment) return;
    setIsSavingProgress(true);
    setSaveSuccessNotice(null);

    const res = await saveAssessmentProgressApi(activeAssessment.id, studentId, answers);
    setIsSavingProgress(false);

    if (res.success) {
      setSaveSuccessNotice('Progress saved safely! You can resume anytime.');
      setInitialAnswers({ ...answers });
      loadAssessments(); // Refresh list stats in background
      setTimeout(() => setSaveSuccessNotice(null), 4000);
    } else {
      alert(res.error || 'Failed to save progress.');
    }
  };

  // Validate All Answers for Review/Submit
  const validateAllAnswers = () => {
    if (!activeAssessment || !activeAssessment.questions) return true;
    const missing = [];

    for (let i = 0; i < activeAssessment.questions.length; i++) {
      const q = activeAssessment.questions[i];
      if (q.required) {
        const val = answers[q.id];
        if (val === undefined || val === null || String(val).trim() === '') {
          missing.push({ index: i, id: q.id, title: q.title, error: 'Answer required' });
        } else if (q.minLength && String(val).trim().length < q.minLength) {
          missing.push({
            index: i,
            id: q.id,
            title: q.title,
            error: `Must be at least ${q.minLength} characters`
          });
        }
      }
    }

    setMissingQuestionsList(missing);
    return missing.length === 0;
  };

  // Submit Assessment Action
  const handleFinalSubmit = async () => {
    if (!validateAllAnswers()) {
      setShowSubmitModal(false);
      return;
    }

    setIsSubmitting(true);
    const res = await submitAssessmentApi(activeAssessment.id, studentId, answers);
    setIsSubmitting(false);
    setShowSubmitModal(false);

    if (res.success) {
      // Refresh catalog list and transition to results
      await loadAssessments();
      handleViewResults(activeAssessment.id);
    } else {
      if (res.missingQuestions) {
        setMissingQuestionsList(res.missingQuestions);
      }
      alert(res.error || 'Assessment submission failed.');
    }
  };

  // Retake Assessment Action
  const handleRetakeConfirm = async () => {
    if (!selectedAssessmentId) return;
    setIsRetaking(true);
    const res = await retakeAssessmentApi(selectedAssessmentId, studentId);
    setIsRetaking(false);
    setShowRetakeModal(false);

    if (res.success) {
      await loadAssessments();
      handleStartOrContinue(selectedAssessmentId);
    } else {
      alert(res.error || 'Failed to reset assessment for retake.');
    }
  };

  // Save Reflection Note
  const handleSaveReflectionNote = () => {
    if (!studentReflectionNote.trim()) return;
    const newEntry = {
      id: `ref_${Date.now()}`,
      mood: 'Empowered',
      moodEmoji: '🌟',
      date: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date()),
      prompt: resultsData?.results?.reflectionPrompts?.[0] || 'Assessment Personal Reflection',
      entry: studentReflectionNote
    };

    setReflectionArchive([newEntry, ...reflectionArchive]);
    setNoteSavedNotice(true);
    setTimeout(() => setNoteSavedNotice(false), 3500);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12">
      {/* ============================================================== */}
      {/* TOP HEADER & NAVIGATION BAR */}
      {/* ============================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBE5FF] text-primary text-xs font-bold uppercase tracking-wider mb-2 border border-[#E6DEFF]">
            <Target className="w-3.5 h-3.5" />
            <span>Student Growth & Self-Discovery</span>
          </div>
          <h2 className=" text-2xl sm:text-3xl font-bold text-[#1b1831] tracking-tight">
            Self-Assessment & Mindset Compass
          </h2>
          <p className="text-xs sm:text-sm text-[#6A6678] mt-1">
            Evidence-based reflection tools to clarify your inner strengths, learning flow, and personal development.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#F3EFFF] border border-[#E6DEFF] w-fit">
          <button
            type="button"
            onClick={() => {
              setCurrentView('catalog');
              setValidationError(null);
            }}
            className={`py-1.5 px-3.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
              currentView === 'catalog' || currentView === 'assessment' || currentView === 'review' || currentView === 'results'
                ? 'bg-primary text-white border-[#E6DEFF] shadow-xs'
                : 'text-[#1b1831] border-transparent hover:text-black'
            }`}
          >
            Assessments ({assessments.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setCurrentView('history');
              setValidationError(null);
            }}
            className={`py-1.5 px-3.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
              currentView === 'history'
                ? 'bg-primary text-white border-[#E6DEFF] shadow-xs'
                : 'text-[#1b1831] border-transparent hover:text-black'
            }`}
          >
            Reflection Archive ({reflectionArchive.length})
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* VIEW 1: ASSESSMENTS CATALOG */}
      {/* ============================================================== */}
      {currentView === 'catalog' && (
        <div className="space-y-6">
          {/* Summary Metric Counters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E6DEFF] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#6A6678] uppercase tracking-wider block">Available</span>
                <span className=" text-2xl sm:text-3xl font-bold text-[#1b1831] mt-1 block">
                  {stats.total}
                </span>
                <span className="text-[11px] text-[#6A6678]">Curriculum modules</span>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#EBE5FF] text-primary flex items-center justify-center border border-[#E6DEFF]">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E6DEFF] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">Completed</span>
                <span className=" text-2xl sm:text-3xl font-bold text-primary mt-1 block">
                  {stats.completed}
                </span>
                <span className="text-[11px] text-[#4B735F] font-semibold">Profiles ready</span>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#EBE5FF] text-primary flex items-center justify-center border border-[#E6DEFF]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E6DEFF] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#8C5E14] uppercase tracking-wider block">In Progress</span>
                <span className=" text-2xl sm:text-3xl font-bold text-[#8C5E14] mt-1 block">
                  {stats.inProgress}
                </span>
                <span className="text-[11px] text-[#8C5E14]">Drafts saved</span>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#FBF5E6] text-[#8C5E14] flex items-center justify-center border border-[#E6DEFF]">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E6DEFF] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#6A6678] uppercase tracking-wider block">Not Started</span>
                <span className=" text-2xl sm:text-3xl font-bold text-[#1b1831] mt-1 block">
                  {stats.notStarted}
                </span>
                <span className="text-[11px] text-[#6A6678]">Ready for discovery</span>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#F3EFFF] text-[#6A6678] flex items-center justify-center border border-[#E6DEFF]">
                <Compass className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Filters & Search Toolbar */}
          <div className="p-4 rounded-3xl bg-white border border-[#E6DEFF] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Status Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'ALL', label: 'All Modules' },
                { id: 'IN_PROGRESS', label: 'In Progress' },
                { id: 'COMPLETED', label: 'Completed' },
                { id: 'NOT_STARTED', label: 'Not Started' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStatusFilter(tab.id)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    statusFilter === tab.id
                      ? 'bg-primary text-white border-[#E6DEFF] shadow-xs'
                      : 'bg-[#FCF8FF] text-[#1b1831] border-[#E6DEFF] hover:border-[#E6DEFF]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-[#6A6678] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search assessments..."
                className="w-full pl-9 pr-8 py-2 rounded-xl text-xs font-medium bg-[#FCF8FF] border border-[#E6DEFF] focus:outline-none focus:ring-1 focus:ring-primary text-[#1b1831]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6A6678] hover:text-black cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Catalog Error Banner */}
          {catalogError && (
            <div className="p-4 rounded-2xl bg-[#FDF2F2] border border-[#E6DEFF] flex items-center gap-3 text-xs text-[#B42318]">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{catalogError}</span>
              <button
                type="button"
                onClick={loadAssessments}
                className="ml-auto underline font-bold cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}

          {/* Assessment Cards Grid */}
          {isLoadingList ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-[#E6DEFF] shadow-xs space-y-3">
              <Loader2 className="w-7 h-7 text-primary animate-spin mx-auto" />
              <p className="text-xs font-medium text-[#6A6678]">Loading student self-assessments...</p>
            </div>
          ) : filteredAssessments.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-[#E6DEFF] shadow-xs space-y-3">
              <Compass className="w-8 h-8 text-[#6A6678] mx-auto opacity-60" />
              <h4 className=" text-base font-bold text-[#1b1831]">No assessments found</h4>
              <p className="text-xs text-[#6A6678] max-w-sm mx-auto">
                No self-assessments match your selected filter. Clear your search or filter to see available modules.
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatusFilter('ALL');
                  setSearchQuery('');
                }}
                className="py-1.5 px-4 rounded-xl text-xs font-semibold bg-primary text-white border border-[#E6DEFF] cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredAssessments.map((asmt) => {
                const isCompleted = asmt.status === 'Completed';
                const isInProgress = asmt.status === 'In Progress';
                const isNotStarted = asmt.status === 'Not Started';
                const isMissingDependency = asmt.missingDependency;

                return (
                  <div
                    key={asmt.id}
                    className="p-6 rounded-3xl bg-white border border-[#E6DEFF] hover:border-primary/40 shadow-xs transition-all flex flex-col justify-between gap-5 relative group"
                  >
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-primary bg-[#EBE5FF] px-3 py-1 rounded-full border border-[#E6DEFF]">
                            {asmt.category || 'Mindset'}
                          </span>
                          <span className="text-[10px] text-[#6A6678] font-mono">v{asmt.version}</span>
                        </div>

                        {/* Status Badge */}
                        {isCompleted && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary bg-[#EBE5FF] px-2.5 py-1 rounded-full border border-[#E6DEFF]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                            <span>Completed</span>
                          </span>
                        )}
                        {isInProgress && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8C5E14] bg-[#FBF5E6] px-2.5 py-1 rounded-full border border-[#E6DEFF]">
                            <Clock className="w-3.5 h-3.5 text-[#8C5E14]" />
                            <span>In Progress ({asmt.answeredCount}/{asmt.totalQuestions})</span>
                          </span>
                        )}
                        {isNotStarted && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#6A6678] bg-[#F3EFFF] px-2.5 py-1 rounded-full border border-[#E6DEFF]">
                            <span>Not Started</span>
                          </span>
                        )}
                        {isMissingDependency && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#B42318] bg-[#FDF2F2] px-2.5 py-1 rounded-full border border-[#E6DEFF]">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Dependency Pending</span>
                          </span>
                        )}
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h3 className=" text-lg sm:text-xl font-bold text-[#1b1831] group-hover:text-primary transition-colors">
                          {asmt.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#6A6678] leading-relaxed mt-1">
                          {asmt.description}
                        </p>
                      </div>

                      {/* Metadata Row */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#6A6678] pt-1">
                        {asmt.estimatedDuration && (
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{asmt.estimatedDuration}</span>
                          </div>
                        )}
                        {asmt.totalQuestions > 0 && (
                          <div className="flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5" />
                            <span>{asmt.totalQuestions} questions</span>
                          </div>
                        )}
                        {asmt.completedAt && (
                          <div className="flex items-center gap-1.5 text-[#4B735F] font-medium">
                            <Check className="w-3.5 h-3.5" />
                            <span>Completed {asmt.completedAt}</span>
                          </div>
                        )}
                        {asmt.savedAt && !asmt.completedAt && (
                          <div className="flex items-center gap-1.5 text-[#8C5E14] font-medium">
                            <Save className="w-3.5 h-3.5" />
                            <span>Saved {asmt.savedAt}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons Toolbar */}
                    <div className="pt-4 border-t border-[#E6DEFF] flex flex-wrap items-center justify-between gap-2">
                      {isCompleted && (
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={() => handleViewResults(asmt.id)}
                            className="flex-1 sm:flex-none py-2 px-4 rounded-xl text-xs font-semibold text-white bg-primary hover:bg-primary-container transition-colors border border-[#E6DEFF] shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>View Results</span>
                          </button>
                          {asmt.retakePermitted && (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedAssessmentId(asmt.id);
                                setShowRetakeModal(true);
                              }}
                              className="py-2 px-3 rounded-xl text-xs font-semibold text-primary bg-[#EBE5FF] hover:bg-[#E6DEFF] transition-colors border border-[#E6DEFF] cursor-pointer flex items-center gap-1.5"
                              title="Retake Assessment"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Retake</span>
                            </button>
                          )}
                        </div>
                      )}

                      {isInProgress && (
                        <button
                          type="button"
                          onClick={() => handleStartOrContinue(asmt.id)}
                          className="w-full sm:w-auto py-2 px-5 rounded-xl text-xs font-semibold text-white bg-primary hover:bg-primary-container transition-colors border border-[#E6DEFF] shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <span>Continue Assessment</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {isNotStarted && (
                        <button
                          type="button"
                          onClick={() => handleStartOrContinue(asmt.id)}
                          className="w-full sm:w-auto py-2 px-5 rounded-xl text-xs font-semibold text-white bg-primary hover:bg-primary-container transition-colors border border-[#E6DEFF] shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>Start Assessment</span>
                        </button>
                      )}

                      {isMissingDependency && (
                        <button
                          type="button"
                          onClick={() => {
                            setDependencyModal({
                              title: asmt.title,
                              message: asmt.missingDependencyMessage || 'Curriculum configuration pending: Assessment questions and scoring rubric dependency not yet provisioned.'
                            });
                          }}
                          className="w-full sm:w-auto py-2 px-4 rounded-xl text-xs font-semibold text-[#B42318] bg-[#FDF2F2] hover:bg-[#FCE8E8] transition-colors border border-[#E6DEFF] cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>Dependency Details</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 2: INTERACTIVE ASSESSMENT EXPERIENCE */}
      {/* ============================================================== */}
      {currentView === 'assessment' && activeAssessment && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Top Return & Save Bar */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                if (JSON.stringify(answers) !== JSON.stringify(initialAnswers)) {
                  if (window.confirm('You have unsaved changes. Return to assessment list? Your progress can be saved.')) {
                    setCurrentView('catalog');
                  }
                } else {
                  setCurrentView('catalog');
                }
              }}
              className="py-1.5 px-3 rounded-xl text-xs font-semibold text-[#1b1831] bg-white hover:bg-[#FCF8FF] border border-[#E6DEFF] shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Assessments</span>
            </button>

            <button
              type="button"
              onClick={handleSaveProgress}
              disabled={isSavingProgress}
              className="py-1.5 px-3.5 rounded-xl text-xs font-semibold text-primary bg-[#EBE5FF] hover:bg-[#E6DEFF] border border-[#E6DEFF] shadow-xs cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSavingProgress ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>{isSavingProgress ? 'Saving...' : 'Save & Continue Later'}</span>
            </button>
          </div>

          {/* Save Success Notice */}
          {saveSuccessNotice && (
            <div className="p-3.5 rounded-2xl bg-[#EBE5FF] border border-[#E6DEFF] text-xs font-medium text-primary flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-primary" />
              <span>{saveSuccessNotice}</span>
            </div>
          )}

          {/* Pre-Assessment Instructions Banner */}
          {currentQuestionIndex === 0 && activeAssessment.instructions && (
            <div className="p-5 rounded-3xl bg-[#FCF8FF] border border-[#E6DEFF] shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                <Info className="w-4 h-4" />
                <span>Instructions & Guidelines</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#6A6678] list-disc list-inside">
                {activeAssessment.instructions.map((inst, idx) => (
                  <li key={idx} className="leading-relaxed">{inst}</li>
                ))}
              </ul>
              <div className="pt-2 text-[11px] text-[#4B735F] font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Student Record: Private to your growth profile.</span>
              </div>
            </div>
          )}

          {/* Stepper Progress Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DEFF] shadow-xs space-y-6">
            {/* Header: Step Counter & Progress Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-primary bg-[#EBE5FF] px-3 py-1 rounded-full border border-[#E6DEFF]">
                  Question {currentQuestionIndex + 1} of {activeAssessment.questions.length}
                </span>
                <span className="text-[#6A6678]">
                  {Math.round(((currentQuestionIndex + 1) / activeAssessment.questions.length) * 100)}% Complete
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-[#EBE5FF] rounded-full overflow-hidden border border-[#E6DEFF]">
                <div
                  className="h-full bg-primary transition-all duration-300 rounded-full"
                  style={{
                    width: `${((currentQuestionIndex + 1) / activeAssessment.questions.length) * 100}%`
                  }}
                />
              </div>

              {/* Question Stepper Dots */}
              <div className="flex items-center justify-center gap-1.5 pt-1">
                {activeAssessment.questions.map((q, idx) => {
                  const isAnswered = answers[q.id] !== undefined && String(answers[q.id]).trim() !== '';
                  const isCurrent = idx === currentQuestionIndex;

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        setValidationError(null);
                        setCurrentQuestionIndex(idx);
                      }}
                      className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer border ${
                        isCurrent
                          ? 'bg-primary text-white border-[#E6DEFF] ring-2 ring-primary/30'
                          : isAnswered
                          ? 'bg-[#EBE5FF] text-primary border-[#E6DEFF]'
                          : 'bg-[#FCF8FF] text-[#6A6678] border-[#E6DEFF] hover:border-[#E6DEFF]'
                      }`}
                      title={`Go to Question ${idx + 1}: ${q.title}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Question Prompt */}
            {activeAssessment.questions[currentQuestionIndex] && (() => {
              const q = activeAssessment.questions[currentQuestionIndex];
              const currentVal = answers[q.id];

              return (
                <div className="space-y-5 pt-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-[#6A6678] uppercase tracking-wider">
                        {q.title}
                      </span>
                      {q.required && (
                        <span className="text-[10px] font-semibold text-[#B42318] bg-[#FDF2F2] px-2 py-0.5 rounded-full border border-[#E6DEFF]">
                          * Required
                        </span>
                      )}
                    </div>
                    <h3 className=" text-xl sm:text-2xl font-bold text-[#1b1831] leading-snug">
                      {q.question}
                    </h3>
                  </div>

                  {/* Supported Answer Type: Single Choice */}
                  {q.type === 'single_choice' && q.options && (
                    <div className="space-y-3">
                      {q.options.map((opt) => {
                        const isSelected = currentVal === opt.id || currentVal?.id === opt.id || currentVal === opt.label;

                        return (
                          <div
                            key={opt.id}
                            onClick={() => handleAnswerChange(q.id, opt.id)}
                            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                              isSelected
                                ? 'bg-[#EBE5FF] border-primary text-primary ring-1 ring-primary shadow-xs'
                                : 'bg-[#FCF8FF] border-[#E6DEFF] hover:border-primary/40 text-[#1b1831]'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                                isSelected ? 'bg-primary border-primary text-white' : 'border-[#E6DEFF] bg-white'
                              }`}
                            >
                              {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                            </div>

                            <div className="space-y-1 flex-1">
                              <span className="text-xs sm:text-sm font-medium leading-relaxed block">
                                {opt.label}
                              </span>
                              {opt.trait && (
                                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary bg-white px-2 py-0.5 rounded-md border border-[#E6DEFF]">
                                  Trait: {opt.trait}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Supported Answer Type: Likert Scale */}
                  {q.type === 'likert_scale' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-5 gap-2 sm:gap-3">
                        {(q.scale || [
                          { value: 1, label: 'Strongly Disagree' },
                          { value: 2, label: 'Disagree' },
                          { value: 3, label: 'Neutral' },
                          { value: 4, label: 'Agree' },
                          { value: 5, label: 'Strongly Agree' }
                        ]).map((lvl) => {
                          const isSelected = Number(currentVal) === Number(lvl.value);

                          return (
                            <button
                              key={lvl.value}
                              type="button"
                              onClick={() => handleAnswerChange(q.id, lvl.value)}
                              className={`p-3 sm:p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-2 ${
                                isSelected
                                  ? 'bg-primary text-white border-[#E6DEFF] ring-2 ring-primary/30 shadow-xs'
                                  : 'bg-[#FCF8FF] border-[#E6DEFF] hover:border-primary/40 text-[#1b1831]'
                              }`}
                            >
                              <span className="text-base sm:text-lg font-bold">{lvl.value}</span>
                              <span className="text-[10px] sm:text-[11px] font-medium leading-tight">
                                {lvl.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Supported Answer Type: Long Text / Reflection */}
                  {q.type === 'long_text' && (
                    <div className="space-y-2">
                      <textarea
                        rows={5}
                        value={currentVal || ''}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        placeholder={q.placeholder || 'Enter your detailed reflection...'}
                        className="w-full p-4 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] focus:outline-none focus:ring-1 focus:ring-primary text-xs sm:text-sm text-[#1b1831] leading-relaxed resize-y"
                      />
                      <div className="flex items-center justify-between text-[11px] text-[#6A6678]">
                        <span>
                          {q.minLength
                            ? `Minimum ${q.minLength} characters required`
                            : 'Personal growth reflection'}
                        </span>
                        <span>{String(currentVal || '').trim().length} characters</span>
                      </div>
                    </div>
                  )}

                  {/* In-Line Validation Error */}
                  {validationError && (
                    <div className="p-3 rounded-2xl bg-[#FDF2F2] border border-[#E6DEFF] text-xs text-[#B42318] flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{validationError}</span>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Bottom Stepper Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-[#E6DEFF]">
              <button
                type="button"
                disabled={currentQuestionIndex === 0}
                onClick={handlePrevQuestion}
                className="py-2 px-4 rounded-xl text-xs font-semibold text-[#1b1831] bg-white hover:bg-[#FCF8FF] border border-[#E6DEFF] shadow-xs disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentQuestionIndex < activeAssessment.questions.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="py-2.5 px-6 rounded-xl text-xs font-semibold text-white bg-primary hover:bg-primary-container transition-colors border border-[#E6DEFF] shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (validateQuestion(currentQuestionIndex)) {
                      setCurrentView('review');
                    }
                  }}
                  className="py-2.5 px-6 rounded-xl text-xs font-semibold text-white bg-primary hover:bg-primary-container transition-colors border border-[#E6DEFF] shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <CheckSquare className="w-4 h-4" />
                  <span>Review Answers</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 3: REVIEW ANSWERS BEFORE FINAL SUBMISSION */}
      {/* ============================================================== */}
      {currentView === 'review' && activeAssessment && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header Bar */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrentView('assessment')}
              className="py-1.5 px-3 rounded-xl text-xs font-semibold text-[#1b1831] bg-white hover:bg-[#FCF8FF] border border-[#E6DEFF] shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Questions</span>
            </button>

            <span className="text-xs font-bold text-primary bg-[#EBE5FF] px-3 py-1 rounded-full border border-[#E6DEFF]">
              Review Step
            </span>
          </div>

          {/* Missing Questions Warning (if any) */}
          {missingQuestionsList.length > 0 && (
            <div className="p-4 rounded-3xl bg-[#FDF2F2] border border-[#E6DEFF] text-xs text-[#B42318] space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Please answer all required questions before final submission:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 pl-2">
                {missingQuestionsList.map((m, idx) => (
                  <li key={idx}>
                    Question {m.index !== undefined ? m.index + 1 : ''}: {m.title} ({m.error || 'Required'})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Review Summary Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DEFF] shadow-xs space-y-6">
            <div>
              <h3 className=" text-xl sm:text-2xl font-bold text-[#1b1831]">
                Review Your Answers
              </h3>
              <p className="text-xs sm:text-sm text-[#6A6678] mt-1">
                Please verify your responses before submitting. You can click "Edit" on any question to adjust your response.
              </p>
            </div>

            {/* Questions Table / List */}
            <div className="space-y-4">
              {activeAssessment.questions.map((q, idx) => {
                const ans = answers[q.id];
                let displayVal = 'No answer provided';

                if (q.type === 'single_choice' && q.options) {
                  const opt = q.options.find((o) => o.id === ans || o.id === ans?.id || o.label === ans);
                  if (opt) displayVal = opt.label;
                } else if (q.type === 'likert_scale') {
                  if (ans !== undefined && ans !== null) {
                    const scaleItem = q.scale?.find((s) => Number(s.value) === Number(ans));
                    displayVal = scaleItem ? `${ans} - ${scaleItem.label}` : `${ans}/5`;
                  }
                } else if (q.type === 'long_text') {
                  if (ans) displayVal = `"${ans}"`;
                }

                const isMissing = q.required && (!ans || String(ans).trim() === '');

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-3 ${
                      isMissing
                        ? 'bg-[#FDF2F2] border-[#E6DEFF]'
                        : 'bg-[#FCF8FF] border-[#E6DEFF] hover:border-primary/40'
                    }`}
                  >
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-primary uppercase">
                          Question {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-[#1b1831]">{q.title}</span>
                      </div>
                      <p className="text-xs text-[#6A6678] italic line-clamp-1">{q.question}</p>
                      <p className={`text-xs font-medium pt-1 ${isMissing ? 'text-[#B42318]' : 'text-[#1b1831]'}`}>
                        {displayVal}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setCurrentQuestionIndex(idx);
                        setCurrentView('assessment');
                      }}
                      className="py-1 px-3 rounded-xl text-xs font-semibold text-primary bg-white hover:bg-[#EBE5FF] border border-[#E6DEFF] cursor-pointer self-start shrink-0"
                    >
                      Edit
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Submission Toolbar */}
            <div className="pt-6 border-t border-[#E6DEFF] flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleSaveProgress}
                disabled={isSavingProgress}
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl text-xs font-semibold text-[#1b1831] bg-white hover:bg-[#FCF8FF] border border-[#E6DEFF] shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Draft & Finish Later</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (validateAllAnswers()) {
                    setShowSubmitModal(true);
                  }
                }}
                className="w-full sm:w-auto py-2.5 px-6 rounded-xl text-xs font-semibold text-white bg-primary hover:bg-primary-container transition-colors border border-[#E6DEFF] shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Assessment</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUBMISSION CONFIRMATION MODAL */}
      {/* ============================================================== */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E6DEFF] p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-scaleUp">
            <div className="w-12 h-12 rounded-2xl bg-[#EBE5FF] text-primary flex items-center justify-center border border-[#E6DEFF] mx-auto">
              <Target className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className=" text-xl font-bold text-[#1b1831]">
                Submit Self-Assessment?
              </h3>
              <p className="text-xs sm:text-sm text-[#6A6678] leading-relaxed">
                Your responses will be saved against your student record and calculated using defined curriculum scoring rules to generate your growth profile.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] text-[11px] text-[#6A6678] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-primary">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Student Ownership Verified</span>
              </div>
              <p>Preserves assessment version {activeAssessment?.version} with official completion timestamp.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold text-[#1b1831] bg-[#FCF8FF] hover:bg-[#E6DEFF] border border-[#E6DEFF] cursor-pointer"
              >
                Review More
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFinalSubmit}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] shadow-xs cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
                <span>{isSubmitting ? 'Submitting...' : 'Confirm & Submit'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* RETAKE CONFIRMATION MODAL */}
      {/* ============================================================== */}
      {showRetakeModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E6DEFF] p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-scaleUp">
            <div className="w-12 h-12 rounded-2xl bg-[#FBF5E6] text-[#8C5E14] flex items-center justify-center border border-[#E6DEFF] mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className=" text-xl font-bold text-[#1b1831]">
                Retake Assessment?
              </h3>
              <p className="text-xs sm:text-sm text-[#6A6678] leading-relaxed">
                This assessment permits retaking. Resetting will clear your current answers and allow you to reflect afresh with updated responses.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowRetakeModal(false)}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold text-[#1b1831] bg-[#FCF8FF] hover:bg-[#E6DEFF] border border-[#E6DEFF] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isRetaking}
                onClick={handleRetakeConfirm}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] shadow-xs cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {isRetaking ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <RotateCcw className="w-3.5 h-3.5" />
                )}
                <span>{isRetaking ? 'Resetting...' : 'Confirm Retake'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MISSING DEPENDENCY NOTICE MODAL */}
      {/* ============================================================== */}
      {dependencyModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E6DEFF] p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-scaleUp">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF2F2] text-[#B42318] flex items-center justify-center border border-[#E6DEFF] mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className=" text-xl font-bold text-[#1b1831]">
                {dependencyModal.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#6A6678] leading-relaxed">
                {dependencyModal.message}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] text-[11px] text-[#6A6678] space-y-1">
              <span className="font-bold text-[#1b1831] block">Curriculum Integrity Policy:</span>
              <p>In accordance with educational policy, results and questions cannot be fabricated without authorized curriculum rubric approval.</p>
            </div>

            <button
              type="button"
              onClick={() => setDependencyModal(null)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#1b1831] bg-[#FCF8FF] hover:bg-[#E6DEFF] border border-[#E6DEFF] cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 4: RESULTS PAGE */}
      {/* ============================================================== */}
      {currentView === 'results' && (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Back Toolbar */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrentView('catalog')}
              className="py-1.5 px-3.5 rounded-xl text-xs font-semibold text-[#1b1831] bg-white hover:bg-[#FCF8FF] border border-[#E6DEFF] shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Assessments</span>
            </button>

            {resultsData?.retakePermitted && (
              <button
                type="button"
                onClick={() => setShowRetakeModal(true)}
                className="py-1.5 px-3.5 rounded-xl text-xs font-semibold text-primary bg-[#EBE5FF] hover:bg-[#E6DEFF] border border-[#E6DEFF] shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Assessment</span>
              </button>
            )}
          </div>

          {isLoadingResults ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-[#E6DEFF] shadow-xs space-y-3">
              <Loader2 className="w-7 h-7 text-primary animate-spin mx-auto" />
              <p className="text-xs font-medium text-[#6A6678]">Calculating your growth profile & insights...</p>
            </div>
          ) : resultsError ? (
            <div className="p-6 rounded-3xl bg-[#FDF2F2] border border-[#E6DEFF] text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-[#B42318] mx-auto" />
              <h4 className=" text-lg font-bold text-[#B42318]">Results Unavailable</h4>
              <p className="text-xs text-[#6A6678]">{resultsError}</p>
              <button
                type="button"
                onClick={() => setCurrentView('catalog')}
                className="py-2 px-4 rounded-xl text-xs font-semibold bg-primary text-white border border-[#E6DEFF] cursor-pointer"
              >
                Return to Catalog
              </button>
            </div>
          ) : resultsData?.results ? (
            <div className="space-y-6">
              {/* Results Hero Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DEFF] shadow-xs space-y-6">
                {/* Status Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E6DEFF] text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary bg-[#EBE5FF] px-3 py-1 rounded-full border border-[#E6DEFF] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                      <span>Completed Assessment</span>
                    </span>
                    <span className="text-[#6A6678] font-mono">v{resultsData.version}</span>
                  </div>
                  <div className="text-[#6A6678] flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    <span>Completed {resultsData.completedAt}</span>
                  </div>
                </div>

                {/* Archetype & Core Metric */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-r from-[#F3EFFF] via-[#EBE5FF] to-[#F3EFFF] border border-[#E6DEFF]">
                  <div className="space-y-2 max-w-xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white text-primary text-[11px] font-bold uppercase tracking-wider border border-[#E6DEFF]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Configured Growth Archetype</span>
                    </div>
                    <h3 className=" text-2xl sm:text-3xl font-bold text-[#1b1831]">
                      {resultsData.results.archetype}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6A6678] leading-relaxed">
                      {resultsData.results.summary}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#E6DEFF] text-center min-w-[150px] shadow-xs">
                    <span className="text-[11px] font-bold text-[#6A6678] uppercase block">Growth Index</span>
                    <div className=" text-3xl font-bold text-primary mt-1">
                      {resultsData.results.overallIndex}%
                    </div>
                    <span className="text-[10px] text-[#4B735F] font-semibold">Validated Profile</span>
                  </div>
                </div>

                {/* Dimension Scores Breakdown (if available) */}
                {resultsData.results.dimensionScores && (
                  <div className="space-y-3 pt-2">
                    <h4 className=" text-base font-bold text-[#1b1831]">
                      Cognitive Dimension Breakdown
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Object.entries(resultsData.results.dimensionScores).map(([dim, val]) => (
                        <div key={dim} className="p-3.5 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-[#1b1831] capitalize">
                              {dim.replace(/([A-Z])/g, ' $1')}
                            </span>
                            <span className=" font-bold text-primary">{val}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-white rounded-full overflow-hidden border border-[#E6DEFF]">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${val}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Permitted Core Strengths & Interests Matrix */}
              {resultsData.results.permittedStrengths && (
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DEFF] shadow-xs space-y-4">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    <h4 className=" text-xl font-bold text-[#1b1831]">
                      Validated Strengths & Interests
                    </h4>
                  </div>
                  <p className="text-xs text-[#6A6678]">
                    Derived from your responses according to verified curriculum rubric rules without speculative diagnoses.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    {resultsData.results.permittedStrengths.map((str, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] space-y-2 hover:border-primary/40 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className=" text-base font-bold text-[#1b1831]">
                            {str.name}
                          </span>
                          {str.score !== undefined && (
                            <span className="text-xs font-bold  text-primary">
                              {str.score}%
                            </span>
                          )}
                        </div>
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary bg-[#EBE5FF] px-2 py-0.5 rounded-md border border-[#E6DEFF]">
                          {str.category}
                        </span>
                        <p className="text-xs text-[#6A6678] leading-relaxed">
                          {str.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reflection Prompts & Interactive Notes */}
              {resultsData.results.reflectionPrompts && (
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DEFF] shadow-xs space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h4 className=" text-xl font-bold text-[#1b1831]">
                      Targeted Reflection Prompts
                    </h4>
                  </div>

                  <div className="space-y-3">
                    {resultsData.results.reflectionPrompts.map((prompt, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] space-y-1"
                      >
                        <span className="text-[10px] font-bold text-primary uppercase">
                          Inquiry #{idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm font-medium text-[#1b1831] italic">
                          "{prompt}"
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Reflection Note Input */}
                  <div className="pt-2 space-y-2">
                    <label className="text-xs font-bold text-[#1b1831] block">
                      Record Your Personal Growth Takeaway:
                    </label>
                    <textarea
                      rows={3}
                      value={studentReflectionNote}
                      onChange={(e) => setStudentReflectionNote(e.target.value)}
                      placeholder="Write how you will apply these insights in your upcoming study week..."
                      className="w-full p-3.5 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] focus:outline-none focus:ring-1 focus:ring-primary text-xs text-[#1b1831] resize-y"
                    />
                    <div className="flex items-center justify-between">
                      {noteSavedNotice ? (
                        <span className="text-xs font-bold text-primary flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Reflection archived to your growth record!</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#6A6678]">Saved to your reflection archive.</span>
                      )}
                      <button
                        type="button"
                        onClick={handleSaveReflectionNote}
                        disabled={!studentReflectionNote.trim()}
                        className="py-1.5 px-4 rounded-xl text-xs font-semibold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] shadow-xs disabled:opacity-40 cursor-pointer"
                      >
                        Archive Note
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Relevant Activity Suggestions */}
              {resultsData.results.activitySuggestions && resultsData.results.activitySuggestions.length > 0 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DEFF] shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Compass className="w-5 h-5 text-primary" />
                      <h4 className=" text-xl font-bold text-[#1b1831]">
                        Recommended Next Activities
                      </h4>
                    </div>
                    <Link
                      to="/child/activities"
                      className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      <span>Explore all activities</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <p className="text-xs text-[#6A6678]">
                    Hand-picked personal growth exercises designed to cultivate your top strengths.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-1">
                    {resultsData.results.activitySuggestions.map((act) => (
                      <div
                        key={act.id}
                        className="p-5 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] hover:border-primary/40 transition-all flex flex-col justify-between gap-3 shadow-2xs"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className="text-primary bg-[#EBE5FF] px-2 py-0.5 rounded-md border border-[#E6DEFF]">
                              {act.category}
                            </span>
                            <span className="text-[#6A6678] flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{act.duration}</span>
                            </span>
                          </div>
                          <h5 className=" text-sm font-bold text-[#1b1831] leading-snug">
                            {act.title}
                          </h5>
                          {act.reason && (
                            <p className="text-[11px] text-[#6A6678] leading-relaxed">
                              {act.reason}
                            </p>
                          )}
                        </div>

                        <Link
                          to="/child/activities"
                          className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Play className="w-3 h-3" />
                          <span>Start Activity</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 5: REFLECTION ARCHIVE HISTORY */}
      {/* ============================================================== */}
      {currentView === 'history' && (
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h3 className=" text-xl font-bold text-[#1b1831]">
                Your Personal Reflection Archive
              </h3>
              <p className="text-xs text-[#6A6678]">
                Chronological log of your mindset reflections, self-discoveries, and daily intentions.
              </p>
            </div>
            <span className="text-xs font-bold text-primary bg-[#EBE5FF] px-3 py-1 rounded-full border border-[#E6DEFF]">
              {reflectionArchive.length} Entries
            </span>
          </div>

          {reflectionArchive.map((ref) => (
            <div
              key={ref.id}
              className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E6DEFF] hover:border-primary/40 shadow-xs space-y-3 transition-all"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-primary bg-[#EBE5FF] px-3 py-1 rounded-full border border-[#E6DEFF] flex items-center gap-1.5">
                  <span>{ref.moodEmoji}</span>
                  <span>{ref.mood}</span>
                </span>
                <span className="text-[#6A6678] font-medium">{ref.date}</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#1b1831] italic">
                "{ref.prompt}"
              </p>
              <p className="text-xs sm:text-sm text-[#6A6678] leading-relaxed pt-2 border-t border-[#E6DEFF]">
                {ref.entry}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentAssessmentPage;
