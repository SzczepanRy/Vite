import { Scene } from "three";
import Renderer from "./Renderer";
import Camera from "./Camera";
import Ico from "./Ico";

const container = document.getElementById("root");
const scene = new Scene();
const renderer = new Renderer(scene, container);

const GameObject = {
    reset() {
        for (let i = scene.children.length - 1; i >= 0; i--) {
            let obj = scene.children[i];
            scene.remove(obj);
        }
    },
    render(pawns, board, player, highlight = true, current) {
        // console.log("render");
        console.log(player + "a");
        if (pawns != undefined && board != undefined && player != undefined) {
            const ico = new Ico(scene, pawns, board);

            const camera = new Camera(renderer.threeRenderer, player);

            renderer.render(scene, camera.threeCamera, player, highlight, current);
            ico.update(); //

            requestAnimationFrame(GameObject.render);
        }
    },
};
export { GameObject };
