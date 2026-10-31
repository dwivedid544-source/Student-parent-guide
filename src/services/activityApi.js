// Client API Service for Student My Activities Exploration
// Connects to server backend and handles network resilience safely

const DEFAULT_STUDENT_ID = 'student_1';

/**
 * Fetch all authorized activities from server
 */
export async function fetchActivitiesApi(studentId = DEFAULT_STUDENT_ID) {
  try {
    const res = await fetch('/api/activities', {
      method: 'GET',
      headers: {
        'x-student-id': studentId,
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, status: res.status, error: data.error || 'Failed to fetch activities' };
    }
    return {
      success: true,
      activities: data.activities,
      activeCategories: data.activeCategories,
      totalCount: data.totalCount,
      completedCount: data.completedCount,
      inProgressCount: data.inProgressCount
    };
  } catch (err) {
    return {
      success: false,
      networkError: true,
      error: 'Network failure: Unable to connect to activity server. Check connection.'
    };
  }
}

/**
 * Fetch single activity details by ID
 */
export async function fetchActivityByIdApi(id, studentId = DEFAULT_STUDENT_ID) {
  try {
    const res = await fetch(`/api/activities/${id}`, {
      method: 'GET',
      headers: {
        'x-student-id': studentId,
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        status: res.status,
        error: data.error || 'Failed to retrieve activity details',
        restricted: data.restricted,
        requiredTier: data.requiredTier
      };
    }
    return { success: true, activity: data.activity };
  } catch (err) {
    return {
      success: false,
      networkError: true,
      error: 'Network failure: Unable to retrieve activity details.'
    };
  }
}

/**
 * Save draft progress for an activity
 */
export async function saveActivityProgressApi(id, payload, studentId = DEFAULT_STUDENT_ID) {
  try {
    const res = await fetch(`/api/activities/${id}/save-progress`, {
      method: 'POST',
      headers: {
        'x-student-id': studentId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, status: res.status, error: data.error || 'Failed to save progress.' };
    }
    return {
      success: true,
      message: data.message,
      activity: data.activity
    };
  } catch (err) {
    return {
      success: false,
      networkError: true,
      error: 'Network failure: Could not sync progress with server.'
    };
  }
}

/**
 * Complete activity according to defined rules
 */
export async function completeActivityApi(id, payload, studentId = DEFAULT_STUDENT_ID) {
  try {
    const res = await fetch(`/api/activities/${id}/complete`, {
      method: 'POST',
      headers: {
        'x-student-id': studentId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        status: res.status,
        error: data.error || 'Failed to complete activity.',
        unansweredQuestionId: data.unansweredQuestionId
      };
    }
    return {
      success: true,
      message: data.message,
      activity: data.activity
    };
  } catch (err) {
    return {
      success: false,
      networkError: true,
      error: 'Network failure: The server could not record completion.'
    };
  }
}
