// Веб-карта


var mymap = L.map('mapid').setView([56.03, 92.9], 12);
// mymap.options.crs = L.CRS.EPSG3395;

// L.tileLayer('http://vec01.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}', {
//     opacity: 1.0,
//     attribution: '',
//     minZoom: 1,
//     maxZoom: 28,
//     minNativeZoom: 0,
//     maxNativeZoom: 18
// }).addTo(mymap);  

L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    opacity: 1.0,
    attribution: '<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
    minZoom: 1,
    maxZoom: 28,
    minNativeZoom: 0,
    maxNativeZoom: 19
}).addTo(mymap);
