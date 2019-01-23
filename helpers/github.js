const request = require('request');
//for deploy locally
//const config = require('../config.js');

//for use process.env.TOKEN
//const config = require('dotenv').config();

//TOKEN below using Heroku config var

let getReposByUsername = (username, callback) => {
  // Use the request module to request repos for a specific
  // user from the github API

  let options = {
    //GET /users/:username/repos
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    },
    sort: 'created',
    direction: 'desc'
  };

  request(options, (err, res, body) => {
    if (err) {
      console.log('GH API call error: ' + err);
    } else {
      console.log('GH API call success! number of repos is ' + JSON.parse(body).length);
      callback(JSON.parse(body))
    }
  })

}

module.exports.getReposByUsername = getReposByUsername;