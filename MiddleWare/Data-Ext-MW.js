const linear = require('least-squares');

async function Extract_Object_From_Exel_Sheet(req, res, next) {

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
    req.Data_json = reformat_data;
    next();
}

async function Calculate_Gas_Slopes(req, res, next) {
    let data = req.Data_json
    let Start = (req.body.Start === undefined || req.body.Start === "") ? 0 : req.body.Start;
    let End = (req.body.End === undefined || req.body.End === "") ? data.Time.length : req.body.End;
    let Slopes = {};

    let initialTime = data.Time[0];
    for (let i = 0; i < data.Time.length; i++)
        data.Time[i] = data.Time[i] - initialTime;

    // Swap 'Nitrous oxide N2O' With Object Loop
    let NewTime = data.Time.slice(Start, End)
    let NewMeasurment = data['Nitrous oxide N2O'].Measurement.slice(Start, End)
    linear(NewTime, NewMeasurment, Slopes['Nitrous oxide N2O'] = {});
    req.Slopes = Slopes;
    next();
}

async function Extract_XY_Points(req, res, next) {
    let data = req.Data_json;

    let initialTime = data.Time[0];
    for (let i = 0; i < data.Time.length; i++)
        data.Time[i] = data.Time[i] - initialTime;

    let Nitrous_oxide_N2O = [];
    for (let i = 0; i < data.Time.length; i++)
        Nitrous_oxide_N2O[i] = [data.Time[i], data['Nitrous oxide N2O'].Measurement[i]];

    req.Points = Nitrous_oxide_N2O;
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
    Extract_Object_From_Exel_Sheet: Extract_Object_From_Exel_Sheet,
    Calculate_Gas_Slopes: Calculate_Gas_Slopes,
    Extract_XY_Points: Extract_XY_Points
}