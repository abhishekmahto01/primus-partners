import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass } from 'lucide-react';
import { sound } from '../../utils/soundEffects';

export const WarpPortalOverlay = ({ isWarping, title = "WARPING INTO ERA UNIVERSE", subtitle = "Initializing Quantum Neural Core • 99.8% Sync" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isWarping) return;
    sound.playWarp();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId;

    const stars = [];
    const starCount = 350;
    const cx = width / 2;
    const cy = height / 2;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        pz: 0
      });
    }

    let speed = 4;
    const render = () => {
      ctx.fillStyle = 'rgba(8, 10, 15, 0.25)';
      ctx.fillRect(0, 0, width, height);

      speed += 0.8; // Accelerate into hyperspace

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.pz = star.z;
        star.z -= speed;

        if (star.z <= 0) {
          star.z = width;
          star.pz = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 250 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        const pk = 250 / star.pz;
        const ppx = star.x * pk + cx;
        const ppy = star.y * pk + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const shade = Math.min(255, Math.floor((1 - star.z / width) * 255));
          ctx.beginPath();
          ctx.moveTo(ppx, ppy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = `rgb(${shade}, ${Math.floor(shade * 0.7)}, ${shade})`;
          ctx.lineWidth = Math.min(4, (1 - star.z / width) * 3 + 1);
          ctx.stroke();
        }
      }

      // Draw expanding quantum shockwave ring
      const ringRadius = (speed * 12) % (Math.max(width, height) * 0.9);
      ctx.beginPath();
      ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(140, 74, 50, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isWarping]);

  return (
    <AnimatePresence>
      {isWarping && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080a0f] overflow-hidden"
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* Central Holographic HUD */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Spinning Quantum Glyph */}
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.15, 1] }}
              transition={{ rotate: { repeat: Infinity, duration: 3, ease: 'linear' }, scale: { repeat: Infinity, duration: 1.5 } }}
              className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#8C4A32] via-[#f97316] to-[#38bdf8] p-[2px] shadow-[0_0_50px_rgba(140,74,50,0.8)] mb-8"
            >
              <div className="w-full h-full bg-[#0c1017] rounded-3xl flex items-center justify-center backdrop-blur-xl">
                <Compass className="w-12 h-12 text-[#f97316] animate-pulse" />
              </div>
            </motion.div>

            {/* Glowing Text Banner */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8C4A32]/20 border border-[#8C4A32]/50 text-[#f97316] text-xs font-mono font-bold tracking-widest uppercase mb-3 shadow-[0_0_20px_rgba(140,74,50,0.4)]">
                <Sparkles className="w-3.5 h-3.5" />
                Hyper-Drive Quantum Tunnel
              </div>

              <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white mb-3">
                {title}
              </h2>

              <p className="text-sm md:text-base font-mono text-slate-400 max-w-md mx-auto">
                {subtitle}
              </p>
            </motion.div>

            {/* Progress Telemetry Bar */}
            <div className="w-64 md:w-80 h-1.5 bg-white/10 rounded-full overflow-hidden mt-8 border border-white/10">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#8C4A32] via-[#f97316] to-[#38bdf8] shadow-[0_0_15px_#f97316]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
