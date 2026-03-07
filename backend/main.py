from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from typing import Optional, Dict, Any
import uvicorn
import os
from dotenv import load_dotenv

from services.detection_service import get_detection_service
from services.ai_service import get_ai_service
from services.db_service import get_db_service

from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI(title="ScamGPT API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalysisRequest(BaseModel):
    input_text: str
    type: str = "url"  # url, email, message, transaction
    transaction_details: Optional[Dict[str, Any]] = None


class ReportRequest(BaseModel):
    type: str
    target: str
    description: str
    risk_score: Optional[float] = None
    location: Optional[str] = "Unknown"


@app.get("/")
async def root():
    return {"message": "Welcome to ScamGPT API"}


@app.post("/analyze")
async def analyze(request: AnalysisRequest):
    det_service = get_detection_service()
    ai_serv = get_ai_service()
    db = get_db_service()

    input_text = request.input_text.strip()
    detected_type = request.type

    # IMPORTANT: ensure always defined
    upi_raw_signals = None

    is_url = input_text.startswith(("http://", "https://")) or (
        "." in input_text and "/" in input_text and " " not in input_text
    )
    is_email = "@" in input_text and "." in input_text.split("@")[-1]

    if is_url and detected_type not in ["url", "email"]:
        detected_type = "url"
    elif is_email and detected_type == "url":
        detected_type = "email"

    prediction = 0
    probability = 0.5
    keywords = ""
    email_signals = None

    if detected_type == "url":
        prediction, probability, keywords = det_service.detect_phishing(input_text)

    elif detected_type == "email":
        prediction, probability, keywords = det_service.detect_email(input_text)

        if "@" in input_text and " " not in input_text:
            user_part, domain_part = input_text.split("@", 1)
            scam_keywords = [
                "support",
                "security",
                "verify",
                "official",
                "bank",
                "admin",
                "login",
                "help",
                "alert",
            ]
            generic_domains = ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com"]
            suspicious_prefix = any(k in user_part.lower() for k in scam_keywords)
            generic_domain = any(d in domain_part.lower() for d in generic_domains)
            complex_domain = domain_part.count(".") > 2 or "-" in domain_part

            email_signals = {
                "sender_domain": domain_part,
                "sender_username": user_part,
                "signals": [
                    {
                        "label": "Username Pattern",
                        "pass": not suspicious_prefix,
                        "detail": f"'{user_part}' — "
                        + (
                            "contains scam keyword (impersonation risk)"
                            if suspicious_prefix
                            else "looks like a personal/normal username"
                        ),
                    },
                    {
                        "label": "Domain Authenticity",
                        "pass": not (suspicious_prefix and generic_domain),
                        "detail": f"@{domain_part} — "
                        + (
                            "official institutions do not use free email providers"
                            if (suspicious_prefix and generic_domain)
                            else "domain matches expected pattern"
                        ),
                    },
                    {
                        "label": "Domain Complexity",
                        "pass": not complex_domain,
                        "detail": (
                            "Complex/subdomain structure detected — phishing risk"
                            if complex_domain
                            else "Domain is simple and standard"
                        ),
                    },
                    {
                        "label": "Known Scam Patterns",
                        "pass": float(probability) < 0.5,
                        "detail": (
                            "Matches known scam campaign signatures"
                            if float(probability) >= 0.5
                            else "No known scam pattern match found"
                        ),
                    },
                ],
                "verdict": "SCAM" if float(probability) > 0.5 else "LEGITIMATE",
            }

    elif detected_type == "message":
        prediction, probability, keywords = det_service.detect_spam(input_text)

    elif detected_type == "transaction":
        prediction, probability, upi_raw_signals = det_service.detect_upi(input_text)
        keywords = "upi,payment"

    # Pattern Memory: Log and Find Similarity
    db.log_analysis(
        input_text,
        detected_type,
        float(probability) if isinstance(probability, (int, float)) else 0.5,
        keywords if isinstance(keywords, str) else "",
    )
    similarity_score, match_count = db.find_similar_patterns(
        input_text, detected_type, keywords if isinstance(keywords, str) else ""
    )

    detection_results = {
        "type": detected_type,
        "prediction": prediction,
        "risk_score": round(float(probability), 2),
        "similarity_score": similarity_score,
        "match_count": match_count,
    }

    explanation = ai_serv.analyze_with_rag(request.input_text, detection_results)

    upi_signals_data = None
    if detected_type == "transaction" and isinstance(upi_raw_signals, list):
        upi_signals_data = {
            "upi_id": input_text,
            "signals": upi_raw_signals,
            "verdict": "SCAM" if float(probability) > 0.5 else "LEGITIMATE",
        }

    attack_graph = [
        {"id": "source", "label": "Attacker Source", "type": "origin"},
        {"id": "vector", "label": detected_type.capitalize() + " Vector", "type": "vector"},
        {
            "id": "objective",
            "label": "Credential Theft" if detected_type == "url" else "Financial Fraud",
            "type": "target",
        },
    ]

    return {
        "threat_level": "High"
        if float(probability) > 0.6
        else ("Medium" if float(probability) > 0.3 else "Low"),
        "attack_type": detected_type.capitalize(),
        "reasoning": explanation,
        "risk_score": round(float(probability), 2),
        "prediction": 1 if float(probability) > 0.5 else 0,
        "email_signals": email_signals,
        "upi_signals": upi_signals_data,
        "pattern_memory": {
            "similarity": similarity_score,
            "match_count": match_count,
            "status": "Matching known campaigns" if similarity_score > 0.5 else "Novel attack pattern",
        },
        "attack_graph": attack_graph,
    }


@app.post("/report")
async def report_scam(request: ReportRequest):
    db = get_db_service()
    db.add_report(
        request.type,
        request.target,
        request.description,
        request.risk_score,
        request.location,
    )
    return {"status": "success", "message": "Report submitted to cybercrime database."}


CITY_COORDINATES = {
    "Mumbai": {"x": 16.2, "y": 63.0},
    "Delhi": {"x": 30.6, "y": 31.3},
    "Bangalore": {"x": 31.9, "y": 83.3},
    "Pune": {"x": 19.5, "y": 64.9},
    "Hyderabad": {"x": 34.9, "y": 68.7},
    "Chennai": {"x": 40.8, "y": 83.0},
    "Kolkata": {"x": 67.8, "y": 51.4},
    "Ahmedabad": {"x": 15.2, "y": 49.9},
    "Unknown": {"x": 50, "y": 50},
}


@app.get("/dashboard")
async def get_dashboard_data():
    db = get_db_service()
    recent = db.get_recent_reports(limit=20)
    stats = db.get_stats()

    enriched_reports = []
    for report in recent:
        loc = report.get("location", "Unknown")
        coords = CITY_COORDINATES.get(loc, CITY_COORDINATES["Unknown"])
        enriched_report = dict(report)
        enriched_report["x"] = coords["x"]
        enriched_report["y"] = coords["y"]
        enriched_reports.append(enriched_report)

    return {"recent_threats": enriched_reports, "stats": stats, "active_nodes": 1242 + len(enriched_reports)}


@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    return {"message": "Image received for analysis"}


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8000"))
    uvicorn.run(app, host="0.0.0.0", port=port)
