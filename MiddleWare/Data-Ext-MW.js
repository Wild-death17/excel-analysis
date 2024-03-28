const linear = require('least-squares');

async function get_Data_json(req, res, next) {

    let raw_data = res.response;
    let reformat_data = CreateObject(gasNames)

    reformat_data.Date = raw_data[0].Date;
    reformat_data.LibraryFile = raw_data[0].LibraryFile;

    let unit_idx = 0;
    for (let raw_item of raw_data) {
        if (raw_item.Time === 'Time') continue;

        reformat_data.Time.push(ConvertToSeconds(raw_item.Time));
        reformat_data.SpectrumFile.push(raw_item.SpectrumFile);

        for (let CurrGas of gasNames) {
            reformat_data[CurrGas].Measurement.push(raw_item[CurrGas]);
            if (raw_item === raw_data[0]) {
                if (unit_idx === 0) reformat_data[CurrGas].Unit = raw_item.Unit;
                else reformat_data[CurrGas].Unit = raw_item[`Unit_${unit_idx++}`];
            }
        }
    }
    res.response = reformat_data;
    next();
}

async function calc_points(req, res, next) {
    let data = res.response;

    let Slopes = {};

    let initialTime = data.Time[0];
    for (let CurrTime of data.Time) {
        CurrTime -= initialTime;
    }
    // linear returns NaN Needs Fixing \/
    for (let CurrGas of gasNames)
        Slopes[CurrGas] = linear(data[CurrGas].Measurement, data.Time)();

    res.response = Slopes;
    console.log(res.response) // Deleted After Debug of linear
    next();
}

function ConvertToSeconds(Time) {
    let temp = Time.split(':')
    return ((temp[0] * 60) * 60) + (temp[1] * 60) + (temp[2]);
}

function CreateObject(gasNames) {
    let temp = {Date: '', LibraryFile: '', Time: [], SpectrumFile: []};
    for (let item of gasNames) temp[item] = {Unit: '', Measurement: []};
    return temp;
}

module.exports = {
    get_Data_json: get_Data_json,
    calc_points: calc_points
}