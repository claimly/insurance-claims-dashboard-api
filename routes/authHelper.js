const jwt = require('jsonwebtoken'),
      jwtSecret = require('../config').jwtSecret;

function getJWTFromHeader(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
}

const authenticate = (req, res, next) => {
  const token = getJWTFromHeader(req);
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      res.status(401).json({errors: {jwt: 'invalid token'}});
    }
    next();
  });
};

module.exports = {
  authenticate
};