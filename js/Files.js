let DropArea = document.getElementById("DropArea"),
    InputFile = document.getElementById("InputFile");
FileMethods.Display();
CreateInteractList('List');
DropArea.addEventListener("dragover", async function (e) {
    e.preventDefault();
    await FileMethods.Upload();
})
DropArea.addEventListener("drop", async function (e) {
    e.preventDefault();
    InputFile.files = e.dataTransfer.files;
    await FileMethods.Upload();
})
function CreateInteractList(elmId){
    let List = document.getElementById(elmId);
    let str = `<div id="DeleteBtn">delete</div> <div id="ExtractBtn">display data</div>`;
    List.innerHTML = str;
}

function InteractWithFile(path, e) {
    ToggleList('List');
    e.preventDefault();
    let List = document.getElementById('List'),
        Delete = document.getElementById('DeleteBtn'),
        Extract = document.getElementById('ExtractBtn');
    List.style.top = `${e.clientY}px`;
    List.style.left = `${e.clientX - List.offsetWidth}px`;
    console.log(List.offsetWidth)

    Delete.addEventListener("click",()=>{
        console.log("r")
        FileMethods.DeleteFile(path);
    });
    Extract.addEventListener("click",()=>{
        FileMethods.ExtractData(path);
    });
}
window.addEventListener("click" ,() =>{
    HideList('List');
})
function HideList(elmId){
    document.getElementById(elmId).style.display = "none";
}
function ToggleList(elmId) {
    let elm = document.getElementById(elmId);
    elm.style.display = "none";
    elm.style.display = (elm.style.display === "grid") ? "none" : "grid";
}



