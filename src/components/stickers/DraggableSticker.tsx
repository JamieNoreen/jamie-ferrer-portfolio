/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import React, { useRef, useState } from 'react';

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

const getFolderAndFilesForPage = (pageKey: string) => {
  const pk = pageKey || 'about';
  switch (pk) {
    case 'about':
      return { folder: '/portfolio-assets/stickers/about-stickers/', totalFiles: 5 };
    case 'achievements':
      return { folder: '/portfolio-assets/stickers/awards-stickers/', totalFiles: 5 };
    case 'certificates':
      return { folder: '/portfolio-assets/stickers/certs-stickers/', totalFiles: 3 };
    case 'leadership':
      return { folder: '/portfolio-assets/stickers/leadership-stickers/', totalFiles: 5 };
    case 'tech-stacks':
      return { folder: '/portfolio-assets/stickers/skills-stickers/', totalFiles: 5 };
    case 'contact':
      return { folder: '/portfolio-assets/stickers/contact-stickers/', totalFiles: 5 };
    default:
      return { folder: '/portfolio-assets/stickers/about-stickers/', totalFiles: 5 };
  }
};

const getStickerIndex = (id: string, totalFiles: number): number => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash += id.charCodeAt(i);
  }
  return (hash % totalFiles) + 1; // 1 to totalFiles
};

const getStickerRotation = (id: string): string => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash += id.charCodeAt(i);
  }
  // Deterministic rotation class to give custom organic placements
  const rotations = [
    '-rotate-6', '-rotate-3', '-rotate-1', 'rotate-1', 'rotate-3', 'rotate-6', 'rotate-12', '-rotate-12'
  ];
  return rotations[hash % rotations.length];
};

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
  const [hasError, setHasError] = useState(false);

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
    if (hasError) return null;

    // Determine path dynamically from the location hash
    const hash = typeof window !== 'undefined' ? window.location.hash || '#/' : '#/';
    const clean = hash.replace('#/', '');
    const pageKey = clean === '' ? 'about' : clean;

    const { folder, totalFiles } = getFolderAndFilesForPage(pageKey);
    const index = getStickerIndex(id, totalFiles);
    const src = `${folder}sticker${index}.png`;

    const rotationClass = getStickerRotation(id);

    return (
      <img
        src={src}
        alt={label || 'Sticker'}
        onError={() => setHasError(true)}
        className={`w-28 h-28 md:w-32 md:h-32 object-contain transition-transform duration-200 ease-out hover:scale-110 active:scale-95 ${rotationClass} hover:rotate-0 select-none pointer-events-none`}
        referrerPolicy="no-referrer"
      />
    );
  };

  if (hasError) return null;

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
