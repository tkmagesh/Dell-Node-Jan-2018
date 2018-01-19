var url = require('url'),
	querystring = require('querystring');

module.exports = function(req, res, next){

	req.urlObj = url.parse(req.url);
	req.queryData = querystring.parse(req.urlObj.query);
	if (req.method === 'POST' || req.method === 'PUT'){
		var bodyRawData = '';
		req.on('data', function(chunk){
			bodyRawData += chunk;
		});
		req.on('end', function(){
			req.bodyData = querystring.parse(bodyRawData);
			next();
		});
	} else {
		next();
	}
}