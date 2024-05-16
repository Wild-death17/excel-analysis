const FileMW = require('../MiddleWare/Files_MW');
const express = require('express');
const DataExtMW = require('../MiddleWare/Data-Ext-MW');
const Route = express.Router();
module.exports = Route;

Route.get('/Points', [FileMW.ReadFile, DataExtMW.Extract_Object_From_Exel_Sheet, DataExtMW.Extract_XY_Points], (req, res) => {
    res.status(200).json(req.Points)
});
Route.get('/Slopes', [FileMW.ReadFile, DataExtMW.Extract_Object_From_Exel_Sheet, DataExtMW.Calculate_Gas_Slopes], (req, res) => {
    res.status(200).json(req.Slopes)
});