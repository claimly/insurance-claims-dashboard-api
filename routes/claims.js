const express = require('express'),
      mongoose = require('mongoose'),
      router = express.Router();

const Claim = mongoose.model('Claim');

router.get('/', (req, res, next) => {
  return Claim.find({})
      .exec()
      .then(result => res.json({claims: result}))
      .catch(next);
});

router.post('/', (req, res, next) => {
  let claim = new Claim(Object.assign(req.body.claim, {status: 'NEW'}));
  claim.save()
      .then(claim => res.json({claim: claim}))
      .catch(next);
});

module.exports = router;