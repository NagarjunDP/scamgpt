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

    def detect_email(self, email_text):
        email_text = email_text.strip()
        
        # If it's just a single email address
        if "@" in email_text and " " not in email_text:
            user_part, domain_part = email_text.split("@", 1)
            heuristic_score = 0.0
            
            # Unofficial support/security emails
            scam_keywords = ["support", "security", "verify", "official", "bank", "admin", "login"]
            is_suspicious_prefix = any(k in user_part.lower() for k in scam_keywords)
            is_generic_domain = any(d in domain_part.lower() for d in ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com"])
            
            if is_suspicious_prefix and is_generic_domain:
                heuristic_score += 0.7 # High probability of impersonation
            
            # Phishing domains
            if domain_part.count('.') > 2 or "-" in domain_part:
                heuristic_score += 0.3
                
            prediction = 1 if heuristic_score > 0.5 else 0
            probability = heuristic_score if heuristic_score > 0 else 0.05
            
            return int(prediction), float(probability), "single_email_check"

        # Otherwise treat as email content
        prediction, probability, keywords = self.detect_spam(email_text)
        
        # Add email-specific heuristics
        heuristic_score = 0.0
        if "bit.ly" in email_text or "t.co" in email_text:
            heuristic_score += 0.3
        if "urgent" in email_text.lower() or "action required" in email_text.lower():
            heuristic_score += 0.2
        if "@" in email_text and ".gov" not in email_text and any(k in email_text.lower() for k in ["official", "bank"]):
            heuristic_score += 0.4
            
        final_prob = (probability * 0.7) + (min(heuristic_score, 1.0) * 0.3)
        final_pred = 1 if final_prob > 0.5 else 0
        
        return int(final_pred), float(final_prob), keywords + ",email,content_analysis"

    def detect_upi(self, upi_text):
        """Analyse a UPI ID, payment link, or payment-related text for fraud signals."""
        upi_text = upi_text.strip()
        heuristic_score = 0.0
        signals = []

        # Normalise
        text_lower = upi_text.lower()

        # --- UPI ID format: identifier@handle (e.g. 9876543210@ybl) ---
        if "@" in upi_text and " " not in upi_text and "http" not in text_lower:
            user_part, handle = upi_text.split("@", 1)

            # Legitimate registered UPI PSP handles
            legit_handles = [
                "ybl", "oksbi", "okaxis", "okhdfcbank", "okicici", "paytm",
                "apl", "ibl", "axl", "upi", "fbl", "sbi", "allbank", "barodampay",
                "kotak", "rbl", "indus", "axisgo", "upi", "aubank", "yesbankltd",
                "pockets", "jupiteraxis", "slice", "fam", "icici", "hdfcbank"
            ]
            is_legit_handle = any(handle.lower() == h for h in legit_handles)
            is_random_handle = not is_legit_handle

            # Suspicious prefixes in UPI user part
            scam_prefixes = ["pm", "pm-india", "pmcare", "relief", "covid", "help", "donate", "fund", "charity"]
            is_scam_prefix = any(s in user_part.lower() for s in scam_prefixes)

            if is_random_handle:
                heuristic_score += 0.5
                signals.append({"label": "UPI Handle", "pass": False, "detail": f"@{handle} is not a registered PSP handle"})
            else:
                signals.append({"label": "UPI Handle", "pass": True, "detail": f"@{handle} is a registered payment service provider"})

            if is_scam_prefix:
                heuristic_score += 0.4
                signals.append({"label": "UPI Username", "pass": False, "detail": f"'{user_part}' uses known scam charity/relief bait keywords"})
            else:
                signals.append({"label": "UPI Username", "pass": True, "detail": f"'{user_part}' looks like a normal identifier"})

            # Collect request scams — if someone asks you to "scan to pay" for a refund
            signals.append({"label": "Transaction Type", "pass": True, "detail": "UPI ID scan — ensure YOU are initiating payment, never scan QR sent by strangers for 'refunds'"})

        # --- UPI deep link / payment URL ---
        elif "upi://" in text_lower or "pay?" in text_lower or "pa=" in text_lower:
            heuristic_score += 0.6
            signals.append({"label": "Payment Link", "pass": False, "detail": "Deep-link UPI payment URLs are commonly used in collect-scams and fake refund fraud"})
            if "am=" in text_lower:
                signals.append({"label": "Pre-set Amount", "pass": False, "detail": "Amount is pre-filled — scam links often lock in high amounts"})
            else:
                signals.append({"label": "Pre-set Amount", "pass": True, "detail": "No pre-filled amount detected"})

        # --- Generic payment text: look for urgency and suspicious phrases ---
        else:
            prediction, probability_spam, keywords = self.detect_spam(upi_text)
            heuristic_score += probability_spam * 0.5

            urgent_phrases = ["transfer now", "send money", "refund", "cashback", "prize", "won", "lottery", "otp", "pin"]
            found = [p for p in urgent_phrases if p in text_lower]
            if found:
                heuristic_score += min(len(found) * 0.2, 0.6)
                signals.append({"label": "Urgent Phrase", "pass": False, "detail": f"Contains scam trigger words: {', '.join(found)}"})
            else:
                signals.append({"label": "Urgent Phrase", "pass": True, "detail": "No urgency/bait phrases detected"})

            signals.append({"label": "Spam Model", "pass": prediction == 0, "detail": f"ML model score: {round(probability_spam * 100)}% spam probability"})

        final_prob = min(heuristic_score, 1.0)
        final_pred = 1 if final_prob > 0.5 else 0
        return int(final_pred), float(final_prob), signals

# Singleton
detection_service = None

def get_detection_service():
    global detection_service
    if detection_service is None:
        detection_service = DetectionService()
    return detection_service
