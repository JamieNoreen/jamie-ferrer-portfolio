/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TemplateType } from "../../types";
import {
  Award,
  Trophy,
  Star,
  Shield,
  ArrowUpRight,
  Compass,
  Target,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Cpu,
  Tv,
  Bookmark,
  Sparkles,
} from "lucide-react";

interface AchievementsPageProps {
  template: TemplateType;
}

// Interactive Featured Awards with metadata
interface FeaturedAward {
  id: string;
  title: string;
  achievement: string;
  year: string;
  category: string;
  description: string;
  placeholderLabel: string;
  imgGradient: string;
  highlightIcon: React.ReactNode;
  image: string;
}

// Standalone animated number component for numerical statistics
function AnimatedNumber({
  value,
  suffix = "",
  delay = 0,
}: {
  value: number;
  suffix?: string;
  delay?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const duration = 1000; // ms
    const timer = setTimeout(() => {
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
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

export default function AchievementsPage({ template }: AchievementsPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const pageTitle = "Achievements & Awards";
  const pageSubtitle =
    "Chronology of academic excellence, national hackathons, and global recognitions";

  // 5 Curated Featured Achievements for Carousel (Visual Highlight Reel)
  const FEATURED_AWARDS: FeaturedAward[] = [
    {
      id: "bluhacks",
      title: "Bluhacks Hackathon",
      achievement: "Champion",
      year: "2024",
      category: "Innovation & Hackathons",
      description:
        "Pedestrian navigation platform helping commuters discover safer and more walkable routes.",
      placeholderLabel:
        "Champion Presentation Slide, Trophy & Team Stage Photo",
      imgGradient: "from-[#0A0F1D] via-[#121A2E] to-[#1E2B4B]",
      highlightIcon: <Trophy className="w-5 h-5" />,
      image: "/portfolio-assets/awards/bluhacks.JPEG",
    },
    {
      id: "neda-habi",
      title: "NEDA-HABI Public Administration Workshop",
      achievement: "Champion",
      year: "2024",
      category: "Innovation & Hackathons",
      description:
        "AI-powered SMS chatbot improving access to barangay services and government information.",
      placeholderLabel:
        "NEDA Workshop Team Certificate & Champion Presentation",
      imgGradient: "from-[#110C1B] via-[#1B142F] to-[#2B1F47]",
      highlightIcon: <Star className="w-5 h-5" />,
      image: "/portfolio-assets/awards/habi.png",
    },
    {
      id: "ph-startup-challenge",
      title: "Philippine Startup Challenge",
      achievement: "2× 2nd Runner-Up • Best Pitch • Best Logo",
      year: "2024",
      category: "Innovation & Hackathons",
      description:
        "Study-buddy matchmaking platform connecting students with compatible learning partners.",
      placeholderLabel:
        "PSC Award Plaque, Finalist Presentation & Brand Decals",
      imgGradient: "from-[#1C0D11] via-[#30161C] to-[#4C232D]",
      highlightIcon: <Award className="w-5 h-5" />,
      image: "/portfolio-assets/awards/psc.png",
    },
    {
      id: "asean-dse",
      title: "ASEAN Data Science Explorers",
      achievement: "2nd Runner-Up",
      year: "2024",
      category: "International & Regional Recognition",
      description:
        "AI-powered agriculture platform helping farmers detect crop diseases and access farming support.",
      placeholderLabel: "ASEAN DSE Award Ceremony & National Delegate Badge",
      imgGradient: "from-[#0F172A] via-[#1E293B] to-[#334155]",
      highlightIcon: <Compass className="w-5 h-5" />,
      image: "/portfolio-assets/awards/asean.png",
    },
    {
      id: "sas-curiosity",
      title: "SAS Curiosity Cup 2025",
      achievement: "22nd out of 112 International Teams",
      year: "2025",
      category: "International & Regional Recognition",
      description:
        "Data science project transforming real-world datasets into actionable insights and recommendations.",
      placeholderLabel:
        "Global Team Certificate & SAS Viya UI Analysis Showcase",
      imgGradient: "from-[#0d1e2e] via-[#153047] to-[#1d4461]",
      highlightIcon: <Target className="w-5 h-5" />,
      image: "/portfolio-assets/awards/sas.jpg",
    },
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) =>
      prev === FEATURED_AWARDS.length - 1 ? 0 : prev + 1,
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? FEATURED_AWARDS.length - 1 : prev - 1,
    );
  };

  // Structured Categories as fully requested
  const CATEGORIES = [
    {
      title: "Innovation & Hackathons",
      awards: [
        {
          name: "Bluhacks Hackathon",
          placing: "Champion",
          details:
            "Pedestrian navigation platform helping commuters discover safer and more walkable routes.",
          most: true,
        },
        {
          name: "NEDA-HABI Public Administration Workshop",
          placing: "Champion",
          details:
            "AI-powered SMS chatbot improving access to barangay services and government information.",
          most: true,
        },
        {
          name: "Philippine Startup Challenge",
          placing: "2× 2nd Runner-Up • Best Pitch • Best Logo",
          details:
            "Study-buddy matchmaking platform connecting students with compatible learning partners.",
          most: false,
        },
        {
          name: "SikatPala Hackathon",
          placing: "5th Place",
          details:
            "Pedestrian navigation platform helping commuters discover safer and more walkable routes.",
          most: false,
        },
        {
          name: "ByteForward Hackathon",
          placing: "Top 10 Finalist",
          details:
            "Voice-assisted platform helping jeepney drivers digitize and manage operational data.",
          most: false,
        },
        {
          name: "Coding Dojo Women in Tech",
          placing: "2nd Place",
          details:
            "Smart bra prototype concept designed to support early breast tumor detection through wearable technology.",
          most: false,
        },
      ],
    },
    {
      title: "International & Regional Recognition",
      awards: [
        {
          name: "ASEAN Data Science Explorers",
          placing: "2nd Runner-Up",
          details:
            "AI-powered agriculture platform helping farmers detect crop diseases and access farming support.",
          most: true,
        },
        {
          name: "SAS Curiosity Cup 2025",
          placing: "22nd out of 112 International Teams",
          details:
            "Data science project transforming real-world datasets into actionable insights and recommendations.",
          most: true,
        },
      ],
    },
    {
      title: "Media & Communication",
      awards: [
        {
          name: "ASEAN Route to the Future Challenge",
          placing: "Champion",
          details: "",
          most: false,
        },
        {
          name: "ASEAN DSE Video Campaign",
          placing: "Champion",
          details: "",
          most: false,
        },
        {
          name: "ROKtoASEAN Video Competition",
          placing: "2nd Runner-Up",
          details: "",
          most: false,
        },
      ],
    },
    {
      title: "Academic Distinctions",
      awards: [
        {
          name: "Summa Cum Laude",
          placing: "Highest Latin Honors",
          details: "",
          most: true,
        },
        {
          name: "DOST Scholar",
          placing: "Academic Merit",
          details: "",
          most: false,
        },
        {
          name: "University Scholar",
          placing: "Consistent President's Lister",
          details: "",
          most: false,
        },
        {
          name: "Best in Thesis",
          placing: "Outstanding Implementation",
          details: "",
          most: false,
        },
      ],
    },
  ];

  // ==========================================
  // 1. STYLE VARIATIONS FOR TEMPLATE: MINIMALISM
  // ==========================================
  if (template === "minimalism") {
    return (
      <div className="max-w-4xl mx-auto pb-16 font-sans text-gray-900 select-none px-4">
        {/* Document Header */}
        <div className="border-b border-gray-150 pb-6 mb-10 text-left">
          <h1 className="text-3xl font-normal text-gray-900 font-outfit uppercase tracking-tight">
            Achievements & Awards
          </h1>
          <p className="text-xs text-gray-500 font-sans mt-2 max-w-xl font-medium tracking-normal leading-relaxed">
            Curated highlight reel of international competitions, national
            development hackathons, and high academic honors.
          </p>
        </div>

        {/* Hero Statistics Row (Minimalism: Borderless panels with subtle dividers) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-b border-gray-150 mb-12">
          <div className="flex flex-col border-r border-gray-100 last:border-0 pr-4">
            <span className="text-3xl font-outfit font-bold tracking-tight text-gray-900">
              <AnimatedNumber value={12} suffix="+" />
            </span>
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mt-1.5 font-mono">
              Awards Won
            </span>
          </div>

          <div className="flex flex-col border-r border-gray-100 last:border-0 pr-4">
            <span className="text-3xl font-outfit font-bold tracking-tight text-gray-900">
              <AnimatedNumber value={4} suffix="×" />
            </span>
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mt-1.5 font-mono">
              Hackathon Champ
            </span>
          </div>

          <div className="flex flex-col border-r border-gray-100 last:border-0 pr-4">
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-xl sm:text-2xl md:text-3xl font-outfit font-bold tracking-tight text-gray-900 truncate pr-1"
            >
              SUMMA
            </motion.span>
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mt-1.5 font-mono">
              Cum Laude
            </span>
          </div>

          <div className="flex flex-col">
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-xl sm:text-2xl md:text-3xl font-outfit font-bold tracking-tight text-gray-900 truncate pr-1"
            >
              DOST
            </motion.span>
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mt-1.5 font-mono">
              Scholar
            </span>
          </div>
        </div>

        {/* Featured Achievements Gallery Carousel */}
        <div className="mb-14">
          <h2 className="text-xs font-mono font-black tracking-widest text-gray-400 uppercase mb-4">
            FEATURED HIGHLIGHT REEL
          </h2>

          <div className="relative border border-gray-200 bg-white rounded-2xl overflow-hidden p-4 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Column: Carousel Image */}
              <div className="md:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.4 }}
                    className="aspect-video w-full rounded-xl bg-gray-50 border border-gray-250 relative group flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={FEATURED_AWARDS[currentSlide].image}
                      alt={FEATURED_AWARDS[currentSlide].title}
                      className="w-full h-full object-cover"
                    />
                    {/* Floating year indicator */}
                    <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono tracking-wider text-gray-950 border border-gray-200">
                      {FEATURED_AWARDS[currentSlide].year}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Column: Carousel Description Metadata */}
              <div className="md:col-span-5 flex flex-col justify-between h-full py-2 pr-2 md:pr-5">
                <div>
                  <div className="text-[10px] font-mono text-gray-400 tracking-widest uppercase mb-1.5">
                    {FEATURED_AWARDS[currentSlide].category}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-outfit font-bold text-gray-900 leading-tight">
                        {FEATURED_AWARDS[currentSlide].title}
                      </h3>
                      <div className="inline-block bg-gray-100 text-gray-700 text-[11px] font-mono font-bold px-2.5 py-0.5 mt-2 rounded">
                        {FEATURED_AWARDS[currentSlide].achievement}
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed font-sans mt-4 max-w-sm">
                        {FEATURED_AWARDS[currentSlide].description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Carousel Navigation Actions */}
                <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrevSlide}
                      className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={handleNextSlide}
                      className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <span className="text-[10.5px] font-mono text-gray-400 font-bold">
                    0{currentSlide + 1} / 0{FEATURED_AWARDS.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed List of Categories */}
        <div className="space-y-12">
          {CATEGORIES.map((cat, ci) => (
            <div key={ci} className="space-y-4">
              <div className="border-b border-gray-200 pb-2">
                <h3 className="text-sm font-outfit font-bold uppercase tracking-wider text-gray-800">
                  {cat.title}
                </h3>
              </div>

              <div className="divide-y divide-gray-100">
                {cat.awards.map((award, ai) => (
                  <div
                    key={ai}
                    className={`py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between transition-all ${
                      award.most
                        ? "bg-gray-50/50 pl-3 border-l-2 border-black pr-1.5 my-1.5"
                        : "pl-1"
                    }`}
                  >
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center gap-2">
                        {award.most && (
                          <div className="w-1 h-1 rounded-full bg-black shrink-0" />
                        )}
                        <span
                          className={`text-sm ${award.most ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}
                        >
                          {award.name}
                        </span>
                      </div>
                      {award.details && (
                        <p className="text-xs text-gray-400 font-sans max-w-xl">
                          {award.details}
                        </p>
                      )}
                    </div>

                    <span className="hidden sm:inline flex-1 border-b border-dotted border-gray-150 mx-4" />

                    <div className="shrink-0 text-left sm:text-right mt-1 sm:mt-0">
                      <span className="text-xs font-mono font-bold text-gray-900 uppercase">
                        {award.placing}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. STYLE VARIATIONS FOR TEMPLATE: CREATIVE / EDITORIAL
  // ==========================================
  if (template === "editorial") {
    return (
      <div className="max-w-4xl mx-auto pb-20 font-sans text-gray-900 select-none px-4 space-y-16">
        {/* Stark Swiss Typographic Header */}
        <div className="text-left pt-6 pb-2 border-b-4 border-gray-950">
          <h1 className="text-4xl md:text-6xl font-sans font-black uppercase text-gray-950 tracking-tighter leading-none">
            {pageTitle}
          </h1>
          <p className="text-sm font-sans font-bold uppercase tracking-wider text-gray-600 mt-3">
            {pageSubtitle}
          </p>
        </div>

        {/* Stark Swiss Typography Hero Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="border-4 border-gray-950 bg-white px-3 py-6 sm:px-4 sm:py-6 md:p-6 rounded-none flex flex-col justify-between items-stretch text-left">
            <span className="text-[clamp(1.5rem,5vw,2.25rem)] font-black text-gray-950 tracking-tighter leading-none">
              <AnimatedNumber value={12} suffix="+" />
            </span>
            <span className="text-[9px] uppercase font-mono font-black text-gray-500 tracking-wider mt-4">
              AWARDS WON
            </span>
          </div>

          <div className="border-4 border-gray-950 bg-white px-3 py-6 sm:px-4 sm:py-6 md:p-6 rounded-none flex flex-col justify-between items-stretch text-left">
            <span className="text-[clamp(1.5rem,5vw,2.25rem)] font-black text-gray-950 tracking-tighter leading-none">
              <AnimatedNumber value={4} suffix="×" />
            </span>
            <span className="text-[9px] uppercase font-mono font-black text-gray-500 tracking-wider mt-4">
              HACKATHON WINS
            </span>
          </div>

          <div className="border-4 border-gray-950 bg-white px-3 py-6 sm:px-4 sm:py-6 md:p-6 rounded-none flex flex-col justify-between items-stretch text-left">
            <span className="text-[clamp(1rem,3.2vw,1.5rem)] font-black text-gray-950 tracking-tighter leading-none uppercase pt-1 pb-1">
              SUMMA
            </span>
            <span className="text-[9px] uppercase font-mono font-black text-gray-500 tracking-wider mt-4">
              ACADEMIC MERIT
            </span>
          </div>

          <div className="border-4 border-gray-950 bg-white px-3 py-6 sm:px-4 sm:py-6 md:p-6 rounded-none flex flex-col justify-between items-stretch text-left">
            <span className="text-[clamp(1.125rem,4vw,1.875rem)] font-black text-gray-950 tracking-tighter leading-none uppercase pt-1 pb-1">
              DOST
            </span>
            <span className="text-[9px] uppercase font-mono font-black text-gray-500 tracking-wider mt-4">
              STATE SCHOLAR
            </span>
          </div>
        </div>

        {/* Featured Achievements Gallery Carousel */}
        <div className="space-y-6">
          <div className="text-[10px] font-mono font-black tracking-widest text-gray-950 uppercase border-b-2 border-gray-950 pb-2">
            FEATURED HIGHLIGHTS
          </div>

          <div className="border-4 border-gray-950 bg-white rounded-none p-6 relative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              {/* Image Column */}
              <div className="md:col-span-7 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="aspect-video w-full rounded-none border-4 border-gray-950 bg-white relative flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={FEATURED_AWARDS[currentSlide].image}
                      alt={FEATURED_AWARDS[currentSlide].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-gray-900 text-white px-2.5 py-1 text-[10px] font-mono font-black border-2 border-gray-900">
                      {FEATURED_AWARDS[currentSlide].year}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Text Column */}
              <div className="md:col-span-5 flex flex-col justify-between py-1 pr-4 md:pr-6">
                <div>
                  <div className="text-[9px] font-mono font-black text-gray-500 tracking-widest uppercase mb-2">
                    {FEATURED_AWARDS[currentSlide].category}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <h3 className="font-sans font-black text-[clamp(1.25rem,4vw,1.875rem)] text-gray-950 uppercase tracking-tighter leading-none">
                        {FEATURED_AWARDS[currentSlide].title}
                      </h3>
                      <div className="inline-block bg-gray-950 text-white text-[10px] font-mono font-black px-2.5 py-1 uppercase rounded-none">
                        {FEATURED_AWARDS[currentSlide].achievement}
                      </div>
                      <p className="text-[clamp(0.75rem,2.5vw,0.875rem)] text-gray-655 leading-relaxed mt-2 pl-3 border-l-4 border-gray-950 font-sans font-medium">
                        {FEATURED_AWARDS[currentSlide].description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between mt-8 pt-4 border-t-2 border-gray-950">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevSlide}
                      className="p-2 rounded-none border-2 border-gray-950 bg-white hover:bg-gray-100 text-gray-955 transition-colors cursor-pointer"
                    >
                      <ChevronLeft size={16} className="stroke-[3]" />
                    </button>
                    <button
                      onClick={handleNextSlide}
                      className="p-2 rounded-none border-2 border-gray-950 bg-white hover:bg-gray-100 text-gray-955 transition-colors cursor-pointer"
                    >
                      <ChevronRight size={16} className="stroke-[3]" />
                    </button>
                  </div>

                  <span className="font-mono text-xs font-black text-white bg-gray-950 border-2 border-gray-950 px-3 py-1 rounded-none">
                    {currentSlide + 1} / {FEATURED_AWARDS.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Categories listed in blocks */}
        <div className="space-y-12">
          {CATEGORIES.map((cat, ci) => {
            return (
              <div
                key={ci}
                className="bg-white border-4 border-gray-950 rounded-none p-6 space-y-6"
              >
                <div className="border-b-4 border-gray-955 pb-3 flex items-baseline justify-between">
                  <h3 className="font-sans font-black text-2xl text-gray-950 tracking-tighter uppercase leading-none">
                    {cat.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                  {cat.awards.map((award, ai) => (
                    <div
                      key={ai}
                      className={`p-5 border-4 rounded-none transition-all flex flex-col justify-between ${
                        award.most
                          ? "border-gray-950 bg-zinc-50"
                          : "border-gray-250 bg-white"
                      }`}
                    >
                      <div>
                        <div className="flex items-baseline justify-between gap-2 mb-3">
                          <span className="text-xs font-mono font-black uppercase text-gray-950 italic">
                            {award.placing}
                          </span>
                        </div>

                        <h4 className="text-sm font-sans font-black text-gray-950 uppercase tracking-tight leading-snug">
                          {award.name}
                        </h4>
                        {award.details && (
                          <p className="text-xs text-gray-650 leading-snug mt-2 font-medium">
                            {award.details}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ==========================================
  // 3. STYLE VARIATIONS FOR TEMPLATE: FUTURISTIC
  // ==========================================
  return (
    <div className="max-w-4xl mx-auto pb-16 font-mono text-[#00FF88] select-none px-4 space-y-12">
      {/* HUD futuristic header */}
      <div className="space-y-2 pt-4 border-l-2 border-[#00FF88]/40 pl-4 bg-[#00FF88]/2 relative overflow-hidden rounded-r-xl">
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-widest uppercase filter drop-shadow-[0_0_8px_var(--page-accent)]">
          {pageTitle}
        </h1>
        <p className="text-[9px] text-[#00FF88]/60 uppercase tracking-widest pl-0.5">
          Curated timeline of national competitions, international hackathons,
          and academic honors.
        </p>
        <div className="h-[2px] bg-gradient-to-r from-[var(--page-accent)] via-cyan-500 to-transparent relative mt-1" />
      </div>

      {/* Hero Statistics Panels (Futuristic: Glowing HUD consoles) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-[var(--page-border)] bg-black/40 text-center relative overflow-hidden shadow-[inset_0_0_10px_rgba(0,255,136,0.05)]">
          <span className="text-[clamp(1.5rem,5vw,2.25rem)] font-black tracking-tighter text-white filter drop-shadow-[0_0_8px_#00FF88] block">
            <AnimatedNumber value={12} suffix="+" />
          </span>
          <span className="text-[8px] tracking-widest text-[#00FF88]/70 uppercase block mt-1">
            Awards Won
          </span>
        </div>

        <div className="p-4 rounded-xl border border-[var(--page-border)] bg-black/40 text-center relative overflow-hidden shadow-[inset_0_0_10px_rgba(0,255,136,0.05)]">
          <span className="text-[clamp(1.5rem,5vw,2.25rem)] font-black tracking-tighter text-white filter drop-shadow-[0_0_8px_#00FF88] block">
            <AnimatedNumber value={4} suffix="×" />
          </span>
          <span className="text-[8px] tracking-widest text-[#00FF88]/70 uppercase block mt-1">
            Hackathon Wins
          </span>
        </div>

        <div className="p-4 rounded-xl border border-[var(--page-border)] bg-black/40 text-center relative overflow-hidden shadow-[inset_0_0_10px_rgba(0,255,136,0.05)]">
          <span className="text-[clamp(1rem,3vw,1.5rem)] font-black tracking-wide text-cyan-400 block py-1.5 uppercase filter drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]">
            SUMMA
          </span>
          <span className="text-[8px] tracking-widest text-[#00FF88]/70 uppercase block mt-1">
            Cum Laude
          </span>
        </div>

        <div className="p-4 rounded-xl border border-[var(--page-border)] bg-black/40 text-center relative overflow-hidden shadow-[inset_0_0_10px_rgba(0,255,136,0.05)]">
          <span className="text-[clamp(1rem,3vw,1.5rem)] font-black tracking-wide text-cyan-400 block py-1.5 uppercase filter drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]">
            DOST
          </span>
          <span className="text-[8px] tracking-widest text-[#00FF88]/70 uppercase block mt-1">
            Scholar Merit
          </span>
        </div>
      </div>

      {/* Featured Achievements Gallery Carousel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#00FF88]/30 pb-1.5">
          <span className="text-[9px] font-black uppercase text-white tracking-widest flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-[#00FF88] animate-pulse" />
            <span>Featured Highlight Reel</span>
          </span>
        </div>

        <div className="border border-[#00FF88]/20 bg-black/50 rounded-2xl p-5 relative overflow-hidden shadow-[0_0_20px_rgba(0,255,136,0.02)]">
          {/* Subtle scanning lines backdrop simulation */}
          <div className="absolute inset-0 bg-[radial-gradient(#00FF88_0.6px,transparent_0.6px)] [background-size:12px_12px] opacity-5 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
            {/* Image View */}
            <div className="md:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-video w-full rounded-xl border border-[#00FF88]/35 bg-black/40 flex items-center justify-center relative overflow-hidden shadow-[0_0_15px_rgba(0,255,136,0.05)]"
                >
                  <img
                    src={FEATURED_AWARDS[currentSlide].image}
                    alt={FEATURED_AWARDS[currentSlide].title}
                    className="w-full h-full object-cover"
                  />

                  {/* Floating indicators */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-[#00FF88]/10 px-2 py-0.5 rounded border border-[#00FF88]/30 text-[8px] text-[#00FF88]">
                      Slide 0{currentSlide + 1}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-[#00FF88]/10 px-2 py-0.5 rounded border border-[#00FF88]/30 text-[8px] text-[#00FF88] uppercase font-bold">
                      {FEATURED_AWARDS[currentSlide].year}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Description details Card */}
            <div className="md:col-span-5 flex flex-col justify-between h-full py-1 pr-3 md:pr-5">
              <div>
                <span className="text-[8px] bg-cyan-950 text-cyan-400 border border-cyan-800/40 px-2 py-0.5 rounded uppercase tracking-widest">
                  {FEATURED_AWARDS[currentSlide].category}
                </span>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 space-y-3"
                  >
                    <h3 className="font-extrabold text-white text-base tracking-widest uppercase">
                      {FEATURED_AWARDS[currentSlide].title}
                    </h3>
                    <div className="text-[11px] text-[#00FF88] border-b border-dashed border-[#00FF88]/20 pb-2">
                      {FEATURED_AWARDS[currentSlide].achievement}
                    </div>
                    <p className="text-[10.5px] text-gray-400 leading-normal">
                      {FEATURED_AWARDS[currentSlide].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls HUD row */}
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-[#00FF88]/15">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevSlide}
                    className="p-1 px-2.5 rounded-md border border-[#00FF88]/30 bg-black text-[#00FF88] hover:bg-[#00FF88]/10 hover:shadow-[0_0_8px_rgba(0,255,136,0.3)] transition-all cursor-pointer"
                  >
                    PREV
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="p-1 px-2.5 rounded-md border border-[#00FF88]/30 bg-black text-[#00FF88] hover:bg-[#00FF88]/10 hover:shadow-[0_0_8px_rgba(0,255,136,0.3)] transition-all cursor-pointer"
                  >
                    NEXT
                  </button>
                </div>

                <span className="text-[9.5px] text-cyan-400 uppercase tracking-widest">
                  {currentSlide + 1} / {FEATURED_AWARDS.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cyber categorized items listing */}
      <div className="space-y-10">
        {CATEGORIES.map((cat, ci) => (
          <div key={ci} className="space-y-4">
            <div className="border-b border-[#00FF88]/20 pb-1.5 flex items-center justify-between">
              <span className="text-[9.5px] font-black uppercase text-white tracking-widest">
                {cat.title}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cat.awards.map((award, ai) => (
                <div
                  key={ai}
                  className={`p-4 rounded-xl border relative overflow-hidden backdrop-blur-xs flex flex-col justify-between ${
                    award.most
                      ? "border-[#00FF88]/35 bg-emerald-950/15 shadow-[0_0_10px_rgba(0,255,136,0.03)]"
                      : "border-[#00FF88]/10 bg-black/20"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[7px] font-black uppercase border px-1.5 py-0.5 rounded ${
                          award.most
                            ? "bg-[#00FF88]/10 border-[#00FF88]/40 text-[#00FF88]"
                            : "bg-black border-[#00FF88]/10 text-cyan-400"
                        }`}
                      >
                        {award.most ? "Top Tier Award" : "Distinction"}
                      </span>
                      <span className="text-[9.5px] text-white font-bold leading-none">
                        {award.placing}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white uppercase tracking-wider leading-snug">
                      {award.name}
                    </h4>
                    {award.details && (
                      <p className="text-[10px] text-gray-400 font-sans leading-normal">
                        {award.details}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
