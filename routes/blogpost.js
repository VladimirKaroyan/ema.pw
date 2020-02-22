let express = require('express');
let router = express.Router();
let shopservice = require('../services/database');

/* GET home page. */
router.get('/:postId', async function (req, res, next) {
    let siteOptions = await shopservice.getSiteOptions().then((data) => {
        let sortData = {};
        data.map((row) => {
            let name = row['option_name'];
            let value = row['option_value'];
            sortData[name] = value;
        });
        return sortData;
    });
    let id = req.params.postId.toString();
    shopservice.getBlogPost(id).then(function (data) {
        if (data instanceof Error) throw res.render('error', {error: data});
        res.render('blog-post', {
            post: data[0],
            user: req.user,
            site_options: siteOptions
        });
    });
});

module.exports = router;
