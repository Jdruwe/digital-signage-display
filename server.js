/*const express = require('express');
const serveStatic = require('serve-static');
let app = express();

app.use(serveStatic(__dirname + "/dist"));

const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log('Listening on port ' + port)
});*/


//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/devoxx-digital-signage'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/devoxx-digital-signage/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
