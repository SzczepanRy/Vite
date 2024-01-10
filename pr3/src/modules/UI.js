import { Net } from "./Net";
const allEvents = {
    init() {
        window.addEventListener("load", () => {
            document.querySelector(".loginDialog").showModal();
        });

        document.querySelector(".loginBt").onclick = function () {
            let userName = document.querySelector(".nameIn").value;
            Net.loginUser(userName);
        };

        document.querySelector(".resetBt").onclick = function () {
            console.log("resetBt");

            Net.resetUsers();
        };
    },
};

export { allEvents };
