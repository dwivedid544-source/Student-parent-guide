import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Heart,
  Target,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Play,
  Users,
  Shield,
  BookOpen,
  ChevronRight,
  Menu,
  X,
  Star,
  Lock,
  Calendar,
  BarChart3,
  Feather,
  Smile,
  ArrowUpRight,
  Check
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   HIGHORBIT PREMIUM EDITORIAL LANDING PAGE
   Theme: Warm Ivory / Cream (#FAF8F5, #F5F1E8), Forest Pine (#194333, #16382B)
   Typography: High-Contrast Editorial Serif + Clean Sans
   Design: Frosted Glassmorphism, Arched Editorial Imagery, Botanical Flourishes
   ───────────────────────────────────────────────────────────── */

// Delicate Botanical Olive / Eucalyptus SVG Flourish
const BotanicalFlourish = ({ className = 'w-24 h-24', color = '#3A5C47', opacity = 0.75 }) => (
  <svg
    viewBox="0 0 140 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ opacity }}
    aria-hidden="true"
  >
    {/* Central Branch */}
    <path
      d="M70 170 C65 125, 75 75, 55 15"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Leaves */}
    <path
      d="M66 140 C42 135, 24 112, 30 94 C38 97, 56 114, 66 130"
      fill={color}
    />
    <path
      d="M72 115 C95 110, 110 88, 104 70 C94 75, 80 94, 72 106"
      fill={color}
    />
    <path
      d="M63 88 C40 80, 30 58, 38 42 C46 47, 57 64, 63 78"
      fill={color}
    />
    <path
      d="M70 62 C88 50, 98 32, 90 18 C80 22, 72 40, 68 54"
      fill={color}
    />
    <path
      d="M58 35 C45 22, 48 8, 55 15 C58 20, 58 28, 58 35"
      fill={color}
    />
  </svg>
);

// Botanical Leaf Branch for Section Framing
const BotanicalBranchSide = ({ className = 'w-32 h-64', color = '#4B735F' }) => (
  <svg
    viewBox="0 0 100 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M10 230 Q45 150 15 10"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.35"
    />
    <path d="M22 190 Q65 175 55 150 Q35 160 22 190Z" fill={color} opacity="0.3" />
    <path d="M26 140 Q75 120 62 95 Q40 108 26 140Z" fill={color} opacity="0.35" />
    <path d="M18 90 Q60 70 50 48 Q30 60 18 90Z" fill={color} opacity="0.4" />
    <path d="M15 40 Q45 25 38 12 Q24 20 15 40Z" fill={color} opacity="0.45" />
  </svg>
);

export const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('anxiety');
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [isAnnualPricing, setIsAnnualPricing] = useState(true);

  // Categories for "Personalized Support for Real-Life Challenges"
  const categories = [
    { id: 'anxiety', label: 'Anxiety & Stress' },
    { id: 'academic', label: 'Academic Pressure' },
    { id: 'confidence', label: 'Confidence Issues' },
    { id: 'family', label: 'Family & Life' },
  ];

  // 4 Core Challenge Cards
  const challengeCards = [
    {
      id: 'guidance',
      category: 'anxiety',
      title: 'Individual Guidance',
      tag: 'Self-Discovery',
      description: 'Talk to certified counsellors and get personalized support.',
      linkText: 'Explore Guidance',
      icon: (
        <Compass className="w-5 h-5 text-[#194333]" />
      )
    },
    {
      id: 'wellness',
      category: 'anxiety',
      title: 'Emotional Wellness',
      tag: 'Mental Health & Resilience',
      description: 'Manage stress, build resilience, and find inner peace.',
      linkText: 'Explore Wellness',
      icon: (
        <Heart className="w-5 h-5 text-[#194333]" />
      )
    },
    {
      id: 'growth',
      category: 'confidence',
      title: 'Growth & Habits',
      tag: 'Discipline & Skills',
      description: 'Set goals, build positive habits, and track your progress.',
      linkText: 'Explore Habits',
      icon: (
        <Target className="w-5 h-5 text-[#194333]" />
      )
    },
    {
      id: 'bridge',
      category: 'family',
      title: 'Parent Bridge',
      tag: 'Collaborative Growth',
      description: "Get tools to support your child's mental health journey.",
      linkText: 'Explore for Parents',
      icon: (
        <Users className="w-5 h-5 text-[#194333]" />
      )
    }
  ];

  // Four-Step Journey Cards
  const fourSteps = [
    {
      step: '1',
      title: 'Discover',
      caption: 'Understand your thoughts, emotions, and unique strengths.',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80',
      badge: 'Step 01'
    },
    {
      step: '2',
      title: 'Understand',
      caption: 'Learn about your patterns and build self-awareness.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80',
      badge: 'Step 02'
    },
    {
      step: '3',
      title: 'Develop',
      caption: 'Build healthy habits and practical life skills.',
      image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80',
      badge: 'Step 03'
    },
    {
      step: '4',
      title: 'Reflect',
      caption: 'Track progress and celebrate your growth.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
      badge: 'Step 04'
    }
  ];

  // Comprehensive Tools
  const comprehensiveTools = [
    {
      id: 'tool-1',
      title: 'Self-Discovery & Personality',
      icon: <Compass className="w-5 h-5 text-[#194333]" />
    },
    {
      id: 'tool-2',
      title: 'Growth Assignments',
      icon: <Target className="w-5 h-5 text-[#194333]" />
    },
    {
      id: 'tool-3',
      title: 'Focus & Wellness',
      icon: <Clock className="w-5 h-5 text-[#194333]" />
    },
    {
      id: 'tool-4',
      title: 'Daily Reflection',
      icon: <Feather className="w-5 h-5 text-[#194333]" />
    },
    {
      id: 'tool-5',
      title: 'Holistic Growth Reports',
      icon: <BarChart3 className="w-5 h-5 text-[#194333]" />
    },
    {
      id: 'tool-6',
      title: 'Parent Guidance Tools',
      icon: <Users className="w-5 h-5 text-[#194333]" />
    }
  ];

  // Testimonials Carousel Data
  const testimonials = [
    {
      quote:
        'HighOrbit gave my daughter a calm, non-judgmental space to explore her thoughts, manage stress and make better decisions. Her confidence and self-esteem have grown so much.',
      author: 'Priya Sharma',
      role: 'Parent of HighOrbit Member',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
    },
    {
      quote:
        'Instead of nagging about study routines, HighOrbit gave us a shared language. My son feels in control of his goals, and our family conversations are genuinely supportive.',
      author: 'Marcus Vance',
      role: 'Father of High School Senior',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
    },
    {
      quote:
        'The confidential sanctuary gave me room to understand my anxiety without feeling watched. It completely turned my college transition into an exciting adventure.',
      author: 'Ananya Rao',
      role: 'First-Year University Explorer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    }
  ];

  const currentTestimonial = testimonials[activeTestimonialIdx];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#19241E] font-sans selection:bg-[#194333] selection:text-white antialiased highorbit-landing-desktop-scale">

      {/* ────────────────── TOP ANNOUNCEMENT NOTICE BAR (COMMENTED OUT) ────────────────── */}
      {/* 
      <div className="bg-[#194333] text-white/95 text-[11px] sm:text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span>✨ A happier, healthier, more confident you — start today</span>
        <span className="hidden sm:inline text-white/50">•</span>
        <Link
          to="/register"
          className="underline font-semibold text-[#DCE8DE] hover:text-white transition-colors"
        >
          Claim Free Assessment →
        </Link>
      </div>
      */}

      {/* ────────────────── 1. NAVBAR ────────────────── */}
      <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EBE6DC] transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* HighOrbit Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-[#194333] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-[#DCE8DE]" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#19241E]">
              HighOrbit
            </span>
          </Link>

          {/* Desktop Nav Links with Dark Borders */}
          <nav className="hidden md:flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#194333]">
            <a
              href="#about"
              className="px-4 py-1.5 rounded-full border border-[#194333]/40 hover:border-[#194333] bg-white/60 hover:bg-[#194333] hover:text-white transition-all shadow-2xs"
            >
              About
            </a>
            <a
              href="#features"
              className="px-4 py-1.5 rounded-full border border-[#194333]/40 hover:border-[#194333] bg-white/60 hover:bg-[#194333] hover:text-white transition-all shadow-2xs"
            >
              Features
            </a>
            <a
              href="#parents"
              className="px-4 py-1.5 rounded-full border border-[#194333]/40 hover:border-[#194333] bg-white/60 hover:bg-[#194333] hover:text-white transition-all shadow-2xs"
            >
              For Parents
            </a>
            <a
              href="#resources"
              className="px-4 py-1.5 rounded-full border border-[#194333]/40 hover:border-[#194333] bg-white/60 hover:bg-[#194333] hover:text-white transition-all shadow-2xs"
            >
              Resources
            </a>
            <a
              href="#pricing"
              className="px-4 py-1.5 rounded-full border border-[#194333]/40 hover:border-[#194333] bg-white/60 hover:bg-[#194333] hover:text-white transition-all shadow-2xs"
            >
              Pricing
            </a>
          </nav>

          {/* Right Action Buttons with Dark Borders */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold text-[#194333] border-2 border-[#194333] hover:bg-[#194333] hover:text-white transition-all shadow-2xs"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-5 py-2 rounded-full text-xs sm:text-sm font-bold text-white bg-[#194333] hover:bg-[#133528] border-2 border-[#194333] shadow-sm hover:shadow-md transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#19241E] hover:bg-[#EFECE5] rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF8F5] border-b border-[#EBE6DC] px-6 py-6 space-y-4 animate-fadeIn">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#19241E] py-1"
            >
              About HighOrbit
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#19241E] py-1"
            >
              Features & Tools
            </a>
            <a
              href="#parents"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#19241E] py-1"
            >
              For Parents
            </a>
            <a
              href="#resources"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#19241E] py-1"
            >
              Resources & Stories
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#19241E] py-1"
            >
              Pricing
            </a>
            <div className="pt-4 border-t border-[#EBE6DC] flex flex-col gap-2.5">
              <Link
                to="/login"
                className="w-full text-center py-2.5 rounded-full text-sm font-medium border border-[#D5CEBF] text-[#19241E]"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="w-full text-center py-2.5 rounded-full text-sm font-semibold text-white bg-[#194333]"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ────────────────── 2. HERO SECTION (2-COLUMN BALANCED LAYOUT) ────────────────── */}
      <section className="relative pt-10 pb-16 sm:pt-14 sm:pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* LEFT COLUMN: Editorial Text & CTAs */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              
              {/* Category Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D5CEBF] bg-[#F2EDE2]/80 text-[#30483A] font-medium text-[11px] sm:text-xs tracking-wider uppercase mb-5 sm:mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#194333]" />
                <span>Personal Development for Young Adults (15–25)</span>
              </div>

              {/* Master Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-normal leading-[1.08] tracking-tight text-[#19241E]">
                Stronger Mind.
                <br />
                <span className="italic font-normal text-[#194333]">Better You.</span>
              </h1>

              {/* Supporting Value Proposition */}
              <p className="mt-5 text-base sm:text-lg text-[#4B5850] max-w-xl leading-relaxed font-normal">
                Guided self-discovery, emotional support, and personal-growth tools for students aged 15–25. Start your journey to a healthier, more confident you today.
              </p>

              {/* CTA Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-[#194333] hover:bg-[#133528] shadow-[0_4px_18px_rgba(25,67,51,0.2)] hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  <span>Start Your Free Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm sm:text-base font-medium text-[#19241E] bg-[#EFECE5] hover:bg-[#E5E0D5] border border-[#D5CEBF]/70 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-[#19241E]" />
                  <span>Watch How It Works</span>
                </a>
              </div>

              {/* Social Proof Badge & Avatars */}
              <div className="mt-9 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Student"
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#FAF8F5]"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Student"
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#FAF8F5]"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Student"
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#FAF8F5]"
                  />
                  <div className="w-8 h-8 rounded-full bg-[#DCE8DE] text-[#194333] flex items-center justify-center font-bold text-[11px] border-2 border-[#FAF8F5]">
                    +4k
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-[#4B5850]">
                  <span className="font-semibold text-[#19241E]">Join 250,000+</span> students on their journey to mental wellness
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Arched Lifestyle Portrait with Botanical Flourishes & Floating Pill */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              
              {/* Botanical Leaf Flourish Curling Over Top-Left of Arch */}
              <div className="absolute -top-10 -left-6 sm:-top-12 sm:-left-8 z-20 pointer-events-none transform -rotate-12">
                <BotanicalFlourish className="w-28 h-32 sm:w-36 sm:h-40" color="#26523D" opacity={0.85} />
              </div>

              {/* Decorative Glow Ambient Circle Behind Arch */}
              <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-[#DCE8DE]/50 blur-3xl pointer-events-none" />

              {/* Main Arched Window Frame */}
              <div className="relative z-10 w-full max-w-[380px] sm:max-w-[420px] rounded-t-[180px] rounded-b-[36px] overflow-hidden bg-[#EFECE5] border-[3px] border-white shadow-[0_20px_50px_rgba(25,67,51,0.12)] aspect-[4/5]">
                
                {/* Peaceful Woman Photo (Centered & Grounded) */}
                <img
                  src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1000&q=80"
                  alt="Young woman practicing mindfulness and calm breathing"
                  className="w-full h-full object-cover object-center filter brightness-[1.02] contrast-[1.02]"
                />

                {/* Subtle bottom gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

                {/* Floating Frosted Glass Badge (Bottom Right of Arch) */}
                <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-3.5 sm:p-4 shadow-[0_12px_32px_rgba(25,67,51,0.14)] flex items-center gap-3 text-left max-w-[240px] sm:max-w-[260px] animate-fadeIn">
                  <div className="w-9 h-9 rounded-xl bg-[#194333] text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-[#DCE8DE]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#194333]">
                      Your Growth Journey
                    </div>
                    <div className="text-xs text-[#4B5850] font-medium leading-tight mt-0.5">
                      Small steps today, stronger tomorrow.
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ────────────────── 3. DARK FOREST STATEMENT BANNER (SECTION 2) ────────────────── */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-[32px] sm:rounded-[38px] bg-[#194333] text-white p-8 sm:p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
          
          {/* Subtle Botanical Leaf Silhouette Watermarks in Corners */}
          <div className="absolute top-0 left-0 pointer-events-none transform -rotate-45 translate-x-[-15%] translate-y-[-15%] opacity-20">
            <BotanicalFlourish className="w-56 h-56" color="#FFFFFF" opacity={1} />
          </div>
          <div className="absolute bottom-0 right-0 pointer-events-none transform rotate-135 translate-x-[15%] translate-y-[15%] opacity-20">
            <BotanicalFlourish className="w-56 h-56" color="#FFFFFF" opacity={1} />
          </div>

          {/* Top Label */}
          <p className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-[#A7D4B5] mb-3">
            A Safe Space For You
          </p>

          {/* Master Serif Quote */}
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-snug font-normal text-white max-w-3xl mx-auto">
            "A calm, non-judgmental space to build emotional resilience, self-discipline & lifelong clarity."
          </h2>

          {/* 3 Checkmark Items in a Row */}
          <div className="mt-8 pt-8 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs sm:text-sm font-medium text-[#DCE8DE]">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#A7D4B5]" />
              Talk to Experts
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#A7D4B5]" />
              Build Healthy Habits
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#A7D4B5]" />
              Grow with Confidence
            </span>
          </div>

        </div>
      </section>

      {/* ────────────────── 4. PERSONALIZED SUPPORT / REAL-LIFE CHALLENGES (SECTION 3) ────────────────── */}
      <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#194333] mb-2">
            Our Comprehensive Support
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#19241E] tracking-tight">
            Personalized Support for{' '}
            <span className="italic text-[#194333]">Real-Life Challenges</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#4B5850] leading-relaxed">
            Whether you're struggling with anxiety, stress, or just need guidance, we're here to help — always.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#194333] text-white shadow-sm'
                    : 'bg-[#EFECE5] text-[#4B5850] hover:bg-[#E5E0D5] hover:text-[#19241E]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Relative Grid Container with Decorative Olive Branch on Right */}
        <div className="relative">
          
          {/* Decorative Olive Branch Illustration on Right */}
          <div className="hidden xl:block absolute -right-24 top-1/2 -translate-y-1/2 pointer-events-none">
            <BotanicalBranchSide className="w-36 h-80" color="#2F5C44" />
          </div>

          {/* 4 Frosted Glass Challenge Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            {challengeCards.map((card) => (
              <div
                key={card.id}
                className="rounded-3xl bg-white border border-[#E8E3D7] p-7 sm:p-8 hover:border-[#194333]/40 hover:shadow-[0_16px_36px_rgba(25,67,51,0.06)] transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Card Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-[#F2EDE2] flex items-center justify-center mb-5 group-hover:bg-[#DCE8DE] transition-colors">
                    {card.icon}
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#19241E] mb-2.5">
                    {card.title}
                  </h3>

                  <p className="text-sm text-[#4B5850] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* ────────────────── 5. A SIMPLE, STRUCTURED FOUR-STEP JOURNEY (SECTION 4) ────────────────── */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-[#F4F1EA] border-y border-[#EBE6DC] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-[#194333] mb-2">
              The HighOrbit Pathway
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#19241E]">
              A Simple, Structured{' '}
              <span className="italic text-[#194333]">Four-Step Journey</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#4B5850]">
              A clear path to self-discovery, personal growth and lasting well-being.
            </p>
          </div>

          {/* 4 Cards with Photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fourSteps.map((step) => (
              <div
                key={step.step}
                className="rounded-3xl bg-white border border-[#E8E3D7] p-5 sm:p-6 flex flex-col justify-between shadow-[0_6px_20px_rgba(25,67,51,0.03)] hover:shadow-[0_12px_28px_rgba(25,67,51,0.07)] transition-all group"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-full bg-[#194333] text-white font-serif font-bold text-xs flex items-center justify-center">
                      {step.step}
                    </div>
                    <span className="text-[11px] font-bold text-[#4B735F] uppercase tracking-wider">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#19241E] mb-3">
                    {step.title}
                  </h3>

                  {/* High Quality Photography Thumbnail */}
                  <div className="w-full h-36 rounded-2xl overflow-hidden mb-4 bg-[#EFECE5]">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Caption */}
                  <p className="text-xs sm:text-sm text-[#4B5850] leading-relaxed">
                    {step.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ────────────────── 6. DUAL CARDS: DESIGNED FOR YOUNG ADULTS, TRUSTED BY PARENTS (SECTION 5) ────────────────── */}
      <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#194333] mb-2">
            Designed for Young Adults
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#19241E] tracking-tight">
            Designed for Young Adults.{' '}
            <span className="italic text-[#194333]">Trusted by Parents.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#4B5850] leading-relaxed">
            A safe, supportive and evidence-based platform for your family.
          </p>
        </div>

        {/* 2 Wide Featured Cards Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: 100% Confidential Sanctuary */}
          <div className="rounded-[32px] bg-white border border-[#E8E3D7] p-7 sm:p-8 shadow-[0_10px_32px_rgba(25,67,51,0.04)] flex flex-col justify-between">
            <div>
              {/* Photo Header */}
              <div className="w-full h-44 rounded-2xl overflow-hidden mb-6 bg-[#EFECE5]">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                  alt="Student peaceful study sanctuary"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tag & Icon */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#194333] bg-[#F2EDE2] px-3 py-1 rounded-full">
                  For Students (15–25)
                </span>
                <Lock className="w-4 h-4 text-[#4B735F]" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#19241E] mb-2.5">
                100% Confidential Sanctuary
              </h3>

              <p className="text-sm text-[#4B5850] leading-relaxed mb-6">
                Your privacy is our priority. Share openly, without fear.
              </p>

              {/* Feature Checklist */}
              <div className="space-y-3 mb-8 text-xs sm:text-sm text-[#19241E]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#194333] shrink-0 mt-0.5" />
                  <span>Private journal with zero parent or school access</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#194333] shrink-0 mt-0.5" />
                  <span>Personalized self-discovery quests and assessments</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#194333] shrink-0 mt-0.5" />
                  <span>Set your own goals & track daily milestones</span>
                </div>
              </div>
            </div>

            <Link
              to="/register"
              className="w-full py-3.5 px-6 rounded-full text-center text-sm font-semibold text-[#19241E] bg-[#EFECE5] hover:bg-[#E5E0D5] border border-[#D5CEBF]/70 transition-all block"
            >
              Our Privacy Promise →
            </Link>
          </div>

          {/* Card 2: Respectful Parent Bridge */}
          <div id="parents" className="rounded-[32px] bg-white border border-[#E8E3D7] p-7 sm:p-8 shadow-[0_10px_32px_rgba(25,67,51,0.04)] flex flex-col justify-between">
            <div>
              {/* Photo Header */}
              <div className="w-full h-44 rounded-2xl overflow-hidden mb-6 bg-[#EFECE5]">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
                  alt="Mother and teenage son having a supportive conversation"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tag & Icon */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#194333] bg-[#F2EDE2] px-3 py-1 rounded-full">
                  For Parents & Guardians
                </span>
                <Users className="w-4 h-4 text-[#4B735F]" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#19241E] mb-2.5">
                Respectful Parent Bridge
              </h3>

              <p className="text-sm text-[#4B5850] leading-relaxed mb-6">
                Stay informed, support your child, and grow together.
              </p>

              {/* Feature Checklist */}
              <div className="space-y-3 mb-8 text-xs sm:text-sm text-[#19241E]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#194333] shrink-0 mt-0.5" />
                  <span>High-level developmental milestones & growth trends</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#194333] shrink-0 mt-0.5" />
                  <span>Practical expert guidance on healthy communication</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#194333] shrink-0 mt-0.5" />
                  <span>Assign collaborative real-world challenges</span>
                </div>
              </div>
            </div>

            <Link
              to="/login"
              className="w-full py-3.5 px-6 rounded-full text-center text-sm font-semibold text-white bg-[#194333] hover:bg-[#133528] transition-all block shadow-sm"
            >
              Learn More →
            </Link>
          </div>

        </div>

      </section>

      {/* ────────────────── 7. COMPREHENSIVE TOOLS FOR LIFELONG SUCCESS (SECTION 6) ────────────────── */}
      <section id="resources" className="py-20 sm:py-28 bg-[#F4F1EA] border-y border-[#EBE6DC] px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#194333] mb-2">
              Comprehensive Tools
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#19241E]">
              Comprehensive Tools for{' '}
              <span className="italic text-[#194333]">Lifelong Success</span>
            </h2>
          </div>

          {/* 6 Glass Capsules in a 3x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {comprehensiveTools.map((tool) => (
              <div
                key={tool.id}
                className="rounded-2xl bg-white border border-[#E8E3D7] p-5 shadow-[0_4px_16px_rgba(25,67,51,0.03)] hover:shadow-[0_8px_24px_rgba(25,67,51,0.08)] hover:border-[#194333]/40 transition-all flex items-center gap-4 cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F2EDE2] group-hover:bg-[#DCE8DE] text-[#194333] flex items-center justify-center shrink-0 transition-colors">
                  {tool.icon}
                </div>
                <span className="font-medium text-sm sm:text-base text-[#19241E] group-hover:text-[#194333] transition-colors">
                  {tool.title}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ────────────────── 8. TESTIMONIAL SPOTLIGHT (SECTION 7) ────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        
        <div className="rounded-[36px] bg-white border border-[#E8E3D7] p-8 sm:p-12 shadow-[0_12px_40px_rgba(25,67,51,0.05)] flex flex-col md:flex-row items-center gap-8 text-left relative">
          
          {/* Avatar on Left */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[#F2EDE2] shadow-md">
              <img
                src={currentTestimonial.avatar}
                alt={currentTestimonial.author}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Quotation & Details on Right */}
          <div className="flex-1">
            
            {/* Stars */}
            <div className="flex text-amber-500 text-sm mb-3">
              ★★★★★
            </div>

            {/* Editorial Serif Quote */}
            <blockquote className="font-serif text-lg sm:text-xl md:text-2xl leading-relaxed text-[#19241E] font-normal italic mb-4">
              "{currentTestimonial.quote}"
            </blockquote>

            {/* Attribution */}
            <div>
              <div className="font-bold text-sm sm:text-base text-[#19241E]">
                — {currentTestimonial.author}
              </div>
              <div className="text-xs text-[#4B5850]">
                {currentTestimonial.role}
              </div>
            </div>

          </div>

        </div>

        {/* Carousel Pagination Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveTestimonialIdx(i)}
              className={`h-2.5 rounded-full transition-all ${
                activeTestimonialIdx === i
                  ? 'w-7 bg-[#194333]'
                  : 'w-2.5 bg-[#D5CEBF] hover:bg-[#A39985]'
              }`}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>

      </section>

      {/* ────────────────── 8. PRICING & MEMBERSHIP PLANS (SECTION 8) ────────────────── */}
      <section id="pricing" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Subtle decorative botanical background accent */}
        <div className="absolute right-0 top-12 pointer-events-none opacity-20">
          <BotanicalBranchSide className="w-48 h-96 text-[#24503E]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">

          {/* Section Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8E4D8]/70 border border-[#DCD6C8] text-[#194333] text-xs font-semibold tracking-wider uppercase mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#194333]" />
            <span>Accessible Plans For Every Stage</span>
          </div>

          {/* Headline */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-[#19241E] max-w-2xl mx-auto mb-4">
            Invest in Clarity, Resilience &amp; Growth.
          </h2>

          <p className="text-sm sm:text-base text-[#4B5850] max-w-xl mx-auto leading-relaxed mb-8">
            Transparent, youth-friendly pricing designed to support students and families with zero hidden fees. Cancel or switch anytime.
          </p>

          {/* Monthly / Annual Billing Switcher */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-[#EAE6DC] border border-[#D8D2C4] shadow-inner mb-12">
            <button
              type="button"
              onClick={() => setIsAnnualPricing(false)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                !isAnnualPricing
                  ? 'bg-white text-[#194333] shadow-sm'
                  : 'text-[#5C6B61] hover:text-[#194333]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setIsAnnualPricing(true)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                isAnnualPricing
                  ? 'bg-[#194333] text-white shadow-sm'
                  : 'text-[#5C6B61] hover:text-[#194333]'
              }`}
            >
              <span>Annual Billing</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                isAnnualPricing ? 'bg-[#A7D4B5] text-[#194333]' : 'bg-[#194333] text-white'
              }`}>
                Save 20%
              </span>
            </button>
          </div>

          {/* 3 Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch text-left">

            {/* Plan 1: Explorer (Free Forever) */}
            <div className="bg-white/80 backdrop-blur-xs rounded-3xl p-7 sm:p-8 border border-[#E3DDD1] hover:border-[#194333]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4B5850] bg-[#EFECE5] px-3 py-1 rounded-full">
                    Starter Explorer
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#19241E] mb-2">Free Explorer</h3>
                <p className="text-xs sm:text-sm text-[#5C6B61] mb-6 min-h-[40px]">
                  Essential tools for young adults starting their personal reflection and daily habit journey.
                </p>

                <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-[#EBE6DC]">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-[#19241E]">$0</span>
                  <span className="text-xs sm:text-sm text-[#5C6B61]">/ free forever</span>
                </div>

                <div className="space-y-3 mb-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#194333]">Included for free:</p>
                  {[
                    '3 daily guided journal reflections',
                    'Core daily habit & routine tracker',
                    'Access to 10+ wellness soundscapes',
                    'Basic mood & emotional check-ins',
                    '100% private & encrypted journal'
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#3D4A42]">
                      <div className="w-4 h-4 rounded-full bg-[#E5EFE9] text-[#194333] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/register"
                className="w-full py-3 px-5 rounded-full font-bold text-xs sm:text-sm text-[#194333] border-2 border-[#194333] hover:bg-[#194333] hover:text-white transition-all text-center block shadow-2xs"
              >
                Get Started Free
              </Link>
            </div>

            {/* Plan 2: Student Pro (Most Popular / Featured) */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-[#194333] shadow-xl relative flex flex-col justify-between ring-4 ring-[#194333]/5 transform md:-translate-y-2">
              {/* Highlight Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#194333] text-white px-4 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#A7D4B5]" />
                <span>Most Popular for Students</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4 mt-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#194333] bg-[#E5EFE9] px-3 py-1 rounded-full">
                    Student Pro
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#19241E] mb-2">Student Growth Pro</h3>
                <p className="text-xs sm:text-sm text-[#5C6B61] mb-6 min-h-[40px]">
                  Complete emotional resilience toolkit, audio meditations, and psychologist-backed guidance.
                </p>

                <div className="mb-6 pb-6 border-b border-[#EBE6DC]">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-4xl sm:text-5xl font-bold text-[#19241E]">
                      {isAnnualPricing ? '$9' : '$12'}
                    </span>
                    <span className="text-xs sm:text-sm text-[#5C6B61]">/ month</span>
                  </div>
                  {isAnnualPricing ? (
                    <span className="text-[11px] font-semibold text-[#194333] block mt-1">
                      Billed annually ($108/yr) • Save $36 per year
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#7A877E] block mt-1">
                      Billed monthly • Cancel anytime
                    </span>
                  )}
                </div>

                <div className="space-y-3 mb-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#194333]">Everything in Explorer, plus:</p>
                  {[
                    'Unlimited AI reflections & journal entries',
                    'Complete mood & focus analytics dashboard',
                    'Full audio library of guided meditations',
                    'Exam stress & anxiety action blueprints',
                    'Personalized weekly growth milestone reports',
                    'Optional 1-student consensual parent link'
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#19241E] font-medium">
                      <div className="w-4 h-4 rounded-full bg-[#194333] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/register"
                className="w-full py-3.5 px-5 rounded-full font-bold text-xs sm:text-sm text-white bg-[#194333] hover:bg-[#123326] shadow-md hover:scale-[1.02] transition-all text-center block"
              >
                Start 14-Day Free Trial →
              </Link>
            </div>

            {/* Plan 3: Family Circle */}
            <div className="bg-white/80 backdrop-blur-xs rounded-3xl p-7 sm:p-8 border border-[#E3DDD1] hover:border-[#194333]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4B5850] bg-[#EFECE5] px-3 py-1 rounded-full">
                    Family &amp; Parents
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#19241E] mb-2">Family Circle</h3>
                <p className="text-xs sm:text-sm text-[#5C6B61] mb-6 min-h-[40px]">
                  Complete cooperative platform for parents supporting multiple teens and emerging adults.
                </p>

                <div className="mb-6 pb-6 border-b border-[#EBE6DC]">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-4xl sm:text-5xl font-bold text-[#19241E]">
                      {isAnnualPricing ? '$19' : '$24'}
                    </span>
                    <span className="text-xs sm:text-sm text-[#5C6B61]">/ month</span>
                  </div>
                  {isAnnualPricing ? (
                    <span className="text-[11px] font-semibold text-[#194333] block mt-1">
                      Billed annually ($228/yr) • Save $60 per year
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#7A877E] block mt-1">
                      Billed monthly • Cancel anytime
                    </span>
                  )}
                </div>

                <div className="space-y-3 mb-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#194333]">Everything in Pro, plus:</p>
                  {[
                    'Up to 3 linked student accounts',
                    'Full Parent Portal dashboard & trends',
                    'Age-appropriate data governance matrix',
                    'Certified parenting guidance articles',
                    'Joint assignments & growth milestones',
                    'Priority family support response'
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#3D4A42]">
                      <div className="w-4 h-4 rounded-full bg-[#E5EFE9] text-[#194333] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/register"
                className="w-full py-3 px-5 rounded-full font-bold text-xs sm:text-sm text-[#194333] border-2 border-[#194333] hover:bg-[#194333] hover:text-white transition-all text-center block shadow-2xs"
              >
                Join Family Circle
              </Link>
            </div>

          </div>

          {/* Trust Guarantees Footer */}
          <div className="mt-12 pt-8 border-t border-[#E3DDD1] flex flex-wrap items-center justify-center gap-6 text-xs text-[#5C6B61]">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#194333]" />
              <span>14-day free trial on all paid plans</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#194333]" />
              <span>Zero-knowledge student journal encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#194333]" />
              <span>Cancel or pause with one click anytime</span>
            </div>
          </div>

        </div>
      </section>

      {/* ────────────────── 9. PRE-FOOTER DARK GREEN BANNER (SECTION 9) ────────────────── */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto rounded-[36px] bg-[#194333] text-white overflow-hidden shadow-2xl relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Content Left */}
            <div className="lg:col-span-7 p-8 sm:p-12 md:p-16 flex flex-col items-start text-left z-10">
              
              <p className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-[#A7D4B5] mb-3">
                Establish A Brighter Tomorrow
              </p>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-white mb-4">
                Your Potential Has No{' '}
                <span className="italic text-[#A7D4B5]">Limits.</span>
              </h2>

              <p className="text-sm sm:text-base text-white/80 max-w-lg leading-relaxed mb-8">
                Join thousands of young minds on the journey to mental wellness and growth.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <Link
                  to="/register"
                  className="px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold text-[#194333] bg-white hover:bg-[#FAF8F5] shadow-lg hover:scale-[1.01] transition-all text-center"
                >
                  Start Your Free Journey →
                </Link>
                <a
                  href="#about"
                  className="px-7 py-3.5 rounded-full text-sm sm:text-base font-medium text-white/90 hover:text-white border border-white/25 hover:border-white/50 transition-all text-center"
                >
                  Learn More
                </a>
              </div>

            </div>

            {/* Scenic Mountain Summit Hiker Image on Right */}
            <div className="lg:col-span-5 h-64 sm:h-80 lg:h-full min-h-[320px] relative">
              <img
                src="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80"
                alt="Young hiker on mountain summit gazing at sunlit sunrise"
                className="w-full h-full object-cover"
              />
              {/* Fade gradient transition between dark green and photo on desktop */}
              <div className="hidden lg:block absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#194333] to-transparent pointer-events-none" />
            </div>

          </div>

        </div>
      </section>

      {/* ────────────────── 10. FOOTER (SECTION 9) ────────────────── */}
      <footer className="py-12 sm:py-14 bg-[#EFECE5] border-t border-[#E5E0D3] px-6 lg:px-12 mt-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 pb-8 border-b border-[#DCD6C8]">
            
            {/* Logo & Brand */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-8 h-8 rounded-full bg-[#194333] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <Compass className="w-4 h-4 text-[#DCE8DE]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#19241E]">
                HighOrbit
              </span>
            </Link>

            {/* Quick Navigation Links */}
            <nav className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2 text-xs sm:text-[13px] font-medium text-[#3D4A42]">
              <a href="#about" className="hover:text-[#194333] transition-colors whitespace-nowrap">About</a>
              <a href="#features" className="hover:text-[#194333] transition-colors whitespace-nowrap">Features</a>
              <a href="#parents" className="hover:text-[#194333] transition-colors whitespace-nowrap">For Parents</a>
              <a href="#resources" className="hover:text-[#194333] transition-colors whitespace-nowrap">Resources</a>
              <a href="#pricing" className="hover:text-[#194333] transition-colors whitespace-nowrap">Pricing</a>
              <a href="#about" className="hover:text-[#194333] transition-colors whitespace-nowrap">FAQs</a>
              <a href="#about" className="hover:text-[#194333] transition-colors whitespace-nowrap">Contact</a>
            </nav>

            {/* Social Icons (Solid Dark Green matching reference) */}
            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#194333] hover:bg-[#123326] text-white flex items-center justify-center transition-transform hover:scale-105 shadow-xs"
                aria-label="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#194333] hover:bg-[#123326] text-white flex items-center justify-center transition-transform hover:scale-105 shadow-xs"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#194333] hover:bg-[#123326] text-white flex items-center justify-center transition-transform hover:scale-105 shadow-xs"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#194333] hover:bg-[#123326] text-white flex items-center justify-center transition-transform hover:scale-105 shadow-xs"
                aria-label="Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>

          </div>

          {/* Copyright & Legal */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5C665F]">
            <div>
              © 2026 HighOrbit, Inc. All rights reserved.
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <a href="#" className="hover:text-[#194333] hover:underline transition-colors">Privacy Policy</a>
              <span className="text-[#C4BCAB]">|</span>
              <a href="#" className="hover:text-[#194333] hover:underline transition-colors">Terms of Service</a>
              <span className="text-[#C4BCAB]">|</span>
              <a href="#" className="hover:text-[#194333] hover:underline transition-colors">Support</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
