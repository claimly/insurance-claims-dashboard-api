const express = require('express'),
      router = express.Router();

router.use('/claims', require('./claims'));
router.use('/users', require('./users'));

router.get('/healthcheck', function(req, res, next) {
  res.json({ status: 'OK' });
});

module.exports = router;
