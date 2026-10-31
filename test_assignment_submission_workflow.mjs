// Test Suite for Student Assignment Submission Workflow
// Tests server-authoritative submission, authorization, duplicate prevention, validation, and file checks

import {
  handleAssignmentSubmission,
  handleSaveDraft,
  verifyServerAuth,
  resetServerAssignments,
  getServerAssignments
} from './src/server/assignmentBackend.js';

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  } else {
    console.log(`✅ PASSED: ${message}`);
    passedTests++;
  }
}

async function runTests() {
  console.log('\n--- STARTING ASSIGNMENT SUBMISSION WORKFLOW TEST SUITE ---\n');

  // Test 1: Server Authentication Verification
  console.log('--- TEST 1: SERVER AUTHENTICATION ---');
  {
    // 1.1: Missing x-student-id header
    const mockReqMissing = { headers: {} };
    const auth1 = verifyServerAuth(mockReqMissing);
    assert(!auth1.authenticated && auth1.status === 401, 'Rejects request with missing x-student-id header (401)');

    // 1.2: Unknown student id
    const mockReqUnknown = { headers: { 'x-student-id': 'hacker_student_999' } };
    const auth2 = verifyServerAuth(mockReqUnknown);
    assert(!auth2.authenticated && auth2.status === 401, 'Rejects unknown student ID (401)');

    // 1.3: Valid authenticated student
    const mockReqValid = { headers: { 'x-student-id': 'student_1' } };
    const auth3 = verifyServerAuth(mockReqValid);
    assert(auth3.authenticated && auth3.studentId === 'student_1', 'Authenticates valid student_1');
  }

  // Test 2: Server Ownership Verification
  console.log('\n--- TEST 2: ASSIGNMENT OWNERSHIP ---');
  {
    // Try to submit with different student ID (student_2) to an assignment owned by student_1
    // (Simulate an attempt to forge another student's assignment)
    const resultForbidden = handleAssignmentSubmission('asg_1', 'student_2', {
      answers: { q1: 'Option', q2: 'Answer', q3: 'Reflection long enough' },
      activityConfirmed: true
    });
    // Even if student_2 was somehow authenticated, server checks ownership
    assert(resultForbidden.status === 403, 'Rejects submission if studentId does not own the assignment (403 Forbidden)');
  }

  // Test 3: Validation of Required Fields & Question Types
  console.log('\n--- TEST 3: VALIDATION OF REQUIRED FIELDS & TYPES ---');
  {
    resetServerAssignments();

    // 3.1: Missing activity completion confirmation
    const resNoActivity = handleAssignmentSubmission('asg_1', 'student_1', {
      answers: {
        q1: 'Intellectual Curiosity (Seeking depth over superficial speed)',
        q2: 'Integrity and Compassionate Empathy',
        q3: 'A well thought out reflection that describes a concrete moment of pressure and how core values guided decisions through study sprints.'
      },
      activityConfirmed: false
    });
    assert(resNoActivity.status === 400 && resNoActivity.body.error.includes('Activity Confirmation Required'), 'Requires activity completion confirmation (400)');

    // 3.2: Missing required questions
    const resMissingQuestions = handleAssignmentSubmission('asg_1', 'student_1', {
      answers: {
        q1: '', // missing
        q2: '   ' // whitespace only
        // q3 missing completely
      },
      activityConfirmed: true
    });
    assert(resMissingQuestions.status === 400 && resMissingQuestions.body.validationErrors.length >= 3, 'Detects multiple missing required questions (400)');

    // 3.3: Invalid single_choice option
    const resInvalidChoice = handleAssignmentSubmission('asg_1', 'student_1', {
      answers: {
        q1: 'Non_Existent_Random_Option_123',
        q2: 'Valid secondary value',
        q3: 'A long reflective response that meets the word count requirement for this question.'
      },
      activityConfirmed: true
    });
    assert(resInvalidChoice.status === 400 && resInvalidChoice.body.validationErrors.some(e => e.includes('invalid selection')), 'Rejects unconfigured option for single_choice question (400)');

    // 3.4: Word count threshold violation for personal reflection
    const resWordCountFail = handleAssignmentSubmission('asg_1', 'student_1', {
      answers: {
        q1: 'Intellectual Curiosity (Seeking depth over superficial speed)',
        q2: 'Integrity',
        q3: 'Too short.' // only 2 words, requires 15
      },
      activityConfirmed: true
    });
    assert(resWordCountFail.status === 400 && resWordCountFail.body.validationErrors.some(e => e.includes('requires at least 15 words')), 'Enforces reflection minimum word count threshold (400)');
  }

  // Test 4: File Upload Validation (Type and Size)
  console.log('\n--- TEST 4: FILE UPLOAD VALIDATION ---');
  {
    resetServerAssignments();

    // 4.1: Unsupported MIME type (e.g. .exe or .sh)
    const resBadMime = handleAssignmentSubmission('asg_1', 'student_1', {
      answers: {
        q1: 'Intellectual Curiosity (Seeking depth over superficial speed)',
        q2: 'Integrity',
        q3: 'A reflective response that explains how intellectual curiosity guided my daily study habits through the semester.'
      },
      activityConfirmed: true,
      attachedFile: {
        name: 'script.exe',
        type: 'application/x-msdownload',
        size: 1024
      }
    });
    assert(resBadMime.status === 415, 'Rejects unsupported file type with 415 Unsupported Media Type');

    // 4.2: File size exceeding limit (> 5MB)
    const resOversized = handleAssignmentSubmission('asg_1', 'student_1', {
      answers: {
        q1: 'Intellectual Curiosity (Seeking depth over superficial speed)',
        q2: 'Integrity',
        q3: 'A reflective response that explains how intellectual curiosity guided my daily study habits through the semester.'
      },
      activityConfirmed: true,
      attachedFile: {
        name: 'massive_scan.pdf',
        type: 'application/pdf',
        size: 7 * 1024 * 1024 // 7MB > 5MB limit
      }
    });
    assert(resOversized.status === 413, 'Rejects file exceeding 5MB with 413 Payload Too Large');

    // 4.3: Valid PDF upload
    const resValidFile = handleAssignmentSubmission('asg_1', 'student_1', {
      answers: {
        q1: 'Intellectual Curiosity (Seeking depth over superficial speed)',
        q2: 'Integrity',
        q3: 'A reflective response that explains how intellectual curiosity guided my daily study habits through the semester.'
      },
      activityConfirmed: true,
      attachedFile: {
        name: 'values_worksheet.pdf',
        type: 'application/pdf',
        size: 1.2 * 1024 * 1024
      }
    });
    assert(resValidFile.status === 200 && resValidFile.body.submission.attachedFile.name === 'values_worksheet.pdf', 'Accepts valid PDF file upload within size limit (200)');
  }

  // Test 5: Successful Initial Submission & Timestamp Recording
  console.log('\n--- TEST 5: SUCCESSFUL INITIAL SUBMISSION ---');
  {
    // Use fresh assignment asg_2 (Pending)
    const asg2Result = handleAssignmentSubmission('asg_2', 'student_1', {
      answers: {
        q1: 'Early Morning (6:00 AM – 9:00 AM)',
        q2: 'Smartphone & social notifications',
        q3: 'I logged my focus hours over 4 days and observed that early morning uninterrupted blocks yield 3x higher retention than late evening sessions.'
      },
      activityConfirmed: true
    });

    assert(asg2Result.status === 200, 'Submits fresh assignment successfully with 200 OK');
    assert(asg2Result.body.assignment.status === 'Submitted', 'Transitions assignment status to "Submitted"');
    assert(asg2Result.body.submission.submittedAt && asg2Result.body.submission.submittedAtIso, 'Records server submission timestamp in both formatted and ISO format');
    assert(asg2Result.body.submission.version === 1, 'Records submission version 1');
  }

  // Test 6: Duplicate Submission Prevention
  console.log('\n--- TEST 6: PREVENT DUPLICATE SUBMISSIONS ---');
  {
    // asg_2 is now Submitted! Attempting to submit it again should be rejected with 409 Conflict
    const resDuplicate = handleAssignmentSubmission('asg_2', 'student_1', {
      answers: {
        q1: 'Early Morning (6:00 AM – 9:00 AM)',
        q2: 'Smartphone & social notifications',
        q3: 'Attempting to duplicate submit.'
      },
      activityConfirmed: true
    });
    assert(resDuplicate.status === 409 && resDuplicate.body.error.includes('already submitted'), 'Rejects duplicate submission on already submitted assignment (409 Conflict)');

    // asg_3 is Completed. Attempting to submit should also be rejected
    const resCompleted = handleAssignmentSubmission('asg_3', 'student_1', {
      answers: { q1: 'Trigger', q2: '4-7-8 Relaxing Breath', q3: 'Summary' },
      activityConfirmed: true
    });
    assert(resCompleted.status === 409 && resCompleted.body.error.includes('Completed'), 'Rejects resubmission on Completed/Graded assignment (409 Conflict)');
  }

  // Test 7: Authorized Resubmission for 'Needs Revision'
  console.log('\n--- TEST 7: AUTHORIZED RESUBMISSION (Needs Revision) ---');
  {
    // asg_5 has status 'Needs Revision'
    const resRevision = handleAssignmentSubmission('asg_5', 'student_1', {
      answers: {
        q1: 'Academic Excellence & STEM Mastery',
        q2: 'Complete 35 calculus problems and two timed 45-minute physics sprints weekly',
        q3: 'Revised milestones: Week 1 focuses on integral calculus limits, Week 2 on mechanics kinematics. Prepared contingencies for exam week schedule conflicts.'
      },
      activityConfirmed: true
    });
    assert(resRevision.status === 200, 'Authorizes resubmission for assignment with "Needs Revision" status (200 OK)');
    assert(resRevision.body.submission.isResubmission === true, 'Marks submission as isResubmission: true');
    assert(resRevision.body.submission.version === 2, 'Increments submission version to Version 2');
    assert(resRevision.body.assignment.status === 'Submitted', 'Transitions status back to "Submitted" for mentor re-evaluation');
  }

  // Test 8: Save Progress Draft API
  console.log('\n--- TEST 8: SAVE DRAFT API ---');
  {
    const resDraft = handleSaveDraft('asg_1', 'student_1', {
      answers: {
        q1: 'Relentless Growth (Viewing setbacks as informative data)',
        q2: 'Systematic Curiosity'
      },
      activityConfirmed: true
    });
    assert(resDraft.status === 200 && resDraft.body.success, 'Saves draft progress successfully (200 OK)');
    assert(resDraft.body.draftAnswers.q2 === 'Systematic Curiosity', 'Persists draft answers on server');
  }

  console.log(`\n======================================================`);
  console.log(`ALL TESTS PASSED: ${passedTests} / ${totalTests} assertions verified!`);
  console.log(`======================================================\n`);
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
