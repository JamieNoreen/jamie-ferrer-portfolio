/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, PROJECTS } from '../../types';
import { 
  ArrowLeft, ArrowRight, Calendar, Wrench, Code, 
  ZoomIn, ZoomOut, Maximize2, X, ChevronLeft, ChevronRight 
} from 'lucide-react';

interface ProjectPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

/**
 * Clean, high-fidelity placeholder poster matching a premium portfolio slide canvas.
 */
function VisualPlaceholder({
  project,
  label,
  aspectStyle = 'aspect-[16/9]',
  index
}: {
  project: Project;
  label: string;
  aspectStyle?: string;
  index?: number;
}) {
  return (
    <div className={`w-full ${aspectStyle} bg-slate-50 border-y border-slate-100 relative flex flex-col items-center justify-center p-8 sm:p-12 select-none text-center group`}>
      <div className="max-w-xl space-y-3">
        <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-sans">
          {project.category} • Slide {index !== undefined ? index + 1 : ''}
        </span>
        <h4 className="font-sans font-extrabold text-base sm:text-lg text-slate-800 tracking-tight leading-snug">
          {label}
        </h4>
        <p className="text-xs text-slate-400 font-sans">
          {project.title}
        </p>
      </div>
    </div>
  );
}

/**
 * Image container checking for physical load capabilities. Falls back beautifully to Presentation placeholders.
 */
function ImageWithFallback({
  src,
  alt,
  type,
  project,
  label,
  aspectStyle = 'aspect-[16/10]',
  index,
  onClick,
  noBorder = false
}: {
  key?: React.Key;
  src: string;
  alt: string;
  type: 'slide' | 'hero' | 'problem' | 'screen' | 'mockup';
  project: Project;
  label: string;
  aspectStyle?: string;
  index?: number;
  onClick?: () => void;
  noBorder?: boolean;
}) {
  const [hasError, setHasError] = useState(false);

  // Fallback to placeholder if physical image doesn't exist
  if (hasError || !src || src.includes('placeholder') || src.startsWith('/images/')) {
    return (
      <div onClick={onClick} className="cursor-zoom-in w-full">
        <VisualPlaceholder 
          project={project} 
          label={label} 
          aspectStyle={aspectStyle}
          index={index}
        />
      </div>
    );
  }

  const isCover = type === 'hero' || type === 'mockup';
  const imgClassName = isCover
    ? "w-full h-full object-cover block transition-all group-hover:scale-[1.015] duration-300"
    : "w-full h-full object-contain block mx-auto";

  return (
    <div className={`relative w-full ${aspectStyle} overflow-hidden cursor-zoom-in group ${noBorder ? '' : 'border-y border-slate-100 bg-slate-50'}`} onClick={onClick}>
      <img
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        referrerPolicy="no-referrer"
        loading={type === 'hero' ? 'eager' : 'lazy'}
        className={imgClassName}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-250 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full text-xs text-white font-medium tracking-tight flex items-center gap-1.5 shadow-md transition-opacity duration-200">
          <Maximize2 size={12} />
          <span>Zoom Slide</span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectPage({ slug, onNavigate }: ProjectPageProps) {
  const project = PROJECTS.find((p) => p.slug === slug);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const touchStartXRef = useRef(0);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        handleNextLightbox();
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        handlePrevLightbox();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, lightboxIndex, project]);

  if (!project) {
    return (
      <div className="pt-24 text-center select-none space-y-4">
        <h2 className="text-xl font-sans font-bold text-gray-800">Project Not Loaded</h2>
        <p className="text-xs text-gray-500">The requested layout is not registered.</p>
        <button 
          onClick={() => onNavigate('/')}
          className="bg-black text-white px-4 py-2 text-xs rounded-full cursor-pointer hover:bg-neutral-800 transition-colors font-semibold"
        >
          Return Home
        </button>
      </div>
    );
  }

  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  // Helper arrays for lightbox carousel mapping
  const getLightboxImages = (): { src: string; caption: string; type: 'slide' | 'hero' | 'problem' | 'screen' | 'mockup' }[] => {
    if (project.type === 'gallery-3d' && project.galleryPages) {
      return project.galleryPages.map((img, i) => {
        return {
          src: img,
          caption: `Page ${i + 1} Render`,
          type: 'slide'
        };
      });
    } else if (project.type === 'case-study' && project.caseStudyImages) {
      return project.caseStudyImages.map((img, i) => {
        let label = `Presentation Slide ${i + 1}`;
        if (project.slug === 'studdy' || project.slug === 'scaffled' || project.slug === 'rooted') {
          label = `Slide ${i + 1}`;
        } else {
          if (i === 0) label = "Project Overview & Concept";
          else if (i === 1) label = "User Research & Problem Mapping";
          else if (i === 2) label = "Information Architecture & Layouts";
          else if (i === 3) label = "Interface Wireframes & Specs";
          else if (i === 4) label = "Impact Analysis & Metrics";
        }
        return {
          src: img,
          caption: label,
          type: 'slide'
        };
      });
    } else {
      const list: { src: string; caption: string; type: 'slide' | 'hero' | 'problem' | 'screen' | 'mockup' }[] = [];
      if (project.showcaseHero) {
        list.push({ src: project.showcaseHero, caption: `${project.title} Spotlight Hero`, type: 'hero' });
      }
      if (project.showcaseProblemImage) {
        list.push({ src: project.showcaseProblemImage, caption: `Problem Space Analysis`, type: 'problem' });
      }
      if (project.showcaseScreens) {
        project.showcaseScreens.forEach((grp) => {
          grp.images.forEach((scr) => {
            list.push({ src: scr.src, caption: scr.caption, type: 'screen' });
          });
        });
      }
      if (project.mockupImages) {
        project.mockupImages.forEach((m) => {
          list.push({ src: m.src, caption: m.caption || 'Interface Mockup Render', type: 'mockup' });
        });
      }
      return list;
    }
  };

  const carouselItems = getLightboxImages();

  const openLightboxAt = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
    setZoomScale(1);
    setDragOffset({ x: 0, y: 0 });
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoomScale(1);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleNextLightbox = () => {
    setLightboxIndex((idx) => (idx + 1) % carouselItems.length);
    setZoomScale(1);
    setDragOffset({ x: 0, y: 0 });
  };

  const handlePrevLightbox = () => {
    setLightboxIndex((idx) => (idx - 1 + carouselItems.length) % carouselItems.length);
    setZoomScale(1);
    setDragOffset({ x: 0, y: 0 });
  };

  const toggleZoom = () => {
    if (zoomScale > 1) {
      setZoomScale(1);
      setDragOffset({ x: 0, y: 0 });
    } else {
      setZoomScale(2);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const thresh = 50;
    const delta = e.changedTouches[0].clientX - touchStartXRef.current;
    if (delta > thresh) {
      handlePrevLightbox();
    } else if (delta < -thresh) {
      handleNextLightbox();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale === 1) return;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomScale === 1) return;
    setDragOffset((curr) => ({
      x: curr.x + e.movementX,
      y: curr.y + e.movementY
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full min-h-[calc(100vh-52px)] bg-[#E5E5E5] py-12 px-4 md:px-8 select-none font-sans relative overflow-y-auto">
      
      {/* Background visual workspace grid */}
      <div 
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
        className="absolute inset-0 pointer-events-none z-0" 
      />

      {/* CORE FRAME CONTAINER: Central high-fidelity paper layout wrapper */}
      <motion.article
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-[900px] mx-auto bg-white shadow-xl rounded-lg overflow-hidden border border-slate-250 text-slate-800 relative z-10 pointer-events-auto"
        style={{ zoom: 'var(--content-scale, 1)' }}
      >
        {project.slug !== 'studdy' && project.slug !== 'scaffled' && project.slug !== 'rooted' && project.type !== 'gallery-3d' && <div className={`h-1 w-full bg-gradient-to-r ${project.bannerColor}`} />}

        {/* 1. HEADER BAR */}
        {project.slug !== 'studdy' && project.slug !== 'scaffled' && project.slug !== 'rooted' && project.type !== 'gallery-3d' && (
          <div className="py-5 px-6 sm:px-10 md:px-14 border-b border-slate-100 flex justify-between items-center bg-white">
            <button
              onClick={() => onNavigate('/')}
              className="group flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-650 hover:text-black transition-colors"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Portfolio</span>
            </button>
            <div className="flex items-center gap-2 text-slate-400 font-sans text-[11px] font-bold uppercase tracking-wider">
              <span>{project.category}</span>
              <span className="text-slate-200">•</span>
              <span>{project.type === 'case-study' ? 'Case Studies' : 'Showcase'}</span>
            </div>
          </div>
        )}

        {project.type === 'gallery-3d' ? (
          <div className="w-full flex flex-col bg-white space-y-1">
            {project.galleryPages?.map((img, idx) => {
              const flatIdx = carouselItems.findIndex((item) => item.src === img);
              const actualIdx = flatIdx !== -1 ? flatIdx : idx;
              return (
                <img
                  key={idx}
                  src={img}
                  alt={`${project.title} Page ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-auto block select-none cursor-zoom-in"
                  onClick={() => openLightboxAt(actualIdx)}
                />
              );
            })}
          </div>
        ) : (
          <>
            {project.slug !== 'studdy' && project.slug !== 'scaffled' && project.slug !== 'rooted' && (
              <>
                {/* 2. HEADLINE */}
                <div className="py-10 px-6 sm:px-10 md:px-14 bg-white">
                  <h1 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight leading-tight">
                    {project.title}
                  </h1>
                  <p className="text-sm sm:text-base text-slate-500 font-medium tracking-tight mt-2.5 max-w-2xl leading-normal">
                    {project.subtitle}
                  </p>
                </div>

                {/* OPTIONAL HERO BLOCK AT TOP */}
                {project.type === 'showcase' && project.showcaseHero && (
                  <div className="w-full border-b border-slate-100 mb-6">
                    <ImageWithFallback
                      src={project.showcaseHero}
                      alt={`${project.title} Hero Showcase`}
                      type="hero"
                      project={project}
                      label="Spotlight Hero Slide"
                      aspectStyle="aspect-[16/8.5]"
                      onClick={() => openLightboxAt(0)}
                    />
                  </div>
                )}

                {/* ========================================================
                    1. ABOUT SECTION (Portfolio paper grid layout)
                    ======================================================== */}
                <section className="py-8 px-6 sm:px-10 md:px-14 space-y-6 bg-white">
                  <div className="space-y-2">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      About
                    </h2>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                        Project Year
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 mt-1 block">
                        {project.year}
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-[10px] text-slate-350 font-bold uppercase tracking-wider block">
                        Direct Role
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-850 mt-1 block">
                        {project.role}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-355 font-bold uppercase tracking-wider block">
                        Platform & Stack
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {project.tools.map((tl, i) => (
                          <span key={i} className="text-[10px] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-650 font-medium font-sans">
                            {tl}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* ========================================================
                    2. PROBLEM SECTION (Portfolio paper grid layout)
                    ======================================================== */}
                <section className="py-8 border-t border-slate-100 bg-white space-y-6">
                  <div className="px-6 sm:px-10 md:px-14 space-y-2.5">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Problem
                    </h2>
                    {project.type === 'showcase' && project.caseStudyImages && project.caseStudyImages.length > 0 ? (
                      <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                        {project.description}
                      </p>
                    ) : project.type === 'showcase' && project.showcaseProblemText ? (
                      <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                        {project.showcaseProblemText}
                      </p>
                    ) : (
                      <div className="bg-slate-50/50 border border-slate-150 rounded-lg p-5">
                        <p className="text-slate-450 text-xs sm:text-sm italic leading-relaxed">
                          No customized problem statement has been assigned in project records. You can define details within the <code>showcaseProblemText</code> attribute of data.ts to populate this area.
                        </p>
                      </div>
                    )}
                  </div>

                  {project.type === 'showcase' && project.showcaseProblemImage && (
                    <div className="w-full">
                      <ImageWithFallback
                        src={project.showcaseProblemImage}
                        alt={`${project.title} Problem Framing`}
                        type="problem"
                        project={project}
                        label="Problem Scenario Diagram"
                        aspectStyle="aspect-[16/9]"
                        onClick={() => {
                          const hIdx = project.showcaseHero ? 1 : 0;
                          openLightboxAt(hIdx);
                        }}
                      />
                    </div>
                  )}
                </section>
              </>
            )}

            {/* ========================================================
                3. SCREENS SECTION (Slide Showcase Viewport)
                ======================================================== */}
            {project.slug === 'studdy' || project.slug === 'scaffled' || project.slug === 'rooted' ? (
              <div className="w-full flex flex-col bg-white">
                {project.caseStudyImages?.map((srcVal, idx) => {
                  const flatIdx = carouselItems.findIndex((item) => item.src === srcVal);
                  const actualIdx = flatIdx !== -1 ? flatIdx : idx;
                  return (
                    <img
                      key={idx}
                      src={srcVal}
                      alt={`${project.title} Slide ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-auto block select-none cursor-zoom-in"
                      onClick={() => openLightboxAt(actualIdx)}
                    />
                  );
                })}
              </div>
            ) : (
              <section className="py-8 border-t border-slate-100 bg-white space-y-6">
                <div className="px-6 sm:px-10 md:px-14">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Screens
                  </h2>
                </div>

                {/* Render horizontal maximum width presentation stack */}
                {project.type === 'case-study' && project.caseStudyImages && project.caseStudyImages.length > 0 ? (
                  <div className="flex flex-col space-y-8 bg-slate-50 border-y border-slate-100 py-6">
                    {project.caseStudyImages.map((img, idx) => {
                      let slideLabel = "Presentation Slide";
                      if (idx === 0) slideLabel = "Project Overview & Concept";
                      else if (idx === 1) slideLabel = "User Research & Problem Mapping";
                      else if (idx === 2) slideLabel = "Information Architecture & Layouts";
                      else if (idx === 3) slideLabel = "Interface Wireframes & Specs";
                      else if (idx === 4) slideLabel = "Impact Analysis & Metrics";

                      return (
                        <ImageWithFallback
                          key={idx}
                          src={img}
                          alt={`${project.title} Case Slide ${idx + 1}`}
                          type="slide"
                          project={project}
                          label={`${idx + 1}. ${slideLabel}`}
                          index={idx}
                          onClick={() => openLightboxAt(idx)}
                        />
                      );
                    })}
                  </div>
                ) : project.type === 'showcase' && project.showcaseScreens && project.showcaseScreens.length > 0 ? (
                <div className="flex flex-col space-y-10 bg-slate-50 border-y border-slate-100 py-6">
                  {project.slug === 'farmory' ? (
                    <div className="flex flex-col space-y-12 py-4">
                      {/* SECTION 1 */}
                      <div className="space-y-6">
                        <div className="px-6 sm:px-10 md:px-14 space-y-1.5 mb-2">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                            Insurance Management Dashboard
                          </h4>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl whitespace-pre-line font-normal">
                            Administrative dashboard used by insurers to monitor claims, manage farmers, review risk data, process insurance requests, and oversee platform operations.
                          </p>
                        </div>
                        <div className="w-full">
                          {(() => {
                            const scrSrc = '/portfolio-assets/projects/farmory/screen1.webp';
                            const flatIdx = carouselItems.findIndex((item) => item.src === scrSrc);
                            const actualIdx = flatIdx !== -1 ? flatIdx : 0;
                            return (
                              <ImageWithFallback
                                src={scrSrc}
                                alt="Insurance Management Dashboard"
                                type="mockup"
                                project={project}
                                label="Insurance Management Dashboard"
                                noBorder={true}
                                aspectStyle="aspect-[16/10]"
                                onClick={() => openLightboxAt(actualIdx)}
                              />
                            );
                          })()}
                        </div>
                      </div>

                      {/* SECTION 2 */}
                      <div className="space-y-6 border-t border-slate-200/50 pt-10">
                        <div className="px-6 sm:px-10 md:px-14 space-y-1.5 mb-2">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                            Insurer Platform
                          </h4>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl whitespace-pre-line font-normal">
                            Administrative tools for reviewing claims, managing farmer records, monitoring harvest data, and processing insurance operations.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 w-full">
                          {[
                            '/portfolio-assets/projects/farmory/screen2.webp',
                            '/portfolio-assets/projects/farmory/screen3.webp',
                            '/portfolio-assets/projects/farmory/screen4.webp',
                            '/portfolio-assets/projects/farmory/screen5.webp'
                          ].map((srcVal, idx) => {
                            const flatIdx = carouselItems.findIndex((item) => item.src === srcVal);
                            const actualIdx = flatIdx !== -1 ? flatIdx : 0;

                            return (
                              <div key={idx} className="w-full">
                                <ImageWithFallback
                                  src={srcVal}
                                  alt={`Insurer Platform Screen ${idx + 2}`}
                                  type="mockup"
                                  project={project}
                                  label={`Insurer Platform Screen ${idx + 2}`}
                                  noBorder={true}
                                  aspectStyle="aspect-[16/10]"
                                  onClick={() => openLightboxAt(actualIdx)}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* SECTION 3 */}
                      <div className="space-y-6 border-t border-slate-200/50 pt-10">
                        <div className="px-6 sm:px-10 md:px-14 space-y-1.5 mb-2">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                            Farmer Mobile Experience
                          </h4>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl whitespace-pre-line font-normal">
                            Mobile-first workflows allowing farmers to register, manage crops, submit insurance claims, and track claim status in real time.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 w-full">
                          {[
                            '/portfolio-assets/projects/farmory/screen6.webp',
                            '/portfolio-assets/projects/farmory/screen7.webp',
                            '/portfolio-assets/projects/farmory/screen8.webp',
                            '/portfolio-assets/projects/farmory/screen9.webp'
                          ].map((srcVal, idx) => {
                            const flatIdx = carouselItems.findIndex((item) => item.src === srcVal);
                            const actualIdx = flatIdx !== -1 ? flatIdx : 0;

                            return (
                              <div key={idx} className="w-full">
                                <ImageWithFallback
                                  src={srcVal}
                                  alt={`Farmer Mobile Screen ${idx + 6}`}
                                  type="mockup"
                                  project={project}
                                  label={`Farmer Mobile Screen ${idx + 6}`}
                                  noBorder={true}
                                  aspectStyle="aspect-[16/10]"
                                  onClick={() => openLightboxAt(actualIdx)}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    project.showcaseScreens.map((group, grpIdx) => (
                      <div key={grpIdx} className="space-y-6">
                        {(group.groupTitle || group.description) && (
                          <div className="px-6 sm:px-10 md:px-14 space-y-1.5 mb-2">
                            {group.groupTitle && (
                              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                                {group.groupTitle}
                              </h4>
                            )}
                            {group.description && (
                              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl whitespace-pre-line">
                                {group.description}
                              </p>
                            )}
                          </div>
                        )}

                        <div className="flex flex-col space-y-8">
                          {group.images.map((scr, scrIdx) => {
                            const flatIdx = carouselItems.findIndex((item) => item.src === scr.src);
                            const actualIdx = flatIdx !== -1 ? flatIdx : 0;

                            return (
                              <div key={scrIdx} className="w-full">
                                <ImageWithFallback
                                  src={scr.src}
                                  alt={scr.caption}
                                  type="screen"
                                  project={project}
                                  label={scr.caption}
                                  onClick={() => openLightboxAt(actualIdx)}
                                />
                                {/* Caption strictly below */}
                                <div className="px-6 sm:px-10 md:px-14 pt-3">
                                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                                    {scr.caption}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="px-6 sm:px-10 md:px-14">
                  <div className="bg-slate-50/50 border border-slate-150 rounded-lg p-5">
                    <p className="text-slate-450 text-xs sm:text-sm italic leading-relaxed">
                      No explicit interface screen maps have been provided. Check back for dynamic Canva uploads or add items to <code>showcaseScreens</code> inside data.ts.
                    </p>
                  </div>
                </div>
              )}
            </section>
            )}

            {/* ========================================================
                4. MOCKUPS SECTION
                ======================================================== */}
            {project.slug !== 'studdy' && project.slug !== 'scaffled' && project.slug !== 'rooted' && (
              <section className="pt-8 border-t border-slate-100 bg-white">
              <div className="px-6 sm:px-10 md:px-14 mb-6">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Mockups
                </h2>
              </div>

              {(() => {
                const mockupList = project.mockupImages || [];
                if (mockupList.length > 0) {
                  const rows: (typeof mockupList)[] = [];
                  if (mockupList.length === 2) {
                    rows.push([mockupList[0], mockupList[1]]);
                  } else if (mockupList.length === 3) {
                    rows.push([mockupList[0], mockupList[1]]);
                    rows.push([mockupList[2]]);
                  } else if (mockupList.length === 4) {
                    rows.push([mockupList[0], mockupList[1]]);
                    rows.push([mockupList[2], mockupList[3]]);
                  } else {
                    for (let i = 0; i < mockupList.length; i += 2) {
                      rows.push(mockupList.slice(i, i + 2));
                    }
                  }

                  return (
                    <div className="w-full flex flex-col">
                      {rows.map((row, rowIdx) => {
                        if (row.length === 1) {
                          const img = row[0];
                          const flatIdx = carouselItems.findIndex((item) => item.src === img.src);
                          const actualIdx = flatIdx !== -1 ? flatIdx : 0;

                          return (
                            <div key={rowIdx} className="w-full">
                              <ImageWithFallback
                                src={img.src}
                                alt={img.caption || 'Project mockups render'}
                                type="mockup"
                                project={project}
                                label={img.caption || 'Interface mockup slide'}
                                noBorder={true}
                                onClick={() => openLightboxAt(actualIdx)}
                              />
                            </div>
                          );
                        } else {
                          return (
                            <div key={rowIdx} className="grid grid-cols-2 gap-0 w-full">
                              {row.map((img, colIdx) => {
                                const flatIdx = carouselItems.findIndex((item) => item.src === img.src);
                                const actualIdx = flatIdx !== -1 ? flatIdx : 0;

                                return (
                                  <div key={colIdx} className="w-full">
                                    <ImageWithFallback
                                      src={img.src}
                                      alt={img.caption || 'Project mockups render'}
                                      type="mockup"
                                      project={project}
                                      label={img.caption || 'Interface mockup slide'}
                                      noBorder={true}
                                      onClick={() => openLightboxAt(actualIdx)}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }
                      })}
                    </div>
                  );
                } else {
                  return (
                    <div className="px-6 sm:px-10 md:px-14 pb-8">
                      <div className="bg-slate-50/50 border border-slate-150 rounded-lg p-6 sm:p-8 text-center select-none">
                        <p className="text-slate-400 text-xs sm:text-sm italic leading-relaxed">
                          Interactive mockups are currently empty for this project. Custom assets can be defined directly as <code>mockupImages</code> inside types.ts.
                        </p>
                      </div>
                    </div>
                  );
                }
              })()}
            </section>
            )}
          </>
        )}

        {/* 5. CONTINUATION TEASER */}
        <div className="py-10 px-6 sm:px-10 md:px-14 border-t border-slate-100 bg-slate-50/30">
          <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-4 text-center">
            Continue Exploration
          </h4>
          
          <motion.div
            whileHover={{ y: -3, borderColor: '#CBD5E1' }}
            onClick={() => onNavigate(`/projects/${nextProject.slug}`)}
            className="group relative rounded-xl border border-slate-200 p-6 bg-white hover:bg-slate-50/30 cursor-pointer transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 active:scale-[0.99]"
          >
            <div>
              <span className="text-[9px] font-bold text-indigo-500 tracking-wider uppercase pb-1 block">
                UP NEXT
              </span>
              <h3 className="font-sans font-bold text-lg text-slate-900 leading-tight">
                {nextProject.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {nextProject.subtitle}
              </p>
            </div>
            
            <div className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-55 border border-slate-200 rounded-full px-4 py-2 group-hover:bg-black group-hover:text-white transition-all">
              <span>Next Project</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </motion.div>
        </div>

      </motion.article>

      {/* ========================================================
          FULL SCREEN CINEMATIC LIGHTBOX CAROUSEL MODAL PORTAL
          ======================================================== */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between font-sans text-slate-300"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* LIGHTBOX STATUS HEADER */}
            <div className="w-full h-16 px-4 md:px-8 border-b border-white/5 flex justify-between items-center z-50 bg-black/50 backdrop-blur-md">
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest font-sans leading-none select-none">
                  Viewing Slide Deck
                </span>
                <span className="text-xs text-white mt-1.5 font-medium tracking-tight truncate max-w-[280px] sm:max-w-md font-sans">
                  {project.title} — {carouselItems[lightboxIndex].caption}
                </span>
              </div>

              {/* ACTION TOOLBAR */}
              <div className="flex items-center gap-3">
                {/* Scale zoom button */}
                <button
                  onClick={toggleZoom}
                  title="Toggle Zoom level"
                  className="p-2.5 rounded-full cursor-pointer bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all"
                >
                  {zoomScale > 1 ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
                </button>

                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="p-2.5 rounded-full cursor-pointer bg-white/10 text-white hover:text-rose-450 hover:bg-white/20 transition-all font-bold"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* MAIN CAROUSEL */}
            <div className="flex-1 w-full relative flex items-center justify-between overflow-hidden">
              {/* Previous Clicker */}
              <button
                onClick={handlePrevLightbox}
                className="hidden sm:flex absolute left-4 z-50 w-11 h-11 rounded-full cursor-pointer bg-black/45 border border-white/10 items-center justify-center text-white hover:bg-black/90 transition-all"
              >
                <ChevronLeft size={22} />
              </button>

              <div 
                className="flex-1 h-full flex items-center justify-center p-4 relative"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div 
                  style={{
                    transform: `scale(${zoomScale}) translate(${dragOffset.x / zoomScale}px, ${dragOffset.y / zoomScale}px)`,
                    cursor: zoomScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                    transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="max-w-full max-h-[75vh] flex items-center justify-center relative select-none"
                >
                  {(() => {
                    const item = carouselItems[lightboxIndex];
                    if (!item.src || item.src.includes('placeholder') || item.src.startsWith('/images/')) {
                      return (
                        <div className="w-[85vw] max-w-[850px] aspect-[16/10] overflow-hidden rounded bg-stone-900 border border-white/5 shadow-2xl">
                          <VisualPlaceholder
                            project={project}
                            label={item.caption}
                            aspectStyle="aspect-[16/10]"
                            index={lightboxIndex}
                          />
                        </div>
                      );
                    }
                    return (
                      <img
                        src={item.src}
                        alt="Lightbox Spec"
                        draggable={false}
                        referrerPolicy="no-referrer"
                        className="max-w-[90vw] max-h-[70vh] object-contain rounded shadow-2xl border border-white/5"
                      />
                    );
                  })()}
                </div>
              </div>

              {/* Next Clicker */}
              <button
                onClick={handleNextLightbox}
                className="hidden sm:flex absolute right-4 z-50 w-11 h-11 rounded-full cursor-pointer bg-black/45 border border-white/10 items-center justify-center text-white hover:bg-black/90 transition-all"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* LIGHTBOX METRICS FOOTER */}
            <div className="w-full h-16 px-4 md:px-8 border-t border-white/5 flex justify-between items-center z-50 bg-black/50 backdrop-blur-md text-white/70 select-none">
              <span className="font-sans text-xs font-semibold tracking-wider text-slate-400">
                Slide {lightboxIndex + 1} of {carouselItems.length}
              </span>
              <span className="hidden sm:inline-block font-sans text-[11px] text-slate-450 tracking-wider font-medium">
                Swipe or use ← / → keyboard keys to navigate
              </span>
              <span className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wide">
                {project.type === 'case-study' ? 'Case Studies' : 'Showcase'}
              </span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
