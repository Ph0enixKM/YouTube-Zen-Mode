const button = document.querySelector('button')
const chaosText = ['Stop the Chaos', 'Unleash Chaos']

update()
function update() {
    chrome.storage.local.get(['chaos'], (res) => {
        if (res.chaos) {
            button.innerHTML = chaosText[0]
            document.body.className = 'chaos'
        }
        else {
            button.innerHTML = chaosText[1]
            document.body.className = ''
        }
    })
}

button.addEventListener('click', e => {
    chrome.storage.local.get('chaos', res => {
        let value = true
        if (res.chaos) value = false
        chrome.storage.local.set({chaos: value}, () => {
            // Reload all the tabs
            chrome.windows.getAll({}, async (windows) => {
                for (let i in windows) {
                    let tabs
                    // FireFox
                    try {
                        tabs = await browser.tabs.query({currentWindow: true})
                    }
                    // Brave / Chrome
                    catch {
                        tabs = await (() => {
                            return new Promise(res => {
                                chrome.tabs.query({currentWindow: true}, (val) => res(val))
                            })
                        })()
                    }
                    for (let i in tabs) {
                        let tab = tabs[i]
                        if (tab.url.includes('youtube') || tab.url.includes('youtu.be')) {
                            chrome.tabs.update(tab.id, {url: tab.url})
                        }
                    }
                }
            })
            update()
        })
    })
})
