let express = require('express');
let router = express.Router();
let con = require('../database');
let passport = require('passport');
require('../config/passport')(passport);
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login', {
        title: 'Express',
        user: req.user
    });
});
router.post('/', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }),
    function (req, res) {
        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
            req.session.cookie.expires = false;
        }
        res.redirect('/');
    });

module.exports = router;
