import { Net } from "./Net";
const allEvents = {


    init() {

        // document.addEventListener("onload", () => {
        //     document.querySelector(".loginDioalog").showModal()
        // })

        document.querySelector(".loginBt").onclick = function () {

            let userName = document.querySelector(".nameIn").value

            console.log(userName);
            Net.loginUser(userName)
        }

        document.querySelector(".resetBt").onclick = function () {

            console.log("resetBt");

            Net.resetUsers()
        }

    }

}

export { allEvents }