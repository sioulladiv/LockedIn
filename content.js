function blockPage() {
  document.body.innerHTML = `
    <div class="App">
      <section class="content">
        <img class="graphic" src="${chrome.runtime.getURL('images/meme.jpg')}" alt="Graphic" />
        <h1>Lock in lil bro</h1>
        <p>This website has been blocked by the LockIn Browser Extension.</p>
      </section>
    </div>
  `;
  document.head.innerHTML = `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Site Blocked</title>
    <link rel="stylesheet" href="${chrome.runtime.getURL('css/index.css')}" />
  `;
}

// Check URL on page load
const currentDomain = window.location.hostname.replace('www.', '');
chrome.runtime.sendMessage({ action: "checkURL", domain: currentDomain }, (response) => {
  if (response && response.shouldBlock) {
    blockPage();
  }
});

// Listen for dynamic blocking
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "block") {
    blockPage();
  }
});
