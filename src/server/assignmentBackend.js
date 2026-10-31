// Server-side assignment validation and submission engine
// Runs on the Node.js / Vite backend server to ensure server-authoritative security

// Initial server-side assignment records
let serverAssignments = [
  {
    id: 'asg_1',
    studentId: 'student_1',
    title: 'Self-Discovery: Core Values & Priorities Analysis',
    subject: 'Personal Leadership',
    activityType: 'Reflection & Values Mapping',
    assignedDate: 'Oct 26, 2026',
    dueDate: 'Nov 1, 2026',
    dueDateIso: '2026-11-01T17:00:00',
    duration: '35 mins',
    status: 'In Progress',
    priority: 'High',
    description: 'Document your top 3 foundational personal values and write a 2-paragraph reflection on how they guide your academic decisions.',
    instructions: 'Follow these core principles: Be authentic, write candid reflections from your real school experiences, and relate each value to a tangible choice you faced recently.',
    activitySteps: [
      'Reflect on three recent decisions where you felt true to yourself or conflicted.',
      'Select your top 3 foundational values from the HighOrbit Leadership Matrix.',
      'Draft a concrete real-world example for each value demonstrating how it shapes your study habits.',
      'Review your draft against your mentor guidance note before final submission.'
    ],
    supportsFileUpload: true,
    requiredQuestions: [
      {
        id: 'q1',
        title: 'Primary Foundational Value Selection',
        type: 'single_choice',
        required: true,
        options: [
          'Intellectual Curiosity (Seeking depth over superficial speed)',
          'Integrity & Authenticity (Standing by principles under pressure)',
          'Compassionate Leadership (Empowering and listening to peers)',
          'Relentless Growth (Viewing setbacks as informative data)'
        ]
      },
      {
        id: 'q2',
        title: 'Secondary Values Identification',
        type: 'short_text',
        required: true,
        placeholder: 'e.g. Focus, Empathy, Systematic Thinking...'
      },
      {
        id: 'q3',
        title: 'Core Values Application Reflection (2 Paragraphs)',
        type: 'long_text',
        required: true,
        minWords: 15,
        placeholder: 'Describe a moment in the past semester where pressure threatened to derail your priorities...'
      }
    ],
    supportingDocuments: [
      { name: 'HighOrbit_Core_Values_Matrix.pdf', size: '1.2 MB', type: 'PDF Reference Guide' },
      { name: 'Self_Discovery_Reflection_Rubric.pdf', size: '840 KB', type: 'Scoring Rubric' }
    ],
    expectedSubmissionFormat: 'Structured Questionnaire & Two-Paragraph Written Reflection',
    draftAnswers: {
      q1: 'Intellectual Curiosity (Seeking depth over superficial speed)',
      q2: 'Integrity and Compassionate Empathy',
      q3: '1. Intellectual Curiosity: When studying advanced chemistry, I prioritized understanding molecular geometry principles instead of rote memorization.\n2. Integrity: Resisted shortcut temptation during exam study groups.'
    },
    activityConfirmed: false,
    submission: null,
    feedback: {
      author: 'Sarah Jenkins (Mentor)',
      date: 'Today, 8:45 AM',
      comment: 'Take your time on the paragraph about decision making under pressure. Contrast how you handle deadlines now versus last term.',
    },
    mentorNote: 'Take your time on the paragraph about decision making under pressure.',
  },
  {
    id: 'asg_2',
    studentId: 'student_1',
    title: 'Weekly Time Audit & Deep Work Schedule',
    subject: 'Time Management',
    activityType: 'Habit Audit & Schedule',
    assignedDate: 'Oct 28, 2026',
    dueDate: 'Nov 3, 2026',
    dueDateIso: '2026-11-03T23:59:00',
    duration: '45 mins',
    status: 'Pending',
    priority: 'Medium',
    description: 'Track your primary focus blocks over 4 days and identify key distractions and energy peaks.',
    instructions: 'Use the HighOrbit Focus timer or a journal to log your study sprints. Categorize each hour into Deep Work, Shallow Tasks, or Distraction.',
    activitySteps: [
      'Log 4 consecutive days of study and extracurricular time.',
      'Highlight hours between 8 AM and 10 PM in 30-minute intervals.',
      'Calculate your Deep Work Ratio (Deep Focus Hours / Total Active Hours).',
      'Formulate three boundaries to protect your morning peak energy window.'
    ],
    supportsFileUpload: false,
    requiredQuestions: [
      {
        id: 'q1',
        title: 'Primary Peak Energy Window',
        type: 'single_choice',
        required: true,
        options: [
          'Early Morning (6:00 AM – 9:00 AM)',
          'Late Morning (9:30 AM – 12:30 PM)',
          'Afternoon (2:00 PM – 5:00 PM)',
          'Evening (7:00 PM – 10:00 PM)'
        ]
      },
      {
        id: 'q2',
        title: 'Top Identified Distraction Source',
        type: 'single_choice',
        required: true,
        options: [
          'Smartphone & social notifications',
          'Multitasking between tabs/apps',
          'Fatigue and lack of planned recovery breaks',
          'External environmental noise'
        ]
      },
      {
        id: 'q3',
        title: 'Deep Work Schedule Architecture Plan',
        type: 'long_text',
        required: true,
        minWords: 10,
        placeholder: 'Outline your 4-day audit findings and specify your committed 90-minute daily focus sprint...'
      }
    ],
    supportingDocuments: [
      { name: 'Deep_Work_Weekly_Audit_Template.xlsx', size: '420 KB', type: 'Excel Spreadsheet' },
      { name: 'Distraction_Elimination_Checklist.pdf', size: '610 KB', type: 'PDF Guide' }
    ],
    expectedSubmissionFormat: 'Completed 4-Day Energy Audit & Strategic Schedule Outline',
    draftAnswers: {},
    activityConfirmed: false,
    submission: null,
    feedback: null,
    mentorNote: 'Use the Focus & Wellness timer for tracking.',
  },
  {
    id: 'asg_3',
    studentId: 'student_1',
    title: 'Emotional Awareness & Stress Triggers Map',
    subject: 'Emotional Wellness',
    activityType: 'Mindfulness Exercise',
    assignedDate: 'Oct 20, 2026',
    dueDate: 'Oct 28, 2026',
    dueDateIso: '2026-10-28T18:00:00',
    duration: '20 mins',
    status: 'Completed',
    priority: 'Medium',
    description: 'Identified exam anxiety triggers and drafted three breathing grounding exercises.',
    instructions: 'Map out physical and psychological signals of stress. Design rapid grounding routines to reset cortisol levels.',
    activitySteps: [
      'Document physical stress signals (e.g. shallow breathing, jaw tension).',
      'Identify the top 3 external stressors during testing weeks.',
      'Practice and record the 4-7-8 breathing technique over 3 sessions.'
    ],
    supportsFileUpload: true,
    requiredQuestions: [
      { id: 'q1', title: 'Primary Physical Stress Signal', type: 'short_text', required: true },
      {
        id: 'q2',
        title: 'Grounding Technique Selected',
        type: 'single_choice',
        required: true,
        options: ['4-7-8 Relaxing Breath', 'Box Breathing (4-4-4-4)', '5-4-3-2-1 Sensory Grounding', 'Progressive Muscle Relaxation']
      },
      { id: 'q3', title: 'Grounding Plan Summary', type: 'long_text', required: true }
    ],
    supportingDocuments: [
      { name: 'Somatic_Stress_Grounding_Protocol.pdf', size: '920 KB', type: 'Wellness Manual' }
    ],
    expectedSubmissionFormat: 'Stress Triggers Assessment & Grounding Protocol',
    draftAnswers: {},
    activityConfirmed: true,
    submission: {
      content: 'Identified three primary triggers: exam timing, multi-tasking on social media, and poor hydration. Adopted the 4-7-8 mindful breathing technique during study breaks.',
      submittedAt: 'Oct 28, 2026 at 4:20 PM',
      submittedAtIso: '2026-10-28T16:20:00.000Z',
      activityConfirmed: true,
      version: 1
    },
    feedback: {
      author: 'Sarah Jenkins (Mentor)',
      date: 'Oct 29, 2026',
      comment: 'Excellent introspection on physical cues of stress! The 4-7-8 breathing integration showed great practical application.',
    },
    mentorNote: 'Excellent introspection on physical cues of stress.',
  },
  {
    id: 'asg_4',
    studentId: 'student_1',
    title: 'Critical Thinking: Bias in Daily Media Analysis',
    subject: 'Critical Thinking',
    activityType: 'Case Study & Analysis',
    assignedDate: 'Oct 22, 2026',
    dueDate: 'Oct 29, 2026',
    dueDateIso: '2026-10-29T17:00:00',
    duration: '30 mins',
    status: 'Submitted',
    priority: 'Low',
    description: 'Compare two articles on the same scientific breakthrough and contrast tone, framing, and assumptions.',
    instructions: 'Evaluate sources through the CRAAP framework (Currency, Relevance, Authority, Accuracy, Purpose).',
    activitySteps: [
      'Select two opposing or divergent news articles covering a recent scientific discovery.',
      'Highlight emotive adjectives versus empirical evidence in both texts.',
      'Document author credentials and institutional backing.',
      'Summarize implicit assumptions made by each author.'
    ],
    supportsFileUpload: true,
    requiredQuestions: [
      { id: 'q1', title: 'Selected Topic for Comparative Analysis', type: 'short_text', required: true },
      {
        id: 'q2',
        title: 'Identified Primary Bias Mechanism',
        type: 'single_choice',
        required: true,
        options: ['Sensationalist headline framing', 'Selective omission of dissenting data', 'Commercial sponsor conflict of interest', 'False dichotomy narrative']
      },
      { id: 'q3', title: 'Comparative Synthesis Essay', type: 'long_text', required: true }
    ],
    supportingDocuments: [
      { name: 'Media_Literacy_Analysis_Framework.pdf', size: '1.1 MB', type: 'PDF Tool' }
    ],
    expectedSubmissionFormat: 'Comparative Case Analysis & Source Evaluation',
    draftAnswers: {},
    activityConfirmed: true,
    submission: {
      content: 'Compared coverage of the latest clean-energy fusion test. Source A framed it around stock market impacts, whereas Source B analyzed thermodynamic efficiency. Concluded that commercial vs academic incentives skew narrative tone.',
      submittedAt: 'Oct 29, 2026 at 3:15 PM',
      submittedAtIso: '2026-10-29T15:15:00.000Z',
      activityConfirmed: true,
      version: 1
    },
    feedback: null,
    mentorNote: 'Submitted on time. Mentor review scheduled for next advisory cycle.',
  },
  {
    id: 'asg_5',
    studentId: 'student_1',
    title: 'Quarterly Goal Alignment & Resilience Review',
    subject: 'Personal Growth',
    activityType: 'Goal Architecture',
    assignedDate: 'Oct 15, 2026',
    dueDate: 'Oct 27, 2026',
    dueDateIso: '2026-10-27T12:00:00',
    duration: '40 mins',
    status: 'Needs Revision',
    priority: 'High',
    description: 'Re-align your academic and personal development milestones for the upcoming term using SMART criteria.',
    instructions: 'Transform vague resolutions into Specific, Measurable, Achievable, Relevant, and Time-bound objectives.',
    activitySteps: [
      'Audit your last term milestones to see what succeeded and what stalled.',
      'Draft 3 SMART developmental objectives for this semester.',
      'Identify two high-probability obstacles and design an "If-Then" contingency plan for each.',
      'Incorporate mentor feedback from Sarah Jenkins before resubmission.'
    ],
    supportsFileUpload: true,
    requiredQuestions: [
      {
        id: 'q1',
        title: 'Core Milestone Focus Domain',
        type: 'single_choice',
        required: true,
        options: [
          'Academic Excellence & STEM Mastery',
          'Emotional Regulation & Stress Immunity',
          'Creative Writing & Self-Expression',
          'Leadership, Communication & Public Speaking'
        ]
      },
      {
        id: 'q2',
        title: 'SMART Metric Formulation',
        type: 'short_text',
        required: true,
        placeholder: 'e.g. Complete 35 practice calculus problems per week with >85% accuracy'
      },
      {
        id: 'q3',
        title: 'Revised Term Action Plan & Contingencies',
        type: 'long_text',
        required: true,
        minWords: 15,
        placeholder: 'Break down your goals into week-by-week sprint milestones...'
      }
    ],
    supportingDocuments: [
      { name: 'SMART_Milestone_Goal_Architect.pdf', size: '780 KB', type: 'Goal Framework' },
      { name: 'Resilience_Contingency_Planner.pdf', size: '640 KB', type: 'Action Guide' }
    ],
    expectedSubmissionFormat: 'SMART Milestone Framework & Weekly Sprint Roadmap',
    draftAnswers: {
      q1: 'Academic Excellence & STEM Mastery',
      q2: 'Complete 30 math problems and two timed science sprints weekly',
      q3: 'Initial goals submitted: 1. Study 4 hours daily. 2. Read 10 books. 3. Sleep 8 hours every night. Revising based on Sarah Jenkins advice to break down into 90-minute blocks.'
    },
    activityConfirmed: false,
    submission: {
      content: 'Initial goals submitted: 1. Study 4 hours daily. 2. Read 10 books. 3. Sleep 8 hours every night.',
      submittedAt: 'Oct 27, 2026 at 11:30 AM',
      submittedAtIso: '2026-10-27T11:30:00.000Z',
      activityConfirmed: true,
      version: 1
    },
    submissionHistory: [
      {
        version: 1,
        submittedAt: 'Oct 27, 2026 at 11:30 AM',
        content: 'Initial goals submitted: 1. Study 4 hours daily. 2. Read 10 books. 3. Sleep 8 hours every night.',
        answers: {
          q1: 'Academic Excellence & STEM Mastery',
          q2: 'Study 4 hours daily and read 10 books',
          q3: 'Initial goals submitted: 1. Study 4 hours daily. 2. Read 10 books. 3. Sleep 8 hours every night.'
        },
        statusAtTime: 'Submitted'
      }
    ],
    feedback: {
      author: 'Sarah Jenkins (Mentor)',
      role: 'Verified Leadership Mentor',
      date: 'Oct 28, 2026 at 2:15 PM',
      comment: 'Goals are a good starting point but need specific milestone metrics (SMART). Break down the study hours into subject-specific focus sprints and specify book titles.',
      revisionInstructions: '1. Break down the 4 hours into 90-minute subject focus sprints.\n2. List two specific books you plan to read for personal growth.\n3. Add milestone checkpoints for Week 2 and Week 4.'
    },
    mentorNote: 'Please revise and resubmit with actionable sub-milestones.',
  },
  {
    id: 'asg_6',
    studentId: 'student_1',
    title: 'Habit Stacking & Focus Rituals Architecture',
    subject: 'Personal Growth',
    activityType: 'Habit Architecture',
    assignedDate: 'Oct 24, 2026',
    dueDate: 'Oct 30, 2026',
    dueDateIso: '2026-10-30T17:00:00',
    duration: '25 mins',
    status: 'Under Review', // Supported status: 'Under Review'
    priority: 'Medium',
    description: 'Design daily micro-habits anchored to established routines using the habit stacking framework.',
    instructions: 'Anchor one study sprint and one wellness micro-habit to an existing morning and evening anchor.',
    activitySteps: [
      'Audit existing daily anchors (e.g. morning breakfast, evening dinner).',
      'Select two developmental micro-habits.',
      'Formulate "After [Anchor], I will [Micro-Habit]" statements.'
    ],
    supportsFileUpload: true,
    requiredQuestions: [
      { id: 'q1', title: 'Selected Morning Anchor Habit', type: 'short_text', required: true },
      { id: 'q2', title: 'Stacked Focus Micro-Habit', type: 'short_text', required: true },
      { id: 'q3', title: 'Implementation Reflection & Energy Impact', type: 'long_text', required: true, minWords: 10 }
    ],
    expectedSubmissionFormat: 'Habit Stacking Blueprint & Weekly Energy Review',
    draftAnswers: {},
    activityConfirmed: true,
    submission: {
      content: 'Morning Anchor: Making morning herbal tea.\nStacked Focus: 25-minute deep reading sprint with zero notification tabs.\nReflection: By attaching reading directly to morning tea, I completed 4 sessions effortlessly without friction.',
      answers: {
        q1: 'Morning herbal tea preparation',
        q2: '25-minute deep focus sprint before opening social apps',
        q3: 'By attaching reading directly to morning tea, I completed 4 sessions effortlessly without friction.'
      },
      submittedAt: 'Oct 30, 2026 at 10:45 AM',
      submittedAtIso: '2026-10-30T10:45:00.000Z',
      activityConfirmed: true,
      version: 1
    },
    reviewer: 'Sarah Jenkins (Mentor)',
    feedback: null, // Actively under review! Feedback not yet available
    mentorNote: 'Under review by Sarah Jenkins. Feedback pending completion of rubric evaluation.'
  },
  {
    id: 'asg_restricted',
    studentId: 'student_999',
    title: 'Confidential Peer Mediation & Ethics Review',
    subject: 'Ethics',
    status: 'Submitted',
    submission: {
      content: 'Confidential notes for peer mediation case study.',
      submittedAt: 'Oct 30, 2026 at 9:00 AM'
    }
  }
];

// Valid students in the sanctuary backend
const VALID_STUDENTS = new Set(['student_1']);

// Allowed file types and size limit (5MB)
const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'image/png',
  'image/jpeg'
]);
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

/**
 * Server Authentication Checker
 */
export function verifyServerAuth(req) {
  const studentId = req.headers['x-student-id'] || req.headers['authorization']?.replace('Bearer ', '');
  if (!studentId) {
    return {
      authenticated: false,
      status: 401,
      error: 'Unauthorized: Missing student authentication credentials (x-student-id header required)'
    };
  }
  if (!VALID_STUDENTS.has(studentId)) {
    return {
      authenticated: false,
      status: 401,
      error: 'Unauthorized: Unknown or invalid student identity'
    };
  }
  return { authenticated: true, studentId };
}

/**
 * Server-Side Validation & Submission Processing
 */
export function handleAssignmentSubmission(assignmentId, studentId, payload) {
  // 1. Locate assignment
  const assignment = serverAssignments.find((a) => a.id === assignmentId);
  if (!assignment) {
    return {
      status: 404,
      body: { success: false, error: `Assignment with ID "${assignmentId}" was not found.` }
    };
  }

  // 2. Server Authorization: Verify Assignment Ownership
  if (assignment.studentId && assignment.studentId !== studentId) {
    return {
      status: 403,
      body: {
        success: false,
        error: 'Forbidden: You do not own this assignment. Access restricted to authorized student.'
      }
    };
  }

  // 3. Duplicate Submission / Status Permission Check
  // Prevent duplicate submissions if already Submitted or Completed unless authorized with Needs Revision
  if (assignment.status === 'Submitted') {
    return {
      status: 409,
      body: {
        success: false,
        error: 'Conflict: This assignment is already submitted and currently under mentor review. Duplicate submission rejected.'
      }
    };
  }

  if (assignment.status === 'Under Review') {
    return {
      status: 409,
      body: {
        success: false,
        error: 'Conflict: This assignment is currently under active mentor review and cannot be modified or resubmitted until the review is returned.'
      }
    };
  }

  if (assignment.status === 'Completed') {
    return {
      status: 409,
      body: {
        success: false,
        error: 'Conflict: This assignment has been marked Completed and graded. Resubmission is not permitted.'
      }
    };
  }

  // Allowed statuses to submit: 'Pending', 'In Progress', 'Needs Revision'
  const isResubmission = assignment.status === 'Needs Revision';

  // 4. Validate Activity Completion Confirmation
  if (!payload.activityConfirmed) {
    return {
      status: 400,
      body: {
        success: false,
        error: 'Activity Confirmation Required: Please confirm that you have completed the required activity steps before submitting.'
      }
    };
  }

  // 5. Validate Required Questions & Configured Question Types
  const validationErrors = [];
  const answers = payload.answers || {};

  if (assignment.requiredQuestions && assignment.requiredQuestions.length > 0) {
    for (const q of assignment.requiredQuestions) {
      const val = answers[q.id];

      if (q.required) {
        if (val === undefined || val === null || (typeof val === 'string' && !val.trim())) {
          validationErrors.push(`Question "${q.title}" is required.`);
          continue;
        }
      }

      if (val !== undefined && val !== null && typeof val === 'string' && val.trim()) {
        // Validate single_choice option
        if (q.type === 'single_choice' && q.options && q.options.length > 0) {
          if (!q.options.includes(val)) {
            validationErrors.push(`Question "${q.title}" contains an invalid selection: "${val}".`);
          }
        }

        // Validate minimum word count for reflections
        if ((q.type === 'long_text' || q.type === 'reflection') && q.minWords) {
          const wordCount = val.trim().split(/\s+/).filter(Boolean).length;
          if (wordCount < q.minWords) {
            validationErrors.push(`Question "${q.title}" requires at least ${q.minWords} words (currently: ${wordCount} words).`);
          }
        }
      }
    }
  }

  // 6. Validate File Upload (if provided)
  if (payload.attachedFile) {
    const file = payload.attachedFile;
    if (!assignment.supportsFileUpload) {
      validationErrors.push('File uploads are not configured or permitted for this assignment.');
    } else {
      if (file.type && !ALLOWED_MIME_TYPES.has(file.type)) {
        return {
          status: 415,
          body: {
            success: false,
            error: `Unsupported File Type: "${file.type}". Allowed file types: PDF (.pdf), Word (.docx), PNG (.png), JPEG (.jpg).`
          }
        };
      }

      if (file.size && file.size > MAX_FILE_SIZE_BYTES) {
        return {
          status: 413,
          body: {
            success: false,
            error: `Payload Too Large: File size (${Math.round(file.size / 1024 / 1024 * 10) / 10} MB) exceeds maximum allowed limit of 5 MB.`
          }
        };
      }
    }
  }

  if (validationErrors.length > 0) {
    return {
      status: 400,
      body: {
        success: false,
        error: 'Validation failed on one or more required fields.',
        validationErrors
      }
    };
  }

  // 7. Format Server-Side Submission Record
  const now = new Date();
  const submittedAtFormatted = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(now);

  const formattedContent = (assignment.requiredQuestions || [])
    .map((q, idx) => `Q${idx + 1}. ${q.title}\nAnswer: ${answers[q.id] || '(No response)'}`)
    .join('\n\n');

  const previousVersion = assignment.submission?.version || 0;
  const newSubmission = {
    content: formattedContent,
    answers: { ...answers },
    activityConfirmed: true,
    attachedFile: payload.attachedFile ? {
      name: payload.attachedFile.name,
      size: payload.attachedFile.size,
      type: payload.attachedFile.type,
      uploadedAt: submittedAtFormatted
    } : null,
    submittedAt: submittedAtFormatted,
    submittedAtIso: now.toISOString(),
    studentId,
    version: previousVersion + 1,
    isResubmission
  };

  // Preserve previous submission history where supported
  if (isResubmission && assignment.submission) {
    if (!assignment.submissionHistory) {
      assignment.submissionHistory = [];
    }
    assignment.submissionHistory.push({
      ...assignment.submission,
      statusAtTime: 'Needs Revision',
      archivedAt: submittedAtFormatted
    });
  }

  // 8. Persist Consistently on Server
  assignment.status = 'Submitted';
  assignment.submission = newSubmission;
  assignment.draftAnswers = { ...answers };
  assignment.activityConfirmed = true;

  return {
    status: 200,
    body: {
      success: true,
      message: isResubmission
        ? 'Assignment revised and resubmitted successfully! Mentor review will update shortly.'
        : 'Assignment submitted successfully! Your submission has been securely recorded.',
      assignment,
      submission: newSubmission
    }
  };
}

/**
 * Server-Side Save Draft
 */
export function handleSaveDraft(assignmentId, studentId, payload) {
  const assignment = serverAssignments.find((a) => a.id === assignmentId);
  if (!assignment) {
    return {
      status: 404,
      body: { success: false, error: `Assignment with ID "${assignmentId}" not found.` }
    };
  }

  if (assignment.studentId && assignment.studentId !== studentId) {
    return {
      status: 403,
      body: { success: false, error: 'Forbidden: You do not own this assignment.' }
    };
  }

  // Validate file upload size if draft contains file
  if (payload.attachedFile && payload.attachedFile.size > MAX_FILE_SIZE_BYTES) {
    return {
      status: 413,
      body: { success: false, error: 'File size exceeds maximum allowed limit of 5 MB.' }
    };
  }

  assignment.draftAnswers = { ...(assignment.draftAnswers || {}), ...(payload.answers || {}) };
  if (payload.activityConfirmed !== undefined) {
    assignment.activityConfirmed = payload.activityConfirmed;
  }
  if (payload.attachedFile) {
    assignment.attachedFile = payload.attachedFile;
  }
  if (assignment.status === 'Pending') {
    assignment.status = 'In Progress';
  }

  const savedAt = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }).format(new Date());

  return {
    status: 200,
    body: {
      success: true,
      message: `Progress safely saved on server at ${savedAt}.`,
      savedAt,
      draftAnswers: assignment.draftAnswers,
      activityConfirmed: assignment.activityConfirmed,
      status: assignment.status
    }
  };
}

/**
 * Server-Side Reviewer Feedback Handler (For Mentor / Parent Dashboard Review)
 */
export function handleReviewFeedback(assignmentId, reviewerPayload) {
  const assignment = serverAssignments.find((a) => a.id === assignmentId);
  if (!assignment) {
    return {
      status: 404,
      body: { success: false, error: 'Assignment not found.' }
    };
  }

  const status = reviewerPayload.status;
  const author = reviewerPayload.author || reviewerPayload.reviewer || reviewerPayload.feedback?.author || 'Sarah Jenkins (Mentor)';
  const role = reviewerPayload.role || reviewerPayload.feedback?.role || 'Verified Leadership Mentor';
  const comment = reviewerPayload.comment || reviewerPayload.feedback?.comment;
  const revisionInstructions = reviewerPayload.revisionInstructions || reviewerPayload.feedback?.revisionInstructions;

  if (!['Submitted', 'Under Review', 'Completed', 'Needs Revision'].includes(status)) {
    return {
      status: 400,
      body: {
        success: false,
        error: `Invalid review status "${status}". Allowed: Submitted, Under Review, Completed, Needs Revision.`
      }
    };
  }

  const nowFormatted = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  assignment.status = status;

  if (status === 'Under Review') {
    assignment.reviewer = author;
    assignment.feedback = null; // Feedback is pending formulation, never invented
  } else if (status === 'Submitted') {
    assignment.feedback = null;
  } else if (status === 'Completed' || status === 'Needs Revision') {
    assignment.reviewer = author;
    assignment.feedback = {
      author,
      role,
      date: reviewerPayload.date || reviewerPayload.feedback?.date || nowFormatted,
      comment: comment || (status === 'Completed' ? 'Great work on completing this reflection!' : 'Please review instructions and update responses.'),
      revisionInstructions: status === 'Needs Revision' ? (revisionInstructions || 'Please revise your responses according to mentor feedback and resubmit.') : null
    };
  }

  return {
    status: 200,
    body: {
      success: true,
      message: `Assignment review status updated to "${status}".`,
      assignment
    }
  };
}

/**
 * Reset server assignments state (for testing)
 */
export function resetServerAssignments(customAssignments = null) {
  if (customAssignments) {
    serverAssignments = JSON.parse(JSON.stringify(customAssignments));
  } else {
    // Reset status of asg_1 to In Progress, asg_2 to Pending
    const asg1 = serverAssignments.find(a => a.id === 'asg_1');
    if (asg1) {
      asg1.status = 'In Progress';
      asg1.submission = null;
    }
    const asg6 = serverAssignments.find(a => a.id === 'asg_6');
    if (asg6) {
      asg6.status = 'Under Review';
      asg6.feedback = null;
    }
    const asg4 = serverAssignments.find(a => a.id === 'asg_4');
    if (asg4) {
      asg4.status = 'Submitted';
      asg4.feedback = null;
    }
  }
}

/**
 * Get current server assignments
 */
export function getServerAssignments() {
  return serverAssignments;
}

/**
 * Vite Dev Server Connect Middleware
 */
export function assignmentBackendMiddleware(req, res, next) {
  const url = req.url || '';
  if (!url.startsWith('/api/assignments')) {
    return next();
  }

  // Parse path: /api/assignments/:id/(submit|save-draft|review|upload)
  const pathParts = url.split('?')[0].split('/').filter(Boolean); // ['api', 'assignments', ':id', 'submit']
  const assignmentId = pathParts[2];
  const action = pathParts[3];

  res.setHeader('Content-Type', 'application/json');

  // Server Auth Verification
  const auth = verifyServerAuth(req);
  if (!auth.authenticated) {
    res.statusCode = auth.status;
    res.end(JSON.stringify({ success: false, error: auth.error }));
    return;
  }

  // Read Request Body
  let bodyData = '';
  req.on('data', chunk => { bodyData += chunk; });
  req.on('end', () => {
    let payload = {};
    if (bodyData) {
      try {
        payload = JSON.parse(bodyData);
      } catch (err) {
        res.statusCode = 400;
        res.end(JSON.stringify({ success: false, error: 'Malformed JSON payload in request body.' }));
        return;
      }
    }

    if (req.method === 'GET' && !assignmentId) {
      // List all assignments for authenticated student
      const userAssignments = serverAssignments.filter(a => !a.studentId || a.studentId === auth.studentId);
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, assignments: userAssignments }));
      return;
    }

    if (req.method === 'GET' && assignmentId && !action) {
      // Get single assignment
      const target = serverAssignments.find(a => a.id === assignmentId);
      if (!target) {
        res.statusCode = 404;
        res.end(JSON.stringify({ success: false, error: 'Assignment not found.' }));
        return;
      }
      if (target.studentId && target.studentId !== auth.studentId) {
        res.statusCode = 403;
        res.end(JSON.stringify({ success: false, error: 'Forbidden: Access denied to this assignment.' }));
        return;
      }
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, assignment: target }));
      return;
    }

    if (req.method === 'POST' && assignmentId && action === 'submit') {
      const result = handleAssignmentSubmission(assignmentId, auth.studentId, payload);
      res.statusCode = result.status;
      res.end(JSON.stringify(result.body));
      return;
    }

    if (req.method === 'POST' && assignmentId && action === 'save-draft') {
      const result = handleSaveDraft(assignmentId, auth.studentId, payload);
      res.statusCode = result.status;
      res.end(JSON.stringify(result.body));
      return;
    }

    if (req.method === 'POST' && assignmentId && action === 'review') {
      const result = handleReviewFeedback(assignmentId, payload);
      res.statusCode = result.status;
      res.end(JSON.stringify(result.body));
      return;
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ success: false, error: 'API endpoint not found.' }));
  });
}
