let NavBox = document.getElementById("NavBox"),
    NavList = document.getElementById("NavList"),
    GasList = document.getElementById("Gases");
let GasesArr = [`<option class="item">mkdj"</option>`,`<option class="item">"kdjd"</option>`,`<option class="item">"ldjdu</option>`];
let FileStr = [`<input class="item" type="file" name="file" id="UploadFile" onchange="FileMethods.Upload()">`, `<div onclick="FileMethods.Read()" class="item"> Read Files</div>`, `<div onclick="FileMethods.Delete()" class="item"> Delete File </div>`];
let FileMethods = {
    Upload: async function () {
        let fileVal = document.getElementById("UploadFile");
        const formData = new FormData();
        formData.append('file', fileVal.files[0]);
        await fetch("http://localhost:2507/Files/UploadFile"
            , {
                method: 'POST',
                body: formData
            })
        alert("File uploaded successfully");
    }, Read: function () {

    }, Delete: function () {
    }
};

CreateList(FileStr, NavList);
CreateList(GasesArr, GasList);

function CreateList(ListArr, List) {
    let str = "";
    for (let listArrElement of ListArr) {
        str += listArrElement;
    }
    List.innerHTML = str;
}

function ToggleList(elmId) {
    let elm = document.getElementById(elmId);
    elm.style.display = (elm.style.display === "grid")?"none": "grid";
}