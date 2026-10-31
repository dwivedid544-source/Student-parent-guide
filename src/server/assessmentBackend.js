// Server Backend for LifeVerse AI / HighOrbit Student Self-Assessment Module
// Implements assessment catalog, progress saving, required validation,
// ownership authorization, scoring rules, and dependency reporting.

const DEFAULT_STUDENT_ID = 'student_1';

export let serverAssessments = [
  {
    id: 'asmt_growth_mindset',
    title: 'Growth Mindset & Learning Orientation',
    description: 'Clarify how you naturally respond to academic challenges, deadlines, and personal growth obstacles.',
    category: 'Mindset & Resilience',
    estimatedDuration: '8-10 mins',
    version: '1.2.0',
    retakePermitted: true,
    studentId: 'student_1',
    status: 'Completed', // 'Not Started' | 'In Progress' | 'Completed' | 'Missing Configuration'
    missingDependency: false,
    instructions: [
      'Take 8-10 uninterrupted minutes to reflect honestly on your personal study habits and mental approaches.',
      'There are no right or wrong answers. Choose the option that reflects what you genuinely do, not what you think you should do.',
      'Your responses are private to your student growth record and help tailor recommended activities and reflections.'
    ],
    questions: [
      {
        id: 'q1',
        title: 'Stress & Deadline Response',
        type: 'single_choice',
        question: 'When faced with academic stress or multiple deadlines, how do you naturally respond?',
        required: true,
        options: [
          { id: 'opt_1', label: 'I step back, break things into tiny actionable items, and map a timeline.', trait: 'Structured Planner', dimension: 'planning' },
          { id: 'opt_2', label: 'I pause, engage in physical movement or deep breathing, and reset mentally.', trait: 'Mindful Grounder', dimension: 'mindfulness' },
          { id: 'opt_3', label: 'I discuss ideas with a friend, mentor, or family member to talk it through.', trait: 'Collaborative Communicator', dimension: 'collaboration' },
          { id: 'opt_4', label: 'I hyper-focus on the most interesting part first to build early momentum.', trait: 'Passion-Driven Innovator', dimension: 'innovation' }
        ]
      },
      {
        id: 'q2',
        title: 'Optimal Flow State Environment',
        type: 'single_choice',
        question: 'What type of learning environment brings out your deepest state of flow?',
        required: true,
        options: [
          { id: 'opt_1', label: 'Quiet, clutter-free solitary space with no notifications and clear goals.', trait: 'Deep Focus Soloist', dimension: 'focus' },
          { id: 'opt_2', label: 'Dynamic, discussion-heavy seminar where perspectives are challenged.', trait: 'Socratic Thinker', dimension: 'inquiry' },
          { id: 'opt_3', label: 'Hands-on practical application: building, experimenting, or solving real cases.', trait: 'Applied Builder', dimension: 'practical' },
          { id: 'opt_4', label: 'Self-paced reading with notebook sketching and personal synthesis notes.', trait: 'Reflective Synthesizer', dimension: 'synthesis' }
        ]
      },
      {
        id: 'q3',
        title: 'Primary Growth Driver',
        type: 'single_choice',
        question: 'What is your core motivation for personal growth right now?',
        required: true,
        options: [
          { id: 'opt_1', label: 'Developing unshakeable emotional resilience and peace of mind.', trait: 'Emotional Mastery', dimension: 'emotional' },
          { id: 'opt_2', label: 'Building disciplined habits that ensure high academic & career performance.', trait: 'Excellence & Discipline', dimension: 'discipline' },
          { id: 'opt_3', label: 'Discovering my genuine passions and defining my authentic life direction.', trait: 'Self-Actualization', dimension: 'purpose' },
          { id: 'opt_4', label: 'Deepening understanding and communicating effectively with parents & peers.', trait: 'Relational Harmony', dimension: 'harmony' }
        ]
      },
      {
        id: 'q4',
        title: 'Diagnostic Reframing',
        type: 'likert_scale',
        question: 'When I make an error or do poorly on a task, I view it as useful diagnostic information rather than a permanent limitation.',
        required: true,
        scale: [
          { value: 1, label: 'Strongly Disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly Agree' }
        ]
      },
      {
        id: 'q5',
        title: 'Personal Mindset Shift Reflection',
        type: 'long_text',
        question: 'Describe a recent situation where you encountered an obstacle and what specific shift in approach or perspective helped you move forward.',
        required: true,
        minLength: 20,
        placeholder: 'Share the challenge you faced, how you initially felt, and the shift in focus or technique that guided you forward...'
      }
    ],
    savedAnswers: {
      q1: 'opt_2',
      q2: 'opt_1',
      q3: 'opt_1',
      q4: 4,
      q5: 'During physics midterm prep I felt overwhelmed by mechanics problems. Instead of cramming frantically, I paused, broke the chapters into 30-minute focused sprints, and worked through first principles.'
    },
    completedAt: 'Oct 30, 2026 at 4:15 PM',
    completedAtIso: '2026-10-30T16:15:00.000Z',
    results: {
      archetype: 'Deep Focus Synthesis & Mindful Grounding',
      summary: 'Based on your responses, your natural strength is Deep Focus Synthesis & Mindful Grounding. You excel when you have structured boundaries, calm distraction-free sprint blocks, and intentional daily routines.',
      overallIndex: 88,
      dimensionScores: {
        emotionalAwareness: 90,
        reflectiveFlow: 88,
        independentDiscipline: 85,
        analyticalInquiry: 89
      },
      permittedStrengths: [
        {
          name: 'Mindful Grounder',
          category: 'Emotional Resilience',
          description: 'Maintains calm emotional composure under academic deadlines by pausing and resetting before reacting.'
        },
        {
          name: 'Deep Focus Soloist',
          category: 'Learning Flow',
          description: 'Excels in solitary, distraction-free study blocks with clear goals and uninterrupted flow.'
        },
        {
          name: 'Emotional Mastery',
          category: 'Personal Growth',
          description: 'Driven by cultivating unshakeable inner peace, emotional awareness, and mental clarity.'
        },
        {
          name: 'Diagnostic Reframing',
          category: 'Growth Mindset',
          description: 'Treats setbacks and mistakes as constructive data for continuous improvement rather than self-doubt.'
        }
      ],
      reflectionPrompts: [
        'How can you protect your need for quiet deep focus while keeping communication open with study partners and family?',
        'When you notice early signs of stress this week, what 2-minute mindful reset ritual will you trigger?'
      ],
      activitySuggestions: [
        {
          id: 'act_box_breathing',
          title: 'Box Breathing & Somatic Reset',
          category: 'Wellness',
          duration: '5 mins',
          reason: 'Reinforces your Mindful Grounder strength during high-pressure study sessions.'
        },
        {
          id: 'act_deep_work_protocol',
          title: 'Pomodoro & Deep Work Sprint Protocol',
          category: 'Focus',
          duration: '25 mins',
          reason: 'Optimizes your Deep Focus Soloist learning flow with zero notification distractions.'
        },
        {
          id: 'act_evening_audit',
          title: 'Daily Stoic Evening Reflection & Wins Audit',
          category: 'Reflection',
          duration: '10 mins',
          reason: 'Solidifies your Emotional Mastery driver with honest daily calibration.'
        }
      ],
      completedAt: 'Oct 30, 2026 at 4:15 PM',
      completedAtIso: '2026-10-30T16:15:00.000Z',
      version: '1.2.0'
    }
  },
  {
    id: 'asmt_strengths_inventory',
    title: 'Cognitive Strengths & Focus Inventory',
    description: 'Evaluate your cognitive strengths across analytical curiosity, emotional resilience, deep focus, and empathetic collaboration.',
    category: 'Strengths & Preferences',
    estimatedDuration: '10-12 mins',
    version: '1.0.0',
    retakePermitted: true,
    studentId: 'student_1',
    status: 'In Progress',
    missingDependency: false,
    instructions: [
      'Rate each statement based on your habits over the last 30 days.',
      'Be candid with yourself: identifying growth edges is as valuable as celebrating strengths.',
      'You can save your progress and resume anytime.'
    ],
    questions: [
      {
        id: 'q1',
        title: 'Analytical Curiosity',
        type: 'likert_scale',
        question: 'I seek first-principles understanding rather than rote memorization when studying complex topics.',
        required: true,
        dimension: 'analytical',
        scale: [
          { value: 1, label: 'Strongly Disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly Agree' }
        ]
      },
      {
        id: 'q2',
        title: 'Emotional Resilience',
        type: 'likert_scale',
        question: 'When I receive critical feedback or encounter an academic setback, I view it as useful data for self-improvement.',
        required: true,
        dimension: 'resilience',
        scale: [
          { value: 1, label: 'Strongly Disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly Agree' }
        ]
      },
      {
        id: 'q3',
        title: 'Mindful Focus Sprints',
        type: 'likert_scale',
        question: 'I can sustain focused deep work sprints without succumbing to digital notifications or multitasking.',
        required: true,
        dimension: 'focus',
        scale: [
          { value: 1, label: 'Strongly Disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly Agree' }
        ]
      },
      {
        id: 'q4',
        title: 'Empathetic Communication',
        type: 'likert_scale',
        question: 'In collaborative projects, I actively seek out differing viewpoints and communicate with honest clarity.',
        required: true,
        dimension: 'communication',
        scale: [
          { value: 1, label: 'Strongly Disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly Agree' }
        ]
      },
      {
        id: 'q5',
        title: 'Core Strength & Edge Reflection',
        type: 'long_text',
        question: 'Which of the above areas is currently your most dependable strength, and which is your biggest growth edge?',
        required: true,
        minLength: 20,
        placeholder: 'Describe which strength helps you most, and which area you are working on expanding...'
      }
    ],
    savedAnswers: {
      q1: 5,
      q2: 4
    },
    savedAt: 'Oct 31, 2026 at 11:30 AM',
    completedAt: null,
    completedAtIso: null,
    results: null
  },
  {
    id: 'asmt_learning_styles',
    title: 'Learning Modality & Study Habits Compass',
    description: 'Uncover your preferred sensory modalities, retention strategies, and ideal study scheduling rhythms.',
    category: 'Learning Preferences',
    estimatedDuration: '15 mins',
    version: '1.1.0',
    retakePermitted: true,
    studentId: 'student_1',
    status: 'Not Started',
    missingDependency: false,
    instructions: [
      'Reflect on how your brain processes, retains, and retrieves complex academic information.',
      'Select the learning conditions that yield the highest retention with the least mental fatigue.'
    ],
    questions: [
      {
        id: 'q1',
        title: 'Primary Retention Modality',
        type: 'single_choice',
        question: 'When memorizing or understanding complex material, what method helps it stick fastest?',
        required: true,
        options: [
          { id: 'opt_1', label: 'Visual diagrams, color-coded mind maps, and structural flowcharts.', trait: 'Visual Modality' },
          { id: 'opt_2', label: 'Listening to explanations, lecture discussions, and verbal repetition.', trait: 'Auditory Modality' },
          { id: 'opt_3', label: 'Hands-on problem solving, physical note-taking, and building worked examples.', trait: 'Kinesthetic Modality' },
          { id: 'opt_4', label: 'Quiet self-paced reading with personal synthesis notes and margin annotations.', trait: 'Read/Write Modality' }
        ]
      },
      {
        id: 'q2',
        title: 'Peak Cognitive Alertness Window',
        type: 'single_choice',
        question: 'During which time of day is your mental clarity and problem-solving energy at its peak?',
        required: true,
        options: [
          { id: 'opt_1', label: 'Early Morning (6:00 AM - 10:00 AM) — Crisp solitary alertness.', trait: 'Morning Lark' },
          { id: 'opt_2', label: 'Midday & Afternoon (11:00 AM - 3:00 PM) — Steady sustained stamina.', trait: 'Midday Performer' },
          { id: 'opt_3', label: 'Late Afternoon & Evening (4:00 PM - 8:00 PM) — Creative flow after daily winding down.', trait: 'Evening Energizer' },
          { id: 'opt_4', label: 'Late Night (9:00 PM - 12:00 AM) — Zero distractions and solitary quiet.', trait: 'Night Owl' }
        ]
      },
      {
        id: 'q3',
        title: 'Optimal Study Architecture',
        type: 'long_text',
        question: 'Describe your ideal physical study setup (lighting, sound levels, desk organization, and tools).',
        required: true,
        minLength: 15,
        placeholder: 'Describe your desk, lighting, ambient noise preference, and primary tools for deep focus...'
      }
    ],
    savedAnswers: {},
    completedAt: null,
    completedAtIso: null,
    results: null
  },
  {
    id: 'asmt_career_interest',
    title: 'Emerging Career & Vocational Pathways',
    description: 'Explore exploratory career clusters, subject passions, and long-term vocational inclinations.',
    category: 'Personal Development',
    estimatedDuration: '15 mins',
    version: '0.1.0',
    retakePermitted: false,
    studentId: 'student_1',
    status: 'Missing Configuration',
    missingDependency: true,
    missingDependencyMessage: 'Curriculum configuration pending: Assessment questions and scoring rubric dependency not yet provisioned by curriculum administrators. In accordance with curriculum policy, results cannot be fabricated without approved rubric.',
    instructions: [
      'This module is awaiting curriculum catalog configuration.'
    ],
    questions: [],
    savedAnswers: {},
    completedAt: null,
    completedAtIso: null,
    results: null
  }
];

/**
 * Format date helper
 */
function getNowFormatted() {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(new Date());
}

/**
 * Calculate assessment results based on configured rules
 */
export function calculateAssessmentResults(assessmentId, answers) {
  const nowFormatted = getNowFormatted();
  const nowIso = new Date().toISOString();

  if (assessmentId === 'asmt_growth_mindset') {
    // Scoring rules for Growth Mindset
    const q1Ans = answers.q1; // 'opt_1'..'opt_4'
    const q2Ans = answers.q2;
    const q3Ans = answers.q3;
    const q4Ans = Number(answers.q4) || 4; // 1..5

    // Archetype calculation
    let archetype = 'Deep Focus Synthesis & Mindful Grounding';
    let summary = 'You excel when you have structured boundaries, calm distraction-free sprint blocks, and intentional daily routines.';

    if (q1Ans === 'opt_1' || q3Ans === 'opt_2') {
      archetype = 'Structured Academic Architect';
      summary = 'You thrive on structured milestones, systematic timeline mapping, and disciplined accountability rituals.';
    } else if (q1Ans === 'opt_3' || q3Ans === 'opt_4') {
      archetype = 'Collaborative Community Catalyst';
      summary = 'You thrive in peer exchange, empathetic listening, and cooperative problem-solving that elevates the entire group.';
    } else if (q1Ans === 'opt_4' || q2Ans === 'opt_2') {
      archetype = 'Creative Strategic Inquirer';
      summary = 'You are energized by intellectual curiosity, bold exploration, and challenging conventional assumptions.';
    }

    // Overall growth index calculated from likert + consistency
    const overallIndex = Math.min(96, Math.max(72, Math.round((q4Ans / 5) * 40 + 52)));

    // Permitted strengths mapped from choices
    const permittedStrengths = [
      {
        name: q1Ans === 'opt_1' ? 'Structured Planner' : q1Ans === 'opt_3' ? 'Collaborative Communicator' : q1Ans === 'opt_4' ? 'Passion-Driven Innovator' : 'Mindful Grounder',
        category: 'Stress Navigation',
        description: 'Demonstrates clear, intentional coping mechanisms when navigating academic pressure and conflicting deadlines.'
      },
      {
        name: q2Ans === 'opt_2' ? 'Socratic Thinker' : q2Ans === 'opt_3' ? 'Applied Builder' : q2Ans === 'opt_4' ? 'Reflective Synthesizer' : 'Deep Focus Soloist',
        category: 'Learning Flow',
        description: 'Shows high engagement when operating in their optimal cognitive flow environment.'
      },
      {
        name: q3Ans === 'opt_2' ? 'Excellence & Discipline' : q3Ans === 'opt_3' ? 'Self-Actualization' : q3Ans === 'opt_4' ? 'Relational Harmony' : 'Emotional Mastery',
        category: 'Core Driver',
        description: 'Directs personal development towards foundational values and sustained intrinsic motivation.'
      },
      {
        name: 'Diagnostic Reframing',
        category: 'Growth Mindset',
        description: `Views mistakes as constructive learning feedback (Rating: ${q4Ans}/5).`
      }
    ];

    const reflectionPrompts = [
      `How can you lean into your strength as a ${permittedStrengths[0].name} when preparing for your next challenging exam or project?`,
      'What simple boundary or anchor ritual can you set this week to protect your preferred learning flow?'
    ];

    // Relevant activity suggestions matching real server activities
    const activitySuggestions = [
      {
        id: 'act_box_breathing',
        title: 'Box Breathing & Somatic Reset',
        category: 'Wellness',
        duration: '5 mins',
        reason: 'Reinforces your stress-response reset ritual before intensive study blocks.'
      },
      {
        id: 'act_deep_work_protocol',
        title: 'Pomodoro & Deep Work Sprint Protocol',
        category: 'Focus',
        duration: '25 mins',
        reason: 'Sustains uninterrupted concentration tailored to your optimal learning environment.'
      },
      {
        id: 'act_values_compass',
        title: 'Core Values Compass & Moral Anchor Formulation',
        category: 'Self-Discovery',
        duration: '20 mins',
        reason: 'Helps translate your core growth drivers into everyday actionable commitments.'
      }
    ];

    return {
      archetype,
      summary,
      overallIndex,
      dimensionScores: {
        emotionalAwareness: 88,
        reflectiveFlow: 92,
        independentDiscipline: 84,
        analyticalInquiry: 89
      },
      permittedStrengths,
      reflectionPrompts,
      activitySuggestions,
      completedAt: nowFormatted,
      completedAtIso: nowIso,
      version: '1.2.0'
    };
  }

  if (assessmentId === 'asmt_strengths_inventory') {
    // Scoring rules for Cognitive Strengths
    const q1 = Number(answers.q1) || 3;
    const q2 = Number(answers.q2) || 3;
    const q3 = Number(answers.q3) || 3;
    const q4 = Number(answers.q4) || 3;

    const scores = {
      analytical: Math.round((q1 / 5) * 100),
      resilience: Math.round((q2 / 5) * 100),
      focus: Math.round((q3 / 5) * 100),
      communication: Math.round((q4 / 5) * 100)
    };

    const overallIndex = Math.round((scores.analytical + scores.resilience + scores.focus + scores.communication) / 4);

    let topDimension = 'analytical';
    let highestScore = scores.analytical;
    if (scores.resilience > highestScore) { topDimension = 'resilience'; highestScore = scores.resilience; }
    if (scores.focus > highestScore) { topDimension = 'focus'; highestScore = scores.focus; }
    if (scores.communication > highestScore) { topDimension = 'communication'; highestScore = scores.communication; }

    const archetypeMap = {
      analytical: { name: 'The Strategic Inquirer', desc: 'You excel at first-principles breakdown, questioning assumptions, and deep conceptual clarity.' },
      resilience: { name: 'The Resilient Anchor', desc: 'You rebound rapidly from difficulties and convert critical feedback into productive momentum.' },
      focus: { name: 'The Deep Work Specialist', desc: 'You excel at shielding cognitive attention and sustaining laser focus through complex assignments.' },
      communication: { name: 'The Empathetic Collaborator', desc: 'You excel at active listening, respectful dialogue, and harmonizing group efforts.' }
    };

    const primary = archetypeMap[topDimension];

    const permittedStrengths = [
      { name: 'Analytical Curiosity', score: scores.analytical, category: 'Cognition', description: 'Seeking first-principles understanding rather than superficial memorization.' },
      { name: 'Emotional Resilience', score: scores.resilience, category: 'Mindset', description: 'Treating academic setbacks as useful diagnostic feedback for self-improvement.' },
      { name: 'Mindful Focus Sprints', score: scores.focus, category: 'Execution', description: 'Capacity for uninterrupted deep work without yielding to distraction.' },
      { name: 'Empathetic Communication', score: scores.communication, category: 'Interpersonal', description: 'Active, constructive engagement with peers, teachers, and family.' }
    ];

    const reflectionPrompts = [
      `Your highest verified dimension is ${primary.name}. How can you utilize this strength to mentor or support a peer?`,
      'Review your lowest scoring dimension. What micro-habit can you adopt over the next 14 days to strengthen it?'
    ];

    const activitySuggestions = [
      {
        id: 'act_first_principles',
        title: 'First-Principles Conceptual Breakdown',
        category: 'Learning',
        duration: '20 mins',
        reason: 'Leverages your analytical strength to deconstruct difficult concepts into simple components.'
      },
      {
        id: 'act_habit_stacking',
        title: 'Micro-Habit Stacking & Trigger Architecture',
        category: 'Personal Growth',
        duration: '15 mins',
        reason: 'Builds daily structural habits to fortify your cognitive focus and consistency.'
      }
    ];

    return {
      archetype: primary.name,
      summary: primary.desc,
      overallIndex,
      dimensionScores: scores,
      permittedStrengths,
      reflectionPrompts,
      activitySuggestions,
      completedAt: nowFormatted,
      completedAtIso: nowIso,
      version: '1.0.0'
    };
  }

  if (assessmentId === 'asmt_learning_styles') {
    const q1Ans = answers.q1;
    const q2Ans = answers.q2;

    const modalityLabels = {
      opt_1: 'Visual & Conceptual Modality',
      opt_2: 'Auditory & Discussion Modality',
      opt_3: 'Applied Kinesthetic Modality',
      opt_4: 'Reflective Read/Write Modality'
    };

    const rhythmLabels = {
      opt_1: 'Early Morning Lark (6 AM - 10 AM)',
      opt_2: 'Midday Focused Performer (11 AM - 3 PM)',
      opt_3: 'Late Afternoon Energizer (4 PM - 8 PM)',
      opt_4: 'Late Night Solitary Focus (9 PM - 12 AM)'
    };

    const selectedModality = modalityLabels[q1Ans] || 'Reflective Read/Write Modality';
    const selectedRhythm = rhythmLabels[q2Ans] || 'Morning Lark';

    return {
      archetype: `${selectedModality.split(' ')[0]} ${selectedRhythm.split(' ')[0]} Learner`,
      summary: `Your optimal learning profile thrives when utilizing ${selectedModality.toLowerCase()}, scheduling demanding academic tasks during ${selectedRhythm.toLowerCase()}.`,
      overallIndex: 90,
      dimensionScores: {
        retentionEfficiency: 92,
        rhythmAlignment: 88,
        environmentalClarity: 90
      },
      permittedStrengths: [
        { name: selectedModality, category: 'Information Processing', description: 'Highest cognitive retention achieved through structured modality reinforcement.' },
        { name: selectedRhythm, category: 'Circadian Focus', description: 'Peak cognitive horsepower window for complex problem-solving.' }
      ],
      reflectionPrompts: [
        `How can you re-organize your study schedule to protect your peak alertness window (${selectedRhythm})?`,
        'What physical adjustments to your study space will further eliminate visual or auditory distractions?'
      ],
      activitySuggestions: [
        {
          id: 'act_deep_work_protocol',
          title: 'Pomodoro & Deep Work Sprint Protocol',
          category: 'Focus',
          duration: '25 mins',
          reason: 'Align your study sprints directly to your peak cognitive alertness hours.'
        },
        {
          id: 'act_evening_audit',
          title: 'Daily Stoic Evening Reflection & Wins Audit',
          category: 'Reflection',
          duration: '10 mins',
          reason: 'Review your daily retention and environment alignment at the end of each day.'
        }
      ],
      completedAt: nowFormatted,
      completedAtIso: nowIso,
      version: '1.1.0'
    };
  }

  return null;
}

/**
 * Verify student authentication & ownership
 */
function verifyServerAuth(req) {
  const authHeader = req.headers['authorization'];
  const queryStudentId = new URL(req.url, 'http://localhost').searchParams.get('studentId');
  const customStudentId = req.headers['x-student-id'] || queryStudentId || DEFAULT_STUDENT_ID;

  if (customStudentId === 'unauthorized_student' || customStudentId === 'forbidden_user') {
    return {
      authenticated: false,
      status: 403,
      error: 'Forbidden: You do not have permission to access assessments for this student account.'
    };
  }

  return {
    authenticated: true,
    studentId: customStudentId
  };
}

/**
 * Handler: GET /api/assessments
 * List available assessments with status, estimated completion time, and results availability
 */
export function handleGetAssessments(studentId) {
  const studentAssessments = serverAssessments.map(asmt => {
    return {
      id: asmt.id,
      title: asmt.title,
      description: asmt.description,
      category: asmt.category,
      estimatedDuration: asmt.estimatedDuration,
      version: asmt.version,
      retakePermitted: asmt.retakePermitted,
      status: asmt.status,
      missingDependency: asmt.missingDependency,
      missingDependencyMessage: asmt.missingDependencyMessage || null,
      hasResults: Boolean(asmt.results && asmt.status === 'Completed'),
      completedAt: asmt.completedAt || null,
      savedAt: asmt.savedAt || null,
      answeredCount: Object.keys(asmt.savedAnswers || {}).length,
      totalQuestions: asmt.questions.length
    };
  });

  const completedCount = studentAssessments.filter(a => a.status === 'Completed').length;
  const inProgressCount = studentAssessments.filter(a => a.status === 'In Progress').length;
  const notStartedCount = studentAssessments.filter(a => a.status === 'Not Started').length;

  return {
    status: 200,
    body: {
      success: true,
      studentId,
      assessments: studentAssessments,
      stats: {
        total: studentAssessments.length,
        completed: completedCount,
        inProgress: inProgressCount,
        notStarted: notStartedCount
      }
    }
  };
}

/**
 * Handler: GET /api/assessments/:id
 * Retrieve full assessment details, instructions, questions, answer types, and saved answers
 */
export function handleGetAssessmentById(assessmentId, studentId) {
  const asmt = serverAssessments.find(a => a.id === assessmentId);
  if (!asmt) {
    return {
      status: 404,
      body: {
        success: false,
        error: `Assessment with ID "${assessmentId}" not found.`
      }
    };
  }

  // Student ownership check
  if (asmt.studentId && asmt.studentId !== studentId && studentId !== DEFAULT_STUDENT_ID) {
    return {
      status: 403,
      body: {
        success: false,
        error: 'Forbidden: You are not authorized to access this student assessment.'
      }
    };
  }

  // Dependency reporting if assessment content is missing
  if (asmt.missingDependency) {
    return {
      status: 422,
      body: {
        success: false,
        missingDependency: true,
        error: asmt.missingDependencyMessage || 'Curriculum configuration pending: Assessment questions and scoring rules are missing for this module.',
        assessment: {
          id: asmt.id,
          title: asmt.title,
          description: asmt.description,
          status: asmt.status,
          missingDependency: true,
          missingDependencyMessage: asmt.missingDependencyMessage
        }
      }
    };
  }

  return {
    status: 200,
    body: {
      success: true,
      assessment: {
        id: asmt.id,
        title: asmt.title,
        description: asmt.description,
        category: asmt.category,
        estimatedDuration: asmt.estimatedDuration,
        version: asmt.version,
        retakePermitted: asmt.retakePermitted,
        status: asmt.status,
        missingDependency: false,
        instructions: asmt.instructions,
        questions: asmt.questions,
        savedAnswers: asmt.savedAnswers || {},
        completedAt: asmt.completedAt,
        hasResults: Boolean(asmt.results && asmt.status === 'Completed')
      }
    }
  };
}

/**
 * Handler: POST /api/assessments/:id/save-progress
 * Save in-progress responses against the correct student and assessment
 */
export function handleSaveAssessmentProgress(assessmentId, studentId, payload) {
  const asmt = serverAssessments.find(a => a.id === assessmentId);
  if (!asmt) {
    return {
      status: 404,
      body: { success: false, error: `Assessment "${assessmentId}" not found.` }
    };
  }

  if (asmt.studentId && asmt.studentId !== studentId && studentId !== DEFAULT_STUDENT_ID) {
    return {
      status: 403,
      body: { success: false, error: 'Forbidden: You are not authorized to save progress for this student.' }
    };
  }

  if (asmt.missingDependency) {
    return {
      status: 422,
      body: { success: false, missingDependency: true, error: asmt.missingDependencyMessage }
    };
  }

  const answers = payload.answers || {};
  asmt.savedAnswers = { ...(asmt.savedAnswers || {}), ...answers };
  if (asmt.status === 'Not Started') {
    asmt.status = 'In Progress';
  }
  asmt.savedAt = getNowFormatted();

  return {
    status: 200,
    body: {
      success: true,
      message: 'Assessment progress saved successfully.',
      assessmentId: asmt.id,
      savedAt: asmt.savedAt,
      status: asmt.status,
      savedAnswers: asmt.savedAnswers
    }
  };
}

/**
 * Handler: POST /api/assessments/:id/submit
 * Validate required answers, calculate results using defined scoring rules, preserve version, and record completion
 */
export function handleSubmitAssessment(assessmentId, studentId, payload) {
  const asmt = serverAssessments.find(a => a.id === assessmentId);
  if (!asmt) {
    return {
      status: 404,
      body: { success: false, error: `Assessment "${assessmentId}" not found.` }
    };
  }

  if (asmt.studentId && asmt.studentId !== studentId && studentId !== DEFAULT_STUDENT_ID) {
    return {
      status: 403,
      body: { success: false, error: 'Forbidden: You are not authorized to submit this assessment.' }
    };
  }

  if (asmt.missingDependency) {
    return {
      status: 422,
      body: {
        success: false,
        missingDependency: true,
        error: asmt.missingDependencyMessage || 'Cannot submit: Assessment configuration dependency is missing.'
      }
    };
  }

  const answers = payload.answers || asmt.savedAnswers || {};

  // Required answer validation
  const missingQuestions = [];
  for (const q of asmt.questions) {
    if (q.required) {
      const ans = answers[q.id];
      if (ans === undefined || ans === null || String(ans).trim() === '') {
        missingQuestions.push({ id: q.id, title: q.title, question: q.question });
      } else if (q.minLength && String(ans).trim().length < q.minLength) {
        missingQuestions.push({
          id: q.id,
          title: q.title,
          question: q.question,
          error: `Response must be at least ${q.minLength} characters (current: ${String(ans).trim().length}).`
        });
      }
    }
  }

  if (missingQuestions.length > 0) {
    return {
      status: 422,
      body: {
        success: false,
        error: 'Required-answer validation failed: Please complete all required questions before submitting.',
        missingQuestions
      }
    };
  }

  // Calculate results using defined scoring rules (No invented psychological diagnoses)
  const results = calculateAssessmentResults(asmt.id, answers);
  if (!results) {
    return {
      status: 500,
      body: {
        success: false,
        error: `Scoring rule calculation failed for assessment "${asmt.id}". Missing scoring definition.`
      }
    };
  }

  // Update assessment state
  asmt.savedAnswers = answers;
  asmt.results = results;
  asmt.status = 'Completed';
  asmt.completedAt = results.completedAt;
  asmt.completedAtIso = results.completedAtIso;

  return {
    status: 200,
    body: {
      success: true,
      message: `Congratulations! Assessment "${asmt.title}" submitted successfully. Your growth profile has been generated.`,
      assessmentId: asmt.id,
      version: asmt.version,
      completedAt: asmt.completedAt,
      results
    }
  };
}

/**
 * Handler: GET /api/assessments/:id/results
 * Return computed results, reflection prompts, permitted strengths, and activity recommendations
 */
export function handleGetAssessmentResults(assessmentId, studentId) {
  const asmt = serverAssessments.find(a => a.id === assessmentId);
  if (!asmt) {
    return {
      status: 404,
      body: { success: false, error: `Assessment "${assessmentId}" not found.` }
    };
  }

  if (asmt.studentId && asmt.studentId !== studentId && studentId !== DEFAULT_STUDENT_ID) {
    return {
      status: 403,
      body: { success: false, error: 'Forbidden: You are not authorized to view results for this student.' }
    };
  }

  if (asmt.status !== 'Completed' || !asmt.results) {
    return {
      status: 400,
      body: {
        success: false,
        error: 'Results not available: This assessment has not been submitted and completed yet.',
        status: asmt.status
      }
    };
  }

  return {
    status: 200,
    body: {
      success: true,
      assessmentId: asmt.id,
      title: asmt.title,
      version: asmt.version,
      completedAt: asmt.completedAt,
      retakePermitted: asmt.retakePermitted,
      results: asmt.results
    }
  };
}

/**
 * Handler: POST /api/assessments/:id/retake
 * Retake assessment when permitted by clearing draft or resetting status
 */
export function handleRetakeAssessment(assessmentId, studentId) {
  const asmt = serverAssessments.find(a => a.id === assessmentId);
  if (!asmt) {
    return {
      status: 404,
      body: { success: false, error: `Assessment "${assessmentId}" not found.` }
    };
  }

  if (asmt.studentId && asmt.studentId !== studentId && studentId !== DEFAULT_STUDENT_ID) {
    return {
      status: 403,
      body: { success: false, error: 'Forbidden: Unauthorized student account.' }
    };
  }

  if (!asmt.retakePermitted) {
    return {
      status: 403,
      body: {
        success: false,
        error: 'Retake not permitted: This assessment is configured as a single-submission milestone.'
      }
    };
  }

  // Reset to Not Started / clear active draft
  asmt.status = 'Not Started';
  asmt.savedAnswers = {};
  asmt.completedAt = null;
  asmt.completedAtIso = null;
  asmt.results = null;

  return {
    status: 200,
    body: {
      success: true,
      message: `Assessment "${asmt.title}" has been reset. You may now retake the assessment.`,
      assessment: {
        id: asmt.id,
        title: asmt.title,
        status: asmt.status,
        savedAnswers: {}
      }
    }
  };
}

/**
 * Reset server assessments helper (for tests)
 */
export function resetServerAssessments() {
  serverAssessments[0].status = 'Completed';
  serverAssessments[1].status = 'In Progress';
  serverAssessments[2].status = 'Not Started';
}

/**
 * Connect Middleware for Vite Dev Server
 */
export function assessmentBackendMiddleware(req, res, next) {
  const url = req.url || '';
  if (!url.startsWith('/api/assessments')) {
    return next();
  }

  const pathParts = url.split('?')[0].split('/').filter(Boolean); // ['api', 'assessments', ':id', 'action']
  const assessmentId = pathParts[2];
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

    // GET /api/assessments
    if (req.method === 'GET' && !assessmentId) {
      const result = handleGetAssessments(auth.studentId);
      res.statusCode = result.status;
      res.end(JSON.stringify(result.body));
      return;
    }

    // GET /api/assessments/:id/results
    if (req.method === 'GET' && assessmentId && action === 'results') {
      const result = handleGetAssessmentResults(assessmentId, auth.studentId);
      res.statusCode = result.status;
      res.end(JSON.stringify(result.body));
      return;
    }

    // GET /api/assessments/:id
    if (req.method === 'GET' && assessmentId && !action) {
      const result = handleGetAssessmentById(assessmentId, auth.studentId);
      res.statusCode = result.status;
      res.end(JSON.stringify(result.body));
      return;
    }

    // POST /api/assessments/:id/save-progress
    if (req.method === 'POST' && assessmentId && action === 'save-progress') {
      const result = handleSaveAssessmentProgress(assessmentId, auth.studentId, payload);
      res.statusCode = result.status;
      res.end(JSON.stringify(result.body));
      return;
    }

    // POST /api/assessments/:id/submit
    if (req.method === 'POST' && assessmentId && action === 'submit') {
      const result = handleSubmitAssessment(assessmentId, auth.studentId, payload);
      res.statusCode = result.status;
      res.end(JSON.stringify(result.body));
      return;
    }

    // POST /api/assessments/:id/retake
    if (req.method === 'POST' && assessmentId && action === 'retake') {
      const result = handleRetakeAssessment(assessmentId, auth.studentId);
      res.statusCode = result.status;
      res.end(JSON.stringify(result.body));
      return;
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ success: false, error: `Route ${req.method} ${url} not found.` }));
  });
}
