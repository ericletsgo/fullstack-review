const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  'owner': String,
  'repo-name': String,
  'description': String,
  'repositoryUrl': String,
  'stargazers_count': Number,
  'unique': true
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  for (var i = 0; i < data.length; i++) {
    var username = new Repo({
      owner: data[i].owner.login,
      repo_name: data[i].name,
      description: data[i].description,
      repositoryUrl: data[i].url,
      stargazers_count: data[i].stargazers_count
    });
    username.save((err, data) => {
      if (err) return console.log(err);
    });
  }
}

module.exports.save = save;
