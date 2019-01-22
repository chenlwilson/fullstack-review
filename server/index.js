const express = require('express');
const bodyParser = require('body-parser');

const {
  findOrSaveUserAsync,
  findOrSaveRepo,
  getTopRepos,
  getReposByDBUser } = require('../database/index.js');
const {getReposByUsername} = require('../helpers/github.js');

//const findOrSaveUserPromise = Promise.promisify(findOrSaveUser);

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.text());

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const searchedUser = req.body;

  getReposByUsername(searchedUser, (results) => {
    console.log('server 22 results is ' + JSON.stringify(results));
    return findOrSaveUserAsync(results[0])
      .then((userId) => {
        console.log('server line 22 userId is ' + userId)
        results.forEach((result) => {
          return findOrSaveRepo(userId, result)
        })
      })
      .then(() => {
        console.log('server 33')
        getReposByDBUser(searchedUser, (err, results) => {
          console.log('server 36 seachedUser is ' + searchedUser)
          if (err) {
            console.log('getReposByUser in db error: ' + err);
          } else {
            console.log('server 40 results is ' + results);
            res.send(results);
          }
        })
      })
      .catch((err) => {
        console.log('findOrSaveUserAsync error: ' + err)
      })
  })

});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  getTopRepos((err, results) => {
    if (err) {
      console.log('getTopRepos error: ' + err);
    } else {
      console.log(results);
      res.send(results);
    }
  });

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

