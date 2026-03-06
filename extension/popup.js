const scanBtn = document.getElementById("scanBtn");
const result = document.getElementById("result");

scanBtn.addEventListener("click", async () => {

  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  const url = tab.url;

  result.innerText = "Analyzing with ScamGPT AI...";

  try {

    const response = await fetch("https://your-backend-api.com/analyze/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    });

    const data = await response.json();

    result.innerText =
      "Risk Score: " + data.risk_score +
      "\nThreat: " + data.threat_type;

  } catch (err) {

    result.innerText = "API connection failed.";

  }

});
