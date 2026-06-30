---
name: portfolio-visual-design
description: Use when refining visual hierarchy, typography scale, layout/spacing rhythm, color palette restraint, responsive breakpoints, or performance UX of the portfolio. Covers contrast ratios, modular scale, grid systems, color token limits, and perceptual performance.
---

# Portfolio Visual Design Skill — Hierarchy, Typography, Layout, Color & Responsive Mastery

## 1. Visual Hierarchy

### Principle: Every element must earn its visual weight
- **Size** = importance (hero heading = biggest thing on page)
- **Weight** = emphasis (bold for key phrases, regular for body)
- **Opacity** = hierarchy level (primary 100%, secondary 70%, tertiary 50%, muted 35%)
- **Spacing** = relationship (closer = related, further = separate)
- **Color** = action (only interactive elements get accent color)

### Hierarchy Levels (4-tier system)
```
Level 0: Hero heading  → clamp(2.5rem, 6vw, 5rem)  weight 900
Level 1: Section title → clamp(1.75rem, 4vw, 3rem)  weight 900
Level 2: Card heading  → 0.9375rem                  weight 700
Level 3: Body text     → 0.9375rem                  weight 400
Level 4: Caption/label → 0.75rem / 0.6875rem       weight 500
```

### Rule of 3
No more than 3 visual emphasis levels per viewport:
1. Primary (hero + main CTA)
2. Secondary (section titles, key metrics)
3. Tertiary (everything else)

## 2. Typography System

### Font Stack
```css
font-family: 'Geist', system-ui, -apple-system, sans-serif;
/* Monospace for code: 'ui-monospace', 'SFMono-Regular', monospace */
```

### Modular Scale (1.25 ratio — Major Third)
```
caption:   0.75rem   (12px)
body-sm:   0.8125rem (13px)
body:      0.9375rem (15px)
lead:      1.0625rem (17px)
h4:        1.25rem   (20px)
h3:        1.5rem    (24px)
h2:        2rem      (32px)
h1:        3rem      (48px)
hero:      5rem      (80px)
```

### Line Height Principles
- Headings (h1-h4): `1.05 - 1.2` — tight, commanding
- Body text: `1.6` — relaxed, readable
- Lead text: `1.5` — slightly tighter than body
- Labels: `1` — single line only

### Letter Spacing
- Headings: `-0.04em` to `-0.02em` (bigger = tighter tracking)
- Body: `0em` (normal)
- Labels/CTAs: `0.02em` to `0.2em` (smaller = wider tracking)
- NEVER use positive tracking on text smaller than 11px

### Max Line Length
- Body text: `65-75 characters` (prose width)
- Hero paragraph: `max-w-xl` (about 550px)
- Section descriptions: `max-w-md` to `max-w-lg`

## 3. Layout & Spacing System

### Grid
```
Content max-width:   1200px (content) / 1400px (content-wide)
Columns:             12-column implicit grid (Tailwind default)
Gap scale:           4-5-6-10-12-14-16-20 (rem × 0.25)
```

### Spacing Rhythm (8px base unit)
```
Section padding:    py-20 md:py-28   (80px → 112px)
Block gap:          gap-10 md:gap-14 (40px → 56px)
Card padding:       p-5 sm:p-6       (20px → 24px)
Card gap:           gap-3            (12px)
Element stack:      space-y-4        (16px between)
Tight stack:        space-y-2        (8px between)
```

### Section Layout Template
```
┌─────────────────────────────────────┐
│  SECTION LABEL  (10px, uppercase)    │   mb-3
│                                     │
│  SECTION TITLE   (clamp, 900 weight) │   mb-2
│                                     │
│  SECTION DESCRIPTION  (max-w-lg)    │   mb-0
│                                     │
│  ┌──────┐  ┌──────┐  ┌──────┐      │   gap-5
│  │ CARD │  │ CARD │  │ CARD │      │
│  └──────┘  └──────┘  └──────┘      │
└─────────────────────────────────────┘
```

### Key Spacing Rules
- 16px minimum padding on mobile (px-4)
- 80px+ section breathing room (py-20)
- Cards in grid: gap-4 sm:gap-5
- Between label → title → desc: 3px → 8px → 12px rhythm

## 4. Color Theory — Restraint, Not Range

### Palette (Maximum 7 tokens)
```css
:root {
  --background:     #000000;
  --foreground:     #ffffff;
  --accent:         #9463c2;   /* ONE accent color */
  --accent-soft:    rgba(148, 99, 194, 0.15);
  --accent-subtle:  rgba(148, 99, 194, 0.06);
  --surface-base:   #000000;
  --surface-raised: #08080c;
  --surface-overlay: #0f0f16;
}
```

### Why Restraint Wins
- 1 accent color = immediate brand recognition
- Every extra color DILUTES visual system
- Use OPACITY, not additional hues, for hierarchy
- Surface variations: 3 levels max (base, raised, overlay)

### Opacity Hierarchy (on white text)
```
Primary text:   rgba(255,255,255, 1.0)   →   #ffffff
Secondary text: rgba(255,255,255, 0.7)   →   heading next to body
Muted text:     rgba(255,255,255, 0.5)   →   descriptions, metadata
Subtle text:    rgba(255,255,255, 0.35)  →   labels, timestamps
Border/line:    rgba(255,255,255, 0.08)  →   card borders
Hover border:   rgba(255,255,255, 0.18)  →   elevated state
```

### Accent Usage Rules
- ONLY on: interactive elements, active states, primary CTAs, section labels
- NEVER on: body text, backgrounds (unless subtle), passive UI
- Accent glow: use box-shadow with accent, not more background color

## 5. Responsive Design Thinking

### Breakpoint Strategy (Mobile-First)
```
Default:    < 640px   (mobile first)
sm:         640px     (large phone)
md:        768px     (tablet)
lg:       1024px     (desktop)
xl:       1280px     (wide desktop)
```

### Content Reflow Rules
- **Mobile (base)**: single column, full-width cards, hamburger nav
- **Tablet (md)**: 2-col grids, visible nav, side social
- **Desktop (lg)**: multi-col grids, floating elements, parallax

### Touch Targets
- Minimum: 44×44px (Apple HIG)
- Recommended: 48×48px for comfort
- Spacing: 12px minimum between touchable elements

### Font Scaling
```css
/* Fluid typography — no breakpoints needed */
h1: clamp(2rem, 5vw, 4rem)
h2: clamp(1.5rem, 3.5vw, 2.5rem)
.section-title: clamp(1.75rem, 4vw, 3rem)
```

### Images & Media
- `max-width: 100%; height: auto` on all images
- `sizes` attribute on every `<Image>` for srcset
- Aspect ratio containers for embeds/videos

## 6. Performance UX

### Perceptual Performance
- **Loading screen**: logo → progress (≤1.2s) → content fade-in
- **Skeleton states**: shimmer placeholder for 3D scene
- **Instant navigation**: smooth scroll, no page reloads (SPA feel)
- **Progressive loading**: above-fold first, below-fold deferred

### Perceived Speed Tricks
- Optimistic UI: respond immediately, update later
- Transition on `transform/opacity` only (GPU composited)
- Content jumps = bad (set explicit dimensions on everything)
- Font swap: `font-display: swap` so text is visible immediately

### Feedback Loops
- Hover → 150ms response (color change)
- Click → 100ms response (scale down)
- Load → 300ms max for any feedback
- Navigation → 500ms max to feel instant

### Focus Management
- Skip-to-content link (visually hidden, first focusable)
- Focus ring on all interactive (2px accent, 2px offset)
- Focus trap in modals/mobile nav

## 7. Professional Portfolio Hallmarks

### What Recruiters Notice (in order)
1. **Load speed** — first impression = performance
2. **Typography** — bad type = amateur instantly
3. **Spacing** — uneven gaps = lack of craft
4. **Color restraint** — too many colors = no brand
5. **Content** — does the work speak for itself?
6. **Mobile** — 70% of first views are on phone
7. **Accessibility** — inclusive design = maturity

### Anti-Patterns to Avoid
- ❌ Gradient text on body copy
- ❌ Animated backgrounds competing with content
- ❌ Card hover effects that move content around
- ❌ Autoplay video/audio
- ❌ Non-standard scroll (hijacking)
- ❌ Text over busy backgrounds without overlay
- ❌ Missing alt text on project screenshots
- ❌ Broken links (especially GitHub/demo)

### Content Hierarchy for a Project Card
```
1. Screenshot        — visual proof
2. Title + Badge     — what is it + context
3. What/Result       — one-liner + metric
4. Tags              — tech stack at a glance
5. Links             — demo > github > architecture
```

### Review Checklist
- [ ] Only 1 accent color used across entire site
- [ ] Max 3 opacity levels per section
- [ ] No heading longer than 8 words
- [ ] Body text never below 15px on desktop
- [ ] All touch targets ≥ 44px
- [ ] Section spacing is consistent (py-20 md:py-28 everywhere)
- [ ] Cards in same grid have equal height
- [ ] No text-shadow on body text
- [ ] Every page/section has a clear focal point
- [ ] Color alone never conveys information (accessibility)
