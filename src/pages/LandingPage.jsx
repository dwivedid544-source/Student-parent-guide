import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Star,
  Rocket,
  ShieldCheck,
  HeartHandshake,
  Compass,
  BookOpen,
  Brain,
  Globe,
  Trophy,
  Play,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Download,
  Send,
  Clock,
  Users,
  ArrowRight,
  Laptop,
  Award,
  Lock,
  Layers,
  HelpCircle,
  Lightbulb,
  Palette,
  Atom,
  Smile,
  Compass as CompassIcon,
  Check
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { LifeVerseLogo } from '../components/common/LifeVerseLogo';

// Clean Full Hero Illustration Asset (100% Cleaned, Zero Embedded Text)
import heroCleanFull from '../assets/hero_clean_full.jpg';

// Other Section Character Assets
import boyAmazedImg from '../assets/boy_amazed.png';
import boyGlassesImg from '../assets/boy_glasses.png';
import boyWindowImg from '../assets/boy_window.png';
import avatarSparkyImg from '../assets/avatar_sparky.png';
import avatarLunaImg from '../assets/avatar_luna.png';
import avatarLeoImg from '../assets/avatar_leo.png';

export const LandingPage = () => {
  const navigate = useNavigate();

  // Interactive State
  const [activeCourseCategory, setActiveCourseCategory] = useState('all');
  const [activeAudienceTab, setActiveAudienceTab] = useState('parents');
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    role: 'parent',
    message: ''
  });
  const [sampleQuestAnswered, setSampleQuestAnswered] = useState(false);

  // FAQ Data
  const faqItems = [
    {
      q: 'What is LifeVerse AI and how does it help children learn?',
      a: 'LifeVerse AI is an intelligent, gamified learning universe designed for kids ages 3 to 14. Rather than boring rote memorization, it uses an adaptive pedagogical AI companion that turns science, math, storytelling, and critical thinking into interactive story quests calibrated to each child’s natural interests.'
    },
    {
      q: 'What age groups is LifeVerse AI designed for?',
      a: 'LifeVerse AI is tailored for children ages 3 to 14, divided into three developmentally calibrated learning stages: Early Explorers (ages 3–6), Junior Navigators (ages 7–10), and Master Thinkers (ages 11–14).'
    },
    {
      q: 'How does personalized learning work without overwhelming kids?',
      a: 'Our adaptive learning model tracks concept mastery and curiosity pathways rather than scores. When a child struggles, the companion breaks concepts down with friendly visual analogies; when they excel, it introduces stimulating open-ended creative challenges.'
    },
    {
      q: 'Can parents manage multiple children and view progress?',
      a: 'Yes! A single LifeVerse AI Family account allows parents to configure unique child profiles with individual avatars, age-tailored difficulties, and separate curiosity portfolios. Parents receive weekly progress digests highlighting topics mastered and suggested offline family activities.'
    },
    {
      q: 'Is LifeVerse AI safe, ad-free, and privacy-compliant?',
      a: 'Absolutely. LifeVerse AI is 100% ad-free, COPPA-certified, and FERPA-aligned. We never sell personal data or display third-party advertisements. AI dialogues run within strict, kid-safe guardrails that prevent harmful, inappropriate, or unvetted content.'
    },
    {
      q: 'Is LifeVerse AI suitable for schools and classrooms?',
      a: 'Yes! Schools use LifeVerse AI as an engaging curriculum supplement for STEM, literacy, and inquiry-based learning. Educators can assign thematic world missions and access collective student engagement insights.'
    }
  ];

  // Learning Worlds / Courses Data
  const coursesData = [
    {
      id: 'space-science',
      category: 'stem',
      title: 'Cosmic Space & Astronomy',
      description: 'Journey through the solar system, explore planetary gravity, nebulae, and rocketry with interactive 3D celestial models.',
      age: 'Ages 5-12',
      quests: '32 Quests',
      badgeColor: 'from-blue-500 to-indigo-600',
      icon: Atom
    },
    {
      id: 'math-logic',
      category: 'math',
      title: 'Adventure Math & Pattern Logic',
      description: 'Solve playful spatial riddles, conquer fraction jungles, and discover how mathematical patterns govern nature.',
      age: 'Ages 4-11',
      quests: '38 Quests',
      badgeColor: 'from-emerald-500 to-teal-600',
      icon: Brain
    },
    {
      id: 'story-reading',
      category: 'arts',
      title: 'Creative Story Studio & Reading',
      description: 'Co-author illustrated fantasy tales, expand rich vocabulary, and direct characters through branching moral choices.',
      age: 'Ages 3-10',
      quests: '45 Quests',
      badgeColor: 'from-amber-500 to-orange-600',
      icon: BookOpen
    },
    {
      id: 'earth-wildlife',
      category: 'stem',
      title: 'Earth Ecology & Ocean Kingdoms',
      description: 'Dive into oceanic trenches, wander ancient rainforests, and understand how biodiversity keeps our planet alive.',
      age: 'Ages 4-12',
      quests: '26 Quests',
      badgeColor: 'from-cyan-500 to-blue-600',
      icon: Globe
    },
    {
      id: 'young-inventors',
      category: 'stem',
      title: 'Young Inventors & Code Logic',
      description: 'Learn foundational algorithmic thinking, simple machine mechanics, and digital design through playful challenges.',
      age: 'Ages 7-14',
      quests: '24 Quests',
      badgeColor: 'from-purple-500 to-pink-600',
      icon: Rocket
    },
    {
      id: 'art-drawing',
      category: 'arts',
      title: 'Digital Art & Creative Canvas',
      description: 'Experiment with color theory, character sketching, animation basics, and expressing emotional creativity.',
      age: 'Ages 4-13',
      quests: '30 Quests',
      badgeColor: 'from-rose-500 to-orange-500',
      icon: Palette
    }
  ];

  const filteredCourses =
    activeCourseCategory === 'all'
      ? coursesData
      : coursesData.filter((c) => c.category === activeCourseCategory);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.email && contactForm.name) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactForm({ name: '', email: '', role: 'parent', message: '' });
      }, 3000);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#081325] text-white overflow-x-hidden font-nunito selection:bg-[#F45124] selection:text-white">
      
      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* ============================================================== */}
      {/* 1. HERO SECTION (#home) - FULL VIEWPORT IMMERSIVE EXPERIENCE   */}
      {/* ============================================================== */}
      <section
        id="home"
        className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#081325]"
      >
        {/* Full-bleed Panoramic Background (Clean artwork matching Reference Image 2) */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroCleanFull}
            alt="LifeVerse AI - Where Curiosity Meets Imagination"
            className="w-full h-full object-cover object-[center_right] sm:object-[70%_center] lg:object-[center_right] pointer-events-none select-none"
          />
          {/* Subtle directional gradient on the left so typography is crisp and 100% readable without hiding the children */}
          <div className="absolute inset-y-0 left-0 w-full sm:w-[70%] lg:w-[50%] bg-gradient-to-r from-[#081325]/90 via-[#081325]/50 to-transparent pointer-events-none" />
          {/* Smooth bottom blend into the next section */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#081325] via-[#081325]/80 to-transparent pointer-events-none" />
          {/* Top subtle vignette */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#081325]/60 to-transparent pointer-events-none" />
        </div>

        {/* Hero Content positioned on the Left */}
        <div className="relative z-10 flex-1 flex items-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-32 pb-16">
          <div className="max-w-lg lg:max-w-xl flex flex-col items-start">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-bold text-[#FFD66B] backdrop-blur-md mb-6 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-[#FFD66B] text-[#FFD66B]" />
              <span>A Safe, Inspiring Universe For Young Explorers</span>
            </div>

            {/* Main Headline matching Image 2 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] font-poppins drop-shadow-lg">
              <span className="inline-flex items-center gap-2.5">
                Where
                <Sparkles className="w-7 h-7 sm:w-9 sm:h-9 text-[#65BDEB] inline" />
              </span>
              <br />
              <span className="text-white">Curiosity Meets</span>
              <br />
              <span className="text-white">Imagination</span>
            </h1>

            {/* Supporting Description */}
            <p className="mt-5 sm:mt-6 text-sm sm:text-base text-white/90 leading-relaxed max-w-md font-medium drop-shadow-md">
              Ignite curiosity and spark imagination with LifeVerse AI! Empowering young minds with captivating educational adventures that foster a love for exploration and discovery.
            </p>

            {/* CTA Button matching Image 2 */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/onboarding/child"
                className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-[#F45124] to-[#FF5722] hover:from-[#e04216] hover:to-[#f04b16] shadow-[0_4px_25px_rgba(244,81,36,0.6)] hover:shadow-[0_6px_35px_rgba(244,81,36,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>Start Exploring Today!</span>
                <Sparkles className="w-5 h-5 text-white" />
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="mt-10 pt-6 border-t border-white/15 grid grid-cols-3 gap-4 w-full max-w-md">
              <div className="flex flex-col items-start gap-0.5">
                <span className="text-xl sm:text-2xl font-extrabold text-[#65BDEB] font-poppins">100+</span>
                <span className="text-xs text-white/75 leading-tight">Interactive Quests</span>
              </div>
              <div className="flex flex-col items-start gap-0.5 border-x border-white/15 px-3">
                <span className="text-xl sm:text-2xl font-extrabold text-[#FFD66B] font-poppins">100%</span>
                <span className="text-xs text-white/75 leading-tight">Child-Safe & Ad-Free</span>
              </div>
              <div className="flex flex-col items-start gap-0.5">
                <span className="text-xl sm:text-2xl font-extrabold text-[#F45124] font-poppins">Ages 3-14</span>
                <span className="text-xs text-white/75 leading-tight">Personalized Paths</span>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll down prompt */}
        <div className="relative z-10 w-full pb-4 flex justify-center pointer-events-none">
          <a
            href="#about"
            className="flex flex-col items-center gap-1 text-white/50 hover:text-white text-[11px] uppercase tracking-wider font-semibold transition-colors pointer-events-auto"
          >
            <span>Scroll down to explore</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#65BDEB]" />
          </a>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. ABOUT US SECTION (#about)                                  */}
      {/* ============================================================== */}
      <section id="about" className="relative z-10 w-full py-16 sm:py-24 bg-gradient-to-b from-transparent via-[#0d1d33]/60 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#65BDEB]/15 border border-[#65BDEB]/30 text-xs font-bold text-[#65BDEB] uppercase tracking-wider mb-4">
              <CompassIcon className="w-3.5 h-3.5" />
              <span>About LifeVerse AI</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-poppins tracking-tight">
              More Than Learning. <br />
              <span className="text-[#65BDEB]">A World of Possibilities.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed font-normal">
              LifeVerse AI transforms screen time into an inspiring voyage of discovery. We combine age-calibrated artificial intelligence with engaging storytelling to nurture children’s natural curiosity, logical reasoning, and creative expression.
            </p>
          </div>

          {/* 4 Core Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.07] border border-white/15 backdrop-blur-md hover:bg-white/[0.12] hover:border-[#65BDEB]/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-[#65BDEB]/20 text-[#65BDEB] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-poppins mb-2">Adaptive AI Companion</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Intelligently listens, explains complex concepts with simple analogies, and adapts quest difficulty to your child's pace.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.07] border border-white/15 backdrop-blur-md hover:bg-white/[0.12] hover:border-[#F45124]/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-[#F45124]/20 text-[#F45124] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-poppins mb-2">Curiosity-Led Quests</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Replaces repetitive flashcards with immersive space voyages, prehistoric ecology, and artistic storytelling missions.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.07] border border-white/15 backdrop-blur-md hover:bg-white/[0.12] hover:border-[#FFD66B]/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-[#FFD66B]/20 text-[#FFD66B] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-poppins mb-2">100% Safe & Ad-Free</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Zero algorithmic rabbit holes, zero advertisements, and strict COPPA privacy compliance guaranteed for family peace of mind.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.07] border border-white/15 backdrop-blur-md hover:bg-white/[0.12] hover:border-[#9375E8]/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-[#9375E8]/20 text-[#9375E8] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-poppins mb-2">Parent Insights & Balance</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Clear weekly progress digests showing what your child discovered, celebrating milestones without high-stakes testing pressure.
              </p>
            </div>

          </div>

          {/* Interactive Philosophy Showcase with Character Asset */}
          <div className="mt-12 sm:mt-16 rounded-3xl bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-white/[0.08] border border-white/20 p-6 sm:p-10 lg:p-12 backdrop-blur-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFD66B]">Why Parents & Educators Choose Us</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-poppins mt-2 mb-4">
                  Built to empower children, not to hook them onto screens.
                </h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
                  Unlike traditional apps that rely on dopamine loops and random video clicks, LifeVerse AI structures every interaction around purposeful inquiry. Children explore answers to real questions like <em>"Why do stars glow?"</em> or <em>"How do airplanes stay in the air?"</em> through hands-on creative experiments.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#65BDEB] shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-white/90">No In-App Purchases</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#65BDEB] shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-white/90">Positive Screen Time</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#65BDEB] shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-white/90">Curriculum Aligned</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-tr from-[#65BDEB]/20 to-[#F45124]/20 border border-white/20 flex items-center justify-center p-4">
                  <img
                    src={boyAmazedImg}
                    alt="Curious explorer boy amazed by discovery"
                    className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                  />
                  <div className="absolute -bottom-3 px-3 py-1 rounded-full bg-[#081325] border border-white/20 text-[11px] font-bold text-[#FFD66B]">
                    ★ 98% Parent Approval
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. COURSES & LEARNING WORLDS (#courses)                        */}
      {/* ============================================================== */}
      <section id="courses" className="relative z-10 w-full py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F45124]/15 border border-[#F45124]/30 text-xs font-bold text-[#F45124] uppercase tracking-wider mb-3">
                <Layers className="w-3.5 h-3.5" />
                <span>Learning Worlds & Courses</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-poppins tracking-tight">
                Explore a Universe of Learning
              </h2>
              <p className="mt-2 text-sm sm:text-base text-white/75 max-w-xl">
                Immersive thematic worlds curated across foundational sciences, mathematics, creative expression, and critical thinking.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Worlds' },
                { id: 'stem', label: 'STEM & Science' },
                { id: 'math', label: 'Math & Logic' },
                { id: 'arts', label: 'Arts & Reading' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCourseCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activeCourseCategory === tab.id
                      ? 'bg-[#F45124] text-white shadow-md shadow-orange-600/30'
                      : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white border border-white/15'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((course) => {
              const IconComponent = course.icon;
              return (
                <div
                  key={course.id}
                  className="rounded-3xl bg-white/[0.06] border border-white/15 overflow-hidden backdrop-blur-md hover:bg-white/[0.1] hover:border-white/30 transition-all duration-300 flex flex-col group hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="p-6 sm:p-7 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${course.badgeColor} p-2.5 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-bold text-[#FFD66B] border border-white/15">
                        {course.age}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white font-poppins mb-2.5 group-hover:text-[#65BDEB] transition-colors">
                      {course.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6 flex-1">
                      {course.description}
                    </p>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs font-medium text-white/60">{course.quests}</span>
                      <Link
                        to="/onboarding/child"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#65BDEB] hover:text-white transition-colors"
                      >
                        <span>Start Quest</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. ACTIVITIES & DAILY QUESTS (#activities)                     */}
      {/* ============================================================== */}
      <section id="activities" className="relative z-10 w-full py-16 sm:py-24 bg-gradient-to-b from-transparent via-[#09182d]/80 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD66B]/15 border border-[#FFD66B]/30 text-xs font-bold text-[#FFD66B] uppercase tracking-wider mb-4">
              <Trophy className="w-3.5 h-3.5" />
              <span>Interactive Activities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-poppins tracking-tight">
              Hands-On Fun Meets Mind-Expanding Quests
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
              Every day on LifeVerse AI brings dynamic, interactive challenges that turn passive consumption into energetic problem solving.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 4 Activity Types */}
            <div className="lg:col-span-6 space-y-4">
              
              <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.08] border border-white/15 backdrop-blur-md flex items-start gap-4 hover:bg-white/[0.12] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#F45124]/20 text-[#F45124] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white font-poppins">Daily 5-Minute Spark Quests</h4>
                  <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                    Quick bite-sized mysteries tailored to keep curious minds engaged each day and build consistent learning streaks.
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.08] border border-white/15 backdrop-blur-md flex items-start gap-4 hover:bg-white/[0.12] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#65BDEB]/20 text-[#65BDEB] flex items-center justify-center shrink-0 mt-0.5">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white font-poppins">"Ask Sparky" Voice-Guided Dialogues</h4>
                  <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                    Children can ask anything from "Why is snow cold?" to "How do plants breathe?" and get friendly visual answers.
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.08] border border-white/15 backdrop-blur-md flex items-start gap-4 hover:bg-white/[0.12] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#FFD66B]/20 text-[#FFD66B] flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white font-poppins">Co-Creative Story Studio</h4>
                  <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                    Kids steer the plot of their own digital fairy tale, choosing character actions and observing cause-and-effect.
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.08] border border-white/15 backdrop-blur-md flex items-start gap-4 hover:bg-white/[0.12] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#9375E8]/20 text-[#9375E8] flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white font-poppins">Curiosity Badges & Milestones</h4>
                  <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                    Earn collectible astronaut suits, explorer boots, and badges celebrating effort, kindness, and perseverance.
                  </p>
                </div>
              </div>

            </div>

            {/* Right: Live Interactive Quest Preview Sandbox */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-gradient-to-b from-[#10243d] to-[#0c1b2d] border border-white/20 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-white/15 mb-6">
                  <div className="flex items-center gap-3">
                    <img src={avatarSparkyImg} alt="Sparky avatar" className="w-10 h-10 rounded-full bg-white/10 p-1" />
                    <div>
                      <h4 className="text-sm font-bold text-white font-poppins">Sparky's Daily Mystery</h4>
                      <p className="text-[11px] text-[#65BDEB]">Level 1 Discovery • Astronomy</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#FFD66B]/20 text-[#FFD66B] text-xs font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#FFD66B]" /> +50 Star Points
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-sm sm:text-base text-white/90 leading-relaxed">
                    <span className="text-[#FFD66B] font-bold">Sparky asks:</span> "Why do stars appear to twinkle when you look at them from your bedroom window?"
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    <button
                      onClick={() => setSampleQuestAnswered(true)}
                      className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                        sampleQuestAnswered
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                          : 'bg-white/5 border-white/15 text-white/80 hover:bg-white/15 hover:text-white'
                      }`}
                    >
                      A. Earth's atmosphere bends and shakes their light on the way to your eyes!
                    </button>
                    <button
                      onClick={() => setSampleQuestAnswered(true)}
                      className="p-3.5 rounded-xl border border-white/15 bg-white/5 text-left text-xs sm:text-sm font-medium text-white/80 hover:bg-white/15 hover:text-white transition-all cursor-pointer"
                    >
                      B. The stars turn their lights on and off like Christmas decorations.
                    </button>
                  </div>

                  {sampleQuestAnswered && (
                    <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm animate-fadeIn">
                      <span className="font-bold">✨ Fantastic Curiosity!</span> Earth's moving layers of air refract starlight like water in a swimming pool. You unlocked the <em>Cosmic Stargazer</em> badge!
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between text-xs text-white/60">
                    <span>Try it in real time with child voice support</span>
                    <Link to="/onboarding/child" className="text-[#65BDEB] font-bold hover:underline">
                      Launch Full Experience →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. HOW IT WORKS SECTION (#how-it-works)                        */}
      {/* ============================================================== */}
      <section id="how-it-works" className="relative z-10 w-full py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#65BDEB]/15 border border-[#65BDEB]/30 text-xs font-bold text-[#65BDEB] uppercase tracking-wider mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>Step-by-Step Experience</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-poppins tracking-tight">
              Learning Made Simple, Fun & Personal
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed font-normal">
              Four intuitive steps that unlock an individualized galaxy of self-directed exploration for your family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            
            {/* Step 1 */}
            <div className="p-7 rounded-3xl bg-white/[0.07] border border-white/15 backdrop-blur-md flex flex-col relative group hover:border-[#F45124]/50 transition-all">
              <span className="text-4xl font-black text-white/20 font-poppins mb-4 group-hover:text-[#F45124] transition-colors">01</span>
              <div className="w-10 h-10 rounded-xl bg-[#F45124]/20 text-[#F45124] flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-poppins mb-2">Create Child Profile</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Add your child’s age, grade stage, and pick their friendly avatar sidekick like Sparky, Luna, or Leo.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-7 rounded-3xl bg-white/[0.07] border border-white/15 backdrop-blur-md flex flex-col relative group hover:border-[#65BDEB]/50 transition-all">
              <span className="text-4xl font-black text-white/20 font-poppins mb-4 group-hover:text-[#65BDEB] transition-colors">02</span>
              <div className="w-10 h-10 rounded-xl bg-[#65BDEB]/20 text-[#65BDEB] flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-poppins mb-2">Discover Passions</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                A brief gamified puzzle learns what makes their eyes light up—dinosaurs, space rockets, art, or numbers.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-7 rounded-3xl bg-white/[0.07] border border-white/15 backdrop-blur-md flex flex-col relative group hover:border-[#FFD66B]/50 transition-all">
              <span className="text-4xl font-black text-white/20 font-poppins mb-4 group-hover:text-[#FFD66B] transition-colors">03</span>
              <div className="w-10 h-10 rounded-xl bg-[#FFD66B]/20 text-[#FFD66B] flex items-center justify-center mb-4">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-poppins mb-2">AI Adapts Daily</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                LifeVerse AI constructs a dynamic quest track that adapts in real time to how your child answers and thinks.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-7 rounded-3xl bg-white/[0.07] border border-white/15 backdrop-blur-md flex flex-col relative group hover:border-[#9375E8]/50 transition-all">
              <span className="text-4xl font-black text-white/20 font-poppins mb-4 group-hover:text-[#9375E8] transition-colors">04</span>
              <div className="w-10 h-10 rounded-xl bg-[#9375E8]/20 text-[#9375E8] flex items-center justify-center mb-4">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-poppins mb-2">Explore, Learn & Grow</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Watch confidence soar as they master challenges, earn milestones, and bring enthusiasm to dinner table discussions.
              </p>
            </div>

          </div>

          <div className="mt-12 text-center">
            <Link
              to="/onboarding/child"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-bold bg-[#F45124] text-white hover:bg-[#e04216] shadow-lg shadow-orange-600/30 hover:scale-[1.02] transition-all"
            >
              <span>Begin Your Child's Journey Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. RESOURCES & LEARNING TOOLS (#resources)                     */}
      {/* ============================================================== */}
      <section id="resources" className="relative z-10 w-full py-16 sm:py-24 bg-gradient-to-b from-transparent via-[#0b1b30]/70 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#65BDEB]/15 border border-[#65BDEB]/30 text-xs font-bold text-[#65BDEB] uppercase tracking-wider mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Free Family & Teacher Tools</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-poppins tracking-tight">
              Resources for Inquisitive Minds
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed font-normal">
              Take the learning beyond the screen with hands-on offline STEM experiment guides, printable activity mats, and digital wellness toolkits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-white/[0.07] border border-white/15 backdrop-blur-md flex flex-col justify-between hover:bg-white/[0.1] transition-all">
              <div>
                <span className="text-[11px] font-bold text-[#FFD66B] uppercase tracking-wider">Free PDF Guide</span>
                <h3 className="text-lg font-bold text-white font-poppins mt-2 mb-2">Weekend Kitchen STEM Experiments</h3>
                <p className="text-xs text-white/70 leading-relaxed mb-6">
                  12 safe, delightful science experiments using ordinary kitchen ingredients to demonstrate chemical reactions and air pressure.
                </p>
              </div>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Thank you! The Weekend STEM Activity Pack will be sent to your email.');
                }}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#65BDEB] hover:text-white transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Activity Pack (PDF)</span>
              </a>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.07] border border-white/15 backdrop-blur-md flex flex-col justify-between hover:bg-white/[0.1] transition-all">
              <div>
                <span className="text-[11px] font-bold text-[#65BDEB] uppercase tracking-wider">Family Handbook</span>
                <h3 className="text-lg font-bold text-white font-poppins mt-2 mb-2">Screen-Time Wellness Guide</h3>
                <p className="text-xs text-white/70 leading-relaxed mb-6">
                  Practical guidelines by child psychologists for creating balanced digital boundaries and encouraging deep curiosity.
                </p>
              </div>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Screen-Time Wellness Guide downloaded successfully!');
                }}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#65BDEB] hover:text-white transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Get Wellness Guide (PDF)</span>
              </a>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.07] border border-white/15 backdrop-blur-md flex flex-col justify-between hover:bg-white/[0.1] transition-all">
              <div>
                <span className="text-[11px] font-bold text-[#F45124] uppercase tracking-wider">Audio Series</span>
                <h3 className="text-lg font-bold text-white font-poppins mt-2 mb-2">Bedtime Wonder Audio Stories</h3>
                <p className="text-xs text-white/70 leading-relaxed mb-6">
                  Gentle, audio-guided night journeys through the deep ocean and galaxy that spark imagination while helping kids relax.
                </p>
              </div>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Bedtime Audio Sample is now unlocked for your browser session.');
                }}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#65BDEB] hover:text-white transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>Listen to 5-Min Preview</span>
              </a>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.07] border border-white/15 backdrop-blur-md flex flex-col justify-between hover:bg-white/[0.1] transition-all">
              <div>
                <span className="text-[11px] font-bold text-[#9375E8] uppercase tracking-wider">Educator Toolkit</span>
                <h3 className="text-lg font-bold text-white font-poppins mt-2 mb-2">Classroom Inquiry Discussion Cards</h3>
                <p className="text-xs text-white/70 leading-relaxed mb-6">
                  30 prompt cards to spark lively classroom debates around space, robotics ethics, and ecosystem preservation.
                </p>
              </div>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Classroom Inquiry Cards requested! Check your inbox.');
                }}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#65BDEB] hover:text-white transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Teacher Pack</span>
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. PARENTS & SCHOOLS CORNER (#parents-corner)                  */}
      {/* ============================================================== */}
      <section id="parents-corner" className="relative z-10 w-full py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F45124]/15 border border-[#F45124]/30 text-xs font-bold text-[#F45124] uppercase tracking-wider mb-4">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>For Families & Educators</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-poppins tracking-tight">
              Designed for Children. Built for Their Future.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed font-normal">
              Whether you are guiding your child at home or orchestrating a 25-student elementary classroom, LifeVerse AI equips you with deep learning visibility.
            </p>

            {/* Audience Tabs */}
            <div className="inline-flex p-1.5 rounded-full bg-white/10 border border-white/20 mt-8 backdrop-blur-md">
              <button
                onClick={() => setActiveAudienceTab('parents')}
                className={`px-6 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeAudienceTab === 'parents'
                    ? 'bg-[#F45124] text-white shadow-md shadow-orange-600/30'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                For Parents & Families
              </button>
              <button
                onClick={() => setActiveAudienceTab('schools')}
                className={`px-6 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeAudienceTab === 'schools'
                    ? 'bg-[#65BDEB] text-[#081325] shadow-md shadow-cyan-600/30'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                For Schools & Educators
              </button>
            </div>
          </div>

          {activeAudienceTab === 'parents' ? (
            <div className="rounded-3xl bg-white/[0.06] border border-white/15 p-6 sm:p-10 lg:p-12 backdrop-blur-xl animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#65BDEB]/20 text-[#65BDEB] flex items-center justify-center shrink-0">
                      <Brain className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white font-poppins">Deep Interest & Growth Mapping</h4>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed mt-1">
                        See what your child is naturally drawn to—astronomy, robotics, nature, or literature—and nurture their innate strengths.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FFD66B]/20 text-[#FFD66B] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white font-poppins">Parent-Controlled Screen Time</h4>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed mt-1">
                        Easily establish daily exploration limits, automated bedtime quiet hours, and offline play prompts.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F45124]/20 text-[#F45124] flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white font-poppins">Multiple Child Profiles</h4>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed mt-1">
                        Give each brother or sister their own private universe and companion tailored specifically to their age and preferences.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all"
                    >
                      <span>Access Parent Portal</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-sm rounded-3xl bg-[#0c1b2d] border border-white/25 p-6 shadow-2xl">
                    <div className="flex items-center gap-3 pb-4 border-b border-white/15 mb-4">
                      <img src={boyGlassesImg} alt="Child profile icon" className="w-12 h-12 rounded-2xl bg-white/10 object-cover" />
                      <div>
                        <h5 className="text-sm font-bold text-white">Leo's Curiosity Digest</h5>
                        <p className="text-[11px] text-white/60">Age 8 • 4 Quests This Week</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-white/80 mb-1">
                          <span>Astronomy & Planets</span>
                          <span className="font-bold text-[#65BDEB]">85% Mastered</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#65BDEB] rounded-full w-[85%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-white/80 mb-1">
                          <span>Creative Story Writing</span>
                          <span className="font-bold text-[#FFD66B]">70% Mastered</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#FFD66B] rounded-full w-[70%]" />
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/70">
                        💡 <strong>Family Conversation Idea:</strong> Ask Leo what he learned about Saturn's ice rings at dinner tonight!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-white/[0.06] border border-white/15 p-6 sm:p-10 lg:p-12 backdrop-blur-xl animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#65BDEB]/20 text-[#65BDEB] flex items-center justify-center shrink-0">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white font-poppins">Curriculum-Aligned STEM & Literacy</h4>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed mt-1">
                        Seamlessly integrates into early childhood and elementary inquiry units, supporting differentiated classroom learning.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FFD66B]/20 text-[#FFD66B] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white font-poppins">FERPA & Student Privacy Compliance</h4>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed mt-1">
                        Zero student data harvesting. Enterprise school privacy architecture meeting global educational standards.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#9375E8]/20 text-[#9375E8] flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white font-poppins">
                        Teacher Dashboard <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-white/10 text-[#65BDEB] ml-2">Planned Capability</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed mt-1">
                        Group classroom quest assignment, collective mastery analytics, and exportable progress summaries.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-[#65BDEB] text-[#081325] hover:bg-[#83cbf0] transition-all"
                    >
                      <span>Inquire About School Pilot</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-sm rounded-3xl bg-[#0c1b2d] border border-white/25 p-6 shadow-2xl">
                    <div className="flex items-center gap-3 pb-4 border-b border-white/15 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#65BDEB]/20 text-[#65BDEB] flex items-center justify-center font-bold">
                        🏫
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-white">Classroom 3-B Flight Deck</h5>
                        <p className="text-[11px] text-[#65BDEB]">24 Active Young Scientists</p>
                      </div>
                    </div>
                    <div className="space-y-2.5 text-xs text-white/80">
                      <div className="p-2.5 rounded-xl bg-white/5 flex justify-between">
                        <span>Solar System Quest</span>
                        <span className="text-emerald-400 font-bold">92% Completed</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 flex justify-between">
                        <span>Fraction Forest Challenge</span>
                        <span className="text-amber-400 font-bold">In Progress</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 flex justify-between">
                        <span>Animal Ecology Lab</span>
                        <span className="text-[#65BDEB] font-bold">Scheduled Friday</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. PRICING & SUBSCRIPTION PLANS (#pricing)                     */}
      {/* ============================================================== */}
      <section id="pricing" className="relative z-10 w-full py-16 sm:py-24 bg-gradient-to-b from-transparent via-[#0c1d33]/80 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD66B]/15 border border-[#FFD66B]/30 text-xs font-bold text-[#FFD66B] uppercase tracking-wider mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>Transparent Pricing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-poppins tracking-tight">
              Choose Your Learning Journey
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed font-normal">
              Zero sneaky lock-ins. Every plan is 100% ad-free and comes with a 14-day risk-free trial.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-white/10 border border-white/20 mt-8 backdrop-blur-md">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  billingCycle === 'monthly' ? 'bg-[#F45124] text-white shadow-md' : 'text-white/70 hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  billingCycle === 'annual' ? 'bg-[#F45124] text-white shadow-md' : 'text-white/70 hover:text-white'
                }`}
              >
                <span>Annual Billing</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#FFD66B] text-[#081325]">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Free Starter */}
            <div className="p-7 sm:p-8 rounded-3xl bg-white/[0.06] border border-white/15 backdrop-blur-md flex flex-col justify-between hover:border-white/30 transition-all">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-white/60">Free Explorer</span>
                <h3 className="text-2xl font-bold text-white font-poppins mt-2">Starter Galaxy</h3>
                <p className="text-xs text-white/70 mt-1 mb-6">Perfect for curious children trying daily micro-quests.</p>
                
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white font-poppins">$0</span>
                  <span className="text-xs text-white/60">/ forever</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10 text-xs sm:text-sm text-white/80">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#65BDEB] shrink-0" />
                    <span>1 Child Explorer Profile</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#65BDEB] shrink-0" />
                    <span>3 Daily Spark Quests</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#65BDEB] shrink-0" />
                    <span>Basic Curiosity Badges</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#65BDEB] shrink-0" />
                    <span>100% Ad-Free & Safe</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  to="/register"
                  className="w-full py-3 rounded-full text-center font-bold text-sm bg-white/10 text-white hover:bg-white/20 border border-white/25 transition-all block"
                >
                  Start Free
                </Link>
              </div>
            </div>

            {/* Popular Family Adventurer */}
            <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-b from-[#132d4d] to-[#0c1f36] border-2 border-[#F45124] shadow-2xl flex flex-col justify-between relative transform lg:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#F45124] to-[#FF6B4A] text-[11px] font-black uppercase tracking-wider text-white shadow-lg">
                ★ Most Popular For Families
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFD66B]">Unlimited Exploration</span>
                <h3 className="text-2xl font-bold text-white font-poppins mt-2">Family Adventurer</h3>
                <p className="text-xs text-white/70 mt-1 mb-6">Full adaptive AI companion for multi-child families.</p>
                
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white font-poppins">
                    {billingCycle === 'annual' ? '$7.99' : '$9.99'}
                  </span>
                  <span className="text-xs text-white/60">/ month</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/15 text-xs sm:text-sm text-white/90">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#FFD66B] shrink-0" />
                    <span><strong>Up to 3 Child Profiles</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#FFD66B] shrink-0" />
                    <span>Unlimited Daily AI Quests</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#FFD66B] shrink-0" />
                    <span>All 8 Learning Worlds & Courses</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#FFD66B] shrink-0" />
                    <span>Parent Growth & Screen-Time Controls</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#FFD66B] shrink-0" />
                    <span>Printable Offline STEM Kits</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  to="/register"
                  className="w-full py-3.5 rounded-full text-center font-bold text-sm bg-gradient-to-r from-[#F45124] to-[#FF6B4A] text-white hover:from-[#e04216] hover:to-[#f05a39] shadow-lg shadow-orange-600/40 hover:scale-[1.02] transition-all block"
                >
                  Start 14-Day Free Trial
                </Link>
                <p className="text-[11px] text-center text-white/60 mt-2">No credit card charge until trial ends</p>
              </div>
            </div>

            {/* School / Academy Pilot */}
            <div className="p-7 sm:p-8 rounded-3xl bg-white/[0.06] border border-white/15 backdrop-blur-md flex flex-col justify-between hover:border-white/30 transition-all">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#65BDEB]">Educators & Schools</span>
                <h3 className="text-2xl font-bold text-white font-poppins mt-2">School & Academy</h3>
                <p className="text-xs text-white/70 mt-1 mb-6">Tailored for elementary classrooms and homeschool groups.</p>
                
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-extrabold text-white font-poppins">Custom Pilot</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10 text-xs sm:text-sm text-white/80">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#65BDEB] shrink-0" />
                    <span>Unlimited Classroom Student Profiles</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#65BDEB] shrink-0" />
                    <span>Curriculum Alignment Support</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#65BDEB] shrink-0" />
                    <span>FERPA-Compliant Data Isolation</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#65BDEB] shrink-0" />
                    <span>Dedicated Onboarding Specialist</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <a
                  href="#contact"
                  className="w-full py-3 rounded-full text-center font-bold text-sm bg-white/10 text-white hover:bg-white/20 border border-white/25 transition-all block"
                >
                  Request School Pilot
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. FREQUENTLY ASKED QUESTIONS (#faq)                          */}
      {/* ============================================================== */}
      <section id="faq" className="relative z-10 w-full py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#65BDEB]/15 border border-[#65BDEB]/30 text-xs font-bold text-[#65BDEB] uppercase tracking-wider mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-poppins tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/75">
              Everything parents and educators want to know about our safe AI learning universe.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white/[0.06] border border-white/15 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.04] transition-colors"
                  >
                    <span className="font-bold text-base sm:text-lg text-white font-poppins">
                      {item.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#F45124] text-white' : 'text-white/60'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 text-sm text-white/75 leading-relaxed border-t border-white/10 pt-4 animate-fadeIn">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. CONTACT US & FINAL CTA (#contact)                         */}
      {/* ============================================================== */}
      <section id="contact" className="relative z-10 w-full py-16 sm:py-24 bg-gradient-to-b from-transparent via-[#0f233d]/90 to-[#081325]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Mission & Quick Contacts */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F45124]/15 border border-[#F45124]/30 text-xs font-bold text-[#F45124] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Start Your Adventure</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-poppins tracking-tight leading-tight">
                Ready to Begin a New Learning Adventure?
              </h2>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                Join thousands of mindful families and innovative schools unlocking the infinite potential in every curious child.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#65BDEB]">
                    📧
                  </div>
                  <div>
                    <h5 className="text-xs text-white/60">Direct Support Email</h5>
                    <p className="text-sm font-bold text-white">support@lifeverse.ai</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#FFD66B]">
                    🛡️
                  </div>
                  <div>
                    <h5 className="text-xs text-white/60">Child Safety Promise</h5>
                    <p className="text-sm font-bold text-white">100% Ad-Free • COPPA Certified • Verified Safe</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to="/onboarding/child"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-bold bg-[#F45124] text-white hover:bg-[#e04216] shadow-lg shadow-orange-600/30 transition-all"
                >
                  <span>Start Exploring Now</span>
                  <Sparkles className="w-4 h-4" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-base font-semibold text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
                >
                  <span>Parent Login</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Clean Interactive Contact Message Form */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-white/[0.08] border border-white/20 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-poppins mb-2">Send Us a Message</h3>
                <p className="text-xs sm:text-sm text-white/70 mb-6">
                  Have questions about family plans or want to request a school presentation? We respond within 24 hours.
                </p>

                {contactSubmitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-center animate-fadeIn">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                    <h4 className="text-lg font-bold text-white font-poppins">Message Received!</h4>
                    <p className="text-xs sm:text-sm text-emerald-200 mt-1">
                      Thank you for reaching out. Our family support team will get in touch shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#65BDEB] focus:ring-1 focus:ring-[#65BDEB]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-white/80 mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="sarah@example.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#65BDEB] focus:ring-1 focus:ring-[#65BDEB]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-white/80 mb-1">I am a...</label>
                        <select
                          value={contactForm.role}
                          onChange={(e) => setContactForm({ ...contactForm, role: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#0d1d33] border border-white/20 text-white text-sm focus:outline-none focus:border-[#65BDEB]"
                        >
                          <option value="parent">Parent / Caregiver</option>
                          <option value="teacher">Teacher / Educator</option>
                          <option value="school_admin">School Administrator</option>
                          <option value="other">Other Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Your Message or Question</label>
                      <textarea
                        rows={3}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Tell us about your child's age or your school's requirements..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#65BDEB] focus:ring-1 focus:ring-[#65BDEB]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#F45124] to-[#FF6B4A] hover:from-[#e04216] hover:to-[#f05a39] text-white shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message to LifeVerse AI</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 11. FOOTER                                                     */}
      {/* ============================================================== */}
      <footer className="relative z-10 w-full bg-[#050c18] border-t border-white/10 pt-12 sm:pt-16 pb-8 text-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            
            {/* Col 1: Brand & Bio */}
            <div className="lg:col-span-2 space-y-4">
              <LifeVerseLogo />
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-sm mt-3">
                Where curiosity meets intelligent learning. AI-powered educational adventures designed to help children, parents, and schools discover their potential in a safe, ad-free universe.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-bold text-white/80 border border-white/15">
                  🛡️ COPPA Certified
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-bold text-white/80 border border-white/15">
                  ✨ 100% Kid Safe
                </span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div>
              <h4 className="text-sm font-bold text-white font-poppins mb-4 uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#courses" className="hover:text-white transition-colors">Courses & Worlds</a></li>
                <li><a href="#activities" className="hover:text-white transition-colors">Activities</a></li>
                <li><a href="#resources" className="hover:text-white transition-colors">Free Resources</a></li>
                <li><a href="#parents-corner" className="hover:text-white transition-colors">Parent's Corner</a></li>
              </ul>
            </div>

            {/* Col 3: Learning Worlds */}
            <div>
              <h4 className="text-sm font-bold text-white font-poppins mb-4 uppercase tracking-wider">Learning Worlds</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li><a href="#courses" className="hover:text-white transition-colors">Cosmic Space Science</a></li>
                <li><a href="#courses" className="hover:text-white transition-colors">Adventure Math & Logic</a></li>
                <li><a href="#courses" className="hover:text-white transition-colors">Story Studio & Reading</a></li>
                <li><a href="#courses" className="hover:text-white transition-colors">Ecology & Ocean Life</a></li>
                <li><a href="#courses" className="hover:text-white transition-colors">Young Inventors Lab</a></li>
              </ul>
            </div>

            {/* Col 4: Legal & Account */}
            <div>
              <h4 className="text-sm font-bold text-white font-poppins mb-4 uppercase tracking-wider">Account & Safety</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li><Link to="/login" className="hover:text-white transition-colors">Parent Login</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Sign Up Free</Link></li>
                <li><Link to="/onboarding/child" className="hover:text-white transition-colors">Child Onboarding Flow</Link></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>

          </div>

          {/* Copyright & Disclaimer Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
            <p>© 2026 LifeVerse AI. All rights reserved. Designed with ❤️ for kids and their families.</p>
            <p>Made with high-standard privacy protection & safe AI principles.</p>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
