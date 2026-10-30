import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Check, ArrowRight } from 'lucide-react';
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
        return { score: 3, label: 'Good', color: 'bg-[#4B735F]', textColor: 'text-[#4B735F]' };
      case 4:
        return { score: 4, label: 'Strong', color: 'bg-[#183B2B]', textColor: 'text-[#183B2B]' };
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
          Begin your journey with <span className="italic font-serif text-[#234A36]">HighOrbit.</span>
        </>
      }
      subheading={
        <span>
          Already registered?{' '}
          <Link to="/login" className="text-[#183B2B] hover:underline font-bold">
            Sign In
          </Link>
        </span>
      }
      description="Create a master Family Account to link student self-discovery profiles, track growth milestones, and access supportive guidance."
      bottomNote="By signing up, you agree to our Student Privacy Standard and Terms of Service."
      cardTitle="Create Account"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 sm:gap-3">
        
        {/* Role Notice Pill */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-[#F0ECE1] border border-[#E0DACE] text-xs text-[#18221D]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#183B2B] shrink-0" />
          <span>Creates master <strong>Parent/Family</strong> account</span>
        </div>

        {/* Success message banner */}
        {successMsg && (
          <div className="p-2.5 rounded-xl bg-[#E2EBE5] border border-[#183B2B]/20 text-[#183B2B] text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-[#183B2B] shrink-0" />
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
                <span className="text-[#5C665F]">Password Strength:</span>
                <span className={strength.textColor}>{strength.label}</span>
              </div>
              <div className="grid grid-cols-4 gap-1 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden p-0.5">
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
          <label className="flex items-start gap-2 cursor-pointer text-xs text-[#4B554E] select-none leading-relaxed">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="w-4 h-4 mt-0.5 rounded text-[#183B2B] border-[#DCD6C8] focus:ring-0 cursor-pointer accent-[#183B2B] shrink-0"
            />
            <span>
              I agree to the HighOrbit <span className="underline font-semibold text-[#18221D]">Family Safety Terms</span> and <span className="underline font-semibold text-[#18221D]">Privacy Policy</span>.
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
            className="w-full"
          >
            {isLoading ? "Setting Up Family Account..." : "Create Free Account"}
          </PrimaryButton>
        </div>

        {/* Student Notice */}
        <p className="text-[11px] text-[#5C665F] text-center pt-0.5">
          Student profiles are linked securely inside family setup after registration.
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
