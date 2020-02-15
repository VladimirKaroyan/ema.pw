let mysql = require('mysql');
let con;

console.log('Connecting to DB');
con = mysql.createPool({
    connectionLimit: 20,
    host: "remotemysql.com",
    port: "3306",
    user: "i5t70PMWgi",
    password: "LRWwmlebWZ",
    database: "i5t70PMWgi"
    // host: "localhost",
    // port: "3306",
    // user: "root",
    // password: "",
    // database: "nodestore"
}); // Recreate the connection, since
con.on('error', function (err) {
    console.error(err);
});
// console.log(con);

async function getConnection() {
    if (con === undefined) getConnection();
    else {
        return promise = new Promise(async function (resolve, reject) {
            con.getConnection(function (err, connection) {
                if (err) resolve(err);
                resolve(con);
            });
        });
    }
}

async function getAllProducts() {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) resolve(err);
            connection.query(`SELECT * FROM products`, function (err, rows, fields) {
                connection.release();
                if (err) resolve(err);
                resolve(rows);
            });
        });
    });
}

async function getAllBlogPosts() {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) resolve(err);
            connection.query(`SELECT * FROM blogposts`, function (err, rows, fields) {
                connection.release();
                if (err) resolve(err);
                resolve(rows);
            });
        });
    });
}

async function getBlogPost(postId) {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) resolve(err);
            connection.query(`SELECT * FROM blogposts WHERE id = '${postId}'`, function (err, rows, fields) {
                connection.release();
                if (err) resolve(err);
                resolve(rows);
            });
        });
    });
}

async function deleteBlogPost(postId) {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) resolve(err);
            connection.query(`DELETE FROM blogposts WHERE id = '${postId}'`, function (err, rows, fields) {
                connection.release();
                if (err) resolve(err);
                resolve(rows);
            });
        });
    });
}

async function updateBlogPost(postId, title, content, category, preview) {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) resolve(err);
            connection.query(`UPDATE blogposts SET title = '${title}', content = '${content}', category = '${category}', previewImage = '${preview}' WHERE blogposts.id = '${postId}'`, function (err, rows, fields) {
                connection.release();
                if (err) resolve(err);
                resolve(rows);
            });
        });
    });
}

async function addBlogPost(title, content, category, preview) {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) resolve(err);
            connection.query(`INSERT INTO blogposts(title, content, category, previewImage) VALUES ('${title}', '${content}', '${category}', '${preview}')`, function (err, rows, fields) {
                connection.release();
                if (err) resolve(err);
                resolve(rows);
            });
        });
    });
}

async function getProductLines() {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) resolve(err);
            connection.query(`SELECT * FROM productlines`, function (err, rows, fields) {
                connection.release();
                if (err) resolve(err);
                resolve(rows);
            });
        });
    });
}

async function deleteProduct(productCode) {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) resolve(err);
            connection.query(`DELETE FROM products WHERE productCode = '${productCode}'`, function (err, rows, fields) {
                connection.release();
                if (err) resolve(err);
                resolve(rows);
            });
        });
    });
}

async function updateProduct(code, name, line, desc, slowPrice, mediumPrice, fastPrice, preview) {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) resolve(err);
            connection.query(`UPDATE products SET productName = '${name}', productDescription = '${desc}', productLine = '${line}', slowPrice = '${slowPrice}', mediumPrice = '${mediumPrice}', fastPrice = '${fastPrice}', previewImage = '${preview}' WHERE products.productCode = '${code}'`, function (err, rows, fields) {
                connection.release();
                if (err) resolve(err);
                resolve(rows);
            });
        });
    });
}

async function addProduct(code, name, line, desc, slowPrice, mediumPrice, fastPrice, preview) {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) resolve(err);
            connection.query(`INSERT INTO products(productCode, productName, productLine, productVendor, productDescription, slowPrice, mediumPrice, fastPrice, previewImage) VALUES ('${code}', '${name}', '${line}', '', '${desc}', '${slowPrice}', '${mediumPrice}', '${fastPrice}', '${preview}')`, function (err, rows, fields) {
                connection.release();
                if (err) resolve(err);
                resolve(rows);
            });
        });
    });
}

async function getUserOrders(userId) {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) resolve(err);
            connection.query(`SELECT * FROM orders WHERE user_id = '${userId}'`, function (err, rows, fields) {
                connection.release();
                if (err) resolve(err);
                resolve(rows);
            });
        });
    });
}

async function getAllOrders() {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) resolve(err);
            connection.query(`SELECT * FROM orders`, function (err, rows, fields) {
                connection.release();
                if (err) resolve(err);
                resolve(rows);
            });
        });
    });
}

async function getProductQtySum() {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) resolve(err);
            connection.query(`SELECT SUM(productQty) as val FROM orders`, function (err, rows, fields) {
                connection.release();
                if (err) resolve(err);
                resolve(rows);
            });
        });
    });
}

async function getEarnings() {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) resolve(err);
            connection.query(`SELECT SUM(productTotalPrice) as val FROM orders`, function (err, rows, fields) {
                connection.release();
                if (err) resolve(err);
                resolve(rows);
            });
        });
    });
}

async function getOrdersWithInterval(interval) {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) resolve(err);
            connection.query(`select * from orders where order_date >= DATE_SUB(CURDATE(), INTERVAL ${interval} DAY)`, function (err, rows, fields) {
                connection.release();
                if (err) resolve(err);
                resolve(rows);
            });
        });
    });
}

async function getAdminPanel() {
    return promise = new Promise(async function (resolve, reject) {
        let orders = await getAllOrders();
        let products = await getAllProducts();
        let blogPosts = await getAllBlogPosts();
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
            'earnings': earnings[0].val,
            'blogPosts': blogPosts
        })
    });
}

async function createOrder(order, orderTotalPrice, user_id) {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) resolve(err);
            connection.query(`INSERT INTO orders (${`orderId`}, ${`productName`}, ${`productCode`}, ${`productQty`}, ${`productTotalPrice`}, ${`user_id`}) VALUES (null ,'${order.name}','${order.productcode}','${order.count}','${orderTotalPrice}', '${user_id}')`, function (err, rows, fields) {
                connection.release();
                if (err) resolve(err);
                resolve(rows);
            });
            connection.query(`UPDATE products SET quantityInStock = ${`quantityInStock`}-${order.count} WHERE products.productCode = '${order.productcode}'`, function (err, rows, fields) {
                connection.release();
                if (err) resolve(err);
                resolve(rows);
            });
        });
    });
}

module.exports = {
    getConnection,
    getBlogPost,
    getAllBlogPosts,
    deleteBlogPost,
    updateBlogPost,
    addBlogPost,
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
