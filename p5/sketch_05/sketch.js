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



// С использованием определенной выше функции подключим шрифты по списку.


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
    let pos = new p5.Vector(10, 0);
    
    background(255);

    for(let i = 0; i < fontNames.length; i++) {
        fill(0);
        textFont(fontNames[i]);
        let fs = map(mouseX, 0, width, 6, 600);
        textSize(fs);
        let str = 'Шрифт — ' + fontNames[i];
//        pos.x = 10;
//        pos.y += 10 + i*1.2*fs + textAscent() + textDescent();
        pos.y += textAscent() + 20;
        text(str, pos.x, pos.y);//, width, textAscent() + textDescent());

        text_width = textWidth(str);
        text_ascent = textAscent();
        text_descent = textDescent();
        text_height = text_ascent + text_descent;
        //метрика всей строки
        noStroke();
        fill(50);
        ellipse(pos.x + 0.5, pos.y + 0.5, 7, 7);
        ellipse(pos.x + text_width + 0.5, pos.y + 0.5, 7, 7);
        stroke(255);
        point(pos.x, pos.y);
        point(pos.x + text_width, pos.y);

        stroke(0, 255, 0);
        line(pos.x, pos.y - text_ascent, pos.x + text_width, pos.y - text_ascent);
        line(pos.x, pos.y + text_descent, pos.x + text_width, pos.y + text_descent);
        pos.y += text_descent;

//        let ch_ext = base_font.getGlyph(str.charAt(i)).topExtent;
    }
}

// Обработка изменения размера окна


function windowResized() {
    //в случае изменения окна надо перестроить область рисования
    resizeCanvas(windowWidth, windowHeight);
}
