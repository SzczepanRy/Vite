import CustomDiv from "./modules/js/customDiv"

const board = document.querySelector(".board")
const size = document.querySelector(".size")

window.addEventListener("load", () => {

    board.innerHTML = ''
    for (let i = 0; i < +size.value; i++) {
        const customDiv = new CustomDiv(100, 100)

        if (i % 2 != 0) {
            customDiv.setXY(i * 10, i * 80)
        } else {
            customDiv.setXY(i * 50, i * 50)
        }
        console.log(customDiv);
        board.append(customDiv.getRoot())

    }
})

size.addEventListener("input", () => {
    board.innerHTML = ''
    for (let i = 0; i < +size.value; i++) {
        const customDiv = new CustomDiv(100, 100)


        if (i % 2 == 0) {
            customDiv.setXY(i * 50, i * 80)
        } else {
            customDiv.setXY(i * 50, i * 50)
        }
        console.log(customDiv);
        board.append(customDiv.getRoot())
    }
})
