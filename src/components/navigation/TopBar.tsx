/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, Mail, FileDown } from 'lucide-react';
import { motion } from 'motion/react';

interface TopBarProps {
  onContactClick: () => void;
  onHomeClick?: () => void;
}

export default function TopBar({ onContactClick, onHomeClick }: TopBarProps) {
  const triggerHome = () => {
    if (onHomeClick) {
      onHomeClick();
    } else {
      window.location.hash = '#/';
    }
  };

  return (
    <header 
      id="core-top-bar"
      className="fixed top-0 left-0 right-0 h-[52px] text-white z-50 flex items-center justify-between px-3 md:px-6 select-none border-b border-black/10 shadow-md bg-major-canvas-gradient flex-nowrap overflow-hidden"
    >
      {/* Left Side: Brand Logo of Jamie Ferrer */}
      <div 
        onClick={triggerHome}
        className="flex items-center gap-1.5 cursor-pointer hover:opacity-95 active:scale-[0.98] transition-all shrink-0 flex-nowrap"
        title="Jamie Ferrer Home"
      >
        {/* Crisp contrasting white-backed custom logo for extreme clarity on core page layouts */}
        <div className="w-8 h-8 bg-white text-[#7d12ff] rounded-lg flex items-center justify-center shadow-md font-sans font-black text-xs tracking-tight shrink-0">
          JF
        </div>
        <span className="font-sans font-black text-xs sm:text-sm text-white tracking-tight leading-none whitespace-nowrap">
          Jamie Ferrer
        </span>
      </div>

      {/* Center or right side grouped controls */}
      <div className="flex items-center gap-1.5 md:gap-3 flex-nowrap shrink-0">
        {/* Back to Home Text trigger (white on gradient background for beautiful accessibility contrast) */}
        <button
          onClick={triggerHome}
          className="flex items-center justify-center gap-1.5 text-xs font-sans font-extrabold text-white/95 hover:text-white hover:underline bg-transparent border-none cursor-pointer transition-colors min-h-[44px] min-w-[44px] p-1 shrink-0"
          title="Back to Home"
        >
          <ArrowLeft size={16} className="shrink-0 text-white" />
          <span className="hidden md:inline">Back to Home</span>
        </button>

        {/* Download Resume Link Button */}
        <a
          href="/portfolio-assets/Jamie_Noreen_Ferrer_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="relative bg-white/10 hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] text-white text-xs font-black font-sans rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm border border-white/25 hover:border-white/40 group outline-none min-h-[44px] min-w-[44px] px-3.5 py-1.5 md:min-h-0 md:min-w-0 md:px-4 md:py-1.5 shrink-0 no-underline"
          title="Jamie's Resume"
        >
          <FileDown size={14} className="shrink-0 text-white group-hover:animate-bounce" />
          <span className="font-sans font-black hidden md:inline ml-1.5 text-white">
            Resume
          </span>
        </a>

        {/* Contact Me Pill Button with Sliding Door and Metallic Shimmer */}
        <button
          onClick={onContactClick}
          className="relative bg-white text-[#7d12ff] text-xs font-black font-sans rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer shadow-md border-none overflow-hidden group outline-none min-h-[44px] min-w-[44px] px-3.5 py-1.5 md:min-h-0 md:min-w-0 md:px-4 md:py-1.5 shrink-0"
          title="Contact Me"
        >
          {/* Sliding Door Backdrop Layer (color-shifter on hover) */}
          <span className="absolute inset-0 w-full h-full -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-350 ease-out z-0 bg-major-canvas-gradient" />
          
          {/* Continuous Metallic Slide-Shimmer (idle shine) */}
          <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full pointer-events-none z-10 animate-slide-shimmer" />

          <Mail size={14} className="shrink-0 relative z-20 text-[#7d12ff] group-hover:text-white transition-colors duration-300" />
          <span className="relative z-20 text-[#7d12ff] group-hover:text-white transition-colors duration-300 font-sans font-black hidden md:inline ml-1.5">
            Contact Me
          </span>
        </button>
      </div>
    </header>
  );
}
