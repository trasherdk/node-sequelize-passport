var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('home', { user: req.user, message: null });
});

module.exports = router;
