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
        let Response = await fetch("/Files/ExtractFile", {
            method: "POST",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                FilePath: FilePath
            })
        })

        let res = await Response.json();
        window.location.href = `/checkBox?keys=${encodeURIComponent(JSON.stringify(res))}`;
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

async function Get_Row_Id_From_DB(TableToCheck, ColumnName, Val) {
    let response = await fetch("http://localhost:2507/Database/ReadRow",{
            method: "POST",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                Table_Name:TableToCheck, Column_Name:ColumnName,val:Val
            })
    })
    let data = await response.json();
    console.log(data);
}
