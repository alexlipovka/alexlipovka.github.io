let myMap;
let canvas;

const mappa = new Mappa('Leaflet');

const options = {
	lat: 56,
	lng: 93,
	zoom: 12,
	style: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png'
};

let border; //граница территории
let coords;

let zones; //зонирование
let zoning = {
	coords: [],
	names: [],
	kz: [],
	centroids: []
};
let newCoords = [];
let dragged = false;

let noisePos = 0.0;
let noiseStep = 0.005;

function preload() {
	border = loadJSON('./assets/border.geojson');
	zones = loadJSON('./assets/zoning.geojson');
}

function ptInPoly(point, vs) {
	// ray-casting algorithm based on
	// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
	var x = point[0],
		y = point[1];
	// print(point[0]);
	var inside = false;
	for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
		var xi = vs[i][0],
			yi = vs[i][1];
		var xj = vs[j][0],
			yj = vs[j][1];

		var intersect = yi > y != yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
		if (intersect) inside = !inside;
	}

	return inside;
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);

	myMap = mappa.tileMap(options);

	myMap.overlay(canvas);

	print('Загружен JeoJSON файл');
	print(border);
	coords = border.features[0].geometry.coordinates[0];

	print(zones);

	for (let i = 0; i < zones.features.length; i++) {
		zoning.coords.push(zones.features[i].geometry.coordinates[0]);
		zoning.names.push(zones.features[i].properties.name);
		zoning.kz.push(zones.features[i].properties.kz);

		let centroid = { x: 0, y: 0 };
		for (let c = 0; c < zoning.coords[i].length; c++) {
			centroid.x += zoning.coords[i][c][1];
			centroid.y += zoning.coords[i][c][0];
		}
		centroid.x /= zoning.coords[i].length;
		centroid.y /= zoning.coords[i].length;
		zoning.centroids.push(centroid);
	}
	// print(zoning);
}

function draw() {
	noisePos += noiseStep;
	// background(80);

	clear();

	noFill();
	stroke(255, 0, 0);
	strokeWeight(3);
	beginShape();
	for (let i = 0; i < coords.length; i++) {
		let pt = myMap.latLngToPixel(coords[i][1], coords[i][0]);
		vertex(pt.x, pt.y);
	}
	endShape(CLOSE);

	noFill();
	stroke(0, 0, 255);
	strokeWeight(2);
	for (let z = 0; z < zoning.coords.length; z++) {
		beginShape();
		for (let i = 0; i < zoning.coords[z].length; i++) {
			let pt = myMap.latLngToPixel(zoning.coords[z][i][1], zoning.coords[z][i][0]);
			vertex(pt.x, pt.y);
		}
		endShape(CLOSE);
	}

	noStroke();
	fill(0);
	for (let z = 0; z < zoning.coords.length; z++) {
		let pt = myMap.pixelToLatLng(mouseX, mouseY);
		let point = [];
		// print(pt);
		point[0] = pt.lng;
		point[1] = pt.lat;
		// let centPt = myMap.latLngToPixel(zoning.centroids[i].x, zoning.centroids[i].y);
		// let d = dist(mouseX, mouseY, centPt.x, centPt.y);
		// print(ptInPoly(point, zoning.coords[i]));
		if (ptInPoly(point, zoning.coords[z])) {
			text(zoning.kz[z], mouseX + 10, mouseY - 10);
			fill(0, 255, 0, 100);
			noStroke();
			beginShape();
			for (let i = 0; i < zoning.coords[z].length - 1; i++) {
				let pt = myMap.latLngToPixel(zoning.coords[z][i][1], zoning.coords[z][i][0]);
				vertex(pt.x + noise(noisePos + i) * 80 - 40, pt.y + noise(noisePos + i) * 80 - 40);
			}
			endShape(CLOSE);
		}
	}

	ellipseMode(CENTER);

	stroke(0, 0, 255);
	strokeWeight(2);
	beginShape();
	for (i = 0; i < newCoords.length; i++) {
		let pt = myMap.latLngToPixel(newCoords[i].lat, newCoords[i].lng);
		// ellipse(pt.x, pt.y, 20, 20);
		vertex(pt.x, pt.y);
	}
	endShape(CLOSE);
}

// function mouseReleased() {
// 	if (!dragged) {
// 		print(myMap.pixelToLatLng(mouseX, mouseY));
// 		newCoords.push(myMap.pixelToLatLng(mouseX, mouseY));
// 	}
// }

// function mouseMoved() {
// 	if (mouseIsPressed) {
// 		dragged = true;
// 	} else {
// 		dragged = false;
// 	}
// }
