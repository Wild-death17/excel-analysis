const express = require('express');
const app = express();
const Route = express.Router();
module.exports = Route;

const ExpRoute = require('./DB-Exp-Route');
const GasRoute = require('./DB-Gas-Route');
const ExcelRoute = require('./DB-Excel-Route');

app.use('/Exp', ExpRoute);
app.use('/Gas', GasRoute);
app.use('/Excel', ExcelRoute);

