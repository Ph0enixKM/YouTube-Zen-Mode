chrome.storage.local.get(['chaos'], (res) => {
    if (!res.chaos) {
        init()
    }

    else disable()
})


function init() {
    setTimeout(() => {
        let rightPanel = document.querySelector('#secondary')
        rightPanel.style.opacity = '0.3'
    }, 500)

    let count = 0

    let interval = setInterval(() => {
        document.querySelector('#primary').style.visibility = 'visible'
        count++

        if (count > 3) clearInterval(interval)
    }, 1000)
}

function disable() {
    let style = document.createElement('style')
    style.innerHTML = `
        ytd-rich-grid-renderer.style-scope.ytd-two-column-browse-results-renderer {
            visibility: visible !important;
        }
        
        #secondary {
            visibility: visible !important;
            opacity: 1 !important;
        }

        #secondary {
            opacity: 1 !important;
            filter: saturate(1) !important;
        }
    `
    document.head.appendChild(style)
}