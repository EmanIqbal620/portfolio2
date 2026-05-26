'use client';

import { ArrowUp, Github, Linkedin, X, Mail } from 'lucide-react';
import { navItems } from '@/lib/data';

export function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.06] overflow-hidden bg-[#0a0025]/60 backdrop-blur-xl">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-accent-magenta/[0.02] rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent-teal/[0.02] rounded-full blur-[120px]" />
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-transparent via-[#2DD4BF]/30 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

          {/* Brand */}
          <div className="space-y-4">
            <span className="text-lg font-black tracking-[0.08em] bg-gradient-to-r from-[#2DD4BF] via-white to-[#A855F7] bg-clip-text text-transparent">
              EMAN IQBAL
            </span>
            <p className="text-sm text-white/45 leading-relaxed max-w-xs">
              Building autonomous AI systems and fullstack applications that bridge Sociology with technology.
            </p>
            <div className="flex items-center gap-3">
              {[
                { href: 'https://github.com/EmanIqbal620', icon: Github, label: 'GitHub' },
                { href: 'https://linkedin.com/in/eman-iqbal-4954a7395', icon: Linkedin, label: 'LinkedIn' },
                { href: 'https://x.com/EmanIqbal90', icon: X, label: 'X' },
                { href: 'mailto:emaniqbal907@gmail.com', icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-[#2DD4BF] hover:border-[#2DD4BF]/30 hover:bg-[#2DD4BF]/10 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/30">Navigation</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="text-left text-sm text-white/40 hover:text-[#2DD4BF] transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact & CTA */}
          <div className="space-y-4">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/30">Get in Touch</p>
            <p className="text-sm text-white/45 leading-relaxed">
              Open for intern and remote opportunities. Let&apos;s build something together.
            </p>
            <button
              onClick={() => scrollTo('#contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#2DD4BF]/25 bg-[#2DD4BF]/8 text-xs font-bold text-[#2DD4BF] tracking-wider uppercase transition-all duration-300 hover:bg-[#2DD4BF]/15 hover:border-[#2DD4BF]/50 hover:shadow-[0_0_20px_rgba(45,212,191,0.15)]"
            >
              Contact Me
            </button>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Eman Iqbal. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-white/25 hover:text-[#2DD4BF] transition-colors duration-200"
          >
            Back to top
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
