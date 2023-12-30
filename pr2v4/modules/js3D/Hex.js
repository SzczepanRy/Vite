import { BoxGeometry, Mesh, MeshNormalMaterial, Object3D } from "three";
export default class HexGeometry {
  constructor() {
    this.geo = new BoxGeometry(3 * (2 / Math.sqrt(3)), 2, 0.4);
    this.material = new MeshNormalMaterial();

    this.hexObj = new Object3D();

    this.mesh = new Mesh(this.geo, this.material);
    for (let i = 0; i < 6; i++) {
      let side = this.mesh.clone();
      let angle_deg = 60 * i;
      let angle_rad = (Math.PI / 180) * angle_deg;

      side.position.x = 3 * Math.cos(angle_rad); // punkt na okręgu, do obliczenia
      side.position.z = 3 * Math.sin(angle_rad); // punkt na okręgu, do obliczenia
      side.lookAt(this.hexObj.position); // nakierowanie ściany na środek kontenera 3D
      this.hexObj.add(side); // dodanie ściany do kontenera
    }

    // this.mesh1.position.set(1.7, 0, 0);

    // this.hexObj.add(this.mesh1);

    this.hex = this.hexObj;
  }
}
