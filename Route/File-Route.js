const Files_MW = require("../MiddleWare/Files_MW");
const express = require('express');
const Route = express.Router();
module.exports = Route;
Route.post('/UploadFile', [Files_MW.Upload.single('file'), Files_MW.File_Con], (req, res) => {
    res.send("uploaded successfully");
    res.render('MainPage.ejs');
});
Route.get('/MainPage', (req, res) => {
    res.render('MainPage.ejs', {});
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