const button = document.querySelector('button')

const chaosText = ['Stop the Chaos', 'Unleash Chaos']

update()
function update() {
    chrome.storage.local.get(['chaos'], (res) => {
        if (res.chaos) {
            button.innerHTML = chaosText[0]
            document.body.className = 'chaos'

            chrome.browserAction.setIcon({
                path : "icons/chaos-icon128.png"
            })
            
        }

        else {
            button.innerHTML = chaosText[1]
            document.body.className = ''

            chrome.browserAction.setIcon({
                path : "icons/icon128.png"
            })
        }
    })
}

button.addEventListener('click', e => {
    chrome.storage.local.get('chaos', res => {
        let value = true
        if (res.chaos) value = false
        
        chrome.storage.local.set({chaos: value}, () => {

            // Reload all the tabs
            chrome.windows.getAll({}, function(windows) {
                for (let i in windows) {
                    // this.reloadWindow(windows[i])
                    chrome.tabs.getAllInWindow(windows[i].id, function reloadTabs(tabs) {
                        for (let i in tabs) {
                            let tab = tabs[i]
                            chrome.tabs.update(tab.id, {url: tab.url, selected: tab.selected}, null)
                        }
                    })
                }
            })
            update()
        })
    })
})