---
id: 5
title: loading-tsx-splash-simplification
stage: refactor
date: 2026-06-30
surface: agent
model: big-pickle
feature: none
branch: main
user: Eman Iqbal
command: "Continue if you have next steps, or stop and ask for clarification if you are unsure how to proceed."
labels: ["loading", "splash", "performance", "init"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - app/loading.tsx
  - app/layout.tsx
tests:
  - npx tsc --noEmit --skipLibCheck
---

## Prompt

Continue if you have next steps, or stop and ask for clarification if you are unsure how to proceed.

## Response snapshot

Implemented two remaining next steps from the previous session: (1) Created app/loading.tsx for route-level Suspense boundary with a minimal branded loading state (logo + pulsing progress bar). (2) Simplified init-splash in app/layout.tsx — removed the progress bar and subtitle that competed visually with the React LoadingScreen component. The init-splash is now just a pure black screen with the logo that shows before hydration.

## Outcome

- ✅ Impact: Init-splash no longer shows a progress bar that jumps to 60% then disappears when LoadingScreen takes over (starting from 0%). The pre-hydration experience is now a clean logo-only splash. loading.tsx provides a Suspense fallback for dynamic import resolution.
- 🧪 Tests: TypeScript check passes clean (npx tsc --noEmit --skipLibCheck — zero errors).
- 📁 Files: Created app/loading.tsx, modified app/layout.tsx (criticalCSS reduced, init-splash HTML simplified).
- 🔁 Next prompts: User then requested gitignore + README + unused assets documentation.
- 🧠 Reflection: The init-splash → LoadingScreen transition was creating a visual discontinuity (progress bar reset). Simplifying the splash to logo-only makes the handoff seamless. loading.tsx fills the gap during dynamic import resolution.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Deploy to Vercel and verify load speed improvements.
