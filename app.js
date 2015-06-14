var express = require('express')
var routes = require('./routes')
var sabre = require('./sabre')
var swig = require('swig')

var app = express()

// set views
swig.setDefaults({
  cache: false
})
app.engine('html', swig.renderFile)
app.set('views', 'views')
app.set('view engine', 'html')

// routes
app.use('/public', express.static('public'))

app.get('/', function (req, res) {
  res.render('blank');
})

app.get('/page/:id', function (req, res) {
  var data = require('./data/' + req.params.id + '.json')
  var week = (data.month * 4) - 1
  sabre(function(error, response) {
    var seasonality = JSON.parse(response)
    if (error) {
      console.log(error)
    } else {
      data.season = seasonality['Seasonality'][week]['SeasonalityIndicator']
    }
    res.render('page', data)
  })
})

app.get('/ask', routes.ask)

var port = process.env.PORT || 3000
app.listen(port);
