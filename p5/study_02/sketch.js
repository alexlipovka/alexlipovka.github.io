let img;

function setup() {
  createCanvas(windowWidth, windowHeight);
  img = loadImage('assets/worldbw.jpg');
}

function drawRect (rectSize) {
  rect(0, 0, rectSize, rectSize);
}

function drawCursor (num, trans) {
  push();
  // angleMode(DEGREES);
  for(let i = 0; i < num; i++) {
    rotate(2*PI / num);
    push();
    translate(trans, 0);
    drawRect(20);
    pop();
  }
  pop();
}

function draw() {
  background(80);

  image(img, 0, 0);

  rectMode(CENTER);
  noStroke();

  push();
  translate(mouseX, mouseY);
  
  fill(map(mouseX, 0, width, 0, 255), map(mouseY, 0, height, 0, 255), 0);
  drawCursor(map(mouseX, 0, width, 1, 32), map(mouseY, 0, height, 50, 200));
  
  fill(0, 255, 0);
  drawRect(90);
  fill(0, 0, 255);
  drawRect(60);
  fill(255, 0, 0);
  drawRect(30);
  pop();

  stroke(255);
  line(0, 0, mouseX, mouseY);
  line(0, height, mouseX, mouseY);
  line(width, 0, mouseX, mouseY);
  line(width, height, mouseX, mouseY);
}
