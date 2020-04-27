function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0)
  // put drawing code here
  ellipse(mouseX, mouseY, 50, 50);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}