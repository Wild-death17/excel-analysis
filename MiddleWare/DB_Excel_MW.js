async function Add_Row(req, res, next) {
    let FilePath = req.FilePath;
    console.log(FilePath)
    let Query = "INSERT INTO  Excel";
    Query += "(File_Path) ";
    Query += `VALUES(?)`;
    db_pool.query(Query,[FilePath], function (err, row, fields) {
        if (err) {
            return res.status(500).json({message: err});
        }
        req.id = row.insertId;
    })
    next();
}

async function Update_Row(req, res, next) {
    let {File_Path} = req.body;
    let Id = req.params.Id;
    let Query = "UPDATE Excel SET ";
    Query += `File_Path='${File_Path}' `;
    Query += `WHERE File_ID = ${Id}`;
    db_pool.query(Query, function (err, row, fields) {
        if (err) {
            return res.status(500).json({message: err});
        }
        res.status(200).json({New_ID: Id});
    })
    next();
}

module.exports = {
    Add_Row: Add_Row,
    Update_Row: Update_Row
}