
function Start(keys){
    let keysArr = JSON.parse(keys);
    let Container = document.getElementById("CheckBox");
    Container.innerHTML = "";
    for (const KeysElement of keysArr) {
        let NoSpacesKeysElement = KeysElement.trim()
        let str = "";
        str +=`<label class="box" for="${NoSpacesKeysElement}">`;
        str +=`<input type="checkbox" id="${NoSpacesKeysElement}" name="${NoSpacesKeysElement}" value="${NoSpacesKeysElement}">`;
        str +=`${NoSpacesKeysElement} </label>`
        Container.innerHTML+=str;
    }
}
