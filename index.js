// npm i ejs body-parser express path fs multer
const bodyParser = require('body-parser');
const ejs = require('ejs');
const uploads_mw = require('./middleware/uploads_mw');
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
    res.render('uploadPage.ejs',{data:res.data,pageVal:pageVal})
})
app.post('/upload', [uploads_mw.upload.single('file'),uploads_mw.file_con] ,(req,res) => {
    res.render('uploadPage.ejs',{data:res.data,pageVal:res.pageVal});
});

app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}/`);
});