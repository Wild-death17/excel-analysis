const express = require('express');
const Route = express.Router();
module.exports = Route;

const ExpRoute = require('./DB-Exp-Route');
const GasRoute = require('./DB-Gas-Route');
const ExcelRoute = require('./DB-Excel-Route');

Route.use('/Exp', ExpRoute);
Route.use('/Gas', GasRoute);
Route.use('/Excel', ExcelRoute);

