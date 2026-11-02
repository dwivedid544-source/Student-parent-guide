import React from 'react';
import { Link } from 'react-router-dom';
import { FamilyStoriesSlider } from '../components/landing/FamilyStoriesSlider';
import { HeroMomCallVisual } from '../components/landing/HeroMomCallVisual';
import { PillarsVisualGrid } from '../components/landing/PillarsVisualGrid';

export const LandingPage = () => {
  return (
    <div className="bg-background text-on-surface antialiased overflow-x-hidden selection:bg-primary-fixed selection:text-on-primary-fixed font-body-md min-h-screen">
      {/*  Top Navigation (Shared Component compliant)  */}
      <header className="docked full-width top-0 sticky z-50 bg-surface-container-lowest/80 dark:bg-inverse-surface/80 backdrop-blur-md shadow-sm border-b border-surface-container dark:border-surface-variant/20 transition-all duration-200">
      <div className="flex justify-between items-center w-full px-margin-tablet lg:px-margin-desktop max-w-7xl mx-auto h-20 flex-nowrap gap-2 sm:gap-4">
        {/* Brand Logo & Emotional Badge */}
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0 whitespace-nowrap">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8B75E8] via-[#FF9EAD] to-[#FFE28A] p-[2px] shadow-sm flex items-center justify-center flex-shrink-0">
            <div className="w-full h-full bg-surface-container-lowest rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-xl" data-icon="favorite" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </div>
          </div>
          <span className="text-headline-md font-headline-md text-primary dark:text-inverse-primary tracking-tight whitespace-nowrap">HIGH ORBIT</span>
        </Link>

        {/* Desktop Nav Links - Single Line Pill with Shiny Hover Effects */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2.5 p-1 rounded-full bg-white/50 dark:bg-inverse-surface/40 backdrop-blur-xl border border-primary-fixed/40 shadow-xs flex-nowrap whitespace-nowrap flex-shrink-0">
          <a
            href="#students"
            className="group relative overflow-hidden px-3.5 lg:px-4 py-2 rounded-full font-label-md text-on-surface-variant hover:text-primary bg-transparent hover:bg-white/95 backdrop-blur-md border border-transparent hover:border-primary-fixed/60 shadow-xs hover:shadow-[0_4px_20px_rgba(119,104,216,0.22)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent before:transition-transform before:duration-700 before:pointer-events-none"
          >
            <span className="material-symbols-outlined text-sm text-primary/70 group-hover:text-primary group-hover:scale-110 transition-transform">school</span>
            <span className="whitespace-nowrap">For Students</span>
          </a>

          <a
            href="#parents"
            className="group relative overflow-hidden px-3.5 lg:px-4 py-2 rounded-full font-label-md text-on-surface-variant hover:text-secondary bg-transparent hover:bg-white/95 backdrop-blur-md border border-transparent hover:border-secondary-fixed/60 shadow-xs hover:shadow-[0_4px_20px_rgba(254,157,172,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent before:transition-transform before:duration-700 before:pointer-events-none"
          >
            <span className="material-symbols-outlined text-sm text-secondary/70 group-hover:text-secondary group-hover:scale-110 transition-transform">family_restroom</span>
            <span className="whitespace-nowrap">For Parents</span>
          </a>

          <a
            href="#how-it-works"
            className="group relative overflow-hidden px-3.5 lg:px-4 py-2 rounded-full font-label-md text-on-surface-variant hover:text-primary bg-transparent hover:bg-white/95 backdrop-blur-md border border-transparent hover:border-primary-fixed/60 shadow-xs hover:shadow-[0_4px_20px_rgba(119,104,216,0.22)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent before:transition-transform before:duration-700 before:pointer-events-none"
          >
            <span className="material-symbols-outlined text-sm text-primary/70 group-hover:text-primary group-hover:rotate-45 transition-transform">insights</span>
            <span className="whitespace-nowrap">How It Works</span>
          </a>

          <a
            href="#stories"
            className="group relative overflow-hidden px-3.5 lg:px-4 py-2 rounded-full font-label-md text-on-surface-variant hover:text-[#944D12] bg-transparent hover:bg-white/95 backdrop-blur-md border border-transparent hover:border-[#FFBD8A]/60 shadow-xs hover:shadow-[0_4px_20px_rgba(255,189,138,0.28)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent before:transition-transform before:duration-700 before:pointer-events-none"
          >
            <span className="material-symbols-outlined text-sm text-[#944D12]/70 group-hover:text-[#944D12] group-hover:scale-110 transition-transform">auto_stories</span>
            <span className="whitespace-nowrap">Stories</span>
          </a>

          <a
            href="#resources"
            className="group relative overflow-hidden px-3.5 lg:px-4 py-2 rounded-full font-label-md text-on-surface-variant hover:text-tertiary bg-transparent hover:bg-white/95 backdrop-blur-md border border-transparent hover:border-tertiary-fixed-dim/60 shadow-xs hover:shadow-[0_4px_20px_rgba(140,207,255,0.28)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent before:transition-transform before:duration-700 before:pointer-events-none"
          >
            <span className="material-symbols-outlined text-sm text-tertiary/70 group-hover:text-tertiary group-hover:scale-110 transition-transform">spa</span>
            <span className="whitespace-nowrap">Resources</span>
          </a>
        </nav>

        {/* Trailing CTAs - Single Line with Shiny Shimmer */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 flex-nowrap whitespace-nowrap">
          <Link
            to="/login"
            className="group relative overflow-hidden hidden sm:inline-flex px-4 py-2.5 rounded-full font-label-md text-primary bg-white/70 hover:bg-white backdrop-blur-md border border-primary-fixed/50 hover:border-primary shadow-xs hover:shadow-[0_4px_16px_rgba(95,72,185,0.2)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 whitespace-nowrap flex-shrink-0 before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/90 before:to-transparent before:transition-transform before:duration-700 before:pointer-events-none"
          >
            <span className="whitespace-nowrap">Sign In</span>
          </Link>

          <Link
            to="/register"
            className="group relative overflow-hidden px-5 py-2.5 rounded-full font-label-md text-on-primary bg-gradient-to-r from-primary to-secondary-container hover:shadow-[0_6px_24px_rgba(95,72,185,0.35)] hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center gap-1.5 shadow-sm whitespace-nowrap flex-shrink-0 before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent before:transition-transform before:duration-700 before:pointer-events-none"
          >
            <span className="material-symbols-outlined text-sm" data-icon="hub">hub</span>
            <span className="whitespace-nowrap">Connect Family</span>
          </Link>
        </div>
      </div>
    </header>
      {/*  Section 1 – Hero Section  */}
      <section className="relative pt-12 pb-20 md:py-24 rainbow-mesh overflow-hidden">
      <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
      {/*  Hero Text  */}
      <div className="lg:col-span-6 space-y-space-md text-center lg:text-left z-10">
      <div className="inline-flex items-center gap-2 px-space-md py-1.5 rounded-full bg-surface-container-highest text-primary font-label-sm border border-primary-fixed shadow-sm">
      <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
                  Hostel &amp; Dormitory Emotional Wellness
                </div>
      <h1 className="text-headline-xl-mobile md:text-headline-xl font-headline-xl text-on-surface text-balance">
                  Distance Should Never Mean Disconnection.
                </h1>
      <p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl mx-auto lg:mx-0">
                  Helping young minds and parents understand each other, share feelings, and build stronger emotional connections — even when miles apart.
                </p>
      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-space-md pt-2">
      <Link to="/register" className="w-full sm:w-auto px-space-xl py-3.5 rounded-full font-label-lg text-on-primary bg-primary shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all duration-200 text-center">Get Started</Link>
      <a className="w-full sm:w-auto px-space-xl py-3.5 rounded-full font-label-lg text-tertiary bg-surface-container-lowest border-2 border-tertiary-fixed-dim hover:bg-tertiary-fixed/30 active:scale-95 transition-all duration-200 text-center flex items-center justify-center gap-2" href="#preview">
      <span className="material-symbols-outlined text-tertiary" data-icon="play_circle">play_circle</span>
                    Explore How It Works
                  </a>
      </div>
      {/*  Micro Trust Stats  */}
      <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-on-surface-variant font-label-sm">
      <div className="flex items-center gap-1.5">
      <span className="material-symbols-outlined text-secondary-container" data-icon="verified_user">verified_user</span>
      <span>100% Zero-Judgment Space</span>
      </div>
      <div className="flex items-center gap-1.5">
      <span className="material-symbols-outlined text-primary" data-icon="lock">lock</span>
      <span>Private Family Encryption</span>
      </div>
      </div>
      </div>
      {/*  Hero Visual with Interactive 3D Scene & Floating Cards  */}
      <div className="lg:col-span-6 relative mt-8 lg:mt-0 flex justify-center items-center">
      {/*  Embedded 3D Scene (as requested)  */}
      <HeroMomCallVisual />
      </div>
      </div>
      </div>
      </section>
      {/*  Section 2 – Understanding Their Feelings ("Sometimes, They Just Need Someone to Listen")  */}
      <section className="py-20 bg-surface-container-lowest" id="students">
      <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
      <span className="px-space-md py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm">The Distant Student Reality</span>
      <h2 className="text-headline-lg font-headline-lg text-on-surface">
                "Sometimes, They Just Need Someone to Listen"
              </h2>
      <p className="text-body-md font-body-md text-on-surface-variant">
                Life in college dorms and hostels carries silent emotional weights. Acknowledging these invisible moments is the first step toward genuine comfort.
              </p>
      </div>
            {/*  Bento Grid of 5 Emotional Challenge Cards  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/*  1. Feeling Alone (Lavender)  */}
        <div className="p-space-lg rounded-3xl bg-[#FAF8FF] border border-[#B9A5FF]/40 soft-hover flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#E6DEFF] flex items-center justify-center text-primary mb-4 shadow-sm">
              <span className="material-symbols-outlined text-2xl" data-icon="bed">bed</span>
            </div>
            <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">Feeling Alone</h3>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              Quiet evenings in dimly lit hostel rooms after classes end, missing the effortless comfort and gentle chatter of home.
            </p>
            <div className="mt-4 rounded-2xl overflow-hidden aspect-[16/10] border border-[#B9A5FF]/20 shadow-sm">
              <img
                src="/assets/landing/distant_feeling_alone.jpg"
                alt="Student feeling alone in hostel room"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-[#B9A5FF]/20 flex items-center justify-between font-label-sm text-primary">
            <span>Room silence: 8:45 PM</span>
            <span className="material-symbols-outlined text-sm" data-icon="nightlight">nightlight</span>
          </div>
        </div>

        {/*  2. Missing Home (Coral Pink)  */}
        <div className="p-space-lg rounded-3xl bg-[#FFF8F9] border border-[#FF9EAD]/40 soft-hover flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#FFD9DD] flex items-center justify-center text-secondary mb-4 shadow-sm">
              <span className="material-symbols-outlined text-2xl" data-icon="cookie">cookie</span>
            </div>
            <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">Missing Home</h3>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              Craving mom's hot meals, spontaneous living room laughter, and having someone notice when you aren't feeling well.
            </p>
            <div className="mt-4 rounded-2xl overflow-hidden aspect-[16/10] border border-[#FF9EAD]/20 shadow-sm">
              <img
                src="/assets/landing/distant_missing_home.jpg"
                alt="Student video-calling parents and missing home"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-[#FF9EAD]/20 flex items-center justify-between font-label-sm text-secondary">
            <span>Comfort cravings</span>
            <span className="material-symbols-outlined text-sm" data-icon="soup_kitchen">soup_kitchen</span>
          </div>
        </div>

        {/*  3. Academic Pressure (Soft Orange)  */}
        <div className="p-space-lg rounded-3xl bg-[#FFFBF7] border border-[#FFBD8A]/40 soft-hover flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#FFE5D4] flex items-center justify-center text-[#944D12] mb-4 shadow-sm">
              <span className="material-symbols-outlined text-2xl" data-icon="menu_book">menu_book</span>
            </div>
            <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">Academic Pressure</h3>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              Semester exams, placement anxieties, and the silent fear of letting parents down who worked hard to send them away.
            </p>
            <div className="mt-4 rounded-2xl overflow-hidden aspect-[16/10] border border-[#FFBD8A]/20 shadow-sm">
              <img
                src="/assets/landing/distant_academic_pressure.jpg"
                alt="Student studying under academic exam pressure"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-[#FFBD8A]/20 flex items-center justify-between font-label-sm text-[#944D12]">
            <span>Expectation weight</span>
            <span className="material-symbols-outlined text-sm" data-icon="balance">balance</span>
          </div>
        </div>

        {/*  4. Emotional Stress (Sky Blue)  */}
        <div className="p-space-lg rounded-3xl bg-[#F6FBFF] border border-[#8CCFFF]/40 soft-hover flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#DDF1FF] flex items-center justify-center text-tertiary mb-4 shadow-sm">
              <span className="material-symbols-outlined text-2xl" data-icon="sentiment_neutral">sentiment_neutral</span>
            </div>
            <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">Emotional Stress</h3>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              Keeping struggles strictly secret during weekly calls so parents won't worry or lose sleep back home.
            </p>
            <div className="mt-4 rounded-2xl overflow-hidden aspect-[16/10] border border-[#8CCFFF]/20 shadow-sm">
              <img
                src="/assets/landing/distant_emotional_stress.jpg"
                alt="Student sitting thoughtfully near window under emotional stress"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-[#8CCFFF]/20 flex items-center justify-between font-label-sm text-tertiary">
            <span>Masking vulnerability</span>
            <span className="material-symbols-outlined text-sm" data-icon="visibility_off">visibility_off</span>
          </div>
        </div>

        {/*  5. Communication Gap (Sunshine Yellow - Span 2 on md/lg)  */}
        <div className="p-space-lg rounded-3xl bg-[#FFFDF5] border border-[#FFE28A]/50 soft-hover md:col-span-2 lg:col-span-2 flex flex-col justify-between overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FFF5D1] flex items-center justify-center text-[#7A6000] mb-4 shadow-sm">
                <span className="material-symbols-outlined text-2xl" data-icon="call_missed">call_missed</span>
              </div>
              <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">The "Everything is Fine" Trap</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant mb-4">
                When parent calls feel like performance reviews or chores, conversations shrink down to five-word replies: "Yes, I ate. Classes are fine."
              </p>
              <div className="bg-surface-container-lowest p-space-md rounded-2xl border border-[#FFE28A]/30 space-y-2">
                <div className="text-xs font-label-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#7A6000]" data-icon="sync_alt">sync_alt</span>
                  Before &amp; After HIGH ORBIT
                </div>
                <div className="text-xs p-2 rounded-lg bg-surface-container-low text-on-surface-variant line-through opacity-75">
                  "Did you score high on the unit test?"
                </div>
                <div className="text-xs p-2 rounded-lg bg-primary-fixed/40 text-primary font-medium">
                  "Saw your energy drop this morning. Sending you chai love, no need to call back!"
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[16/11] border border-[#FFE28A]/30 shadow-sm w-full my-auto">
              <img
                src="/assets/landing/distant_everything_fine_trap.jpg"
                alt="Student hiding real emotions while on call with parents"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-[#FFE28A]/30 flex items-center justify-between font-label-sm text-[#7A6000]">
            <span>Breaking through defensive walls</span>
            <span className="material-symbols-outlined text-sm" data-icon="spa">spa</span>
          </div>
        </div>
      </div>
      </div>
      </section>
      {/*  Section 3 – How HIGH ORBIT Helps (Platform Pillars)  */}
      <section className="py-20 bg-surface-container-low rainbow-mesh">
      <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
      <span className="px-space-md py-1 rounded-full bg-primary-fixed text-primary font-label-sm">Empathetic Framework</span>
      <h2 className="text-headline-lg font-headline-lg text-on-surface">
                Building Bridges, Not Interrogations
              </h2>
      <p className="text-body-md font-body-md text-on-surface-variant">
                Six foundational pillars engineered to cultivate genuine Asynchronous Affection across every hostel and campus.
              </p>
      </div>
      <PillarsVisualGrid />
      </div>
      </section>
      {/*  Section 4 – Parent & Child Connection (Split-Layout)  */}
      <section className="py-20 bg-surface-container-lowest" id="parents">
      <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
      <span className="px-space-md py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm">Synchronized Two-Way Portals</span>
      <h2 className="text-headline-lg font-headline-lg text-on-surface">
                Closer Conversations. Stronger Relationships.
              </h2>
      <p className="text-body-md font-body-md text-on-surface-variant">
                A balanced space honoring young adult autonomy while reassuring parents' deepest care.
              </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
      {/*  Left: Student Portal Card  */}
      <div className="bg-gradient-to-b from-[#FAF8FF] to-surface-container-lowest rounded-3xl p-8 border border-primary-fixed shadow-sm flex flex-col justify-between space-y-6">
      <div>
      <div className="flex items-center justify-between pb-4 border-b border-surface-container">
      <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">
                        S
                      </div>
      <div>
      <h4 className="font-headline-sm text-on-surface">Student Sanctuary</h4>
      <span className="text-xs text-on-surface-variant">Autonomous &amp; Private Control</span>
      </div>
      </div>
      <span className="px-3 py-1 rounded-full text-xs font-label-sm bg-tertiary-fixed text-on-tertiary-fixed-variant">Student Space</span>
      </div>
      <div className="mt-6 space-y-4">
      {/*  Student Post Bubble  */}
      <div className="bg-surface-container-lowest p-space-md rounded-2xl rounded-tl-sm border border-primary-fixed shadow-sm">
      <span className="text-xs font-label-sm text-primary uppercase tracking-wide">Shared with Mom</span>
      <p className="text-body-md font-body-md text-on-surface mt-1">
                        "I was scared to tell you on the phone, but I'm thinking of switching my electives to Design. Was worried you'd be disappointed."
                      </p>
      <div className="mt-3 flex items-center gap-3">
      <span className="px-2.5 py-1 rounded-full text-xs bg-surface-container-high text-on-surface-variant flex items-center gap-1">
      <span className="material-symbols-outlined text-xs text-secondary-container" data-icon="sentiment_dissatisfied">sentiment_dissatisfied</span>
                          Vulnerable Share
                        </span>
      <span className="text-xs text-on-surface-variant">Felt safe to express</span>
      </div>
      </div>
      {/*  Student Autonomy Toggle Mockup  */}
      <div className="bg-surface-container-lowest p-space-md rounded-2xl border border-surface-container flex items-center justify-between">
      <div>
      <h5 className="font-label-md text-on-surface">Selective Transparency</h5>
      <p className="text-xs text-on-surface-variant">You choose what to share and when.</p>
      </div>
      <div className="w-12 h-6 bg-primary rounded-full p-0.5 flex items-center justify-end cursor-pointer">
      <div className="w-5 h-5 bg-on-primary rounded-full shadow-sm"></div>
      </div>
      </div>
      </div>
      </div>
      <div className="p-3 rounded-xl bg-primary-fixed/30 text-primary font-label-sm flex items-center gap-2">
      <span className="material-symbols-outlined text-base" data-icon="lock">lock</span>
      <span>No location tracking • No secret app scanning • 100% Student Agency</span>
      </div>
      </div>
      {/*  Right: Parent Portal Card  */}
      <div className="bg-gradient-to-b from-[#FFF8FA] to-surface-container-lowest rounded-3xl p-8 border border-secondary-fixed shadow-sm flex flex-col justify-between space-y-6">
      <div>
      <div className="flex items-center justify-between pb-4 border-b border-surface-container">
      <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary font-bold">
                        P
                      </div>
      <div>
      <h4 className="font-headline-sm text-on-surface">Parent Companion</h4>
      <span className="text-xs text-on-surface-variant">Guided Empathetic Response</span>
      </div>
      </div>
      <span className="px-3 py-1 rounded-full text-xs font-label-sm bg-secondary-fixed text-on-secondary-fixed-variant">Parent Space</span>
      </div>
      <div className="mt-6 space-y-4">
      {/*  Active Listening Prompt Guide  */}
      <div className="bg-secondary-fixed/40 p-space-md rounded-2xl border border-secondary-container/40">
      <div className="flex items-center gap-1.5 text-secondary font-label-sm mb-1">
      <span className="material-symbols-outlined text-sm" data-icon="lightbulb">lightbulb</span>
      <span>Companion Nudge: Active Listening</span>
      </div>
      <p className="text-xs text-on-secondary-fixed-variant">
                        Your child shared a vulnerable choice. Acknowledge their bravery before offering practical advice.
                      </p>
      </div>
      {/*  Parent Warm Reply Bubble  */}
      <div className="bg-surface-container-lowest p-space-md rounded-2xl rounded-tr-sm border border-secondary-container/30 shadow-sm">
      <span className="text-xs font-label-sm text-secondary uppercase tracking-wide">Mom's Response</span>
      <p className="text-body-md font-body-md text-on-surface mt-1">
                        "I'm so proud of your bravery to share this with me. Tell me what excites you about design! We can figure out the logistics together on Sunday."
                      </p>
      <div className="mt-3 flex items-center gap-2">
      <span className="px-2.5 py-1 rounded-full text-xs bg-secondary-fixed text-secondary font-medium flex items-center gap-1">
      <span className="material-symbols-outlined text-xs" data-icon="favorite" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                          Zero Judgment Delivered
                        </span>
      </div>
      </div>
      </div>
      </div>
      <div className="p-3 rounded-xl bg-secondary-fixed/30 text-secondary font-label-sm flex items-center justify-between">
      <span className="flex items-center gap-2">
      <span className="material-symbols-outlined text-base" data-icon="thermostat">thermostat</span>
      <span>Emotional Temperature: Connected &amp; Receptive</span>
      </span>
      <span className="text-xs bg-surface-container-lowest px-2 py-0.5 rounded-full font-bold">Safe</span>
      </div>
      </div>
      </div>
      </div>
      </section>
      {/*  Section 5 – How It Works (Simple 3-Step Process)  */}
      <section className="py-20 bg-surface-container-low" id="how-it-works">
      <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
      <span className="px-space-md py-1 rounded-full bg-primary-fixed text-primary font-label-sm">Simple 3-Step Journey</span>
      <h2 className="text-headline-lg font-headline-lg text-on-surface">
                Three Gentle Steps to Real Closeness
              </h2>
      <p className="text-body-md font-body-md text-on-surface-variant">
                Zero friction onboarding designed for tech-savvy students and busy parents alike.
              </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
      {/*  Step 1  */}
      <div className="glass-card p-8 rounded-3xl text-center relative soft-hover flex flex-col items-center justify-between">
        <div className="flex flex-col items-center w-full">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-primary to-primary-container text-on-primary font-headline-md flex items-center justify-center mb-4 shadow-md shadow-primary/20">
            01
          </div>
          <div className="w-36 h-36 my-3 flex items-center justify-center rounded-2xl overflow-hidden">
            <img
              src="/assets/landing/step1_connect.jpg"
              alt="Connect 3D illustration"
              className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-label-sm bg-primary-fixed text-primary mb-3">Connect</span>
          <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">Private Family Pairing</h3>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            Join HIGH ORBIT and pair in seconds with your parents using a 6-digit family key. Completely secluded from social media noise.
          </p>
        </div>
      </div>

      {/*  Step 2  */}
      <div className="glass-card p-8 rounded-3xl text-center relative soft-hover flex flex-col items-center justify-between">
        <div className="flex flex-col items-center w-full">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-secondary-container to-secondary text-on-primary font-headline-md flex items-center justify-center mb-4 shadow-md shadow-secondary/20">
            02
          </div>
          <div className="w-36 h-36 my-3 flex items-center justify-center rounded-2xl overflow-hidden">
            <img
              src="/assets/landing/step2_express.jpg"
              alt="Express 3D illustration"
              className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-label-sm bg-secondary-fixed text-secondary mb-3">Express</span>
          <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">Share at Your Pace</h3>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            Share mood drops, reflections, and hostel anecdotes when you have headspace. No guilt for delayed replies or busy study days.
          </p>
        </div>
      </div>

      {/*  Step 3  */}
      <div className="glass-card p-8 rounded-3xl text-center relative soft-hover flex flex-col items-center justify-between">
        <div className="flex flex-col items-center w-full">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-tertiary-container to-tertiary text-on-primary font-headline-md flex items-center justify-center mb-4 shadow-md shadow-tertiary/20">
            03
          </div>
          <div className="w-36 h-36 my-3 flex items-center justify-center rounded-2xl overflow-hidden">
            <img
              src="/assets/landing/step3_understand.jpg"
              alt="Understand 3D illustration"
              className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-label-sm bg-tertiary-fixed text-tertiary mb-3">Understand</span>
          <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">Deepen Mutual Trust</h3>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            Build empathetic habits, transform strained calls into cherished talks, and cement an unbreakable family bond for adulthood.
          </p>
        </div>
      </div>
      </div>
      </div>
      </section>
      {/*  Section 6 – Interactive Experience Preview (Software UI Mockups)  */}
      <section className="py-20 bg-surface-container-lowest" id="preview">
      <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
      <span className="px-space-md py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm">Product Interface Preview</span>
      <h2 className="text-headline-lg font-headline-lg text-on-surface">
                Thoughtfully Designed for Emotional Safety
              </h2>
      <p className="text-body-md font-body-md text-on-surface-variant">
                Experience what peaceful, pressure-free connection looks and feels like every day.
              </p>
      </div>
      {/*  App Mockup Bento Grid  */}
      <div className="space-y-8"><div className="relative bg-gradient-to-b from-[#FAF8FF] to-surface-container-lowest rounded-3xl p-4 sm:p-6 lg:p-8 border border-primary-fixed shadow-xl overflow-hidden"><div className="absolute -top-16 -right-16 w-64 h-64 bg-[#FF9EAD]/15 rounded-full blur-3xl pointer-events-none"></div><div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#8CCFFF]/20 rounded-full blur-3xl pointer-events-none"></div><div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-surface-container gap-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-secondary-container text-on-primary flex items-center justify-center shadow-sm"><span className="material-symbols-outlined text-xl" data-icon="dashboard">dashboard</span></div><div><h3 className="font-headline-sm text-on-surface">Interactive Student Companion Interface</h3><p className="text-xs text-on-surface-variant font-label-sm">Real-time synchronized wellness hub featuring emotional tracking, focus sessions &amp; family connection</p></div></div><div className="flex items-center gap-2"><span className="px-3 py-1 rounded-full text-xs font-label-sm bg-primary-fixed text-primary flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>Live Synced</span><span className="px-3 py-1 rounded-full text-xs font-label-sm bg-tertiary-fixed text-on-tertiary-fixed-variant">Private End-to-End</span></div></div><FamilyStoriesSlider /></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><div className="glass-card p-space-md rounded-2xl border border-secondary-container/30 flex items-start gap-3.5"><div className="w-10 h-10 rounded-xl bg-[#FFF5D1] text-[#7A6000] flex items-center justify-center flex-shrink-0 shadow-sm"><span className="material-symbols-outlined text-lg">self_improvement</span></div><div><h4 className="font-label-md text-on-surface">Calm the Racing Mind</h4><p className="text-xs text-on-surface-variant mt-1">8-minute guided audio reflections and meditation modules tailored for stressful exam weeks.</p></div></div><div className="glass-card p-space-md rounded-2xl border border-primary-fixed/40 flex items-start gap-3.5"><div className="w-10 h-10 rounded-xl bg-[#E6DEFF] text-primary flex items-center justify-center flex-shrink-0 shadow-sm"><span className="material-symbols-outlined text-lg">mood</span></div><div><h4 className="font-label-md text-on-surface">Emotional Check-In Dial</h4><p className="text-xs text-on-surface-variant mt-1">Interactive mood spectrum capturing mental battery, sleep goals, and honest emotional deficit alerts.</p></div></div><div className="glass-card p-space-md rounded-2xl border border-[#FFE28A]/40 flex items-start gap-3.5"><div className="w-10 h-10 rounded-xl bg-[#FFE5D4] text-[#944D12] flex items-center justify-center flex-shrink-0 shadow-sm"><span className="material-symbols-outlined text-lg">timer</span></div><div><h4 className="font-label-md text-on-surface">Focus Time &amp; Sleep Goal</h4><p className="text-xs text-on-surface-variant mt-1">Balanced time management giving students autonomy over study rhythms without parent micro-management.</p></div></div><div className="glass-card p-space-md rounded-2xl border border-[#8CCFFF]/40 flex items-start gap-3.5"><div className="w-10 h-10 rounded-xl bg-[#DDF1FF] text-tertiary flex items-center justify-center flex-shrink-0 shadow-sm"><span className="material-symbols-outlined text-lg">history_edu</span></div><div><h4 className="font-label-md text-on-surface">Daily Reflection History</h4><p className="text-xs text-on-surface-variant mt-1">Safe thought logs, weekly happiness trends, and mutual appreciation moments shared asynchronously.</p></div></div></div></div>
      </div>
      </section>
      {/*  Section 7 – Why HIGH ORBIT? (Core Trust Pillars)  */}
      <section className="py-20 bg-surface-container-low rainbow-mesh">
      <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
      <span className="px-space-md py-1 rounded-full bg-primary-fixed text-primary font-label-sm">Built On Total Trust</span>
      <h2 className="text-headline-lg font-headline-lg text-on-surface">
                Why Families Trust HIGH ORBIT
              </h2>
      <p className="text-body-md font-body-md text-on-surface-variant">
                We designed our entire system around student dignity and parental peace of mind.
              </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="glass-card p-space-lg rounded-3xl space-y-3 soft-hover">
      <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
      <span className="material-symbols-outlined" data-icon="lock_open">lock_open</span>
      </div>
      <h3 className="font-headline-sm text-on-surface">A Safe Space to Express Yourself</h3>
      <p className="text-body-sm text-on-surface-variant">
                  No fear of criticism or immediate disciplinary lectures. Feelings are received with curiosity first.
                </p>
      </div>
      <div className="glass-card p-space-lg rounded-3xl space-y-3 soft-hover">
      <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center">
      <span className="material-symbols-outlined" data-icon="chat_bubble">chat_bubble</span>
      </div>
      <h3 className="font-headline-sm text-on-surface">Better Parent-Child Communication</h3>
      <p className="text-body-sm text-on-surface-variant">
                  Move past superficial monosyllabic updates into emotional honesty that deepens with every month.
                </p>
      </div>
      <div className="glass-card p-space-lg rounded-3xl space-y-3 soft-hover">
      <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
      <span className="material-symbols-outlined" data-icon="psychology">psychology</span>
      </div>
      <h3 className="font-headline-sm text-on-surface">Emotional Awareness &amp; Self-Discovery</h3>
      <p className="text-body-sm text-on-surface-variant">
                  Young adults learn to identify burnout, navigate stress, and articulate complex feelings with mature confidence.
                </p>
      </div>
      <div className="glass-card p-space-lg rounded-3xl space-y-3 soft-hover">
      <div className="w-10 h-10 rounded-xl bg-[#FFE28A]/40 text-[#7A6000] flex items-center justify-center">
      <span className="material-symbols-outlined" data-icon="handshake">handshake</span>
      </div>
      <h3 className="font-headline-sm text-on-surface">Stronger Family Relationships</h3>
      <p className="text-body-sm text-on-surface-variant">
                  Living independently creates healthy growth instead of emotional distance. Family stays your safe haven.
                </p>
      </div>
      <div className="glass-card p-space-lg rounded-3xl space-y-3 soft-hover md:col-span-2 lg:col-span-2">
      <div className="w-10 h-10 rounded-xl bg-[#DDF1FF] text-tertiary flex items-center justify-center">
      <span className="material-symbols-outlined" data-icon="no_encryption">no_encryption</span>
      </div>
      <h3 className="font-headline-sm text-on-surface">Support Without Judgment (Zero Surveillance Guarantee)</h3>
      <p className="text-body-sm text-on-surface-variant">
                  HIGH ORBIT is strictly NOT a parental control tool. There is no GPS tracking, no screen time policing, no reading hidden chat logs. Respecting privacy is how genuine trust survives.
                </p>
      </div>
      </div>
      </div>
      </section>
      {/*  Section 8 – Testimonials (Authentic Student & Parent Voices)  */}
      <section className="py-20 bg-surface-container-lowest" id="stories">
      <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
      <span className="px-space-md py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm">Real Family Journeys</span>
      <h2 className="text-headline-lg font-headline-lg text-on-surface">
                Loved by Students &amp; Reassuring to Parents
              </h2>
      <p className="text-body-md font-body-md text-on-surface-variant">
                Hear how HIGH ORBIT transformed conversations across state lines.
              </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/*  Testimonial 1: Student  */}
      <div className="bg-[#FAF8FF] border border-[#B9A5FF]/30 p-8 rounded-3xl flex flex-col justify-between soft-hover shadow-sm">
      <div className="space-y-4">
      <div className="flex items-center gap-1 text-primary">
      <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
      <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
      <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
      <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
      <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
      </div>
      <p className="text-body-md font-body-md text-on-surface italic">
                    "HIGH ORBIT helped me tell my mom I was burned out during midterms without her panicking or booking an emergency flight. She sent a quiet audio note that made me cry happy tears in my hostel room."
                  </p>
      </div>
      <div className="mt-8 pt-4 border-t border-surface-container flex items-center gap-3">
      <div className="w-11 h-11 rounded-full bg-primary-fixed flex items-center justify-center font-bold text-primary">
                    AR
                  </div>
      <div>
      <h4 className="font-label-md text-on-surface">Ananya R. (19)</h4>
      <p className="text-xs text-on-surface-variant">Sophomore, 1,200 km away in Pune hostel</p>
      </div>
      </div>
      </div>
      {/*  Testimonial 2: Parents  */}
      <div className="bg-[#FFF8FA] border border-[#FF9EAD]/30 p-8 rounded-3xl flex flex-col justify-between soft-hover shadow-sm">
      <div className="space-y-4">
      <div className="flex items-center gap-1 text-secondary">
      <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
      <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
      <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
      <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
      <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
      </div>
      <p className="text-body-md font-body-md text-on-surface italic">
                    "We stopped asking interrogative questions like 'did you study?' and started asking 'how did your heart feel today?' It saved our relationship with our son. He calls us willingly now."
                  </p>
      </div>
      <div className="mt-8 pt-4 border-t border-surface-container flex items-center gap-3">
      <div className="w-11 h-11 rounded-full bg-secondary-fixed flex items-center justify-center font-bold text-secondary">
                    RK
                  </div>
      <div>
      <h4 className="font-label-md text-on-surface">Rajesh &amp; Meera K.</h4>
      <p className="text-xs text-on-surface-variant">Parents of 21y Engineering student in Bengaluru</p>
      </div>
      </div>
      </div>
      {/*  Testimonial 3: Student  */}
      <div className="bg-[#F6FBFF] border border-[#8CCFFF]/30 p-8 rounded-3xl flex flex-col justify-between soft-hover shadow-sm">
      <div className="space-y-4">
      <div className="flex items-center gap-1 text-tertiary">
      <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
      <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
      <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
      <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
      <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
      </div>
      <p className="text-body-md font-body-md text-on-surface italic">
                    "It turned our tense weekly Sunday phone calls into warm, honest check-ins. I don't feel interrogated anymore; I feel like my dad is actually cheering for me as a growing adult."
                  </p>
      </div>
      <div className="mt-8 pt-4 border-t border-surface-container flex items-center gap-3">
      <div className="w-11 h-11 rounded-full bg-tertiary-fixed flex items-center justify-center font-bold text-tertiary">
                    KS
                  </div>
      <div>
      <h4 className="font-label-md text-on-surface">Kabir S. (20)</h4>
      <p className="text-xs text-on-surface-variant">Medical Student, Living away in Delhi</p>
      </div>
      </div>
      </div>
      </div>
      </div>
      </section>
      {/*  Section 9 – Final CTA Banner  */}
      <section className="py-20 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
      <div className="rounded-3xl p-10 md:p-16 bg-gradient-to-r from-[#FAF8FF] via-[#FFF5F7] to-[#FFF9F2] border border-[#B9A5FF]/40 shadow-xl relative overflow-hidden text-center max-w-5xl mx-auto">
      {/*  Decorative Ambient Pastel Glows  */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary-fixed/50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary-fixed/60 rounded-full blur-3xl pointer-events-none"></div>
      <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
      <div className="inline-flex items-center gap-2 px-space-md py-1 rounded-full bg-surface-container-lowest text-primary font-label-sm border border-primary-fixed shadow-sm">
      <span className="material-symbols-outlined text-sm text-secondary-container" data-icon="volunteer_activism">volunteer_activism</span>
                  Join Over 12,000 Connected Families
                </div>
      <h2 className="text-headline-xl-mobile md:text-headline-xl font-headline-xl text-on-surface">
                  Every Young Heart Deserves to Be Heard.
                </h2>
      <p className="text-body-lg font-body-lg text-on-surface-variant">
                  Start building a stronger connection with the people who matter most — even across distance. Pair your family in under 2 minutes.
                </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-space-md pt-4">
      <button className="w-full sm:w-auto px-space-xl py-4 rounded-full font-label-lg text-on-primary bg-primary shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all duration-200">
                    Join HIGH ORBIT Today
                  </button>
      <button className="w-full sm:w-auto px-space-xl py-4 rounded-full font-label-lg text-on-surface-variant bg-surface-container-lowest border border-outline-variant hover:bg-surface-container transition-all duration-200">
                    Talk to a Family Care Guide
                  </button>
      </div>
      <p className="text-xs text-on-surface-variant pt-2">
                  No credit card required for family pairing • Available on iOS, Android &amp; Web
                </p>
      </div>
      </div>
      </div>
      </section>
      {/*  Section 10 – Footer (Shared Component compliant)  */}
      <footer className="docked full-width bg-surface-container-low dark:bg-inverse-surface border-t border-surface-container-high dark:border-surface-variant/30" id="resources">
      <div className="w-full py-12 px-margin-tablet lg:px-margin-desktop max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
      {/*  Brand & Mission Column (Span 2)  */}
      <div className="lg:col-span-2 space-y-4">
      <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary-container p-[2px] flex items-center justify-center">
      <div className="w-full h-full bg-surface-container-lowest rounded-full flex items-center justify-center">
      <span className="material-symbols-outlined text-primary text-sm" data-icon="favorite" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
      </div>
      </div>
      <span className="text-headline-sm font-headline-sm text-primary dark:text-inverse-primary">HIGH ORBIT</span>
      </div>
      <p className="text-body-sm font-body-sm text-on-surface-variant dark:text-surface-variant max-w-sm">
                  Reassuring spaces for young adults living away from home and their parents. Transforming physical distance into deeper emotional understanding.
                </p>
      <div className="p-3 rounded-2xl bg-surface-container-lowest dark:bg-inverse-surface/60 border border-surface-container flex items-center gap-3">
      <span className="material-symbols-outlined text-secondary text-xl" data-icon="support_agent">support_agent</span>
      <div className="text-xs">
      <span className="font-bold block text-on-surface">24/7 Student Wellbeing Hotline</span>
      <span className="text-on-surface-variant">Confidential support: 1-800-CARE-ORBIT</span>
      </div>
      </div>
      </div>
      {/*  Navigation Links Column 1  */}
      <div className="space-y-3">
      <h4 className="font-label-md text-on-surface uppercase tracking-wider text-xs">Platform</h4>
      <ul className="space-y-2 text-label-sm font-label-sm">
      <li><a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors" href="#how-it-works">How It Works</a></li>
      <li><a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors" href="#students">For Students</a></li>
      <li><a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors" href="#parents">For Parents</a></li>
      <li><a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors" href="#stories">Family Stories</a></li>
      <li><a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors" href="#">Campus Partnerships</a></li>
      </ul>
      </div>
      {/*  Navigation Links Column 2  */}
      <div className="space-y-3">
      <h4 className="font-label-md text-on-surface uppercase tracking-wider text-xs">Resources &amp; Care</h4>
      <ul className="space-y-2 text-label-sm font-label-sm">
      <li><a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors" href="#">Parent Check-In Guide</a></li>
      <li><a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors" href="#">Student Wellbeing Hotlines</a></li>
      <li><a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors" href="#">Daily Rituals</a></li>
      <li><a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors" href="#">Emotional Safety Protocol</a></li>
      <li><a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors" href="#">Community Guidelines</a></li>
      </ul>
      </div>
      {/*  Navigation Links Column 3  */}
      <div className="space-y-3">
      <h4 className="font-label-md text-on-surface uppercase tracking-wider text-xs">Privacy &amp; Dignity</h4>
      <ul className="space-y-2 text-label-sm font-label-sm">
      <li><a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors" href="#">Zero-Spy Guarantee</a></li>
      <li><a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors" href="#">Privacy &amp; Care</a></li>
      <li><a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors" href="#">Terms of Safe Use</a></li>
      <li><a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors" href="#">Hostel Care Network</a></li>
      </ul>
      </div>
      </div>
      {/*  Copyright & Bottom Bar  */}
      <div className="pt-8 border-t border-surface-container dark:border-surface-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-body-sm font-body-sm text-on-surface-variant dark:text-surface-variant text-center sm:text-left">
                © 2025 HIGH ORBIT. Reassuring spaces for young adults &amp; families everywhere.
              </p>
      <div className="flex items-center gap-4 text-label-sm text-on-surface-variant">
      <span className="flex items-center gap-1">
      <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                  Encrypted &amp; Host-Agnostic
                </span>
      </div>
      </div>
      </div>
      </footer>
    </div>
  );
};

export default LandingPage;
