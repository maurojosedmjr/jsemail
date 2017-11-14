var url = require('url');
var fs = require('fs');
var qs = require('querystring');

function renderHtml(path, res){
  fs.readFile(path, null, function(error, data) {
    if (error){
      res.writeHead(404);
      res.write('Arquivo nao encontrado!');
    } else {
      res.write(data);
    }
    res.end();
  });
}

function getForm(req, res){
  if (req.method === 'POST'){
    var body = '';
    req.on('data', function(chunk){
      body += chunk;
    });
    req.on('end', function() {
      var data = qs.parse(body);
      res.writeHead(200);
      console.log(JSON.stringify(data));
      res.end(JSON.stringify(data));
    })
  } else {
    res.writeHead(404);
    res.end();
  }
}

module.exports = {
  handleRequest: function (req, res) {
    res.writeHead(200, {'Content-type': 'text/html'});

    var path = url.parse(req.url).pathname;
    switch (path) {
      case '/':
        renderHtml('./index.html', res);
        break;
      case '/post':
        getForm(req, res);
        break;
      default:
        res.writeHead(404);
        res.write('Caminho nao encontrado');
        res.end();
    }
  }
}
