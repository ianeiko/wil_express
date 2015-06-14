var SabreDevStudio = require('sabre-dev-studio');
var sabre_dev_studio = new SabreDevStudio({
  client_id:     'V1:gj1u7eroxfkh6cbc:DEVCENTER:EXT',
  client_secret: '6liYuB2W',
  uri:           'https://api.test.sabre.com'
});

module.exports = function(airport, callback){
  sabre_dev_studio.get('/v1/historical/flights/GIG/seasonality', {}, callback);
}