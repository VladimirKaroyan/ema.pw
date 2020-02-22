let express = require('express');
let router = express.Router();
let shopservice = require('../services/database');

/* GET home page. */
router.get('/', async function (req, res, next) {
    let siteOptions = await shopservice.getSiteOptions().then((data) => {
        let sortData = {};
        data.map((row) => {
            let name = row['option_name'];
            let value = row['option_value'];
            sortData[name] = value;
        });
        return sortData;
    });
    shopservice.getAllProducts().then(function (data) {
        if (data instanceof Error) throw res.render('error', {error: data});
        let sortedData = {};
        data.map((row) => {
            let line = row.productLine;
            (sortedData[line] !== undefined) ? sortedData[line].push(row) : sortedData[line] = [row];
        });
        res.render('index', {
            title: 'Express',
            sortData: sortedData,
            user: req.user,
            site_options: siteOptions
        });
    });
});

module.exports = router;
