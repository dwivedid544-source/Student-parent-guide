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
    email: 'parent@gmail.com',
    password: '12345678',
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
          Welcome back to <span className="italic font-serif text-[#194333]">HighOrbit.</span>
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
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'PARENT'
                ? 'bg-gradient-to-r from-[#194333] to-[#123024] text-white shadow-md border border-white/20'
                : 'text-[#53675D] hover:text-[#18221D] hover:bg-white/40'
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
                ? 'bg-gradient-to-r from-[#194333] to-[#123024] text-white shadow-md border border-white/20'
                : 'text-[#53675D] hover:text-[#18221D] hover:bg-white/40'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Student Access</span>
          </button>
        </div>

        {/* Global Feedback Banners */}
        {successMsg && (
          <div className="p-3 rounded-2xl bg-gradient-to-r from-[#DCE8DE]/80 to-[#DCE8DE]/50 border border-white/80 text-[#194333] text-xs sm:text-sm font-semibold flex items-center gap-2 backdrop-blur-md shadow-2xs animate-fadeIn">
            <Check className="w-4 h-4 text-[#194333] shrink-0" />
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
              className="w-full py-2 px-3.5 rounded-2xl bg-gradient-to-r from-[#DCE8DE]/75 via-[#DCE8DE]/50 to-[#E2EBE5]/65 backdrop-blur-md border border-white/90 text-[#194333] text-xs font-semibold flex items-center justify-between transition-all cursor-pointer group shadow-2xs hover:shadow-xs hover:border-white"
            >
              <span className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#194333]" />
                <span>Fill Demo Credentials</span>
              </span>
              <span className="font-mono text-[11px] bg-white/85 text-[#194333] px-2.5 py-0.5 rounded-full border border-white/90 shadow-2xs">
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
              <label className="flex items-center gap-2 cursor-pointer text-[#4B554E] select-none">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-[#194333] border-[#DCD6C8] focus:ring-0 cursor-pointer accent-[#194333]"
                />
                <span>Keep me signed in</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-[#194333] hover:underline font-semibold transition-colors"
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
              <span className="text-xs text-[#53675D]">
                New to HighOrbit?{' '}
                <Link
                  to="/register"
                  className="font-bold text-[#194333] hover:underline transition-colors"
                >
                  Create Family Account
                </Link>
              </span>
            </div>

          </form>
        )}

        {/* TAB 2: STUDENT PIN ACCESS */}
        {activeTab === 'STUDENT' && (
          <form onSubmit={handleStudentAccess} className="flex flex-col gap-3.5 py-1">
            
            <div className="p-3 rounded-2xl bg-gradient-to-r from-[#DCE8DE]/70 via-[#DCE8DE]/45 to-[#E2EBE5]/60 backdrop-blur-md border border-white/90 text-xs text-[#194333] flex items-start gap-2.5 shadow-2xs">
              <Compass className="w-4 h-4 text-[#194333] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Student Personal Sanctuary</strong>
                <span className="text-[#365142]">Enter your assigned 4-digit PIN to access your self-discovery quests and growth log.</span>
              </div>
            </div>

            {/* Single Unified Student Profile */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#18221D] pl-1">
                Student Profile
              </label>
              <div className="p-3 rounded-2xl border-1.5 border-[#194333] bg-white/80 backdrop-blur-md shadow-sm ring-1 ring-[#194333]/25 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#194333] to-[#123024] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs border border-white/20">
                    {childrenList[0]?.name ? childrenList[0].name.charAt(0) : 'S'}
                  </div>
                  <div className="text-left">
                    <div className="text-xs sm:text-sm font-bold text-[#18221D]">
                      {childrenList[0]?.name || 'Student Profile'}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-[#53675D] font-medium">
                      HighOrbit Student · Age {childrenList[0]?.age || 17} · Grade 11
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#194333] bg-[#E8F2EC] px-2.5 py-1 rounded-full border border-[#194333]/20">
                  Student Sanctuary
                </span>
              </div>
            </div>

            {/* 4-Digit Student PIN Input */}
            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex items-center justify-between text-xs sm:text-sm pl-1">
                <span className="font-semibold text-[#18221D]">Student Access PIN <span className="text-[#194333]">*</span></span>
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
                  setStudentPin(e.target.value.replace(/\D/g, ''));
                  if (studentPinError) setStudentPinError('');
                }}
                placeholder="1234"
                className="w-full py-2.5 px-4 text-center text-xl font-bold tracking-widest rounded-full text-[#18221D] placeholder-[#9CA3AF] bg-white border border-[#DCD6C8] focus:outline-none focus:border-[#193F30] focus:ring-2 focus:ring-[#193F30]/20 transition-all shadow-xs"
                autoComplete="off"
              />

              <div className="flex items-center justify-between px-2 text-[11px] text-[#53675D]">
                <span>Demo student PIN: <strong className="text-[#194333]">1234</strong></span>
                <span>Protected by Family Bridge</span>
              </div>

              {studentPinError && (
                <span className="text-red-600 text-xs font-medium pl-2 animate-fadeIn">
                  {studentPinError}
                </span>
              )}
            </div>

            {/* Student Submit */}
            <PrimaryButton
              type="submit"
              disabled={isLoading || studentPin.length < 4}
              className="w-full py-3"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Entering Sanctuary...</span>
                </span>
              ) : (
                <span>Enter Student Sanctuary</span>
              )}
            </PrimaryButton>

            <div className="text-center pt-1 text-xs text-[#53675D]">
              Forgot your PIN? Ask your parent to look it up in the Parent Portal.
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
