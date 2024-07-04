// npm i ejs body-parser express path fs multer xlsx least-squares apexcharts mysql2

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const port = 2507;

// temporary global array
global.GasNames = ['Water vapor H2O', 'Carbon dioxide CO2', 'Carbon monoxide CO', 'Nitrous oxide N2O', 'Ammonia NH3', 'Methane CH4'];
global.MainFilePath = "23.5.2024 20-53-48  20200331.xlsx";

app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));

global.Global_DB_MW = require("./MiddleWare/DB_MW");

let db_M = require('./database');
global.db_pool = db_M.pool;

app.use(express.static(path.join(__dirname, "Imgs")));
app.use(express.static(path.join(__dirname, "Css")));
app.use(express.static(path.join(__dirname, "Js")));

const DataRoute = require('./Route/Data-Ext-Route');
const DBRoute = require('./Route/DB-Route');
const FileRoute = require('./Route/File-Route');

app.use('/Database', DBRoute);
app.use('/DataText', DataRoute);
app.use('/Files', FileRoute);
app.get('/', (req, res) => {
    res.render('Dashboard.ejs')
})
app.get('//', (req, res) => {
    res.render('Chart.ejs')
})
app.get('///', (req, res) => {
    res.render('Files.ejs')
})
app.get('/checkBox', (req, res) => {
    const { keys} = req.query;
    res.render('CheckBox.ejs',{keys:keys})
})
app.listen(port, () => {
    console.log(`Now listening on port \n http://localhost:${port}/\n http://localhost:${port}//\nhttp://localhost:${port}///\nhttp://localhost:${port}/checkBox`);
});