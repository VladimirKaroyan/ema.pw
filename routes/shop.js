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
    "Telegram": 6,
};
/* GET home page. */
router.get('/', isLoggedIn, async function (req, res, next) {
    let siteOptions = await shopservice.getSiteOptions().then((data) => {
        let sortData = {};
        data.map((row) => {
            let name = row['option_name'];
            let value = row['option_value'];
            let category = row['option_category'];
            sortData[name] = (category) ? [value, category] : value;
        });
        return sortData;
    });
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
            user: req.user,
            site_options: siteOptions,
            site_options: siteOptions
        });
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(402);
    req.flash('loginMessage', 'Сначала войдите в систему.');
    res.redirect('/login');
}

module.exports = router;
