# Google Maps Button

This Tampermonkey script restores the "Google Maps" button and map shortcuts in Google Search results, which were removed in certain regions due to regulatory changes.

## Prerequisites

To use this script, you must first install the **Tampermonkey** browser extension. Use the links below for your specific browser:

* **Chrome / Edge / Brave:** [Chrome Web Store](https://chromewebstore.google.com/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo?utm_source=item-share-cb)
* **Firefox:** [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
* **Opera:** [Opera Add-ons](https://addons.opera.com/en/extensions/details/tampermonkey-beta/)
* **Safari:** [App Store](https://apps.apple.com/us/app/tampermonkey/id1459806926)

---

## Required Configuration (CHROME)

For the script to install and function correctly, you **must** enable the following settings in your browser and extension:

### 1. Enable Browser Developer Mode
1.  Open your browser's extension management page:
    * **Chrome/Brave:** `chrome://extensions/`
    * **Edge:** `edge://extensions/`
2.  In the top-right corner, toggle the **"Developer mode"** switch to **ON**.

### 2. Tampermonkey Settings
1.  Click the Tampermonkey icon in your browser and select **Dashboard**.
2.  Go to the **Settings** tab.
3.  Ensure the following options are enabled:
    * **"Allow user scripts"**
    * **"Allow access to file URLs"** (Required for scripts hosted on GitHub or local files).

---

## Installation

1.  Navigate to the 'google-maps-button.user.js' file in this repository, or click **[here](https://raw.githubusercontent.com/AvenproTeam/google-maps-button/main/google-maps-button.user.js)** to install.
2.  Click the **"Raw"** button at the top-right of the file view.
3.  Tampermonkey will automatically detect the script. Click the **"Install"** button in the new tab that opens.
4.  Refresh your Google Search page to see the changes.

---
