var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');

var VerifyToken = require('../auth/VerifyToken');

router.use(cookieParser())
/* GET home page. */
router.get('/', VerifyToken, function(req, res, next) {
  let signedCookie = cookieParser.signedCookies(req.signedCookies, 'CNMEjlwzFZOoEynNekFyhQ==');
  console.log('signedcookie', signedCookie)
  let pageTitle = 'DND SpellTome'
  if(!signedCookie) {
     pageTitle = 'NO COOKIE'
  }
  res.render('index', { title: pageTitle });
});

module.exports = router;
