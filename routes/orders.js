let express = require('express');
let router = express.Router();
let con = require('../database');

/* GET home page. */
router.post('/', isLoggedIn, function (req, res, next) {
    let orderData = JSON.parse(req.body.data);
    let orderTotalPrice = JSON.parse(req.body.totalPrice);
    let user_id = req.user.id;
    let sendQuery = new Promise(function (resolve, reject) {
        let orderCodes = [];
        for (let i in orderData) {
            let query = `INSERT INTO orders (${`orderId`}, ${`productName`}, ${`productCode`}, ${`productQty`}, ${`productTotalPrice`}, ${`user_id`}) VALUES (null ,'${orderData[i].name}','${orderData[i].productcode}','${orderData[i].count}','${orderTotalPrice}', '${user_id}')`;
            con.query(query.toString()).then(function (data) {
                orderCodes.push(data.insertId);
            });
        }
        setTimeout(resolve, 1000, orderCodes);
    });
    sendQuery.then(function (values) {
        res.send(values);
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(402);
    req.flash('loginMessage', 'You need to Sign-In first' );
    res.send('loginerr');
}

module.exports = router;
