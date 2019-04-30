var express = require('express');
var router = express.Router();
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(3000);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});



module.exports = router;
