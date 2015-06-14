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

var handle_sms = function(sms_id, query) {
  client().messages(sms_id).get(function(err, message) {
    if(!msg || typeof(message) == 'undefined'){
      send_message('No message found for the ID [' + sms_id + ']', '+17734502888');
      return;
    }
    analyze_message(message.body, message.from);

  }, function (err, message) {
    send_message('there was an error in processing the sms message [' + sms_id + '] - ' + err.message);
  });
};

var is_greeting = function(msg) {
  return (msg && msg.split(" ").length < 4);
};

var analyze_message = function(msg, destination) {
  if(is_greeting(msg)){
    send_message('Hey! We’re here to help you figure out when to go. What do you wanna know?', destination);
  } else {
    respondToQuestion(msg, destination);
  }
};

var handle_sms_query = function(query) {
  //var sms_id = query.SmsSid;
  var msg_from = query.From;
  var msg_body = query.Body;
  if(msg_from && msg_body) analyze_message(msg_body, msg_from);o
};

var respondToQuestion = function(question, destination) {
  if(question){
    if(question.indexOf("kite") > -1){
      send_message("About 7 flight hrs away: Cabarete, Dominican Republic is great for kitesurfing in August. [http://wil.herokuapp.com/page/cabarete]", destination);
      send_message("About 9 flight hrs away: Jericoacoara, Brazil has on average good 15mph wind in July. [http://wil.herokuapp.com/page/jericoacoara]", destination);
      send_message("About 20 flight hrs away: Zanzibar, Tanzania has the best conditions for kitesurfing in summer months. [http://wil.herokuapp.com/page/zanzibar]", destination);
      return;
    } else if(question.indexOf("Mexico") > -1){
      send_message("Tulum, Mexico has tropical climate. To skip the rainy season in summer, escape crowds in winter and save money - choose Oct/Nov. Don’t miss Day of the Dead on Oct 31.", destination);
      return;
    }
  }

  send_message("So sorry, I'm not smart enough to help you with that question yet.", destination);
};

exports.ask = function(req, res) {
  handle_sms_query(req.query);
  //handle_sms(sms_id, req.query);
  res.end('May the force be with you, my friend.');
}