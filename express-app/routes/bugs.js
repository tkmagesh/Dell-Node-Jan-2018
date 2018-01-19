var express = require('express');
var router = express.Router();

var currentDate = new Date();

var bugList = [
	{id : 1, name : 'Server communication failure', isClosed : false, createdAt : currentDate},
	{id : 2, name : 'Data integrity checks failed', isClosed : true, createdAt : currentDate}
]

router.get('/', function(req, res, next) {
	res.json(bugList);
});

router.post('/', function(req, res, next){
	var newBug = req.body;
	var newBugId = bugList.reduce(function(prevResult, bug){
		return bug.id > prevResult ? bug.id : prevResult
	}, 0) + 1;
	newBug.id = newBugId;
	bugList.push(newBug);
	res.statusCode = 201;
	res.json(newBug);
});

router.put('/:id', function(req, res, next){
	var id = parseInt(req.params.id),
		bugToUpdate = req.body;

	bugList = bugList.map(function(bug){
		return bug.id === id ? bugToUpdate : bug;
	});
	res.json(bugToUpdate);
});


module.exports = router;
