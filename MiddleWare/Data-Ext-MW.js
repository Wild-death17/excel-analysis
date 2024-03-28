const {response} = require("express");

async function get_Data_json(req, res, next) {

    let raw_data = res.response;
    let reformat_data = CreateObject(gasNames)
    for (let raw_item of raw_data) {
        let unit_idx = 0;
        for (let item in reformat_data) {
            if (item !== raw_item[item]) {
                reformat_data[item].Time.push(raw_item['Time']);
                reformat_data[item].SpectrumFile.push(raw_item['SpectrumFile']);
                reformat_data[item].Measurement.push(raw_item[item]);
            }
            if (raw_item === raw_data[0]) {
                reformat_data[item].Date = raw_item['Date'];
                reformat_data[item].LibraryFile = raw_item['LibraryFile'];
                if (unit_idx === 0) reformat_data[item].Unit = raw_item[`Unit`];
                else reformat_data[item].Unit = raw_item[`Unit_${unit_idx}`];
                unit_idx++;
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
            Name: item, Date: '', Time: [], SpectrumFile: [], LibraryFile: '', Measurement: [], Unit: ''
        };
    return temp;
}

module.exports = {
    get_Data_json: get_Data_json
}