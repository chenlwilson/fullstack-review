var mongoose = require('mongoose');
var Promise = require('bluebird');
const config = require('dotenv').config();

///////////////////////Schema//////////////////////
var Schema = mongoose.Schema;
//var local = 'mongodb://localhost:27017/fetcher'
var MONGODB_URI = 'mongodb://heroku_jvbvm8h6:f9fet4b0psbhg32rq61gmfqn4l@ds147411.mlab.com:47411/heroku_jvbvm8h6'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongodb fetcher connected!')
});

var userSchema = Schema({
  name:String,
  GHId:Number,
  htmlUrl:String,
  reposUrl:String,
  avatarUrl:String,
  orgsUrl:String
});

var User = mongoose.model('User', userSchema);

var repoSchema = Schema({
  name: String,
  fullName: String,
  GHId:Number,
  createdAt:String,
  updatedAt:String,
  htmlUrl:String,
  language:String,
  size:Number,
  forksCount:Number,
  watchersCount:Number,
  defaultBranch:String,
  collabsUrl:String,
  userId: {type: 'ObjectId', ref:'User'}
});

var Repo = mongoose.model('Repo', repoSchema);


///////////////////////Controllers//////////////////////

var findOrSaveUser = (data, callback) => {
  var query = { name: data.owner.login }
  var newUser = {
    name: data.owner.login,
    GHId: data.owner.id,
    htmlUrl: data.owner.html_url,
    reposUrl: data.owner.repos_url,
    avatarUrl: data.owner.avatar_url,
    orgsUrl: data.owner.organizations_url
  }
  User.findOne(query)
  .exec((err, result) => {
    if (err) {
      console.log('User.findOne error: ' + err);
    } else {
      if (result === null) {
        User.create(newUser, (err, user) => {
          if (err) {
            console.log('User.create erro: ' + err);
          } else {
            console.log('created user id is ' + user.id);
            callback(user.id);
          }
        });
      } else {
        console.log('found user: ' + result);
        callback(result.id);
      }
    }
  })
}

var findOrSaveUserAsync = (data) => {
  return new Promise((reject, resolve) => {
    findOrSaveUser(data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.id);
      }
    })
  })
}

var findOrSaveRepo = (userId, data) => {
  console.log(data);
  var query = { GHId: data.id };
  let formattedCreated, formattedUpdate;
  if (data.created_at && data.updated_at) {
    formattedCreated = data.created_at.split('T')[0] + ' ' + data.created_at.split('T')[1].split('Z')[0];
    formattedUpdate = data.updated_at.split('T')[0] + ' ' + data.updated_at.split('T')[1].split('Z')[0];
  }

  var newRepo = {
    name: data.name,
    fullName: data.full_name,
    GHId: data.id,
    createdAt: formattedCreated,
    updatedAt: formattedUpdate,
    htmlUrl: data.html_url,
    language: data.language,
    size: data.size,
    forksCount: data.forks_count,
    watchersCount: data.watchers,
    defaultBranch: data.default_branch,
    collabsUrl: data.collaborators_url,
    userId: userId
  }

  Repo.findOneAndUpdate(query, newRepo, {new: true, upsert: true}, (err, result) => {
    if (err) {
      console.log('Repo.findOneAndUpdate error: ' + err)
    } else {
      console.log('Repo.findOneAndUpdate result: ')
      console.log(result);
    }
  })
  // var updatedRepo = {
  //   updatedAt: formattedUpdate,
  //   size: data.size,
  //   forksCount: data.forks_count,
  //   watchersCount: data.watchers,
  //   defaultBranch: data.default_branch
  // }

  // Repo.findOne(query)
  // .exec((err, result) => {
  //   if (err) {
  //     console.log('Repo.findOne error: ' + err);
  //   } else if (result === null) {
  //     Repo.create(newRepo, (err, user) => {
  //       if (err) {
  //         console.log('Repo.create erro: ' + err);
  //       } else {
  //         console.log('created new repo!');
  //       }
  //     });
  //   } else {
  //     Repo.updateOne(query, updatedRepo)
  //     console.log('updated a repo!');
  //   }
  // })
}

var getReposByDBUser = (username, callback) => {
  User.find({name: username}, 'id', (err, user) => {
    if (err) {
      console.log('getReposByUser error: ' + err);
    } else {
      console.log('db 115: user is ' + user);
      const id = user[0].id;
      Repo.find({userId:id})
      .limit(25)
      .sort({createdAt: 'desc'})
      .populate('userId')
      .exec(callback)
    }
  })
}

var getTopRepos = (callback) => {
  Repo.find({})
  .limit(25)
  .sort({forksCount: 'desc'})
  .populate('userId')
  .exec(callback)
}

module.exports.findOrSaveUserAsync = findOrSaveUserAsync;
module.exports.findOrSaveRepo = findOrSaveRepo;
module.exports.getReposByDBUser = getReposByDBUser;
module.exports.getTopRepos = getTopRepos;

// db create documents manual operations
// User.create(
//   {
//     name: "octocat",
//     GHId: 583231,
//     htmlUrl: "https://github.com/octocat",
//     reposUrl:"https://api.github.com/users/octocat/repos",
//     avatarUrl:"https://avatars0.githubusercontent.com/u/583231?v=3",
//     orgsUrl:"https://api.github.com/users/octocat/orgs"
//   }, (err, user) => {
//     if(err) {
//       console.log('user create err: ' + err)
//     } else {
//       console.log('user is ' + JSON.stringify(user));
//     }
//   })
//
// Repo.create({
//   name: "git-consortium",
//   fullName: "octocat/git-consortium",
//   GHId:18221276,
//   createdAt:"2014-03-28T17:55:38Z",
//   updatedAt:"2016-12-06T13:06:37Z",
//   htmlUrl:"https://github.com/octocat/git-consortium",
//   language:null,
//   size:190,
//   forksCount:24,
//   watchersCount:7,
//   defaultBranch:'master',
//   collabsUrl:"https://api.github.com/repos/octocat/hello-worId/collaborators{/collaborator}",
//   userId: '5c455dedb27761b99872022c'
// })