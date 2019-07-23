let express = require('express');
let router = express.Router();
let con = require('../database');

/* GET home page. */
router.get('/', isLoggedIn, function (req, res, next) {
    let userId = req.user.id;
    let query = "SELECT * FROM orders WHERE user_id = '" + userId + "'";
    con.query(query).then(function (data) {
        console.log(data[0]);
        res.render('myorders', {
            orders: data,
            user: req.user,
        });
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
}

module.exports = router;
