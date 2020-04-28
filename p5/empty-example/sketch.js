let capture;

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(640, 480);
}

function draw() { 
	background(255);
  // put drawing code here

  image(capture, 0, 0);
  filter(INVERT);
  ellipseMode(CENTER);
  ellipse(mouseX, mouseY, 200, 200);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}