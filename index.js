var restify = require('restify')
var unirest = require('unirest')
var urls = {}

var get_urls = function () {
  unirest.get('https://webbdesignkurser.se/short.json').end(function (response) {
    if (response.error) {
        return
    }
    
    urls = response.body
  })
}

get_urls()

var app = restify.createServer()

app.get('/', function (req, res, next) {
  res.header('Location', 'https://webbdesignkurser.se')
  res.send(301)
})

app.get('/:hash', function (req, res, next) {
    if (urls[req.params.hash]) {
      res.header('Location', urls[req.params.hash])
      res.send(301)
    } else {
      res.send(404, 'Not found!')
    }
})

app.post('/webhook', function (req, res, next) {
    res.send(200)
    setTimeout(get_urls, 1000 * 20)
})

app.listen(process.env.PORT || 5000)