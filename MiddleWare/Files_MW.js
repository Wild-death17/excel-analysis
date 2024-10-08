const fs = require('fs');
const xlsx = require('xlsx');
const multer = require('multer');

const Storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'Uploads/');
    },
    filename: function (req, file, cb) {
        let dateNtimeStr = `${new Date().toLocaleDateString().replace(/\//g, '.')}`;
        dateNtimeStr += ` ${new Date().toLocaleTimeString().replace(/:/g, '-')}`;
        cb(null, `${dateNtimeStr}  ${file.originalname}`);
    }
});

const Upload = multer({storage: Storage});

async function File_Con(req, res, next) {
    if (!req.file) {
        return res.json({msg: 'No File Uploaded.'})
    }

    req.FilePath = req.file.filename;

    if (!req.FilePath.endsWith('.xlsx')) {
        fs.unlinkSync(req.FilePath);
        return res.json({msg: 'Invalid File Format.'});
    }
    next();
}

async function Read_File_Keys(req, res, next) {
    const WorkBook = xlsx.readFile('./Uploads/' + MainFilePath);
    const WorkSheet = await WorkBook.Sheets[WorkBook.SheetNames[0]];
    req.headers = await xlsx.utils.sheet_to_json(WorkSheet, {
        header: 1,
        raw: false,
        dateNF: 'HH:mm:ss'
    })[0];
    next();
}

async function ReadFile(req, res, next) {
    let FilePath = MainFilePath;
    const WorkBook = xlsx.readFile('./Uploads/' + FilePath);
    const WorkSheet = await WorkBook.Sheets[WorkBook.SheetNames[0]];
    res.response = await xlsx.utils.sheet_to_json(WorkSheet, {
        raw: false,
        dateNF: 'HH:mm:ss'
    });
    next();
}

function DeleteFile(req, res, next) {
    let filenameToDelete = MainFilePath;
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

async function ChangeFileTmpMw(req, res, next) {
    MainFilePath = await req.body.FilePath;
    next();
}

module.exports = {
    fs: fs,
    xlsx: xlsx,
    multer: multer,
    Upload: Upload,
    Read_File_Keys: Read_File_Keys,
    File_Con: File_Con,
    ReadFile: ReadFile,
    GetFiles: GetFiles,
    DeleteFile: DeleteFile,
    ChangeFileTmpMw: ChangeFileTmpMw

}
