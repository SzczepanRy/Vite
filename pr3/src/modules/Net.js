import { Camera, Scene } from "three";
import Ico from "./Ico";
import { GameObject } from "./Main";
import { io } from "https://cdn.socket.io/4.6.0/socket.io.esm.min.js";
import Renderer from "./Renderer";
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
                console.log("Playerr " + data.player);
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
    reRenderBoard({ CX, CY }, { UX, UY }, player) {
        console.log({ CX, CY }, { UX, UY });
        console.log(player);

        client.emit("refresh", {
            current: { x: CX, y: CY },
            updated: { x: UX, y: UY },
            player,
        });
        client.on("response", (data) => {
            console.log(data.player + "responce");
            GameObject.reset();

            GameObject.render(data.pawns, data.board, data.player);
        });
        client.on("block", (data) => {
            console.log(data.player + "responce");
            GameObject.reset();
            GameObject.render(data.pawns, data.board, data.player);
            document.querySelector(".waiting").showModal();
            console.log("YOU SHOULD BE BLOCKED");
            setTimeout(() => {
                console.log("LOST");
            }, 10000);
        });
        client.on("unblock", (data) => {
            console.log(data.player + "responce");
            GameObject.reset();
            GameObject.render(data.pawns, data.board, data.player);
            document.querySelector(".waiting").close();
        });
    },
};
