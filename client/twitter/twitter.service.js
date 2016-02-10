function twitter_service($resource, $rootScope) {
	var successCallback = null;
	var failureCallback = null;

    var socket = null; 

	var service = {
		data: null,
		search: function(keywords, onSuccess, onFailure) {
			var self = this;

			successCallback = onSuccess;
			failureCallback = onFailure;

			if (!socket) {
				socket = io('http://warbler:80/');

				socket.on('twitter.stream', function(response) {
			    	self.data = response;
			    	$rootScope.$broadcast('twitter.data.updated');
			    	(successCallback || angular.noop)(response);
			    });

			}
			
			/*socket.on('connect', function() {
				socket.emit('twitter.query', keywords);
			});*/
			socket.emit('twitter.query', keywords);

			return this;
		}
	};

	return service;
}