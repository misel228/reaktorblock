console.log('###### REAKTORBLOCK #################################################################################');

var config = require('config');
var http = require('http');
var xml2js = require('xml2js');
var express = require('express');
var swaggerJSDoc = require('swagger-jsdoc');

var parser = new xml2js.Parser();

var blogsource = config.get('blogsource');
var port = config.get('port');
var app = express();

// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:3000',
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.get('/', routes.root);


app.listen(port, function() {
  console.log("listening on port: " + port);
});
