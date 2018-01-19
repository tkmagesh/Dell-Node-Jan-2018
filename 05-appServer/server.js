var http = require('http'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');
	

var server = http.createServer(function(req, res){
	var urlObj = url.parse(req.url);
	if (urlObj.pathname !== '/calculator'){
		res.statusCode = 404;
		res.end();
		return;
	}
	var queryData = querystring.parse(urlObj.query);
	var op = queryData.op,
		n1 = parseInt(queryData.n1, 10),
		n2 = parseInt(queryData.n2, 10);

	var result = calculator[op](n1, n2);
	res.write(result.toString());
	res.end();
});

server.listen(8080);
console.log('server listeninig on 8080!');