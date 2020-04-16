var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/data')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* data router */
router.get('/data', dataCtrl.list);

module.exports = router;
