let express = require('express');
let router = express.Router();
let shopservice = require('../../services/database');

/* GET home page. */
router.post('/', isLoggedIn, function (req, res, next) {
    let optionName = req.body.option_name;
    let optionValue = req.body.option_value;
    console.log(req.body);
    shopservice.updateSiteOption(optionName, optionValue).then(function (data) {
        req.flash('successMessage', 'Site Option Was Successfully Updated.');
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
    req.flash('loginMessage', 'You must Sign-In first');
    res.redirect('/login');
}

module.exports = router;
