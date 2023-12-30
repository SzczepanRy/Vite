const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
let textarea = {};
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, `/dist/index.html`));
});

app.get("/hex", (req, res) => {
  res.sendFile(path.join(__dirname, `/dist/3D.html`));
});

app.get("/get", (req, res) => {
  res.json(textarea);
});
app.post("/send", (req, res) => {
  let { data } = req.body;
  textarea = data;
  res.send(true);
});

app.listen(3000, () => {
  console.log("runnin");
});
