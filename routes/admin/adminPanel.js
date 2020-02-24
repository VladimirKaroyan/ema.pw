let express = require('express');
let router = express.Router();
let shopservice = require('../../services/database');

/* GET home page. */
router.get('/', isLoggedIn, async function (req, res, next) {
    let siteOptions = await shopservice.getSiteOptions().then((data) => {
        let sortData = {};
        data.map((row) => {
            let name = row['option_name'];
            let value = row['option_value'];
            let category = row['option_category'];
            sortData[name] = (category) ? [value, category] : value;
        });
        return sortData;
    });
    shopservice.getAdminPanel().then(function (data) {
        if (data instanceof Error) throw res.render('error', {error: data});
        res.render('admin/admin-panel', {
            title: 'Express',
            message: req.flash('successMessage'),
            data: data['orders'],
            user: req.user,
            site_options: siteOptions,
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
    req.flash('loginMessage', 'Сначала войдите в систему.');
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
