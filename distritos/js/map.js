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


//Mapa Base

if(params.layerBase){
    if(params.layerBase == "osm"){
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'OpenStreetMap'}).addTo(map);
    }
    else if(params.layerBase == "satelite"){
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution: 'Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',ext: 'jpg',}).addTo(map)
    }
    else if(params.layerBase == "dark"){  
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {attribution: '{attribution.OpenStreetMap} &copy; <a href="https://carto.com/attributions">CARTO</a>',ext: 'jpg',}).addTo(map);
    }
    else if(params.layerBase == "light"){  
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {attribution: '{attribution.OpenStreetMap} &copy; <a href="https://carto.com/attributions">CARTO</a>',ext: 'jpg',}).addTo(map);
    }


   
    delete params.layerBase
}


//separo mws layers de wfs
wmsLayers = []
wfsLayers = []

for(const [key, value] of Object.entries(params)){
    const arrayParams = value.split("-")
    console.log(arrayParams)
    arrayParams.map((item) =>{
        if(item.split(":")[1] == "wms"){
            wmsLayers.push(value)
        }
        else if(item.split(":")[1] == "wfs"){
            wfsLayers.push(value)
        }
    })
  }


//cargar layers wms al mapa

wmsLayers.map((item) => {

    const wmsParams = item.split("-")

    let version, format, layer, transparency

    wmsParams.map((it) => {
        if(it.split(":")[0] == "versionWms"){
            version = it.split(":")[1] 
        }
        else if(it.split(":")[0] == "formatWms"){
            format = it.split(":")[1] 
        }
        else if(it.split(":")[0] == "layerWms"){
            layer = it.split(":")[1] 
        }
        else if(it.split(":")[0] == "transparency"){
            transparency = it.split(":")[1] 
        }
    })

    L.tileLayer.wms(distritosWms, {
	layers: layer,
	format: format,
	transparent: Boolean(transparency),
    version: version,
    maxZoom: 14,
    minZoom: 12,
    }).addTo(map);

})



//capas wfs

let oficinass = "https://geoserver.santafeciudad.gov.ar/geoserver/sitmax/wfs?version=1.1.0&service=wfs&request=GetFeature&typeName=sitmax:oficinas_de_distritos&outputFormat=json"

let oficinas2 = `https://geoserver.santafeciudad.gov.ar/geoserver/sitmax/${params.service}?version=${params.version}&service=wfs&
request=${params.request}&typeName=sitmax:${params.typeName}&outputFormat=${params.outputFormat} `



wfsLayers.map((item) => {
    
    const wfsParams = item.split("-")
    let service, version, request, typeName, outputFormat, color, geometry

    console.log(wfsParams)

    wfsParams.map((it) => {
        if(it.split(":")[0] == "version"){
            version = it.split(":")[1] 
        }
        else if(it.split(":")[0] == "service"){
            service = it.split(":")[1] 
        }
        else if(it.split(":")[0] == "request"){
            request = it.split(":")[1] 
        }
        else if(it.split(":")[0] == "typeName"){
            typeName = it.split(":")[1] 
        }
        else if(it.split(":")[0] == "outputFormat"){
            outputFormat = it.split(":")[1] 
        }
        else if(it.split(":")[0] == "color"){
            color = it.split(":")[1] 
        }
        else if(it.split(":")[0] == "geometry"){
            geometry = it.split(":")[1] 
        }
    })

    color = "#" + color

    let url = `https://geoserver.santafeciudad.gov.ar/geoserver/sitmax/${service}?version=${version}&service=wfs&request=${request}&typeName=sitmax:${typeName}&outputFormat=${outputFormat} `
    
    console.log(oficinass)

    console.log(url)

    fetch(url)
    .then((res) => res.json())
    .then((data) => {

        console.log(data);

        layer = L.Proj.geoJson(data, {
            pointToLayer: function (feature, latlng) { 
                return L.circleMarker(latlng, {
                    radius: 5,
                    fillColor: color,
                    color: color
                });
            },
            // onEachFeature: function (feature, layer) {
            //     return layer.bindPopup(` <h5>${feature.properties.name}</h5><hr><p>${feature.properties.dirección}</p> 
            //     <p>${feature.properties.descriptio} hs</p><p>${feature.properties.caja} hs</p>
            //     <p>${feature.properties["e-mail"]} hs</p>
            //     <p>Teléfono: ${feature.properties.teléfono}</p>`);
            // },
        }).addTo(map);
    })
    .catch((err) => console.error(err));
})

