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

    res.pageVal = {
        mssg:"file uploaded successfully!",
        isUploaded:true
    }
    next();
}
function readFile(req,res,next){
    let filePath = req.body.filePath;
    console.log(filePath)
    const workbook = xlsx.readFile('./uploads/'+filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    res.response = xlsx.utils.sheet_to_json(worksheet);
    next();

}
function getFiles(req,res,next){
    const dirPath = "./uploads";
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        res.filesPathStr = files;
    next();
    })
}



module.exports = {
    fs:fs,
    xlsx:xlsx,
    multer:multer,
    upload:upload,
    file_con:file_con,
    readFile:readFile,
    getFiles:getFiles
}