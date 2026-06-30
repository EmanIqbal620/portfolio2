---
name: portfolio-seo
description: Use when optimizing for SEO, Core Web Vitals, Lighthouse scores, Open Graph, structured data (JSON-LD), accessibility, or performance. Covers metadata, image optimization, code splitting, and sitemap generation.
---

# Portfolio SEO & Performance Skill — 100 Lighthouse, Zero Compromise

## Purpose
Ensure this portfolio scores 95-100 on Lighthouse, ranks for relevant search terms, and looks perfect when shared on social media.

## Core Web Vitals Targets
| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | ≤ 1.5s | Preload hero image/font, optimize 3D scene, inline critical CSS |
| FID/INP | ≤ 100ms | Code-split 3D + chatbot, avoid long tasks, use `requestAnimationFrame` |
| CLS | ≤ 0.05 | Explicit `width/height` on all images, font-display: swap |

## Next.js Specifics

### Image Optimization
```tsx
// Always provide width/height + sizes
<Image
  src={project.screenshot}
  alt={project.title}
  width={600}
  height={400}
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={isAboveFold}
  className="object-cover object-top"
/>
```

### Dynamic Imports (Code Splitting)
```tsx
// 3D scene — heavy, never above-fold
const BackgroundScene = dynamic(
  () => import('@/components/3d/HeroScene3D').then((m) => ({ default: m.BackgroundScene })),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
);

// Chatbot — only load after interaction or idle
const Chatbot = dynamic(() => import('@/components/chat/Chatbot'), { ssr: false });
```

### Font Loading
```tsx
// Next.js localFont handles this, but verify:
// - font-display: swap (not optional or block)
// - Preconnect to font origin if remote
// - Subset latin only
```

## Structured Data (JSON-LD)
Inject via `layout.tsx` or a dedicated component:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Eman Iqbal",
  "jobTitle": "Agentic AI Developer & Full-Stack Engineer",
  "url": "https://emaniqbal.dev",
  "sameAs": [
    "https://github.com/EmanIqbal620",
    "https://linkedin.com/in/eman-iqbal-4954a7395"
  ],
  "knowsAbout": ["Agentic AI", "Fullstack Development", "Next.js", "FastAPI", "Docker"]
}
```

Also add `CollectionPage` for projects if > 5 items.

## Open Graph (Social Sharing)
```tsx
export const metadata: Metadata = {
  title: 'Eman Iqbal — Agentic AI & Fullstack Developer',
  description: 'Building autonomous AI systems and scalable web applications',
  openGraph: {
    title: 'Eman Iqbal — Agentic AI & Fullstack Developer',
    description: 'Sociology student who codes. AI employees, agent workflows, fullstack apps.',
    url: 'https://emaniqbal.dev',
    siteName: 'Eman Iqbal Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eman Iqbal — Agentic AI & Fullstack Developer',
    description: 'Building autonomous AI systems and scalable web applications',
    images: ['/og-image.png'],
  },
};
```

### OG Image Generation
Use `@vercel/og` or `next/og` for dynamic OG images:
- Template: Name + Title + Accent gradient background
- Generate on-demand via `app/og-image/route.tsx`
- Cache with `public` max-age

## Performance Techniques

### CSS
- Tailwind purge removes unused (already built-in)
- Avoid `@layer components` for one-off styles (use Tailwind utilities)
- Inline critical CSS for above-fold content

### JavaScript
- Lazy-load all below-fold sections with `IntersectionObserver` via `whileInView`
- Defer chatbot initialization: `setTimeout(() => loadChatbot(), 3000)` or idle callback
- No `useLayoutEffect` that blocks painting

### Font
- `next/font` loads Geist — verify `font-display: swap` is active
- Preload the font file in `layout.tsx`

## Accessibility
- Alt text on EVERY image (empty alt="" for decorative only)
- ARIA labels on icon-only buttons
- Focus trap in mobile nav
- Skip-to-content link visually hidden but focusable
- Color contrast: body text `#ffffff` on `#000000` = 21:1 ✓
- Reduced motion: `@media (prefers-reduced-motion: reduce)` disables ALL animations

## Robots & Sitemap
- `robots.ts` (Next.js App Router) allowing all crawlers
- `sitemap.ts` with all section anchors
- `manifest.ts` for PWA basics (name, short_name, theme_color = #000000, icons)

## Review Checklist
- [ ] Lighthouse score 95+ on mobile and desktop
- [ ] All images have explicit width/height
- [ ] 3D scene and chatbot are dynamic imports
- [ ] JSON-LD structured data present
- [ ] OG image renders correctly
- [ ] No render-blocking resources
- [ ] All links have `rel="noopener noreferrer"` for external
