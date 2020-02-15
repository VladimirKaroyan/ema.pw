let express = require('express');
let router = express.Router();
let shopservice = require('../services/database');

/* GET home page. */
router.get('/:postId', function (req, res, next) {
    let id = req.params.postId.toString();
    shopservice.getBlogPost(id).then(function (data) {
        if (data instanceof Error) throw res.render('error', {error: data});
        res.render('blog-post', {
            post: data[0],
            user: req.user
        });
    });
});

module.exports = router;
