import React, { createContext, useContext, useState, useEffect } from 'react';

const StudentContext = createContext();

const initialHabits = [
  {
    id: 'h1',
    title: 'Morning Intention & Mindset',
    category: 'Mindset',
    streak: 6,
    completed: true,
    timeOfDay: 'Morning',
  },
  {
    id: 'h2',
    title: '25-Minute Deep Focus Sprint',
    category: 'Academics',
    streak: 4,
    completed: true,
    timeOfDay: 'Afternoon',
  },
  {
    id: 'h3',
    title: 'Physical Movement or Stretch',
    category: 'Wellness',
    streak: 8,
    completed: false,
    timeOfDay: 'Afternoon',
  },
  {
    id: 'h4',
    title: 'Read 20 Pages (Personal Growth)',
    category: 'Knowledge',
    streak: 5,
    completed: false,
    timeOfDay: 'Evening',
  },
  {
    id: 'h5',
    title: 'Evening Gratitude & Reflection',
    category: 'Reflection',
    streak: 7,
    completed: false,
    timeOfDay: 'Night',
  },
];

const initialAssignments = [
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
    status: 'In Progress', // 'Pending' | 'In Progress' | 'Submitted' | 'Completed' | 'Needs Revision'
    priority: 'High',
    description: 'Document your top 3 foundational personal values and write a 2-paragraph reflection on how they guide your academic decisions.',
    instructions: 'Follow these core principles: Be authentic, write candid reflections from your real school experiences, and relate each value to a tangible choice you faced recently.',
    activitySteps: [
      'Reflect on three recent decisions where you felt true to yourself or conflicted.',
      'Select your top 3 foundational values from the HighOrbit Leadership Matrix.',
      'Draft a concrete real-world example for each value demonstrating how it shapes your study habits.',
      'Review your draft against your mentor guidance note before final submission.'
    ],
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
    submission: {
      content: '1. Intellectual Curiosity: Embracing challenging questions.\n2. Integrity: Acting authentically under pressure.\n3. Compassionate Empathy: Understanding diverse perspectives.',
      submittedAt: 'Draft saved today at 10:30 AM',
    },
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
        placeholder: 'Outline your 4-day audit findings and specify your committed 90-minute daily focus sprint...'
      }
    ],
    supportingDocuments: [
      { name: 'Deep_Work_Weekly_Audit_Template.xlsx', size: '420 KB', type: 'Excel Spreadsheet' },
      { name: 'Distraction_Elimination_Checklist.pdf', size: '610 KB', type: 'PDF Guide' }
    ],
    expectedSubmissionFormat: 'Completed 4-Day Energy Audit & Strategic Schedule Outline',
    draftAnswers: {},
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
    requiredQuestions: [
      {
        id: 'q1',
        title: 'Primary Physical Stress Signal',
        type: 'short_text',
        required: true
      },
      {
        id: 'q2',
        title: 'Grounding Technique Selected',
        type: 'single_choice',
        required: true,
        options: [
          '4-7-8 Relaxing Breath',
          'Box Breathing (4-4-4-4)',
          '5-4-3-2-1 Sensory Grounding',
          'Progressive Muscle Relaxation'
        ]
      },
      {
        id: 'q3',
        title: 'Grounding Plan Summary',
        type: 'long_text',
        required: true
      }
    ],
    supportingDocuments: [
      { name: 'Somatic_Stress_Grounding_Protocol.pdf', size: '920 KB', type: 'Wellness Manual' }
    ],
    expectedSubmissionFormat: 'Stress Triggers Assessment & Grounding Protocol',
    draftAnswers: {
      q1: 'Shallow breathing and neck tension',
      q2: '4-7-8 Relaxing Breath',
      q3: 'Adopted 4-7-8 breathing before math tests and organized tasks into 3 manageable focus blocks.'
    },
    submission: {
      content: 'Identified three primary triggers: exam timing, multi-tasking on social media, and poor hydration. Adopted the 4-7-8 mindful breathing technique during study breaks.',
      submittedAt: 'Oct 28, 2026 at 4:20 PM',
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
    requiredQuestions: [
      {
        id: 'q1',
        title: 'Selected Topic for Comparative Analysis',
        type: 'short_text',
        required: true
      },
      {
        id: 'q2',
        title: 'Identified Primary Bias Mechanism',
        type: 'single_choice',
        required: true,
        options: [
          'Sensationalist headline framing',
          'Selective omission of dissenting data',
          'Commercial sponsor conflict of interest',
          'False dichotomy narrative'
        ]
      },
      {
        id: 'q3',
        title: 'Comparative Synthesis Essay',
        type: 'long_text',
        required: true
      }
    ],
    supportingDocuments: [
      { name: 'Media_Literacy_Analysis_Framework.pdf', size: '1.1 MB', type: 'PDF Tool' }
    ],
    expectedSubmissionFormat: 'Comparative Case Analysis & Source Evaluation',
    draftAnswers: {
      q1: 'Commercial fusion energy experiment telemetry',
      q2: 'Sensationalist headline framing',
      q3: 'Analyzed two articles regarding space telescope telemetry. Article A focused on cost and delay, Article B focused on engineering milestones.'
    },
    submission: {
      content: 'Compared coverage of the latest clean-energy fusion test. Source A framed it around stock market impacts, whereas Source B analyzed thermodynamic efficiency. Concluded that commercial vs academic incentives skew narrative tone.',
      submittedAt: 'Oct 29, 2026 at 3:15 PM',
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
    dueDateIso: '2026-10-27T12:00:00', // Past date demonstrates overdue indicator without status mutation
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
    submission: {
      content: 'Initial goals submitted: 1. Study 4 hours daily. 2. Read 10 books. 3. Sleep 8 hours every night.',
      submittedAt: 'Oct 27, 2026 at 11:30 AM',
      submittedAtIso: '2026-10-27T11:30:00.000Z',
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
    feedback: null, // Feedback not yet available while actively Under Review!
    mentorNote: 'Under review by Sarah Jenkins. Feedback pending completion of rubric evaluation.'
  }
];

const initialReflections = [
  {
    id: 'ref_1',
    date: 'Today, 8:30 AM',
    mood: 'Calm & Focused',
    moodEmoji: '🌱',
    prompt: 'What is one priority that will make today feel meaningful?',
    entry: 'Focusing on completing the values analysis without multitasking, and taking a mindful 15-minute walk outside after my study sprint.',
  },
  {
    id: 'ref_2',
    date: 'Yesterday, 9:15 PM',
    mood: 'Grateful',
    moodEmoji: '✨',
    prompt: 'What was a moment of resilience you experienced today?',
    entry: 'When I felt overwhelmed by test preparation, I paused, used the box-breathing tool for 3 minutes, and organized my tasks into three small manageable chunks.',
  },
];

const initialNotifications = [
  {
    id: 'notif_1',
    title: 'Parent Bridge Note',
    message: 'Your parent reviewed your weekly goals reflection and left an encouraging note.',
    time: '2 hours ago',
    read: false,
    type: 'bridge',
  },
  {
    id: 'notif_2',
    title: 'Milestone Unlocked',
    message: 'Consistency Streak: You completed 5 consecutive days of morning journaling!',
    time: '1 day ago',
    read: false,
    type: 'achievement',
  },
  {
    id: 'notif_3',
    title: 'New Assignment Assigned',
    message: 'Self-Discovery: Core Values & Priorities Analysis has been scheduled for this week.',
    time: '2 days ago',
    read: true,
    type: 'assignment',
  },
];

export const StudentProvider = ({ children }) => {
  const [habits, setHabits] = useState(() => {
    try {
      const saved = localStorage.getItem('highorbit_student_habits');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return initialHabits;
  });

  const [assignments, setAssignments] = useState(() => {
    try {
      const saved = localStorage.getItem('highorbit_student_assignments');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 5) {
          return parsed;
        }
        // Merge existing progress with new schema fields and missing statuses
        const merged = initialAssignments.map((init) => {
          const found = parsed.find((p) => p.id === init.id);
          return found ? { ...init, status: found.status || init.status } : init;
        });
        return merged;
      }
    } catch (e) {
      console.warn(e);
    }
    return initialAssignments;
  });

  const [reflections, setReflections] = useState(() => {
    try {
      const saved = localStorage.getItem('highorbit_student_reflections');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return initialReflections;
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('highorbit_student_notifications');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return initialNotifications;
  });

  // LocalStorage persistence
  useEffect(() => {
    try {
      localStorage.setItem('highorbit_student_habits', JSON.stringify(habits));
    } catch (e) {}
  }, [habits]);

  useEffect(() => {
    try {
      localStorage.setItem('highorbit_student_assignments', JSON.stringify(assignments));
    } catch (e) {}
  }, [assignments]);

  useEffect(() => {
    try {
      localStorage.setItem('highorbit_student_reflections', JSON.stringify(reflections));
    } catch (e) {}
  }, [reflections]);

  useEffect(() => {
    try {
      localStorage.setItem('highorbit_student_notifications', JSON.stringify(notifications));
    } catch (e) {}
  }, [notifications]);

  // Actions
  const toggleHabit = (id) => {
    const target = habits.find((h) => h.id === id);
    if (target) {
      const nextCompleted = !target.completed;
      if (nextCompleted) {
        logEvent(
          'Habit Completed',
          `Completed daily habit: "${target.title}" (${target.category}).`,
          'Activity',
          '/child/activities'
        );
      }
    }
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const nextCompleted = !h.completed;
          return {
            ...h,
            completed: nextCompleted,
            streak: nextCompleted ? h.streak + 1 : Math.max(0, h.streak - 1),
          };
        }
        return h;
      })
    );
  };

  const addHabit = (title, category, timeOfDay = 'Morning') => {
    const newHabit = {
      id: `h_${Date.now()}`,
      title,
      category,
      streak: 0,
      completed: false,
      timeOfDay,
    };
    setHabits((prev) => [...prev, newHabit]);
    logEvent(
      'New Activity Added',
      `Added "${title}" under ${category}.`,
      'Activity',
      '/child/activities'
    );
  };

  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem('highorbit_student_events');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return [
      {
        id: 'evt_1',
        title: 'Assignment In Progress',
        detail: 'Self-Discovery: Core Values & Priorities Analysis is actively in progress.',
        category: 'Assignment',
        timestamp: 'Today, 10:15 AM',
        link: '/child/assignments',
      },
      {
        id: 'evt_2',
        title: 'Mentor Guidance Note Received',
        detail: 'Sarah Jenkins noted: "Take your time on decision making under pressure."',
        category: 'Feedback',
        timestamp: 'Today, 8:45 AM',
        link: '/child/assignments',
      },
      {
        id: 'evt_3',
        title: 'Daily Mindset Reflection Saved',
        detail: 'Recorded intention with Focused state: "Focusing on completing the values analysis without multitasking."',
        category: 'Reflection',
        timestamp: 'Today, 8:30 AM',
        link: '/child/self-assessment',
      },
      {
        id: 'evt_4',
        title: 'Habit Momentum Maintained',
        detail: 'Completed Morning Intention & Mindset (6-day active streak).',
        category: 'Activity',
        timestamp: 'Yesterday, 9:00 PM',
        link: '/child/activities',
      },
      {
        id: 'evt_5',
        title: 'Assignment Submitted & Completed',
        detail: 'Emotional Awareness & Stress Triggers Map submitted successfully.',
        category: 'Submission',
        timestamp: 'Oct 28, 4:20 PM',
        link: '/child/assignments',
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('highorbit_student_events', JSON.stringify(events));
    } catch (e) {}
  }, [events]);

  const logEvent = (title, detail, category, link = '/child/dashboard') => {
    const newEvent = {
      id: `evt_${Date.now()}`,
      title,
      detail,
      category,
      timestamp: 'Just now',
      link,
    };
    setEvents((prev) => [newEvent, ...prev.slice(0, 15)]);
  };

  const updateAssignmentStatus = (id, newStatus) => {
    const target = assignments.find((a) => a.id === id);
    if (target) {
      logEvent(
        `Task Status: ${newStatus}`,
        `"${target.title}" is now marked as ${newStatus}.`,
        'Assignment',
        '/child/assignments'
      );
    }
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  const saveAssignmentDraft = (id, draftData) => {
    const target = assignments.find((a) => a.id === id);
    if (target) {
      logEvent(
        'Draft Progress Saved',
        `Draft answers saved for "${target.title}".`,
        'Assignment',
        `/child/assignments/${id}`
      );
    }

    const answers = draftData?.answers || (typeof draftData === 'object' && !draftData.answers ? draftData : {});
    const activityConfirmed = draftData?.activityConfirmed !== undefined ? draftData.activityConfirmed : target?.activityConfirmed;
    const attachedFile = draftData?.attachedFile !== undefined ? draftData.attachedFile : target?.attachedFile;

    setAssignments((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: a.status === 'Pending' ? 'In Progress' : a.status,
              draftAnswers: { ...(a.draftAnswers || {}), ...answers },
              activityConfirmed: activityConfirmed !== undefined ? activityConfirmed : a.activityConfirmed,
              attachedFile: attachedFile !== undefined ? attachedFile : a.attachedFile
            }
          : a
      )
    );
  };

  const submitAssignment = (id, submissionPayload) => {
    const target = assignments.find((a) => a.id === id);
    const nowStr = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date());

    if (target) {
      logEvent(
        'Assignment Submitted',
        `"${target.title}" submitted successfully for mentor review.`,
        'Submission',
        `/child/assignments/${id}`
      );
    }

    const answers = submissionPayload?.answers || (typeof submissionPayload === 'object' && !submissionPayload.answers ? submissionPayload : {});
    const contentText = submissionPayload?.content || (typeof submissionPayload === 'string'
      ? submissionPayload
      : Object.entries(answers).map(([k, v]) => `${k}: ${v}`).join('\n\n'));

    const attachedFile = submissionPayload?.attachedFile || target?.attachedFile || null;
    const previousVersion = target?.submission?.version || 0;

    const newSubmissionRecord = {
      content: contentText,
      answers: typeof answers === 'object' ? answers : {},
      activityConfirmed: true,
      attachedFile,
      submittedAt: submissionPayload?.submittedAt || nowStr,
      submittedAtIso: submissionPayload?.submittedAtIso || new Date().toISOString(),
      version: previousVersion + 1,
      isResubmission: target?.status === 'Needs Revision'
    };

    setAssignments((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: 'Submitted',
              activityConfirmed: true,
              attachedFile,
              draftAnswers: typeof answers === 'object' ? answers : a.draftAnswers,
              submission: newSubmissionRecord,
            }
          : a
      )
    );
  };

  const addReflection = ({ mood, moodEmoji, prompt, entry }) => {
    const newEntry = {
      id: `ref_${Date.now()}`,
      date: 'Just now',
      mood,
      moodEmoji: moodEmoji || '🌱',
      prompt,
      entry,
    };
    setReflections((prev) => [newEntry, ...prev]);
    logEvent(
      'New Reflection Recorded',
      `State: ${mood} • "${entry.slice(0, 60)}..."`,
      'Reflection',
      '/child/self-assessment'
    );
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const updateReviewFeedback = (id, reviewPayload) => {
    const { status, author, role, comment, revisionInstructions } = reviewPayload;
    const nowStr = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date());

    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          return {
            ...a,
            status,
            reviewer: author || a.reviewer,
            feedback: (status === 'Completed' || status === 'Needs Revision') ? {
              author: author || 'Sarah Jenkins (Mentor)',
              role: role || 'Verified Leadership Mentor',
              date: nowStr,
              comment: comment || (status === 'Completed' ? 'Great work on completing this reflection!' : 'Please review instructions and update responses.'),
              revisionInstructions: status === 'Needs Revision' ? (revisionInstructions || 'Please revise your responses according to mentor feedback and resubmit.') : null
            } : null
          };
        }
        return a;
      })
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <StudentContext.Provider
      value={{
        habits,
        toggleHabit,
        addHabit,
        assignments,
        updateAssignmentStatus,
        submitAssignment,
        saveAssignmentDraft,
        updateReviewFeedback,
        reflections,
        addReflection,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification,
        clearAllNotifications,
        unreadCount,
        events,
        logEvent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};

export default StudentContext;
