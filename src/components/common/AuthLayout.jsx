import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, ShieldCheck } from 'lucide-react';
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
    <div className="relative min-h-screen lg:h-screen w-full flex flex-col justify-between bg-[#F4F3EC] text-[#18221D] font-sans selection:bg-[#194333] selection:text-white overflow-x-hidden lg:overflow-hidden">
      
      {/* Background Soft Gradients & Floating Depth Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#DCE8DE]/60 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-[34rem] h-[34rem] bg-[#EDEDE5]/80 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-[36rem] h-[36rem] bg-[#E2EBE5]/70 rounded-full blur-3xl" />
      </div>

      {/* Top Header with HighOrbit Brand Logo and Home Button */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-3 sm:pt-4 pb-1 flex items-center justify-between shrink-0">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-[#194333] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-[#DCE8DE]" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#18221D]">
            HighOrbit
          </span>
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#18221D] bg-white/60 hover:bg-white/90 border border-white/80 transition-all shadow-2xs backdrop-blur-md cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#194333]" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Two-Column Layout */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 py-2 sm:py-3 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Column: HighOrbit Welcome & Interactive 3D Orbit */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/80 bg-white/50 backdrop-blur-md text-[#2D3F34] font-medium text-xs tracking-wider uppercase mb-2 w-fit shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#194333]" />
              <span>Personal Development & Family Bridge</span>
            </div>

            {/* Main Serif Heading */}
            {heading && (
              <h1 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal text-[#18221D] tracking-tight leading-[1.14]">
                {heading}
              </h1>
            )}

            {/* Subheading */}
            {subheading && (
              <div className="mt-1.5 text-sm sm:text-base font-medium text-[#4B554E]">
                {subheading}
              </div>
            )}

            {/* Description */}
            {description && (
              <p className="mt-1 text-xs sm:text-sm text-[#53675D] leading-relaxed max-w-md">
                {description}
              </p>
            )}

            {/* Themed Animated Video Visual */}
            <div className="my-2 sm:my-3">
              <AuthVideoVisual />
            </div>

            {/* Editorial Highlight Card (Forest Green Quote Box) */}
            <div className="p-4 sm:p-4.5 rounded-2xl bg-[#194333] text-white max-w-md shadow-md relative overflow-hidden border border-white/10">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 blur-xl pointer-events-none" />
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A7D4B5] mb-1.5">
                <ShieldCheck className="w-4 h-4 text-[#A7D4B5]" />
                <span>100% Student Privacy & Consent First</span>
              </div>
              <p className="font-serif text-xs sm:text-sm italic font-light text-white/95 leading-relaxed">
                "A calm, non-judgmental space to build emotional resilience, self-discipline & lifelong clarity."
              </p>
            </div>

            {/* Bottom Note */}
            {bottomNote && (
              <div className="mt-2 text-xs text-[#53675D] leading-relaxed max-w-md">
                {bottomNote}
              </div>
            )}
          </div>

          {/* Right Column: Frosted Glass Authentication Card with Backing 3D Glass Orbs */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end relative">
            
            {/* Ambient 3D Glass Spheres visible through the frosted glass card */}
            <div className="absolute -top-8 -right-6 w-48 h-48 rounded-full bg-gradient-to-br from-[#A7D4B5]/60 via-[#4B735F]/35 to-[#194333]/45 blur-xs pointer-events-none z-0 shadow-lg" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-gradient-to-tr from-[#EDEDE5] via-[#DCE8DE]/75 to-[#A7D4B5]/50 blur-xs pointer-events-none z-0 shadow-md" />
            <div className="absolute top-1/2 -left-12 w-20 h-20 rounded-full bg-gradient-to-br from-white/90 via-[#DCE8DE]/70 to-[#4B735F]/35 blur-[1px] pointer-events-none z-0 shadow-sm" />
            <div className="absolute -bottom-3 right-1/4 w-16 h-16 rounded-full bg-gradient-to-tr from-[#194333]/35 to-white/70 blur-[1px] pointer-events-none z-0" />

            {/* The Main Frosted Glass Card */}
            <div className="relative z-10 w-full max-w-md rounded-[36px] p-5 sm:p-7 highorbit-glass-card">
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
      <footer className="relative z-10 w-full py-2.5 text-center text-xs text-[#53675D] border-t border-[#E8E4DA]/60 bg-white/40 backdrop-blur-md shrink-0">
        <span>© 2026 HighOrbit. Designed for personal development, student ownership & parental trust.</span>
      </footer>

    </div>
  );
};

export default AuthLayout;
