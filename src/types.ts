/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageName = 
  | 'home' 
  | 'about' 
  | 'projects' 
  | 'achievements' 
  | 'certificates' 
  | 'leadership' 
  | 'tech-stacks' 
  | 'contact'
  | 'logos';

export type TemplateType = 'minimalism' | 'editorial' | 'futuristic';

export interface Sticker {
  id: string;
  type: string; // e.g., 'paper-tab', 'star', 'tape', 'doodle', 'neon-ring', 'circle-badge', 'bracket'
  label?: string;
  defaultX: number; // percentage based or initial px
  defaultY: number; // percentage based or initial px
  color?: string;
  emoji?: string;
  size?: string;
}

export interface ShowcaseScreenItem {
  src: string;
  caption: string;
}

export interface ShowcaseScreenGroup {
  groupTitle?: string;
  description?: string;
  images: ShowcaseScreenItem[];
}

export interface MockupItem {
  src: string;
  orientation: 'landscape' | 'portrait';
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  categories?: string[];
  type: 'case-study' | 'showcase' | 'gallery-3d';
  year: string;
  description: string;
  role: string;
  tools: string[];
  bannerColor: string; // Tailwind bg-class
  accentColor: string; // Tailwind text/border class
  // 3D GALLERY specific
  softwareUsed?: string;
  totalPages?: number;
  isAcademic?: boolean;
  galleryPages?: string[];
  // CATEGORY A (Case Study) specific
  caseStudyImages?: string[]; // Array of slide image paths
  // CATEGORY B (Showcase) specific
  showcaseHero?: string; // Hero image path
  showcaseProblemImage?: string; // Problem image path
  showcaseProblemText?: string; // Problem explanation
  showcaseScreens?: ShowcaseScreenGroup[]; // Screens and groups with captions
  showcaseOutcome?: string; // Outcome text
  mockupImages?: MockupItem[]; // Responsive editorial mockups
  // Meta data
  award?: string;
  awards?: string[];
  recognition?: string;
  competition?: string;
  leadershipResponsibilities?: string;
  thumbnail?: string;
  
  // Backward compatibility
  mockups: {
    title: string;
    description: string;
    bgStyle: string; // e.g., gradient
    items: string[];
  }[];
  outcome: string;
}

export const PROJECTS: Project[] = [
{
    slug: 'scaffled',
    title: 'Scaffl.ed',
    subtitle: 'Visual scaffolding and interactive curriculum planner for educators',
    category: 'Featured',
    categories: ['Featured', 'Products'],
    type: 'case-study',
    year: '2024',
    thumbnail: '/portfolio-assets/projects/scaffled/File1.png',
    award: 'BEST IN THESIS',
    awards: ['BEST IN THESIS', 'PSC9 2ND RUNNER-UP'],
    description: 'An intuitive platform designed to bridge lesson planning and visual instruction, enabling educators to create interactive curriculum models step-by-step.',
    role: 'Lead UI/UX Designer & Researcher',
    tools: ['Figma', 'React', 'D3.js', 'Canva Suite'],
    bannerColor: 'bg-gradient-to-tr from-sky-400 via-indigo-500 to-indigo-600',
    accentColor: 'text-indigo-600 border-indigo-200',
    caseStudyImages: [
      '/portfolio-assets/projects/scaffled/File1.png',
      '/portfolio-assets/projects/scaffled/File2.png',
      '/portfolio-assets/projects/scaffled/File3.png',
      '/portfolio-assets/projects/scaffled/File4.png',
      '/portfolio-assets/projects/scaffled/File5.png',
      '/portfolio-assets/projects/scaffled/File6.png',
      '/portfolio-assets/projects/scaffled/File7.png',
      '/portfolio-assets/projects/scaffled/File8.png',
      '/portfolio-assets/projects/scaffled/File9.png',
      '/portfolio-assets/projects/scaffled/File10.png',
      '/portfolio-assets/projects/scaffled/File11.png',
      '/portfolio-assets/projects/scaffled/File12.png',
      '/portfolio-assets/projects/scaffled/File13.png',
      '/portfolio-assets/projects/scaffled/File14.png',
      '/portfolio-assets/projects/scaffled/File15.png'
    ],
    outcome: 'Implemented in 3 experimental school districts, receiving a 94% approval rating from educators who noted a significant reduction in weekly lesson-mapping overhead.',
    mockups: []
  },
 {
    slug: 'studdy',
    title: 'Studdy',
    subtitle: 'Smart learning planner and gamified flashcard app for Filipino students',
    category: 'Products',
    categories: ['Featured', 'Products'],
    type: 'case-study',
    year: '2024',
    thumbnail: '/portfolio-assets/projects/studdy/File1.png',
    award: 'PSC9 2ND RUNNER-UP',
    awards: ['PSC9 2ND RUNNER-UP'],
    description: 'A gamified academic academic planner designed specifically around localized schedules and study habits of Filipino students, utilizing positive reinforcement and spaced repetition techniques.',
    role: 'Product & Interaction Designer',
    tools: ['Figma', 'Framer Motion', 'React Native', 'Tailwind'],
    bannerColor: 'bg-gradient-to-br from-violet-600 to-purple-800',
    accentColor: 'text-violet-600 border-violet-200',
    caseStudyImages: [
      '/portfolio-assets/projects/studdy/File1.png',
      '/portfolio-assets/projects/studdy/File2.png',
      '/portfolio-assets/projects/studdy/File3.png',
      '/portfolio-assets/projects/studdy/File4.png',
      '/portfolio-assets/projects/studdy/File5.png',
      '/portfolio-assets/projects/studdy/File6.png',
      '/portfolio-assets/projects/studdy/File7.png',
      '/portfolio-assets/projects/studdy/File8.png',
      '/portfolio-assets/projects/studdy/File9.png',
      '/portfolio-assets/projects/studdy/File10.png',
      '/portfolio-assets/projects/studdy/File11.png',
      '/portfolio-assets/projects/studdy/File12.png',
      '/portfolio-assets/projects/studdy/File13.png',
      '/portfolio-assets/projects/studdy/File14.png'
    ],
    outcome: 'Successfully tested in pilot student focus groups, marking a 30% self-reporting increase in study session duration and better task-completion accountability.',
    mockups: []
  },
  {
    slug: 'tulai',
    title: 'TulAI',
    subtitle: 'AI-powered legal translation and assistance tool for local Filipino communities',
    category: 'Products',
    categories: ['Products'],
    type: 'showcase',
    year: '2024',
    thumbnail: '/portfolio-assets/projects/tulai/thumbnail.png',
    description: 'An intelligence utility designed to demystify complex legal documents by translating and explaining them in clear, vernacular Tagalog and regional dialects, bringing legal clarity to underrepresented groups.',
    role: 'Lead AI & Full-Stack Engineer',
    tools: ['Gemini API', 'Next.js', 'PostgreSQL', 'Tailwind CSS'],
    bannerColor: 'bg-gradient-to-tr from-[#0B4F4F] via-[#115E59] to-[#134E4A]',
    accentColor: 'text-teal-600 border-teal-200',
    showcaseHero: '/portfolio-assets/projects/tulai/thumbnail.png',
    showcaseProblemImage: '/portfolio-assets/projects/tulai/problem.png',
    showcaseProblemText: 'Legal documentation in the Philippines is predominantly authored in highly formal English text loaded with complex jargon, making understanding and compliance incredibly difficult for ordinary citizens who are not fluent in legal terms.',
    showcaseScreens: [
      {
        groupTitle: 'Dashboard Workspace',
        description: 'Central workspace for managing translation workflows and monitoring pending legal documents.',
        images: [
          {
            src: '/portfolio-assets/projects/tulai/screen1.png',
            caption: 'Central Workspace Dashboard tracking translations and pending queues.'
          }
        ]
      },
      {
        groupTitle: 'Verification and Reports',
        description: 'Interactive double-review verification module and system reports analysis.',
        images: [
          {
            src: '/portfolio-assets/projects/tulai/screen2.png',
            caption: 'Performance analytics, feedback reporting, and translation reviews.'
          }
        ]
      }
    ],
    showcaseOutcome: 'Bridged legal accessibility to over 1,200 non-English readers in pilot barangays, achieving extremely high accuracy in conversational language conversions.',
    mockupImages: [
      { src: '/portfolio-assets/projects/tulai/mockup1.png', orientation: 'landscape', caption: 'High-Fidelity Translation Workspace and Original Text Comparison' },
      { src: '/portfolio-assets/projects/tulai/mockup2.png', orientation: 'landscape', caption: 'Interactive Document Breakdown with Inline Glossary Explanations' },
      { src: '/portfolio-assets/projects/tulai/mockup3.png', orientation: 'landscape', caption: 'Mobile Vernacular Review & Team Translation Sync Portal' }
    ],
    award: 'NEDA-HABI CHAMPION',
    awards: ['NEDA-HABI CHAMPION'],
    recognition: 'Honored by Local Government Units (LGU)',
    competition: 'Philippine National AI Hackathon 2024',
    outcome: 'Bridged legal accessibility to over 1,200 non-English readers in pilot barangays.',
    mockups: []
  },
  {
    slug: 'plantego',
    title: 'Plantego',
    subtitle: 'Interactive plant care companion and automated smart watering log',
    category: 'Products',
    categories: ['Products'],
    type: 'showcase',
    year: '2023',
    thumbnail: '/portfolio-assets/projects/plantego/thumbnail.png',
    description: 'An IoT-adjacent smart plant care log that guides indoor gardening enthusiasts by charting soil hydration thresholds and tracking watering rituals.',
    role: 'Frontend Developer & Designer',
    tools: ['React', 'ChartJS', 'Bluetooth Web API', 'Tailwind'],
    bannerColor: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-teal-650',
    accentColor: 'text-emerald-600 border-emerald-200',
    showcaseHero: '/portfolio-assets/projects/plantego/thumbnail.png',
    showcaseProblemImage: '/portfolio-assets/projects/plantego/problem.png',
    showcaseProblemText: 'Indoor plants routinely die of over-watering or under-watering as beginners struggle to diagnose subtle variations in soil dampness or identify the specific needs of multiple nested species.',
    showcaseScreens: [
      {
        groupTitle: 'Core Dashboard & Device Hub',
        description: 'Watering frequency log accompanied by automated moisture metrics and smart plant-specific diagnostics.',
        images: [
          {
            src: '/portfolio-assets/projects/plantego/screen.png',
            caption: 'Plantego main companion application dashboard highlighting hydration trackers and live device inputs.'
          }
        ]
      }
    ],
    showcaseOutcome: 'Helped urban gardeners sustain over 40 different delicate plant species with automated health score metrics and persistent plant-specific reminders.',
    mockupImages: [
      { src: '/portfolio-assets/projects/plantego/mockup1.png', orientation: 'landscape', caption: 'Botanical Greenhouse Smart Logger and Microclimate Forecasts' },
      { src: '/portfolio-assets/projects/plantego/mockup2.png', orientation: 'landscape', caption: 'Watering Frequency Cohort Charts and Soil Dampness Metrics' },
      { src: '/portfolio-assets/projects/plantego/mockup3.png', orientation: 'portrait', caption: 'Plantego Mobile Assistant Log & Live Bluetooth Soil Probe Sensor Reader' }
    ],
    award: 'ASEAN DSE 2ND RUNNER-UP',
    awards: ['ASEAN DSE 2ND RUNNER-UP'],
    recognition: 'Featured in Manila Eco-Design Exhibition',
    competition: 'SustainTech Smart City Challenge',
    outcome: 'Sustained over 40 distinct plant species through adaptive micro-watering notifications.',
    mockups: []
  },
  {
    slug: 'pasada',
    title: 'Pasada',
    subtitle: 'Philippines modern jeepney routes, transit ticketing, and live tracker app',
    category: 'Products',
    categories: ['Products'],
    type: 'showcase',
    year: '2023',
    thumbnail: '/portfolio-assets/projects/pasada/thumbnail.png',
    description: 'A real-time transit scheduler and digital ticketing solution designed for modern public utility jeepney (PUJ) operators and daily Filipino commuters.',
    role: 'Mobile Architect & UI Specialist',
    tools: ['Google Maps Platform', 'React Native', 'Node.js', 'Socket.io'],
    bannerColor: 'bg-gradient-to-br from-indigo-700 via-blue-805 to-blue-900',
    accentColor: 'text-blue-600 border-indigo-200',
    showcaseHero: '/portfolio-assets/projects/pasada/thumbnail.png',
    showcaseProblemImage: '/portfolio-assets/projects/pasada/problem.png',
    showcaseProblemText: 'A lack of consolidated route information and fixed arrival timings leaves modern jeepney commuters guessing, resulting in long terminal lines and inefficient dispatcher loading schedules.',
    showcaseScreens: [
      {
        groupTitle: 'Driver Operations Suite',
        description: 'Mobile portal for jeepney drivers and fleet managers to monitor active routes, track rider telemetry, and view passenger capacity levels.',
        images: [
          {
            src: '/portfolio-assets/projects/pasada/screen.png',
            caption: 'Driver operational hub indicating active loops, fare claims, and transit coordinates.'
          }
        ]
      }
    ],
    showcaseOutcome: 'Successfully launched a 12-jeepney active route trial in a busy metropolitan hub, reducing commuter waiting intervals from 25 minutes down to 8 minutes.',
    mockupImages: [
      { src: '/portfolio-assets/projects/pasada/mockup1.png', orientation: 'landscape', caption: 'Driver Telemetry Dashboard & Route Scheduling Interface' },
      { src: '/portfolio-assets/projects/pasada/mockup2.png', orientation: 'landscape', caption: 'Commuter Mobile Ticket Booking & Live Route Progress Tracker' },
      { src: '/portfolio-assets/projects/pasada/mockup3.png', orientation: 'landscape', caption: 'Transit Route Optimization Analytics and System Performance Metrics' }
    ],
    competition: 'Smart Transit Hackathon',
    outcome: 'Reduced commuter waiting intervals from 25 minutes down to 8 minutes across active test loops.',
    mockups: []
  },
  {
    slug: 'lakadph',
    title: 'LakadPH',
    subtitle: 'Vibrant travel companion brandmark and exploration guide for local tourism',
    category: 'Products',
    categories: ['Products'],
    type: 'showcase',
    year: '2024',
    thumbnail: '/portfolio-assets/projects/lakadph/thumbnail.png',
    description: 'A digital travel identity and itinerary builder celebrating regional culture and off-the-beaten-path destinations across the Philippine archipelago.',
    role: 'Identity Designer & Lead Researcher',
    tools: ['Figma', 'Adobe Illustrator', 'Brand Metaphor Systems'],
    bannerColor: 'bg-gradient-to-tr from-sky-400 via-teal-500 to-orange-500',
    accentColor: 'text-orange-600 border-orange-200',
    showcaseHero: '/portfolio-assets/projects/lakadph/thumbnail.png',
    showcaseProblemImage: '/portfolio-assets/projects/lakadph/problem.png',
    showcaseProblemText: 'Local travel programs suffer from fragmented regional guide resources, leaving travelers relying on generic itineraries while smaller, culturally rich eco-tourism spots remain completely invisible.',
    showcaseScreens: [
      {
        groupTitle: 'City Dashboard',
        description: 'Administrative dashboard for monitoring pedestrian reports, route conditions, and city-wide walkability insights.',
        images: [
          {
            src: '/portfolio-assets/projects/lakadph/screen1.png',
            caption: 'City Dashboard overview tracking sidewalk conditions and report density levels.'
          }
        ]
      },
      {
        groupTitle: 'Core Mobile Experience',
        description: 'Mobile navigation experience helping users discover safer and more walkable routes.\n\nFeatures Shown:\n• Smart Route Planning\n• Comfort-Based Route Selection\n• Real-Time Navigation\n• Route Feedback',
        images: [
          {
            src: '/portfolio-assets/projects/lakadph/screen2.png',
            caption: 'Core mobile application views presenting pedestrian directions and heatmaps.'
          }
        ]
      }
    ],
    showcaseOutcome: 'Delivered highly coherent identity styleguides and interactive prototype blueprints adopted as conceptual references by local eco-tourism advocates.',
    mockupImages: [
      { src: '/portfolio-assets/projects/lakadph/mockup1.png', orientation: 'landscape', caption: 'Interactive Itinerary Planner & Culturally Curated Route Mapping Studio' },
      { src: '/portfolio-assets/projects/lakadph/mockup2.png', orientation: 'landscape', caption: 'Regional Visual Asset Board, Metaphors & Eco-tourism Promotion Grid' },
      { src: '/portfolio-assets/projects/lakadph/mockup3.png', orientation: 'landscape', caption: 'Mobile Discovery Travel Diary & Local Homestay Booking Blueprint' }
    ],
    award: 'BLUHACKS CHAMPION',
    awards: ['BLUHACKS CHAMPION'],
    recognition: 'Featured in Creative Nation Brand Awards Showcase',
    outcome: 'Blueprints adopted as conceptual references by eco-tourism promotion advocates.',
    mockups: []
  },
  {
    slug: 'rooted',
    title: 'Rooted',
    subtitle: 'Personal journaling app and mental-health reflection dashboard',
    category: 'Featured',
    categories: ['Featured'],
    type: 'case-study',
    year: '2023',
    thumbnail: '/images/thumbnails/rooted.png',
    description: 'A minimal, private reflective notebook that assists users in cataloging emotional trends through interactive prompts and private speech-logging diaries.',
    role: 'Solo Product Designer',
    tools: ['Figma', 'Prototyping', 'User Psychology Framework', 'Inter Design'],
    bannerColor: 'bg-gradient-to-br from-neutral-800 to-neutral-950',
    accentColor: 'text-[#00FF88] border-neutral-700',
    caseStudyImages: [
      '/images/rooted/slide1.png',
      '/images/rooted/slide2.png',
      '/images/rooted/slide3.png',
      '/images/rooted/slide4.png',
      '/images/rooted/slide5.png'
    ],
    competition: 'Interaction Design Summit',
    outcome: 'Achieved zero drop-off during a 30-day user feedback cohort study.',
    mockups: []
  },
  {
    slug: 'farmory',
    title: 'Farmory',
    subtitle: 'Open-source farm inventory tracker and distribution network',
    category: 'Products',
    categories: ['Products'],
    type: 'showcase',
    year: '2023',
    thumbnail: '/portfolio-assets/projects/farmory/thumbnail.png',
    description: 'A secure agricultural database tracking crop inventories and establishing shared distribution links to prevent food waste across local cooperative farms.',
    role: 'Database Specialist & Developer',
    tools: ['SQL', 'React', 'Drizzle ORM', 'Tailwind'],
    bannerColor: 'bg-gradient-to-br from-amber-800 via-slate-800 to-emerald-950',
    accentColor: 'text-emerald-500 border-emerald-350',
    showcaseHero: '/portfolio-assets/projects/farmory/thumbnail.png',
    showcaseProblemImage: '/portfolio-assets/projects/farmory/problem.png',
    showcaseProblemText: 'Cooperative farms frequently suffer from storage communication breakdowns, leading to high-quality crop spoilage while adjacent processing channels experience critical supply shortages.',
    showcaseScreens: [
      {
        groupTitle: 'Insurance Management Dashboard',
        description: 'Administrative dashboard used by insurers to monitor claims, manage farmers, review risk data, process insurance requests, and oversee platform operations.',
        images: [
          {
            src: '/portfolio-assets/projects/farmory/screen1.png',
            caption: 'Insurance Management Dashboard - Complete administrator control panel tracking active claims, risk metrics, and pending requests.'
          }
        ]
      },
      {
        groupTitle: 'Insurer Platform',
        description: 'Administrative tools for reviewing claims, managing farmer records, monitoring harvest data, and processing insurance operations.',
        images: [
          {
            src: '/portfolio-assets/projects/farmory/screen2.png',
            caption: 'Claims Queue - Real-time queue featuring incoming cooperative claims with integrated risk analysis attributes.'
          },
          {
            src: '/portfolio-assets/projects/farmory/screen3.png',
            caption: 'Claim Details - Multi-tab assessment workspace consolidating damage logs, farm photos, and verification records.'
          },
          {
            src: '/portfolio-assets/projects/farmory/screen4.png',
            caption: 'Batch Payment & Ledger - Financial dashboard executing bulk transactions to verified agrarian cooperators.'
          },
          {
            src: '/portfolio-assets/projects/farmory/screen5.png',
            caption: 'Cooperative Farmers Directory - Centralized catalog organizing registered members, historical yields, and soil safety parameters.'
          }
        ]
      },
      {
        groupTitle: 'Farmer Mobile Experience',
        description: 'Mobile-first workflows allowing farmers to register, manage crops, submit insurance claims, and track claim status in real time.',
        images: [
          {
            src: '/portfolio-assets/projects/farmory/screen6.png',
            caption: 'Farmer Mobile Onboarding - Clean, accessible portal guide introducing simple smart agricultural utilities.'
          },
          {
            src: '/portfolio-assets/projects/farmory/screen7.png',
            caption: 'Crop Inventory Entry - Responsive, high-contrast inputs for logging seed bags, moisture levels, and harvest dates.'
          },
          {
            src: '/portfolio-assets/projects/farmory/screen8.png',
            caption: 'Filing a Claim - Direct, user-friendly mobile steps to upload leaf damage photos with geolocation.'
          },
          {
            src: '/portfolio-assets/projects/farmory/screen9.png',
            caption: 'Track Claims & Payments - Interactive progress bars indicating real-time claim audits and final payments.'
          }
        ]
      }
    ],
    showcaseOutcome: 'Created an open agricultural schema reducing crop distribution delays by 35% in small farming cooperatives.',
    mockupImages: [
      { src: '/portfolio-assets/projects/farmory/mockup1.png', orientation: 'landscape', caption: 'Interactive Cooperative Seed Reserves, Harvest Registry & Scheduler' },
      { src: '/portfolio-assets/projects/farmory/mockup2.png', orientation: 'landscape', caption: 'Farming Logbook Metrics, Moisture Cohorts & Geographic Yield Profiles' },
      { src: '/portfolio-assets/projects/farmory/mockup3.png', orientation: 'landscape', caption: 'Live Logistics Board, Truck Loading Protocols & Community Distribution Dashboard' }
    ],
    competition: 'AgriTech Innovations Conference',
    outcome: 'Open agricultural database schema cut scheduling conflicts by 35% across 4 cooperatives.',
    mockups: []
  },
  {
    slug: 'scaffy',
    title: 'Scaffy',
    subtitle: '3D Mascot Design',
    category: '3D',
    categories: ['3D'],
    type: 'gallery-3d',
    year: '2024',
    thumbnail: '/portfolio-assets/3ds/scaffy/thumbnail.png',
    description: 'A friendly 3D character mascot meticulously modeled, textured, and rigged for high-fidelity animations.',
    role: '3D Artist & Rigging Lead',
    tools: ['Blender', 'Substance Painter'],
    softwareUsed: 'Blender',
    totalPages: 7,
    isAcademic: false,
    galleryPages: [
      '/portfolio-assets/3ds/scaffy/thumbnail.png',
      '/portfolio-assets/3ds/scaffy/1.png',
      '/portfolio-assets/3ds/scaffy/2.png',
      '/portfolio-assets/3ds/scaffy/3.png',
      '/portfolio-assets/3ds/scaffy/4.png',
      '/portfolio-assets/3ds/scaffy/5.png',
      '/portfolio-assets/3ds/scaffy/6.png'
    ],
    bannerColor: 'from-amber-400 via-orange-500 to-red-500',
    accentColor: 'text-orange-600 border-orange-200',
    outcome: 'Mascot successfully modeled and fully rigged to support over 40 distinct promotional animations.',
    mockups: []
  },
 {
    slug: 'barbie-doll-house',
    title: 'Barbie Doll House',
    subtitle: '3D Interior & Layout Design',
    category: '3D',
    categories: ['3D'],
    type: 'gallery-3d',
    year: '2023',
    thumbnail: '/portfolio-assets/3ds/barbie/thumbnail.png',
    description: 'Comprehensive 3D styling, architecture, and interior blueprint modeling of a high-fidelity dollhouse.',
    role: '3D Environment Designer',
    tools: ['Blender', 'Cycles Renderer'],
    softwareUsed: 'Blender',
    totalPages: 16,
    isAcademic: true,
    galleryPages: [
      '/portfolio-assets/3ds/barbie/thumbnail.png',
      '/portfolio-assets/3ds/barbie/1.png',
      '/portfolio-assets/3ds/barbie/2.png',
      '/portfolio-assets/3ds/barbie/3.png',
      '/portfolio-assets/3ds/barbie/4.png',
      '/portfolio-assets/3ds/barbie/5.png',
      '/portfolio-assets/3ds/barbie/6.png',
      '/portfolio-assets/3ds/barbie/7.png',
      '/portfolio-assets/3ds/barbie/8.png',
      '/portfolio-assets/3ds/barbie/9.png',
      '/portfolio-assets/3ds/barbie/10.png',
      '/portfolio-assets/3ds/barbie/11.png',
      '/portfolio-assets/3ds/barbie/12.png',
      '/portfolio-assets/3ds/barbie/13.png',
      '/portfolio-assets/3ds/barbie/14.png',
      '/portfolio-assets/3ds/barbie/15.png'
    ],
    bannerColor: 'from-pink-400 via-rose-500 to-pink-600',
    accentColor: 'text-pink-600 border-pink-200',
    outcome: 'Meticulously created 15 high-fidelity render layouts featuring responsive light rays and custom material textures.',
    mockups: []
  },
  {
    slug: 'glass-chessboard',
    title: 'Glass Chessboard',
    subtitle: '3D Raytracing & Glass Refraction Study',
    category: '3D',
    categories: ['3D'],
    type: 'gallery-3d',
    year: '2023',
    thumbnail: '/portfolio-assets/3ds/chessboard/thumbnail.png',
    description: 'A structural rendering study analyzing light refractions, glass material shaders, and photorealistic raytracing in Blender.',
    role: 'Render & Shading Artist',
    tools: ['Blender', 'LuxCoreRender'],
    softwareUsed: 'Blender',
    totalPages: 7,
    isAcademic: true,
    galleryPages: [
      '/portfolio-assets/3ds/chessboard/thumbnail.png',
      '/portfolio-assets/3ds/chessboard/1.png',
      '/portfolio-assets/3ds/chessboard/2.png',
      '/portfolio-assets/3ds/chessboard/3.png',
      '/portfolio-assets/3ds/chessboard/4.png',
      '/portfolio-assets/3ds/chessboard/5.png',
      '/portfolio-assets/3ds/chessboard/6.png'
    ],
    bannerColor: 'from-slate-400 via-zinc-500 to-zinc-700',
    accentColor: 'text-slate-605 border-slate-300',
    outcome: 'Experimented with various refraction indexes and ray dispersion, obtaining photorealistic glass refractures.',
    mockups: []
  },
  {
    slug: 'minecraft-castle',
    title: 'Minecraft Castle',
    subtitle: '3D Voxel World & Layout Block Design',
    category: '3D',
    categories: ['3D'],
    type: 'gallery-3d',
    year: '2024',
    thumbnail: '/portfolio-assets/3ds/tower/thumbnail.png',
    description: 'An intricate voxel architecture layout design mapping out medieval castle corridors, battlements, and landscaping elevations.',
    role: '3D Voxel Artist',
    tools: ['Blender', 'MagicaVoxel'],
    softwareUsed: 'Blender',
    totalPages: 5,
    isAcademic: true,
    galleryPages: [
      '/portfolio-assets/3ds/tower/thumbnail.png',
      '/portfolio-assets/3ds/tower/1.png',
      '/portfolio-assets/3ds/tower/2.png',
      '/portfolio-assets/3ds/tower/3.png',
      '/portfolio-assets/3ds/tower/4.png'
    ],
    bannerColor: 'from-emerald-500 via-green-600 to-teal-700',
    accentColor: 'text-emerald-600 border-emerald-300',
    outcome: 'Modeled clean multi-tiered structure designs containing custom elevations, block structures, and warm point lights.',
    mockups: []
  }
];

// Content for core pages
export interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface AchievementItem {
  title: string;
  issuer: string;
  year: string;
  detail: string;
}

export interface LeaderShipItem {
  role: string;
  org: string;
  year: string;
  impact: string[];
}

export interface CertificateItem {
  name: string;
  provider: string;
  id: string;
  linkText: string;
}
