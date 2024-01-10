import { BoxGeometry, Mesh, MeshBasicMaterial, MeshNormalMaterial, Object3D } from "three";

// let board = [
//     [1, 0, 1, 0, 1, 0, 1, 0],
//     [0, 1, 0, 1, 0, 1, 0, 1],
//     [1, 0, 1, 0, 1, 0, 1, 0],
//     [0, 1, 0, 1, 0, 1, 0, 1],
//     [1, 0, 1, 0, 1, 0, 1, 0],
//     [0, 1, 0, 1, 0, 1, 0, 1],
//     [1, 0, 1, 0, 1, 0, 1, 0],
//     [0, 1, 0, 1, 0, 1, 0, 1],
// ];

export default class BoardObject {
    constructor(boardData) {
        this.boardData = boardData;
        console.log(boardData);
        this.boardObject = new Object3D();

        this.geo = new BoxGeometry(2, 0.2, 2);

        this.boardData.forEach((row, i) => {
            row.forEach((el, j) => {
                if (el == 1) {
                    this.material = new MeshBasicMaterial({ color: 0xfffff0 });
                } else {
                    this.material = new MeshBasicMaterial({ color: 0x000000 });
                }
                let mesh = new Mesh(this.geo, this.material);
                this.boardObject.add(mesh);
                mesh.position.set(i * 2 - this.boardData.length + 1, 0, j * 2 - this.boardData.length + 1);
            });
        });

        this.board = this.boardObject;
    }
}
