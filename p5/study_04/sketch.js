function getFontFromGoogle(fontName) {
  let link = document.createElement("link");
  link.id = 'font';
  link.href = "https=//fonts.googleapis.com/css?family=" + fontName + '&display=swap';
  console.log(link.href);
  link.rel = "stylesheet";
  document.head.appendChild(link);

  link.addEventListener('load', function () {
      console.log('font ' + fontName + ' loaded');
  });
}

class MovingObj {
  constructor(ix, iy, ia) {
    this.x = ix,
    this.y = iy,
    this.size = 50,
    this.speedX = 0,
    this.speedY = 0,
    this.acc = ia
  }

  update() {
    let v1 = createVector(mouseX - this.x, mouseY - this.y);
    v1.normalize();
    v1.mult(this.acc);
    this.speedX += v1.x;
    this.speedY += v1.y;
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(0, 255, 0);
    ellipse(0, 0, this.size * 1.5, this.size);
    fill(255);
    ellipse(0, 0, this.size * 0.6, this.size * 0.6);
    pop();
  }
}

let obj = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  getFontFromGoogle('Didact Gothic');

  for(let i = 0; i < 3; i++) {
    append(obj, new MovingObj(random(0, width), random(0, height), random(0.1, 0.5)));
  }
}

function draw() {
  background(180);
  textFont('Didact Gothic');
  textSize(48);
  text('Координаты ' + mouseX + ' ' + mouseY, 
        constrain(mouseX, 0, width - textWidth('Координаты ' + mouseX + ' ' + mouseY)), 
        constrain(mouseY + 60, 0, height - 48 + textDescent()));

  for(let i = 0; i < obj.length; i++) {
    obj[i].update();
    obj[i].draw();
  }
 }
