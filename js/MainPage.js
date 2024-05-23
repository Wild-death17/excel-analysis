
let NavBox = document.getElementById("NavBox"),
    NavList = document.getElementById("NavList"),
    ReadList = document.getElementById("ReadList"),
    DeleteList = document.getElementById("DeleteList"),
    GasList = document.getElementById("Gases");
let NavListStr = [`<input class="item" type="file" name="file" id="UploadFile" onchange="FileMethods.Upload()">`, `<div onclick="FileMethods.Display()" class="item"> Read Files</div>`, `<div onclick="FileMethods.Delete()" class="item"> Delete File </div>`];
let Points = [];



CreateList(NavListStr, NavList);

function CreateList(ListArr, List) {
    let str = "";
    for (let listArrElement of ListArr) {
        str += listArrElement;
    }
    List.innerHTML = str;
}

function ToggleList(elmId) {
    let elm = document.getElementById(elmId);
    elm.style.display = (elm.style.display === "grid") ? "none" : "grid";
}
function DisplayGasGraph(GasName){
    Option1.series[0].data = Points[GasName];
    let Chart = new ApexCharts(document.querySelector("#Chart"), Option1);
    //console.log(Option1)
    Chart.render();
}
async function FetchFilesPath(urlLocation) {
    let response = await fetch(urlLocation, {
        method: "GET"
    })
    let data = await response.json();
    return data;
}
