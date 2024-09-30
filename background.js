let emailData = null;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getEmails') {
    chrome.storage.local.get('emailData', (result) => {
      sendResponse({ success: true, data: result.emailData || null });
    });
    return true; // Indicates that the response will be sent asynchronously
  } else if (request.action === 'fetchEmails') {
    fetchEmails(sendResponse);
    return true; // Indicates that the response will be sent asynchronously
  }
});

function fetchEmails(sendResponse) {
  let id = 0;
  const email_data = [];

  function fetchEmail() {
    const url = `https://mail.google.com/mail/u/${id}/feed/atom`;
    
    fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/atom+xml',
      },
    })
      .then(response => response.text())
      .then(xmlData => {
        if (email_data.some(data => data === xmlData)) {
          console.log("Finished fetching emails. Total accounts:", id);
          chrome.storage.local.set({ emailData: email_data }, () => {
            sendResponse({ success: true, data: email_data });
          });
        } else {
          email_data.push(xmlData);
          console.log(`Fetched email for account ${id}`);
          id++;
          fetchEmail(); // Continue to the next account
        }
      })
      .catch(error => {
        if (error.message.includes('Failed to fetch')) {
          console.log("Finished fetching emails. Total accounts:", id);
          chrome.storage.local.set({ emailData: email_data }, () => {
            sendResponse({ success: true, data: email_data });
          });
        } else {
          console.error('Error fetching email:', error);
          sendResponse({ success: false, error: error.toString() });
        }
      });
  }

  fetchEmail();
}
