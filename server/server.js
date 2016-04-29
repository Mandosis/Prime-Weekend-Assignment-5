var express = require('express');
var bodyParser = require('body-parser');
var index = require('./routers/index');
var connection = require('./db/connection');

var app = express();

app.use(bodyParser.json());
app.use(express.static('server/public'));
app.use('/', index);

connection.initialize();

var server = app.listen(process.env.PORT || 3000, function() {
  var port = server.address().port;
  console.log('Listening on port', port);
});
