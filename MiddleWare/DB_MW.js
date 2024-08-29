async function Read_All_Rows(req, res, next) {
    let {Table_Name} = req.body;
    let Query = `SELECT * FROM ${Table_Name}`;
    let db_promise = db_pool.promise();
    try {
        res.status(200).json(await db_promise.query(Query));
    }catch (err){
        return res.status(500).json({message: err});
    }
    next();
}

async function Read_Row(req, res, next) {
    let {Table_Name, Column_Name} = req.body;
    let {Id} = req.params;
    let Query = `SELECT * FROM ${Table_Name} WHERE ${Column_Name} = ${Id}`;
    let db_promise = db_pool.promise();
    try {
        res.status(200).json(await db_promise.query(Query));
    }catch (err){
            return res.status(500).json({message: err});
        }
    next();
}
async function Read_Row_With_Value(req, res, next) {
    let {Table_Name, Column_Name,val} = req.body;
    let Query = `SELECT * FROM ${Table_Name} WHERE ${Column_Name} = ${val}`;
    let db_promise = db_pool.promise();
    try {
        res.status(200).json(await db_promise.query(Query));
    }catch (err){
            return res.status(500).json({message: err});
        }
    next();
}

async function Delete_Row(req, res, next) {
    let {Table_Name, Column_Name, column_Val} = req.body;
    let Query = `DELETE FROM ${Table_Name} WHERE ${Column_Name} = '${column_Val}'`;
    let db_promise = db_pool.promise();
    try {
        await db_promise.query(Query);
    }
    catch (err) {
        return res.status(500).json({message: err});
    }
    next();
}

module.exports = {
    Read_All_Rows: Read_All_Rows,
    Read_Row: Read_Row,
    Delete_Row: Delete_Row,
    Read_Row_With_Value:Read_Row_With_Value
}