const express = require('express'),
      mongoose = require('mongoose'),
      authenticate = require('./authHelper').authenticate,
      router = express.Router();

const Claim = mongoose.model('Claim');

router.get('/', authenticate, (req, res, next) => {
  return Claim.find({})
      .exec()
      .then(result => res.json({claims: result}))
      .catch(next);
});

router.post('/', (req, res, next) => {
  const claim = new Claim(Object.assign(req.body.claim, {status: 'NEW'}));
  claim.save()
      .then(claim => res.json({claim}))
      .catch(next);
});

module.exports = router;