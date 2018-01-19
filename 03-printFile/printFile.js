var fs = require('fs');
fs.readFile('./sample.txt', { encoding : 'utf-8'}, function(err, fileContents){
	console.log(fileContents);	
	console.log('---------------------------- Thats all folks! ----------------------');
});

