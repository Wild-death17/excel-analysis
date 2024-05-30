let DropArea = document.getElementById("dropArea"),
    InputFile = document.getElementById("inputFile");
let InteractListStr = [`<div onclick="FileMethods.Delete()">delete</div>`, `<div>display data</div>`];
let NavListStr = [`<input class="item" type="file" name="file" id="UploadFile" onchange="FileMethods.Upload()">`, `<div onclick="FileMethods.Display()" class="item"> Read Files</div>`, `<div onclick="FileMethods.Delete()" class="item"> Delete File </div>`];
let Points = [];
FileMethods.Display();
DropArea.addEventListener("dragover", async function (e) {
    e.preventDefault();
    await FileMethods.Upload();
})
DropArea.addEventListener("drop", async function (e) {
    e.preventDefault();
    InputFile.files = e.dataTransfer.files;
    await FileMethods.Upload();
})


function InteractWithFile(elmId, path, e) {
    ToggleList(elmId);
    let List = document.getElementById(elmId);

    let str = `<div onclick="FileMethods.DeleteFile('${path}')">delete</div> <div onclick="FileMethods.ExtractData('${path}')">display data</div>`;
    List.innerHTML = str;
    List.style.top = `${e.clientY}px`;
    List.style.left = `${e.clientX - List.offsetWidth}px`;
}

function HideList(elmId){
    document.getElementById(elmId).style.display = "none";
}
function ToggleList(elmId) {
    let elm = document.getElementById(elmId);
    elm.style.display = "none";
    elm.style.display = (elm.style.display === "grid") ? "none" : "grid";
    console.log(elm.style.display)
}


