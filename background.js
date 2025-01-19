let bannedSites = [];

// Load banned sites
fetch(chrome.runtime.getURL('BannedWebsites.txt'))
  .then(response => response.text())
  .then(text => {
    bannedSites = text.split('\n').filter(site => site.trim() !== '');
  });

// Check if a domain should be blocked
function shouldBlockDomain(domain) {
  return bannedSites.some(site => domain.includes(site.trim()));
}

// Handle navigation
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    const domain = new URL(changeInfo.url).hostname.replace('www.', '');
    if (shouldBlockDomain(domain)) {
      chrome.tabs.update(tabId, {
        url: chrome.runtime.getURL('blocked.html')
      });
    }
  }
});

// Handle initial navigation
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId === 0) {  // Main frame only
    const domain = new URL(details.url).hostname.replace('www.', '');
    if (shouldBlockDomain(domain)) {
      chrome.tabs.update(details.tabId, {
        url: chrome.runtime.getURL('blocked.html')
      });
    }
  }
});
