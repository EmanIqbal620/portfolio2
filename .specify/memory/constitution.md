# Portfolio Constitution

## Core Principles

### I. Premium First
Every pixel must feel intentional. This portfolio competes with top 1% of developer portfolios — not templates, not bootcamp projects. Dark theme, purple accent (#9463c2), Geist font, 60fps animations.

### II. Content-Driven Hierarchy
Work speaks louder than effects. Every 3D scene, animation, and interaction must serve the content — never distract from it. The work section is the most important part of the page.

### III. Performance is UX
Sub-2s LCP, 95+ Lighthouse, no layout shifts. Heavy features (3D, chatbot) are dynamic imports. Font displays immediately via `font-display: swap`.

### IV. Mobile is First View
70%+ of recruiters will first view on mobile. Touch targets ≥44px, no hover-only interactions, single-column layout on small screens.

### V. Color Restraint
ONE accent color. Opacity creates hierarchy, not additional hues. Three surface levels maximum (base, raised, overlay).

### VI. Accessibility
Reduced motion respected. Focus rings visible on all interactive elements. Alt text on every image. Semantic HTML structure.

### VII. Storytelling Over Listing
Every project follows: PROBLEM → APPROACH → RESULT with numbers. A recruiter must understand the impact in 10 seconds.

## Technology Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS for styling
- Framer Motion for animation
- Three.js / @react-three/fiber for 3D
- Lucide React for icons
- Geist font (local via next/font)

## Development Practices
- TypeScript strict mode
- Dynamic imports for heavy components
- No `useEffect` for animations (Framer Motion handles it)
- Section IDs must match nav items for scroll spy

## Governance
This constitution supersedes ad-hoc design decisions. All new components must follow the spacing rhythm, color palette, and typography scale defined here. Amendments require documenting the rationale.

**Version**: 1.0.0 | **Ratified**: 2026-06-29 | **Last Amended**: 2026-06-29
