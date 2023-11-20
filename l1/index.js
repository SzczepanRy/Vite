import CustomDiv from "./modules/costumDiv";

import { value, obj } from "/modules/data1"
import data2 from "./modules/data2"
import { number, allFunctions } from "./modules/data3"
import Data4 from "./modules/data4";

const d1 = new Data4(1, 2)
const d2 = new Data4(3, 4)

console.log("obiekt d1 klasy Data4 z argumentami 1,2", d1)
console.log("obiekt d2 klasy Data4 z argumentami 3,4", d2)


allFunctions.add(10)
allFunctions.remove(40)

console.log("number = ", number)
console.log("export default obj2 z pliku data2.js", data2)

console.log("export value i obj z pliku data1.js", { value, obj })






const list = ["red", "green", "blue"]

for (let i = 0; i < list.length; i++) {
    const customDiv = new CustomDiv(100, 100, "hello", list[i])
    customDiv.setXY(i * 50, i * 50)
    console.log(customDiv);
    document.body.append(customDiv.getRoot())
}