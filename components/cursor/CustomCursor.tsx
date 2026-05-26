'use client';

import { useEffect, useRef } from 'react';

const IDLE_TIMEOUT = 2000;
const TRAIL_EASE = 0.35;
const MAGNETIC_RADIUS = 40;

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, [tabindex]';

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isTouchDevice()) return;

    const dot = dotRef.current;
    const trail = trailRef.current;
    const ripple = rippleRef.current;
    const label = labelRef.current;
    if (!dot || !trail || !ripple || !label) return;

    document.body.classList.add('cursor-hidden');

    let mouseX = -200;
    let mouseY = -200;
    let trailX = -200;
    let trailY = -200;
    let isHovering = false;
    let labelText = '';
    let lastMoveTime = performance.now();
    let isIdle = false;
    let rafId = 0;
    let animationActive = true;

    const setHover = (hovering: boolean, text = '') => {
      isHovering = hovering;
      labelText = text;
      dot.classList.toggle('hovering', hovering);
      trail.classList.toggle('hovering', hovering);
      label.classList.toggle('visible', hovering && text.length > 0);
      label.textContent = text;
    };

    const updateIdle = () => {
      const now = performance.now();
      const idle = now - lastMoveTime > IDLE_TIMEOUT;
      if (idle !== isIdle) {
        isIdle = idle;
        dot.classList.toggle('idle', idle);
        trail.classList.toggle('idle', idle);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMoveTime = performance.now();
      if (isIdle) {
        isIdle = false;
        dot.classList.remove('idle');
        trail.classList.remove('idle');
      }
      if (!animationActive) {
        animationActive = true;
        animate();
      }

      const target = e.target as HTMLElement;
      const interactive = target.closest(HOVER_SELECTOR);
      if (interactive) {
        const tag = interactive.tagName.toLowerCase();
        const text = interactive.textContent?.trim() || '';
        let hoverLabel = '';
        if (tag === 'a') hoverLabel = text.length < 15 ? text.toUpperCase() : 'VIEW';
        else if (tag === 'button') hoverLabel = text.length < 15 ? text.toUpperCase() : 'CLICK';
        else hoverLabel = 'CLICK';
        if (!isHovering || labelText !== hoverLabel) {
          setHover(true, hoverLabel);
        }
      } else if (isHovering) {
        setHover(false);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.classList.add('active');
      ripple.style.transition = 'none';
      ripple.style.transform = 'translate(-50%, -50%) scale(0)';
      ripple.style.opacity = '1';
      ripple.getBoundingClientRect();
      ripple.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
      ripple.style.transform = 'translate(-50%, -50%) scale(3)';
      ripple.style.opacity = '0';
      setTimeout(() => ripple.classList.remove('active'), 600);
    };

    const animate = () => {
      if (!animationActive) return;

      trailX += (mouseX - trailX) * TRAIL_EASE;
      trailY += (mouseY - trailY) * TRAIL_EASE;

      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;

      const dx = mouseX - trailX;
      const dy = mouseY - trailY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const isMagnetic = isHovering && dist < MAGNETIC_RADIUS;
      trail.classList.toggle('magnetic', isMagnetic);

      trail.style.left = `${trailX}px`;
      trail.style.top = `${trailY}px`;

      updateIdle();
      rafId = requestAnimationFrame(animate);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') setHover(false);
    };

    animate();

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      animationActive = false;
      cancelAnimationFrame(rafId);
      document.body.classList.remove('cursor-hidden');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={trailRef} className="cursor-trail" aria-hidden="true">
        <span ref={labelRef} className="cursor-label" aria-hidden="true" />
      </div>
      <div ref={rippleRef} className="cursor-ripple" aria-hidden="true" />
    </>
  );
}
