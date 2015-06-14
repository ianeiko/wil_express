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
    console.log("boooooooo   " + req.url);
    var query = JSON.stringify(req.query);
    console.log("i got a query string bitchesssssss..... " + query);
    return query;
}

var handle_sms = function(sms_id) {
    client().messages(sms_id).get(function(err, message) {
        var msg = message.body;
        if(is_greeting(msg)){
            send_message('Hey! We’re here to help you figure out when to go. What do you wanna know?', message.to)
        } else {
            respondToQuestion(msg)
        }
    });
}

var fuzzy_match = function (str, pattern){
    pattern = pattern.split("").reduce(function(a,b){ return a+'[^'+b+']*'+b; });
    return (new RegExp(pattern)).test(str);
};

var is_greeting = function(msg) {
    msg && msg.split(" ").length < 4
}

var messages = function(res) {
    client().messages.list(function (err, data) {
        response_msg = data.messages.map(function(elem){
            if(elem){
               return elem.body;
            } else {
                return "";
            }
        }).join("\n");
        res.send(response_msg);
    });
};

var respondToQuestion = function(question) {

}

exports.ask = function(req, res) {
    var sms_id = get_sms_id(req);
    send_message(sms_id, '+17734502888');
    //handle_sms(sms_id);
    res.end('ASK');
}