
const mysql = require('mysql');

const db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "Plantarium",
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
});

module.exports = db;