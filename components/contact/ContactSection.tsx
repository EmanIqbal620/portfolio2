'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Mail, Linkedin, Github, Download, Check, ArrowUpRight } from 'lucide-react';

export function ContactSection() {
  const [emailCopied, setEmailCopied] = useState(false);
  const emailTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('emaniqbal907@gmail.com');
      setEmailCopied(true);
      if (emailTimeoutRef.current) clearTimeout(emailTimeoutRef.current);
      emailTimeoutRef.current = setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 md:py-32 px-4 sm:px-6 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] bg-accent-magenta/[0.03] rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-accent-teal/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-lg mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <motion.span
            className="text-sm sm:text-base font-bold tracking-[0.3em] uppercase text-accent-teal/70"
            initial={{ opacity: 0, x: -20 }}
            animate={controls}
            variants={{ visible: { opacity: 1, x: 0, transition: { delay: 0.1 } } }}
          >
            Contact
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mt-3 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: { delay: 0.15 } } }}
          >
            Let&apos;s build{' '}
            <span className="gradient-text">something</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } },
          }}
          className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-teal/20 bg-accent-teal/[0.04]"
        >
          <span className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
          <span className="text-xs font-medium text-accent-teal/80 tracking-wide">Open for intern & remote opportunities</span>
        </motion.div>

        <motion.div
          className="mt-8 sm:mt-10 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } },
          }}
        >
          <motion.div
            className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6 text-left transition-all duration-300 hover:border-accent-teal/30 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(45,212,191,0.06)]"
            whileHover={{ y: -3 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-teal/10 flex items-center justify-center text-accent-teal flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent-teal/20">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white/40 tracking-wide uppercase mb-0.5">
                  Email
                </p>
                <p className="text-sm sm:text-base font-medium text-white/80 truncate">
                  emaniqbal907@gmail.com
                </p>
              </div>
              <motion.button
                onClick={handleCopyEmail}
                className="flex-shrink-0 px-4 py-2 rounded-lg border text-xs font-semibold transition-all duration-300"
                style={{
                  borderColor: emailCopied ? 'rgba(45,212,191,0.4)' : 'rgba(255,255,255,0.12)',
                  color: emailCopied ? '#2DD4BF' : 'rgba(255,255,255,0.5)',
                  backgroundColor: emailCopied ? 'rgba(45,212,191,0.1)' : 'rgba(255,255,255,0.04)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {emailCopied ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    Copied
                  </span>
                ) : (
                  'Copy Email'
                )}
              </motion.button>
            </div>
          </motion.div>

          <motion.a
            href="https://linkedin.com/in/eman-iqbal-4954a7395"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6 text-left transition-all duration-300 hover:border-accent-magenta/30 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(217,70,239,0.06)]"
            whileHover={{ y: -3 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-magenta/10 flex items-center justify-center text-accent-magenta flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent-magenta/20">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white/40 tracking-wide uppercase mb-0.5">
                  LinkedIn
                </p>
                <p className="text-sm sm:text-base font-medium text-white/80 truncate">
                  linkedin.com/in/eman-iqbal-4954a7395
                </p>
              </div>
              <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/[0.12] text-xs font-semibold text-white/50 transition-all duration-300 group-hover:bg-white/[0.06] group-hover:text-white/80 group-hover:border-white/25">
                Open
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.a>

          <motion.a
            href="https://github.com/EmanIqbal620"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6 text-left transition-all duration-300 hover:border-accent-purple/30 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(168,85,247,0.06)]"
            whileHover={{ y: -3 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-purple/10 flex items-center justify-center text-accent-purple flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent-purple/20">
                <Github className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white/40 tracking-wide uppercase mb-0.5">
                  GitHub
                </p>
                <p className="text-sm sm:text-base font-medium text-white/80 truncate">
                  github.com/EmanIqbal620
                </p>
              </div>
              <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/[0.12] text-xs font-semibold text-white/50 transition-all duration-300 group-hover:bg-white/[0.06] group-hover:text-white/80 group-hover:border-white/25">
                Open
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.a>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } },
          }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-8" />

          <motion.a
            href="/cv.pdf"
            download
            className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-sm font-semibold text-white/50 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/20 hover:text-white/80 hover:shadow-[0_0_25px_rgba(168,85,247,0.06)] disabled:opacity-30 disabled:pointer-events-none"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-4 h-4 transition-all duration-300 group-hover:translate-y-0.5" />
            Download CV
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
