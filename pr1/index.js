import CustomDiv from './modules/js/customDiv';

const board = document.querySelector('.board');
const size = document.querySelector('.size');
const textarea = document.querySelector('.jsonData');
const wall = document.querySelector('.walls');
const tresure = document.querySelector('.tresure');
const light = document.querySelector('.light');

window.addEventListener('load', () => {
	board.innerHTML = '';
	new CustomDiv(100, 100, Math.sqrt(+size.value), true);
	for (let i = 0; i < Math.sqrt(+size.value); i++) {
		for (let z = 0; z < Math.sqrt(+size.value); z++) {
			const customDiv = new CustomDiv(100, 100, Math.sqrt(+size.value));

			customDiv.setXY(z * 62, i * 70 + (z % 2) * 35);

			console.log(customDiv);
			board.append(customDiv.getRoot());
		}
	}
});

size.addEventListener('input', () => {
	board.innerHTML = '';
	textarea.value = '';
	new CustomDiv(100, 100, Math.sqrt(+size.value), true);

	for (let i = 0; i < Math.sqrt(+size.value); i++) {
		for (let z = 0; z < Math.sqrt(+size.value); z++) {
			const customDiv = new CustomDiv(100, 100, Math.sqrt(+size.value));
			wall.addEventListener('click', () => {
				customDiv.changeType('wall');
			});
			tresure.addEventListener('click', () => {
				customDiv.changeType('tresure');
			});
			light.addEventListener('click', () => {
				customDiv.changeType('light');
			});
			customDiv.setXY(z * 62, i * 70 + (z % 2) * 35);

			console.log(customDiv);
			board.append(customDiv.getRoot());
		}
	}
});
