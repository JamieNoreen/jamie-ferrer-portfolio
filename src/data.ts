/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TimelineItem, SkillGroup, AchievementItem, LeaderShipItem, CertificateItem } from './types';

export const TIMELINE_MILESTONES: TimelineItem[] = [
  {
    year: '2025',
    title: 'Lead Frontend UI Architect',
    subtitle: 'Modular Canvas Workspaces',
    description: 'Spearheaded team of developers rewriting canvas editors into modular high-performance React components, dropping rendering latency by 45%.'
  },
  {
    year: '2024',
    title: 'Creative Technologist Partner',
    subtitle: 'Studio Fluid Motion',
    description: 'Designed interactive sensory display portals for major e-commerce platforms, utilizing customized vector engines and inertia physics.'
  },
  {
    year: '2023',
    title: 'Visual Designer & Dev Specialist',
    subtitle: 'OpenSource UI Engine Project',
    description: 'Author/maintainer of custom layout specs. Crafted a library of responsive CSS layouts, gaining community adoption.'
  },
  {
    year: '2021',
    title: 'Design Science Honors Graduate',
    subtitle: 'School of Interactive Arts',
    description: 'Graduated top of class with thesis on visual editor layouts and human heuristics, laying the groundwork for interactive creative workspaces.'
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Design & Workspace APIs',
    items: ['Figma Editor API', 'Adobe Express Schemas', 'SVG Vector Engines', 'Typography Pairing', 'Interactive Prototypes']
  },
  {
    category: 'Frontend Engineering',
    items: ['React 19 / Hooks', 'TypeScript Invariants', 'Vite / Tailwind CSS', 'Framer Motion System', 'Next.js App Router']
  },
  {
    category: 'Interactive Performance',
    items: ['State Engine (Zustand)', 'LocalStorage Caching', 'Canvas Render Loops', 'Performance Benchmarking', 'DOM Layout Listeners']
  },
  {
    category: 'Tooling & Execution',
    items: ['Git Workspace Versioning', 'Esbuild Compilation', 'Linter Pipelines', 'Container Orchestration', 'Asset Optimization']
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: 'Design Hero Platinum Award',
    issuer: 'Creative Technologist Conference',
    year: '2025',
    detail: 'Ranked #1 for best standalone digital workspace layout engine, evaluated on speed, responsiveness, and responsive ergonomics.'
  },
  {
    title: 'Outstanding Open Contributor Trophy',
    issuer: 'Global Web Standards Group',
    year: '2024',
    detail: 'Recognized for building lightweight animation wrappers that simplify responsive frame rendering transitions.'
  },
  {
    title: 'Interactive Design Scholarship Awardee',
    issuer: 'Digital Arts Endowment Fund',
    year: '2022',
    detail: 'Recipient of project funding to research cognitive load theories in browser-based image workspace layouts.'
  }
];

export const LEADERSHIP: LeaderShipItem[] = [
  {
    role: 'Creative Cohort Director',
    org: 'Design + Craft Community',
    year: '2024 - Present',
    impact: [
      'Facilitated weekly sandbox labs covering type pairing and grid balance, training over 1,200 aspiring UI engineers.',
      'Organized global hackathons matching visual designers with developers, producing dozens of innovative open-source web utilities.',
      'Authored the complete UI workstation handbook downloaded globally for rapid visual template assembly.'
    ]
  },
  {
    role: 'Technical Lead Coordinator',
    org: 'Global Design Tech Consortium',
    year: '2023 - 2024',
    impact: [
      'Coordinated working groups proposing native responsive browser token standards to lower animation CPU loads.',
      'Reviewed hundreds of layout engine pull requests, maintaining pristine compliance, speed, and standard design principles.'
    ]
  }
];

export const CERTIFICATES: CertificateItem[] = [
  {
    name: 'Advanced Vector Layout & Design Spec',
    provider: 'World Human-Computer Heuristic Center',
    id: 'CERT-VECT-4082',
    linkText: 'Verify Token Grid'
  },
  {
    name: 'Modern Web System Optimization Specialist',
    provider: 'Global System Performance Labs',
    id: 'CERT-PERF-92A3',
    linkText: 'Check Render Speed Log'
  },
  {
    name: 'High-Response Frontend UI Architecture',
    provider: 'Interactive Systems Academy',
    id: 'CERT-ARCH-3081',
    linkText: 'Review Spec Compliance'
  },
  {
    name: 'Typography Rules & Structural Rythms',
    provider: 'Editorial Design Federation',
    id: 'CERT-TYPE-1120',
    linkText: 'Verify Font Mapping'
  }
];
