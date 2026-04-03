var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('lighthouse', { title: 'Search Results Lighthouse' });
});

module.exports = router;
