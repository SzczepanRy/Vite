import { Scene } from "three";
import Renderer from "./Renderer";
import Camera from "./Camera";
import Ico from "./Ico";

const container = document.getElementById("root");
const scene = new Scene();
const renderer = new Renderer(scene, container);

const GameObject = {
    render(pawns, board, player) {
        // console.log("render");
        console.log(player + "a");

        if (pawns != undefined && board != undefined && player != undefined) {
            const ico = new Ico(scene, pawns, board);

            const camera = new Camera(renderer.threeRenderer, player);
            renderer.render(scene, camera.threeCamera);
            ico.update(); //

            requestAnimationFrame(GameObject.render);
        }
    },
};
export { GameObject };
