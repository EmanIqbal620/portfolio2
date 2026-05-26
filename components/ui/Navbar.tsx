'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, ArrowRight } from 'lucide-react';
import { navItems } from '@/lib/data';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const mobileRef = useRef<HTMLDivElement>(null);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navItems.map(item => item.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        const first = mobileRef.current?.querySelector<HTMLElement>('button');
        first?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobile();
      if (e.key === 'Tab' && mobileOpen && mobileRef.current) {
        const focusable = mobileRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeMobile, mobileOpen]);

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-12 transition-all duration-500 ${
          scrolled ? 'pt-2' : 'pt-4'
        }`}
      >
        <div className="max-w-[1400px] mx-auto">
          <div
            className={`relative flex items-center justify-between px-5 transition-all duration-500 rounded-2xl border ${
              scrolled
                ? 'py-2 border-[#2DD4BF]/15 bg-[#0a0025]/85 backdrop-blur-2xl shadow-[0_8px_40px_rgba(45,212,191,0.08)]'
                : 'py-2.5 border-white/10 bg-[#0a0025]/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            }`}
          >
            {/* Animated gradient border overlay */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-40">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-[#2DD4BF]/20 to-transparent animate-pulse" style={{ animationDuration: '4s' }} />
            </div>

            {/* Border glow line at bottom */}
            <div className="absolute -bottom-[1px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#2DD4BF]/40 to-transparent pointer-events-none" />

            {/* Left: Brand */}
            <div className="flex items-center gap-3 relative z-10">
              <div className="flex flex-col items-start">
                <span className="text-base sm:text-lg font-black tracking-[0.08em] bg-gradient-to-r from-[#2DD4BF] via-white to-[#A855F7] bg-clip-text text-transparent">
                  EMAN IQBAL
                </span>
                <span className="text-[8px] tracking-[0.25em] text-white/30 font-medium uppercase">
                  Fullstack &bull; Agentic AI
                </span>
              </div>
            </div>

            {/* Center: Nav Links */}
            <div className="hidden md:flex items-center gap-1 relative z-10">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={`group relative px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-500 rounded-lg ${
                    activeSection === item.href
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                  aria-current={activeSection === item.href ? 'true' : undefined}
                >
                  <span className="relative z-10 transition-all duration-300 group-hover:tracking-[0.15em]">
                    {item.label}
                  </span>
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#2DD4BF] rounded-full transition-all duration-500 ${
                      activeSection === item.href
                        ? 'w-[60%] shadow-[0_0_8px_rgba(45,212,191,0.6)]'
                        : 'w-0 group-hover:w-[60%]'
                    }`}
                  />
                  <span
                    className={`absolute inset-0 rounded-lg transition-all duration-300 pointer-events-none ${
                      activeSection === item.href
                        ? 'bg-white/10'
                        : 'bg-transparent group-hover:bg-white/5'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Right: CTA */}
            <div className="hidden md:flex items-center relative z-10">
              <button
                onClick={() => scrollTo('#contact')}
                className="group inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-[#2DD4BF]/30 bg-[#2DD4BF]/10 text-xs font-bold text-[#2DD4BF] tracking-wider uppercase transition-all duration-300 hover:bg-[#2DD4BF]/20 hover:border-[#2DD4BF]/60 hover:shadow-[0_0_20px_rgba(45,212,191,0.25)] hover:-translate-y-0.5 active:translate-y-0"
              >
                Let's Talk
                <ArrowRight className="w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 text-white/80 hover:text-[#2DD4BF] transition-colors relative z-10"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <span
                  className={`absolute block h-[2px] w-5 bg-current rounded-full transition-all duration-300 ${
                    mobileOpen ? 'rotate-45' : '-translate-y-1.5'
                  }`}
                />
                <span
                  className={`absolute block h-[2px] w-5 bg-current rounded-full transition-all duration-300 ${
                    mobileOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute block h-[2px] w-5 bg-current rounded-full transition-all duration-300 ${
                    mobileOpen ? '-rotate-45' : 'translate-y-1.5'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fadeIn"
            onClick={() => setMobileOpen(false)}
          />
          <div ref={mobileRef} className="absolute top-20 left-4 right-4">
            <div
              className="flex flex-col gap-2 p-5 rounded-2xl border border-white/10 bg-[#0a0025]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] animate-slideDown"
            >
              <div className="flex items-center gap-2.5 pb-4 mb-2 border-b border-white/5">
                <div className="flex flex-col items-start">
                  <span className="text-sm font-black tracking-[0.08em] bg-gradient-to-r from-[#2DD4BF] via-white to-[#A855F7] bg-clip-text text-transparent">
                    EMAN IQBAL
                  </span>
                  <span className="text-[7px] tracking-[0.25em] text-white/30 font-medium uppercase">
                    Fullstack &bull; Agentic AI
                  </span>
                </div>
              </div>
              {navItems.map((item, i) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={`text-left px-4 py-3.5 rounded-xl text-sm font-bold tracking-wider uppercase transition-all duration-300 opacity-0 animate-slideItem ${
                    activeSection === item.href
                      ? 'text-white bg-white/10 border-l-2 border-[#2DD4BF]'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                  aria-current={activeSection === item.href ? 'true' : undefined}
                  style={{ animationDelay: `${60 + i * 80}ms`, animationFillMode: 'forwards' }}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3 mt-2 border-t border-white/5 opacity-0 animate-slideItem" style={{ animationDelay: '420ms', animationFillMode: 'forwards' }}>
                <button
                  onClick={() => scrollTo('#contact')}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#2DD4BF]/30 bg-[#2DD4BF]/10 text-xs font-bold text-[#2DD4BF] tracking-wider uppercase transition-all duration-300 hover:bg-[#2DD4BF]/20"
                >
                  Let's Talk
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
