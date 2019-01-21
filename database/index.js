console.log('database/index.js loaded!')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/fetcher', { useNewUrlParser: true });

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

User.find().exec((err, res) => {
  if(err) {
    console.log('user find err: ' + err)
  } else {
    console.log('res is ' + JSON.stringify(res));
  }
})

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

var findOrSaveUser = (data, callback) => {
  var query = { name: data.owner.login }
  var options = {upsert: true, new: true}
  var newUser = new User({
    name: data.owner.login,
    GHId: data.owner.id,
    reposUrl: data.owner.repos_url,
    avatarUrl: data.owner.avatar_url,
    orgsUrl: data.owner.organizations_url
  })
  User.findOneAndUpdate(query, newUser, options, (err, user) => {
    if (err) {
      console.log('saving user error: ' + err);
    } else {
      console.log('new user saved!')
      callback(user.id);
    }
  });
}

var findOrSaveRepo = (userId, data) => {
  var query = { GHId: data.id }
  var options = {upsert: true, new: true}
  var newRepo = new Repo({
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
    userId: userId
  })
  Repo.findOneAndUpdate(query, newRepo, options, (err, repo) => {
    if (err) {
      console.log('saving repo error: ' + err);
    } else {
      console.log('new repo saved: ' + repo);
    }
  });
}

var getTopRepos = (callback) => {
  Repo.find({})
  .limit(25)
  .sort('forksCount')
  .populate('userId')
  .exec(callback)
}

module.exports.findOrSaveUser = findOrSaveUser;
module.exports.findOrSaveRepo = findOrSaveRepo;
module.exports.getTopRepos = getTopRepos;