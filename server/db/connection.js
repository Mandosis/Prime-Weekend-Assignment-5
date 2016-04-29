var pg = require('pg');

var connection = 'postgres://localhost:5432/todo';

function initialize() {
  pg.connect(connection, function(err, client, done) {
    if(err) {
      console.error('Error connecting to database:', err);
    } else {
      // Create schema if it does not exist
      var query = client.query('CREATE TABLE IF NOT EXISTS tasks (' +
                               'id serial PRIMARY KEY,' +
                               'task text NOT NULL,' +
                               'completed boolean NOT NULL)');

      query.on('end', function() {
        console.log('Successfully created schmea');
        done();
      });

      query.on('error', function(err) {
        console.error('Error creating schmea:', err);
        process.exit(1);
      });
    }
  });
}

exports.string = connection;
exports.initialize = initialize;
