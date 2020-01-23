chrome.storage.local.get(['chaos'], (res) => {
    if (!res.chaos) {
        init()
    }

    else disable()
})


function init() {
    let title = document.querySelector('title')
    let count = 0
    
    let interval = setInterval(() => {
        let cont = document.querySelector('.mainContainer')
        cont.innerHTML = `
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
    
        cont.style.visibility = 'visible'
        count++
    
        if (count > 3) clearInterval(interval)
    }, 1500)

    setInterval(() => {
        title.innerHTML = '<zen> Pinterest'
    }, 1000)
}


function disable() {
    let style = document.createElement('style')
    style.innerHTML = `
        .mainContainer {
            visibility: visible;
        }
    `
    document.head.appendChild(style)
}