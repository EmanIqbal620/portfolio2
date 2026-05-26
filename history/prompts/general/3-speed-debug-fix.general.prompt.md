---
id: 3
title: speed debug and fix
stage: general
date: 2026-05-26
surface: agent
model: big-pickle
feature: none
branch: master
user: emaniemaniqbal
command: various debug/test commands
labels: [speed, debug, openrouter, gemini, timeout, optimization]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - main.py
  - lib/chat/portfolio-data.md
  - .env
tests:
  - python direct API tests
  - full chatbot speed tests (FAQ + LLM)
---

## Prompt

(check chatbot speed, fix bugs, optimize response time, apply chat.md fixes, handle new Gemini keys)

## Response snapshot

Investigated chatbot response time showing 5-6s for LLM queries. Found bug: expired/429 Google API key was blocking for 2.8-3.5s before falling back to OpenRouter. Added 0.5s asyncio.wait_for timeout on Google attempt — dropped total response time to 1.8-3.2s. Applied portfolio-data.md fixes (removed "2 years" experience, wrong GitHub URL, Streamlit entry). Expanded FAQ with project listing variants. Increased TF-IDF top_k from 3→5 for broader context. User provided 4 different Gemini keys — all same-project quota (429). All LLM paths still fall back to OpenRouter. New key tested: AIzaSyDPKqV6ycxCDjif3zDzXQkl7H41LjbaQa4 (429).

## Outcome

- ✅ Impact: LLM response time dropped from 5-6s to 1.8-3.2s. FAQ/cache stays 80-150ms.
- 🧪 Tests: FAQ instant (80-150ms), LLM fallback 1.8-4.7s depending on OpenRouter TTFT
- 📁 Files: main.py (timeout fix, prompt improvement, timing cleanup), portfolio-data.md (experience/GitHub/Streamlit fixes, FAQ variants)
- 🔁 Next prompts: Get valid Gemini key, improve loading UX during slow fallback
- 🧠 Reflection: OpenAI SDK blocks longer than raw HTTP for 429 errors — asyncio.wait_for is critical. All keys from same Google project share quota.

## Evaluation notes (flywheel)

- Failure modes observed: Google 429 blocks 3s before fallback, OpenRouter TTFT highly variable (1-4s)
- Graders run and results (PASS/FAIL): PASS — FAQ instant, cache works, no "2 years" in responses
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Skip Google entirely if GEMINI_API_KEY is known-bad; add warmup request
