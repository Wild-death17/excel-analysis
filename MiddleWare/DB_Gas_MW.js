async function Add_Row(req, res, next) {
  let { Gas_Name } = req.body;
  if (!Gas_Name)
    return res.status(500).json({ message: "gas name is undefined!" });
  let Query = "INSERT INTO  Gas";
  Query += "(Gas_Name) ";
  Query += `VALUES('${Gas_Name}')`;
  db_pool.query(Query, function (err, row, fields) {
    if (err) {
      return res.status(500).json({ message: err });
    }
    res.status(200).json({ New_ID: row.insertId });
  });
  next();
}
async function Add_Multiple_Row(req, res, next) {
  let idArr = [];
  for (const reqElement in req.body) {
    if (!reqElement)
      return res.status(500).json({ message: "gas name is undefined!" });
    let Query = "INSERT INTO  Gas";
    Query += "(Gas_Name) ";
    Query += `SELECT '${reqElement}' `;
    Query += `WHERE NOT EXISTS ( SELECT 1 `;
    Query += `FROM gas WHERE Gas_Name = '${reqElement}');`;
    let db_promise = db_pool.promise();

    try {
      let [rows] = await db_promise.query(Query);
      idArr.push(rows.insertId);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
  
  console.log(req.body);
  res.status(200).render("Chart.ejs", { gasArr: JSON.stringify(req.body) });
  next();
}

async function Update_Row(req, res, next) {
  let { Gas_Name } = req.body;
  let Id = req.params.Id;
  let Query = "UPDATE Gas SET ";
  Query += `Gas_Name='${Gas_Name}' `;
  Query += `WHERE Gas_ID = ${Id}`;
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
  Add_Multiple_Row: Add_Multiple_Row,
  Update_Row: Update_Row,
};
