'use client';

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Github, Linkedin, ArrowRight, ChevronDown, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

const BackgroundScene = dynamic(
  () => import('@/components/3d/HeroScene3D').then((m) => ({ default: m.BackgroundScene })),
  { ssr: false, loading: () => <div className="w-full h-full bg-transparent" /> }
);

const AstronautScene = dynamic(
  () => import('@/components/3d/HeroScene3D').then((m) => ({ default: m.AstronautScene })),
  { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center"><div className="w-12 h-12 rounded-full border border-white/10 loader" /></div> }
);

type MouseRef = { x: number; y: number; tx: number; ty: number };

function SplitReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const chars = text.split('');
  return (
    <span className={className}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="split-char inline-block"
          style={{ '--reveal-delay': `${delay + i * 0.035}s` } as React.CSSProperties}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const mouseRef = useRef<MouseRef>({ x: 0, y: 0, tx: 0, ty: 0 });
  const cursorRef = useRef({ cx: -1000, cy: -1000 });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [sceneInView, setSceneInView] = useState(false);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      cursorRef.current.cx = e.clientX;
      cursorRef.current.cy = e.clientY;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });
    return () => window.removeEventListener('mousemove', onMouse);
  }, []);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setSceneInView(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = titleRef.current;
    if (!el) return;
    const threshold = 120;
    let rafId: number;
    const update = () => {
      const { tx, ty } = mouseRef.current;
      el.style.transform = `translate(${tx * 4}px, ${ty * 3}px)`;
      const { cx, cy } = cursorRef.current;
      const chars = el.querySelectorAll('.split-char');
      for (let i = 0; i < chars.length; i++) {
        const char = chars[i] as HTMLElement;
        const rect = char.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = cx - centerX;
        const dy = cy - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < threshold) {
          const t = 1 - dist / threshold;
          const smooth = t * t * (3 - 2 * t);
          char.style.filter = `brightness(${1 + smooth * 0.4})`;
          char.style.textShadow = `0 0 ${8 + smooth * 22}px rgba(45,212,191,${0.15 + smooth * 0.45})`;
        } else {
          char.style.filter = '';
          char.style.textShadow = '';
        }
      }
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section id="home" className="relative min-h-screen">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <ErrorBoundary>
            <BackgroundScene mouse={mouseRef.current} />
          </ErrorBoundary>
        </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20 pt-24 pb-8">
        <div className="max-w-[1400px] mx-auto w-full min-h-[calc(100vh-10rem)] grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          
            <div className="space-y-4 sm:space-y-5 order-2 md:order-1 text-center md:text-left max-w-xl lg:max-w-2xl xl:max-w-3xl">
            <div>
              <div className="inline-flex items-center gap-1.5 mb-6 px-3 py-1 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/40">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-wide text-[#2DD4BF]">OPEN FOR INTERN/REMOTE ROLES</span>
                <span className="w-1 h-1 rounded-full bg-[#2DD4BF] shadow-[0_0_4px_rgba(45,212,191,0.5)] animate-pulse ml-1.5" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/90">
                Hi, I'm{' '}
                <span className="font-black text-[#2DD4BF] tracking-[0.02em]">EMAN IQBAL</span>
                <span className="text-[#2DD4BF]/60">.</span>
              </h2>
            </div>

            <div>
              <h1 ref={titleRef} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl font-extrabold leading-[1.15] tracking-wide will-change-transform" style={{ transition: 'transform 0.3s ease-out' }}>
                <span className="text-white/90 md:whitespace-nowrap">
                    <SplitReveal text="FULLSTACK DEVELOPER" delay={0.2} />
                </span>
                <br />
                <span className="inline-flex items-center gap-2 text-[#2DD4BF]" style={{ textShadow: '0 0 14px rgba(45,212,191,0.2)' }}>
                  <span className="text-[0.5em] align-middle text-white/30 font-light">{'&'}</span>
                  <span className="md:whitespace-nowrap">
                    <SplitReveal text="AGENTIC AI DEVELOPER" delay={0.6} />
                  </span>
                </span>
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {[
                { label: 'OpenAI Agents SDK', highlight: true },
                { label: 'MCP', highlight: true },
                { label: 'RAG', highlight: true },
                { label: 'FastAPI', highlight: false },
                { label: 'Docker', highlight: false },
                { label: 'Next.js', highlight: false },
              ].map(({ label, highlight }) => (
                <span key={label} className={`px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-semibold tracking-wide transition-all duration-300 ${
                  highlight
                    ? 'bg-[#2DD4BF]/10 border border-[#2DD4BF]/40 text-[#2DD4BF] shadow-[0_0_12px_rgba(45,212,191,0.15)] hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] hover:-translate-y-0.5'
                    : 'bg-white/[0.06] border border-white/[0.12] text-white/70 hover:bg-white/[0.1] hover:border-white/30 hover:text-white/90 hover:-translate-y-0.5'
                }`}>
                  {label}
                </span>
              ))}
            </div>

            <div>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-xl mx-auto md:mx-0">
                <span className="text-white/80 font-semibold">I build autonomous AI systems, fullstack web apps and  AI employees that work 24/7  trained on human behavior through Sociology, to build AI that actually understands the humans using it.</span>
              </p>
            </div>

            <div className="flex flex-row flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2DD4BF] text-sm font-bold text-gray-900 tracking-wide uppercase transition-all duration-300 hover:bg-[#2DD4BF]/90 hover:shadow-[0_0_25px_rgba(45,212,191,0.4)] hover:-translate-y-1 active:translate-y-0"
              >
                GET IN TOUCH
                <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
              </a>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/25 bg-transparent text-sm font-bold text-white/50 tracking-wide uppercase transition-all duration-300 hover:bg-white/[0.04] hover:border-white/50 hover:text-white/80 hover:-translate-y-1 active:translate-y-0"
              >
                VIEW MY WORK
              </a>
            </div>

            <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-sm tracking-wide group/stat transition-all duration-300 hover:scale-[1.02]"><span className="text-base font-bold text-[#2DD4BF]">5+</span><span className="text-white/50 ml-1.5">Projects</span></span>
              <span className="text-white/20 text-sm">|</span>
              <span className="text-sm tracking-wide group/stat transition-all duration-300 hover:scale-[1.02]"><span className="text-base font-bold text-[#2DD4BF]">2</span><span className="text-white/50 ml-1.5">AI Employees 24/7</span></span>
              <span className="text-white/20 text-sm">|</span>
              <span className="text-sm tracking-wide group/stat transition-all duration-300 hover:scale-[1.02]"><span className="text-base font-bold text-[#2DD4BF]">Docker + MCP</span></span>
              <span className="text-white/20 text-sm">|</span>
              <span className="text-sm text-white/50 tracking-wide group/stat transition-all duration-300 hover:scale-[1.02]">Sociology × AI</span>
            </div>

            <div className="flex flex-row items-center gap-4 mt-3 mb-2">
              <div className="flex items-center gap-3">
                {[
                  { href: 'https://github.com/EmanIqbal620', icon: Github, title: 'GitHub', delay: 0 },
                  { href: 'https://linkedin.com/in/eman-iqbal-4954a7395', icon: Linkedin, title: 'LinkedIn', delay: 200 },
                  { href: 'https://x.com/EmanIqbal90', icon: X, title: 'X', delay: 300 },
                ].map(({ href, icon: Icon, title, delay }) => (
                  <a
                    key={title}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={title}
                    className="group w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 transition-all duration-300 hover:bg-[#2DD4BF]/20 hover:border-[#2DD4BF]/40 hover:text-[#2DD4BF] hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(45,212,191,0.2)]"
                  >
                    <Icon className="w-4 h-4 transition-all duration-300 group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div ref={sceneRef} className="relative order-1 md:order-2 flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] ml-2 lg:ml-6 mr-2 lg:mr-8">
            <div className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] aspect-square relative">
              <div className="absolute -top-2 right-0 z-10 flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.1] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-white/[0.08] hover:border-[#2DD4BF]/30 hover:shadow-[0_4px_25px_rgba(45,212,191,0.15)]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-white/40 tracking-wide"><span className="text-[#2DD4BF] animate-pulse">●</span> AI EMPLOYEE RUNNING</span>
                </div>
              </div>

              <div className="absolute bottom-4 -left-2 z-10 flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.1] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-white/[0.08] hover:border-[#2DD4BF]/30 hover:shadow-[0_4px_25px_rgba(45,212,191,0.15)]">
                <span className="text-[10px] sm:text-[11px] font-semibold text-white/50 tracking-wide">Sociology × Code × AI</span>
              </div>

              {sceneInView && (
                <ErrorBoundary>
                  <AstronautScene mouse={mouseRef.current} />
                </ErrorBoundary>
              )}
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[8px] font-bold tracking-[0.2em] text-white/30 uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-[#2DD4BF]/50" />
      </div>
    </section>
  );
}
