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
    console.log(parsedUrl.pathname);
    console.log(predicate);
    if (currentUrl && predicate && tabId) {
        chrome.tabs.sendMessage(tabId, { type: 'page-rendered'});
    }
}, { urls: ['*://*.youtube.com/*'] });
