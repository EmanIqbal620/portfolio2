---
id: 5
title: about-name-icons-hover-polish
stage: refactor
date: 2026-05-13
surface: agent
model: big-pickle
feature: about
branch: master
user: emaniemaniqbal
command: continue → about/bio section (fixes)
labels: ["about", "name", "icons", "hover", "ui-ux"]
links:
  spec: "project.md, eman.md"
  ticket: null
  adr: null
  pr: null
files:
  - components/about/AboutSection.tsx
tests:
  - npx tsc --noEmit (0 errors)
---

## Prompt

"ok where is the my informatiob my name and other information again analyse eman.md these good but that right side noting has"

Followed by: "analyse as a Ui and UX designer this hover animation what need than improve and enhane ok"

## Response snapshot

**Fix 1 — Left side name visibility:**
- "Eman Iqbal" promoted to big gradient H2 heading
- Combined "AI Engineer & Fullstack Developer — Karachi, Pakistan" into one prominent subtitle line below name
- Section header simplified (removed redundant gradient heading duplicate)

**Fix 2 — Right side card content & icons:**
- Replaced generic Lucide icons with "EI" monogram icon (brand logo per project.md spec)
- Card data refined: "AI Engineering" subtitle → "Agentic workflows" with proper detail
- "Fullstack" detail → "Next.js, FastAPI, Docker — modular systems built to scale"

**Fix 3 — Hover animation overhaul (UI/UX):**
- Lift increased: y: -4 → y: -6
- Multi-layer glow shadow: tight border glow + spread ambient + soft outer aura
- Title text shifts to accent color on hover (white/70 → accent hex)
- Subtitle/detail text brightens on hover (white/50 → white/65)
- EI icon does wobble animation (rotate: 0 → -5 → 5 → 0) + scale 1.15 on hover
- Transitions use cubic-bezier easing throughout

## Outcome

- ✅ Impact: Name now visible and prominent, right side cards show "EI" brand icon with rich hover interactions
- 🧪 Tests: tsc --noEmit → PASS (0 errors)
- 📁 Files: components/about/AboutSection.tsx
- 🔁 Next prompts: Visual feedback on hover feel, card spacing, or content
- 🧠 Reflection: Used useState forceRender to track hover state for inline style updates (framer-motion's whileHover can't control child element styles directly)

## Evaluation notes (flywheel)

- Failure modes observed: card.icon reference was stale after removing icon field from data; fixed by replacing with EIIcon component
- Graders run and results (PASS/FAIL): tsc --noEmit → PASS
- Next experiment (smallest change to try): Fine-tune hover glow intensity/easing based on visual feedback
