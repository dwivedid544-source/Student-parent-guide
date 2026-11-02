import React, { useEffect, useRef, useState } from 'react';

/**
 * Hero3DExperience
 * 
 * Midnight Aura 3D Web Experience:
 * - Interconnected Parent & Young Adult energy spheres with resonant bridge
 * - Tilting 3D orbital rings in Royal Violet (#7768D8), Soft Lavender (#B8A9FF) & Coral (#F0A18D)
 * - Translucent crystal spheres with caustic reflections & depth sorting
 * - Ambient stardust particle cloud
 * - Smooth pointer-driven 3D parallax & continuous smooth floating physics
 */
export const Hero3DExperience = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Mouse tracking for parallax tilt
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const normX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const normY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      targetTiltX = Math.max(-1, Math.min(1, normX));
      targetTiltY = Math.max(-1, Math.min(1, normY));
    };

    const handlePointerLeave = () => {
      targetTiltX = 0;
      targetTiltY = 0;
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height || 540;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    const container = containerRef.current;
    if (container) {
      container.addEventListener('pointermove', handlePointerMove);
      container.addEventListener('pointerleave', handlePointerLeave);
    }

    // Particle field initialization
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * 480,
      y: (Math.random() - 0.5) * 380,
      z: (Math.random() - 0.5) * 350,
      radius: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      color: Math.random() > 0.4 ? '#B8A9FF' : '#7768D8',
    }));

    // Orbiting crystal beads
    const crystalCount = 7;
    const crystals = Array.from({ length: crystalCount }, (_, i) => ({
      angle: (i / crystalCount) * Math.PI * 2,
      orbitRadiusX: 180 + (i % 3) * 35,
      orbitRadiusY: 85 + (i % 2) * 25,
      speed: 0.008 + (i % 3) * 0.003,
      size: 7 + (i % 4) * 3,
      color: i % 2 === 0 ? '#B8A9FF' : '#F0A18D',
      tilt: (i * 0.35),
    }));

    let time = 0;

    const render = () => {
      time += 0.016;

      // Smooth dampening for parallax
      currentTiltX += (targetTiltX - currentTiltX) * 0.06;
      currentTiltY += (targetTiltY - currentTiltY) * 0.06;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2 + currentTiltX * 24;
      const centerY = height / 2 + currentTiltY * 20;

      // 1. Ambient Background Violet Aurora Glow
      const auroraGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        30,
        centerX,
        centerY,
        width * 0.65
      );
      auroraGradient.addColorStop(0, 'rgba(119, 104, 216, 0.38)');
      auroraGradient.addColorStop(0.35, 'rgba(84, 68, 172, 0.18)');
      auroraGradient.addColorStop(0.7, 'rgba(33, 28, 59, 0.05)');
      auroraGradient.addColorStop(1, 'rgba(33, 28, 59, 0)');
      ctx.fillStyle = auroraGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Render Ambient Particles with 3D Depth
      particles.forEach((p, idx) => {
        p.z += Math.sin(time * p.pulseSpeed + idx) * 0.4;
        const scale = 250 / (250 + p.z + 100);
        const px = centerX + (p.x + Math.sin(time * 0.5 + idx) * 12) * scale;
        const py = centerY + (p.y + Math.cos(time * 0.4 + idx) * 10) * scale;

        if (scale > 0 && px > 0 && px < width && py > 0 && py < height) {
          const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(time * 2 + idx));
          ctx.beginPath();
          ctx.arc(px, py, p.radius * scale, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0.1, Math.min(1, currentAlpha * scale));
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      // 3. Draw 3D Concentric Tilting Orbital Rings
      const drawOrbitRing = (radiusX, radiusY, rotationAngle, strokeStyle, lineWidth, dash = []) => {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotationAngle + currentTiltX * 0.12);
        ctx.scale(1, 0.42 + currentTiltY * 0.08); // 3D perspective foreshortening
        ctx.beginPath();
        ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        if (dash.length > 0) ctx.setLineDash(dash);
        ctx.stroke();
        ctx.restore();
      };

      // Ring 1: Outer Celestial Ring (Soft Lavender Dash)
      drawOrbitRing(250, 240, time * 0.12, 'rgba(184, 169, 255, 0.28)', 1.5, [6, 10]);

      // Ring 2: Mid-Plane Ring (Royal Violet Solid)
      drawOrbitRing(190, 185, -time * 0.18 + 0.4, 'rgba(119, 104, 216, 0.45)', 2);

      // Ring 3: Inner Inclined Resonance Ring (Lavender Glow)
      drawOrbitRing(135, 130, time * 0.25 - 0.8, 'rgba(233, 227, 250, 0.35)', 1.2, [4, 6]);

      // 4. Two Central Connected Nodes (Young Adult & Parent)
      // Node A: Young Adult (Left Center, dynamic, creative Soft Lavender / Coral tone)
      const youngAdultX = centerX - 85 + Math.sin(time * 0.8) * 8;
      const youngAdultY = centerY + 10 + Math.cos(time * 0.9) * 10;
      const youngAdultRadius = 38;

      // Node B: Parent (Right Center, grounding, supportive Royal Violet / Indigo tone)
      const parentX = centerX + 85 + Math.cos(time * 0.75) * 8;
      const parentY = centerY - 15 + Math.sin(time * 0.85) * 10;
      const parentRadius = 46;

      // Dynamic Bridge / Connection Wave between them
      ctx.save();
      const bridgeGradient = ctx.createLinearGradient(youngAdultX, youngAdultY, parentX, parentY);
      bridgeGradient.addColorStop(0, 'rgba(240, 161, 141, 0.85)'); // Soft Coral
      bridgeGradient.addColorStop(0.5, 'rgba(184, 169, 255, 0.95)'); // Soft Lavender
      bridgeGradient.addColorStop(1, 'rgba(119, 104, 216, 0.85)'); // Royal Violet

      // Glowing multi-harmonic connection curves
      for (let c = 0; c < 3; c++) {
        const offsetPhase = c * (Math.PI / 3);
        const waveAmp = 12 * Math.sin(time * 2.5 + offsetPhase);
        ctx.beginPath();
        ctx.moveTo(youngAdultX, youngAdultY);
        ctx.bezierCurveTo(
          youngAdultX + 40,
          youngAdultY + waveAmp - 20,
          parentX - 40,
          parentY - waveAmp + 20,
          parentX,
          parentY
        );
        ctx.strokeStyle = bridgeGradient;
        ctx.lineWidth = 2.2 - c * 0.5;
        ctx.shadowColor = '#B8A9FF';
        ctx.shadowBlur = 14;
        ctx.stroke();
      }
      ctx.restore();

      // Render Central Bridge Pulse Indicator
      const pulseProgress = (time * 0.8) % 1;
      const pulseX = youngAdultX + (parentX - youngAdultX) * pulseProgress;
      const pulseY = youngAdultY + (parentY - youngAdultY) * pulseProgress + Math.sin(pulseProgress * Math.PI) * -15;
      ctx.save();
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#F0A18D';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();

      // Draw Node B: Parent 3D Glass Sphere (Supportive, wise, deep Royal Violet)
      ctx.save();
      const parentGrad = ctx.createRadialGradient(
        parentX - parentRadius * 0.35,
        parentY - parentRadius * 0.35,
        parentRadius * 0.1,
        parentX,
        parentY,
        parentRadius
      );
      parentGrad.addColorStop(0, '#FFFFFF');
      parentGrad.addColorStop(0.25, '#B8A9FF');
      parentGrad.addColorStop(0.65, '#7768D8');
      parentGrad.addColorStop(1, '#211C3B');

      ctx.beginPath();
      ctx.arc(parentX, parentY, parentRadius, 0, Math.PI * 2);
      ctx.fillStyle = parentGrad;
      ctx.shadowColor = 'rgba(119, 104, 216, 0.5)';
      ctx.shadowBlur = 24;
      ctx.fill();

      // Glass specular reflection highlight on Parent
      ctx.beginPath();
      ctx.ellipse(
        parentX - parentRadius * 0.32,
        parentY - parentRadius * 0.32,
        parentRadius * 0.38,
        parentRadius * 0.22,
        -Math.PI / 4,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.fill();
      ctx.restore();

      // Draw Node A: Young Adult 3D Crystal Sphere (Independent, discovering, vibrant Soft Lavender / Coral)
      ctx.save();
      const youngGrad = ctx.createRadialGradient(
        youngAdultX - youngAdultRadius * 0.35,
        youngAdultY - youngAdultRadius * 0.35,
        youngAdultRadius * 0.1,
        youngAdultX,
        youngAdultY,
        youngAdultRadius
      );
      youngGrad.addColorStop(0, '#FFFFFF');
      youngGrad.addColorStop(0.3, '#FAD9D0');
      youngGrad.addColorStop(0.6, '#B8A9FF');
      youngGrad.addColorStop(1, '#6555C9');

      ctx.beginPath();
      ctx.arc(youngAdultX, youngAdultY, youngAdultRadius, 0, Math.PI * 2);
      ctx.fillStyle = youngGrad;
      ctx.shadowColor = 'rgba(240, 161, 141, 0.45)';
      ctx.shadowBlur = 22;
      ctx.fill();

      // Specular highlight on Young Adult
      ctx.beginPath();
      ctx.ellipse(
        youngAdultX - youngAdultRadius * 0.32,
        youngAdultY - youngAdultRadius * 0.32,
        youngAdultRadius * 0.36,
        youngAdultRadius * 0.2,
        -Math.PI / 4,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fill();
      ctx.restore();

      // 5. Orbiting Satellites / Crystal Facets (Representing Strengths, Empathy, Habits)
      crystals.forEach((c) => {
        c.angle += c.speed;
        const orbitX = centerX + Math.cos(c.angle) * c.orbitRadiusX;
        const orbitY = centerY + Math.sin(c.angle) * c.orbitRadiusY * 0.45;
        const depth = Math.sin(c.angle); // -1 to 1 for 3D sorting
        const currentSize = c.size * (0.8 + 0.35 * depth);

        ctx.save();
        ctx.beginPath();
        ctx.arc(orbitX, orbitY, Math.max(3, currentSize), 0, Math.PI * 2);

        const beadGrad = ctx.createRadialGradient(
          orbitX - currentSize * 0.3,
          orbitY - currentSize * 0.3,
          currentSize * 0.1,
          orbitX,
          orbitY,
          currentSize
        );
        beadGrad.addColorStop(0, '#FFFFFF');
        beadGrad.addColorStop(0.5, c.color);
        beadGrad.addColorStop(1, 'rgba(33, 28, 59, 0.8)');

        ctx.fillStyle = beadGrad;
        ctx.shadowColor = c.color;
        ctx.shadowBlur = 12;
        ctx.globalAlpha = 0.5 + 0.5 * ((depth + 1) / 2);
        ctx.fill();
        ctx.restore();
      });

      // 6. Draw Subtle Geometric Crystal Polygons in background
      ctx.save();
      ctx.translate(centerX - 160, centerY - 120);
      ctx.rotate(time * 0.05);
      ctx.beginPath();
      ctx.moveTo(0, -22);
      ctx.lineTo(19, 11);
      ctx.lineTo(-19, 11);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(184, 169, 255, 0.22)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(centerX + 180, centerY + 110);
      ctx.rotate(-time * 0.06);
      ctx.beginPath();
      ctx.rect(-14, -14, 28, 28);
      ctx.strokeStyle = 'rgba(240, 161, 141, 0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.removeEventListener('pointermove', handlePointerMove);
        container.removeEventListener('pointerleave', handlePointerLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] sm:h-[480px] lg:h-[540px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      title="HighOrbit 3D Experience — Interactive Connection Engine"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Floating Glassmorphic Micro-Badges orbiting the 3D visual */}
      
      {/* Badge 1: Top-Left (Young Adult Growth) */}
      <div className="absolute top-4 left-2 sm:left-6 md:left-8 midnight-glass-dark px-4 py-2.5 rounded-2xl border border-white/20 shadow-lg flex items-center gap-3 backdrop-blur-md animate-orbit-float">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7768D8] to-[#211C3B] flex items-center justify-center text-white text-xs font-bold shadow-sm">
          🌱
        </div>
        <div>
          <div className="text-[10px] uppercase font-bold tracking-wider text-[#B8A9FF]">
            Student Journey
          </div>
          <div className="text-xs font-semibold text-white">
            Confidence &amp; Strengths
          </div>
        </div>
      </div>

      {/* Badge 2: Bottom-Right (Parent Active Listening) */}
      <div 
        className="absolute bottom-6 right-2 sm:right-6 md:right-8 midnight-glass-dark px-4 py-2.5 rounded-2xl border border-white/20 shadow-lg flex items-center gap-3 backdrop-blur-md"
        style={{ animation: 'orbit-float 7s ease-in-out infinite reverse' }}
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F0A18D] to-[#7768D8] flex items-center justify-center text-white text-xs font-bold shadow-sm">
          🤝
        </div>
        <div>
          <div className="text-[10px] uppercase font-bold tracking-wider text-[#F0A18D]">
            Parent Bridge
          </div>
          <div className="text-xs font-semibold text-white">
            Active Listening &amp; Trust
          </div>
        </div>
      </div>

      {/* Badge 3: Center Bottom (Encrypted Privacy) */}
      <div className="absolute -bottom-2 sm:bottom-1 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-[#211C3B]/85 border border-[#B8A9FF]/30 text-[11px] font-medium text-[#E9E3FA] flex items-center gap-2 shadow-md">
        <span className="w-2 h-2 rounded-full bg-[#7768D8] animate-ping" />
        <span>100% Private &amp; Consensual Connection</span>
      </div>
    </div>
  );
};

export default Hero3DExperience;

