const Slope_Mw = require("../MiddleWare/DB_Slope_MW.js");
const express = require('express');
const Route = express.Router();
module.exports = Route;

Route.post('/ReadAllRows',[Global_DB_MW.Read_All_Rows],(req,res)=>{
});
Route.post('/ReadRow/:Id',[Global_DB_MW.Read_Row],(req,res)=>{
});
Route.delete('/DeleteRow/:Id',[Global_DB_MW.Delete_Row],(req,res)=>{
});
Route.post('/AddRow',[Slope_Mw.Add_Row],(req,res)=>{
});
Route.post('/UpdateRow/:Id',[Slope_Mw.Update_Row],(req,res)=>{
});