let express = require('express');
let router = express.Router();
// let shopservice = require('../services/database');

/* GET home page. */
router.get('/', isLoggedIn, function (req, res, next) {
    res.render('user/settings', {
        title: 'Express',
        user: req.user
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(402);
    req.flash('loginMessage', 'You must Sign-In first');
    res.redirect('/login');
    res.send('loginerr');
}

module.exports = router;
