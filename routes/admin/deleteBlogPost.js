let express = require('express');
let router = express.Router();
let shopservice = require('../../services/database');

/* GET home page. */
router.get('/:prCode', isLoggedIn, function (req, res, next) {
    let code = req.params.prCode.toString();
    shopservice.deleteBlogPost(code).then(function (data) {
        if (data instanceof Error) throw res.render('error', {error: data});
        req.flash('successMessage', 'Blog Post Was Successfully Deleted.');
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
    req.flash('loginMessage', 'Сначала войдите в систему.');
    res.redirect('/login');
}

module.exports = router;
