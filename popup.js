// DOM Elements
const addNoteCheckbox = document.getElementById('addNoteCheckbox');
const noteTemplate = document.getElementById('noteTemplate');
const autoNextPageCheckbox = document.getElementById('autoNextPageCheckbox');
const minDelay = document.getElementById('minDelay');
const maxDelay = document.getElementById('maxDelay');
const maxConnections = document.getElementById('maxConnections');
const scrollDelay = document.getElementById('scrollDelay');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const stats = document.getElementById('stats');

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
  // Load saved settings
  const settings = await chrome.storage.local.get([
    'addNote',
    'noteTemplate',
    'autoNextPage',
    'minDelay',
    'maxDelay',
    'maxConnections',
    'scrollDelay',
    'isRunning',
    'connectionsSent'
  ]);

  // Apply saved settings or defaults
  addNoteCheckbox.checked = settings.addNote || false;
  noteTemplate.value = settings.noteTemplate || "Hi {{firstname}}, I'd love to connect and expand my professional network!";
  autoNextPageCheckbox.checked = settings.autoNextPage !== undefined ? settings.autoNextPage : true;
  minDelay.value = settings.minDelay || 3;
  maxDelay.value = settings.maxDelay || 7;
  maxConnections.value = settings.maxConnections || 20;
  scrollDelay.value = settings.scrollDelay || 2;

  noteTemplate.disabled = !addNoteCheckbox.checked;

  // Update UI based on current status
  updateStatus(settings.isRunning || false, settings.connectionsSent || 0);
});

// Toggle note template textarea
addNoteCheckbox.addEventListener('change', async () => {
  noteTemplate.disabled = !addNoteCheckbox.checked;
  await saveSettings();
});

// Save auto next page setting
autoNextPageCheckbox.addEventListener('change', saveSettings);

// Save settings on change
[minDelay, maxDelay, maxConnections, scrollDelay, noteTemplate].forEach(element => {
  element.addEventListener('change', saveSettings);
});

// Start button handler
startBtn.addEventListener('click', async () => {
  // Validate settings
  const min = parseInt(minDelay.value);
  const max = parseInt(maxDelay.value);

  if (min >= max) {
    alert('Min delay must be less than max delay!');
    return;
  }

  if (min < 2) {
    alert('Min delay should be at least 2 seconds for safety!');
    return;
  }

  // Save settings
  await saveSettings();

  // Get current tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab) {
    alert('Could not access current tab. Please refresh and try again.');
    return;
  }

  if (!tab.url || !tab.url.includes('linkedin.com')) {
    alert('Please navigate to a LinkedIn page first!');
    return;
  }

  // Update status
  await chrome.storage.local.set({ 
    isRunning: true,
    connectionsSent: 0
  });

  try {
    // Send message to content script to start
    await chrome.tabs.sendMessage(tab.id, { 
      action: 'start',
      settings: {
        addNote: addNoteCheckbox.checked,
        noteTemplate: noteTemplate.value,
        autoNextPage: autoNextPageCheckbox.checked,
        minDelay: parseInt(minDelay.value),
        maxDelay: parseInt(maxDelay.value),
        maxConnections: parseInt(maxConnections.value),
        scrollDelay: parseInt(scrollDelay.value)
      }
    });

    updateStatus(true, 0);
  } catch (error) {
    console.error('Failed to start automation:', error);
    alert('Failed to start. Please refresh the LinkedIn page and try again.');
    await chrome.storage.local.set({ isRunning: false });
    updateStatus(false, 0);
  }
});

// Stop button handler
stopBtn.addEventListener('click', async () => {
  // Get current tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Update status
  await chrome.storage.local.set({ isRunning: false });

  // Send message to content script to stop
  if (tab && tab.url && tab.url.includes('linkedin.com')) {
    try {
      await chrome.tabs.sendMessage(tab.id, { action: 'stop' });
    } catch (error) {
      console.log('Could not send stop message (content script may not be loaded)');
    }
  }

  const { connectionsSent } = await chrome.storage.local.get('connectionsSent');
  updateStatus(false, connectionsSent || 0);
});

// Save settings to storage
async function saveSettings() {
  await chrome.storage.local.set({
    addNote: addNoteCheckbox.checked,
    noteTemplate: noteTemplate.value,
    autoNextPage: autoNextPageCheckbox.checked,
    minDelay: parseInt(minDelay.value),
    maxDelay: parseInt(maxDelay.value),
    maxConnections: parseInt(maxConnections.value),
    scrollDelay: parseInt(scrollDelay.value)
  });
}

// Update UI status
function updateStatus(isRunning, connectionsSent) {
  if (isRunning) {
    statusDot.classList.add('active');
    statusText.textContent = 'Running...';
    startBtn.disabled = true;
    stopBtn.disabled = false;
  } else {
    statusDot.classList.remove('active');
    statusText.textContent = 'Inactive';
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
  stats.textContent = `${connectionsSent} sent`;
}

// Listen for updates from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateStats') {
    stats.textContent = `${message.connectionsSent} sent`;
    
    if (message.completed) {
      updateStatus(false, message.connectionsSent);
      chrome.storage.local.set({ isRunning: false });
      alert(`Completed! Sent ${message.connectionsSent} connection requests.`);
    }
  }
  
  if (message.action === 'error') {
    updateStatus(false, message.connectionsSent || 0);
    chrome.storage.local.set({ isRunning: false });
    alert(`Error: ${message.error}`);
  }
});