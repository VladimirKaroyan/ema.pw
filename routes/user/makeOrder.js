let express = require('express');
let router = express.Router();
let shopservice = require('../../services/database');

/* GET home page. */
router.post('/', isLoggedIn, function (req, res, next) {
    let orderData = JSON.parse(req.body.data);
    let orderTotalPrice = JSON.parse(req.body.totalPrice);
    let user = req.user;
    let createOrders = new Promise(function (resolve, reject) {
        if (user['balance'] < orderTotalPrice) reject({
            error: true,
            message: 'Недостаточно средств на балансе, пополните ваш счёт.',
        });
        else {
            const userNewBalance = Number(user['balance']) - Number(orderTotalPrice);
            console.log(userNewBalance);
            shopservice.updateUserBalance(user['id'], userNewBalance).then(function () {
                resolve({
                    error: false,
                    message: 'Покупка успешно совершена.',
                    newBalance: userNewBalance
                });
            });
        }
    });
    createOrders.then(function (values) {
        res.send(values);
    }, function (error) {
        res.send(error);
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(402);
    req.flash('loginMessage', 'You must Sign-In first');
    res.send('loginerr');
}

module.exports = router;
