let express = require('express');
let router = express.Router();
let shopservice = require('../../services/database');

/* GET home page. */
router.post('/', isLoggedIn, function (req, res, next) {
    let optionName = req.body.option_name;
    let optionValue = req.body.option_value;
    let optionCategory = req.body.option_category;

    async function uploadSliderImages() {
        return new Promise(function (resolve, reject) {
            for (let i = 1; i <= 5; i++) {
                let val = 'option_value_' + i;
                let name = 'slider_image_' + i;
                console.log(name, req.body[val]);
                shopservice.updateSiteOption(name, req.body[val], optionCategory).then(function (data) {
                }, function (err) {
                    reject(err);
                });
            }
            resolve(true);
        })
    }

    if (optionName === 'slider_image') {
        uploadSliderImages().then(function () {
            req.flash('successMessage', 'Site Option Was Successfully Updated.');
            res.redirect('/admin-panel');
        }, function () {
            req.flash('successMessage', 'Failed. Try Again');
            res.redirect('/admin-panel');
        });
    } else {
        shopservice.updateSiteOption(optionName, optionValue, optionCategory).then(function (data) {
            req.flash('successMessage', 'Site Option Was Successfully Updated.');
            res.redirect('/admin-panel');
        });
    }
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
