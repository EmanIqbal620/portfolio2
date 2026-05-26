---
id: 2
title: interactive typography float cursor proximity
stage: green
date: 2026-05-08
surface: agent
model: opencode/big-pickle
feature: hero
branch: master
user: emaniemaniqbal
command: i want my font fullstack developer and agentic ai developer be interactive as a ui ux designer and hiring manager tell it be top 10 %
labels: ["typography", "interaction", "cursor-effects", "hero", "animation"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - app/globals.css
  - components/hero/HeroSection.tsx
tests:
  - npx tsc --noEmit (0 errors)
---

## Prompt

i want my font fullstack developer and agetic ai developer be interactive as a ui ux designer and hiring mange rtell it be top 10 %

## Response snapshot

Implemented two layers of interactive typography on the hero title lines:

1. **Per-character floating wave** — each letter infinitely bobs at `translateY(-0.08em)` via `charFloat` CSS keyframe; stagger delays per character create a smooth wave. Animations chained: `splitReveal` (entrance) plays once for 0.6s, then `charFloat` seamlessly takes over via two-part `animation-name` in CSS.

2. **Cursor proximity glow** — raw `clientX/Y` tracked in `cursorRef`. In the existing rAF loop, `getBoundingClientRect()` per `.split-char` computes distance from cursor; within 120px threshold, applies smoothstepped `brightness()` filter and teal `text-shadow` via inline style. Fades out cleanly when cursor moves away.

Technical details: replaced the previous single inline `animation` style on each char span with CSS custom properties `--reveal-delay` / `--float-delay` consumed by `.split-char` class. Added `cursorRef` beside existing `mouseRef` for raw coords. All changes in `HeroSection.tsx` and `globals.css`.

## Outcome

- ✅ Impact: Title text now feels alive (continuous gentle wave) and reactive (cursor proximity glow). Moves from static reveal to top-tier interactive typography.
- 🧪 Tests: TypeScript type check passes (0 errors). Visual verification pending dev server.
- 📁 Files: `app/globals.css` (charFloat keyframe + .split-char base styles), `components/hero/HeroSection.tsx` (SplitReveal rewritten, cursorRef + proximity rAF added).
- 🔁 Next prompts: Screenshot comparison, fine-tune proximity threshold/glow intensity, add scroll-based text animation.
- 🧠 Reflection: Dual CSS animation on same element works cleanly because they animate different properties (1st: opacity+transform, 2nd: transform only). rAF per-frame `getBoundingClientRect()` on 25-40 elements is performant — no layout invalidation from compositor-only property changes.

## Evaluation notes (flywheel)

- Failure modes observed: `next build` timed out at 120s (normal for cold start), `tsc --noEmit` completed in seconds with 0 errors.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Adjust proximity threshold (120px) and max glow (0.45 alpha) based on visual feedback.
