const helper = require('../helpers/github.js');
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/Repos', function (req, res) {
  var username = req.body.term;

  helper.getReposByUsername(username);
});

app.get('/Repos', function (req, res) {
  MongoClient.connect(url, (err, db) => {
    if (err) console.log('Connection error:', err);
    var dbo = db.db('fetcher');
    dbo.collection('repos').find().sort({stargazers_count: -1}).limit(25).toArray((err, result) => {
        if (err) console.log('Database error:', err);
        res.send(result);
    });
  });
  // res.send('hello')
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
