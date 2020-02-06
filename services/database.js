let mysql = require('mysql');
var db_config = {
    host: "remotemysql.com",
    port: "3306",
    user: "i5t70PMWgi",
    password: "LRWwmlebWZ",
    database: "i5t70PMWgi"
};

var con;

function handleDisconnect() {
    console.log('Connecting to DB');
    con = mysql.createConnection(db_config); // Recreate the connection, since
    // the old one cannot be reused.
    var del = con._protocol._delegateError;

    con.connect(function (err) {              // The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            resolve('Error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }
        console.log("Connecting to DB was successfully!");// to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    con.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {// Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });

    con._protocol._delegateError = function(err, sequence){
        return del.call(this, err, sequence);
    };
}

handleDisconnect();

async function getConnection() {
    if (con === undefined) getConnection();
    else {
        return promise = new Promise(async function (resolve, reject) {
            resolve(con);
        });
    }
}

async function getAllProducts() {
    return promise = new Promise(async function (resolve, reject) {
        con.query(`SELECT * FROM products`, function (err, rows, fields) {
            if (err) resolve(err);
            resolve(rows);
        });
    });
}

async function getProduct(productCode) {
    return promise = new Promise(async function (resolve, reject) {
        con.query(`SELECT * FROM products WHERE productCode = '${productCode}'`, function (err, rows, fields) {
            if (err) resolve(err);
            resolve(rows);
        });
    });
}

async function getProductLines() {
    return promise = new Promise(async function (resolve, reject) {
        con.query(`SELECT * FROM productlines`, function (err, rows, fields) {
            if (err) resolve(err);
            resolve(rows);
        });
    });
}

async function deleteProduct(productCode) {
    return promise = new Promise(async function (resolve, reject) {
        con.query(`DELETE FROM products WHERE productCode = '${productCode}'`, function (err, rows, fields) {
            if (err) resolve(err);
            resolve(rows);
        });
    });
}

async function updateProduct(code, name, line, desc, qty, price, preview) {
    return promise = new Promise(async function (resolve, reject) {
        con.query(`UPDATE products SET productName = '${name}', productDescription = '${desc}', productLine = '${line}', quantityInStock = '${qty}', buyPrice = '${price}', previewImage = '${preview}' WHERE products.productCode = '${code}'`, function (err, rows, fields) {
            if (err) resolve(err);
            resolve(rows);
        });
    });
}

async function addProduct(code, name, line, desc, qty, price, preview) {
    return promise = new Promise(async function (resolve, reject) {
        con.query(`INSERT INTO products(productCode, productName, productLine, productVendor, productDescription, quantityInStock, buyPrice, MSRP, previewImage) VALUES ('${code}', '${name}', '${line}', '', '${desc}', '${qty}', '${price}', '0', '${preview}')`, function (err, rows, fields) {
            if (err) resolve(err);
            resolve(rows);
        });
    });
}

async function getUserOrders(userId) {
    return promise = new Promise(async function (resolve, reject) {
        con.query(`SELECT * FROM orders WHERE user_id = '${userId}'`, function (err, rows, fields) {
            if (err) resolve(err);
            resolve(rows);
        });
    });
}

async function getAllOrders() {
    return promise = new Promise(async function (resolve, reject) {
        con.query(`SELECT * FROM orders`, function (err, rows, fields) {
            if (err) resolve(err);
            resolve(rows);
        });
    });
}

async function getProductQtySum() {
    return promise = new Promise(async function (resolve, reject) {
        con.query(`SELECT SUM(productQty) as val FROM orders`, function (err, rows, fields) {
            if (err) resolve(err);
            resolve(rows);
        });
    });
}

async function getEarnings() {
    return promise = new Promise(async function (resolve, reject) {
        con.query(`SELECT SUM(productTotalPrice) as val FROM orders`, function (err, rows, fields) {
            if (err) resolve(err);
            resolve(rows);
        });
    });
}

async function getOrdersWithInterval(interval) {
    return promise = new Promise(async function (resolve, reject) {
        con.query(`select * from orders where order_date >= DATE_SUB(CURDATE(), INTERVAL ${interval} DAY)`, function (err, rows, fields) {
            if (err) resolve(err);
            resolve(rows);
        });
    });
}

async function getAdminPanel() {
    return promise = new Promise(async function (resolve, reject) {
        let orders = await getAllOrders();
        let products = await getAllProducts();
        let lastWeekOrders = await getOrdersWithInterval(7);
        let productLines = await getProductLines();
        let productSum = await getProductQtySum();
        let earnings = await getEarnings();
        resolve({
            'orders': orders,
            'products': products,
            'productLines': productLines,
            'lastWeekOrders': lastWeekOrders,
            'productSum': productSum[0].val,
            'earnings': earnings[0].val
        })
    });
}

async function createOrder(order, orderTotalPrice, user_id) {
    return promise = new Promise(async function (resolve, reject) {
        con.query(`INSERT INTO orders (${`orderId`}, ${`productName`}, ${`productCode`}, ${`productQty`}, ${`productTotalPrice`}, ${`user_id`}) VALUES (null ,'${order.name}','${order.productcode}','${order.count}','${orderTotalPrice}', '${user_id}')`, function (err, rows, fields) {
            if (err) resolve(err);
            resolve(rows);
        });
        con.query(`UPDATE products SET quantityInStock = ${`quantityInStock`}-${order.count} WHERE products.productCode = '${order.productcode}'`, function (err, rows, fields) {
            if (err) resolve(err);
            resolve(rows);
        });
    });
}

module.exports = {
    getConnection,
    getProduct,
    getAllProducts,
    getUserOrders,
    createOrder,
    getAdminPanel,
    deleteProduct,
    getProductLines,
    updateProduct,
    addProduct,
    getAllOrders
};
