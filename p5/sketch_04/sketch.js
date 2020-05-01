// Настройка области рисования

// Настраиваем область рисования и загружаем шрифты.

// <<var2>> *2-й вариант*. Написание функции, которая будет модифицировать html-документ и формировать ссылки правильного вида для подключения требуемых шрифтов. Данная функция написана на основе [[https://editor.p5js.org/Roxanne/sketches/r1MCtfFp7][данной работы]].


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



// Подготовим список шрифтов для подключения. Данный список можно расширять, достаточно только знать название требуемого шрифта в библиотеке [[https://fonts.google.com/][Google Fonts]].


var fontNames = ['Poiret One', 'Lobster', 'Pacifico', 'Yanone Kaffeesatz', 'Amatic SC'];



// С использованием определенной выше фукнции подключим шрифты по списку.


function setup() {
    //стандартное создание области рисования размеров с текущее окно
    createCanvas(windowWidth, windowHeight);
    background(255);
    for(let i = 0; i < fontNames.length; i++) {
        getFontFromGoogle(fontNames[i]);
    }
}

// Отображение текста

// Выведем текст с использованием подключенных шрифтов.


function draw() {
    background(255);
    fill(0);
    for(let i = 0; i < fontNames.length; i++) {
        textFont(fontNames[i]);
        let fs = map(mouseX, 0, width, 6, 600);
        textSize(fs);
        text('Шрифт — ' + fontNames[i], 10, 10 + i*1.2*fs, width, fs*2);
    }
}

// Обработка изменения размера окна


function windowResized() {
    //в случае изменения окна надо перестроить область рисования
    resizeCanvas(windowWidth, windowHeight);
}
