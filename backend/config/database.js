const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0000",
    database: "todo_app"
});

module.exports = db;