/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Award } from 'lucide-react';
import { PROJECTS, Project } from '../../types';

interface FeaturedWorkProps {
  onNavigate: (path: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export default function FeaturedWork({ onNavigate, searchQuery, setSearchQuery }: FeaturedWorkProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  // Exact user-specified project categories for our refactored system
  const categories = [
    'All',
    'Case Study',
    'Projects',
    '3D'
  ];

  // We map the projects array directly
  const displayProjects = PROJECTS;

  // Filter projects dynamically based on horizontal tab selection AND matching search input
  const filteredProjects = displayProjects.filter((project) => {
    const matchesTab =
      activeCategory === 'All' ||
      (project.categories
        ? project.categories.includes(activeCategory)
        : project.category === activeCategory);
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesTab;
    const matchesSearch =
      project.title.toLowerCase().includes(q) ||
      project.subtitle.toLowerCase().includes(q) ||
      project.category.toLowerCase().includes(q) ||
      project.tools.some((tool) => tool.toLowerCase().includes(q));
    return matchesTab && matchesSearch;
  });

  // Custom visuals matching the modern Canva graphic thumbnail look
  const renderBannerGraphics = (project: Project) => {
    if (project.type === 'gallery-3d' && project.thumbnail) {
      return (
        <img 
          src={project.thumbnail} 
          alt={`${project.title} Thumbnail`}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03] select-none pointer-events-none"
          loading="lazy"
        />
      );
    }

    if (project.thumbnail) {
      return (
        <img 
          src={project.thumbnail} 
          alt={`${project.title} Thumbnail`}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03] select-none pointer-events-none"
          loading="lazy"
        />
      );
    }

    const slug = project.slug;
    switch (slug) {
      case 'scaffled':
        return (
          <div className="absolute inset-0 bg-indigo-50 flex items-center justify-center p-4">
            <div className="w-full h-full border border-dashed border-indigo-200 rounded-lg bg-white p-3 relative flex flex-col justify-between">
              <div className="flex gap-1.5 items-center">
                <span className="text-[7px] font-mono text-indigo-500 bg-indigo-50 px-1 py-0.5 rounded font-bold uppercase tracking-wider">Case Study</span>
                <span className="text-[7px] font-mono text-gray-400 ml-1">scaffl_ed_flow.canvas</span>
              </div>
              <div className="my-auto flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center font-bold text-[10px] text-white">S</div>
                  <div className="flex flex-col gap-1 w-2/3">
                    <div className="h-2 bg-indigo-150 rounded w-full"></div>
                    <div className="h-1 bg-indigo-100 rounded w-4/5"></div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-1 mt-1 pl-1">
                  <div className="h-1 bg-indigo-400/30 rounded" />
                  <div className="h-1 bg-indigo-400/50 rounded" />
                  <div className="h-1 bg-indigo-400/80 rounded animate-pulse" />
                  <div className="h-1 bg-indigo-400/20 rounded" />
                </div>
              </div>
              <div className="absolute right-2 bottom-2 text-indigo-500">
                <svg className="w-4.5 h-4.5 text-indigo-600 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </div>
            </div>
          </div>
        );
      case 'studdy':
        return (
          <div className="absolute inset-0 bg-[#A855F7]/5 flex items-center justify-center p-4">
            <div className="w-full h-full bg-gradient-to-tr from-purple-900 to-violet-950 rounded-lg p-3 flex flex-col justify-between text-white relative overflow-hidden">
              <div className="flex justify-between items-center">
                <span className="text-[6px] font-mono text-purple-300 font-bold uppercase tracking-wider">Interactive Study Sparks</span>
                <span className="text-[6px] text-gray-400 font-mono">STU_SPK_v2.0</span>
              </div>
              <div className="my-auto">
                <p className="text-[12px] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-300">
                  FLASHCARD SPACING
                </p>
                <div className="flex gap-1.5 mt-1">
                  <div className="px-1.5 py-0.5 rounded bg-white/10 text-[6px] font-mono">Tagalog</div>
                  <div className="px-1.5 py-0.5 rounded bg-white/10 text-[6px] font-mono">Physics</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-[6px] text-purple-300/85 border-t border-white/5 pt-1.5 mt-2 font-mono">
                <span>REPETITION INTERVAL</span>
                <span className="text-emerald-400 font-bold">● ACTIVE</span>
              </div>
            </div>
          </div>
        );
      case 'tulai':
        return (
          <div className="absolute inset-0 bg-teal-900/5 flex items-center justify-center p-4">
            <div className="w-full h-full bg-gradient-to-br from-teal-950 via-teal-900 to-[#115E59] rounded-lg p-3 flex flex-col justify-between text-white relative">
              <div className="flex justify-between items-center text-[7px] font-mono text-teal-400 font-bold uppercase tracking-widest">
                <span>AI TRANSLATOR</span>
                <span className="text-emerald-400 font-sans font-bold">● ONLINE</span>
              </div>
              <div className="my-auto">
                <div className="text-xs font-sans font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">
                  Tagalog Legal Assist
                </div>
                <div className="mt-1 h-3.5 flex items-center bg-white/5 rounded px-1 w-2/3 border border-white/10">
                  <span className="text-[5px] font-mono text-teal-300 select-none animate-pulse">Scanning corpus...</span>
                </div>
              </div>
              <div className="text-[6px] font-mono text-teal-400/80">GEMINI POWERED SDK ● PROMPT_ENG_V12</div>
            </div>
          </div>
        );
      case 'plantego':
        return (
          <div className="absolute inset-0 bg-[#10B981]/5 flex items-center justify-center p-4">
            <div className="w-full h-full bg-white border border-[#E2E8F0] rounded-lg p-3 flex flex-col justify-between relative">
              <div className="flex justify-between items-center font-mono text-[6px] text-[#64748B]">
                <span className="bg-emerald-50 text-emerald-700 px-1 py-0.5 rounded font-bold">SOIL HYDRATION</span>
                <span>MONSTERA INDOOR</span>
              </div>
              <div className="my-auto flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-full border-2 border-emerald-500/30 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-bold text-[9px]">
                    84%
                  </div>
                </div>
                <div className="flex flex-col gap-0.5 w-1/2">
                  <div className="h-1.5 bg-emerald-400/10 rounded w-full"></div>
                  <div className="h-1.5 bg-emerald-500 rounded w-4/5"></div>
                </div>
              </div>
              <div className="absolute bottom-1 right-2 text-[5px] font-mono text-emerald-500 uppercase tracking-widest">Hydrated v1.3</div>
            </div>
          </div>
        );
      case 'pasada':
        return (
          <div className="absolute inset-0 bg-blue-50 flex items-center justify-center p-4">
            <div className="w-full h-full bg-gradient-to-br from-[#1E3A8A] via-blue-900 to-indigo-950 rounded-lg p-3 flex flex-col justify-between text-white overflow-hidden relative">
              <div className="flex justify-between items-center text-[7px] font-mono text-blue-300 font-bold uppercase tracking-wider">
                <span>JEEPNEY MAPS</span>
                <span>ACTIVE LOOPS</span>
              </div>
              <div className="my-auto">
                <div className="text-[11px] font-bold tracking-tight text-white/95">
                  COMMUTER DISPATCH
                </div>
                {/* Simulated SVG route trajectory */}
                <svg className="w-full h-5 mt-1 text-blue-400" viewBox="0 0 100 20" fill="none">
                  <path d="M5,10 C25,5 35,15 55,5 C75,15 85,5 95,10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" />
                  <circle cx="55" cy="5" r="2.5" fill="#EF4444" className="animate-ping" />
                  <circle cx="55" cy="5" r="1.5" fill="#EF4444" />
                </svg>
              </div>
              <div className="text-[5.5px] font-mono text-blue-300/80">SOCKET.IO BROADCASTS ● TICKET CODE</div>
            </div>
          </div>
        );
      case 'lakadph':
        return (
          <div className="absolute inset-0 bg-orange-50/5 flex items-center justify-center p-4">
            <div className="w-full h-full bg-white border border-[#E2E8F0] rounded-lg p-3 flex flex-col justify-between items-center text-center relative overflow-hidden">
              <div className="absolute top-1 left-2 text-[5px] font-mono text-orange-500">PHILIPPINES TOURISM</div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-450 via-teal-400 to-orange-400 flex items-center justify-center font-display font-semibold text-white text-[12px] shadow-sm tracking-tight mt-1">
                L
              </div>
              <div className="text-[8px] font-sans font-bold text-[#1E293B] uppercase tracking-widest mt-1">
                LAKAD REGIONAL
              </div>
              <div className="absolute bottom-1 right-2 text-[5px] font-mono text-orange-500">v3.4 BRAND SYSTEM</div>
            </div>
          </div>
        );
      case 'rooted':
        return (
          <div className="absolute inset-0 bg-neutral-900/5 flex items-center justify-center p-4">
            <div className="w-full h-full bg-[#171717] rounded-lg p-3 flex flex-col justify-between text-white relative">
              <div className="flex justify-between items-center text-[7px] font-mono text-emerald-400 tracking-wider">
                <span>ROOTED JOURNAL</span>
                <span>SECURE CRYPTO_KEY</span>
              </div>
              <div className="my-auto">
                <p className="text-[10px] font-sans font-black italic text-[#00FF88] tracking-widest mb-1 font-mono">
                  REFLECT & REST
                </p>
                <div className="h-0.5 bg-neutral-800 rounded w-full"></div>
                <div className="h-0.5 bg-neutral-800 rounded w-3/4 mt-1"></div>
              </div>
              <div className="text-[5px] font-mono text-neutral-450 uppercase">User emotional feedback scores logged locally</div>
            </div>
          </div>
        );
      case 'farmory':
        return (
          <div className="absolute inset-0 bg-emerald-950/5 flex items-center justify-center p-4">
            <div className="w-full h-full bg-gradient-to-br from-amber-900 to-emerald-950 rounded-lg p-3 flex flex-col justify-between text-white relative overflow-hidden">
              <div className="flex justify-between items-center">
                <span className="text-[6px] font-mono text-amber-200 font-bold uppercase tracking-wider">ACRES DATABASE</span>
                <span className="text-[6px] text-[#A7F3D0] bg-[#047857]/35 px-1 py-0.2 rounded font-mono font-bold tracking-tight">STABLE</span>
              </div>
              <div className="my-auto">
                <div className="text-center font-sans font-black tracking-tight text-[10px] leading-tight text-white uppercase text-amber-300">
                  CROP LOGIC NETWORK
                </div>
                <div className="grid grid-cols-5 gap-0.5 mt-1.5 max-w-[120px] mx-auto">
                  <div className="h-1 bg-amber-400/80 rounded" />
                  <div className="h-1 bg-emerald-400/80 rounded animate-pulse" />
                  <div className="h-1 bg-amber-400/50 rounded" />
                  <div className="h-1 bg-[#10B981] rounded" />
                  <div className="h-1 bg-amber-400/30 rounded" />
                </div>
              </div>
              <div className="text-[5.5px] font-mono text-[#059669]">COOPERATIVE LEDGER SYNC ● DRIZZLE_SQL</div>
            </div>
          </div>
        );
      case 'scaffy':
        return (
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 flex flex-col justify-between p-4 font-mono text-white/95 select-none text-[8px]">
            <div className="flex justify-between items-center opacity-85">
              <span>SCAFFY // MASCOT</span>
              <span className="border border-white/20 px-1 py-0.5 rounded text-[5px]">RIGGED v1.02</span>
            </div>
            <div className="flex flex-col items-center justify-center py-2 flex-1 relative">
              <div className="w-10 h-10 rounded-full bg-white/20 border border-white/35 flex items-center justify-center animate-bounce duration-1000">
                <div className="w-5 h-5 rounded-full bg-orange-400 border border-white/45 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                </div>
              </div>
              <div className="text-[6.5px] mt-2 font-bold tracking-tight">3D BLENDER RIG SHEET</div>
            </div>
            <div className="flex justify-between items-center text-[5px] opacity-75">
              <span>6 PAGES</span>
              <span>RENDER ENGINE: CYCLES</span>
            </div>
          </div>
        );
      case 'barbie-doll-house':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-rose-500 to-pink-600 flex flex-col justify-between p-4 font-mono text-white/95 select-none text-[8px]">
            <div className="flex justify-between items-center opacity-85">
              <span>BARBIE // INTERIOR</span>
              <span className="border border-white/20 px-1 py-0.5 rounded text-[5px]">ACADEMIC STUDY</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center py-2">
              <div className="w-14 h-10 border border-white/30 rounded p-1 flex flex-col justify-between bg-white/5">
                <div className="h-0.5 bg-white/40 w-full rounded" />
                <div className="flex justify-between gap-1">
                  <div className="h-4 w-4 border border-white/25 rounded bg-white/10" />
                  <div className="h-4 w-4 border border-white/25 rounded bg-white/10" />
                  <div className="h-4 w-4 border border-white/25 rounded bg-white/10" />
                </div>
                <div className="h-0.5 bg-white/30 w-1/2 rounded" />
              </div>
              <div className="text-[6px] mt-2 tracking-wide font-semibold">CYCLES TEXTURE PACK</div>
            </div>
            <div className="flex justify-between items-center text-[5px] opacity-75">
              <span>15 PAGES</span>
              <span>SCALE: 1:12 // TEXTURES</span>
            </div>
          </div>
        );
      case 'glass-chessboard':
        return (
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-400 via-zinc-500 to-zinc-700 flex flex-col justify-between p-4 font-mono text-white/95 select-none text-[8px]">
            <div className="flex justify-between items-center opacity-85">
              <span>GLASS CHESSBOARD</span>
              <span className="border border-white/20 px-1 py-0.5 rounded text-[5px]">REFRACTION STUDY</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center py-2">
              <div className="grid grid-cols-4 gap-0.5 p-1 bg-white/5 border border-white/25 rounded">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 ${((Math.floor(i / 4) + (i % 4)) % 2 === 0) ? 'bg-white/30' : 'bg-transparent border border-white/15'}`} />
                ))}
              </div>
              <div className="text-[5.5px] mt-2 font-bold tracking-tight">INDEX OF REFRACTION: 1.52</div>
            </div>
            <div className="flex justify-between items-center text-[5px] opacity-75">
              <span>6 PAGES</span>
              <span>RENDERER: LUXCORE</span>
            </div>
          </div>
        );
      case 'minecraft-castle':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 flex flex-col justify-between p-4 font-mono text-white/95 select-none text-[8px]">
            <div className="flex justify-between items-center opacity-85">
              <span>MINECRAFT // VOXEL</span>
              <span className="border border-white/20 px-1 py-0.5 rounded text-[5px]">BLOCK STUDY</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center py-2">
              <div className="relative w-12 h-10 flex items-center justify-center">
                <div className="absolute w-5 h-5 bg-white/20 border border-white/35 rounded-sm transform rotate-45 -translate-y-1.5" />
                <div className="absolute w-5 h-5 bg-white/35 border border-white/45 rounded-sm transform rotate-45 translate-x-1.5 translate-y-1" />
                <div className="absolute w-5 h-5 bg-white/10 border border-white/20 rounded-sm transform rotate-45 -translate-x-1.5 translate-y-1" />
              </div>
              <div className="text-[6.5px] mt-1 font-bold tracking-wider">BLOCKSCAPE METAPHOR</div>
            </div>
            <div className="flex justify-between items-center text-[5px] opacity-75">
              <span>4 PAGES</span>
              <span>VOXEL ELEVATION MAP</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <span className="text-[11px] text-gray-400 uppercase font-mono">Design Mockup</span>
          </div>
        );
    }
  };

  return (
    <section 
      id="featured-work-section"
      className="py-12 px-4 md:px-6 w-full flex flex-col select-none"
    >
      {/* Title block resembling Canva "Recent designs" page with relocated search capability */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <h2 id="recent-designs-heading" className="font-sans font-extrabold text-lg md:text-xl text-gray-900 tracking-tight whitespace-nowrap">
          Projects
        </h2>

        {/* Relocated Search Capability aligned right */}
        <div className="w-full sm:max-w-xs md:max-w-sm relative">
          <div className="flex items-center bg-[#F1F5F9]/70 hover:bg-[#F1F5F9]/90 focus-within:bg-white border border-[#E2E8F0] rounded-xl h-10 px-3.5 shadow-xs transition-all duration-200 focus-within:shadow-[0_4px_12px_rgba(0,0,0,0.04)] focus-within:border-[#94A3B8]/60 focus-within:ring-2 focus-within:ring-slate-100">
            {/* Search Icon */}
            <Search className="text-[#64748B] shrink-0 mr-2.5 w-4.5 h-4.5" />
            
            <input
              type="text"
              placeholder="Search designs & projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-[#1E293B] text-xs font-sans w-full focus:outline-none focus:ring-0 select-text font-medium placeholder-[#94A3B8]"
            />

            {/* Clear button trigger */}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[10px] font-bold text-[#64748B] hover:text-[#0F172A] uppercase tracking-wider shrink-0 ml-1.5 cursor-pointer transition-colors"
                title="Reset search"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Horizontal pill category tabs exactly matching the Canva reference image */}
      <div className="w-full overflow-x-auto scrollbar-none pb-4 mb-6">
        <div className="flex items-center gap-1.5 md:gap-2.5 min-w-max">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-[15px] py-1.5 rounded-full text-xs font-sans font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#E3E4E6] text-[#0F172A] scale-[1.02]'
                    : 'bg-transparent text-gray-600 hover:text-black hover:bg-gray-100/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Work */}
      {filteredProjects.length === 0 ? (
        <div className="w-full text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-sm font-sans font-medium text-gray-500">
            No matching projects found for "<span className="font-bold text-gray-800">{searchQuery}</span>" on tab <span className="font-bold text-gray-800">{activeCategory}</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Try searching for something else or reset your filters!
          </p>
        </div>
      ) : (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-7">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project, idx: number) => {
              return (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  onClick={() => onNavigate(`/projects/${project.slug}`)}
                  className="bg-transparent overflow-hidden flex flex-col h-full cursor-pointer group active:scale-[0.985]"
                >
                  {/* Top: Image thumbnail frame with custom shadow and subtle hover scale */}
                  <div className="w-full aspect-[16/10] relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-shadow duration-300 group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] pointer-events-none">
                    {renderBannerGraphics(project)}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.015] transition-colors duration-300" />
                    
                    {/* Optional award badges inside the frame */}
                    {((project.awards && project.awards.length > 0) || project.award) && (
                      <div className="absolute top-2 right-2 z-10 flex flex-col items-end gap-1">
                        {(project.awards || [project.award!]).map((aw, awIdx) => {
                          return (
                            <div 
                              key={awIdx} 
                              className="flex items-center gap-1.5 bg-amber-600/90 backdrop-blur-md text-white text-[8px] sm:text-[9px] font-sans font-extrabold px-2.5 py-0.5 rounded-full shadow-md tracking-wider uppercase border border-amber-400/30"
                            >
                              <Award size={10} className="stroke-[3] shrink-0" />
                              <span>{aw}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Bottom: Only title (bold, responsive) and sub-category underneath with absolutely no secondary buttons or rules */}
                  <div className="pt-2 px-1 flex flex-col min-h-[50px]">
                    <h4 className="font-sans font-bold text-xs md:text-sm text-[#0F172A] leading-snug tracking-tight group-hover:text-[#7d12ff] transition-colors truncate">
                      {project.title}
                    </h4>
                    
                    <p className="font-sans text-[10px] md:text-xs text-gray-400 mt-0.5 font-medium">
                      {project.category}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
