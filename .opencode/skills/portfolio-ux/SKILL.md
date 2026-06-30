---
name: portfolio-ux
description: Use when working on UX micro-interactions, scroll narrative, gesture design, mobile responsiveness, or accessibility in the portfolio site. Covers scroll-driven reveals, hover/tap states, ambient glow effects, typography rhythm, and spacing.
---

# Portfolio UX Skill — Elite-Level Micro-interactions & Scroll Narrative

## Purpose
Transform this portfolio into a recruitment weapon that feels premium, not template. Every scroll, hover, and tap must communicate craft.

## Design Principles
1. **Scroll as narrative** — sections must feel like chapters, not blocks
2. **Micro-interactions** — every interactive element has a 300ms-500ms personality arc
3. **60fps at all costs** — use `transform`/`opacity` only; no layout-triggering properties
4. **Mobile is not secondary** — thumb-zone targets (44px min), gesture-friendly, no hover-only affordances
5. **Reduce motion** — respect `prefers-reduced-motion` via Framer Motion's `useReducedMotion`

## Scroll-Driven Patterns

### Parallax Stack
- Hero: fixed bg, content scrolls over
- About: sticky container with `350vh` height, inner content `position: sticky; top: 0; height: 100vh`
- Scale transform on scroll: `useTransform(scrollYProgress, [0, 0.2], [1, 0.95])` for subtle depth

### Reveal Sequencing
Use `whileInView` with staggered children:
```tsx
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};
```

## Hover States (Desktop)

### Card Lift
```css
transform: translateY(-4px);
box-shadow: 0 20px 60px rgba(148, 99, 194, 0.2);
border-color: rgba(148, 99, 194, 0.4);
transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### Button Press
```css
transform: scale(0.97); /* on :active */
transition-duration: 0.1s;
```

## Mobile Gestures

### Tap Feedback
- `whileTap={{ scale: 0.96 }}` on all buttons
- `whileHover` NOT used on mobile (translate to `whileTap`)

### Swipe Indicators
- Horizontal scroll sections show visible scrollbar + gradient fade edges
- Carousel dots for touch navigation

## Focus States (Accessibility)
```css
*:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 4px;
}
```
Every interactive element MUST have visible focus ring.

## Color & Glow System

### Ambient Glow
Per-section radial gradients following content:
```css
background:
  radial-gradient(ellipse 80% 60% at 50% 0%, rgba(148, 99, 194, 0.04) 0%, transparent 60%),
  radial-gradient(ellipse 50% 40% at 80% 100%, rgba(148, 99, 194, 0.015) 0%, transparent 50%);
```

### Mouse-Follow Glow (Hero)
Track cursor position, translate a radial gradient accordingly:
```tsx
const x = useMotionValue(0.5);
const y = useMotionValue(0.5);
const bg = useTransform([x, y], ([latestX, latestY]) =>
  `radial-gradient(600px at ${latestX * 100}% ${latestY * 100}%, rgba(148,99,194,0.06), transparent 60%)`
);
```

## Typography Rhythm

### Scale
- Hero heading: `clamp(2.5rem, 6vw, 5rem)` with `-0.04em` tracking
- Section title: `clamp(1.75rem, 4vw, 3rem)` with `-0.03em`
- Body: `0.9375rem` with `1.6` line-height
- Labels: `0.6875rem` with `0.2em` letter-spacing, uppercase

### Leading
- Tight headings: `1.05`
- Relaxed body: `1.6`
- Never use `line-height: 1` on text longer than 3 words

## Spacing Rhythm
- Section padding: `py-20 md:py-28`
- Between major blocks within section: `gap-10 md:gap-14`
- Between label → title → desc: `mb-3 mt-1.5` rhythm
- Card padding: `p-5 sm:p-6`, inner gap: `gap-3`

## Loading Screen
- Animated logo → shimmer progress bar → fade out
- Cache with `sessionStorage` key so it only shows once per session
- Transition: `opacity 0.6s ease, visibility 0.6s ease`

## 404 & Error States
- 404 page with astronaut floating animation + "You've drifted off course" text
- ErrorBoundary wraps 3D scene + chatbot: shows fallback UI, console.error, toast option to retry

## Review Checklist
- [ ] All `whileInView` have `once: true` + reasonable margin
- [ ] No layout thrashing (only transform/opacity in animations)
- [ ] 44px minimum touch targets on mobile
- [ ] `prefers-reduced-motion` handled
- [ ] Scroll-snap on key sections if appropriate
- [ ] Section IDs match nav items for scroll spy
