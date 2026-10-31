import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { OnboardingProvider } from './context/OnboardingContext';
import { StudentProvider } from './context/StudentContext';

// Pages
import { LandingPage } from './pages/LandingPage';
import { HighOrbitLandingPage } from './pages/HighOrbitLandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ParentDashboardHandoff } from './pages/ParentDashboardHandoff';

// Student Sanctuary System
import { StudentLayout } from './components/student/StudentLayout';
import { StudentDashboardPage } from './pages/student/StudentDashboardPage';
import { StudentAssignmentsPage } from './pages/student/StudentAssignmentsPage';
import { StudentAssignmentDetailsPage } from './pages/student/StudentAssignmentDetailsPage';
import { StudentSubmissionFeedbackPage } from './pages/student/StudentSubmissionFeedbackPage';
import { StudentActivitiesPage } from './pages/student/StudentActivitiesPage';
import { StudentAssessmentPage } from './pages/student/StudentAssessmentPage';
import { StudentPersonalityPage } from './pages/student/StudentPersonalityPage';
import { StudentWellnessPage } from './pages/student/StudentWellnessPage';
import { StudentGrowthPage } from './pages/student/StudentGrowthPage';
import { StudentAchievementsPage } from './pages/student/StudentAchievementsPage';
import { StudentAIStudioPage } from './pages/student/StudentAIStudioPage';
import { StudentNotificationsPage } from './pages/student/StudentNotificationsPage';
import { StudentProfilePage } from './pages/student/StudentProfilePage';
import { StudentSettingsPage } from './pages/student/StudentSettingsPage';
import { StudentHelpPage } from './pages/student/StudentHelpPage';

// Onboarding Pages
import { WelcomePage } from './pages/onboarding/WelcomePage';
import { FamilyProfilePage } from './pages/onboarding/FamilyProfilePage';
import { ChildProfilePage } from './pages/onboarding/ChildProfilePage';
import { AgeSelectionPage } from './pages/onboarding/AgeSelectionPage';
import { InterestsPage } from './pages/onboarding/InterestsPage';
import { GoalsPage } from './pages/onboarding/GoalsPage';
import { AvatarSelectionPage } from './pages/onboarding/AvatarSelectionPage';
import { AccountLinkingPage } from './pages/onboarding/AccountLinkingPage';
import { SuccessPage } from './pages/onboarding/SuccessPage';

// Wrapper for Student Sanctuary
function StudentSanctuaryWrapper() {
  return (
    <StudentProvider>
      <StudentLayout>
        <Outlet />
      </StudentLayout>
    </StudentProvider>
  );
}

export function App() {
  return (
    <OnboardingProvider>
      <Routes>
        {/* A. Public Website & Role-Based Authentication */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/highorbit" element={<HighOrbitLandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* B. Family Onboarding Sequential Flow */}
        <Route path="/onboarding/welcome" element={<WelcomePage />} />
        <Route path="/onboarding/family" element={<FamilyProfilePage />} />
        <Route path="/onboarding/child" element={<ChildProfilePage />} />
        <Route path="/onboarding/age" element={<AgeSelectionPage />} />
        <Route path="/onboarding/interests" element={<InterestsPage />} />
        <Route path="/onboarding/goals" element={<GoalsPage />} />
        <Route path="/onboarding/avatar" element={<AvatarSelectionPage />} />
        <Route path="/onboarding/link" element={<AccountLinkingPage />} />
        <Route path="/onboarding/success" element={<SuccessPage />} />

        {/* C. Parent Portal */}
        <Route path="/parent/dashboard" element={<ParentDashboardHandoff />} />

        {/* D. HighOrbit Student Sanctuary (All 13 Modules) */}
        <Route path="/child" element={<StudentSanctuaryWrapper />}>
          <Route index element={<Navigate to="/child/dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboardPage />} />
          <Route path="assignments" element={<StudentAssignmentsPage />} />
          <Route path="assignments/:assignmentId" element={<StudentAssignmentDetailsPage />} />
          <Route path="assignments/:assignmentId/feedback" element={<StudentSubmissionFeedbackPage />} />
          <Route path="assignments/:assignmentId/status" element={<StudentSubmissionFeedbackPage />} />
          <Route path="assignments/feedback" element={<StudentSubmissionFeedbackPage />} />
          <Route path="activities" element={<StudentActivitiesPage />} />
          <Route path="self-assessment" element={<StudentAssessmentPage />} />
          <Route path="personality" element={<StudentPersonalityPage />} />
          <Route path="wellness" element={<StudentWellnessPage />} />
          <Route path="growth" element={<StudentGrowthPage />} />
          <Route path="achievements" element={<StudentAchievementsPage />} />
          <Route path="ai-studio" element={<StudentAIStudioPage />} />
          <Route path="notifications" element={<StudentNotificationsPage />} />
          <Route path="profile" element={<StudentProfilePage />} />
          <Route path="settings" element={<StudentSettingsPage />} />
          <Route path="help" element={<StudentHelpPage />} />
          <Route path="universe" element={<Navigate to="/child/dashboard" replace />} />
        </Route>

        {/* Student Alias Routes for /student/* */}
        <Route path="/student" element={<Navigate to="/child/dashboard" replace />} />
        <Route path="/student/*" element={<Navigate to="/child/dashboard" replace />} />

        {/* Fallback to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </OnboardingProvider>
  );
}

export default App;
