let walls = [];
let particle;
let xoff = 0;
let yoff = 10;

let sceneW;
let sceneH;

let sliderFOV;
let sliderRes;

// let ray;

function setup() {
	//стандартное создание области рисования размеров с текущее окно
	createCanvas(windowWidth, windowHeight);
	sceneW = windowWidth / 2;
	sceneH = windowHeight;

	for (let i = 0; i < 5; i++) {
		walls.push(new Boundary(random(sceneW), random(sceneH), random(sceneW), random(sceneH)));
	}
	walls.push(new Boundary(0, 0, sceneW, 0));
	walls.push(new Boundary(sceneW, 0, sceneW, sceneH));
	walls.push(new Boundary(sceneW, sceneH, 0, sceneH));
	walls.push(new Boundary(0, sceneH, 0, 0));

	// walls[0] = new Boundary(400, 100, 400, 600);
	particle = new Particle();
	particle.pos.x = sceneW / 2;
	particle.pos.y = sceneH / 2;
	// ray = new Ray(createVector(200, 200), createVector(1, 0));
	sliderFOV = createSlider(0, 360, particle.fov);
	sliderFOV.position(10, 10);
	sliderFOV.input(changeFOV);

	sliderRes = createSlider(8, 860, 400);
	sliderRes.position(10, 50);
	sliderRes.input(changeRes);
}

function changeFOV() {
	const fov = sliderFOV.value();
	particle.updateFOV(fov);
}

function changeRes() {
	const res = sliderRes.value();
	particle.updateRes(res);
}

function keyPressed() {
	if (key === ' ') {
		//пробел
		walls = [];
		for (let i = 0; i < 5; i++) {
			walls.push(new Boundary(random(sceneW), random(sceneH), random(sceneW), random(sceneH)));
		}
		walls.push(new Boundary(0, 0, sceneW, 0));
		walls.push(new Boundary(sceneW, 0, sceneW, sceneH));
		walls.push(new Boundary(sceneW, sceneH, 0, sceneH));
		walls.push(new Boundary(0, sceneH, 0, 0));
	}
}

function draw() {
	if (keyIsDown(65)) {
		//'a'
		particle.rotate(-0.05);
	} else if (keyIsDown(68)) {
		//'d'
		particle.rotate(0.05);
	} else if (keyIsDown(87)) {
		//'w'
		particle.move(2);
	} else if (keyIsDown(83)) {
		//'s'
		particle.move(-2);
	}

	if (particle.pos.x < 0) {
		particle.pos.x = 0;
	}
	if (particle.pos.x > sceneW) {
		particle.pos.x = sceneW;
	}
	if (particle.pos.y < 0) {
		particle.pos.y = 0;
	}
	if (particle.pos.y > sceneH) {
		particle.pos.y = sceneH;
	}

	//заливка однородным тоном
	background(0);
	// ray.lookAt(mouseX, mouseY);
	for (let wall of walls) {
		wall.show();
	}
	// particle.update(mouseX, mouseY);
	// particle.update(noise(xoff) * sceneW, noise(yoff) * sceneH);
	const scene = particle.look(walls);
	particle.show();
	xoff += 0.005;
	yoff += 0.005;

	const w = sceneW / scene.length;
	push();
	translate(sceneW, 0);
	for (let i = 0; i < scene.length; i++) {
		noStroke();
		const s = scene[i] * scene[i];
		const wSq = sceneW * sceneW;
		// const b = map(scene[i], 0, sceneW, 255, 0);
		const b = map(s, 0, wSq, 255, 0);
		fill(b);
		// const h = map(scene[i], 0, width, sceneH, 0);
		const h = map(s, 0, wSq, sceneH, 0);
		rectMode(CENTER);
		rect(i * w + w / 2, sceneH / 2, w + 1, h);
	}
	pop();
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
