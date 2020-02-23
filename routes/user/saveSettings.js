let express = require('express');
let router = express.Router();
let shopservice = require('../../services/database');
var bcrypt = require('bcrypt-nodejs');

/* GET home page. */
router.post('/', isLoggedIn, function (req, res, next) {
    let userId = req.user['id'];
    let userEmail = req.body['email'];
    let userName = req.body['userName'];
    let userFirstName = req.body['first_name'];
    let userLastName = req.body['last_name'];
    let userPassEncrypted = req.user['password'];
    let userPass = req.body['current_password'];
    let userNewPass = req.body['new_password'];
    let userNewPassAgain = req.body['new_password_again'];
    if (!bcrypt.compareSync(userPass, userPassEncrypted) || userNewPass !== userNewPassAgain) return res.render('error', {error: {message: "Wrong Current/New Password"}});
    if (userNewPass === '') userNewPass = bcrypt.hashSync(userPass, null, null);
    else userNewPass = bcrypt.hashSync(userNewPass, null, null);
    shopservice.updateUserSettings(userId, userEmail, userName, userNewPass, userFirstName, userLastName).then(() => {
            console.log('User Settings Update Success.');
            res.redirect('/settings');
        },
        (error) => {
            res.render('error', {error: error});
        }
    );

});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(402);
    req.flash('loginMessage', 'Сначала войдите в систему.');
    res.redirect('/login');
}

module.exports = router;