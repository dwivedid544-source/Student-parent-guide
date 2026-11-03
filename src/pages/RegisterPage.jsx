import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Check, ArrowRight, Loader2, Sparkles, KeyRound } from 'lucide-react';
import { AuthLayout } from '../components/common/AuthLayout';
import { FormInput } from '../components/common/FormInput';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { useOnboarding } from '../context/OnboardingContext';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerParent, registerStudent } = useOnboarding();

  // Active Role Tab: 'PARENT' | 'STUDENT'
  const [activeTab, setActiveTab] = useState('PARENT');

  // Parent Form State
  const [parentFormData, setParentFormData] = useState({
    fullName: 'Sarah Jenkins',
    email: 'sarah.jenkins@gmail.com',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
  });

  // Student Form State
  const [studentFormData, setStudentFormData] = useState({
    fullName: 'Alex Parker',
    email: 'alex.parker@college.edu',
    grade: 'Grade 11 / College Prep',
    password: '',
    confirmPassword: '',
    familyKey: '',
    agreeTerms: true,
  });

  const [errors, setErrors] = useState({});
  const [studentErrors, setStudentErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleParentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setParentFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleStudentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudentFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (studentErrors[name]) {
      setStudentErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Demo auto-filler
  const fillDemoCredentials = () => {
    if (activeTab === 'PARENT') {
      setParentFormData({
        fullName: 'Sarah Jenkins',
        email: 'sarah.jenkins@gmail.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        agreeTerms: true,
      });
      setErrors({});
    } else {
      setStudentFormData({
        fullName: 'Alex Parker',
        email: 'alex.parker@college.edu',
        grade: 'Grade 11 / College Prep',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        familyKey: 'ORBIT-7489',
        agreeTerms: true,
      });
      setStudentErrors({});
    }
  };

  const validateParent = () => {
    const newErrors = {};
    if (!parentFormData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!parentFormData.email.trim()) newErrors.email = 'Email is required';
    if (!parentFormData.password) newErrors.password = 'Password required';
    else if (parentFormData.password.length < 6) newErrors.password = 'Min 6 chars';
    if (parentFormData.password !== parentFormData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!parentFormData.agreeTerms) newErrors.agreeTerms = 'Please agree to terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStudent = () => {
    const newErrors = {};
    if (!studentFormData.fullName.trim()) newErrors.fullName = 'Student name is required';
    if (!studentFormData.email.trim()) newErrors.email = 'Email is required';
    if (!studentFormData.password) newErrors.password = 'Password required';
    else if (studentFormData.password.length < 6) newErrors.password = 'Min 6 chars';
    if (studentFormData.password !== studentFormData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!studentFormData.agreeTerms) newErrors.agreeTerms = 'Please agree to terms';

    setStudentErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleParentSubmit = (e) => {
    e.preventDefault();
    if (!validateParent()) return;
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      registerParent({
        name: parentFormData.fullName,
        email: parentFormData.email,
      });
      setSuccessMsg('Family Account Created! Launching Onboarding...');
      setTimeout(() => navigate('/onboarding/welcome'), 600);
    }, 500);
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (!validateStudent()) return;
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      registerStudent({
        name: studentFormData.fullName,
        email: studentFormData.email,
        grade: studentFormData.grade,
        familyKey: studentFormData.familyKey,
      });
      setSuccessMsg('Student Account Created! Entering Sanctuary...');
      setTimeout(() => navigate('/child/dashboard'), 600);
    }, 500);
  };

  return (
    <AuthLayout
      heading={
        <>
          Begin Your <span className="bg-gradient-to-r from-primary via-primary-container to-secondary-container bg-clip-text text-transparent font-bold">HighOrbit Journey.</span>
        </>
      }
      subheading="Create your account and take the first step towards meaningful growth."
      description={
        activeTab === 'PARENT'
          ? 'Guide your students, review permitted development insights, and share growth.'
          : 'Track habits, reflect on feelings in privacy, and build emotional independence.'
      }
      cardTitle=""
    >
      <div className="flex flex-col gap-2.5">
        
        {/* Header Title with 1-Click Demo Pill */}
        <div className="flex items-center justify-between pb-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
              Create Account
            </h2>
            <p className="text-[11px] text-on-surface-variant font-medium">
              {activeTab === 'PARENT' ? 'Master Parent / Family Account' : 'Student Sanctuary Space'}
            </p>
          </div>

          <button
            type="button"
            onClick={fillDemoCredentials}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold text-primary bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-all cursor-pointer shadow-2xs hover:scale-105"
            title="Auto-fill sample data"
          >
            <Sparkles className="w-3 h-3 text-primary" />
            <span>Demo Data</span>
          </button>
        </div>

        {/* Role Selection Tabs - Sleek Frosted Pill */}
        <div className="p-1 rounded-2xl highorbit-glass-tile flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab('PARENT');
              setErrors({});
              setStudentErrors({});
              setSuccessMsg('');
            }}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'PARENT'
                ? 'bg-gradient-to-r from-primary to-primary-container text-white shadow-sm shadow-primary/25'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-white/40'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Parent Account</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('STUDENT');
              setErrors({});
              setStudentErrors({});
              setSuccessMsg('');
            }}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'STUDENT'
                ? 'bg-gradient-to-r from-primary to-primary-container text-white shadow-sm shadow-primary/25'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-white/40'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Student Account</span>
          </button>
        </div>

        {/* Success message banner */}
        {successMsg && (
          <div className="p-2 rounded-xl bg-gradient-to-r from-primary-fixed/90 to-secondary-fixed/60 border border-white/80 text-primary text-xs font-semibold flex items-center gap-2 backdrop-blur-md shadow-2xs animate-fadeIn">
            <Check className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* ─── PARENT REGISTRATION FORM ─── */}
        {activeTab === 'PARENT' && (
          <form onSubmit={handleParentSubmit} className="flex flex-col gap-2">
            <FormInput
              label="Full Name"
              type="text"
              name="fullName"
              value={parentFormData.fullName}
              onChange={handleParentChange}
              placeholder="e.g. Sarah Jenkins"
              error={errors.fullName}
              required
              autoComplete="name"
            />

            <FormInput
              label="Email Address"
              type="email"
              name="email"
              value={parentFormData.email}
              onChange={handleParentChange}
              placeholder="e.g. sarah.jenkins@gmail.com"
              error={errors.email}
              required
              autoComplete="email"
            />

            {/* Passwords in 2-Column Grid */}
            <div className="grid grid-cols-2 gap-2">
              <FormInput
                label="Password"
                type="password"
                name="password"
                value={parentFormData.password}
                onChange={handleParentChange}
                placeholder="••••••••"
                error={errors.password}
                required
                autoComplete="new-password"
              />
              <FormInput
                label="Confirm"
                type="password"
                name="confirmPassword"
                value={parentFormData.confirmPassword}
                onChange={handleParentChange}
                placeholder="••••••••"
                error={errors.confirmPassword}
                required
                autoComplete="new-password"
              />
            </div>

            {/* Terms Agreement */}
            <label className="flex items-center gap-2 cursor-pointer text-[11px] text-on-surface-variant select-none pt-0.5">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={parentFormData.agreeTerms}
                onChange={handleParentChange}
                className="w-3.5 h-3.5 rounded text-primary border-primary/30 focus:ring-0 cursor-pointer accent-primary shrink-0"
              />
              <span>I agree to HighOrbit <span className="underline font-semibold text-on-surface">Family Terms</span> &amp; <span className="underline font-semibold text-on-surface">Privacy</span>.</span>
            </label>
            {errors.agreeTerms && (
              <span className="text-red-600 text-[10px] pl-5">{errors.agreeTerms}</span>
            )}

            {/* Submit Button */}
            <div className="pt-1">
              <PrimaryButton type="submit" disabled={isLoading} className="w-full py-2.5 text-xs sm:text-sm">
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Creating Account...</span>
                  </span>
                ) : (
                  <span>Create Parent Account →</span>
                )}
              </PrimaryButton>
            </div>
          </form>
        )}

        {/* ─── STUDENT REGISTRATION FORM ─── */}
        {activeTab === 'STUDENT' && (
          <form onSubmit={handleStudentSubmit} className="flex flex-col gap-2">
            <FormInput
              label="Student Name"
              type="text"
              name="fullName"
              value={studentFormData.fullName}
              onChange={handleStudentChange}
              placeholder="e.g. Alex Parker"
              error={studentErrors.fullName}
              required
              autoComplete="name"
            />

            <FormInput
              label="Student Email Address"
              type="email"
              name="email"
              value={studentFormData.email}
              onChange={handleStudentChange}
              placeholder="e.g. alex.parker@college.edu"
              error={studentErrors.email}
              required
              autoComplete="email"
            />

            {/* Password & Optional Pairing Key in 2-Column Grid */}
            <div className="grid grid-cols-2 gap-2">
              <FormInput
                label="Password"
                type="password"
                name="password"
                value={studentFormData.password}
                onChange={handleStudentChange}
                placeholder="••••••••"
                error={studentErrors.password}
                required
                autoComplete="new-password"
              />

              <FormInput
                label="Family Key (Optional)"
                type="text"
                name="familyKey"
                value={studentFormData.familyKey}
                onChange={handleStudentChange}
                placeholder="e.g. ORBIT-7489"
                icon={KeyRound}
              />
            </div>

            {/* Terms Agreement */}
            <label className="flex items-center gap-2 cursor-pointer text-[11px] text-on-surface-variant select-none pt-0.5">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={studentFormData.agreeTerms}
                onChange={handleStudentChange}
                className="w-3.5 h-3.5 rounded text-primary border-primary/30 focus:ring-0 cursor-pointer accent-primary shrink-0"
              />
              <span>I agree to Student Sanctuary <span className="underline font-semibold text-on-surface">Privacy Standard</span>.</span>
            </label>
            {studentErrors.agreeTerms && (
              <span className="text-red-600 text-[10px] pl-5">{studentErrors.agreeTerms}</span>
            )}

            {/* Submit Button */}
            <div className="pt-1">
              <PrimaryButton type="submit" disabled={isLoading} className="w-full py-2.5 text-xs sm:text-sm">
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Creating Sanctuary Account...</span>
                  </span>
                ) : (
                  <span>Create Student Account →</span>
                )}
              </PrimaryButton>
            </div>
          </form>
        )}

        {/* Already Registered Navigation */}
        <div className="text-center pt-1.5 border-t border-white/60">
          <span className="text-xs text-on-surface-variant">
            Already Registered?{' '}
            <Link to="/login" className="font-bold text-primary hover:underline transition-colors">
              Sign In
            </Link>
          </span>
        </div>

      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
