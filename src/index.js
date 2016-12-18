'use strict';

var config = require('config');
var blogsource = config.get('blogsource');

console.log('###### REAKTORBLOCK #################################################################################');


console.log(blogsource);

var http   = require('http');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();


var request = http.get(blogsource, function(result){
    var xml = '';
    result.on('data', function(chunk){
        xml += chunk;
    });

    result.on('end', function(){
        parser.parseString(xml, function(error, result){
            console.log(JSON.stringify(result));
        });
    });
});

request.on('error', function(e){
    console.error(e.message);
});
