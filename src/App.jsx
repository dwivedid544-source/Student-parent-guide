import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { OnboardingProvider } from './context/OnboardingContext';

// Pages
import { LandingPage } from './pages/LandingPage';
import { HighOrbitLandingPage } from './pages/HighOrbitLandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ParentDashboardHandoff } from './pages/ParentDashboardHandoff';
import { ChildDashboardHandoff } from './pages/ChildDashboardHandoff';

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

        {/* C. Role-Based Destination Handoffs */}
        <Route path="/parent/dashboard" element={<ParentDashboardHandoff />} />
        <Route path="/child/dashboard" element={<ChildDashboardHandoff />} />
        <Route path="/child/universe" element={<Navigate to="/child/dashboard" replace />} />

        {/* Fallback to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </OnboardingProvider>
  );
}

export default App;
