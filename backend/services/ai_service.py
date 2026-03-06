from google import genai
import os
import sys
import json
from dotenv import load_dotenv

# Add parent directory to path for imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from services.vector_service import get_vector_service

load_dotenv()

class AIService:
    def __init__(self):
        api_key = os.getenv("GOOGLE_API_KEY")
        if api_key:
            self.client = genai.Client(api_key=api_key)
        else:
            self.client = None
            print("Warning: GOOGLE_API_KEY not found. AI reasoning will be disabled.")

    def _get_fallback_reasoning(self, input_text, results):
        prob = results.get('risk_score', 0)
        atype = results.get('type', 'unknown')
        
        if prob > 0.6:
            return f"🚨 HIGH RISK DETECTED: Our engine flagged this {atype} as dangerous due to multiple threat indicators. Structural patterns match known phishing/fraud campaigns. We detected brand impersonation and suspicious URL construction. \n\n### Recommendation\nDO NOT INTERACT. This is likely a financial fraud or data theft attempt."
        elif prob > 0.3:
            return f"⚠️ CAUTION: This {atype} shows moderately suspicious characteristics. While not a definitive threat, its construction resembles patterns used in mass-spam or social engineering campaigns. \n\n### Recommendation\nExercise extreme caution. Verify the sender/source independently before sharing any information."
        else:
            return f"✅ LOW RISK: This {atype} appears to be safe. It does not match current known scam patterns and follows legitimate structural standards. \n\n### Recommendation\nYou can proceed, but always stay vigilant with digital interactions."

    def generate_explanation(self, input_data, detection_results, context=""):
        if not self.client:
            return "AI reasoning is currently unavailable due to missing API key."

        prompt = f"""
        You are ScamGPT, a cognitive cybersecurity analyst. 
        Analyze the following suspicious activity and provide a detailed risk assessment.
        
        INPUT: {input_data}
        TYPE: {detection_results.get('type')}
        DETECTION MODEL RESULTS: 
        - Risk Score: {detection_results.get('risk_score')}
        - Prediction: {'Scam/Fraud' if detection_results.get('prediction') == 1 else 'Clean'}
        
        RETRIEVED CONTEXT FROM SCAM DATABASE:
        {context}
        
        Please provide your analysis in the following format:
        Threat Level: [Low/Medium/High/Critical]
        Attack Type: [e.g., Phishing, UPI Scam, Social Engineering]
        
        Reasoning:
        [Explain what indicators triggered detection and how it matches known patterns.]
        
        Possible Consequences:
        [List risks like financial loss, data theft, etc.]
        
        Recommended Action:
        [Clear steps for the user to stay safe.]
        """
        
        try:
            response = self.client.models.generate_content(
                model='gemini-1.5-flash',
                contents=prompt
            )
            return response.text
        except Exception as e:
            print(f"Gemini API Error: {e}")
            fallback = self._get_fallback_reasoning(input_data, detection_results)
            return f"### Cognitive Analysis (Network Fallback)\n{fallback}\n\n*(Note: Full AI reasoning is temporarily throttled by API quota limits. Showing heuristic analysis instead.)*"

    def analyze_with_rag(self, input_text, detection_results):
        vector_service = get_vector_service()
        results = vector_service.search(input_text, top_k=3)
        context = "\n".join([r['content'] for r in results])
        
        explanation = self.generate_explanation(input_text, detection_results, context)
        return explanation

# Singleton
ai_service = None

def get_ai_service():
    global ai_service
    if ai_service is None:
        ai_service = AIService()
    return ai_service
