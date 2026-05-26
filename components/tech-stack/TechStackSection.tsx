'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

type ToolDef = {
  name: string;
  icon: string;
  color?: string;
};

const techCategories: {
  name: string;
  tools: ToolDef[];
  highlighted: boolean;
}[] = [
  {
    name: 'AI & AGENTIC',
    highlighted: true,
    tools: [
      { name: 'OpenAI Agents SDK', icon: 'OA', color: '#74aa9c' },
      { name: 'MCP', icon: 'MC', color: '#2DD4BF' },
      { name: 'RAG', icon: 'RG', color: '#2DD4BF' },
      { name: 'Claude Code', icon: 'CC', color: '#d97757' },
      { name: 'Gemini CLI', icon: 'GM', color: '#4285F4' },
      { name: 'Gemini API', icon: 'GA', color: '#4285F4' },
      { name: 'OpenAI API', icon: 'OA', color: '#74aa9c' },
      { name: 'Qdrant', icon: 'QD', color: '#ea2845' },
      { name: 'Chainlit', icon: 'CL', color: '#F7DF1E' },
    ],
  },
  {
    name: 'BACKEND',
    highlighted: false,
    tools: [
      { name: 'FastAPI', icon: 'FA', color: '#009688' },
      { name: 'REST API', icon: 'R⎔', color: '#25D366' },
      { name: 'PostgreSQL', icon: 'PG', color: '#4169E1' },
      { name: 'Neon Database', icon: 'ND', color: '#00E599' },
      { name: 'Kafka', icon: 'KF', color: '#231F20' },
      { name: 'Webhook', icon: 'WH', color: '#FF6B35' },
      { name: 'ODOO', icon: 'OD', color: '#714B67' },
    ],
  },
  {
    name: 'FRONTEND',
    highlighted: false,
    tools: [
      { name: 'Next.js', icon: 'N⎔', color: '#ffffff' },
      { name: 'React', icon: 'R⎔', color: '#61DAFB' },
      { name: 'TypeScript', icon: 'TS', color: '#3178C6' },
      { name: 'Tailwind CSS', icon: 'T±', color: '#06B6D4' },
      { name: 'Framer Motion', icon: 'FM', color: '#0055FF' },
      { name: 'Three.js', icon: '3J', color: '#ffffff' },
    ],
  },
  {
    name: 'DESIGN & PROTOTYPING',
    highlighted: false,
    tools: [
      { name: 'Figma', icon: 'Fg', color: '#F24E1E' },
      { name: 'Markdown', icon: 'Md', color: '#ffffff' },
    ],
  },
  {
    name: 'AUTHENTICATION',
    highlighted: false,
    tools: [
      { name: 'Clerk', icon: 'Ck', color: '#6C47FF' },
      { name: 'Better Auth', icon: 'BA', color: '#22C55E' },
      { name: 'JWT', icon: 'JW', color: '#ffffff' },
    ],
  },
  {
    name: 'DEVOPS & CLOUD',
    highlighted: false,
    tools: [
      { name: 'Docker', icon: 'Dk', color: '#2496ED' },
      { name: 'Kubernetes', icon: 'K8', color: '#326CE5' },
      { name: 'Vercel', icon: 'Vc', color: '#ffffff' },
      { name: 'Google Cloud', icon: 'GC', color: '#4285F4' },
      { name: 'Hugging Face', icon: 'HF', color: '#FFD21E' },
      { name: 'GitHub Pages', icon: 'GH', color: '#ffffff' },
    ],
  },
  {
    name: 'LANGUAGES',
    highlighted: false,
    tools: [
      { name: 'Python', icon: 'Py', color: '#3776AB' },
      { name: 'TypeScript', icon: 'TS', color: '#3178C6' },
      { name: 'JavaScript', icon: 'JS', color: '#F7DF1E' },
    ],
  },
  {
    name: 'CMS & CONTENT',
    highlighted: false,
    tools: [
      { name: 'Sanity CMS', icon: 'SC', color: '#F03E2F' },
      { name: 'Docusaurus', icon: 'Ds', color: '#3ECC5F' },
    ],
  },
  {
    name: 'OPEN SOURCE',
    highlighted: false,
    tools: [
      { name: 'NPM Publisher', icon: 'NP', color: '#CB3837' },
      { name: 'Spec-Kit Plus', icon: 'SK', color: '#A855F7' },
      { name: 'inquirer', icon: 'Iq', color: '#F7DF1E' },
      { name: 'chalk', icon: 'Ch', color: '#2DD4BF' },
    ],
  },
];

function ToolChip({ tool, index, highlighted }: { tool: ToolDef; index: number; highlighted: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      whileHover={{ y: -4, scale: 1.05 }}
      className={`group flex flex-col items-center gap-2 p-2.5 rounded-xl transition-all duration-200 ease-out will-change-transform ${
        highlighted
          ? 'hover:bg-[#2DD4BF]/10'
          : 'hover:bg-white/[0.05]'
      }`}
    >
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-black tracking-tight transition-all duration-200 ease-out will-change-transform group-hover:scale-110 group-hover:shadow-lg ${
          highlighted
            ? 'border border-[#2DD4BF]/25 bg-[#2DD4BF]/8 group-hover:border-[#2DD4BF]/50 group-hover:bg-[#2DD4BF]/15'
            : 'border border-white/[0.1] bg-white/[0.04] group-hover:border-white/25 group-hover:bg-white/[0.08]'
        }`}
        style={{ color: tool.color || (highlighted ? '#2DD4BF' : 'rgba(255,255,255,0.5)') }}
      >
        {tool.icon}
      </div>
      <span
        className={`text-[11px] font-medium text-center leading-tight transition-colors duration-200 ${
          highlighted
            ? 'text-white/60 group-hover:text-[#2DD4BF]/90'
            : 'text-white/50 group-hover:text-white/80'
        }`}
      >
        {tool.name}
      </span>
    </motion.div>
  );
}

function CategoryCard({
  category,
  index,
}: {
  category: (typeof techCategories)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  const isAI = category.highlighted;
  const accentHex = '#2DD4BF';

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-xl border p-5 sm:p-6 ${
        isAI
          ? 'border-[#2DD4BF]/20 bg-[#2DD4BF]/[0.03]'
          : 'border-white/[0.07] bg-white/[0.02]'
      }`}
      style={{
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease',
        boxShadow: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 4px 1px ${accentHex}12, 0 24px 60px ${accentHex}10, 0 0 40px ${accentHex}06`;
        e.currentTarget.style.borderColor = isAI ? 'rgba(45,212,191,0.5)' : 'rgba(45,212,191,0.25)';
        e.currentTarget.style.background = isAI ? 'rgba(45,212,191,0.06)' : 'rgba(255,255,255,0.04)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = isAI ? 'rgba(45,212,191,0.2)' : 'rgba(255,255,255,0.07)';
        e.currentTarget.style.background = isAI ? 'rgba(45,212,191,0.03)' : 'rgba(255,255,255,0.02)';
      }}
    >
      {/* Hover radial glow from top */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% -10%, ${accentHex}18, transparent 60%)`,
        }}
      />

      {/* Subtle inner glass gradient at rest */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent rounded-xl pointer-events-none" />

      {isAI && (
        <div
          className="absolute inset-0 opacity-40 rounded-xl pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(45,212,191,0.12), transparent 70%)',
          }}
        />
      )}

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-3 bottom-3 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r pointer-events-none"
        style={{ background: `linear-gradient(180deg, ${accentHex}, ${accentHex}40)` }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-4">
          {isAI && (
            <span className="w-2 h-2 rounded-full bg-[#2DD4BF] shadow-[0_0_8px_rgba(45,212,191,0.6)] animate-pulse" />
          )}
          <h3
            className={`text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
              isAI ? 'text-[#2DD4BF]' : 'text-white/40 group-hover:text-white/60'
            }`}
          >
            {category.name}
          </h3>
        </div>

        <div
          className={`grid gap-1.5 ${
            category.tools.length > 6
              ? 'grid-cols-3 sm:grid-cols-3'
              : category.tools.length > 4
              ? 'grid-cols-3'
              : category.tools.length > 2
              ? 'grid-cols-2 sm:grid-cols-3'
              : 'grid-cols-2'
          }`}
        >
          {category.tools.map((tool, i) => (
            <ToolChip key={tool.name} tool={tool} index={i} highlighted={isAI} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function TechStackSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="relative py-16 md:py-28 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#2DD4BF]/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-magenta/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div
          className="mb-10 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <motion.span
            className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-[#2DD4BF]/70"
            initial={{ opacity: 0, x: -20 }}
            animate={controls}
            variants={{ visible: { opacity: 1, x: 0, transition: { delay: 0.1 } } }}
          >
            Tech Stack
          </motion.span>
          <motion.h2
            className="section-title mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: { delay: 0.15 } } }}
          >
            The tools I use to build{' '}
            <span className="gradient-text">production systems</span>
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base text-white/50 mt-3 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: { delay: 0.2 } } }}
          >
            Categorized tooling I reach for every day — from agentic AI to devops and open source.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {techCategories.map((category, index) => (
            <CategoryCard key={category.name} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
