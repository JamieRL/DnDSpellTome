require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registrationRouter = require('./routes/register');
var apiRouter = require('./routes/api');
var AuthController = require('./auth/AuthController');
const mongoose = require('mongoose');
var VerifyToken = require('./auth/VerifyToken');
var app = express();

const url = 'mongodb://localhost:27017/spelltome';
console.log('process.env.SECRET', process.env.SECRET)
console.log('process.env.DB_HOST', process.env.DB_HOST)
const connect = mongoose.connect(url)
connect.then((db) => {
  console.log('Connected to database server');
}, (err) => {
  console.log(err)
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('CNMEjlwzFZOoEynNekFyhQ=='));

// app.use('/', indexRouter);
//app.use('/login', loginRouter);
app.use('/register', registrationRouter);
app.use('/auth', AuthController);
app.get('/login', (req,res) => {
  res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
});
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use('/api', VerifyToken, apiRouter);
app.get('*', function(req,res,next){
    console.log('MAIN MAINMAIN')
    res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
});



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
