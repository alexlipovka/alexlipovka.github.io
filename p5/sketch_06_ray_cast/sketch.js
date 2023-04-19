let walls = [];
let particle;
let xoff = 0;
let yoff = 10;

let sceneW;
let sceneH;

// let ray;

function setup() {
	//стандартное создание области рисования размеров с текущее окно
	createCanvas(windowWidth, windowHeight);
	sceneW = windowWidth / 2;
	sceneH = windowHeight / 2;

	for (let i = 0; i < 10; i++) {
		walls.push(new Boundary(random(width), random(height), random(width), random(height)));
	}
	walls.push(new Boundary(-1, -1, width + 1, -1));
	walls.push(new Boundary(width + 1, -1, width + 1, height + 1));
	walls.push(new Boundary(width + 1, height + 1, -1, height + 1));
	walls.push(new Boundary(-1, height + 1, -1, -1));
	// walls[0] = new Boundary(100, 100, 600, 100);
	// walls[1] = new Boundary(600, 100, 600, 600);
	// walls[2] = new Boundary(600, 600, 100, 600);
	// walls[3] = new Boundary(100, 600, 100, 100);

	// walls[0] = new Boundary(400, 100, 400, 600);
	particle = new Particle();
	// ray = new Ray(createVector(200, 200), createVector(1, 0));
}

function draw() {
	//заливка однородным тоном
	background(0);
	// ray.lookAt(mouseX, mouseY);
	for (let wall of walls) {
		wall.show();
	}
	particle.update(mouseX, mouseY);
	// particle.update(noise(xoff) * width, noise(yoff) * height);
	particle.show();
	particle.look(walls);

	xoff += 0.005;
	yoff += 0.005;

	// ray.show();
	// let pt = ray.cast(walls[0]);
	// if (pt) {
	// 	fill(255);
	// 	ellipse(pt.x, pt.y, 5);
	// }
}

function windowResized() {
	//в случае изменения окна надо перестроить область рисования
	resizeCanvas(windowWidth, windowHeight);
}
