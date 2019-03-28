let express = require('express');
let router = express.Router();
let con = require('../database');

/* GET home page. */
router.get('/', function (req, res, next) {
    con.query('select * from customers').then(function (data) {
        res.render('customers', {
            title: 'Customers',
            data: data
        });
    });
});

module.exports = router;
