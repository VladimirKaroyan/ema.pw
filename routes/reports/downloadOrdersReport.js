let express = require('express');
let router = express.Router();
let shopservice = require('../../services/database');
const fs = require('fs');
const excel = require('exceljs');
const tmp = require('tmp');
/* GET home page. */
router.get('/:fileType', isLoggedIn, async function (req, res, next) {
    let file_type = req.params.fileType;
    var file = tmp.fileSync({prefix: 'prefix-', postfix: '.' + file_type});
    let workbook = new excel.Workbook(); //creating workbook
    let worksheet = workbook.addWorksheet('Customers'); //creating worksheet
    shopservice.getAllOrders().then(function (data) {
        if (data instanceof Error) throw res.render('error', {error: data});
        let dat = JSON.parse(JSON.stringify(data)).map(function (row) {
            row.order_date = new Date(new Date(row.order_date) + ' UTC').toLocaleString();
            return row;
        });
        worksheet.columns = [
            {header: 'Order ID', key: 'orderId', width: 10},
            {header: 'Product Name', key: 'productName', width: 50},
            {header: 'Product Code', key: 'productCode', width: 15},
            {header: 'Quantity', key: 'productQty', width: 10, outlineLevel: 1},
            {header: 'Total Price ($)', key: 'productTotalPrice', width: 13, outlineLevel: 1},
            {header: 'User ID', key: 'user_id', width: 10, outlineLevel: 1},
            {header: 'Order Date', key: 'order_date', width: 20, outlineLevel: 1},
        ];
        // Add Array Rows
        worksheet.addRows(dat);
        if (file_type === 'csv') {
            workbook.csv.writeFile(file.name)
                .then(function () {
                    res.download(file.name, 'Orders-Report.csv', function (err) {
                        file.removeCallback();
                    });
                });
        }
        else {
            workbook.xlsx.writeFile(file.name)
                .then(function () {
                    res.download(file.name, 'Orders-Report.xlsx', function (err) {
                        file.removeCallback();
                    });
                });
        }
    });
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