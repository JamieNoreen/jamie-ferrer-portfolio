/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, MouseEvent, useEffect } from 'react';
import { motion } from 'motion/react';
import { Download } from 'lucide-react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  scale: number;
  color: string;
  rotation: number;
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const duration = 1200; // ms
    const startTime = performance.now();

    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quad
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * (end - start) + start);
      
      setDisplayValue(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  return <span>{displayValue}{suffix}</span>;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Spawn a shiny glitter sparkle with 35% probability at mouse speed
    if (Math.random() < 0.35) {
      const colors = [
        '#FFFFFF', // pure white
        '#FFF176', // glowing gold
        '#00E5FF', // bright teal
        '#FF4081', // vibrant pink
        '#E040FB', // violet shine
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      const newSparkle: Sparkle = {
        id: Date.now() + Math.random(),
        x,
        y: y - 5, // slightly offset upwards
        scale: Math.random() * 0.9 + 0.4,
        color: randomColor,
        rotation: Math.random() * 360,
      };

      // Keep maximum 30 active sparkles to avoid React performance choke
      setSparkles((prev) => [...prev.slice(-30), newSparkle]);
    }
  };

  const handleMouseLeave = () => {
    // Hide spotlight when cursor leaves
    setMousePos({ x: -1000, y: -1000 });
  };

  return (
    <section 
      id="homepage-hero"
      className="w-full bg-white select-none px-0 md:px-6"
    >
      {/* Expanded full container with no max-width boundaries */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          background: 'linear-gradient(110deg, #8bdeda 0%, #43add0 25%, #998ee0 50%, #e17dc2 75%, #ef9393 100%)' 
        }}
        className="w-full rounded-none md:rounded-3xl min-h-[240px] py-11 px-4 md:px-12 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-xs transition-all duration-350"
      >
        {/* Soft immersive dark background overlay to highlight glowing sparkles */}
        <div className="absolute inset-0 bg-black/[0.04] pointer-events-none" />

        {/* Animated Resume button in top-right corner */}
<motion.a
          href="/portfolio-assets/Jamie_Noreen_Ferrer_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          title="Jamie's Resume"
          animate={{ 
            y: [0, -3, 0],
            boxShadow: [
              "0 4px 12px rgba(0, 0, 0, 0.05), 0 0 0px rgba(255, 255, 255, 0)",
              "0 6px 16px rgba(0, 0, 0, 0.08), 0 0 8px rgba(255, 255, 255, 0.25)",
              "0 4px 12px rgba(0, 0, 0, 0.05), 0 0 0px rgba(255, 255, 255, 0)"
            ]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 4.5,
            ease: "easeInOut"
          }}
          whileHover={{ 
            y: -5,
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15), 0 0 14px rgba(255, 255, 255, 0.45)",
            backgroundColor: "rgba(255, 255, 255, 0.22)",
            borderColor: "rgba(255, 255, 255, 0.6)"
          }}
          whileTap={{ scale: 0.97 }}
          className="absolute top-4 right-4 md:top-6 md:right-6 pointer-events-auto z-20 flex items-center gap-1.5 px-5 py-2 rounded-full border border-white/30 bg-white/12 text-white font-sans font-semibold text-xs tracking-wide shadow-sm backdrop-blur-md transition-colors duration-300"
        >
          <Download size={13} strokeWidth={2.5} className="shrink-0" />
          <span>Resume</span>
        </motion.a>

        {/* Ambient floating radial canvases */}
        <div className="absolute inset-x-0 bottom-0 top-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,196,204,0.22),transparent_45%)] pointer-events-none animate-pulse duration-5000" />
        <div className="absolute inset-x-0 bottom-0 top-0 bg-[radial-gradient(circle_at_top_right,rgba(255,82,191,0.22),transparent_50%)] pointer-events-none" />

        {/* Dynamic magical spotlight following standard cursor mapping */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-1"
          style={{
            background: `radial-gradient(circle 240px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.28), transparent 85%)`,
            opacity: mousePos.x === -1000 ? 0 : 1
          }}
        />

        {/* Sparkle glitters absolute canvas layer */}
        {sparkles.map((st) => (
          <motion.div
            key={st.id}
            initial={{ opacity: 1, scale: st.scale, rotate: st.rotation }}
            animate={{ 
              opacity: 0, 
              scale: 0.1, 
              y: st.y + (Math.random() * 50 - 25), 
              x: st.x + (Math.random() * 40 - 20),
              rotate: st.rotation + 180 
            }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: st.x,
              top: st.y,
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }}
            className="w-4 h-4 flex items-center justify-center pointer-events-none"
          >
            <svg viewBox="0 0 24 24" className="w-full h-full fill-current" style={{ color: st.color }}>
              <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
            </svg>
          </motion.div>
        ))}

        {/* Header container */}
        <div className="z-10 relative flex flex-col items-center max-w-3xl">
          {/* Breathing Shiny animated title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
            className="font-outfit font-bold text-5xl md:text-7xl text-white tracking-tight leading-none selection:bg-white/25 drop-shadow-sm pb-2"
          >
            Jamie Ferrer
          </motion.h1>

          {/* Shimmering animating profession subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
            className="relative mt-3"
          >
            <p className="font-sans font-light text-xs sm:text-sm md:text-base text-white/95 uppercase tracking-[0.2em] bg-gradient-to-r from-amber-100 via-rose-100 to-cyan-100 bg-clip-text text-transparent selection:bg-white/20">
              Product Designer • Hackathon Champion
            </p>
          </motion.div>
        </div>

        {/* Single unified Credibility Statistics Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-xl py-3.5 px-6 md:px-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-row items-center justify-around w-full max-w-sm sm:max-w-md md:max-w-lg mt-11 z-10 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
        >
          {/* Stat 1 */}
          <div className="flex flex-col items-center justify-center text-center flex-1">
            <span className="text-2xl md:text-3xl font-outfit font-bold tracking-tight bg-gradient-to-r from-[#43add0] to-[#998ee0] bg-clip-text text-transparent">
              <AnimatedNumber value={12} />
            </span>
            <span className="text-[9px] md:text-[10px] font-sans font-bold text-[#64748B] mt-1 uppercase tracking-widest leading-none">
              Awards Won
            </span>
          </div>

          {/* Vertical Divider */}
          <div className="h-8 w-[1px] bg-slate-100 shrink-0 mx-2 sm:mx-4" />

          {/* Stat 2 */}
          <div className="flex flex-col items-center justify-center text-center flex-1">
            <span className="text-2xl md:text-3xl font-outfit font-bold tracking-tight bg-gradient-to-r from-[#43add0] to-[#998ee0] bg-clip-text text-transparent">
              <AnimatedNumber value={15} suffix="+" />
            </span>
            <span className="text-[9px] md:text-[10px] font-sans font-bold text-[#64748B] mt-1 uppercase tracking-widest leading-none">
              Projects Designed
            </span>
          </div>

          {/* Vertical Divider */}
          <div className="h-8 w-[1px] bg-slate-100 shrink-0 mx-2 sm:mx-4" />

          {/* Stat 3 */}
          <div className="flex flex-col items-center justify-center text-center flex-1">
            <span className="text-2xl md:text-3xl font-outfit font-bold tracking-tight bg-gradient-to-r from-[#43add0] to-[#998ee0] bg-clip-text text-transparent">
              <AnimatedNumber value={4} />
            </span>
            <span className="text-[9px] md:text-[10px] font-sans font-bold text-[#64748B] mt-1 uppercase tracking-widest leading-none">
              Years of Building
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
