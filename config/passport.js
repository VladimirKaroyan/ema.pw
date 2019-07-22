var LocalStrategy = require("passport-local").Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = {
    'connection': {
        'host': 'remotemysql.com',
        'user': 'i5t70PMWgi',
        'password': 'LRWwmlebWZ',
    },
    'database': 'i5t70PMWgi',
    'user_table': 'users'
}
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ", [id],
            function (err, rows) {
                done(err, rows[0]);
            });
    });

    passport.use(
        'local-signup',
        new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            },
            function (req, username, password, done) {
                let first_name = req.body.first_name;
                let last_name = req.body.last_name;
                let email = req.body.email;
                connection.query("SELECT * FROM users WHERE username = ? ",
                    [username], function (err, rows) {
                        if (err)
                            return done(err);
                        if (rows.length) {
                            return done(null, false, req.flash('signupMessage', 'That is already taken'));
                        } else {
                            var newUserMysql = {
                                username: username,
                                password: bcrypt.hashSync(password, null, null),
                                first_name: first_name,
                                last_name: last_name,
                                email: email,
                            };
                            var insertQuery = "INSERT INTO users (email, username, password, first_name, last_name) values (?, ?, ?, ?, ?)";

                            connection.query(insertQuery, [newUserMysql.email, newUserMysql.username, newUserMysql.password, newUserMysql.first_name, newUserMysql.last_name],
                                function (err, rows) {
                                    newUserMysql.id = rows.insertId;

                                    return done(null, newUserMysql);
                                });
                        }
                    });
            })
    );

    passport.use(
        'local-login',
        new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            },
            function (req, username, password, done) {
                connection.query("SELECT * FROM users WHERE username = ? ", [username],
                    function (err, rows) {
                        if (err)
                            return done(err);
                        if (!rows.length) {
                            return done(null, false, req.flash('loginMessage', 'No User Found'));
                        }
                        if (!bcrypt.compareSync(password, rows[0].password))
                            return done(null, false, req.flash('loginMessage', 'Wrong Password'));

                        return done(null, rows[0]);
                    });
            })
    );
};