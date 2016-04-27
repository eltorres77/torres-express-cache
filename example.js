/*var cache = require('torres-express-cache');*/
var cache = require('./index');
var http = require('http');

var time = 10000;

cache.config({
	enabled: true,
	verbose: true
});

var server = http.createServer(function (req, res) {

	cache.getCache("date",time,
		//when no cache, retrieve info
		function(next){ 
			var a = new Date().toLocaleTimeString();
			//it caches data passed to next (a)
			next(a);
		},
		//next
		function(a){		
			console.log(a);
			res.writeHead(200, {"Content-Type": "text/plain"});
			res.end(a);
	});

});



server.listen(8000);
console.log("Server running at http://127.0.0.1:8000/");