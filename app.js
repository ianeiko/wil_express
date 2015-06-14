var express = require('express')
var routes = require('./routes')
// var mongoose = require('mongoose')

// mongoose.connect("mongodb://wil_test:nonuvlutonm@c1104.candidate.11.mongolayer.com:11104/wil_test");

var app = express()

// app.use(express.static('public'))

app.get('/', function (req, res) {
  return res.send('Hey, yo!')
})

app.get('/ask', routes.ask)

// Records = mongoose.model('records', { station: String, temperature: Array })
// app.get('/list', function (req, res) {
//   Records.find({}, function(err, documents) {
//     return res.json(documents)
//   })
// })


var port = process.env.PORT || 3000
app.listen(port);
