// Настройка области рисования

// Настраиваем область рисования.


function setup() {
    //стандартное создание области рисования размеров с текущее окно
    createCanvas(windowWidth, windowHeight);
}

// RGB и CMYK

// Нарисуем 8 образцов по моделям RGB и CMYK.


function draw() {
    background(255); //очистка окна
    noStroke(); //отключаем отрисовку обводок
    colorMode(RGB, 255); //включаем режим RGB
    let sampleWidth = width / 5;
    let sampleHeight = height / 8;
    let step = 0;
    fill(255, 0, 0); //красный (red)
    rect(0, sampleHeight * (step++), sampleWidth, sampleHeight);
    fill(0, 255, 0); //зеленый (green)
    rect(0, sampleHeight * (step++), sampleWidth, sampleHeight);
    fill(0, 0, 255); //синий (blue)
    rect(0, sampleHeight * (step++), sampleWidth, sampleHeight);
    fill(0, 255, 255); //голубой (cyan)
    rect(0, sampleHeight * (step++), sampleWidth, sampleHeight);
    fill(255, 0, 255); //пурпурный (magenta)
    rect(0, sampleHeight * (step++), sampleWidth, sampleHeight);
    fill(255, 255, 0); //желтый (yellow)
    rect(0, sampleHeight * (step++), sampleWidth, sampleHeight);
    fill(255, 255, 255); //белый (white)
    rect(0, sampleHeight * (step++), sampleWidth, sampleHeight);
    fill(0, 0, 0); //черный (black)
    rect(0, sampleHeight * (step++), sampleWidth, sampleHeight);

// RGB и HSB


sampleWidth *= 2;
    sampleHeight = height;
    let red, green, blue;
    let hue, saturation, brightness;
    //blue = hue = map(mouseX, 0, width, 0, 100);
    blue = hue = 100;
    for(let i = 0; i < sampleWidth; i++) {
        red = saturation = map(i, 0, sampleWidth, 0, 100);
        green = map(i, 0, sampleWidth, 0, 100);            
        blue = 100 - red;
        for(let j = 0; j < sampleHeight; j++) {
            brightness = map(j, 0, sampleHeight, 0, 100);
            colorMode(RGB, 100.0);
            stroke(color(red-brightness, brightness-green, blue-brightness));
            point(width / 5 + i, j);
            colorMode(HSB, 100.0);
            stroke(color(hue, saturation, brightness));
            point(width / 5 * 3 + i, j);
        }
    }
}

// Обработка изменения размера окна


function windowResized() {
    //в случае изменения окна надо перестроить область рисования
    resizeCanvas(windowWidth, windowHeight);
}
