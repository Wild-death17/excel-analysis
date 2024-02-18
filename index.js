// npm i ejs body-parser express path fs multer

const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = 2507;

app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "Public")));
app.use(express.static(path.join(__dirname, "Css")));
app.use(express.static(path.join(__dirname, "Js")));

const DataRoute = require('./Route/Data-Ext-Route');
const FileRoute = require('./Route/File-Route');

app.use('/DataText', DataRoute);
app.use('/Files', FileRoute);
app.get('/', (req, res) => {
    let pageVal = {
        msg: "file uploaded successfully!",
        isUploaded: false
    }
    res.render('UploadPage.ejs', {pageVal: pageVal})
})


app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}/`);
});