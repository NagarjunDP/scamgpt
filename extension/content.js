console.log("ScamGPT protection active");

const warning = document.createElement("div");

warning.style.position = "fixed";
warning.style.bottom = "20px";
warning.style.right = "20px";
warning.style.background = "#111827";
warning.style.color = "white";
warning.style.padding = "10px";
warning.style.borderRadius = "6px";
warning.style.zIndex = "9999";
warning.innerText = "ScamGPT Protection Active";

document.body.appendChild(warning);
