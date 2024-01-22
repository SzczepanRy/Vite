const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

let users = [];
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
    res.json({ users: users.length })
})


app.listen(3000, () => {
    console.log("runnin");
});
