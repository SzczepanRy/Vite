const express = require('express');
const cors = require('cors');
const app = express();

let textarea = {};
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

app.get('/', (req, res) => {
	res.sendFile('index.html');
});

app.get('/get', (req, res) => {
	res.json(textarea);
});
app.post('/send', (req, res) => {
	let { data } = req.body;
	textarea = data;
	res.send(true);
});

app.listen(3000, () => {
	console.log('runnin');
});
