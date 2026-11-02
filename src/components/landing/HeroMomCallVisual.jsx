import React from 'react';

export const HeroMomCallVisual = () => {
  return (
    <div className="w-full relative flex items-center justify-center select-none py-2 group">
      {/* Ambient Background Glow Mesh */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#8B75E8]/30 via-[#FF9EAD]/25 to-[#FFE28A]/30 rounded-[36px] blur-2xl opacity-80 group-hover:opacity-100 transition-all pointer-events-none" />

      {/* Main Image Container Card with Clean Rounded Glass Styling */}
      <div className="relative w-full max-w-xl rounded-3xl overflow-hidden border-2 border-white/90 shadow-2xl bg-surface-container-lowest transition-transform duration-500 hover:scale-[1.01]">
        <img
          src="/assets/landing/hero_girl_mom_call_active.jpg"
          alt="Young adult student in hostel having a heartfelt video call with her mother"
          className="w-full h-auto object-cover block"
          loading="eager"
        />
      </div>
    </div>
  );
};

export default HeroMomCallVisual;
