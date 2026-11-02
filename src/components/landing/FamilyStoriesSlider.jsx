import React, { useState, useEffect, useRef } from 'react';

const SLIDES = [
  {
    id: 1,
    image: '/assets/landing/family_story_1.jpg',
    tag: 'Counseling & Emotional Growth',
    title: 'Compassionate Guidance & Safe Reflection',
    caption: 'A space to explore challenges without judgment, cultivating emotional resilience and self-belief.',
    stats: '100% Zero-Judgment Space',
    accent: 'from-[#8B75E8] to-[#B9A5FF]'
  },
  {
    id: 2,
    image: '/assets/landing/family_story_2.jpg',
    tag: 'Generational Harmony',
    title: 'Father & Daughter Dialogues Grounded in Trust',
    caption: 'Replacing pressure with gentle curiosity that honors young adult independence.',
    stats: 'Mutual Active Listening',
    accent: 'from-[#FF9EAD] to-[#FFBD8A]'
  },
  {
    id: 3,
    image: '/assets/landing/family_story_3.jpg',
    tag: 'Empathetic Understanding',
    title: 'Mother & Daughter Heart-to-Heart Connection',
    caption: 'Sharing thoughts with calm reassurance, making home feel near regardless of distance.',
    stats: 'Private Family Encrypted',
    accent: 'from-[#8CCFFF] to-[#327ba7]'
  },
  {
    id: 4,
    image: '/assets/landing/family_story_4.jpg',
    tag: 'Non-Judgmental Support',
    title: 'Father & Son Reassurance & Quiet Strength',
    caption: 'Unconditional encouragement that eases academic stress and strengthens family ties.',
    stats: 'Unconditional Encouragement',
    accent: 'from-[#FFE28A] to-[#FFBD8A]'
  }
];

export const FamilyStoriesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-play sliding window every 3.8 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      handlePrev();
    }
  };

  return (
    <div
      className="relative mt-6 rounded-3xl overflow-hidden border-2 border-white shadow-2xl bg-surface-container-lowest select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sliding Window Track */}
      <div className="relative w-full overflow-hidden aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] max-h-[580px]">
        <div
          className="flex h-full w-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className="relative min-w-full h-full flex-shrink-0 overflow-hidden bg-[#211C3B]/10"
            >
              {/* Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-105"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />

              {/* Gradient Overlays for Readability & Cinematic Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b1831]/85 via-[#1b1831]/30 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1b1831]/40 via-transparent to-transparent pointer-events-none" />

              {/* Top Floating Badges */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between pointer-events-none">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-white/60 text-xs font-semibold text-primary">
                  <span className="w-2 h-2 rounded-full bg-secondary-container animate-ping" />
                  <span>{slide.tag}</span>
                </div>

                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b1831]/60 backdrop-blur-md text-white/90 text-xs border border-white/20">
                  <span className="material-symbols-outlined text-xs text-[#FFE28A]">verified</span>
                  <span>{slide.stats}</span>
                </div>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white pointer-events-none">
                <div className="max-w-2xl bg-white/15 backdrop-blur-xl border border-white/30 rounded-2xl p-4 sm:p-5 shadow-2xl">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#FFE28A] uppercase tracking-wider mb-1">
                    <span>Story 0{idx + 1} of 0{SLIDES.length}</span>
                    <span>•</span>
                    <span className="text-white/80">Emotional Wellness in Action</span>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
                    {slide.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 mt-1 line-clamp-2 sm:line-clamp-none">
                    {slide.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous story slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 hover:bg-white text-on-surface shadow-xl backdrop-blur-md border border-white/70 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-20"
        >
          <span className="material-symbols-outlined text-xl">chevron_left</span>
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next story slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 hover:bg-white text-on-surface shadow-xl backdrop-blur-md border border-white/70 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-20"
        >
          <span className="material-symbols-outlined text-xl">chevron_right</span>
        </button>
      </div>

      {/* Bottom Interactive Sliding Pagination Bar */}
      <div className="py-3 px-4 sm:px-6 bg-[#FAF8FF] border-t border-surface-container flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-8 bg-gradient-to-r from-primary to-secondary-container shadow-sm'
                  : 'w-2.5 bg-surface-container-highest hover:bg-primary-fixed'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>Continuous Auto-Slide Active</span>
          </span>
          <span className="hidden sm:inline text-outline-variant">|</span>
          <span className="hidden sm:inline">Hover to pause</span>
        </div>
      </div>
    </div>
  );
};

export default FamilyStoriesSlider;

