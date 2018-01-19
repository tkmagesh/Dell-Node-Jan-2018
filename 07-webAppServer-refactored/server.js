var http = require('http');

var serveStatic = require('./serveStatic');
	calculatorHandler = require('./calculatorHandler'),
	notFoundHandler = require('./notFoundHandler');

var server = http.createServer(function(req, res){
	var resourceUrl = req.url === '/' ? 'index.html' : req.url;
	serveStatic(req, res);
	calculatorHandler(req, res);
	notFoundHandler(req, res);
});

server.listen(8080);
console.log('server listeninig on 8080!');