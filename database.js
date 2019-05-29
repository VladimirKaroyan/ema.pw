let mysql = require('mysql');
let con = mysql.createConnection({
    host: "remotemysql.com",
    port: "3306",
    user: "i5t70PMWgi",
    password: "LRWwmlebWZ",
    database: "i5t70PMWgi"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

function query(query) {
    return promise = new Promise((resolve, reject) => {
        con.query(query, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
        });
    });
}

module.exports = {
    query
};
