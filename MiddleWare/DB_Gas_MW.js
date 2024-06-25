async function Add_Row(req, res, next) {
    let {Gas_Name} = req.body;
        if (!Gas_Name)
            return res.status(500).json({message: "gas name is undefined!"});
    let Query = "INSERT INTO  Gas";
    Query += "(Gas_Name) ";
    Query += `VALUES('${Gas_Name}')`;
    db_pool.query(Query, function (err, row, fields) {
        if (err) {
            return res.status(500).json({message: err});
        }
        res.status(200).json({New_ID: row.insertId});
    })
    next();
}

async function Update_Row(req, res, next) {
    let {Gas_Name} = req.body;
    let Id = req.params.Id;
    let Query = "UPDATE Gas SET ";
    Query += `Gas_Name='${Gas_Name}' `;
    Query += `WHERE Gas_ID = ${Id}`;
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