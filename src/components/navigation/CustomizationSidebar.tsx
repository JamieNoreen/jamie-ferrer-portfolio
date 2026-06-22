/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutTemplate, 
  Sticker as StickerIcon, 
  Palette as PaletteIcon, 
  Type as TypeIcon,
  Check,
  Undo,
  Sparkles
} from 'lucide-react';
import { TemplateType, Sticker } from '../../types';

export const getStickerImagePath = (pageKey: string, indexInSet: number) => {
  const pk = pageKey || 'about';
  let folder = '/portfolio-assets/stickers/about-stickers/';
  let totalFiles = 5;

  switch (pk) {
    case 'about':
      folder = '/portfolio-assets/stickers/about-stickers/';
      totalFiles = 5;
      break;
    case 'achievements':
      folder = '/portfolio-assets/stickers/awards-stickers/';
      totalFiles = 5;
      break;
    case 'certificates':
      folder = '/portfolio-assets/stickers/certs-stickers/';
      totalFiles = 3;
      break;
    case 'leadership':
      folder = '/portfolio-assets/stickers/leadership-stickers/';
      totalFiles = 5;
      break;
    case 'tech-stacks':
      folder = '/portfolio-assets/stickers/skills-stickers/';
      totalFiles = 5;
      break;
    case 'contact':
      folder = '/portfolio-assets/stickers/contact-stickers/';
      totalFiles = 5;
      break;
  }

  const fileIndex = ((indexInSet - 1) % totalFiles) + 1;
  return `${folder}sticker${fileIndex}.png`;
};

// Declare Palettes Data
export const PALETTES = [
  {
    id: 'earthy',
    name: 'Earthy',
    colors: ['#F5F0E8', '#D4A574', '#8B6F47', '#4A3728', '#2C1810'],
    map: {
      bg: '#F5F0E8',
      border: '#D4A574',
      accent: '#8B6F47',
      textSec: '#4A3728',
      textPri: '#2C1810'
    }
  },
  {
    id: 'pastel',
    name: 'Pastel',
    colors: ['#FFF0F3', '#FFB3C1', '#FF85A1', '#C9184A', '#590D22'],
    map: {
      bg: '#FFF0F3',
      border: '#FFB3C1',
      accent: '#FF85A1',
      textSec: '#C9184A',
      textPri: '#590D22'
    }
  },
  {
    id: 'bold',
    name: 'Bold',
    colors: ['#CAF0F8', '#90E0EF', '#00B4D8', '#0077B6', '#03045E'],
    map: {
      bg: '#CAF0F8',
      border: '#90E0EF',
      accent: '#00B4D8',
      textSec: '#0077B6',
      textPri: '#03045E'
    }
  },
  {
    id: 'cool',
    name: 'Cool',
    colors: ['#F0F4F8', '#A8DADC', '#457B9D', '#1D3557', '#0D1B2A'],
    map: {
      bg: '#F0F4F8',
      border: '#A8DADC',
      accent: '#457B9D',
      textSec: '#1D3557',
      textPri: '#0D1B2A'
    }
  },
  {
    id: 'warm',
    name: 'Warm',
    colors: ['#FFEDD8', '#F4A261', '#E76F51', '#2A9D8F', '#264653'],
    map: {
      bg: '#FFEDD8',
      border: '#F4A261',
      accent: '#E76F51',
      textSec: '#2A9D8F',
      textPri: '#264653'
    }
  }
];

// Declare Typography Data
export const TYPOGRAPHIES = [
  {
    id: 'modern',
    name: 'Modern',
    heading: 'Inter',
    body: 'Inter',
    headingClass: 'font-sans',
    bodyClass: 'font-sans',
    feel: 'Clean, neutral, professional'
  },
  {
    id: 'elegant',
    name: 'Elegant',
    heading: 'Playfair Display',
    body: 'Lato',
    headingClass: 'font-serif',
    bodyClass: 'font-sans',
    feel: 'Refined, editorial, timeless'
  },
  {
    id: 'high-tech',
    name: 'High Tech',
    heading: 'Space Mono',
    body: 'Space Mono',
    headingClass: 'font-mono',
    bodyClass: 'font-mono',
    feel: 'Technical, futuristic, developer'
  },
  {
    id: 'friendly',
    name: 'Friendly',
    heading: 'Nunito',
    body: 'Nunito',
    headingClass: 'font-sans rounded-font',
    bodyClass: 'font-sans rounded-font',
    feel: 'Warm, approachable, creative'
  },
  {
    id: 'editorial',
    name: 'Editorial',
    heading: 'Cormorant Garamond',
    body: 'DM Sans',
    headingClass: 'font-serif italic',
    bodyClass: 'font-sans',
    feel: 'Magazine, sophisticated, bold contrast'
  }
];

interface CustomizationSidebarProps {
  pageName: string;
  currentTemplate: TemplateType;
  onChangeTemplate: (template: TemplateType) => void;
  currentPalette: string;
  onChangePalette: (palette: string) => void;
  currentTypography: string;
  onChangeTypography: (typography: string) => void;
  onAddSticker: (type: string, label: string, emoji?: string, color?: string) => void;
  onResetStickers: () => void;
}

export default function CustomizationSidebar({
  pageName,
  currentTemplate,
  onChangeTemplate,
  currentPalette,
  onChangePalette,
  currentTypography,
  onChangeTypography,
  onAddSticker,
  onResetStickers
}: CustomizationSidebarProps) {
  // Track open panel ('templates', 'stickers', 'branding', 'typography' or null/collapsed)
  const [activePanel, setActivePanel] = useState<'templates' | 'stickers' | 'branding' | 'typography' | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (activePanel && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setActivePanel(null);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (activePanel && event.key === 'Escape') {
        setActivePanel(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [activePanel]);

  // First-time visit "TRY ME" hint state per page (in-memory state so refreshing always shows it)
  const [showHint, setShowHint] = useState<boolean>(true);

  const dismissHint = React.useCallback(() => {
    setShowHint(false);
  }, []);

  // Reset showHint state if pageName changes
  React.useEffect(() => {
    setShowHint(true);
  }, [pageName]);

  const sidebarIcons = [
    { id: 'templates' as const, icon: LayoutTemplate, label: 'Templates' },
    { id: 'stickers' as const, icon: StickerIcon, label: 'Stickers' },
    { id: 'branding' as const, icon: PaletteIcon, label: 'Branding' },
    { id: 'typography' as const, icon: TypeIcon, label: 'Typography' }
  ];

  const handleIconClick = (panelId: 'templates' | 'stickers' | 'branding' | 'typography') => {
    dismissHint();
    if (activePanel === panelId) {
      setActivePanel(null); // Collapse
    } else {
      setActivePanel(panelId); // Switch or Expand
    }
  };

  // Sticker catalogue: a single cohesive, templates-agnostic catalogue of creative stickers!
  interface CatalogueSticker {
    type: string;
    label: string;
    previewText: string;
    emoji?: string;
    color?: string;
  }

  const unifiedStickers: CatalogueSticker[] = [
    { type: 'paper-tab', label: 'CREATOR CORE', previewText: 'CREATOR CORE' },
    { type: 'minimal-label', label: 'DESIGN SCHEMAS', previewText: 'DESIGN' },
    { type: 'geometric-symbol', label: 'star', emoji: '✦', previewText: '✦' },
    { type: 'tape-strip', label: 'TAPE: READ ME', previewText: 'Washi Tape' },
    { type: 'photo-cutout-frame', label: 'Caffeine Fuel', emoji: '☕', previewText: '☕ Cutout' },
    { type: 'doodle-shape', label: 'sparkle', emoji: '✨', previewText: '✨' },
    { type: 'neon-highlight', label: 'CORE_IDENTITY // ACTIVATE', previewText: 'CORE_ID' },
    { type: 'holographic-badge', label: 'GLOW', emoji: '⌖', previewText: '⌖ Grid' },
    { type: 'grid-fragment', label: 'SYS_CIRCUIT', previewText: 'Circuit Map' }
  ];

  // Dynamically configure sticker selections based on active page and template
  const getActiveStickers = (): CatalogueSticker[] => {
    if (pageName === 'achievements') {
      if (currentTemplate === 'minimalism') {
        return [
          { type: 'paper-tab', label: 'Small trophy outline', previewText: '♜' },
          { type: 'geometric-symbol', label: 'Minimal star shape', emoji: '★', previewText: '★' },
          { type: 'paper-tab', label: 'Clean ribbon outline', previewText: '🎀' },
          { type: 'geometric-symbol', label: 'Simple bracket decoration', emoji: '[ ]', previewText: '[ ]' },
          { type: 'geometric-symbol', label: 'Subtle circular stamp', emoji: '💮', previewText: '💮' },
        ];
      } else if (currentTemplate === 'editorial') {
        return [
          { type: 'doodle-shape', label: 'Star burst shape', emoji: '✸', previewText: '✸' },
          { type: 'tape-strip', label: 'Underline swoosh', previewText: '〰' },
          { type: 'photo-cutout-frame', label: 'Exclamation cutout', emoji: '❕', previewText: '❕' },
          { type: 'doodle-shape', label: 'Confetti shape', emoji: '❃', previewText: '❃' },
          { type: 'tape-strip', label: 'Ribbon banner cutout', previewText: '🎗' },
        ];
      } else { // futuristic
        return [
          { type: 'neon-highlight', label: 'Glowing star fragment', previewText: '✦' },
          { type: 'holographic-badge', label: 'Neon rank badge shape', emoji: '▲', previewText: '▲' },
          { type: 'holographic-badge', label: 'Holographic medal circle', emoji: '⚙', previewText: '⚙' },
          { type: 'grid-fragment', label: 'Glowing bracket pair', previewText: '⌖' },
          { type: 'neon-highlight', label: 'Neon underline bar', previewText: '▬' },
        ];
      }
    }

    if (pageName === 'certificates') {
      if (currentTemplate === 'minimalism') {
        return [
          { type: 'paper-tab', label: 'Small certificate outline shape', previewText: '🗎' },
          { type: 'geometric-symbol', label: 'Minimal seal/stamp circle', emoji: '⊚', previewText: '⊚' },
          { type: 'paper-tab', label: 'Clean ribbon outline', previewText: '🎗' },
          { type: 'geometric-symbol', label: 'Simple checkmark badge', emoji: '✓', previewText: '✓' },
          { type: 'geometric-symbol', label: 'Subtle bracket decoration', emoji: '[ ]', previewText: '[ ]' },
        ];
      } else if (currentTemplate === 'editorial') {
        return [
          { type: 'doodle-shape', label: 'Star burst shape', emoji: '✸', previewText: '✸' },
          { type: 'tape-strip', label: 'Underline swoosh', previewText: '〰' },
          { type: 'tape-strip', label: 'Washi tape strip', previewText: 'TAPE' },
          { type: 'photo-cutout-frame', label: 'Stamp cutout shape', emoji: '💮', previewText: '💮' },
          { type: 'doodle-shape', label: 'Confetti scatter', emoji: '❃', previewText: '❃' },
        ];
      } else { // futuristic
        return [
          { type: 'neon-highlight', label: 'Glowing verification badge shape', previewText: '🛡' },
          { type: 'holographic-badge', label: 'Neon checkmark fragment', emoji: '✓', previewText: '✓' },
          { type: 'holographic-badge', label: 'Holographic seal circle', emoji: '⚙', previewText: '⚙' },
          { type: 'grid-fragment', label: 'Glowing bracket pair', previewText: '⌖' },
          { type: 'neon-highlight', label: 'Neon underline bar', previewText: '▬' },
        ];
      }
    }

    if (pageName === 'leadership') {
      if (currentTemplate === 'minimalism') {
        return [
          { type: 'paper-tab', label: 'Small crown outline shape', previewText: '👑' },
          { type: 'geometric-symbol', label: 'Minimal org chart node symbol', emoji: '⎔', previewText: '⎔' },
          { type: 'paper-tab', label: 'Clean badge outline', previewText: '🛡' },
          { type: 'geometric-symbol', label: 'Simple directional arrow', emoji: '→', previewText: '→' },
          { type: 'geometric-symbol', label: 'Subtle seal circle', emoji: '⊚', previewText: '⊚' },
        ];
      } else if (currentTemplate === 'editorial') {
        return [
          { type: 'doodle-shape', label: 'Bold star burst shape', emoji: '✸', previewText: '✸' },
          { type: 'tape-strip', label: 'Underline swoosh', previewText: '〰' },
          { type: 'tape-strip', label: 'Washi tape strip in accent color', previewText: 'TAPE' },
          { type: 'photo-cutout-frame', label: 'Bold exclamation cutout', emoji: '❕', previewText: '❕' },
          { type: 'doodle-shape', label: 'Overlapping circle shapes', emoji: '⚯', previewText: '⚯' },
        ];
      } else { // futuristic
        return [
          { type: 'neon-highlight', label: 'Glowing crown fragment', previewText: '👑' },
          { type: 'holographic-badge', label: 'Neon rank insignia shape', emoji: '▲', previewText: '▲' },
          { type: 'holographic-badge', label: 'Holographic shield badge', emoji: '🛡', previewText: '🛡' },
          { type: 'grid-fragment', label: 'Glowing node connector shape', previewText: '⌖' },
          { type: 'neon-highlight', label: 'Circuit hierarchy line', previewText: '▬' },
        ];
      }
    }

    if (pageName === 'tech-stacks') {
      if (currentTemplate === 'minimalism') {
        return [
          { type: 'paper-tab', label: 'Small code bracket symbol', previewText: '</>' },
          { type: 'geometric-symbol', label: 'Minimal terminal cursor shape', emoji: '▮', previewText: '▮' },
          { type: 'paper-tab', label: 'Clean grid dot pattern', previewText: '::' },
          { type: 'geometric-symbol', label: 'Simple diagonal slash decoration', emoji: '╱', previewText: '╱' },
          { type: 'geometric-symbol', label: 'Subtle monochrome chip shape', emoji: '⧇', previewText: '⧇' },
        ];
      } else if (currentTemplate === 'editorial') {
        return [
          { type: 'doodle-shape', label: 'Bold lightning bolt shape', emoji: '⚡', previewText: '⚡' },
          { type: 'doodle-shape', label: 'Hand-drawn star burst', emoji: '✸', previewText: '✸' },
          { type: 'tape-strip', label: 'Washi tape strip in accent color', previewText: 'TAPE' },
          { type: 'photo-cutout-frame', label: 'Bold plus sign cutout', emoji: '＋', previewText: '＋' },
          { type: 'doodle-shape', label: 'Overlapping circle decoration', emoji: '⚯', previewText: '⚯' },
        ];
      } else { // futuristic
        return [
          { type: 'neon-highlight', label: 'Glowing code bracket fragment', previewText: '</>' },
          { type: 'holographic-badge', label: 'Neon terminal cursor shape', emoji: '▮', previewText: '▮' },
          { type: 'holographic-badge', label: 'Holographic chip badge', emoji: '⧇', previewText: '⧇' },
          { type: 'grid-fragment', label: 'Glowing circuit node shape', previewText: '⌖' },
          { type: 'neon-highlight', label: 'Neon grid fragment', previewText: '▤' },
        ];
      }
    }

    if (pageName === 'contact') {
      if (currentTemplate === 'minimalism') {
        return [
          { type: 'paper-tab', label: 'Small envelope outline shape', previewText: '✉' },
          { type: 'geometric-symbol', label: 'Minimal signal/wave symbol', emoji: '∿', previewText: '∿' },
          { type: 'paper-tab', label: 'Clean location pin outline', previewText: '📍' },
          { type: 'geometric-symbol', label: 'Simple link chain symbol', emoji: '🔗', previewText: '🔗' },
          { type: 'geometric-symbol', label: 'Subtle circle with dot center', emoji: '☉', previewText: '☉' },
        ];
      } else if (currentTemplate === 'editorial') {
        return [
          { type: 'doodle-shape', label: 'Bold speech bubble shape', emoji: '💬', previewText: '💬' },
          { type: 'doodle-shape', label: 'Hand-drawn star burst', emoji: '✸', previewText: '✸' },
          { type: 'tape-strip', label: 'Washi tape strip in accent color', previewText: 'TAPE' },
          { type: 'photo-cutout-frame', label: 'Bold heart cutout', emoji: '♥', previewText: '♥' },
          { type: 'doodle-shape', label: 'Annotation arrow pointing inward', emoji: '➔', previewText: '➔' },
        ];
      } else { // futuristic
        return [
          { type: 'neon-highlight', label: 'Glowing signal wave fragment', previewText: '∿' },
          { type: 'holographic-badge', label: 'Neon connection node shape', emoji: '⌖', previewText: '⌖' },
          { type: 'holographic-badge', label: 'Holographic transmission badge', emoji: '📡', previewText: '📡' },
          { type: 'grid-fragment', label: 'Glowing envelope outline', previewText: '✉' },
          { type: 'neon-highlight', label: 'Circuit connector line', previewText: '▬' },
        ];
      }
    }

    return unifiedStickers;
  };

  const activeStickerSet = getActiveStickers();


  return (
    <aside 
      ref={sidebarRef}
      id="customization-sidebar"
      className="fixed left-0 top-[52px] h-[calc(100vh-52px)] bg-white border-r border-[#E8E8E6] z-40 flex select-none text-gray-800 font-sans"
    >
      {/* First-time "TRY ME" Customization Hint */}
      {showHint && !activePanel && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            onClick={dismissHint}
            className="absolute left-[64px] md:left-[80px] top-[24px] z-50 cursor-pointer pointer-events-auto whitespace-nowrap select-none flex items-center shadow-md bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-300 rounded-full px-3 py-1 text-xs font-sans font-semibold transition-colors duration-150"
          >
            <span className="flex items-center gap-1.5">
              <span className="text-neutral-400 font-bold">←</span>
              <span>Try me</span>
            </span>
          </motion.div>
        </AnimatePresence>
      )}

      {/* LEFT STATIC ICON COLUMN (~72px width matching Home Sidebar) */}
      <div className="w-14 md:w-[72px] bg-white border-r border-gray-100 flex flex-col items-center py-4 justify-between relative z-10 h-full">
        {/* Navigation Item Stack with space-y-2 matching homepage sidebar exactly */}
        <div className="w-full flex flex-col items-center space-y-2">
          {sidebarIcons.map((item) => {
            const IconComponent = item.icon;
            const isSelected = activePanel === item.id;
            return (
              <div 
                key={item.id}
                className="relative flex items-center justify-center w-full"
                onMouseEnter={() => setHoveredIcon(item.id)}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                {/* Visual Trigger Button mimicking primary homepage item exactly */}
                <button
                  onClick={() => handleIconClick(item.id)}
                  className="w-full flex flex-col items-center justify-center py-2 px-1 group relative select-none cursor-pointer outline-none transition-all duration-120"
                  aria-label={item.label}
                >
                  {/* Icon container with clean active/hover state styling */}
                  <div 
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 relative ${
                      isSelected
                        ? 'text-white shadow-sm shadow-indigo-500/10 bg-major-canvas-gradient'
                        : 'text-gray-500 hover:bg-gray-100/80 hover:text-gray-900'
                    }`}
                  >
                    <IconComponent 
                      size={16} 
                      strokeWidth={isSelected ? 2.5 : 2.0} 
                      className={`shrink-0 transition-transform ${!isSelected && 'hover:scale-105'}`} 
                    />


                  </div>

                  {/* Tiny text label matching sidebar design spacing */}
                  <span className={`text-[9px] font-sans font-bold text-center select-none truncate max-w-[56px] mt-1.5 leading-none transition-colors duration-120 ${
                    isSelected ? 'text-black font-extrabold' : 'text-gray-400 group-hover:text-gray-800'
                  }`}>
                    {item.label}
                  </span>
                </button>

                {/* Hover Tooltip (Shown when sidebar is collapsed or icon isn't active) */}
                {hoveredIcon === item.id && !isSelected && (
                  <div className="absolute left-[70px] bg-gray-950 text-white text-[9px] font-sans font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap shadow-md z-50 pointer-events-none">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom utility helper (Reset button for workspace layout) */}
        {activePanel && (
          <button
            onClick={onResetStickers}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer shadow-none border-none outline-none"
            title="Reset active page layout stickers"
          >
            <Undo size={16} />
          </button>
        )}
      </div>

      {/* EXPANDED CONTENT PANEL (~220px width) */}
      <AnimatePresence>
        {activePanel && (
          <motion.div
            initial={{ opacity: 0, x: -60, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 220 }}
            exit={{ opacity: 0, x: -60, width: 0 }}
            transition={{ type: 'spring', damping: 24, stiffness: 220 }}
            className="h-full bg-white border-r border-[#E2E8F0]/40 overflow-hidden relative flex flex-col z-0 shadow-lg"
          >
            {/* Header section */}
            <div className="px-4.5 py-4 border-b border-[#E2E8F0]/60 shrink-0">
              <h3 className="font-sans font-black text-xs uppercase tracking-widest text-[#0F172A]">
                {pageName === 'logos' ? 'Canvas-OS Brand' : (
                  <>
                    {activePanel === 'templates' && 'Templates'}
                    {activePanel === 'stickers' && 'Stickers'}
                    {activePanel === 'branding' && 'Color Palette'}
                    {activePanel === 'typography' && 'Typography'}
                  </>
                )}
              </h3>
            </div>

            {/* Scrollable Panel Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar select-none">
              {pageName === 'logos' ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-1 py-14 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center">
                    <Sparkles size={18} className="animate-pulse text-indigo-500" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-sans font-black text-xs text-gray-900 uppercase tracking-widest">Fixed Identity</h4>
                    <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                      The brand identity and logos page utilizes a fixed layout to protect original corporate specs and typography formulas.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* --- PANEL 1: TEMPLATES --- */}
                  {activePanel === 'templates' && (
                <div className="space-y-3">
                  {/* Minimalism Template Choice */}
                  <div
                    onClick={() => onChangeTemplate('minimalism')}
                    className={`p-3 rounded-xl border-2 transition-all duration-250 cursor-pointer ${
                      currentTemplate === 'minimalism'
                        ? 'border-[#7d12ff] bg-[#7d12ff]/5'
                        : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50/50'
                    }`}
                  >
                    {/* Visual Miniature mockup */}
                    <div className="w-full h-15 bg-[#F7F7F5] rounded-lg border border-gray-200 p-2 mb-2 flex flex-col justify-between">
                      <div className="h-1 bg-gray-400 rounded w-1/3"></div>
                      <div className="space-y-1">
                        <div className="h-0.5 bg-gray-300 rounded w-full"></div>
                        <div className="h-0.5 bg-gray-300 rounded w-5/6"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-sans font-extrabold text-xs text-[#0F172A]">Minimalism</span>
                      {currentTemplate === 'minimalism' && <Check size={12} className="text-[#7d12ff]" />}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">Clean, spacious, minimal</p>
                  </div>

                  {/* Creative Editorial Template Choice */}
                  <div
                    onClick={() => onChangeTemplate('editorial')}
                    className={`p-3 rounded-xl border-2 transition-all duration-250 cursor-pointer ${
                      currentTemplate === 'editorial'
                        ? 'border-[#7d12ff] bg-[#7d12ff]/5'
                        : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50/50'
                    }`}
                  >
                    {/* Visual Miniature mockup */}
                    <div className="w-full h-15 bg-[#FFFDF7] rounded-lg border border-[#F4A261]/20 p-2 mb-2 flex flex-col justify-between relative overflow-hidden">
                      <div className="h-1 bg-[#8F6B43] rounded w-2/5 -rotate-2"></div>
                      <div className="absolute top-2 right-2 w-4 h-4 bg-amber-100 rounded-full flex items-center justify-center text-[7px] rotate-6 border border-amber-200">✨</div>
                      <div className="space-y-1">
                        <div className="h-0.5 bg-[#8F6B43]/50 rounded w-full rotate-1"></div>
                        <div className="h-0.5 bg-[#8F6B43]/50 rounded w-3/4 -rotate-1"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-sans font-extrabold text-xs text-[#0F172A]">Creative/Editorial</span>
                      {currentTemplate === 'editorial' && <Check size={12} className="text-[#7d12ff]" />}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">Expressive, layered, editorial</p>
                  </div>

                  {/* Futuristic Template Choice */}
                  <div
                    onClick={() => onChangeTemplate('futuristic')}
                    className={`p-3 rounded-xl border-2 transition-all duration-250 cursor-pointer ${
                      currentTemplate === 'futuristic'
                        ? 'border-[#7d12ff] bg-[#7d12ff]/5'
                        : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50/50'
                    }`}
                  >
                    {/* Visual Miniature mockup */}
                    <div className="w-full h-15 bg-[#0A0A0F] rounded-lg border border-[#00FF88]/20 p-2 mb-2 flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,136,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,136,0.03)_1px,transparent_1px)] bg-[size:8px_8px]" />
                      <div className="h-1 bg-[#00FF88] rounded w-1/4 z-10"></div>
                      <div className="space-y-0.5 z-10">
                        <div className="h-0.5 bg-cyan-500/70 rounded w-full"></div>
                        <div className="h-0.5 bg-cyan-500/20 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-sans font-extrabold text-xs text-[#0F172A]">Futuristic</span>
                      {currentTemplate === 'futuristic' && <Check size={12} className="text-[#7d12ff]" />}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">Dark, high contrast, tech</p>
                  </div>
                </div>
              )}

              {/* --- PANEL 2: STICKERS --- */}
              {activePanel === 'stickers' && (
                <div className="space-y-4">
                  
                  <div className="grid grid-cols-1 gap-2.5">
                    {activeStickerSet.map((sticker, idx) => {
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            onAddSticker(
                              sticker.type, 
                              sticker.label, 
                              sticker.emoji, 
                              sticker.color
                            );
                          }}
                          className="p-2.5 rounded-lg border border-gray-150 hover:bg-gray-50 transition-all cursor-pointer flex items-center justify-between group active:scale-[0.98]"
                        >
                          {/* Left: Beautiful mini render mockup using real sticker picture */}
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-md border border-gray-150 overflow-hidden select-none bg-radial from-neutral-50 to-neutral-100">
                              <img
                                src={getStickerImagePath(pageName, idx + 1)}
                                alt={sticker.label}
                                className="w-8 h-8 object-contain"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            <span className="font-sans font-bold text-[10.5px] text-[#334155] group-hover:text-black">
                              {sticker.label.length > 20 ? sticker.label.substr(0,18) + '..' : sticker.label}
                            </span>
                          </div>

                          <div className="text-[12px] text-gray-300 group-hover:text-black font-semibold">+</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* --- PANEL 3: BRANDING --- */}
              {activePanel === 'branding' && (
                <div className="space-y-4">
                  
                  <div className="space-y-2.5">
                    {PALETTES.map((pal) => {
                      const isActive = currentPalette === pal.id;
                      return (
                        <div
                          key={pal.id}
                          onClick={() => onChangePalette(pal.id)}
                          className={`p-2.5 rounded-xl border border-gray-200 transition-all cursor-pointer flex flex-col gap-1.5 hover:border-gray-300 ${
                            isActive
                              ? 'ring-2 ring-[#7d12ff] bg-gray-50/50 shadow-xs'
                              : 'hover:bg-gray-50/20'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-sans font-extrabold text-[11px] text-[#0F172A] uppercase tracking-wider">{pal.name}</span>
                            {isActive && <span className="bg-[#7d12ff] text-[7px] font-mono font-bold text-white uppercase px-1.5 py-0.5 rounded-sm">Active</span>}
                          </div>
                          
                          {/* Dynamic colored circles row matching reference image */}
                          <div className="flex items-center gap-1.5">
                            {pal.colors.map((clr, cIdx) => (
                              <div 
                                key={cIdx} 
                                style={{ backgroundColor: clr }}
                                className="w-[26px] h-[26px] rounded-full border border-gray-400/10 shadow-xs ring-1 ring-white" 
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* --- PANEL 4: TYPOGRAPHY --- */}
              {activePanel === 'typography' && (
                <div className="space-y-3">
                  
                  {TYPOGRAPHIES.map((pair) => {
                    const isActive = currentTypography === pair.id;
                    return (
                      <div
                        key={pair.id}
                        onClick={() => onChangeTypography(pair.id)}
                        className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                          isActive
                            ? 'border-[#7d12ff] bg-[#7d12ff]/5 shadow-xs'
                            : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50/30'
                        }`}
                      >
                        {/* Interactive font representation block */}
                        <div className="border-b border-gray-100 pb-2 mb-2">
                          <p style={{ fontFamily: pair.heading }} className="text-sm font-bold text-gray-800">
                            Aa Heading Font
                          </p>
                          <p style={{ fontFamily: pair.body }} className="text-[10px] text-gray-400 leading-none mt-1">
                            Body text in {pair.body}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-sans font-extrabold text-xs text-[#0F172A]">{pair.name}</span>
                          {isActive && <Check size={12} className="text-[#7d12ff]" />}
                        </div>
                        <p className="text-[9px] text-gray-500 mt-0.5 leading-tight">{pair.feel}</p>
                      </div>
                    );
                  })}
                </div>
              )}
                </>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
