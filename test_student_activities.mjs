// Comprehensive Automated Test Suite for Student My Activities Page
// Tests backend API, category extraction, progress saving, completion rules, and restriction permissions

const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('===============================================================');
  console.log('TEST SUITE: STUDENT MY ACTIVITIES EXPLORATION WORKFLOW');
  console.log('===============================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  try {
    // -------------------------------------------------------------------------
    // 1. TEST RETRIEVAL OF ACTIVITIES FROM BACKEND
    // -------------------------------------------------------------------------
    console.log('--- 1. Testing Retrieval of Activities from Backend ---');
    const getRes = await fetch(`${BASE_URL}/api/activities`, {
      headers: { 'x-student-id': 'student_1' }
    });
    const getData = await getRes.json();
    assert(getRes.status === 200, 'GET /api/activities returns 200 OK');
    assert(Array.isArray(getData.activities), 'Activities array returned');
    assert(getData.activities.length >= 6, `Configured activities loaded: ${getData.activities.length}`);

    // -------------------------------------------------------------------------
    // 2. TEST DYNAMIC CATEGORIES
    // -------------------------------------------------------------------------
    console.log('\n--- 2. Testing Dynamic Category Detection ---');
    const expectedCategories = ['Self-Discovery', 'Personal Growth', 'Reflection', 'Focus', 'Wellness', 'Learning'];
    assert(Array.isArray(getData.activeCategories), 'activeCategories returned from backend');
    for (const cat of expectedCategories) {
      assert(getData.activeCategories.includes(cat), `Category "${cat}" has real configured activities`);
    }

    // -------------------------------------------------------------------------
    // 3. TEST OPENING ACTIVITY DETAILS (GET /api/activities/:id)
    // -------------------------------------------------------------------------
    console.log('\n--- 3. Testing Opening Activity Details ---');
    const actRes = await fetch(`${BASE_URL}/api/activities/act_values_compass`, {
      headers: { 'x-student-id': 'student_1' }
    });
    const actData = await actRes.json();
    assert(actRes.status === 200, 'GET /api/activities/:id returns 200 OK');
    assert(actData.activity.title.includes('Core Values'), `Loaded title: "${actData.activity.title}"`);
    assert(Array.isArray(actData.activity.steps) && actData.activity.steps.length > 0, 'Step-by-step guided exercise steps present');
    assert(Array.isArray(actData.activity.questions) && actData.activity.questions.length > 0, 'Reflection questions present');

    // -------------------------------------------------------------------------
    // 4. TEST PROGRESS SAVING (POST /api/activities/:id/save-progress)
    // -------------------------------------------------------------------------
    console.log('\n--- 4. Testing Progress Saving on Incomplete Activity ---');
    const saveRes = await fetch(`${BASE_URL}/api/activities/act_evening_audit/save-progress`, {
      method: 'POST',
      headers: { 'x-student-id': 'student_1', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completedSteps: [0, 1],
        answers: {
          q1: 'Maintained deep concentration during afternoon reading and avoided distractions.'
        }
      })
    });
    const saveData = await saveRes.json();
    assert(saveRes.status === 200, 'POST /api/activities/:id/save-progress returns 200 OK');
    assert(saveData.activity.status === 'In Progress', 'Status transitioned from "Not Started" to "In Progress"');
    assert(saveData.activity.answers.q1.includes('Maintained deep concentration'), 'Draft answer saved on server');
    assert(saveData.activity.completedSteps.includes(1), 'Completed steps saved on server');

    // -------------------------------------------------------------------------
    // 5. TEST COMPLETION RULES & VALIDATION (POST /api/activities/:id/complete)
    // -------------------------------------------------------------------------
    console.log('\n--- 5. Testing Completion Validation & Finalization ---');
    // Attempt completion with missing required field -> should return 422
    const failCompleteRes = await fetch(`${BASE_URL}/api/activities/act_evening_audit/complete`, {
      method: 'POST',
      headers: { 'x-student-id': 'student_1', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completedSteps: [0, 1],
        answers: {
          q1: 'Only answered question 1'
          // q2 is required and missing
        }
      })
    });
    assert(failCompleteRes.status === 422, 'Incomplete submission blocked by server validation (422 Unprocessable)');

    // Now complete with all required fields
    const successCompleteRes = await fetch(`${BASE_URL}/api/activities/act_evening_audit/complete`, {
      method: 'POST',
      headers: { 'x-student-id': 'student_1', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completedSteps: [0, 1, 2],
        answers: {
          q1: '1. Stayed focused on calculus. 2. Listened empathetically. 3. Avoided notification checking.',
          q2: 'Tomorrow I will practice 15 minutes of quiet reading before bed.'
        }
      })
    });
    const successCompleteData = await successCompleteRes.json();
    assert(successCompleteRes.status === 200, 'POST /api/activities/:id/complete returns 200 OK');
    assert(successCompleteData.activity.status === 'Completed', 'Status updated to "Completed"');
    assert(Boolean(successCompleteData.activity.completedAt), `Completed timestamp recorded: ${successCompleteData.activity.completedAt}`);

    // -------------------------------------------------------------------------
    // 6. TEST RESTRICTED ACTIVITY PERMISSION GATE
    // -------------------------------------------------------------------------
    console.log('\n--- 6. Testing Restricted Activity Access Block ---');
    const restrictedRes = await fetch(`${BASE_URL}/api/activities/act_restricted_mastery`, {
      headers: { 'x-student-id': 'student_1' }
    });
    assert(restrictedRes.status === 403, 'Restricted activity access returns 403 Forbidden');
    const restrictedData = await restrictedRes.json();
    assert(restrictedData.restricted === true, 'Restricted flag returned in 403 response');
    assert(restrictedData.error.includes('Restricted'), 'Helpful prerequisite error message provided');

    console.log('\n===============================================================');
    console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('===============================================================');
  } catch (error) {
    console.error('Test suite failed with unexpected error:', error);
    failed++;
  }
}

runTests();
