var friends = require('../data/friends');

// Routes =========================================================
module.exports = function(app) {
  app.get('/api/friends', function(req, res) {
    res.json(friends);
  });

  app.post('/api/friends', function(req, res) {
    var newUser = req.body;

    console.log(newUser);

    friends.push(newUser);
    
    res.send(newUser);
  });
}