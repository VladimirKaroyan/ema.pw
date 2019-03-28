let mysql = require('mysql');
let con = mysql.createConnection({
    host: "remotemysql.com",
    port: "3306",
    user: "LzhnQiZjpm",
    password: "b5xdxdeCxv",
    database: "LzhnQiZjpm"
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
