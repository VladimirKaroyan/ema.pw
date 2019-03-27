let express = require('express');
let router = express.Router();
let con = require('../database');
console.log(con.query('SELECT * FROM products'));
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express',
        data: data
    });
});

module.exports = router;
