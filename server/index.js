const express = require('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');

const {
  findOrSaveUserAsync,
  findOrSaveRepo,
  getTopRepos,
  getReposByDBUser } = require('../database/index.js');
const {getReposByUsername} = require('../helpers/github.js');

let app = express();

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.text());

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const searchedUser = req.body;

  getReposByUsername(searchedUser, (results) => {
    return findOrSaveUserAsync(results[0])
      .then((userId) => {
        return Promise.all(results.map((result) => {
          return findOrSaveRepo(userId, result)
        }))
        .then(() => {
          setTimeout(() => {
            getReposByDBUser(searchedUser, (err, results) => {
              if (err) {
                console.log('getReposByUser in db error: ' + err);
              } else {
                res.send(results);
              }
            })
          }, 2000)
        })
        .catch((err) => {
          console.log('findOrSaveUserAsync error: ' + err)
        })
      })

  })

});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  getTopRepos((err, results) => {
    if (err) {
      console.log('getTopRepos error: ' + err);
    } else {
      res.send(results);
    }
  });

});

let port = 1128;


