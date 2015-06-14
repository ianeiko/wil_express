var fs = require('fs');
var _ = require('lodash')
var stringify = require('json-stringify-safe');

exports.ask = function(req, res) {
  return res.send('Hey, yo!')
}