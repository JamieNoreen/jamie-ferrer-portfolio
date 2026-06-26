/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageName =
  | "home"
  | "about"
  | "projects"
  | "achievements"
  | "certificates"
  | "leadership"
  | "tech-stacks"
  | "contact"
  | "logos";

export type TemplateType = "minimalism" | "editorial" | "futuristic";


export interface Sticker {
  id: string;
  type: string; // e.g., 'paper-tab', 'star', 'tape', 'doodle', 'neon-ring', 'circle-badge', 'bracket'
  label?: string;
  defaultX: number; // percentage based or initial px
  defaultY: number; // percentage based or initial px
  color?: string;
  emoji?: string;
  size?: string;
  imagePath?: string;
  sizePx?: number;

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
  orientation: "landscape" | "portrait";
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  categories?: string[];
  type: "case-study" | "showcase" | "gallery-3d";
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
    slug: "studdy",
    title: "Studdy",
    subtitle:
      "Study Buddy Matchmaking App",
    category: "Case Studies",
    categories: ["Case Studies", "Projects"],
    type: "case-study",
    year: "2025",
    thumbnail: "/portfolio-assets/projects/studdy/File1.webp",
    award: "PSC9 2ND RUNNER-UP",
    awards: ["PSC9 2ND RUNNER-UP"],
    description:
      "A study buddy matchmaking platform that connects students based on subjects, goals, and learning preferences.",
    role: "Product & Interaction Designer",
    tools: ["Figma", "Framer Motion", "React Native", "Tailwind"],
    bannerColor: "bg-gradient-to-br from-violet-600 to-purple-800",
    accentColor: "text-violet-600 border-violet-200",
    caseStudyImages: [
      "/portfolio-assets/projects/studdy/File1.webp",
      "/portfolio-assets/projects/studdy/File2.webp",
      "/portfolio-assets/projects/studdy/File3.webp",
      "/portfolio-assets/projects/studdy/File4.webp",
      "/portfolio-assets/projects/studdy/File5.webp",
      "/portfolio-assets/projects/studdy/File6.webp",
      "/portfolio-assets/projects/studdy/File7.webp",
      "/portfolio-assets/projects/studdy/File8.webp",
      "/portfolio-assets/projects/studdy/File9.webp",
      "/portfolio-assets/projects/studdy/File10.webp",
      "/portfolio-assets/projects/studdy/File11.webp",
      "/portfolio-assets/projects/studdy/File12.webp",
      "/portfolio-assets/projects/studdy/File13.webp",
      "/portfolio-assets/projects/studdy/File14.webp",
    ],
    outcome:
      "PSC9 2ND RUNNER-UP – Recognized for innovative approach to peer-to-peer learning and community engagement.",
    mockups: [],
  },
  {
    slug: "scaffled",
    title: "Scaffl.ed",
    subtitle:
      "Learn Through Debugging",
    category: "Case Studies",
    categories: ["Case Studies", "Projects"],
    type: "case-study",
    year: "2025",
    thumbnail: "/portfolio-assets/projects/scaffled/File1.webp",
    award: "BEST IN THESIS",
    awards: ["BEST IN THESIS", "PSC10 2ND RUNNER-UP"],
    description:
      "An adaptive learning platform that provides scaffolded feedback during programming exercises using eye-tracking and interaction data.",
    role: "Lead UI/UX Designer & Researcher",
    tools: ["Figma", "React", "D3.js", "Canva Suite"],
    bannerColor: "bg-gradient-to-tr from-sky-400 via-indigo-500 to-indigo-600",
    accentColor: "text-indigo-600 border-indigo-200",
    caseStudyImages: [
      "/portfolio-assets/projects/scaffled/File1.webp",
      "/portfolio-assets/projects/scaffled/File2.webp",
      "/portfolio-assets/projects/scaffled/File3.webp",
      "/portfolio-assets/projects/scaffled/File4.webp",
      "/portfolio-assets/projects/scaffled/File5.webp",
      "/portfolio-assets/projects/scaffled/File6.webp",
      "/portfolio-assets/projects/scaffled/File7.webp",
      "/portfolio-assets/projects/scaffled/File8.webp",
      "/portfolio-assets/projects/scaffled/File9.webp",
      "/portfolio-assets/projects/scaffled/File10.webp",
      "/portfolio-assets/projects/scaffled/File11.webp",
      "/portfolio-assets/projects/scaffled/File12.webp",
      "/portfolio-assets/projects/scaffled/File13.webp",
      "/portfolio-assets/projects/scaffled/File14.webp",
      "/portfolio-assets/projects/scaffled/File15.webp",
    ],
    outcome:
      "PSC10 2ND RUNNER-UP",
    mockups: [],
  },
   {
    slug: "rooted",
    title: "Rooted",
    subtitle: "Your Personal Growth Companion",
    category: "Case Studies",
    categories: ["Case Studies", "Projects"],
    type: "case-study",
    year: "2026",
    thumbnail:       "/portfolio-assets/projects/rooted/File1.webp",
    description:
      "A youth-focused wellness app that combines mood tracking, self-reflection, learning, and community support to encourage healthy personal growth.",
    role: "Solo Product Designer",
    tools: [
      "Figma",
      "Prototyping",
      "User Psychology Framework",
      "Inter Design",
    ],
    bannerColor: "bg-gradient-to-br from-neutral-800 to-neutral-950",
    accentColor: "text-[#00FF88] border-neutral-700",
    caseStudyImages: [
      "/portfolio-assets/projects/rooted/File1.webp",
      "/portfolio-assets/projects/rooted/File2.webp",
      "/portfolio-assets/projects/rooted/File3.webp",
      "/portfolio-assets/projects/rooted/File4.webp",
      "/portfolio-assets/projects/rooted/File5.webp",
      "/portfolio-assets/projects/rooted/File6.webp",
      "/portfolio-assets/projects/rooted/File7.webp",
      "/portfolio-assets/projects/rooted/File8.webp",
      "/portfolio-assets/projects/rooted/File9.webp",
      "/portfolio-assets/projects/rooted/File10.webp",
      "/portfolio-assets/projects/rooted/File11.webp",
      "/portfolio-assets/projects/rooted/File12.webp",
      "/portfolio-assets/projects/rooted/File13.webp",
      "/portfolio-assets/projects/rooted/File14.webp",
      "/portfolio-assets/projects/rooted/File15.webp",
      "/portfolio-assets/projects/rooted/File16.webp",
      "/portfolio-assets/projects/rooted/File17.webp",
      "/portfolio-assets/projects/rooted/File18.webp",
          
    ],
    competition: "Dangerous Drugs Board",
    outcome:
      "",
    mockups: [],
  },
  {
    slug: "tulai",
    title: "TulAI",
    subtitle: "Offline AI-Powered Public Services for Any Phone",
    category: "Projects",
    categories: ["Projects"],
    type: "showcase",
    year: "2025",
    thumbnail: "/portfolio-assets/projects/tulai/thumbnail.webp",
    description:
      "TulAI is an AI-powered public service platform designed to make government information accessible to underserved communities. By combining AI with SMS and USSD technology, citizens can access verified information, public programs, health advisories, and community services without requiring internet access or a smartphone.",
    role: "Team Leader, UI/UX Designer & Researcher",
    tools: ["Figma", "Adobe Illustrator"],
    bannerColor: "bg-gradient-to-tr from-[#0B4F4F] via-[#115E59] to-[#134E4A]",
    accentColor: "text-teal-600 border-teal-200",
    showcaseHero: "/portfolio-assets/projects/tulai/thumbnail.webp",
    showcaseProblemImage: "/portfolio-assets/projects/tulai/problem.webp",
    showcaseProblemText:
      "Millions of Filipinos remain offline despite widespread mobile phone ownership. Government announcements, health advisories, and public services are increasingly distributed through internet-based platforms, creating barriers for rural communities, basic phone users, and citizens with limited digital access.",
    showcaseScreens: [
      {
        groupTitle: "Dashboard",
        description:
          "A centralized dashboard that provides local government units and volunteers with a real-time overview of citizen inquiries, service requests, response activity, and operational metrics. The interface helps teams monitor demand, identify trends, and manage community support efficiently.",
        images: [
          {
            src: "/portfolio-assets/projects/tulai/screen1.webp",
            caption: "Admin Dashboard – Monitoring offline query metrics.",
          },
        ],
      },
      {
        groupTitle: "Reports",
        description:
          "Analytics and reporting tools that visualize inquiry trends, service usage patterns, response volumes, and community engagement metrics. These insights help organizations make data-informed decisions and improve public service delivery.",

        images: [
          {
            src: "/portfolio-assets/projects/tulai/screen2.webp",
            caption:
              "Analytics & Reports – Tracking localized community trends.",
          },
        ],
      },
      {
        groupTitle: "Verification",
        description:
          "A human-in-the-loop verification system that allows authorized volunteers and officials to review, approve, or reject AI-generated responses before they are delivered. This additional layer of oversight helps maintain accuracy, trust, and accountability in public information services.",
        images: [
          {
            src: "/portfolio-assets/projects/tulai/screen3.webp",
            caption:
              "Human-in-the-Loop – Verifying responses before SMS delivery.",
          },
        ],
      },
      {
        groupTitle: "Resources",
        description:
          "A centralized repository of verified government information, public programs, health advisories, and community resources. The knowledge base serves as the foundation for AI-generated responses and ensures information remains reliable and up to date.",
        images: [
          {
            src: "/portfolio-assets/projects/tulai/screen4.webp",
            caption:
              "Verified Resources – Maintaining a trusted knowledge base.",
          },
        ],
      },
      {
        groupTitle: "How TulAI Works",
        description:
          "A service flow visualization illustrating how citizens interact with TulAI through SMS and USSD. The system interprets requests, retrieves verified information, incorporates human verification when necessary, and delivers responses without requiring internet access.",
        images: [
          {
            src: "/portfolio-assets/projects/tulai/screen5.webp",
            caption: "Service Blueprint – Offline SMS and USSD workflows.",
          },
        ],
      },
    ],
    showcaseOutcome:
      "Design Goal: Create an inclusive public service experience that works on any mobile phone while reducing dependence on internet connectivity and improving access to trusted government information.",
    mockupImages: [
      {
        src: "/portfolio-assets/projects/tulai/mockup1.webp",
        orientation: "landscape",
        caption:
          "Key Features: AI-powered SMS assistance, USSD service menus, and local language support.",
      },
      {
        src: "/portfolio-assets/projects/tulai/mockup2.webp",
        orientation: "landscape",
        caption:
          "Key Features: Human-in-the-loop verification, verified knowledge base, and admin dashboard controls.",
      },
      {
        src: "/portfolio-assets/projects/tulai/mockup3.webp",
        orientation: "landscape",
        caption:
          "Key Features: Comprehensive analytics and real-time query reporting tools.",
      },
    ],
    award: "CHAMPION // HABI 2025",
    awards: ["CHAMPION // HABI 2025"],
    recognition: "Champion – HABI Design Thinking Workshop 2025",
    competition: "HABI Design Thinking Workshop 2025",
    outcome:
      "Design Goal: Create an inclusive public service experience that works on any mobile phone while reducing dependence on internet connectivity and improving access to trusted government information.",
    mockups: [],
  },
 {
    slug: 'plantego',
    title: 'Plantego',
    subtitle: 'AI-Enhanced Crop Loss Prevention for Sustainable Agriculture',
    category: 'Projects',
    categories: ['Projects'],
    type: 'showcase',
    year: '2025',
    thumbnail: '/portfolio-assets/projects/plantego/thumbnail.webp',
    description: 'Plantego is a mobile-first agricultural platform designed to help farmers identify crop diseases, reduce crop losses, and adopt more sustainable farming practices. The solution combines AI-assisted crop monitoring, educational resources, and community-driven support to address systemic agricultural challenges across Southeast Asia.',
    role: 'UI/UX Designer, Researcher & Data Storytelling Designer',
    tools: ['Figma', 'SAP Analytics Cloud', 'Adobe Illustrator'],
    bannerColor: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-teal-650',
    accentColor: 'text-emerald-600 border-emerald-250',
    showcaseHero: '/portfolio-assets/projects/plantego/thumbnail.webp',
    showcaseProblemImage: '/portfolio-assets/projects/plantego/problem.webp',
    showcaseProblemText: 'Agriculture remains one of the most important economic sectors in Southeast Asia, yet farmers continue to face recurring challenges such as crop diseases, pest infestations, declining yields, food insecurity, and overreliance on hazardous pesticides.',
    showcaseScreens: [
      {
        groupTitle: 'screen',
        description: 'An integrated ecosystem that combines AI-assisted crop monitoring, localized disease detection, and verified agricultural resources onto a unified, accessible mobile interface. By providing smallholder farmers with immediate diagnostic clarity, early pest warnings, and interactive sustainability support, the platform streamlines the end-to-end journey from identification to organic crop recovery. These data-driven insights empower farming communities to minimize crop losses and reduce pesticide dependence, fostering long-term food security and agricultural resilience across the region.',
        images: [
          {
            src: '/portfolio-assets/projects/plantego/screen.webp',
            caption: 'Plantego unified mobile experience combining AI diagnosis and sustainable agricultural resources.'
          }
        ]
      }
    ],
    showcaseOutcome: 'Design Goal: Create an accessible and educational platform that helps farmers make informed decisions, reduce crop losses, improve sustainability, and strengthen food security across Southeast Asia.',
    mockupImages: [
      { src: '/portfolio-assets/projects/plantego/mockup1.webp', orientation: 'landscape', caption: 'Key Features: AI crop monitoring, educational resources, and community sustainable farming insights.' },
      { src: '/portfolio-assets/projects/plantego/mockup2.webp', orientation: 'landscape', caption: 'Key Features: Early pest warning indicators and integrated regional food loss trend trackers.' },
      { src: '/portfolio-assets/projects/plantego/mockup3.webp', orientation: 'portrait', caption: 'Key Features: Optimized mobile-first interaction patterns designed for smallholders and barangay workers.' }
    ],
    award: 'ASEAN DSE 2025 // 2ND RUNNER-UP',
    awards: ['ASEAN DSE 2025 // 2ND RUNNER-UP', 'PSC 10 // TOP 10 FINALIST'],
    recognition: 'ASEAN Data Science Explorers 2025 – 2nd Runner-Up',
    competition: 'Philippine Startup Challenge 10 – Top 10 Finalist',
    outcome: 'Design Goal: Create an accessible and educational platform that helps farmers make informed decisions, reduce crop losses, improve sustainability, and strengthen food security across Southeast Asia.',
    mockups: []
  },
  {
    slug: 'pasada',
    title: 'Pasada',
    subtitle: 'Smarter Route Decisions for Modern Jeepney Drivers',
    category: 'Projects',
    categories: ['Projects'],
    type: 'showcase',
    year: '2025',
    thumbnail: '/portfolio-assets/projects/pasada/thumbnail.webp',
    description: 'Pasada is a mobile application concept designed to help jeepney drivers make more informed operational decisions. The platform provides real-time insights, route awareness, earnings visibility, passenger demand information, and voice-assisted interactions to support daily transportation operations.',
    role: 'UI/UX Designer',
    tools: ['Figma', 'Adobe Illustrator'],
    bannerColor: 'bg-gradient-to-br from-indigo-700 via-blue-805 to-blue-900',
    accentColor: 'text-blue-600 border-indigo-250',
    showcaseHero: '/portfolio-assets/projects/pasada/thumbnail.webp',
    showcaseProblemImage: '/portfolio-assets/projects/pasada/problem.webp',
    showcaseProblemText: 'Many jeepney drivers rely on experience and intuition when deciding when to start operating, when to rest, and which routes may be most profitable. Without access to timely operational insights, drivers may spend long hours on the road while earning less than expected, resulting in wasted fuel, reduced efficiency, and lower take-home income.',
    showcaseScreens: [
      {
        groupTitle: 'SCREEN',
        description: 'Pasada delivers an integrated driver support platform that provides real-time operational insights, clear earnings visibility, and passenger demand awareness directly to drivers on the road. Designed as an accessible mobile-first interface, it empowers drivers to make smarter route decisions and determine optimal operating hours. Through simple visual indicators and hands-free voice-assisted interactions, the platform ensures seamless utility under active driving conditions, significantly reducing operational inefficiencies while maximizing daily income.',
        images: [
          {
            src: '/portfolio-assets/projects/pasada/screen.webp',
            caption: 'Integrated driver mobile companion application displaying active loops and real-time demand insights.'
          }
        ]
      }
    ],
    showcaseOutcome: 'Design Goal: Create a simple and accessible mobile experience that helps drivers reduce inefficiencies, improve decision-making, and maximize earnings while minimizing wasted time and fuel consumption.',
    mockupImages: [
      { src: '/portfolio-assets/projects/pasada/mockup1.webp', orientation: 'landscape', caption: 'Key Features: Real-time operational insights, route decision support, and earnings logging.' },
      { src: '/portfolio-assets/projects/pasada/mockup2.webp', orientation: 'landscape', caption: 'Key Features: Passenger demand awareness, voice-assisted interaction, and road accessibility tools.' },
    ],
    award: 'BYTEFORWARD TOP 10 FINALIST',
    awards: ['BYTEFORWARD TOP 10 FINALIST'],
    recognition: 'ByteForward Hackathon – Top 10 Finalist',
    competition: 'ByteForward Hackathon – Top 10 Finalist',
    outcome: 'Design Goal: Create a simple and accessible mobile experience that helps drivers reduce inefficiencies, improve decision-making, and maximize earnings while minimizing wasted time and fuel consumption.',
    mockups: []
  },
 {
    slug: 'lakadph',
    title: 'LakadPH',
    subtitle: 'Pedestrian-First Navigation for Safer and More Comfortable Walks',
    category: 'Projects',
    categories: ['Projects'],
    type: 'showcase',
    year: '2026',
    thumbnail: '/portfolio-assets/projects/lakadph/thumbnail.webp',
    description: 'LakadPH is a pedestrian-focused mobility platform designed to help users find safer, cooler, and more comfortable walking routes in Metro Manila. Instead of prioritizing speed alone, the platform considers environmental conditions, safety factors, and community-generated insights to improve the walking experience.',
    role: 'Team Lead & UI/UX Designer',
    tools: ['Figma', 'Adobe Illustrator'],
    bannerColor: 'bg-gradient-to-tr from-sky-400 via-teal-500 to-orange-500',
    accentColor: 'text-orange-600 border-orange-200',
    showcaseHero: '/portfolio-assets/projects/lakadph/thumbnail.webp',
    showcaseProblemImage: '/portfolio-assets/projects/lakadph/problem.webp',
    showcaseProblemText: 'Most navigation applications optimize for the shortest or fastest route. However, these routes may expose pedestrians to extreme heat, poorly lit streets, unsafe areas, flooding, sidewalk obstructions, and other environmental challenges. As a result, many people avoid walking even for short-distance trips.',
    showcaseScreens: [
      {
        groupTitle: 'City Dashboard',
        description: 'The City Dashboard provides local government units and urban planners with a centralized platform to monitor heat exposure patterns, analyze shade gap distributions, and track crowdsourced pedestrian reports. By transforming community-generated data into actionable urban mobility insights, the system supports proactive infrastructure planning and data-driven decisions to enhance neighborhood walkability and pedestrian safety.',
        images: [
          {
            src: '/portfolio-assets/projects/lakadph/screen1.webp',
            caption: 'Urban Mobility Dashboard – Monitoring heat exposure, shade gaps, and pedestrian reports.'
          }
        ]
      },
      {
        groupTitle: 'Core Mobile Experience',
        description: 'The Core Mobile Experience empowers pedestrians with shade-aware route planning and real-time navigation tailored to environmental comfort. Seamlessly transitioning between specialized Day Mode for heat mitigation and Night Mode for well-lit street guidance, the app enables comfort-based route selection and community reporting to ensure a safer, more reliable walking experience across urban areas.',
        images: [
          {
            src: '/portfolio-assets/projects/lakadph/screen2.webp',
            caption: 'Mobile Application – Visualizing comfort-based routes, real-time shade metrics, and community feedback.'
          }
        ]
      }
    ],
    showcaseOutcome: 'Design Goal: Create a pedestrian-first navigation experience that encourages walking by reducing environmental discomfort, improving route safety, and supporting data-driven urban mobility decisions.',
    mockupImages: [
      { src: '/portfolio-assets/projects/lakadph/mockup1.webp', orientation: 'landscape', caption: 'Key Features: Shade-aware route planning, daytime heat exposure metrics, and comfort-based selection.' },
      { src: '/portfolio-assets/projects/lakadph/mockup2.webp', orientation: 'landscape', caption: 'Key Features: Safe well-lit navigation loops, Day/Night mode screens, and active community incident reporting.' },
      { src: '/portfolio-assets/projects/lakadph/mockup3.webp', orientation: 'landscape', caption: 'Key Features: Local urban planning insights console, mmda advisory triggers, and interactive pedestrian sidewalks logs.' }
    ],
    award: 'CHAMPION // BLUE HACKS 2026',
    awards: ['CHAMPION // BLUE HACKS 2026'],
    recognition: 'Champion – Blue Hacks',
    outcome: 'Design Goal: Create a pedestrian-first navigation experience that encourages walking by reducing environmental discomfort, improving route safety, and supporting data-driven urban mobility decisions.',
    mockups: []
  },
 {
    slug: 'farmory',
    title: 'Farmory',
    subtitle: 'AI-Powered Agricultural Insurance Claims Platform',
    category: 'Projects',
    categories: ['Projects'],
    type: 'showcase',
    year: '2025',
    thumbnail: '/portfolio-assets/projects/farmory/thumbnail.webp',
    description: 'Farmory is a satellite-assisted agricultural insurance platform designed to help farmers receive faster and more reliable insurance claim assessments after natural disasters. By combining satellite imagery, automated damage analysis, and streamlined digital workflows, the platform reduces delays, improves transparency, and supports faster financial recovery for farming communities.',
    role: 'UI/UX Designer & Researcher',
    tools: ['Figma', 'Adobe Illustrator'],
    bannerColor: 'bg-gradient-to-br from-[#1E3A1E] via-[#2F5233] to-[#122B12]',
    accentColor: 'text-emerald-500 border-emerald-350',
    showcaseHero: '/portfolio-assets/projects/farmory/thumbnail.webp',
    showcaseProblemImage: '/portfolio-assets/projects/farmory/problem.webp',
    showcaseProblemText: 'Traditional agricultural insurance processes often require extensive paperwork, multiple office visits, manual field inspections, and long processing times. Farmers may wait months for claim decisions while facing crop losses, debt, and missed planting seasons, while insurance providers struggle with claim backlogs, limited adjuster capacity, and fraud detection challenges.',
    showcaseScreens: [
      {
        groupTitle: 'Insurance Management Dashboard',
        description: 'This centralized dashboard presents a high-level operational overview of the agricultural insurance ecosystem, aggregating active claims, regional crop risk indicators, and key processing performance metrics. By rendering complex geospatial and database trends into actionable visualizations, the analytical interface empowers administrator stakeholders to monitor platform-wide health, track adjuster activities, and make informed operational decisions under constraint.',
        images: [
          {
            src: '/portfolio-assets/projects/farmory/screen1.webp',
            caption: 'Operational Dashboard – Streamlining risk monitoring, processing throughput, and active claims tracking.'
          }
        ]
      },
      {
        groupTitle: 'Insurer Platform',
        description: 'The insurer platform consolidates the critical claim lifecycle tasks into a single, high-efficiency workspace featuring an active Claims Queue, multi-tab Claim Details, a verified cooperative Farmers Directory, and a Batch Payment console. Designed for maximum operational throughput, this unified ecosystem streamlines damage assessment using satellite indices while supporting risk adjusters in fraud detection and records administration. Ultimately, these integrated tools reduce manual auditing friction to help insurers process large-scale payouts and protect agricultural livelihoods with increased speed and precision.',
        images: [
          {
            src: '/portfolio-assets/projects/farmory/screen2.webp',
            caption: 'Claims Queue – Real-time queue featuring incoming cooperative claims with integrated risk analysis attributes.'
          },
          {
            src: '/portfolio-assets/projects/farmory/screen3.webp',
            caption: 'Claim Details – Multi-tab assessment workspace consolidating damage logs, farm photos, and verification records.'
          },
          {
            src: '/portfolio-assets/projects/farmory/screen4.webp',
            caption: 'Batch Payment & Ledger – Financial dashboard executing bulk transactions to verified agrarian cooperators.'
          },
          {
            src: '/portfolio-assets/projects/farmory/screen5.webp',
            caption: 'Cooperative Farmers Directory – Centralized catalog organizing registered members, historical yields, and soil safety parameters.'
          }
        ]
      },
      {
        groupTitle: 'Farmer Mobile Experience',
        description: 'The farmer mobile experience provides an accessible, step-by-step portal designed to simplify agricultural onboarding, farm plot registration, and active crop health monitoring. Through direct and simplified mobile forms, farmers can capture leaf damage photographs, tag geolocation data, and submit digital insurance claims immediately after a localized climate disaster. The transparent tracking dashboard keeps applicants fully informed of audit milestones and payment dispatches, eliminating procedural uncertainty and accelerating access to critical recovery capital.',
        images: [
          {
            src: '/portfolio-assets/projects/farmory/screen6.webp',
            caption: 'Farmer Experience Onboarding – High-contrast screens introducing simplified agricultural insurance.'
          },
          {
            src: '/portfolio-assets/projects/farmory/screen7.webp',
            caption: 'Crop Registration – User-friendly forms to log acreage, crops, and planting schedules.'
          },
          {
            src: '/portfolio-assets/projects/farmory/screen8.webp',
            caption: 'Claim Filing – Direct, step-by-step interfaces for submitting photo evidence.'
          },
          {
            src: '/portfolio-assets/projects/farmory/screen9.webp',
            caption: 'Claim Tracking – Transparent real-time updates and payout progress indicators.'
          }
        ]
      }
    ],
    showcaseOutcome: 'Design Goal: Create an accessible and trustworthy insurance experience that reduces claim processing delays, improves transparency, and helps farmers recover more quickly after disasters.',
    mockupImages: [
      { src: '/portfolio-assets/projects/farmory/mockup1.webp', orientation: 'landscape', caption: 'Key Features: Satellite-assisted damage verification, interactive insurer queue, and batch payment tracking.' },
      { src: '/portfolio-assets/projects/farmory/mockup2.webp', orientation: 'landscape', caption: 'Key Features: Easy mobile onboarding, localized digital claims submission, and transparent payout progress indicators.' },
      { src: '/portfolio-assets/projects/farmory/mockup3.webp', orientation: 'landscape', caption: 'Key Features: Regional crop disaster mapping, automated loss assessments, and agrarian community registries.' }
    ],
    competition: 'AgriTech Innovations Conference',
    outcome: 'Design Goal: Create an accessible and trustworthy insurance experience that reduces claim processing delays, improves transparency, and helps farmers recover more quickly after disasters.',
    mockups: []
  },
  {
    slug: "scaffy",
    title: "Scaffy",
    subtitle: "3D Mascot Design",
    category: "3D",
    categories: ["3D"],
    type: "gallery-3d",
    year: "2025",
    thumbnail: "/portfolio-assets/3ds/scaffy/thumbnail.webp",
    description:
      "A friendly 3D character mascot meticulously modeled, textured, and rigged for high-fidelity animations.",
    role: "3D Artist & Rigging Lead",
    tools: ["Blender", "Substance Painter"],
    softwareUsed: "Blender",
    totalPages: 7,
    isAcademic: false,
    galleryPages: [
      "/portfolio-assets/3ds/scaffy/thumbnail.webp",
      "/portfolio-assets/3ds/scaffy/1.webp",
      "/portfolio-assets/3ds/scaffy/2.webp",
      "/portfolio-assets/3ds/scaffy/3.webp",
      "/portfolio-assets/3ds/scaffy/4.webp",
      "/portfolio-assets/3ds/scaffy/5.webp",
      "/portfolio-assets/3ds/scaffy/6.webp",
    ],
    bannerColor: "from-amber-400 via-orange-500 to-red-500",
    accentColor: "text-orange-600 border-orange-200",
    outcome:
      "Mascot successfully modeled and fully rigged to support over 40 distinct promotional animations.",
    mockups: [],
  },
  {
    slug: "barbie-doll-house",
    title: "Barbie Doll House",
    subtitle: "3D Interior & Layout Design",
    category: "3D",
    categories: ["3D"],
    type: "gallery-3d",
    year: "2024",
    thumbnail: "/portfolio-assets/3ds/barbie/thumbnail.webp",
    description:
      "Comprehensive 3D styling, architecture, and interior blueprint modeling of a high-fidelity dollhouse.",
    role: "3D Environment Designer",
    tools: ["Blender", "Cycles Renderer"],
    softwareUsed: "Blender",
    totalPages: 16,
    isAcademic: true,
    galleryPages: [
      "/portfolio-assets/3ds/barbie/thumbnail.webp",
      "/portfolio-assets/3ds/barbie/1.webp",
      "/portfolio-assets/3ds/barbie/2.webp",
      "/portfolio-assets/3ds/barbie/3.webp",
      "/portfolio-assets/3ds/barbie/4.webp",
      "/portfolio-assets/3ds/barbie/5.webp",
      "/portfolio-assets/3ds/barbie/6.webp",
      "/portfolio-assets/3ds/barbie/7.webp",
      "/portfolio-assets/3ds/barbie/8.webp",
      "/portfolio-assets/3ds/barbie/9.webp",
      "/portfolio-assets/3ds/barbie/10.webp",
      "/portfolio-assets/3ds/barbie/11.webp",
      "/portfolio-assets/3ds/barbie/12.webp",
      "/portfolio-assets/3ds/barbie/13.webp",
      "/portfolio-assets/3ds/barbie/14.webp",
      "/portfolio-assets/3ds/barbie/15.webp",
    ],
    bannerColor: "from-pink-400 via-rose-500 to-pink-600",
    accentColor: "text-pink-600 border-pink-200",
    outcome:
      "Meticulously created 15 high-fidelity render layouts featuring responsive light rays and custom material textures.",
    mockups: [],
  },
  {
    slug: "glass-chessboard",
    title: "Glass Chessboard",
    subtitle: "3D Raytracing & Glass Refraction Study",
    category: "3D",
    categories: ["3D"],
    type: "gallery-3d",
    year: "2024",
    thumbnail: "/portfolio-assets/3ds/chessboard/thumbnail.webp",
    description:
      "A structural rendering study analyzing light refractions, glass material shaders, and photorealistic raytracing in Blender.",
    role: "Render & Shading Artist",
    tools: ["Blender", "LuxCoreRender"],
    softwareUsed: "Blender",
    totalPages: 7,
    isAcademic: true,
    galleryPages: [
      "/portfolio-assets/3ds/chessboard/thumbnail.webp",
      "/portfolio-assets/3ds/chessboard/1.webp",
      "/portfolio-assets/3ds/chessboard/2.webp",
      "/portfolio-assets/3ds/chessboard/3.webp",
      "/portfolio-assets/3ds/chessboard/4.webp",
      "/portfolio-assets/3ds/chessboard/5.webp",
      "/portfolio-assets/3ds/chessboard/6.webp",
    ],
    bannerColor: "from-slate-400 via-zinc-500 to-zinc-700",
    accentColor: "text-slate-605 border-slate-300",
    outcome:
      "Experimented with various refraction indexes and ray dispersion, obtaining photorealistic glass refractures.",
    mockups: [],
  },
  {
    slug: "minecraft-castle",
    title: "Minecraft Castle",
    subtitle: "3D Voxel World & Layout Block Design",
    category: "3D",
    categories: ["3D"],
    type: "gallery-3d",
    year: "2024",
    thumbnail: "/portfolio-assets/3ds/tower/thumbnail.webp",
    description:
      "An intricate voxel architecture layout design mapping out medieval castle corridors, battlements, and landscaping elevations.",
    role: "3D Voxel Artist",
    tools: ["Blender", "MagicaVoxel"],
    softwareUsed: "Blender",
    totalPages: 5,
    isAcademic: true,
    galleryPages: [
      "/portfolio-assets/3ds/tower/thumbnail.webp",
      "/portfolio-assets/3ds/tower/1.webp",
      "/portfolio-assets/3ds/tower/2.webp",
      "/portfolio-assets/3ds/tower/3.webp",
      "/portfolio-assets/3ds/tower/4.webp",
    ],
    bannerColor: "from-emerald-500 via-green-600 to-teal-700",
    accentColor: "text-emerald-600 border-emerald-300",
    outcome:
      "Modeled clean multi-tiered structure designs containing custom elevations, block structures, and warm point lights.",
    mockups: [],
  },
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
