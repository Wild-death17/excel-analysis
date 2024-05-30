const Files_MW = require("../MiddleWare/Files_MW");
const express = require('express');
const Route = express.Router();
module.exports = Route;
Route.post('/UploadFile', [Files_MW.Upload.single('file'), Files_MW.File_Con], (req, res) => {
    res.json({msg: "The file has been uploaded successfully."});
});
Route.post('/ReadFile', [Files_MW.ReadFile], (req, res) => {
    res.status(200).json(res.response);
});
Route.get('/GetFile', [Files_MW.GetFiles], (req, res) => {
    res.status(200).json(res.filesPathStr);
});
Route.delete('/DeleteFile', [Files_MW.DeleteFile], (req, res) => {
    res.redirect('/GetFile');
});