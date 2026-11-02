import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { AuthVideoVisual } from './AuthVideoVisual';

export const AuthLayout = ({
  heading,
  subheading,
  description,
  bottomNote,
  cardTitle,
  children,
}) => {
  return (
    <div className="relative min-h-screen lg:h-screen w-full flex flex-col justify-between bg-[#FCF8FF] text-on-surface font-sans selection:bg-primary selection:text-white overflow-x-hidden lg:overflow-hidden">
      
      {/* Background Soft Gradients & Floating Pastel Depth Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-[38rem] h-[38rem] bg-gradient-to-tr from-[#8B75E8]/30 via-[#FF9EAD]/20 to-[#FFE28A]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-[36rem] h-[36rem] bg-gradient-to-br from-[#8CCFFF]/30 via-[#8B75E8]/20 to-[#FF9EAD]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-[40rem] h-[40rem] bg-gradient-to-t from-[#FFE28A]/25 via-[#FF9EAD]/20 to-[#8B75E8]/25 rounded-full blur-3xl" />
      </div>

      {/* Top Header with HIGH ORBIT Brand Logo and Home Button */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-3 sm:pt-4 pb-1 flex items-center justify-between shrink-0">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center shadow-md shadow-primary/25 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </div>
          <span className="font-headline-md text-2xl font-bold tracking-tight text-on-surface">
            HIGH ORBIT
          </span>
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-on-surface bg-white/70 hover:bg-white/95 border border-white/80 transition-all shadow-sm backdrop-blur-md cursor-pointer hover:scale-105 hover:text-primary hover:border-primary/30"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-primary" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Two-Column Layout */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 py-2 sm:py-3 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Column: HighOrbit Welcome & Visual */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/25 bg-primary-fixed/80 backdrop-blur-md text-primary font-semibold text-xs tracking-wider uppercase mb-2 w-fit shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Personal Development &amp; Family Bridge</span>
            </div>

            {/* Main Heading */}
            {heading && (
              <h1 className="text-3xl sm:text-4xl md:text-[40px] font-bold text-on-surface tracking-tight leading-[1.18]">
                {heading}
              </h1>
            )}

            {/* Subheading */}
            {subheading && (
              <div className="mt-1.5 text-sm sm:text-base font-medium text-on-surface-variant">
                {subheading}
              </div>
            )}

            {/* Description */}
            {description && (
              <p className="mt-1 text-xs sm:text-sm text-on-surface-variant/80 leading-relaxed max-w-md">
                {description}
              </p>
            )}

            {/* Themed Animated Video Visual */}
            <div className="my-2 sm:my-3">
              <AuthVideoVisual />
            </div>

            {/* Editorial Highlight Card (Purple Gradient Quote Box) */}
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-tr from-primary via-primary-container to-[#624bbc] text-white max-w-md shadow-xl shadow-primary/25 relative overflow-hidden border border-white/20">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFE28A] mb-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FFE28A]" />
                <span>100% Student Privacy &amp; Consent First</span>
              </div>
              <p className="text-xs sm:text-sm italic font-light text-white/95 leading-relaxed">
                "A calm, non-judgmental space to build emotional resilience, self-discipline &amp; lifelong clarity."
              </p>
            </div>

            {/* Bottom Note */}
            {bottomNote && (
              <div className="mt-2 text-xs text-on-surface-variant/80 leading-relaxed max-w-md">
                {bottomNote}
              </div>
            )}
          </div>

          {/* Right Column: Frosted Glass Authentication Card with Backing Pastel Spheres */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end relative">
            
            {/* Ambient Pastel Glass Spheres visible through the frosted glass card */}
            <div className="absolute -top-8 -right-6 w-48 h-48 rounded-full bg-gradient-to-br from-[#FF9EAD]/40 via-[#8B75E8]/30 to-[#FFE28A]/35 blur-xl pointer-events-none z-0" />
            <div className="absolute -bottom-8 -left-8 w-44 h-44 rounded-full bg-gradient-to-tr from-[#8CCFFF]/40 via-[#8B75E8]/30 to-[#FF9EAD]/35 blur-xl pointer-events-none z-0" />
            <div className="absolute top-1/2 -left-12 w-20 h-20 rounded-full bg-gradient-to-br from-white/90 via-[#E6DEFF]/70 to-[#FF9EAD]/25 blur-sm pointer-events-none z-0" />
            <div className="absolute -bottom-3 right-1/4 w-16 h-16 rounded-full bg-gradient-to-tr from-primary/25 to-white/70 blur-sm pointer-events-none z-0" />

            {/* The Main Frosted Glass Card */}
            <div className="relative z-10 w-full max-w-md rounded-[36px] p-5 sm:p-7 highorbit-glass-card">
              {cardTitle && (
                <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mb-3">
                  {cardTitle}
                </h2>
              )}
              {children}
            </div>
          </div>

        </div>
      </main>

      {/* Subtle Bottom Trust Bar */}
      <footer className="relative z-10 w-full py-2.5 text-center text-xs text-on-surface-variant/75 border-t border-white/60 bg-white/40 backdrop-blur-md shrink-0">
        <span>© 2026 HighOrbit. Designed for personal development, student ownership &amp; parental trust.</span>
      </footer>

    </div>
  );
};

export default AuthLayout;
