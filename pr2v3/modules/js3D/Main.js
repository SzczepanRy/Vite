import { Scene } from "three";
import Renderer from "./Renderer";
import Camera from "./Camera";
import Ico from "./Ico";

const container = document.getElementById("root");
const scene = new Scene();
const renderer = new Renderer(scene, container);
const camera = new Camera(renderer.threeRenderer);
const ico = new Ico(scene);

const GameObject = {
  render() {
    console.log("render");
    renderer.render(scene, camera.threeCamera);
    ico.update(); //

    requestAnimationFrame(GameObject.render);
  },
};
export { GameObject };
