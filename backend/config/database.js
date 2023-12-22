const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0000",
    database: "todo_app"
});

module.exports = db;