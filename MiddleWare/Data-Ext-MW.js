const linear = require('least-squares');

async function Extract_Object_From_Exel_Sheet(req, res, next) {

    let Raw_Data = res.response;
    let Reformat_Data = CreateObject(gasNames);

    Reformat_Data.Date = Raw_Data[0].Date;

    Reformat_Data.LibraryFile = Raw_Data[0].LibraryFile;

    //Reformat_Data.ExpStartTime = 0;
    Reformat_Data.ExpStartTime = (req.body.ExpStartTime === undefined || req.body.ExpStartTime === "") ? 0 : req.body.ExpStartTime;

    let Unit_Idx = 0;
    for (let Raw_Item of Raw_Data) {

        if (Raw_Item.Time === 'Time') continue;

        Reformat_Data.Time.push(Number(ConvertToSeconds(Raw_Item.Time)));
        Reformat_Data.SpectrumFile.push(Raw_Item.SpectrumFile);

        for (let Curr_Gas of gasNames) {

            Reformat_Data[Curr_Gas].Measurement.push(Number(Raw_Item[Curr_Gas]));

            if (Raw_Item === Raw_Data[0])
                if (Unit_Idx === 0) Reformat_Data[Curr_Gas].Unit = Raw_Item.Unit;
                else Reformat_Data[Curr_Gas].Unit = Raw_Item[`Unit_${Unit_Idx++}`];

        }
    }

    let initialTime = Reformat_Data.Time[0];
    for (let i = 0; i < Reformat_Data.Time.length; i++)
        Reformat_Data.Time[i] = Reformat_Data.Time[i] - initialTime;

    //Reformat_Data.ExpEndTime = Reformat_Data.Time.length;
    Reformat_Data.ExpEndTime = (req.body.ExpEndTime === undefined || req.body.ExpEndTime === "") ? Reformat_Data.Time.length : req.body.ExpEndTime;

    req.data = Reformat_Data;
    next();
}

async function Calculate_Gas_Slopes(req, res, next) {

    let data = req.data;
    let Slopes = {};

    for (let Gas of gasNames) {
        let NewTime = data.Time.slice(data.ExpStartTime, data.ExpEndTime);
        let NewMeasurement = data[Gas].Measurement.slice(data.ExpStartTime, data.ExpEndTime);
        linear(NewTime, NewMeasurement, Slopes[Gas] = {});
    }

    req.Slopes = Slopes;
    next();
}

async function Calculate_Specific_Gas_Slope(req, res, next) {
    let data = req.data;
    let Gas = req.body.Gas;
    let Slope = {};

    let NewTime = data.Time.slice(data.ExpStartTime, data.ExpEndTime);
    let NewMeasurement = data[Gas].Measurement.slice(data.ExpStartTime, data.ExpEndTime);
    linear(NewTime, NewMeasurement, Slope[Gas] = {});
    req.Slope = Slope;
    next();
}

async function Extract_XY_Points(req, res, next) {
    let data = req.data;
    let Points = {};

    for (let Gas of gasNames) {
        Points[Gas] = [];
        for (let i = data.ExpStartTime; i < data.ExpEndTime; i++)
            Points[Gas].push([data.Time[i], data[Gas].Measurement[i]]);
    }

    req.Points = Points;
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
    Calculate_Specific_Gas_Slope: Calculate_Specific_Gas_Slope,
    Extract_XY_Points: Extract_XY_Points
}