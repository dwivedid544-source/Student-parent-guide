import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, User, Users, Check, AlertCircle, Compass, ArrowRight, Loader2 } from 'lucide-react';
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
    email: 'sarah.guardian@highorbit.com',
    password: '',
    rememberMe: true,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [generalError, setGeneralError] = useState('');

  // Student Access State
  const [selectedStudentId, setSelectedStudentId] = useState(childrenList[0]?.id || 'student_1');
  const [studentPin, setStudentPin] = useState('1234');
  const [studentPinError, setStudentPinError] = useState('');

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

  const handleStudentAccess = (e) => {
    e.preventDefault();
    if (!studentPin || studentPin.length < 4) {
      setStudentPinError('Please enter your 4-digit Student PIN (Demo: 1234)');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const targetStudentId = childrenList[0]?.id || selectedStudentId || 'student_1';
      const success = loginChild(targetStudentId, studentPin);
      if (success) {
        setSuccessMsg("PIN Verified! Entering your Student Sanctuary...");
        setTimeout(() => {
          navigate('/child/dashboard');
        }, 700);
      } else {
        setStudentPinError('Invalid Student PIN. Demo PIN is 1234.');
      }
    }, 500);
  };

  return (
    <AuthLayout
      heading={
        <>
          Welcome back to <span className="italic font-serif text-[#234A36]">HighOrbit.</span>
        </>
      }
      subheading="Sign in to continue your personal development journey."
      description="Access your student growth tracking, habit reflections, or parent oversight portal."
      bottomNote="Encrypted with zero third-party tracking. Your reflections remain private."
      cardTitle="Sign In"
    >
      <div className="flex flex-col gap-4">
        
        {/* Role Selection Tabs */}
        <div className="p-1 rounded-2xl bg-[#F0ECE1] border border-[#E0DACE] flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab('PARENT');
              setErrors({});
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'PARENT'
                ? 'bg-[#183B2B] text-white shadow-xs'
                : 'text-[#4B554E] hover:text-[#18221D] hover:bg-white/40'
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
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'STUDENT'
                ? 'bg-[#183B2B] text-white shadow-xs'
                : 'text-[#4B554E] hover:text-[#18221D] hover:bg-white/40'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Student Access</span>
          </button>
        </div>

        {/* Global Feedback Banners */}
        {successMsg && (
          <div className="p-3 rounded-2xl bg-[#E2EBE5] border border-[#183B2B]/20 text-[#183B2B] text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-[#183B2B] shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {generalError && (
          <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{generalError}</span>
          </div>
        )}

        {/* TAB 1: PARENT LOGIN */}
        {activeTab === 'PARENT' && (
          <form onSubmit={handleParentSubmit} className="flex flex-col gap-3.5">
            
            {/* Email Address */}
            <FormInput
              label="Parent / Guardian Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. sarah.guardian@highorbit.com"
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
            <div className="flex items-center justify-between text-xs sm:text-sm text-[#4B554E] pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-[#183B2B] border-[#DCD6C8] focus:ring-0 cursor-pointer accent-[#183B2B]"
                />
                <span>Keep me signed in</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-[#183B2B] hover:underline font-semibold transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <PrimaryButton
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Signing in..." : "Sign In to Parent Portal"}
              </PrimaryButton>
            </div>

            {/* Bottom Registration Link */}
            <div className="pt-1 text-center text-xs sm:text-sm text-[#5C665F]">
              <span>New to HighOrbit? </span>
              <Link
                to="/register"
                className="font-bold text-[#183B2B] hover:underline transition-colors"
              >
                Create Family Account
              </Link>
            </div>
          </form>
        )}

        {/* TAB 2: STUDENT ACCESS */}
        {activeTab === 'STUDENT' && (
          <form onSubmit={handleStudentAccess} className="flex flex-col gap-3.5">
            
            <div className="text-xs text-[#4B554E] leading-relaxed bg-[#F5F2EB] p-3 rounded-2xl border border-[#E8E4DA]">
              Welcome back to your personal sanctuary. Sign in with your student PIN to access your personal growth dashboard.
            </div>

            {/* Single Unified HighOrbit Student Profile Banner */}
            <div className="p-3.5 rounded-2xl bg-[#EDF2EC] border border-[#193F30]/20 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#193F30] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                  A
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-bold text-[#18221D]">
                    {childrenList[0]?.name || 'Alex Parker'}
                  </span>
                  <span className="text-[11px] text-[#4B735F] font-semibold">
                    HighOrbit Student · Age 17 · Grade 11
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#193F30] bg-white px-2.5 py-1 rounded-full border border-[#DCD6C8]">
                Student Profile
              </span>
            </div>

            {/* 4-Digit Student PIN Input */}
            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex items-center justify-between text-xs sm:text-sm pl-1">
                <span className="font-semibold text-[#18221D]">Student Access PIN</span>
                <button
                  type="button"
                  onClick={() => {
                    setStudentPin('1234');
                    setStudentPinError('');
                  }}
                  className="text-[11px] text-[#193F30] font-bold underline hover:text-[#204936] cursor-pointer"
                  title="Autofill Demo PIN"
                >
                  Demo PIN: 1234 (Click to fill)
                </button>
              </div>

              <input
                type="password"
                maxLength={4}
                value={studentPin}
                onChange={(e) => {
                  setStudentPin(e.target.value);
                  if (studentPinError) setStudentPinError('');
                }}
                placeholder="1234"
                className="w-full py-2.5 px-4 text-center text-xl font-bold tracking-widest rounded-full text-[#18221D] placeholder-[#9CA3AF] bg-white border border-[#DCD6C8] focus:outline-none focus:border-[#193F30] focus:ring-2 focus:ring-[#193F30]/20 transition-all shadow-xs"
              />

              {studentPinError && (
                <span className="text-red-600 text-xs pl-3 font-medium animate-fadeIn">
                  {studentPinError}
                </span>
              )}
            </div>

            {/* Student Enter Button */}
            <div className="pt-1.5">
              <PrimaryButton
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Entering Sanctuary..." : "Enter Student Sanctuary"}
              </PrimaryButton>
            </div>

            <div className="text-center text-xs text-[#5C665F] pt-0.5">
              Demo Access: Enter PIN <strong className="text-[#193F30]">1234</strong> to enter the HighOrbit Student Dashboard.
            </div>
          </form>
        )}

      </div>
    </AuthLayout>
  );
};

export default LoginPage;
