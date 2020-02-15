let express = require('express');
let router = express.Router();
let shopservice = require('../../services/database');

/* GET home page. */
router.get('/', isLoggedIn, function (req, res, next) {
    shopservice.getAdminPanel().then(function (data) {
        if (data instanceof Error) throw res.render('error', {error: data});
        res.render('admin/admin-panel', {
            title: 'Express',
            message: req.flash('successMessage'),
            data: data['orders'],
            user: req.user,
            products: data['products'],
            productLines: data['productLines'],
            orders: data['orders'],
            earnings: data['earnings'],
            itemsSold: data['productSum'],
            lastWeekOrders: data['lastWeekOrders'],
            blogPosts: data['blogPosts']
            // earnings: getEarnings(data),
            // itemsSold: getSoldProductsQty(data),
            // lastWeekOrders: getLastWeekOrders(7)
        });
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.admin === 0) {
            res.redirect('/');
        }
        return next();
    }
    req.flash('loginMessage', 'You must Sign-In first');
    res.redirect('/login');
}

// function getEarnings(orders) {
//     let value = 0;
//     orders.map(function (order) {
//         value = value + order.productTotalPrice;
//     });
//     return value;
// }
//
// function getLastWeekOrders(days) {
//     shopservice.getOrdersWithInterval(days).then(function (data) {
//         console.log(data);
//         return data.length;
//     })
// }
//
// function getSoldProductsQty(orders) {
//     let value = 0;
//     orders.map(function (order) {
//         value = value + order.productQty;
//     });
//     return value;
// }

module.exports = router;
