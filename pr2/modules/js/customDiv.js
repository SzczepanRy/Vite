let id = -1;

let level = [];
let data = ""
const board = document.query
export default class CustomDiv {
	constructor(w, h, sqrt, r = false) {
		console.log(this);
		this.sqrt = sqrt;
		this.w = w;
		this.h = h;



		this.type = 'wall';

		id++;
		if (r) {
			id = -1;
		}
		//
		this.createDiv();
	}

	createDiv() {
		this.img = document.createElement('img');
		this.img.setAttribute('src', './modules/gfx/heks.png');
		this.img.style.width = `${this.w}px`;
		this.img.style.height = `${this.h}px`;
		this.img.style.position = `relative`;

		this.div = document.createElement('div');
		this.div.append(this.img);

		this.div.id = id;
		this.div.style.width = `${this.w}px`;
		this.div.style.height = `${this.h}px`;
		this.div.style.position = 'absolute';
		let t = 0;
		//

		this.div.onclick = (e) => {
			let x = e.currentTarget.id % this.sqrt;
			let y = Math.floor(e.currentTarget.id / this.sqrt);

			console.log(this.type);
			t++;
			let obj = {
				id: e.currentTarget.id,
				x,
				y,
				dirOut: t % 6,
				dirIn: (t + 3) % 6,
				type: this.type,
			};

			this.img.setAttribute('src', './modules/gfx/' + (t % 6) + '.png');
			this.img.style.transform = `rotate(${(t % 6) * 60}deg) `;

			if (level.filter((el) => el.id == e.currentTarget.id).length > 0) {
				level = level.map((el, i) => {

					if (level.length == 1) {
						return {
							id: e.currentTarget.id,
							x,
							y,
							dirOut: t % 6,
							dirIn: "pierwsze",
							type: this.type,
						};
					}

					if (el.id == e.currentTarget.id) {
						console.log('aa');
						return {
							id: e.currentTarget.id,
							x,
							y,
							dirOut: t % 6,
							dirIn: level[i - 1].dirOut,
							type: this.type,
						};
					} else {
						return el;
					}
				});
			} else {
				level.push(obj);
			}

			let textV = { size: this.sqrt, level: [...level] };
			let textarea = document.querySelector('.jsonData');
			data = textV
			textarea.value = JSON.stringify(textV, null, 2);
		};
	}

	changeType(type) {
		this.type = type;
	}

	getRoot() {
		return this.div;
	}
	async getJson() {
		let res = await fetch("http://localhost:3000/get", {
			method: "GET"
			, headers: {
				"Content-Type": 'application/json'
			}
		})
		this.textarea = await res.json()
		this.level = this.textarea.level

		this.level.map((el) => {
			console.log(el);
			id = el.y * this.textarea.size + el.x
			console.log(id);
			
			im.setAttribute('src', './modules/gfx/' + el.dirOut + '.png');
			im.style.transform = `rotate(${el.dirOut * 60}deg) `;
		})

	}

	async sendJson() {

		let res = await fetch("http://localhost:3000/send", {
			method: "POST"
			, headers: {
				"Content-Type": 'application/json'
			},
			body: JSON.stringify({ data })
		})
		return await res.json()

	}

	setXY(x, y) {
		this.div.style.left = `${x + 300}px`;
		this.div.style.top = `${y + 10}px`;
	}
}
