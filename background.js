chrome.runtime.onStartup.addListener(function() {
    chrome.storage.local.get(['chaos'], (res) => {
        if (res.chaos) {
            chrome.browserAction.setIcon({
                path : "icons/chaos-icon128.png"
            })
        }
    })
})