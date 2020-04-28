// Подключаем изображение с вебкамеры


let capture; //переменная, которая хранит подключение к вебкамере

function setup() {
    //стандартное создание области рисования размеров с текущее окно
    createCanvas(windowWidth, windowHeight);
    //подключение к вебкамере
    capture = createCapture(VIDEO);
    //включение вебкамеры и запуск видеопотока определенного размера
    capture.size(640, 480);
}

function draw() {
    //заливка однородным тоном
    background(0);
    //отрисовка последнего полученного кадра
    image(capture, 0, 0, 640, 480);
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
