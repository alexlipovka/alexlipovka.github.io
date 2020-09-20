// https://web.archive.org/web/20160418004150/http://freespace.virgin.net/hugo.elias/models/m_fire.htm
// https://www.youtube.com/watch?v=X0kjv0MozuY

let buf1;
let buf2;
let cooling;

let ystart = 0.0;

function setup() {
	//стандартное создание области рисования размеров с текущее окно
	createCanvas(windowWidth, windowHeight);
	buf1 = createGraphics(400, 400);
	buf2 = createGraphics(400, 400);
	cooling = createImage(400, 400);

	buf1.loadPixels();
	buf2.loadPixels();
	for (let x = 0; x < buf1.width; x++) {
		for (let y = 0; y < buf1.height; y++) {
			buf1.pixels[(x + y * buf1.width) * 4 + 0] = 0;
			buf2.pixels[(x + y * buf1.width) * 4 + 0] = 0;
			buf1.pixels[(x + y * buf1.width) * 4 + 1] = 0;
			buf2.pixels[(x + y * buf1.width) * 4 + 1] = 0;
			buf1.pixels[(x + y * buf1.width) * 4 + 2] = 0;
			buf2.pixels[(x + y * buf1.width) * 4 + 2] = 0;
			buf1.pixels[(x + y * buf1.width) * 4 + 3] = 255;
			buf2.pixels[(x + y * buf1.width) * 4 + 3] = 255;
		}
	}
	buf1.updatePixels();
	buf2.updatePixels();
	fire(2);

	cool();
	// console.log(getC(buf1, (0 + (height - 1) * width) * 4));
}

function mouseDragged() {
	buf1.noStroke();
	buf2.noStroke();
	buf1.fill(255);
	buf2.fill(255);
	buf1.ellipse(mouseX, mouseY, 20, 20);
	buf2.ellipse(mouseX, mouseY, 20, 20);
}

function cool() {
	cooling.loadPixels();
	let xoff = 0.0;
	let increment = 0.01;
	for (let x = 0; x < cooling.width; x++) {
		xoff += increment;
		let yoff = ystart;
		for (let y = 0; y < cooling.height; y++) {
			yoff += increment;
			let n = noise(xoff, yoff);
			// if (n < 0.5) {
			// 	n = 0;
			// }
			let bright = n * 255;
			cooling.pixels[(x + y * cooling.width) * 4 + 0] = bright;
			cooling.pixels[(x + y * cooling.width) * 4 + 1] = bright;
			cooling.pixels[(x + y * cooling.width) * 4 + 2] = bright;
			cooling.pixels[(x + y * cooling.width) * 4 + 3] = 255;
		}
	}
	cooling.updatePixels();
	ystart += increment * 5;
}

function fire(rows) {
	buf1.loadPixels();
	buf2.loadPixels();
	for (let x = 0; x < buf1.width; x++) {
		for (let h = 1; h <= rows; h++) {
			let y = buf1.height - h;
			let index = (x + y * buf1.width) * 4;
			buf1.pixels[index] = 255;
			buf1.pixels[index + 1] = 255;
			buf1.pixels[index + 2] = 255;
			buf2.pixels[index] = 255;
			buf2.pixels[index + 1] = 255;
			buf2.pixels[index + 2] = 255;
		}

		// console.log(index);s
	}
	buf1.updatePixels();
	buf2.updatePixels();
}

function getC(img, index) {
	return [ img.pixels[index], img.pixels[index + 1], img.pixels[index + 2], img.pixels[index + 3] ];
}

function draw() {
	//заливка однородным тоном
	cool();
	background(0);
	buf1.loadPixels();
	buf2.loadPixels();
	cooling.loadPixels();
	for (let y = 1; y < buf1.height - 1; y++) {
		for (let x = 1; x < buf1.width - 1; x++) {
			let ind = (x + (y - 1) * buf1.width) * 4;
			let ind0 = (x + y * buf1.width) * 4;
			let ind1 = (x + (y - 1) * buf1.width) * 4;
			let ind2 = (x + (y + 1) * buf1.width) * 4;
			let ind3 = (x - 1 + y * buf1.width) * 4;
			let ind4 = (x + 1 + y * buf1.width) * 4;
			let c1 = getC(buf1, ind1);
			let c2 = getC(buf1, ind2);
			let c3 = getC(buf1, ind3);
			let c4 = getC(buf1, ind4);
			let c5 = getC(cooling, ind0);
			// console.log(c5);
			// noLoop();
			// for (let c = floor(noise(ystart) * 3); c < 3; c += 3) {
			for (let c = 0; c < 3; c++) {
				let color = (c1[c] + c2[c] + c3[c] + c4[c]) / 4.0;
				color -= c5[c] / 10.0;
				if (color < 0) {
					color = 0;
				}
				buf2.pixels[ind + c] = color;
				// console.log(color);
				// noLoop();
				// break;
				// console.log(buf2.pixels[ind + c]);
			}
			// let p = getC(buf2, ind);
		}
	}
	buf2.updatePixels();
	let temp = buf1;
	buf1 = buf2;
	buf2 = temp;
	image(buf2, cooling.width, 0);
	image(cooling, 0, 0);
}

function windowResized() {
	//в случае изменения окна надо перестроить область рисования
	resizeCanvas(windowWidth, windowHeight);
}
