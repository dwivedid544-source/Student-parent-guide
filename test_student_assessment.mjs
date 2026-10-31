// Automated verification test script for Student Self-Assessment module
// Tests saving, validation, submission, results calculation, ownership authorization, and dependency reporting.

const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('--- STARTING STUDENT SELF-ASSESSMENT MODULE TESTS ---');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // TEST 1: List all assessments
    console.log('\n[1] Testing GET /api/assessments...');
    const listRes = await fetch(`${BASE_URL}/api/assessments?studentId=student_1`, {
      headers: { 'x-student-id': 'student_1' }
    });
    const listData = await listRes.json();
    assert(listRes.status === 200 && listData.success, 'GET /api/assessments returned 200 OK');
    assert(Array.isArray(listData.assessments) && listData.assessments.length >= 4, 'Found at least 4 configured assessments');
    
    const growthAsmt = listData.assessments.find(a => a.id === 'asmt_growth_mindset');
    assert(growthAsmt && growthAsmt.status === 'Completed', 'Growth Mindset assessment is Completed');
    assert(growthAsmt.hasResults === true, 'Growth Mindset assessment indicates hasResults: true');
    assert(Boolean(growthAsmt.estimatedDuration), `Estimated duration displayed: ${growthAsmt.estimatedDuration}`);

    const careerAsmt = listData.assessments.find(a => a.id === 'asmt_career_interest');
    assert(careerAsmt && careerAsmt.missingDependency === true, 'Career assessment reports missingDependency: true');

    // TEST 2: Retrieve assessment details
    console.log('\n[2] Testing GET /api/assessments/:id...');
    const detailRes = await fetch(`${BASE_URL}/api/assessments/asmt_growth_mindset?studentId=student_1`);
    const detailData = await detailRes.json();
    assert(detailRes.status === 200 && detailData.success, 'Loaded asmt_growth_mindset details');
    assert(Array.isArray(detailData.assessment.instructions) && detailData.assessment.instructions.length > 0, 'Contains pre-assessment instructions');
    assert(Array.isArray(detailData.assessment.questions) && detailData.assessment.questions.length === 5, 'Contains 5 configured questions');
    assert(detailData.assessment.questions[0].type === 'single_choice', 'Question 1 is single_choice');
    assert(detailData.assessment.questions[3].type === 'likert_scale', 'Question 4 is likert_scale');
    assert(detailData.assessment.questions[4].type === 'long_text', 'Question 5 is long_text');

    // TEST 3: Save progress
    console.log('\n[3] Testing POST /api/assessments/:id/save-progress...');
    const saveRes = await fetch(`${BASE_URL}/api/assessments/asmt_strengths_inventory/save-progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-student-id': 'student_1' },
      body: JSON.stringify({
        answers: {
          q1: 5,
          q2: 4,
          q3: 4
        }
      })
    });
    const saveData = await saveRes.json();
    assert(saveRes.status === 200 && saveData.success, 'Saved in-progress answers successfully');
    assert(saveData.status === 'In Progress', 'Status preserved as In Progress');
    assert(Boolean(saveData.savedAt), `Saved timestamp recorded: ${saveData.savedAt}`);

    // TEST 4: Validation error on incomplete submission
    console.log('\n[4] Testing POST /api/assessments/:id/submit with missing required fields...');
    const invalidSubmitRes = await fetch(`${BASE_URL}/api/assessments/asmt_learning_styles/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-student-id': 'student_1' },
      body: JSON.stringify({
        answers: {
          q1: 'opt_1'
          // q2 and q3 missing
        }
      })
    });
    const invalidSubmitData = await invalidSubmitRes.json();
    assert(invalidSubmitRes.status === 422, 'Submission rejected with 422 Unprocessable Entity');
    assert(invalidSubmitData.success === false, 'success is false');
    assert(Array.isArray(invalidSubmitData.missingQuestions) && invalidSubmitData.missingQuestions.length >= 2, 'Reports specific missing required questions');

    // TEST 5: Successful submission with scoring rules
    console.log('\n[5] Testing POST /api/assessments/:id/submit with valid complete answers...');
    const validSubmitRes = await fetch(`${BASE_URL}/api/assessments/asmt_learning_styles/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-student-id': 'student_1' },
      body: JSON.stringify({
        answers: {
          q1: 'opt_1',
          q2: 'opt_1',
          q3: 'My ideal study setup has natural daylight from a left window, noise-canceling headphones, and a clean notebook for diagrams.'
        }
      })
    });
    const validSubmitData = await validSubmitRes.json();
    assert(validSubmitRes.status === 200 && validSubmitData.success, 'Valid assessment submitted successfully');
    assert(Boolean(validSubmitData.results), 'Results generated upon submission');
    assert(validSubmitData.results.version === '1.1.0', 'Preserves assessment version: 1.1.0');
    assert(Boolean(validSubmitData.completedAt), `Completion timestamp recorded: ${validSubmitData.completedAt}`);
    assert(Array.isArray(validSubmitData.results.permittedStrengths), 'Contains permitted strengths list');
    assert(Array.isArray(validSubmitData.results.activitySuggestions) && validSubmitData.results.activitySuggestions.length > 0, 'Contains relevant activity suggestions');

    // TEST 6: Get results for completed assessment
    console.log('\n[6] Testing GET /api/assessments/:id/results...');
    const resultsRes = await fetch(`${BASE_URL}/api/assessments/asmt_learning_styles/results?studentId=student_1`);
    const resultsData = await resultsRes.json();
    assert(resultsRes.status === 200 && resultsData.success, 'Retrieved assessment results');
    assert(resultsData.results.archetype.includes('Visual') || resultsData.results.archetype.includes('Morning'), `Calculated Archetype: ${resultsData.results.archetype}`);
    assert(Array.isArray(resultsData.results.reflectionPrompts) && resultsData.results.reflectionPrompts.length > 0, 'Provides deep reflection prompts');

    // TEST 7: Retake option where permitted
    console.log('\n[7] Testing POST /api/assessments/:id/retake...');
    const retakeRes = await fetch(`${BASE_URL}/api/assessments/asmt_learning_styles/retake`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-student-id': 'student_1' }
    });
    const retakeData = await retakeRes.json();
    assert(retakeRes.status === 200 && retakeData.success, 'Assessment reset for retake');
    assert(retakeData.assessment.status === 'Not Started', 'Status reset to Not Started');

    // TEST 8: Dependency reporting on unconfigured assessment
    console.log('\n[8] Testing dependency reporting for missing assessment content...');
    const depRes = await fetch(`${BASE_URL}/api/assessments/asmt_career_interest?studentId=student_1`);
    const depData = await depRes.json();
    assert(depRes.status === 422, 'Returns 422 for missing dependency module');
    assert(depData.missingDependency === true, 'Reports missingDependency: true');
    assert(depData.error.includes('Curriculum configuration pending'), `Dependency message reported: "${depData.error}"`);

    // TEST 9: Authorization ownership verification
    console.log('\n[9] Testing student ownership verification (unauthorized access)...');
    const authRes = await fetch(`${BASE_URL}/api/assessments/asmt_growth_mindset`, {
      headers: { 'x-student-id': 'forbidden_user' }
    });
    const authData = await authRes.json();
    assert(authRes.status === 403, 'Returns 403 Forbidden for unauthorized student account');
    assert(authData.success === false, 'Access forbidden');

    console.log(`\n========================================`);
    console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
    console.log(`========================================\n`);

    if (failed > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Fatal test execution error:', error);
    process.exit(1);
  }
}

runTests();
