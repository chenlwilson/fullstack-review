const express = require('express');
const bodyParser = require('body-parser');
const {
  findOrSaveUser,
  findOrSaveRepo,
  getTopRepos } = require('../database/index.js');
const {getReposByUsername} = require('../helpers/github.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.text());

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const searchedUser = req.body;
  res.send(results);

  getReposByUsername(searchedUser, (results) => {
    findOrSaveUser(results[0], (userId) => {
      console.log('server line 22 userId is ' + userId)
      results.forEach((result) => {
        console.log('to be saved repo is: ' + result);
        findOrSaveRepo(userId, result);
      })
    })
  });

});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  getTopRepos((err, results) => {
    if (err) {
      console.log('getTopRepos error: ' + err);
    } else {
      console.log(results);
      // var parsedResults = results.map((result) => {
      //   const createDate = result.createdAt.split('T')[0]
      //   const createTime = result.createdAt.split('T')[1].split('Z')[0]
      //   const updateDate = esult.updatedAt.split('T')[0]
      //   const updateTime = result.updatedAt.split('T')[1].split('Z')[0]
      //   // result.createdAt = createDate + ' ' + createTime
      //   // result.updatedAt = updateDate + ' ' + updateTime
      //   Object.assign({}, result, {
      //     createdAt: createDate + ' ' + createTime,
      //     updatedAt: updateDate + ' ' + updateTime
      //   })
      // })
      res.send(results);
    }
  });

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

