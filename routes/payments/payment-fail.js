let express = require('express');
let router = express.Router();
let shopservice = require('../../services/database');
const sign = '118524';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Payment Fail, try again');
});

module.exports = router;
