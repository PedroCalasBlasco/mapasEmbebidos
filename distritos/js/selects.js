
const selectService = document.querySelector("#selectService")
const selectsWfsContainer = document.querySelector("#selectsWfsContainer")
const selectsWmsContainer = document.querySelector("#selectsWmsContainer")

//selects wfs
const selectFormat = document.querySelector("#selectFormat")
const selectGeometry = document.querySelector("#selectGeometry")
const selectColor = document.querySelector("#selectColor")
const inputVersion = document.querySelector("#inputVersion")
const inputType = document.querySelector("#inputType")
const selectRequest = document.querySelector("#selectRequest")

//selects wms
const selectFormatWms = document.querySelector("#selectFormatWms")
const inputLayerWms = document.querySelector("#inputLayerWms")
const selectTransparency = document.querySelector("#selectTransparency")
const inputVersionWms = document.querySelector("#inputVersionWms")


const bodyTable = document.querySelector("#bodyTable")
const goToMap = document.querySelector("#goToMap")




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

function loadNewLayer(){


    if(selectService.value == "wfs"){
        params += `version=${inputVersion.value}&service=wfs
            &request=${selectRequest.value}&typeName=${inputType.value}&outputFormat=${selectFormat.value}
            &color=${selectColor.value}&geometry=${selectGeometry.value}`

        bodyTable.innerHTML += `<tr><td>${inputType.value}</td><td>WFS</td><td><button class="btn btn-info">Delete<button></td></tr>`
        console.log(bodyTable)
    }

    if(selectService.value == "wms"){
        params += `versionWms=${inputVersionWms.value}&serviceWms=wms
            &formatWms=${selectFormatWms.value}&layerWms=${inputLayerWms.value}&transparency=${selectTransparency.value}`

        bodyTable.innerHTML += `<tr><td>${inputLayerWms.value}</td><td>WMS</td><td><button class="btn btn-info">Delete<button></td></tr>`
        console.log(bodyTable)
    }

    selectsWfsContainer.style.display = "none"
    selectsWmsContainer.style.display = "none"
    
    selectService.value == ""

    console.log(params)    

    goToMap.setAttribute('href', `distritos/map.html?${params}`);


}


{/* <tr>
                        
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr> */}
