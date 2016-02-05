/******************************************************************
 *                 Node style callback pattern                    *
 ******************************************************************/

var fs = require('fs');
var request = require('request');

// Before moving onto promises, it's important to review callbacks.

// Asyncronous functions in JavaScript should follow the node style callback pattern.
// There are two conditions for this pattern:
//   (1) The function expects a callback as the last argument
//   (2) The callback is invoked with (err, results)

// Here's an example of consuming node's built-in fs.readFile
// Notice that the callback we pass into it meets the two conditions above
// Uncomment the lines below and run the example with `node exercises/bare_minimum/callbackReview.js`

// fs.readFile(__dirname + '/../../README.md', 'utf8', function (err, content) {
//   console.log('Example from callbackReview.js')
//   if (err) { 
//     console.log('fs.readFile failed :(\n', err)
//   } else {
//     console.log('fs.readFile successfully completed :)\n', content)
//   }
// });


/******************************************************************
 *                         Exercises                              *
 ******************************************************************/

// Implement these functions following the node style callback pattern,
// so they can be consumed like fs.readFile above

// This function should retrieve the first line of the file at `filePath`
// HINT: Passing 'utf8' as the second argument to fs.readFile will give you a stringified file
// HINT: You can get an array of lines by splitting on the '\n' character
var pluckFirstLineFromFile = function (filePath,callback) {
  fs.readFile(filePath,'utf8',function(err,results) {
    if(err){
      results = undefined;
    } else {
      results = results.toString().split('\n')[0];
    }
    callback(err,results);
  });  
};

// This function should retrieve the status code of a GET request to `url`
// HINT: the `request` module has been included to help you send HTTP requests
// HINT: there is a `statusCode` property on the `response` object
var getStatusCode = function (url,callback) {
  request.get(url,function(err, res, body) {
    var statusCode;
    if(err) {
      statusCode = undefined;
    } else {
      statusCode = res.statusCode;
    }
    callback(err,statusCode);
  });
};

// Export these functions so we can unit test them
// and reuse them in later code ;)
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
