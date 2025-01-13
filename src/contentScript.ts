export { };
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'scrapeHtml') {
        let html;
        const mainElement = document.querySelector(
            '[id*="main"], [class*="main"]'
        );
        if (mainElement) {
            html = mainElement.innerHTML;
        }
        else {
            html = document.body.innerHTML;
        }
        const url = document.location.href;

        if (html) {
            sendResponse({ html, url });
        }
        else {
            sendResponse({ error: 'no html found' });
        }
    }
    return true;
});

chrome.runtime.sendMessage({ type: "contentScriptReady" });