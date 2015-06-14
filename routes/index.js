var url = require('url');

var client = function () {
  // Twilio Credentials
  var accountSid = 'ACec1f3abb9565d095a046f2439dcb9ba5';
  var authToken = 'fe9ac10bbc2f3828b0fc1b6fa2f859ef';

  //require the Twilio module and create a REST client
  var client = require('twilio')(accountSid, authToken);
  return client;
};

var send_message = function (msg, msg_to) {
  client().messages.create({
    to: msg_to,
    from: "+14158140488",
    body: msg,
  }, function (err, message) {
    if (err) console.log(err);
    console.log(message.sid);
  });
};

var get_sms_id = function(req) {
  return req.query.SmsSid;
}

var handle_sms = function(sms_id) {
  client().messages(sms_id).get(function(err, message) {
    if(!msg || typeof(message) == 'undefined'){
      send_message('No message found for the ID [' + sms_id + ']', '+17734502888');
      console.log('oopsie cakes, no message was found');
      return;
    }

    send_message('Here is some sweet body text...... [' + message.body + ']', '+17734502888');

    var msg = message.body;
    if(is_greeting(msg)){
      send_message('Hey! We’re here to help you figure out when to go. What do you wanna know?', message.from)
    } else {
      respondToQuestion(msg)
    }
  }, function (err, message) {
    send_message('there was an error in processing the sms message [' + sms_id + '] - ' + err.message);
  });
}

var fuzzy_match = function (str, pattern){
  pattern = pattern.split("").reduce(function(a,b){ return a+'[^'+b+']*'+b; });
  return (new RegExp(pattern)).test(str);
};

var is_greeting = function(msg) {
  msg && msg.split(" ").length < 4
}

var respondToQuestion = function(question) {

}

exports.ask = function(req, res) {
  var sms_id = get_sms_id(req);
  send_message('I got the motherluvin SMS ID, hooker! [' + sms_id + ']', '+17734502888');
  handle_sms(sms_id);
  res.end('May the force be with you, my friend.');
}