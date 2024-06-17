const linear = require('least-squares');

async function Extract_Object_From_Exel_Sheet(req, res, next) {

    let RawData = res.response;
    let ReformatData = CreateObject(GasNames);

    ReformatData.Date = RawData[0].Date;

    ReformatData.LibraryFile = RawData[0].LibraryFile;

    ReformatData.ExpStartTime = (req.body.ExpStartTime === undefined || req.body.ExpStartTime === "") ? 0 : req.body.ExpStartTime;

    let Unit_Idx = 0;
    for (let Raw_Item of RawData) {

        if (Raw_Item.Time === 'Time') continue;

        ReformatData.Time.push(Number(ConvertToSeconds(Raw_Item.Time)));
        ReformatData.SpectrumFile.push(Raw_Item.SpectrumFile);

        for (let Curr_Gas of GasNames) {

            ReformatData[Curr_Gas].Measurement.push(Number(Raw_Item[Curr_Gas]));

            if (Raw_Item === RawData[0])
                if (Unit_Idx === 0) ReformatData[Curr_Gas].Unit = Raw_Item.Unit;
                else ReformatData[Curr_Gas].Unit = Raw_Item[`Unit_${Unit_Idx++}`];

        }
    }

    let initialTime = ReformatData.Time[0];
    for (let i = 0; i < ReformatData.Time.length; i++)
        ReformatData.Time[i] = ReformatData.Time[i] - initialTime;

    ReformatData.ExpEndTime = (req.body.ExpEndTime === undefined || req.body.ExpEndTime === "") ? ReformatData.Time.length : req.body.ExpEndTime;

    req.data = ReformatData;
    next();
}

async function Calculate_Gas_Slopes(req, res, next) {

    let data = req.data;
    let Slopes = {};

    if (req.body.Gas) {

        let Gas = req.body.Gas;

        if (!data[Gas])
            return res.status(400).json({error: "Couldn't Find Gas."})


        Slopes[Gas] = [];
        let NewTime = data.Time.slice(data.ExpStartTime, data.ExpEndTime);
        let NewMeasurement = data[Gas].Measurement.slice(data.ExpStartTime, data.ExpEndTime);
        linear(NewTime, NewMeasurement, Slopes[Gas] = {});

        req.Slopes = Slopes;
        next();
    }
    for (let Gas of GasNames) {
        let NewTime = data.Time.slice(data.ExpStartTime, data.ExpEndTime);
        let NewMeasurement = data[Gas].Measurement.slice(data.ExpStartTime, data.ExpEndTime);
        linear(NewTime, NewMeasurement, Slopes[Gas] = {});
    }

    req.Slopes = Slopes;
    next();
}

async function Extract_XY_Points(req, res, next) {

    let data = req.data;
    let Points = {};

    if (req.body.Gas) {

        let Gas = req.body.Gas;

        if (!data[Gas])
            return res.status(400).json({error: "Couldn't Find Gas."})


        Points[Gas] = [];
        for (let i = data.ExpStartTime; i < data.ExpEndTime; i++)
            Points[Gas].push([data.Time[i], data[Gas].Measurement[i]]);

        req.Points = Points;
        next();
    }

    for (let Gas of GasNames) {

        Points[Gas] = [];

        for (let i = data.ExpStartTime; i < data.ExpEndTime; i++)
            Points[Gas].push([data.Time[i], data[Gas].Measurement[i]]);
    }

    req.Points = Points;
    next();
}

async function Get_Gas_Names(req, res, next) {
    let data = req.data;
    let keys = Object.keys(data);
    let Names = keys.slice(keys.indexOf('SpectrumFile') + 1);
    req.Names = Names;
    next();
}

async function Get_Chart_Series(req, res, next) {
    let data = req.Points;
    let Series = {};
    for (let item in data)
        Series[item] = {
            name: `${item}`,
            data: data[item]
        };
    req.Series = Series;
    next();
}

async function Get_Exp_Start_End(req, res, next) {
    let data = req.data;
    req.StartEnd = {
        ExpStartTime: data.ExpStartTime,
        ExpEndTime: data.ExpEndTime
    }
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
    Extract_XY_Points: Extract_XY_Points,
    Get_Chart_Series: Get_Chart_Series,
    Get_Exp_Start_End: Get_Exp_Start_End,
    Get_Gas_Names: Get_Gas_Names
}