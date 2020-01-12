var friends = require('../data/friends');
var fs = require('fs')

// Routes =========================================================
module.exports = function(app) {
  app.get('/api/friends', function(req, res) {
    res.json(friends);
  });

  app.post('/api/friends', function(req, res) {
    newUser = req.body;

    for(answer in req.q){
      newUser.answers.push(req.q[answer]);
    }

    addToFriends(newUser, friends);

    res.send(newUser);
  });

  function addToFriends(newUser, friends) {
    friends.push(newUser);

    var data = 'var friends = ' + JSON.stringify(friends, null, 2) + '\n module.exports = friends'

    fs.writeFile('app/data/friends.js', data, function(err) {
      if(err){
        console.log(err);
      }
    });
    
  }
}