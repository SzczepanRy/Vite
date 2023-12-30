import {
  BoxGeometry,
  IcosahedronGeometry,
  MeshNormalMaterial,
  Mesh,
} from "three";
import HexGeometry from "./Hex";
import PlainGeometry from "./Plain";

export default class Ico {
  constructor(scene) {
    console.log("ico");
    this.scene = scene;

    this.mesh = new HexGeometry().hex;
    this.scene.add(this.mesh);

    this.plain = new PlainGeometry().plain;
    this.scene.add(this.plain);
  }
  update() {
    this.mesh.rotation.y += 0.01;
    this.plain.rotation.y += 0.01;
  }
}
