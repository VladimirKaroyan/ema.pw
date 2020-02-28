let express = require('express');
let router = express.Router();
let shopservice = require('../../services/database');
let request = require('request');
let lineList = [
    "Vkontakte",
    "Facebook",
    "Instagram",
    "Youtube",
    "Twitter",
    "Odnoklassniki",
    "Telegram",
];

function sendRequest(postData) {
    return new Promise(function (resolve, reject) {
        // let resp = '';
        const options = {
            url: 'https://api-public.bosslike.ru/v1/tasks/create/',
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'X-Api-Key': '8fbbb71593b1a9101303e00f740c9c2f24aacae7cdfc9111',
                'X-Api-Signature': 'Z9mToeqY+eIFL2fEnV1uoObVrSoHGISCcbfJZZhdbvY=',
                'X-Api-Timestamp': new Date().getTime(),
            },
            body: postData,
            json: true,
        };
        request(options, function (error, response) {
            if (response.body.errors && response.body.errors.length) {
                let messages = response.body.errors.filter(function (error) {
                    return (error['field'] !== "owner_price" && error['field'] !== "count")
                }).map(function (message) {
                    return message.message;
                });
                reject({error: true, messages: messages});
            } else resolve({error: false, message: 'success'});
        });
    });
}

/* GET home page. */
router.post('/', isLoggedIn, function (req, res, next) {
    let orderData = JSON.parse(req.body.data);
    let orderTotalPrice = JSON.parse(req.body.totalPrice);
    let user = req.user;
    let createOrders = new Promise(function (resolve, reject) {
        if (user['balance'] < orderTotalPrice) {
            reject({
                error: true,
                message: 'Недостаточно средств на балансе, пополните ваш счёт.',
            });
        } else if (orderTotalPrice < 99) {
            reject({
                error: true,
                message: 'Минимальная сумма заказа 99 рублей.',
            });
        } else {
            const userNewBalance = parseFloat(parseFloat(user['balance']) - parseFloat(orderTotalPrice)).toFixed(2);
            let promises = orderData.map((order) => {
                let data = {
                    'service_type': order['service_type'],
                    'task_type': order['task_type'],
                    'service_url': order['service_url'],
                    'price': order['bosslike_points'],
                    'count': order['count']
                };
                let orderName = order['name'] + " x" + order['count'];
                return sendRequest(data).then(
                    (sendDataToApi) => {
                        shopservice.updateUserBalance(user['id'], order['price']).then(function (rows) {
                            shopservice.createOrder(user['id'], orderName, order['count'], orderTotalPrice, lineList[order['service_type'] - 1]).then(
                                (data) => {
                                    let text = `Заказ № ${data['insertId']}\nИмя заказа - ${orderName}\nЦена заказа - ${order['price']} руб.`;
                                    request('https://api.telegram.org/bot997146272:AAG2dqkAPMBr7-AzXAVswcDInkFBQfkPs3w/sendMessage?chat_id=-217535956&text=' + encodeURIComponent(text));
                                    resolve({
                                        error: false,
                                        message: 'Покупка успешно совершена.',
                                        newBalance: userNewBalance
                                    });
                                },
                                () => {
                                    reject({
                                        error: true,
                                        message: 'Произошла ошибка при выполнении заказа. Попробуйте ещё раз.',
                                    });
                                })
                        }, function (err) {
                            reject({
                                error: true,
                                message: 'Произошла ошибка при выполнении заказа. Попробуйте ещё раз.',
                            });
                        });
                    },
                    (error) => {
                        reject({
                            error: true,
                            message: `Произошла ошибка при выполнении заказа.<br><br>${error.messages.join('<br><br>')}<br><br>Попробуйте ещё раз. `,
                        });
                    },
                );
            });
            Promise.all(promises).then(
                () => {
                    resolve({
                        error: false,
                        message: 'Покупка успешно совершена.',
                        newBalance: userNewBalance
                    });
                },
                (error) => {
                    reject(error);
                }
            )
        }
    })
    createOrders.then(function (values) {
        res.send(values);
    }, function (error) {
        res.send(error);
    });
})
;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(402);
    req.flash('loginMessage', 'Сначала войдите в систему.');
    res.send('loginerr');
}

module.exports = router;
