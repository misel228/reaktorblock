exports.root = function(req, res) {
  'use strict';
  var rss_request = http.get(blogsource, function(result) {
    var xml = '';
    result.on('data', function(chunk) {
      xml += chunk;
    });

    result.on('end', function() {
      parser.parseString(xml, function(error, result) {
        response.end(JSON.stringify(result));
      });
    });
  });

  request.on('error', function(e) {
    console.error(e.message);
  });
};
