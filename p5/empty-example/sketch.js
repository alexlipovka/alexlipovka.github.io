rectSize = 100;
rectBaseSize = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //frameRate(10);
}

function draw() {
  rectSize = rectBaseSize + 20 * sin(frameCount);
  background(0, 0, 255, 100); //задний фон
  fill(mouseX, mouseY, 0);
  noStroke();
  //задаем режим отображения от центра
  rectMode(CENTER);
  //rectMode(CORNER);
  rect(mouseX, mouseY, 40, 40, 20, 20, 20, 0);
  cursorLine(30, 80); 
  cursorLine(30, -80); 
}

function cursorLine (num, offset) {
  rectMode(CENTER);
  fill(255);
  for(let i = 0; i < num; i++) {
    rect(mouseX + i * 20 - num / 2 * 20, mouseY + offset, 10, 10 * i/4, 4);
  }   
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}