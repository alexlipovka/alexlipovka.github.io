// Подключаем изображение с вебкамеры


let capture; //переменная, которая хранит подключение к вебкамере
let img;

function setup() {
    //стандартное создание области рисования размеров с текущее окно
    createCanvas(windowWidth, windowHeight);
    //подключение к вебкамере
    capture = createCapture(VIDEO);
    //включение вебкамеры и запуск видеопотока определенного размера
    capture.size(640, 480);
    img = loadImage("./assets/worldbw.jpg");
}

function draw() {
    //заливка однородным тоном
    //background(0);
    image(img, 0, 0, width, height);
    //отрисовка последнего полученного кадра
    image(capture, width/2 - capture.width/2,
          height/2 - capture.height/2, 640, 480);
    //включение фильтра инверсии
    filter(INVERT);
    //отрисовка курсора
    ellipseMode(CENTER);
    ellipse(mouseX, mouseY, 20, 20);
}

function windowResized() {
    //в случае изменения окна надо перестроить область рисования
    resizeCanvas(windowWidth, windowHeight);
}
