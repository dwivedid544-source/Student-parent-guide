// Client API Service for LifeVerse AI / HighOrbit Student Self-Assessment Module

const API_BASE = '/api/assessments';

/**
 * Fetch all available assessments for the student
 */
export async function fetchAssessmentsApi(studentId = 'student_1') {
  try {
    const res = await fetch(`${API_BASE}?studentId=${encodeURIComponent(studentId)}`, {
      headers: {
        'Accept': 'application/json',
        'x-student-id': studentId
      }
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'Failed to fetch assessments.', status: res.status };
    }
    return data;
  } catch (err) {
    return { success: false, error: err.message || 'Network error fetching assessments.' };
  }
}

/**
 * Fetch assessment details and saved answers by ID
 */
export async function fetchAssessmentByIdApi(assessmentId, studentId = 'student_1') {
  try {
    const res = await fetch(`${API_BASE}/${encodeURIComponent(assessmentId)}?studentId=${encodeURIComponent(studentId)}`, {
      headers: {
        'Accept': 'application/json',
        'x-student-id': studentId
      }
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: data.error || 'Failed to fetch assessment details.',
        missingDependency: Boolean(data.missingDependency),
        assessment: data.assessment,
        status: res.status
      };
    }
    return data;
  } catch (err) {
    return { success: false, error: err.message || 'Network error loading assessment details.' };
  }
}

/**
 * Save in-progress responses for the assessment
 */
export async function saveAssessmentProgressApi(assessmentId, studentId = 'student_1', answers = {}) {
  try {
    const res = await fetch(`${API_BASE}/${encodeURIComponent(assessmentId)}/save-progress?studentId=${encodeURIComponent(studentId)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-student-id': studentId
      },
      body: JSON.stringify({ answers })
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'Failed to save progress.', status: res.status };
    }
    return data;
  } catch (err) {
    return { success: false, error: err.message || 'Network error saving assessment progress.' };
  }
}

/**
 * Submit assessment for scoring and results generation
 */
export async function submitAssessmentApi(assessmentId, studentId = 'student_1', answers = {}) {
  try {
    const res = await fetch(`${API_BASE}/${encodeURIComponent(assessmentId)}/submit?studentId=${encodeURIComponent(studentId)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-student-id': studentId
      },
      body: JSON.stringify({ answers })
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: data.error || 'Failed to submit assessment.',
        missingQuestions: data.missingQuestions || [],
        missingDependency: Boolean(data.missingDependency),
        status: res.status
      };
    }
    return data;
  } catch (err) {
    return { success: false, error: err.message || 'Network error submitting assessment.' };
  }
}

/**
 * Fetch computed results for completed assessment
 */
export async function fetchAssessmentResultsApi(assessmentId, studentId = 'student_1') {
  try {
    const res = await fetch(`${API_BASE}/${encodeURIComponent(assessmentId)}/results?studentId=${encodeURIComponent(studentId)}`, {
      headers: {
        'Accept': 'application/json',
        'x-student-id': studentId
      }
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'Failed to load results.', status: res.status };
    }
    return data;
  } catch (err) {
    return { success: false, error: err.message || 'Network error loading assessment results.' };
  }
}

/**
 * Reset assessment to retake when permitted
 */
export async function retakeAssessmentApi(assessmentId, studentId = 'student_1') {
  try {
    const res = await fetch(`${API_BASE}/${encodeURIComponent(assessmentId)}/retake?studentId=${encodeURIComponent(studentId)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-student-id': studentId
      }
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'Failed to retake assessment.', status: res.status };
    }
    return data;
  } catch (err) {
    return { success: false, error: err.message || 'Network error resetting assessment.' };
  }
}
