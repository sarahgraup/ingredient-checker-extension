/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/contentScript.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'scrapeHtml') {
        var html = void 0;
        var mainElement = document.querySelector('[id*="main"], [class*="main"]');
        if (mainElement) {
            html = mainElement.innerHTML;
        }
        else {
            html = document.body.innerHTML;
        }
        var url = document.location.href;
        if (html) {
            sendResponse({ html: html, url: url });
        }
        else {
            sendResponse({ error: 'no html found' });
        }
    }
    return true;
});
chrome.runtime.sendMessage({ type: "contentScriptReady" });


/******/ })()
;
//# sourceMappingURL=contentScript.js.map