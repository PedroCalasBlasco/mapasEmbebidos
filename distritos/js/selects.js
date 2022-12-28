
const selectService = document.querySelector("#selectService")
const selectsWfsContainer = document.querySelector("#selectsWfsContainer")
const selectsWmsContainer = document.querySelector("#selectsWmsContainer")

const baseSelect = document.querySelector("#baseSelect")
const selectMapContainer = document.querySelector("#selectMapContainer")
const mapBaseButton = document.querySelector("#mapBaseButton")

//selects wfs constants
const selectFormat = document.querySelector("#selectFormat")
const selectGeometry = document.querySelector("#selectGeometry")
const selectColor = document.querySelector("#selectColor")
const inputVersion = document.querySelector("#inputVersion")
const inputType = document.querySelector("#inputType")
const selectRequest = document.querySelector("#selectRequest")
const wfsButton = document.querySelector("#wfsButton")

//selects wms constants
const selectFormatWms = document.querySelector("#selectFormatWms")
const inputLayerWms = document.querySelector("#inputLayerWms")
const selectTransparency = document.querySelector("#selectTransparency")
const inputVersionWms = document.querySelector("#inputVersionWms")

//table costants
const bodyTable = document.querySelector("#bodyTable")
const wmsButton = document.querySelector("#wmsButton")



function onSelectBase(){
    if(baseSelect.value =="true"){
        selectMapContainer.style.display = "block"
    }
    if(baseSelect.value == "false"){
        selectMapContainer.style.display = "none"
    }
    if(!baseSelect.value){
        selectMapContainer.style.display = "none"
    }
}

let contadorMapas = 0

function loadMapBase(){

    bodyTable.innerHTML = ""

    if(selectMap.value == "osm"){
        contadorMapas++
        params += "layerBase=osm&"
        bodyTable.innerHTML += `<tr><th>Open Street Map</th><th></th><th class="text-center"><button class="btn btn-sm btn-danger"><i class="bi-trash"></i></button></th></tr>`
    }
    if(selectMap.value == "satelite"){
        contadorMapas++
        params += "layerBase=satelite&"
        bodyTable.innerHTML += `<tr><th>Satélite</th><th></th><th class="text-center"><button class="btn btn-sm btn-danger"><i class="bi-trash"></i></button></th></tr>`
    }
    if(selectMap.value == "dark"){
        contadorMapas++
        params += "layerBase=dark&"
        bodyTable.innerHTML += `<tr><th>Dark</th><th></th><th class="text-center"><button class="btn btn-sm btn-danger"><i class="bi-trash"></i></button></th></tr>`
    }
    if(selectMap.value == "light"){
        contadorMapas++
        params += "layerBase=light&"
        bodyTable.innerHTML += `<tr><th>Light</th><th></th><th class="text-center"><button class="btn btn-sm btn-danger"><i class="bi-trash"></i></button></th></tr>`
    }

    console.log(bodyTable)

    if(contadorMapas >= 1){
        mapBaseButton.disabled = true
    }
}


function onSelectService(){
    if(selectService.value == "wfs"){
        selectsWfsContainer.style.display = "flex"
        selectsWmsContainer.style.display = "none"
    }
    if(selectService.value == "wms"){
        selectsWmsContainer.style.display = "flex"
        selectsWfsContainer.style.display = "none"
    }
    if(!selectService.value){
        selectsWfsContainer.style.display = "none"
        selectsWmsContainer.style.display = "none"
    }
}


let params = ""
let contadorLayers = 0

function loadNewLayer(){


    if(selectService.value == "wfs"){
        const color = selectColor.value.slice(1)
        contadorLayers++
        params += `layer${contadorLayers}=version:${inputVersion.value}-service:wfs-request:${selectRequest.value}-typeName:${inputType.value}-outputFormat:${selectFormat.value}-color:${color}-geometry:${selectGeometry.value}&`

        bodyTable.innerHTML += `<tr><td>${inputType.value}</td><td>WFS</td><td class="text-center"><button class="btn btn-sm btn-danger"><i class="bi-trash"></i></button></td></tr>`    
    }

    if(selectService.value == "wms"){
        contadorLayers++
        params += `layer${contadorLayers}=versionWms:${inputVersionWms.value}-serviceWms:wms-formatWms:${selectFormatWms.value}-layerWms:${inputLayerWms.value}-transparency:${selectTransparency.value}&`
        bodyTable.innerHTML += `<tr><td>${inputLayerWms.value}</td><td>WMS</td><td class="text-center"><button class="btn btn-sm btn-danger"><i class="bi-trash"></i></button></td></tr>`
    }

    selectsWfsContainer.style.display = "none"
    selectsWmsContainer.style.display = "none"
    
    selectService.value == ""

    if(contadorLayers >= 4){
        wfsButton.disabled = true;
        wmsButton.disabled = true;
    }

}

function goToMap(){
    window.location.href = `distritos/map.html?${params}`
}


