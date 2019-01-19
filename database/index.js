const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.log('mongodb fetcher connection error!'))
db.once('open', () => {console.log('mongodb fetcher connected!')})

let userSchema = Schema({
  name:String,
  GHId:Number,
  reposUrl:String,
  avatarUrl:String,
  orgsUrl:String
});

let User = mongoose.model('User', userSchema);

let repoSchema = Schema({
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

let Repo = mongoose.model('Repo', repoSchema);

let findOrSaveUser = (data, callback) => {
  var query = { GHId: data.owner.id }
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
      console.log('saving repo error: ' + err);
    } else {
      findOrSaveRepo(data, user.GHId);
      callback(user.GHId);
    }
  });
}

let findOrSaveRepo = (data, userId) => {
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

module.exports.findOrSaveUser = findOrSaveUser;
module.exports.findOrSaveRepo = findOrSaveRepo;