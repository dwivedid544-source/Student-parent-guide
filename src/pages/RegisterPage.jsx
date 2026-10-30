import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, HelpCircle, ShieldCheck, Sparkles, AlertCircle, Info, Lock } from 'lucide-react';
import { AuthLayout } from '../components/common/AuthLayout';
import { FormInput } from '../components/common/FormInput';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { useOnboarding } from '../context/OnboardingContext';
import registerCleanFull from '../assets/register_clean_full.jpg';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerParent } = useOnboarding();

  const [formData, setFormData] = useState({
    fullName: 'Alex McWonder',
    email: 'sparkymcwonder@gmail.com',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Compute password strength (1 to 4)
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'bg-white/20' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 9) score += 1;
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: 'Weak', color: 'bg-red-400', textColor: 'text-red-400' };
      case 2:
        return { score: 2, label: 'Fair', color: 'bg-yellow-400', textColor: 'text-yellow-400' };
      case 3:
        return { score: 3, label: 'Good', color: 'bg-sky-400', textColor: 'text-sky-400' };
      case 4:
        return { score: 4, label: 'Strong', color: 'bg-emerald-400', textColor: 'text-emerald-400' };
      default:
        return { score: 1, label: 'Weak', color: 'bg-red-400', textColor: 'text-red-400' };
    }
  };

  const strength = getPasswordStrength(formData.password);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Parent full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Please accept family safety terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      registerParent({
        name: formData.fullName,
        email: formData.email,
      });

      setSuccessMsg('Parent Account Created! Launching Family Universe Setup...');

      setTimeout(() => {
        navigate('/onboarding/welcome');
      }, 900);
    }, 700);
  };

  return (
    <AuthLayout
      heading="Create A New Account"
      subheading={
        <span>
          Already Registered?{' '}
          <Link to="/login" className="text-[#F45124] hover:underline font-bold">
            Login
          </Link>
        </span>
      }
      description="Create a master Parent account to set up child learning profiles, configure age-appropriate AI safeguards, and monitor curiosity milestones."
      bottomNote="By creating an account, you agree to our Terms of Service and Family Privacy Policy."
      bgImage={registerCleanFull}
      characterAlt="Excited boy smiling with hands on the glass window"
      cardTitle="Parent Registration"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 sm:gap-3">
        
        {/* Role Notice Pill */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-white/10 border border-white/20 text-xs text-white/90">
          <ShieldCheck className="w-3.5 h-3.5 text-[#65BDEB] shrink-0" />
          <span>Creates master <strong>Parent/Guardian</strong> account</span>
        </div>

        {/* Success message banner */}
        {successMsg && (
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Full Name */}
        <FormInput
          label="Parent Full Name"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="e.g. Alex McWonder"
          error={errors.fullName}
          required
          autoComplete="name"
        />

        {/* Email Address */}
        <FormInput
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. alex@mcwonder.com"
          error={errors.email}
          required
          autoComplete="email"
        />

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <FormInput
            label="Create Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••••••"
            error={errors.password}
            required
            autoComplete="new-password"
          />

          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="px-2 pt-1 flex flex-col gap-1 animate-fadeIn">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-white/60">Strength:</span>
                <span className={strength.textColor}>{strength.label}</span>
              </div>
              <div className="grid grid-cols-4 gap-1 h-1.5 w-full bg-white/10 rounded-full overflow-hidden p-0.5">
                <div className={`h-full rounded-full transition-all duration-300 ${strength.score >= 1 ? strength.color : 'bg-transparent'}`} />
                <div className={`h-full rounded-full transition-all duration-300 ${strength.score >= 2 ? strength.color : 'bg-transparent'}`} />
                <div className={`h-full rounded-full transition-all duration-300 ${strength.score >= 3 ? strength.color : 'bg-transparent'}`} />
                <div className={`h-full rounded-full transition-all duration-300 ${strength.score >= 4 ? strength.color : 'bg-transparent'}`} />
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••••••"
          error={errors.confirmPassword}
          required
          autoComplete="new-password"
        />

        {/* Terms and Privacy Agreement */}
        <div className="pt-1 flex flex-col gap-1">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-white/85 select-none leading-relaxed">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="w-4 h-4 mt-0.5 rounded text-[#F45124] bg-white/20 border-white/40 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#F45124] shrink-0"
            />
            <span>
              I agree to the LifeVerse AI <span className="underline font-semibold">Family Safety Terms</span> and <span className="underline font-semibold">Child Privacy Policy</span>.
            </span>
          </label>
          {errors.agreeTerms && (
            <span className="text-red-300 text-xs pl-6">{errors.agreeTerms}</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <PrimaryButton
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Setting Up Family Universe..." : "Create Parent Account"}
          </PrimaryButton>
        </div>

        {/* Child Notice */}
        <p className="text-[11px] text-white/60 text-center pt-1 leading-normal">
          Child accounts are added safely inside the family setup after registration.
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
