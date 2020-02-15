let express = require('express');
let router = express.Router();
let shopservice = require('../../services/database');

/* GET home page. */
router.post('/', isLoggedIn, function (req, res, next) {
    let postTitle = req.body.postTitle;
    let postContent = req.body.postContent;
    let postCategory = req.body.postCategory;
    let postPrewImage = req.body.postPrewImage;
    shopservice.addBlogPost(postTitle, postContent, postCategory, postPrewImage).then(function (data, error, err) {
        if (data instanceof Error) throw res.render('error', {error: data});
        req.flash('successMessage', 'Blog Post Was Successfully Created.');
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
