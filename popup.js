document.addEventListener("DOMContentLoaded", () => {
  const contentDiv = document.getElementById("content");
  const refreshButton = document.getElementById("refreshEmails");
  refreshButton.onclick = fetchEmails;

  chrome.runtime.sendMessage({ action: 'getEmails' }, (response) => {
    if (response.success && response.data) {
      displayEmails(response.data);
    } else {
      contentDiv.textContent = "No emails found. Click refresh to fetch emails.";
    }
  });
});

function fetchEmails() {
  const contentDiv = document.getElementById("content");
  contentDiv.textContent = "Fetching emails...";
  
  const refreshIcon = document.querySelector('.refresh-icon');
  refreshIcon.classList.add('rotating');

  chrome.runtime.sendMessage({ action: 'fetchEmails' }, (response) => {
    refreshIcon.classList.remove('rotating');
    if (response.success) {
      displayEmails(response.data);
    } else {
      console.error('Error fetching emails:', response.error);
      contentDiv.textContent = "Error fetching emails. Please try again.";
    }
  });
}

function displayEmails(data) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = ''; // Clear previous content

  if (data.length === 0) {
    contentDiv.appendChild(document.createTextNode("No emails found."));
    return;
  }

  data.forEach((xmlData) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, "application/xml");
    
    const feed = xmlDoc.getElementsByTagName("feed")[0];
    let title = feed.getElementsByTagName("title")[0].textContent;
    title = title.split(' ')[title.split(' ').length - 1];
    const link = feed.getElementsByTagName("link")[0].getAttribute("href");

    const emailPill = document.createElement("div");
    emailPill.className = "email-pill";
    emailPill.textContent = title;
    emailPill.onclick = () => {
      window.open(link, '_blank');
    };

    contentDiv.appendChild(emailPill);
  });
}
