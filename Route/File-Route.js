const Files_MW = require("../MiddleWare/Files_MW");
const DB_Excel_MW = require("../MiddleWare/DB_Excel_MW");
const express = require('express');

const Route = express.Router();
module.exports = Route;
Route.post('/UploadFile', [Files_MW.Upload.single('file'), Files_MW.File_Con,DB_Excel_MW.Add_Row], (req, res) => {
    res.json({msg: "The file has been uploaded successfully.",insertedId:req.id});
});
Route.post('/ReadFile', [Files_MW.ReadFile], (req, res) => {
    res.status(200).json(res.response);
});
Route.get('/GetFile', [Files_MW.GetFiles], (req, res) => {
    res.status(200).json(res.filesPathStr);
});
Route.delete('/DeleteFile', [Files_MW.ChangeFileTmpMw,Global_DB_MW.Delete_Row,Files_MW.DeleteFile], (req, res) => {
    res.redirect('/GetFile');
});
Route.post('/ExtractFile', [Files_MW.ChangeFileTmpMw,Files_MW.Read_File_Keys], (req, res) => {
    console.log(req.headers)
    res.status(200).json(req.headers);
});

