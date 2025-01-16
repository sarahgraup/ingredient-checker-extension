export {};

// Log when the service worker starts
console.log('Service worker initialized');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
     console.log("Service Worker received message:", message);
     console.log("Message type:", message.type);
     console.log("Sender:", sender);

     if (message.type === "contentScriptReady") {
       console.log("Content script is ready on:", message.url);
     }

     if (message.type === "contentScriptData") {
       console.log("Received data from content script:", message.data);
     }

     return true;
  console.log('Background script received message:', message);
  return true;
});


chrome.runtime.onMessage.addListener(
  async (message: { type: string }, sender, sendResponse) => {
        if (message.type === 'scrapeHTML') {
       
            const html = document.documentElement.innerHTML;
                 console.log(html);
      sendResponse({ html });
    }
    return true;
  }
);
