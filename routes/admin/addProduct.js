let express = require('express');
let router = express.Router();
let shopservice = require('../../services/database');
let testImages = [
    "/images/followers.png",
    "/images/likes.png",
    "/images/retwits.png"
];
/* GET home page. */
router.post('/', isLoggedIn, function (req, res, next) {
    let prodCode = req.body.addprodcode;
    let prodName = req.body.addprodname;
    let prodLine = req.body.addprodline;
    let prodDesc = req.body.addproddesc;
    let slowPrice = req.body.addProdslowPrice;
    let mediumPrice = req.body.addProdmediumPrice;
    let fastPrice = req.body.addProdfastPrice;
    let prodPreviewImage = req.body.addprodpreviewimage || testImages[Math.floor(Math.random() * testImages.length)];
    console.log(prodPreviewImage);
    shopservice.addProduct(prodCode, prodName, prodLine, prodDesc, slowPrice, mediumPrice, fastPrice, prodPreviewImage).then(function (data, error, err) {
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
