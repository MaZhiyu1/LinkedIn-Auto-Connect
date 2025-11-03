// Content script for LinkedIn Auto Connect
// This script runs on LinkedIn pages and handles the automation

let isRunning = false;
let connectionsSent = 0;
let settings = {};
let processedButtons = new Set();

console.log('LinkedIn Auto Connect: Content script loaded');

// Verify extension context is valid
if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id) {
  console.log('LinkedIn Auto Connect: Extension context verified');
} else {
  console.error('LinkedIn Auto Connect: Extension context invalid');
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'start') {
    startAutoConnect(message.settings);
    sendResponse({ status: 'started' });
  } else if (message.action === 'stop') {
    stopAutoConnect();
    sendResponse({ status: 'stopped' });
  }
  return true;
});

// Main function to start auto-connecting
async function startAutoConnect(config) {
  if (isRunning) return;

  isRunning = true;
  settings = config;
  connectionsSent = 0;
  processedButtons.clear();

  console.log('LinkedIn Auto Connect: Started');
  
  try {
    await processConnections();
  } catch (error) {
    console.error('Auto Connect Error:', error);
    chrome.runtime.sendMessage({
      action: 'error',
      error: error.message,
      connectionsSent
    });
    isRunning = false;
  }
}

// Stop the automation
function stopAutoConnect() {
  isRunning = false;
  console.log('LinkedIn Auto Connect: Stopped');
}

// Process all connection buttons on the page
async function processConnections() {
  let scrollAttempts = 0;
  const maxScrollAttempts = 20;
  let currentPage = 1;

  while (isRunning && connectionsSent < settings.maxConnections) {
    // Find all "Connect" buttons on the page
    const connectButtons = findConnectButtons();
    
    if (connectButtons.length === 0) {
      console.log('No more connect buttons found on current page');
      
      // Try scrolling to load more
      if (scrollAttempts < maxScrollAttempts) {
        await scrollPage();
        await sleep(settings.scrollDelay * 1000);
        scrollAttempts++;
        continue;
      } else {
        // No more buttons and max scroll reached
        // Try to go to next page if enabled
        if (settings.autoNextPage) {
          console.log('Attempting to navigate to next page...');
          const nextPageClicked = await clickNextPageButton();
          
          if (nextPageClicked) {
            currentPage++;
            console.log(`Navigated to page ${currentPage}`);
            
            // Wait for page to load
            await sleep(3000);
            
            // Reset scroll attempts and processed buttons for new page
            scrollAttempts = 0;
            processedButtons.clear();
            
            // Continue processing new page
            continue;
          } else {
            console.log('No next page button found - completed all pages');
            break;
          }
        } else {
          console.log('Auto next page disabled - stopping');
          break;
        }
      }
    }

    // Reset scroll attempts when we find buttons
    scrollAttempts = 0;

    // Process each button
    for (const button of connectButtons) {
      if (!isRunning || connectionsSent >= settings.maxConnections) {
        break;
      }

      // Skip if already processed
      const buttonId = getButtonId(button);
      if (processedButtons.has(buttonId)) {
        continue;
      }

      try {
        // Verify button still exists and is visible before processing
        if (!document.contains(button) || button.offsetParent === null) {
          console.log('Button no longer available, skipping');
          continue;
        }

        await processConnectionButton(button);
        processedButtons.add(buttonId);
        connectionsSent++;

        // Update stats in popup
        chrome.runtime.sendMessage({
          action: 'updateStats',
          connectionsSent
        }).catch(() => {
          // Popup might be closed, ignore error
          console.log('Could not send message to popup (popup may be closed)');
        });

        // Save progress
        await chrome.storage.local.set({ connectionsSent });

        // Random delay between actions
        const delay = getRandomDelay(settings.minDelay, settings.maxDelay);
        console.log(`Waiting ${delay.toFixed(1)}s before next action...`);
        await sleep(delay * 1000);

      } catch (error) {
        console.error('Error processing button:', error);
        // Close any open modals
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27 }));
        await sleep(500);
        // Continue with next button instead of stopping
      }
    }

    // Scroll to load more profiles on current page
    if (isRunning && connectionsSent < settings.maxConnections) {
      await scrollPage();
      await sleep(settings.scrollDelay * 1000);
    }
  }

  // Completed
  if (isRunning) {
    isRunning = false;
    chrome.runtime.sendMessage({
      action: 'updateStats',
      connectionsSent,
      completed: true
    });
    console.log(`Completed: Sent ${connectionsSent} connection requests across ${currentPage} page(s)`);
  }
}

// Find all connect buttons on the page
function findConnectButtons() {
  const buttons = [];
  
  // Try different approaches to find buttons
  const allButtons = document.querySelectorAll('button');
  
  allButtons.forEach(button => {
    const text = button.textContent.trim();
    const ariaLabel = button.getAttribute('aria-label') || '';
    
    // Check if it's a connect button
    // Must have "Connect" in text or aria-label
    // Must NOT be Following, Pending, Message, or other action buttons
    const hasConnectText = text === 'Connect' || 
                          ariaLabel.toLowerCase().includes('connect') ||
                          ariaLabel.toLowerCase().includes('invite');
    
    const isNotOtherAction = !text.includes('Following') &&
                             !text.includes('Pending') &&
                             !text.includes('Message') &&
                             !ariaLabel.includes('Following') &&
                             !ariaLabel.includes('Pending') &&
                             !ariaLabel.includes('Message');
    
    if (hasConnectText && isNotOtherAction && !button.disabled) {
      // Make sure it's visible
      const rect = button.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        buttons.push(button);
      }
    }
  });

  return buttons;
}

// Click the "Next" button to navigate to the next page
async function clickNextPageButton() {
  try {
    // Try multiple selectors for the Next button
    const nextButtonSelectors = [
      'button[aria-label="Next"]',
      'button[aria-label*="next" i]',
      'button.artdeco-pagination__button--next',
      'button:has(span:contains("Next"))',
      '.artdeco-pagination__button--next'
    ];

    let nextButton = null;

    // Try each selector
    for (const selector of nextButtonSelectors) {
      const buttons = document.querySelectorAll(selector);
      for (const button of buttons) {
        if (!button.disabled && button.offsetParent !== null) {
          nextButton = button;
          break;
        }
      }
      if (nextButton) break;
    }

    // Fallback: search for any button with "Next" in text or aria-label
    if (!nextButton) {
      const allButtons = document.querySelectorAll('button');
      for (const button of allButtons) {
        const text = button.textContent.trim().toLowerCase();
        const ariaLabel = (button.getAttribute('aria-label') || '').toLowerCase();
        
        if ((text.includes('next') || ariaLabel.includes('next')) && 
            !button.disabled && 
            button.offsetParent !== null) {
          nextButton = button;
          break;
        }
      }
    }

    if (nextButton) {
      console.log('Found Next button, clicking...');
      nextButton.click();
      return true;
    } else {
      console.log('Next button not found or disabled');
      return false;
    }
  } catch (error) {
    console.error('Error clicking next page button:', error);
    return false;
  }
}

// Process a single connect button
async function processConnectionButton(button) {
  // Get profile name components if available
  const profileNameObj = extractProfileName(button);
  const profileName = profileNameObj ? profileNameObj.fullname : null;
  
  // Click the connect button
  button.click();
  await sleep(500); // Wait for modal to appear

  // Check if "Add a note" button appears
  if (settings.addNote) {
    const addNoteButton = document.querySelector('button[aria-label="Add a note"]');
    
    if (addNoteButton) {
      addNoteButton.click();
      await sleep(500);

      // Find the note textarea - try multiple selectors
      let noteTextarea = document.querySelector('textarea[name="message"]');
      if (!noteTextarea) {
        noteTextarea = document.querySelector('textarea[id*="custom-message"]');
      }
      if (!noteTextarea) {
        noteTextarea = document.querySelector('textarea');
      }
      
      if (noteTextarea && settings.noteTemplate) {
        // Personalize the note with all available placeholders
        let note = personalizeNote(settings.noteTemplate, profileNameObj);
        
        // Set the value
        noteTextarea.focus();
        noteTextarea.value = note;
        
        // Trigger input events to notify React/LinkedIn
        noteTextarea.dispatchEvent(new Event('input', { bubbles: true }));
        noteTextarea.dispatchEvent(new Event('change', { bubbles: true }));
        
        await sleep(500);
        console.log('Added personalized note to connection request');
      } else {
        console.log('Note textarea not found');
      }
    } else {
      console.log('Add note button not found, sending without note');
    }
  }

  // Click the final "Send" or "Send without a note" button
  await sleep(500);
  
  // Try multiple selectors for the send button
  let sendButton = null;
  
  // Method 1: Look for aria-label containing "Send"
  const sendButtons = Array.from(document.querySelectorAll('button'));
  sendButton = sendButtons.find(btn => {
    const ariaLabel = btn.getAttribute('aria-label') || '';
    const text = btn.textContent.trim();
    return (
      (ariaLabel.includes('Send') || text.includes('Send')) &&
      !btn.disabled &&
      btn.offsetParent !== null // Check if visible
    );
  });

  if (sendButton) {
    sendButton.click();
    console.log(`Connection sent${profileName ? ` to ${profileName}` : ''}`);
  } else {
    console.error('Could not find send button');
    // Close modal by pressing Escape
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27 }));
    throw new Error('Could not find send button');
  }

  // Wait for modal to close
  await sleep(800);
}

// Personalize note with all available placeholders
function personalizeNote(template, nameObj) {
  if (!template) return '';
  if (!nameObj) return template;

  let note = template;
  
  // Replace {{firstname}}, {{lastname}}, {{fullname}}
  note = note.replace(/\{\{firstname\}\}/gi, nameObj.firstname || '');
  note = note.replace(/\{\{lastname\}\}/gi, nameObj.lastname || '');
  note = note.replace(/\{\{fullname\}\}/gi, nameObj.fullname || '');
  
  // Replace {name} for backward compatibility
  note = note.replace(/\{name\}/gi, nameObj.name || nameObj.firstname || '');
  
  // Clean up any double spaces that might result from empty replacements
  note = note.replace(/\s+/g, ' ').trim();
  
  return note;
}

// Extract profile name from button context
function extractProfileName(button) {
  try {
    // Try to find name in parent card
    const card = button.closest('li, div[class*="entity-result"]');
    if (card) {
      const nameElement = card.querySelector('span[aria-hidden="true"]');
      if (nameElement) {
        return parseProfileName(nameElement.textContent.trim());
      }
    }

    // Try alternative selectors
    const altName = button.closest('section')?.querySelector('span.actor-name');
    if (altName) {
      return parseProfileName(altName.textContent.trim());
    }

    // Try finding from the card's link
    const profileLink = button.closest('li, div')?.querySelector('a[href*="/in/"]');
    if (profileLink) {
      const linkText = profileLink.querySelector('span[aria-hidden="true"]');
      if (linkText) {
        return parseProfileName(linkText.textContent.trim());
      }
    }
  } catch (error) {
    console.log('Could not extract name:', error);
  }
  return null;
}

// Parse full name into components
function parseProfileName(fullName) {
  if (!fullName) return null;

  // Remove titles, credentials, and extra whitespace
  fullName = fullName
    .replace(/\s*\(.*?\)\s*/g, '') // Remove anything in parentheses
    .replace(/\s*,.*$/g, '')         // Remove anything after comma (credentials)
    .replace(/\s+/g, ' ')            // Normalize whitespace
    .trim();

  const parts = fullName.split(' ').filter(p => p.length > 0);
  
  if (parts.length === 0) return null;

  return {
    fullname: fullName,
    firstname: parts[0],
    lastname: parts.length > 1 ? parts[parts.length - 1] : '',
    // For backward compatibility
    name: parts[0]
  };
}

// Generate unique ID for button to track processed buttons
function getButtonId(button) {
  const card = button.closest('li, div[class*="entity-result"]');
  if (card) {
    const profileLink = card.querySelector('a[href*="/in/"]');
    if (profileLink) {
      return profileLink.href;
    }
  }
  // Fallback: use position in DOM
  return Array.from(document.querySelectorAll('button')).indexOf(button).toString();
}

// Scroll the page to load more content
async function scrollPage() {
  window.scrollBy({
    top: window.innerHeight * 0.8,
    behavior: 'smooth'
  });
}

// Generate random delay between min and max
function getRandomDelay(min, max) {
  return Math.random() * (max - min) + min;
}

// Sleep utility
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize - check if we should resume
chrome.storage.local.get(['isRunning', 'connectionsSent'], (result) => {
  if (result.isRunning) {
    connectionsSent = result.connectionsSent || 0;
    console.log('LinkedIn Auto Connect: Ready to resume');
  }
});