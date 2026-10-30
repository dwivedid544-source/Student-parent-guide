import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { LifeVerseLogo } from './LifeVerseLogo';

export const AuthLayout = ({
  heading,
  subheading,
  description,
  bottomNote,
  characterImg,
  characterAlt = 'LifeVerse AI Explorer',
  cardTitle,
  children,
  bgImage,
}) => {
  return (
    <div className="relative min-h-screen lg:h-screen w-full flex flex-col justify-between bg-[#081325] text-white font-nunito selection:bg-[#F45124] selection:text-white overflow-x-hidden lg:overflow-hidden">
      
      {/* Background Layer */}
      {bgImage ? (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src={bgImage}
            alt={characterAlt}
            className="w-full h-full object-cover object-[center_right] sm:object-center"
          />
          {/* Directional subtle dark gradient overlay on left for optimal text contrast */}
          <div className="absolute inset-y-0 left-0 w-full sm:w-[70%] lg:w-[58%] bg-gradient-to-r from-[#081325]/92 via-[#081325]/55 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#081325] via-[#081325]/60 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#081325]/60 to-transparent" />
        </div>
      ) : (
        /* Fallback cosmic glows */
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#F45124]/20 rounded-full blur-3xl" />
          <div className="absolute top-1/4 -right-32 w-[32rem] h-[32rem] bg-[#65BDEB]/25 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 w-[36rem] h-[36rem] bg-[#9375E8]/20 rounded-full blur-3xl" />
        </div>
      )}

      {/* Top Header with Brand Logo only (No Home Navbar) */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-3 sm:pt-4 pb-1 flex items-center justify-between shrink-0">
        <LifeVerseLogo />
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white/85 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#65BDEB]" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Two-Column Layout */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 py-2 sm:py-4 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Subheading & Contextual Notes */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            {/* Main Heading */}
            {heading && (
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight font-poppins drop-shadow-md">
                {heading}
              </h1>
            )}

            {/* Subheading */}
            {subheading && (
              <div className="mt-1.5 text-sm sm:text-base font-medium text-white/90 drop-shadow-sm">
                {subheading}
              </div>
            )}

            {/* Description */}
            {description && (
              <p className="mt-2.5 text-xs sm:text-sm text-white/80 leading-relaxed max-w-md drop-shadow-sm">
                {description}
              </p>
            )}

            {/* Divider Line matching Image 2 */}
            <div className="my-4 w-20 h-1 bg-white/70 rounded-full" />

            {/* Inset Character Illustration (Only shown if NO full background image is supplied) */}
            {characterImg && !bgImage && (
              <div className="my-2 max-w-md w-full relative group">
                <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm">
                  <img
                    src={characterImg}
                    alt={characterAlt}
                    className="w-full h-56 sm:h-72 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1b2d]/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            )}

            {/* Bottom Note / Legal */}
            {bottomNote && (
              <div className="mt-1 text-xs text-white/70 leading-relaxed max-w-md">
                {bottomNote}
              </div>
            )}
          </div>

          {/* Right Column: Frosted Glassmorphism Card */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-3xl p-5 sm:p-6 lg:p-6 bg-white/[0.12] backdrop-blur-2xl border border-white/25 shadow-[0_12px_40px_0_rgba(0,0,0,0.45)]">
              {cardTitle && (
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3 font-poppins">
                  {cardTitle}
                </h2>
              )}
              {children}
            </div>
          </div>

        </div>
      </main>

    </div>
  );
};

export default AuthLayout;
