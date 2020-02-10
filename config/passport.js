var LocalStrategy = require("passport-local").Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
let shopservice = require('../services/database');
let connection;
var con = shopservice.getConnection().then(function (connec) {
    connection = connec;
});
module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        connection.getConnection(function (err, con) {
            con.query("SELECT * FROM users WHERE id = ? ", [id],
                function (err, rows) {
                    con.release();
                    done(err, rows[0]);
                });
        })
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
                connection.getConnection(function (err, con) {
                    con.query("SELECT * FROM users WHERE username = ? ",
                        [username], function (err, rows) {
                            con.release();
                            if (err)
                                return done(err);
                            if (rows.length) {
                                return done(null, false, req.flash('signupMessage', 'That username is already taken'));
                            } else {
                                var newUserMysql = {
                                    username: username,
                                    password: bcrypt.hashSync(password, null, null),
                                    first_name: first_name,
                                    last_name: last_name,
                                    email: email,
                                };
                                var insertQuery = "INSERT INTO users (email, username, password, first_name, last_name) values (?, ?, ?, ?, ?)";
                                connection.getConnection(function (err, con) {
                                    con.query(insertQuery, [newUserMysql.email, newUserMysql.username, newUserMysql.password, newUserMysql.first_name, newUserMysql.last_name],
                                        function (err, rows) {
                                            if (err) console.error(err);
                                            con.release();
                                            newUserMysql.id = rows.insertId;
                                            return done(null, newUserMysql);
                                        });
                                });
                            }
                        });
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
                connection.getConnection(function (err, con) {
                    con.query("SELECT * FROM users WHERE username = ? ", [username],
                        function (err, rows) {
                            con.release();
                            if (err)
                                return done(err);
                            if (!rows.length) {
                                return done(null, false, req.flash('loginMessage', 'No user with this username found'));
                            }
                            if (!bcrypt.compareSync(password, rows[0].password))
                                return done(null, false, req.flash('loginMessage', 'Password is wrong'));
                            return done(null, rows[0]);
                        });
                });
            })
    );
};
