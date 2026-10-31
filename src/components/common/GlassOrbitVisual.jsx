import React, { useState, useEffect, useRef } from 'react';

export const GlassOrbitVisual = ({ className = '' }) => {
  const containerRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    // Check if device supports hover (disables mouse tracking on touch devices)
    if (typeof window !== 'undefined') {
      const hoverQuery = window.matchMedia('(hover: hover)');
      setCanHover(hoverQuery.matches);

      const handleChange = (e) => setCanHover(e.matches);
      hoverQuery.addEventListener?.('change', handleChange);
      return () => hoverQuery.removeEventListener?.('change', handleChange);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (!canHover || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    // Smooth subtle tilt: max 12 degrees
    setRotate({
      x: -deltaY * 10,
      y: deltaX * 12,
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-[340px] sm:max-w-[420px] h-[210px] sm:h-[240px] flex flex-col items-center justify-center select-none perspective-[1000px] ${className}`}
      aria-hidden="true"
    >
      {/* ──────────────── Atmospheric Zen Glow ──────────────── */}
      <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-[#194333]/25 via-[#4B735F]/20 to-[#A7D4B5]/35 blur-3xl pointer-events-none" />

      {/* ──────────────── 3D Rotational Celestial Canvas ──────────────── */}
      <div
        className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ──────── BREATHING RIPPLE WAVE (Expanding Zen Pulse) ──────── */}
        <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[#194333]/30 animate-zen-ripple pointer-events-none" />
        <div
          className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-[#4B735F]/25 animate-zen-ripple pointer-events-none"
          style={{ animationDelay: '2s' }}
        />

        {/* ──────── ORBITAL RING 1 - Primary Outer Celestial Orbit ──────── */}
        {/* Clearly visible border with smooth green styling & subtle shadow */}
        <div
          className={`absolute inset-0 rounded-full border-[1.8px] border-[#194333]/70 shadow-[0_0_18px_rgba(25,67,51,0.22)] pointer-events-none transition-opacity ${
            !isHovered ? 'animate-spin-slow' : ''
          }`}
          style={{
            transform: 'rotateX(68deg) rotateY(-18deg) scale(1.36)',
          }}
        >
          {/* Subtle faint inner track for visual depth */}
          <div className="absolute inset-1 rounded-full border border-[#194333]/20 border-dotted" />

          {/* SATELLITE 1: Graceful Botanical Leaf (Smooth Zen Element) */}
          <div
            className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center justify-center filter drop-shadow-[0_2px_6px_rgba(25,67,51,0.3)]"
            style={{ transform: 'rotateX(-68deg) rotate(-20deg)' }}
          >
            <div className="relative w-7 h-7 flex items-center justify-center group-hover:scale-110 transition-transform">
              {/* Luminous aura behind the leaf */}
              <div className="absolute inset-0 rounded-full bg-[#A7D4B5]/60 blur-xs" />
              {/* Natural elegant eucalyptus leaf SVG */}
              <svg
                className="w-5 h-5 text-[#194333] fill-current relative z-10"
                viewBox="0 0 24 24"
              >
                <path d="M17.8 2.8C12 2.5 7.5 6.8 6.5 12.8c-.5 3 0.6 5.2 2.4 6.5 2 1.3 4.8.8 7-1 3.5-3 6.3-8.2 6.3-15-.7-.4-1.5-.7-2.4-.7zm-8 15c-1.2-.8-1.7-2.3-1.4-4.5.7-5 4.5-9 9.8-9.5-1 4.8-3.8 8.6-8.4 14z" />
              </svg>
            </div>
          </div>
        </div>

        {/* ──────── ORBITAL RING 2 - Transverse Sage Orbit ──────── */}
        {/* Clearly visible inclined ellipse */}
        <div
          className={`absolute inset-2.5 rounded-full border-[1.6px] border-[#2A654C]/75 shadow-[0_0_14px_rgba(42,101,76,0.2)] pointer-events-none ${
            !isHovered ? 'animate-reverse-spin-slow' : ''
          }`}
          style={{
            transform: 'rotateX(62deg) rotateY(24deg) scale(1.16)',
          }}
        >
          {/* SATELLITE 2: Glowing Jade Pearl */}
          <div
            className="absolute -bottom-2 right-1/4 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-white via-[#E6F3EC] to-[#A7D4B5] border-2 border-[#194333] shadow-[0_0_12px_rgba(25,67,51,0.45)]"
          />

          {/* SATELLITE 3: Tiny Golden Sparkle of Potential */}
          <div
            className="absolute top-1/4 -left-1 w-2.5 h-2.5 rounded-full bg-amber-400 border border-white shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse"
          />
        </div>

        {/* ──────── ORBITAL RING 3 - Equatorial Horizon Aura ──────── */}
        <div
          className="absolute inset-6 rounded-full border border-[#4B735F]/40 pointer-events-none"
          style={{
            transform: 'rotateX(78deg) scale(1.06)',
            boxShadow: '0 0 10px rgba(75,115,95,0.12)',
          }}
        />

        {/* ──────── CENTRAL MINDFUL CORE (Zen Breathing Sphere) ──────── */}
        <div
          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden animate-zen-breathe cursor-pointer transition-transform duration-500"
          style={{
            background:
              'radial-gradient(circle at 35% 28%, #FFFFFF 0%, #E8F2EC 25%, #6BA485 62%, #194333 95%)',
            backdropFilter: 'blur(16px)',
            border: '2px solid rgba(255, 255, 255, 0.9)',
          }}
        >
          {/* Specular Light Reflections for Realistic 3D Glass Surface */}
          <div className="absolute top-2.5 left-3.5 w-9 h-4.5 rounded-full bg-white/85 blur-[1.5px] -rotate-30 pointer-events-none" />
          <div className="absolute top-5 left-3 w-3 h-2 rounded-full bg-white/90 blur-[0.8px] pointer-events-none" />
          <div className="absolute bottom-2.5 right-3 w-6 h-6 rounded-full bg-[#A7D4B5]/45 blur-xs pointer-events-none" />

          {/* Inner Sacred Geometry: HighOrbit Compass Star */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-9 h-9 sm:w-10 sm:h-10 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] animate-pulse"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Outer delicate ring */}
              <circle cx="12" cy="12" r="9.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              {/* 4 Cardinal Diamond Star Points */}
              <polygon
                points="12,3 14.5,9.5 21,12 14.5,14.5 12,21 9.5,14.5 3,12 9.5,9.5"
                fill="rgba(255,255,255,0.35)"
                stroke="white"
                strokeWidth="1.2"
              />
              <circle cx="12" cy="12" r="2" fill="white" />
            </svg>
          </div>
        </div>

        {/* ──────── GENTLE AMBIENT PARTICLES (Floating Zen Stardust) ──────── */}
        <div
          className="absolute -top-5 -right-6 w-3 h-3 rounded-full bg-[#A7D4B5]/70 backdrop-blur-xs animate-zen-drift pointer-events-none"
          style={{ animationDelay: '0.5s' }}
        />
        <div
          className="absolute -bottom-4 -left-5 w-2.5 h-2.5 rounded-full bg-[#194333]/30 backdrop-blur-xs animate-zen-drift pointer-events-none"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/2 -right-8 w-2 h-2 rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.8)] animate-pulse pointer-events-none"
          style={{ animationDelay: '1.2s' }}
        />
      </div>

      {/* ──────── CALMING ZEN STATUS BADGE ──────── */}
      <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-[#194333]/20 shadow-2xs backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2F7353] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#194333]" />
        </span>
        <span className="text-[11px] font-medium tracking-wide text-[#194333]">
          Mindful Orbit • Find Your Calm
        </span>
      </div>
    </div>
  );
};

export default GlassOrbitVisual;
