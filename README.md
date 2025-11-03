# 🤝 LinkedIn Auto Connect

> A Chrome extension that automates sending connection requests on LinkedIn with optional personalized notes.

---

## ⚠️ Important Disclaimer

**USE THIS TOOL RESPONSIBLY!**

LinkedIn has daily limits on connection requests (typically 100-200 per day). Excessive or inappropriate use may result in:

- ⛔ Temporary restrictions on your LinkedIn account
- 🚫 Permanent account suspension
- 📛 Being flagged as spam

This tool is for **educational purposes** and **personal productivity** only. Always follow [LinkedIn's Terms of Service](https://www.linkedin.com/legal/user-agreement) and [Professional Community Policies](https://www.linkedin.com/legal/professional-community-policies).

---

## ✨ Features

- 🔄 **Automatic Connection Requests** - Finds and clicks "Connect" buttons automatically
- 📄 **Multi-Page Support** - Automatically navigates through multiple search result pages
- 📝 **Personalized Notes** - Add custom messages with name placeholders ({{firstname}}, {{lastname}}, {{fullname}})
- ⚙️ **Customizable Settings** - Control delays, limits, and automation behavior
- 🛡️ **Safety Features** - Built-in rate limiting with randomized human-like delays
- 📊 **Real-time Statistics** - Track connection requests sent in current session
- ⏸️ **Pause/Resume** - Stop and restart automation at any time
- 🔒 **Privacy-First** - No data collection, everything stays local
- 🚀 **Auto-Injection** - Automatically loads content script if missing

---

## 📋 Table of Contents

- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Usage Guide](#-usage-guide)
- [Configuration](#-configuration)
- [Personalization](#-personalization)
- [Safety Tips](#-safety-tips)
- [Troubleshooting](#-troubleshooting)
- [Technical Details](#-technical-details)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Installation

### Prerequisites

- Google Chrome browser (version 88 or higher)
- Active LinkedIn account
- Basic understanding of Chrome extensions

### Step-by-Step Installation

#### 1. Download the Extension

```bash
# Clone the repository
git clone https://github.com/yourusername/linkedin-auto-connect.git

# Navigate to the directory
cd linkedin-auto-connect
```

Or download as ZIP and extract to a folder.

#### 2. Create Extension Icons

Create an `icons/` folder in the extension directory and add three icon files:

- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

**Quick Icon Creation:**

- Use any image editor (Paint, GIMP, Photoshop)
- Fill with LinkedIn blue (#0077B5)
- Add white "LN" text or simple design
- Save as PNG

**Or use placeholder icons:**

```bash
# You can use any simple colored square images for testing
# Just name them correctly and place in icons/ folder
```

#### 3. Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **"Developer mode"** (toggle in top-right corner)
3. Click **"Load unpacked"**
4. Select the `linkedin-auto-connect` folder
5. The extension icon should appear in your Chrome toolbar

#### 4. Verify Installation

- Check that extension appears in `chrome://extensions/`
- Version should show **1.0.1**
- Status should show **"Enabled"**

---

## 🎯 Quick Start

### 5-Minute Setup

1. **Install the extension** (see above)
2. **Go to LinkedIn** - Navigate to any of these pages:
   - Search results: `linkedin.com/search/results/people/`
   - My Network: `linkedin.com/mynetwork/`
   - Company employee lists
3. **Open the extension** - Click the extension icon in Chrome toolbar
4. **Configure settings** (optional):
   - Leave defaults for first test
   - Or customize delays and limits
5. **Click "Start"** - Automation begins immediately
6. **Monitor progress** - Watch the counter update in real-time
7. **Click "Stop"** when done or when limit is reached

### First Test Run

For your first test, use these conservative settings:

- **Max per Session**: 5-10 connections
- **Min Delay**: 5 seconds
- **Max Delay**: 10 seconds
- **Add Note**: Unchecked (start without notes)

This lets you verify everything works before scaling up.

---

## 📖 Usage Guide

### Where to Use the Extension

The extension works on these LinkedIn pages:

✅ **Recommended Pages:**

- Search results (people search)
- My Network suggestions
- "People You May Know"
- Alumni pages
- Company employee directories
- Conference attendee lists

❌ **Not Recommended:**

- Individual profile pages (no bulk connect buttons)
- Messaging pages
- Feed/timeline pages

### Basic Workflow

1. **Navigate to target page** on LinkedIn
2. **Refresh the page** (F5) to ensure content script loads
3. **Open extension** by clicking the icon
4. **Review settings** and adjust if needed
5. **Click "Start"** button
6. **Extension will:**
   - Find all "Connect" buttons on page
   - Click each button with delays
   - Add notes if enabled
   - Scroll to load more profiles
   - Navigate to next page if enabled
   - Stop when limit reached or no more buttons found
7. **Click "Stop"** to pause anytime
8. **Review statistics** to see connections sent

### Advanced Usage

#### Targeting Specific People

1. Use LinkedIn's search filters to narrow results:
   - Location
   - Industry
   - Company
   - School
   - Connections (2nd degree)
2. Start extension on filtered results
3. All visible "Connect" buttons will be processed

#### Multi-Session Strategy

**Morning Session:**

- Max 20-30 connections
- Target industry peers
- Use personalized notes

**Afternoon Session:**

- Max 20-30 connections
- Target different location/industry
- Use different note template

**Total:** 40-60 connections per day (safe range)

#### Bulk Connection Campaigns

For larger campaigns (50+ connections):

1. Spread over multiple days
2. Use 5-7 second delays
3. Vary your note templates
4. Target diverse audiences
5. Monitor for any LinkedIn warnings

---

## ⚙️ Configuration

### Settings Explanation

#### Add Custom Note

- **Toggle**: Enable/disable personalized notes
- **Default**: Disabled
- **Note**: Adding notes significantly increases connection acceptance rate
- **Limit**: LinkedIn allows 300 characters per note

#### Note Template

- **Purpose**: Your custom message to connections
- **Placeholders**: Use `{{firstname}}`, `{{lastname}}`, `{{fullname}}`, or `{name}`
- **Best Practice**: Keep it professional, brief, and relevant
- **Example**: `Hi {{firstname}}, I'd love to connect and learn from your experience in {{industry}}!`

#### Auto-Navigate to Next Page

- **Toggle**: Enable/disable automatic page navigation
- **Default**: Enabled
- **Behavior**: Clicks "Next" button when current page is exhausted
- **Use Case**: Process multiple pages of search results automatically

#### Min Delay (seconds)

- **Range**: 2-10 seconds
- **Default**: 3 seconds
- **Purpose**: Minimum wait time between actions
- **Recommendation**: Keep ≥3 seconds for safety

#### Max Delay (seconds)

- **Range**: 3-15 seconds
- **Default**: 7 seconds
- **Purpose**: Maximum wait time between actions
- **Behavior**: Random delay between min and max creates human-like pattern

#### Max per Session

- **Range**: 1-100 connections
- **Default**: 20
- **Purpose**: Limit connections sent in one automation run
- **Safety**: LinkedIn's daily limit is ~100-200, so keep sessions modest

#### Scroll Delay (seconds)

- **Range**: 1-5 seconds
- **Default**: 2 seconds
- **Purpose**: Wait time after scrolling to load more content
- **Behavior**: Allows LinkedIn's infinite scroll to load more profiles

### Recommended Settings by Use Case

#### Conservative (Safest)

```
Add Note: ✓ Enabled
Min Delay: 5 sec
Max Delay: 10 sec
Max per Session: 10-15
Auto Next Page: ✓ Enabled
Scroll Delay: 3 sec
```

**Best for:** First-time users, sensitive accounts

#### Balanced (Recommended)

```
Add Note: ✓ Enabled
Min Delay: 3 sec
Max Delay: 7 sec
Max per Session: 20-30
Auto Next Page: ✓ Enabled
Scroll Delay: 2 sec
```

**Best for:** Regular use, daily networking

#### Aggressive (Riskier)

```
Add Note: ✗ Disabled
Min Delay: 2 sec
Max Delay: 5 sec
Max per Session: 50+
Auto Next Page: ✓ Enabled
Scroll Delay: 1 sec
```

**Best for:** Bulk campaigns, experienced users
**⚠️ Warning:** Higher detection risk

---

## 📝 Personalization

### Available Placeholders

The extension supports multiple placeholder formats:

| Placeholder     | Example Output | Use Case                          |
| --------------- | -------------- | --------------------------------- |
| `{{firstname}}` | John           | Casual, friendly                  |
| `{{lastname}}`  | Doe            | Formal reference                  |
| `{{fullname}}`  | John Doe       | Professional, formal              |
| `{name}`        | John           | Legacy format (same as firstname) |

### Note Template Examples

#### Professional & Brief

```
Hi {{firstname}}, I came across your profile and was impressed by your work in [field]. Would love to connect!
```

#### Industry-Specific

```
Hello {{firstname}}, I noticed your expertise in software engineering. I'm also in the tech space and would love to expand my network!
```

#### Mutual Connection

```
Hi {{firstname}}, I see we both know [mutual connection]. I'd love to connect and learn more about your work at [company]!
```

#### Event/Conference

```
Hi {{firstname}}, Great meeting you at [event]! Let's stay connected. Looking forward to future collaborations!
```

#### Alumni Network

```
Hello {{fullname}}, Fellow [University] alum here! Would love to connect and share experiences from our time there.
```

#### Job Seeking (Use Carefully)

```
Hi {{firstname}}, I'm exploring opportunities in [industry]. Your career path is inspiring! Would love to connect and learn from your journey.
```

### Best Practices for Notes

✅ **DO:**

- Keep it under 200 characters
- Be genuine and specific
- Mention common ground (school, company, interest)
- Use proper grammar and spelling
- Personalize beyond just the name
- Make it about them, not you

❌ **DON'T:**

- Use generic templates for everyone
- Make spelling/grammar errors
- Include sales pitches
- Use ALL CAPS or excessive punctuation!!!
- Send the same message to competitors
- Ask for favors in first message

### Fallback Behavior

If the extension can't extract a name from the profile:

- Placeholders are removed from the note
- Message is still sent (if not empty)
- No error or skipped connection
- Check console for debugging info

---

## 🛡️ Safety Tips

### LinkedIn's Limits

| Limit Type                 | Approximate Value | Consequence                              |
| -------------------------- | ----------------- | ---------------------------------------- |
| Daily Invitations          | 100-200           | Temporary restriction                    |
| Weekly Invitations         | 500-700           | Warning message                          |
| Pending Invitations        | 3,000 max         | Can't send more until accepted/withdrawn |
| Connection Acceptance Rate | Monitor           | Low rate may trigger review              |

### Safe Usage Guidelines

#### Daily Recommendations

- **New accounts (<6 months)**: 20-30 connections/day
- **Established accounts**: 50-100 connections/day
- **Premium accounts**: 100-150 connections/day
- **Recruiter accounts**: Up to 200 connections/day

#### Red Flags to Avoid

- ⚠️ Sending too many requests too quickly
- ⚠️ Low acceptance rate (<30%)
- ⚠️ Too many pending invitations
- ⚠️ Connecting with people far outside your network
- ⚠️ Identical messages to many people
- ⚠️ Using minimal delays (<2 seconds)

#### If You Get Restricted

**Symptoms:**

- "You've reached the weekly invitation limit" message
- Can't send new invitations
- Warning email from LinkedIn

**Actions:**

1. **Stop immediately** - Don't try to circumvent
2. **Wait it out** - Usually 1-2 weeks
3. **Withdraw pending invitations** - Frees up your limit
4. **Review strategy** - Use more conservative settings
5. **Diversify approach** - Use other networking methods too

### Best Practices

1. **Vary your timing** - Don't automate at same time every day
2. **Use realistic delays** - 3-7 seconds mimics human behavior
3. **Personalize notes** - Higher acceptance rate, less spam-like
4. **Target relevantly** - Connect with people in your industry/interest
5. **Monitor acceptance** - Low rate (<30%) is concerning
6. **Take breaks** - Don't run automation for hours straight
7. **Spread across days** - Better than bulk in one session
8. **Engage after connecting** - Send follow-up messages, engage with posts
9. **Quality over quantity** - Better to connect with 20 relevant people than 100 random
10. **Stay informed** - LinkedIn's policies change, stay updated

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### Issue: "Could not establish connection"

**Cause:** Content script not loaded on LinkedIn page

**Solution:**

1. Refresh the LinkedIn page (F5)
2. Wait for page to fully load
3. Click "Start" again
4. Extension now auto-injects script, so this should rarely happen

---

#### Issue: "Please navigate to LinkedIn first"

**Cause:** Not on a LinkedIn page

**Solution:**

1. Navigate to linkedin.com
2. Go to search results or My Network
3. Then start the extension

---

#### Issue: No "Connect" buttons found

**Possible Causes:**

- Already connected with everyone visible
- Not on a page with connection buttons
- Need to scroll to load more

**Solutions:**

1. Manually scroll down to load more profiles
2. Navigate to different LinkedIn page
3. Use search filters to find new people
4. Try My Network page instead

---

#### Issue: Extension stops after 1-2 connections

**Cause:** Hitting errors or modal dialogs

**Solution:**

1. Check console (F12 → Console) for errors
2. Verify delays aren't too short
3. Make sure LinkedIn page is stable
4. Try refreshing and restarting

---

#### Issue: Notes not being added

**Possible Causes:**

- "Add Note" checkbox not enabled
- Note template is empty
- LinkedIn's UI changed

**Solutions:**

1. Enable "Add custom note" checkbox
2. Verify note template has content
3. Check console for errors
4. Try sending one connection manually first

---

#### Issue: Stats not updating

**Cause:** Message passing issue between popup and content script

**Solution:**

1. Keep popup open while running
2. Or check storage: `chrome://extensions/` → Extension details → Inspect views: service worker → Application → Storage
3. Refresh extension and try again

---

#### Issue: Automation seems "stuck"

**Symptoms:** Counter not updating, no activity

**Solutions:**

1. Wait longer - delays might be longer than expected
2. Check if LinkedIn showed a dialog/modal
3. Look at console for errors
4. Click "Stop" and restart
5. Refresh LinkedIn page

---

#### Issue: "Extension context invalidated"

**Cause:** Extension was reloaded while running

**Solution:**

1. Go to `chrome://extensions/`
2. Reload the extension
3. Refresh all LinkedIn tabs
4. Start automation again

---

### Advanced Debugging

#### Enable Detailed Logging

1. Open LinkedIn page
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Look for messages starting with "LinkedIn Auto Connect:"
5. Share these messages when reporting issues

#### Check Extension Status

```javascript
// In LinkedIn page console, type:
chrome.runtime.id;
// Should return extension ID, not undefined
```

#### Inspect Storage

1. Go to `chrome://extensions/`
2. Click "Details" on LinkedIn Auto Connect
3. Under "Inspect views" click "service worker"
4. Go to Application tab → Storage → Local Storage
5. View current settings and state

---

## 🏗️ Technical Details

### Architecture

```
linkedin-auto-connect/
├── manifest.json          # Extension configuration (Manifest V3)
├── popup.html            # User interface (350px popup)
├── popup.js              # UI logic, settings management, message handling
├── content.js            # Main automation engine, runs on LinkedIn pages
├── background.js         # Service worker, handles state persistence
└── icons/                # Extension icons (16, 48, 128px)
```

### Technology Stack

- **Manifest Version**: V3 (modern Chrome extension standard)
- **Permissions**: `storage`, `activeTab`, `scripting`
- **Host Permissions**: `https://www.linkedin.com/*`
- **APIs Used**:
  - Chrome Storage API (local storage for settings)
  - Chrome Tabs API (active tab communication)
  - Chrome Scripting API (dynamic content script injection)
  - Chrome Runtime API (message passing)

### How It Works

1. **Initialization**

   - Extension loads on Chrome startup
   - Background service worker initializes default settings
   - Content script auto-injects when LinkedIn pages load

2. **User Interaction**

   - User opens popup, configures settings
   - Settings saved to Chrome local storage
   - User clicks "Start" button

3. **Automation Flow**

   ```
   Popup sends "start" message
          ↓
   Content script receives message
          ↓
   Find all "Connect" buttons on page
          ↓
   For each button:
       - Click "Connect"
       - Wait for modal
       - Add note (if enabled)
       - Click "Send"
       - Random delay
       - Update counter
          ↓
   Scroll page to load more profiles
          ↓
   If auto-next enabled: Click "Next" button
          ↓
   Repeat until max connections reached
          ↓
   Send "completed" message to popup
   ```

4. **Button Detection Algorithm**

   - Queries all `<button>` elements
   - Filters by text content ("Connect")
   - Checks aria-labels for "Connect" or "Invite"
   - Excludes "Following", "Pending", "Message" buttons
   - Verifies button is visible and enabled
   - Creates unique ID per button to avoid duplicates

5. **Name Extraction**

   - Searches button's parent container (card)
   - Looks for profile name in `<span aria-hidden="true">`
   - Falls back to profile link text
   - Parses into firstname, lastname, fullname components
   - Handles edge cases (single names, titles, credentials)

6. **Note Personalization**

   - Replaces placeholders with extracted names
   - Supports multiple placeholder formats
   - Cleans up whitespace from empty replacements
   - Falls back gracefully if name not available

7. **Safety Mechanisms**
   - Random delays between actions (mimics human behavior)
   - Session limits (prevents excessive automation)
   - Processed button tracking (prevents duplicates)
   - Graceful error handling (continues on failures)
   - Scroll delays (respects page load times)

### Message Protocol

**Start Automation:**

```javascript
chrome.tabs.sendMessage(tabId, {
  action: "start",
  settings: {
    addNote: boolean,
    noteTemplate: string,
    autoNextPage: boolean,
    minDelay: number,
    maxDelay: number,
    maxConnections: number,
    scrollDelay: number,
  },
});
```

**Stop Automation:**

```javascript
chrome.tabs.sendMessage(tabId, {
  action: "stop",
});
```

**Update Statistics:**

```javascript
chrome.runtime.sendMessage({
  action: "updateStats",
  connectionsSent: number,
  completed: boolean,
});
```

**Ping Check:**

```javascript
chrome.tabs.sendMessage(tabId, {
  action: "ping",
});
// Response: { status: 'ready' }
```

### Storage Schema

```javascript
{
  addNote: boolean,              // Enable custom notes
  noteTemplate: string,          // Note message template
  autoNextPage: boolean,         // Auto-navigate pages
  minDelay: number,             // Min delay in seconds
  maxDelay: number,             // Max delay in seconds
  maxConnections: number,       // Max per session
  scrollDelay: number,          // Scroll wait time
  isRunning: boolean,           // Current automation state
  connectionsSent: number       // Counter for session
}
```

### Performance Characteristics

- **Memory Usage**: ~5-10 MB
- **CPU Impact**: Minimal (only active during automation)
- **Network Impact**: None (no external requests)
- **Page Load Impact**: Negligible
- **Throughput**: 5-12 connections per minute (depending on delays)

---

## 🔒 Privacy & Security

### Data Collection

**This extension does NOT collect any data.**

- ✅ No analytics
- ✅ No tracking
- ✅ No external requests
- ✅ No personal information stored remotely
- ✅ All data stays in browser local storage
- ✅ No third-party services used

### Data Storage

**Local Storage Only:**

- Settings (delays, limits, templates)
- Current automation state
- Connection counter for current session

**No Cloud Storage:**

- Nothing sent to external servers
- No sync across devices
- No user accounts required

### Permissions Explained

| Permission         | Purpose                                      | Scope                    |
| ------------------ | -------------------------------------------- | ------------------------ |
| `storage`          | Save settings locally                        | Local only               |
| `activeTab`        | Access current tab when extension is clicked | Only active LinkedIn tab |
| `scripting`        | Inject content script dynamically            | Only linkedin.com        |
| `host_permissions` | Run on LinkedIn pages                        | Only linkedin.com        |

### Security Best Practices

1. **Review code** - All code is open source and auditable
2. **No external dependencies** - No third-party libraries that could compromise security
3. **Minimal permissions** - Only requests necessary permissions
4. **Sandboxed execution** - Runs in Chrome's extension sandbox
5. **No eval()** - No dynamic code execution

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs

1. Check existing issues first
2. Include Chrome version and extension version
3. Provide console logs (F12 → Console)
4. Describe steps to reproduce
5. Include expected vs actual behavior

### Suggesting Features

1. Open an issue with "[Feature Request]" prefix
2. Describe the use case
3. Explain expected behavior
4. Consider LinkedIn's ToS implications

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Test thoroughly on LinkedIn
5. Commit with descriptive messages
6. Push to branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

### Development Setup

```bash
# Clone repo
git clone https://github.com/yourusername/linkedin-auto-connect.git
cd linkedin-auto-connect

# Make changes
# Test in Chrome

# Load in Chrome for testing
# chrome://extensions/ → Load unpacked
```

### Code Style

- Use 2 spaces for indentation
- Descriptive variable names
- Comment complex logic
- Follow existing patterns
- Keep functions focused and small

---

## 📜 License

MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 🙏 Acknowledgments

- Built with Chrome Extension Manifest V3
- Designed for responsible LinkedIn automation
- Inspired by the need for efficient professional networking
- Created for educational and productivity purposes

---

## 📞 Support

### Having Issues?

1. Check [Troubleshooting](#-troubleshooting) section
2. Review Chrome extension console logs
3. Search [existing issues](https://github.com/yourusername/linkedin-auto-connect/issues)
4. Open a new issue with details

### Resources

- [LinkedIn Help Center](https://www.linkedin.com/help/)
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)

---

## 📈 Changelog

### v1.0.1 (Current)

- ✅ Fixed "Could not establish connection" error
- ✅ Added automatic content script injection
- ✅ Improved error handling and user feedback
- ✅ Added ping check before starting automation
- ✅ Better loading states in UI

### v1.0.0 (Initial Release)

- 🎉 Basic auto-connect functionality
- 📝 Custom note templates with placeholders
- ⚙️ Configurable delays and limits
- 🛡️ Safety features and rate limiting
- 📊 Real-time statistics tracking
- 📄 Multi-page navigation support

---

## ⚖️ Legal & Ethical Considerations

### Terms of Service

This extension automates interactions with LinkedIn. Before using:

1. Read [LinkedIn User Agreement](https://www.linkedin.com/legal/user-agreement)
2. Review [Professional Community Policies](https://www.linkedin.com/legal/professional-community-policies)
3. Understand potential consequences of automation

### Ethical Usage

✅ **Ethical:**

- Connecting with relevant professionals
- Personalizing connection requests
- Respecting daily limits
- Building genuine network
- Following up after connecting

❌ **Unethical:**

- Mass spamming connections
- Ignoring rejection/non-response
- Circumventing restrictions
- Misrepresenting yourself
- Harassing others

### Disclaimer

The developers of this extension are not responsible for:

- Account restrictions or bans
- Violations of LinkedIn's ToS
- Misuse of the tool
- Spam or harassment
- Any damages resulting from use

**Use at your own risk and responsibility.**

---

## 🌟 Star History

If this extension helped you, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting features
- 🤝 Contributing code
- 📢 Sharing with others (responsibly!)

---

**Made with ❤️ for productive networking**

**Remember: Quality connections > Quantity of connections**

---

## 🔗 Quick Links

- [Installation Guide](#-installation)
- [Quick Start](#-quick-start)
- [Troubleshooting](#-troubleshooting)
- [Safety Tips](#-safety-tips)
- [Report Bug](https://github.com/yourusername/linkedin-auto-connect/issues)
- [Request Feature](https://github.com/yourusername/linkedin-auto-connect/issues)

---
