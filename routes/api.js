const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var VerifyToken = require('../auth/VerifyToken');
const Users = require('../models/users');


var apiRouter = express.Router();

apiRouter.use(bodyParser.json());

apiRouter.route('/users')
.all((req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  next();
})
.get((req,res,next) => {
  console.log('user id', req.userId)
  Users.find({_id: req.userId})
  .then(users => {
    res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err))
})

apiRouter.route('/myspells')
.all((req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  Users.findOne({_id: req.userId})
  .then(user => {
    req.user = user;
    next();
  }, (err) => next(err))
})
.get((req,res,next) => {
  res.json(req.user.favourites);
})
.post((req,res,next) => {
  let found = req.user.favourites.find(fave => {
    return fave.slug === req.body.slug
  })
  if(found){
    res.json(found);
    return res.status(200).end();
  }
  req.user.favourites.push(req.body);
  req.user.save()
    .then(user => {
      res.json(user.favourites)
    }, (err) => next(err));
})
.delete((req,res,next) => {
  var newFavourites = req.user.favourites.filter((fave) =>{
    return fave.slug === req.body.slug
  })
  req.user.favourites = newFavourites;
  req.user.save()
  .then(user => {
    res.json(user.favourites)
  }, (err) => next(err))
})


module.exports = apiRouter;
