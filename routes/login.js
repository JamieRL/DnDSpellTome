var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/users');
var loginRouter = express.Router();

loginRouter.use(bodyParser.json());

loginRouter.route('/')
.all((req,res,next) => {
  res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  res.render('login', { title: 'Login' });
})
.post((req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({username: req.body.username})
  .then(user => {
    if (!user.validPassword(password)) {
      err = new Error('Invalid username or password');
      err.status = 400;
      next(err);
    } else {
      // password matched. proceed forward
      res.cookie('user','admin',{signed: true});
      res.cookie('username', username);
      res.redirect('/');
      next();
    }
  })
  .catch(error => {
    //res.end('Invalid username or password');
    next(error);
  })
})

module.exports = loginRouter;
