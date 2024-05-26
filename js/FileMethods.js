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
        let GasesStr = [];
        let Response = await fetch("/DataText/Points", {
            method: "POST",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                FilePath: FilePath
            })
        })
        Response = await Response.json();
        Points = Response;
        for (const dataKey in Response) {
            GasesStr.push(`<option class="item" value="${dataKey}">${dataKey}</option>`);
        }
        CreateList(GasesStr, GasList);
    },
    Display: async function () {
        let data = await FileMethods.Read();
        let str = "";
        for (const filePath of data) {
            str += `<div class="item" onclick="InteractWithFile('List','${filePath}',event)">
            <div class="file" >
            </div>
            <div class="fileName">${filePath}</div>
        </div>`;
        }
        document.getElementById('displayFiles').innerHTML = str;
    },
    Delete: async function () {
        let data = await FileMethods.Read();
        let str = "";
        console.log(data)
        for (const path of data) {
            str += `<div onclick="FileMethods.DeleteFile('${path}')" class="item">${path}</div>`;
        }
        DeleteList.innerHTML = str;
        ToggleList("DeleteList");
    },
    DeleteFile: async function (FilePath) {
        if (confirm("do you wont to delete this file?")) {
            await fetch("http://localhost:2507/Files/DeleteFile", {
                method: "DELETE",
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({
                    filePath: FilePath
                })
            })
        }
        await FileMethods.Delete();
    },
    FetchFilesPath: async function (urlLocation) {
        let response = await fetch(urlLocation, {
            method: "GET"
        })
        let data = await response.json();
        return data;
    }
};