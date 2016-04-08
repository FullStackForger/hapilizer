angular.module('MyApp')
  .controller('NavbarCtrl', function($scope, $auth, auth) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated() || auth.isAuthenticated();
    };
  });
