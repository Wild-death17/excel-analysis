async function Add_Row(req, res, next) {
    let { Slope,Exp_ID } = req.body;
    let Query = "INSERT INTO  Slope";
    Query += "(Slope,Exp_ID) ";
    Query += `VALUES('${Slope}','${Exp_ID}')`;
    db_pool.query(Query, function (err, row, fields) {
      if (err) {
        return res.status(500).json({ message: err });
      }
      res.status(200).json({ New_ID: row.insertId });
    });
    next();
}
async function Update_Row(req, res, next) {
    let { Slope,Exp_ID } = req.body;
    let Id = req.params.Id;
    let Query = "UPDATE Slope SET ";
    Query += `Slope='${Slope}', `;
    Query += `Exp_ID='${Exp_ID}' `;
    Query += `WHERE ID = ${Id}`;
    db_pool.query(Query, function (err, row, fields) {
      if (err) {
        return res.status(500).json({ message: err });
      }
      res.status(200).json({ New_ID: Id });
    });
    next();
}
module.exports = {
    Add_Row: Add_Row,
    Update_Row: Update_Row,
  };
  