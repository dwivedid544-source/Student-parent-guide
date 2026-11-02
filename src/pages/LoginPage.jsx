import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, User, Check, AlertCircle, Loader2 } from 'lucide-react';
import { AuthLayout } from '../components/common/AuthLayout';
import { FormInput } from '../components/common/FormInput';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { useOnboarding } from '../context/OnboardingContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { loginParent, loginChild, childrenList } = useOnboarding();

  // Active Role Tab: 'PARENT' | 'STUDENT'
  const [activeTab, setActiveTab] = useState('PARENT');

  // Parent Login Form State
  const [formData, setFormData] = useState({
    email: 'parent@gmail.com',
    password: '12345678',
    rememberMe: true,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [generalError, setGeneralError] = useState('');

  // Student Access State - Default child credentials child@gmail.com and 12345678
  const [studentFormData, setStudentFormData] = useState({
    email: 'child@gmail.com',
    password: '12345678',
    rememberMe: true,
  });
  const [studentErrors, setStudentErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (generalError) setGeneralError('');
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
    if (generalError) setGeneralError('');
  };

  const validateParent = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Please enter your password';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStudent = () => {
    const newErrors = {};
    if (!studentFormData.email.trim()) {
      newErrors.email = 'Please enter your child email address';
    } else if (!/\S+@\S+\.\S+/.test(studentFormData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!studentFormData.password) {
      newErrors.password = 'Please enter your password';
    } else if (studentFormData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setStudentErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleParentSubmit = (e) => {
    e.preventDefault();
    if (!validateParent()) return;

    setIsLoading(true);
    setGeneralError('');

    setTimeout(() => {
      setIsLoading(false);
      loginParent(formData.email);
      setSuccessMsg('Welcome back! Launching Parent Portal...');

      setTimeout(() => {
        navigate('/parent/dashboard');
      }, 800);
    }, 600);
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (!validateStudent()) return;

    setIsLoading(true);
    setGeneralError('');

    setTimeout(() => {
      setIsLoading(false);
      const targetChildId = childrenList[0]?.id || 'child_1';
      loginChild(targetChildId, studentFormData.password);
      setSuccessMsg('Welcome back! Entering Child Sanctuary...');

      setTimeout(() => {
        navigate('/child/dashboard');
      }, 700);
    }, 600);
  };

  return (
    <AuthLayout
      heading={
        <>
          Welcome back to <span className="bg-gradient-to-r from-primary via-primary-container to-secondary-container bg-clip-text text-transparent font-bold">HighOrbit.</span>
        </>
      }
      subheading="Continue your personal development journey."
      description="Access your student growth tracking, habit reflections, or parent oversight portal."
      bottomNote="Encrypted with zero third-party tracking. Your reflections remain private."
      cardTitle="Sign In"
    >
      <div className="flex flex-col gap-3.5">
        
        {/* Role Selection Tabs - Glass Tile */}
        <div className="p-1 rounded-2xl highorbit-glass-tile flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab('PARENT');
              setErrors({});
              setStudentErrors({});
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'PARENT'
                ? 'bg-gradient-to-r from-primary to-primary-container text-white shadow-md shadow-primary/25 border border-white/20'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-white/40'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Parent Login</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('STUDENT');
              setErrors({});
              setStudentErrors({});
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'STUDENT'
                ? 'bg-gradient-to-r from-primary to-primary-container text-white shadow-md shadow-primary/25 border border-white/20'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-white/40'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Child Access</span>
          </button>
        </div>

        {/* Global Feedback Banners */}
        {successMsg && (
          <div className="p-3 rounded-2xl bg-gradient-to-r from-primary-fixed/90 to-secondary-fixed/60 border border-white/80 text-primary text-xs sm:text-sm font-semibold flex items-center gap-2 backdrop-blur-md shadow-2xs animate-fadeIn">
            <Check className="w-4 h-4 text-primary shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {generalError && (
          <div className="p-3 rounded-2xl bg-red-50/80 border border-red-200/80 text-red-700 text-xs sm:text-sm font-semibold flex items-center gap-2 backdrop-blur-md shadow-2xs animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{generalError}</span>
          </div>
        )}

        {/* TAB 1: PARENT LOGIN */}
        {activeTab === 'PARENT' && (
          <form onSubmit={handleParentSubmit} className="flex flex-col gap-3">
            
            {/* Quick Demo Credentials Tile - Frosted Sage Glass */}
            <button
              type="button"
              onClick={() => {
                setFormData({
                  email: 'parent@gmail.com',
                  password: '12345678',
                  rememberMe: true,
                });
                setErrors({});
                setGeneralError('');
              }}
              className="w-full py-2 px-3.5 rounded-2xl bg-gradient-to-r from-primary-fixed/80 via-primary-fixed/50 to-secondary-fixed/60 backdrop-blur-md border border-white/90 text-primary text-xs font-semibold flex items-center justify-between transition-all cursor-pointer group shadow-2xs hover:shadow-xs hover:border-white"
              title="Click to autofill parent demo credentials"
            >
              <span className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>Fill Demo Credentials</span>
              </span>
              <span className="font-mono text-[11px] bg-white/90 text-primary px-2.5 py-0.5 rounded-full border border-white/90 shadow-2xs font-semibold">
                parent@gmail.com · 12345678
              </span>
            </button>

            {/* Email Address */}
            <FormInput
              label="Parent / Guardian Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. parent@gmail.com"
              error={errors.email}
              required
              autoComplete="email"
            />

            {/* Password */}
            <FormInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••••••"
              error={errors.password}
              required
              autoComplete="current-password"
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-on-surface-variant select-none">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-primary border-primary/30 focus:ring-0 cursor-pointer accent-primary"
                />
                <span>Keep me signed in</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-primary hover:underline font-semibold transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In CTA */}
            <div className="pt-1.5">
              <PrimaryButton
                type="submit"
                disabled={isLoading}
                className="w-full py-3"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </span>
                ) : (
                  <span>Sign In to Parent Portal</span>
                )}
              </PrimaryButton>
            </div>

            {/* Register Link */}
            <div className="text-center pt-2 border-t border-white/60">
              <span className="text-xs text-on-surface-variant">
                New to HighOrbit?{' '}
                <Link
                  to="/register"
                  className="font-bold text-primary hover:underline transition-colors"
                >
                  Create Family Account
                </Link>
              </span>
            </div>

          </form>
        )}

        {/* TAB 2: STUDENT ACCESS (MATCHING PARENT LOGIN TILE) */}
        {activeTab === 'STUDENT' && (
          <form onSubmit={handleStudentSubmit} className="flex flex-col gap-3">
            
            {/* Quick Demo Credentials Tile - Frosted Sage Glass */}
            <button
              type="button"
              onClick={() => {
                setStudentFormData({
                  email: 'child@gmail.com',
                  password: '12345678',
                  rememberMe: true,
                });
                setStudentErrors({});
                setGeneralError('');
              }}
              className="w-full py-2 px-3.5 rounded-2xl bg-gradient-to-r from-primary-fixed/80 via-primary-fixed/50 to-secondary-fixed/60 backdrop-blur-md border border-white/90 text-primary text-xs font-semibold flex items-center justify-between transition-all cursor-pointer group shadow-2xs hover:shadow-xs hover:border-white"
              title="Click to autofill child demo credentials"
            >
              <span className="flex items-center gap-1.5 font-bold">
                <User className="w-3.5 h-3.5 text-primary" />
                <span>Fill Demo Credentials</span>
              </span>
              <span className="font-mono text-[11px] bg-white/90 text-primary px-2.5 py-0.5 rounded-full border border-white/90 shadow-2xs font-semibold">
                child@gmail.com · 12345678
              </span>
            </button>

            {/* Child Email Address */}
            <FormInput
              label="Child Email Address"
              type="email"
              name="email"
              value={studentFormData.email}
              onChange={handleStudentChange}
              placeholder="e.g. child@gmail.com"
              error={studentErrors.email}
              required
              autoComplete="email"
            />

            {/* Password */}
            <FormInput
              label="Password"
              type="password"
              name="password"
              value={studentFormData.password}
              onChange={handleStudentChange}
              placeholder="••••••••••••"
              error={studentErrors.password}
              required
              autoComplete="current-password"
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-on-surface-variant select-none">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={studentFormData.rememberMe}
                  onChange={handleStudentChange}
                  className="w-4 h-4 rounded text-primary border-primary/30 focus:ring-0 cursor-pointer accent-primary"
                />
                <span>Keep me signed in</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-primary hover:underline font-semibold transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Child Sign In CTA */}
            <div className="pt-1.5">
              <PrimaryButton
                type="submit"
                disabled={isLoading}
                className="w-full py-3"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Entering Sanctuary...</span>
                  </span>
                ) : (
                  <span>Sign In to Child Sanctuary</span>
                )}
              </PrimaryButton>
            </div>

            {/* Parent Link */}
            <div className="text-center pt-2 border-t border-white/60">
              <span className="text-xs text-on-surface-variant">
                Need a child account?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('PARENT')}
                  className="font-bold text-primary hover:underline transition-colors"
                >
                  Login as Parent to add child
                </button>
              </span>
            </div>

          </form>
        )}

      </div>
    </AuthLayout>
  );
};

export default LoginPage;
