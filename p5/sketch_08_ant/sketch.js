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

function setup() {
	//стандартное создание области рисования размеров с текущее окно
	// createCanvas(400, 400);
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

function draw() {
	loadPixels();
	for (let f = 0; f < 100; f++) {
		if (pixels[(ant.y * width + ant.x) * 4] == 255) {
			pixels[(ant.y * width + ant.x) * 4] = 0;
			pixels[(ant.y * width + ant.x) * 4 + 1] = 0;
			pixels[(ant.y * width + ant.x) * 4 + 2] = 255;
			ant.dir = (ant.dir + 1) % 4;
			// console.log(ant.dir);
		} else if (pixels[(ant.y * width + ant.x) * 4] == 0) {
			pixels[(ant.y * width + ant.x) * 4] = 255;
			pixels[(ant.y * width + ant.x) * 4 + 1] = 0;
			pixels[(ant.y * width + ant.x) * 4 + 2] = 0;
			ant.dir = (ant.dir - 1 + 4) % 4;
			// console.log(ant.dir);
		}
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
