chrome.storage.local.get(['chaos'], (res) => {
    if (!res.chaos) {
        init()
    }

    else disable()
})


function init() {
    let count = 0

    let interval = setInterval(() => {

        let primary = document.querySelector('#primary')
        primary.innerHTML = `
        
        <h1 style="
        color: #888;
        position: absolute; 
        top: 50%; 
        left: 50%; 
        transform: translate(-50%, -50%);
        font-size: 5vw;
        text-align: center;
        ">
        
        Keep your mind peaceful
        
        </h1>
        `
        
        // primary.style.display = 'block'
        let guides = [...document.querySelectorAll('ytd-guide-section-renderer')]
        guides.shift()
        
        for (const guide of guides) {
            guide.style.visibility = 'hidden'
        }
        count++

        if (count > 3) clearInterval(interval)
    }, 1500)
}


function disable() {
    let style = document.createElement('style')
    style.innerHTML = `
        ytd-rich-grid-renderer.style-scope.ytd-two-column-browse-results-renderer {
            visibility: visible;
        }
        
        #secondary {
            visibility: visible;
        }
    `
    document.head.appendChild(style)
}