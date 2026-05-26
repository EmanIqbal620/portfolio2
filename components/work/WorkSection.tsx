'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Sparkles, Bot, Smartphone, Brain, MessageSquare, CheckSquare, ShoppingCart, FileText, BookOpen, Package, Code } from 'lucide-react';
import { workCategories, workProjects, type WorkProject } from '@/lib/data';

const accentColors = {
  magenta: { hex: '#D946EF', text: 'text-accent-magenta', border: 'border-accent-magenta/25' },
  teal:    { hex: '#2DD4BF', text: 'text-accent-teal',    border: 'border-accent-teal/25' },
  purple:  { hex: '#A855F7', text: 'text-purple-400',     border: 'border-purple-500/25' },
};

const iconMap: Record<string, React.ReactNode> = {
  Bot: <Bot className="w-5 h-5" />,
  Smartphone: <Smartphone className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  MessageSquare: <MessageSquare className="w-5 h-5" />,
  CheckSquare: <CheckSquare className="w-5 h-5" />,
  ShoppingCart: <ShoppingCart className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  Package: <Package className="w-5 h-5" />,
  Code: <Code className="w-5 h-5" />,
};

const largeIconMap: Record<string, React.ReactNode> = {
  Bot: <Bot className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  MessageSquare: <MessageSquare className="w-6 h-6" />,
  CheckSquare: <CheckSquare className="w-6 h-6" />,
  ShoppingCart: <ShoppingCart className="w-6 h-6" />,
  FileText: <FileText className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  Package: <Package className="w-6 h-6" />,
  Code: <Code className="w-6 h-6" />,
};

function ProjectCard({ project }: { project: WorkProject }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  const c = accentColors[project.accent];

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.97 }}
      className="group relative overflow-hidden rounded-xl border border-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal/50"
      style={{
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        transition: 'box-shadow 0.3s ease',
        boxShadow: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 4px 1px ${c.hex}15, 0 24px 60px ${c.hex}12`;
      }}		  
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Blur layer (separate from transform to prevent backdrop-filter repaint jitter) */}
      <div className="absolute inset-0 rounded-xl pointer-events-none" style={{ background: `linear-gradient(180deg, ${c.hex}12 0%, rgba(255,255,255,0.04) 50%)` }} />
      {/* Base depth layer */}
      <div className="absolute inset-0 bg-black/40 rounded-xl" />
      {/* Glass sheen */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent rounded-xl" />
      {/* Accent glow */}
      <div
        className="absolute inset-0 opacity-40"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${c.hex}15, transparent 70%)` }}
      />
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-3 bottom-3 w-[3px] opacity-30 group-hover:opacity-100 transition-opacity duration-300 rounded-r"
        style={{ background: `linear-gradient(180deg, ${c.hex}, ${c.hex}40)` }}
      />

      {/* Hover radial glow */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse at 50% -20%, ${c.hex}18, transparent 60%)` }}
      />

      {/* Inner glass depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent" />

      {/* Screenshot / image */}
      <div className="relative h-[200px] md:h-[240px] overflow-hidden bg-black/40">
        {project.screenshot ? (
          <>
            <Image
              src={project.screenshot}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top brightness-[1.02] contrast-[1.08] saturate-[1.06] transition-all duration-500 group-hover:scale-105 group-hover:opacity-90 group-hover:brightness-[1.06] group-hover:contrast-[1.12]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            <div className="absolute inset-0 rounded-t-lg ring-1 ring-inset ring-white/[0.04]" />
          </>
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${c.hex}25, ${c.hex}08)` }}>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(${c.hex}15 1px, transparent 1px), linear-gradient(90deg, ${c.hex}15 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-15">
              {largeIconMap[project.icon]}
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 p-5 md:p-6 flex flex-col">
        {/* Icon + Title */}
        <div className="mb-3">
          <div className="relative mb-2.5">
            <div
              className="absolute inset-0 rounded-xl"
              style={{ border: `1px solid ${c.hex}30`, boxShadow: `0 0 16px ${c.hex}12` }}
            />
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center relative z-10"
              style={{ backgroundColor: `${c.hex}18`, color: c.hex }}
              whileHover={{ rotate: 10, scale: 1.15 }}
            >
              {iconMap[project.icon]}
            </motion.div>
          </div>
          <h3 className="text-sm md:text-base font-bold text-white leading-snug">
            {project.title}
          </h3>
        </div>

        {/* Badge */}
        <span className="text-[10px] font-semibold text-white/45 tracking-wide mb-3 md:mb-4">
          {project.badge}
        </span>

        {/* PROBLEM */}
        <div className="space-y-0.5 mb-2.5">
          <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${c.text}`}>
            Problem
          </span>
          <p className="text-xs md:text-sm text-white/55 leading-relaxed">
            {project.why}
          </p>
        </div>

        {/* BUILT */}
        <div className="space-y-0.5 mb-2.5">
          <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${c.text}`}>
            Built
          </span>
          <p className="text-xs md:text-sm text-white/60 leading-relaxed">
            {project.what}
          </p>
        </div>

        {/* RESULT — stat badge */}
        {project.result && (
          <div
            className="mb-4 px-3 py-2 rounded-lg border text-xs md:text-sm font-medium leading-relaxed"
            style={{
              backgroundColor: `${c.hex}10`,
              borderColor: `${c.hex}20`,
              color: c.hex,
            }}
          >
            {project.result}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.map((tag) => (
            <motion.span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 text-[10px] md:text-[11px] font-medium rounded-full border text-white/45 cursor-default"
              style={{ borderColor: `${c.hex}25`, backgroundColor: `${c.hex}08` }}
              whileHover={{
                borderColor: `${c.hex}50`,
                backgroundColor: `${c.hex}15`,
                color: '#ffffff',
              }}
              transition={{ duration: 0.2 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-white/[0.06]">
          {project.links.demo && project.links.demo !== '#' && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-300"
            style={{
              backgroundColor: `${c.hex}15`,
              borderColor: `${c.hex}35`,
              color: c.hex,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${c.hex}25`;
              e.currentTarget.style.borderColor = `${c.hex}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = `${c.hex}15`;
              e.currentTarget.style.borderColor = `${c.hex}35`;
            }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{project.demoLabel || 'Live Demo'}</span>
          </a>
          )}
          {project.links.github && project.links.github !== '#' && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-white/[0.12] text-white/50 hover:text-white hover:border-white/[0.25] hover:bg-white/[0.04] transition-all duration-300"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          )}
          {project.architectureSvg && (
            <a
              href={project.architectureSvg}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-white/[0.12] text-white/50 hover:text-white hover:border-white/[0.25] hover:bg-white/[0.04] transition-all duration-300"
            >
              <span>Architecture</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function CompactProjectCard({ project }: { project: WorkProject }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  const c = accentColors[project.accent];

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      className="group relative overflow-hidden rounded-lg border border-white/[0.1]"
      style={{
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 3px 1px ${c.hex}12, 0 12px 30px ${c.hex}08`;
        e.currentTarget.style.borderColor = `${c.hex}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
      }}
    >
      {/* Blur layer (separate from transform to prevent backdrop-filter repaint jitter) */}
      <div className="absolute inset-0 rounded-lg pointer-events-none" style={{ background: `linear-gradient(180deg, ${c.hex}10 0%, rgba(255,255,255,0.03) 60%)` }} />
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-2 bottom-2 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r"
        style={{ background: `linear-gradient(180deg, ${c.hex}, ${c.hex}40)` }}
      />
      {/* Hover radial glow */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse at 50% -20%, ${c.hex}18, transparent 60%)` }}
      />
      {/* Screenshot */}
      {project.screenshot && (
        <div className="relative h-[140px] overflow-hidden bg-black/40">
          <Image
            src={project.screenshot}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top brightness-[1.02] contrast-[1.08] saturate-[1.06] transition-all duration-500 group-hover:scale-105 group-hover:opacity-90 group-hover:brightness-[1.06] group-hover:contrast-[1.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          <div className="absolute inset-0 rounded-t-lg ring-1 ring-inset ring-white/[0.04]" />
        </div>
      )}

      <div className="p-3 md:p-4">
        <div className="flex items-start gap-2.5 mb-2">
          <motion.div
            className="w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${c.hex}15`, color: c.hex }}
            whileHover={{ rotate: 8, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {iconMap[project.icon]}
          </motion.div>
          <h4 className="text-xs md:text-sm font-bold text-white leading-snug pt-0.5">
            {project.title}
          </h4>
        </div>
        <p className="text-[11px] md:text-xs text-white/50 leading-relaxed mb-2 line-clamp-2">
          {project.what}
        </p>
        {project.result && (
          <p className="text-[10px] md:text-[11px] leading-relaxed mb-2 px-2.5 py-1.5 rounded-md border"
            style={{
              backgroundColor: `${c.hex}10`,
              borderColor: `${c.hex}20`,
              color: c.hex,
            }}
          >
            {project.result}
          </p>
        )}
        <div className="flex flex-wrap gap-1 mb-2.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[9px] md:text-[10px] font-medium rounded-full border"
              style={{ borderColor: `${c.hex}20`, backgroundColor: `${c.hex}08`, color: `${c.hex}80` }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]">
          {project.links.demo && project.links.demo !== '#' && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-md border transition-all duration-300"
            style={{
              backgroundColor: `${c.hex}15`,
              borderColor: `${c.hex}35`,
              color: c.hex,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${c.hex}25`;
              e.currentTarget.style.borderColor = `${c.hex}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = `${c.hex}15`;
              e.currentTarget.style.borderColor = `${c.hex}35`;
            }}
          >
            <ExternalLink className="w-3 h-3" />
            <span>{project.demoLabel || 'Live Demo'}</span>
          </a>
          )}
          {project.links.github && project.links.github !== '#' && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-md border border-white/[0.12] text-white/50 hover:text-white hover:border-white/[0.25] hover:bg-white/[0.04] transition-all duration-300"
            >
              <Github className="w-3 h-3" />
              GitHub
            </a>
          )}
          {project.architectureSvg && (
            <a
              href={project.architectureSvg}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-md border border-white/[0.12] text-white/50 hover:text-white hover:border-white/[0.25] hover:bg-white/[0.04] transition-all duration-300"
            >
              <span>Architecture</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function WorkSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });
  const controls = useAnimation();
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  const filteredProjects = activeFilter === 'All'
    ? workProjects
    : workProjects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    setShowAll(false);
  }, [activeFilter]);

  const initialCount = activeFilter === 'All' ? 6 : 3;
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, initialCount);
  const hasMore = filteredProjects.length > initialCount;
  const hiddenCount = hasMore ? filteredProjects.length - initialCount : 0;

  const featuredCount = Math.min(visibleProjects.length, activeFilter === 'All' ? 4 : 2);
  const featuredProjects = visibleProjects.slice(0, featuredCount);
  const compactProjects = visibleProjects.slice(featuredCount);

  return (
    <section id="work" className="relative py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-accent-magenta/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-accent-teal/[0.03] rounded-full blur-[100px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden="true">
          <defs>
            <pattern id="wg" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wg)" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={sectionRef}
          className="mb-10 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
        >
          <motion.span
            className="text-xs font-bold tracking-[0.3em] uppercase text-accent-teal/60"
            initial={{ opacity: 0, x: -20 }}
            animate={controls}
            variants={{ visible: { opacity: 1, x: 0, transition: { delay: 0.15, duration: 0.6 } } }}
          >
            Selected Work
          </motion.span>
          <motion.h2
            className="section-title mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.6 } } }}
          >
            Projects that <span className="gradient-text">Define</span> My Craft
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base text-white/50 mt-3 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.6 } } }}
          >
            From hackathon projects to production deployments — each project solves a real problem end to end.
          </motion.p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5 } } }}
        >
          {workCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
            >
              {cat === 'All' ? (
                <span className="inline-flex items-center gap-1.5 relative z-10">
                  <Sparkles className="w-3 h-3" />
                  All
                </span>
              ) : (
                <span className="relative z-10">{cat}</span>
              )}
              {activeFilter === cat && (
                <motion.div
                  layoutId="filter-indicator"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(217,70,239,0.25), rgba(45,212,191,0.25))',
                    border: '1px solid rgba(217,70,239,0.4)',
                    boxShadow: '0 0 20px rgba(217,70,239,0.2)',
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        {featuredProjects.length > 0 && (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-6">
            <AnimatePresence mode="popLayout">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        {compactProjects.length > 0 && (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <AnimatePresence mode="popLayout">
              {compactProjects.map((project) => (
                <CompactProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {hasMore && !showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-10"
          >
            <button
              onClick={() => setShowAll(true)}
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-sm font-semibold text-white/60 transition-all duration-400 hover:bg-white/[0.06] hover:border-white/[0.18] hover:text-white/90 hover:shadow-[0_0_30px_rgba(168,85,247,0.08)] overflow-hidden"
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-magenta/0 via-accent-purple/5 to-accent-teal/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Sparkles className="relative w-4 h-4 text-accent-purple/50 group-hover:text-accent-purple/80 group-hover:rotate-12 transition-all duration-300" />
              <span className="relative">Show All Projects</span>
              <span className="relative inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-white/[0.06] text-[11px] font-bold text-white/40 group-hover:bg-white/[0.10] group-hover:text-white/70 transition-all duration-300">
                +{hiddenCount}
              </span>
              <ArrowUpRight className="relative w-3.5 h-3.5 text-white/30 group-hover:text-white/60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        )}

        {hasMore && showAll && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-10"
          >
            <button
              onClick={() => setShowAll(false)}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.06] bg-white/[0.01] text-sm font-medium text-white/40 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.12] hover:text-white/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.04)]"
            >
              <ArrowUpRight className="w-3.5 h-3.5 rotate-90 transition-transform duration-300 group-hover:-translate-y-0.5" />
              Show Less
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
