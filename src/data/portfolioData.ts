import { Project, SkillGroup, ProcessStep } from '../types';
import portraitImage from '../assets/images/ramzi_creative_portrait_1794272712940.jpg';
import projectAuraSound from '../assets/images/project_aura_sound_1794272710522.jpg';
import projectKromaMobile from '../assets/images/project_kroma_mobile_1794272711901.jpg';
import projectMonolithStudio from '../assets/images/project_monolith_studio_1794272712539.jpg';
import projectVoxel3d from '../assets/images/project_voxel_3d_1794272712913.jpg';

export const PORTFOLIO_INFO = {
  name: 'Ramzi Aloui',
  title: 'Web & Mobile Developer',
  tagline: 'CRAFTING DIGITAL EXPERIENCES.',
  subtagline: "I'm Ramzi Aloui — a Web & Mobile Developer turning ideas into meaningful digital experiences through code, creativity, and thoughtful design.",
  distinctiveStatement: 'DESIGN MINDED. CODE DRIVEN.',
  location: 'Tunisia / Available Worldwide',
  email: 'ramzidev.ads@gmail.com',
  github: 'https://github.com/ramzialoui',
  linkedin: 'https://linkedin.com/in/ramzi-aloui',
  portraitImage: portraitImage,
  aboutHeadline: 'More than just writing code.',
  aboutContent:
    "I'm a passionate Web & Mobile Developer focused on building modern, scalable, and intuitive digital products. I combine development expertise with a strong appreciation for design, usability, and performance.",
  principles: [
    {
      title: 'Think creatively.',
      desc: 'Approaching technical challenges with an editorial mindset, prioritizing user sensation, visual emotion, and clean structural clarity.',
    },
    {
      title: 'Build intelligently.',
      desc: 'Crafting modular, clean TypeScript architectures, deterministic state machines, and resilient multi-platform systems.',
    },
    {
      title: 'Deliver exceptionally.',
      desc: 'Zero-compromise polish: 60fps micro-interactions, ruthless performance budgets, and intuitive human experiences.',
    },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 'neuraudio-spatial',
    title: 'NeurAudio Spatial',
    subtitle: 'Spatial Audio Web Application & Waveform Engine',
    category: 'web',
    categoryLabel: 'Web Experience / Audio DSP',
    description:
      'A next-generation browser-based spatial sound synthesizer and interactive audio workstation delivering 3D sound positioning with zero audio buffer latency.',
    detailedCaseStudy: {
      overview:
        'NeurAudio was conceived to prove that browser-native Web Audio and WebGL can match native desktop DAW responsiveness. It empowers producers to arrange binaural audio nodes in an interactive spatial sphere.',
      challenge:
        'Managing heavy audio worklet threads alongside high-framerate dynamic WebGL canvas visualizations without dropping frames or clipping audio buffers.',
      solution:
        'Decoupled audio computations into dedicated AudioWorklets while utilizing an instanced particle vertex shader for audio-reactive waveforms.',
      keyDeliverables: [
        'Real-time binaural spatial panner',
        'AudioWorklet thread isolation',
        'Hardware-accelerated frequency visualizer',
        'Offline audio export engine',
      ],
      architecture: [
        'React 19 & TypeScript',
        'Web Audio API & AudioWorklets',
        'Tailwind CSS v4',
        'GLSL Shader Pipeline',
      ],
    },
    technologies: ['React', 'TypeScript', 'Web Audio API', 'Tailwind CSS', 'Vite'],
    image: projectAuraSound,
    liveDemoUrl: '#demo-neuraudio',
    githubUrl: 'https://github.com/ramzialoui/neuraudio-spatial',
    featuredYear: '2026',
    role: 'Lead Creative Developer & UI/UX Architect',
  },
  {
    id: 'volta-wallet',
    title: 'Volta Mobile',
    subtitle: 'Fintech & Multi-Chain Crypto Experience',
    category: 'mobile',
    categoryLabel: 'Mobile App / Cross-Platform',
    description:
      'An ultra-fast mobile portfolio and digital payments application designed for instant transactions, biometric security, and fluid 120Hz gesture animations.',
    detailedCaseStudy: {
      overview:
        'Volta is a mobile-first digital asset tracker and wallet built to eliminate the clunky friction typical of decentralized finance apps through Swiss design discipline.',
      challenge:
        'Providing sub-50ms biometric unlock and continuous background balance synchronization across iOS and Android without battery drain.',
      solution:
        'Engineered an event-driven optimistic update engine in React Native and Expo with native biometrics and Reanimated gesture interactions.',
      keyDeliverables: [
        'Cross-platform iOS & Android binary',
        'Native FaceID / Biometric authentication',
        '120Hz spring physics transactions carousel',
        'Encrypted local keychain storage',
      ],
      architecture: [
        'React Native & Expo',
        'TypeScript',
        'React Reanimated 3',
        'Tailwind / NativeWind',
      ],
    },
    technologies: ['React Native', 'Expo', 'TypeScript', 'Reanimated', 'REST APIs'],
    image: projectKromaMobile,
    liveDemoUrl: '#demo-volta',
    githubUrl: 'https://github.com/ramzialoui/volta-mobile',
    featuredYear: '2026',
    role: 'Mobile Systems Engineer',
  },
  {
    id: 'monolith-journal',
    title: 'Monolith Architecture',
    subtitle: 'Editorial Publication & Curated Archive',
    category: 'web',
    categoryLabel: 'Web Editorial / Headless CMS',
    description:
      'A brutalist digital journal exploring modern monolithic architecture, featuring custom typographic typesetting, fluid page transitions, and archival search.',
    detailedCaseStudy: {
      overview:
        'Monolith Architecture re-imagines architectural journalism through high-contrast typography, strict grid proportion rules, and seamless editorial reading layouts.',
      challenge:
        'Balancing ultra-high-resolution architectural photography with perfect Core Web Vitals and instant search indexing across 5,000+ monograph entries.',
      solution:
        'Built an optimized headless Next.js rendering pipeline with intelligent edge image responsive resizing and client-side fuzzy search.',
      keyDeliverables: [
        'Dynamic multi-column Swiss typography system',
        'Sub-second edge caching pipeline',
        'Interactive architectural timeline & blueprints',
        'Instant full-text archive indexing',
      ],
      architecture: [
        'Next.js & React',
        'Tailwind CSS',
        'Headless API Architecture',
        'Edge Cache CDN',
      ],
    },
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
    image: projectMonolithStudio,
    liveDemoUrl: '#demo-monolith',
    githubUrl: 'https://github.com/ramzialoui/monolith-architecture',
    featuredYear: '2025',
    role: 'Full-Stack Developer & Designer',
  },
  {
    id: 'aether-3d',
    title: 'Aether Configurator',
    subtitle: 'Interactive 3D Engineering & Vehicle Visualizer',
    category: 'creative',
    categoryLabel: 'Creative Dev / WebGL Configurator',
    description:
      'A real-time WebGL configurator enabling engineers and collectors to inspect complex wireframe telemetry, swap dynamic composite materials, and export high-res CAD snapshots.',
    detailedCaseStudy: {
      overview:
        'Developed to demonstrate how high-performance real-time 3D can live inside modern web applications without plug-ins or slow loading times.',
      challenge:
        'Rendering 1.4 million polygons with custom wireframe shaders and specular lighting on consumer mobile and desktop browsers.',
      solution:
        'Created a progressive level-of-detail (LOD) algorithm with custom WebGL GLSL materials and deferred lighting passes.',
      keyDeliverables: [
        'Interactive 360-degree orbital camera rig',
        'Dynamic wireframe and emissive lighting shader',
        'Material and aerodynamic drag coefficient calculator',
        'Lossless high-res client screenshot renderer',
      ],
      architecture: [
        'Three.js / WebGL',
        'React & TypeScript',
        'GLSL Shaders',
        'Tailwind CSS',
      ],
    },
    technologies: ['React', 'TypeScript', 'WebGL', 'Three.js', 'Tailwind CSS'],
    image: projectVoxel3d,
    liveDemoUrl: '#demo-aether',
    githubUrl: 'https://github.com/ramzialoui/aether-configurator',
    featuredYear: '2025',
    role: 'Creative WebGL Developer',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Frontend Development',
    skills: [
      { name: 'HTML5', level: 'Expert', description: 'Semantic structure, accessibility standards, ARIA semantics' },
      { name: 'CSS3', level: 'Expert', description: 'Advanced CSS layouts, responsive architecture, CSS variables' },
      { name: 'JavaScript', level: 'Expert', description: 'ESNext, asynchronous event loops, Web APIs, DOM performance' },
      { name: 'TypeScript', level: 'Expert', description: 'Strict type safety, generic interfaces, scalable architecture' },
      { name: 'React', level: 'Expert', description: 'React 19, custom hooks, concurrent mode, performance tuning' },
      { name: 'Next.js', level: 'Advanced', description: 'App router, server components, edge deployment, SEO optimization' },
      { name: 'Tailwind CSS', level: 'Expert', description: 'Tailwind v4, atomic design systems, custom theme design' },
    ],
  },
  {
    category: 'Backend Development',
    skills: [
      { name: 'Node.js', level: 'Advanced', description: 'Event-driven backend services, CLI utilities, stream processing' },
      { name: 'Express.js', level: 'Advanced', description: 'RESTful API routing, middleware architecture, secure headers' },
      { name: 'REST APIs', level: 'Expert', description: 'API contract design, versioning, pagination, JSON schema validation' },
      { name: 'Database integration', level: 'Advanced', description: 'Relational & NoSQL modeling, indexing, query optimization' },
    ],
  },
  {
    category: 'Mobile Development',
    skills: [
      { name: 'React Native', level: 'Advanced', description: 'Native cross-platform applications, custom bridges, 120Hz gesture handling' },
      { name: 'Expo', level: 'Advanced', description: 'EAS build automation, OTA updates, cross-platform modules' },
      { name: 'Cross-platform development', level: 'Advanced', description: 'Adaptive layouts for iOS and Android, native device capabilities' },
    ],
  },
  {
    category: 'Tools & Workflow',
    skills: [
      { name: 'Git & GitHub', level: 'Expert', description: 'Trunk-based workflows, GitHub Actions CI/CD, interactive rebasing' },
      { name: 'Figma', level: 'Advanced', description: 'Design tokens, auto-layout prototypes, design-to-code fidelity' },
      { name: 'VS Code', level: 'Expert', description: 'Custom developer toolchains, linting, debugging extensions' },
      { name: 'Responsive design', level: 'Expert', description: 'Fluid typography math, multi-device viewport scaling' },
      { name: 'Performance optimization', level: 'Expert', description: 'Core Web Vitals, tree-shaking, lazy-loading, asset compression' },
    ],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    phase: 'DISCOVER',
    title: 'Understand the problem and define the vision.',
    summary:
      'Every transformative product begins with deep active listening. I deconstruct user objectives, technical constraints, and brand goals before writing a single line of code.',
    details: [
      'Deconstruct business requirements and identify core user pain points',
      'Audit existing digital infrastructure and competitive landscapes',
      'Establish technical viability, architectural benchmarks, and KPIs',
      'Formulate a precise product roadmap with explicit engineering milestones',
    ],
    deliverables: ['Product Architecture Blueprint', 'Technical Feasibility Study', 'UX User Journeys'],
  },
  {
    number: '02',
    phase: 'DESIGN',
    title: 'Create intuitive interfaces and thoughtful experiences.',
    summary:
      'Bridging aesthetics and usability. I craft interactive prototypes with typographic precision, purposeful spatial math, and cohesive design systems that elevate brand prestige.',
    details: [
      'Develop cohesive design systems with reusable atomic tokens',
      'Prototype fluid micro-interactions, motion curves, and gesture feedback',
      'Design accessible, WCAG-compliant UI across all viewport breakpoints',
      'Iterate on interactive tactile prototypes to validate user flow friction',
    ],
    deliverables: ['High-Fidelity Component Library', 'Interactive Prototypes', 'Design System Specification'],
  },
  {
    number: '03',
    phase: 'DEVELOP',
    title: 'Transform concepts into functional, scalable products.',
    summary:
      'Turning pixel-perfect designs into clean, resilient code. I write modular, type-safe TypeScript with rigorous separation of concerns and ultra-fast loading speeds.',
    details: [
      'Architect robust component hierarchies with strict type safety',
      'Implement smooth 60fps animations, physics gestures, and transitions',
      'Integrate performant APIs, caching layers, and database queries',
      'Write deterministic unit tests to ensure long-term stability and regression resistance',
    ],
    deliverables: ['Clean Production Codebase', 'Automated Unit Tests', 'API Integration Layer'],
  },
  {
    number: '04',
    phase: 'DEPLOY',
    title: 'Optimize, test, and deliver exceptional results.',
    summary:
      'Production readiness without compromise. I fine-tune Core Web Vitals, optimize asset delivery, enforce strict security standards, and launch with continuous CI/CD pipelines.',
    details: [
      'Conduct end-to-end testing across modern browsers and mobile devices',
      'Audit and optimize Core Web Vitals (LCP, INP, CLS) for top-tier performance',
      'Configure automated CI/CD deployment pipelines with zero-downtime rollouts',
      'Deliver clear technical documentation and post-launch verification support',
    ],
    deliverables: ['Live Production Deployment', 'Lighthouse 95+ Performance Audit', 'Technical Documentation'],
  },
];
