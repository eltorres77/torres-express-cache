var cache  = require('memory-cache'),
	chalk  = require('chalk');

//console.log colors
var warning = chalk.yellow,
    success = chalk.green;

/**
 * Reads cache form the key passed as parametter and sends data to callback. 
 * If not cache is found to the passed key, calls nocache callback. Then sends data to callback.
 * @param  {[type]}   key     Cache key reference
 * @param  {[type]}   nocache callback when no cache
 * @param  {Function} next    callback after reading cache or arfter data request
 */
exports.getCache = function (key,cacheTime, nocache, next) {
	if( production && cache.keys().indexOf(key) > -1 ){ 
		console.log(success("CACHE GET cache " + key ));
		next(cache.get(key));
	}else{
		nocache(function(data){
			if(production){
				console.log( warning("CACHE PUT " + key + " for " + pretiffyTime(cacheTime) ) );
				cache.put(key, data, cacheTime);
			}
			next(data);
		}); //returns data after saving cache, then calls next action.
	}
}

/**
 * Saves request object to cache
 * @return {[type]} [description]
 */
exports.putCache = function (key,data){
	console.log(warning("CACHE PUT " + key));
	cache.put(key, data, cacheTime);
}


function pretiffyTime(time) {
	switch (true) {
		case time > 360000:
			return (time/1000/60/60)+"h";
		case time > 60000:
			return (time/1000/60)+"m";
		case time > 1000:
			return (time/1000)+"s";
		default:
			return time+"ms";
	}
}

