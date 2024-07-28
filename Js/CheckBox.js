let Container = document.getElementById("CheckBox"),
    TargetGasInput = document.getElementsByName("TargetGas"),
    CheckBoxBtn = document.getElementById("CheckBoxBtn"),
    GasesInput = document.getElementsByName("Gases");
let gases = [];
let targetGas;


function Start(keys) {
    let keysArr = JSON.parse(keys);
    CheckBoxBtn.onclick = function () { submit(false) };
    CreateChackBox(keysArr);

}
function submit(isPressed) {
    if (!isPressed) { 
        for (const value of GasesInput) {
            if (value.checked) gases.push(value.defaultValue);
        }
        CheckBoxBtn.onclick = function () { submit(true) };
        CreateRadioBox(gases);
    } else {
        for (const value of TargetGasInput) {
            if (value.checked) {
                targetGas = value.value;
                break;
            }
        }
        FatchGases();
    }
}
function FetchGases() {
    fetch("http://localhost:2507/Database/Gas/AddMultipleRows",{
        method: "POST",
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({
            gases: gases
        })
    })
    fetch("http://localhost:2507/Database/Gas/AddMultipleRows",{
        method: "POST",
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({
            gases: gases
        })
    })
}
function CreateChackBox(keysArr) {
    for (const KeysElement of keysArr) {
        let NoSpacesKeysElement = KeysElement.trim()
        let str = "";
        str +=`<label class="box" for="${NoSpacesKeysElement}">`;
        str +=`<input type="checkbox" id="${NoSpacesKeysElement}" name="Gases" value="${NoSpacesKeysElement}">`;
        str +=`${NoSpacesKeysElement} </label>`
        Container.innerHTML+=str;
    }
}
function CreateRadioBox(keysArr) {
    Container.innerHTML="";
    for (const KeysElement of keysArr) {
        let str = "";
        str += `<label class="box" for="${KeysElement}">`;
        str +=`<input type="radio" id="${KeysElement}" name="TargetGas" value="${KeysElement}">`;
        str +=`${KeysElement} </label>`
        Container.innerHTML+=str;
    }
}
