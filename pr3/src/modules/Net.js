import { GameObject } from "./Main";

const nav = document.querySelector("nav");
const dialog = document.querySelector(".loginDialog");
export const Net = {
    async loginUser(userName) {
        try {
            let res = await fetch("http://localhost:3000/addUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: userName }),
            });

            let data = await res.json();
            if (data.succes) {
                nav.innerHTML = data.message;

                dialog.close(); //doesnt workkkk
                dialog.style.zIndex = -10;
                //if (data.player == 1) {
                GameObject.render(data.pawns, data.board, data.player);
                // }

                // GameObject.setPlayer(...)
            } else {
                nav.innerHTML = data.message;
            }
        } catch (err) {
            throw err;
        }
    },
    async resetUsers() {
        try {
            let res = await fetch("http://localhost:3000/resetUsers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let data = await res.json();
            if (data.succes) {
                nav.innerHTML = data.message;
            } else {
                nav.innerHTML = data.message;
            }
        } catch (err) {
            throw err;
        }
    },
};
