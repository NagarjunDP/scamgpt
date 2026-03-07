// DEMO ONLY: Putting an API key in a Chrome extension is NOT secure.
// Anyone can extract it and burn your quota/billing.
// Rotate your key after the demo and DO NOT commit it to GitHub.

const scanBtn = document.getElementById("scanBtn");
const result = document.getElementById("result");

// Paste your Gemini API key here locally (do NOT commit):
const GOOGLE_API_KEY = "AIzaSyAMmixT9lIqaI76ZjFuSbBQaMk7NNXu7B0";

// Model with quota (per your note)
const GEMINI_MODEL = "gemini-flash-latest";

function setResult(text) {
  result.innerText = text;
}

function clamp01(n) {
  const x = Number(n);
  if (!Number.isFinite(x)) return 0.5;
  return Math.max(0, Math.min(1, x));
}

function normalizeVerdict(verdict, riskScore) {
  const v = String(verdict || "").toUpperCase();
  if (v === "SCAM" || v === "SUSPICIOUS" || v === "LEGIT") return v;

  const s = clamp01(riskScore);
  if (s >= 0.7) return "SCAM";
  if (s >= 0.4) return "SUSPICIOUS";
  return "LEGIT";
}

async function geminiScanUrl(url) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    GEMINI_MODEL
  )}:generateContent?key=${encodeURIComponent(GOOGLE_API_KEY)}`;

  const prompt = `
You are ScamGPT. Classify the following URL as LEGIT, SUSPICIOUS, or SCAM.

Return STRICT JSON ONLY (no markdown, no extra text), exactly:
{
  "verdict": "LEGIT" | "SUSPICIOUS" | "SCAM",
  "risk_score": number,
  "reason": string
}

Rules:
- risk_score must be between 0 and 1 (1 = very likely scam)
- reason must be 1-2 short sentences max
- If uncertain, choose SUSPICIOUS.

Use URL-only heuristics:
- typosquatting/lookalike domains
- excessive hyphens/subdomains
- punycode (xn--)
- suspicious words: kyc, verify, login, secure, bank, support, reward, urgent
- non-https where sensitive actions are implied

URL: ${url}
`.trim();

  const body = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.2, maxOutputTokens: 180 },
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const raw = await res.text();
  if (!res.ok) throw new Error(`Gemini API error (${res.status}): ${raw}`);

  const data = JSON.parse(raw);
  const modelText =
    data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";

  if (!modelText) throw new Error("Empty response from Gemini.");

  let parsed;
  try {
    parsed = JSON.parse(modelText);
  } catch {
    // Fallback if Gemini doesn't obey JSON strictly
    return {
      verdict: "SUSPICIOUS",
      risk_score: 0.5,
      reason: modelText.slice(0, 160),
    };
  }

  const risk_score = clamp01(parsed.risk_score);
  const verdict = normalizeVerdict(parsed.verdict, risk_score);
  const reason = String(parsed.reason || "").trim() || "No reason provided.";

  return { verdict, risk_score, reason };
}

scanBtn.addEventListener("click", async () => {
  setResult("Analyzing with ScamGPT AI...");

  try {
    if (!GOOGLE_API_KEY || GOOGLE_API_KEY.includes("PASTE_")) {
      setResult("Missing GOOGLE_API_KEY. Paste your key in popup.js (demo only).");
      return;
    }

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = tab?.url;

    if (!url) {
      setResult("Could not read the current tab URL.");
      return;
    }

    if (url.startsWith("chrome://") || url.startsWith("edge://")) {
      setResult("Cannot scan browser-internal pages.");
      return;
    }

    const out = await geminiScanUrl(url);

    setResult(
      `Verdict: ${out.verdict}\n` +
        `Risk Score: ${Math.round(out.risk_score * 100)}%\n` +
        `Reason: ${out.reason}`
    );
  } catch (err) {
    setResult(`Scan failed.\n${err?.message || String(err)}`);
  }
});
