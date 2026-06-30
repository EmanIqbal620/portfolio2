---
name: portfolio-animations
description: Use when implementing Framer Motion animations, page transitions, entrance sequences, scroll-triggered reveals, stagger choreography, or gesture-based interactions. Covers easing curves, timeline orchestration, parallax, and reduced motion.
---

# Portfolio Animations Skill — Framer Motion Choreography Mastery

## Purpose
Create a cohesive, cinematic animation language across the entire portfolio. Every transition serves the story — nothing is gratuitous.

## Animation Philosophy
1. **Purpose-driven** — animate to direct attention, not to impress
2. **Duration discipline** — 0.3s-0.6s for UI, 0.8s-1.2s for hero reveals
3. **Easing consistency** — ONE custom easing for everything:
   `[0.25, 0.46, 0.45, 0.94]` (subtle cubic-bezier)
4. **Stagger orchestration** — children enter in waves, never all at once

## Core Easing Curve
```tsx
const ease = [0.25, 0.46, 0.45, 0.94]; // shared easing for ALL animations
```

## Animation Patterns

### 1. Entrance Sequence (Hero)
```tsx
// Orchestrated timeline:
// 0ms — availability badge: opacity 0→1, y 10→0 (0.4s)
// 100ms — "Hi, I'm" text: opacity 0→1, y 15→0 (0.5s)
// 200ms — Name (h1): opacity 0→1, y 20→0 (0.6s)
// 350ms — Subtitle: opacity 0→1, y 12→0 (0.4s)
// 450ms — Description: opacity 0→1, y 12→0 (0.4s)
// 550ms — Tech pills: stagger children 0.08s each, scale 0.9→1
// 750ms — CTAs: opacity 0→1, y 12→0 (0.4s)
// 900ms — Social sidebar: opacity 0→1, x -20→0 (0.6s)
// 1200ms — Scroll indicator: opacity 0→1 (0.6s)
```

### 2. Scroll Reveal (Sections)
```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-80px' }}
  variants={{
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
  }}
>
```

### 3. Parallax Scroll (About Section)
Use `useScroll` + `useTransform` for sticky scroll narrative:
```tsx
const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
const labelOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
const titleY = useTransform(scrollYProgress, [0, 0.16], [20, 0]);
```
- Section container: `height: 350vh` + `position: sticky; top: 0; height: 100vh`
- Content is `sticky` inside, each element fades/translates at different scroll positions
- Timeline mapping (0 to 1 = scroll start to end):
  - Label: 0 → 0.08
  - Title: 0 → 0.16 (with scale 0.97 → 1)
  - Subtitle: 0 → 0.24
  - Bio: 0 → 0.35
  - CTA: 0.30 → 0.42
  - Credentials label: 0.38 → 0.48
  - Credential cards: 0.45 → 0.85 (staggered 0.055 apart)

### 4. Card Reveal (Work Section)
```tsx
<motion.div
  layout
  initial={{ opacity: 0, y: 30, scale: 0.97 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  viewport={{ once: true, margin: '-60px' }}
  exit={{ opacity: 0, y: -20, scale: 0.95 }}
  transition={{ duration: 0.35, ease }}
/>
```
Use `AnimatePresence mode="popLayout"` for filter transitions.

### 5. Hover → Tap Chain
Desktop: `whileHover={{ y: -4 }}` + cards show glow
Mobile: `whileTap={{ scale: 0.96 }}` + no hover effects
```tsx
<motion.button
  whileHover={{ y: -2, transition: { duration: 0.2 } }}
  whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
/>
```

## Gesture Animations

### Magnetic Button
Button moves slightly toward cursor on hover:
```tsx
const x = useMotionValue(0);
const y = useMotionValue(0);
const onMouseMove = (e: MouseEvent) => {
  const rect = ref.current.getBoundingClientRect();
  x.set((e.clientX - rect.left - rect.width / 2) * 0.1);
  y.set((e.clientY - rect.top - rect.height / 2) * 0.1);
};
```

### Text Reveal (Split)
For hero headings — each word animates in:
```tsx
// Split text into words, each word is a motion.span
// staggerChildren: 0.04, each: y 40→0, opacity 0→1
```

## Page Transitions (if multi-page)
Use `layout="position"` for shared elements:
```tsx
<motion.div layoutId="project-card">
  {/* Shared element between list and detail */}
</motion.div>
```

## Loading → Content Transition
- Loading screen fades out (`opacity 1→0, scale 1→0.95`)
- Content fades in (`opacity 0→1, y 10→0`)
- Timing: 600ms overlap, 200ms gap

## Float Animations
For decorative elements (astronaut, globe):
```tsx
animate={{ y: [0, -8, 0] }}
transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
```

## Reduced Motion
```tsx
const prefersReduced = useReducedMotion();
const variants = prefersReduced
  ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } // fade only
  : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
```

## Review Checklist
- [ ] Single easing curve used everywhere
- [ ] Stagger delays are multiples of 0.04 or 0.08
- [ ] `whileHover` never triggers on mobile
- [ ] Reduced motion = fade-only, no transforms
- [ ] No animation lasts longer than 1.2s for UI elements
- [ ] Hero entrance is staggered in clear phases
- [ ] Scroll narrative in About uses `useScroll` offsets
- [ ] Work filter uses `AnimatePresence mode="popLayout"`
