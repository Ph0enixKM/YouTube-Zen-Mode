class Editor {
    constructor(editor) {
        this.editor = editor
        this.canvas = editor.children[0]
        this.input = editor.children[1]
        this.input.addEventListener('keydown', (e) => {
            if (e.key == 'Tab') {
                e.preventDefault();
                this.insertText('\t')
            }
            if (e.key == '{') {
                e.preventDefault();
                this.insertText('{}', -1)
            }
            setTimeout(() => {
                this.update()
                this.updateStorage()
            })
        })
        this.input.addEventListener('scroll', () => this.updateScroll())
        chrome.storage.local.get('css', (res) => {
            console.log(res);
            if (res.css) {
                this.input.value = res.css
                this.update()
            }
        })
    }

    insertText(text, offset = 0) {
        const start = this.input.selectionStart;
        const end = this.input.selectionEnd;
        this.input.value = this.input.value.substring(0, start) + text + this.input.value.substring(end);
        this.input.selectionStart = this.input.selectionEnd = start + text.length + offset;
    }

    updateScroll() {
        this.canvas.scrollTop = this.input.scrollTop
        this.canvas.scrollLeft = this.input.scrollLeft
    }

    updateStorage() {
        chrome.storage.local.set({css: this.input.value}, () => {})
    }
    
    update() {
        const nbspSpaces = this.input.value.replace(/ /g, '\xa0')
        const strings = nbspSpaces.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="editor string">$&</span>')
        const classes = strings.replace(/(\.[a-zA-Z0-9_-]+)/g, '<span class="editor class">$1</span>')
        const ids = classes.replace(/(#[a-zA-Z0-9_-]+)/g, '<span class="editor id">$1</span>')
        const comments = ids.replace(/(\/\*[\s\S]*?\*\/)/gm, '<span class="editor comment">$1</span>')
        const functions = comments.replace(/([a-zA-Z0-9_-]+)\(/g, '<span class="editor function">$1</span>(')
        const rules = functions.replace(/(@[a-zA-Z0-9_-]+)/g, '<span class="editor rule">$1</span>')
        const important = rules.replace(/(!important)/g, '<span class="editor rule">$1</span>')
        const units = important.replace(/([0-9]+)(px|em|rem|vh|vw|vmin|vmax|%)/g, '<span class="editor value">$1</span><span class="editor unit">$2</span>')
        const spaces = units.replace(/[\xa0]/g, '<span class="editor space">&nbsp;</span>');
        const tabs = spaces.replace(/[\t]/g, '<span class="editor space">&nbsp;&nbsp;&nbsp;&nbsp;</span>');
        const newLines = tabs.replace(/[\n]/g, '<br/>')
        this.canvas.innerHTML = newLines
    }
}
