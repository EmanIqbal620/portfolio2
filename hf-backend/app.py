import os
import json
import re
import math
import time
import asyncio
from collections import Counter
import numpy as np
from openai import AsyncOpenAI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

GEMINI_KEY = os.getenv("GEMINI_API_KEY")
OPENROUTER_KEY = os.getenv("OPENROUTER_API_KEY")

llm_or = AsyncOpenAI(
    api_key=OPENROUTER_KEY,
    base_url=os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1"),
)

if GEMINI_KEY:
    llm_google = AsyncOpenAI(
        api_key=GEMINI_KEY,
        base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
    )
else:
    llm_google = None

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

with open("lib/chat/portfolio-data.md", "r") as f:
    raw = f.read()
chunks = [c.strip() for c in re.split(r"## CHUNK \d+:", raw) if c.strip()]
print(f"Loaded {len(chunks)} chunks")

STOP_WORDS = frozenset({
    'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'shall', 'can', 'need', 'dare',
    'it', 'its', 'this', 'that', 'these', 'those', 'i', 'me', 'my', 'we',
    'our', 'you', 'your', 'he', 'him', 'his', 'she', 'her', 'they', 'them',
    'their', 'what', 'which', 'who', 'whom', 'when', 'where', 'why', 'how',
    'not', 'no', 'nor', 'so', 'if', 'then', 'than', 'too', 'very', 'just',
    'about', 'above', 'after', 'again', 'all', 'also', 'any', 'because',
    'before', 'between', 'both', 'each', 'few', 'more', 'most', 'other',
    'some', 'such', 'only', 'own', 'same', 'into', 'over', 'under', 'up',
    'out', 'off', 'down', 'here', 'there', 'every', 'done', 'does',
})

def tokenize(text: str) -> Counter:
    words = re.findall(r"[a-zA-Z0-9+#]+(?:[-.][a-zA-Z0-9+#]+)*", text.lower())
    return Counter(w for w in words if w not in STOP_WORDS and len(w) > 1)

doc_vectors: list[Counter] = []
doc_norms: list[float] = []
idf: dict[str, float] = {}

@app.on_event("startup")
async def build_index():
    global doc_vectors, doc_norms, idf
    print("Building TF-IDF index...")
    doc_vectors = [tokenize(c) for c in chunks]
    n = len(doc_vectors)
    all_terms: set[str] = set()
    for dv in doc_vectors:
        all_terms.update(dv.keys())
    for term in all_terms:
        df = sum(1 for dv in doc_vectors if term in dv)
        idf[term] = math.log((n + 1) / (df + 1)) + 1
    doc_norms = [
        math.sqrt(sum((v * idf.get(k, 1)) ** 2 for k, v in dv.items()))
        for dv in doc_vectors
    ]
    print(f"Indexed {n} chunks, {len(all_terms)} unique terms")

class Question(BaseModel):
    question: str

def normalize(text: str) -> str:
    return re.sub(r'[^a-z0-9]', '', text.lower().strip())

FAQ: dict[str, str] = {
    normalize("What does Eman build?"): "Eman builds autonomous AI employees, RAG systems, fullstack web apps, open source npm packages, and reusable agent architectures. She focuses on systems that work 24/7 with zero human input.",
    normalize("What is Eman's background?"): "Eman is a self-taught fullstack developer and AI engineer from Karachi, Pakistan. She studies Sociology at the University of Karachi and is enrolled in GIAIC. She combines Sociology with AI to build systems designed around real human behavior.",
    normalize("Show me AI projects"): "Eman's AI projects include: a CRM Digital FTE Factory (autonomous email/WhatsApp/CRM handling), a Personal AI Employee running 24/7, a Humanoid Robotics Book with RAG AI Tutor, an AI Chat app with Gemini, and a Social Media AI Employee — all built with OpenAI Agents SDK, RAG, MCP, and FastAPI.",
    normalize("What makes Eman different?"): "Eman combines Sociology, AI engineering, and fullstack development — a rare combination. She builds systems designed around real human behavior, not just technical requirements. Her AI products match how users actually think and interact with technology.",
    normalize("Why chatbot?"): "This chatbot demonstrates Eman's RAG expertise. It uses TF-IDF search over a curated knowledge base and streams responses via Gemini 2.0 Flash — showing her ability to build AI assistants that answer accurately from custom data.",
    normalize("What tech stack does Eman use?"): "AI: OpenAI Agents SDK, MCP, RAG, Claude Code, Gemini. Backend: FastAPI, PostgreSQL, Kafka, Docker. Frontend: Next.js, TypeScript, Tailwind CSS, Framer Motion, Three.js. Cloud: Vercel, Google Cloud, Hugging Face. Tools: Figma, Sanity CMS, NPM. She publishes TypeScript packages and uses Spec-Kit Plus for development.",
    normalize("What projects has Eman built?"): "Eman has built: CRM DIGITAL FTE FACTORY (autonomous email/WhatsApp/CRM), Personal AI Employee (24/7 automated), Humanoid Robotics Book with RAG AI Tutor, TodoFlow AI Task Manager, AI Chat with Gemini, Tulip Flower Shop, Blog (Sociology & Tech), 12 TypeScript NPM packages, Furniture E-Commerce, Social Media AI Employee, and a portfolio chatbot (this one).",
    normalize("What are Eman's projects"): "Eman has built: CRM DIGITAL FTE FACTORY (autonomous email/WhatsApp/CRM), Personal AI Employee (24/7 automated), Humanoid Robotics Book with RAG AI Tutor, TodoFlow AI Task Manager, AI Chat with Gemini, Tulip Flower Shop, Blog (Sociology & Tech), 12 TypeScript NPM packages, Furniture E-Commerce, Social Media AI Employee, and a portfolio chatbot (this one).",
    normalize("What are her projects"): "Eman has built: CRM DIGITAL FTE FACTORY (autonomous email/WhatsApp/CRM), Personal AI Employee (24/7 automated), Humanoid Robotics Book with RAG AI Tutor, TodoFlow AI Task Manager, AI Chat with Gemini, Tulip Flower Shop, Blog (Sociology & Tech), 12 TypeScript NPM packages, Furniture E-Commerce, Social Media AI Employee, and a portfolio chatbot (this one).",
    normalize("Eman projects"): "Eman has built: CRM DIGITAL FTE FACTORY (autonomous email/WhatsApp/CRM), Personal AI Employee (24/7 automated), Humanoid Robotics Book with RAG AI Tutor, TodoFlow AI Task Manager, AI Chat with Gemini, Tulip Flower Shop, Blog (Sociology & Tech), 12 TypeScript NPM packages, Furniture E-Commerce, Social Media AI Employee, and a portfolio chatbot (this one).",
    normalize("List Eman projects"): "Eman has built: CRM DIGITAL FTE FACTORY (autonomous email/WhatsApp/CRM), Personal AI Employee (24/7 automated), Humanoid Robotics Book with RAG AI Tutor, TodoFlow AI Task Manager, AI Chat with Gemini, Tulip Flower Shop, Blog (Sociology & Tech), 12 TypeScript NPM packages, Furniture E-Commerce, Social Media AI Employee, and a portfolio chatbot (this one).",
    normalize("Eman's projects"): "Eman has built: CRM DIGITAL FTE FACTORY (autonomous email/WhatsApp/CRM), Personal AI Employee (24/7 automated), Humanoid Robotics Book with RAG AI Tutor, TodoFlow AI Task Manager, AI Chat with Gemini, Tulip Flower Shop, Blog (Sociology & Tech), 12 TypeScript NPM packages, Furniture E-Commerce, Social Media AI Employee, and a portfolio chatbot (this one).",
}

SYSTEM_PROMPT = """
You are Eman Iqbal's portfolio assistant. Answer questions about Eman — her projects, skills, hackathons, npm packages, and availability.

Rules:
- Answer using the context provided below each question
- Keep answers short and professional (1-4 sentences)
- If asked about projects in general, list ALL projects from context, not just one
- Never make up information
- If the question asks about Eman but context has no answer, say:
  "I don't have that information. Please contact Eman directly at emaniqbal907@gmail.com"
- If the question is unrelated to Eman (e.g. weather, sports, politics), say:
  "I can only answer questions about Eman's portfolio."
- If someone asks "who are you" or "who is this", say: "I am Eman's portfolio assistant."
- If someone asks about Eman (e.g. "who is Eman") or anything in her portfolio, answer using the context provided
"""

@app.get("/")
def root():
    return {"status": "Eman portfolio chatbot running"}

def tfidf_search(query: str, top_k: int = 5) -> str:
    q_vec = tokenize(query)
    q_norm = math.sqrt(sum((v * idf.get(k, 1)) ** 2 for k, v in q_vec.items()))
    if q_norm == 0:
        return chunks[0]

    scores = np.zeros(len(doc_vectors))
    for i, (dv, dn) in enumerate(zip(doc_vectors, doc_norms)):
        dot = 0.0
        shared = set(q_vec.keys()) & set(dv.keys())
        for k in shared:
            dot += q_vec[k] * idf.get(k, 1) * dv[k] * idf.get(k, 1)
        scores[i] = dot / (q_norm * dn + 1e-10)

    top_idx = np.argsort(scores)[-top_k:][::-1]
    return "\n\n".join(chunks[i] for i in top_idx)

response_cache: dict[str, str] = {}
CACHE_MAX = 50

async def generate(body: Question):
    q = body.question.strip().lower()
    nq = normalize(q)

    faq_answer = FAQ.get(nq)
    if faq_answer is not None:
        CHUNK_SIZE = 40
        for i in range(0, len(faq_answer), CHUNK_SIZE):
            yield f"data: {json.dumps({'content': faq_answer[i:i+CHUNK_SIZE]})}\n\n"
            await asyncio.sleep(0.015)
        yield "data: [DONE]\n\n"
        return

    cached = response_cache.get(q)
    if cached is not None:
        CHUNK_SIZE = 40
        for i in range(0, len(cached), CHUNK_SIZE):
            yield f"data: {json.dumps({'content': cached[i:i+CHUNK_SIZE]})}\n\n"
            await asyncio.sleep(0.015)
        yield "data: [DONE]\n\n"
        return

    try:
        context = tfidf_search(body.question)
    except Exception as e:
        yield f"data: {json.dumps({'content': f'Search error: {e}'})}\n\n"
        yield "data: [DONE]\n\n"
        return

    model = os.getenv("OPENROUTER_MODEL", "google/gemini-2.0-flash-001")

    async def try_provider(client, model_name, extra=None):
        kwargs = dict(
            model=model_name,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {body.question}"}
            ],
            max_tokens=300,
            stream=True,
        )
        if extra:
            kwargs["extra_body"] = extra
        return await client.chat.completions.create(**kwargs)

    stream = None

    if llm_google is not None:
        try:
            stream = await asyncio.wait_for(
                try_provider(llm_google, "models/gemini-2.0-flash"),
                timeout=0.5
            )
        except:
            pass

    if stream is None:
        stream = await try_provider(llm_or, model)

    full = ""
    async for chunk in stream:
        content = chunk.choices[0].delta.content or ""
        if content:
            full += content
            yield f"data: {json.dumps({'content': content})}\n\n"
    yield "data: [DONE]\n\n"

    if len(response_cache) >= CACHE_MAX:
        response_cache.clear()
    response_cache[q] = full

@app.post("/chat")
async def chat(body: Question):
    return StreamingResponse(generate(body), media_type="text/event-stream")
