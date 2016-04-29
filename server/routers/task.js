var express = require('express');
var pg = require('pg');
var connection = require('../db/connection');

var router = express.Router();

// Get all tasks from the database
router.get('/', function(req, res) {
  pg.connect(connection.string, function(err, client, done) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      var results = [];
      var query = client.query('SELECT * FROM tasks');

      query.on('error', function(error) {
        console.error(error);
        done();
        res.sendStatus(500);
      });

      query.on('row', function(rowData) {
        results.push(rowData);
      });

      query.on('end', function() {
        done();
        res.send(results);
      });
    }
  });
});


 // Add a new task
router.post('/', function(req, res) {
  pg.connect(connection.string, function(error, client, done) {
    if (error) {
      console.error(err);
    } else {
      var task = req.body.task;
      var completed = false;
      var query = client.query('INSERT INTO tasks (task, completed) VALUES($1, $2)', [task, completed]);

      query.on('end', function() {
        console.log('New task created successfully');
        done();
        res.sendStatus(201);
      });

      query.on('error', function(err) {
        console.error('Error creating new task:', err);
        done();
        res.sendStatus(500);
      });
    }
  });
});

// Delete a task
router.delete('/:id', function(req, res) {
  pg.connect(connection.string, function(error, client, done) {
    if (error) {
      console.error(error);
    } else {
      var query = client.query('DELETE FROM tasks WHERE id = ' + req.params.id);

      query.on('end', function() {
        console.log('Task deleted successfully');
        done();
        res.sendStatus(201);
      });

      query.on('error', function(err) {
        console.error(err);
        done();
        res.sendStatus(500);
      })
    }
  });
});

// Mark as complete
router.post('/:id', function(req, res) {
  pg.connect(connection.string, function(error, client, done) {
    if (error) {
      console.error(error);
    } else {
      var query = client.query('UPDATE tasks SET completed = true WHERE id = ' + req.params.id);

      query.on('end', function() {
        console.log('Task marked as completed successfully');
        done();
        res.sendStatus(201);
      });

      query.on('error', function(err) {
        console.error(err);
        done();
        res.sendStatus(500);
      })
    }
  });
});

module.exports = router;
