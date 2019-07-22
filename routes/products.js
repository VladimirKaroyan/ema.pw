let express = require('express');
let router = express.Router();
let con = require('../database');

/* GET home page. */
router.get('/:prCode', function (req, res, next) {
    let code = req.params.prCode.toString();
    let query = "SELECT * FROM products WHERE productCode = '" + code + "'";
    con.query(query).then(function (data) {
        res.render('products', {
            title: 'Express',
            product: data[0],
            user: req.user
        });
    });
});

module.exports = router;
