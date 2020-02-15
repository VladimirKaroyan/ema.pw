let express = require('express');
let router = express.Router();
let shopservice = require('../../services/database');

/* GET home page. */
router.post('/', isLoggedIn, function (req, res, next) {
    let prodCode = req.body.prodcode;
    let prodName = req.body.prodname;
    let prodLine = req.body.prodline;
    let prodDesc = req.body.proddesc;
    let slowPrice = req.body.prodslowPrice;
    let mediumPrice = req.body.prodmediumPrice;
    let fastPrice = req.body.prodfastPrice;
    let prodPreviewImage = req.body.prodpreviewimage;
    shopservice.updateProduct(prodCode, prodName, prodLine, prodDesc, slowPrice, mediumPrice, fastPrice, prodPreviewImage).then(function (data) {
        req.flash('successMessage', 'Product Was Successfully Updated.');
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
