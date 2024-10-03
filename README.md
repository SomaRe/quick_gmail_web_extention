# Quick Gmail Web Extension

## Overview
Quick Gmail is a browser extension that allows users to instantly access multiple Gmail accounts from their browser toolbar. It's designed to streamline email management for users who frequently switch between different Gmail accounts.

## Features
- Quick access to multiple Gmail accounts
- Efficient email account detection without relying on Google's API
- Works across all Chromium-based browsers (Chrome, Edge, Opera, etc.)
- Privacy-focused: All data processing occurs locally

## Installation
1. Visit the [Chrome Web Store](https://chromewebstore.google.com/detail/quick-gmail/gpienhojffkociagiacaiggcoimldfbj)
2. Click "Add to Chrome" (or your respective browser)
3. Grant the necessary permissions

## Usage
1. Click on the Quick Gmail icon in your browser toolbar
2. View all your logged-in Gmail accounts
3. Click on an account to open it in a new tab
4. Use the refresh button to update the list of accounts

## Technical Details
- Utilizes Gmail's atom feed (`https://gmail.com/mail/u/{number}/feed/atom`) for efficient email account detection
- Implements recursive fetching to handle multiple accounts
- Uses `chrome.runtime.onMessage` for communication between popup and background scripts
- Parses XML data to display email information
- Leverages local storage for improved performance

## Privacy
This extension does not collect, store, or transmit any user data. All processing occurs locally on your device.

## Future Plans
- Implement periodic reloads for real-time email notifications
- Explore AI-powered email summarization capabilities
- Extend support to other email providers

## Development
To set up the development environment:

1. Clone this repository
git clone https://github.com/your-username/quick-gmail-web-extension.git




2. Navigate to `chrome://extensions/` in your Chromium-based browser
3. Enable "Developer mode"
4. Click "Load unpacked" and select the cloned repository folder

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgements
This project was inspired by the need to efficiently manage multiple Gmail accounts in a professional setting.
