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
  reposUrl:String,
  avatarUrl:String,
  orgsUrl:String
});

var User = mongoose.model('User', userSchema);

User.find((err, res) => {
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
  userId: [{type: 'ObjectId'}, {ref:'User'}]
});

var Repo = mongoose.model('Repo', repoSchema);

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
      callback(data, user.id);
    }
  });
}

var findOrSaveRepo = (data, userId) => {
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

var findPopularRepos = (callback) => {

}

module.exports.findOrSaveUser = findOrSaveUser;
module.exports.findOrSaveRepo = findOrSaveRepo;
module.exports.findPopularRepos = findPopularRepos;