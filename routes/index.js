var fs = require('fs');
var _ = require('lodash')
var stringify = require('json-stringify-safe');

exports.ask = function(req, res) {
  var data = stringify(req.headers)
  fs.writeFile("./public/twilio.json", data, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}