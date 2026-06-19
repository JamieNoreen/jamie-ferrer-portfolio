/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, X, Sparkles, Smile, Cpu } from 'lucide-react';
import { TemplateType } from '../../types';

interface TemplateSwitcherProps {
  currentTemplate: TemplateType;
  onSelect: (template: TemplateType) => void;
  onResetStickers: () => void;
}

export default function TemplateSwitcher({
  currentTemplate,
  onSelect,
  onResetStickers
}: TemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (isOpen && event.key === "Escape") {
        setIsOpen(false);
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
  }, [isOpen]);

  const options = [
    {
      id: 'minimalism' as TemplateType,
      title: 'Minimalism',
      description: 'Clean sans-serif, spacious off-white layouts',
      icon: Smile,
      colors: ['bg-[#F7F7F5]', 'bg-[#1A1A1A]', 'bg-gray-350'],
    },
    {
      id: 'editorial' as TemplateType,
      title: 'Creative Editorial',
      description: 'Warm, textured layers inspired by scrapbooks',
      icon: Sparkles,
      colors: ['bg-[#FAF6EE]', 'bg-[#8F6B43]', 'bg-amber-150'],
    },
    {
      id: 'futuristic' as TemplateType,
      title: 'Futuristic OS',
      description: 'Cyberspace terminal with active neon overlays',
      icon: Cpu,
      colors: ['bg-[#0A0A0F]', 'bg-[#00FF88]', 'bg-indigo-950'],
    },
  ];

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-55 select-none font-sans pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute bottom-16 right-0 w-72 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-150 p-4 select-none mr-2 mb-2"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
              <div>
                <h4 className="font-display font-bold text-xs text-gray-800 uppercase tracking-widest">
                  Page Canvas Editor
                </h4>
                <p className="text-[10px] text-gray-400 font-mono mt-0.5">Customize workspace layouts</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors flex items-center justify-center cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            {/* List options */}
            <div className="space-y-2.5">
              {options.map((opt) => {
                const Icon = opt.icon;
                const isSelected = currentTemplate === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      onSelect(opt.id);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex flex-col justify-between group cursor-pointer ${
                      isSelected
                        ? 'border-black bg-gray-50/80 shadow-2xs font-semibold'
                        : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50/40'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 w-full">
                      {/* Icon */}
                      <div className={`p-1.5 rounded-md mt-0.5 ${
                        isSelected ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500 group-hover:text-black'
                      }`}>
                        <Icon size={14} />
                      </div>

                      {/* Detail text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-display font-bold text-xs text-gray-800 tracking-tight">
                            {opt.title}
                          </span>
                          {/* Active Pill badge */}
                          {isSelected && (
                            <span className="bg-black text-[8px] font-mono font-bold text-white uppercase px-1.5 py-0.5 rounded-xs tracking-wider">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1 leading-normal font-sans">
                          {opt.description}
                        </p>
                      </div>
                    </div>

                    {/* Palette visual dots & reset */}
                    <div className="flex items-center justify-between w-full mt-2.5 pt-2 border-t border-dashed border-gray-100">
                      <div className="flex gap-1">
                        {opt.colors.map((c, i) => (
                          <div key={i} className={`w-3.5 h-3.5 rounded-full border border-gray-200/50 ${c}`} />
                        ))}
                      </div>
                      
                      {isSelected && (
                        <span 
                          onClick={(e) => {
                            e.stopPropagation();
                            onResetStickers();
                          }}
                          className="text-[9px] text-gray-500 hover:text-black underline cursor-pointer hover:font-bold py-0.5 px-1 font-mono uppercase tracking-tighter"
                        >
                          Reset Stickers
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Action Circle Trigger Button */}
      <motion.button
        id="btn-workspace-tweaker"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center shadow-xl hover:bg-gray-800 transition-colors cursor-pointer relative"
        title="Customize page workspace layout"
      >
        <Palette size={20} className={`transition-transform duration-350 ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#00FF88] border border-white"></span>
      </motion.button>
    </div>
  );
}
