# 🏛️ Nagendra Portfolio: Dynamic Research Hub Architecture

## **1. Core Concept**
Transitioning a static portfolio into a dynamic repository where research papers and projects are searchable and queryable via AI.

## **2. Tech Stack**
- **Frontend (Stitch):**
  - Vite + React + TypeScript.
  - Tailwind CSS for styling (High-contrast, minimal).
  - Lucide React for iconography.
- **Backend (Antigravity):**
  - Python + FastAPI.
  - SQLModel (SQLite) for structured metadata.
  - FAISS + SentenceTransformers for vector search (RAG).
- **AI Integration:**
  - Local RAG using `all-MiniLM-L6-v2` embeddings.
  - Logic for LLM integration (Gemma/OpenAI) for summarization.

## **3. Component Mapping**

### **Frontend (team/frontend-stitch/)**
- `App.tsx`: Main dashboard with grid layout and AI Chat sidebar.
- `api/`: Service layer for fetching projects and chat responses.
- `styles/`: Tailwind-based high-contrast theme.

### **Backend (team/backend-antigravity/)**
- `main.py`: API entry point (FastAPI).
- `ai_engine.py`: RAG logic (Vector DB initialization and querying).
- `ingest.py`: Script to parse legacy HTML project files.
- `data/`: SQLite and FAISS index storage.

## **4. Data Flow**
1. **Ingestion:** `ingest.py` parses `Project_*.html` -> `projects_content.json`.
2. **Indexing:** `ai_engine.py` loads JSON -> FAISS Vector Store.
3. **Querying:** User asks question -> `chat` endpoint -> FAISS similarity search -> (Future: LLM Summary) -> Response.

## **5. Next Steps (Sprint 1)**
- [ ] Implement full LLM integration (Gemma via Ollama).
- [ ] Add PDF export for research papers.
- [ ] Implement user authentication for "Scientist" dashboard.
