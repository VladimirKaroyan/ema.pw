let express = require('express');
let router = express.Router();
let shopservice = require('../../services/database');
const sign = '118524';

/* GET home page. */
router.get('/', function (req, res, next) {
    let createPayment = new Promise(function (resolve, reject) {
        let userId = req.query['MERCHANT_ORDER_ID'];
        let amount = req.query['AMOUNT'];
        let merchantId = req.query['MERCHANT_ID'];
        if (merchantId !== sign) reject('Wrong Sign');
        shopservice.addToUserBalance(userId, amount).then(
            () => {
                resolve('User Id: ' + userId + ' Amount: ' + amount);
            },
            (error) => {
                reject(error);
            }
        )
    });
    createPayment.then(
        (successMessage) => {
            res.send('Success ' + successMessage);
        },
        (error) => {
            res.send(error);
        }
    )
});

module.exports = router;
