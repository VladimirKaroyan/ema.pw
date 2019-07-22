let express = require('express');
let router = express.Router();
let con = require('../database');

/* GET home page. */
router.get('/', function (req, res, next) {
    con.query('select * from products').then(function (data) {
        res.render('index', {
            title: 'Express',
            data: data,
            user: req.user
        });
    });
});

module.exports = router;
