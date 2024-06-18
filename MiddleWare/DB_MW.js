async function Read_All_Rows(req, res, next) {
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

async function Read_Row(req, res, next) {
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

async function Delete_Row(req, res, next) {
    let {Table_Name, Column_Name} = req.body;
    let {Id} = req.params;
    let Query = `DELETE FROM ${Table_Name} WHERE ${Column_Name} = ${Id}`;
    db_pool.query(Query, (err, row, fields) => {
        if (err) {
            return res.status(500).json({message: err});
        }
        res.status(200).json({Massage: "The row Deleted successfully!"});
    })
    next();
}

module.exports = {
    Read_All_Rows: Read_All_Rows,
    Read_Row: Read_Row,
    Delete_Row: Delete_Row
}