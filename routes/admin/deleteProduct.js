let express = require('express');
let router = express.Router();
let shopservice = require('../../services/database');

/* GET home page. */
router.get('/:prCode', isLoggedIn, function (req, res, next) {
    let code = req.params.prCode.toString();
    shopservice.deleteProduct(code).then(function (data) {
        req.flash('successMessage', 'Product Was Successfully Deleted.');
        res.redirect('/admin-panel');
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.admin === 0) {
            res.redirect('/');
        }
        return next();
    }
    req.flash('loginMessage', 'You need to Sign-In first');
    res.redirect('/login');
}

module.exports = router;
