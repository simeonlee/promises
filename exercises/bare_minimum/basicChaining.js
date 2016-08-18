/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');

var promiseConstructor = require('./promiseConstructor');
var getStatusCodeAsync = promiseConstructor.getStatusCodeAsync;
var pluckFirstLineFromFileAsync = promiseConstructor.pluckFirstLineFromFileAsync;

var promisification = require('./promisification');
var getGitHubProfileAsync = promisification.getGitHubProfileAsync;
var generateRandomTokenAsync = promisification.generateRandomTokenAsync;
var readFileAndMakeItFunnyAsync = promisification.readFileAndMakeItFunnyAsync;

var Promise = require('bluebird');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pluckFirstLineFromFileAsync(readFilePath)
    .then(function(username) {
      if (!username) {
        throw new Error('User not found!'); // heads straight to 'catch'
      } else {
        return getGitHubProfileAsync(username);
      }
    })
    .then(function(data) {
      fs.appendFile(writeFilePath, JSON.stringify(data), function(err, response) {
        if (err) {
          throw new Error(err);
        }
      });
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};