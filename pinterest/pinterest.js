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
        <h1 class="zen-mode-container">
            <svg class="zen-mode-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 466 466"><defs><clipPath id="_clipPath_xedddA3mxq3N3zPl3EhVcAeUQZ7erFPa"><rect width="466" height="466"/></clipPath></defs><g clip-path="url(#_clipPath_xedddA3mxq3N3zPl3EhVcAeUQZ7erFPa)"><clipPath id="_clipPath_s4AEr0sQh5HoafEafjoUBS5s4JiWrKnZ"><rect x="0" y="0" width="466" height="466" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/></clipPath><g clip-path="url(#_clipPath_s4AEr0sQh5HoafEafjoUBS5s4JiWrKnZ)"><g><clipPath id="_clipPath_Kfbf1rnuR8LDrckeeN0bbqsIDVOtxYns"><rect x="0" y="0" width="466" height="466" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/></clipPath><g clip-path="url(#_clipPath_Kfbf1rnuR8LDrckeeN0bbqsIDVOtxYns)"><g><g><clipPath id="_clipPath_Pe6R2gEmmrywhTNovpOD6Tj9btBnSLnz"><rect x="0" y="0" width="466" height="466" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/></clipPath><g clip-path="url(#_clipPath_Pe6R2gEmmrywhTNovpOD6Tj9btBnSLnz)"><g><g><g><path d=" M 137.275 287.536 C 151.544 273.267 174.714 273.267 188.983 287.536 C 203.252 301.805 203.252 324.974 188.983 339.243 C 174.714 353.512 151.544 353.512 137.275 339.243 C 123.006 324.974 123.006 301.805 137.275 287.536 L 137.275 287.536 Z  M 68.244 68.244 C 159.175 -22.687 306.825 -22.687 397.756 68.244 C 488.687 159.175 488.687 306.825 397.756 397.756 C 306.825 488.687 159.175 488.687 68.244 397.756 C -22.687 306.825 -22.687 159.175 68.244 68.244 L 68.244 68.244 Z  M 86.576 386.389 C 3.98 303.793 3.98 169.879 86.576 87.283 C 169.172 4.687 303.086 4.687 385.682 87.283 C 426.98 128.581 426.98 195.538 385.682 236.836 C 344.384 278.134 277.427 278.134 236.129 236.836 C 194.831 195.538 127.874 195.538 86.576 236.836 C 45.278 278.134 45.278 345.091 86.576 386.389 Z " fill-rule="evenodd" fill="rgb(0,0,0)"/><path d=" M 286.829 137.983 C 301.097 123.714 324.267 123.714 338.536 137.983 C 352.805 152.252 352.805 175.421 338.536 189.69 C 324.267 203.959 301.097 203.959 286.829 189.69 C 272.56 175.421 272.56 152.252 286.829 137.983 Z " fill="rgb(0,0,0)"/></g></g></g></g></g></g></g></g></g></g></svg>
            <br>
            <span class="zen-mode-title">Keep your mind peaceful</span>
        </h1>
        `
    
        cont.style.visibility = 'visible'
        count++
    
        if (count > 3) clearInterval(interval)
    }, 1500)

    setInterval(() => {
        document.title = "<zen> Pinterest"
    }, 1000)
}


function disable() {
    let style = document.createElement('style')
    style.innerHTML = `
        .mainContainer {
            visibility: visible !important;
        }
    `
    document.head.appendChild(style)
}