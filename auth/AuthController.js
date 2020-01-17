var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var User = require('../models/users');
var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.route('/register')
.post((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  if(req.body.password !== req.body.confirmPassword) {
    err = new Error('Passwords do not match');
    err.status = 400;
    next(err);
  }
  else {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
      username : req.body.username,
      password : hashedPassword
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });
      // res.status(200).json({ auth: true, token: token });
      res.statusCode = 200;
      res.json({auth: true, token: token});
    });
  }
});

router.get('/me', VerifyToken, function(req, res, next) {
  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    res.status(200).send(user);
  });

});

router.post('/login', function(req, res) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    var token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.statusCode = 200;
    res.json({username: user.username, token: token});
  });

});

module.exports = router;
