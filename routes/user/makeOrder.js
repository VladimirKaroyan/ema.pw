let express = require('express');
let router = express.Router();
let shopservice = require('../../services/database');

/* GET home page. */
router.post('/', isLoggedIn, function (req, res, next) {
    let orderData = JSON.parse(req.body.data);
    let orderTotalPrice = JSON.parse(req.body.totalPrice);
    let user_id = req.user.id;
    let createOrders = new Promise(function (resolve, reject) {
        let orderCodes = [];
        orderData.map(function (order) {
            shopservice.createOrder(order, orderTotalPrice, user_id).then(function (data) {
                if (data instanceof Error) throw res.render('error', {error: data});
                orderCodes.push(data.insertId);
            });
        });
        setTimeout(resolve, 1000, orderCodes);
    });
    createOrders.then(function (values) {
        res.send(values);
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(402);
    req.flash('loginMessage', 'You must Sign-In first');
    res.send('loginerr');
}

module.exports = router;
