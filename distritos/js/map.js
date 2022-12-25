
//Obtengo los parametros y creo el objeto de parametros

const values = window.location.search;
const urlParams = new URLSearchParams(values)

let params = {}

for (const [key, value] of urlParams.entries()) {    
    params[key] = value
}



//repryección del mapa

var crs22185 = new L.Proj.CRS(
      "EPSG:22185",
      "+proj=tmerc +lat_0=-90 +lon_0=-60 +k=1 +x_0=5500000 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crss", //http://spatialreference.org/ref/epsg/25830/proj4/
      {
        resolutions: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5],
      }
    );

var map = L.map("map").setView([-31.617462, -60.71049], 13);

proj4.defs(
    "EPSG:22185",
    "+proj=tmerc +lat_0=-90 +lon_0=-60 +k=1 +x_0=5500000 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs"
);


console.log(params)


//capas wms

var distritos = L.tileLayer.wms(distritosWms, {
	layers: "distrito",
	format: 'image/jpeg',
	transparent: true,
    version: '1.1.0',
    maxZoom: 14,
    minZoom: 12,
    
  
}).addTo(map);


//capas wfs

let distritosWms = "https://geoserver.santafeciudad.gov.ar/geoserver/sitmax/wms?service=WMS&"

let oficinas = "https://geoserver.santafeciudad.gov.ar/geoserver/sitmax/wfs?version=1.1.0&service=wfs&request=GetFeature&typeName=sitmax:oficinas_de_distritos&outputFormat=json"

let oficinas2 = `https://geoserver.santafeciudad.gov.ar/geoserver/sitmax/${params.service}?version=${params.version}&service=wfs&
request=${params.request}&typeName=sitmax:${params.typeName}&outputFormat=${params.outputFormat} `


fetch(oficinas)
.then((res) => res.json())
.then((data) => {
    layer = L.Proj.geoJson(data, {
        pointToLayer: function (feature, latlng) { 
            return L.circleMarker(latlng, {
                radius: 5,
                fillColor: "red",
                color: "red"
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