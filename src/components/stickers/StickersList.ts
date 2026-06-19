/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageName, TemplateType, Sticker } from '../../types';

const UNIFIED_ABOUT: Sticker[] = [
  { id: 'uni-about-1', type: 'paper-tab', label: 'CREATOR CORE', defaultX: 10, defaultY: 15 },
  { id: 'uni-about-2', type: 'tape-strip', label: 'TAPE: READ ME', defaultX: 84, defaultY: 25 },
  { id: 'uni-about-3', type: 'neon-highlight', label: 'CORE_IDENTITY // ACTIVATE', defaultX: 12, defaultY: 82 }
];

const UNIFIED_ACHIEVEMENTS: Sticker[] = [
  { id: 'uni-ach-1', type: 'paper-tab', label: 'ACCOMPLISHMENTS', defaultX: 8, defaultY: 18 },
  { id: 'uni-ach-2', type: 'doodle-shape', label: 'sparkle', defaultX: 86, defaultY: 24, emoji: '✨' },
  { id: 'uni-ach-3', type: 'photo-cutout-frame', label: 'Winner Card', defaultX: 78, defaultY: 76, emoji: '🏆' }
];

const UNIFIED_CERTIFICATES: Sticker[] = [
  { id: 'uni-cert-1', type: 'paper-tab', label: 'VERIFIED REPO', defaultX: 14, defaultY: 16 },
  { id: 'uni-cert-2', type: 'doodle-shape', label: 'memo', defaultX: 88, defaultY: 28, emoji: '📝' },
  { id: 'uni-cert-3', type: 'photo-cutout-frame', label: 'Study Table', defaultX: 82, defaultY: 74, emoji: '📚' }
];

const UNIFIED_LEADERSHIP: Sticker[] = [
  { id: 'uni-lead-1', type: 'paper-tab', label: 'SYSTEM CO-OP', defaultX: 12, defaultY: 22 },
  { id: 'uni-lead-2', type: 'doodle-shape', label: 'handshake', defaultX: 85, defaultY: 18, emoji: '🤝' },
  { id: 'uni-lead-3', type: 'grid-fragment', label: 'SYS_LEADERSHIP', defaultX: 80, defaultY: 80 }
];

const UNIFIED_TECH_STACKS: Sticker[] = [
  { id: 'uni-tech-1', type: 'paper-tab', label: 'CORE LIBRARIES', defaultX: 11, defaultY: 15 },
  { id: 'uni-tech-2', type: 'doodle-shape', label: 'lightning', defaultX: 88, defaultY: 25, emoji: '⚡' },
  { id: 'uni-tech-3', type: 'photo-cutout-frame', label: 'Clean Code', defaultX: 78, defaultY: 78, emoji: '💻' }
];

const UNIFIED_CONTACT: Sticker[] = [
  { id: 'uni-con-1', type: 'paper-tab', label: 'INBOUND CONNECTIONS', defaultX: 14, defaultY: 20 },
  { id: 'uni-con-2', type: 'doodle-shape', label: 'heart', defaultX: 86, defaultY: 15, emoji: '♥' },
  { id: 'uni-con-3', type: 'neon-highlight', label: 'TRANSCEIVER_READY', defaultX: 78, defaultY: 84 }
];

const PAGES_MAP: Record<string, Sticker[]> = {
  about: UNIFIED_ABOUT,
  achievements: UNIFIED_ACHIEVEMENTS,
  certificates: UNIFIED_CERTIFICATES,
  leadership: UNIFIED_LEADERSHIP,
  'tech-stacks': UNIFIED_TECH_STACKS,
  contact: UNIFIED_CONTACT
};

export const DEFAULT_STICKERS: Record<TemplateType, Record<string, Sticker[]>> = {
  minimalism: PAGES_MAP,
  editorial: PAGES_MAP,
  futuristic: PAGES_MAP
};

