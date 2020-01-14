var express = require('express');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var User = require('../models/users');
var registrationRouter = express.Router();

registrationRouter.use(bodyParser.json());

registrationRouter.route('/')
.get((req, res,next) => {
  res.setHeader('Content-Type', 'text/html');
  res.render('register');
})


module.exports = registrationRouter;
