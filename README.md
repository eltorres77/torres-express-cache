# torres-express-cache
Simple callback flow for managing cache.
Just set a function for setting cache and a function after reading cache.

## Install

```sh
$ npm install torres-express-cache
```

## Usage


```javascript

var cache = require('torres-express-cache');

var cachetime = 10000; //10s

cache.getCache( "key" , cachetime ,
	//when no cache
	function(next){ 

		//here your requests

		//pass your data ass parameter to next and it is cached
		next(data);
	},
	//next
	function(data){		
		
		//get cache or passed info

	}
);

```

```javascript
getCache(key,cachetime, nocache, next)
```
* key is a unique key for each cache element.
* cachetime is the time in ms for cache.
* nocache is the function which is executed if no cache is found. Here is where you retrive the data, get cached it and passed to next function.
* next is callback executed after getting cache (if exists) or after making requests and caching data.

You can store cache manually by calling method 
```javascript
putCache(key,data)
```

### Example
```javascript

res.render('index', function(req,res) {
   
	cache.getCache("index", 1000 * 3600,
		//when no cache
		function(next){ 	
			//request to api
			blog.getIndexPosts(function(posts){ 
				//save files in cache, then next.
				next( {posts: posts} );
			});
		},
		//next
		function(data){		
			res.info = data;
			res.render(req,res);
		});
	}

});



```


### Config
Default config is:

```javascript
cache.config({
	enabled: true,
	verbose: true
});
```



#### Enabled 
If not enabled just pass data to callback function without caching it. It is very usefull in Express if you want to dissable cache in development mode. Just enable cache only when NODE_ENV is production like this:

```javascript
cache.config({
	enabled: app.get('env') == production ,
	verbose: true
});

```

#### Verbose
If verbose is enabled it logs when cache is set or retrieved.