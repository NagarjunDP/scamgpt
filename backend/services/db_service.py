import sqlite3
import os
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "scamgpt.db")

class DBService:
    def __init__(self):
        self._init_db()

    def _init_db(self):
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS reports (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                type TEXT NOT NULL,
                target TEXT NOT NULL,
                description TEXT,
                risk_score REAL,
                location TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS analysis_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                input_text TEXT NOT NULL,
                attack_type TEXT,
                risk_score REAL,
                keywords TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Add some initial mockup data for the dashboard if empty
        cursor.execute("SELECT COUNT(*) FROM reports")
        if cursor.fetchone()[0] == 0:
            mock_data = [
                ('Url', 'https://secure-bank-verify.com', 'Fake login page targeting SBI users.', 0.89, 'Mumbai'),
                ('Message', 'upi://pay?pa=earn-rewards@upi', 'Scam UPI payment link in SMS.', 0.95, 'Delhi'),
                ('Transaction', 'Merchant: XYZ_PAY', 'Suspicious cross-border transaction.', 0.72, 'Bangalore'),
                ('Url', 'http://kyc-update-now.net', 'KYC expiration scam.', 0.81, 'Pune'),
                ('Message', 'Win 50k gift card! Click http://win.prize', 'Social engineering via SMS.', 0.88, 'Hyderabad')
            ]
            cursor.executemany('''
                INSERT INTO reports (type, target, description, risk_score, location)
                VALUES (?, ?, ?, ?, ?)
            ''', mock_data)
            
        conn.commit()
        conn.close()

    def add_report(self, report_type, target, description, risk_score=None, location=None):
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO reports (type, target, description, risk_score, location)
            VALUES (?, ?, ?, ?, ?)
        ''', (report_type, target, description, risk_score, location))
        conn.commit()
        conn.close()
        return True

    def get_recent_reports(self, limit=10):
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM reports ORDER BY timestamp DESC LIMIT ?', (limit,))
        rows = cursor.fetchall()
        reports = [dict(row) for row in rows]
        conn.close()
        return reports

    def get_stats(self):
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('SELECT type, COUNT(*) FROM reports GROUP BY type')
        stats = dict(cursor.fetchall())
        conn.close()
        return stats

    def log_analysis(self, input_text, attack_type, risk_score, keywords=""):
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO analysis_history (input_text, attack_type, risk_score, keywords)
            VALUES (?, ?, ?, ?)
        ''', (input_text, attack_type, risk_score, keywords))
        conn.commit()
        conn.close()

    def find_similar_patterns(self, input_text, attack_type, keywords=""):
        """
        Simple keyword and type based similarity check.
        Returns the highest similarity score and a count of related matches.
        """
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        # Search for same attack type with high risk scores
        cursor.execute('''
            SELECT * FROM analysis_history 
            WHERE attack_type = ? AND risk_score > 0.6
            ORDER BY timestamp DESC LIMIT 50
        ''', (attack_type,))
        
        matches = cursor.fetchall()
        
        max_similarity = 0.0
        match_count = 0
        
        input_keywords = set(keywords.lower().split(',')) if keywords else set()
        
        for match in matches:
            match_keywords = set(match['keywords'].lower().split(',')) if match['keywords'] else set()
            
            # Simple Jaccard similarity for keywords
            if input_keywords and match_keywords:
                intersection = input_keywords.intersection(match_keywords)
                union = input_keywords.union(match_keywords)
                similarity = len(intersection) / len(union) if union else 0
                
                if similarity > 0.3:
                    match_count += 1
                    max_similarity = max(max_similarity, similarity)
            
            # Or if text is very similar
            if input_text.lower() in match['input_text'].lower() or match['input_text'].lower() in input_text.lower():
                match_count += 1
                max_similarity = max(max_similarity, 0.85)

        conn.close()
        
        # Cap similarity based on matches
        if match_count > 5:
            max_similarity = min(0.98, max_similarity + 0.1)
            
        return round(max_similarity, 2), match_count

# Singleton
db_service = None

def get_db_service():
    global db_service
    if db_service is None:
        db_service = DBService()
    return db_service
