var friends = require('../data/friends');
var fs = require('fs')

// Routes =========================================================
module.exports = function(app) {
  app.get('/api/friends', function(req, res) {
    res.json(friends);
  });

  app.post('/api/friends', function(req, res) {
    newUser = req.body;

    var match = findMatch(newUser, friends);

    addToFriends(newUser, friends);

    res.send(match);
  });

  function addToFriends(newUser, friends) {
    friends.push(newUser);

    var data = 'var friends = ' + JSON.stringify(friends, null, 2) + '\n module.exports = friends'

    fs.writeFile('app/data/friends.js', data, function(err) {
      if(err){
        console.log(err);
      }
    });
  };

  function findMatch(newFriend, friends){
    var scoreComparison = 100;
    var closestMatch;
    friends.forEach(friend => {
      var currentScore = 0;
      for (i = 0; i < friend.scores.length; i++) {
        currentScore += (Math.abs(parseInt(friend.scores[i]) - parseInt(newFriend.scores[i])));
      }
      console.log('Current Score: ' + currentScore);
      if(currentScore < scoreComparison){
          scoreComparison = currentScore;
          closestMatch = friend;
      }
    });

    return closestMatch;
  }
}