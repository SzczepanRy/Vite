import { GameObject } from "./Main";
import { io } from "https://cdn.socket.io/4.6.0/socket.io.esm.min.js";
const nav = document.querySelector("nav");
const dialog = document.querySelector(".loginDialog");
const client = io("ws://localhost:3000");
window.addEventListener("load", () => {
    client.on("onconnect", (data) => {
        console.log(data.clientId);
    });
});

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
    reRenderBoard({ CX, CY }, { UX, UY }) {
        console.log({ CX, CY }, { UX, UY });
        client.emit("refresh", {
            current: { x: CX, y: CY },
            updated: { x: UX, y: UY },
            player: 2,
        });
        client.on("response", (data) => {
            console.log(data);
            GameObject.reset();
            GameObject.render(data.pawns, data.board, data.player);
        });
    },
};
