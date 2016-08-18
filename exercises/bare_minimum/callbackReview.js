/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  // TODO
  // readFile(filePath) 
  //var error = {};
  //error.code = 'ENOENT';
  fs.readFile(filePath, function(err, data) {

    if (err) {
      // console.log(err);
      callback(err);  
    } else {
      data = data.toString().split('\n');
      callback(err, data[0]);  
    }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  
  request(url, function(err, response, body) {
    if (err) {
      callback(err);  
    } else {
      // var statusCode = 200;
      // request logic that returns 'actual' method code... should equal 200
      callback(err, response.statusCode);
    }
  });
  
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
