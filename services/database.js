let mysql = require('mysql');
let con;

console.log('Connecting to DB');
con = mysql.createPool({
    queueLimit: 0, // unlimited queueing
    connectionLimit: 0, // unlimited connections
    host: "remotemysql.com",
    port: "3306",
    user: "i5t70PMWgi",
    password: "LRWwmlebWZ",
    database: "i5t70PMWgi",
    // host: "sql2.freemysqlhosting.net",
    // port: "3306",
    // user: "sql2324121",
    // password: "eA3!tT5%",
    // database: "sql2324121"
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

async function getSiteOptions() {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) resolve(err);
            connection.query(`SELECT * FROM site_options`, function (err, rows, fields) {
                connection.release();
                if (err) resolve(err);
                resolve(rows);
            });
        });
    });
}

async function updateSiteOption(name, value) {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) resolve(err);
            connection.query(`UPDATE site_options SET option_value = '${value}' WHERE site_options.option_name = '${name}'`, function (err, rows, fields) {
                connection.release();
                if (err) resolve(err);
                resolve(rows);
            });
        });
    });
}

async function updateUserSettings(id, email, username, password, first_name, last_name) {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) resolve(err);
            connection.query(`UPDATE users SET email = '${email}', username = '${username}', password = '${password}', first_name = '${first_name}', last_name = '${last_name}' WHERE users.id = '${id}'`, function (err, rows, fields) {
                connection.release();
                if (err) reject(err);
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

async function updateProduct(code, name, line, vendor, desc, slowPrice, mediumPrice, fastPrice, bosslikepoints_slow, bosslikepoints_medium, bosslikepoints_fast, preview) {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) resolve(err);
            connection.query(`UPDATE products SET productName = '${name}', productDescription = '${desc}', productLine = '${line}', productVendor = '${vendor}', slowPrice = '${slowPrice}', mediumPrice = '${mediumPrice}', fastPrice = '${fastPrice}', bosslikepoints_slow = '${bosslikepoints_slow}',  bosslikepoints_medium = '${bosslikepoints_medium}',  bosslikepoints_fast = '${bosslikepoints_fast}', previewImage = '${preview}' WHERE products.productCode = '${code}'`, function (err, rows, fields) {
                connection.release();
                if (err) resolve(err);
                resolve(rows);
            });
        });
    });
}

async function updateUserBalance(userId, value) {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) reject(err);
            connection.query(`UPDATE users SET balance = balance - ${value} WHERE users.id = ${userId} `, function (err, rows, fields) {
                connection.release();
                if (err) reject(err);
                console.log('ddddd');
                resolve(rows);
            });
        });
    });
}

async function addToUserBalance(userId, addValue) {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) reject(err);
            connection.query(`UPDATE users SET balance = balance + ${addValue} WHERE users.id = ${userId} `, function (err, rows, fields) {
                connection.release();
                if (err) reject(err);
                resolve(rows);
            });
        });
    });
}

async function addProduct(code, name, line, vendor, desc, slowPrice, mediumPrice, fastPrice, bosslikepoints_slow, bosslikepoints_medium, bosslikepoints_fast, preview) {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
            if (err) resolve(err);
            connection.query(`INSERT INTO products(productCode, productName, productLine, productVendor, productDescription, slowPrice, mediumPrice, fastPrice, bosslikepoints_slow, bosslikepoints_medium, bosslikepoints_fast, previewImage) VALUES ('${code}', '${name}', '${line}', '${vendor}', '${desc}', '${slowPrice}', '${mediumPrice}', '${fastPrice}', '${bosslikepoints_slow}', '${bosslikepoints_medium}', '${bosslikepoints_fast}', '${preview}')`, function (err, rows, fields) {
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
            connection.query(`SELECT SUM(orderQty) as val FROM orders`, function (err, rows, fields) {
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
            connection.query(`SELECT SUM(orderTotalPrice) as val FROM orders`, function (err, rows, fields) {
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
            connection.query(`select * from orders where orderDate >= DATE_SUB(CURDATE(), INTERVAL ${interval} DAY)`, function (err, rows, fields) {
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

async function createOrder(userId, name, qty, totalPrice, category) {
    return promise = new Promise(async function (resolve, reject) {
        con.getConnection(function (err, connection) {
                if (err) resolve(err);
                connection.query(`INSERT INTO orders (id, user_id, orderName, orderQty, orderTotalPrice, orderCategory, orderDate) VALUES (NULL, '${userId}', '${name}', '${qty}', '${totalPrice}', '${category}', CURRENT_TIMESTAMP)`, function (err, rows, fields) {
                    connection.release();
                    if (err) resolve(err);
                    resolve(rows);
                });
                // connection.query(`UPDATE products SET quantityInStock = ${`quantityInStock`}-${order.count} WHERE products.productCode = '${order.productcode}'`, function (err, rows, fields) {
                //     connection.release();
                //     if (err) resolve(err);
                //     resolve(rows);
                // });
            }
        );
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
    updateUserBalance,
    deleteProduct,
    getProductLines,
    addToUserBalance,
    updateProduct,
    addProduct,
    getAllOrders,
    getSiteOptions,
    updateSiteOption,
    updateUserSettings
};
