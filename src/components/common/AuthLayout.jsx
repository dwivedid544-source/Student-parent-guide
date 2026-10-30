import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const AuthLayout = ({
  heading,
  subheading,
  description,
  bottomNote,
  cardTitle,
  children,
}) => {
  return (
    <div className="relative min-h-screen lg:h-screen w-full flex flex-col justify-between bg-[#FBF9F5] text-[#18221D] font-sans selection:bg-[#183B2B] selection:text-white overflow-x-hidden lg:overflow-hidden">
      
      {/* Subtle Background Accent Blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#E2EBE5]/60 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] bg-[#F0ECE1]/80 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-[36rem] h-[36rem] bg-[#DCE8DE]/40 rounded-full blur-3xl" />
      </div>

      {/* Top Header with HighOrbit Brand Logo and Home Button */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-3 sm:pt-5 pb-1 flex items-center justify-between shrink-0">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-[#183B2B] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-[#DCE8DE]" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#18221D]">
            HighOrbit
          </span>
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#18221D] bg-[#EFECE4] hover:bg-[#E5E0D5] border border-[#D5CFBF]/60 transition-all shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#183B2B]" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Two-Column Layout */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 py-2 sm:py-4 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: HighOrbit Editorial Presence */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#DCD6C8] bg-[#F5F1E8] text-[#2D3F34] font-medium text-xs tracking-wider uppercase mb-3 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#183B2B]" />
              <span>Personal Development & Family Bridge</span>
            </div>

            {/* Main Serif Heading */}
            {heading && (
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#18221D] tracking-tight leading-[1.12]">
                {heading}
              </h1>
            )}

            {/* Subheading */}
            {subheading && (
              <div className="mt-2 text-sm sm:text-base font-medium text-[#4B554E]">
                {subheading}
              </div>
            )}

            {/* Description */}
            {description && (
              <p className="mt-2 text-xs sm:text-sm text-[#5C665F] leading-relaxed max-w-md">
                {description}
              </p>
            )}

            {/* Editorial Highlight Card (Forest Green Quote Box) */}
            <div className="my-4 p-5 rounded-2xl bg-[#183B2B] text-white max-w-md shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 blur-xl pointer-events-none" />
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A7D4B5] mb-2">
                <ShieldCheck className="w-4 h-4 text-[#A7D4B5]" />
                <span>100% Student Privacy & Consent First</span>
              </div>
              <p className="font-serif text-sm sm:text-base italic font-light text-white/95 leading-relaxed">
                "A calm, non-judgmental space to build emotional resilience, self-discipline & lifelong clarity."
              </p>
            </div>

            {/* Bottom Note */}
            {bottomNote && (
              <div className="mt-1 text-xs text-[#5C665F] leading-relaxed max-w-md">
                {bottomNote}
              </div>
            )}
          </div>

          {/* Right Column: Clean Modern Card */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-[32px] p-5 sm:p-7 bg-white border border-[#E8E4DA] shadow-[0_20px_50px_rgba(24,59,43,0.06)]">
              {cardTitle && (
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#18221D] tracking-tight mb-3">
                  {cardTitle}
                </h2>
              )}
              {children}
            </div>
          </div>

        </div>
      </main>

      {/* Subtle Bottom Trust Bar */}
      <footer className="relative z-10 w-full py-2.5 text-center text-xs text-[#5C665F] border-t border-[#E8E4DA]/60 bg-[#F5F2EB]/50 shrink-0">
        <span>© 2026 HighOrbit. Designed for personal development, student ownership & parental trust.</span>
      </footer>

    </div>
  );
};

export default AuthLayout;
