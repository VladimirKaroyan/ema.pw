let mysql = require('mysql');
let data;
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
module.exports = {
    query: function (query) {
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            data = result;
        });
        return data;
    }
};
