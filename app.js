var express = require('express')
var routes = require('./routes')

var app = express()

app.use('/pages', express.static('public'))

app.get('/', function (req, res) {
  return res.send('Hey, yo!')
})

app.get('/ask', routes.ask)

var port = process.env.PORT || 3000
app.listen(port);
