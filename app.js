var url = require('url');
var fs = require('fs');
var restify = require('restify');

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

module.exports = {
  handleRequest: function (req, res) {
    res.writeHead(200, {'Content-type': 'text/html'});

    var path = url.parse(req.url).pathname;
    switch (path) {
      case '/':
        renderHtml('./index.html', res);
        break;
      default:
        res.writeHead(404);
        res.write('Caminho nao encontrado');
        res.end();
    }
  }
}
