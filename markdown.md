You are Eman Iqbal's personal portfolio assistant. 
Eman is a self-taught AI engineer and fullstack 
developer from Karachi, Pakistan.

Your job is to answer questions about Eman only 
— her projects, skills, experience, hackathons, 
npm packages, availability and background.

Rules:
- Only answer using the context provided
- Keep answers short, clear and professional
- Never make up information not in the context
- If you cannot find the answer say exactly: 
  "I don't have that information. Please contact 
   Eman directly at [her email]"
- Never answer questions unrelated to Eman
- If someone asks who you are say: 
  "I am Eman's portfolio assistant. Ask me anything 
   about her work, skills or availability."



   step-1
   STEP 1 — Chunk your markdown
What to do:
Split your markdown file into small sections. Each chunk = one topic.
Example chunks:

Chunk 1: About Eman — who she is, sociology background
Chunk 2: AI Employee project
Chunk 3: RAG chatbot project
Chunk 4: npm packages
Chunk 5: Tech stack
Chunk 6: Availability and contact

Rule: each chunk maximum 300 words. Do not mix two topics in one chunk.
How to know this step passed:

Every section of your portfolio has its own chunk
No chunk is longer than 300 words
Reading any chunk alone makes complete sense without needing another chunk

step-3
Next step after you have both keys:
Run this embed script to upload your chunks into Qdrant:
pythonimport cohere
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

# Your chunks from your markdown file
chunks = [
    "Eman Iqbal is a self-taught AI engineer...",
    "AI Employee project handles Gmail...",
    # paste all your chunks here
]

# Create collection — 1024 because Cohere
qdrant.recreate_collection(
    collection_name="portfolio",
    vectors_config=VectorParams(
        size=1024,
        distance=Distance.COSINE
    )
)

# Embed all chunks at once
response = co.embed(
    texts=chunks,
    model="embed-english-v3.0",
    input_type="search_document"
)

# Upload to Qdrant
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

How to know this worked:

Script runs with no errors
Terminal prints Done. X chunks uploaded


step-4
Perfect. Now build the FastAPI backend.

Create a new file called `main.py` and paste this:

```python
import os
import cohere
import google.generativeai as genai
from qdrant_client import QdrantClient
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

# Clients
co = cohere.Client(os.getenv("COHERE_API_KEY"))
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
qdrant = QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY")
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class Question(BaseModel):
    question: str

SYSTEM_PROMPT = """
You are Eman Iqbal's personal portfolio assistant.
Answer questions about Eman only — her projects, 
skills, hackathons, npm packages and availability.

Rules:
- Only answer using the context provided
- Keep answers short and professional
- Never make up information
- If you cannot find the answer say exactly:
  I don't have that information. Please contact 
  Eman directly at [her email]
- Refuse all questions unrelated to Eman
- If asked who you are say:
  I am Eman's portfolio assistant. Ask me anything 
  about her work, skills or availability.
"""

@app.get("/")
def root():
    return {"status": "Eman portfolio chatbot running"}

@app.post("/chat")
async def chat(body: Question):
    
    # Step 1 — embed the question
    embedded = co.embed(
        texts=[body.question],
        model="embed-english-v3.0",
        input_type="search_query"
    )
    question_vector = embedded.embeddings[0]

    # Step 2 — search Qdrant
    results = qdrant.search(
        collection_name="portfolio",
        query_vector=question_vector,
        limit=5
    )
    chunks = [r.payload["text"] for r in results]

    # Step 3 — rerank with Cohere
    reranked = co.rerank(
        query=body.question,
        documents=chunks,
        model="rerank-english-v3.0",
        top_n=3
    )
    top_chunks = [
        chunks[r.index] for r in reranked.results
    ]
    context = "\n\n".join(top_chunks)

    # Step 4 — generate answer with Gemini
    model = genai.GenerativeModel("gemini-2.0-flash")
    prompt = f"""
{SYSTEM_PROMPT}

Context:
{context}

Question: {body.question}

Answer:
"""
    response = model.generate_content(prompt)
    return {"answer": response.text}
```

---

**Now create `requirements.txt`:**

```
fastapi
uvicorn
cohere
google-generativeai
qdrant-client
pydantic
python-dotenv
```

---

**Install everything:**

```bash
pip install -r requirements.txt
```

---

**Run locally:**

```bash
uvicorn main:app --reload
```

---

**Test it immediately.**

Open browser at `http://localhost:8000/docs`

Find `/chat` endpoint. Click Try it out. Send this:

```json
{ "question": "What projects has Eman built?" }
```

You should get a real accurate answer back.

---

**Then test these one by one:**

```
"Who is Eman?"
"Is she available for internships?"
"What is her tech stack?"
"Tell me about her AI employee project"
"What npm packages has she published?"
"How can I contact her?"
"What is the weather today?"
```

Last one must be refused. All others must give accurate answers.

---

Tell me what you get and we move to deployment.