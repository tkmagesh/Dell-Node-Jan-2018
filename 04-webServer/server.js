var http = require('http'),
	path = require('path'),
	fs = require('fs');

var server = http.createServer(function(req, res){
	var resourceUrl = req.url === '/' ? 'index.html' : req.url;
	var resourcePath = path.join(__dirname, resourceUrl);
	if (!fs.existsSync(resourcePath)){
		res.statusCode = 404;
		res.end();
		return;
	}
	fs.createReadStream(resourcePath).pipe(res);
});

server.listen(8080);
console.log('server listeninig on 8080!');