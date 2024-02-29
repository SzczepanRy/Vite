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

function kill({ current, updated, player }) {
    let cx = (current.y + 7) / 2;
    let cy = (current.x + 7) / 2;
    let ux = (updated.y + 7) / 2;
    let uy = (updated.x + 7) / 2;
    if (player == 1) {
        console.log("WHITE");

        if (cx < ux) {
            //|| cy > uy
            console.log(cy, cx, uy, ux);
            console.log(pawns);
            // console.log(pawns[cy + 1][cx + 1]);
            if (pawns[cy - 1][cx + 1] != 0 && pawns[cy - 1][cx + 1] !== (player == 2 ? 1 : 2)) {
                pawns[cy - 1][cx + 1] = 0;
                pawns[cy][cx] = 0;
                pawns[uy][ux] = player == 2 ? 1 : 2;
            } else {
                pawns[cy][cx] = 0;
                pawns[uy][ux] = player == 2 ? 1 : 2;
            }

            return pawns;
        } else if (cx > ux) {
            //|| cy > uy
            if (pawns[cy - 1][cx - 1] != 0 && pawns[cy - 1][cx - 1] !== (player == 2 ? 1 : 2)) {
                pawns[cy - 1][cx - 1] = 0;
                pawns[cy][cx] = 0;
                pawns[uy][ux] = player == 2 ? 1 : 2;
            } else {
                pawns[cy][cx] = 0;
                pawns[uy][ux] = player == 2 ? 1 : 2;
            }

            return pawns;
        } else {
            console.log("else");
            pawns[cy][cx] = 0;
            pawns[uy][ux] = player == 2 ? 1 : 2;
            return pawns;
        }
    } else {
        console.log("BLACK");
        if (cx < ux) {
            //|| cy > uy
            console.log(cy, cx, uy, ux);

            if (pawns[cy + 1][cx + 1] != 0 && pawns[cy + 1][cx + 1] !== (player == 2 ? 1 : 2)) {
                pawns[cy + 1][cx + 1] = 0;
                pawns[cy][cx] = 0;
                pawns[uy][ux] = player == 2 ? 1 : 2;
            } else {
                pawns[cy][cx] = 0;
                pawns[uy][ux] = player == 2 ? 1 : 2;
            }

            return pawns;
        } else if (cx > ux) {
            //|| cy > uy
            if (pawns[cy + 1][cx - 1] != 0 && pawns[cy + 1][cx - 1] !== (player == 2 ? 1 : 2)) {
                pawns[cy + 1][cx - 1] = 0;
                pawns[cy][cx] = 0;
                pawns[uy][ux] = player == 2 ? 1 : 2;
            } else {
                pawns[cy][cx] = 0;
                pawns[uy][ux] = player == 2 ? 1 : 2;
            }

            return pawns;
        } else {
            console.log("else");
            pawns[cy][cx] = 0;
            pawns[uy][ux] = player == 2 ? 1 : 2;
            return pawns;
        }
    }
}

function clearBoard() {
    let boardArr = board.map((y, j) => {
        let yArr = y.map((x, i) => {
            if (x == 3) {
                return 0;
            } else {
                return x;
            }
        });
        return yArr;
    });
    return boardArr;
}

function checkMoves(current, player) {
    try {
        let cx = (current.y + 7) / 2;
        let cy = (current.x + 7) / 2;

        console.log(cy, cx);
        board = clearBoard();

        if (player == 1) {
            //white
            if (pawns[cy - 1][cx + 1] == 0) {
                board[cy - 1][cx + 1] = 3;
            } else if (pawns[cy - 2][cx + 2] == 0) {
                board[cy - 2][cx + 2] = 3;
            }

            if (pawns[cy - 1][cx - 1] == 0) {
                board[cy - 1][cx - 1] = 3;
            } else if (pawns[cy - 2][cx - 2] == 0) {
                board[cy - 2][cx - 2] = 3;
            }
        } else {
            //black
            if (pawns[cy + 1][cx - 1] == 0) {
                board[cy + 1][cx - 1] = 3;
            } else if (pawns[cy + 2][cx - 2] == 0) {
                board[cy + 2][cx - 2] = 3;
            }

            if (pawns[cy + 1][cx + 1] == 0) {
                board[cy + 1][cx + 1] = 3;
            } else if (pawns[cy + 2][cx + 2] == 0) {
                board[cy + 2][cx + 2] = 3;
            }
        }
        return board;
    } catch (err) {
        console.log(err);
        return board;
    }
}

socketio.on("connection", (client) => {
    sessions.push(client.id);
    if (sessions.length > 2) {
        sessions.shift();
    }
    console.log(sessions);
    let setobj;
    // client.id - unikalna nazwa klienta generowana przez socket.io
    client.on("refresh", (data) => {
        // users.push(client.id);
        let { current, updated, player } = data;

        console.log({ current, updated, player });
        board = clearBoard();

        pawns = kill({ current, updated, player });

        setobj = { board, pawns, player };
        client.emit("response", { board, pawns, player });
        client.emit("block", { board, pawns, player });
        client.broadcast.emit("unblock", { board, pawns, player: +player == 2 ? 1 : 2 });

        // client.id - unikalna nazwa klienta generowana przez socket.io
    });
    client.on("checkMoves", (data) => {
        let { current, player } = data;

        board = checkMoves(current, player);
        console.log(current);
        client.emit("checkedMoves", { board, pawns, player, current });
    });
    if (setobj) {
        socketio.emit("load", setobj);
    }
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
