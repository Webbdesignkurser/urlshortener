var restify = require('restify');
var unirest = require('unirest');
var urls = {};

function getUrls() {
  var url = "http://webbdesignkurser.github.io/website/short.json"
  //var url = "http://localhost:4000/short.json"

  unirest.get(url).end(function (response) {
      if (response.error) {
          return;
      }
      urls = response.body;
  });
};

getUrls();

setInterval(function() {
    unirest.get('http://wdk.se').end(function (response) {});
}, 1000 * 60 * 20);


var app = restify.createServer();

app.get('/', function (req, res, next) {
  res.header('Location', 'http://webbdesignkurser.se');
  res.send(301);
})

app.get("/:hash", function (req, res, next) {
    if(urls[req.params.hash] != null) {
      res.header('Location', urls[req.params.hash]);
      res.send(301);
    } else {
      res.send("Not found!");
      res.send(404);
    }
});

app.post('/webhook', function (req, res, next) {
    res.send(200);
    setTimeout(function() {
      getUrls();
    }, 1000 * 20);
});

app.listen(process.env.PORT || 5000);