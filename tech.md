Now here's your Next.js implementation prompt — paste this directly to Claude Code or a new chat:


I'm building a portfolio site in Next.js + TypeScript + Tailwind + Framer Motion. I need a TechStackOrbs component for my Skills section.
What it does: Renders my tech stack as interactive magnetic orbs grouped into clusters. Orbs push away from the cursor and tint their category color on hover, then spring back. Clusters are arranged 3 per row, wrapping to new rows.
Groups and colors:

AI & Agentic (purple #7F77DD): Agents SDK, MCP, RAG, Claude Code, Gemini CLI, Gemini API, OpenAI API, Qdrant, Chainlit
Backend (teal #1D9E75): FastAPI, REST API, PostgreSQL, Neon DB, Kafka, Webhook, ODOO
Frontend (blue #378ADD): Next.js, React, TypeScript, Tailwind, Framer Motion, Three.js
DevOps & Cloud (amber #BA7517): Docker, Kubernetes, Vercel, Google Cloud, Hugging Face, GitHub Pages
Auth (coral #D85A30): Clerk, Better Auth, JWT
Languages (green #639922): Python, TypeScript, JavaScript
Design (pink #D4537E): Figma, Markdown
CMS & Content (gray #888780): Sanity CMS, Docusaurus
Open Source (teal-light #5DCAA5): NPM Publisher, Spec-Kit, inquirer, chalk

Layout: 2 rows of orbs per cluster (orbs stack vertically in pairs), 3 clusters per row, clusters wrap to next line. Dark base fill #282828, orb radius 26px, gap 8px between orbs. Category label above each cluster in its color, uppercase 10px.
Physics: On mousemove, calculate distance from cursor to each orb center. Within 85px radius, apply repulsion force scaled by proximity. Spring back to origin with stiffness 0.09, damping 0.76. Glow/tint interpolates smoothly with 0.13 lerp factor.
Tech: Use a <canvas> element with useRef and useEffect. requestAnimationFrame loop. No external physics library. Site palette is black background #000000, accent purple #7F77DD only. Component should be usable as <TechStackOrbs /> with no props (data is internal). Add a subtle hint text below: "hover to activate".
Below the canvas, render the same stack as a grouped readable pill list (for recruiters who don't interact): category name as a small label, pills in a flex-wrap row per group. Pills: dark bg, colored border matching the group color, white text, 12px font.