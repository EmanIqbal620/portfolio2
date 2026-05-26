---
id: 2
title: UI/UX and Fullstack Fixes
stage: general
date: 2026-05-23
surface: agent
model: big-pickle
feature: none
branch: main
user: emaniemaniqbal
command: fix these
labels: ["ui", "ux", "cursor", "loading-screen", "next-image", "chatbot", "cv"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - app/globals.css
  - components/cursor/CustomCursor.tsx
  - components/ui/LoadingScreen.tsx
  - components/contact/ContactSection.tsx
  - components/work/WorkSection.tsx
  - components/chat/Chatbot.tsx
tests: []
---

## Prompt

you are a Ui and UX designer and fullstack Developer analyse this project and tell me

[then downstream: "fix these"]

## Response snapshot

Analyzed the portfolio project and identified 6 actionable issues, then fixed all of them:

1. **Cursor**: Replaced aggressive `cursor: none` on body with JS-driven `.cursor-hidden` class toggling, so native cursor remains as fallback if JS fails or on unsupported devices.

2. **Loading screen**: Replaced artificial `setInterval(Math.random())` progress with real `window.load` event detection + minimum 1.8s display time. Progress now reflects actual elapsed time, and "Ready!" only shows after page fully loads.

3. **CV download**: Updated `href="#"` to `/cv.pdf` with proper download attribute.

4. **Chat error handling**: Improved API error parsing — now handles non-JSON error responses gracefully and shows HTTP status codes.

5. **Next.js Image optimization**: Replaced all bare `<img>` tags in WorkSection with `next/image` (fill + sizes + WebP optimization). Verified no remaining `<img>` tags in the codebase.

6. **Architecture SVGs**: Confirmed paths are correct (files exist at `public/projects/*/architecture.svg`).

## Outcome

- ✅ Impact: Native cursor fallback, honest loading indicator, optimized image delivery, better error UX
- 🧪 Tests: build passes with type checking
- 📁 Files: 6 files modified
- 🔁 Next prompts: none
- 🧠 Reflection: tsconfig.tsbuildinfo was already gitignored; project screenshots were already present but using bare `<img>` tags

## Evaluation notes (flywheel)

- Failure modes observed: None — build succeeds
- Graders run and results (PASS/FAIL): Build PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Add ESLint config for consistent code style
