var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/users');
var registrationRouter = express.Router();

registrationRouter.use(bodyParser.json());

registrationRouter.route('/')
.get((req, res,next) => {
  res.setHeader('Content-Type', 'text/html');
  res.render('register');
})
.post((req,res,next) => {
  console.log('req.body', req.body)
  if(req.body.password !== req.body.confirmPassword) {
    err = new Error('Passwords do not match');
    err.status = 400;
    next(err);
  }
  else {
    var new_user = new User({
      username: req.body.username
    });
    new_user.password = new_user.generateHash(req.body.password);
    new_user.save()
    .then(user => {
      res.statusCode = 200;
      res.redirect('/login');
    }, (err) => next(err));
  }
})


module.exports = registrationRouter;
