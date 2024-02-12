const fs = require('fs');
const xlsx = require('xlsx');
const multer = require('multer');
 function readFile(req,res,next){
     const workbook = xlsx.readFile("uploads/1707666602703-xlsx file.xlsx");
     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
     const response = xlsx.utils.sheet_to_json(worksheet);
     console.log(response)
     res.response = response;
     next();
 }

 module.exports = {
     readFile:readFile
 }