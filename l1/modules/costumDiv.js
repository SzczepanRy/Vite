console.log("---data5.js")
export default class CustomDiv {

    constructor(w, h, text, color) {

        console.log(this)

        this.w = w
        this.h = h
        this.text = text
        this.color = color

        this.createDiv()

    }

    createDiv() {
        this.div = document.createElement("div")
        this.div.innerHTML = this.text
        this.div.style.width = `${this.w}px`
        this.div.style.height = `${this.h}px`
        this.div.style.backgroundColor = this.color
        this.div.style.color = "white"
        this.div.style.position = "absolute"

        this.div.onclick = function () {
            alert(`color=${this.color}`)
        }
    }

    getRoot() {
        return this.div
    }

    setXY(x, y) {
        this.div.style.left = `${x}px`
        this.div.style.top = `${y}px`
    }

}