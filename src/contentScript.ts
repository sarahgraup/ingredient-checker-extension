export { };

chrome.runtime.sendMessage({ type: 'contentScriptReady' });
console.log('Content script loaded!');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'scrapeHtml') {
    scrapeIngredients(sendResponse);
    return true;
  }
});

const scrapeIngredients = (sendResponse: (response?:any)=>void) => {
  try {
    const ingredientsEl = document.querySelector('[data-at="ingredients"]');
    console.log('element', ingredientsEl);
    if (!ingredientsEl) {
      console.log('no ingredients found');
      sendResponse({ success: false, ingredients: null });
      return;
    }
    const contentId = ingredientsEl.getAttribute('aria-controls');
    console.log('content', contentId);
    const content = document.getElementById(contentId!);
    console.log('content', content);
            
    const ingredients = content?.textContent?.trim();
    sendResponse({ success: !!ingredients, ingredients });
        
  } catch (err:any) {
    console.error('scraping error', err);
    sendResponse({ success: false, error: err.message });

  }
};
