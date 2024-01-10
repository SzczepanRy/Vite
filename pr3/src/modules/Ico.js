import { BoxGeometry, IcosahedronGeometry, MeshNormalMaterial, Mesh } from "three";

import PlainGeometry from "./comp/Plain";
import BoardObject from "./comp/Board";
import PawnsObject from "./comp/Pawns";

export default class Ico {
    constructor(scene, pawns, board) {
        console.log("ico");
        this.scene = scene;

        // this.mesh = new HexGeometry().hex;
        this.board = new BoardObject(board).board;
        this.scene.add(this.board);

        this.pawns = new PawnsObject(pawns).pawns;
        this.scene.add(this.pawns);

        this.plain = new PlainGeometry().plain;
        this.scene.add(this.plain);
    }
    update() {
        this.board.rotation.y += 0.01;
        this.pawns.rotation.y += 0.01;
        this.plain.rotation.y += 0.01;
    }
}
