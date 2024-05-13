let NavBox = document.getElementById("NavBox"),
    NavList = document.getElementById("NavList");
let FileStr = [`<input class="item" type="file" name="file" id="UploadFile" onchange="FileMethods.Upload()">`, `<div onclick="FileMethods.Read()" class="item"> Read Files</div>`, `<div onclick="FileMethods.Delete()" class="item"> Delete File </div>`];
let FileMethods = {
    Upload: async function () {
        let fileVal = document.getElementById("UploadFile");
        const formData = new FormData();
        formData.append('file', fileVal.files[0]);
        let res = await fetch("http://localhost:2507/Files/UploadFile"
            , {
                method: 'POST',
                body: formData
            })
        alert(res.send)
    }, Read: function () {
    }, Delete: function () {
    }
};

CreateList(FileStr, NavList);

function CreateList(ListArr, List) {
    let str = "";
    for (let listArrElement of ListArr) {
        str += listArrElement;
    }
    List.innerHTML = str;
}

function ToggleList(elmId) {
    let elm = document.getElementById(elmId);
    if (elm.style.display === "grid") {
        elm.style.display = "none";
    } else {
        elm.style.display = "grid";

    }
}