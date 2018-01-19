var querystring = require('querystring'),
	calculator = require('./calculator');
	
module.exports = function(req, res){
	var urlObj = req.urlObj;
	if (urlObj.pathname === '/calculator' && req.method === 'GET'){
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
	}
}