'use strict';

var http = require('http');

var server = http.createServer(function(req, res) {

  if (req.url.split('/')[1] === 'greet') {
    if (req.method === 'POST') {

      var parsed;
      req.on('data', function(data) {
        parsed = JSON.parse(data);
        console.log('New POST request to /greet...');
        console.log('name: ' + parsed.name);
      });
      req.on('end', function() {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.write('hello from our server, ' + parsed.name + '!');
        console.log('Response sent...');
        return res.end();
      });

    } else {

      var name = req.url.split('/')[2] || 'you';
      console.log('New GET request to /greet...');
      console.log('name: ' + name);
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write('hello from our server, ' + name + '!');
      console.log('Response sent...');
      return res.end();

    }
  } else if (req.url === '/time') {

    console.log('New GET request to /time...');
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.write(Date());
    console.log('Response sent...');
    return res.end();

  } else {

    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.write('page not found');
    res.end();

  }
});

server.listen(3000, function() {
  console.log('Server is now listening on port 3000\n');
});
