function setup() {
	//стандартное создание области рисования размеров с текущее окно
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	//заливка однородным тоном
	background(100);
	//отрисовка курсора
	ellipseMode(CENTER);
	ellipse(mouseX, mouseY, 19, 19);
}

function windowResized() {
	//в случае изменения окна надо перестроить область рисования
	resizeCanvas(windowWidth, windowHeight);
}
