import { CylinderGeometry, Mesh, MeshBasicMaterial, Object3D } from "three";

// let pawns = [
//     [1, 0, 1, 0, 1, 0, 1, 0],
//     [0, 1, 0, 1, 0, 1, 0, 1],
//     [0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 2, 0, 2, 0, 2, 0, 2],
//     [2, 0, 2, 0, 2, 0, 2, 0],
// ];

export default class PawnsObject {
    constructor(pawnsData) {
        this.pawnsData = pawnsData;
        this.pawnsObject = new Object3D();

        this.geo = new CylinderGeometry(1, 1, 1, 32);

        this.pawnsData.forEach((row, i) => {
            row.forEach((el, j) => {
                if (el == 2) {
                    this.material = new MeshBasicMaterial({ color: 0xfffff0 });
                    let mesh = new Mesh(this.geo, this.material);
                    this.pawnsObject.add(mesh);
                    mesh.position.set(i * 2 - this.pawnsData.length + 1, 0.5, j * 2 - this.pawnsData.length + 1);
                } else if (el == 1) {
                    this.material = new MeshBasicMaterial({ color: 0x000000 });
                    let mesh = new Mesh(this.geo, this.material);
                    this.pawnsObject.add(mesh);
                    mesh.position.set(i * 2 - this.pawnsData.length + 1, 0.5, j * 2 - this.pawnsData.length + 1);
                }
            });
        });

        this.pawns = this.pawnsObject;
    }
}
