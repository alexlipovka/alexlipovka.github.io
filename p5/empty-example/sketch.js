function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0)
  // put drawing code here
  ellipseMode(CENTER);
  ellipse(mouseX, mouseY, 20, 20);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}