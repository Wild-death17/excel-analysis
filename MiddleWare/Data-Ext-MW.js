const {response} = require("express");

async function get_Data_json(req, res, next) {

    let raw_data = res.response;
    let reformat_data = CreateObject(gasNames)
    for (let raw_item of raw_data) {
        let unitidx = 0;
        for (let item in reformat_data) {
            if (item !== raw_item[item])
            reformat_data[item].Measurement.push(raw_item[item]);
            if (raw_item === raw_data[0]) {
                if (unitidx === 0) reformat_data[item].Unit = raw_item[`Unit`];
                else reformat_data[item].Unit = raw_item[`Unit_${unitidx}`];
                unitidx++;
            }
        }
    }
    next();
}
/*function printobject(reformat_data) {
    for (let item in reformat_data) {
        console.log(`name :: ${reformat_data[item].Name}\n Measurement :: ${reformat_data[item].Measurement}\n Unit :: ${reformat_data[item].Unit}\n`)
    }
}*/
function CreateObject(gasNames) {
    let temp = {};
    for (let item of gasNames) {
        temp[item] = {
            Name: item,
            Measurement: [],
            Unit: ''
        };
    }
    return temp;
}

module.exports = {
    get_Data_json: get_Data_json
}