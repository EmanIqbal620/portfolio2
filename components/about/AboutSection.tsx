'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

function CredentialCard({
  card,
  index,
}: {
  card: (typeof credentialCards)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

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
          transition: {
            duration: 0.5,
            delay: index * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5 will-change-transform"
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 8px 2px ${card.accent}18, 0 24px 60px ${card.accent}15, 0 0 60px ${card.accent}08`;
        e.currentTarget.style.borderColor = `${card.accent}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${card.accent}18, transparent 70%)`,
        }}
      />
      <div className="relative z-10 flex items-start gap-3 sm:gap-4">
        <motion.div
          className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: `${card.accent}12`,
            color: card.accent,
          }}
          whileHover={{ rotate: [0, -5, 5, 0], scale: 1.15 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-[10px] font-black tracking-tight">EI</span>
        </motion.div>
        <div className="min-w-0 flex-1">
          <h3 className="text-xs sm:text-sm font-bold tracking-wide uppercase text-white/70 group-hover:text-white transition-colors duration-200"
            style={{}}
          >
            {card.title}
          </h3>
          <p className="text-sm sm:text-base font-semibold text-white mt-0.5 leading-tight">
            {card.subtitle}
          </p>
          <p className="text-xs sm:text-sm text-white/50 group-hover:text-white/65 mt-1 leading-relaxed transition-colors duration-200">
            {card.detail}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const credentialCards = [
  {
    title: 'Education',
    subtitle: 'Sociology student',
    detail: 'University of Karachi',
    accent: '#D946EF',
  },
  {
    title: 'Certified',
    subtitle: 'GIAIC',
    detail: "Governor's Initiative for AI & Computing",
    accent: '#2DD4BF',
  },
  {
    title: 'Location',
    subtitle: 'Karachi, Pakistan',
    detail: 'Open to remote opportunities worldwide',
    accent: '#A855F7',
  },
  {
    title: 'AI Employees',
    subtitle: '2 running live',
    detail: 'Autonomous 24/7 — Gmail, WhatsApp, CRM',
    accent: '#D946EF',
  },
  {
    title: 'AI Engineering',
    subtitle: 'Agentic workflows',
    detail: 'OpenAI Agents SDK, RAG, MCP in production',
    accent: '#2DD4BF',
  },
  {
    title: 'Fullstack',
    subtitle: 'Scalable Architecture',
    detail: 'Next.js, FastAPI, Docker — modular systems built to scale',
    accent: '#A855F7',
  },
];

export function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-accent-magenta/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 -right-20 w-72 h-72 bg-accent-teal/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <motion.span
            className="text-base sm:text-lg font-bold tracking-[0.3em] uppercase text-accent-magenta/70"
            initial={{ opacity: 0, x: -20 }}
            animate={controls}
            variants={{ visible: { opacity: 1, x: 0, transition: { delay: 0.1 } } }}
          >
            About Me
          </motion.span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 xl:gap-16">
          <div className="lg:col-span-2 space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } },
              }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
                <span className="gradient-text">Eman Iqbal</span>
              </h2>
              <p className="text-base sm:text-lg text-white/80 font-semibold mt-1">
                AI Engineer & Fullstack Developer
                <span className="text-accent-teal/60 font-normal ml-1">— Karachi, Pakistan</span>
              </p>
            </motion.div>

            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } },
              }}
            >
              <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                With a background in Sociology, I understand how people interact
                with systems and make decisions.
              </p>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                I build scalable, AI-powered solutions designed around real user
                behavior.
              </p>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-medium">
                That combination is rare — and it shows in every system I ship.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5 } },
              }}
            >
              <motion.a
                href="#contact"
                className="btn-cta inline-flex"
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(45,212,191,0.3)' }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(45,212,191,0)',
                    '0 0 20px rgba(45,212,191,0.15)',
                    '0 0 0px rgba(45,212,191,0)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sparkles className="w-4 h-4" />
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1" />
              </motion.a>
              <motion.a
                href="mailto:emaniqbal907@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-xs sm:text-sm font-semibold text-white/50 hover:text-white hover:border-white/20 hover:bg-white/[0.03] transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>emaniqbal907@gmail.com</span>
              </motion.a>
            </motion.div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {credentialCards.map((card, index) => (
                <CredentialCard key={card.title} card={card} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
