let NavBox = document.getElementById("NavBox"),
    NavList = document.getElementById("NavList"),
    ReadList = document.getElementById("ReadList"),
    DeleteList = document.getElementById("DeleteList"),
    GasList = document.getElementById("Gases");
let GasesArr = [`<option class="item">mkdj"</option>`, `<option class="item">"kdjd"</option>`, `<option class="item">"ldjdu</option>`];
let NavListStr = [`<input class="item" type="file" name="file" id="UploadFile" onchange="FileMethods.Upload()">`, `<div onclick="FileMethods.Display()" class="item"> Read Files</div>`, `<div onclick="FileMethods.Delete()" class="item"> Delete File </div>`];
let Points = [];
let FileMethods = {
    Upload: async function () {
        let fileVal = document.getElementById("UploadFile");
        const formData = new FormData();
        formData.append('file', fileVal.files[0]);
        await fetch("/Files/UploadFile"
            , {
                method: 'POST',
                body: formData
            })
        alert("File uploaded successfully");
    },
    Read: async function () {
        return await FileMethods.FetchFilesPath("/Files/GetFile");
    },
    ExtractData: async function (FilePath){
        let GasesStr = [];
        let Response = await fetch("/DataText/Points",{
            method:"POST",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                FilePath: FilePath
            })
        })
        Response = await Response.json();
        Points = Response;
        for (const dataKey in Response) {
            GasesStr.push(`<option class="item" value="${dataKey}">${dataKey}</option>`);
        }
        CreateList(GasesStr, GasList);
    },
    Display:async function () {
        let data = await FileMethods.Read();
            let str = "";
        for (const path of data) {
            str += `<div onclick="FileMethods.ExtractData('${path}')" class="item">${path}</div>`;
        }
        ReadList.innerHTML = str;
        ToggleList("ReadList");
    },
    Delete: async function () {
        let data = await FileMethods.Read();
        let str = "";
        console.log(data)
        for (const path of data) {
            str += `<div onclick="FileMethods.DeleteFile('${path}')" class="item">${path}</div>`;
        }
        DeleteList.innerHTML = str;
        ToggleList("DeleteList");
    },
    DeleteFile : async function (FilePath) {
        if (confirm("do you wont to delete this file?")) {
            await fetch("http://localhost:2507/Files/DeleteFile", {
                method: "DELETE",
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({
                    filePath: FilePath
                })
            })
        }
        await FileMethods.Delete();
    },
    FetchFilesPath:async function (urlLocation){
        let response = await fetch(urlLocation, {
            method: "GET"
        })
        let data = await response.json();
        return data;
    }
};


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
    let Options = {
        series: [{
            name: 'XYZ MOTORS',
            data: Points[GasName]
        }],
        chart: {
            type: 'area',
            stacked: false,
            height: 350,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
        },
        title: {
            text: 'Stock Price Movement',
            align: 'left'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
            },
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return (val / 1000000).toFixed(0);
                },
            },
            title: {
                text: 'Price'
            },
        },
        xaxis: {
            type: 'datetime',
        },
        tooltip: {
            shared: false,
            y: {
                formatter: function (val) {
                    return (val / 1000000).toFixed(0)
                }
            }
        }
    };
    console.log(Options)
    let Chart = new ApexCharts(document.querySelector("#Chart"), Options);
    //console.log(Chart)
    Chart.render();

}
async function FetchFilesPath(urlLocation) {
    let response = await fetch(urlLocation, {
        method: "GET"
    })
    let data = await response.json();
    return data;
}
