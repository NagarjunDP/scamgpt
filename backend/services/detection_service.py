import joblib
import os
import sys
import pandas as pd
import numpy as np

# Add parent directory to path for imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from services.feature_extraction import extract_url_features, extract_message_features, extract_transaction_features

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, "models")

class DetectionService:
    def __init__(self):
        self.spam_model = joblib.load(os.path.join(MODELS_DIR, "spam_model.pkl"))
        self.spam_vectorizer = joblib.load(os.path.join(MODELS_DIR, "spam_vectorizer.pkl"))
        self.phishing_model = joblib.load(os.path.join(MODELS_DIR, "phishing_model.pkl"))
        self.fraud_model = joblib.load(os.path.join(MODELS_DIR, "fraud_model.pkl"))

    def detect_spam(self, text):
        X_tfidf = self.spam_vectorizer.transform([text])
        ml_prob = self.spam_model.predict_proba(X_tfidf)[0][1]
        
        # Heuristic Analysis
        features = extract_message_features(text)
        heuristic_score = 0.0
        
        if features['institution_lure'] == 1:
            heuristic_score += 0.5
        if features['has_suspicious_link'] == 1:
            heuristic_score += 0.4
        if features['urgency_score'] > 2:
            heuristic_score += 0.2
        if features['has_money'] == 1:
            heuristic_score += 0.1
            
        combined_prob = (ml_prob * 0.4) + (min(heuristic_score, 1.0) * 0.6)
        if ml_prob > 0.7 and heuristic_score > 0.6:
            combined_prob = max(combined_prob, 0.95)
            
        prediction = 1 if combined_prob > 0.5 else 0
        return int(prediction), float(combined_prob), features.get('keywords', "")

    def detect_phishing(self, url):
        features = extract_url_features(url)
        heuristic_score = 0.0
        if features['brand_impersonation'] == 1:
            heuristic_score += 0.7
        if features.get('suspicious_tld', -1) == 1:
            heuristic_score += 0.4
        if features['suspicious_keywords_count'] > 0:
            heuristic_score += min(0.4, features['suspicious_keywords_count'] * 0.15)
        if features['prefix_suffix'] == 1:
            heuristic_score += 0.1
        if features['has_obvious_typo'] == 1:
            heuristic_score += 0.3
            
        try:
            n_features = self.phishing_model.n_features_in_
            X = np.zeros((1, n_features))
            X[0, 0] = features['url_length']
            X[0, 1] = features['having_at_symbol']
            X[0, 2] = features['double_slash_redirecting']
            X[0, 3] = features['prefix_suffix']
            X[0, 4] = features['having_sub_domain']
            if n_features > 5:
                X[0, 5] = features.get('suspicious_tld', 0)
            
            ml_prob = self.phishing_model.predict_proba(X)[0][1]
            combined_prob = (ml_prob * 0.4) + (min(heuristic_score, 1.0) * 0.6)
            if heuristic_score >= 0.8:
                combined_prob = max(combined_prob, 0.9)
                
            prediction = 1 if combined_prob > 0.5 else 0
            return int(prediction), float(combined_prob), features.get('keywords', "")
        except Exception as e:
            print(f"Phishing detection error: {e}")
            return (1 if heuristic_score > 0.4 else 0), float(min(heuristic_score, 1.0)), features.get('keywords', "")

    def detect_fraud(self, txn_data):
        # features = ['amount (INR)', 'hour_of_day', 'is_weekend']
        amount = txn_data.get('amount', 0)
        hour = txn_data.get('hour', 12)
        weekend = txn_data.get('is_weekend', 0)
        
        X = np.array([[amount, hour, weekend]])
        prediction = self.fraud_model.predict(X)[0]
        probability = self.fraud_model.predict_proba(X)[0][1]
        return int(prediction), float(probability)

# Singleton
detection_service = None

def get_detection_service():
    global detection_service
    if detection_service is None:
        detection_service = DetectionService()
    return detection_service
