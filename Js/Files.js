let DropArea = document.getElementById("DropArea"),
    InputFile = document.getElementById("InputFile");
FileMethods.Display();
DropArea.addEventListener("dragover", async function (e) {
    e.preventDefault();
})
DropArea.addEventListener("drop", async function (e) {
    e.preventDefault();
    InputFile.files = e.dataTransfer.files;
    await FileMethods.Upload();
})

window.addEventListener("click",(e)=>{
    HideList('List');
})
function InteractWithFile(elmId, path, e) {
    e.preventDefault()
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
}


