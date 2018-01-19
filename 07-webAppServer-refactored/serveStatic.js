var path = require('path'),
	fs = require('fs'),
	url = require('url');
	

var staticResExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json'];

function isStatic(resourceName){
	var resourceExtn = path.extname(resourceName);
	return staticResExtns.indexOf(resourceExtn) !== -1;
}
module.exports = function(staticFolderPath){
	return function(req, res, next){
		if (isStatic(req.urlObj.pathname)){
			var resourcePath = path.join(staticFolderPath, req.urlObj.pathname);
			if (!fs.existsSync(resourcePath)){
				res.statusCode = 404;
				res.end();
				return;
			}
			fs.createReadStream(resourcePath).pipe(res);
		} else {
			next();
		}
	}
}