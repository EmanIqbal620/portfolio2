---
id: 6
title: gitignore-readme-unused-assets
stage: general
date: 2026-06-30
surface: agent
model: big-pickle
feature: none
branch: main
user: Eman Iqbal
command: "i want to add github first than make professional readme and add other infor that pic and image that are not using add thmem in gitignore and .md file as well ok not current projects card do ont touchc that"
labels: ["gitignore", "readme", "cleanup", "assets", "documentation"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .gitignore
  - README.md
  - UNUSED_ASSETS.md
tests:
  - npx tsc --noEmit --skipLibCheck
---

## Prompt

i want to add github first than make professional readme and add other infor that pic and image that are not using add thmem in gitignore and .md file as well ok not current projects card do ont touchc that

## Response snapshot

Updated .gitignore with all unused assets (root-level screenshots, Zone.Identifier Windows junk files, unused PNG fallbacks in public/projects/, unused SVGs and 3D model copies). Created UNUSED_ASSETS.md documenting every ignored file with cleanup commands. Rewrote README.md as a professional, hire-worthy profile — unique angle ("Sociology student who codes"), featured projects with stack + result, tech stack, links, and contact info. Did NOT touch any project card/WorkSection components.

## Outcome

- ✅ Impact: Repo is clean — unused images (Screenshot*.png, hero*.png, eman*.png, etc.) and Windows Zone.Identifier files are now gitignored. README is professional and recruiter-ready. UNUSED_ASSETS.md serves as documentation reference.
- 🧪 Tests: TypeScript check passes clean (npx tsc --noEmit --skipLibCheck — zero errors).
- 📁 Files: Modified .gitignore (added ~25 file patterns), rewrote README.md, created UNUSED_ASSETS.md.
- 🔁 Next prompts: Awaiting user direction — next likely step is staging/committing these changes or deploying.
- 🧠 Reflection: The root directory was cluttered with ~30 unused files. .gitignore patterns and UNUSED_ASSETS.md together solve both the technical (git ignore) and documentation (what was ignored and why) requirements. README follows portfolio-professional guidelines: unique angle, proof via results table, clean structure.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Run git rm --cached to stop tracking the unused files that were previously committed, then commit.
