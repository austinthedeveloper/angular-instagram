angular.module('instagram', []);
angular.module('instagram')
  .factory('instagramService', function($http, $q) {
    return {
      get: function() {
        var delay = $q.defer();
        var queryString = '';
        var url = 'https://api.instagram.com/v1/tags/coffee/media/recent';
        var clientId = CLIENTID GOES HERE;
        var count = 1;
        var config = {
					'params': {
						'client_id': clientId,
						'count': count,
						'callback': 'JSON_CALLBACK'
					}
				};
        $http.jsonp(url, config)
          .success(function(data) {
            delay.resolve(data);
          });

        return delay.promise;
      }
    };
  })
  .directive('instagram', function(instagramService) {
    return {
      template: '<p ng-repeat="item in list">{{item}}</p>',
      link: function($scope, elem, attrs) {
        instagramService.get().then(function(data) {
          $scope.list = data;
        });
      }
    }
  });