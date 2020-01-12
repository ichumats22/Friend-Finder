var express = require('express');

var app = express();
var PORT = 3000;

//Set up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var api = require('./app/routing/apiRoutes');
var html = require('./app/routing/htmlRoutes');

api(app);
html(app);

//Listener========================================================
app.listen(PORT, function() {
  console.log(`App listening on PORT ${PORT}`);
});