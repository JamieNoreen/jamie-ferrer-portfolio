/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TemplateType } from '../../types';
import { Users, Crown, Calendar, Milestone, Compass, Network, Award, Shield, Layout, ArrowRight } from 'lucide-react';

interface LeadershipPageProps {
  template: TemplateType;
}

interface OrgRole {
  id: string;
  role: string;
  org: string;
  chapter: string;
  period: string;
  prominence: 'most' | 'secondary' | 'standard';
  unit?: string;
  colorTheme?: string;
  badgeBg?: string;
}

interface ProjectRole {
  id: string;
  role: string;
  project: string;
  context: string;
  prominence: 'standard';
  period: string;
}

export default function LeadershipPage({ template }: LeadershipPageProps) {
  const pageTitle = "Leadership & Stewardship";
  const pageSubtitle = "";

  const orgRoles: OrgRole[] = [
    {
      id: "vp-internal-jpcs",
      role: "Vice President — Internal",
      org: "Junior Philippine Computer Society (JPCS)",
      chapter: "University of the East (UE)",
      period: "2025 — 2026",
      prominence: "most",
      colorTheme: "#FF6B35", // coral/orange
      badgeBg: "bg-orange-50 text-orange-850 border-orange-250"
    },
    {
      id: "dir-progs-dssoc",
      role: "Director of Programs",
      org: "Data Science Society (DSSOC)",
      chapter: "University of the East (UE)",
      period: "2025 — 2026",
      prominence: "most",
      colorTheme: "#FF6B35", // coral/orange
      badgeBg: "bg-orange-50 text-orange-850 border-orange-250"
    },
    {
      id: "vp-sc",
      role: "Vice President",
      org: "CCSS Student Council",
      chapter: "University of the East (UE)",
      period: "2024 — 2025",
      prominence: "most",
      colorTheme: "#7C3AED", // purple
      badgeBg: "bg-purple-50 text-purple-850 border-purple-250"
    },
    {
      id: "dir-events",
      role: "Director of Events",
      unit: "Research and Development Unit",
      org: "UE CCSS",
      chapter: "University of the East (UE)",
      period: "2023 — 2024",
      prominence: "secondary",
      colorTheme: "#FFA502", // yellow
      badgeBg: "bg-amber-50 text-amber-850 border-amber-250"
    }
  ];

  const projectRoles: ProjectRole[] = [
    {
      id: "proj-bluhacks",
      role: "Team Leader",
      project: "Blue Hacks Hackathon",
      context: "Led the team that won Champion",
      prominence: "standard",
      period: "2026"
    },
    {
      id: "proj-women-in-tech",
      role: "Women in Tech Leadership Program",
      project: "Cambridge University Press & Assessment",
      context: "Recognition: 2nd Place — Coding Dojo Women in Tech Competition",
      prominence: "standard",
      period: "2026"
    },
    {
      id: "proj-sys-fundamentals",
      role: "Team Leader",
      project: "System Fundamentals",
      context: "Academic project leadership",
      prominence: "standard",
      period: "2025"
    }
  ];

  // Helper prominence class names for text layout hierarchy mapping
  const getRoleTitleClass = (p: 'most' | 'secondary' | 'standard') => {
    if (p === 'most') return 'text-base md:text-lg font-black text-gray-900 tracking-tight leading-snug';
    if (p === 'secondary') return 'text-sm md:text-base font-bold text-gray-800 tracking-tight';
    return 'text-xs md:text-sm font-semibold text-gray-700';
  };

  // ==========================================
  // 1. TEMPLATE: MINIMALISM
  // ==========================================
  if (template === 'minimalism') {
    return (
      <div className="max-w-3xl mx-auto pb-12 font-sans text-gray-900 space-y-12">
        {/* Simple Document Style Header */}
        <div className="space-y-2 pt-2">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 leading-none">
            {pageTitle}
          </h1>
          <p className="text-xs text-gray-500 font-sans leading-relaxed tracking-normal max-w-xl mt-1.5 font-medium">
            {pageSubtitle}
          </p>
        </div>

        <div className="border-t border-gray-150 my-6" />

        {/* SECTION A: ORGANIZATIONAL LEADERSHIP */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-150 pb-1.5">
            <span className="text-[10px] font-mono tracking-widest text-gray-400 font-black uppercase">
              ORGANIZATIONAL LEADERSHIP
            </span>
          </div>

          <div className="space-y-7">
            {orgRoles.map((role) => {
              const isMost = role.prominence === 'most';
              return (
                <div key={role.id} className="flex gap-4 md:gap-7 items-start">
                  {/* Left Column Year Timestamp (width 32 for align consistency) */}
                  <div className="w-20 md:w-28 shrink-0 text-left pt-0.5">
                    <span className="font-mono text-[11px] font-bold text-gray-500 tracking-wider">
                      {role.period}
                    </span>
                  </div>

                  {/* Vertical Thin Separation Line */}
                  <div className="w-[1px] self-stretch bg-gray-200 relative">
                    <div className="absolute top-1.5 left-[-2.5px] w-1.5 h-1.5 rounded-full bg-black" />
                  </div>

                  {/* Role Content Block */}
                  <div className="flex-1 min-w-0 pb-2">
                    <h3 className={`${getRoleTitleClass(role.prominence)} ${isMost ? 'text-gray-900' : 'text-gray-800'}`}>
                      {role.role}
                    </h3>
                    <p className={`text-xs mt-1 font-medium ${isMost ? 'text-gray-600 font-semibold' : 'text-gray-500'}`}>
                      {role.org}
                      {role.unit && <span className="text-gray-400 font-normal"> ({role.unit})</span>}
                    </p>
                    <p className="text-[10px] text-gray-450 font-mono font-medium tracking-tight mt-0.5 uppercase">
                      {role.chapter}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION B: PROJECT LEADERSHIP */}
        <div className="space-y-6 pt-2">
          <div className="flex items-center justify-between border-b border-gray-150 pb-1.5">
            <span className="text-[10px] font-mono tracking-widest text-gray-400 font-black uppercase">
              PROJECT LEADERSHIP
            </span>
          </div>

          <div className="space-y-4 pl-6 md:pl-8 border-l-2 border-gray-100">
            {projectRoles.map((proj) => (
              <div key={proj.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-1.5">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{proj.role} &bull; {proj.project}</h4>
                  <p className="text-xs text-gray-550 mt-0.5">{proj.context}</p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 border border-gray-200 px-2 py-0.5 rounded">
                    {proj.period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. TEMPLATE: CREATIVE / EDITORIAL
  // ==========================================
  if (template === 'editorial') {
    return (
      <div className="max-w-4xl mx-auto pb-20 font-sans text-gray-950 space-y-16">
        
        {/* Stark Swiss Typographic Header */}
        <div className="text-left pt-6 pb-2 border-b-4 border-gray-950">
          <h1 className="text-4xl md:text-6xl font-sans font-black uppercase text-gray-950 tracking-tighter leading-none">
            {pageTitle}
          </h1>
          <p className="text-sm font-sans font-bold uppercase tracking-wider text-gray-600 mt-3">
            {pageSubtitle}
          </p>
        </div>

        {/* SECTION A: VERTICAL CORNERSTONE TIMELINE GRID */}
        <div className="space-y-6">
          <div className="flex flex-col gap-1 border-b-4 border-gray-950 pb-2">
            <h2 className="text-2xl font-sans font-black uppercase text-gray-950 tracking-tight">
              Organizational Stewardship & Councils
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {orgRoles.map((role, idx) => {
              return (
                <div 
                  key={role.id} 
                  className="border-4 border-gray-950 p-6 bg-white rounded-none relative flex flex-col justify-between transition-colors hover:bg-gray-50 duration-200"
                >
                  <div>
                    {/* Period tag block */}
                    <div className="flex justify-between items-baseline mb-5">
                      <span className="text-[10px] font-mono font-black text-white bg-gray-950 px-2.5 py-1 uppercase tracking-widest leading-none rounded-none">
                        {role.period}
                      </span>
                    </div>

                    <h3 className="font-sans font-black text-2xl md:text-3xl text-gray-950 uppercase tracking-tighter leading-none mb-4">
                      {role.role}
                    </h3>
                    
                    <div className="space-y-1 font-mono text-[10px] text-gray-700 uppercase tracking-wider border-t-2 border-gray-950 pt-3">
                      <p className="font-black text-gray-950">ORGANIZATION: {role.org}</p>
                      {role.unit && <p className="font-medium text-gray-500">UNIT: {role.unit}</p>}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-gray-300 flex justify-between items-center text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                    <span>{role.chapter}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION B: COLLAGE CARDS FOR PROJECT LEADERSHIP */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col gap-1 border-b-4 border-gray-950 pb-2">
            <h2 className="text-2xl font-sans font-black uppercase text-gray-950 tracking-tight">
              Competitive Hackathons & Operations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {projectRoles.map((proj, idx) => {
              return (
                <div 
                  key={proj.id}
                  className="border-4 border-gray-950 bg-white p-6 rounded-none flex flex-col justify-between transition-colors hover:bg-gray-50 duration-200"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-gray-955 font-black">#0{idx + 1}</span>
                    </div>

                    <h3 className="font-sans font-black text-xl text-gray-950 uppercase tracking-tighter leading-none">
                      {proj.role}
                    </h3>
                    
                    <p className="text-xs text-gray-655 font-sans font-medium leading-normal mt-1">
                      {proj.context}
                    </p>
                    
                    <div className="space-y-1 font-mono text-[9px] text-gray-700 uppercase tracking-wider border-t-2 border-gray-950 pt-2">
                      <p className="font-black text-gray-950">EVENT: {proj.project}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-gray-300 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider">
                    <span className="font-black text-gray-955">{proj.period}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 3. TEMPLATE: FUTURISTIC
  // ==========================================
  return (
    <div className="max-w-4xl mx-auto pb-16 font-mono text-[#00FF88] space-y-12">
      {/* HUD terminal display header */}
      <div className="space-y-2 pt-4 border-l-2 border-[#00FF88]/45 pl-4 bg-[#00FF88]/2 relative">
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-wider uppercase filter drop-shadow-[0_0_8px_var(--page-accent)]">
          {pageTitle}
        </h1>
        <div className="h-[2px] bg-gradient-to-r from-[var(--page-accent)] via-cyan-500 to-transparent relative mt-1" />
      </div>

      {/* Cybernetic horizontal scroll timeline slider simulation using flex card blocks */}
      <div className="space-y-12">

        {/* Timeline connector visual row with glowing connector horizontal bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#00FF88]/30 pb-1.5">
            <span className="text-[9px] font-black uppercase text-white tracking-widest">Organizational Leadership</span>
          </div>

          {/* Sliced Timeline visual track */}
          <div className="hidden lg:flex items-center justify-between px-10 relative py-3 select-none">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--page-accent)] via-cyan-500 to-[#00FF88] shrink-0" />
            {orgRoles.map((role) => (
              <div key={role.id} className="relative z-10 flex flex-col items-center">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-black bg-cyan-400 animate-pulse filter drop-shadow-[0_0_8px_cyan]" />
                <span className="text-[8px] text-white font-extrabold mt-1.5 bg-black/60 px-2 py-0.5 rounded border border-[#00FF88]/20">{role.period}</span>
              </div>
            ))}
          </div>

          {/* Cards Grid containing wider nodes for most recent */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orgRoles.map((role) => {
              const isMost = role.prominence === 'most';
              return (
                <div 
                  key={role.id}
                  className={`p-5 rounded-xl border bg-black/40 text-white relative overflow-hidden flex flex-col justify-between group hover:border-[var(--page-accent)] transition-all duration-300 ${
                    isMost 
                      ? 'border-[var(--page-accent)] shadow-[0_0_12px_rgba(0,255,136,0.06)]' 
                      : 'border-[#00FF88]/15'
                  }`}
                >
                  {/* HUD Corners */}
                  <span className="absolute top-1.5 left-1.5 text-[7px] text-[#00FF88]/30 font-black">┌</span>
                  <span className="absolute bottom-1.5 left-1.5 text-[7px] text-[#00FF88]/30 font-black">└</span>
                  <span className="absolute top-1.5 right-1.5 text-[7px] text-[#00FF88]/30 font-black">┐</span>
                  <span className="absolute bottom-1.5 right-1.5 text-[7px] text-[#00FF88]/30 font-black">┘</span>

                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[8.5px] font-bold text-gray-500 font-mono tracking-widest uppercase">{role.period}</span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-black text-sm text-[var(--page-accent)] group-hover:text-white transition-colors duration-200">
                        {role.role}
                      </h3>
                      <p className="text-[10px] text-gray-400">
                        {role.org}
                        {role.unit && <span className="text-cyan-400"> / {role.unit}</span>}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-2.5 border-t border-[#00FF88]/10 flex items-center justify-between text-[8px] text-[#00FF88]/60 font-bold">
                    <span className="text-white bg-[#00FF88]/10 border border-[#00FF88]/30 px-1.5 py-0.2 rounded-xs">{role.chapter}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* B. Project Leadership shown as bottom-most dashboard grid of compact badge rows */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-[#00FF88]/30 pb-1.5">
            <span className="text-[9px] font-black uppercase text-white tracking-widest">Competitive Hackathons & Operations</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectRoles.map((proj) => (
              <div 
                key={proj.id}
                className="p-4 border border-[#00FF88]/15 hover:border-[#00FF88]/35 bg-black/20 rounded-xl flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-extrabold text-[11px] text-white uppercase mt-1.5 leading-snug">
                    {proj.role} &bull; {proj.project}
                  </h4>
                  <p className="text-[9.5px] text-gray-400 mt-1">{proj.context}</p>
                </div>

                <div className="border-t border-[#00FF88]/15 mt-4 pt-2.5 flex items-center justify-between text-[8px] uppercase font-bold text-gray-400">
                  <span className="text-white">{proj.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
