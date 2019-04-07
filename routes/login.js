let express = require('express');
let router = express.Router();
let con = require('../database');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login', {
        title: 'Express',
    });
});
router.get('/user', function (req, res) {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let username = req.query.username;
    let password = req.query.password;
    let query = `SELECT * FROM ${'`users`'} WHERE ${'`username`'} = '${username}' AND ${'`password`'} = '${password}'`;
    con.query(query).then(function (data) {
        if (data.length === 0) {
            console.log('Failed to log in with username: ' + username + ' from ip address: ' + ip);
            res.status(500).send('Something broke!')
        } else {
            res.send('Hoorah');
        }
    })
});

module.exports = router;
