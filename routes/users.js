const express = require('express'),
      mongoose = require('mongoose'),
      authenticate = require('./authHelper').authenticate,
      router = express.Router();

const User = mongoose.model('User');

router.post('/login', (req, res, next) => {
  const login = req.body.user.login;
  const password = req.body.user.password;

  if(!login){
    return res.status(400).json({errors: {login: 'required'}});
  }

  User.findOne({login})
      .exec()
      .then(user => {
        if (!user) {
          res.status(401).json({errors: {password: 'unknown user'}});
        }
        if (user.validatePassword(password)) {
          res.json({user: {
              token: user.generateJWT()
          }});
        } else {
          res.status(401).json({errors: {password: 'password doesn\'t match'}});
        }
      });
});

router.post('/', authenticate, (req, res, next) => {
  let user = new User({login: req.body.user.login});
  user.setPassword(req.body.user.password);
  user.save()
      .then(user => res.json({user: {
          token: user.generateJWT()
      }}))
      .catch(next);
});

module.exports = router;