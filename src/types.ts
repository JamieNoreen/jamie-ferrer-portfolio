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
    thumbnail: '/images/thumbnails/scaffled.png',
    award: 'BEST IN THESIS',
    awards: ['BEST IN THESIS', 'PSC9 2ND RUNNER-UP'],
    description: 'An intuitive platform designed to bridge lesson planning and visual instruction, enabling educators to create interactive curriculum models step-by-step.',
    role: 'Lead UI/UX Designer & Researcher',
    tools: ['Figma', 'React', 'D3.js', 'Canva Suite'],
    bannerColor: 'bg-gradient-to-tr from-sky-400 via-indigo-500 to-indigo-600',
    accentColor: 'text-indigo-600 border-indigo-200',
    caseStudyImages: [
      '/images/scaffled/slide1.png',
      '/images/scaffled/slide2.png',
      '/images/scaffled/slide3.png',
      '/images/scaffled/slide4.png',
      '/images/scaffled/slide5.png'
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
    thumbnail: '/images/thumbnails/studdy.png',
    award: 'PSC9 2ND RUNNER-UP',
    awards: ['PSC9 2ND RUNNER-UP'],
    description: 'A gamified academic planner designed specifically around the localized schedules and study habits of Filipino high school and university students, utilizing positive reinforcement and spaced repetition techniques.',
    role: 'Product & Interaction Designer',
    tools: ['Figma', 'Framer Motion', 'React Native', 'Tailwind'],
    bannerColor: 'bg-gradient-to-br from-violet-600 to-purple-800',
    accentColor: 'text-violet-600 border-violet-200',
    caseStudyImages: [
      '/images/studdy/slide1.png',
      '/images/studdy/slide2.png',
      '/images/studdy/slide3.png',
      '/images/studdy/slide4.png',
      '/images/studdy/slide5.png'
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
    thumbnail: '/images/thumbnails/tulai.png',
    description: 'An intelligence utility designed to demystify complex legal documents by translating and explaining them in clear, vernacular Tagalog and regional dialects, bringing legal clarity to underrepresented groups.',
    role: 'Lead AI & Full-Stack Engineer',
    tools: ['Gemini API', 'Next.js', 'PostgreSQL', 'Tailwind CSS'],
    bannerColor: 'bg-gradient-to-tr from-[#0B4F4F] via-[#115E59] to-[#134E4A]',
    accentColor: 'text-teal-600 border-teal-200',
    showcaseHero: '/images/tulai/hero.png',
    showcaseProblemImage: '/images/tulai/problem.png',
    showcaseProblemText: 'Legal documentation in the Philippines is predominantly authored in highly formal English text loaded with complex jargon, making understanding and compliance incredibly difficult for ordinary citizens who are not fluent in legal terms.',
    showcaseScreens: [
      {
        groupTitle: 'Dashboard',
        description: 'Central workspace for managing applications, requests, and service activity.',
        images: [
          {
            src: '/images/tulai/screen_dashboard.png',
            caption: 'Central Workspace Dashboard tracking translations and pending queues.'
          }
        ]
      },
      {
        groupTitle: 'Reports',
        description: 'Reporting tools for tracking service performance and community data.',
        images: [
          {
            src: '/images/tulai/screen_reports.png',
            caption: 'Performance analytics and feedback reporting dashboard views.'
          }
        ]
      },
      {
        groupTitle: 'Verification',
        description: 'Verification workflow for reviewing and approving submissions.',
        images: [
          {
            src: '/images/tulai/screen_verification.png',
            caption: 'Interactive translation peer double-review and approval interface.'
          }
        ]
      },
      {
        groupTitle: 'Resources',
        description: 'Directory of available government resources and support services.',
        images: [
          {
            src: '/images/tulai/screen_resources.png',
            caption: 'Knowledgebase and official government legal resource directories.'
          }
        ]
      },
      {
        groupTitle: 'How TulAI Works',
        description: 'Overview of the platform workflow and service process.',
        images: [
          {
            src: '/images/tulai/screen_how_it_works.png',
            caption: 'Onboarding flows mapping out core translation and verification pipeline cycles.'
          }
        ]
      }
    ],
    showcaseOutcome: 'Bridged legal accessibility to over 1,200 non-English readers in pilot barangays, achieving extremely high accuracy in conversational language conversions.',
    mockupImages: [
      { src: '/images/tulai/mockup_desktop1.png', orientation: 'landscape', caption: 'High-Fidelity Translation Workspace and Original Text Comparison' },
      { src: '/images/tulai/mockup_desktop2.png', orientation: 'landscape', caption: 'Interactive Document Breakdown with Inline Glossary Explanations' },
      { src: '/images/tulai/mockup_desktop3.png', orientation: 'landscape', caption: 'Mobile Vernacular Review & Team Translation Sync Portal' }
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
    thumbnail: '/images/thumbnails/plantego.png',
    description: 'An IoT-adjacent smart plant care log that guides indoor gardening enthusiasts by charting soil hydration thresholds and tracking watering rituals.',
    role: 'Frontend Developer & Designer',
    tools: ['React', 'ChartJS', 'Bluetooth Web API', 'Tailwind'],
    bannerColor: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-teal-650',
    accentColor: 'text-emerald-600 border-emerald-200',
    showcaseHero: '/images/plantego/hero.png',
    showcaseProblemImage: '/images/plantego/problem.png',
    showcaseProblemText: 'Indoor plants routinely die of over-watering or under-watering as beginners struggle to diagnose subtle variations in soil dampness or identify the specific needs of multiple nested species.',
    showcaseScreens: [
      {
        groupTitle: 'Core Platform Experience',
        description: 'AI-powered agriculture platform featuring crop disease detection, marketplace, educational resources, and chatbot assistance.',
        images: [
          {
            src: '/images/plantego/composite.png',
            caption: 'Plantego composite showcase highlighting direct crop diagnostics and chat assistant.'
          }
        ]
      }
    ],
    showcaseOutcome: 'Helped urban gardeners sustain over 40 different delicate plant species with automated health score metrics and persistent plant-specific reminders.',
    mockupImages: [
      { src: '/images/plantego/mockup_landscape1.png', orientation: 'landscape', caption: 'Botanical Greenhouse Smart Logger and Microclimate Forecasts' },
      { src: '/images/plantego/mockup_landscape2.png', orientation: 'landscape', caption: 'Watering Frequency Cohort Charts and Soil Dampness Metrics' },
      { src: '/images/plantego/mockup_portrait1.png', orientation: 'portrait', caption: 'Plantego Mobile Assistant Log & Live Bluetooth Soil Probe Sensor Reader' }
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
    thumbnail: '/images/thumbnails/pasada.png',
    description: 'A real-time transit scheduler and digital ticketing solution designed for modern public utility jeepney (PUJ) operators and daily Filipino commuters.',
    role: 'Mobile Architect & UI Specialist',
    tools: ['Google Maps Platform', 'React Native', 'Node.js', 'Socket.io'],
    bannerColor: 'bg-gradient-to-br from-indigo-700 via-blue-805 to-blue-900',
    accentColor: 'text-blue-600 border-indigo-200',
    showcaseHero: '/images/pasada/hero.png',
    showcaseProblemImage: '/images/pasada/problem.png',
    showcaseProblemText: 'A lack of consolidated route information and fixed arrival timings leaves modern jeepney commuters guessing, resulting in long terminal lines and inefficient dispatcher loading schedules.',
    showcaseScreens: [
      {
        groupTitle: 'Core Mobile Experience',
        description: 'Mobile application for jeepney drivers to digitize and manage operational data.\n\nThis screen group contains:\n• Driver Dashboard\n• Route Management\n• Operational Tracking',
        images: [
          {
            src: '/images/pasada/composite_triple.png',
            caption: 'Driver suite containing the Driver Dashboard, Route Management page, and Operational Tracking panel.'
          }
        ]
      }
    ],
    showcaseOutcome: 'Successfully launched a 12-jeepney active route trial in a busy metropolitan hub, reducing commuter waiting intervals from 25 minutes down to 8 minutes.',
    mockupImages: [
      { src: '/images/pasada/mockup_landscape1.png', orientation: 'landscape', caption: 'Driver Telemetry Dashboard & Route Scheduling Interface' },
      { src: '/images/pasada/mockup_landscape2.png', orientation: 'landscape', caption: 'Commuter Mobile Ticket Booking & Live Route Progress Tracker' }
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
    thumbnail: '/images/thumbnails/lakadph.png',
    description: 'A digital travel identity and itinerary builder celebrating regional culture and off-the-beaten-path destinations across the Philippine archipelago.',
    role: 'Identity Designer & Lead Researcher',
    tools: ['Figma', 'Adobe Illustrator', 'Brand Metaphor Systems'],
    bannerColor: 'bg-gradient-to-tr from-sky-400 via-teal-500 to-orange-500',
    accentColor: 'text-orange-600 border-orange-200',
    showcaseHero: '/images/lakadph/hero.png',
    showcaseProblemImage: '/images/lakadph/problem.png',
    showcaseProblemText: 'Local travel programs suffer from fragmented regional guide resources, leaving travelers relying on generic itineraries while smaller, culturally rich eco-tourism spots remain completely invisible.',
    showcaseScreens: [
      {
        groupTitle: 'City Dashboard',
        description: 'Administrative dashboard for monitoring pedestrian reports, route conditions, and city-wide walkability insights.',
        images: [
          {
            src: '/images/lakadph/screen_city_dashboard.png',
            caption: 'City Dashboard overview tracking sidewalk conditions and report density levels.'
          }
        ]
      },
      {
        groupTitle: 'Core Mobile Experience',
        description: 'Mobile navigation experience helping users discover safer and more walkable routes.\n\nFeatures Shown:\n• Smart Route Planning\n• Comfort-Based Route Selection\n• Real-Time Navigation\n• Route Feedback',
        images: [
          {
            src: '/images/lakadph/screen_core_mobile.png',
            caption: 'Core mobile application views presenting pedestrian directions and heatmaps.'
          }
        ]
      }
    ],
    showcaseOutcome: 'Delivered highly coherent identity styleguides and interactive prototype blueprints adopted as conceptual references by local eco-tourism advocates.',
    mockupImages: [
      { src: '/images/lakadph/mockup_landscape1.png', orientation: 'landscape', caption: 'Interactive Itinerary Planner & Culturally Curated Route Mapping Studio' },
      { src: '/images/lakadph/mockup_landscape2.png', orientation: 'landscape', caption: 'Regional Visual Asset Board, Metaphors & Eco-tourism Promotion Grid' },
      { src: '/images/lakadph/mockup_landscape3.png', orientation: 'landscape', caption: 'Mobile Discovery Travel Diary & Local Homestay Booking Blueprint' }
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
    thumbnail: '/images/thumbnails/farmory.png',
    description: 'A secure agricultural database tracking crop inventories and establishing shared distribution links to prevent food waste across local cooperative farms.',
    role: 'Database Specialist & Developer',
    tools: ['SQL', 'React', 'Drizzle ORM', 'Tailwind'],
    bannerColor: 'bg-gradient-to-br from-amber-800 via-slate-800 to-emerald-950',
    accentColor: 'text-emerald-500 border-emerald-350',
    showcaseHero: '/images/farmory/hero.png',
    showcaseProblemImage: '/images/farmory/problem.png',
    showcaseProblemText: 'Cooperative farms frequently suffer from storage communication breakdowns, leading to high-quality crop spoilage while adjacent processing channels experience critical supply shortages.',
    showcaseScreens: [
      {
        groupTitle: 'Dashboard',
        description: 'Overview of farmer activity, claims, and insurance operations.',
        images: [
          {
            src: '/images/farmory/screen_web_dashboard.png',
            caption: 'Web Platform (Insurers) - Main operational dashboard showing aggregated statistics.'
          }
        ]
      },
      {
        groupTitle: 'Claims Queue',
        description: 'Review and management interface for incoming insurance claims.',
        images: [
          {
            src: '/images/farmory/screen_web_claims_queue.png',
            caption: 'Web Platform (Insurers) - Active incoming claims list with risk scoring attributes.'
          }
        ]
      },
      {
        groupTitle: 'Claim Details',
        description: 'Detailed claim information and assessment workflow.',
        images: [
          {
            src: '/images/farmory/screen_web_claim_details.png',
            caption: 'Web Platform (Insurers) - Detailed diagnostic parameters, field imagery, and approval triggers.'
          }
        ]
      },
      {
        groupTitle: 'Batch Payment',
        description: 'Bulk payment processing for approved claims.',
        images: [
          {
            src: '/images/farmory/screen_web_batch_payment.png',
            caption: 'Web Platform (Insurers) - Financial ledger for executing multi-cooperative batch disbursements.'
          }
        ]
      },
      {
        groupTitle: 'Farmers Database',
        description: 'Database of registered farmers and policy information.',
        images: [
          {
            src: '/images/farmory/screen_web_farmers_db.png',
            caption: 'Web Platform (Insurers) - Complete index of member cooperatives, soil profiles, and coverage histories.'
          }
        ]
      },
      {
        groupTitle: 'Onboarding',
        description: 'Farmer registration and account setup experience.',
        images: [
          {
            src: '/images/farmory/screen_mobile_onboarding.png',
            caption: 'Mobile Experience (Farmers) - Secure farmer account registration page.'
          }
        ]
      },
      {
        groupTitle: 'Onboarding Flow',
        description: 'Guided introduction to platform features and claim submission process.',
        images: [
          {
            src: '/images/farmory/screen_mobile_onboarding_flow.png',
            caption: 'Mobile Experience (Farmers) - Conversational step-by-step assistant tutorial.'
          }
        ]
      },
      {
        groupTitle: 'Filing a Claim',
        description: 'Mobile workflow for submitting insurance claims.',
        images: [
          {
            src: '/images/farmory/screen_mobile_filing_claim.png',
            caption: 'Mobile Experience (Farmers) - Direct photo attachment and geolocated farm damage reporting.'
          }
        ]
      },
      {
        groupTitle: 'Track & Receive Claims',
        description: 'Claim tracking and payout monitoring experience.',
        images: [
          {
            src: '/images/farmory/screen_mobile_tracking_claims.png',
            caption: 'Mobile Experience (Farmers) - Real-time claim status timelines and automated digital pocket payouts.'
          }
        ]
      }
    ],
    showcaseOutcome: 'Created an open agricultural schema reducing crop distribution delays by 35% in small farming cooperatives.',
    mockupImages: [
      { src: '/images/farmory/mockup_landscape1.png', orientation: 'landscape', caption: 'Interactive Cooperative Seed Reserves, Harvest Registry & Scheduler' },
      { src: '/images/farmory/mockup_landscape2.png', orientation: 'landscape', caption: 'Farming Logbook Metrics, Moisture Cohorts & Geographic Yield Profiles' },
      { src: '/images/farmory/mockup_landscape3.png', orientation: 'landscape', caption: 'Live Logistics Board, Truck Loading Protocols & Community Distribution Dashboard' }
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
    description: 'A friendly 3D character mascot meticulously modeled, textured, and rigged for high-fidelity animations.',
    role: '3D Artist & Rigging Lead',
    tools: ['Blender', 'Substance Painter'],
    softwareUsed: 'Blender',
    totalPages: 6,
    isAcademic: false,
    galleryPages: [
      '/images/scaffy/page1.png',
      '/images/scaffy/page2.png',
      '/images/scaffy/page3.png',
      '/images/scaffy/page4.png',
      '/images/scaffy/page5.png',
      '/images/scaffy/page6.png'
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
    description: 'Comprehensive 3D styling, architecture, and interior blueprint modeling of a high-fidelity dollhouse.',
    role: '3D Environment Designer',
    tools: ['Blender', 'Cycles Renderer'],
    softwareUsed: 'Blender',
    totalPages: 15,
    isAcademic: true,
    galleryPages: [
      '/images/barbie/page1.png', '/images/barbie/page2.png', '/images/barbie/page3.png', '/images/barbie/page4.png', '/images/barbie/page5.png',
      '/images/barbie/page6.png', '/images/barbie/page7.png', '/images/barbie/page8.png', '/images/barbie/page9.png', '/images/barbie/page10.png',
      '/images/barbie/page11.png', '/images/barbie/page12.png', '/images/barbie/page13.png', '/images/barbie/page14.png', '/images/barbie/page15.png'
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
    description: 'A structural rendering study analyzing light refractions, glass material shaders, and photorealistic raytracing in Blender.',
    role: 'Render & Shading Artist',
    tools: ['Blender', 'LuxCoreRender'],
    softwareUsed: 'Blender',
    totalPages: 6,
    isAcademic: true,
    galleryPages: [
      '/images/chessboard/page1.png', '/images/chessboard/page2.png', '/images/chessboard/page3.png',
      '/images/chessboard/page4.png', '/images/chessboard/page5.png', '/images/chessboard/page6.png'
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
    description: 'An intricate voxel architecture layout design mapping out medieval castle corridors, battlements, and landscaping elevations.',
    role: '3D Voxel Artist',
    tools: ['Blender', 'MagicaVoxel'],
    softwareUsed: 'Blender',
    totalPages: 4,
    isAcademic: true,
    galleryPages: [
      '/images/minecraft/page1.png', '/images/minecraft/page2.png', '/images/minecraft/page3.png', '/images/minecraft/page4.png'
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
