import tldextract
import re
from urllib.parse import urlparse

def extract_url_features(url):
    """
    Extract features from a URL for phishing detection.
    This should match some of the features in the ARFF dataset if possible,
    or at least provide enough signal.
    """
    features = {}
    parsed = urlparse(url)
    ext = tldextract.extract(url)
    
    features['url_length'] = len(url)
    features['having_at_symbol'] = 1 if '@' in url else -1
    features['double_slash_redirecting'] = 1 if url.rfind('//') > 7 else -1
    features['prefix_suffix'] = 1 if '-' in ext.domain else -1
    features['having_sub_domain'] = 1 if len(ext.subdomain.split('.')) > 1 else (-1 if not ext.subdomain else 0)
    
    # Brand/Institutional impersonation detection
    banks = ['sbi', 'hdfc', 'icici', 'axis', 'canarabank', 'kotak', 'pnb', 'bob', 'paypal', 'irs', 'tax', 'binance', 'coinbase']
    brand_match = any(bank in url.lower() for bank in banks)
    features['brand_impersonation'] = 1 if brand_match else -1
    
    # Keyword detection
    suspicious_words = ['login', 'verify', 'update', 'secure', 'account', 'bank', 'pay', 'wallet', 'win', 'gift', 'prize', 'offer', 'kyc', 'support', 'helpdesk', 'refund', 'tax', 'irs', 'urgent', 'limited']
    detected_keywords = [kw for kw in suspicious_words if kw in url.lower()]
    features['suspicious_keywords_count'] = len(detected_keywords)
    features['keywords'] = ",".join(detected_keywords)
    
    # TLD analysis
    suspicious_tlds = ['.xyz', '.top', '.pw', '.bit', '.win', '.buzz', '.loan', '.click', '.zip', '.mov']
    features['suspicious_tld'] = 1 if any(url.lower().endswith(tld) or (tld + '/') in url.lower() for tld in suspicious_tlds) else -1

    # Typo detection
    typo_patterns = [r'(.)\1{2,}', r'bankk', r'payy', r'rupeee', r'vverify', r'uupdate']
    features['has_obvious_typo'] = 1 if any(re.search(p, url.lower()) for p in typo_patterns) else -1

    return features

def extract_message_features(text):
    """
    Extract features from SMS/Email text with high-fidelity scam patterns.
    """
    features = {}
    text_lower = text.lower()
    features['length'] = len(text)
    
    # Check for urgency/fear keywords
    urgency_words = ['urgent', 'win', 'prize', 'limited', 'now', 'action', 'suspended', 'congratulations', 'blocked', 'closed', 'expired', 'notice']
    detected_urgency = [word for word in urgency_words if word in text_lower]
    features['urgency_score'] = len(detected_urgency)
    
    # Check for institutional lures
    institutions = ['irs', 'bank', 'kyc', 'tax', 'refund', 'payment', 'government', 'police', 'support', 'amazon', 'netflix']
    detected_institutions = [word for word in institutions if word in text_lower]
    features['institution_lure'] = 1 if detected_institutions else 0
    
    # Combined keywords for storage
    features['keywords'] = ",".join(detected_urgency + detected_institutions)
    
    # Check for malicious link indicators within text
    malicious_indicator = 1 if any(tld in text_lower for tld in ['.xyz', '.top', '.pw', 'bit.ly', 't.co', 'tinyurl']) else 0
    features['has_suspicious_link'] = malicious_indicator
    
    # Check for currency symbols or numbers that look like money
    features['has_money'] = 1 if re.search(r'[\$£€]|rs|inr|\d+(\.\d{2})?', text_lower) else 0
    
    return features

def extract_transaction_features(txn):
    """
    Extract features from transaction data.
    """
    # Assuming txn is a dict with details
    features = {}
    features['amount'] = txn.get('amount', 0)
    # Add more logic based on upi_transactions_2024.csv columns
    return features
