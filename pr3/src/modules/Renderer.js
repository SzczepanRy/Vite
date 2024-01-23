import { MeshBasicMaterial, Raycaster, Vector2, WebGLRenderer } from "three";

export default class Renderer {
    constructor(scene, container) {
        this.scene = scene;
        this.container = container;
        this.threeRenderer = new WebGLRenderer({ antialias: true });
        this.threeRenderer.setClearColor(0xffffff);
        this.container.appendChild(this.threeRenderer.domElement);
        this.updateSize();

        document.addEventListener("DOMContentLoaded", () => this.updateSize(), false);
        window.addEventListener("resize", () => this.updateSize(), false);

        this.raycaster = new Raycaster();
        this.mouseVector = new Vector2();

        this.click = 0;
        this.clickedItem;
        this.lastClickedItem;
        this.lastClickedPawnMaterial;

        this.event = 0;
    }

    updateSize() {
        this.threeRenderer.setSize(window.innerWidth, window.innerHeight);
    }

    addListiner(scene, camera) {
        this.event++;
        window.addEventListener("mousedown", (e) => {
            this.mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
            this.raycaster.setFromCamera(this.mouseVector, camera);

            const intersects = this.raycaster.intersectObjects(scene.children);

            this.clickedItem = intersects[0].object;
            console.log(this.clickedItem);
            if (intersects.length > 0) {
                console.log("added");
                this.event++;
                this.click++;
            }
            this.render(scene, camera);
        });
    }
    checkTile({ x, y, z }) {
        console.log(x, y, z);
        let Z = [-5, -1, 3, 7];
        let X = [-7, -3, 1, 5];

        if (Z.includes(z)) {
            if (X.includes(x)) {
                return true;
            } else {
                return false;
            }
        } else {
            if (Z.includes(x)) {
                return true;
            } else {
                return false;
            }
        }
    }
    render(scene, camera) {
        setTimeout(() => {
            console.log("render");
            if (this.event == 0) {
                this.addListiner(scene, camera);
            }
            if (this.click == 1 && this.clickedItem.geometry.type == "CylinderGeometry") {
                console.log("hilight pawn");
                console.log(this.clickedItem);
                this.lastClickedItem = this.clickedItem;
                this.lastClickedPawnMaterial = this.clickedItem.material;

                this.clickedItem.material = new MeshBasicMaterial({
                    color: 0x8888ff,
                });

                this.clickedItem.needsUpdate = true;
            } else if (
                this.click == 2 &&
                this.clickedItem.geometry.type == "BoxGeometry" &&
                this.checkTile(this.clickedItem.position)
            ) {
                console.log("hilight tile");

                console.log(this.clickedItem);

                this.lastClickedItem.position.x = this.clickedItem.position.x;
                this.lastClickedItem.position.z = this.clickedItem.position.z;
                this.lastClickedItem.material = this.lastClickedPawnMaterial;
                this.clickedItem.needsUpdate = true;

                this.click = 0;
            } else if (this.click > 2) {
                this.lastClickedItem.material = this.lastClickedPawnMaterial;

                this.click = 0;
            } else {
                if (this.lastClickedItem) {
                    this.lastClickedItem.material = this.lastClickedPawnMaterial;
                }
                this.click = 0;
            }

            this.threeRenderer.render(scene, camera);
        }, 100);
    }
}
