function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
}

function draw() { 
	background(255);
  // put drawing code here

  ellipseMode(CENTER);
  ellipse(mouseX, mouseY, 200, 200);
}

function windowResized() {
  
	resizeCanvas(windowWidth, windowHeight);
}