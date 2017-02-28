(function(){
	'use-strict';

	var CACHE_NAME = "static-cache";

	
	var filesToCache = [
		'.',
		'css/materialize.css',
		'css/style.css',
		'https://fonts.googleapis.com/icon?family=Material+Icons',
		'images/product.jpg',
		'index.html',
		'https://code.jquery.com/jquery-2.1.1.min.js',
		'js/materialize.js',
		'js/init.js'
	];
 

	  self.addEventListener('install', function(event) {
	    event.waitUntil(
	      caches.open(CACHE_NAME)
	      .then(function(cache) {
	        return cache.addAll(filesToCache);
	      })
	    );
	  });



	self.addEventListener('fetch', function(event) {
	    event.respondWith(
	      caches.match(event.request)
	      .then(function(response) {
	        return response || fetchAndCache(event.request);
	      })
	    );
	  });


	function fetchAndCache(url) {
	    return fetch(url)
	    .then(function(response) {
	      // Check if we received a valid response
	      if (!response.ok) {
	        throw Error(response.statusText);
	      }
	      return caches.open(CACHE_NAME)
	      .then(function(cache) {
	        cache.put(url, response.clone());
	        return response;
	      });
	    })
	    .catch(function(error) {
	      console.log('Request failed:', error);
	      // You could return a custom offline 404 page here
	    });
  	}


	 self.addEventListener("activate",function(event){

		console.log("service worker activating....");

	});
 

})();