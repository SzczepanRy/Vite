import {
  BoxGeometry,
  IcosahedronGeometry,
  MeshNormalMaterial,
  Mesh,
} from "three";
import HexGeometry from "./Hex";

export default class Ico {
  constructor(scene) {
    console.log("ico");
    this.scene = scene;

    this.mesh = new HexGeometry().hex;
    this.scene.add(this.mesh);
  }
  update() {
    this.mesh.rotation.y += 0.01;
  }
}
