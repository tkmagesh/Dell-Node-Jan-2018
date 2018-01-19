var chalk = require('chalk');

module.exports = function(req, res, next){
	console.log(chalk.green(req.method) + '\t' + chalk.bold.red(req.urlObj.pathname));
	next();
}