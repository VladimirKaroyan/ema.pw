let express = require('express');
let router = express.Router();
let shopservice = require('../../services/database');

/* GET home page. */
router.post('/', isLoggedIn, function (req, res, next) {
    let prodCode = req.body.addprodcode;
    let prodName = req.body.addprodname;
    let prodLine = req.body.addprodline;
    let prodDesc = req.body.addproddesc;
    let prodQty = req.body.addprodqty;
    let prodPrice = req.body.addprodprice;
    shopservice.addProduct(prodCode, prodName, prodLine, prodDesc, prodQty, prodPrice).then(function (data, error, err) {
        if (data instanceof Error) throw res.render('error', {error: data});
        req.flash('successMessage', 'Product Was Successfully Created.');
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
