/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, CSSProperties, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Monitor } from 'lucide-react';
import Sidebar from './components/navigation/Sidebar';
import TopBar from './components/navigation/TopBar';
import { PALETTES, TYPOGRAPHIES } from './components/navigation/themeData';

import { TemplateType, Sticker, PROJECTS } from './types';

const Hero = lazy(() => import('./components/home/Hero'));
const ExploreGrid = lazy(() => import('./components/home/ExploreGrid'));
const FeaturedWork = lazy(() => import('./components/home/FeaturedWork'));

const CustomizationSidebar = lazy(() => import('./components/navigation/CustomizationSidebar'));
const DraggableSticker = lazy(() => import('./components/stickers/DraggableSticker'));

const AboutPage = lazy(() => import('./components/pages/AboutPage'));
const AchievementsPage = lazy(() => import('./components/pages/AchievementsPage'));
const CertificatesPage = lazy(() => import('./components/pages/CertificatesPage'));
const LeadershipPage = lazy(() => import('./components/pages/LeadershipPage'));
const TechStacksPage = lazy(() => import('./components/pages/TechStacksPage'));
const ContactPage = lazy(() => import('./components/pages/ContactPage'));
const LogosPage = lazy(() => import('./components/pages/LogosPage'));
const ProjectPage = lazy(() => import('./components/pages/ProjectPage'));

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');
  const [pageTemplate, setPageTemplate] = useState<TemplateType>('minimalism');
  const [pagePalette, setPagePalette] = useState<string>('earthy');
  const [pageTypography, setPageTypography] = useState<string>('modern');
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [homeSearchQuery, setHomeSearchQuery] = useState('');
  const dragConstraintsRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [contentScale, setContentScale] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('portfolio-content-scale');
      if (saved) {
        const val = parseFloat(saved);
        if ([0.75, 1.0, 1.25].includes(val)) {
          return val === 1.25 && (typeof window !== 'undefined' ? window.innerWidth < 768 : false) ? 1.0 : val;
        }
      }
    } catch (e) {}
    return 1.0;
  });

  const handleScaleChange = (newScale: number) => {
    setContentScale(newScale);
    try {
      localStorage.setItem('portfolio-content-scale', String(newScale));
    } catch (e) {}
  };

  useEffect(() => {
    if (isMobile && contentScale === 1.25) {
      handleScaleChange(1.0);
    }
  }, [isMobile, contentScale]);

  // Self-healing clean-up for legacy/history stickers cached in browser localStorage
  useEffect(() => {
    const isCleaned = localStorage.getItem('stickers-cleanup-fresh-v3');
    if (!isCleaned) {
      try {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('stickers-')) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((key) => localStorage.removeItem(key));
        localStorage.setItem('stickers-cleanup-fresh-v3', 'true');
      } catch (e) {
        // Fallback for private mode or sandboxed contexts
      }
    }
  }, []);

  // Monitor location hash changes for ultra-responsive routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      if (hash === '#/logos') {
        window.location.hash = '#/projects/logos';
        return;
      }
      setCurrentPath(hash);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleHashChange);
    // Trigger initially
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Compute page states based on hash route
  const isHomepage = currentPath === '#/' || currentPath === '';
  const isProjectPage = currentPath.startsWith('#/projects/');
  const projectSlug = isProjectPage ? currentPath.replace('#/projects/', '') : '';
  
  // Resolve active core page name (e.g. 'about', 'achievements' etc)
  const getCorePageKey = (path: string): string | null => {
    if (isHomepage || isProjectPage) return null;
    const clean = path.replace('#/', '');
    return clean || null;
  };

  const corePageKey = getCorePageKey(currentPath);

  // Load template, palette, typography and sticker coordinates on page / template change
  useEffect(() => {
    if (corePageKey) {
      // 1. Resolve template configuration
      const savedTemplate = localStorage.getItem(`template-${corePageKey}`) as TemplateType | null;
      const activeTempl = savedTemplate || 'minimalism';
      setPageTemplate(activeTempl);

      // 2. Resolve palette
      const savedPalette = localStorage.getItem(`palette-${corePageKey}`);
      const defaultPalette = activeTempl === 'minimalism' ? 'earthy' : activeTempl === 'editorial' ? 'warm' : 'bold';
      setPagePalette(savedPalette || defaultPalette);

      // 3. Resolve typography
      const savedTypography = localStorage.getItem(`typography-${corePageKey}`);
      setPageTypography(savedTypography || 'modern');

      // 4. Resolve stickers
      const savedStickers = localStorage.getItem(`stickers-${corePageKey}-${activeTempl}`);
      if (savedStickers) {
        try {
          const parsed = JSON.parse(savedStickers);
          const userStickers = Array.isArray(parsed) ? parsed.filter((s: Sticker) => s && s.id && s.id.startsWith('st-')) : [];
          setStickers(userStickers);
        } catch (e) {
          setStickers([]);
        }
      } else {
        setStickers([]);
      }
    } else {
      setStickers([]);
    }
    setSelectedStickerId(null);
  }, [currentPath, corePageKey]);

  // Handle visual custom template swapping
  const handleSelectTemplate = (newTemplate: TemplateType) => {
    if (!corePageKey) return;

    localStorage.setItem(`template-${corePageKey}`, newTemplate);
    setPageTemplate(newTemplate);

    // Swap palette to default for new template if not already custom saved
    const savedPalette = localStorage.getItem(`palette-${corePageKey}`);
    const defaultPalette = newTemplate === 'minimalism' ? 'earthy' : newTemplate === 'editorial' ? 'warm' : 'bold';
    setPagePalette(savedPalette || defaultPalette);

    // Swap to standard coordinates or customized set on template load
    const saved = localStorage.getItem(`stickers-${corePageKey}-${newTemplate}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const userStickers = Array.isArray(parsed) ? parsed.filter((s: Sticker) => s && s.id && s.id.startsWith('st-')) : [];
        setStickers(userStickers);
      } catch (e) {
        setStickers([]);
      }
    } else {
      setStickers([]);
    }
  };

  const handleSelectPalette = (newPalette: string) => {
    if (!corePageKey) return;
    localStorage.setItem(`palette-${corePageKey}`, newPalette);
    setPagePalette(newPalette);
  };

  const handleSelectTypography = (newTypography: string) => {
    if (!corePageKey) return;
    localStorage.setItem(`typography-${corePageKey}`, newTypography);
    setPageTypography(newTypography);
  };

  const handleAddSticker = (
    type: string, 
    label: string, 
    emoji?: string, 
    color?: string, 
    imagePath?: string,
    x?: number,
    y?: number
  ) => {
    if (!corePageKey) return;
    const newSticker: Sticker = {
      id: `st-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      type,
      label,
      emoji: emoji || '',
      color: color || '',
      defaultX: x !== undefined ? x : 30 + Math.random() * 40,
      defaultY: y !== undefined ? y : 20 + Math.random() * 50,
      imagePath,
      sizePx: 128,
    };
    setStickers((prev) => {
      const updated = [...prev, newSticker];
      localStorage.setItem(`stickers-${corePageKey}-${pageTemplate}`, JSON.stringify(updated));
      return updated;
    });
    setSelectedStickerId(newSticker.id);
  };

  const handleUpdateStickerSize = (id: string, sizePx: number) => {
    if (!corePageKey) return;
    setStickers((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, sizePx } : s));
      localStorage.setItem(`stickers-${corePageKey}-${pageTemplate}`, JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteSticker = (id: string) => {
    if (!corePageKey) return;
    setStickers((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      localStorage.setItem(`stickers-${corePageKey}-${pageTemplate}`, JSON.stringify(updated));
      return updated;
    });
    if (selectedStickerId === id) {
      setSelectedStickerId(null);
    }
  };

  const handleDropOnCanvas = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!dragConstraintsRef.current) return;

    try {
      const dataStr = e.dataTransfer.getData('text/plain');
      if (!dataStr) return;
      const data = JSON.parse(dataStr);
      if (data && data.imagePath) {
        const rect = dragConstraintsRef.current.getBoundingClientRect();
        
        // Calculate coordinate relative to the drag boundaries container
        const relativeX = e.clientX - rect.left;
        const relativeY = e.clientY - rect.top;
        
        let pctX = (relativeX / rect.width) * 100;
        let pctY = (relativeY / rect.height) * 100;

        // Visual safe clamping
        pctX = Math.max(4, Math.min(96, pctX));
        pctY = Math.max(4, Math.min(96, pctY));

        handleAddSticker(
          data.type,
          data.label,
          data.emoji,
          data.color,
          data.imagePath,
          pctX,
          pctY
        );
      }
    } catch (err) {
      console.error('Canvas Drop Error', err);
    }
  };

  // Persist updated drag-ended sticker positions
  const handleUpdateStickerPos = (id: string, x: number, y: number) => {
    if (!corePageKey) return;
    
    setStickers((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, defaultX: x, defaultY: y } : s));
      localStorage.setItem(`stickers-${corePageKey}-${pageTemplate}`, JSON.stringify(updated));
      return updated;
    });
  };

  // Reset stickers coordinates to design standard baseline
  const handleResetStickers = () => {
    if (!corePageKey) return;
    localStorage.removeItem(`stickers-${corePageKey}-${pageTemplate}`);
    setStickers([]);
  };

  // Fast routing shortcut triggers
  const handleNavigate = (path: string) => {
    window.location.hash = path;
  };

  // Core Pages Redirection to Contact Link
  const handleContactOpen = () => {
    handleNavigate('#/contact');
  };

  const activeProject = PROJECTS.find((p) => p.slug === projectSlug);

  // Compute CSS Style Properties with fallbacks
  const activePaletteMap = PALETTES.find((p) => p.id === pagePalette) || PALETTES[0];
  const activeFontPairing = TYPOGRAPHIES.find((t) => t.id === pageTypography) || TYPOGRAPHIES[0];

  useEffect(() => {
    document.title = 'Jamie Ferrer | Product Designer & Hackathon Champion';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Product Designer, UI/UX Designer, Computer Science graduate, and hackathon champion showcasing projects, case studies, awards, leadership experience, and certifications.'
      );
    }
  }, []);

  // Hex to RGBA utility with custom fallback
  const hexToRgba = (hex: string, alpha: number): string => {
    if (!hex) return `rgba(0, 255, 136, ${alpha})`;
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgba(${isNaN(r) ? 0 : r}, ${isNaN(g) ? 255 : g}, ${isNaN(b) ? 136 : b}, ${alpha})`;
  };

  const getCustomThemeStyles = () => {
    if (corePageKey === 'logos') {
      return {
        '--page-bg': '#FFFFFF',
        '--page-border': '#E2E8F0',
        '--page-accent': '#7C3AED',
        '--page-accent-light': 'rgba(124, 58, 237, 0.12)',
        '--page-accent-lighter': 'rgba(124, 58, 237, 0.05)',
        '--page-text-pri': '#0F172A',
        '--page-text-sec': '#475569',
        '--card-bg': '#FFFFFF',
        '--font-heading': 'Inter, sans-serif',
        '--font-body': 'Inter, sans-serif',
      } as CSSProperties;
    }

    const accentColor = activePaletteMap.map.accent;
    if (pageTemplate === 'futuristic') {
      return {
        '--page-bg': '#0A0A0F',
        // Make cyber tech borders turn neon matching active selected color scheme palette (e.g. pastel turns pink-glow!)
        '--page-border': hexToRgba(accentColor, 0.3),
        '--page-accent': accentColor,
        '--page-accent-light': hexToRgba(accentColor, 0.15),
        '--page-accent-lighter': hexToRgba(accentColor, 0.05),
        '--page-text-pri': '#FFFFFF',
        '--page-text-sec': '#94A3B8',
        '--card-bg': 'rgba(9, 10, 15, 0.88)',
        '--font-heading': activeFontPairing.heading,
        '--font-body': activeFontPairing.body,
      } as CSSProperties;
    }
    
    return {
      '--page-bg': activePaletteMap.map.bg,
      '--page-border': activePaletteMap.map.border,
      '--page-accent': accentColor,
      '--page-accent-light': hexToRgba(accentColor, 0.12),
      '--page-accent-lighter': hexToRgba(accentColor, 0.05),
      '--page-text-pri': activePaletteMap.map.textPri,
      '--page-text-sec': activePaletteMap.map.textSec,
      '--card-bg': pageTemplate === 'editorial' ? '#FFFDF7' : '#FFFFFF',
      '--font-heading': activeFontPairing.heading,
      '--font-body': activeFontPairing.body,
    } as CSSProperties;
  };

  return (
    <div 
      style={{ '--content-scale': contentScale } as CSSProperties}
      className="w-full min-h-screen bg-white text-[#1A1A1A] select-none selection:bg-black/5 selection:text-black"
    >
      
      {/* 1. Global Navigation Sidebar (APPEARS ONLY ON HOMEPAGE) */}
      {isHomepage && (
        <Sidebar currentPath={currentPath} onNavigate={handleNavigate} />
      )}

      {/* 2. TopBar (APPEARS ON ALL CORE & PROJECT PAGES) */}
      {!isHomepage && (
        <TopBar onContactClick={handleContactOpen} onHomeClick={() => handleNavigate('#/')} />
      )}

      {/* --- HOMEPAGE VIEW --- */}
      {isHomepage && (
        <div className="min-h-screen bg-white">
          <main className="ml-14 md:ml-[72px] pt-6 min-h-screen flex flex-col justify-between">
            <Suspense fallback={<div className="min-h-[70vh]" />}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {/* Canva premium banner layout */}
                <Hero />
                
                {/* Canva circle category items (with Projects circle excluded) */}
                <ExploreGrid onNavigate={handleNavigate} />
                
                {/* Adobe Express card grid list */}
                <FeaturedWork 
                  onNavigate={handleNavigate} 
                  searchQuery={homeSearchQuery} 
                  setSearchQuery={setHomeSearchQuery} 
                />
              </motion.div>
            </Suspense>
          </main>
        </div>
      )}

      {/* --- CORE PAGE VIEW (HAS TopBar, CustomizationSidebar, Drag Canvas) --- */}
      {!isHomepage && !isProjectPage && corePageKey && (
        <div className="min-h-screen bg-white">
          
          {/* Custom Collapsible tools sidebar rendered OUTSIDE customizable layout container for zero color bleed */}
          <Suspense fallback={null}>
            <CustomizationSidebar
              pageName={corePageKey}
              currentTemplate={pageTemplate}
              onChangeTemplate={handleSelectTemplate}
              currentPalette={pagePalette}
              onChangePalette={handleSelectPalette}
              currentTypography={pageTypography}
              onChangeTypography={handleSelectTypography}
              onAddSticker={handleAddSticker}
              onResetStickers={handleResetStickers}
            />
          </Suspense>

          <div 
            style={getCustomThemeStyles()}
            className={`theme-customizable template-${corePageKey === 'logos' ? 'minimalism' : pageTemplate} workspace-backdrop h-[calc(100vh-52px)] overflow-y-auto pl-14 md:pl-[72px] mt-[52px] relative`}
            onClick={() => setSelectedStickerId(null)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDropOnCanvas}
          >
            {/* Futuristic Cyber-Grid Background overlay (now colors custom to the branding accent color picker!) */}
            {pageTemplate === 'futuristic' && corePageKey !== 'logos' && (
              <div 
                style={{
                  backgroundImage: `linear-gradient(to right, ${hexToRgba(activePaletteMap.map.accent, 0.03)} 1px, transparent 1px), linear-gradient(to bottom, ${hexToRgba(activePaletteMap.map.accent, 0.03)} 1px, transparent 1px)`
                }}
                className="absolute inset-0 bg-[size:32px_32px] pointer-events-none z-0" 
              />
            )}

            {/* Editorial decorator border */}
            {pageTemplate === 'editorial' && corePageKey !== 'logos' && (
              <div className="absolute left-0 top-0 right-0 h-[4px] bg-gradient-to-r from-amber-200 via-[#F4A261] to-red-400 pointer-events-none z-20" />
            )}

            {/* Canvas Drag constraints block */}
            <div 
              ref={dragConstraintsRef}
              className="p-6 md:p-8 min-h-full relative z-1 pointer-events-none"
            >
              {/* Draggable Stickers absolute rendering layer */}
              <Suspense fallback={null}>
                {stickers.map((st) => (
                  <DraggableSticker
                    key={st.id}
                    id={st.id}
                    type={st.type}
                    label={st.label || ''}
                    x={st.defaultX}
                    y={st.defaultY}
                    emoji={st.emoji}
                    color={st.color}
                    imagePath={st.imagePath}
                    sizePx={st.sizePx}
                    isSelected={st.id === selectedStickerId}
                    onSelect={() => setSelectedStickerId(st.id)}
                    onUpdateSize={handleUpdateStickerSize}
                    onUpdatePosition={handleUpdateStickerPos}
                    onDelete={handleDeleteSticker}
                    dragConstraintsRef={dragConstraintsRef}
                  />
                ))}
              </Suspense>

              {/* Core page components router (The White Canvas Document Artboard) */}
              <Suspense fallback={<div className="w-full max-w-[900px] mx-auto my-12 min-h-[60vh]" />}>
                <div 
                  className="w-full max-w-[900px] mx-auto my-12 text-inherit pointer-events-auto relative z-10 shadow-[0_4px_24px_rgba(0,0,0,0.10)] rounded-lg overflow-hidden border border-black/5"
                  style={{ backgroundColor: 'var(--page-bg)', zoom: 'var(--content-scale, 1)' }}
                >
                  {/* Internal padding inside canvas: 64px vertical (py-16), 56px horizontal (px-14 on desktop, scaled on mobile) */}
                  <div className="py-16 px-6 sm:px-10 md:px-14 text-inherit">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${currentPath}-${pageTemplate}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                      >
                        {corePageKey === 'about' && <AboutPage template={pageTemplate} />}
                        {corePageKey === 'achievements' && <AchievementsPage template={pageTemplate} />}
                        {corePageKey === 'certificates' && <CertificatesPage template={pageTemplate} />}
                        {corePageKey === 'leadership' && <LeadershipPage template={pageTemplate} />}
                        {corePageKey === 'tech-stacks' && <TechStacksPage template={pageTemplate} />}
                        {corePageKey === 'contact' && <ContactPage template={pageTemplate} />}
                        {corePageKey === 'logos' && <LogosPage />}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </Suspense>
            </div>
          </div>
        </div>
      )}

      {/* --- PROJECT PAGE VIEW (NO sidebar, cinematic full width viewport) --- */}
      {isProjectPage && (
        <div className="min-h-screen bg-white">
          <main className="pt-[52px] w-full min-h-screen">
            <Suspense fallback={<div className="min-h-[80vh] bg-white" />}>
              <AnimatePresence mode="wait">
                {projectSlug === 'logos' ? (
                  <div key="logos-workspace-container" className="bg-[#E5E5E5] min-h-[calc(100vh-52px)] overflow-y-auto w-full px-4 md:px-8 py-1">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="w-full max-w-[900px] mx-auto my-12 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.10)] rounded-lg overflow-hidden border border-black/5 py-16 px-6 sm:px-10 md:px-14 text-inherit"
                      style={{ zoom: 'var(--content-scale, 1)' }}
                    >
                      <LogosPage />
                    </motion.div>
                  </div>
                ) : (
                  <ProjectPage 
                    key={projectSlug}
                    slug={projectSlug} 
                    onNavigate={handleNavigate} 
                  />
                )}
              </AnimatePresence>
            </Suspense>
          </main>
        </div>
      )}

      {/* 3. Bottom-Right Content Scale Control Segmented Button Container */}
      {!isHomepage && (
        <div 
          className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 bg-white/95 backdrop-blur-md text-slate-800 border border-slate-200/80 px-3.5 py-1.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 font-sans select-none"
          title="View Scale"
        >
          {/* Display Icon */}
          <div className="flex items-center gap-1.5 text-slate-600 pl-1">
            <Monitor size={14} strokeWidth={2.5} className="shrink-0 text-slate-500" />
            <span className="text-[10px] font-bold tracking-wide uppercase text-slate-500">View Scale</span>
          </div>

          <div className="h-4.5 w-[1px] bg-slate-200" />

          {/* Segmented Control Buttons */}
          <div className="flex bg-slate-100/80 p-0.5 rounded-full border border-slate-100 relative items-center gap-0.5">
            {(isMobile ? [0.75, 1.0] : [0.75, 1.0, 1.25]).map((scale) => {
              const isActive = contentScale === scale;
              return (
                <button
                  key={scale}
                  onClick={() => handleScaleChange(scale)}
                  className={`relative px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide transition-colors duration-250 cursor-pointer select-none outline-none focus:outline-none ${
                    isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeScaleBg"
                      className="absolute inset-0 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">{Math.round(scale * 100)}%</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
