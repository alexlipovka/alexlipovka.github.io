// Расположение файлов


let capture;

function setup() {
    createCanvas(windowWidth, windowHeight);
    capture = createCapture(VIDEO);
    capture.size(640, 480);
}

function draw() {
    background(0);
    image(capture, 0, 0);
    filter(INVERT);
    ellipseMode(CENTER);
    ellipse(mouseX, mouseY, 20, 20);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
