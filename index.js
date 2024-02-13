// npm i ejs body-parser express path fs multer
const bodyParser = require('body-parser');
const ejs = require('ejs');
const files_mw = require('./middleware/files_mw');
const path = require('path');
const express = require('express');


const app = express();
const port = 2507;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));
app.set("view engine","ejs");
app.get('/',(req,res)=>{
    let pageVal = {
        mssg:"file uploaded successfully!",
        isUploaded:false
    }
    res.render('uploadPage.ejs',{pageVal:pageVal})
})
app.post('/upload', [files_mw.upload.single('file'),files_mw.file_con] ,(req,res) => {
    res.render('uploadPage.ejs',{pageVal:res.pageVal});
});
app.get('/readFile',[files_mw.readFile],(req,res) => {
    res.status(200).json(res.response);
});
app.get('/getFile',[files_mw.getFiles],(req,res) => {
    res.status(200).json(res.response);
});

app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}/`);
});