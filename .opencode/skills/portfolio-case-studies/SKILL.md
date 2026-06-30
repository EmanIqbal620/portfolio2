---
name: portfolio-case-studies
description: Use when building or editing project case studies, work section, project cards, filtering, or architecture diagram display. Covers story arc templates, metrics display, filter animations, and project data structures.
---

# Portfolio Case Studies Skill — Project Storytelling That Converts

## Purpose
Present each project so a recruiter understands PROBLEM → APPROACH → RESULT in 10 seconds or less, with proof.

## Story Arc Template
Every project follows this exact narrative flow:

```
BADGE  (context: hackathon / production / open source)
TITLE  (what it is)
WHY    (the problem — 1 sentence, human)
WHAT   (my approach — 1-2 sentences, technical)
RESULT (outcome with numbers — 1 sentence)
STACK  (technology tags)
LINKS  (demo + github + architecture)
```

## Display Hierarchy

### Featured Projects (Larger Cards)
- Full-width on mobile, 2-col on desktop
- Hero screenshot with gradient overlay
- Architecture diagram link
- `result` field highlighted with accent color
- 3-5 technology tags

### Compact Projects (Smaller Cards)
- 3-col grid on desktop
- Smaller screenshot, truncated description
- 3 tags max, smaller chips
- GitHub + Demo links

## Metrics Display
Every result MUST contain a number if possible:
- ❌ "Improved performance"
- ✅ "2.3x faster load times | p95 180ms → 78ms"
- ❌ "Built AI system"
- ✅ "3 AI agents running 24/7 | 0 human hours needed"

Badge them with a "Results" chip:
```tsx
<span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 font-semibold">
  📊 Results
</span>
```

## Architecture Diagrams
- SVG diagrams for complex projects (agent workflows, system architecture)
- Light/Dark theme aware
- Smaller preview that opens full screen on click
- Show at least: data flow direction, key services, protocol boundaries

## Filter System
- Categories: All | AI & Agents | Fullstack | NPM
- Filter animation: `AnimatePresence` with `mode="popLayout"`
- Default shows 6 featured, "Show All" expands
- Count badge on "Show All" button

## Empty/Zero State
- If a filter yields no results: "No projects in this category yet. Check back soon."
- If screenshots missing: icon-only placeholder with gradient bg

## Technical Implementation
- Projects stored as typed data in `lib/data.ts`:
```ts
export type WorkProject = {
  id: number;
  category: string;
  icon: string;
  title: string;
  badge: string;
  what: string;
  why: string;
  result: string;
  screenshot: string;
  architectureSvg?: string;
  links: { demo?: string; github?: string };
  demoLabel?: string;
  tags: string[];
  accent: 'magenta' | 'teal' | 'purple';
};
```

## Review Checklist
- [ ] Every project has a `result` with at least one number/metric
- [ ] `why` is human-readable, not technical jargon
- [ ] All links point to real URLs, not `#`
- [ ] Architecture diagrams exist for complex projects
- [ ] Screenshots exist or placeholder is intentional
- [ ] Filter animation is smooth with `AnimatePresence`
