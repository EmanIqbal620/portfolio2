export const workCategories = ['All', 'AI & Agents', 'Fullstack'] as const;

export type WorkProject = {
  id: number;
  category: string;
  icon: string;
  title: string;
  badge: string;
  what: string;
  screenshot: string;
  architectureSvg?: string;
  links: { demo?: string; github?: string; architecture?: string };
  demoLabel?: string;
  tags: string[];
  accent: 'magenta' | 'teal' | 'purple';
};

export const workProjects: WorkProject[] = [
  {
    id: 1,
    category: 'AI & Agents',
    icon: 'Bot',
    title: 'CRM Digital FTE Factory',
    badge: 'GIAIC Hackathon 5 — Advanced',
    what: 'AI agent handling Gmail, WhatsApp, and CRM autonomously — Kafka for real-time event handling instead of polling.',
    screenshot: '/projects/crm/screenshot.webp',
    links: { demo: 'https://youtu.be/WlHItrNs8Z8', github: '#', architecture: '#' },
    tags: ['OpenAI Agents SDK', 'Kafka', 'Docker', 'MCP'],
    accent: 'magenta',
  },
  {
    id: 2,
    category: 'AI & Agents',
    icon: 'Smartphone',
    title: 'Personal AI Employee (Digital FTE)',
    badge: 'GIAIC Hackathon 0 — Advanced',
    what: 'Self-running agent on Claude Code + MCP servers, triggered by file watchers. Obsidian dashboard shows what it decided, no log digging.',
    screenshot: '/projects/ai-employee/screenshot.svg',
    links: { demo: '#', github: 'https://github.com/EmanIqbal620/Full-Time-AI-Employee.git' },
    tags: ['Claude Code', 'MCP servers', 'Python watchers', 'Obsidian'],
    accent: 'magenta',
  },
  {
    id: 8,
    category: 'Fullstack',
    icon: 'BookOpen',
    title: 'Humanoid Robotics Book + RAG AI Tutor',
    badge: 'GIAIC Hackathon 1',
    what: 'Free 6-module robotics textbook with a RAG tutor embedded — answers grounded in the book content. Qdrant for semantic search, not keyword lookup.',
    screenshot: '/projects/humanoid-robotics/screenshot.webp',
    architectureSvg: '/projects/humanoid-robotics/architecture.svg',
    links: { demo: 'https://ai-native-book-ruddy.vercel.app', github: 'https://github.com/EmanIqbal620/ai-native-book.git', architecture: '#' },
    tags: ['Docusaurus', 'RAG', 'Qdrant', 'FastAPI', 'Neon Postgres'],
    accent: 'teal',
  },
  {
    id: 5,
    category: 'Fullstack',
    icon: 'CheckSquare',
    title: 'TodoFlow AI Task Manager',
    badge: 'GIAIC Hackathon 3',
    what: 'Todo app with an AI chatbot that helps prioritize, not just store tasks. Full auth + analytics, live on Vercel.',
    screenshot: '/projects/todoflow/screenshot.webp',
    architectureSvg: '/projects/todoflow/architecture.svg',
    links: { demo: 'https://tobo-app-chatbot.vercel.app', github: 'https://github.com/EmanIqbal620/tobo-app-chatbot.git' },
    tags: ['Next.js', 'FastAPI', 'Better Auth', 'JWT', 'Neon Postgres'],
    accent: 'magenta',
  },
  {
    id: 4,
    category: 'AI & Agents',
    icon: 'MessageSquare',
    title: 'AI Chat — Chainlit + Gemini',
    badge: '',
    what: 'Real-time streaming chat backed by the Gemini API, live on Hugging Face.',
    screenshot: '/projects/chainlit/screenshot.webp',
    links: { demo: 'https://emaniqbal-chainlit1.hf.space', github: 'https://github.com/EmanIqbal620/chainlit.git' },
    tags: ['Chainlit', 'Python', 'Gemini API'],
    accent: 'magenta',
  },
  {
    id: 6,
    category: 'Fullstack',
    icon: 'ShoppingCart',
    title: 'Tulip Flower Shop',
    badge: '',
    what: 'E-commerce build — cart, reviews, discount pricing, 12+ products — deployed on Vercel.',
    screenshot: '/projects/tulip/screenshot.webp',
    links: { demo: 'https://tulip-e-commerce-web-42fy.vercel.app/', github: 'https://github.com/EmanIqbal620/tulip-E-commerce-web.git' },
    tags: ['Next.js', 'Tailwind CSS', 'Vercel'],
    accent: 'teal',
  },
  {
    id: 7,
    category: 'Fullstack',
    icon: 'FileText',
    title: 'Blog — Sociology & Tech',
    badge: 'Deployed on Vercel',
    what: 'Modern blogging platform with responsive layouts, clean content-focused UI, and Sanity CMS for content management.',
    screenshot: '/projects/blog/screenshot.webp',
    links: { demo: 'https://blog-web-kappa-lime.vercel.app/', github: 'https://github.com/EmanIqbal620/blog-web.git' },
    tags: ['Next.js', 'Sanity CMS', 'Tailwind', 'Vercel'],
    accent: 'teal',
  },
  {
    id: 9,
    category: 'Fullstack',
    icon: 'Package',
    title: '12 TypeScript CLI Packages',
    badge: 'Open Source — NPM',
    what: 'Published 12 open-source TypeScript CLI tools and interactive terminal utilities — strict type safety, modular package design.',
    screenshot: '/projects/npm-packages/screenshot.webp',
    links: { demo: 'https://www.npmjs.com/~eman_iqbal', github: '#' },
    demoLabel: 'VIEW ON NPM',
    tags: ['TypeScript', 'NPM', 'CLI', 'inquirer', 'chalk'],
    accent: 'purple',
  },
  {
    id: 11,
    category: 'Fullstack',
    icon: 'ShoppingCart',
    title: 'Furniture E-Commerce',
    badge: 'Deployed on Vercel',
    what: 'Production furniture store with Sanity CMS product management, cart functionality, and complete shopping flow.',
    screenshot: '/projects/furniture/screenshot.webp',
    links: { demo: 'https://e-website-ac7a.vercel.app', github: 'https://github.com/EmanIqbal620/E-website.git' },
    tags: ['Next.js', 'Sanity CMS', 'Tailwind CSS', 'Clerk'],
    accent: 'teal',
  },
];

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Contact", href: "#contact" },
];
