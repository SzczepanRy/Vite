const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const socketio = new Server(server);
let users = [];
let sessions = [];
let board = [
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
];

let pawns = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
];

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

socketio.on("connection", (client) => {
    // users.push(client.id);
    console.log(client.id);
    // client.id - unikalna nazwa klienta generowana przez socket.io
    client.on("refresh", (data) => {
        // users.push(client.id);
        let { current, updated, player } = data;
        console.log({ current, updated, player });
        pawns = pawns.map((arr, i) => {
            console.log(i, (current.y + 7) / 2);
            console.log(i, (updated.y + 7) / 2);
            if (i == (current.x + 7) / 2) {
                let array = arr.map((el, j) => {
                    if (j == (current.y + 7) / 2) {
                        console.log("fpound1");

                        return 0;
                    } else {
                        return el;
                    }
                });
                return array;
            } else if (i == (updated.x + 7) / 2) {
                let array = arr.map((el, j) => {
                    if (j == (updated.y + 7) / 2) {
                        console.log("fpound2");
                        return 1;
                    } else {
                        return el;
                    }
                });
                return array;
            } else {
                return arr;
            }
        });

        console.log(pawns);

        console.log(data);

        client.broadcast.emit("response", { board, pawns, player });

        // client.id - unikalna nazwa klienta generowana przez socket.io
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, `/dist/index.html`));
});

app.post("/addUser", (req, res) => {
    const { name } = req.body;
    console.log(users.length);
    if (users.length == 0) {
        users.push(name);

        res.json({ succes: true, message: "HI " + name + " , palying as white", board, pawns, player: users.length });
    } else if (users.length == 1) {
        users.push(name);

        res.json({ succes: true, message: "HI " + name + " , playing as black", board, pawns, player: users.length });
    } else {
        res.json({ succes: false, message: "HI " + name + " session already exists" });
    }

    //res.sendFile(path.join(__dirname, `/dist/index.html`));
});
app.get("/resetUsers", (req, res) => {
    users = [];
    res.json({ succes: true, message: "session reset" });
});
app.get("/wait", (req, res) => {
    res.json({ users: users.length });
});

server.listen(3000, () => {
    console.log("runnin");
});
