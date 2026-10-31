// Automated verification test script for Student Personality module
// Tests viewing, editing, saving, authorization, and assessment derivation.

const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('--- STARTING STUDENT PERSONALITY MODULE TESTS ---');
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
    // TEST 1: Retrieve authorized personality profile
    console.log('\n[1] Testing GET /api/personality for authorized student (student_1)...');
    const getRes = await fetch(`${BASE_URL}/api/personality?studentId=student_1`, {
      headers: { 'x-student-id': 'student_1' }
    });
    const getData = await getRes.json();
    assert(getRes.status === 200 && getData.success, 'GET /api/personality returned 200 OK');
    const profile = getData.profile;
    assert(profile.studentId === 'student_1', 'Profile matches authenticated student ID');

    // TEST 2: Verify self-reported sections exist
    console.log('\n[2] Verifying self-reported sections exist and contain authorized data...');
    assert(Array.isArray(profile.selfReported.interests) && profile.selfReported.interests.length > 0, 'Self-reported interests array loaded');
    assert(Array.isArray(profile.selfReported.thingsIEnjoy) && profile.selfReported.thingsIEnjoy.length > 0, 'Things I Enjoy array loaded');
    assert(Boolean(profile.selfReported.learningPreferences?.studyEnvironment), 'Learning preferences loaded with study environment');
    assert(Array.isArray(profile.selfReported.personalGoals) && profile.selfReported.personalGoals.length > 0, 'Personal goals loaded');
    assert(Array.isArray(profile.selfReported.reflections) && profile.selfReported.reflections.length > 0, 'Reflections loaded');

    // TEST 3: Verify assessment-derived sections exist and are distinguished
    console.log('\n[3] Verifying assessment-derived summary is distinguished...');
    assert(profile.assessmentDerived.hasAssessmentResults === true, 'Assessment results indicated as available');
    assert(Boolean(profile.assessmentDerived.archetype), `Assessment archetype loaded: "${profile.assessmentDerived.archetype}"`);
    assert(Array.isArray(profile.assessmentDerived.validatedStrengths) && profile.assessmentDerived.validatedStrengths.length > 0, 'Assessment validated strengths loaded');
    assert(Boolean(profile.assessmentDerived.assessmentCompletedAt), `Assessment completion date preserved: ${profile.assessmentDerived.assessmentCompletedAt}`);
    assert(Boolean(profile.assessmentDerived.assessmentVersion), `Assessment version preserved: ${profile.assessmentDerived.assessmentVersion}`);

    // TEST 4: Verify suggested activities are linked
    console.log('\n[4] Verifying suggested activities from activity backend...');
    assert(Array.isArray(profile.suggestedActivities) && profile.suggestedActivities.length > 0, 'Suggested activities loaded');
    const firstAct = profile.suggestedActivities[0];
    assert(Boolean(firstAct.title && firstAct.category && firstAct.link), `Activity card structured properly: "${firstAct.title}" (${firstAct.category})`);

    // TEST 5: Update permitted fields (Interests, Things I Enjoy, Goals, Preferences)
    console.log('\n[5] Testing PUT /api/personality with valid updates to permitted fields...');
    const updatedInterests = [...profile.selfReported.interests, 'Space & Astrophysics'];
    const updatedThingsIEnjoy = [...profile.selfReported.thingsIEnjoy, 'Stargazing with telescope'];
    const updatedGoals = [
      ...profile.selfReported.personalGoals,
      { id: 'goal_new', title: 'Complete Stoic Reflection Challenge', category: 'Mindset', targetDate: 'Nov 2026', completed: false }
    ];
    const updatedPreferences = {
      ...profile.selfReported.learningPreferences,
      soundPreference: 'Binaural beats and rain sounds'
    };

    const updateRes = await fetch(`${BASE_URL}/api/personality`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-student-id': 'student_1'
      },
      body: JSON.stringify({
        interests: updatedInterests,
        thingsIEnjoy: updatedThingsIEnjoy,
        personalGoals: updatedGoals,
        learningPreferences: updatedPreferences
      })
    });
    const updateData = await updateRes.json();
    assert(updateRes.status === 200 && updateData.success, 'PUT /api/personality successfully saved updates');
    assert(updateData.profile.selfReported.interests.includes('Space & Astrophysics'), 'Updated interests persisted');
    assert(updateData.profile.selfReported.thingsIEnjoy.includes('Stargazing with telescope'), 'Updated Things I Enjoy persisted');
    assert(updateData.profile.selfReported.learningPreferences.soundPreference === 'Binaural beats and rain sounds', 'Updated learning preference persisted');
    assert(updateData.profile.selfReported.personalGoals.some(g => g.id === 'goal_new'), 'New personal goal persisted');

    // TEST 6: Reject modification of read-only assessment-generated fields
    console.log('\n[6] Testing security rejection of attempts to tamper with assessment-generated fields...');
    const tamperRes = await fetch(`${BASE_URL}/api/personality`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-student-id': 'student_1'
      },
      body: JSON.stringify({
        archetype: 'Invented Fake Super-Genius Archetype',
        overallIndex: 100
      })
    });
    const tamperData = await tamperRes.json();
    assert(tamperRes.status === 400, 'Rejected with 400 Bad Request');
    assert(tamperData.success === false, 'success is false');
    assert(tamperData.error.includes('assessment-generated and cannot be manually modified'), `Security message returned: "${tamperData.error}"`);

    // TEST 7: Cross-student authorization blocking
    console.log('\n[7] Testing authorization barrier for unauthorized student access...');
    const unauthorizedRes = await fetch(`${BASE_URL}/api/personality`, {
      headers: { 'x-student-id': 'forbidden_user' }
    });
    const unauthorizedData = await unauthorizedRes.json();
    assert(unauthorizedRes.status === 403, 'Returns 403 Forbidden on unauthorized student account');
    assert(unauthorizedData.success === false, 'Access forbidden');

    console.log(`\n========================================`);
    console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
    console.log(`========================================\n`);

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Fatal test error:', err);
    process.exit(1);
  }
}

runTests();
