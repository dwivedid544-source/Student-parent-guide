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

    // Subtle tilt: max 14 degrees
    setRotate({
      x: -deltaY * 12,
      y: deltaX * 14,
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
      className={`relative w-full max-w-[340px] sm:max-w-[400px] h-[190px] sm:h-[220px] flex items-center justify-center select-none perspective-[1000px] ${className}`}
      aria-hidden="true"
    >
      {/* Background Soft Green Glow */}
      <div className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-[#194333]/20 via-[#4B735F]/20 to-[#A7D4B5]/30 blur-2xl pointer-events-none" />

      {/* 3D Rotational Canvas */}
      <div
        className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Orbital Ring 1 - Outer Ellipse */}
        <div
          className={`absolute inset-0 rounded-full border border-[#194333]/25 border-dashed pointer-events-none ${
            !isHovered ? 'animate-spin-slow' : ''
          }`}
          style={{
            transform: 'rotateX(68deg) rotateY(-18deg) scale(1.35)',
            boxShadow: '0 0 25px rgba(25,67,51,0.06)',
          }}
        >
          {/* Satellite Pearl 1 */}
          <div
            className="absolute -top-1.5 left-1/2 w-3.5 h-3.5 -translate-x-1/2 rounded-full bg-gradient-to-br from-white to-[#DCE8DE] border border-[#194333]/30 shadow-xs"
            style={{ transform: 'rotateX(-68deg)' }}
          />
        </div>

        {/* Orbital Ring 2 - Inclined Sage Ellipse */}
        <div
          className={`absolute inset-2 rounded-full border border-[#4B735F]/35 pointer-events-none ${
            !isHovered ? 'animate-reverse-spin-slow' : ''
          }`}
          style={{
            transform: 'rotateX(62deg) rotateY(24deg) scale(1.15)',
          }}
        >
          {/* Satellite Pearl 2 */}
          <div
            className="absolute -bottom-1.5 right-1/4 w-2.5 h-2.5 rounded-full bg-[#194333] border border-white/60 shadow-xs"
          />
        </div>

        {/* Orbital Ring 3 - Horizontal Thin Aura */}
        <div
          className="absolute inset-6 rounded-full border border-[#A7D4B5]/40 pointer-events-none"
          style={{
            transform: 'rotateX(78deg) scale(1.05)',
          }}
        />

        {/* Central Frosted Glass Sphere */}
        <div
          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-[0_15px_35px_rgba(25,67,51,0.18)] transition-all duration-500 overflow-hidden"
          style={{
            background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.92) 0%, rgba(220,232,222,0.7) 45%, rgba(25,67,51,0.85) 100%)',
            backdropFilter: 'blur(12px)',
            border: '1.5px solid rgba(255,255,255,0.7)',
          }}
        >
          {/* Specular Light Reflection (Glass highlight) */}
          <div className="absolute top-2 left-3 w-8 h-4 rounded-full bg-white/70 blur-[1px] -rotate-30" />
          <div className="absolute bottom-3 right-3 w-5 h-5 rounded-full bg-[#A7D4B5]/40 blur-xs" />

          {/* Inner Core Icon: Compass of Potential */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-8 h-8 sm:w-9 sm:h-9 text-white/90 drop-shadow-md"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="rgba(255,255,255,0.3)" />
            </svg>
          </div>
        </div>

        {/* Floating Ambient Mini Geometric Elements */}
        <div
          className="absolute -top-4 -right-4 w-4 h-4 rounded-md border border-[#194333]/25 bg-white/40 backdrop-blur-xs rotate-12 transition-transform duration-300"
          style={{ transform: `translateZ(20px) rotate(${rotate.y * 2}deg)` }}
        />
        <div
          className="absolute -bottom-2 -left-3 w-3 h-3 rounded-full bg-[#194333]/20 backdrop-blur-xs transition-transform duration-300"
          style={{ transform: `translateZ(15px) translate(${rotate.x}px, ${rotate.y}px)` }}
        />
      </div>
    </div>
  );
};

export default GlassOrbitVisual;

