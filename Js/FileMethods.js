let FileMethods = {
    Upload: async function () {
        let fileVal = document.getElementById("InputFile");
        const formData = new FormData();
        formData.append('file', fileVal.files[0]);
        let response = await fetch("/Files/UploadFile"
            , {
                method: 'POST',
                body: formData
            })
        let responseObject = await response.json();
        alert(responseObject.msg);
        fileVal.value = '';
        await FileMethods.Display();
    },
    Read: async function () {
        return await FileMethods.FetchFilesPath("/Files/GetFile");
    },
    ExtractData: async function (FilePath) {
        HideList('List');
        let Response = await fetch("/Files/ChangeFile", {
            method: "POST",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                FilePath: FilePath
            })
        })
        await alert("Waiting for mr yehiel!! He is the only one who can understand his own code");
    },
    Display: async function () {
        let data = await FileMethods.Read();
        let str = "";
        for (const filePath of data) {
            str += `<div class="Item" oncontextmenu="InteractWithFile('List','${filePath}',event)">
            <div class="File"  >
            <img alt="file img" src="/FileIcon.png">
            </div>
            <div class="fileName">${filePath}</div>
        </div>`;
        }
        document.getElementById('DisplayFiles').innerHTML = str;
    },
    DeleteFile: async function (FilePath) {
        if (confirm("do you wont to delete this file?")) {
            await fetch("/Files/DeleteFile", {
                method: "DELETE",
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({
                    FilePath: FilePath,
                    Table_Name: "Excel",
                    Column_Name: "Fle_Path",
                    column_Val:FilePath
                })
            })
        }
        await FileMethods.Display();
    },
    FetchFilesPath: async function (urlLocation) {
        let response = await fetch(urlLocation, {
            method: "GET"
        })
        let data = await response.json();
        return data;
    }
};