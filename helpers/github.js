const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    //GET /users/:username/repos
    url: `https://api.github.com/users/${username}/repos`,
    Accept: application/vnd.github.v3+json,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    },
    sort: created,
    direction: desc
  };

  request(options, (err, res, body) => {
    if (err) {
      console.log('GH API call error: ' + err);
    } else {
      console.log('GH API call success!');
      callback(res)
    }
  })

}

module.exports.getReposByUsername = getReposByUsername;