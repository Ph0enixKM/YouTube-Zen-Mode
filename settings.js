const settings = document.querySelector('.settings')
const settingsBtn = document.querySelector('button#settings')
const back = document.querySelector('button#back')

settingsBtn.addEventListener('click', () => {
    document.body.style.width = '350px'
    document.body.style.height = '380px'
    settings.classList.toggle('visible')
})

back.addEventListener('click', () => {
    settings.classList.toggle('visible')
    document.body.style.width = null
    document.body.style.height = null
})

const editor = document.querySelector('.css-editor')
new Editor(editor)