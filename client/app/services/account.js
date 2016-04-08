angular.module('MyApp')
  .factory('Account', function($http) {
    return {
      getProfile: function() {
        return $http.get('/user/me');
      },
      updateProfile: function(profileData) {
        return $http.put('/user/me', profileData);
      }
    };
  });