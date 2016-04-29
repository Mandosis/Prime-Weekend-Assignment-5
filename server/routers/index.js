var express = require('express');
var pg = require('pg');
var path = require('path');
var task = require('./task');

var router = express.Router();

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.use('/tasks', task);

module.exports = router;
