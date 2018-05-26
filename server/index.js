const helper = require('../helpers/github.js');
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const db = require('../database/index.js');
const url = "mongodb://localhost:27017/";
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/Repos', function (req, res) {
  var username = req.body.term;

  var handleRequest = function(err, data) {
    if (err) {
      res.status(500).send();
    } else {
      res.status(201).send();
      console.log('was sent')
    }
  }
  helper.getReposByUsername(username, handleRequest);
});

app.get('/Repos', function (req, res) {
  MongoClient.connect(url, (err, db) => {
    if (err) console.log('Connection error:', err);
    var dbo = db.db('fetcher');
    dbo.collection('repos').find({}).sort({stargazers_count: -1}).limit(25).toArray((err, result) => {
        if (err) console.log('Database error:', err);
        res.send(result);
    });
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
