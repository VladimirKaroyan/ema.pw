let mysql = require('mysql');
let con = mysql.createConnection({
    host: "remotemysql.com",
    port: "3306",
    user: "i5t70PMWgi",
    password: "LRWwmlebWZ",
    database: "i5t70PMWgi"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connecting to DB was successfully!");
});


async function getAllProducts() {
    return promise = new Promise(async function (resolve, reject) {
        con.query(`SELECT * FROM products`, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
        });
    });
}

async function getProduct(productCode) {
    return promise = new Promise(async function (resolve, reject) {
        con.query(`SELECT * FROM products WHERE productCode = '${productCode}'`, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
        });
    });
}

async function deleteProduct(productCode) {
    return promise = new Promise(async function (resolve, reject) {
        con.query(`DELETE FROM products WHERE productCode = '${productCode}'`, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
        });
    });
}

async function updateProduct(code, name, desc, qty, price) {
    return promise = new Promise(async function (resolve, reject) {
        con.query(`UPDATE products SET productName = '${name}', productDescription = '${desc}', quantityInStock = '${qty}', buyPrice = '${price}' WHERE products.productCode = '${code}'`, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
        });
    });
}

async function getUserOrders(userId) {
    return promise = new Promise(async function (resolve, reject) {
        con.query(`SELECT * FROM orders WHERE user_id = '${userId}'`, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
        });
    });
}

async function getAllOrders() {
    return promise = new Promise(async function (resolve, reject) {
        con.query(`SELECT * FROM orders`, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
        });
    });
}

async function getProductQtySum() {
    return promise = new Promise(async function (resolve, reject) {
        con.query(`SELECT SUM(productQty) as val FROM orders`, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
        });
    });
}

async function getEarnings() {
    return promise = new Promise(async function (resolve, reject) {
        con.query(`SELECT SUM(productTotalPrice) as val FROM orders`, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
        });
    });
}

async function getOrdersWithInterval(interval) {
    return promise = new Promise(async function (resolve, reject) {
        con.query(`select * from orders where order_date >= DATE_SUB(CURDATE(), INTERVAL ${interval} DAY)`, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
        });
    });
}

async function getAdminPanel() {
    return promise = new Promise(async function (resolve, reject) {
        let orders = await getAllOrders();
        let products = await getAllProducts();
        let lastWeekOrders = await getOrdersWithInterval(7);
        let productSum = await getProductQtySum();
        let earnings = await getEarnings();
        resolve({
            'orders': orders,
            'products': products,
            'lastWeekOrders': lastWeekOrders,
            'productSum': productSum[0].val,
            'earnings': earnings[0].val
        })
    });
}

async function createOrder(order, orderTotalPrice, user_id) {
    return promise = new Promise(async function (resolve, reject) {
        con.query(`INSERT INTO orders (${`orderId`}, ${`productName`}, ${`productCode`}, ${`productQty`}, ${`productTotalPrice`}, ${`user_id`}) VALUES (null ,'${order.name}','${order.productcode}','${order.count}','${orderTotalPrice}', '${user_id}')`, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
        });
        con.query(`UPDATE products SET quantityInStock = ${`quantityInStock`}-${order.count} WHERE products.productCode = '${order.productcode}'`, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
        });
    });
}

module.exports = {
    getProduct,
    getAllProducts,
    getUserOrders,
    createOrder,
    getAdminPanel,
    deleteProduct,
    updateProduct
};
