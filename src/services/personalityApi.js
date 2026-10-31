// Client API Service for LifeVerse AI / HighOrbit Student Personality Module

const API_BASE = '/api/personality';

/**
 * Fetch the student's personality profile (self-reported + assessment-derived + activities)
 */
export async function fetchPersonalityProfileApi(studentId = 'student_1') {
  try {
    const res = await fetch(`${API_BASE}?studentId=${encodeURIComponent(studentId)}`, {
      headers: {
        'Accept': 'application/json',
        'x-student-id': studentId
      }
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'Failed to fetch personality profile.', status: res.status };
    }
    return data;
  } catch (err) {
    return { success: false, error: err.message || 'Network error fetching personality profile.' };
  }
}

/**
 * Save updates to permitted self-reported personality fields
 */
export async function updatePersonalityProfileApi(studentId = 'student_1', updates = {}) {
  try {
    const res = await fetch(`${API_BASE}?studentId=${encodeURIComponent(studentId)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-student-id': studentId
      },
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'Failed to save personality updates.', status: res.status };
    }
    return data;
  } catch (err) {
    return { success: false, error: err.message || 'Network error updating personality profile.' };
  }
}
