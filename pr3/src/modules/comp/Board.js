import {
    BoxGeometry,
    DoubleSide,
    Mesh,
    MeshBasicMaterial,
    MeshNormalMaterial,
    Object3D,
    SRGBColorSpace,
    TextureLoader,
} from "three";

import whiteMarble from "../../gfx/whiteMarble.jpg";
import blackMarble from "../../gfx/blackMarble.jpg";
import greenMarble from "../../gfx/greenMarble.jpg";

export default class BoardObject {
    constructor(boardData) {
        this.boardData = boardData;
        console.log(boardData);
        this.boardObject = new Object3D();

        this.geo = new BoxGeometry(2, 0.2, 2);

        this.boardData.forEach((row, i) => {
            row.forEach((el, j) => {
                if (el == 1) {
                    let texture = new TextureLoader().load(whiteMarble);
                    texture.colorSpace = SRGBColorSpace;
                    this.material = new MeshBasicMaterial({
                        map: texture,
                        side: DoubleSide,
                        transparent: false,
                    });
                } else if (el == 3) {
                    let texture = new TextureLoader().load(greenMarble);
                    texture.colorSpace = SRGBColorSpace;
                    this.material = new MeshBasicMaterial({
                        map: texture,
                        side: DoubleSide,
                        transparent: false,
                        name: "highlight",
                    });
                } else {
                    let texture = new TextureLoader().load(blackMarble);
                    texture.colorSpace = SRGBColorSpace;
                    this.material = new MeshBasicMaterial({
                        map: texture,
                        side: DoubleSide,
                        transparent: false,
                    });
                }
                let mesh = new Mesh(this.geo, this.material);
                this.boardObject.add(mesh);
                mesh.position.set(i * 2 - this.boardData.length + 1, 0, j * 2 - this.boardData.length + 1);
            });
        });

        this.board = this.boardObject;
    }
}
