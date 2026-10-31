import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, ArrowRight, Sparkles, Loader2, ShieldCheck } from 'lucide-react';
import { AuthLayout } from '../components/common/AuthLayout';
import { FormInput } from '../components/common/FormInput';
import { PrimaryButton } from '../components/common/PrimaryButton';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('sarah.jenkins@gmail.com');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <AuthLayout
      heading={
        <>
          Let's Get You <span className="italic font-serif text-[#194333]">Back In.</span>
        </>
      }
      subheading="Enter your registered email address to continue your password recovery."
      description="We'll dispatch a secure recovery link so you can regain seamless access to your personal development dashboard."
      bottomNote={
        <span className="block text-xs text-[#53675D]">
          Remembered your credentials?{' '}
          <Link to="/login" className="text-[#194333] hover:underline font-bold transition-colors">
            Return to login.
          </Link>
        </span>
      }
      cardTitle="Reset Password"
    >
      {isSubmitted ? (
        <div className="flex flex-col items-center text-center py-2 animate-fadeIn">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#DCE8DE] to-[#C9DEC8] border border-white/90 text-[#194333] flex items-center justify-center mb-3.5 shadow-md">
            <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
          </div>

          <h3 className="font-serif text-2xl font-bold text-[#18221D]">
            Recovery Link Dispatched
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-[#4B554E] leading-relaxed">
            We have sent password reset instructions to{' '}
            <strong className="text-[#194333]">{email}</strong>.
            Please check your inbox or spam folder.
          </p>

          <div className="mt-6 flex flex-col gap-2.5 w-full">
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="w-full py-2.5 rounded-full text-xs font-semibold text-[#4B554E] highorbit-glass-tile hover:bg-white/80 transition-all cursor-pointer"
            >
              Use another email address
            </button>

            <Link
              to="/login"
              className="w-full py-3 rounded-full text-center text-sm font-semibold text-white bg-gradient-to-r from-[#194333] to-[#123024] hover:from-[#133528] hover:to-[#0d231a] shadow-md border border-white/20 transition-all"
            >
              Return to Sign In
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
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
              disabled={isLoading}
              className="w-full py-3"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending Link...</span>
                </span>
              ) : (
                <span>Send Reset Link</span>
              )}
            </PrimaryButton>
          </div>

          <div className="text-center pt-2 border-t border-white/60">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#194333] hover:underline transition-colors"
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
