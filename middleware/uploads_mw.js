const fs = require('fs');
const xlsx = require('xlsx');
const multer = require('multer');


const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+ '-' + file.originalname);
    }
});

const upload = multer({ storage : storage });
async function file_con (req,res,next){
    if(!req.file)
        return res.status(400).json({error: 'No File Uploaded.'})
    const filepate = req.file.path;
    console.log(req.file.originalname)
    console.log(filepate)
    if(!filepate.endsWith('.xlsx')){
        fs.unlinkSync(filepate);
        return res.status(400).json({error: 'Invalid File Format.'});
    }
    const workbook = xlsx.readFile(filepate);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);
res.pageVal = {
    mssg:"file uploaded successfully!",
    isUploaded:true
}
    res.data = data;
    next();
}

module.exports = {
    fs:fs,
    xlsx:xlsx,
    multer:multer,
    upload:upload,
    file_con:file_con
}