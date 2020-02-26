let express = require('express');
let router = express.Router();
// let shopservice = require('../services/database');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('help', {
        title: 'Express',
        user: req.user
    });
});

module.exports = router;
