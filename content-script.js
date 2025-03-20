// This script runs in the context of the web page
function injectScript(filePath) {
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", chrome.runtime.getURL(filePath));
  document.documentElement.appendChild(script);
  script.remove();
}

// Check if WhatsApp Web is loaded
function checkWhatsAppLoaded() {
  if (document.querySelector("h1")) {
    clearInterval(checkInterval);
    injectScript("injected.js");
    console.log("WhatsApp Heart Favorites extension loaded");
  }
}

// Check periodically if WhatsApp is loaded
const checkInterval = setInterval(checkWhatsAppLoaded, 1000);
