/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useDragControls } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';

interface DraggableStickerProps {
  key?: string;
  id: string;
  type: string;
  label: string;
  x: number; // percentage (e.g. 30 for 30%)
  y: number; // percentage (e.g. 50 for 50%)
  emoji?: string;
  color?: string;
  imagePath?: string;
  onUpdatePosition: (id: string, x: number, y: number) => void;
  onDelete?: (id: string) => void;
  dragConstraintsRef: React.RefObject<HTMLDivElement | null>;
  isSelected?: boolean;
  onSelect?: () => void;
  onUpdateSize?: (id: string, sizePx: number) => void;
  sizePx?: number;
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
  imagePath,
  onUpdatePosition,
  onDelete,
  dragConstraintsRef,
  isSelected = false,
  onSelect,
  onUpdateSize,
  sizePx = 128
}: DraggableStickerProps) {
  const stickerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const [hasError, setHasError] = useState(false);
  const [localSize, setLocalSize] = useState<number>(sizePx);
  const [isHovered, setIsHovered] = useState(false);

  // Resize handle refs
  const tlRef = useRef<HTMLDivElement>(null);
  const trRef = useRef<HTMLDivElement>(null);
  const blRef = useRef<HTMLDivElement>(null);
  const brRef = useRef<HTMLDivElement>(null);

  const [resizing, setResizing] = useState<{
    corner: string;
    startX: number;
    startY: number;
    startSize: number;
  } | null>(null);

  // Synchronize local size if sizePx prop changes externally
  useEffect(() => {
    setLocalSize(sizePx);
  }, [sizePx]);

  // Pointer event tracking for smooth, non-blocking real-time resize execution
  useEffect(() => {
    if (!resizing) return;

    const handlePointerMove = (e: PointerEvent) => {
      const deltaX = e.clientX - resizing.startX;
      const deltaY = e.clientY - resizing.startY;
      
      let delta = 0;
      if (resizing.corner === 'br') {
        delta = Math.max(deltaX, deltaY);
      } else if (resizing.corner === 'tr') {
        delta = Math.max(deltaX, -deltaY);
      } else if (resizing.corner === 'bl') {
        delta = Math.max(-deltaX, deltaY);
      } else if (resizing.corner === 'tl') {
        delta = Math.max(-deltaX, -deltaY);
      }
      
      // Canva-style proportional scaling from central coordinate anchor (requires 2x delta adjustment)
      const newSize = Math.max(50, Math.min(500, resizing.startSize + (delta * 2)));
      setLocalSize(newSize);
    };

    const handlePointerUp = (e: PointerEvent) => {
      const deltaX = e.clientX - resizing.startX;
      const deltaY = e.clientY - resizing.startY;
      
      let delta = 0;
      if (resizing.corner === 'br') {
        delta = Math.max(deltaX, deltaY);
      } else if (resizing.corner === 'tr') {
        delta = Math.max(deltaX, -deltaY);
      } else if (resizing.corner === 'bl') {
        delta = Math.max(-deltaX, deltaY);
      } else if (resizing.corner === 'tl') {
        delta = Math.max(-deltaX, -deltaY);
      }
      
      const finalSize = Math.max(50, Math.min(500, resizing.startSize + (delta * 2)));
      if (onUpdateSize) {
        onUpdateSize(id, finalSize);
      }
      setResizing(null);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [resizing, id, onUpdateSize]);

  // Use Native DOM event listeners for the corner handles to stop event propagation directly 
  // before Framer Motion's internal capture handlers can intercept pointer events.
  useEffect(() => {
    const shouldBind = isSelected || isHovered;
    if (!shouldBind) return;

    const handleDown = (corner: string, e: MouseEvent | TouchEvent | PointerEvent) => {
      // Critical: stop propagation natively so Framer Motion's listeners do not capture the event
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      const clientX = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientY : (e as MouseEvent).clientY;

      if (onSelect) {
        onSelect();
      }

      setResizing({
        corner,
        startX: clientX,
        startY: clientY,
        startSize: localSize
      });
    };

    const tl = tlRef.current;
    const tr = trRef.current;
    const bl = blRef.current;
    const br = brRef.current;

    const listeners = [
      { element: tl, corner: 'tl' },
      { element: tr, corner: 'tr' },
      { element: bl, corner: 'bl' },
      { element: br, corner: 'br' }
    ];

    listeners.forEach(({ element, corner }) => {
      if (!element) return;
      
      const onDown = (e: any) => handleDown(corner, e);
      
      // We use capture phase and cover all main pointer events natively
      element.addEventListener('pointerdown', onDown, { capture: true });
      element.addEventListener('mousedown', onDown, { capture: true });
      element.addEventListener('touchstart', onDown, { capture: true });
      
      (element as any)._onDown = onDown;
    });

    return () => {
      listeners.forEach(({ element }) => {
        if (!element) return;
        const onDown = (element as any)._onDown;
        if (onDown) {
          element.removeEventListener('pointerdown', onDown, { capture: true });
          element.removeEventListener('mousedown', onDown, { capture: true });
          element.removeEventListener('touchstart', onDown, { capture: true });
        }
      });
    };
  }, [isSelected, isHovered, localSize, onSelect]);

  const handleDragEnd = (_event: any, info: any) => {
    if (!dragConstraintsRef.current || !stickerRef.current) return;
    
    const container = dragConstraintsRef.current;
    const containerRect = container.getBoundingClientRect();
    const stickerRect = stickerRef.current.getBoundingClientRect();

    // Because of translate(-50%, -50%) on the inner div, the visual center
    // of the sticker is located exactly at the top-left corner of the parent motion.div (stickerRect).
    const relativeX = stickerRect.left - containerRect.left;
    const relativeY = stickerRect.top - containerRect.top;

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

    let src = '';
    if (imagePath) {
      src = imagePath;
    } else {
      // Determine path dynamically from the current pathname (fallback)
      const pathname = typeof window !== 'undefined' ? window.location.pathname || '/' : '/';
      const clean = pathname.replace(/^\//, '');
      const pageKey = clean === '' ? 'about' : clean;

      const { folder, totalFiles } = getFolderAndFilesForPage(pageKey);
      const index = getStickerIndex(id, totalFiles);
      src = `${folder}sticker${index}.webp`;
    }

    const rotationClass = getStickerRotation(id);

    return (
      <img
        src={src}
        alt={label || 'Sticker'}
        onError={() => setHasError(true)}
        style={{ width: `${localSize}px`, height: `${localSize}px` }}
        className={`object-contain select-none cursor-grab active:cursor-grabbing ${rotationClass} hover:rotate-0 transition-shadow duration-150`}
        draggable={false}
        referrerPolicy="no-referrer"
      />
    );
  };

  if (hasError) return null;

  const showEditingControls = isSelected || isHovered;

  return (
    <motion.div
      key={`${id}-${x}-${y}`}
      ref={stickerRef}
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={dragConstraintsRef}
      onDragEnd={handleDragEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        zIndex: isSelected ? 150 : 50,
      }}
      className="absolute pointer-events-auto selection:bg-transparent group/sticker"
    >
      <div 
        style={{ 
          transform: 'translate(-50%, -50%)',
          width: `${localSize}px`,
          height: `${localSize}px`,
          touchAction: 'none'
        }} 
        className={`relative pointer-events-auto select-none transition-shadow duration-150 ${
          isSelected 
            ? 'ring-2 ring-indigo-500 rounded-sm shadow-md' 
            : isHovered 
              ? 'ring-1 ring-indigo-300 rounded-sm' 
              : ''
        }`}
        onPointerDown={(e) => {
          // Select sticker and prepare for standard framer motion drag initiation on stick body click
          e.stopPropagation();
          if (onSelect) {
            onSelect();
          }
          dragControls.start(e);
        }}
      >
        {renderStickerContent()}
        
        {/* Resize Handles (Corner controls in custom selection states) */}
        {showEditingControls && onUpdateSize && (
          <>
            {/* Top Left Corner */}
            <div
              ref={tlRef}
              style={{ touchAction: 'none' }}
              className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-2 border-indigo-500 rounded-full cursor-nwse-resize z-[75] shadow-sm hover:scale-125 transition-transform"
              title="Resize"
            />
            {/* Top Right Corner */}
            <div
              ref={trRef}
              style={{ touchAction: 'none' }}
              className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-2 border-indigo-500 rounded-full cursor-nesw-resize z-[75] shadow-sm hover:scale-125 transition-transform"
              title="Resize"
            />
            {/* Bottom Left Corner */}
            <div
              ref={blRef}
              style={{ touchAction: 'none' }}
              className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-2 border-indigo-500 rounded-full cursor-nesw-resize z-[75] shadow-sm hover:scale-125 transition-transform"
              title="Resize"
            />
            {/* Bottom Right Corner */}
            <div
              ref={brRef}
              style={{ touchAction: 'none' }}
              className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-2 border-indigo-500 rounded-full cursor-nwse-resize z-[75] shadow-sm hover:scale-125 transition-transform"
              title="Resize"
            />
          </>
        )}

        {/* Delete Trigger */}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            onPointerDown={(e) => {
              // Standard stop to prevent drag start on deletion press
              e.stopPropagation();
            }}
            className={`absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-[12px] opacity-0 group-hover/sticker:opacity-100 transition-opacity cursor-pointer z-[80] shadow-sm border border-white font-sans font-bold leading-none`}
            title="Delete sticker"
          >
            ×
          </button>
        )}
      </div>
    </motion.div>
  );
}
