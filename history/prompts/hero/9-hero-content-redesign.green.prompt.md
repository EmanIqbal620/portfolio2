---
id: 9
title: Hero content redesign per portfolio.md
stage: green
date: 2026-06-28
surface: agent
model: big-pickle
feature: hero
branch: main
user: emaniemaniqbal
command: "Rewrite HeroSection to match updated portfolio.md spec — simpler bio, muted role, no-color pills, new CTAs, X icon, no trust stats, no AI badge"
labels: ["hero", "content", "redesign", "portfolio-md"]
links:
  spec: portfolio.md
  ticket: null
  adr: null
  pr: null
files:
  - components/hero/HeroSection.tsx
  - portfolio.md
tests:
  - npm run build (clean pass)
---

## Prompt

i update portfolio.md see and make my hero that

## Response snapshot

Rewrote HeroSection.tsx per new portfolio.md spec:

1. **Badge**: "● Open to Intern & Remote Roles" — subtle white border/chip (was purple "OPEN FOR INTERN/REMOTE ROLES")
2. **Greeting**: "Hi, I'm" / "EMAN IQBAL" — two-line, clean hierarchy (was inline with period)
3. **Role**: "Agentic AI Developer & Fullstack Engineer" — small, muted text-white/40 (was big split-reveal animated gradient title)
4. **Bio**: Short two-line bio about autonomous AI systems and web apps (was longer sociology paragraph)
5. **Tech pills**: 5 pills — OpenAI Agents SDK, RAG, MCP, Next.js, FastAPI — all same style, no color, subtle bordered chips (was 4 pills with purple highlights, included Docker instead of MCP/FastAPI)
6. **CTAs**: [View My Work] + [↓ Download CV] — both outlined matching style (was solid purple [GET IN TOUCH] + outlined [VIEW MY WORK])
7. **Social**: GitHub, LinkedIn, X — icons only, bottom of left column (was GitHub + LinkedIn with labels)
8. **Removed**: Trust stats, "AI EMPLOYEE RUNNING" badge, split-reveal character animation, mouse-follow text shadow

Updated portfolio.md "Hero Section Content" to match new spec.

## Outcome

- ✅ Impact: Hero now matches the cleaner, more minimal spec — smaller role text, no-color pills, outlined CTAs, X icon added, trust stats and AI badge removed
- 🧪 Tests: `npm run build` — Compiled successfully, static pages generated
- 📁 Files: `components/hero/HeroSection.tsx` (full rewrite), `portfolio.md` (hero section content updated)
- 🔁 Next prompts: Verify hero renders correctly at all breakpoints, ensure about section follows hero in layout
- 🧠 Reflection: The old hero had bold purple CTAs, animated split-reveal title, and trust badges. The new spec is intentionally minimal — muted text, bordered chips, no color accents in pills, outlined CTAs only. The left column now uses `flex flex-col justify-between` to push social icons to the bottom.

## Evaluation notes (flywheel)

- Failure modes observed: TSX type error with inline SVG icon component in map — fixed by extracting X icon into standalone element
- Graders run and results (PASS/FAIL): Build PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Replace public/cv.pdf with real resume
