var jwt = require('jsonwebtoken');

function VerifyToken(req, res, next) {
  console.log('VERIFYING TOKEN', req.cookies)
  var token = req.cookies['x-access-token'];
  if (!token)
    return res.redirect('/login');//res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err){
      return res.redirect('/login');//res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}

module.exports = VerifyToken;
