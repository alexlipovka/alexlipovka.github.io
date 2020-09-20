function setup() {
	//стандартное создание области рисования размеров с текущее окно
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	//заливка однородным тоном
	background(0);
	//отрисовка курсора
	ellipseMode(CENTER);
	ellipse(mouseX, mouseY, 9, 9);
}

function windowResized() {
	//в случае изменения окна надо перестроить область рисования
	resizeCanvas(windowWidth, windowHeight);
}
