let FileMethods = {
    Upload: async function () {
        let fileVal = document.getElementById("inputFile");
        const formData = new FormData();
        formData.append('file', fileVal.files[0]);
        await fetch("/Files/UploadFile"
            , {
                method: 'POST',
                body: formData
            })
        alert("File uploaded successfully");
        await FileMethods.Display();
    },
    Read: async function () {
        return await FileMethods.FetchFilesPath("/Files/GetFile");
    },
    ExtractData: async function (FilePath) {
        HideList('List');
        let Response = await fetch("/DataText/Points", {
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
            str += `<div class="item" onclick="InteractWithFile('List','${filePath}',event)">
            <div class="file"  >
            <i class="fa fa-file"></i>
            </div>
            <div class="fileName">${filePath}</div>
        </div>`;
        }
        document.getElementById('displayFiles').innerHTML = str;
    },
    DeleteFile: async function (FilePath) {
        if (confirm("do you wont to delete this file?")) {
            await fetch("/Files/DeleteFile", {
                method: "DELETE",
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({
                    FilePath: FilePath
                })
            })
        }
        HideList('List');
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