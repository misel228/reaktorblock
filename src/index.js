'use strict';

console.log('###### REAKTORBLOCK #################################################################################');

var config = require('config');
var blogsource = config.get('blogsource');

var http   = require('http');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

var express = require('express');
var app = express();

app.get('/', function(request, response){
    var request = http.get(blogsource, function(result){
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


app.listen(config.get('port'), function(){
    console.log("listening on port: " + config.get('port'));
});
