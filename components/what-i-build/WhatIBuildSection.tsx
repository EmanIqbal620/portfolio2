'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  Bot,
  Database,
  Globe,
  Boxes,
  Puzzle,
  Terminal,
} from 'lucide-react';

const cards = [
  {
    id: 1,
    title: 'AI employees & automation',
    description:
      'Autonomous agents handling Gmail, WhatsApp, webhooks and social media 24/7 — connecting CRM, social platforms, and business tools into one zero-touch pipeline.',
    tags: ['OpenAI Agents SDK', 'Kafka', 'ODOO'],
    icon: <Bot className="w-6 h-6" />,
    accent: 'magenta' as const,
    featured: true,
  },
  {
    id: 2,
    title: 'RAG systems',
    description:
      'Chatbots trained on real documents using vector search and document intelligence — answers accurately from user-selected content. Embedded inside a live published book.',
    tags: ['RAG', 'Qdrant', 'Neon PostgreSQL'],
    icon: <Database className="w-6 h-6" />,
    accent: 'teal' as const,
    featured: false,
  },
  {
    id: 3,
    title: 'Reusable agent architecture',
    description:
      'Reusable AI components any agent can plug into — cloud-native blueprints built with Claude Code subagents and agent skills. Cuts build time across every project.',
    tags: ['Claude Code', 'MCP', 'Spec-Kit Plus'],
    icon: <Puzzle className="w-6 h-6" />,
    accent: 'magenta' as const,
    featured: false,
  },
  {
    id: 4,
    title: 'Full-stack web apps',
    description:
      'Production-ready apps with auth (Clerk, BetterAuth, JWT), CMS, analytics and AI integration built in — delivered end-to-end across e-commerce, blog and todo platforms.',
    tags: ['Next.js', 'Sanity CMS', 'BetterAuth', 'JWT', 'Multiple apps live in production'],
    icon: <Globe className="w-6 h-6" />,
    accent: 'teal' as const,
    featured: false,
  },
  {
    id: 5,
    title: 'Open source packages',
    description:
      '12 TypeScript packages on npm — spanning finance, education, gaming and dev tools. Fully typed, versioned and installable by any developer worldwide.',
    tags: ['TypeScript', 'npm', 'Open source', '12 packages — public npm profile'],
    icon: <Boxes className="w-6 h-6" />,
    accent: 'purple' as const,
    featured: false,
  },
  {
    id: 6,
    title: 'AI-driven development',
    description:
      'Spec-first workflow with Claude Code, Gemini CLI and Spec-Kit Plus — prototype fast, harden for production. Every hackathon built this way from incubation to deployment.',
    tags: ['Claude Code', 'Gemini CLI', 'Spec-Kit Plus'],
    icon: <Terminal className="w-6 h-6" />,
    accent: 'purple' as const,
    featured: false,
  },
];

function Tag({ label, hex }: { label: string; hex: string }) {
  return (
    <motion.span
      className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium rounded-full border text-white/60 cursor-default"
      style={{ borderColor: `${hex}25`, backgroundColor: `${hex}08` }}
      whileHover={{
        borderColor: `${hex}50`,
        backgroundColor: `${hex}15`,
        color: '#ffffff',
      }}
      transition={{ duration: 0.2 }}
    >
      {label}
    </motion.span>
  );
}

function Card({ card, index }: { card: (typeof cards)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  const accentMap = {
    magenta: { hex: '#D946EF' },
    teal: { hex: '#2DD4BF' },
    purple: { hex: '#A855F7' },
  };

  const c = accentMap[card.accent];
  const isFeatured = card.featured;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: isFeatured ? 0 : (index < 3 ? 0.08 + index * 0.06 : 0.3 + (index - 3) * 0.06),
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className={`group relative overflow-hidden rounded-xl border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal/50 ${
        isFeatured
          ? 'bg-white/[0.08] border-accent-magenta/25'
          : 'bg-white/[0.05] border-white/[0.1]'
      }`}
      style={{
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        transition: 'box-shadow 0.3s ease',
        boxShadow: 'none',
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 4px 1px ${c.hex}15, 0 24px 60px ${c.hex}12`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Subtle inner glass gradient for depth — always behind hover effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />

      {/* Hover radial glow from top-center */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse at 50% -20%, ${c.hex}20, transparent 60%)` }}
      />

      {/* Left accent bar on hover */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r"
        style={{ background: `linear-gradient(180deg, ${c.hex}, ${c.hex}60)` }}
      />

      <div className="relative z-10 p-6">
        {/* Badge for featured card */}
        {isFeatured && (
          <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold tracking-[0.12em] uppercase text-accent-magenta/80 bg-accent-magenta/10 border border-accent-magenta/20 rounded">
            Primary
          </span>
        )}

        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-[transform,box-shadow] duration-500 group-hover:scale-110 group-hover:shadow-xl ${
            card.accent === 'magenta'
              ? 'bg-accent-magenta/15 text-accent-magenta'
              : card.accent === 'teal'
              ? 'bg-accent-teal/15 text-accent-teal'
              : 'bg-purple-500/15 text-purple-400'
          }`}
          style={{ '--tw-shadow-color': `${c.hex}40` } as React.CSSProperties}
        >
          {card.icon}
        </div>

        {/* Title */}
        <h3 className="text-base md:text-lg font-bold text-white mb-2.5">
          {card.title}
        </h3>

        {/* Description */}
        <p className="text-xs md:text-sm text-white/60 leading-relaxed mb-5">
          {card.description}
        </p>

        {/* Tags — no divider, flows naturally */}
        <div className="flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <Tag key={tag} label={tag} hex={c.hex} />
          ))}
        </div>
      </div>


    </motion.div>
  );
}

export function WhatIBuildSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  return (
    <section
      id="what-i-build"
      className="relative py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24 overflow-hidden"
    >
      {/* Background depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-accent-magenta/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-accent-teal/[0.03] rounded-full blur-[100px]" />

        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden="true">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={sectionRef}
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
        >
          <motion.h2
            className="section-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.6 } } }}
          >
            WHAT I BUILD
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base text-white/50 mt-3 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6 } } }}
          >
            From hackathon projects to production deployment — every project built to ship.
          </motion.p>
        </motion.div>

        {/* 6-card grid with featured card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-fr">
          {cards.map((card, index) => (
            <Card key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
