let NavBox = document.getElementById("NavBox"),
    NavList = document.getElementById("NavList");
let File = {UploadStr:`<label>Upload File</label><input type="file" name="file" id="UploadFile" onchange="File.Upload()">`,ReadStr:"Read Files",DeleteStr:"Delete File",Upload:function(){
    let fileVal = document.getElementById("UploadFile").files[0];
    let Form_Data = new FormData();
    Form_Data.append("file",fileVal);
        fetch('/http://localhost:2507/Files/UploadFile', {
            method: 'POST',
            body: Form_Data
        })
    },Read:function(){},Delete:function(){}};

NavBox.addEventListener("click",()=>{
    if (NavList.style.display === "grid") {
        NavList.style.display = "none";
    }else {
        NavList.style.display = "grid";

    }
});