
import cohere
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, VectorParams, Distance
import uuid
import os
from dotenv import load_dotenv

load_dotenv()

co = cohere.Client(os.getenv("COHERE_API_KEY"))
qdrant = QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY")
)

chunks = [
  "System Prompt\n\nYou are Eman Iqbal's personal portfolio assistant. Eman is a self-taught AI engineer and fullstack developer from Karachi, Pakistan.\n\nYour job is to answer questions about Eman only \u2014 her projects, skills, experience, hackathons, npm packages, availability and background.\n\nRules:\n- Only answer using the context provided\n- Keep answers short, clear and professional\n- Never make up information not in the context\n- If you cannot find the answer say exactly: \"I don't have that information. Please contact Eman directly at emaniqbal907@gmail.com\"\n- Never answer questions unrelated to Eman\n- If someone asks who you are say: \"I am Eman's portfolio assistant. Ask me anything about her work, skills or availability.\"\n\n---",
  "About Eman\n\n- **Name:** Eman Iqbal\n- **Title:** Fullstack Developer & Agentic AI Builder\n- **Location:** Karachi, Pakistan\n- **Status:** OPEN FOR INTERN/REMOTE ROLES\n- **Availability:** Open for intern, junior, freelance, and remote roles worldwide\n- **Email:** emaniqbal907@gmail.com\n- **GitHub:** https://github.com/EmanIqbal620\n- **LinkedIn:** https://linkedin.com/in/eman-iqbal-4954a7395\n- **X (Twitter):** https://x.com/EmanIqbal90\n- **Website:** https://eman-iqbal.dev\n- **Experience:** 2 years building production AI systems, fullstack apps, and open source tools\n- **Featured Tech:** OpenAI Agents SDK, MCP, RAG, FastAPI, Docker, Next.js\n- **Quick Stats:** 5+ Projects, 2 AI Employees 24/7, 12 NPM packages published, Sociology \u00d7 AI\n\n---",
  "Education & Background\n\nEman studies Sociology at University of Karachi \u2014 Sociology is the study of human behavior, society, and how people interact with systems. She is self-taught in coding and also enrolled in GIAIC (Governor's Initiative for AI & Computing, in progress). She combines Sociology with AI to build systems designed around real human behavior, not just technical requirements.\n\n**Credential Highlights:** Sociology student at University of Karachi | GIAIC certified | Located in Karachi, open to remote worldwide | 2 AI Employees running live 24/7 (Gmail, WhatsApp, CRM) | Agentic workflows with OpenAI Agents SDK, RAG, MCP in production | Scalable architecture with Next.js, FastAPI, Docker\n\n---",
  "Why Sociology + AI\n\nEman combines Sociology with AI to build systems designed around real human behavior. Sociology teaches how people interact with systems and make decisions \u2014 so her AI products match how users actually think and behave, not just technical requirements. This combination is rare and shows in every system she ships.\n\n---",
  "Key Definitions\n\n- **MCP (Model Context Protocol):** A modern protocol for connecting AI agents with tools and external systems.\n- **RAG (Retrieval-Augmented Generation):** A technique that lets AI answer questions using specific documents and datasets rather than just training data.\n- **GIAIC:** Governor's Initiative for AI and Computing \u2014 a government-backed AI education program in Pakistan.\n\n---",
  "What I Build \u2014 AI Employees & Automation (Primary)\n\nAutonomous agents handling Gmail, WhatsApp, webhooks and social media 24/7 \u2014 connecting CRM, social platforms, and business tools into one zero-touch pipeline.\n\n**Tags:** OpenAI Agents SDK, Kafka, ODOO\n\n---",
  "What I Build \u2014 RAG Systems\n\nChatbots trained on real documents using vector search and document intelligence \u2014 answers accurately from user-selected content. Embedded inside a live published book.\n\n**Tags:** RAG, Qdrant, Neon PostgreSQL\n\n---",
  "What I Build \u2014 Reusable Agent Architecture\n\nReusable AI components any agent can plug into \u2014 cloud-native blueprints built with Claude Code subagents and agent skills. Cuts build time across every project.\n\n**Tags:** Claude Code, MCP, Spec-Kit Plus\n\n---",
  "What I Build \u2014 Full-Stack Web Apps\n\nProduction-ready apps with auth (Clerk, BetterAuth, JWT), CMS, analytics and AI integration built in \u2014 delivered end-to-end across e-commerce, blog and todo platforms.\n\n**Tags:** Next.js, Sanity CMS, BetterAuth, JWT, Multiple apps live in production\n\n---",
  "What I Build \u2014 Open Source Packages\n\n12 TypeScript packages on npm \u2014 spanning finance, education, gaming and dev tools. Fully typed, versioned and installable by any developer worldwide.\n\n**Tags:** TypeScript, npm, Open source\n\n---",
  "What I Build \u2014 AI-Driven Development\n\nSpec-first workflow with Claude Code, Gemini CLI and Spec-Kit Plus \u2014 prototype fast, harden for production. Every hackathon project built this way from incubation to deployment.\n\n**Tags:** Claude Code, Gemini CLI, Spec-Kit Plus\n\n---",
  "Project \u2014 CRM DIGITAL FTE FACTORY\n\n- **Category:** AI & Agents\n- **Badge:** GIAIC \u2014 Hackathon 5 (Advanced)\n- **Problem:** Businesses waste 30+ hours weekly on Gmail, WhatsApp and CRM manually.\n- **Built:** AI employee handling every channel autonomously \u2014 24/7, zero human input.\n- **Result:** Zero hours needed. Live in production.\n- **Stack:** OpenAI Agents SDK, Kafka, Docker, MCP\n- **Demo:** https://youtu.be/WlHItrNs8Z8\n\n---",
  "Project \u2014 PERSONAL AI EMPLOYEE (DIGITAL FTE)\n\n- **Category:** AI & Agents\n- **Badge:** GIAIC \u2014 Hackathon 0 (Advanced)\n- **Problem:** Standard automation tools stay passive, waiting for manual prompt inputs while business tasks exhaust 40+ hours.\n- **Built:** Autonomous agent running 24/7 via file watchers, Claude Code reasoning engine, MCP servers, and an Obsidian GUI dashboard.\n- **Result:** Zero prompt inputs needed. Self-iterating execution loops handle business affairs on autopilot.\n- **Stack:** Claude Code, MCP Servers, Python Watchers, Obsidian GUI\n- **GitHub:** https://github.com/EmanIqbal620/Full-Time-AI-Employee.git\n\n---",
  "Project \u2014 HUMANOID ROBOTICS BOOK + RAG AI TUTOR\n\n- **Category:** Fullstack\n- **Badge:** GIAIC \u2014 Hackathon 1\n- **Problem:** Robotics education is expensive, scattered and paywalled.\n- **Built:** Free textbook with 6 modules and a live RAG AI Tutor built in.\n- **Result:** 6 modules, 24+ weeks, Live RAG AI Tutor \u2014 deployed free. Anyone can access and learn right now.\n- **Stack:** Docusaurus, RAG, Qdrant, FastAPI, Neon PostgreSQL\n- **Demo:** https://ai-native-book-ruddy.vercel.app\n- **GitHub:** https://github.com/EmanIqbal620/ai-native-book.git\n\n---",
  "Project \u2014 TODOFLOW AI TASK MANAGER\n\n- **Category:** Fullstack\n- **Badge:** GIAIC \u2014 Hackathon 3\n- **Problem:** Todo apps store tasks but never help you think or prioritize.\n- **Built:** Full app with auth, analytics, AI chatbot built in 3 phases.\n- **Result:** Live on Vercel. Works right now.\n- **Stack:** Next.js, FastAPI, Better Auth, Docker, Neon PostgreSQL\n- **Demo:** https://tobo-app-chatbot.vercel.app\n- **GitHub:** https://github.com/EmanIqbal620/tobo-app-chatbot.git\n\n---",
  "Project \u2014 AI CHAT (CHAINLIT + GEMINI)\n\n- **Category:** AI & Agents\n- **Badge:** Deployed on Hugging Face\n- **Problem:** Most developers use ChatGPT without understanding how to build one themselves.\n- **Built:** Full AI chat interface with Gemini API backend and real-time streaming deployed to production.\n- **Result:** Live on Hugging Face with real-time streaming \u2014 deployed and working.\n- **Stack:** Chainlit, Python, Gemini API\n- **Demo:** https://emaniqbal-chainlit1.hf.space\n- **GitHub:** https://github.com/EmanIqbal620/chainlit.git\n\n---",
  "Project \u2014 TULIP FLOWER SHOP\n\n- **Category:** Fullstack\n- **Badge:** GIAIC \u2014 Hackathon\n- **Problem:** Most student e-commerce projects are fake. This one has real auth, real CMS, real flow.\n- **Built:** Complete online flower store \u2014 12+ products, pricing with discounts, cart, reviews and contact.\n- **Result:** Built and deployed on Vercel.\n- **Stack:** Next.js, Tailwind CSS, Vercel, Sanity CMS\n- **Demo:** https://tulip-e-commerce-web-42fy.vercel.app/\n- **GitHub:** https://github.com/EmanIqbal620/tulip-E-commerce-web.git\n\n---",
  "Project \u2014 BLOG (SOCIOLOGY & TECH)\n\n- **Category:** Fullstack\n- **Badge:** Deployed on Vercel\n- **Problem:** Designed scalable frontend architecture optimized for readability and seamless navigation.\n- **Built:** Modern blogging platform with responsive layouts and clean content-focused UI.\n- **Result:** Focused on performance, responsive design, and improved user experience.\n- **Stack:** Next.js, Sanity CMS, Tailwind, Vercel\n- **Demo:** https://blog-web-kappa-lime.vercel.app/\n- **GitHub:** https://github.com/EmanIqbal620/blog-web.git\n\n---",
  "Project \u2014 12 TYPESCRIPT CLI PACKAGES\n\n- **Category:** NPM\n- **Badge:** Open Source \u2014 NPM\n- **Problem:** Developers rebuild the same terminal utilities in every project.\n- **Built:** Published 12 open-source TypeScript CLI tools and interactive terminal utilities to NPM.\n- **Result:** 12 packages live on NPM \u2014 modular, type-safe, automated command-line architectures.\n- **Stack:** TypeScript, NPM, CLI, inquirer, chalk\n- **Demo:** https://www.npmjs.com/~eman_iqbal\n\n---",
  "Project \u2014 FURNITURE E-COMMERCE\n\n- **Category:** Fullstack\n- **Badge:** Deployed on Vercel\n- **Problem:** Most e-commerce tutorials stop before deployment. This one ships.\n- **Built:** Full production furniture store with Sanity CMS product management, cart functionality and complete shopping flow.\n- **Result:** Built and deployed on Vercel with real products and full shopping flow.\n- **Stack:** Next.js, Sanity CMS, Tailwind CSS\n- **Demo:** https://tulip-e-commerce-web-42fy.vercel.app/\n- **GitHub:** https://github.com/EmanIqbal620/tulip-E-commerce-web.git\n\n---",
  "Project \u2014 SOCIAL MEDIA AI EMPLOYEE\n\n- **Category:** AI & Agents\n- **Problem:** Social media management is time-consuming and requires constant manual posting.\n- **Built:** Autonomous agent creating and posting content to social media platforms 24/7.\n- **Result:** Fully autonomous social media operation with zero manual input.\n- **Stack:** OpenAI Agents SDK, Docker\n\n---",
  "Project \u2014 STREAMLIT APP\n\n- **Category:** AI & Agents\n- **Badge:** Deployed on Hugging Face\n- **Built:** Python web app with Streamlit interface.\n- **Stack:** Streamlit, Python\n- **Demo:** https://share.streamlit.io/\n\n---",
  "Tech Stack\n\n- **AI & Agentic:** OpenAI Agents SDK, MCP, RAG, Claude Code, Gemini CLI, Gemini API, OpenAI API, Qdrant, Chainlit\n- **Backend:** FastAPI, REST API, PostgreSQL, Neon Database, Kafka, Webhook, ODOO\n- **Frontend:** Next.js, HTML, CSS, Bootstrap, Tailwind CSS, Streamlit\n- **Design & Prototyping:** Figma, Markdown\n- **Authentication:** Clerk, Better Auth, JWT\n- **DevOps & Cloud:** Docker, Kubernetes, Vercel, Google Cloud, Hugging Face, GitHub Pages\n- **Languages:** Python, TypeScript, JavaScript\n- **CMS & Content:** Sanity CMS, Docusaurus\n- **Open Source:** NPM Publisher, Spec-Kit Plus, inquirer, chalk\n\n---",
  "Contact & Social\n\n- **Email:** emaniqbal907@gmail.com\n- **LinkedIn:** https://linkedin.com/in/eman-iqbal-4954a7395\n- **GitHub:** https://github.com/EmanIqbal620\n- **X (Twitter):** https://x.com/EmanIqbal90\n- **CV:** Available in the contact section of the portfolio (file: /cv.pdf)\n\n---",
  "GIAIC\n\nEman is currently enrolled in GIAIC (not completed). She has completed multiple GIAIC hackathons covering AI books, RAG systems, AI todo apps, and autonomous AI employees.\n\n---",
  "What Makes Eman Different\n\nEman combines Sociology, AI engineering, and fullstack development \u2014 giving her a rare ability to build systems designed around real human behavior, not just technical requirements. She builds autonomous AI systems, production fullstack applications, and open source tools with a strong understanding of how people actually interact with technology."
]

qdrant.recreate_collection(
    collection_name="portfolio",
    vectors_config=VectorParams(
        size=1024,
        distance=Distance.COSINE
    )
)

response = co.embed(
    texts=chunks,
    model="embed-english-v3.0",
    input_type="search_document"
)

points = []
for i, (chunk, vector) in enumerate(
    zip(chunks, response.embeddings)
):
    points.append(PointStruct(
        id=str(uuid.uuid4()),
        vector=vector,
        payload={"text": chunk}
    ))

qdrant.upsert(
    collection_name="portfolio",
    points=points
)

print(f"Done. {len(points)} chunks uploaded.")
