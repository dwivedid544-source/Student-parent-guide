// Comprehensive Automated Test Suite for Student Submission Status and Feedback Workflow
// Tests all 4 supported statuses, authorization guards, feedback availability, and parent review compatibility

const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('===============================================================');
  console.log('TEST SUITE: STUDENT SUBMISSION STATUS & FEEDBACK PAGE');
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
    // 1. TEST RETRIEVAL OF AUTHORIZED ASSIGNMENTS & SUBMISSION RECORDS
    // -------------------------------------------------------------------------
    console.log('--- 1. Testing Authorized Submissions Retrieval ---');
    const getRes = await fetch(`${BASE_URL}/api/assignments`, {
      headers: { 'x-student-id': 'student_1' }
    });
    const getData = await getRes.json();
    assert(getRes.status === 200, 'Server returns 200 OK for authorized student');
    assert(Array.isArray(getData.assignments), 'Assignments array returned');

    // -------------------------------------------------------------------------
    // 2. TEST STATUS 1: "Submitted" (asg_4)
    // -------------------------------------------------------------------------
    console.log('\n--- 2. Testing Status: "Submitted" (asg_4) ---');
    const asg4 = getData.assignments.find((a) => a.id === 'asg_4');
    assert(asg4 !== undefined, 'asg_4 found');
    assert(asg4.status === 'Submitted', 'asg_4 status is "Submitted"');
    assert(asg4.submission !== null && asg4.submission !== undefined, 'Submission date & answers exist for asg_4');
    assert(asg4.feedback === null || asg4.feedback === undefined, 'Reviewer feedback is NOT invented (feedback is null/absent)');

    // Test that resubmitting a "Submitted" assignment is rejected (409 Conflict)
    const resubmitSubmittedRes = await fetch(`${BASE_URL}/api/assignments/asg_4/submit`, {
      method: 'POST',
      headers: { 'x-student-id': 'student_1', 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: { q1: 'Illegal edit' }, activityConfirmed: true })
    });
    assert(resubmitSubmittedRes.status === 409, 'Resubmission blocked for status "Submitted" (409 Conflict)');

    // -------------------------------------------------------------------------
    // 3. TEST STATUS 2: "Under Review" (asg_6)
    // -------------------------------------------------------------------------
    console.log('\n--- 3. Testing Status: "Under Review" (asg_6) ---');
    const asg6 = getData.assignments.find((a) => a.id === 'asg_6');
    assert(asg6 !== undefined, 'asg_6 found');
    assert(asg6.status === 'Under Review', 'asg_6 status is "Under Review"');
    assert(asg6.reviewer && asg6.reviewer.includes('Sarah Jenkins'), `Reviewer assigned: "${asg6.reviewer}"`);
    assert(asg6.feedback === null, 'Reviewer feedback is strictly null (never invented while review is in progress)');

    // Test that resubmitting an "Under Review" assignment is rejected (409 Conflict)
    const resubmitUnderReviewRes = await fetch(`${BASE_URL}/api/assignments/asg_6/submit`, {
      method: 'POST',
      headers: { 'x-student-id': 'student_1', 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: { q1: 'Illegal edit under review' }, activityConfirmed: true })
    });
    assert(resubmitUnderReviewRes.status === 409, 'Resubmission blocked for status "Under Review" (409 Conflict)');

    // -------------------------------------------------------------------------
    // 4. TEST STATUS 3: "Completed" (asg_3)
    // -------------------------------------------------------------------------
    console.log('\n--- 4. Testing Status: "Completed" (asg_3) ---');
    const asg3 = getData.assignments.find((a) => a.id === 'asg_3');
    assert(asg3 !== undefined, 'asg_3 found');
    assert(asg3.status === 'Completed', 'asg_3 status is "Completed"');
    assert(asg3.feedback !== null, 'Reviewer feedback is available for completed assignment');
    assert(typeof asg3.feedback.author === 'string', `Feedback author present: "${asg3.feedback.author}"`);
    assert(typeof asg3.feedback.date === 'string', `Review date present: "${asg3.feedback.date}"`);
    assert(typeof asg3.feedback.comment === 'string', `Mentor comments present: "${asg3.feedback.comment}"`);

    // Test that resubmitting a "Completed" assignment is rejected (409 Conflict)
    const resubmitCompletedRes = await fetch(`${BASE_URL}/api/assignments/asg_3/submit`, {
      method: 'POST',
      headers: { 'x-student-id': 'student_1', 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: { q1: 'Illegal edit completed' }, activityConfirmed: true })
    });
    assert(resubmitCompletedRes.status === 409, 'Resubmission blocked for status "Completed" (409 Conflict)');

    // -------------------------------------------------------------------------
    // 5. TEST STATUS 4: "Needs Revision" & RESUBMISSION (asg_5)
    // -------------------------------------------------------------------------
    console.log('\n--- 5. Testing Status: "Needs Revision" & Permitted Resubmission (asg_5) ---');
    const asg5 = getData.assignments.find((a) => a.id === 'asg_5');
    assert(asg5 !== undefined, 'asg_5 found');
    assert(asg5.status === 'Needs Revision', 'asg_5 status is "Needs Revision"');
    assert(asg5.feedback !== null, 'Feedback object present');
    assert(Boolean(asg5.feedback.revisionInstructions), `Revision instructions present: "${asg5.feedback.revisionInstructions}"`);
    assert(Array.isArray(asg5.submissionHistory) && asg5.submissionHistory.length > 0, 'Submission history is preserved');

    // Test that resubmission IS PERMITTED for "Needs Revision" with valid answers addressing revision instructions
    const resubmitRevisionRes = await fetch(`${BASE_URL}/api/assignments/asg_5/submit`, {
      method: 'POST',
      headers: { 'x-student-id': 'student_1', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answers: {
          q1: 'Academic Excellence & STEM Mastery',
          q2: 'Complete 35 practice calculus problems per week with >85% accuracy',
          q3: 'I have revised my schedule into 90-minute morning study blocks. I will read Atomic Habits and Deep Work for personal growth, and perform weekly milestone audits every Sunday with milestone checkpoints.'
        },
        activityConfirmed: true
      })
    });
    const resubmitRevisionData = await resubmitRevisionRes.json();
    assert(resubmitRevisionRes.status === 200, 'Resubmission PERMITTED for status "Needs Revision" (200 OK)');
    assert(resubmitRevisionData.assignment.status === 'Submitted', 'Status updated from "Needs Revision" to "Submitted"');
    assert(resubmitRevisionData.assignment.submission.version >= 2, `Version incremented to: ${resubmitRevisionData.assignment.submission.version}`);
    assert(resubmitRevisionData.assignment.submissionHistory.length >= 2, 'Submission history preserved both attempts');

    // -------------------------------------------------------------------------
    // 6. TEST SECURITY GUARD: CROSS-STUDENT ACCESS RESTRICTION
    // -------------------------------------------------------------------------
    console.log('\n--- 6. Testing Cross-Student Authorization Denial (asg_restricted) ---');
    const crossStudentRes = await fetch(`${BASE_URL}/api/assignments/asg_restricted`, {
      headers: { 'x-student-id': 'student_1' }
    });
    assert(crossStudentRes.status === 403, 'Cross-student access returns 403 Forbidden');
    const crossStudentData = await crossStudentRes.json();
    assert(crossStudentData.error.includes('authorized') || crossStudentData.error.includes('denied'), 'Security denial error message verified');

    // -------------------------------------------------------------------------
    // 7. TEST PARENT / MENTOR REVIEW COMPATIBILITY (POST /api/assignments/:id/review)
    // -------------------------------------------------------------------------
    console.log('\n--- 7. Testing Parent / Reviewer Workflow Compatibility ---');
    // Reviewer updates asg_5 (which was just resubmitted to 'Submitted') to 'Under Review'
    const reviewUnderReviewRes = await fetch(`${BASE_URL}/api/assignments/asg_5/review`, {
      method: 'POST',
      headers: { 'x-student-id': 'student_1', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'Under Review',
        reviewer: 'Alex McWonder (Parent Reviewer)'
      })
    });
    const reviewUnderReviewData = await reviewUnderReviewRes.json();
    assert(reviewUnderReviewRes.status === 200, 'Parent review API returns 200 OK for "Under Review" transition');
    assert(reviewUnderReviewData.assignment.status === 'Under Review', 'Assignment status transitioned to "Under Review"');
    assert(reviewUnderReviewData.assignment.feedback === null, 'Feedback remains null while in "Under Review"');

    // Now parent completes review with feedback & sets status to 'Completed'
    const reviewCompleteRes = await fetch(`${BASE_URL}/api/assignments/asg_5/review`, {
      method: 'POST',
      headers: { 'x-student-id': 'student_1', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'Completed',
        reviewer: 'Alex McWonder (Parent Reviewer)',
        feedback: {
          author: 'Alex McWonder (Parent Reviewer)',
          date: 'Oct 31, 2026',
          role: 'Parent Reviewer & Mentor',
          comment: 'Outstanding improvements made to peer pressure reflections. You showed genuine moral conviction.',
          revisionInstructions: null
        }
      })
    });
    const reviewCompleteData = await reviewCompleteRes.json();
    assert(reviewCompleteRes.status === 200, 'Parent review API returns 200 OK for "Completed" transition');
    assert(reviewCompleteData.assignment.status === 'Completed', 'Assignment status transitioned to "Completed"');
    assert(reviewCompleteData.assignment.feedback.comment.includes('Outstanding improvements'), 'Reviewer comments correctly stored on server');

    // Reset asg_5 back to Needs Revision for repeatable user demos
    await fetch(`${BASE_URL}/api/assignments/asg_5/review`, {
      method: 'POST',
      headers: { 'x-student-id': 'student_1', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'Needs Revision',
        reviewer: 'Sarah Jenkins',
        feedback: {
          author: 'Sarah Jenkins',
          date: 'Oct 29, 2026',
          role: 'Senior Values Advisor',
          comment: 'You provided a good initial reflection on handling social pressure, but you need more specific real-life examples.',
          revisionInstructions: '1. Please expand on Question 2 by citing a concrete situation where you encountered peer pressure.\n2. Detail what coping strategy or boundary you deployed and what outcome resulted.'
        }
      })
    });
    console.log('[INFO] asg_5 reset to "Needs Revision" for interactive user testing');

    console.log('\n===============================================================');
    console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('===============================================================');
  } catch (error) {
    console.error('Test suite failed with unexpected error:', error);
    failed++;
  }
}

runTests();
