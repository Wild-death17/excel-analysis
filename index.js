// npm i ejs body-parser express path fs multer xlsx least-squares apexcharts

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


app.use(express.static(path.join(__dirname, "Imgs")));
app.use(express.static(path.join(__dirname, "Css")));
app.use(express.static(path.join(__dirname, "Js")));

const DataRoute = require('./Route/Data-Ext-Route');
const FileRoute = require('./Route/File-Route');

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
app.listen(port, () => {
    console.log(`Now listening on port \n http://localhost:${port}/\n http://localhost:${port}//\nhttp://localhost:${port}///`);
});