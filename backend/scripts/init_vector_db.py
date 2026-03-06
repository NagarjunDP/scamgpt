import pandas as pd
import os
import sys

# Add parent directory to path for imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from services.vector_service import VectorService

DATA_DIR = "backend/data"

def init_spam_index():
    print("Loading spam dataset for indexing...")
    df = pd.read_csv(os.path.join(DATA_DIR, "spam.csv"), encoding='latin-1')
    df = df[['v1', 'v2']]
    df.columns = ['label', 'text']
    
    # Only index spam messages for retrieval context
    spam_df = df[df['label'] == 'spam'].head(500) # Limit to 500 for demo
    texts = spam_df['text'].tolist()
    metadata = texts # For now, metadata is just the text itself
    
    service = VectorService()
    service.create_index(texts, metadata)
    print("Spam index created and saved.")

if __name__ == "__main__":
    init_spam_index()
