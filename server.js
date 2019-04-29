'use strict';
const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist/tanksystem-ui'));
app.use(compression({level: 9}));

// Start server
function startServer() {
  app.listen(process.env.PORT || 8080);
}

setImmediate(startServer);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/tanksystem-ui/index.html'));
});
