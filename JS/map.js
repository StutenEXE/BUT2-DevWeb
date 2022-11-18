const COORD_CENTRE_PARIS = [48.856614, 2.3522219];
let map;
let tiles;
let fontainesData;
$(document).ready(init);

function init() {
    setupMap();
    
    getData();

    $("#MyPosition").click(setupUserPosition)
}

function setupMap() {
    map = L.map('map', {
        center: COORD_CENTRE_PARIS,
        zoom: 12
    });

    tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Map realiste
    // tiles = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    //     attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    // }).addTo(map);
}

function setupUserPosition() {
    navigator.geolocation.getCurrentPosition(
                (position) => {
                    L.circle([position.coords.latitude, position.coords.longitude], {
                        radius: 10,
                        color: "#07DA63",
                        fillColor: "#07DA63",
                        fillOpacity: 1
                    }).addTo(map).bindPopup("User position");
                    map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), 17);
                }, 
                (error) => console.log("Bug in user tracking")
            );
}

function getData() {
    $.getJSON("https://opendata.paris.fr/api/records/1.0/search/?dataset=fontaines-a-boire&q=&rows=10000&facet=type_objet&facet=modele&facet=commune&facet=dispo",
            (data) => fontainesData = data);
}

// $.getJSON("https://opendata.paris.fr/api/records/1.0/search/?dataset=fontaines-a-boire&q=&rows=10000&facet=type_objet&facet=modele&facet=commune&facet=dispo",
// (data) => {
//     fontainesData = data;
//     for (fontaine of data.records) {
//         L.marker([fontaine.fields.geo_shape.coordinates[1], fontaine.fields.geo_shape.coordinates[0]]).addTo(map);
//     }
// });