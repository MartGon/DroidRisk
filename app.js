var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var path = require('path')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var net = require('net');

var app = express();

// Setup Malware classifier client
app.locals.client = new net.Socket();
app.locals.client.connect(3030, '127.0.0.1', function() {
	console.log('Connected');
});

// Setup storage
app.locals.storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, '/home/defu/Documents/TFM/Projects/MalwareClassifier/Datasets/koodous/samples/')
  },

  filename: function(req, file, cb){
    console.log(file.originalname)
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
