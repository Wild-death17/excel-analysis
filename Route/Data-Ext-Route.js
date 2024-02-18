const FileMW = require('../MiddleWare/Files_MW');
const express = require('express');
const DataExtMW = require('../MiddleWare/Data-Ext-MW');
const Route = express.Router();
module.exports = Route;

/*Route.post('/Add', [FileMW.ReadFile, DataExtMW.Data_Implement], (req, res) => {
    res.status(200).json('mama')
});*/