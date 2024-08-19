const mysql = require('mysql2');
const  params = require("./Gen_params");
let HOST     =params.HOST     ;
let USER     =params.USER     ;
let PASSWORD =params.PASSWORD ;
let Database =params.DATABASE ;

let pool = mysql.createPool({
    host:		HOST		,
    user:		USER		,
    password:	PASSWORD	,
    database:	Database	,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});
module.exports = {
    pool:pool
};
