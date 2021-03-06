var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'zuvql3ieas4exjch@ethereal.email',
        pass: 'zqMrHHaabkHWFxtUt7'
    }
});

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

function sendEmail(req, res){
  if (req.method === 'POST'){
    var body = '';
    req.on('data', function(chunk){
      body += chunk;
    });
    req.on('end', function() {
      var data = JSON.parse(body);
      res.writeHead(200);
      var mailOptions = {
        from: 'zuvql3ieas4exjch@ethereal.email',
        to: 'maurojosedmjr@gmail.com',
        subject: 'Contato',
        text: 'Nome: ' + data.fullName +
              ' Email: ' + data.email +
              ' Telefone: ' + data.phone +
              ' Mensagem: ' + data.message,
        html: '<ul><li>Nome: ' + data.fullName +
              '</li><li>Email: ' + data.email +
              '</li><li>Telefone: ' + data.phone +
              '</li><li>Mensagem: ' + data.message + '</li>'
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });

      res.end();
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
    console.log('rota ' + path)
    switch (path) {
      case '/':
        renderHtml('./index.html', res);
        break;
      case '/post':
        sendEmail(req, res);
        break;
      default:
        res.writeHead(404);
        res.write('Caminho nao encontrado');
        res.end();
    }
  }
}
