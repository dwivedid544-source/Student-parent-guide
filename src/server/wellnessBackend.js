// Server Backend for HighOrbit Student Focus & Wellness Module
// Provides configured activities for:
// 1. Focus Exercises
// 2. Guided Breathing
// 3. Relaxation Activities
// 4. Reflection Activities
// Plus Recent Session Tracking & History Persistence

const STORAGE_KEY = 'highorbit_student_wellness_sessions';
const DEFAULT_STUDENT_ID = 'student_1';

export const WELLNESS_ACTIVITIES = [
  // 1. Focus Exercises
  {
    id: 'foc_pomodoro',
    category: 'focus',
    title: '25-Minute Deep Focus Sprint',
    subtitle: 'Classic Pomodoro technique for uninterrupted study immersion',
    description: 'Set a clear academic objective, eliminate ambient distractions, and commit your full cognitive energy to a single task for 25 focused minutes followed by a short restorative break.',
    durationMinutes: 25,
    durationSeconds: 25 * 60,
    technique: 'Pomodoro Interval',
    instructions: [
      'Choose one specific task to tackle (e.g. solve 5 practice problems or draft an essay outline).',
      'Silence notifications, close unrelated tabs, and prepare your workspace.',
      'Press Start and maintain complete focus on your single target until the bell sounds.',
      'If an intrusive thought appears, quickly write it down on a scratchpad and return to your task.'
    ],
    tips: [
      'Single-tasking preserves working memory and reduces cognitive switching fatigue.',
      'Keep a water glass nearby to stay hydrated without leaving your study chair.'
    ],
    tags: ['Concentration', 'Time Boxing', 'Study Sprint']
  },
  {
    id: 'foc_single_task',
    category: 'focus',
    title: 'Single-Task Horizon (15 mins)',
    subtitle: 'High-leverage focus anchor for complex problem solving',
    description: 'A focused, distraction-free sprint designed to break the cycle of multi-tasking and establish deep momentum on challenging academic concepts.',
    durationMinutes: 15,
    durationSeconds: 15 * 60,
    technique: 'Horizon Chunking',
    instructions: [
      'Define the single hurdle that is currently holding up your progress.',
      'Commit to zero tab switches or device checks during this 15-minute window.',
      'Work through the problem methodically, explaining each step to yourself.'
    ],
    tips: [
      'Even 15 minutes of uninterrupted work can produce more clarity than an hour of split-attention study.'
    ],
    tags: ['Depth', 'Clarity', 'Anti-Distraction']
  },
  {
    id: 'foc_grounding',
    category: 'focus',
    title: '5-4-3-2-1 Attention Grounding (5 mins)',
    subtitle: 'Rapid sensory reset when your thoughts feel scattered or restless',
    description: 'Re-anchor your awareness in the present physical environment through a classic multi-sensory scan. Excellent before opening a challenging exam or writing assignment.',
    durationMinutes: 5,
    durationSeconds: 5 * 60,
    technique: 'Sensory Observation',
    instructions: [
      'Acknowledge 5 things you can see around your desk or room.',
      'Acknowledge 4 things you can physically feel (e.g. feet on floor, sweater on arms).',
      'Acknowledge 3 distinct sounds you can hear in your environment.',
      'Acknowledge 2 things you can smell or scents in the air.',
      'Acknowledge 1 positive intention for your upcoming study session.'
    ],
    tips: [
      'Taking your attention outward settles the internal mental chatter.'
    ],
    tags: ['Grounding', 'Quick Reset', 'Sensory']
  },

  // 2. Guided Breathing
  {
    id: 'br_box',
    category: 'breathing',
    title: 'Square Box Breathing (4-4-4-4)',
    subtitle: 'Equal-ratio pacing used to balance autonomic arousal and stabilize attention',
    description: 'A proven breathing pattern consisting of 4 seconds inhale, 4 seconds hold, 4 seconds exhale, and 4 seconds hold. Perfect for pre-test calmness and centered alertness.',
    durationMinutes: 4,
    durationSeconds: 4 * 60,
    technique: 'Box Pacing',
    breathingCycle: {
      inhale: 4,
      hold1: 4,
      exhale: 4,
      hold2: 4,
      labels: ['Inhale deeply', 'Hold steady', 'Exhale smoothly', 'Rest & hold']
    },
    instructions: [
      'Sit comfortably with your feet flat on the floor and shoulders relaxed.',
      'Inhale slowly through your nose for 4 seconds as the circle expands.',
      'Gently hold your breath with relaxed lungs for 4 seconds.',
      'Exhale completely through your mouth or nose for 4 seconds as the circle contracts.',
      'Pause and rest for 4 seconds before the next breath.'
    ],
    tips: [
      'Keep your abdomen soft; allow the breath to fill your lower ribs rather than raising your shoulders.'
    ],
    tags: ['Exam Calm', 'Box Breathing', 'Autonomic Balance']
  },
  {
    id: 'br_resonance',
    category: 'breathing',
    title: 'Coherent Resonance Breathing (5.5s)',
    subtitle: 'Optimal cadence to synchronize heart rate variability and mental calm',
    description: 'Breathing at approximately 5.5 to 6 breaths per minute maximizes respiratory sinus arrhythmia, signaling safety to the nervous system and supporting cognitive clarity.',
    durationMinutes: 5,
    durationSeconds: 5 * 60,
    technique: 'Resonance Cadence',
    breathingCycle: {
      inhale: 5.5,
      hold1: 0,
      exhale: 5.5,
      hold2: 0,
      labels: ['Inhale gently', '', 'Exhale gently', '']
    },
    instructions: [
      'Close your eyes or softly focus on the rhythmic pulse of the breathing guide.',
      'Inhale smooth, continuous air for 5.5 seconds.',
      'Transition immediately into an effortless 5.5-second exhale without holding.',
      'Let your heart rate sync naturally to the gentle wave of respiration.'
    ],
    tips: [
      'Do not strain to breathe deeply; focus on smooth, quiet, circular breath flow.'
    ],
    tags: ['HRV Coherence', 'Flow State', 'Centering']
  },
  {
    id: 'br_physio_sigh',
    category: 'breathing',
    title: 'Physiological Sigh (Double Inhale + Long Exhale)',
    subtitle: 'The fastest natural reset for acute stress and nervous tension',
    description: 'Two quick inhales through the nose followed by an extended, audible sigh through the mouth re-inflates collapsed alveoli in the lungs and rapidly drops elevated heart rate.',
    durationMinutes: 3,
    durationSeconds: 3 * 60,
    technique: 'Double Inhalation',
    breathingCycle: {
      inhale: 3,
      hold1: 1,
      exhale: 6,
      hold2: 1,
      labels: ['Inhale... and top off!', 'Hold brief', 'Long releasing exhale', 'Settle']
    },
    instructions: [
      'Take a deep inhale through your nose until your lungs are 80% full.',
      'Quickly sniff in a secondary sharp sip of air to completely fill the lungs.',
      'Release a slow, unhurried, long exhale through your mouth until empty.',
      'Repeat for 8 to 12 cycles until your shoulders noticeably drop.'
    ],
    tips: [
      'The prolonged exhale triggers the vagus nerve to slow heart pace.'
    ],
    tags: ['Rapid Reset', 'Sigh Pattern', 'De-Stress']
  },
  {
    id: 'br_relax_478',
    category: 'breathing',
    title: '4-7-8 Deep Evening Breathing',
    subtitle: 'Relaxation cadence for wind-down and after-school mental rest',
    description: 'Inhale for 4 counts, hold for 7 counts, and exhale with a whooshing sound for 8 counts. Excellent after demanding study sessions or when preparing for evening sleep.',
    durationMinutes: 4,
    durationSeconds: 4 * 60,
    technique: '4-7-8 Cadence',
    breathingCycle: {
      inhale: 4,
      hold1: 7,
      exhale: 8,
      hold2: 0,
      labels: ['Inhale (4s)', 'Hold gently (7s)', 'Exhale slowly (8s)', '']
    },
    instructions: [
      'Rest the tip of your tongue against the ridge behind your upper front teeth.',
      'Inhale quietly through your nose for a count of 4.',
      'Retain your breath without strain for a count of 7.',
      'Exhale audibly through parted lips for a full count of 8.'
    ],
    tips: [
      'The extended exhale is the active ingredient for evening down-regulation.'
    ],
    tags: ['Evening Rest', '4-7-8', 'Sleep Wind-Down']
  },

  // 3. Relaxation Activities
  {
    id: 'rel_pmr',
    category: 'relaxation',
    title: 'Progressive Muscle De-Tensioning',
    subtitle: 'Release unconscious physical tension stored during long study sessions',
    description: 'Systematically tense and release muscle groups from your toes to your forehead to restore physical comfort and release postural strain from desk work.',
    durationMinutes: 10,
    durationSeconds: 10 * 60,
    technique: 'Systematic Relaxation',
    instructions: [
      'Sit comfortably and begin by clenching your toes and feet for 5 seconds, then let go completely.',
      'Tense your thigh muscles and hips for 5 seconds, noticing the contrast as you release.',
      'Make tight fists and squeeze your forearms for 5 seconds, then unclench and shake them gently.',
      'Hunch your shoulders up toward your ears for 5 seconds, then drop them heavily into relaxation.',
      'Scrunch your facial muscles (jaw, brow, eyes) for 5 seconds, then let your entire face soften.'
    ],
    tips: [
      'Notice the warm, heavy sensation of relaxation as each muscle group lets go.'
    ],
    tags: ['Somatic', 'Desk Relief', 'Muscle Tension']
  },
  {
    id: 'rel_body_scan',
    category: 'relaxation',
    title: 'Somatic Body Scan for Mental Clarity',
    subtitle: 'Guided non-judgmental awareness of physical sensations',
    description: 'Scan your attention through different regions of your body to release mental chatter, soften physical stiffness, and bring calm presence to your study environment.',
    durationMinutes: 8,
    durationSeconds: 8 * 60,
    technique: 'Mindful Somatic Scan',
    instructions: [
      'Close your eyes and take three slow, comfortable breaths.',
      'Bring your attention to your feet and ankles; notice contact points and release any tightness.',
      'Shift attention upward along your spine, allowing your back to be tall yet easy and unforced.',
      'Check your jaw and tongue—often clenched during problem solving—and let them relax fully.',
      'Observe your entire body as one unified, resting presence before resuming study.'
    ],
    tips: [
      'If you notice discomfort, simply observe it with curiosity rather than trying to force it away.'
    ],
    tags: ['Body Scan', 'Posture Reset', 'Calm']
  },
  {
    id: 'rel_eye_palming',
    category: 'relaxation',
    title: 'Visual Rest & Gentle Eye Palming',
    subtitle: 'Relieve digital eye strain and optic nerve fatigue',
    description: 'Rub your palms together until warm and rest them gently over closed eyes to create soothing darkness and relax optical muscles strained by screen study.',
    durationMinutes: 4,
    durationSeconds: 4 * 60,
    technique: 'Bates Optic Rest',
    instructions: [
      'Rub your palms vigorously for 15 seconds until they feel pleasantly warm.',
      'Cup your hands softly over your closed eyes without pressing on your eyeballs.',
      'Rest your elbows comfortably on your desk to avoid neck strain.',
      'Breathe slowly into the deep, relaxing blackness for 3 to 4 minutes.',
      'Slowly open your eyes and blink gently to welcome soft ambient light.'
    ],
    tips: [
      'Practice the 20-20-20 rule during study: every 20 minutes, look at an object 20 feet away for 20 seconds.'
    ],
    tags: ['Eye Strain', 'Screen Fatigue', 'Optical Care']
  },

  // 4. Reflection Activities
  {
    id: 'ref_stress_audit',
    category: 'reflection',
    title: 'Stress Triggers & Reaction Audit',
    subtitle: 'Clarify what is within your control vs. what requires acceptance',
    description: 'Untangle academic anxiety by mapping out current stressors, separating controllable actions from uncontrollable outcomes, and writing a concrete next step.',
    durationMinutes: 7,
    durationSeconds: 7 * 60,
    technique: 'Cognitive Reframing',
    instructions: [
      'Write down the single academic or social situation currently creating the most pressure.',
      'Identify what part of this situation is 100% within your personal control (effort, preparation, boundaries).',
      'Identify what part is outside your control (other people\'s opinions, exact test questions, timing).',
      'Choose one proactive micro-step you will take today to address the controllable part.'
    ],
    tips: [
      'Anxiety shrinks when you channel energy exclusively into the next actionable step.'
    ],
    tags: ['Reframing', 'Self-Leadership', 'Clarity']
  },
  {
    id: 'ref_brain_dump',
    category: 'reflection',
    title: 'Brain Dump & Mental De-Clutter',
    subtitle: 'Offload racing thoughts and extract your top 3 essential priorities',
    description: 'Empty your working memory onto paper so your mind is not forced to hold dozens of unorganized to-dos and worries simultaneously.',
    durationMinutes: 6,
    durationSeconds: 6 * 60,
    technique: 'Externalized Working Memory',
    instructions: [
      'Set aside 3 minutes to write every single pending task, concern, or reminder without editing.',
      'Review your list and circle the top 3 items that truly matter for today.',
      'Star the easiest quick-win item to gain initial momentum.',
      'Archive or set aside the remainder for tomorrow with peace of mind.'
    ],
    tips: [
      'A cluttered mind is often just an unwritten list.'
    ],
    tags: ['Prioritization', 'Brain Dump', 'Order']
  },
  {
    id: 'ref_mindset_reset',
    category: 'reflection',
    title: 'End-of-Day Mindset & Gratitude Reset',
    subtitle: 'Acknowledge daily growth and conclude your learning day with closure',
    description: 'Reinforce positive neuroplasticity and emotional resilience by documenting one academic win, one learning moment, and one thing you appreciate about your day.',
    durationMinutes: 5,
    durationSeconds: 5 * 60,
    technique: 'Three Wins Reflection',
    instructions: [
      'Reflect on one academic effort you made today that you feel good about (even a small step).',
      'Identify one mistake or setback, and write down what useful insight it gave you.',
      'Note one person or resource that supported you today and acknowledge gratitude for them.',
      'Mentally close your books and allow yourself permission to rest fully for the evening.'
    ],
    tips: [
      'Ending study with clear closure prevents academic stress from bleeding into your sleep.'
    ],
    tags: ['Gratitude', 'Daily Closure', 'Growth Mindset']
  }
];

// Seed recent sessions for student_1
const INITIAL_SESSIONS = [
  {
    id: 'ses_seed_1',
    studentId: 'student_1',
    activityId: 'br_box',
    activityTitle: 'Square Box Breathing (4-4-4-4)',
    category: 'breathing',
    startedAt: 'Oct 30, 2026, 4:15 PM',
    completedAt: 'Oct 30, 2026, 4:19 PM',
    durationSeconds: 240,
    completed: true,
    reflectionNote: 'Calmed my pre-study jitters before starting the math homework assignment.',
    moodAfter: 'Calm & Centered',
    reducedMotionUsed: false
  },
  {
    id: 'ses_seed_2',
    studentId: 'student_1',
    activityId: 'foc_pomodoro',
    activityTitle: '25-Minute Deep Focus Sprint',
    category: 'focus',
    startedAt: 'Oct 29, 2026, 5:00 PM',
    completedAt: 'Oct 29, 2026, 5:25 PM',
    durationSeconds: 1500,
    completed: true,
    reflectionNote: 'Finished the first 4 problems in the physics worksheet with zero distractions.',
    moodAfter: 'Focused & Energized',
    reducedMotionUsed: false
  },
  {
    id: 'ses_seed_3',
    studentId: 'student_1',
    activityId: 'ref_mindset_reset',
    activityTitle: 'End-of-Day Mindset & Gratitude Reset',
    category: 'reflection',
    startedAt: 'Oct 28, 2026, 8:40 PM',
    completedAt: 'Oct 28, 2026, 8:45 PM',
    durationSeconds: 300,
    completed: true,
    reflectionNote: 'Felt proud of finishing the self-discovery assignment on time.',
    moodAfter: 'Peaceful & Grateful',
    reducedMotionUsed: true
  }
];

// In-memory fallback
let inMemorySessions = [...INITIAL_SESSIONS];

const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

function loadStoredSessions() {
  if (isBrowser) {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SESSIONS));
      return INITIAL_SESSIONS;
    } catch {
      return inMemorySessions;
    }
  }
  return inMemorySessions;
}

function saveStoredSessions(sessions) {
  inMemorySessions = sessions;
  if (isBrowser) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (err) {
      console.warn('Failed to persist wellness sessions to localStorage:', err);
    }
  }
}

/**
 * Fetch configured activities, optionally filtered by category
 * @param {'focus'|'breathing'|'relaxation'|'reflection'|'all'} category
 */
export function getWellnessActivities(category = 'all') {
  if (!category || category === 'all') {
    return WELLNESS_ACTIVITIES;
  }
  return WELLNESS_ACTIVITIES.filter((act) => act.category === category);
}

/**
 * Get an activity by ID
 */
export function getWellnessActivityById(id) {
  return WELLNESS_ACTIVITIES.find((act) => act.id === id) || null;
}

/**
 * Get session history for a student
 * Strictly scoped to prevent access to other students' records
 */
export function getWellnessSessionHistory(studentId = DEFAULT_STUDENT_ID) {
  const allSessions = loadStoredSessions();
  return allSessions.filter((s) => s.studentId === studentId);
}

/**
 * Record a new completed or logged wellness session
 */
export function recordWellnessSession({
  studentId = DEFAULT_STUDENT_ID,
  activityId,
  activityTitle,
  category,
  durationSeconds,
  completed = true,
  reflectionNote = '',
  moodAfter = 'Calm & Centered',
  reducedMotionUsed = false
}) {
  const allSessions = loadStoredSessions();
  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(now);

  const newSession = {
    id: `ses_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    studentId,
    activityId: activityId || 'custom_wellness',
    activityTitle: activityTitle || 'Focus & Wellness Practice',
    category: category || 'focus',
    startedAt: formattedDate,
    completedAt: formattedDate,
    completedAtIso: now.toISOString(),
    durationSeconds: Number(durationSeconds) || 0,
    completed: Boolean(completed),
    reflectionNote: (reflectionNote || '').trim(),
    moodAfter: moodAfter || 'Calm & Centered',
    reducedMotionUsed: Boolean(reducedMotionUsed)
  };

  const updated = [newSession, ...allSessions];
  saveStoredSessions(updated);
  return newSession;
}

/**
 * Delete a wellness session
 */
export function deleteWellnessSession(sessionId, studentId = DEFAULT_STUDENT_ID) {
  const allSessions = loadStoredSessions();
  const updated = allSessions.filter((s) => !(s.id === sessionId && s.studentId === studentId));
  saveStoredSessions(updated);
  return true;
}

/**
 * Clear session history for a student
 */
export function clearWellnessSessions(studentId = DEFAULT_STUDENT_ID) {
  const allSessions = loadStoredSessions();
  const updated = allSessions.filter((s) => s.studentId !== studentId);
  saveStoredSessions(updated);
  return true;
}

/**
 * Calculate weekly summary statistics for a student
 */
export function getWellnessWeeklySummary(studentId = DEFAULT_STUDENT_ID) {
  const sessions = getWellnessSessionHistory(studentId);
  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

  const recentSessions = sessions.filter((s) => {
    if (!s.completedAtIso) return true;
    return new Date(s.completedAtIso).getTime() >= sevenDaysAgo;
  });

  const totalMinutes = Math.round(
    recentSessions.reduce((acc, s) => acc + (s.durationSeconds || 0), 0) / 60
  );

  const byCategory = {
    focus: recentSessions.filter((s) => s.category === 'focus').length,
    breathing: recentSessions.filter((s) => s.category === 'breathing').length,
    relaxation: recentSessions.filter((s) => s.category === 'relaxation').length,
    reflection: recentSessions.filter((s) => s.category === 'reflection').length
  };

  return {
    completedThisWeek: recentSessions.length,
    totalMinutesThisWeek: totalMinutes,
    byCategory,
    recentSessions
  };
}
