import { Net } from "./Net";
const allEvents = {
    init() {
        window.addEventListener("load", () => {
            document.querySelector(".loginDialog").showModal();
        });

        document.querySelector(".loginBt").onclick = function () {
            let userName = document.querySelector(".nameIn").value;
            Net.loginUser(userName);


            document.querySelector(".waiting").showModal();

            let inter = setInterval(async () => {

                console.log("AAA");
                let res = await fetch("http://localhost:3000/wait")
                let { users } = await res.json()

                if (users == 2) {
                    clearInterval(inter)
                    document.querySelector(".waiting").close();
                }
            }, 1000)

        };

        document.querySelector(".resetBt").onclick = function () {
            console.log("resetBt");

            Net.resetUsers();
        };

    },
};

export { allEvents };
