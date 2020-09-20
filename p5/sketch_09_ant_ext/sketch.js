//https://en.wikipedia.org/wiki/Langton%27s_ant#cite_note-6

let ant = {
	x: 200,
	y: 200,
	dir: 0
};

const dir_up = 0;
const dir_right = 1;
const dir_down = 2;
const dir_left = 3;

let prev_turn = 0;

const turn_right = 0;
const turn_left = 1;

const c1 = [ 255, 255, 255, 255 ];
const c2 = [ 200, 200, 200, 255 ];
const c3 = [ 150, 150, 150, 255 ];
const c4 = [ 50, 50, 50, 255 ];
const c5 = [ 0, 0, 0, 255 ];

const sc = 2;

function setup() {
	//стандартное создание области рисования размеров с текущее окно
	// createCanvas(400, 400);
	// pixelDensity(0.5);
	createCanvas(windowWidth, windowHeight);
	console.log(ant);
	ant.x = floor(width / 2);
	ant.y = floor(height / 2);
	console.log(ant);
	background(255);
	for (let i = 0; i < 12; i++) {
		console.log((0 + i) % 4);
	}
}

function getC() {
	// return get(ant.x, ant.y);
	return [
		pixels[(ant.y * width + ant.x) * 4],
		pixels[(ant.y * width + ant.x) * 4 + 1],
		pixels[(ant.y * width + ant.x) * 4 + 2],
		pixels[(ant.y * width + ant.x) * 4 + 3]
	];
}

function setC(c) {
	// set(ant.x, ant.y, c);
	pixels[(ant.y * width + ant.x) * 4] = c[0];
	pixels[(ant.y * width + ant.x) * 4 + 1] = c[1];
	pixels[(ant.y * width + ant.x) * 4 + 2] = c[2];
	pixels[(ant.y * width + ant.x) * 4 + 3] = c[3];
}

function draw() {
	loadPixels();
	// console.log(getC());
	// console.log(JSON.stringify(getC()) == JSON.stringify(c1));
	// noLoop();
	for (let f = 0; f < 100; f++) {
		if (JSON.stringify(getC()) == JSON.stringify(c1)) {
			setC(c2);
			ant.dir = (ant.dir + 1) % 4;
		} else if (JSON.stringify(getC()) == JSON.stringify(c2)) {
			setC(c3);
			ant.dir = (ant.dir + 1) % 4;
		} else if (JSON.stringify(getC()) == JSON.stringify(c3)) {
			setC(c4);
			ant.dir = (ant.dir - 1 + 4) % 4;
		} else if (JSON.stringify(getC()) == JSON.stringify(c4)) {
			setC(c5);
			ant.dir = (ant.dir - 1 + 4) % 4;
		} else if (JSON.stringify(getC()) == JSON.stringify(c5)) {
			setC(c2);
			ant.dir = (ant.dir + 1) % 4;
		}
		// if (pixels[(ant.y * width + ant.x) * 4] == 255 && pixels[(ant.y * width + ant.x) * 4 + 1] == 255) {
		// 	pixels[(ant.y * width + ant.x) * 4] = 0;
		// 	pixels[(ant.y * width + ant.x) * 4 + 1] = 255;
		// 	pixels[(ant.y * width + ant.x) * 4 + 2] = 255;
		// 	ant.dir = (ant.dir + 1) % 4;
		// 	ant.dir = (ant.dir + 1) % 4;
		// 	// console.log(ant.dir);
		// } else if (pixels[(ant.y * width + ant.x) * 4] == 0 && pixels[(ant.y * width + ant.x) * 4 + 1] == 255) {
		// 	pixels[(ant.y * width + ant.x) * 4] = 0;
		// 	pixels[(ant.y * width + ant.x) * 4 + 1] = 0;
		// 	pixels[(ant.y * width + ant.x) * 4 + 2] = 255;
		// 	ant.dir = (ant.dir + 1) % 4;
		// 	// console.log(ant.dir);
		// } else if (pixels[(ant.y * width + ant.x) * 4] == 0 && pixels[(ant.y * width + ant.x) * 4 + 1] == 0) {
		// 	pixels[(ant.y * width + ant.x) * 4] = 255;
		// 	pixels[(ant.y * width + ant.x) * 4 + 1] = 0;
		// 	pixels[(ant.y * width + ant.x) * 4 + 2] = 0;
		// 	ant.dir = (ant.dir - 1 + 4) % 4;
		// 	// console.log(ant.dir);
		// } else if (pixels[(ant.y * width + ant.x) * 4] == 255 && pixels[(ant.y * width + ant.x) * 4 + 1] == 0) {
		// 	pixels[(ant.y * width + ant.x) * 4] = 255;
		// 	pixels[(ant.y * width + ant.x) * 4 + 1] = 255;
		// 	pixels[(ant.y * width + ant.x) * 4 + 2] = 0;
		// 	ant.dir = (ant.dir - 1 + 4) % 4;
		// 	// console.log(ant.dir);
		// }
		if (ant.dir == dir_up) {
			ant.y++;
		} else if (ant.dir == dir_down) {
			ant.y--;
		} else if (ant.dir == dir_left) {
			ant.x--;
		} else if (ant.dir == dir_right) {
			ant.x++;
		}

		if (ant.x > width - 1) {
			ant.x = 0;
		} else if (ant.x < 0) {
			ant.x = width - 1;
		}
		if (ant.y > height - 1) {
			ant.y = 0;
		} else if (ant.y < 0) {
			ant.y = height - 1;
		}
	}
	updatePixels();
	//заливка однородным тоном
	//отрисовка курсора
	// ellipseMode(CENTER);
	// ellipse(mouseX, mouseY, 9, 9);
}

function windowResized() {
	//в случае изменения окна надо перестроить область рисования
	resizeCanvas(windowWidth, windowHeight);
}
