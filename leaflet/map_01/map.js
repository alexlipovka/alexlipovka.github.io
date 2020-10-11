// Веб-карта

// Зачастую код для создания и подключения карты внедряют в блок =script= в тело файла =index.html=, но в целом удобнее вынести код в отдельный файл =map.js=. Важно, чтобы ссылка на этот файл была после создания блока =div= с идентификатором карты.


var mymap = L.map('mapid').setView([56.03, 92.9], 12);

L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    opacity: 1.0,
    attribution: '<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
    minZoom: 1,
    maxZoom: 28,
    minNativeZoom: 0,
    maxNativeZoom: 19
}).addTo(mymap);
