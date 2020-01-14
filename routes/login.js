var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/users');
var loginRouter = express.Router();

loginRouter.use(bodyParser.json());

loginRouter.route('/')
.get((req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  res.render('login', { title: 'Login' });
})


module.exports = loginRouter;
