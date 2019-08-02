let express = require('express');
let router = express.Router();
let shopservice = require('../services/database');

/* GET home page. */
router.get('/', function (req, res, next) {
    shopservice.getAllProducts().then(function (data) {
        if (data instanceof Error) throw res.render('error', {error: data});
        res.render('index', {
            title: 'Express',
            data: data,
            user: req.user
        });
    });
});

module.exports = router;
