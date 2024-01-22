export default class Game {
    constructor(scene) {
        this.scene = scene;
    }
    async getData() {
        const res = await fetch("http://localhost:3000/get", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        });
        const data = await res.json();
        makeGame(data);
    }

    makeGame(data) {}
}
