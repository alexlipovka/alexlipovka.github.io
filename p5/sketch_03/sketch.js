// Настройка области рисования

// Настраиваем область рисования. Сразу же сделаем заливку белым цветом.


function setup() {
    //стандартное создание области рисования размеров с текущее окно
    createCanvas(windowWidth, windowHeight);
    background(255);
}

// Рисуем квадратики

// Рисование будет только при нажатой левой клавише мыши.


function draw() {
    fill(100);
    textSize(16);
    text('ЛКМ — рисование\nПРОБЕЛ — сброс', 10, 10, 300, 100);
    noStroke(); //отключаем отрисовку обводок
    fill(160);
    rectMode(CORNERS);
    if(mouseIsPressed) {
        if(mouseButton === LEFT) {
            rect(mouseX, mouseY, pmouseX, pmouseY);
        }
    }
    if(keyIsPressed) {
        if(key === ' ') {
            background(255);
        }
    }
}



// Добавим поддержку устройств с сенсорными экранами.


function touchMoved() {
    fill(160);
    rect(mouseX, mouseY, pmouseX, pmouseY);
}

function touchStarted() {
    if(touches.length === 2) {
        background(255);
    }
}

// Обработка изменения размера окна


function windowResized() {
    //в случае изменения окна надо перестроить область рисования
    resizeCanvas(windowWidth, windowHeight);
}
