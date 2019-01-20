const express = require('express');
const bodyParser = require('body-parser');
const {
  findOrSaveUser,
  findOrSaveRepo,
  findPopularRepos } = require('../database/index.js');
const {getReposByUsername} = require('../helpers/github.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.text());

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const searchedUser = req.body;

  getReposByUsername(searchedUser, (err, results) => {
    if (err) {
      console.log('getReposByUsername error: ' + err);
    } else {
      parsedResults = JSON.parse(results);
      parsedResults.forEach((result) => {
        findOrSaveUser(result.owner.login, findOrSaveRepo);
      })
      res.send(results);
    }
  });

});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  findPopularRepos((err, results) => {
    if (err) {
      console.log('getReposByPopularity error: ' + err);
    } else {
      parsedResults = JSON.parse(results);
      res.send(results);
    }
  });

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

