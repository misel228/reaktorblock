

console.log('###### REAKTORBLOCK #################################################################################');

var config = require('config');
var http   = require('http');
var xml2js = require('xml2js');
var express = require('express');
var parser = new xml2js.Parser();

var blogsource = config.get('blogsource');
var port = config.get('port');
var app = express();

app.get('/', function(request, response){
    'use strict';
    var rss_request = http.get(blogsource, function(result){
        var xml = '';
        result.on('data', function(chunk){
            xml += chunk;
        });

        result.on('end', function(){
            parser.parseString(xml, function(error, result){
                response.end(JSON.stringify(result));
            });
        });
    });

    request.on('error', function(e){
        console.error(e.message);
    });
});


app.listen(port, function(){
    console.log("listening on port: " + port);
});
