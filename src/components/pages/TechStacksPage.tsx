/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { TemplateType } from '../../types';
import { 
  Palette, 
  Layers, 
  Box, 
  Video, 
  Image, 
  Code2, 
  Terminal, 
  Database, 
  Blocks, 
  Globe, 
  PenTool, 
  Grid, 
  Cpu, 
  Compass,
  FileCode,
  Users,
  Search,
  Sparkles,
  RefreshCw,
  Wrench
} from 'lucide-react';

interface TechStacksPageProps {
  template: TemplateType;
}

interface SkillTool {
  id: string;
  name: string;
  proficiency: 'Core' | 'Experienced' | 'Working Knowledge' | 'Learning';
  emphasis: 'highest' | 'medium' | 'standard' | 'lower';
  monogram: string;
}

interface SkillCategory {
  title: string;
  items: SkillTool[];
}

export default function TechStacksPage({ template }: TechStacksPageProps) {
  const pageTitle = "Skills & Toolset";
  const pageSubtitle = "Tools, technologies, and workflows I use to turn ideas into products.";

  // Curated skills data matching the specific requirements with exact proficiency levels & emphasis metrics.
  const categories: SkillCategory[] = [
    {
      title: "Product Design & Research",
      items: [
        { id: "prod-design", name: "Product Design", proficiency: "Core", emphasis: "highest", monogram: "Pd" },
        { id: "ui-ux", name: "UI/UX", proficiency: "Core", emphasis: "highest", monogram: "Ux" },
        { id: "figma", name: "Figma", proficiency: "Core", emphasis: "highest", monogram: "Fg" },
        { id: "user-res", name: "User Research", proficiency: "Core", emphasis: "highest", monogram: "Ur" },
        { id: "prototyping", name: "Prototyping", proficiency: "Core", emphasis: "highest", monogram: "Pr" },
        { id: "wireframing", name: "Wireframing", proficiency: "Core", emphasis: "standard", monogram: "Wf" },
        { id: "des-systems", name: "Design Systems", proficiency: "Experienced", emphasis: "standard", monogram: "Ds" },
        { id: "usability", name: "Usability Testing", proficiency: "Experienced", emphasis: "standard", monogram: "Ut" }
      ]
    },
    {
      title: "Visual & Content Creation",
      items: [
        { id: "illustrator", name: "Adobe Illustrator", proficiency: "Experienced", emphasis: "standard", monogram: "Ai" },
        { id: "canva", name: "Canva", proficiency: "Experienced", emphasis: "standard", monogram: "Cv" },
        { id: "blender", name: "Blender", proficiency: "Working Knowledge", emphasis: "standard", monogram: "Bl" },
        { id: "photoshop", name: "Photoshop", proficiency: "Experienced", emphasis: "lower", monogram: "Ps" },
        { id: "davinci", name: "DaVinci Resolve", proficiency: "Working Knowledge", emphasis: "lower", monogram: "Dr" },
        { id: "affinity", name: "Affinity Designer (Learning)", proficiency: "Learning", emphasis: "standard", monogram: "Ad" }
      ]
    },
    {
      title: "Development & Implementation",
      items: [
        { id: "react", name: "React", proficiency: "Experienced", emphasis: "medium", monogram: "Re" },
        { id: "nextjs", name: "Next.js", proficiency: "Experienced", emphasis: "medium", monogram: "Nx" },
        { id: "html", name: "HTML", proficiency: "Experienced", emphasis: "standard", monogram: "Ht" },
        { id: "css", name: "CSS", proficiency: "Experienced", emphasis: "standard", monogram: "Cs" },
        { id: "js", name: "JavaScript", proficiency: "Experienced", emphasis: "standard", monogram: "Js" },
        { id: "ts", name: "TypeScript", proficiency: "Experienced", emphasis: "standard", monogram: "Ts" },
        { id: "php", name: "PHP", proficiency: "Working Knowledge", emphasis: "standard", monogram: "Ph" },
        { id: "msaccess", name: "MS Access", proficiency: "Working Knowledge", emphasis: "lower", monogram: "Ma" }
      ]
    },
    {
      title: "No-Code & Website Building",
      items: [
        { id: "wordpress", name: "WordPress (Learning)", proficiency: "Learning", emphasis: "medium", monogram: "Wp" },
        { id: "webflow", name: "Webflow (Learning)", proficiency: "Learning", emphasis: "medium", monogram: "Wf" }
      ]
    },
    {
      title: "AI & Emerging Tools",
      items: [
        { id: "chatgpt", name: "ChatGPT", proficiency: "Experienced", emphasis: "standard", monogram: "Gp" },
        { id: "gemini", name: "Gemini", proficiency: "Experienced", emphasis: "standard", monogram: "Gm" },
        { id: "claude", name: "Claude", proficiency: "Experienced", emphasis: "standard", monogram: "Cl" },
        { id: "ai-design", name: "AI-Assisted Design", proficiency: "Experienced", emphasis: "standard", monogram: "Ad" },
        { id: "ai-prompt", name: "AI Prompt Engineering", proficiency: "Experienced", emphasis: "standard", monogram: "Ap" },
        { id: "ai-auto", name: "AI Automation (Learning)", proficiency: "Learning", emphasis: "standard", monogram: "Au" }
      ]
    }
  ];

  // Dynamic Lucide selection helper with fallback
  const getToolIcon = (id: string) => {
    switch(id) {
      case 'figma': return Palette;
      case 'prod-design': return PenTool;
      case 'ui-ux': return Compass;
      case 'user-res': return Users;
      case 'prototyping': return Box;
      case 'wireframing': return Grid;
      case 'des-systems': return Layers;
      case 'usability': return Search;
      
      case 'illustrator': return PenTool;
      case 'canva': return Image;
      case 'blender': return Box;
      case 'photoshop': return Layers;
      case 'davinci': return Video;
      case 'affinity': return PenTool;
      
      case 'html': return FileCode;
      case 'css': return Palette;
      case 'js': return Code2;
      case 'ts': return Terminal;
      case 'react': return Blocks;
      case 'nextjs': return Globe;
      case 'php': return FileCode;
      case 'msaccess': return Database;
      
      case 'wordpress': return Globe;
      case 'webflow': return Globe;
      
      case 'chatgpt': return Sparkles;
      case 'gemini': return Cpu;
      case 'claude': return Sparkles;
      case 'ai-design': return Palette;
      case 'ai-prompt': return Terminal;
      case 'ai-auto': return RefreshCw;
      default: return Wrench;
    }
  };

  // Safe sorting to keep highest priority visual flow
  const orderOfEmphasis = { highest: 0, medium: 1, standard: 2, lower: 3 };
  const sortedCategories = categories.map(cat => ({
    ...cat,
    items: [...cat.items].sort((a, b) => orderOfEmphasis[a.emphasis] - orderOfEmphasis[b.emphasis])
  }));

  // ==========================================
  // 1. TEMPLATE: MINIMALISM
  // ==========================================
  if (template === 'minimalism') {
    return (
      <div className="max-w-4xl mx-auto pb-12 font-sans text-gray-900 space-y-12">
        {/* Clean, Humanistic Header */}
        <div className="space-y-2 pt-2">
          <p className="text-[10px] font-mono uppercase tracking-widest text-black font-extrabold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            Active Capabilities Directory
          </p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-950 leading-none">
            {pageTitle}
          </h1>
          <p className="text-xs text-gray-500 font-sans leading-relaxed tracking-normal max-w-xl mt-1.5 font-medium">
            {pageSubtitle}
          </p>
        </div>

        <div className="border-t border-gray-150 my-6" />

        {/* Modular responsive list category sections */}
        <div className="space-y-10">
          {sortedCategories.map((cat, groupIdx) => (
            <div key={cat.title} className="space-y-4">
              <div className="border-b border-gray-150 pb-2">
                <span className="text-[10px] font-mono tracking-widest text-gray-400 font-black uppercase block">
                  0{groupIdx + 1} &bull; {cat.title}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.items.map((tool) => {
                  const isHighest = tool.emphasis === 'highest';
                  const isMedium = tool.emphasis === 'medium';
                  const isLower = tool.emphasis === 'lower';
                  const Icon = getToolIcon(tool.id);

                  // Setup premium uniform active card design
                  let cardBorder = "border-gray-200 bg-white shadow-xs hover:border-gray-400 hover:shadow-sm";
                  let titleStyle = "text-gray-950 font-bold text-sm";

                  let badgeColor = "bg-gray-100 text-gray-600";
                  if (tool.proficiency === 'Core') {
                    badgeColor = "bg-black text-white";
                  } else if (tool.proficiency === 'Learning') {
                    badgeColor = "bg-yellow-50 text-amber-700 border border-amber-200 border-dashed";
                  } else if (tool.proficiency === 'Working Knowledge') {
                    badgeColor = "bg-gray-50 text-gray-500 border border-gray-200";
                  }

                  return (
                    <div 
                      key={tool.id} 
                      className={`p-3.5 rounded border transition-all duration-300 flex items-center justify-between gap-3 ${cardBorder}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Compact icon holder */}
                        <div className={`w-[28px] h-[28px] rounded flex items-center justify-center shrink-0 ${isHighest ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'}`}>
                          <Icon size={14} />
                        </div>

                        <div className="min-w-0">
                          <span className={`block font-bold leading-tight ${titleStyle}`}>
                            {tool.name}
                          </span>
                          {isHighest && (
                            <span className="text-[8px] font-mono text-gray-400 font-bold uppercase tracking-wider block mt-0.5">Specialization</span>
                          )}
                          {isMedium && (
                            <span className="text-[8px] font-mono text-gray-400 font-bold uppercase tracking-wider block mt-0.5">Strong Competency</span>
                          )}
                        </div>
                      </div>

                      {/* Proficiendy Badge */}
                      <span className={`text-[8.5px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0 select-none ${badgeColor}`}>
                        {tool.proficiency}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
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

        {/* Categorized blocks with bold shadows */}
        <div className="space-y-16">
          {sortedCategories.map((cat, catIdx) => (
            <div key={cat.title} className="space-y-6">
              <div className="flex flex-col gap-1 border-b-4 border-gray-950 pb-2">
                <h2 className="text-2xl font-sans font-black uppercase text-gray-950 tracking-tight">
                  {cat.title}
                </h2>
              </div>

              {/* Grid with visual hierarchy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cat.items.map((tool) => {
                  const isHighest = tool.emphasis === 'highest';
                  const Icon = getToolIcon(tool.id);

                  let boxStyle = "border-4 border-gray-950 bg-white p-5 rounded-none";
                  if (isHighest) {
                    boxStyle = "border-4 border-gray-950 bg-zinc-50 p-6 rounded-none";
                  }

                  let badgeStyle = "bg-white text-gray-950 border-2 border-gray-950";
                  if (tool.proficiency === 'Core') {
                    badgeStyle = "bg-gray-950 text-white border-2 border-gray-950 font-black";
                  } else if (tool.proficiency === 'Learning') {
                    badgeStyle = "bg-white text-gray-500 border border-gray-350";
                  }

                  return (
                    <div 
                      key={tool.id} 
                      className={`hover:bg-gray-50 transition-colors duration-200 flex flex-col justify-between gap-5 ${boxStyle}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h4 className="font-sans font-black text-lg sm:text-2xl text-gray-950 uppercase tracking-tighter leading-tight break-words">
                            {tool.name}
                          </h4>
                        </div>
                        <div className="w-10 h-10 bg-gray-100 border-2 border-gray-950 flex items-center justify-center shrink-0 rounded-none text-gray-950 font-black">
                          <Icon size={16} />
                        </div>
                      </div>

                      <div className="flex items-center justify-end mt-2 pt-3 border-t-2 border-gray-950">
                        <span className={`text-[9.5px] font-mono uppercase px-2 py-0.5 rounded-none font-black ${badgeStyle}`}>
                          {tool.proficiency}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // 3. TEMPLATE: FUTURISTIC
  // ==========================================
  return (
    <div className="max-w-4xl mx-auto pb-16 font-mono text-[#00FF88] space-y-12">
      {/* Authentic, Human-led HUD terminal display header */}
      <div className="space-y-2 pt-4 border-l-2 border-[#00FF88]/40 pl-4 bg-[#00FF88]/2 relative">
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-wider uppercase filter drop-shadow-[0_0_8px_var(--page-accent)]">
          {pageTitle}
        </h1>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
          {pageSubtitle}
        </p>
        <div className="h-[2px] bg-gradient-to-r from-[var(--page-accent)] via-cyan-500 to-transparent relative mt-1" />
      </div>

      <div className="space-y-12">
        {sortedCategories.map((cat, sectionIdx) => (
          <div key={cat.title} className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#00FF88]/30 pb-1.5">
              <span className="text-[9px] font-black uppercase text-white tracking-widest">
                [ SECTION 0{sectionIdx + 1} &bull; {cat.title} ]
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cat.items.map((tool) => {
                const isHighest = tool.emphasis === 'highest';
                const isMedium = tool.emphasis === 'medium';
                const isLower = tool.emphasis === 'lower';
                const Icon = getToolIcon(tool.id);

                let cardBorder = "border-[#00FF88]/20 bg-black/40 hover:border-[#00FF88]/45 hover:shadow-[0_0_8px_rgba(0,255,136,0.05)]";
                let pulseAnim = "";
                let titleGlow = "text-gray-100";
                let badgeStyle = "bg-[#00FF88]/10 text-[#00FF88]/80 border border-[#00FF88]/20";

                if (isHighest) {
                  cardBorder = "border-[#00FF88]/60 bg-black/50 shadow-[0_0_12px_rgba(0,255,136,0.12)]";
                  pulseAnim = "animate-pulse hover:animate-none";
                  titleGlow = "text-white filter drop-shadow-[0_0_4px_rgba(0,255,136,0.4)]";
                  badgeStyle = "bg-[#00FF88]/15 text-[#00FF88] border border-[#00FF88]/40 font-black";
                }

                if (tool.proficiency === 'Learning') {
                  badgeStyle = "bg-amber-500/10 text-amber-500 border border-dashed border-amber-500/30";
                } else if (tool.proficiency === 'Working Knowledge') {
                  badgeStyle = "bg-zinc-800/40 text-gray-300 border border-gray-700/50";
                }

                return (
                  <div 
                    key={tool.id}
                    className={`p-4 rounded-xl border relative overflow-hidden flex flex-col justify-between transition-all duration-300 group ${cardBorder} ${pulseAnim}`}
                  >
                    {/* Minimal HUD corners */}
                    <span className="absolute top-1 left-1 text-[6.5px] text-[#00FF88]/25 font-black">┌</span>
                    <span className="absolute bottom-1 left-1 text-[6.5px] text-[#00FF88]/25 font-black">└</span>
                    <span className="absolute top-1 right-1 text-[6.5px] text-[#00FF88]/25 font-black">┐</span>
                    <span className="absolute bottom-1 right-1 text-[6.5px] text-[#00FF88]/25 font-black">┘</span>

                    {/* Top bar HUD styling */}
                    <div className="flex justify-between items-center text-[7.5px] text-gray-500 font-mono tracking-widest uppercase">
                      <span>{tool.monogram}</span>
                      <span className={isHighest ? 'text-[#00FF88] font-bold' : ''}>
                        {isHighest ? 'CORE' : isLower ? 'AUX' : 'ACTIVE'}
                      </span>
                    </div>

                    {/* Core visual icon + title */}
                    <div className="flex items-center gap-3.5 my-3">
                      <div className={`w-8 h-8 rounded border flex items-center justify-center shrink-0 ${
                        isHighest ? 'border-[#00FF88]/40 text-[#00FF88] bg-black' : 'border-zinc-850 text-gray-400 bg-zinc-950/40'
                      }`}>
                        <Icon size={14} className="filter drop-shadow-[0_0_2px_currentColor]" />
                      </div>

                      <div className="min-w-0">
                        <h4 className={`font-black text-xs uppercase tracking-wider group-hover:text-white transition-colors leading-tight break-words ${titleGlow}`}>
                          {tool.name}
                        </h4>
                        <span className="text-[7.5px] text-gray-500 block font-mono mt-1">
                          {isHighest ? "SPECIALIZATION" : isMedium ? "STRONG STRENGTH" : "UTILITY"}
                        </span>
                      </div>
                    </div>

                    {/* Bottom proficiency marker */}
                    <div className="mt-2 pt-2 border-t border-[#00FF88]/5 flex justify-between items-center">
                      <span className="text-[7.5px] text-gray-650">SYS::{tool.monogram}</span>
                      <span className={`text-[8.5px] font-mono uppercase px-1.5 py-0.5 rounded ${badgeStyle}`}>
                        {tool.proficiency}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
