let id = -1;

let level = [];
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
				level = level.map((el) => {
					if (el.id == e.currentTarget.id) {
						return {
							id: e.currentTarget.id,
							x,
							y,
							dirOut: t % 6,
							dirIn: (t + 3) % 6,
							type: this.type,
						};
					} else {
						return el;
					}
				});
			} else {
				level.push(obj);
			}

			let textV = { size: level.length, level: [...level] };
			let textarea = document.querySelector('.jsonData');
			textarea.value = JSON.stringify(textV, null, 2);
		};
	}

	changeType(type) {
		this.type = type;
	}

	getRoot() {
		return this.div;
	}

	setXY(x, y) {
		this.div.style.left = `${x + 300}px`;
		this.div.style.top = `${y + 10}px`;
	}
}
