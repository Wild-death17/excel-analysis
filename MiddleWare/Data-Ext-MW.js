const linear = require('least-squares');

async function get_Data_json(req, res, next) {

    let raw_data = res.response;
    let reformat_data = CreateObject(gasNames)

    reformat_data.Date = raw_data[0].Date;
    reformat_data.LibraryFile = raw_data[0].LibraryFile;

    let unit_idx = 0;
    for (let raw_item of raw_data) {
        if (raw_item.Time === 'Time') continue;

        reformat_data.Time.push(Number(ConvertToSeconds(raw_item.Time)));
        reformat_data.SpectrumFile.push(raw_item.SpectrumFile);

        for (let CurrGas of gasNames) {
            reformat_data[CurrGas].Measurement.push(Number(raw_item[CurrGas]));
            if (raw_item === raw_data[0]) {
                if (unit_idx === 0) reformat_data[CurrGas].Unit = raw_item.Unit;
                else reformat_data[CurrGas].Unit = raw_item[`Unit_${unit_idx++}`];
            }
        }
    }
    res.Data_json = reformat_data;
    next();
}

async function calc_Slopes(req, res, next) {
    let data = res.Data_json;

    let Slopes = [];

    let initialTime = data.Time[0];
    for (let i = 0; i < data.Time.length; i++)
        data.Time[i] = data.Time[i] - initialTime;

    for (let CurrGas of gasNames)
        linear(data.Time, data[CurrGas].Measurement, Slopes[CurrGas] = {});
    res.Slopes = Slopes;
    next();
}

async function get_Points(req, res, next) {
    let data = res.Data_json;

    let initialTime = data.Time[0];
    for (let i = 0; i < data.Time.length; i++)
        data.Time[i] = data.Time[i] - initialTime;

    let Nitrous_oxide_N2O = [];
    for (let i = 0; i < data.Time.length; i++)
        Nitrous_oxide_N2O[i] = [data.Time[i], data['Nitrous oxide N2O'].Measurement[i]];

    res.Points = Nitrous_oxide_N2O;
    next();
}

function ConvertToSeconds(Time) {
    let temp = Time.split(':');
    return Number(temp[0] * 3600) + Number(temp[1] * 60) + Number(temp[2]);
}

function CreateObject(gasNames) {
    let temp = {Date: '', LibraryFile: '', Time: [], SpectrumFile: []};
    for (let item of gasNames) temp[item] = {Unit: '', Measurement: []};
    return temp;
}

module.exports = {
    get_Data_json: get_Data_json,
    calc_Slopes: calc_Slopes,
    get_Points: get_Points
}