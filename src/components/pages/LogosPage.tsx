/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface LogoItem {
  id: string;
  name: string;
  oneLiner: string;
  description: string;
  imagePath: string;
  bgColor: string; // fallback color if image fails
  vectorLogo: React.ReactNode; // inline SVG art as a highly polished fallback
}

export default function LogosPage() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const logos: LogoItem[] = [
    {
      id: 'lakadph',
      name: 'LakadPH',
      oneLiner: 'Brand identity for a Filipino travel app',
      description: 'A vibrant brandmark symbolizing journey, adventure, and exploration across the Philippine archipelago. Combining sunset gradients, continuous waves, and modern typography.',
      imagePath: '/images/logos/lakadph.png',
      bgColor: 'bg-[#0f172a]',
      vectorLogo: (
        <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="url(#lakad-grad)" />
          <path d="M50 20C40 32 30 42 30 52C30 63 39 72 50 72C61 72 70 63 70 52C70 42 60 32 50 20ZM50 60C44.5 60 40 55.5 40 50C40 44.5 44.5 40 50 40C55.5 40 60 44.5 60 50C60 55.5 55.5 60 50 60Z" fill="white" />
          <path d="M35 55C42 63 48 57 55 65C62 73 68 62 72 68" stroke="#1de9b6" strokeWidth="4" strokeLinecap="round" />
          <defs>
            <linearGradient id="lakad-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00E5FF" />
              <stop offset="1" stopColor="#FF3D00" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      id: 'stubby',
      name: 'Stubby',
      oneLiner: 'Smart learning planner and gamified flashcard app for Filipino students',
      description: 'A friendly educational logo blending geometric workspace lines with study sparks. Styled in modern violet and magenta to convey intelligence, motivation, and interactive gamified academic growth.',
      imagePath: '/images/logos/stubby.png',
      bgColor: 'bg-[#0A071E]',
      vectorLogo: (
        <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="60" height="60" rx="16" fill="url(#stubby-grad)" />
          <path d="M35 38H65" stroke="white" strokeWidth="5" strokeLinecap="round" />
          <path d="M35 50H55" stroke="white" strokeWidth="5" strokeLinecap="round" />
          <path d="M35 62H48" stroke="white" strokeWidth="5" strokeLinecap="round" />
          <path d="M72 50L62 60L58 56" stroke="#00FFF3" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="75" cy="30" r="4" fill="#FFFA5A" className="animate-pulse" />
          <defs>
            <linearGradient id="stubby-grad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7F00FF" />
              <stop offset="1" stopColor="#FF007F" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      id: 'scaffled',
      name: 'scaffl.ed',
      oneLiner: 'Visual scaffolding and interactive curriculum planner for educators',
      description: 'An architectural structural logo representing modular teaching framework. Crafted with isometric grid boxes and layered connections to guide students step-by-step.',
      imagePath: '/images/logos/scaffled.png',
      bgColor: 'bg-[#1e293b]',
      vectorLogo: (
        <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 15L85 35L50 55L15 35L50 15Z" fill="#38BDF8" fillOpacity="0.2" stroke="#38BDF8" strokeWidth="3" />
          <path d="M50 35L85 55L50 75L15 55L50 35Z" fill="#818CF8" fillOpacity="0.2" stroke="#818CF8" strokeWidth="3" />
          <path d="M50 55L85 75L50 95L15 75L50 55Z" fill="#34D399" fillOpacity="0.3" stroke="#34D399" strokeWidth="3" />
          <line x1="50" y1="15" x2="50" y2="95" stroke="white" strokeWidth="2" strokeDasharray="2 3" />
        </svg>
      )
    },
    {
      id: 'kwavenews',
      name: 'KWave News',
      oneLiner: 'Premium Korean culture, entertainment, and lifestyle portal',
      description: 'A dynamic, high-contrast digital mark incorporating stylized soundwaves and an entertainment crown. Imparts maximum impact, modern energy, and k-culture pop aesthetics.',
      imagePath: '/images/logos/kwavenews.png',
      bgColor: 'bg-black',
      vectorLogo: (
        <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="42" fill="#0D0D11" stroke="#F43F5E" strokeWidth="3" />
          <path d="M30 50C30 35 40 38 50 25C60 38 70 35 70 50C70 65 60 62 50 75C40 62 30 65 30 50Z" fill="url(#k-grad)" />
          <path d="M38 42L44 48L50 35L56 48L62 42L59 58H41L38 42Z" fill="white" />
          <defs>
            <linearGradient id="k-grad" x1="30" y1="25" x2="70" y2="75" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F43F5E" />
              <stop offset="1" stopColor="#701A75" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      id: 'tulai',
      name: 'TulAi',
      oneLiner: 'AI-powered legal translation and assistance tool for local Filipino communities',
      description: 'A balance scale intersecting with a neural network cluster. Emphasizes justice, local translation, community service, and accessible AI workflows.',
      imagePath: '/images/logos/tulai.png',
      bgColor: 'bg-[#032B2B]',
      vectorLogo: (
        <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="url(#tulai-grad)" />
          <path d="M50 25V75" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <path d="M30 38H70" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <path d="M30 38L22 55H38L30 38Z" fill="#FBBF24" stroke="white" strokeWidth="2" strokeLinejoin="round" />
          <path d="M70 38L62 55H78L70 38Z" fill="#FBBF24" stroke="white" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="50" cy="25" r="5" fill="#34D399" />
          <circle cx="30" cy="38" r="4" fill="#34D399" />
          <circle cx="70" cy="38" r="4" fill="#34D399" />
          <defs>
            <linearGradient id="tulai-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0B4F4F" />
              <stop offset="1" stopColor="#115E59" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      id: 'plantego',
      name: 'Plantego',
      oneLiner: 'Interactive plant care companion and automated smart watering log',
      description: 'An elegant, organic brand logo depicting a healthy pixel-style Monstera leaf and transparent water droplets, invoking automation, nature, and regular watering logs.',
      imagePath: '/images/logos/plantego.png',
      bgColor: 'bg-[#ebf8f2]',
      vectorLogo: (
        <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="15" width="70" height="70" rx="35" fill="#DCFCE7" />
          <path d="M50 22C38 32 30 45 30 58C30 70 40 78 50 78C60 78 70 70 70 58C70 45 62 32 50 22Z" fill="url(#leaf-grad)" />
          <path d="M50 22V78" stroke="#DCFCE7" strokeWidth="3" />
          <path d="M35 50L48 55" stroke="#DCFCE7" strokeWidth="3" strokeLinecap="round" />
          <path d="M65 50L52 55" stroke="#DCFCE7" strokeWidth="3" strokeLinecap="round" />
          <path d="M32 60L46 63" stroke="#DCFCE7" strokeWidth="3" strokeLinecap="round" />
          <path d="M68 60L54 63" stroke="#DCFCE7" strokeWidth="3" strokeLinecap="round" />
          <defs>
            <linearGradient id="leaf-grad" x1="30" y1="22" x2="70" y2="78" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10B981" />
              <stop offset="1" stopColor="#047857" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      id: 'farmory',
      name: 'Farmory',
      oneLiner: 'Open-source farm inventory and community crop distribution network',
      description: 'A protective lock/shield motif protecting localized organic grains and seedlings. Evokes farming inventory records, collective distribution, and security.',
      imagePath: '/images/logos/farmory.png',
      bgColor: 'bg-[#2E1E0E]',
      vectorLogo: (
        <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 20L80 32V58C80 72 68 81 50 85C32 81 20 72 20 58V32L50 20Z" fill="url(#farm-grad)" />
          <path d="M50 70V45" stroke="#34D399" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 52C42 45 38 48 36 54C42 56 46 54 50 52Z" fill="#34D399" />
          <path d="M50 48C58 41 62 44 64 50C58 52 54 50 50 48Z" fill="#34D399" />
          <defs>
            <linearGradient id="farm-grad" x1="20" y1="20" x2="80" y2="85" gradientUnits="userSpaceOnUse">
              <stop stopColor="#854D0E" />
              <stop offset="1" stopColor="#14532D" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      id: 'braveher',
      name: 'Braveher',
      oneLiner: 'Empowering tech-career accelerator and mentorship hub for Southeast Asian women',
      description: 'A courageous, forward-leaning vector layout displaying a female silhouette looking toward rising stars. Radiates optimism, community leadership, and women in technology.',
      imagePath: '/images/logos/braveher.png',
      bgColor: 'bg-[#180814]',
      vectorLogo: (
        <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="url(#brave-grad)" />
          <path d="M42 68C42 52 50 48 55 42C52 40 45 32 50 26C56 20 62 25 65 30C66 32 64 36 60 38C60 42 66 48 62 68H42Z" fill="white" />
          <path d="M28 32l3 3l3-3l-3-3z" fill="#FFF566" />
          <path d="M32 45l2 2l2-2l-2-2z" fill="#FFF566" />
          <defs>
            <linearGradient id="brave-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F43F5E" />
              <stop offset="1" stopColor="#881337" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      id: 'pasada',
      name: 'Pasada',
      oneLiner: 'Philippines modern jeepney routes, transit ticketing, and live tracker app',
      description: 'An iconic, modern re-interpretation of the front face of a Philippine jeepney layered inside route tracking paths. Styled in energetic retro yellow and highway transit blue.',
      imagePath: '/images/logos/pasada.png',
      bgColor: 'bg-[#1E1B4B]',
      vectorLogo: (
        <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="60" height="60" rx="14" fill="#1E3A8A" />
          <rect x="30" y="44" width="40" height="24" rx="3" fill="#FBBF24" />
          <line x1="36" y1="48" x2="36" y2="64" stroke="#1E3A8A" strokeWidth="3" />
          <line x1="43" y1="48" x2="43" y2="64" stroke="#1E3A8A" strokeWidth="3" />
          <line x1="50" y1="48" x2="50" y2="64" stroke="#1E3A8A" strokeWidth="3" />
          <line x1="57" y1="48" x2="57" y2="64" stroke="#1E3A8A" strokeWidth="3" />
          <line x1="64" y1="48" x2="64" y2="64" stroke="#1E3A8A" strokeWidth="3" />
          <circle cx="26" cy="56" r="6" fill="#FEF08A" stroke="#FBBF24" strokeWidth="2" />
          <circle cx="74" cy="56" r="6" fill="#FEF08A" stroke="#FBBF24" strokeWidth="2" />
          <path d="M10 25C25 25 35 32 45 32" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
          <path d="M15 75C28 75 38 68 49 68" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    }
  ];

  const pageTitle = "Logos & Branded Identities";
  const pageSubtitle = "Curated vector logomarks, layout standards, and product identity concepts built with grid coordinates and geometric guidelines";

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((prevIdx) => (prevIdx! + 1) % logos.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((prevIdx) => (prevIdx! - 1 + logos.length) % logos.length);
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Close Lightbox via Keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIdx(null);
      } else if (e.key === 'ArrowRight' && selectedIdx !== null) {
        setSelectedIdx((prev) => (prev! + 1) % logos.length);
      } else if (e.key === 'ArrowLeft' && selectedIdx !== null) {
        setSelectedIdx((prev) => (prev! - 1 + logos.length) % logos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, logos.length]);

  return (
    <div className="w-full font-sans text-gray-900 space-y-12">
      
      {/* Simple Document Header */}
      <div className="space-y-2 pt-2 text-left">
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#7C3AED] font-extrabold flex items-center gap-1.5">
          <Sparkles size={11} className="text-[#7C3AED]" />
          <span>BRAND SPECIFICATION :: CANVAS-OS</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 leading-none">
          {pageTitle}
        </h1>
        <p className="text-xs text-gray-500 font-sans leading-relaxed tracking-normal max-w-xl mt-1.5 font-medium">
          {pageSubtitle}
        </p>
      </div>

      <div className="border-t border-gray-150 my-6" />

      {/* Grid container: 3 columns desktop, 2 tablet, 1 mobile */}
      <motion.div 
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
          }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2"
      >
        {logos.map((logo, idx) => {
          const hasImageError = imageErrors[logo.id];

          return (
            <motion.div
              key={logo.id}
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
              }}
              onClick={() => setSelectedIdx(idx)}
              className="aspect-square relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200/80 cursor-pointer bg-white group select-none"
            >
              {/* Logo container wrapper */}
              <div className="absolute inset-0 flex items-center justify-center p-6 bg-gradient-to-br from-neutral-50/40 to-neutral-100/40">
                
                {/* Fallback Beautiful Rendered Interactive Vector SVG (Visible when image loading/missing) */}
                <div className={`absolute inset-0 flex items-center justify-center ${logo.bgColor} transition-opacity duration-300`}>
                  <div className="transform scale-[1.05] group-hover:scale-[1.12] transition-transform duration-300 flex flex-col items-center gap-2">
                    {logo.vectorLogo}
                    <span className="text-[10px] font-mono font-semibold tracking-wider text-white/50 group-hover:text-white/80 transition-colors uppercase mt-1">
                      {logo.name}
                    </span>
                  </div>
                </div>

                {/* Main Logo Image (fills the card, hides fallback if successfully loaded) */}
                {!hasImageError && (
                  <img
                    src={logo.imagePath}
                    alt={logo.name}
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(logo.id)}
                    className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-500 z-10 select-none bg-white font-sans"
                  />
                )}
              </div>

              {/* Centered White Project Text Overlay on Hover */}
              <div className="absolute inset-0 bg-black/75 flex items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out z-20">
                <div className="space-y-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <p className="text-white font-extrabold text-sm tracking-tight leading-snug">
                    {logo.name}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Lightbox Fullscreen Popup */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center select-none">
            {/* Dark semi-transparent background overlay (black at 85% opacity) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedIdx(null)}
              className="absolute inset-0 bg-black cursor-pointer"
            />

            {/* Screenside Floating Navigation Chevron Controls */}
            <div className="fixed inset-y-0 left-0 right-0 pointer-events-none z-[110] flex items-center justify-between px-3 md:px-12">
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                onClick={handlePrev}
                className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#18181F]/90 hover:bg-[#25252F] border border-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer outline-none shadow-xl active:scale-95 backdrop-blur-md"
                title="Previous Logo [‹]"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                onClick={handleNext}
                className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#18181F]/90 hover:bg-[#25252F] border border-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer outline-none shadow-xl active:scale-95 backdrop-blur-md"
                title="Next Logo [›]"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </motion.button>
            </div>

            {/* Main Lightbox Content Card (max 480px wide, centered) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-[480px] mx-4 bg-[#111115] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl z-20 flex flex-col items-center text-center p-8 text-white animate-fade-in"
            >
              
              {/* Close Button X at Top Right */}
              <button
                onClick={() => setSelectedIdx(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all cursor-pointer border-none outline-none z-30"
                title="Close [ESC]"
              >
                <X size={20} />
              </button>

              {/* Logo display frame (large and clean) */}
              <div 
                className={`w-full aspect-square max-w-[320px] rounded-xl overflow-hidden flex items-center justify-center border border-neutral-800 relative shadow-inner ${logos[selectedIdx].bgColor} mt-4 mb-6`}
              >
                <div className="transform scale-[1.5] flex flex-col items-center gap-1">
                  {logos[selectedIdx].vectorLogo}
                </div>

                {/* Overlaid Image */}
                {!imageErrors[logos[selectedIdx].id] && (
                  <img
                    src={logos[selectedIdx].imagePath}
                    alt={logos[selectedIdx].name}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover select-none bg-white font-sans"
                  />
                )}
              </div>

              {/* Centered Content Block */}
              <div className="space-y-2 mt-2 px-2">
                {/* Project name in bold below the logo */}
                <h3 className="font-sans font-black text-2xl text-white tracking-tight leading-none uppercase">
                  {logos[selectedIdx].name}
                </h3>
                
                {/* One-liner description below the name */}
                <p className="text-xs font-medium text-emerald-400 leading-relaxed font-sans pt-1">
                  {logos[selectedIdx].oneLiner}
                </p>
              </div>

              {/* Mini Pagination Loop Indicator */}
              <div className="flex items-center gap-1.5 mt-6 mb-2">
                {logos.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedIdx(i)}
                    className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${
                      i === selectedIdx ? 'bg-emerald-400 w-3' : 'bg-neutral-600 hover:bg-neutral-400'
                    }`}
                  />
                ))}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
