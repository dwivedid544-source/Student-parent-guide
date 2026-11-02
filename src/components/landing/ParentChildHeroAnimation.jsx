import React, { useState, useEffect } from 'react';

/**
 * ParentChildHeroAnimation
 * 2D vector editorial animated scene showing a young adult approaching their parent,
 * sitting together, sharing feelings vulnerably, and receiving warm, attentive listening & reassurance.
 * Seamlessly blends into the hero background (no box, no card, no video player).
 */
export const ParentChildHeroAnimation = () => {
  // Sequence stages:
  // 0: Approach & Sit (0 - 3.5s)
  // 1: Phone set aside & Attentive Turn (3.5 - 7s)
  // 2: Vulnerable sharing & natural gestures (7 - 10.5s)
  // 3: Warm Handhold, empathy & comforting reassurance (10.5 - 14s)
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % 4);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full relative flex items-center justify-center select-none py-4">
      {/* Ambient background aura (no borders, blends with hero mesh) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#8B75E8]/20 via-[#FF9EAD]/15 to-[#FFE28A]/20 blur-3xl animate-pulse" />
      </div>

      <div className="relative w-full max-w-xl mx-auto flex flex-col items-center">
        {/* Dynamic Emotional Dialogue Pills (fade in and out seamlessly with conversation) */}
        <div className="h-16 flex items-center justify-center w-full px-4 mb-2 z-20">
          {stage === 0 && (
            <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#B8A9FF]/40 shadow-sm text-xs sm:text-sm font-medium text-[#211C3B]">
              <span className="w-2 h-2 rounded-full bg-[#7768D8] animate-ping" />
              <span>Young adult approaches: <em>"Hey Mom, do you have a few minutes?"</em></span>
            </div>
          )}

          {stage === 1 && (
            <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#FF9EAD]/40 shadow-sm text-xs sm:text-sm font-medium text-[#211C3B]">
              <span className="material-symbols-outlined text-sm text-[#E87A90]">phone_disabled</span>
              <span>Parent sets phone aside, turning completely to listen attentively</span>
            </div>
          )}

          {stage === 2 && (
            <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#8CCFFF]/50 shadow-sm text-xs sm:text-sm font-medium text-[#211C3B]">
              <span className="material-symbols-outlined text-sm text-[#06628c]">chat</span>
              <span>Child shares vulnerability: <em>"I felt so overwhelmed this semester..."</em></span>
            </div>
          )}

          {stage === 3 && (
            <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#FFD9DD] shadow-md text-xs sm:text-sm font-medium text-[#934654]">
              <span className="material-symbols-outlined text-sm text-[#FF9EAD]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              <span>Gentle handhold &amp; reassurance: <em>"I'm so proud of your honesty. We're in this together."</em></span>
            </div>
          )}
        </div>

        {/* 2D Vector Illustration Canvas */}
        <div className="relative w-full aspect-[4/3] max-h-[460px]">
          <svg
            viewBox="0 0 600 450"
            className="w-full h-full overflow-visible drop-shadow-xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Defs for gradients & filters */}
            <defs>
              <linearGradient id="sofaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F3EFFF" />
                <stop offset="100%" stopColor="#E5DEFF" />
              </linearGradient>

              <linearGradient id="parentSweater" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7768D8" />
                <stop offset="100%" stopColor="#5F48B9" />
              </linearGradient>

              <linearGradient id="childSweater" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FE9DAC" />
                <stop offset="100%" stopColor="#F0A18D" />
              </linearGradient>

              <linearGradient id="rugGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFE28A" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#FF9EAD" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#8B75E8" stopOpacity="0.25" />
              </linearGradient>

              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* 1. Cozy Home Floor Oval Rug */}
            <ellipse cx="300" cy="405" rx="250" ry="32" fill="url(#rugGrad)" />

            {/* 2. Ambient Living Room Elements (Plant & Floor Lamp) */}
            {/* Floor Lamp on left */}
            <g opacity="0.85">
              <line x1="85" y1="390" x2="85" y2="140" stroke="#CAC4D5" strokeWidth="3" strokeLinecap="round" />
              <circle cx="85" cy="390" r="14" fill="#CAC4D5" opacity="0.5" />
              {/* Lamp Shade */}
              <path d="M60 140 L110 140 L120 180 L50 180 Z" fill="#FFE28A" opacity="0.85" />
              {/* Warm light glow */}
              <ellipse cx="85" cy="180" rx="35" ry="10" fill="#FFE28A" opacity="0.6" filter="url(#softGlow)" />
            </g>

            {/* Indoor Plant on right */}
            <g opacity="0.9">
              <path d="M515 350 L535 350 L530 395 L520 395 Z" fill="#CAC4D5" />
              {/* Leaves */}
              <path d="M525 350 Q500 320 495 290 Q515 310 525 350 Z" fill="#68B684" />
              <path d="M525 345 Q540 310 555 285 Q545 320 525 345 Z" fill="#529E6F" />
              <path d="M525 340 Q520 280 528 255 Q535 290 525 340 Z" fill="#7DCE99" />
            </g>

            {/* 3. Modern Comfortable Sofa */}
            <g id="sofa">
              {/* Sofa Backrest */}
              <rect x="135" y="190" width="330" height="150" rx="28" fill="url(#sofaGrad)" stroke="#FFFFFF" strokeWidth="2" />
              {/* Left & Right Armrests */}
              <rect x="120" y="240" width="40" height="110" rx="20" fill="#E5DEFF" stroke="#FFFFFF" strokeWidth="2" />
              <rect x="440" y="240" width="40" height="110" rx="20" fill="#E5DEFF" stroke="#FFFFFF" strokeWidth="2" />
              {/* Sofa Seat Cushion */}
              <rect x="145" y="285" width="310" height="85" rx="22" fill="#FAF8FF" stroke="#FFFFFF" strokeWidth="2" />
              {/* Sofa Legs */}
              <line x1="160" y1="370" x2="155" y2="400" stroke="#797584" strokeWidth="4" strokeLinecap="round" />
              <line x1="440" y1="370" x2="445" y2="400" stroke="#797584" strokeWidth="4" strokeLinecap="round" />
              {/* Cozy Decorative Throw Pillow */}
              <rect x="150" y="255" width="46" height="46" rx="14" transform="rotate(-12 150 255)" fill="#FFD9DD" stroke="#FFFFFF" strokeWidth="1.5" />
            </g>

            {/* 4. Parent Character (Mother / Guardian seated on right of sofa) */}
            <g id="parent" className="transition-all duration-700 ease-in-out">
              {/* Parent Body / Torso */}
              {/* In stages 1, 2, 3 parent turns naturally toward the child (leaning slightly left) */}
              <g
                style={{
                  transform: stage >= 1 ? 'rotate(-5deg) translate(-8px, -2px)' : 'rotate(0deg)',
                  transformOrigin: '360px 320px',
                  transition: 'transform 0.8s ease-in-out'
                }}
              >
                {/* Legs & Comfortable Slacks */}
                <path d="M335 340 L345 400 L375 400 L370 340 Z" fill="#484552" />
                <path d="M375 340 L385 400 L415 400 L405 340 Z" fill="#3D3A47" />

                {/* Torso & Warm Indigo Sweater */}
                <path
                  d="M335 240 Q370 230 405 240 L415 340 L325 340 Z"
                  fill="url(#parentSweater)"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />

                {/* Left Arm / Listening Arm:
                    Stage 0: resting with phone
                    Stage 1+: reaches out onto cushion towards child */}
                {stage === 0 ? (
                  <g>
                    <path d="M335 250 Q315 285 320 310" stroke="#7768D8" strokeWidth="18" strokeLinecap="round" />
                    {/* Hand with phone */}
                    <circle cx="320" cy="315" r="9" fill="#E88E77" />
                    <rect x="312" y="306" width="16" height="24" rx="3" fill="#211C3B" transform="rotate(15 312 306)" />
                  </g>
                ) : (
                  <g className="transition-all duration-700">
                    {/* Phone placed down peacefully on side cushion */}
                    <rect x="420" y="325" width="16" height="26" rx="3" fill="#211C3B" opacity="0.6" transform="rotate(45 420 325)" />
                    {/* Extended arm reaching to gently support child */}
                    <path
                      d="M335 250 Q305 280 280 295"
                      stroke="#7768D8"
                      strokeWidth="18"
                      strokeLinecap="round"
                      className="transition-all duration-700"
                    />
                    {/* Gentle Reassuring Parent Hand */}
                    <circle cx="270" cy="298" r="11" fill="#E88E77" />
                  </g>
                )}

                {/* Right Arm relaxed */}
                <path d="M405 250 Q430 280 425 320" stroke="#5F48B9" strokeWidth="16" strokeLinecap="round" />
                <circle cx="425" cy="325" r="9" fill="#E88E77" />

                {/* Neck & Head */}
                <rect x="363" y="215" width="14" height="20" rx="6" fill="#F0A18D" />
                
                {/* Parent Head: Turns gently left toward child in stages 1, 2, 3 */}
                <g
                  style={{
                    transform: stage >= 1 ? 'rotate(-8deg) translate(-6px, 0px)' : 'rotate(0deg)',
                    transformOrigin: '370px 200px',
                    transition: 'transform 0.8s ease-in-out'
                  }}
                >
                  {/* Hair (Elegant Dark Wavy Style) */}
                  <path
                    d="M340 180 Q370 145 400 180 Q415 220 395 235 Q370 215 345 235 Q330 210 340 180 Z"
                    fill="#211C3B"
                  />
                  {/* Face */}
                  <circle cx="370" cy="195" r="22" fill="#F0A18D" />
                  {/* Gentle Loving Eyes */}
                  <path d="M358 193 Q363 190 367 193" stroke="#211C3B" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M373 193 Q377 190 382 193" stroke="#211C3B" strokeWidth="2.2" strokeLinecap="round" />
                  {/* Warm Empathetic Smile */}
                  <path
                    d={stage >= 2 ? "M364 204 Q370 212 378 204" : "M365 204 Q370 208 376 204"}
                    stroke="#BA1A1A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
              </g>
            </g>

            {/* 5. Young Adult Child Character (Student, 18-22) */}
            <g
              id="child"
              style={{
                transform: stage === 0
                  ? 'translate(-40px, -15px)' // approaching
                  : 'translate(0px, 0px)',     // seated closely beside parent
                opacity: stage === 0 ? 0.9 : 1,
                transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-in-out'
              }}
            >
              {/* Legs in comfortable jeans */}
              <path d="M225 340 L220 405 L250 405 L255 340 Z" fill="#327BA7" />
              <path d="M260 340 L260 405 L290 405 L285 340 Z" fill="#06628C" />

              {/* Child Torso (Coral / Rose Knit Sweater) */}
              <path
                d="M215 245 Q250 238 285 245 L295 340 L205 340 Z"
                fill="url(#childSweater)"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />

              {/* Child Arms & Gestures:
                  Stage 0, 1: Hesitant posture
                  Stage 2: Expressive hand gesture talking openly
                  Stage 3: Clasping parent's reassuring hand */}
              {stage < 2 ? (
                <g className="transition-all duration-700">
                  {/* Arms resting hesitantly in lap */}
                  <path d="M215 255 Q205 290 230 320" stroke="#F0A18D" strokeWidth="15" strokeLinecap="round" />
                  <path d="M285 255 Q290 290 265 320" stroke="#FE9DAC" strokeWidth="15" strokeLinecap="round" />
                  <circle cx="248" cy="322" r="9" fill="#F0A18D" />
                </g>
              ) : stage === 2 ? (
                <g className="transition-all duration-500">
                  {/* Left Arm natural gesture */}
                  <path d="M215 255 Q195 285 210 305" stroke="#F0A18D" strokeWidth="15" strokeLinecap="round" />
                  <circle cx="210" cy="305" r="8" fill="#F0A18D" />
                  {/* Right Arm animatedly explaining / gesturing feelings */}
                  <path d="M285 255 Q280 275 255 285" stroke="#FE9DAC" strokeWidth="15" strokeLinecap="round" />
                  <circle cx="250" cy="285" r="9" fill="#F0A18D" />
                  {/* Subtle conversational sound wave particles */}
                  <circle cx="265" cy="250" r="3" fill="#B8A9FF" className="animate-ping" />
                  <circle cx="275" cy="240" r="2.5" fill="#FF9EAD" className="animate-pulse" />
                </g>
              ) : (
                <g className="transition-all duration-700">
                  {/* Stage 3: Child Hand resting gently in Parent's hand */}
                  <path d="M215 255 Q210 290 235 315" stroke="#F0A18D" strokeWidth="15" strokeLinecap="round" />
                  <path d="M285 255 Q270 280 265 295" stroke="#FE9DAC" strokeWidth="15" strokeLinecap="round" />
                  {/* Interlocked / touching hands with warm golden pulse */}
                  <circle cx="265" cy="296" r="10" fill="#F0A18D" />
                  <circle cx="268" cy="296" r="18" fill="#FFE28A" opacity="0.3" filter="url(#softGlow)" className="animate-pulse" />
                </g>
              )}

              {/* Neck & Head */}
              <rect x="243" y="220" width="14" height="20" rx="6" fill="#F0A18D" />

              {/* Head with stylish modern ponytail & glasses */}
              <g
                style={{
                  transform: stage === 0 ? 'rotate(-6deg)' : stage === 3 ? 'rotate(5deg)' : 'rotate(3deg)',
                  transformOrigin: '250px 200px',
                  transition: 'transform 0.7s ease-in-out'
                }}
              >
                {/* Hair */}
                <path
                  d="M225 185 Q250 150 275 185 Q285 220 270 235 Q245 225 228 232 Z"
                  fill="#1B1831"
                />
                {/* Ponytail extension */}
                <path d="M228 190 Q205 195 200 220 Q215 225 228 205 Z" fill="#1B1831" />

                {/* Face */}
                <circle cx="250" cy="198" r="21" fill="#F0A18D" />

                {/* Cute Glasses */}
                <circle cx="242" cy="196" r="6" stroke="#211C3B" strokeWidth="1.6" fill="none" />
                <circle cx="256" cy="196" r="6" stroke="#211C3B" strokeWidth="1.6" fill="none" />
                <line x1="248" y1="196" x2="250" y2="196" stroke="#211C3B" strokeWidth="1.6" />

                {/* Expressive Eyes */}
                <circle cx="242" cy="196" r="2" fill="#211C3B" />
                <circle cx="256" cy="196" r="2" fill="#211C3B" />

                {/* Mouth Expression:
                    Stage 0, 1: slightly hesitant line
                    Stage 2: speaking
                    Stage 3: peaceful relieved smile */}
                {stage === 2 ? (
                  <ellipse cx="250" cy="209" rx="3.5" ry="2" fill="#BA1A1A" />
                ) : stage === 3 ? (
                  <path d="M245 206 Q250 212 255 206" stroke="#BA1A1A" strokeWidth="2" strokeLinecap="round" fill="none" />
                ) : (
                  <line x1="246" y1="208" x2="254" y2="208" stroke="#BA1A1A" strokeWidth="1.8" strokeLinecap="round" />
                )}
              </g>
            </g>

            {/* 6. Floating Affection & Reassurance Emoticons (Stage 3 Heart Waves) */}
            {stage === 3 && (
              <g className="animate-fade-in">
                {/* Floating Little Hearts rising from the connection */}
                <g className="animate-float" style={{ transformOrigin: '270px 260px' }}>
                  <path
                    d="M270 260 C270 255, 260 250, 255 258 C250 265, 270 275, 270 275 C270 275, 290 265, 285 258 C280 250, 270 255, 270 260 Z"
                    fill="#FF9EAD"
                    opacity="0.9"
                  />
                </g>
                <g className="animate-float" style={{ animationDelay: '0.8s', transformOrigin: '320px 220px' }}>
                  <path
                    d="M320 220 C320 216, 312 212, 308 218 C304 224, 320 232, 320 232 C320 232, 336 224, 332 218 C328 212, 320 216, 320 220 Z"
                    fill="#B8A9FF"
                    opacity="0.85"
                  />
                </g>
              </g>
            )}
          </svg>
        </div>

        {/* Story Progress Indicators (4 subtle dots for the 4 animated phases) */}
        <div className="flex items-center gap-2 mt-2">
          {[
            { label: 'Approach' },
            { label: 'Attentive Listening' },
            { label: 'Sharing Feelings' },
            { label: 'Loving Handhold & Trust' }
          ].map((s, idx) => (
            <button
              key={idx}
              onClick={() => setStage(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                stage === idx
                  ? 'w-7 bg-gradient-to-r from-[#7768D8] to-[#FF9EAD] shadow-xs'
                  : 'w-2 bg-primary-fixed/60 hover:bg-primary-fixed'
              }`}
              title={s.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParentChildHeroAnimation;

