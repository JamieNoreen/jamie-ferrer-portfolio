/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { TemplateType } from "../../types";
import {
  Award,
  Palette,
  GraduationCap,
  Sparkles,
  CheckSquare,
  Target,
  Activity,
  User,
  Coffee,
  Utensils,
  Trophy,
  Star,
  Cpu,
  Mic,
} from "lucide-react";

interface PageProps {
  template: TemplateType;
}

export default function AboutPage({ template }: PageProps) {
  const [images, setImages] = useState({
    minimalist: true,
    editorial: true,
    futuristic: true,
  });

  // Common details to preserve exactly the same content
  const bioTitle = "Hi, I'm Jamie!";
  const bioRole = "Product Designer & Hackathon Champion";
  const bioText =
    "I ask 'what if?' far too often. Somehow, it keeps turning into projects and awards.";

  const hobbies = [
    {
      icon: Utensils,
      title: "Cooking",
      desc: 'Constantly experimenting with healthier recipes and proving that "healthy" doesn\'t have to mean "sad."',
    },
    {
      icon: Coffee,
      title: "Exploring Cafes & Restaurants",
      desc: "I enjoy discovering new places through Tiktok and try it once the hype died!",
    },
    {
      icon: Mic,
      title: "Singing",
      desc: "I don't have a favorite genre. If it sounds good, it's immediately my personality for the next three days.",
    },
  ];

  const awards = [
    {
      icon: Trophy,
      title: "12+ Awards Won",
      desc: "Recognized excellence across national and international events.",
    },
    {
      icon: Cpu,
      title: "4× Hackathon Winner",
      desc: "Local & International design and code hack sprints.",
    },
    {
      icon: GraduationCap,
      title: "Summa Cum Laude",
      desc: "Top-tier academic excellence in Computer Science.",
    },
    {
      icon: Star,
      title: "DOST Scholar & University Scholar",
      desc: "Prestigious national science and university scholarship programs.",
    },
  ];

  const motto = "“Live your life beautifully. You only have one chance.”";
  const obsessionTitle = "Current Obsessions";
  const obsessionDesc =
    "Calorie tracking with Gemini • Practicing speaking skills through TalkGPT";

  // ==========================================
  // 1. TEMPLATE: MINIMALISM
  // ==========================================
  if (template === "minimalism") {
    return (
      <div className="max-w-3xl mx-auto pb-2 font-sans text-gray-900 space-y-12">
        {/* Top Header: Name & Role */}
        <div className="space-y-2 pt-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-gray-900 leading-none">
            {bioTitle}
          </h1>
        </div>

        <div className="border-t border-gray-200" />

        {/* Bio row with image flush */}
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 bg-gray-100 border border-gray-200 overflow-hidden select-none relative">
            {images.minimalist ? (
              <img
                src="/portfolio-assets/about/minimalist.webp"
                alt="Jamie Ferrer Minimalist Portrait"
                onError={() =>
                  setImages((prev) => ({ ...prev, minimalist: false }))
                }
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-mono text-xl font-bold tracking-wider text-gray-400 bg-gray-50/50">
                JF
              </div>
            )}
          </div>
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 font-medium">
              Curious by default.
            </p>
            <p className="text-base text-gray-700 leading-relaxed font-sans max-w-xl">
              {bioText}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200" />

        {/* Dynamic content sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Hobbies - single column list without cards */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-gray-900 mt-1">
                Hobbies
              </h2>
            </div>
            <div className="divide-y divide-gray-150">
              {hobbies.map((h, i) => {
                return (
                  <div key={i} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--page-accent)] mt-2 shrink-0" />
                    <div>
                      <h3 className="font-bold text-sm text-gray-800">
                        {h.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{h.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Awards - simple rows */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-gray-900 mt-1">
                Awards & Achievements
              </h2>
            </div>
            <div className="divide-y divide-gray-150">
              {awards.map((a, i) => {
                return (
                  <div
                    key={i}
                    className="py-3.5 first:pt-0 last:pb-0 flex gap-4"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                    <div>
                      <h3 className="font-bold text-sm text-gray-800">
                        {a.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">{a.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200" />

        {/* Motto section formatted with clean typography */}
        <div className="space-y-2 py-2">
          <p className="text-lg font-serif italic text-gray-800 leading-relaxed text-center">
            {motto}
          </p>
        </div>

        <div className="border-t border-gray-200" />

        {/* Current Obsession */}
        <div className="space-y-2 py-2">
          <div className="flex gap-3 items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--page-accent)] shrink-0" />
            <p className="text-xs text-gray-700 leading-relaxed font-semibold">
              <span className="text-gray-900 font-bold">{obsessionTitle}:</span>{" "}
              {obsessionDesc}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. TEMPLATE: CREATIVE/EDITORIAL
  // ==========================================
  if (template === "editorial") {
    return (
      <div className="max-w-4xl mx-auto pb-2 font-sans text-gray-900 space-y-12">
        {/* Giant name in bold Swiss typography */}
        <div className="text-left pt-6 pb-2 border-b-4 border-gray-950">
          <h1 className="text-5xl md:text-7xl font-sans font-black uppercase text-gray-950 tracking-tighter leading-none">
            {bioTitle}
          </h1>
        </div>

        {/* Interactive row: Flat sharp-cornered portrait + bio poster card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 items-stretch">
          {/* Square sharp portrait banner styled like a museum poster detail */}
          <div className="md:col-span-4 border-4 border-gray-950 bg-white p-4 rounded-none flex flex-col justify-center">
            <div className="w-full aspect-square bg-gray-100 overflow-hidden relative border-2 border-gray-950 rounded-none">
              {images.editorial ? (
                <img
                  src="/portfolio-assets/about/creative.webp"
                  alt="Jamie Ferrer Creative Portrait"
                  onError={() =>
                    setImages((prev) => ({ ...prev, editorial: false }))
                  }
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center relative rounded-none">
                  <span className="text-4xl text-gray-950">👩‍💻</span>
                </div>
              )}
            </div>
          </div>

          {/* Stark Swiss bio typographic card */}
          <div className="md:col-span-8 border-4 border-gray-950 bg-white p-6 rounded-none flex flex-col justify-between">
            <div>
              <p className="text-xl md:text-2xl font-sans font-black uppercase tracking-tight leading-snug text-gray-950">
                {bioText}
              </p>
            </div>
          </div>
        </div>

        {/* Bold Full-Width Swiss Banner block */}
        <div className="w-full border-4 border-gray-950 bg-gray-950 p-6 rounded-none text-left flex flex-col justify-between">
          <p className="text-2xl md:text-4xl font-sans font-black uppercase tracking-tighter text-white leading-none">
            “Part-time designer. Full-time overthinker.”
          </p>
        </div>

        {/* Hobbies & Accolades Swiss grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Hobbies structured Swiss post block */}
          <div className="bg-white border-4 border-gray-950 p-6 rounded-none relative">
            <div className="mb-6 border-b-2 border-gray-900 pb-4">
              <h2 className="text-3xl font-sans font-black uppercase tracking-tighter text-gray-950 leading-none">
                Hobbies
              </h2>
            </div>
            <div className="space-y-6">
              {hobbies.map((h, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start p-4 hover:bg-gray-50 border-2 border-gray-950 bg-white rounded-none transition-colors"
                >
                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center text-gray-900 shrink-0 border-2 border-gray-950 rounded-none">
                    <h.icon size={18} className="shrink-0" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-black text-xs uppercase tracking-wide text-gray-950">
                      {h.title}
                    </h3>
                    <p className="text-xs text-gray-655 mt-1 leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards structured Swiss post block */}
          <div className="bg-white border-4 border-gray-950 p-6 rounded-none relative">
            <div className="mb-6 border-b-2 border-gray-900 pb-4">
              <h2 className="text-3xl font-sans font-black uppercase tracking-tighter text-gray-950 leading-none">
                Accolades
              </h2>
            </div>
            <div className="space-y-4">
              {awards.map((a, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start p-4 hover:bg-gray-50 border-2 border-gray-950 bg-white rounded-none transition-colors"
                >
                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center text-gray-900 shrink-0 border-2 border-gray-950 rounded-none">
                    <a.icon size={18} className="shrink-0" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-xs uppercase tracking-wide text-gray-950 leading-tight">
                      {a.title}
                    </h3>
                    <p className="text-xs text-gray-655 mt-1 leading-normal">
                      {a.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Motto section formatted in Swiss Typographic print layout */}
        <div className="bg-white border-4 border-gray-950 p-6 md:p-8 rounded-none relative overflow-hidden">
          <p className="text-3xl md:text-5xl font-sans font-black uppercase tracking-tighter text-gray-950 leading-none text-center">
            {motto}
          </p>
        </div>

        {/* Current Obsession */}
        <div className="bg-white border-4 border-gray-950 p-5 rounded-none flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 border-2 border-gray-950 flex items-center justify-center text-gray-900 shrink-0 rounded-none">
              <Sparkles size={20} className="shrink-0" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase font-black tracking-widest text-gray-950">
                Current Obsession
              </p>
              <p className="text-xs text-gray-700 font-bold uppercase mt-1">
                {obsessionTitle}: {obsessionDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 3. TEMPLATE: FUTURISTIC
  // ==========================================
  return (
    <div className="max-w-4xl mx-auto pb-2 font-mono text-[#00FF88] space-y-12">
      {/* Top Header with terminal/matrix scanning display */}
      <div className="space-y-3 pt-6 relative border-l-2 border-[#00FF88]/40 pl-4 py-1.5 bg-[#00FF88]/2">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase">
          {bioTitle}
        </h1>
        {/* Glow scanning line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#00FF88] to-transparent relative animate-pulse shadow-[0_0_8px_#00FF88] mt-1" />
      </div>

      {/* Grid: Circle neon portrait + Glowing bio panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
        {/* Neon target frame profile layout */}
        <div className="col-span-1 md:col-span-4 flex justify-center">
          <div className="relative group p-1.5 border border-[#00FF88]/40 rounded-xl bg-black/40 shadow-[0_0_20px_rgba(0,255,136,0.15)]">
            {/* HUD Bracket decorators */}
            <span className="absolute -top-1 -left-1 text-xs text-[#00FF88] font-black font-mono">
              ┌
            </span>
            <span className="absolute -top-1 -right-1 text-xs text-[#00FF88] font-black font-mono">
              ┐
            </span>
            <span className="absolute -bottom-1 -left-1 text-xs text-[#00FF88] font-black font-mono">
              └
            </span>
            <span className="absolute -bottom-1 -right-1 text-xs text-[#00FF88] font-black font-mono">
              ┘
            </span>

            <div className="w-32 h-32 md:w-40 md:h-40 bg-black flex flex-col items-center justify-center border border-[#00FF88]/30 rounded-lg relative overflow-hidden">
              {images.futuristic ? (
                <img
                  src="/portfolio-assets/about/futuristic.webp"
                  alt="Jamie Ferrer Futuristic Portrait"
                  onError={() =>
                    setImages((prev) => ({ ...prev, futuristic: false }))
                  }
                  className="w-full h-full object-cover filter brightness-90 saturate-125 border border-[#00FF88]/20"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <Cpu
                  size={36}
                  className="text-[#00FF88] animate-pulse filter drop-shadow-[0_0_8px_var(--page-accent)]"
                />
              )}
            </div>
          </div>
        </div>

        {/* Bio inside glowing console panel */}
        <div className="col-span-1 md:col-span-8">
          <div className="p-6 rounded-xl border border-[#00FF88]/20 bg-gradient-to-br from-[#11111B] to-black/40 text-gray-300 shadow-[0_0_15px_rgba(3,255,136,0.05)] relative">
            <p className="text-xs md:text-sm font-mono leading-relaxed text-gray-300">
              {bioText}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#00FF88]/30 to-transparent shadow-[0_0_10px_rgba(0,255,136,0.1)]" />

      {/* Grid panels of data modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Hobbies Cyber-Grid Panel */}
        <div className="p-6 rounded-xl border border-[#00FF88]/20 bg-[#11111b]/80 shadow-[0_0_15px_rgba(0,255,136,0.05)] text-white">
          <div className="flex items-center justify-between mb-4 border-b border-[#00FF88]/20 pb-2.5">
            <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-[#00FF88]">
              <Palette size={14} /> Hobbies
            </h2>
          </div>
          <div className="space-y-4">
            {hobbies.map((h, i) => {
              const HobbyIcon = h.icon;
              return (
                <div
                  key={i}
                  className="flex gap-4 items-start p-2.5 border border-[#00FF88]/10 rounded-lg bg-black/30 hover:bg-black/55 transition-colors"
                >
                  <HobbyIcon
                    size={16}
                    className="text-[#00FF88] mt-1 shrink-0 filter drop-shadow-[0_0_4px_var(--page-accent)]"
                  />
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-xs text-[#00FF88] uppercase">
                      {h.title}
                    </h3>
                    <p className="text-[10px] text-gray-400 mt-1 leading-normal">
                      {h.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Awards Cyber-Grid Panel */}
        <div className="p-6 rounded-xl border border-[#00FF88]/20 bg-[#11111b]/80 shadow-[0_0_15px_rgba(0,255,136,0.05)] text-white">
          <div className="flex items-center justify-between mb-4 border-b border-[#00FF88]/20 pb-2.5">
            <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-white">
              <Award size={14} className="text-[#00FF88]" /> Awards &
              Achievements
            </h2>
          </div>
          <div className="space-y-3">
            {awards.map((a, i) => {
              const AwardIcon = a.icon;
              return (
                <div
                  key={i}
                  className="flex gap-3 items-start p-2 border border-[#00FF88]/10 rounded-lg bg-black/30 hover:bg-black/50 transition-colors"
                >
                  <AwardIcon
                    size={16}
                    className="text-[#00FF88] mt-1 shrink-0 filter drop-shadow-[0_0_4px_var(--page-accent)]"
                  />
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-xs text-white leading-tight uppercase">
                      {a.title}
                    </h3>
                    <p className="text-[10px] text-[#00FF88]/80 mt-1">
                      {a.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Daily Motto Display Box */}
      <div className="p-6 border border-[#00FF88]/20 rounded-xl bg-black/60 relative overflow-hidden shadow-[inset_0_0_12px_rgba(0,255,136,0.1)]">
        <p className="text-lg md:text-2xl font-black text-white italic tracking-wide leading-relaxed z-10 relative text-glow text-center">
          {motto}
        </p>
      </div>

      {/* Current Obsession */}
      <div className="p-5 rounded-xl border border-[#00FF88]/20 bg-black/30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="w-3.5 h-3.5 rounded-full bg-[#00FF88] animate-ping shrink-0" />
          <div>
            <p className="text-[8px] font-bold uppercase tracking-widest text-[#00FF88]/50">
              CURRENT OBSESSION
            </p>
            <p className="text-xs text-gray-300 font-bold tracking-tight uppercase mt-0.5">
              {obsessionTitle} :: {obsessionDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
