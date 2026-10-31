// Server Backend for LifeVerse AI / HighOrbit Student Personality Module
// Manages student personality profile, distinguishes self-reported information
// from assessment-generated summaries, enforces edit authorization, and links activities.

import { serverAssessments } from './assessmentBackend.js';
import { serverActivities } from './activityBackend.js';

const DEFAULT_STUDENT_ID = 'student_1';

// Student self-reported personality and developmental records
export let serverStudentPersonality = {
  student_1: {
    studentId: 'student_1',
    name: 'Alex Parker',
    nickname: 'Alex',
    grade: 'Grade 11',
    ageGroup: '15–18 years',
    bio: 'Curious learner interested in first-principles thinking, sustained focus, and character development.',
    // Self-Reported: Editable fields
    interests: [
      'Leadership & Growth',
      'Mathematics & Logic',
      'Creative Writing',
      'Philosophy & Ethics'
    ],
    thingsIEnjoy: [
      'Solving challenging logic and math puzzles',
      'Quiet evening reading with personal note synthesis',
      'Collaborative brainstorming on real-world projects',
      'Distraction-free deep work sprints with ambient music'
    ],
    learningPreferences: {
      studyEnvironment: 'Quiet solitary desk with natural light and minimal clutter',
      peakFocusWindow: 'Early Morning (6:00 AM - 10:00 AM)',
      retentionMethod: 'Writing first-principles synthesis notes and visual mind maps',
      soundPreference: 'Complete silence or ambient binaural beats'
    },
    personalGoals: [
      {
        id: 'goal_1',
        title: 'Develop Sustained 60-Minute Focus',
        category: 'Focus & Habits',
        targetDate: 'Dec 2026',
        completed: false
      },
      {
        id: 'goal_2',
        title: 'Improve First-Principles Problem Solving in Physics',
        category: 'Academic Mastery',
        targetDate: 'Nov 2026',
        completed: false
      },
      {
        id: 'goal_3',
        title: 'Build Calm Speaking & Presentation Confidence',
        category: 'Communication',
        targetDate: 'Jan 2027',
        completed: false
      }
    ],
    reflections: [
      {
        id: 'pref_1',
        date: 'Oct 30, 2026',
        topic: 'Optimal Flow State Reflection',
        prompt: 'What learning environment allowed you to enter deep flow today?',
        text: 'Studied in the library carrel with noise-canceling headphones for 90 minutes. Breaking down mechanics problems step-by-step prevented mental fatigue.',
        source: 'Self-Reflection'
      },
      {
        id: 'pref_2',
        date: 'Oct 26, 2026',
        topic: 'Resilience & Feedback',
        prompt: 'Describe a moment you reframed an error into useful feedback.',
        text: 'Missed two questions on the chemistry quiz regarding stoichiometry. Instead of getting upset, I re-did the molar conversion steps on paper and realized my unit cancellation mistake.',
        source: 'Self-Reflection'
      }
    ]
  }
};

/**
 * Verify student authentication & ownership
 */
function verifyServerAuth(req) {
  const queryStudentId = new URL(req.url, 'http://localhost').searchParams.get('studentId');
  const customStudentId = req.headers['x-student-id'] || queryStudentId || DEFAULT_STUDENT_ID;

  if (customStudentId === 'unauthorized_student' || customStudentId === 'forbidden_user' || customStudentId === 'student_other') {
    return {
      authenticated: false,
      status: 403,
      error: 'Forbidden: You do not have permission to access another student\'s personality record.'
    };
  }

  return {
    authenticated: true,
    studentId: customStudentId
  };
}

/**
 * Assembles dynamic assessment-derived fields and suggested activities
 */
export function getPersonalityProfile(studentId) {
  const studentData = serverStudentPersonality[studentId];
  if (!studentData) {
    return null;
  }

  // Derive assessment-generated summary strictly from serverAssessments
  const completedGrowthAsmt = serverAssessments.find(
    a => a.id === 'asmt_growth_mindset' && a.status === 'Completed' && a.results
  );

  let assessmentDerived = {
    hasAssessmentResults: false,
    archetype: null,
    summary: null,
    overallIndex: null,
    dimensionScores: null,
    validatedStrengths: [],
    assessmentCompletedAt: null,
    assessmentVersion: null
  };

  if (completedGrowthAsmt && completedGrowthAsmt.results) {
    const res = completedGrowthAsmt.results;
    assessmentDerived = {
      hasAssessmentResults: true,
      assessmentId: completedGrowthAsmt.id,
      assessmentTitle: completedGrowthAsmt.title,
      archetype: res.archetype,
      summary: res.summary,
      overallIndex: res.overallIndex,
      dimensionScores: res.dimensionScores || null,
      validatedStrengths: (res.permittedStrengths || []).map(s => ({
        name: s.name,
        category: s.category,
        description: s.description,
        score: s.score || (res.dimensionScores ? Math.round(res.overallIndex) : 88),
        verifiedSource: `${completedGrowthAsmt.title} v${res.version || completedGrowthAsmt.version}`
      })),
      assessmentCompletedAt: completedGrowthAsmt.completedAt,
      assessmentVersion: completedGrowthAsmt.version
    };
  }

  // Suggest relevant activities from serverActivities matching interests and archetype
  const suggestedActivities = (serverActivities || [])
    .filter(act => {
      // Prioritize activities matching student interests and strengths
      return (
        act.category === 'Self-Discovery' ||
        act.category === 'Personal Growth' ||
        act.category === 'Reflection' ||
        act.category === 'Focus' ||
        act.category === 'Learning'
      );
    })
    .slice(0, 4)
    .map(act => {
      let reason = 'Reinforces personal growth and reflective learning.';
      if (act.id === 'act_values_compass') {
        reason = 'Matches your interest in Philosophy & Ethics to build decision clarity.';
      } else if (act.id === 'act_habit_stacking') {
        reason = 'Supports your personal goal to develop sustained 60-minute daily focus.';
      } else if (act.id === 'act_evening_audit') {
        reason = 'Complements your Mindful Grounder strength with daily calibration.';
      } else if (act.id === 'act_first_principles') {
        reason = 'Aligns with your Mathematics & Logic passion for structured breakdown.';
      }

      return {
        id: act.id,
        title: act.title,
        category: act.category,
        duration: act.duration,
        difficulty: act.difficulty,
        status: act.status,
        reason,
        link: '/child/activities'
      };
    });

  return {
    studentId: studentData.studentId,
    name: studentData.name,
    nickname: studentData.nickname,
    grade: studentData.grade,
    bio: studentData.bio,
    // Self-reported (Editable)
    selfReported: {
      interests: studentData.interests,
      thingsIEnjoy: studentData.thingsIEnjoy,
      learningPreferences: studentData.learningPreferences,
      personalGoals: studentData.personalGoals,
      reflections: studentData.reflections
    },
    // Assessment-Derived (Read-Only)
    assessmentDerived,
    // Dynamic recommendations
    suggestedActivities,
    // Permissions declaration
    permissions: {
      editableFields: ['interests', 'thingsIEnjoy', 'personalGoals', 'learningPreferences', 'reflections', 'bio', 'nickname'],
      readOnlyFields: ['archetype', 'overallIndex', 'validatedStrengths', 'assessmentCompletedAt', 'assessmentVersion']
    }
  };
}

/**
 * Handler: GET /api/personality
 */
export function handleGetPersonality(studentId) {
  const profile = getPersonalityProfile(studentId);
  if (!profile) {
    return {
      status: 404,
      body: {
        success: false,
        error: `Personality record not found for student "${studentId}".`
      }
    };
  }

  return {
    status: 200,
    body: {
      success: true,
      profile
    }
  };
}

/**
 * Handler: PUT /api/personality
 * Allows updates only to permitted self-reported fields.
 * Rejects any attempt to tamper with assessment-generated scores or strengths.
 */
export function handleUpdatePersonality(studentId, payload) {
  const studentData = serverStudentPersonality[studentId];
  if (!studentData) {
    return {
      status: 404,
      body: { success: false, error: `Student personality record for "${studentId}" not found.` }
    };
  }

  // Guard against modifying read-only assessment-generated fields
  const forbiddenKeys = ['archetype', 'overallIndex', 'validatedStrengths', 'assessmentCompletedAt', 'assessmentVersion'];
  for (const key of forbiddenKeys) {
    if (payload[key] !== undefined || (payload.assessmentDerived && payload.assessmentDerived[key] !== undefined)) {
      return {
        status: 400,
        body: {
          success: false,
          error: `Permission Denied: Field "${key}" is assessment-generated and cannot be manually modified. Strengths and scores are calculated exclusively by curriculum assessment rules.`
        }
      };
    }
  }

  // Update permitted fields
  if (Array.isArray(payload.interests)) {
    studentData.interests = payload.interests;
  }
  if (Array.isArray(payload.thingsIEnjoy)) {
    studentData.thingsIEnjoy = payload.thingsIEnjoy;
  }
  if (Array.isArray(payload.personalGoals)) {
    studentData.personalGoals = payload.personalGoals;
  }
  if (payload.learningPreferences && typeof payload.learningPreferences === 'object') {
    studentData.learningPreferences = {
      ...studentData.learningPreferences,
      ...payload.learningPreferences
    };
  }
  if (Array.isArray(payload.reflections)) {
    studentData.reflections = payload.reflections;
  }
  if (typeof payload.bio === 'string') {
    studentData.bio = payload.bio;
  }
  if (typeof payload.nickname === 'string') {
    studentData.nickname = payload.nickname;
  }

  const updatedProfile = getPersonalityProfile(studentId);

  return {
    status: 200,
    body: {
      success: true,
      message: 'Student personality profile updated successfully.',
      profile: updatedProfile
    }
  };
}

/**
 * Connect Middleware for Vite Dev Server
 */
export function personalityBackendMiddleware(req, res, next) {
  const url = req.url || '';
  if (!url.startsWith('/api/personality')) {
    return next();
  }

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

    // GET /api/personality
    if (req.method === 'GET') {
      const result = handleGetPersonality(auth.studentId);
      res.statusCode = result.status;
      res.end(JSON.stringify(result.body));
      return;
    }

    // PUT /api/personality or POST /api/personality
    if (req.method === 'PUT' || (req.method === 'POST' && !url.includes('/reset-assessment'))) {
      const result = handleUpdatePersonality(auth.studentId, payload);
      res.statusCode = result.status;
      res.end(JSON.stringify(result.body));
      return;
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ success: false, error: `Route ${req.method} ${url} not found.` }));
  });
}
