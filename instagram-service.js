angular.module('instagram', []);
angular.module('instagram')
  .factory('instagramService', function($http, $q) {
    return {
      get: function(hash, count) {
        var delay = $q.defer();
        var url = 'https://api.instagram.com/v1/tags/' + hash + '/media/recent';
        var clientId = CLIENTID GOES HERE;
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
      template: '<p ng-repeat="item in list"><img ng-src="{{item.images.standard_resolution.url}}" alt="{{item.caption.text}}"></p>',
      link: function($scope, elem, attrs) {
        var hash = attrs.hash || 'coffee';
        var count = attrs.count || 10;
        instagramService.get(hash, count).then(function(data) {
          $scope.list = data.data; 
        });
      }
    }
  });