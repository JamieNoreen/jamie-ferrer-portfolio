/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import React, { useRef } from 'react';

interface DraggableStickerProps {
  key?: string;
  id: string;
  type: string;
  label: string;
  x: number; // percentage (e.g. 30 for 30%)
  y: number; // percentage (e.g. 50 for 50%)
  emoji?: string;
  color?: string;
  onUpdatePosition: (id: string, x: number, y: number) => void;
  onDelete?: (id: string) => void;
  dragConstraintsRef: React.RefObject<HTMLDivElement | null>;
}

export default function DraggableSticker({
  id,
  type,
  label,
  x,
  y,
  emoji,
  color,
  onUpdatePosition,
  onDelete,
  dragConstraintsRef
}: DraggableStickerProps) {
  const stickerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (_event: any, info: any) => {
    if (!dragConstraintsRef.current || !stickerRef.current) return;
    
    const container = dragConstraintsRef.current;
    const containerRect = container.getBoundingClientRect();
    const stickerRect = stickerRef.current.getBoundingClientRect();

    // The midpoint of the sticker in window coordinates after drag
    const stickerMidX = stickerRect.left + stickerRect.width / 2;
    const stickerMidY = stickerRect.top + stickerRect.height / 2;

    // Relative to the container's top-left corner
    const relativeX = stickerMidX - containerRect.left;
    const relativeY = stickerMidY - containerRect.top;

    // Convert back to percentages
    const pctX = (relativeX / containerRect.width) * 100;
    const pctY = (relativeY / containerRect.height) * 100;

    // Clamp coordinates to keep sticker safely inside drag bounds
    const clampedX = Math.max(4, Math.min(96, pctX));
    const clampedY = Math.max(4, Math.min(96, pctY));

    onUpdatePosition(id, clampedX, clampedY);
  };

  // Switch sticker looks using Tailwind CSS matching themes
  const renderStickerContent = () => {
    switch (type) {
      // 1. Minimalism Stickers
      case 'paper-tab':
        return (
          <div className="bg-white border-2 border-gray-900 shadow-md px-4 py-2 rounded-md text-xs md:text-sm font-mono font-extrabold text-gray-900 flex items-center gap-2 select-none hover:bg-gray-50 border-t-6 border-t-[#1A1A1A]">
            <span className="w-2 h-2 rounded-full bg-black shrink-0"></span>
            <span className="tracking-tight uppercase">{label}</span>
          </div>
        );
      case 'geometric-symbol':
        return (
          <div className="text-gray-900 font-display font-black text-2xl bg-white border-2 border-gray-900 w-12 h-12 rounded-full flex items-center justify-center select-none shadow-md hover:border-black transform hover:rotate-12 transition-transform">
            {emoji || '✦'}
          </div>
        );
      case 'minimal-label':
        return (
          <div className="bg-[#1A1A1A] text-white text-[11px] font-mono tracking-widest px-4.5 py-2 uppercase select-none rounded-md shadow-md hover:bg-black font-extrabold border border-black/15">
            {label}
          </div>
        );

      // 2. Editorial Stickers
      case 'tape-strip':
        return (
          <div className="bg-[#FCF5E3] border-y-2 border-dashed border-[#8F6B43]/30 px-6 py-2.5 -rotate-3 hover:rotate-0 transition-transform shadow-md text-xs uppercase tracking-wider font-extrabold text-[#5C4033] w-48 text-center select-none cursor-grab active:cursor-grabbing">
            📌 {label}
          </div>
        );
      case 'doodle-shape':
        return (
          <div className="text-4xl md:text-5xl filter drop-shadow-md transform rotate-6 select-none hover:scale-115 transition-transform">
            {emoji || '✍️'}
          </div>
        );
      case 'photo-cutout-frame':
        return (
          <div className="bg-white p-2.5 pb-6 border-2 border-gray-300 shadow-lg w-32 md:w-36 -rotate-3 hover:rotate-1 transition-transform select-none">
            <div className="aspect-square bg-gray-150 flex items-center justify-center overflow-hidden border border-gray-200 rounded-sm">
              <span className="text-4xl">{emoji || '🎨'}</span>
            </div>
            <p className="text-[9px] md:text-[10px] text-center text-gray-500 mt-2 font-mono font-black tracking-wider leading-none uppercase">{label}</p>
          </div>
        );

      // 3. Futuristic Stickers
      case 'neon-highlight':
        return (
          <div className="border-2 border-[var(--page-accent)] bg-black/90 text-[var(--page-accent)] text-xs font-mono font-black py-2 px-4 uppercase select-none rounded-md tracking-widest shadow-[0_0_12px_rgba(0,255,136,0.3)] flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[var(--page-accent)] animate-pulse shrink-0"></span>
            <span>{label}</span>
          </div>
        );
      case 'holographic-badge':
        return (
          <div className="w-16 h-16 rounded-full border-2 border-[var(--page-accent)] bg-[var(--page-bg)]/80 flex flex-col items-center justify-center text-[var(--page-accent)] font-mono text-[9px] tracking-widest select-none shadow-[0_0_12px_rgba(0,255,136,0.25)]">
            <span className="font-black text-[8px] leading-tight opacity-80">SYS</span>
            <span className="font-bold text-center leading-none mt-0.5">{emoji || '⌖'}</span>
          </div>
        );
      case 'grid-fragment':
        return (
          <div className="border px-4 py-2.5 text-[var(--page-accent)] font-mono text-[10px] space-y-1 select-none rounded-md shadow-[0_0_10px_rgba(0,255,136,0.15)] bg-black/80 border-[var(--page-accent)]/40">
            <p className="font-black border-b border-[var(--page-accent)]/20 pb-1 uppercase tracking-wider">{label}</p>
            <p className="text-[7.5px] opacity-70 font-bold leading-none">SECTOR_ID :: 0x98FF2</p>
          </div>
        );

      default:
        return (
          <div className="bg-white p-3 rounded-lg shadow-md border-2 border-gray-300 text-xs font-extrabold max-w-xs">
            {label}
          </div>
        );
    }
  };

  return (
    <motion.div
      ref={stickerRef}
      drag
      dragMomentum={false}
      dragElastic={0.02}
      dragConstraints={dragConstraintsRef}
      onDragEnd={handleDragEnd}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 50,
      }}
      className="absolute pointer-events-auto cursor-grab active:cursor-grabbing selection:bg-transparent group/sticker"
    >
      <div className="relative">
        {renderStickerContent()}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 hover:bg-red-650 text-white rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover/sticker:opacity-100 transition-opacity cursor-pointer z-50 shadow-xs border border-white font-sans font-bold leading-none"
            title="Delete sticker"
          >
            ×
          </button>
        )}
      </div>
    </motion.div>
  );
}
