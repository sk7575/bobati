var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Boba Tí' });
});


/* GET results page */
router.get('/results', function(req, res, next) {
  res.render('results', { title: 'Boba Tí' });
});

module.exports = router;
