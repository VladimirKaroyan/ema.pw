let express = require('express');
let router = express.Router();
let shopservice = require('../../services/database');
let passport = require('passport');
require('../../config/passport')(passport);
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('user/signup', {
        title: 'Express',
        user: req.user,
        message: req.flash('signupMessage'),
    });
});

router.post('/', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/sign-up',
    failureFlash: true
}));

module.exports = router;
