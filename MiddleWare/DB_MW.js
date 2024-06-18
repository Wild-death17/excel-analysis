function Read_All_Rows(req, res, next) {
    let {Table_Name} = req.body;
    let Query = `SELECT * FROM ${Table_Name}`;
    db_pool.query(Query, (err, rows, fields) => {
        if (err) {
            return res.status(500).json({message: err});
        }
        res.status(200).json(rows);
    })
    next();
}

function Read_Row(req, res, next) {
    let {Table_Name, Column_Name} = req.body;
    let {Id} = req.params;
    let Query = `SELECT * FROM ${Table_Name} WHERE ${Column_Name} = ${Id}`;
    db_pool.query(Query, (err, row, fields) => {
        if (err) {
            return res.status(500).json({message: err});
        }
        res.status(200).json(row);
    })
    next();
}

function Add_Row(req, res, next) {
    let {Table_Name} = req.body;
    let Columns = [];
    let Values_Str = "";
    let Columns_Name_Str = "";
    for (const columnName in res.body.columnName) {
        Columns.push(columnName);
    }
    let Query = `INSERT INTO  ${Table_Name}(`;
    for (let i = 0; i < Columns.length; i++) {
        Columns_Name_Str += `${Columns[i]}`;
        Values_Str += `${req.body.Columns[i]}`;
        if (i < Columns.length - 1)
            Query += ",";
        else
            Query += ") ";
    }
    Query += "VALUES(";

    db_pool.query(q, function (err, rows, fields) {
        if (err) {
            res.status(500).json({message: err});
        } else {
            res.redirect('/front/bg');
        }
    })
}

function Update_Row(req, res, next) {

}

function Delete_Row(req, res, next) {

}

module.exports = {
    Read_All_Rows: Read_All_Rows,
    Read_Row: Read_Row,
    Add_Row: Add_Row,
    Update_Row: Update_Row,
    Delete_Row: Delete_Row
}