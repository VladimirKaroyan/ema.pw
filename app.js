let express = require('express');
let app = express();
let passport = require('passport');
require('./config/passport')(passport);
let createError = require('http-errors');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let flash = require('connect-flash');
let session = require('express-session');
let indexRouter = require('./routes/index');
let productsRouter = require('./routes/productOverview');
let loginRouter = require('./routes/user/login');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let signUpRouter = require('./routes/user/login');
let ordersRouter = require('./routes/user/makeOrder');
let adminPanel = require('./routes/admin/adminPanel');
let deleteProduct = require('./routes/admin/deleteProduct');
let updateProduct = require('./routes/admin/updateProduct');
let addProduct = require('./routes/admin/addProduct');
let UserOrdersRouter = require('./routes/user/myorders');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'justasecret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/', indexRouter);
app.use('/product', productsRouter);
app.use('/delete-product', deleteProduct);
app.use('/update-product', updateProduct);
app.use('/add-product', addProduct);
app.use('/login', loginRouter);
app.use('/sign-up', signUpRouter);
app.use('/make-order', ordersRouter);
app.use('/myorders', UserOrdersRouter);
app.use('/admin-panel', adminPanel);
app.use('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
