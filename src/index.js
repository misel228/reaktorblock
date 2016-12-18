'use strict';

var config = require('config');
var blogsource = config.get('blogsource');

console.log('#####################################################################################################');
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
        console.log(xml);
        var json = parser.parseString(xml);
        //console.log(json);
    });


});

request.on('error', function(e){
    console.log('Error: ' + e.message);
});
