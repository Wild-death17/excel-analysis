const linear = require('least-squares');

async function Extract_Object_From_Exel_Sheet(req, res, next) {

    let Raw_Data = res.response;
    let Reformat_Data = CreateObject(gasNames)

    Reformat_Data.Date = Raw_Data[0].Date;
    Reformat_Data.LibraryFile = Raw_Data[0].LibraryFile;

    let Unit_Idx = 0;
    for (let Raw_Item of Raw_Data) {
        if (Raw_Item.Time === 'Time') continue;

        Reformat_Data.Time.push(Number(ConvertToSeconds(Raw_Item.Time)));
        Reformat_Data.SpectrumFile.push(Raw_Item.SpectrumFile);

        for (let Curr_Gas of gasNames) {
            Reformat_Data[Curr_Gas].Measurement.push(Number(Raw_Item[Curr_Gas]));
            if (Raw_Item === Raw_Data[0]) {
                if (Unit_Idx === 0) Reformat_Data[Curr_Gas].Unit = Raw_Item.Unit;
                else Reformat_Data[Curr_Gas].Unit = Raw_Item[`Unit_${Unit_Idx++}`];
            }
        }
    }
    req.data = Reformat_Data;
    next();
}

async function Calculate_Gas_Slopes(req, res, next) {
    let data = req.data
    let Start = (data.ExpStartTime === undefined || data.ExpStartTime === "") ? 0 : data.ExpStartTime;
    let End = (data.ExpEndTime === undefined || data.ExpEndTime === "") ? data.Time.length : data.ExpEndTime;
    let Slopes = {};

    let initialTime = data.Time[0];
    for (let i = 0; i < data.Time.length; i++)
        data.Time[i] = data.Time[i] - initialTime;

    for (let gas of gasNames) {
        let NewTime = data.Time.slice(Start, End)
        let NewMeasurement = data[gas].Measurement.slice(Start, End)
        linear(NewTime, NewMeasurement, Slopes[gas] = {});
    }
    req.Slopes = Slopes;
    next();
}

async function Extract_XY_Points(req, res, next) {
    let data = req.data;

    let initialTime = data.Time[0];
    for (let i = 0; i < data.Time.length; i++)
        data.Time[i] = data.Time[i] - initialTime;

    let Points = {}

    for (let gas of gasNames) {
        Points[gas] = [];
        for (let i = 0; i < data.Time.length; i++)
            Points[gas].push([data.Time[i], data[gas].Measurement[i]]);
    }
    req.Points = Points
    next();
}

function ConvertToSeconds(Time) {
    let temp = Time.split(':');
    return Number(temp[0] * 3600) + Number(temp[1] * 60) + Number(temp[2]);
}

function CreateObject(gasNames) {
    let temp = {Date: '', LibraryFile: '', ExpStartTime: '', ExpEndTime: '', Time: [], SpectrumFile: []};
    for (let item of gasNames) temp[item] = {Unit: '', Measurement: []};
    return temp;
}

module.exports = {
    Extract_Object_From_Exel_Sheet: Extract_Object_From_Exel_Sheet,
    Calculate_Gas_Slopes: Calculate_Gas_Slopes,
    Extract_XY_Points: Extract_XY_Points
}