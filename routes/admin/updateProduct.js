let express = require('express');
let router = express.Router();
let shopservice = require('../../services/database');

/* GET home page. */
router.post('/', isLoggedIn, function (req, res, next) {
    let prodCode = req.body.prodcode;
    let prodName = req.body.prodname;
    let prodLine = req.body.prodline;
    let prodDesc = req.body.proddesc;
    let prodQty = req.body.prodqty;
    let prodPrice = req.body.prodprice;
    shopservice.updateProduct(prodCode, prodName, prodLine, prodDesc, prodQty, prodPrice).then(function (data) {
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
