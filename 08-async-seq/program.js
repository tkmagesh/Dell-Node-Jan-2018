function f1Sync(){
	console.log('f1Sync Started');
	console.log('f1Sync Completed')
}

function f2Sync(){
	console.log('f2Sync Started');
	console.log('f2Sync Completed')
}

function f3Sync(){
	console.log('f3Sync Started');
	console.log('f3Sync Completed')
}

function f4Sync(){
	console.log('f4Sync Started');
	console.log('f4Sync Completed')
}

var syncFns = [f1Sync, f2Sync, f3Sync, f4Sync];

function runSync(){
	/*f1Sync();
	f2Sync();
	f3Sync();
	f4Sync();*/

	for(var i=0; i < syncFns.length; i++)
		syncFns[i]();
};

module.exports.runSync = runSync;

function f1Async(next){
	console.log('f1Async Started');
	setTimeout(function(){
		console.log('f1Async Completed')
		if (typeof next === 'function')
			next();
	}, 3000);
}

function f2Async(next){
	console.log('f2Async Started');
	setTimeout(function(){
		console.log('f2Async Completed')
		if (typeof next === 'function')
			next();
	}, 3000);
}

function f3Async(next){
	console.log('f3Async Started');
	setTimeout(function(){
		console.log('f3Async Completed')
		if (typeof next === 'function')
			next();
	}, 3000);
}

function f4Async(next){
	console.log('f4Async Started');
	setTimeout(function(){
		console.log('f4Async Completed')
		if (typeof next === 'function')
			next();
	}, 3000);
}

/*function runAsync(){
	f1Async(function(){
		f2Async(function(){
			f3Async(function(){
				f4Async();
			})
		})
	})
};*/

var asyncFns = [f1Async, f2Async, f3Async, f4Async];

function runAsync(){
	function exec(fns){
		var first = fns[0],
			remaining = fns.slice(1),
			next = function(){
				exec(remaining);
			};
		if (typeof first === 'function')
			first(next);
	}
	exec(asyncFns);
}

module.exports.runAsync = runAsync;