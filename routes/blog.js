let express = require('express');
let router = express.Router();
let shopservice = require('../services/database');

/* GET home page. */
router.get('/', function (req, res, next) {
    shopservice.getAllBlogPosts().then(function (data) {
        if (data instanceof Error) throw res.render('error', {error: data});
        let sortedData = {};
        data.map((row) => {
            let line = row.category;
            (sortedData[line] !== undefined) ? sortedData[line].push(row) : sortedData[line] = [row];
        });
        res.render('blog', {
            title: 'Express',
            sortData: sortedData,
            user: req.user
        });
    });
});

module.exports = router;
