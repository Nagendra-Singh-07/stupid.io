from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI(title="Nagendra Singh's Portfolio API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

PROJECTS_FILE = os.path.join(os.path.dirname(__file__), "projects.json")

@app.get("/")
async def root():
    return {"message": "Welcome to the Portfolio API"}

from .ai_engine import get_engine
from pydantic import BaseModel

class ChatRequest(BaseModel):
    question: str

@app.get("/api/projects")
async def get_projects():
    if os.path.exists(PROJECTS_FILE):
        with open(PROJECTS_FILE, "r") as f:
            return json.load(f)
    return []

@app.post("/api/chat")
async def chat(request: ChatRequest):
    engine = get_engine()
    results = engine.query(request.question)
    
    # In a real app, you would pass these context chunks to LLM (Gemma/OpenAI)
    # For this prototype, we'll return the retrieved context as the "answer" 
    # if no LLM is configured.
    
    context = "\n\n".join([r['content'] for r in results])
    return {
        "answer": f"Based on the project files, here is what I found:\n\n{context}",
        "sources": [r['metadata'] for r in results]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
