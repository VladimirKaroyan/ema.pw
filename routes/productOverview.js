let express = require('express');
let router = express.Router();
let shopservice = require('../services/database');

/* GET home page. */
router.get('/:prCode', function (req, res, next) {
    let code = req.params.prCode.toString();
    shopservice.getProduct(code).then(function (data) {
        res.render('productOverview', {
            title: 'Express',
            product: data[0],
            user: req.user
        });
    });
});

module.exports = router;
