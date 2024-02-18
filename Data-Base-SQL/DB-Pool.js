const MySql = require('mysql2');
const GenParam = require('./Gen-Params');
//------------------------------------------------
let HOST = GenParam.HOST;
let USER = GenParam.USER;
let PASSWORD = GenParam.PASSWORD;
let DATABASE = GenParam.DATABASE;
console.log("database.HOST	=", HOST);
console.log("database.USER	=", USER);
console.log("database.PASSWORD=", PASSWORD);
console.log("database.DATABASE=", DATABASE);
//------------------------------------------------
const Pool = MySql.createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    multipleStatements: true
});
//------------------------------------------------
module.exports = {
    Pool: Pool
};
//------------------------------------------------