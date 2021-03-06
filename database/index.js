const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  'id': {
    type: Number,
    unique: true
  },
  'owner': String,
  'repo_name': String,
  'description': String,
  'repositoryUrl': String,
  'stargazers_count': Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, callback) => {
  for (var i = 0; i < data.length; i++) {
    var username = new Repo({
      id: data[i].id,
      owner: data[i].owner.login,
      repo_name: data[i].name,
      description: data[i].description,
      repositoryUrl: data[i].url,
      stargazers_count: data[i].stargazers_count
    });
    username.save(callback);
  }
}

module.exports.save = save;
