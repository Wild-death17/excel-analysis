const fs = require('fs');
const xlsx = require('xlsx');
const multer = require('multer');

const Storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'Uploads/');
    },
    filename: function (req, file, cb) {
        console.log(req,file,cb)
        let dateNtimeStr = `${new Date().toLocaleDateString().replace(/\//g, '.')}`;
        dateNtimeStr += ` ${new Date().toLocaleTimeString().replace(/:/g, '-')}`;
        cb(null, `${dateNtimeStr}  ${file.originalname}`);
    }
});

const Upload = multer({storage: Storage});

async function File_Con(req, res, next) {
    if (!req.file)
        return res.status(400).json({error: 'No File Uploaded.'})
    const FilePate = req.file.path;

    if (!FilePate.endsWith('.xlsx')) {
        fs.unlinkSync(FilePate);
        return res.status(400).json({error: 'Invalid File Format.'});
    }
    next();
}

function ReadFile(req, res, next) {
    let FilePath = req.body.FilePath;
    const WorkBook = xlsx.readFile('./Uploads/' + FilePath);
    const WorkSheet = WorkBook.Sheets[WorkBook.SheetNames[0]];
    res.response = xlsx.utils.sheet_to_json(WorkSheet, {
        raw: false,
        dateNF: 'HH:mm:ss'
    });
    next();
}

function DeleteFile(req, res, next) {
    let filenameToDelete = req.body.FilePath;
    let FilePath = './uploads/' + filenameToDelete;
    if (fs.existsSync(FilePath)) {
        fs.unlink(FilePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return;
            }
            console.error('File deleted successfully');
        });
    } else {
        console.error('File does not exist');
    }
    next();
}

function GetFiles(req, res, next) {
    const DirPath = "./Uploads";
    fs.readdir(DirPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        res.filesPathStr = files;
        next();
    })
}

module.exports = {
    fs: fs,
    xlsx: xlsx,
    multer: multer,
    Upload: Upload,
    File_Con: File_Con,
    ReadFile: ReadFile,
    GetFiles: GetFiles,
    DeleteFile: DeleteFile

}
