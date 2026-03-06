import faiss
import numpy as np
import pandas as pd
import os
from sentence_transformers import SentenceTransformer
import joblib

class VectorService:
    def __init__(self, model_name='all-MiniLM-L6-v2', index_path=None):
        self.model = SentenceTransformer(model_name)
        if index_path is None:
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            index_path = os.path.join(base_dir, "models", "faiss_index.bin")
        self.index_path = index_path
        self.index = None
        self.metadata = None
        
        if os.path.exists(self.index_path):
            self.load_index()

    def load_index(self):
        self.index = faiss.read_index(self.index_path)
        self.metadata = joblib.load(self.index_path + '.meta')

    def save_index(self):
        faiss.write_index(self.index, self.index_path)
        joblib.dump(self.metadata, self.index_path + '.meta')

    def create_index(self, texts, metadata):
        print(f"Creating index for {len(texts)} items...")
        embeddings = self.model.encode(texts)
        dimension = embeddings.shape[1]
        
        self.index = faiss.IndexFlatL2(dimension)
        self.index.add(np.array(embeddings).astype('float32'))
        self.metadata = metadata
        self.save_index()

    def search(self, query, top_k=3):
        if self.index is None:
            return []
        
        query_embedding = self.model.encode([query])
        distances, indices = self.index.search(np.array(query_embedding).astype('float32'), top_k)
        
        results = []
        for i, idx in enumerate(indices[0]):
            if idx < len(self.metadata):
                results.append({
                    "content": self.metadata[idx],
                    "distance": float(distances[0][i])
                })
        return results

# Singleton instance
vector_service = None

def get_vector_service():
    global vector_service
    if vector_service is None:
        vector_service = VectorService()
    return vector_service
