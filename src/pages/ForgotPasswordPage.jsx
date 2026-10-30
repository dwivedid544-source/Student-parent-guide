import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle2, ArrowLeft, Sparkles } from 'lucide-react';
import { AuthLayout } from '../components/common/AuthLayout';
import { FormInput } from '../components/common/FormInput';
import forgotCleanFull from '../assets/forgot_clean_full.jpg';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('sparkymcwonder@gmail.com');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please provide your parent account email');
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
      heading="No worries, we'll help you get back on track!"
      description="Enter your email address into the Forgot Password form, and we'll send you instructions on how to reset your password."
      bottomNote={
        <span className="block text-xs sm:text-sm text-white/80 leading-relaxed">
          Remembered your password?
          <br />
          <Link to="/login" className="text-white hover:text-[#65BDEB] hover:underline font-semibold transition-colors">
            Go back to the login page.
          </Link>
        </span>
      }
      bgImage={forgotCleanFull}
      characterAlt="Boy looking with amazement and wonder"
      cardTitle="Forget Password"
    >
      {isSubmitted ? (
        <div className="flex flex-col items-center text-center py-4 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20 animate-bounce">
            <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
          </div>

          <h3 className="text-xl font-bold text-white font-poppins">
            Instructions Dispatched!
          </h3>

          <p className="mt-2 text-sm text-white/80 leading-relaxed">
            We have sent password reset instructions to{' '}
            <strong className="text-[#65BDEB]">{email}</strong>.
            Please check your inbox and spam folder.
          </p>

          <div className="mt-6 flex flex-col gap-3 w-full">
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="w-full py-2.5 rounded-full text-xs font-semibold text-white/80 bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
            >
              Use another email
            </button>

            <Link
              to="/login"
              className="w-full py-3 rounded-full text-center text-sm font-bold text-white bg-gradient-to-r from-[#F45124] to-[#FF5722] hover:from-[#e04216] hover:to-[#f04b16] shadow-lg shadow-orange-600/30 transition-all"
            >
              Return to Login
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Enter the email associated with your family account. We'll send you a secure verification link to create a new password.
          </p>

          <FormInput
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            placeholder="sparkymcwonder@gmail.com"
            error={error}
            required
            autoComplete="email"
          />

          <div className="pt-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-[#F45124] to-[#FF5722] hover:from-[#e04216] hover:to-[#f04b16] shadow-[0_4px_25px_rgba(244,81,36,0.6)] hover:shadow-[0_6px_35px_rgba(244,81,36,0.8)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer"
            >
              <span>Forgot Password</span>
              <Sparkles className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="mt-2 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white/80 hover:text-white transition-colors font-medium hover:underline"
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
