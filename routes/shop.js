let express = require('express');
let router = express.Router();
let shopservice = require('../services/database');
let lineList = {
    "Vkontakte": 1,
    "Facebook": 2,
    "Instagram": 3,
    "Youtube": 4,
    "Twitter": 5,
    "Odnoklassniki": 7,
};
/* GET home page. */
router.get('/', isLoggedIn, function (req, res, next) {
    shopservice.getAllProducts().then(function (data) {
        if (data instanceof Error) throw res.render('error', {error: data});
        let sortedData = {};
        data.map((row) => {
            let line = row.productLine;
            row['service_type'] = lineList[line];
            (sortedData[line] !== undefined) ? sortedData[line].push(row) : sortedData[line] = [row];
        });
        res.render('shop', {
            title: 'Express',
            sortData: sortedData,
            user: req.user
        });
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
