// Server Backend for LifeVerse AI / HighOrbit Student My Activities Exploration
// Implements activities catalog, progress saving, completion rules, and permission gates

const DEFAULT_STUDENT_ID = 'student_1';

export let serverActivities = [
  {
    id: 'act_values_compass',
    title: 'Core Values Compass & Moral Anchor Formulation',
    shortDescription: 'Discover and rank your top foundational values and formulate an actionable decision matrix for high-pressure choices.',
    description: 'A structured philosophical exercise to transition abstract virtues into concrete behavioral rules. When faced with peer dilemmas or academic tradeoffs, your Values Compass provides clarity and calm confidence.',
    category: 'Self-Discovery',
    duration: '20 mins',
    difficulty: 'Beginner',
    status: 'Completed', // 'Not Started' | 'In Progress' | 'Completed'
    studentId: 'student_1',
    steps: [
      'Audit the universal virtues catalog and select 10 resonant principles.',
      'Apply paired-comparison triage to isolate your top 5 non-negotiable values.',
      'Formulate a 1-sentence decision commitment rule for each value.'
    ],
    completedSteps: [0, 1, 2],
    questions: [
      {
        id: 'q1',
        title: 'Your #1 Core North Star Value',
        type: 'short_text',
        required: true,
        placeholder: 'e.g., Uncompromising Integrity, Empathy, Intellectual Curiosity'
      },
      {
        id: 'q2',
        title: 'Actionable Moral Decision Rule',
        type: 'long_text',
        required: true,
        placeholder: 'When faced with [Dilemma], I choose [Action] because it honors my principle of [Value]...'
      }
    ],
    answers: {
      q1: 'Uncompromising Integrity',
      q2: 'When faced with pressure to take academic shortcuts, I choose patient diligence because truthfulness is essential to genuine mastery.'
    },
    completedAt: 'Oct 24, 2026 at 4:30 PM',
    completedAtIso: '2026-10-24T16:30:00.000Z',
    xp: 150
  },
  {
    id: 'act_habit_stacking',
    title: 'Micro-Habit Stacking & Trigger Architecture',
    shortDescription: 'Anchor new 2-minute growth habits onto existing daily rituals to build sustained momentum without decision fatigue.',
    description: 'Using James Clear\'s habit stacking formula, attach cognitive and wellness micro-practices directly to inevitable daily anchors like morning tea or ending schoolwork.',
    category: 'Personal Growth',
    duration: '15 mins',
    difficulty: 'Beginner',
    status: 'In Progress',
    studentId: 'student_1',
    steps: [
      'Catalog 3 non-negotiable daily anchors (e.g. pouring morning water, closing laptop after study).',
      'Select two 2-minute growth micro-habits that require minimal friction.',
      'Write your "After [Anchor], I Will [Action]" commitment equations.'
    ],
    completedSteps: [0, 1],
    questions: [
      {
        id: 'q1',
        title: 'Selected Daily Anchor Ritual',
        type: 'short_text',
        required: true,
        placeholder: 'e.g., Pouring morning glass of water'
      },
      {
        id: 'q2',
        title: 'Habit Stacking Equation',
        type: 'long_text',
        required: true,
        placeholder: 'After I pour my morning water, I will immediately open my daily intention notebook...'
      }
    ],
    answers: {
      q1: 'Finishing dinner and clearing the table',
      q2: 'After I clear the table, I will immediately place my phone on the charging dock and read 10 pages.'
    },
    savedAt: 'Oct 29, 2026 at 8:15 PM',
    xp: 120
  },
  {
    id: 'act_evening_audit',
    title: 'Daily Stoic Evening Reflection & Wins Audit',
    shortDescription: 'Conduct a 3-question evening audit: What was done well? Where did I falter? How will I improve tomorrow?',
    description: 'Inspired by the Meditations of Marcus Aurelius, review your daily choices with compassionate honesty. Recognize small wins, release frustration, and calibrate tomorrow\'s intention.',
    category: 'Reflection',
    duration: '10 mins',
    difficulty: 'Beginner',
    status: 'Not Started',
    studentId: 'student_1',
    steps: [
      'Sit in a quiet space with notifications paused.',
      'Record 3 distinct moments of intentional choice from today.',
      'Reframe one frustration into a growth takeaway for tomorrow.'
    ],
    completedSteps: [],
    questions: [
      {
        id: 'q1',
        title: 'Three Intentional Choices / Wins Today',
        type: 'long_text',
        required: true,
        placeholder: '1. Kept focus during physics. 2. Listened patiently to my friend. 3. Finished homework early.'
      },
      {
        id: 'q2',
        title: 'Tomorrow\'s Single Behavioral Commitment',
        type: 'short_text',
        required: true,
        placeholder: 'e.g., Speak up with my hypothesis in seminar'
      }
    ],
    answers: {},
    xp: 100
  },
  {
    id: 'act_pomodoro_deep_work',
    title: '90-Minute Monotasking Deep Work Sprint',
    shortDescription: 'Eliminate digital multitasking and execute a focused, distraction-free study sprint with structured recovery intervals.',
    description: 'Cognitive research proves multitasking reduces problem-solving capacity by up to 40%. Practice deep monotasking by isolating a single complex challenge for 25 uninterrupted minutes.',
    category: 'Focus',
    duration: '30 mins',
    difficulty: 'Intermediate',
    status: 'In Progress',
    studentId: 'student_1',
    steps: [
      'Close all unrelated tabs, social media, and background music.',
      'Articulate a single tangible deliverable before starting the timer.',
      'Work with 100% presence for 25 minutes, followed by 5 minutes of eye rest.'
    ],
    completedSteps: [0],
    questions: [
      {
        id: 'q1',
        title: 'Single Target Deliverable for Sprint',
        type: 'short_text',
        required: true,
        placeholder: 'e.g., Solve 8 calculus optimization problem sets'
      },
      {
        id: 'q2',
        title: 'Distraction Friction Audit',
        type: 'long_text',
        required: true,
        placeholder: 'What urges to check notifications occurred, and how did you refocus?'
      }
    ],
    answers: {
      q1: 'Draft the introductory hypothesis for biology lab'
    },
    savedAt: 'Oct 30, 2026 at 2:40 PM',
    xp: 180
  },
  {
    id: 'act_box_breathing',
    title: '4-7-8 Autonomic Vagus Nerve Reset',
    shortDescription: 'Downregulate acute physical anxiety and mental overwhelm through paced parasympathetic respiration cycles.',
    description: 'Dr. Andrew Weil\'s 4-7-8 breathing practice acts as a natural tranquilizer for the nervous system, reducing resting heart rate and restoring emotional composure within minutes.',
    category: 'Wellness',
    duration: '10 mins',
    difficulty: 'Beginner',
    status: 'Completed',
    studentId: 'student_1',
    steps: [
      'Sit comfortably upright with your tongue placed behind your upper front teeth.',
      'Inhale quietly through your nose for 4 counts.',
      'Hold breath gently for 7 counts.',
      'Exhale completely through your mouth with a soft whoosh for 8 counts. Repeat 6 cycles.'
    ],
    completedSteps: [0, 1, 2, 3],
    questions: [
      {
        id: 'q1',
        title: 'Physiological State Before Breathing',
        type: 'single_choice',
        required: true,
        options: ['High Anxiety / Racing Pulse', 'Moderate Tension / Restless Mind', 'Mild Fatigue', 'Calm']
      },
      {
        id: 'q2',
        title: 'Post-Exercise Sensory Observations',
        type: 'long_text',
        required: true,
        placeholder: 'Describe shifts in shoulder tension, jaw relaxation, or mental clarity...'
      }
    ],
    answers: {
      q1: 'Moderate Tension / Restless Mind',
      q2: 'Noticeable drop in heart rate by the fourth cycle. My chest felt open and mental racing stopped.'
    },
    completedAt: 'Oct 28, 2026 at 5:10 PM',
    completedAtIso: '2026-10-28T17:10:00.000Z',
    xp: 110
  },
  {
    id: 'act_feynman_technique',
    title: 'The Feynman Technique: Concept Simplification',
    shortDescription: 'Master any challenging academic or philosophical principle by explaining it in plain, jargon-free language to a child.',
    description: 'Nobel physicist Richard Feynman observed that true understanding requires the ability to explain complex ideas without hiding behind textbook jargon. Identify your blind spots and teach with absolute clarity.',
    category: 'Learning',
    duration: '25 mins',
    difficulty: 'Intermediate',
    status: 'Not Started',
    studentId: 'student_1',
    steps: [
      'Select a challenging topic you recently studied in science or history.',
      'Write an explanation on a blank sheet as if speaking to a 10-year-old.',
      'Highlight whenever you rely on technical buzzwords and replace them with real-world analogies.'
    ],
    completedSteps: [],
    questions: [
      {
        id: 'q1',
        title: 'Concept Selected for Simplification',
        type: 'short_text',
        required: true,
        placeholder: 'e.g., Photosynthesis, Opportunity Cost, Neural Synapses'
      },
      {
        id: 'q2',
        title: 'Jargon-Free Elementary Explanation & Analogy',
        type: 'long_text',
        required: true,
        placeholder: 'Explain the concept using a familiar metaphor like cooking, sports, or building blocks...'
      }
    ],
    answers: {},
    xp: 200
  },
  {
    id: 'act_restricted_mastery',
    title: 'Senior Leadership Ethics & Crisis Simulation',
    shortDescription: 'Advanced ethical dilemma simulation requiring multi-stakeholder negotiation. Restricted to Senior Honors tier.',
    description: 'A university-level leadership crisis room simulation reserved for Grade 12 Senior Fellows who have unlocked prerequisite achievements.',
    category: 'Personal Growth',
    duration: '45 mins',
    difficulty: 'Advanced',
    status: 'Not Started',
    studentId: 'student_1',
    restricted: true,
    requiredTier: 'Grade 12 Senior Fellow',
    steps: [
      'Complete Phase 1 values prerequisites.',
      'Review stakeholder briefing packet.',
      'Participate in simulated crisis governance board.'
    ],
    completedSteps: [],
    questions: [],
    answers: {},
    xp: 350
  }
];

/**
 * Server Authentication Helper
 */
function verifyServerAuth(req) {
  const studentHeader = req.headers['x-student-id'] || req.headers['authorization'];
  if (!studentHeader) {
    return { authenticated: false, status: 401, error: 'Unauthorized: Student ID header missing.' };
  }
  return { authenticated: true, studentId: studentHeader.replace('Bearer ', '') };
}

/**
 * Get all activities for student
 */
export function handleGetActivities(studentId) {
  // Return all activities configured for this student
  const activities = serverActivities.filter(a => !a.studentId || a.studentId === studentId);

  // Derive categories that actually have configured activities
  const activeCategories = Array.from(new Set(activities.map(a => a.category).filter(Boolean)));

  return {
    status: 200,
    body: {
      success: true,
      activities,
      activeCategories,
      totalCount: activities.length,
      completedCount: activities.filter(a => a.status === 'Completed').length,
      inProgressCount: activities.filter(a => a.status === 'In Progress').length
    }
  };
}

/**
 * Get single activity by ID with permission enforcement
 */
export function handleGetActivityById(activityId, studentId) {
  const activity = serverActivities.find(a => a.id === activityId);
  if (!activity) {
    return {
      status: 404,
      body: { success: false, error: `Activity with ID "${activityId}" not found.` }
    };
  }

  // Permission / Restriction Check
  if (activity.restricted) {
    return {
      status: 403,
      body: {
        success: false,
        error: `Access Restricted: This activity requires "${activity.requiredTier || 'Advanced Prerequisite'}". Complete prerequisite foundation activities to unlock.`,
        restricted: true,
        requiredTier: activity.requiredTier
      }
    };
  }

  return {
    status: 200,
    body: { success: true, activity }
  };
}

/**
 * Save draft progress for an activity
 */
export function handleSaveActivityProgress(activityId, studentId, payload) {
  const activity = serverActivities.find(a => a.id === activityId);
  if (!activity) {
    return {
      status: 404,
      body: { success: false, error: 'Activity not found.' }
    };
  }

  if (activity.restricted) {
    return {
      status: 403,
      body: { success: false, error: 'Access Denied: Activity is restricted.' }
    };
  }

  // Update answers and completed steps
  activity.answers = { ...(activity.answers || {}), ...(payload.answers || {}) };
  if (Array.isArray(payload.completedSteps)) {
    activity.completedSteps = payload.completedSteps;
  }

  // If Not Started, update status to In Progress
  if (activity.status === 'Not Started') {
    activity.status = 'In Progress';
  }

  const savedAt = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(new Date());

  activity.savedAt = savedAt;

  return {
    status: 200,
    body: {
      success: true,
      message: `Progress saved successfully at ${savedAt}.`,
      activity
    }
  };
}

/**
 * Complete activity according to defined rules
 */
export function handleCompleteActivity(activityId, studentId, payload) {
  const activity = serverActivities.find(a => a.id === activityId);
  if (!activity) {
    return {
      status: 404,
      body: { success: false, error: 'Activity not found.' }
    };
  }

  if (activity.restricted) {
    return {
      status: 403,
      body: { success: false, error: 'Access Denied: Activity is restricted.' }
    };
  }

  // Merge latest answers and steps
  const answers = { ...(activity.answers || {}), ...(payload.answers || {}) };
  const completedSteps = Array.isArray(payload.completedSteps) ? payload.completedSteps : (activity.completedSteps || []);

  // Validation Rule: Must have completed at least one step or answered required questions
  const requiredQuestions = (activity.questions || []).filter(q => q.required);
  for (const q of requiredQuestions) {
    const ans = answers[q.id];
    if (!ans || !ans.toString().trim()) {
      return {
        status: 422,
        body: {
          success: false,
          error: `Completion Rule Required: Please complete required prompt "${q.title}" before finalizing activity.`,
          unansweredQuestionId: q.id
        }
      };
    }
  }

  // Mark Completed
  activity.status = 'Completed';
  activity.answers = answers;
  activity.completedSteps = completedSteps;

  const nowFormatted = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(new Date());

  activity.completedAt = nowFormatted;
  activity.completedAtIso = new Date().toISOString();

  return {
    status: 200,
    body: {
      success: true,
      message: `Congratulations! Activity "${activity.title}" recorded as completed. +${activity.xp} Growth Points awarded!`,
      activity
    }
  };
}

/**
 * Reset server activities (for automated testing)
 */
export function resetServerActivities() {
  serverActivities.forEach(act => {
    if (act.id === 'act_evening_audit') {
      act.status = 'Not Started';
      act.answers = {};
      act.completedSteps = [];
    }
    if (act.id === 'act_habit_stacking') {
      act.status = 'In Progress';
      act.completedSteps = [0, 1];
    }
  });
}

/**
 * Connect Middleware for Vite Dev Server
 */
export function activityBackendMiddleware(req, res, next) {
  const url = req.url || '';
  if (!url.startsWith('/api/activities')) {
    return next();
  }

  const pathParts = url.split('?')[0].split('/').filter(Boolean); // ['api', 'activities', ':id', 'save-progress']
  const activityId = pathParts[2];
  const action = pathParts[3];

  res.setHeader('Content-Type', 'application/json');

  const auth = verifyServerAuth(req);
  if (!auth.authenticated) {
    res.statusCode = auth.status;
    res.end(JSON.stringify({ success: false, error: auth.error }));
    return;
  }

  let bodyData = '';
  req.on('data', chunk => { bodyData += chunk; });
  req.on('end', () => {
    let payload = {};
    if (bodyData) {
      try {
        payload = JSON.parse(bodyData);
      } catch (err) {
        res.statusCode = 400;
        res.end(JSON.stringify({ success: false, error: 'Malformed JSON payload.' }));
        return;
      }
    }

    if (req.method === 'GET' && !activityId) {
      const result = handleGetActivities(auth.studentId);
      res.statusCode = result.status;
      res.end(JSON.stringify(result.body));
      return;
    }

    if (req.method === 'GET' && activityId && !action) {
      const result = handleGetActivityById(activityId, auth.studentId);
      res.statusCode = result.status;
      res.end(JSON.stringify(result.body));
      return;
    }

    if (req.method === 'POST' && activityId && action === 'save-progress') {
      const result = handleSaveActivityProgress(activityId, auth.studentId, payload);
      res.statusCode = result.status;
      res.end(JSON.stringify(result.body));
      return;
    }

    if (req.method === 'POST' && activityId && action === 'complete') {
      const result = handleCompleteActivity(activityId, auth.studentId, payload);
      res.statusCode = result.status;
      res.end(JSON.stringify(result.body));
      return;
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ success: false, error: `Route ${req.method} ${url} not found.` }));
  });
}
