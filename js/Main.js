let DropArea = document.getElementById("dropArea"),
    InputFile = document.getElementById("inputFile");
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

