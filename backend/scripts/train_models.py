import pandas as pd
import numpy as np
import os
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from scipy.io import arff

DATA_DIR = "backend/data"
MODELS_DIR = "backend/models"

def train_spam_model():
    print("Training Scam Message Detection Model...")
    df = pd.read_csv(os.path.join(DATA_DIR, "spam.csv"), encoding='latin-1')
    df = df[['v1', 'v2']]
    df.columns = ['label', 'text']
    
    # Preprocess
    df['label'] = df['label'].map({'ham': 0, 'spam': 1})
    
    X = df['text']
    y = df['label']
    
    tfidf = TfidfVectorizer(stop_words='english', max_features=5000)
    X_tfidf = tfidf.fit_transform(X)
    
    X_train, X_test, y_train, y_test = train_test_split(X_tfidf, y, test_size=0.2, random_state=42)
    
    model = MultinomialNB()
    model.fit(X_train, y_train)
    
    print(f"Spam Model Accuracy: {accuracy_score(y_test, model.predict(X_test)):.4f}")
    
    joblib.dump(model, os.path.join(MODELS_DIR, "spam_model.pkl"))
    joblib.dump(tfidf, os.path.join(MODELS_DIR, "spam_vectorizer.pkl"))

def train_phishing_model():
    print("Training Phishing URL Detection Model...")
    data, meta = arff.loadarff(os.path.join(DATA_DIR, "phishing+websites/Training Dataset.arff"))
    df = pd.DataFrame(data)
    
    # All features except 'Result'
    X = df.drop('Result', axis=1).astype(int)
    y = df['Result'].astype(int)
    
    # Convert Result from -1, 1 to 0, 1
    y = y.map({-1: 0, 1: 1})
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    print(f"Phishing Model Accuracy: {accuracy_score(y_test, model.predict(X_test)):.4f}")
    
    joblib.dump(model, os.path.join(MODELS_DIR, "phishing_model.pkl"))

def train_fraud_model():
    print("Training Fraud Transaction Detection Model...")
    df = pd.read_csv(os.path.join(DATA_DIR, "upi_transactions_2024.csv"))
    
    # Feature engineering for UPI data
    # Selecting numerical/categorical columns for simplicity
    features = ['amount (INR)', 'hour_of_day', 'is_weekend']
    # Add dummy variables for categorical if needed
    X = df[features]
    y = df['fraud_flag']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    print(f"Fraud Model Accuracy: {accuracy_score(y_test, model.predict(X_test)):.4f}")
    
    joblib.dump(model, os.path.join(MODELS_DIR, "fraud_model.pkl"))

if __name__ == "__main__":
    if not os.path.exists(MODELS_DIR):
        os.makedirs(MODELS_DIR)
        
    train_spam_model()
    train_phishing_model()
    train_fraud_model()
    print("All models trained and saved successfully.")
