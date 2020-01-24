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
    
        let content = document.querySelector('#contentCol')
        content.innerHTML = ''
        content.style.visibility = 'visible'
    
        let bluebar = document.querySelector('#bluebarRoot ._2t-a._4pmj._2t-d')
        bluebar.innerHTML = `
        <h1 style="
            position
            text-align: left;
            margin: 5px;
            font-size: 25px;
            color: white;
        ">
            Keep your mind peaceful 
            <img src="icons/icon.png">
        </h1>`
        bluebar.style.visibility = 'visible'
        count++
        
        if (count > 3) clearInterval(interval)
    }, 1500)

    setInterval(() => {
        title.innerHTML = '<zen> Facebook'
    }, 1000)
}

function disable() {
    let style = document.createElement('style')
    style.innerHTML = `
        #contentCol {
            visibility: visible;
        }

        #bluebarRoot ._2t-a._4pmj._2t-d {
            visibility: visible;
        }
    `
    document.head.appendChild(style)
}