const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  request({
    method: 'GET',
    url: options.url + 'users/' + username + '/repos',
    headers: options.headers,
  }, (err, response, body) => {
    if (err) {
      console.log(err);
    } else {
      db.save(JSON.parse(body));
    }
  })

}

module.exports.getReposByUsername = getReposByUsername;
