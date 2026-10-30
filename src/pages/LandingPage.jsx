import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  TrendingUp,
  Shield,
  Heart,
  Target,
  Clock,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Play,
  Users,
  User,
  Star,
  BookOpen,
  Award,
  ChevronRight,
  Menu,
  X,
  Smile,
  Zap,
  BarChart3,
  Feather,
  Eye
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   HIGHORBIT LUXURY EDITORIAL LANDING PAGE
   Theme: Warm Cream (#FBF9F5), Forest Pine (#183B2B), Sage Green
   Typography: High-Contrast Editorial Serif (Playfair Display) + Modern Sans
   ───────────────────────────────────────────────────────────── */

export const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFaq, setActiveFaq] = useState(null);

  // Categories for "Personalized Support for Real-Life Challenges"
  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: 'academic', label: 'Academic & Stress' },
    { id: 'confidence', label: 'Confidence & Voice' },
    { id: 'family', label: 'Family & Life' },
  ];

  const challengeCards = [
    {
      id: 'guidance',
      category: 'academic',
      title: 'Individual Guidance',
      tag: 'Self-Discovery',
      description: 'Personalized self-discovery assessments and tailored habit tracking to help you understand your unique strengths, learning style, and growth edges.',
      linkText: 'Explore self-discovery',
      icon: (
        <svg className="w-5 h-5 text-[#183B2B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#183B2B" opacity="0.25" />
        </svg>
      )
    },
    {
      id: 'wellness',
      category: 'academic',
      title: 'Emotional Wellness',
      tag: 'Mental Health & Resilience',
      description: 'Navigate academic burnout, exam anxiety, and emotional overwhelm with structured daily journaling, grounding exercises, and mood tracking.',
      linkText: 'Learn wellness tools',
      icon: (
        <svg className="w-5 h-5 text-[#183B2B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )
    },
    {
      id: 'growth',
      category: 'confidence',
      title: 'Growth & Habits',
      tag: 'Discipline & Skills',
      description: 'Build unshakable focus, discipline, and persuasive communication skills to thrive in school, university interviews, and early career opportunities.',
      linkText: 'View skill tracks',
      icon: (
        <svg className="w-5 h-5 text-[#183B2B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    },
    {
      id: 'bridge',
      category: 'family',
      title: 'Parent Bridge',
      tag: 'Collaborative Growth',
      description: 'A healthy, transparent window for parents to celebrate real milestones, assign growth challenges, and offer supportive guidance without micromanaging.',
      linkText: 'See parent overview',
      icon: (
        <svg className="w-5 h-5 text-[#183B2B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    }
  ];

  const filteredCards = activeCategory === 'all'
    ? challengeCards
    : challengeCards.filter(c => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#18221D] font-sans selection:bg-[#183B2B] selection:text-white antialiased">
      
      {/* ────────────────── TOP ANNOUNCEMENT BAR ────────────────── */}
      <div className="bg-[#183B2B] text-white/90 text-[11px] sm:text-xs py-2 px-4 text-center font-medium tracking-wide">
        <span>✨ HighOrbit Spring Cohort is now open for students (15–25) and supportive families.</span>
        <Link to="/register" className="ml-2 underline font-semibold text-[#DCE8DE] hover:text-white transition-colors">
          Claim Free Assessment →
        </Link>
      </div>

      {/* ────────────────── 1. NAVBAR ────────────────── */}
      <header className="sticky top-0 z-50 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#EBE7DF] transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-[#183B2B] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-[#DCE8DE]" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#18221D]">
              HighOrbit
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4B554E]">
            <a href="#about" className="hover:text-[#183B2B] transition-colors">About</a>
            <a href="#students" className="hover:text-[#183B2B] transition-colors">For Students</a>
            <a href="#parents" className="hover:text-[#183B2B] transition-colors">For Parents</a>
            <a href="#how-it-works" className="hover:text-[#183B2B] transition-colors">How It Works</a>
            <a href="#reviews" className="hover:text-[#183B2B] transition-colors">Stories</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs sm:text-sm font-medium text-[#4B554E] hover:text-[#183B2B] px-3 py-2 transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#183B2B] hover:bg-[#112D20] shadow-sm hover:shadow-md transition-all"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#18221D] hover:bg-[#EFECE6] rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FBF9F5] border-b border-[#EBE7DF] px-6 py-6 space-y-4 animate-fadeIn">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#18221D] py-1"
            >
              About HighOrbit
            </a>
            <a
              href="#students"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#18221D] py-1"
            >
              For Students (15–25)
            </a>
            <a
              href="#parents"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#18221D] py-1"
            >
              For Parents
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#18221D] py-1"
            >
              How It Works
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#18221D] py-1"
            >
              Reviews & Stories
            </a>
            <div className="pt-4 border-t border-[#EBE7DF] flex flex-col gap-2.5">
              <Link
                to="/login"
                className="w-full text-center py-2.5 rounded-full text-sm font-medium border border-[#DCD6C8] text-[#18221D]"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="w-full text-center py-2.5 rounded-full text-sm font-semibold text-white bg-[#183B2B]"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ────────────────── 2. HERO SECTION ────────────────── */}
      <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
          
          {/* Editorial Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#DCD6C8] bg-[#F5F1E8]/80 text-[#2D3F34] font-medium text-xs tracking-wider uppercase mb-6 sm:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#183B2B]" />
            <span>Personal Development for Students (15–25) & Parents</span>
          </div>

          {/* Master Serif Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal leading-[1.08] tracking-tight text-[#18221D] max-w-3xl">
            Stronger Mind.
            <br />
            <span className="italic font-normal text-[#234A36]">Better You.</span>
          </h1>

          {/* Supporting Paragraph */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-[#4B554E] max-w-2xl leading-relaxed font-normal">
            Guided self-discovery, emotional awareness, and practical life skills for students aged 15–25 — with transparent, supportive guidance for parents.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm sm:text-base font-semibold text-white bg-[#183B2B] hover:bg-[#112D20] shadow-[0_4px_20px_rgba(24,59,43,0.18)] hover:shadow-[0_6px_25px_rgba(24,59,43,0.25)] hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <span>Start Free Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm sm:text-base font-medium text-[#18221D] bg-[#EFECE4] hover:bg-[#E5E0D5] border border-[#D5CFBF]/60 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#18221D]" />
              <span>Watch How It Works</span>
            </a>
          </div>

          {/* Social Proof Avatars */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 text-xs sm:text-sm text-[#4B554E]">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#183B2B] text-white flex items-center justify-center font-bold text-xs border-2 border-[#FBF9F5]">
                SJ
              </div>
              <div className="w-8 h-8 rounded-full bg-[#4B735F] text-white flex items-center justify-center font-bold text-xs border-2 border-[#FBF9F5]">
                AL
              </div>
              <div className="w-8 h-8 rounded-full bg-[#8EAA95] text-[#18221D] flex items-center justify-center font-bold text-xs border-2 border-[#FBF9F5]">
                RM
              </div>
              <div className="w-8 h-8 rounded-full bg-[#DCE8DE] text-[#183B2B] flex items-center justify-center font-bold text-xs border-2 border-[#FBF9F5]">
                +4k
              </div>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <div className="flex text-amber-500 text-xs">★★★★★</div>
              <span>4.9/5 from 10,000+ students & parents who unlocked calm clarity</span>
            </div>
          </div>

          {/* ────────────────── HERO VISUAL CONTAINER ────────────────── */}
          <div className="mt-14 w-full max-w-3xl relative">
            
            {/* The Main Editorial Card */}
            <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-b from-[#EFECE4] to-[#E3DDD0] border border-[#DCD6C8] shadow-[0_20px_50px_rgba(24,59,43,0.08)] p-6 sm:p-10 flex flex-col items-center justify-center min-h-[360px] sm:min-h-[460px]">
              
              {/* Atmospheric Background Art: Calm Mindful Silhouette with Ambient Circles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-tr from-[#A3C6B1]/30 to-[#183B2B]/20 blur-2xl" />
              </div>

              {/* Gentle Mindful Illustration (Hands Over Heart / Centered Presence) */}
              <div className="relative z-10 flex flex-col items-center text-center max-w-md">
                
                {/* Mindful Orbit Symbol */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/80 backdrop-blur-md border border-[#DCD6C8] shadow-md flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-2 rounded-full border border-dashed border-[#183B2B]/30 animate-spin" style={{ animationDuration: '30s' }} />
                  <Heart className="w-10 h-10 text-[#183B2B] stroke-[1.75]" />
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#18221D] font-normal tracking-tight">
                  "I finally understand why I react the way I do, and how to stay grounded."
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-[#4B554E] font-medium tracking-wide">
                  Maya, 19 · University Freshman & HighOrbit Explorer
                </p>
              </div>

              {/* Floating Pill Badge (Bottom Right) */}
              <div className="relative sm:absolute sm:bottom-6 sm:right-6 mt-6 sm:mt-0 bg-white/95 backdrop-blur-md border border-[#DCD6C8] rounded-2xl p-4 shadow-[0_10px_30px_rgba(24,59,43,0.08)] flex items-center gap-3.5 text-left max-w-xs animate-fadeIn">
                <div className="w-10 h-10 rounded-xl bg-[#DCE8DE] text-[#183B2B] flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-[#183B2B]" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#183B2B]">
                    Confidence & Focus Index
                  </div>
                  <div className="text-xs text-[#4B554E] font-medium mt-0.5">
                    Score: <strong>88%</strong> · Calm, steady & on track
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ────────────────── 3. DARK FOREST STATEMENT BANNER ────────────────── */}
      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto rounded-[32px] bg-[#183B2B] text-white p-8 sm:p-12 md:p-16 text-center relative overflow-hidden shadow-xl">
          
          {/* Subtle Ambient Background Ring */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full border border-white/10 pointer-events-none" />

          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#A7D4B5] mb-4">
            A New Standard In Personal Growth
          </p>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-snug font-normal text-white max-w-3xl mx-auto">
            "A calm, non-judgmental space to build emotional resilience, self-discipline & lifelong clarity."
          </h2>

          <div className="mt-8 pt-8 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs sm:text-sm font-medium text-[#DCE8DE]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A7D4B5]" />
              Guided Self-Discovery
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A7D4B5]" />
              Focus & Habit Discipline
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A7D4B5]" />
              Parental Guidance & Trust
            </span>
          </div>

        </div>
      </section>

      {/* ────────────────── 4. PERSONALIZED SUPPORT / REAL-LIFE CHALLENGES ────────────────── */}
      <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#183B2B] mb-2">
            Why HighOrbit Matters
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#18221D] tracking-tight">
            Personalized Support for{' '}
            <span className="italic text-[#234A36]">Real-Life Challenges</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#4B554E] leading-relaxed">
            Transitioning into adulthood shouldn't mean facing academic stress, self-doubt, and major life decisions alone.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#183B2B] text-white shadow-sm'
                    : 'bg-[#EFECE4] text-[#4B554E] hover:bg-[#E5E0D5] hover:text-[#18221D]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 4 Cards Vertical / 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="rounded-3xl bg-white border border-[#E8E4DA] p-7 sm:p-8 hover:border-[#183B2B]/40 hover:shadow-[0_12px_30px_rgba(24,59,43,0.06)] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Card Icon */}
                <div className="w-12 h-12 rounded-2xl bg-[#EFECE4] flex items-center justify-center mb-5 group-hover:bg-[#DCE8DE] transition-colors">
                  {card.icon}
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-[#4B735F] mb-1">
                  {card.tag}
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#18221D] mb-3">
                  {card.title}
                </h3>

                <p className="text-sm text-[#4B554E] leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0ECE1] flex items-center justify-between text-xs sm:text-sm font-semibold text-[#183B2B] group-hover:text-[#112D20]">
                <span>{card.linkText}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ────────────────── 5. HOW IT WORKS: 4 STEPS ────────────────── */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-[#F3EFE6] border-y border-[#E8E4DA] px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-[#183B2B] mb-2">
              The HighOrbit Pathway
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#18221D]">
              A Simple, Structured <span className="italic text-[#234A36]">Four-Step Journey</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#4B554E]">
              From discovering your innate strengths to building sustainable daily momentum with supportive family backing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="rounded-3xl bg-white border border-[#E8E4DA] p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#183B2B] text-white font-serif font-bold text-sm flex items-center justify-center mb-5">
                  01
                </div>
                <h3 className="font-serif text-xl font-bold text-[#18221D] mb-2">Discover</h3>
                <p className="text-xs sm:text-sm text-[#4B554E] leading-relaxed">
                  Complete guided personality reflections, interest mapping, and strengths assessments to uncover who you really are.
                </p>
              </div>
              <div className="mt-6 text-[11px] font-bold text-[#4B735F] uppercase tracking-wider">
                Self-Knowledge
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-3xl bg-white border border-[#E8E4DA] p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#183B2B] text-white font-serif font-bold text-sm flex items-center justify-center mb-5">
                  02
                </div>
                <h3 className="font-serif text-xl font-bold text-[#18221D] mb-2">Understand</h3>
                <p className="text-xs sm:text-sm text-[#4B554E] leading-relaxed">
                  Receive personalized insights on your emotional triggers, study focus blocks, and social communication style.
                </p>
              </div>
              <div className="mt-6 text-[11px] font-bold text-[#4B735F] uppercase tracking-wider">
                Clarity & Awareness
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-3xl bg-white border border-[#E8E4DA] p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#183B2B] text-white font-serif font-bold text-sm flex items-center justify-center mb-5">
                  03
                </div>
                <h3 className="font-serif text-xl font-bold text-[#18221D] mb-2">Develop</h3>
                <p className="text-xs sm:text-sm text-[#4B554E] leading-relaxed">
                  Tackle bite-sized personal growth assignments, time management sprints, and real-world confidence activities.
                </p>
              </div>
              <div className="mt-6 text-[11px] font-bold text-[#4B735F] uppercase tracking-wider">
                Actionable Habit Sprints
              </div>
            </div>

            {/* Step 4 */}
            <div className="rounded-3xl bg-white border border-[#E8E4DA] p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#183B2B] text-white font-serif font-bold text-sm flex items-center justify-center mb-5">
                  04
                </div>
                <h3 className="font-serif text-xl font-bold text-[#18221D] mb-2">Reflect</h3>
                <p className="text-xs sm:text-sm text-[#4B554E] leading-relaxed">
                  Log daily reflections, celebrate completed milestones, and share approved progress summaries with your parents.
                </p>
              </div>
              <div className="mt-6 text-[11px] font-bold text-[#4B735F] uppercase tracking-wider">
                Measurable Milestones
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ────────────────── 6. DUAL DASHBOARDS: DESIGNED FOR YOUNG ADULTS, TRUSTED BY PARENTS ────────────────── */}
      <section id="students" className="py-20 sm:py-28 px-4 sm:px-6 max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#183B2B] mb-2">
            Complete Dual Architecture
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#18221D] tracking-tight">
            Designed for Young Adults.{' '}
            <span className="italic text-[#234A36]">Trusted by Parents.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#4B554E] leading-relaxed">
            Students retain 100% private ownership over their personal journal and inner thoughts, while parents receive high-level visibility to offer meaningful encouragement.
          </p>
        </div>

        {/* 2 Side-by-Side Cards (As Shown in Image) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Student Growth Sanctuary */}
          <div className="rounded-[32px] bg-white border border-[#E8E4DA] p-8 shadow-[0_8px_30px_rgba(24,59,43,0.04)] flex flex-col justify-between">
            <div>
              {/* Header badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#183B2B] bg-[#EFECE4] px-3 py-1 rounded-full">
                  For Students (15–25)
                </span>
                <User className="w-5 h-5 text-[#4B735F]" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#18221D] mb-3">
                100% Confidential Sanctuary
              </h3>

              <p className="text-sm text-[#4B554E] leading-relaxed mb-6">
                Your private arena to explore who you are, conquer self-doubt, set goals, and build daily momentum.
              </p>

              {/* Feature Checklist */}
              <div className="space-y-3.5 mb-8 text-xs sm:text-sm text-[#18221D]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#183B2B] shrink-0 mt-0.5" />
                  <span><strong>Personality & Strengths:</strong> Discover your archetype, natural talents, and communication style.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#183B2B] shrink-0 mt-0.5" />
                  <span><strong>Growth Challenges:</strong> Actionable prompts to practice speaking up, focus habits, and calm resilience.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#183B2B] shrink-0 mt-0.5" />
                  <span><strong>Encrypted Private Journal:</strong> Safe space to express emotions with zero parent or school access.</span>
                </div>
              </div>
            </div>

            <Link
              to="/register"
              className="w-full py-3.5 px-6 rounded-full text-center text-sm font-semibold text-[#18221D] bg-[#EFECE4] hover:bg-[#E5E0D5] border border-[#D5CFBF]/60 transition-all block"
            >
              Start Student Experience →
            </Link>
          </div>

          {/* Card 2: Parent Bridge & Guidance */}
          <div id="parents" className="rounded-[32px] bg-white border border-[#E8E4DA] p-8 shadow-[0_8px_30px_rgba(24,59,43,0.04)] flex flex-col justify-between">
            <div>
              {/* Header badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#183B2B] bg-[#EFECE4] px-3 py-1 rounded-full">
                  For Parents & Guardians
                </span>
                <Shield className="w-5 h-5 text-[#4B735F]" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#18221D] mb-3">
                Respectful Parent Bridge
              </h3>

              <p className="text-sm text-[#4B554E] leading-relaxed mb-6">
                Stay meaningfully connected to your student's progress and developmental stage without hovering or invading their privacy.
              </p>

              {/* Feature Checklist */}
              <div className="space-y-3.5 mb-8 text-xs sm:text-sm text-[#18221D]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#183B2B] shrink-0 mt-0.5" />
                  <span><strong>Activity & Progress Pulse:</strong> See completed assignments, focus consistency, and streaks.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#183B2B] shrink-0 mt-0.5" />
                  <span><strong>Collaborative Challenges:</strong> Recommend constructive real-world activities tailored to their goals.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#183B2B] shrink-0 mt-0.5" />
                  <span><strong>Parent Advice & Guidance:</strong> Practical psychology tips on how to support during university and career moves.</span>
                </div>
              </div>
            </div>

            <Link
              to="/register"
              className="w-full py-3.5 px-6 rounded-full text-center text-sm font-semibold text-white bg-[#183B2B] hover:bg-[#112D20] transition-all block shadow-sm"
            >
              Explore Parent Portal →
            </Link>
          </div>

        </div>

      </section>

      {/* ────────────────── 7. PLATFORM FEATURES GRID ────────────────── */}
      <section className="py-20 sm:py-28 bg-[#F3EFE6] border-y border-[#E8E4DA] px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#183B2B] mb-2">
              Everything You Need To Grow
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#18221D]">
              Comprehensive Tools for <span className="italic text-[#234A36]">Lifelong Success</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="rounded-3xl bg-white border border-[#E8E4DA] p-7">
              <div className="w-10 h-10 rounded-xl bg-[#DCE8DE] text-[#183B2B] flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#18221D] mb-2">Self-Discovery & Personality</h3>
              <p className="text-xs sm:text-sm text-[#4B554E] leading-relaxed">
                Evidence-based self-reflection tests to understand temperament, strengths, communication tendencies, and growth potential.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-[#E8E4DA] p-7">
              <div className="w-10 h-10 rounded-xl bg-[#DCE8DE] text-[#183B2B] flex items-center justify-center mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#18221D] mb-2">Growth Assignments</h3>
              <p className="text-xs sm:text-sm text-[#4B554E] leading-relaxed">
                Structured challenges designed to build confidence, public speaking poise, conflict resolution, and healthy boundaries.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-[#E8E4DA] p-7">
              <div className="w-10 h-10 rounded-xl bg-[#DCE8DE] text-[#183B2B] flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#18221D] mb-2">Focus & Wellness</h3>
              <p className="text-xs sm:text-sm text-[#4B554E] leading-relaxed">
                Practical techniques for conquering digital distraction, building deep study habits, and managing stress during exams.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-[#E8E4DA] p-7">
              <div className="w-10 h-10 rounded-xl bg-[#DCE8DE] text-[#183B2B] flex items-center justify-center mb-4">
                <Feather className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#18221D] mb-2">Daily Reflection</h3>
              <p className="text-xs sm:text-sm text-[#4B554E] leading-relaxed">
                Encrypted daily prompts that develop emotional intelligence, gratitude, mental resilience, and clarity of thought.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-[#E8E4DA] p-7">
              <div className="w-10 h-10 rounded-xl bg-[#DCE8DE] text-[#183B2B] flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#18221D] mb-2">Holistic Growth Reports</h3>
              <p className="text-xs sm:text-sm text-[#4B554E] leading-relaxed">
                Clear visual metrics tracking skill progression, habit streaks, and milestone achievements over months and years.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-[#E8E4DA] p-7">
              <div className="w-10 h-10 rounded-xl bg-[#DCE8DE] text-[#183B2B] flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#18221D] mb-2">Parent Guidance Tools</h3>
              <p className="text-xs sm:text-sm text-[#4B554E] leading-relaxed">
                Actionable tips for parents on how to communicate effectively, build trust, and empower young adults toward independence.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ────────────────── 8. FEATURED TESTIMONIAL (EXACT QUOTE FROM IMAGE) ────────────────── */}
      <section id="reviews" className="py-20 sm:py-28 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        
        {/* Large Decorative Quote Symbol */}
        <div className="font-serif text-6xl sm:text-7xl text-[#183B2B]/20 leading-none select-none mb-2">
          “
        </div>

        {/* The Exact Testimonial from the User's Screenshot */}
        <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl leading-relaxed text-[#18221D] font-normal italic max-w-3xl mx-auto">
          "HighOrbit gave my daughter a calm, non-judgmental space to run through university pressure and decision. Her demeanour has become calmer and she feels in charge of her life again."
        </blockquote>

        {/* User Attribution */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#DCE8DE] text-[#183B2B] font-bold text-xs flex items-center justify-center border border-[#183B2B]/20">
            DH
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-[#18221D]">Dr. H. Sharma</div>
            <div className="text-xs text-[#4B554E]">Mother of 18-yr-old student, UK</div>
          </div>
        </div>

      </section>

      {/* ────────────────── 9. FINAL CTA SECTION ────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-[#183B2B] text-white">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          
          <p className="text-xs font-semibold tracking-widest uppercase text-[#A7D4B5] mb-4">
            Begin Your Self-Discovery Journey
          </p>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-tight text-white mb-6">
            Your Potential Has <span className="italic text-[#DCE8DE]">No Limits.</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed mb-8">
            Join thousands of young adults (15–25) and supportive parents discovering genuine confidence, focus, and life direction.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-sm sm:text-base font-semibold text-[#183B2B] bg-white hover:bg-[#FBF9F5] shadow-lg hover:scale-[1.01] transition-all"
            >
              Start Your Free Journey →
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-7 py-4 rounded-full text-sm sm:text-base font-medium text-white/90 hover:text-white border border-white/20 hover:border-white/40 transition-all"
            >
              Log In to Portal
            </Link>
          </div>

        </div>
      </section>

      {/* ────────────────── 10. FOOTER ────────────────── */}
      <footer className="py-14 sm:py-20 bg-[#F0ECE1] border-t border-[#E8E4DA] px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-[#E0DACE]">
            
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <Link to="/" className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#183B2B] text-white flex items-center justify-center">
                  <Compass className="w-4 h-4 text-[#DCE8DE]" />
                </div>
                <span className="font-serif text-2xl font-bold tracking-tight text-[#18221D]">
                  HighOrbit
                </span>
              </Link>
              <p className="text-xs sm:text-sm text-[#4B554E] max-w-sm">
                Personal development, self-discovery, and emotional resilience platform for students aged 15–25 and their parents.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm font-medium text-[#4B554E]">
              <a href="#about" className="hover:text-[#183B2B] transition-colors">About</a>
              <a href="#students" className="hover:text-[#183B2B] transition-colors">For Students</a>
              <a href="#parents" className="hover:text-[#183B2B] transition-colors">For Parents</a>
              <a href="#how-it-works" className="hover:text-[#183B2B] transition-colors">How It Works</a>
              <Link to="/login" className="hover:text-[#183B2B] transition-colors">Log In</Link>
              <Link to="/register" className="hover:text-[#183B2B] transition-colors">Sign Up</Link>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5C665F]">
            <div>
              © 2026 HighOrbit. All rights reserved. 100% Student Privacy & Family-First Growth.
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="#" className="hover:underline">Contact Support</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
