var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');

var VerifyToken = require('../auth/VerifyToken');

router.use(cookieParser())
/* GET home page. */
router.get('/', VerifyToken, function(req, res, next) {
  let pageTitle = 'DND SpellTome'
  res.render('index', { title: pageTitle });
});

module.exports = router;
