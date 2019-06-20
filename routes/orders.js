let express = require('express');
let router = express.Router();
let con = require('../database');

/* GET home page. */
router.post('/', function (req, res, next) {
    let orderData = JSON.parse(req.body.data);
    for (let i in orderData) {
        let query = `INSERT INTO orderdetails (orderNumber, productCode, quantityOrdered, priceEach, orderLineNumber, totalprice) VALUES ('',${orderData[i].productcode},${orderData[i].count},${orderData[i].price},${''},${orderData[i].count*orderData[i].price})`;
        console.log(query);
        con.query(query.toString()).then(function (data) {
            console.log('Success');
        });
    }
});

module.exports = router;