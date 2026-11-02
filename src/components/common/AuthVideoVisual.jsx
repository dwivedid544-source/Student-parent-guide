import React, { useRef, useEffect } from 'react';

export const AuthVideoVisual = ({ className = '' }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let animId;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const processFrame = () => {
      if (video.readyState >= 2 && !video.paused && !video.ended) {
        const vWidth = video.videoWidth || 736;
        const vHeight = video.videoHeight || 1150;

        // Crop window centered on characters (sweet spot at 58% height)
        const aspect = canvas.width / canvas.height;
        const sWidth = vWidth;
        const sHeight = Math.round(sWidth / aspect);
        const centerY = Math.round(vHeight * 0.58);
        const sy = Math.max(0, Math.min(vHeight - sHeight, centerY - Math.round(sHeight / 2)));

        ctx.drawImage(video, 0, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);

        try {
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const d = imgData.data;
          const len = d.length;

          // Target red/orange accents and tint to HighOrbit brand purple (#5f48b9)
          for (let i = 0; i < len; i += 4) {
            const r = d[i];
            const g = d[i + 1];
            const b = d[i + 2];

            if (r > 160 && g < 125 && b < 125 && (r - g) > 65) {
              const intensity = r / 240;
              d[i]     = Math.min(255, Math.round(95 * intensity));
              d[i + 1] = Math.min(255, Math.round(72 * intensity));
              d[i + 2] = Math.min(255, Math.round(185 * intensity));
            }
          }

          ctx.putImageData(imgData, 0, 0);
        } catch {
          // Fallback if cross-origin or security restriction
        }
      }

      animId = requestAnimationFrame(processFrame);
    };

    const handlePlay = () => {
      animId = requestAnimationFrame(processFrame);
    };

    video.addEventListener('play', handlePlay);
    video.play().catch(() => {});
    animId = requestAnimationFrame(processFrame);

    return () => {
      video.removeEventListener('play', handlePlay);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className={`relative w-full max-w-[440px] select-none ${className}`}>
      
      {/* Ambient Glow behind the card */}
      <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-tr from-primary/25 via-secondary-container/20 to-primary-container/25 blur-xl pointer-events-none" />

      {/* Main Framed Card following HighOrbit's glassy pastel theme */}
      <div className="relative z-10 w-full rounded-[26px] bg-white/75 backdrop-blur-md border border-white/90 p-2 sm:p-2.5 shadow-xl shadow-primary/10 overflow-hidden group">
        
        {/* Video Canvas Container */}
        <div className="relative w-full h-[200px] sm:h-[220px] rounded-[20px] overflow-hidden bg-surface-container-low flex items-center justify-center">
          
          {/* Source video playing in background */}
          <video
            ref={videoRef}
            src="/auth-mindful.mp4"
            autoPlay
            loop
            muted
            playsInline
            crossOrigin="anonymous"
            className="absolute inset-0 opacity-0 pointer-events-none"
          />

          {/* Real-time processed Canvas: Natural Skin + HighOrbit Brand Purple Accents */}
          <canvas
            ref={canvasRef}
            width={520}
            height={260}
            className="w-full h-full object-cover"
            style={{
              mixBlendMode: 'multiply',
            }}
          />

          {/* Floating Frosted Glass Micro-Badge (Bottom Left) */}
          <div className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-md border border-white/80 rounded-full px-3 py-1 shadow-sm flex items-center gap-1.5 pointer-events-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-[10.5px] sm:text-[11px] font-bold text-primary tracking-wide">
              Safe Space • Growth &amp; Collaboration
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AuthVideoVisual;
