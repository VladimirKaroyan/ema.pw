let express = require('express');
let router = express.Router();
let con = require('../database');

/* GET home page. */
router.post('/', function (req, res, next) {
    let orderData = JSON.parse(req.body.data);
    let orderTotalPrice = JSON.parse(req.body.totalPrice);
    let sendQuery = new Promise(function (resolve, reject) {
        let orderCodes = [];
        for (let i in orderData) {
            let query = `INSERT INTO orders (${`orderId`}, ${`productName`}, ${`productCode`}, ${`productQty`}, ${`productTotalPrice`}) VALUES (null ,'${orderData[i].name}','${orderData[i].productcode}','${orderData[i].count}','${orderTotalPrice}')`;
            con.query(query.toString()).then(function (data) {
                orderCodes.push(data.insertId);
            });
        }
        setTimeout(resolve, 1000, orderCodes);
    });
    sendQuery.then(function (values) {
        res.send(values);
    });
});

module.exports = router;
