import os
import json
from typing import List, Optional
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain.schema import Document

class RAGEngine:
    def __init__(self, content_file: str):
        self.content_file = content_file
        self.vector_store = None
        self.embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
        self.load_and_index()

    def load_and_index(self):
        if not os.path.exists(self.content_file):
            print(f"Content file {self.content_file} not found. Skipping indexing.")
            return

        with open(self.content_file, 'r', encoding='utf-8') as f:
            data = json.load(f)

        documents = []
        for item in data:
            doc = Document(
                page_content=item['content'],
                metadata={"title": item['title'], "id": item['id']}
            )
            documents.append(doc)

        text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        docs = text_splitter.split_documents(documents)

        self.vector_store = FAISS.from_documents(docs, self.embeddings)
        print(f"Indexed {len(docs)} document chunks.")

    def query(self, question: str, k: int = 3) -> List[dict]:
        if not self.vector_store:
            return []
        
        results = self.vector_store.similarity_search(question, k=k)
        return [
            {
                "content": res.page_content,
                "metadata": res.metadata
            } for res in results
        ]

# Global instance
engine = None

def get_engine():
    global engine
    if engine is None:
        content_path = os.path.join(os.path.dirname(__file__), "projects_content.json")
        engine = RAGEngine(content_path)
    return engine
