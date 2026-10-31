// Client API service for HighOrbit Student Assignment Submission Workflow
// Coordinates with the server backend and handles network failures safely

const DEFAULT_STUDENT_ID = 'student_1';

/**
 * Validates a file before attachment
 */
export function validateAttachmentFile(file) {
  if (!file) return { valid: false, error: 'No file selected.' };

  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'image/png',
    'image/jpeg'
  ];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Unsupported file type "${file.type || 'unknown'}". Allowed formats: PDF, Word (DOCX), PNG, JPG.`
    };
  }

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_SIZE) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File size (${sizeMb} MB) exceeds maximum allowed limit of 5 MB.`
    };
  }

  return { valid: true };
}

/**
 * Fetch all authorized assignments from server
 */
export async function fetchAssignmentsApi(studentId = DEFAULT_STUDENT_ID) {
  try {
    const res = await fetch('/api/assignments', {
      method: 'GET',
      headers: {
        'x-student-id': studentId,
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, status: res.status, error: data.error || 'Failed to fetch assignments' };
    }
    return { success: true, assignments: data.assignments };
  } catch (err) {
    return {
      success: false,
      networkError: true,
      error: 'Network failure: Unable to connect to assignment server. Check your connection.'
    };
  }
}

/**
 * Fetch single assignment by ID
 */
export async function fetchAssignmentByIdApi(id, studentId = DEFAULT_STUDENT_ID) {
  try {
    const res = await fetch(`/api/assignments/${id}`, {
      method: 'GET',
      headers: {
        'x-student-id': studentId,
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, status: res.status, error: data.error || 'Failed to fetch assignment' };
    }
    return { success: true, assignment: data.assignment };
  } catch (err) {
    return {
      success: false,
      networkError: true,
      error: 'Network failure: Unable to retrieve assignment details.'
    };
  }
}

/**
 * Save draft progress to server
 */
export async function saveAssignmentDraftApi(id, draftPayload, studentId = DEFAULT_STUDENT_ID) {
  try {
    const res = await fetch(`/api/assignments/${id}/save-draft`, {
      method: 'POST',
      headers: {
        'x-student-id': studentId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(draftPayload)
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        status: res.status,
        error: data.error || 'Failed to save progress on server.'
      };
    }
    return {
      success: true,
      message: data.message,
      savedAt: data.savedAt,
      draftAnswers: data.draftAnswers,
      activityConfirmed: data.activityConfirmed
    };
  } catch (err) {
    return {
      success: false,
      networkError: true,
      error: 'Network failure: Unable to sync draft with server. Your changes are retained locally.'
    };
  }
}

/**
 * Submit assignment to server
 */
export async function submitAssignmentApi(id, submissionPayload, studentId = DEFAULT_STUDENT_ID) {
  try {
    const res = await fetch(`/api/assignments/${id}/submit`, {
      method: 'POST',
      headers: {
        'x-student-id': studentId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submissionPayload)
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        status: res.status,
        error: data.error || 'Submission failed on server.',
        validationErrors: data.validationErrors || []
      };
    }
    return {
      success: true,
      message: data.message,
      assignment: data.assignment,
      submission: data.submission
    };
  } catch (err) {
    return {
      success: false,
      networkError: true,
      error: 'Network failure: The server could not be reached. Your draft progress is safely preserved. Please try again.'
    };
  }
}

/**
 * Submit reviewer feedback (For Mentor / Parent review workflows)
 */
export async function submitReviewFeedbackApi(id, reviewPayload, studentId = DEFAULT_STUDENT_ID) {
  try {
    const res = await fetch(`/api/assignments/${id}/review`, {
      method: 'POST',
      headers: {
        'x-student-id': studentId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewPayload)
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, status: res.status, error: data.error || 'Failed to update review status.' };
    }
    return { success: true, message: data.message, assignment: data.assignment };
  } catch (err) {
    return { success: false, networkError: true, error: 'Network failure: Unable to update review.' };
  }
}
