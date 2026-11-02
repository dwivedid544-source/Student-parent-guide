import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Check, ArrowRight, Loader2 } from 'lucide-react';
import { AuthLayout } from '../components/common/AuthLayout';
import { FormInput } from '../components/common/FormInput';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { useOnboarding } from '../context/OnboardingContext';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerParent } = useOnboarding();

  const [formData, setFormData] = useState({
    fullName: 'Sarah Jenkins',
    email: 'sarah.jenkins@gmail.com',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Password strength (1 to 4)
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'bg-gray-200' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 9) score += 1;
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: 'Weak', color: 'bg-red-400', textColor: 'text-red-600' };
      case 2:
        return { score: 2, label: 'Fair', color: 'bg-amber-400', textColor: 'text-amber-600' };
      case 3:
        return { score: 3, label: 'Good', color: 'bg-secondary-container', textColor: 'text-secondary-container' };
      case 4:
        return { score: 4, label: 'Strong', color: 'bg-primary', textColor: 'text-primary' };
      default:
        return { score: 1, label: 'Weak', color: 'bg-red-400', textColor: 'text-red-600' };
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
      newErrors.fullName = 'Full name is required';
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
      newErrors.agreeTerms = 'Please agree to privacy and family safety terms';
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

      setSuccessMsg('Family Account Created! Launching Onboarding...');

      setTimeout(() => {
        navigate('/onboarding/welcome');
      }, 700);
    }, 600);
  };

  return (
    <AuthLayout
      heading={
        <>
          Begin Your <span className="bg-gradient-to-r from-primary via-primary-container to-secondary-container bg-clip-text text-transparent font-bold">HighOrbit Journey.</span>
        </>
      }
      subheading="Create your account and take the first step towards meaningful growth."
      description="Create a master parent account to guide your students, review permitted development insights, and assign growth challenges."
      bottomNote="By signing up, you agree to our Student Privacy Standard and Terms of Service."
      cardTitle="Create Account"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 sm:gap-3">
        
        {/* Role Notice Pill - Frosted Glass Tile */}
        <div className="flex items-center gap-2 p-2 rounded-2xl highorbit-glass-tile text-xs text-on-surface shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>Creates master <strong>Parent/Family</strong> account</span>
        </div>

        {/* Success message banner */}
        {successMsg && (
          <div className="p-2.5 rounded-2xl bg-gradient-to-r from-primary-fixed/90 to-secondary-fixed/60 border border-white/80 text-primary text-xs sm:text-sm font-semibold flex items-center gap-2 backdrop-blur-md shadow-2xs animate-fadeIn">
            <Check className="w-4 h-4 text-primary shrink-0" />
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
          placeholder="e.g. Sarah Jenkins"
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
          placeholder="e.g. sarah.jenkins@gmail.com"
          error={errors.email}
          required
          autoComplete="email"
        />

        {/* Password */}
        <div className="flex flex-col gap-1">
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
            <div className="px-1 pt-0.5 flex flex-col gap-1 animate-fadeIn">
              <div className="flex items-center justify-between text-[11px] font-semibold">
                <span className="text-on-surface-variant">Password Strength:</span>
                <span className={strength.textColor}>{strength.label}</span>
              </div>
              <div className="grid grid-cols-4 gap-1 h-1.5 w-full bg-white/60 backdrop-blur-xs rounded-full overflow-hidden p-0.5 border border-white/70">
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
        <div className="pt-0.5 flex flex-col gap-1">
          <label className="flex items-start gap-2 cursor-pointer text-xs text-on-surface-variant select-none leading-relaxed">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="w-4 h-4 mt-0.5 rounded text-primary border-primary/30 focus:ring-0 cursor-pointer accent-primary shrink-0"
            />
            <span>
              I agree to the HighOrbit <span className="underline font-semibold text-on-surface">Family Safety Terms</span> and <span className="underline font-semibold text-on-surface">Privacy Policy</span>.
            </span>
          </label>
          {errors.agreeTerms && (
            <span className="text-red-600 text-xs pl-6">{errors.agreeTerms}</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-1.5">
          <PrimaryButton
            type="submit"
            disabled={isLoading}
            className="w-full py-3"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating Account...</span>
              </span>
            ) : (
              <span>Create Parent Account</span>
            )}
          </PrimaryButton>
        </div>

        {/* Already Registered Navigation */}
        <div className="text-center pt-2 border-t border-white/60">
          <span className="text-xs text-on-surface-variant">
            Already Registered?{' '}
            <Link
              to="/login"
              className="font-bold text-primary hover:underline transition-colors"
            >
              Sign In
            </Link>
          </span>
        </div>

      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
