const express = require('express'),
      router = express.Router();

router.get('/healthcheck', function(req, res, next) {
  res.json({ status: 'OK' });
});

module.exports = router;
