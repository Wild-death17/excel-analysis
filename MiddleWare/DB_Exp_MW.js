async function Add_Row(req, res, next) {
    let {Exp_Name,File_ID,Target_Gas_ID,Start_Exp,End_Exp,Gas_Slope} = req.body;
    let Query = "INSERT INTO  Exp";
    Query += "(Exp_Name,File_ID,Target_Gas_ID,Start_Exp,End_Exp,Gas_Slope) ";
    Query += `VALUES('${Exp_Name}',${File_ID},${Target_Gas_ID},'${Start_Exp}','${End_Exp}',${Gas_Slope})`;
    db_pool.query(Query, function (err, row, fields) {
        if (err) {
            return res.status(500).json({message: err});
        }
        res.status(200).json({New_ID: row.insertId});
    })
    next();
}

async function Update_Row(req, res, next) {
    let {Exp_Name,File_ID,Target_Gas_ID,Start_Exp,End_Exp,Gas_Slope} = req.body;
    let Id = req.params.Id;
    let Query = "UPDATE Exp SET ";
    Query += `Exp_Name='${Exp_Name}', `;
    Query += `File_ID=${File_ID}, `;
    Query += `Target_Gas_ID=${Target_Gas_ID}, `;
    Query += `Start_Exp=${Start_Exp}, `;
    Query += `End_Exp=${End_Exp}, `;
    Query += `Gas_Slope=${Gas_Slope} `;
    Query += `WHERE Exp_ID = ${Id}`;
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