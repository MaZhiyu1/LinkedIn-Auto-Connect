// Background service worker for LinkedIn Auto Connect

// Initialize extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('LinkedIn Auto Connect installed');
  
  // Set default settings
  chrome.storage.local.set({
    addNote: false,
    noteTemplate: "Hi {{firstname}}, I'd love to connect and expand my professional network!",
    autoNextPage: true,
    minDelay: 3,
    maxDelay: 7,
    maxConnections: 20,
    scrollDelay: 2,
    isRunning: false,
    connectionsSent: 0
  });
});

// Listen for tab updates to reset state if user navigates away
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && !tab.url.includes('linkedin.com')) {
    // User navigated away from LinkedIn, stop if running
    chrome.storage.local.get('isRunning', (result) => {
      if (result.isRunning) {
        chrome.storage.local.set({ isRunning: false });
      }
    });
  }
});

// Handle messages from content script and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateStats') {
    // Forward stats update to popup if open
    chrome.runtime.sendMessage(message).catch(() => {
      // Popup might be closed, ignore error
    });
  }
  
  if (message.action === 'error') {
    // Log errors
    console.error('LinkedIn Auto Connect Error:', message.error);
    chrome.storage.local.set({ isRunning: false });
  }
  
  return true;
});

// Clean up on extension unload
chrome.runtime.onSuspend.addListener(() => {
  chrome.storage.local.set({ isRunning: false });
});