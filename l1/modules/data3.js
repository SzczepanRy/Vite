console.log("---data3")

let number = 20

const allFunctions = {

    add(value) {
        number += value
    },

    remove(value) {
        number -= value
    }

}

export { number, allFunctions }