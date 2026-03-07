const scanBtn = document.getElementById("scanBtn");
const result = document.getElementById("result");

const BACKEND_URL = "http://localhost:8000/analyze";

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

function extractVerdictFromBackend(data) {
  // Backend may return different fields; handle safely.
  const risk = clamp01(
    data?.risk_score ?? data?.probability ?? data?.score ?? 0.5
  );

  // If backend explicitly gives a verdict, use it; else derive from risk.
  const verdictRaw = data?.verdict ?? data?.prediction_label ?? data?.threat_label;
  const verdict = normalizeVerdict(verdictRaw, risk);

  const reason =
    String(
      data?.reason ||
        data?.reasoning ||
        data?.explanation ||
        data?.message ||
        ""
    ).trim() || "No explanation returned (backend online scan).";

  return { verdict, risk_score: risk, reason };
}

async function backendScanUrl(url) {
  const res = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input_text: url, type: "url" }),
  });

  const raw = await res.text();
  if (!res.ok) throw new Error(`Backend error (${res.status}): ${raw}`);

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error(`Backend returned non-JSON: ${raw.slice(0, 200)}`);
  }

  return extractVerdictFromBackend(data);
}

scanBtn.addEventListener("click", async () => {
  setResult("Analyzing with ScamGPT (local backend)...");

  try {
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

    const out = await backendScanUrl(url);

    setResult(
      `Verdict: ${out.verdict}\n` +
        `Risk Score: ${Math.round(out.risk_score * 100)}%\n` +
        `Reason: ${out.reason}`
    );
  } catch (err) {
    setResult(`Scan failed.\n${err?.message || String(err)}`);
  }
});
