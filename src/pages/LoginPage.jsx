import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Sparkles, Check, AlertCircle, ShieldCheck, User, Users, Play, ArrowRight, Loader2, Rocket } from 'lucide-react';
import { AuthLayout } from '../components/common/AuthLayout';
import { FormInput } from '../components/common/FormInput';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { useOnboarding } from '../context/OnboardingContext';
import loginCleanFull from '../assets/login_clean_full.jpg';
import avatarSparkyImg from '../assets/avatar_sparky.png';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { loginParent, loginChild, childrenList, switchRole } = useOnboarding();

  // Active Role Tab: 'PARENT' | 'CHILD'
  const [activeTab, setActiveTab] = useState('PARENT');

  // Parent Login Form State
  const [formData, setFormData] = useState({
    email: 'sparkymcwonder@gmail.com',
    password: '',
    rememberMe: true,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [generalError, setGeneralError] = useState('');

  // Child Access State
  const [selectedChildId, setSelectedChildId] = useState(childrenList[0]?.id || 'child_1');
  const [childPin, setChildPin] = useState('');
  const [childPinError, setChildPinError] = useState('');

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

    // Simulate authentication verification
    setTimeout(() => {
      setIsLoading(false);
      loginParent(formData.email);
      setSuccessMsg('Welcome back, Parent Guardian! Launching family dashboard...');

      setTimeout(() => {
        navigate('/parent/dashboard');
      }, 900);
    }, 700);
  };

  const handleChildAccess = (e) => {
    e.preventDefault();
    if (!childPin || childPin.length < 4) {
      setChildPinError('Please enter your 4-digit secret PIN (Demo: 1234)');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const success = loginChild(selectedChildId, childPin);
      if (success) {
        setSuccessMsg("PIN Verified! Blasting off to Child Universe! 🚀");
        setTimeout(() => {
          navigate('/child/dashboard');
        }, 800);
      } else {
        setChildPinError('Invalid Child PIN. Please check with your parent.');
      }
    }, 600);
  };

  const activeSelectedChild =
    childrenList.find((c) => c.id === selectedChildId) || childrenList[0];

  return (
    <AuthLayout
      heading="Login"
      subheading="Sign in to continue"
      description="Sign in to your LifeVerse AI account to manage your family, monitor educational progress, or launch child learning quests."
      bottomNote="Open the doors to LifeVerse AI and let the magic of learning begin!"
      bgImage={loginCleanFull}
      characterAlt="Curious boy with glasses gazing at wonder"
      cardTitle="Sign In"
    >
      <div className="flex flex-col gap-4">
        
        {/* Role Selection Tabs */}
        <div className="p-1 rounded-2xl bg-white/10 border border-white/20 flex items-center gap-1 backdrop-blur-md">
          <button
            type="button"
            onClick={() => {
              setActiveTab('PARENT');
              setErrors({});
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'PARENT'
                ? 'bg-[#F45124] text-white shadow-md shadow-orange-600/30 ring-1 ring-[#F45124]'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Parent Login</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('CHILD');
              setErrors({});
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'CHILD'
                ? 'bg-[#65BDEB] text-[#081325] shadow-md shadow-sky-600/30 ring-1 ring-[#65BDEB]'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Child Access</span>
          </button>
        </div>

        {/* Global Feedback Banners */}
        {successMsg && (
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {generalError && (
          <div className="p-3 rounded-2xl bg-red-500/20 border border-red-400/40 text-red-200 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{generalError}</span>
          </div>
        )}

        {/* TAB 1: PARENT LOGIN */}
        {activeTab === 'PARENT' && (
          <form onSubmit={handleParentSubmit} className="flex flex-col gap-4">
            
            {/* Email Address */}
            <FormInput
              label="Parent Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="sparkymcwonder@gmail.com"
              error={errors.email}
              required
              autoComplete="email"
            />

            {/* Password */}
            <FormInput
              label="Parent Password"
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
            <div className="flex items-center justify-between text-xs sm:text-sm text-white/80 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-[#F45124] bg-white/20 border-white/40 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#F45124]"
                />
                <span>Keep me logged in</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-white/85 hover:text-[#65BDEB] transition-colors font-medium hover:underline"
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
                {isLoading ? "Signing In..." : "Sign In as Parent"}
              </PrimaryButton>
            </div>

            {/* Bottom Registration Link */}
            <div className="pt-1 text-center text-xs sm:text-sm text-white/80">
              <span>Ready to Join the Fun? </span>
              <Link
                to="/register"
                className="font-bold text-[#65BDEB] hover:text-[#9375E8] hover:underline transition-colors"
              >
                Create Parent Account
              </Link>
            </div>
          </form>
        )}

        {/* TAB 2: CHILD ACCESS */}
        {activeTab === 'CHILD' && (
          <form onSubmit={handleChildAccess} className="flex flex-col gap-4">
            
            <div className="text-xs text-white/80 leading-relaxed bg-white/5 p-3 rounded-2xl border border-white/10">
              Select your explorer avatar and enter your secret 4-digit Child PIN to begin today's learning quest!
            </div>

            {/* Avatar Selector for Children */}
            <div>
              <label className="text-white text-xs font-semibold tracking-wide pl-1 mb-2 block">
                Choose Your Explorer Profile
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                {childrenList.map((child) => {
                  const isSelected = child.id === selectedChildId;
                  return (
                    <div
                      key={child.id}
                      onClick={() => {
                        setSelectedChildId(child.id);
                        setChildPinError('');
                      }}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                        isSelected
                          ? 'border-[#65BDEB] bg-[#65BDEB]/25 ring-2 ring-[#65BDEB]/60 shadow-lg'
                          : 'border-white/15 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/30 bg-[#0c1b2d] shrink-0">
                        <img
                          src={child.avatar?.avatarImg || avatarSparkyImg}
                          alt={child.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col text-left overflow-hidden">
                        <span className="text-xs font-bold text-white truncate">
                          {child.nickname || child.name}
                        </span>
                        <span className="text-[10px] text-white/60 truncate">
                          {child.ageGroup}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4-Digit Child PIN Input */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-white text-xs md:text-sm font-semibold tracking-wide pl-1 flex items-center justify-between">
                <span>Secret Child PIN (4 Digits)</span>
                <span className="text-[11px] text-[#FFD66B]">Demo PIN: {activeSelectedChild?.pin || '1234'}</span>
              </label>

              <div className="relative">
                <input
                  type="password"
                  maxLength={4}
                  value={childPin}
                  onChange={(e) => {
                    setChildPin(e.target.value);
                    if (childPinError) setChildPinError('');
                  }}
                  placeholder="••••"
                  className="w-full py-3 px-5 text-center text-xl font-black tracking-widest rounded-full text-white placeholder-white/40 bg-[#65BDEB]/30 border border-white/40 focus:outline-none focus:ring-2 focus:ring-[#65BDEB]/60 backdrop-blur-md"
                />
              </div>

              {childPinError && (
                <span className="text-red-300 text-xs pl-3 font-medium animate-fadeIn">
                  {childPinError}
                </span>
              )}
            </div>

            {/* Child Enter Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-full text-sm sm:text-base font-extrabold text-white bg-gradient-to-r from-[#65BDEB] via-[#9375E8] to-[#F45124] hover:scale-[1.02] shadow-lg shadow-sky-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Launching Universe...</span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4" />
                    <span>Enter Child Universe</span>
                  </>
                )}
              </button>
            </div>

            {/* Need Parent Help */}
            <div className="text-center text-xs text-white/60 pt-1">
              Forgot PIN? Ask your parent to view your PIN in the Parent Dashboard.
            </div>
          </form>
        )}

      </div>
    </AuthLayout>
  );
};

export default LoginPage;
