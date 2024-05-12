let NavBox = document.getElementById("NavBox"),
    NavList = document.getElementById("NavList");
let FileStr = [`<div class="item"><label>Upload File</label><input type="file" name="file" id="UploadFile" onchange="FileMethod.Upload()"></div>`,`<div onclick="FileMethod.Read()" class="item"> Read Files</div>`,`<div onclick="FileMethod.Delete()" class="item"> Delete File </div>`];
let FileMethod = {Upload:function(){
    let fileVal = document.getElementById("UploadFile").files[0];
    let Form_Data = new FormData();
    Form_Data.append("file",fileVal);
        fetch('/http://localhost:2507/Files/UploadFile', {
            method: 'POST',
            body: Form_Data
        })
    },Read:function(){},Delete:function(){}};

CreateList(FileStr,NavList);
function CreateList(ListArr,List){
    let str ="";
    for (let listArrElement of ListArr) {
        str += listArrElement;
    }
    console.log(str);
    List.innerHTML = str;
}
NavBox.addEventListener("click",()=>{
    if (NavList.style.display === "grid") {
        NavList.style.display = "none";
    }else {
        NavList.style.display = "grid";

    }
});