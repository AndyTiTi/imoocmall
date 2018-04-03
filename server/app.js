const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const ejs = require('ejs');
const indexRouter = require('./routes/index');
const users = require('./routes/users');
const goods = require('./routes/goods');
const admin = require('./routes/admin');
const static = require('express-static');
const multer = require('multer');
const multerObj = multer({dest:'./static/upload'});
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
// app.use(multerObj.any());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  if (req.cookies.userId) {
    next();
  } else {
    if (req.originalUrl == '/users/login' || req.originalUrl == '/users/logout' || req.path == '/goods/list'||req.originalUrl == '/admin/login') {
      next();
    } else {
      res.json({
        status: '1001',
        msg: '未登录',
        result: ''
      })
    }
  }
});

app.use('/', indexRouter);
app.use('/admin', admin);
app.use('/users', users);
app.use('/goods', goods);

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
