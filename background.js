chrome.runtime.onStartup.addListener(function() {
    chrome.storage.local.get(['chaos'], (res) => {
        if (res.chaos) {
            chrome.action.setIcon({
                path : "icons/chaos-icon128.png"
            })
        }
    })
})

let currentUrl = '';
let tabId;

chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
    tabId = details.tabId;
    currentUrl = details.url;
}, { url: [{ hostSuffix: 'youtube.com' }] });

chrome.webRequest.onCompleted.addListener(function(details) {
    const parsedUrl = new URL(details.url);
    const predicate = (
        parsedUrl.pathname.includes('/youtubei/v1') ||
        currentUrl.indexOf(parsedUrl.pathname) > -1
    )
    if (currentUrl && predicate && tabId) {
        chrome.tabs.sendMessage(tabId, { type: 'page-rendered'});
    }
}, { urls: ['*://*.youtube.com/*'] });