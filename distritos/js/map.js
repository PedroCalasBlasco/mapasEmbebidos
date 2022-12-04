
var crs22185 = new L.Proj.CRS(
      "EPSG:22185",
      "+proj=tmerc +lat_0=-90 +lon_0=-60 +k=1 +x_0=5500000 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crss", //http://spatialreference.org/ref/epsg/25830/proj4/
      {
        resolutions: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5],
      }
    );

var map = L.map("map").setView([-31.617462, -60.71049], 13);

var distritos = L.tileLayer.wms(distritosWms, {
	layers: "distrito",
	format: 'image/jpeg',
	transparent: true,
    version: '1.1.0',
    maxZoom: 14,
    minZoom: 12,
    
  
}).addTo(map);


// var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution:
//             '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);
    

  proj4.defs(
      "EPSG:22185",
      "+proj=tmerc +lat_0=-90 +lon_0=-60 +k=1 +x_0=5500000 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs"
  );



fetch(oficinas)
.then((res) => res.json())
.then((data) => {
    layer = L.Proj.geoJson(data, {
        pointToLayer: function (feature, latlng) { 
            return L.circleMarker(latlng, {
                radius: 5,
                fillColor: "#3388ff",
                color: "#3388ff"
            });
        },
        onEachFeature: function (feature, layer) {
            return layer.bindPopup(` <h5>${feature.properties.name}</h5><hr><p>${feature.properties.dirección}</p> 
               <p>${feature.properties.descriptio} hs</p><p>${feature.properties.caja} hs</p>
               <p>${feature.properties["e-mail"]} hs</p>
               <p>Teléfono: ${feature.properties.teléfono}</p>`);
        },
    }).addTo(map);
    })
.catch((err) => console.error(err));