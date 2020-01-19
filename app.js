require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var apiRouter = require('./routes/api');
var AuthController = require('./auth/AuthController');
var VerifyToken = require('./auth/VerifyToken');

var app = express();

const url = 'mongodb://localhost:27017/spelltome';
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

app.use('/auth', AuthController);
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use('/api', VerifyToken, apiRouter);
app.get('*', function(req,res,next){
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
