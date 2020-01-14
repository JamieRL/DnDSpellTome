var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.redirect('/login');//res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err){
      console.log('redirection')
      return res.redirect('/login');//res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;

    next(res);
  });
}

module.exports = verifyToken;
