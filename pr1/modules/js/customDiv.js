export default class CustomDiv {

    constructor(w, h, text, color) {

        console.log(this)

        this.w = w
        this.h = h

        //
        this.createDiv()

    }

    createDiv() {


        this.img = document.createElement("img")
        this.img.setAttribute("src", "./modules/gfx/heks.png")
        this.img.style.width = `${this.w}px`
        this.img.style.height = `${this.h}px`

        this.div = document.createElement("div")
        this.div.append(this.img)


        this.div.style.width = `${this.w}px`
        this.div.style.height = `${this.h}px`
        this.div.style.position = "relative"

        //
        this.div.onclick = function () {
            alert(`color=}`)
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