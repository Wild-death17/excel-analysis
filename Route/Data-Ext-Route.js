const FileMW = require('../MiddleWare/Files_MW');
const express = require('express');
const DataExtMW = require('../MiddleWare/Data-Ext-MW');
const Route = express.Router();
module.exports = Route;

let ReadFileObject = [FileMW.ReadFile, DataExtMW.Extract_Object_From_Exel_Sheet];

Route.post('/Points', [ReadFileObject, DataExtMW.Extract_XY_Points], (req, res) => {
    res.status(200).json(req.Points);
});
Route.post('/Slopes', [ReadFileObject, DataExtMW.Calculate_Gas_Slopes], (req, res) => {
    res.status(200).json(req.Slopes)
});
Route.post('/GasNames', [ReadFileObject, DataExtMW.Get_Gas_Names], (req, res) => {
    res.status(200).json(req.Names)
});
Route.post('/ChartSeries', [ReadFileObject, DataExtMW.Extract_XY_Points, DataExtMW.Get_Chart_Series], (req, res) => {
    res.status(200).json(req.Series)
});
Route.post('/ExpStartEnd', [ReadFileObject, DataExtMW.Get_Exp_Start_End], (req, res) => {
    res.status(200).json(req.StartEnd)
});