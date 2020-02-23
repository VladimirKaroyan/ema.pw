let express = require('express');
let router = express.Router();
let shopservice = require('../../services/database');

/* GET home page. */
router.post('/', isLoggedIn, function (req, res, next) {
    let postId = req.body.postId;
    let postTitle = req.body.postTitle;
    let postContent = req.body.postContent;
    let postCategory = req.body.postCategory;
    let postPrewImage = req.body.postPrewImage;
    shopservice.updateBlogPost(postId, postTitle, postContent, postCategory, postPrewImage).then(function (data) {
        req.flash('successMessage', 'Blog Post Was Successfully Updated.');
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
