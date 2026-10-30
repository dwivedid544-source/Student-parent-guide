import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { AuthLayout } from '../components/common/AuthLayout';
import { FormInput } from '../components/common/FormInput';
import { PrimaryButton } from '../components/common/PrimaryButton';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('sarah.jenkins@gmail.com');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please provide your registered account email');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid email format');
      return;
    }

    setError('');
    setIsSubmitted(true);
  };

  return (
    <AuthLayout
      heading={
        <>
          We'll help you get <span className="italic font-serif text-[#234A36]">back on track.</span>
        </>
      }
      subheading="Account access and password recovery."
      description="Enter the email associated with your HighOrbit family account, and we'll dispatch a secure recovery link immediately."
      bottomNote={
        <span className="block text-xs text-[#5C665F]">
          Remembered your credentials?{' '}
          <Link to="/login" className="text-[#183B2B] hover:underline font-bold transition-colors">
            Return to login.
          </Link>
        </span>
      }
      cardTitle="Reset Password"
    >
      {isSubmitted ? (
        <div className="flex flex-col items-center text-center py-4 animate-fadeIn">
          <div className="w-14 h-14 rounded-full bg-[#E2EBE5] border border-[#183B2B]/20 text-[#183B2B] flex items-center justify-center mb-4 shadow-sm">
            <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
          </div>

          <h3 className="font-serif text-2xl font-bold text-[#18221D]">
            Recovery Link Dispatched
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-[#4B554E] leading-relaxed">
            We have sent password reset instructions to{' '}
            <strong className="text-[#183B2B]">{email}</strong>.
            Please check your inbox or spam folder.
          </p>

          <div className="mt-6 flex flex-col gap-2.5 w-full">
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="w-full py-2.5 rounded-full text-xs font-semibold text-[#4B554E] bg-[#EFECE4] hover:bg-[#E5E0D5] border border-[#D5CFBF]/60 transition-all cursor-pointer"
            >
              Use another email address
            </button>

            <Link
              to="/login"
              className="w-full py-3 rounded-full text-center text-sm font-semibold text-white bg-[#183B2B] hover:bg-[#112D20] shadow-sm transition-all"
            >
              Return to Sign In
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-xs sm:text-sm text-[#4B554E] leading-relaxed">
            Enter the email associated with your family account. We'll send you a secure verification link to create a new password.
          </p>

          <FormInput
            label="Registered Email Address"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            placeholder="e.g. sarah.jenkins@gmail.com"
            error={error}
            required
            autoComplete="email"
          />

          <div className="pt-2">
            <PrimaryButton
              type="submit"
              className="w-full"
            >
              Send Reset Link
            </PrimaryButton>
          </div>

          <div className="mt-2 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#4B554E] hover:text-[#183B2B] transition-colors font-semibold hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
