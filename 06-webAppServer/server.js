var http = require('http'),
	path = require('path'),
	fs = require('fs'),
	querystring = require('querystring'),
	url = require('url'),
	calculator = require('./calculator');

var staticResExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json'];

function isStatic(resourceName){
	var resourceExtn = path.extname(resourceName);
	return staticResExtns.indexOf(resourceExtn) !== -1;
}

var server = http.createServer(function(req, res){
	var resourceUrl = req.url === '/' ? 'index.html' : req.url;
	var urlObj = url.parse(resourceUrl);
	if (isStatic(urlObj.pathname)){
		var resourcePath = path.join(__dirname, urlObj.pathname);
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		fs.createReadStream(resourcePath).pipe(res);
		return;
	} else if (urlObj.pathname === '/calculator' && req.method === 'GET'){
		var queryData = querystring.parse(urlObj.query);
		var op = queryData.op,
			n1 = parseInt(queryData.n1, 10),
			n2 = parseInt(queryData.n2, 10);

		var result = calculator[op](n1, n2);
		res.write(result.toString());
		res.end();
	} if (urlObj.pathname === '/calculator' && req.method === 'POST'){
		var bodyRawData = '';
		req.on('data', function(chunk){
			bodyRawData += chunk;
		});
		req.on('end', function(){
			var queryData = querystring.parse(bodyRawData);
			var op = queryData.op,
				n1 = parseInt(queryData.n1, 10),
				n2 = parseInt(queryData.n2, 10);

			var result = calculator[op](n1, n2);
			res.write(result.toString());
			res.end();	
		});
	} else {
		res.statusCode = 404;
		res.end();
		return;
	}
});

server.listen(8080);
console.log('server listeninig on 8080!');