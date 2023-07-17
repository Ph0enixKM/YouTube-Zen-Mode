class Zen {
    constructor() {
        this.createContainer()
    }

    createContainer() {
        if (document.querySelector('.zen-mode-container')) return
            
        const ytGrid = document.querySelector('ytd-rich-grid-renderer')
        this.container = document.createElement('div')
        this.container.innerHTML = `
        <h1 class="zen-mode-container">
            <div class="zen-mode-logo">
                <svg class="zen-mode-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate; margin: none !important" viewBox="0 0 466 466"><defs><clipPath id="_clipPath_xedddA3mxq3N3zPl3EhVcAeUQZ7erFPa"><rect width="466" height="466"/></clipPath></defs><g clip-path="url(#_clipPath_xedddA3mxq3N3zPl3EhVcAeUQZ7erFPa)"><clipPath id="_clipPath_s4AEr0sQh5HoafEafjoUBS5s4JiWrKnZ"><rect x="0" y="0" width="466" height="466" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/></clipPath><g clip-path="url(#_clipPath_s4AEr0sQh5HoafEafjoUBS5s4JiWrKnZ)"><g><clipPath id="_clipPath_Kfbf1rnuR8LDrckeeN0bbqsIDVOtxYns"><rect x="0" y="0" width="466" height="466" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/></clipPath><g clip-path="url(#_clipPath_Kfbf1rnuR8LDrckeeN0bbqsIDVOtxYns)"><g><g><clipPath id="_clipPath_Pe6R2gEmmrywhTNovpOD6Tj9btBnSLnz"><rect x="0" y="0" width="466" height="466" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/></clipPath><g clip-path="url(#_clipPath_Pe6R2gEmmrywhTNovpOD6Tj9btBnSLnz)"><g><g><g><path d=" M 137.275 287.536 C 151.544 273.267 174.714 273.267 188.983 287.536 C 203.252 301.805 203.252 324.974 188.983 339.243 C 174.714 353.512 151.544 353.512 137.275 339.243 C 123.006 324.974 123.006 301.805 137.275 287.536 L 137.275 287.536 Z  M 68.244 68.244 C 159.175 -22.687 306.825 -22.687 397.756 68.244 C 488.687 159.175 488.687 306.825 397.756 397.756 C 306.825 488.687 159.175 488.687 68.244 397.756 C -22.687 306.825 -22.687 159.175 68.244 68.244 L 68.244 68.244 Z  M 86.576 386.389 C 3.98 303.793 3.98 169.879 86.576 87.283 C 169.172 4.687 303.086 4.687 385.682 87.283 C 426.98 128.581 426.98 195.538 385.682 236.836 C 344.384 278.134 277.427 278.134 236.129 236.836 C 194.831 195.538 127.874 195.538 86.576 236.836 C 45.278 278.134 45.278 345.091 86.576 386.389 Z " fill-rule="evenodd" fill="rgb(0,0,0)"/><path d=" M 286.829 137.983 C 301.097 123.714 324.267 123.714 338.536 137.983 C 352.805 152.252 352.805 175.421 338.536 189.69 C 324.267 203.959 301.097 203.959 286.829 189.69 C 272.56 175.421 272.56 152.252 286.829 137.983 Z " fill="rgb(0,0,0)"/></g></g></g></g></g></g></g></g></g></g></svg>
            </div>
            <br>
            <span class="zen-mode-title">Keep your mind peaceful</span>
        </h1>
        `
        ytGrid.appendChild(this.container)
    }

    setZenMode() {
        const isHomepage = location.href.match(/youtube\.com\/?$/)
        if (document.querySelector('.zen-mode-style-chaos')) {
            document.querySelector('.zen-mode-style-chaos').remove()
        }
        if (document.querySelector('.zen-mode-container')) {
            document.querySelector('.zen-mode-container').style.visibility = isHomepage ? 'visible' : 'hidden'
        }
        this.setCustomStyle()
        this.setHomepageStyle(isHomepage)
    }

    setHomepageStyle(isHomepage) {
        if (isHomepage) {
            if (document.querySelector('.zen-mode-style-homepage-zen')) return
            this.zenStyleHomepage = document.createElement('style')
            this.zenStyleHomepage.className = 'zen-mode-style-homepage-zen'
            this.zenStyleHomepage.innerHTML = `
                ytd-rich-grid-renderer #contents {
                    display: none !important;
                }
                ytd-rich-grid-renderer #header {
                    display: none !important;
                }
            `
            document.head.appendChild(this.zenStyleHomepage)
        }
        else {
            if (document.querySelector('.zen-mode-style-homepage-zen')) {
                document.querySelector('.zen-mode-style-homepage-zen').remove()
            }
        }
    }

    setCustomStyle() {
        if (document.querySelector('.zen-mode-style-zen')) return
        chrome.storage.local.get(['css'], (res) => {
            this.zenStyle = document.createElement('style')
            this.zenStyle.className = 'zen-mode-style-zen'
            this.zenStyle.innerHTML += `
                #secondary {
                    opacity: 0.3;
                    filter: saturate(0.3);
                    transition: filter 300ms, opacity 300ms;
                }
                
                #secondary:hover {
                    opacity: 1;
                    filter: saturate(1);
                }
                
                .ytd-comments {
                    display: none;
                }
            `;
            this.zenStyle.innerHTML += res.css
            document.head.appendChild(this.zenStyle)
        })
    }

    setChaosMode() {
        if (document.querySelector('.zen-mode-style-zen')) {
            document.querySelector('.zen-mode-style-zen').remove()
        }
        if (document.querySelector('.zen-mode-container')) {
            document.querySelector('.zen-mode-container').style.visibility = 'hidden'
        }
        if (document.querySelector('.zen-mode-style-homepage-zen')) {
            document.querySelector('.zen-mode-style-homepage-zen').remove()
        }
    }
}

const zen = new Zen()
const main = () => {
    chrome.storage.local.get(['chaos'], (res) => {
        res.chaos
            ? zen.setChaosMode()
            : zen.setZenMode()

        document.querySelectorAll('a#endpoint').forEach(a => {
            a.addEventListener('click', () => {
                main()
            })
        })
    })
}
main()

chrome.runtime.onMessage.addListener(function(request) {
    if (request && request.type === 'page-rendered') {
        main()
    }
});

