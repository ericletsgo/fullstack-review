const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  'id': Number,
  'name': String,
  'full_name': String,
  'owner': Object,
  'repository': Object,
  'watchers': Number,
  'stargazers_count': Number,
  'forks': Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;
