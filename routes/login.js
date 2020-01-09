var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/users');
var loginRouter = express.Router();

loginRouter.use(bodyParser.json());

loginRouter.route('/')
.all((req,res,next) => {
  res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/plain');
  next()
})
.get((req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  res.render('login', { title: 'Login' });
})
.post((req, res, next) => {
  console.log('req.body', req.body);
  const username = req.body.username;
  const password = req.body.password;
  console.log('username', username);
  console.log('password', password);
  User.findOne({username: req.body.username})
  .then(user => {
    if (!User.validPassword(req.body.password)) {
      res.statusCode = 401;
      res.end('Invalid Username or Password');
    } else {
      // password matched. proceed forward
    }
  })
  .catch(error => {
    res.end('Invalid username or password');
    next(error);
  })
})
module.exports = loginRouter;
