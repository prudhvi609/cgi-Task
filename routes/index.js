var express = require('express');
var router = express.Router();

let taskRoute = require('./task.route');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.use('/booking',taskRoute);

module.exports = router;
