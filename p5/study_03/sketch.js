function getFontFromGoogle(fontName) {
  let link = document.createElement("link");
  link.id = 'font';
  link.href = "https://fonts.googleapis.com/css?family=" + fontName + '&display=swap';
  console.log(link.href);
  link.rel = "stylesheet";
  document.head.appendChild(link);

  link.addEventListener('load', function () {
      console.log('font ' + fontName + ' loaded');
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  getFontFromGoogle('Caveat');
  getFontFromGoogle('Didact Gothic');
}

function draw() {
  background(180);
  textFont('Didact Gothic');
  textSize(48);
  text('Координаты ' + mouseX + ' ' + mouseY, mouseX, mouseY);
 }
